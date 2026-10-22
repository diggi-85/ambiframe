// Kamera (nativer HA-Stream mit MJPEG-Rückfall) und „HA-Karte“ (beliebige Lovelace-Karte)
import { t } from "../i18n";
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { stateOf } from "../util";
import { AfWidget, define } from "./base";

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{ createCardElement: (config: Record<string, unknown>) => Promise<HTMLElement & { hass?: Hass }> }>;
  }
}

let streamReady: Promise<boolean> | undefined;

/** Sorgt dafür, dass HAs <ha-camera-stream> (WebRTC/HLS) geladen ist – über eine unsichtbare Bildkarte. */
const ensureCameraStream = (hass: Hass, entity: string): Promise<boolean> => {
  if (customElements.get("ha-camera-stream")) return Promise.resolve(true);
  if (!window.loadCardHelpers) return Promise.resolve(false);
  streamReady ??= (async () => {
    try {
      const helpers = await window.loadCardHelpers!();
      const card = await helpers.createCardElement({ type: "picture-entity", entity, camera_view: "live", show_name: false, show_state: false });
      card.hass = hass;
      card.style.cssText = "position:fixed;left:-9999px;width:10px;height:10px;opacity:0;pointer-events:none";
      document.body.appendChild(card);
      const ok = await Promise.race([
        customElements.whenDefined("ha-camera-stream").then(() => true),
        new Promise<boolean>((r) => setTimeout(() => r(false), 8000)),
      ]);
      card.remove();
      return ok;
    } catch {
      return false;
    }
  })();
  return streamReady;
};

/** Art eines Webcam-Links: YouTube, HLS-Stream, MJPEG-Strom oder einzelnes Bild */
export const webcamKind = (url: string): { kind: "youtube" | "hls" | "mjpeg" | "image"; id?: string } => {
  const yt = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", id: yt[1] };
  const channel = url.match(/youtube\.com\/channel\/(UC[\w-]+)/);
  if (channel) return { kind: "youtube", id: `live_stream?channel=${channel[1]}` };
  if (/\.m3u8(\?|$)/i.test(url)) return { kind: "hls" };
  if (/mjpe?g|video\.cgi|faststream|nphMotionJpeg/i.test(url)) return { kind: "mjpeg" };
  return { kind: "image" };
};

/**
 * Einzelbild einer Webcam: Bild-Links direkt, YouTube-Livestreams als Livebild von YouTube (i.ytimg.com).
 * Eingebettete YouTube-Videos verlangen auf Kiosk-Tablets ohne Anmeldung immer wieder eine Bot-Prüfung –
 * das Livebild nicht. Nur Kanal-Livestreams (ohne Video-ID) und HLS/MJPEG bleiben echtes Video.
 */
export const webcamStill = (url: string): string[] | null => {
  const w = webcamKind(url);
  if (w.kind === "image") return [url];
  if (w.kind === "youtube" && w.id && !w.id.startsWith("live_stream")) {
    return [`https://i.ytimg.com/vi/${w.id}/maxresdefault_live.jpg`, `https://i.ytimg.com/vi/${w.id}/hqdefault_live.jpg`];
  }
  return null;
};

/** Fertige Vorschläge für den Editor (öffentlich, geprüft im Oktober 2026) */
export const WEBCAM_PRESETS: [string, string][] = [
  ["https://www.youtube.com/watch?v=w3zcgctSvFA", "Norderney – Hafen und Wattenmeer (Livebild von YouTube)"],
  ["https://www.youtube.com/watch?v=OmyDLXvaus4", "Hamburg – Michel mit Hafenpanorama (Livebild von YouTube)"],
  ["https://www.youtube.com/watch?v=JwEoLt8NXU8", "Hamburg – Stadt (Livebild von YouTube)"],
  ["https://www.youtube.com/watch?v=SZp1Q6LX7Wk", "Cuxhaven-Duhnen – Strand und Watt (Livebild von YouTube)"],
  ["https://www.youtube.com/watch?v=EH6GNSEvmQE", "Renesse – Strand (Livebild von YouTube)"],
  ["https://webcam.datacreate.de/hasenhorn/webcam-hasenhorn.jpg", "Todtnau im Schwarzwald – Ort und Hasenhorn (Bild)"],
  ["https://imgproxy.windy.com/_/full/plain/current/1615294555/original.jpg", "Amrum – Nebel, Blick aufs Wattenmeer und die Halligen (Bild)"],
  ["https://imgproxy.windy.com/_/full/plain/current/1279200146/original.jpg", "Feldberg im Schwarzwald – Todtnauer Hütte (Bild)"],
  ["https://imgproxy.windy.com/_/full/plain/current/1595461776/original.jpg", "Bostalsee im Saarland – Westufer mit Segelhafen (Bild)"],
  ["https://www.foto-webcam.eu/webcam/zugspitze/current/1200.jpg", "Zugspitze (Bild, alle 10 min)"],
  ["https://www.foto-webcam.eu/webcam/wendelstein-ost/current/1200.jpg", "Wendelstein Ost (Bild, alle 10 min)"],
  ["https://www.foto-webcam.eu/webcam/herzogstand/current/1200.jpg", "Herzogstand – Kochel- und Walchensee (Bild)"],
  ["https://www.foto-webcam.eu/webcam/muenchen/current/1200.jpg", "München – Panorama (Bild)"],
];

