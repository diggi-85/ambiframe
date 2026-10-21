// Panel „ambiframe-display“: Vollbild-Anzeige für Tablet/TV, URL /ambiframe-display?display=<id>
// Meldet sich bei HA an (Herzschlag, aktuelle Seite), nimmt Befehle entgegen und lädt sich nach Updates neu.
import { resolveLang, setLang, t } from "../i18n";
import { effectiveConfig } from "../util";
import { LitElement, css, html, nothing } from "lit";
import "../display/display";
import type { AfDisplay } from "../display/display";
import "../display/safe";
import type { Hass, AmbiframeConfig } from "../types";
import { define } from "../widgets/base";

type FullscreenDoc = Document & { webkitFullscreenEnabled?: boolean; webkitFullscreenElement?: Element };
type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => void };
type Command =
  | { command: "hello"; version?: string; paused?: boolean; until?: string | null }
  | { command: "show_page"; page: string }
  | { command: "next" | "resume" | "reload" }
  | { command: "pause"; until?: string | null }
  | { command: "safe"; on: boolean }
  | { command: "event"; id: string };

const VERSION = __WB_VERSION__;
const HEARTBEAT_MS = 30e3;

/* Notfallmodus: so viele Fehler / Starts in diesem Zeitraum gelten als „kaputt“ */
const CRASH_ERRORS = 5;
const CRASH_WINDOW_MS = 2 * 60e3;
const LOOP_STARTS = 4;
const LOOP_WINDOW_MS = 10 * 60e3;
/** Danach wird die normale Anzeige wieder versucht */
const SAFE_RETRY_MS = 15 * 60e3;
/** So lange ohne sichtbare Seite → Notfallmodus */
const NO_PAGE_MS = 90e3;

/**
 * Display und Stream-Modus aus der Adresse: ?display=küche&stream=1 – oder als Pfad /ambiframe-display/küche/stream
 * (der Pfad übersteht auch Werkzeuge wie Puppet, die Abfrageparameter selbst verwenden).
 */
const urlParts = (() => {
  const q = new URLSearchParams(location.search);
  const path = location.pathname.split("/").filter(Boolean).slice(1).map(decodeURIComponent);
  return { display: q.get("display") ?? path[0] ?? null, stream: q.has("stream") || path[1] === "stream" };
})();

/** Speicher im Browser – kann fehlen (privates Fenster), dann eben ohne */
const local = {
  get: (key: string): string | null => {
    try {
      // Früherer Name „Wandbild“: dessen Werte weiter gelten (Geräte-Kennung, gewähltes Display)
      return localStorage.getItem(key) ?? localStorage.getItem(key.replace(/^ambiframe-/, "wandbild-"));
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* egal */
    }
  },
};

/** Feste Kennung dieses Geräts, damit HA es nach Neuladen wiedererkennt */
const CLIENT_ID = (() => {
  let id = local.get("ambiframe-client");
  if (!id) {
    id = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    local.set("ambiframe-client", id);
  }
  return id;
})();

/** Geräte-ID in Fully – damit HA das Fully-Gerät zu diesem Display findet */
const fullyDeviceId = (): string | null => {
  try {
    return (window as unknown as { fully?: { getDeviceId?: () => string } }).fully?.getDeviceId?.() || null;
  } catch {
    return null;
  }
};

