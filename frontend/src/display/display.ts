// Die Anzeige: Wiedergabeliste, Ereignisse (Vollbild, Bild-im-Bild, Hinweis), Nacht und Bedienmodus
import { locale, resolveLang, setLang, t } from "../i18n";
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { repeat } from "lit/directives/repeat.js";
import { ForecastStore, PhotoProvider, preload, type DisplayContext } from "../data";
import { fontStack } from "../fonts";
import { MDI_MAP, iconSvg } from "../icons";
import { THEMES, normalizeTheme, themeTokens } from "../styles";
import type { DisplayConfig, EventConfig, Hass, HassEntity, PageConfig, Photo, TapAction, TransitionConfig, AmbiframeConfig } from "../types";
import { triggered } from "../events";
import { playSound, stopSound } from "../sound";
import { checkCondition, checkConditions, customStyle, duration, effectiveConfig, fmt, fmtTime } from "../util";
import { define } from "../widgets/base";
import "../widgets/media";
import { BASE, gridFor, type Grid, type Orientation } from "./grid";
import "./page";
import { leaveToDashboard } from "./leave";

interface Layer {
  key: number;
  page: PageConfig;
  photo: Photo | null;
  leaving: boolean;
  /** Übergang: beim Erscheinen der eigene, beim Verschwinden der der nachfolgenden Seite */
  trans: TransitionConfig;
}

/** Sanfter Standard: erst ausblenden, dann einblenden, zusammen 2,4 s */
export const DEFAULT_TRANSITION: TransitionConfig = { type: "fade", duration: 2.4 };
interface Overlay {
  ev: EventConfig;
  at: Date;
  secs: number;
  seq: number;
}
interface PipOverlay extends Overlay {
  text: string;
}
interface NoticeOverlay extends Overlay {
  duration?: number;
  cost?: number | null;
}
interface Chip {
  id: string;
  icon?: string;
  text: string;
  at: Date;
  /** Zeitpunkt (ms), ab dem die Erinnerung verschwindet; fehlt = bis angetippt */
  until?: number;
}
/** Eintrag der Mitteilungszentrale (was auf diesem Display erschienen ist) */
interface HistoryEntry {
  id: string;
  kind: string;
  icon?: string;
  title: string;
  where?: string;
  at: number;
}
/** Ein Ereignis zeigt eine Seite anstelle der Wiedergabeliste. */
interface Takeover {
  ev: EventConfig;
  firstAt: number;
  lastAt: number;
  test: boolean;
}
interface MediaOverlay extends Overlay {
  entity: string;
  style: "card" | "fullscreen";
  key: string;
  /** Beispieldaten für „Testen“, wenn gerade nichts läuft */
  demo?: HassEntity;
}

/** Alle Auslöser eines Ereignisses: `entity` plus `entities`, ohne Doppelte. */
const triggersOf = (ev: EventConfig): string[] => [...new Set([ev.entity, ...(ev.entities ?? [])].filter((e): e is string => !!e))];

/** Kennung des laufenden Titels – leer, wenn nichts mit Titel spielt. */
const mediaKey = (s?: HassEntity): string => {
  const title = s?.state === "playing" ? s.attributes.media_title : undefined;
  return title ? `${title}|${s!.attributes.media_artist ?? ""}` : "";
};

const DEMO_TRACK = (entity: string): HassEntity => ({
  entity_id: entity,
  state: "playing",
  attributes: {
    friendly_name: "Küche",
    media_title: "Harvest Moon",
    media_artist: "Neil Young",
    media_album_name: "Harvest Moon",
    media_duration: 303,
    media_position: 74,
    media_position_updated_at: new Date().toISOString(),
  },
  last_changed: new Date().toISOString(),
  last_updated: new Date().toISOString(),
});

const clock = (secs: number): string => `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, "0")}`;

const NIGHT_FALLBACK: PageConfig = {
  id: "__nacht",
  name: "Nacht",
  duration: 60,
  background: { type: "none" },
  palette: "night",
  widgets: [
    { id: "uhr", type: "clock", x: 3, y: 3, w: 6, h: 2, options: { align: "center", valign: "end" } },
    { id: "datum", type: "date", x: 3, y: 5, w: 6, h: 1, options: { align: "center" } },
  ],
};

const readLocal = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const writeLocal = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* privates Fenster – dann eben nur bis zum Neuladen */
  }
};

interface FullyScreen {
  turnScreenOff?: (keepAlive?: boolean) => void;
  getScreenBrightness?: () => number;
  setScreenBrightness?: (level: number) => void;
}

/** So lange bleibt eine von Hand gewählte Seite (Pfeile), bevor die Wiedergabe weiterläuft */
const MANUAL_HOLD_S = 30;

const icon = (name?: string) => iconSvg(name ? MDI_MAP[name] ?? name : undefined);

/** Fully Kiosk: Bildschirm wecken, falls die JavaScript-Schnittstelle aktiv ist. */
const fully = () => (window as unknown as { fully?: { turnScreenOn?: () => void; stopScreensaver?: () => void } }).fully;

const wakeScreen = () => {
  try {
    fully()?.turnScreenOn?.();
  } catch {
    /* kein Fully */
  }
};