/**
 * Livebild einer Kamera. Eigenschaften: hass, entity, mode (live | snapshot), osd (Text für den Demo-Platzhalter),
 * url (Webcam-Link statt HA-Kamera), refresh (Standbild neu laden, Sekunden).
 * Reihenfolge: HA-Stream (WebRTC/HLS) → MJPEG über camera_proxy_stream → Platzhalter.
 * Live wird nie „vorab“ per MJPEG geöffnet: Jede MJPEG-Verbindung startet bei vielen Kameras (z. B. Tapo) eine eigene
 * Verbindung zur Kamera, und die schaffen oft nur 2 gleichzeitig – bei mehreren Displays kam dann der Platzhalter.
 * HAs Stream teilt sich dagegen eine Verbindung unter allen Betrachtern. MJPEG nur, wenn HAs Player fehlt.
 */
export class AfCameraView extends LitElement {
  static properties = {
    hass: { attribute: false },
    entity: {},
    url: {},
    mode: {},
    osd: {},
    refresh: { type: Number },
    native: { state: true },
    shown: { state: true },
    broken: { state: true },
  };

  static styles = css`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
    img,
    ha-camera-stream,
    .ph {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    ha-camera-stream {
      --video-max-height: 100%;
    }
    /* YouTube füllt die Fläche wie object-fit: cover */
    :host {
      container-type: size;
    }
    iframe {
      position: absolute;
      left: 50%;
      top: 50%;
      width: max(100cqw, 177.78cqh);
      height: max(100cqh, 56.25cqw);
      transform: translate(-50%, -50%);
      border: 0;
      pointer-events: none;
    }
    video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ph {
      background: radial-gradient(ellipse 34% 50% at 50% 58%, rgba(190, 205, 195, 0.16), transparent 70%),
        linear-gradient(180deg, #1d2522 0%, #131916 55%, #0c100e 100%);
    }
    .ph::before {
      content: "";
      position: absolute;
      left: 41%;
      top: 22%;
      width: 18%;
      height: 62%;
      border-radius: 8px 8px 0 0;
      background: linear-gradient(180deg, #2e3934, #1c2420);
      box-shadow: 0 0 0 12px rgba(255, 255, 255, 0.025), inset 0 0 40px rgba(0, 0, 0, 0.45);
    }
    .ph span {
      position: absolute;
      right: 24px;
      top: 22px;
      font: 500 13px/1 ui-monospace, Menlo, monospace;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 0.06em;
    }
  `;

  hass?: Hass;
  entity?: string;
  url?: string;
  /** Webcam-Bild, das gerade angezeigt wird – das nächste wird erst vorgeladen */
  private shown?: string;
  mode: "live" | "snapshot" = "live";
  osd = "";
  refresh = 0;
  private refreshTimer?: number;
  private native = false;
  /** HAs Videoplayer (ha-camera-stream) ließ sich nicht laden – dann MJPEG als Rückfall */
  private nativeFailed = false;
  private src?: string;
  /** Bild ließ sich nicht laden (Kamera weg, Schlüssel abgelaufen) – Platzhalter statt Safaris „zerrissenem Blatt“ */
  private broken = false;
  private retryTimer?: number;

  private onBroken = (): void => {
    if (!this.isConnected) return; // beim Abbau setzt disconnectedCallback die Quelle bewusst auf „data:,“
    this.broken = true;
    this.src = undefined; // beim nächsten Versuch mit frischem Zugriffsschlüssel
    clearTimeout(this.retryTimer);
    this.retryTimer = window.setTimeout(() => (this.broken = false), 20e3);
  };