/** Lesbarer Gerätename für den Editor, z. B. „Fully Kiosk · Küche“ oder „iPad · Safari“ */
const deviceName = (): string => {
  const ua = navigator.userAgent;
  const fully = (window as unknown as { fully?: { getDeviceName?: () => string } }).fully;
  if (fully) {
    let name = "";
    try {
      name = fully.getDeviceName?.() ?? "";
    } catch {
      /* ältere Fully-Version */
    }
    return name ? `Fully Kiosk · ${name}` : "Fully Kiosk";
  }
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (/Home ?Assistant\//.test(ua)) return ipad ? "HA-App · iPad" : /iPhone/.test(ua) ? "HA-App · iPhone" : "HA-App";
  const device = ipad ? "iPad" : /iPhone/.test(ua) ? "iPhone" : /Android/.test(ua) ? "Android" : /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "Browser";
  const browser = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "";
  return browser ? `${device} · ${browser}` : device;
};

/**
 * Braucht dieser Browser einen Tipp für echtes Vollbild? (Safari auf dem iPad, Desktop-Browser)
 * Nicht nötig in Fully Kiosk, der HA-App oder als Web-App vom Home-Bildschirm.
 */
const needsFullscreen = (): boolean => {
  const d = document as FullscreenDoc;
  const enabled = d.fullscreenEnabled ?? d.webkitFullscreenEnabled ?? false;
  const active = d.fullscreenElement ?? d.webkitFullscreenElement;
  const standalone = matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const kiosk = "fully" in window || /Home Assistant\//.test(navigator.userAgent);
  return enabled && !active && !standalone && !kiosk;
};

class AmbiframeDisplayPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { attribute: false },
    route: { attribute: false },
    panel: { attribute: false },
    display: { attribute: false },
    config: { state: true },
    error: { state: true },
    hint: { state: true },
    displayId: { state: true },
    autoSafe: { state: true },
    forcedSafe: { state: true },
  };

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: block;
      background: #000;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
    af-display {
      width: 100%;
      height: 100%;
    }
    .error {
      color: #ddd;
      font: 18px/1.5 system-ui, sans-serif;
      padding: 48px;
    }
    .hint {
      position: absolute;
      left: 50%;
      top: 22px;
      transform: translateX(-50%);
      z-index: 2;
      padding: 10px 18px;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.82);
      font: 15px system-ui, sans-serif;
      pointer-events: none;
      animation: hint 7s ease both;
    }
    @keyframes hint {
      0%,
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    /* Auswahl beim ersten Öffnen, wenn es mehrere Displays gibt */
    .pick {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      gap: 28px;
      padding: 32px;
      color: #f2efe8;
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      background: radial-gradient(ellipse 70% 60% at 50% 30%, #1d1c19, #0a0a0a);
    }
    .pick h1 {
      margin: 0;
      font-weight: 300;
      font-size: clamp(28px, 4vw, 44px);
    }
    .pick p {
      margin: 0;
      color: rgba(242, 239, 232, 0.6);
      font-size: 17px;
    }
    .pick .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
    }
    .pick button {
      font: 500 20px system-ui, -apple-system, sans-serif;
      color: inherit;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 20px;
      padding: 22px 34px;
      min-width: 200px;
      cursor: pointer;
    }
  `;

  hass?: Hass;
  private config?: AmbiframeConfig;
  private error = "";
  private hint = false;
  private displayId = "";
  /** Fest vorgegebenes Display – von der Dashboard-Karte (z. B. iPad mit Kiosk-Modus der HA-App) */
  display?: string;
  private swallowClick = false;
  private unsub?: Promise<(() => unknown) | undefined>;
  private connection?: Promise<(() => unknown) | undefined>;
  private connectedTo = "";
  private heartbeat?: number;
  private reloadTimer?: number;
  /** Pause laut HA – wird an die Anzeige weitergereicht, sobald sie da ist */
  private paused = false;
  /** Notfallmodus: automatisch (Grund), aus HA erzwungen oder per ?safe=1 */
  private autoSafe = "";
  private forcedSafe = false;
  /** Ereignis, wegen dem HA Ambiframe gerade nach vorn geholt hat */
  private pendingEvent = "";
  private readonly urlSafe = new URLSearchParams(location.search).has("safe");
  /** Vom Videostream (Puppet) geöffnet: kein Vollbild-Hinweis, keine Neustart-Zählung, ohne Bedienelemente */
  private readonly streamMode = urlParts.stream;
  /** Zuletzt übernommene Konfiguration als Text – gleiche Fassung löst keinen Neustart der Anzeige aus */
  private configText = "";
  private safeTimer?: number;
  private watchTimer?: number;
  private errors: number[] = [];
  private noPageSince = 0;

  /** Grund für den Notfallmodus – leer, wenn alles normal läuft */
  private get safeReason(): string {
    if (this.urlSafe) return "per Link (?safe=1)";
    if (this.forcedSafe) return "aus Home Assistant eingeschaltet";
    return this.autoSafe;
  }

  /** Automatisch in den Notfallmodus; nach retryMs wird die normale Anzeige wieder versucht */
  private enterSafe(reason: string, retryMs = SAFE_RETRY_MS): void {
    if (this.autoSafe) return;
    this.autoSafe = reason;
    void this.report();
    clearTimeout(this.safeTimer);
    this.safeTimer = window.setTimeout(() => this.leaveSafe(), retryMs);
  }

  private leaveSafe(): void {
    clearTimeout(this.safeTimer);
    this.autoSafe = "";
    this.errors = [];
    this.noPageSince = 0;
    void this.report();
  }

  /** Fehler aus Ambiframe zählen – häufen sie sich, ist die normale Anzeige kaputt */
  private onError = (e: ErrorEvent | PromiseRejectionEvent): void => {
    const err = "reason" in e ? e.reason : e.error;
    const where = `${"filename" in e ? e.filename : ""} ${(err as Error)?.stack ?? ""}`;
    if (!/ambiframe/i.test(where)) return;
    const now = Date.now();
    this.errors = [...this.errors.filter((t) => now - t < CRASH_WINDOW_MS), now];
    if (this.errors.length >= CRASH_ERRORS && !this.safeReason) this.enterSafe("Anzeigefehler");
  };

  /** Startet die Seite immer wieder neu (Update, Watchdog …)? Dann erst einmal ruhig im Notfallmodus bleiben. */
  private checkStartLoop(): void {
    const now = Date.now();
    // Selbst ausgelöstes Neuladen (neue Version, Befehl aus HA) ist kein Absturz – nicht mitzählen
    const planned = Number(local.get("ambiframe-planned-reload") ?? 0);
    local.set("ambiframe-planned-reload", "0");
    if (now - planned < 2 * 60e3) return;
    let starts: number[] = [];
    try {
      starts = JSON.parse(local.get("ambiframe-starts") ?? "[]");
    } catch {
      starts = [];
    }
    starts = [...starts.filter((t) => typeof t === "number" && now - t < LOOP_WINDOW_MS), now];
    local.set("ambiframe-starts", JSON.stringify(starts));
    if (starts.length >= LOOP_STARTS) this.enterSafe("startet immer wieder neu");
  }

  /** Kommt nach dem Laden nie eine Seite auf den Schirm (z. B. nur Seiten mit unerfüllten Bedingungen)? */
  private watchPage = (): void => {
    if (this.safeReason || !this.config || !this.displayId || document.hidden) {
      this.noPageSince = 0;
      return;
    }
    if (this.disp?.currentPageId) {
      this.noPageSince = 0;
      return;
    }
    this.noPageSince ||= Date.now();
    if (Date.now() - this.noPageSince > NO_PAGE_MS) this.enterSafe("keine Seite sichtbar", 5 * 60e3);
  };

  private get disp(): AfDisplay | null {
    return this.renderRoot.querySelector("af-display");
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.hint = !this.streamMode && needsFullscreen();
    // Der erste Tipp schaltet ins Vollbild, statt den Bedienmodus zu öffnen
    this.addEventListener("pointerdown", this.onPointerDown, { capture: true });
    this.addEventListener("click", this.onClick, { capture: true });
    this.addEventListener("af-page", this.onPage);
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("error", this.onError);
    window.addEventListener("unhandledrejection", this.onError);
    this.watchTimer = window.setInterval(this.watchPage, 15e3);
    if (!this.streamMode) this.checkStartLoop();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("pointerdown", this.onPointerDown, { capture: true });
    this.removeEventListener("click", this.onClick, { capture: true });
    this.removeEventListener("af-page", this.onPage);
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("error", this.onError);
    window.removeEventListener("unhandledrejection", this.onError);
    clearInterval(this.watchTimer);
    clearTimeout(this.safeTimer);
    void this.unsub?.then((u) => u?.());
    this.unsub = undefined;
    this.disconnectDisplay();
    clearTimeout(this.reloadTimer);
  }

  /* ───────── Vollbild ───────── */

  private onPointerDown = (e: PointerEvent): void => {
    if (!needsFullscreen()) return;
    // In der Display-Auswahl soll der erste Tipp auch gleich wählen
    if (!this.displayId) {
      this.goFullscreen();
      return;
    }
    e.stopPropagation();
    this.swallowClick = true;
    this.goFullscreen();
  };

  private goFullscreen(): void {
    const el = document.documentElement as FullscreenEl;
    try {
      const request = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
      void Promise.resolve(request?.()).catch(() => undefined);
    } catch {
      /* Vollbild nicht erlaubt – dann eben mit Leiste */
    }
  }

  private onClick = (e: MouseEvent): void => {
    if (!this.swallowClick) return;
    this.swallowClick = false;
    e.stopPropagation();
  };

  private onFullscreenChange = (): void => {
    this.hint = needsFullscreen();
  };

  /* ───────── Welches Display? ───────── */

  /** URL → auf diesem Gerät gespeichert → das einzige Display → Auswahl */
  private resolveDisplay(config: AmbiframeConfig): string {
    const ids = config.displays.map((d) => d.id);
    const fromUrl = this.display || urlParts.display;
    if (fromUrl && ids.includes(fromUrl)) return fromUrl;
    const saved = local.get("ambiframe-display");
    if (!fromUrl && saved && ids.includes(saved)) return saved;
    if (ids.length !== 1) return "";
    // Merken – sonst fragt das Gerät, sobald ein zweites Display angelegt wird
    local.set("ambiframe-display", ids[0]);
    return ids[0];
  }

  private choose(id: string): void {
    local.set("ambiframe-display", id);
    const url = new URL(location.href);
    url.searchParams.set("display", id);
    history.replaceState(history.state, "", url);
    this.displayId = id;
  }

  /* ───────── Verbindung zu HA ───────── */

  protected updated(): void {
    if (this.hass && !this.unsub) {
      this.unsub = this.hass.connection
        .subscribeMessage<{ config: AmbiframeConfig }>(
          (msg) => {
            // Nach Wiederverbinden (HA-Neustart) kommt dieselbe Konfiguration erneut – dann einfach weiterlaufen
            const text = JSON.stringify(msg.config);
            if (text !== this.configText) {
              this.configText = text;
              this.config = msg.config;
            }
            const id = this.resolveDisplay(msg.config);
            if (id !== this.displayId) this.displayId = id;
            if (this.autoSafe === "Ambiframe nicht erreichbar") this.leaveSafe();
          },
          { type: "ambiframe/config/subscribe" },
        )
        .catch((err: { message?: string }) => {
          // Ohne Konfiguration nur Uhr und Wetter – in einer Minute neu versuchen
          console.warn("Ambiframe nicht erreichbar:", err?.message ?? err);
          this.enterSafe("Ambiframe nicht erreichbar", 60e3);
          window.setTimeout(() => {
            this.unsub = undefined;
            this.requestUpdate();
          }, 60e3);
          return undefined;
        });
    }
    if (this.hass && this.displayId !== this.connectedTo) this.connectDisplay();
    this.disp?.setPaused(this.paused);
    this.firePending();
  }

  private firePending(): void {
    const ev = this.pendingEvent && this.config?.events.find((e) => e.id === this.pendingEvent);
    if (!this.disp || !ev) return;
    this.pendingEvent = "";
    this.disp.fire(ev);
  }

  private connectDisplay(): void {
    this.disconnectDisplay();
    const id = this.displayId;
    this.connectedTo = id;
    if (!this.hass || !id) return;
    // Das Abo erneuert sich nach einem HA-Neustart von selbst
    this.connection = this.hass.connection
      .subscribeMessage<Command>((cmd) => this.onCommand(cmd), {
        type: "ambiframe/display/connect",
        display_id: id,
        client_id: CLIENT_ID,
        name: this.streamMode ? t("Videostream") : deviceName(),
        version: VERSION,
        fully: fullyDeviceId(),
        origin: location.origin,
      })
      .catch(() => undefined);
    this.heartbeat = window.setInterval(() => void this.report(), HEARTBEAT_MS);
  }

  private disconnectDisplay(): void {
    clearInterval(this.heartbeat);
    void this.connection?.then((u) => u?.());
    this.connection = undefined;
    this.connectedTo = "";
  }

  /** Herzschlag: aktuelle Seite und ob der Bildschirm aus ist; die Antwort enthält die installierte Version. */
  private async report(): Promise<void> {
    if (!this.hass || !this.connectedTo) return;
    try {
      const res = await this.hass.callWS<{ version?: string }>({
        type: "ambiframe/display/report",
        display_id: this.connectedTo,
        client_id: CLIENT_ID,
        page: this.disp?.currentPageId ?? null,
        hidden: document.hidden,
        version: VERSION,
        safe: this.safeReason || null,
      });
      this.checkVersion(res?.version);
    } catch {
      /* nächster Versuch beim nächsten Herzschlag */
    }
  }

  private onPage = (): void => void this.report();
  private onVisibility = (): void => void this.report();

  private onCommand(cmd: Command): void {
    const disp = this.disp;
    switch (cmd.command) {
      case "hello":
        this.forcedSafe = !!(cmd as { safe?: boolean }).safe;
        this.paused = !!cmd.paused;
        disp?.setPaused(this.paused);
        this.checkVersion(cmd.version);
        void this.report();
        break;
      case "show_page":
        disp?.showPage(cmd.page);
        break;
      case "next":
        disp?.next();
        break;
      case "pause":
      case "resume":
        this.paused = cmd.command === "pause";
        disp?.setPaused(this.paused);
        break;
      case "reload":
        this.reloadWhenIdle();
        break;
      case "event":
        // Aus dem Dashboard geholt (Bildschirmschoner-Modus) → auslösendes Ereignis zeigen, sobald die Anzeige steht
        this.pendingEvent = cmd.id;
        this.firePending();
        break;
      case "safe":
        this.forcedSafe = cmd.on;
        if (!cmd.on) this.leaveSafe();
        void this.report();
        break;
    }
  }

  /** Neue Ambiframe-Version installiert → einmal neu laden (keine Endlosschleife, falls der Cache hängt). */
  private checkVersion(server?: string): void {
    if (!server || server === VERSION) return;
    try {
      if (sessionStorage.getItem("ambiframe-reloaded-for") === server) return;
      sessionStorage.setItem("ambiframe-reloaded-for", server);
    } catch {
      /* ohne Speicher trotzdem versuchen */
    }
    this.reloadWhenIdle();
  }

  /** Nicht mitten in Klingel, Kamera oder Bedienung neu laden – und nie bei ausgeschaltetem Bildschirm */
  private reloadWhenIdle(): void {
    clearTimeout(this.reloadTimer);
    // Im Videostream (Puppet) ist die Seite nie „sichtbar“ – dort gleich neu laden
    if (document.hidden && !this.streamMode) {
      // Android lässt eine neu geladene Seite bei aus­geschaltetem Bildschirm nicht anlaufen – erst wenn er wieder an ist
      const onVisible = () => {
        if (document.hidden) return;
        document.removeEventListener("visibilitychange", onVisible);
        this.reloadWhenIdle();
      };
      document.addEventListener("visibilitychange", onVisible);
      return;
    }
    if (this.disp?.busy) {
      this.reloadTimer = window.setTimeout(() => this.reloadWhenIdle(), 10e3);
      return;
    }
    // HA liefert das Bundle ohne Cache-Vorgabe – erst frisch holen, sonst lädt der Browser evtl. die alte Fassung neu
    const fresh = fetch(import.meta.url, { cache: "reload" }).catch(() => undefined);
    const timeout = new Promise((r) => setTimeout(r, 8000));
    void Promise.race([fresh, timeout]).then(() => {
      local.set("ambiframe-planned-reload", String(Date.now()));
      location.reload();
    });
  }

  /** Wetter für den Notfallmodus: das erste Wetter-Widget der Konfiguration, sonst irgendeins */
  private get safeWeather(): string {
    for (const page of this.config?.pages ?? []) {
      const w = page.widgets?.find((x) => x.type === "weather" && x.options?.entity);
      if (w) return String(w.options.entity);
    }
    return "";
  }

  render() {
    setLang(resolveLang(effectiveConfig(this.config, this.displayId)?.design.language, this.hass?.language));
    if (this.safeReason) return html`<af-safe .hass=${this.hass} .reason=${this.safeReason} .weather=${this.safeWeather}></af-safe>`;
    if (this.error) return html`<div class="error">${this.error}</div>`;
    if (this.config && !this.displayId) {
      return html`<div class="pick">
        <h1>${t("Welches Display ist das?")}</h1>
        <p>${t("Die Wahl wird auf diesem Gerät gespeichert.")}</p>
        <div class="list">${this.config.displays.map((d) => html`<button @click=${() => this.choose(d.id)}>${d.name}</button>`)}</div>
      </div>`;
    }
    return html`${this.hint ? html`<div class="hint">${t("Einmal tippen für Vollbild")}</div>` : nothing}
      <af-display .hass=${this.hass} .config=${this.config} display-id=${this.displayId} ?stream-mode=${this.streamMode}></af-display>`;
  }
}

define("ambiframe-display-panel", AmbiframeDisplayPanel);