export class AfDisplay extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false, noAccessor: true },
    displayId: { attribute: "display-id" },
    /** Gerendert für den Videostream (Puppet): ohne Bedienelemente */
    streamMode: { type: Boolean, attribute: "stream-mode" },
    shift: { state: true },
    preview: { type: Boolean },
    fixedPage: { attribute: false },
    speed: { type: Number },
    theme: { reflect: true },
    mode: { reflect: true },
    modeOverride: { attribute: false },
    orient: { reflect: true },
    forceOrientation: { attribute: false },
    grid: { state: true },
    evening: { type: Boolean, reflect: true },
    dimming: { state: true },
    layers: { state: true },
    alarm: { state: true },
    pip: { state: true },
    notice: { state: true },
    media: { state: true },
    chips: { state: true },
    chipsOpen: { state: true },
    historyOpen: { state: true },
    controlOpen: { state: true },
    controlLeft: { state: true },
    popup: { state: true },
    ask: { state: true },
    menu: { state: true },
    toast: { state: true },
    scale: { state: true },
    night: { state: true },
  };

  hass?: Hass;
  displayId?: string;
  streamMode = false;
  /** OLED-Schutz: aktueller Versatz in Bühnen-Pixeln */
  private shift: [number, number] = [0, 0];
  private shiftTimer?: number;
  private shiftStep = 0;
  /** Wie übergeben – `config` ist dieselbe Konfiguration mit den Vorgaben des Displays (Design, Fotos) */
  private rawConfig?: AmbiframeConfig;
  private effConfig?: AmbiframeConfig;
  /** Für welches Display effConfig berechnet ist */
  private effFor = "";

  get config(): AmbiframeConfig | undefined {
    return this.effConfig;
  }

  set config(value: AmbiframeConfig | undefined) {
    // Lit setzt Objekte bei jedem Neuzeichnen erneut – dieselbe Konfiguration ist keine Änderung
    if (value === this.rawConfig) return;
    const old = this.effConfig;
    this.rawConfig = value;
    this.effConfig = effectiveConfig(value, this.displayId);
    this.effFor = `${this.displayId}`;
    this.requestUpdate("config", old);
  }
  preview = false;
  fixedPage: string | null = null;
  speed = 1;
  theme = "ruhig";
  /** Aufgelöst: hell oder dunkel */
  mode: "light" | "dark" = "dark";
  /** Editor-Vorschau: hell/dunkel erzwingen */
  modeOverride?: "light" | "dark";
  /** Aufgelöst: quer oder hoch (als Attribut für Overlay-Stile) */
  orient: Orientation = "landscape";
  /** Editor-Vorschau: Ausrichtung erzwingen */
  forceOrientation?: Orientation;
  private grid: Grid = BASE.landscape;
  evening = false;
  private dimming = false;
  private modeTimer?: number;
  /** Über HA pausiert: die Wiedergabeliste bleibt stehen */
  private paused = false;
  /** Antippen: Pop-up mit Karte, Rückfrage und kurze Rückmeldung */
  private popup?: { action: TapAction; seq: number };
  private popupTimer?: number;
  private ask?: { text: string; answer: (yes: boolean) => void };
  private toast?: { text: string; seq: number; bad?: boolean };
  private toastTimer?: number;
  private ringTimer?: number;
  /** Ereignis, dessen Ton gerade (wiederholt) spielt */
  private ringFor = "";
  private pausedPage?: string;

  private layers: Layer[] = [];
  private alarm?: Overlay;
  private pip?: PipOverlay;
  private notice?: NoticeOverlay;
  private media?: MediaOverlay;
  private chips: Chip[] = [];
  private chipsOpen = false;
  /** Mitteilungszentrale: Einträge, für welches Display geladen, offen, Timer zum Schließen */
  private history: HistoryEntry[] = [];
  private historyLoaded = "";
  private historyOpen = false;
  private historyTimer?: number;
  private chipsTimer?: number;
  /** Mini-Karte: aktueller Titel (Ereignis|Titel) und seit wann er gezeigt wird; ob sie gerade zu sehen ist */
  private miniKey = "";
  private miniSince = 0;
  private miniShown = false;
  private controlOpen = false;
  /** Schnellmenü (lang auf eine freie Stelle drücken) */
  private menu = false;
  private menuTimer?: number;
  private pressTimer?: number;
  private pressAt?: { x: number; y: number };
  private swallowTap = false;
  /** Töne von Hand stumm bis zu diesem Zeitpunkt (ms) */
  private muteUntil = Number(readLocal("ambiframe-mute-until") ?? 0);
  private controlLeft = 0;
  private scale = 1;
  private night = false;

  private started = false;
  private idx = -1;
  private seq = 0;
  private layerSeq = 0;
  private rotationTimer?: number;
  private alarmTimer?: number;
  private pipTimer?: number;
  private noticeTimer?: number;
  private controlTimer?: number;
  private takeover?: Takeover;
  private takeoverTimer?: number;
  private mediaTimer?: number;
  private mediaQueue?: number;
  private mediaTicker?: number;
  private mediaPoll?: number;
  private miniTicker?: number;
  private lastMediaKey = "";
  private lastMediaAt = 0;
  private mediaShown = new Map<string, number>();
  private lastFired = new Map<string, number>();
  private resize?: ResizeObserver;
  private forecasts = new ForecastStore();
  private photos = new PhotoProvider(
    () => this.hass,
    () => this.config?.photos,
  );
  private ctx?: DisplayContext;

  get display(): DisplayConfig | undefined {
    return this.config?.displays.find((d) => d.id === this.displayId) ?? this.config?.displays[0];
  }

  private pageById(id?: string): PageConfig | undefined {
    return this.config?.pages.find((p) => p.id === id);
  }

  connectedCallback(): void {
    super.connectedCallback();
    // In der HA-App (iPad/iPhone) liegt in einer Ecke das Zahnrad für die Kiosk-Einstellungen
    if (/Home ?Assistant\//.test(navigator.userAgent)) this.setAttribute("app", "");
    this.resize = new ResizeObserver(() => this.measure());
    this.resize.observe(this);
    this.mediaPoll = window.setInterval(() => this.mediaTick(), 15e3);
    // Mini-Karte: Fortschritt nachführen und nach der Pause wieder ausblenden
    this.miniTicker = window.setInterval(() => {
      if (this.nowPlaying() || this.miniShown) this.requestUpdate();
      this.pruneChips();
    }, 5e3);
    if (this.started) this.restart();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize?.disconnect();
    for (const t of [this.menuTimer, this.pressTimer, this.rotationTimer, this.alarmTimer, this.pipTimer, this.noticeTimer, this.takeoverTimer, this.mediaTimer, this.mediaQueue, this.popupTimer, this.toastTimer]) clearTimeout(t);
    for (const t of [this.shiftTimer, this.controlTimer, this.mediaTicker, this.mediaPoll, this.miniTicker, this.ringTimer]) clearInterval(t);
  }

  /** Ausrichtung und Bühnengröße aus dem Platz, den das Display hat – auch nach dem Drehen des Geräts */
  private measure(): void {
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const wanted = this.forceOrientation ?? this.display?.orientation;
    const orient: Orientation = wanted === "portrait" || wanted === "landscape" ? wanted : aspect < 1 ? "portrait" : "landscape";
    const grid = gridFor(orient, aspect);
    const scale = Math.min(width / grid.w, height / grid.h);
    if (orient !== this.orient) this.orient = orient;
    if (grid.w !== this.grid.w || grid.h !== this.grid.h) this.grid = grid;
    if (scale > 0 && Math.abs(scale - this.scale) > 0.0005) this.scale = scale;
  }

  /* ───────── Lebenszyklus ───────── */

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("displayId") && this.effFor !== `${this.displayId}`) {
      // Display-ID kam nach der Konfiguration: dessen Vorgaben (Design, Fotos) jetzt einrechnen
      if (!changed.has("config")) changed.set("config", this.effConfig);
      this.effConfig = effectiveConfig(this.rawConfig, this.displayId);
      this.effFor = `${this.displayId}`;
    }
    // Sprache vor allem anderen – die Widgets zeichnen danach
    setLang(resolveLang(this.config?.design.language, this.hass?.language));
    if (changed.has("config") || changed.has("forceOrientation") || changed.has("displayId")) this.measure();
    if (changed.has("hass")) {
      this.forecasts.setHass(this.hass);
      const old = changed.get("hass") as Hass | undefined;
      if (old && this.hass && this.started) this.processChanges(old, this.hass);
    }
    const d = this.display;
    const design = this.config?.design;
    const resolved = normalizeTheme(d?.theme ?? design?.theme);
    this.theme = resolved.theme;
    if (changed.has("config") || changed.has("preview") || changed.has("displayId") || changed.has("streamMode")) {
      const a = design?.ambient;
      const ambient = { type: a?.type ?? THEMES.find((t) => t.id === resolved.theme)?.ambient ?? "none", strength: a?.strength ?? 1, speed: a?.speed ?? "slow" };
      // Laufband: im Videostream steht es (Einzelbilder), auf dem Fernseher ruckelt es – dort ohne eigene Wahl aus
      const ticker = !this.streamMode && (d?.ticker ?? d?.profile !== "tv");
      this.ctx = this.config ? { forecasts: this.forecasts, config: this.config, preview: this.preview, ambient, displayId: d?.id, ticker } : undefined;
      if (changed.has("config")) this.photos.reload();
    }
    this.applyMode(resolved.light);
    this.updateShift();
    const nightEntity = d?.night?.entity;
    const night = !!nightEntity && this.hass?.states[nightEntity]?.state === "on";

    if (!this.started && this.hass && this.config && d) {
      this.started = true;
      this.night = night;
      this.restart();
    } else if (this.started && this.fixedPage && changed.has("config") && !changed.has("fixedPage") && night === this.night) {
      const page = this.pageById(this.fixedPage);
      if (page) this.layers = this.layers.map((l) => (l.leaving ? l : { ...l, page }));
    } else if (this.started && (night !== this.night || changed.has("config") || changed.has("fixedPage") || changed.has("displayId"))) {
      this.night = night;
      this.restart();
    }
  }

  /** Hell oder dunkel: fest, nach Sonne oder im Editor erzwungen. Wechsel im Betrieb werden weich überblendet. */
  private applyMode(legacyLight: boolean): void {
    const design = this.config?.design;
    const sunDown = this.hass?.states["sun.sun"]?.state === "below_horizon";
    const wanted = this.display?.mode ?? design?.mode ?? (legacyLight ? "light" : "auto");
    const next = this.modeOverride ?? (wanted === "auto" ? (sunDown ? "dark" : "light") : wanted);
    const evening = design?.evening !== "off" && sunDown && next === "dark";
    if (next === this.mode) {
      if (!this.modeTimer) this.evening = evening;
      return;
    }
    if (!this.started || this.preview) {
      clearTimeout(this.modeTimer);
      this.modeTimer = undefined;
      this.dimming = false;
      this.mode = next;
      this.evening = evening;
      return;
    }
    if (this.modeTimer) return; // Wechsel läuft schon
    this.dimming = true;
    this.modeTimer = window.setTimeout(() => {
      this.modeTimer = undefined;
      this.dimming = false;
      this.requestUpdate(); // in willUpdate erneut auflösen – dann sofort
      this.mode = next;
      this.evening = evening;
    }, 1600);
  }

  protected updated(): void {
    // Akzentfarbe und Schriften aus dem Design direkt am Host – so gelten sie auch für abgeleitete Werte
    const design = this.config?.design;
    const set = (name: string, value?: string) => (value ? this.style.setProperty(name, value) : this.style.removeProperty(name));
    const c = design?.colors?.[this.mode] ?? {};
    const mix = (color: string | undefined, pct: number) => (color ? `color-mix(in srgb, ${color} ${pct}%, transparent)` : undefined);
    // Lesbarkeit: kleinere Texte größer, gedämpfte Schrift kräftiger (Display vor Design)
    const size = this.display?.text_size ?? design?.text_size ?? "normal";
    set("--af-fs", size === "large" ? "1.15" : size === "xlarge" ? "1.3" : undefined);
    const high = (this.display?.contrast ?? design?.contrast) === "high";
    set("--af-c2", high ? "0.9" : undefined);
    set("--af-c3", high ? "0.72" : undefined);
    const ink = c.ink ?? (high ? "var(--af-ink)" : undefined);
    set("--af-accent", c.accent ?? design?.accent);
    set("--af-accent-soft", mix(c.accent ?? design?.accent, 14));
    set("--af-bg", c.bg);
    set("--af-bg-art", c.bg ? "none" : undefined);
    set("--af-ink", c.ink);
    set("--af-ink-2", mix(ink, high ? 86 : 66));
    set("--af-ink-3", mix(ink, high ? 66 : 40));
    set("--af-line", mix(ink, high ? 20 : 12));
    set("--af-surface", mix(c.ink, 5));
    set("--af-card", c.card ? mix(c.card, Number(c.card_opacity ?? 100)) : undefined);
    set("--af-good", c.good);
    set("--af-alert", c.alert);
    set("--af-cold", c.cold);
    set("--af-card-radius", design?.radius != null ? `${design.radius}px` : undefined);
    set("--af-display", fontStack(design?.fonts?.display));
    set("--af-sans", fontStack(design?.fonts?.text));
    // Eigenes CSS als letzter Stil im Shadow-DOM
    customStyle(this.renderRoot, design?.css);
  }

  /** Übergang einer Seite: Seite > Display > Design > Standard */
  private transitionFor(page: PageConfig): TransitionConfig {
    const t = { ...DEFAULT_TRANSITION, ...this.config?.design.transition, ...this.display?.transition, ...page.transition };
    const duration = Math.max(0.2, Math.min(10, Number(t.duration) || DEFAULT_TRANSITION.duration));
    return { type: t.type ?? "fade", duration: this.preview ? Math.min(0.5, duration) : duration };
  }

  /* ───────── Wiedergabeliste ───────── */

  private restart(): void {
    // Nacht, neue Konfiguration oder anderes Display: eine Ereignis-Seite endet hier
    clearTimeout(this.takeoverTimer);
    this.takeover = undefined;
    this.idx = -1;
    this.next();
  }

  /** Nächste sichtbare Seite der Wiedergabeliste – Seiten mit unerfüllter Bedingung werden übersprungen. */
  next(): void {
    this.step(1);
  }

  /** Vorherige sichtbare Seite (Pfeil links) */
  prev(): void {
    this.step(-1);
  }

  /** Mit den Pfeilen geblättert: die gewählte Seite bleibt so lange stehen, dann geht es automatisch weiter */
  private browse(dir: 1 | -1): void {
    this.step(dir, MANUAL_HOLD_S);
  }

  private step(dir: 1 | -1, hold?: number): void {
    clearTimeout(this.rotationTimer);
    const d = this.display;
    if (!d || this.takeover) return;
    if (this.fixedPage) {
      const page = this.pageById(this.fixedPage);
      if (page) void this.show(page);
      return;
    }
    if (this.night) {
      void this.show(this.pageById(d.night?.page) ?? NIGHT_FALLBACK);
      return;
    }
    const list = d.playlist;
    const where = { display: d.id, orientation: this.orient };
    for (let i = 0; i < list.length; i++) {
      this.idx = (((this.idx < 0 && dir < 0 ? 0 : this.idx) + dir) % list.length + list.length) % list.length;
      const item = list[this.idx];
      const page = this.pageById(item.page);
      if (page && checkConditions(this.hass, item.show_if, where) && checkConditions(this.hass, page.show_if, where)) {
        void this.show(page);
        if (this.paused) this.pausedPage = page.id;
        else this.rotationTimer = window.setTimeout(() => this.next(), (hold ?? item.duration ?? page.duration ?? 30) * 1000 * this.speed);
        return;
      }
    }
    // Keine Seite erfüllt ihre Bedingung: in einer Minute erneut versuchen
    this.rotationTimer = window.setTimeout(() => this.next(), 60e3);
  }

  /* ───────── Steuerung aus Home Assistant ───────── */

  /** Seite der gerade sichtbaren Ebene */
  get currentPageId(): string | undefined {
    return this.layers.filter((l) => !l.leaving).at(-1)?.page.id;
  }

  /** Läuft gerade etwas, das ein Neuladen stören würde? */
  get busy(): boolean {
    return !!(this.alarm || this.pip || this.notice || this.takeover || this.media || this.controlOpen || this.popup || this.ask);
  }

  /** Seite zeigen – für ihre normale Dauer, danach geht die Wiedergabeliste dort weiter (außer pausiert). */
  showPage(id: string): void {
    const page = this.pageById(id);
    if (!page) return;
    clearTimeout(this.rotationTimer);
    clearTimeout(this.takeoverTimer);
    this.takeover = undefined;
    const list = this.display?.playlist ?? [];
    const i = list.findIndex((p) => p.page === id);
    if (i >= 0) this.idx = i;
    void this.show(page);
    if (this.paused) this.pausedPage = id;
    else this.rotationTimer = window.setTimeout(() => this.next(), ((i >= 0 ? list[i].duration : undefined) ?? page.duration ?? 30) * 1000 * this.speed);
  }

  /** Pause: aktuelle Seite bleibt. Beim Fortsetzen läuft sie noch einmal ihre Dauer, dann geht es weiter. */
  setPaused(paused: boolean): void {
    if (paused === this.paused) return;
    this.paused = paused;
    this.requestUpdate(); // Schnellmenü zeigt „Anhalten“ bzw. „Weiter abspielen“
    clearTimeout(this.rotationTimer);
    if (paused) {
      this.pausedPage = this.currentPageId;
      return;
    }
    this.pausedPage = undefined;
    if (this.takeover || this.night || this.fixedPage) return;
    const page = this.pageById(this.currentPageId);
    this.rotationTimer = window.setTimeout(() => this.next(), (page?.duration ?? 30) * 1000 * this.speed);
  }

  private async show(page: PageConfig): Promise<void> {
    const key = ++this.layerSeq;
    let photo: Photo | null = null;
    if (page.background?.type === "photo") {
      photo = await this.photos.next();
      if (photo && !(await preload(photo.url))) {
        // z. B. abgelaufene iCloud-Adresse – Liste neu holen und einmal neu versuchen
        this.photos.reload();
        photo = await this.photos.next();
        if (photo && !(await preload(photo.url))) photo = null;
      }
    }
    if (key !== this.layerSeq) return; // inzwischen überholt
    const trans = this.transitionFor(page);
    this.layers = [...this.layers.filter((l) => !l.leaving).map((l) => ({ ...l, leaving: true, trans })), { key, page, photo, leaving: false, trans }];
    window.setTimeout(() => {
      this.layers = this.layers.filter((l) => !l.leaving || l.key > key);
    }, trans.duration * 1000 + 150);
    // Für HA (Entität „Seite“) und den Herzschlag
    this.dispatchEvent(new CustomEvent("af-page", { detail: page.id, bubbles: true, composed: true }));
  }

  /* ───────── Ereignisse ───────── */

  private eventsForDisplay(): EventConfig[] {
    const d = this.display;
    if (!d || !this.config) return [];
    return this.config.events.filter(
      (ev) => ev.enabled !== false && (d.events === "all" || d.events.includes(ev.id)) && (!ev.displays || ev.displays.includes(d.id)),
    );
  }

  private processChanges(old: Hass, nu: Hass): void {
    // Vorschauen mit fester Seite (Stil-Kacheln, Seiten-Editor) reagieren nicht auf echte Ereignisse
    if (this.fixedPage) return;
    for (const ev of this.eventsForDisplay()) {
      for (const id of triggersOf(ev)) {
        const o = old.states[id];
        const n = nu.states[id];
        if (ev.kind === "media") {
          // Neuer Titel oder Wiedergabe gestartet
          const key = mediaKey(n);
          if (key && key !== mediaKey(o)) this.fire(ev, o, n);
          continue;
        }
        if (!o || !n || o.state === n.state) continue;
        if (triggered(ev, o, n)) {
          this.fire(ev, o, n);
          continue;
        }
        // „Jede Änderung“ ist ein Moment, kein Zustand – Ende nur über Dauer oder Antippen
        if (ev.to === "*") continue;
        // Gerät läuft wieder → Erinnerung erledigt (abschaltbar)
        if (ev.kind === "info" && ev.from && n.state === ev.from && ev.reminder_clear !== false) this.removeChip(ev.id);
        // Klingel vorbei → noch kurz stehen lassen
        if (this.alarm?.ev.id === ev.id && n.state !== ev.to) this.holdAlarm();
        // Melder wieder aus → Ende der Ereignis-Seite neu berechnen
        if (this.takeover?.ev.id === ev.id && n.state !== ev.to) this.checkTakeover();
      }
    }
    const textId = this.pip?.ev.text;
    if (this.pip && textId && nu.states[textId] !== old.states[textId]) {
      const text = this.eventText(this.pip.ev, nu);
      if (text) this.pip = { ...this.pip, text };
    }
  }

  /** Ereignis auslösen. Im Editor über testEvent() mit Beispieldaten. */
  fire(ev: EventConfig, o?: HassEntity, n?: HassEntity): void {
    // Bedingungen zum Zeitpunkt des Auslösens
    if (ev.only_home && !Object.values(this.hass?.states ?? {}).some((s) => s.entity_id.startsWith("person.") && s.state === "home")) return;
    if (!checkConditions(this.hass, ev.show_if, { display: this.display?.id, orientation: this.orient })) return;
    const quiet = this.inQuiet(ev);
    if (quiet && ev.quiet_action === "skip") return;
    const allowedAtNight = ev.at_night ?? ev.kind === "alarm";
    if (this.night && !allowedAtNight) {
      if (ev.kind === "info") {
        this.addChip(ev, new Date());
        this.remember(ev);
      }
      return;
    }
    if (ev.kind !== "media") this.remember(ev);
    if (ev.sound && ev.kind !== "media" && !quiet && !this.displayMuted()) this.ring(ev);
    if (ev.kind === "media") {
      // Liedwechsel weckt den Bildschirm nicht; die Mini-Karte steht ohnehin, solange etwas läuft
      if (n && ev.style !== "mini") this.queueMedia(ev, n.entity_id);
      return;
    }
    if (ev.kind === "alarm") {
      this.openAlarm(ev);
    } else if (ev.kind === "live") {
      const running = this.pip?.ev.id === ev.id;
      const last = this.lastFired.get(ev.id) ?? 0;
      if (!running && ev.cooldown && Date.now() - last < ev.cooldown * 1000) return;
      this.lastFired.set(ev.id, Date.now());
      this.openPip(ev);
    } else if (ev.kind === "page") {
      if (!this.openTakeover(ev)) return;
    } else {
      const at = n ? new Date(n.last_changed) : new Date();
      const dur = o && n ? at.getTime() - new Date(o.last_changed).getTime() : undefined;
      const cost = ev.cost ? parseFloat(this.hass?.states[ev.cost]?.state ?? "") : NaN;
      this.openNotice(ev, at, dur, Number.isFinite(cost) && cost > 0 ? cost : null);
    }
    wakeScreen();
  }

  /** Zusatztext eines Ereignisses: Zustand oder Attribut einer Entität (z. B. KI-Beschreibung, NINA-Überschrift). */
  private eventText(ev: EventConfig, hass = this.hass): string {
    if (!ev.text) return "";
    const s = hass?.states[ev.text];
    const v = ev.text_attribute ? s?.attributes[ev.text_attribute] : s?.state;
    return v == null || v === "unknown" || v === "unavailable" ? "" : String(v);
  }

  /** Liegt jetzt in der Ruhezeit des Ereignisses? */
  private inQuiet(ev: EventConfig): boolean {
    return !!(ev.quiet?.after || ev.quiet?.before) && checkCondition(this.hass, { condition: "time", after: ev.quiet.after, before: ev.quiet.before });
  }

  /** Display stumm oder in seiner Ruhezeit? */
  private displayMuted(): boolean {
    if (Date.now() < this.muteUntil) return true;
    const s = this.display?.sound;
    if (!s) return false;
    if (s.mute) return true;
    return !!(s.quiet?.after || s.quiet?.before) && checkCondition(this.hass, { condition: "time", after: s.quiet.after, before: s.quiet.before });
  }

  /** Lautstärke: die des Ereignisses, skaliert mit der des Displays */
  private volumeFor(ev: EventConfig): number {
    return ((ev.volume ?? 70) * (this.display?.sound?.volume ?? 100)) / 100;
  }

  /** Ist die Einblendung dieses Ereignisses noch zu sehen? (Wiederholen „bis angetippt“) */
  private showing(ev: EventConfig): boolean {
    return [this.alarm?.ev, this.pip?.ev, this.notice?.ev, this.takeover?.ev].some((x) => x?.id === ev.id);
  }

  /**
   * Ton zum Ereignis. Wiederholen (sound_repeat): einmal, n-mal oder „loop“ – solange die Einblendung offen ist,
   * höchstens 2 min; Abstand sound_interval (4 s). Ohne Angabe wiederholt sich nur der Ton „alarm“ beim Vollbild-Alarm.
   */
  private ring(ev: EventConfig): void {
    clearInterval(this.ringTimer);
    this.ringFor = ev.id;
    const play = (): void => void playSound(ev.sound!, this.volumeFor(ev), { hass: this.hass, library: this.config?.sounds });
    play();
    const repeat = ev.sound_repeat ?? (ev.sound === "alarm" && ev.kind === "alarm" ? "loop" : "once");
    if (repeat === "once") return;
    let left = repeat === "loop" ? Infinity : Number(repeat) - 1;
    const until = Date.now() + 120e3;
    this.ringTimer = window.setInterval(
      () => {
        if (left <= 0 || Date.now() > until || (repeat === "loop" && !this.showing(ev))) {
          clearInterval(this.ringTimer);
          return;
        }
        left -= 1;
        play();
      },
      (ev.sound_interval ?? 4) * 1000,
    );
  }

  testEvent(id: string): void {
    const ev = this.config?.events.find((e) => e.id === id);
    if (!ev) return;
    if (ev.sound && ev.kind !== "media") this.ring(ev);
    if (ev.kind === "info") this.openNotice(ev, new Date(), 102 * 60e3, 0.63);
    else if (ev.kind === "live") this.openPip(ev);
    else if (ev.kind === "page") this.openTakeover(ev, true);
    else if (ev.kind === "media") {
      const playing = triggersOf(ev).find((id) => mediaKey(this.hass?.states[id]));
      void this.openMedia(ev, playing ?? triggersOf(ev)[0] ?? "media_player.demo", { force: true, demo: !playing });
    } else this.openAlarm(ev);
  }

  private secs(base: number): number {
    return Math.max(3, base * this.speed);
  }

  private openAlarm(ev: EventConfig): void {
    this.closePip();
    this.closeMedia();
    const secs = this.secs(ev.max ?? 120);
    this.alarm = { ev, at: new Date(), secs, seq: ++this.seq };
    clearTimeout(this.alarmTimer);
    this.alarmTimer = window.setTimeout(() => this.closeAlarm(), secs * 1000);
  }

  private holdAlarm(): void {
    if (!this.alarm) return;
    const secs = this.secs(this.alarm.ev.hold_after ?? 30);
    this.alarm = { ...this.alarm, secs, seq: ++this.seq };
    clearTimeout(this.alarmTimer);
    this.alarmTimer = window.setTimeout(() => this.closeAlarm(), secs * 1000);
  }

  private closeAlarm(): void {
    clearTimeout(this.alarmTimer);
    // Wiederholter Ton gehört zu diesem Alarm: mit dem Antippen/Schließen verstummen
    if (this.alarm && this.ringFor === this.alarm.ev.id && (this.alarm.ev.sound_repeat ?? (this.alarm.ev.sound === "alarm" ? "loop" : "once")) !== "once") {
      clearInterval(this.ringTimer);
      stopSound();
    }
    this.alarm = undefined;
  }

  private openPip(ev: EventConfig): void {
    if (this.alarm) return; // Vollbild hat Vorrang
    if (this.media?.style === "card") this.closeMedia(); // gleicher Platz – die Kamera gewinnt
    const secs = this.secs(ev.duration ?? 30);
    const keepText = this.pip?.ev.id === ev.id ? this.pip.text : (ev.text_attribute && this.eventText(ev)) || t("Bewegung erkannt");
    this.pip = { ev, at: new Date(), secs, seq: ++this.seq, text: keepText };
    clearTimeout(this.pipTimer);
    this.pipTimer = window.setTimeout(() => this.closePip(), secs * 1000);
  }

  private closePip(): void {
    clearTimeout(this.pipTimer);
    this.pip = undefined;
  }

  private openNotice(ev: EventConfig, at: Date, dur?: number, cost?: number | null): void {
    const secs = this.secs(ev.duration ?? 60);
    this.notice = { ev, at, secs, seq: ++this.seq, duration: dur, cost };
    clearTimeout(this.noticeTimer);
    this.noticeTimer = window.setTimeout(() => {
      this.addChip(ev, at);
      this.closeNotice();
    }, secs * 1000);
  }

  private closeNotice(): void {
    clearTimeout(this.noticeTimer);
    this.notice = undefined;
  }

  /* ───────── Ereignis zeigt Seite ───────── */

  /**
   * Seite statt Wiedergabeliste zeigen. Sie bleibt mindestens `duration` s ab dem letzten Auslösen,
   * solange ein Auslöser aktiv ist, danach noch `hold_after` s – höchstens `max` s insgesamt.
   * Liefert false, wenn die Abklingzeit das Ereignis unterdrückt.
   */
  private openTakeover(ev: EventConfig, test = false): boolean {
    const page = this.pageById(ev.page);
    if (!page) return false;
    const now = Date.now();
    const running = this.takeover?.ev.id === ev.id;
    if (!running && !test && ev.cooldown && now - (this.lastFired.get(ev.id) ?? 0) < ev.cooldown * 1000 * this.speed) return false;
    clearTimeout(this.rotationTimer);
    this.takeover = { ev, firstAt: running ? this.takeover!.firstAt : now, lastAt: now, test };
    // Läuft die Seite schon (aus der Wiedergabe oder einem anderen Ereignis), nur die Zeit verlängern
    if (this.layers.find((l) => !l.leaving)?.page.id !== page.id) void this.show(page);
    this.checkTakeover();
    return true;
  }

  private checkTakeover(): void {
    const t = this.takeover;
    clearTimeout(this.takeoverTimer);
    if (!t) return;
    const { ev } = t;
    const now = Date.now();
    const ms = (s: number) => s * 1000 * this.speed;
    const maxEnd = t.firstAt + ms(ev.max ?? 600);
    const states = t.test ? [] : triggersOf(ev).map((id) => this.hass?.states[id]).filter((s): s is HassEntity => !!s);
    let end: number;
    if (states.some((s) => s.state === ev.to)) {
      // Melder noch aktiv: bis zur Obergrenze warten – das Abschalten meldet processChanges
      end = maxEnd;
    } else {
      const since = Math.max(t.lastAt, ...states.map((s) => new Date(s.last_changed).getTime()));
      end = Math.min(maxEnd, Math.max(t.lastAt + ms(ev.duration ?? 60), since + ms(ev.hold_after ?? 0)));
    }
    if (end - now < 50) this.closeTakeover();
    else this.takeoverTimer = window.setTimeout(() => this.checkTakeover(), end - now);
  }

  private closeTakeover(): void {
    const t = this.takeover;
    if (!t) return;
    clearTimeout(this.takeoverTimer);
    this.lastFired.set(t.ev.id, Date.now()); // Abklingzeit zählt ab dem Ende
    this.takeover = undefined;
    // Pausiert: zurück zur angehaltenen Seite statt weiterzublättern
    const paused = this.paused ? this.pageById(this.pausedPage) : undefined;
    if (paused) void this.show(paused);
    else this.next();
  }

  /* ───────── Musik-Cover ───────── */

  /** Kurz warten: Gruppen melden denselben Titel mehrfach, Cover und Titel wechseln nicht gleichzeitig. */
  private queueMedia(ev: EventConfig, entity: string): void {
    clearTimeout(this.mediaQueue);
    this.mediaQueue = window.setTimeout(() => void this.openMedia(ev, entity), 1500);
  }

  private async openMedia(ev: EventConfig, entity: string, opts: { force?: boolean; demo?: boolean } = {}): Promise<void> {
    if (!opts.force && (this.alarm || this.notice || this.controlOpen)) return;
    // Mini-Karte im Editor-Test: als normale Karte zeigen
    const style = ev.style === "fullscreen" ? "fullscreen" : "card";
    if (style === "card" && this.pip && !opts.force) return; // Kamera hat Vorrang auf demselben Platz
    const demo = opts.demo ? DEMO_TRACK(entity) : undefined;
    // In einer Gruppe den ersten eingetragenen Player nehmen, der dasselbe spielt (dessen Name erscheint)
    const own = mediaKey(this.hass?.states[entity]);
    if (!demo && own) entity = triggersOf(ev).find((id) => mediaKey(this.hass?.states[id]) === own) ?? entity;
    const s = demo ?? this.hass?.states[entity];
    const key = mediaKey(s);
    if (!key) return;
    // Derselbe Titel gerade erst gezeigt (z. B. von einem anderen Player der Gruppe)
    if (!opts.force && key === this.lastMediaKey && Date.now() - this.lastMediaAt < 45e3) return;
    this.lastMediaKey = key;
    this.lastMediaAt = Date.now();
    this.mediaShown.set(ev.id, Date.now());
    const pic = s!.attributes.entity_picture as string | undefined;
    if (pic) await Promise.race([preload(pic), new Promise((r) => setTimeout(r, 4000))]);
    if (!opts.force && mediaKey(this.hass?.states[entity]) !== key) return; // inzwischen schon weiter
    const secs = this.secs(ev.duration ?? (style === "fullscreen" ? 15 : 12));
    this.media = { ev, at: new Date(), secs, seq: ++this.seq, entity, style, key, demo };
    clearTimeout(this.mediaTimer);
    this.mediaTimer = window.setTimeout(() => this.closeMedia(), secs * 1000);
    // Liedfortschritt jede Sekunde nachführen
    clearInterval(this.mediaTicker);
    this.mediaTicker = window.setInterval(() => this.requestUpdate(), 1000);
  }

  private closeMedia(): void {
    clearTimeout(this.mediaTimer);
    clearInterval(this.mediaTicker);
    this.media = undefined;
  }

  /** „Zwischendurch“: während der Wiedergabe alle `interval` Minuten erneut zeigen. */
  private mediaTick(): void {
    if (!this.started || this.fixedPage) return;
    for (const ev of this.eventsForDisplay()) {
      if (ev.kind !== "media" || !ev.interval || ev.style === "mini") continue;
      const s = triggersOf(ev)
        .map((id) => this.hass?.states[id])
        .find((x) => mediaKey(x));
      if (s && Date.now() - (this.mediaShown.get(ev.id) ?? 0) >= ev.interval * 60e3 * this.speed) {
        this.lastMediaKey = ""; // derselbe Titel darf hier wieder erscheinen
        this.fire(ev, undefined, s);
      }
    }
  }

  /** Erinnerung oben rechts – abschaltbar pro Ereignis (reminder: „off“) und pro Display (reminders: false) */
  private addChip(ev: EventConfig, at: Date): void {
    if (ev.reminder === "off" || this.display?.reminders === false) return;
    const until = typeof ev.reminder === "number" ? Date.now() + ev.reminder * 60e3 * this.speed : undefined;
    this.chips = [...this.chips.filter((c) => c.id !== ev.id), { id: ev.id, icon: ev.icon, text: ev.chip ?? ev.title, at, until }];
  }

  /**
   * Erinnerungen oben rechts. Ab `reminders_stack` (Standard 3, 0 = nie) liegen sie als Stapel mit Zahl übereinander –
   * wie Mitteilungen bei iOS; Antippen klappt ihn auf (nach 20 s wieder zu), dort auch „Alle entfernen“.
   */
  private renderChips() {
    if (!this.chips.length || this.alarm) return nothing;
    const chip = (c: Chip) => html`<div class="chip" data-id=${c.id}>${icon(c.icon)}<span>${c.text}</span><span class="faint num">${fmtTime(c.at)}</span></div>`;
    const limit = this.display?.reminders_stack ?? 3;
    const newest = [...this.chips].reverse();
    if (!limit || this.chips.length < limit) return html`<div class="chips">${this.chips.map(chip)}</div>`;
    if (!this.chipsOpen) {
      return html`<div class="chips stack" data-open="1">
        ${chip(newest[0])}
        <span class="layer l1"></span><span class="layer l2"></span>
        <span class="count num">${this.chips.length}</span>
      </div>`;
    }
    return html`<div class="chips open">
      ${newest.map(chip)}
      <div class="chip clear" data-clear="1">${icon("close")}<span>${t("Alle entfernen")}</span></div>
      ${this.display?.history === false ? nothing : html`<div class="chip clear" data-history="1">${icon("bell")}<span>${t("Verlauf")}</span></div>`}
    </div>`;
  }

  private toggleChips(open: boolean): void {
    clearTimeout(this.chipsTimer);
    this.chipsOpen = open;
    if (open) this.chipsTimer = window.setTimeout(() => (this.chipsOpen = false), 20e3);
  }

  /* ───────── Mitteilungszentrale ───────── */

  private get historyKey(): string {
    return `ambiframe-history-${this.display?.id ?? ""}`;
  }

  /** Bisherige Mitteilungen dieses Displays (überlebt ein Neuladen), nur innerhalb von history_hours */
  private loadHistory(): HistoryEntry[] {
    if (this.historyLoaded === this.historyKey) return this.history;
    this.historyLoaded = this.historyKey;
    try {
      this.history = JSON.parse(readLocal(this.historyKey) ?? "[]") as HistoryEntry[];
    } catch {
      this.history = [];
    }
    return this.pruneHistory();
  }

  private pruneHistory(): HistoryEntry[] {
    const since = Date.now() - (this.display?.history_hours ?? 24) * 3600e3;
    this.history = this.history.filter((h) => h.at >= since).slice(-100);
    return this.history;
  }

  /** Ereignis in den Verlauf schreiben (nicht in Vorschauen, nicht bei abgeschaltetem Verlauf) */
  private remember(ev: EventConfig): void {
    if (this.preview || this.display?.history === false) return;
    this.loadHistory();
    const title = ev.title || ev.name || ev.chip || ev.id;
    this.history = [...this.history, { id: ev.id, kind: ev.kind, icon: ev.icon, title, where: ev.where || undefined, at: Date.now() }];
    this.pruneHistory();
    writeLocal(this.historyKey, JSON.stringify(this.history));
  }

  private openHistory(open: boolean): void {
    clearTimeout(this.historyTimer);
    this.historyOpen = open;
    this.toggleChips(false);
    if (open) this.historyTimer = window.setTimeout(() => (this.historyOpen = false), 60e3);
  }

  /** Liste wie die Mitteilungszentrale bei iOS: neueste oben, nach Tagen gruppiert */
  private renderHistory() {
    if (!this.historyOpen) return nothing;
    const list = [...this.loadHistory()].reverse();
    const day = (at: number) => {
      const d = new Date(at);
      const today = new Date();
      const diff = Math.round((new Date(today.toDateString()).getTime() - new Date(d.toDateString()).getTime()) / 864e5);
      return diff === 0 ? t("Heute") : diff === 1 ? t("Gestern") : d.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" });
    };
    let last = "";
    return html`<div class="hcenter" role="dialog" aria-label=${t("Mitteilungen")}>
      <div class="qhead">
        <span>${t("Mitteilungen")}</span>
        <button class="qclose" data-hclose="1" aria-label=${t("Schließen")}>${icon("close")}</button>
      </div>
      <div class="hlist">
        ${list.length
          ? list.map((h) => {
              const label = day(h.at);
              const head = label !== last ? html`<div class="hday">${label}</div>` : nothing;
              last = label;
              return html`${head}<div class="hrow">
                  ${icon(h.icon ?? (h.kind === "alarm" ? "bell" : h.kind === "live" ? "camera" : "info"))}
                  <div class="htext"><div>${h.title}</div>${h.where ? html`<div class="faint">${h.where}</div>` : nothing}</div>
                  <span class="faint num">${fmtTime(new Date(h.at))}</span>
                </div>`;
            })
          : html`<div class="hempty">${t("Keine Mitteilungen")}</div>`}
      </div>
      ${list.length ? html`<button class="hclear" data-hclear="1">${t("Verlauf leeren")}</button>` : nothing}
    </div>`;
  }

  /** Abgelaufene Erinnerungen entfernen */
  private pruneChips(): void {
    const now = Date.now();
    if (this.chips.some((c) => c.until && c.until <= now)) this.chips = this.chips.filter((c) => !c.until || c.until > now);
  }

  private removeChip(id: string): void {
    this.chips = this.chips.filter((c) => c.id !== id);
  }

  /* ───────── Antippen ───────── */

  private showToast(text: string, bad = false): void {
    clearTimeout(this.toastTimer);
    this.toast = { text, seq: ++this.seq, bad };
    this.toastTimer = window.setTimeout(() => (this.toast = undefined), 2600);
  }

  private confirmFirst(text: string): Promise<boolean> {
    return new Promise((resolve) => {
      const timer = window.setTimeout(() => answer(false), 15e3);
      const answer = (yes: boolean) => {
        clearTimeout(timer);
        this.ask = undefined;
        resolve(yes);
      };
      this.ask = { text, answer };
    });
  }

  private closePopup(): void {
    clearTimeout(this.popupTimer);
    this.popup = undefined;
  }

  private onAction = async (e: Event): Promise<void> => {
    const { action: a } = (e as CustomEvent<{ action: TapAction }>).detail;
    const hass = this.hass;
    const name = (id?: string) => (id ? (hass?.states[id]?.attributes.friendly_name as string) ?? id : "");
    if (this.preview) {
      this.showToast(`${t("Vorschau")}: ${a.action}${a.entity ? ` · ${name(a.entity)}` : a.page ? ` · ${a.page}` : ""}`);
      return;
    }
    if (a.confirm && !(await this.confirmFirst(typeof a.confirm === "string" ? a.confirm : t("{name} – wirklich?", { name: name(a.entity) || t("Aktion") })))) return;
    try {
      switch (a.action) {
        case "toggle":
          if (!a.entity || !hass) return;
          await hass.callService("homeassistant", "toggle", { entity_id: a.entity });
          this.showToast(`${name(a.entity)} umgeschaltet`);
          break;
        case "perform": {
          const [domain, service] = (a.perform ?? "").split(".");
          if (!domain || !service || !hass) return;
          await hass.callService(domain, service, { ...(a.data ?? {}), ...(a.entity ? { entity_id: a.entity } : {}) });
          this.showToast(a.title ?? (name(a.entity) || t("Erledigt")));
          break;
        }
        case "more_info":
          if (a.entity) this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: a.entity }, bubbles: true, composed: true }));
          break;
        case "page":
          if (a.page) this.showPage(a.page);
          break;
        case "popup":
          clearTimeout(this.popupTimer);
          this.popup = { action: a, seq: ++this.seq };
          this.popupTimer = window.setTimeout(() => this.closePopup(), (a.timeout ?? 30) * 1000);
          break;
        case "pause":
          if (!hass || !this.display) return;
          await hass.callWS({ type: "ambiframe/display/pause", display_id: this.display.id, paused: !this.paused });
          this.showToast(this.paused ? t("Weiter geht's") : t("Angehalten"));
          break;
        case "dashboard":
          this.openControl();
          break;
      }
    } catch (err) {
      this.showToast(t("Fehlgeschlagen: {error}", { error: String((err as { message?: string })?.message ?? err) }), true);
    }
  };

  private renderPopup() {
    const p = this.popup;
    if (!p) return nothing;
    return html`<div class="ov popup">
      <div class="pbox">
        ${p.action.title ? html`<div class="ptitle display">${p.action.title}</div>` : nothing}
        <af-card .hass=${this.hass} .options=${{ card: p.action.card }}></af-card>
      </div>
    </div>`;
  }

  private renderAsk() {
    const a = this.ask;
    if (!a) return nothing;
    return html`<div class="ov notice ask">
      <div class="box">
        <h2 class="display">${a.text}</h2>
        <div class="choices">
          <button class="no" @click=${(e: Event) => (e.stopPropagation(), a.answer(false))}>${t("Abbrechen")}</button>
          <button class="yes" @click=${(e: Event) => (e.stopPropagation(), a.answer(true))}>${t("Ja")}</button>
        </div>
      </div>
    </div>`;
  }

  private renderToast() {
    const toast = this.toast;
    if (!toast) return nothing;
    return keyed(toast.seq, html`<div class="toast ${toast.bad ? "bad" : ""}">${icon(toast.bad ? "warning" : "check")}<span>${toast.text}</span></div>`);
  }

  /* ───────── Bedienmodus ───────── */

  private openControl(): void {
    const control = this.display?.control;
    if (this.preview || !control?.enabled) return;
    // HA-App: eingebettete Dashboards meldet die App nicht an – dort zum Dashboard wechseln und zurückkehren
    if (this.hasAttribute("app")) {
      leaveToDashboard(control.dashboard ?? "/lovelace/0", control.idle ?? 60);
      return;
    }
    this.closeMedia();
    this.controlOpen = true;
    this.touchControl();
  }

  private touchControl = (): void => {
    if (!this.controlOpen) return;
    this.controlLeft = this.display?.control.idle ?? 60;
    clearInterval(this.controlTimer);
    this.controlTimer = window.setInterval(() => {
      this.controlLeft -= 1;
      if (this.controlLeft <= 0) this.closeControl();
    }, 1000);
  };

  private closeControl(): void {
    clearInterval(this.controlTimer);
    this.controlOpen = false;
  }

  private onFrameLoad(e: Event): void {
    try {
      const win = (e.target as HTMLIFrameElement).contentWindow;
      for (const type of ["pointerdown", "touchstart", "wheel", "keydown"]) win?.addEventListener(type, this.touchControl, { passive: true });
    } catch {
      /* fremde Herkunft */
    }
  }

  private onTap(e: Event): void {
    if (this.swallowTap) {
      this.swallowTap = false;
      return;
    }
    const path = e.composedPath() as HTMLElement[];
    if (this.menu) {
      if (!path.some((el) => el.classList?.contains("qmenu"))) this.closeMenu();
      return;
    }
    const hit = (cls: string) => path.some((el) => el.classList?.contains(cls));
    // Mitteilungszentrale: schließen, leeren; Antippen daneben schließt
    if (this.historyOpen) {
      if (path.some((el) => el.dataset?.hclear)) {
        this.history = [];
        writeLocal(this.historyKey, "[]");
        this.requestUpdate();
        return;
      }
      if (path.some((el) => el.dataset?.hclose) || !path.some((el) => el.classList?.contains("hcenter"))) this.openHistory(false);
      return;
    }
    if (path.some((el) => el.dataset?.history)) return this.openHistory(true);
    // Gestapelte Erinnerungen: erst aufklappen, dann einzeln oder alle entfernen
    if (path.some((el) => el.dataset?.open)) return this.toggleChips(true);
    if (path.some((el) => el.dataset?.clear)) {
      this.chips = [];
      return this.toggleChips(false);
    }
    const chip = path.find((el) => el.classList?.contains("chip"));
    if (chip) {
      this.removeChip(chip.dataset.id ?? "");
      if (this.chipsOpen) this.toggleChips(this.chips.length > 0);
      return;
    }
    if (this.ask) return;
    if (this.popup) {
      if (!hit("pbox")) this.closePopup();
      return;
    }
    if (this.alarm) return this.closeAlarm();
    if (this.notice) return this.closeNotice();
    if (this.media && (this.media.style === "fullscreen" || hit("mcard"))) return this.closeMedia();
    if (hit("pip")) return this.closePip();
    const mini = path.find((el) => el.classList?.contains("mmini"));
    if (mini?.dataset.entity) {
      this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: mini.dataset.entity }, bubbles: true, composed: true }));
      return;
    }
    // Bildschirmschoner-Modus: Antippen beendet den Bildschirmschoner, dahinter liegt das Dashboard
    if (this.display?.control?.mode === "screensaver" && fully()?.stopScreensaver) return fully()!.stopScreensaver!();
    if (!this.controlOpen) this.openControl();
  }

  /* ───────── Darstellung ───────── */

  private renderTimer(o: Overlay, color: string) {
    return keyed(o.seq, html`<div class="timer"><i style="background:${color};animation-duration:${o.secs}s"></i></div>`);
  }

  private renderAlarm() {
    const a = this.alarm;
    if (!a) return nothing;
    return html`<div class="ov alarm">
      ${a.ev.camera
        ? html`<af-camera-view .hass=${this.hass} .entity=${a.ev.camera} .osd=${`DEMO · ${a.ev.where.toUpperCase()}`}></af-camera-view>
            <div class="shade"></div>
            <div class="live"><i></i>${t("Live")}${a.ev.where ? ` · ${a.ev.where}` : ""}</div>`
        : html`<div class="plain"></div>`}
      <div class="msg">
        <div class="bell">${icon(a.ev.icon ?? "bell")}</div>
        <div><h1 class="display">${a.ev.title}</h1><p class="num">${[a.ev.where, fmtTime(a.at)].filter(Boolean).join(" · ")}</p></div>
      </div>
      <div class="hint">${t("Tippen zum Schließen")}</div>
      ${this.renderTimer(a, "var(--af-alert)")}
    </div>`;
  }

  private renderPip() {
    const p = this.pip;
    if (!p) return nothing;
    return html`<div class="pip">
      <div class="v">
        <af-camera-view .hass=${this.hass} .entity=${p.ev.camera} .osd=${`DEMO · ${p.ev.title.toUpperCase()}`}></af-camera-view>
        <div class="live small"><i></i>${t("Live")}</div>
      </div>
      <div class="m">
        <div class="r">${icon(p.ev.icon ?? "cam")}<span>${p.ev.title}</span><span class="tm num">${fmtTime(p.at)}</span></div>
        <div class="q">${p.text === t("Bewegung erkannt") ? p.text : `„${p.text}“`}</div>
      </div>
      ${this.renderTimer(p, "var(--af-accent)")}
    </div>`;
  }

  private renderNotice() {
    const n = this.notice;
    if (!n) return nothing;
    const stats: [string, string][] = [];
    if (n.duration && n.duration > 60e3) stats.push([t("Dauer"), duration(n.duration)]);
    if (n.cost != null) stats.push([t("Kosten"), `${fmt(n.cost, 2)} €`]);
    return html`<div class="ov notice">
      <div class="box">
        <div class="icw">${icon(n.ev.icon ?? "info")}</div>
        <h2 class="display">${n.ev.title}</h2>
        <div class="sub">${this.eventText(n.ev) || [n.ev.where, (n.ev.kind === "info" && n.ev.from ? t("fertig um {time}", { time: fmtTime(n.at) }) : t("seit {time}", { time: fmtTime(n.at) }))].filter(Boolean).join(" · ")}</div>
        ${stats.length ? html`<div class="stats">${stats.map(([k, v]) => html`<div><div class="k">${k}</div><div class="val display num">${v}</div></div>`)}</div>` : nothing}
        <div class="pill">${t("Erledigt")}</div>
        <div class="fine">${t("Bleibt danach als kleine Erinnerung oben rechts.")}</div>
      </div>
    </div>`;
  }

  private renderMedia() {
    const m = this.media;
    if (!m) return nothing;
    const s = m.demo ?? this.hass?.states[m.entity];
    const a = s?.attributes ?? {};
    const pic = a.entity_picture as string | undefined;
    const where = m.ev.where || a.friendly_name || "";
    // Liedfortschritt: HA meldet Position + Zeitpunkt, den Rest rechnen wir hoch
    const dur = Number(a.media_duration);
    let pos = Number(a.media_position);
    if (s?.state === "playing" && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at).getTime()) / 1000;
    const prog =
      dur > 0 && Number.isFinite(pos)
        ? html`<div class="prog">
            <div class="bar"><i style="transform:scaleX(${Math.min(1, Math.max(0, pos / dur))})"></i></div>
            <div class="times num"><span>${clock(Math.min(pos, dur))}</span><span>${clock(dur)}</span></div>
          </div>`
        : nothing;
    const art = keyed(
      pic ?? m.key,
      html`<div class="art" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? nothing : icon("music")}</div>`,
    );
    const text = keyed(
      m.key,
      html`<div class="mtext">
        <div class="mlabel">${icon("music")}<span>${s?.state === "paused" ? "Pausiert" : "Läuft gerade"}${where ? ` · ${where}` : ""}</span></div>
        <div class="mtitle display">${a.media_title ?? ""}</div>
        ${a.media_artist ? html`<div class="martist">${a.media_artist}</div>` : nothing}
        ${m.style === "fullscreen" && a.media_album_name && a.media_album_name !== a.media_title ? html`<div class="malbum">${a.media_album_name}</div>` : nothing}
        ${prog}
      </div>`,
    );
    if (m.style === "fullscreen") {
      return html`<div class="ov mfull">
        <div class="mbg ${pic ? "" : "none"}" style=${pic ? `background-image:url('${pic}')` : ""}></div>
        <div class="mveil"></div>
        <div class="mwrap">${art}${text}</div>
      </div>`;
    }
    return html`<div class="mcard">${art}${text}</div>`;
  }

  /** Mini-Karte: Player, der gerade spielt (oder vor weniger als 2 min pausiert wurde), für ein Ereignis mit style „mini“ */
  /**
   * Mini-Karte: was gerade läuft. Pro Ereignis einstellbar: Bedingungen (show_if), Ruhezeit („nicht zeigen“),
   * nachts, je Titel nach mini_duration s ausblenden (fehlt = dauerhaft), nach Pause noch mini_paused s (Standard 120).
   */
  private nowPlaying(): { ev: EventConfig; s: HassEntity } | undefined {
    const found = this.findPlaying();
    this.miniShown = !!found;
    return found;
  }

  private findPlaying(): { ev: EventConfig; s: HassEntity } | undefined {
    if (this.fixedPage && !this.preview) return undefined;
    for (const ev of this.eventsForDisplay()) {
      if (ev.kind !== "media" || ev.style !== "mini") continue;
      if (this.night && !ev.at_night) continue;
      if (this.inQuiet(ev) && ev.quiet_action === "skip") continue;
      if (!checkConditions(this.hass, ev.show_if, { display: this.display?.id, orientation: this.orient })) continue;
      const states = triggersOf(ev)
        .map((id) => this.hass?.states[id])
        .filter((x): x is HassEntity => !!x?.attributes.media_title);
      const pausedFor = (ev.mini_paused ?? 120) * 1000;
      const playing = states.find((x) => x.state === "playing");
      const paused = states.find((x) => x.state === "paused" && Date.now() - new Date(x.last_changed).getTime() < pausedFor);
      const s = playing ?? paused;
      if (!s) continue;
      // Je Titel nur eine Weile zeigen: Startzeit des aktuellen Titels merken
      const key = `${ev.id}|${mediaKey(s)}`;
      if (key !== this.miniKey) {
        this.miniKey = key;
        this.miniSince = Date.now();
      }
      if (ev.mini_duration && Date.now() - this.miniSince > ev.mini_duration * 1000 * this.speed) continue;
      return { ev, s };
    }
    return undefined;
  }

  private renderMini() {
    // Größere Einblendungen haben Vorrang; die Kamera nutzt denselben Platz
    if (this.media || this.alarm || this.pip || this.takeover || this.controlOpen) return nothing;
    // Die Seite „Läuft gerade“ zeigt dasselbe groß – dann kein Pop-up obendrauf
    if (this.pageById(this.currentPageId)?.widgets.some((w) => w.type === "media")) return nothing;
    const np = this.nowPlaying();
    if (!np) return nothing;
    const { ev, s } = np;
    const a = s.attributes;
    const pic = a.entity_picture as string | undefined;
    const where = ev.where || a.friendly_name || "";
    const dur = Number(a.media_duration);
    let pos = Number(a.media_position);
    if (s.state === "playing" && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at).getTime()) / 1000;
    const key = `${a.media_title}|${a.media_artist ?? ""}`;
    const look = [`pos-${ev.mini_position ?? "bottom-right"}`, ev.mini_size ? `size-${ev.mini_size}` : "", ev.mini_background === "none" ? "bare" : ""].join(" ");
    return html`<div class="mmini ${s.state} ${look}" data-entity=${s.entity_id}>
      ${ev.mini_cover === false
        ? nothing
        : keyed(key, html`<div class="art" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? nothing : icon("music")}</div>`)}
      ${keyed(
        key,
        html`<div class="mtext">
          <div class="mlabel">${icon("music")}<span>${s.state === "paused" ? t("Pausiert") : t("Läuft gerade")}${where ? ` · ${where}` : ""}</span></div>
          <div class="mtitle display">${a.media_title ?? ""}</div>
          ${a.media_artist ? html`<div class="martist">${a.media_artist}</div>` : nothing}
          ${ev.mini_progress !== false && dur > 0 && Number.isFinite(pos)
            ? html`<div class="bar"><i style="transform:scaleX(${Math.min(1, Math.max(0, pos / dur))})"></i></div>`
            : nothing}
        </div>`,
      )}
    </div>`;
  }

  /** Wird dieses Display von Hand bedient (Tablet) – oder nur angeschaut (Fernseher)? */
  private get touchable(): boolean {
    return !this.preview && !this.streamMode && this.display?.control?.enabled !== false;
  }

  /** OLED-Schutz: alle 3 Minuten ein Stück weiter auf einem kleinen Kreis (Radius 6 px), weich über 30 s */
  private updateShift(): void {
    const on = !!this.display?.oled && !this.preview;
    if (!on) {
      clearInterval(this.shiftTimer);
      this.shiftTimer = undefined;
      if (this.shift[0] || this.shift[1]) this.shift = [0, 0];
      return;
    }
    if (this.shiftTimer) return;
    const move = () => {
      this.shiftStep = (this.shiftStep + 1) % 8;
      const a = (this.shiftStep / 8) * 2 * Math.PI;
      this.shift = [Math.round(Math.cos(a) * 6), Math.round(Math.sin(a) * 6)];
    };
    move();
    this.shiftTimer = window.setInterval(move, 180e3);
  }

  /* ───────── Schnellmenü ───────── */

  private onPress = (e: PointerEvent): void => {
    clearTimeout(this.pressTimer);
    if (!this.touchable || this.menu || this.alarm || this.controlOpen || this.popup || this.ask) return;
    const path = e.composedPath() as HTMLElement[];
    // Widgets mit eigener Aktion, Pfeile, Karten und Einblendungen behalten ihr Verhalten
    if (path.some((el) => el.classList && ["act", "nav", "mmini", "mcard", "pip", "chip", "ov"].some((c) => el.classList.contains(c)))) return;
    this.pressAt = { x: e.clientX, y: e.clientY };
    this.pressTimer = window.setTimeout(() => {
      this.swallowTap = true;
      this.openMenu();
    }, 700);
  };

  private onPressMove = (e: PointerEvent): void => {
    if (this.pressAt && Math.hypot(e.clientX - this.pressAt.x, e.clientY - this.pressAt.y) > 12) clearTimeout(this.pressTimer);
  };

  private onPressEnd = (): void => {
    clearTimeout(this.pressTimer);
    this.pressAt = undefined;
  };

  private openMenu(): void {
    this.menu = true;
    this.touchMenu();
  }

  private touchMenu(): void {
    clearTimeout(this.menuTimer);
    this.menuTimer = window.setTimeout(() => this.closeMenu(), 10e3);
  }

  private closeMenu(): void {
    clearTimeout(this.menuTimer);
    this.menu = false;
  }

  private fully(): FullyScreen | undefined {
    return (window as unknown as { fully?: FullyScreen }).fully;
  }

  private async menuAction(id: string): Promise<void> {
    this.touchMenu();
    const f = this.fully();
    switch (id) {
      case "pause":
        if (this.hass && this.display) {
          await this.hass.callWS({ type: "ambiframe/display/pause", display_id: this.display.id, paused: !this.paused }).catch(() => undefined);
          this.showToast(this.paused ? t("Weiter geht's") : t("Angehalten"));
        }
        break;
      case "next":
        this.browse(1);
        break;
      case "mute": {
        const on = Date.now() < this.muteUntil;
        this.muteUntil = on ? 0 : Date.now() + 3600e3;
        writeLocal("ambiframe-mute-until", String(this.muteUntil));
        this.showToast(on ? t("Töne wieder an") : t("Eine Stunde stumm"));
        this.requestUpdate();
        break;
      }
      case "brighter":
      case "darker": {
        const now = Number(f?.getScreenBrightness?.() ?? 150);
        const next = Math.max(5, Math.min(255, Math.round(now + (id === "brighter" ? 40 : -40))));
        f?.setScreenBrightness?.(next);
        this.showToast(t("Helligkeit {n} %", { n: Math.round((next / 255) * 100) }));
        break;
      }
      case "screen":
        this.closeMenu();
        f?.turnScreenOff?.(true);
        break;
      case "dashboard":
        this.closeMenu();
        this.openControl();
        break;
      case "history":
        this.closeMenu();
        this.openHistory(true);
        break;
      case "reload":
        // Selbst ausgelöst – zählt nicht als Neustart-Schleife
        writeLocal("ambiframe-planned-reload", String(Date.now()));
        location.reload();
        break;
    }
  }

  private renderMenu() {
    if (!this.menu) return nothing;
    const f = this.fully();
    const muted = Date.now() < this.muteUntil;
    const items: [string, string, string, boolean][] = [
      ["pause", this.paused ? "play" : "pause", this.paused ? t("Weiter abspielen") : t("Anhalten"), true],
      ["next", "forward", t("Nächste Seite"), true],
      ["mute", muted ? "speaker" : "mute", muted ? t("Töne an") : t("1 Stunde stumm"), true],
      ["darker", "moon", t("Dunkler"), !!f?.setScreenBrightness],
      ["brighter", "sun", t("Heller"), !!f?.setScreenBrightness],
      ["screen", "moon", t("Bildschirm aus"), !!f?.turnScreenOff],
      ["dashboard", "home", t("Dashboard"), this.display?.control?.enabled !== false],
      ["history", "bell", this.loadHistory().length ? t("Mitteilungen ({n})", { n: this.history.length }) : t("Mitteilungen"), this.display?.history !== false],
      ["reload", "reload", t("Neu laden"), true],
    ];
    return html`<div class="qmenu" role="dialog" aria-label=${t("Schnellmenü")}>
      <div class="qhead">
        <span>${this.display?.name ?? "Ambiframe"}</span>
        <button class="qclose" aria-label=${t("Schließen")} @click=${(e: Event) => (e.stopPropagation(), this.closeMenu())}>${icon("close")}</button>
      </div>
      <div class="qgrid">
        ${items
          .filter(([, , , show]) => show)
          .map(
            ([id, ic, label]) => html`<button class=${id === "mute" && muted ? "on" : id === "pause" && this.paused ? "on" : ""} @click=${(e: Event) => (e.stopPropagation(), void this.menuAction(id))}>
              ${icon(ic)}<span>${label}</span>
            </button>`,
          )}
      </div>
    </div>`;
  }

  /** Pfeile zum Blättern – nur wenn das Display bedient wird und nichts Wichtiges darüber liegt */
  private renderNav() {
    const d = this.display;
    const on = d?.nav ?? d?.control?.enabled !== false;
    if (!on || this.streamMode || this.preview || this.fixedPage || this.night || this.takeover) return nothing;
    if (this.alarm || this.controlOpen || this.popup || this.ask || this.media?.style === "fullscreen") return nothing;
    const go = (e: Event, dir: 1 | -1) => {
      e.stopPropagation();
      this.browse(dir);
    };
    return html`<button class="nav prev" aria-label=${t("Vorherige Seite")} @click=${(e: Event) => go(e, -1)}>${icon("back")}</button>
      <button class="nav next" aria-label=${t("Nächste Seite")} @click=${(e: Event) => go(e, 1)}>${icon("forward")}</button>`;
  }

  /**
   * Dashboard zum Bedienen – bewusst außerhalb der skalierten Bühne: In einem per CSS vergrößerten iframe ordnet
   * Android (Fully) Berührungen falsch zu, untere und rechte Karten ließen sich dann nicht antippen.
   * Klingel, Kamera und Hinweise liegen in der Bühne – solange sie zu sehen sind, tritt das Dashboard zurück.
   */
  private renderControl() {
    if (!this.controlOpen) return nothing;
    const covered = !!(this.alarm || this.notice || this.pip);
    return html`<div class="ov control ${covered ? "covered" : ""}">
      <iframe src=${this.display?.control.dashboard ?? "/lovelace/0"} title="Home Assistant" @load=${this.onFrameLoad}></iframe>
      <div class="back" @click=${() => this.closeControl()}>${icon("back")}${t("Zurück zu Ambiframe")} <span class="num">· ${this.controlLeft} s</span></div>
    </div>`;
  }

  render() {
    if (!this.config || !this.display) return html`<div class="empty">${t("Kein Display konfiguriert")}</div>`;
    const g = this.grid;
    return html`<div
      class="stage ${this.dimming ? "dim" : ""}"
      style="width:${g.w}px;height:${g.h}px;transform:translate(-50%,-50%) scale(${this.scale})${this.display?.oled ? `;translate:${this.shift[0] * this.scale}px ${this.shift[1] * this.scale}px;transition:translate 30s linear` : ""}"
      @click=${this.onTap}
      @pointerdown=${this.onPress}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
      @contextmenu=${(e: Event) => e.preventDefault()}
      @af-action=${this.onAction}
    >
      ${repeat(
        this.layers,
        (l) => l.key,
        (l) =>
          html`<af-page
            class="layer t-${l.trans.type} ${l.leaving ? "out" : ""}"
            style="--t:${l.trans.duration}s"
            .hass=${this.hass}
            .page=${l.page}
            .ctx=${this.ctx}
            .photo=${l.photo}
            .grid=${g}
            .orientation=${this.orient}
          ></af-page>`,
      )}
      ${this.renderChips()}
      ${this.renderMini()} ${this.renderMedia()} ${this.renderPip()} ${this.renderPopup()} ${this.renderNotice()} ${this.renderAlarm()}
      ${this.renderAsk()} ${this.renderToast()} ${this.renderNav()} ${this.renderMenu()} ${this.renderHistory()}
    </div>
    ${this.renderControl()}`;
  }

  static styles = [
    themeTokens,
    css`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* Falls doch Ränder bleiben (extreme Seitenverhältnisse): in der Farbe des Stils statt schwarz */
        background: var(--af-bg);
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        /* Android/Fully: kein automatisches Vergrößern einzelner Textblöcke („Text-Autosizing“) */
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      }
      .empty {
        color: #888;
        font: 16px system-ui;
        padding: 24px;
      }
      .stage {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1280px;
        height: 800px;
        background-color: var(--af-bg);
        color: var(--af-ink);
        font-family: var(--af-sans);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .display {
        font-family: var(--af-display);
        font-weight: var(--af-clock-weight);
        letter-spacing: var(--af-clock-track);
      }
      .num {
        font-variant-numeric: tabular-nums lining-nums;
      }
      .faint {
        color: var(--af-ink-3);
      }
      .ic {
        width: 1em;
        height: 1em;
        flex: none;
      }
      /* Hell/Dunkel-Wechsel: kurz ausblenden statt hart umschalten */
      .stage {
        transition: opacity 1.5s var(--af-ease-soft);
      }
      .stage.dim {
        opacity: 0;
      }

      /*
       * Seitenwechsel (Dauer --t für den ganzen Wechsel). Die alte Seite geht zuerst, die neue kommt
       * überlappend nach – Texte stehen nie gleichzeitig deutlich übereinander.
       */
      .layer {
        /* backwards: nach dem Einblenden keine eigene GPU-Ebene mehr (Android rastert sie sonst teils falsch skaliert) */
        animation: var(--in) calc(var(--t) * 0.62) var(--af-ease-soft) calc(var(--t) * 0.38) backwards;
      }
      .layer.out {
        animation: var(--out) calc(var(--t) * 0.48) var(--af-ease-soft) both;
      }
      .t-fade {
        --in: fade-in;
        --out: fade-out;
      }
      .t-blur {
        --in: blur-in;
        --out: blur-out;
      }
      .t-slide {
        --in: slide-in;
        --out: slide-out;
      }
      .t-zoom {
        --in: zoom-in;
        --out: zoom-out;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
        }
      }
      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
      @keyframes blur-in {
        from {
          opacity: 0;
          filter: blur(16px);
          transform: scale(1.012);
        }
      }
      @keyframes blur-out {
        to {
          opacity: 0;
          filter: blur(16px);
        }
      }
      @keyframes slide-in {
        from {
          opacity: 0;
          transform: translateX(4%);
        }
      }
      @keyframes slide-out {
        to {
          opacity: 0;
          transform: translateX(-4%);
        }
      }
      @keyframes zoom-in {
        from {
          opacity: 0;
          transform: scale(0.97);
        }
      }
      @keyframes zoom-out {
        to {
          opacity: 0;
          transform: scale(1.03);
        }
      }

      /* Schnellmenü: ruhige Glaskarte unten in der Mitte, große Ziele für Finger */
      .hcenter {
        position: absolute;
        top: 30px;
        right: 40px;
        bottom: 30px;
        z-index: 58;
        width: min(560px, calc(100% - 80px));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 18px 20px 20px;
        border-radius: 30px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(28px) saturate(1.2);
        -webkit-backdrop-filter: blur(28px) saturate(1.2);
        animation: pip-in 0.5s var(--af-ease) backwards;
      }
      .hlist {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }
      .hday {
        margin: 14px 4px 6px;
        font-size: calc(14px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .hrow {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 14px;
        margin-bottom: 8px;
        border-radius: 18px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .hrow .ic {
        font-size: 24px;
        color: var(--af-accent);
      }
      .htext {
        flex: 1;
        min-width: 0;
      }
      .htext .faint {
        font-size: 0.8em;
      }
      .hempty {
        padding: 40px 0;
        text-align: center;
        color: var(--af-ink-3);
      }
      .hcenter .hclear,
      .hcenter .qclose {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 999px;
        cursor: pointer;
      }
      .hcenter .hclear {
        margin-top: 12px;
        padding: 10px;
      }
      .qmenu {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        z-index: 58;
        width: min(860px, calc(100% - 80px));
        box-sizing: border-box;
        padding: 18px 20px 20px;
        border-radius: 30px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(28px) saturate(1.2);
        -webkit-backdrop-filter: blur(28px) saturate(1.2);
        animation: pip-in 0.5s var(--af-ease) backwards;
      }
      .qhead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px 12px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .qgrid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }
      .qmenu button {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 18px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .qgrid button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 18px 8px 16px;
        font-size: calc(17px * var(--af-fs, 1));
        transition: transform 0.15s var(--af-ease);
      }
      .qgrid button .ic {
        font-size: 30px;
        color: var(--af-ink-2);
      }
      .qgrid button.on .ic {
        color: var(--af-accent);
      }
      .qgrid button:active {
        transform: scale(0.96);
      }
      .qclose {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        padding: 0;
        font-size: 20px;
      }
      :host([orient="portrait"]) .qgrid {
        grid-template-columns: repeat(3, 1fr);
      }
      /* Pfeile zum Blättern: klein, halb durchsichtig, im freien Rand der unteren Ecken */
      .nav {
        position: absolute;
        bottom: 6px;
        z-index: 24;
        width: 40px;
        height: 40px;
        padding: 0;
        display: grid;
        place-items: center;
        border-radius: 50%;
        border: 1px solid var(--af-line);
        background: var(--af-panel);
        color: var(--af-ink);
        font-size: 20px;
        opacity: 0.28;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition: opacity 0.4s var(--af-ease), transform 0.2s var(--af-ease);
      }
      /* HA-App (Kiosk-Modus auf iPad/iPhone): in einer Ecke liegt das Zahnrad der App – Pfeile mittig an die Seiten */
      :host([app]) .nav {
        bottom: auto;
        top: calc(50% - 20px);
      }
      .nav.prev {
        left: 6px;
      }
      .nav.next {
        right: 6px;
      }
      .nav:active {
        opacity: 0.9;
        transform: scale(0.94);
      }
      .chips {
        position: absolute;
        top: 30px;
        right: 40px;
        display: flex;
        gap: 10px;
        z-index: 20;
      }
      .chip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 18px 10px 14px;
        border-radius: 999px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        font-size: calc(17px * var(--af-fs, 1));
        animation: chip-in 0.6s var(--af-ease) backwards;
        cursor: pointer;
      }
      .chip .ic {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      /* Stapel wie bei iOS: oberste Erinnerung, darunter angedeutete Karten, Zahl in der Ecke */
      .chips.stack {
        position: absolute;
        cursor: pointer;
      }
      .chips.stack .chip {
        position: relative;
        z-index: 2;
      }
      .chips.stack .layer {
        position: absolute;
        left: 10px;
        right: 10px;
        height: 100%;
        border-radius: 999px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .chips.stack .l1 {
        top: 9px;
        z-index: 1;
        opacity: 0.85;
        transform: scale(0.95);
      }
      .chips.stack .l2 {
        top: 17px;
        z-index: 0;
        opacity: 0.6;
        transform: scale(0.88);
      }
      .chips.stack .count {
        position: absolute;
        top: -9px;
        right: -9px;
        z-index: 3;
        min-width: 26px;
        height: 26px;
        padding: 0 7px;
        box-sizing: border-box;
        border-radius: 999px;
        display: grid;
        place-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--af-bg, #000);
        background: var(--af-accent);
      }
      .chips.open {
        flex-direction: column;
        align-items: flex-end;
      }
      .chip.clear {
        opacity: 0.8;
      }
      @keyframes chip-in {
        from {
          opacity: 0;
          transform: translateY(-8px) scale(0.96);
        }
      }

      .ov {
        position: absolute;
        inset: 0;
        animation: ov-in 0.35s var(--af-ease) backwards;
      }
      @keyframes ov-in {
        from {
          opacity: 0;
        }
      }
      .live {
        position: absolute;
        left: 40px;
        top: 36px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 16px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.42);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 500;
        z-index: 2;
      }
      .live.small {
        left: 16px;
        top: 16px;
        font-size: calc(14px * var(--af-fs, 1));
        padding: 7px 12px;
      }
      .live i {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--af-alert);
        animation: blink 1.6s ease-in-out infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.25;
        }
      }
      .timer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.08);
        z-index: 2;
      }
      .timer i {
        display: block;
        height: 100%;
        transform-origin: left center;
        animation: shrink linear both;
      }
      @keyframes shrink {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }

      .alarm {
        z-index: 40;
        background: #000;
      }
      .alarm af-camera-view {
        position: absolute;
        inset: 0;
        animation: cam-in 0.6s var(--af-ease) backwards;
      }
      @keyframes cam-in {
        from {
          transform: scale(1.05);
        }
      }
      .alarm .plain {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse 70% 60% at 30% 70%, rgba(239, 139, 99, 0.22), transparent 70%), var(--af-bg);
      }
      .alarm .shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0) 48%), linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) 22%);
      }
      .msg {
        position: absolute;
        left: 64px;
        bottom: 66px;
        display: flex;
        align-items: center;
        gap: 34px;
      }
      .bell {
        position: relative;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        background: var(--af-alert);
        color: #22120b;
        display: grid;
        place-items: center;
        font-size: 46px;
        flex: none;
      }
      .bell::before,
      .bell::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 2px solid var(--af-alert);
        animation: ring 2.4s var(--af-ease) infinite;
      }
      .bell::after {
        animation-delay: 1.2s;
      }
      @keyframes ring {
        from {
          transform: scale(1);
          opacity: 0.75;
        }
        to {
          transform: scale(1.9);
          opacity: 0;
        }
      }
      .alarm h1 {
        margin: 0;
        font-size: 84px;
        line-height: 1;
      }
      .alarm p {
        margin: 12px 0 0;
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .alarm .hint {
        position: absolute;
        right: 56px;
        bottom: 74px;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }

      .pip {
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 540px;
        z-index: 27;
        border-radius: 30px;
        overflow: hidden;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
      }
      @keyframes pip-in {
        from {
          transform: translateX(calc(100% + 64px));
        }
      }
      .pip .v {
        position: relative;
        height: 304px;
      }
      .pip .m {
        padding: 20px 26px 26px;
      }
      .pip .r {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(22px * var(--af-fs, 1));
        font-weight: 500;
      }
      .pip .r .ic {
        color: var(--af-accent);
        font-size: calc(24px * var(--af-fs, 1));
      }
      .pip .tm {
        margin-left: auto;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        font-weight: 400;
      }
      .pip .q {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }

      .notice {
        z-index: 30;
        display: grid;
        place-items: center;
        background: var(--af-veil);
        backdrop-filter: blur(22px) saturate(1.1);
        -webkit-backdrop-filter: blur(22px) saturate(1.1);
      }
      .popup {
        z-index: 25;
        display: grid;
        place-items: center;
        background: var(--af-veil);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      .pbox {
        width: min(760px, 86%);
        max-height: 86%;
        overflow: auto;
        padding: 28px;
        border-radius: 36px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        animation: box-in 0.5s var(--af-ease) backwards;
      }
      .ptitle {
        font-size: 34px;
        margin: 4px 4px 18px;
      }
      .ask {
        z-index: 45;
      }
      .ask h2 {
        font-size: 40px;
        overflow-wrap: anywhere;
      }
      .choices {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 34px;
      }
      .choices button {
        font: 500 22px/1 var(--af-sans);
        padding: 18px 40px;
        border-radius: 999px;
        border: 1px solid var(--af-line);
        background: transparent;
        color: var(--af-ink);
        cursor: pointer;
      }
      .choices .yes {
        background: var(--af-accent);
        border-color: transparent;
        color: var(--af-bg);
      }
      .toast {
        position: absolute;
        z-index: 60;
        left: 50%;
        bottom: 34px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 999px;
        background: var(--af-chip);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid var(--af-line);
        color: var(--af-ink);
        font-size: calc(18px * var(--af-fs, 1));
        white-space: nowrap;
        animation: toast 2.6s var(--af-ease) both;
        pointer-events: none;
      }
      .toast .ic {
        color: var(--af-good);
        font-size: calc(20px * var(--af-fs, 1));
      }
      .toast.bad .ic {
        color: var(--af-alert);
      }
      @keyframes toast {
        0% {
          opacity: 0;
          transform: translate(-50%, 10px);
        }
        12%,
        82% {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, 0);
        }
      }
      .box {
        width: 620px;
        padding: 56px 56px 42px;
        border-radius: 44px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        text-align: center;
        animation: box-in 0.6s var(--af-ease) backwards;
      }
      @keyframes box-in {
        from {
          transform: translateY(18px) scale(0.98);
        }
      }
      .icw {
        width: 112px;
        height: 112px;
        margin: 0 auto;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--af-accent-soft);
        color: var(--af-accent);
        font-size: 56px;
      }
      .box h2 {
        margin: 28px 0 0;
        font-size: 56px;
        line-height: 1.05;
      }
      .box .sub {
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 12px;
      }
      .stats {
        display: flex;
        justify-content: center;
        gap: 64px;
        margin-top: 34px;
      }
      .stats .k {
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .stats .val {
        font-size: 34px;
        margin-top: 6px;
      }
      .pill {
        display: inline-block;
        margin-top: 38px;
        padding: 17px 44px;
        border-radius: 999px;
        background: var(--af-ink);
        color: var(--af-bg);
        font-size: calc(19px * var(--af-fs, 1));
        font-weight: 500;
        cursor: pointer;
      }
      .fine {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 18px;
      }

      /* Musik-Cover: Karte unten rechts (wie das Kamera-Bild-im-Bild) oder Vollbild */
      .mcard {
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 620px;
        box-sizing: border-box;
        z-index: 27;
        display: flex;
        align-items: center;
        gap: 26px;
        padding: 22px 30px 22px 22px;
        border-radius: 32px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(24px) saturate(1.2);
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
      }
      .art {
        flex: none;
        width: 176px;
        height: 176px;
        border-radius: 20px;
        background-color: var(--af-surface);
        background-image: radial-gradient(circle at 30% 25%, var(--af-accent-soft), transparent 70%);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid var(--af-line);
        display: grid;
        place-items: center;
        color: var(--af-accent);
        font-size: 64px;
        animation: art-in 0.6s var(--af-ease) backwards;
      }
      @keyframes art-in {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
      /* Mini-Karte: klein, ruhig, bleibt während der Wiedergabe */
      .mmini {
        position: absolute;
        right: 32px;
        bottom: 32px;
        width: 440px;
        box-sizing: border-box;
        z-index: 26;
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 14px 22px 14px 14px;
        border-radius: 24px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(24px) saturate(1.2);
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
        transition: opacity 0.6s var(--af-ease);
      }
      .mmini.paused {
        opacity: 0.7;
      }
      /* Optik pro Ereignis: Ecke, Größe, ohne Hintergrund */
      .mmini.pos-bottom-left {
        right: auto;
        left: 32px;
      }
      .mmini.pos-top-right,
      .mmini.pos-top-left {
        bottom: auto;
        top: 32px;
      }
      .mmini.pos-top-left {
        right: auto;
        left: 32px;
      }
      .mmini.size-small {
        zoom: 0.8;
      }
      .mmini.size-large {
        zoom: 1.3;
      }
      .mmini.bare {
        background: none;
        border-color: transparent;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45);
      }
      .mmini .art {
        width: 84px;
        height: 84px;
        border-radius: 14px;
        font-size: 34px;
      }
      .mmini .mlabel {
        font-size: calc(12px * var(--af-fs, 1));
      }
      .mmini .mtitle {
        font-size: 22px;
        margin-top: 6px;
        -webkit-line-clamp: 1;
      }
      .mmini .martist {
        font-size: calc(15px * var(--af-fs, 1));
        margin-top: 3px;
      }
      .mmini .bar {
        margin-top: 10px;
        height: 3px;
      }
      .mtext {
        flex: 1;
        min-width: 0;
        animation: ov-in 0.5s var(--af-ease) backwards;
      }
      .mlabel {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 500;
        color: var(--af-ink-3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mlabel .ic {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .mtitle {
        font-size: 32px;
        line-height: 1.12;
        margin-top: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .martist {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .malbum {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 6px;
      }
      .prog {
        margin-top: 18px;
      }
      .bar {
        height: 4px;
        border-radius: 2px;
        background: var(--af-line);
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        background: var(--af-ink);
        border-radius: 2px;
        transform-origin: left center;
        transition: transform 1s linear;
      }
      .times {
        display: flex;
        justify-content: space-between;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .mfull {
        z-index: 25;
        background: #000;
        overflow: hidden;
        cursor: pointer;
        /* Über dem unscharfen Cover ist Schrift immer hell */
        --af-ink: #fff;
        --af-ink-2: rgba(255, 255, 255, 0.78);
        --af-ink-3: rgba(255, 255, 255, 0.55);
        --af-line: rgba(255, 255, 255, 0.2);
        color: var(--af-ink);
      }
      .mbg {
        position: absolute;
        inset: -80px;
        background: center / cover no-repeat;
        filter: blur(70px) saturate(1.5) brightness(0.62);
        transform: scale(1.1);
        animation: kb-slow 40s linear both;
      }
      .mbg.none {
        background: radial-gradient(ellipse 60% 70% at 30% 40%, var(--af-accent), transparent 70%), #111;
        filter: blur(40px) brightness(0.5);
      }
      @keyframes kb-slow {
        to {
          transform: scale(1.25) rotate(2deg);
        }
      }
      .mveil {
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.38));
      }
      .mwrap {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        gap: 76px;
        padding: 0 110px;
      }
      .mfull .art {
        width: 470px;
        height: 470px;
        border-radius: 30px;
        font-size: 150px;
        border: 0;
        box-shadow: 0 40px 110px rgba(0, 0, 0, 0.55);
        animation-duration: 0.9s;
      }
      .mfull .mlabel {
        font-size: calc(16px * var(--af-fs, 1));
      }
      .mfull .mtitle {
        font-size: 66px;
        line-height: 1.04;
        margin-top: 18px;
        -webkit-line-clamp: 3;
      }
      .mfull .martist {
        font-size: 30px;
        margin-top: 14px;
      }
      .mfull .prog {
        margin-top: 44px;
      }
      .mfull .bar {
        height: 5px;
      }
      .mfull .times {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 10px;
      }

      .control {
        z-index: 26;
        background: var(--af-bg);
        color: var(--af-ink);
        font-family: var(--af-sans);
      }
      .control.covered {
        visibility: hidden;
      }
      .control iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background: #111;
      }
      .back {
        position: absolute;
        left: 50%;
        bottom: 22px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 999px;
        background: var(--af-chip);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid var(--af-line);
        font-size: calc(17px * var(--af-fs, 1));
        font-weight: 500;
        cursor: pointer;
      }
      .back span {
        color: var(--af-ink-3);
        font-weight: 400;
      }

      /* Hochformat: Overlays auf die schmale Bühne anpassen */
      :host([orient="portrait"]) .msg {
        left: 48px;
        right: 48px;
        bottom: 120px;
        flex-direction: column;
        align-items: flex-start;
        gap: 26px;
      }
      :host([orient="portrait"]) .alarm h1 {
        font-size: 68px;
      }
      :host([orient="portrait"]) .alarm .hint {
        right: auto;
        left: 48px;
        bottom: 56px;
      }
      :host([orient="portrait"]) .pip,
      :host([orient="portrait"]) .mmini {
        left: 32px;
        right: 32px;
        width: auto;
      }
      :host([orient="portrait"]) .mcard {
        right: 32px;
        left: 32px;
        width: auto;
        bottom: 40px;
      }
      :host([orient="portrait"]) .pip .v {
        height: 420px;
      }
      :host([orient="portrait"]) .box {
        width: auto;
        margin: 0 40px;
      }
      :host([orient="portrait"]) .mwrap {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 56px;
        padding: 0 72px;
      }
      :host([orient="portrait"]) .mfull .art {
        width: 560px;
        height: 560px;
        align-self: center;
      }
      :host([orient="portrait"]) .mtext {
        width: 100%;
      }

      @media (prefers-reduced-motion: reduce) {
        .layer,
        .layer.out,
        .pip,
        .mcard,
        .mbg,
        .art,
        .box,
        .alarm af-camera-view,
        .bell::before,
        .bell::after,
        .live i {
          animation-duration: 0.01s;
        }
      }
    `,
  ];
}

define("af-display", AfDisplay);