  private onLoaded = (): void => {
    if (this.broken) this.broken = false;
  };

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("entity")) this.src = undefined;
    if (changed.has("url")) {
      this.shown = undefined;
      if (this.url && webcamStill(this.url)) this.loadWebcamImage();
    }
    if (changed.has("refresh") || changed.has("url")) {
      clearInterval(this.refreshTimer);
      const every = this.url ? this.refresh || 60 : this.refresh;
      if (every > 0) {
        this.refreshTimer = window.setInterval(() => {
          if (this.url) this.loadWebcamImage();
          else {
            this.src = undefined;
            this.requestUpdate();
          }
        }, every * 1000);
      }
    }
    if (this.hass && this.entity && !this.url && this.mode === "live" && !this.native && !this.nativeFailed) {
      // Schon geladen: sofort nutzen (sonst stünde für einen Moment doch ein MJPEG-Bild)
      if (customElements.get("ha-camera-stream")) this.native = true;
      else
        void ensureCameraStream(this.hass, this.entity).then((ok) => {
          if (ok) this.native = true;
          else this.nativeFailed = true;
          this.requestUpdate();
        });
    }
  }

  /** Webcam-Bild erst laden, dann tauschen – kein Flackern, und bei Fehlern bleibt das alte Bild stehen */
  private loadWebcamImage(candidates = this.url ? webcamStill(this.url) : null): void {
    const url = this.url;
    if (!url || !candidates?.length) return;
    const [first, ...rest] = candidates;
    const next = `${first}${first.includes("?") ? "&" : "?"}_=${Math.floor(Date.now() / 1000)}`;
    const img = new Image();
    img.onload = () => {
      if (this.url === url) this.shown = next;
    };
    // z. B. kein HD-Livebild → kleineres versuchen
    img.onerror = () => {
      if (this.url === url && rest.length) this.loadWebcamImage(rest);
    };
    img.src = next;
  }

  private renderWebcam(url: string) {
    if (webcamStill(url)) return this.shown ? html`<img src=${this.shown} alt="" />` : html`<div class="ph"><span>${this.osd}</span></div>`;
    const w = webcamKind(url);
    switch (w.kind) {
      case "youtube": {
        const live = w.id!.startsWith("live_stream");
        const params = "autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3";
        const src = live ? `https://www.youtube-nocookie.com/embed/${w.id}&${params}` : `https://www.youtube-nocookie.com/embed/${w.id}?${params}&loop=1&playlist=${w.id}`;
        return html`<iframe src=${src} allow="autoplay; encrypted-media" title="Webcam"></iframe>`;
      }
      case "hls":
        return html`<video src=${url} autoplay muted playsinline loop></video>`;
      case "mjpeg":
        return this.broken ? this.renderBroken() : html`<img src=${url} alt="" @error=${this.onBroken} />`;
      default:
        return this.shown ? html`<img src=${this.shown} alt="" />` : html`<div class="ph"><span>${this.osd}</span></div>`;
    }
  }

  private renderBroken() {
    return html`<div class="ph"><span>${this.osd}</span></div>`;
  }

  render() {
    if (this.url) return this.renderWebcam(this.url);
    const s = stateOf(this.hass, this.entity);
    if (this.broken) return this.renderBroken();
    // image.* (z. B. Modellbild des 3D-Druckers): ganzes Bild zeigen, nicht beschneiden
    if (s && this.entity?.startsWith("image.")) {
      const pic = s.attributes.entity_picture as string | undefined;
      return pic
        ? html`<img src=${pic} alt="" style="object-fit:contain;background:var(--af-surface)" @error=${this.onBroken} @load=${this.onLoaded} />`
        : html`<div class="ph"><span>${this.osd}</span></div>`;
    }
    if (!s) return html`<div class="ph"><span>${this.osd}</span></div>`;
    if (this.mode === "live" && this.native) {
      return html`<ha-camera-stream .hass=${this.hass} .stateObj=${s} .muted=${true} .controls=${false} .fitMode=${"cover"} allow-exoplayer></ha-camera-stream>`;
    }
    // Live: auf HAs Player warten statt eine eigene MJPEG-Verbindung zur Kamera zu öffnen
    if (this.mode === "live" && !this.nativeFailed) return html`<div class="ph"><span>${this.osd || t("Kamera wird verbunden …")}</span></div>`;
    // Token nur einmal übernehmen, sonst baut sich der Stream bei jedem Token-Wechsel neu auf
    const token = s.attributes.access_token as string | undefined;
    if (!this.src && token) {
      const path = this.mode === "live" ? "camera_proxy_stream" : "camera_proxy";
      this.src = `/api/${path}/${this.entity}?token=${token}${this.mode === "snapshot" ? `&t=${Date.now()}` : ""}`;
    }
    return this.src ? html`<img src=${this.src} alt="" @error=${this.onBroken} @load=${this.onLoaded} />` : html`<div class="ph"><span>${this.osd}</span></div>`;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // MJPEG-Verbindung sofort beenden
    this.renderRoot.querySelector("img")?.setAttribute("src", "data:,");
    clearInterval(this.refreshTimer);
    clearTimeout(this.retryTimer);
    this.src = undefined;
  }
}

/** Kamera als Widget. Optionen: entity oder url (Webcam), mode (live | snapshot), refresh (s), radius (px), title, text (Entität für die Unterschrift). */
class AfCamera extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
      }
      af-camera-view {
        border-radius: var(--af-radius, 28px);
      }
      .cap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px 22px 18px;
        border-radius: 0 0 var(--af-radius, 28px) var(--af-radius, 28px);
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
        color: #fff;
      }
      .cap b {
        display: block;
        font-size: calc(19px * var(--af-fs, 1));
        font-weight: 500;
      }
      .cap span {
        display: block;
        font-size: calc(16px * var(--af-fs, 1));
        opacity: 0.8;
        margin-top: 4px;
      }
    `,
  ];

  protected shouldUpdate(): boolean {
    return true;
  }

  render() {
    const radius = this.options.radius ?? 28;
    const o = this.options;
    const textState = o.text ? this.hass?.states[o.text] : undefined;
    const raw = textState?.state;
    // Übersetzt wie im HA-Dashboard, z. B. „printing“ → „Druckt“
    const text = textState && raw && raw !== "unknown" && raw !== "unavailable" ? (this.hass?.formatEntityState?.(textState) ?? raw) : undefined;
    return html`<af-camera-view style="--af-radius:${radius}px" .hass=${this.hass} .entity=${o.url ? undefined : o.entity} .url=${o.url}
        .mode=${o.mode ?? "live"} .refresh=${Number(o.refresh ?? 0)} .osd=${o.url ? "WEBCAM" : "KAMERA"}></af-camera-view>
      ${o.title || text ? html`<div class="cap">${o.title ? html`<b>${o.title}</b>` : ""}${text ? html`<span>${text}</span>` : ""}</div>` : ""}`;
  }
}

/** Beliebige Lovelace-Karte als Widget. Optionen: card (Karten-Konfiguration wie im Dashboard). */
class AfCard extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        --ha-card-background: var(--af-surface);
        --card-background-color: var(--af-surface);
        --ha-card-border-color: var(--af-line);
        --ha-card-border-radius: 28px;
        --ha-card-box-shadow: none;
        --primary-text-color: var(--af-ink);
        --secondary-text-color: var(--af-ink-2);
        --primary-color: var(--af-accent);
        --state-icon-color: var(--af-accent);
        --divider-color: var(--af-line);
        overflow: hidden;
      }
      .hint {
        color: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
      }
    `,
  ];

  private card?: HTMLElement & { hass?: Hass };
  private cardKey = "";
  private error = "";

  protected shouldUpdate(): boolean {
    return true;
  }

  protected updated(): void {
    const key = JSON.stringify(this.options.card ?? null);
    if (key !== this.cardKey) {
      this.cardKey = key;
      void this.createCard();
    }
    if (this.card && this.hass) this.card.hass = this.hass;
  }

  private async createCard(): Promise<void> {
    const config = this.options.card;
    this.card = undefined;
    this.error = "";
    if (!config?.type) {
      this.error = t("Keine Karte konfiguriert");
    } else if (!window.loadCardHelpers) {
      this.error = t("Karte „{type}“ (nur in Home Assistant sichtbar)", { type: String(config.type) });
    } else {
      try {
        const helpers = await window.loadCardHelpers();
        this.card = await helpers.createCardElement(config);
        this.card.hass = this.hass;
      } catch (err) {
        this.error = t("Karte nicht ladbar: {error}", { error: String(err) });
      }
    }
    this.requestUpdate();
  }

  render() {
    return this.card ?? (this.error ? html`<div class="hint">${this.error}</div>` : nothing);
  }
}

define("af-camera-view", AfCameraView);
define("af-camera", AfCamera);
define("af-card", AfCard);
