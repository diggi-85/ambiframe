// Datenmodell von Ambiframe – entspricht custom_components/ambiframe/validation.py

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  entities?: Record<string, { entity_id: string; area_id?: string | null; device_id?: string | null }>;
  devices?: Record<string, { area_id?: string | null }>;
  areas?: Record<string, { area_id: string; name: string }>;
  user?: { is_admin: boolean; name: string };
  language?: string;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void> | void>;
  };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  /** Zustand übersetzt, wie im HA-Dashboard („printing“ → „Druckt“) – nur im echten HA vorhanden */
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
}

export type Condition =
  | { condition: "state" | "not_state"; entity: string; state: string | string[]; attribute?: string }
  | { condition: "numeric"; entity: string; above?: number; below?: number; attribute?: string }
  | { condition: "within_days"; entity: string; days: number; attribute?: string }
  | { condition: "any_state"; entity?: string; entities: string[]; state: string | string[] }
  /** Uhrzeit „HH:MM“; über Mitternacht möglich (after 22:00, before 05:00) */
  | { condition: "time"; after?: string; before?: string }
  /** Gruppen: alle (and), mindestens eine (or), keine (not) */
  | { condition: "and" | "or" | "not"; conditions: Condition[] }
  /** Jinja-Vorlage, wahr wie in HA („true“, „on“, Zahl ≠ 0) */
  | { condition: "template"; value_template: string }
  /** Entität hat sich in den letzten `minutes` Minuten geändert (optional zu `state`) */
  | { condition: "changed"; entity: string; minutes?: number; state?: string | string[] }
  /** Nur auf diesen Displays bzw. nur in dieser Ausrichtung */
  | { condition: "display"; displays: string[] }
  | { condition: "orientation"; orientation: "landscape" | "portrait" };

/** Wo eine Bedingung ausgewertet wird – fehlt etwas, gelten Display- und Ausrichtungs-Bedingungen als erfüllt */
export interface ConditionContext {
  display?: string;
  orientation?: "landscape" | "portrait";
}

export interface TapAction {
  /** toggle: ein/aus · more_info: HA-Dialog · perform: Dienst · page: Seite zeigen · popup: Lovelace-Karte · pause · dashboard */
  action: "toggle" | "more_info" | "perform" | "page" | "popup" | "pause" | "dashboard";
  entity?: string;
  /** perform: „domain.dienst“, z. B. script.turn_on */
  perform?: string;
  data?: Record<string, unknown>;
  page?: string;
  /** popup: Karte wie im Dashboard, Titel, schließt nach timeout s (Standard 30) */
  card?: Record<string, unknown>;
  title?: string;
  timeout?: number;
  /** Vorher nachfragen; Text statt „Wirklich?“ möglich */
  confirm?: boolean | string;
}

export interface ColorSet {
  bg?: string;
  ink?: string;
  accent?: string;
  card?: string;
  /** Deckkraft der Kartenfarbe in % */
  card_opacity?: number;
  good?: string;
  alert?: string;
  cold?: string;
}

/** Darstellung eines einzelnen Widgets */
export interface WidgetLook {
  /** als Karte (Fläche, Rand, Radius des Stils) */
  card?: boolean;
  accent?: string;
  ink?: string;
  /** Größe in % (100 = normal) */
  size?: number;
  /** Deckkraft in % */
  opacity?: number;
  /** Innenabstand in px */
  padding?: number;
}

export interface WidgetConfig {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  options: Record<string, any>;
  show_if?: Condition[];
  /** Aktion beim Antippen bzw. langen Drücken (0,6 s) */
  tap_action?: TapAction;
  look?: WidgetLook;
  hold_action?: TapAction;
  /** Eigene Position im Hochformat (8×12); fehlt sie, ordnet Ambiframe automatisch an */
  portrait?: { x: number; y: number; w: number; h: number };
}

export interface PageConfig {
  id: string;
  name: string;
  duration: number;
  /** ambient: Hintergrund-Animation dieser Seite; fehlt = wie Design */
  background: {
    type: "none" | "photo" | "color" | "camera";
    color?: string;
    ambient?: AmbientKind;
    /** camera: HA-Kamera oder Webcam-Link; Standbild alle refresh s (0 = live, Standard 20) */
    entity?: string;
    url?: string;
    refresh?: number;
    /** Ortsname unten rechts (wie die Bildquelle beim Bilderrahmen) */
    name?: string;
    /** Mehrere Webcams: bei jedem Erscheinen der Seite die nächste */
    sources?: { url: string; name?: string; refresh?: number }[];
  };
  palette: "normal" | "night";
  /** Übergang beim Erscheinen dieser Seite; fehlt = wie Display/Design */
  transition?: Partial<TransitionConfig>;
  show_if?: Condition[];
  /** Eigenes CSS nur für diese Seite */
  css?: string;
  widgets: WidgetConfig[];
}

export type AmbientKind = "none" | "particles" | "flow" | "bokeh" | "mist";
export type TransitionKind = "fade" | "blur" | "slide" | "zoom";
export interface TransitionConfig {
  type: TransitionKind;
  /** Sekunden für den ganzen Wechsel */
  duration: number;
}
/** auto = hell bei Tag, dunkel nach Sonnenuntergang */
export type ThemeMode = "auto" | "light" | "dark";

export type EventKind = "alarm" | "live" | "info" | "page" | "media";

export interface EventConfig {
  id: string;
  name?: string;
  enabled: boolean;
  /** Auslöser; bei „page“ ergänzt um weitere Auslöser, bei „media“ stehen die Player in `entities`. */
  entity?: string;
  entities?: string[];
  from?: string;
  to?: string;
  kind: EventKind;
  camera?: string;
  title: string;
  /** „page“: diese Seite zeigen */
  page?: string;
  /** „media“: Darstellung des Covers und Wiederholung während der Wiedergabe (Minuten, 0 = aus) */
  /** mini: kleine Karte, bleibt sichtbar, solange etwas läuft (statt kurz beim Liedwechsel) */
  style?: "card" | "fullscreen" | "mini";
  interval?: number;
  where: string;
  text?: string;
  text_attribute?: string;
  icon?: string;
  cost?: string;
  chip?: string;
  duration?: number;
  max?: number;
  hold_after?: number;
  cooldown?: number;
  at_night?: boolean;
  displays?: string[];
  /** Ton: gong | dingdong | glocke | alarm | Link; Lautstärke 0–100 */
  sound?: string;
  volume?: number;
  /** Ruhezeit „HH:MM“–„HH:MM“: stumm (mute) oder gar nicht zeigen (skip) */
  quiet?: { after?: string; before?: string };
  quiet_action?: "mute" | "skip";
  /** Nur, wenn mindestens eine Person zu Hause ist */
  only_home?: boolean;
  /** Weitere Bedingungen zum Zeitpunkt des Auslösens */
  show_if?: Condition[];
  /** to: "*" = jede Änderung; bei event.*-Entitäten optional nur diese Ereignistypen */
  event_types?: string[];
}

export interface DisplayConfig {
  id: string;
  name: string;
  /** show_if: Eintrag nur, wenn erfüllt – z. B. morgens andere Seiten als abends */
  playlist: { page: string; duration?: number; show_if?: Condition[] }[];
  theme?: Theme;
  mode?: ThemeMode;
  /** auto = nach Seitenverhältnis des Geräts (auch beim Drehen) */
  orientation?: "auto" | "landscape" | "portrait";
  transition?: Partial<TransitionConfig>;
  night: { entity?: string; page?: string };
  /** mode: embedded = Dashboard über Ambiframe; screensaver = Dashboard in Fully, Ambiframe als Bildschirmschoner nach idle s */
  control: { enabled: boolean; mode?: "embedded" | "screensaver"; dashboard: string; idle: number };
  events: "all" | string[];
  /** Diese Taste drücken, wenn sich das Display `after` Sekunden nicht meldet (z. B. Fully „Start-URL laden“) */
  watchdog?: { button?: string; after?: number };
  /** Pause endet nach so vielen Minuten (0 = nie, Standard 60) */
  pause_minutes?: number;
  /** Lesbarkeit für dieses Display; fehlt = wie Design */
  text_size?: TextSize;
  contrast?: "normal" | "high";
  /** Abweichend vom Haupt-Design (fehlt ein Wert, gilt das Design) */
  design?: DisplayDesign;
  /** Töne: stumm, Lautstärke in % (skaliert die des Ereignisses), Ruhezeit */
  sound?: { mute?: boolean; volume?: number; quiet?: { after?: string; before?: string } };
  /** Eigene Fotoquelle; fehlt ein Wert, gilt die aus dem Design */
  photos?: Partial<AmbiframeConfig["photos"]>;
  /** Mit diesem Profil angelegt (kitchen, hallway, bedroom, tv) */
  profile?: string;
  /** Nachrichten-Laufband zeigen; fehlt = an, außer beim Profil Fernseher (im Videostream immer aus) */
  ticker?: boolean;
  /** Dezente Pfeile unten links/rechts zum Blättern; fehlt = an, wenn das Display bedient wird */
  nav?: boolean;
  /** OLED-Schutz: Anzeige wandert alle paar Minuten um wenige Pixel */
  oled?: boolean;
  /** Videostream als Kamera-Entität (Puppet-Add-on rendert, nur auf Abruf) */
  stream?: { enabled?: boolean; resolution?: "4k" | "1080p" | "both"; interval?: number; renderer?: string };
}

export type DisplayDesign = Partial<
  Pick<AmbiframeConfig["design"], "accent" | "evening" | "fonts" | "ambient" | "colors" | "radius" | "css" | "language">
>;

export type TextSize = "normal" | "large" | "xlarge";

export type Theme = "ruhig" | "klar" | "gold" | "glass" | "editorial" | "minimal" | "aurora";

export interface AmbiframeConfig {
  version: number;
  /** false = frisch installiert, der Editor startet den Einrichtungsassistenten */
  setup_complete?: boolean;
  design: {
    theme: Theme;
    mode?: ThemeMode;
    accent?: string;
    evening: "sun" | "off";
    /** Schrift-IDs aus fonts.json; fehlt = Schrift des Stils */
    fonts?: { display?: string; text?: string };
    /** Hintergrund-Animation; type fehlt = Standard des Stils */
    ambient?: { type?: AmbientKind; strength?: 1 | 2 | 3; speed?: "slow" | "normal" };
    transition?: Partial<TransitionConfig>;
    /** Eigene Farben je Hell/Dunkel – überschreiben die des Stils */
    colors?: { dark?: ColorSet; light?: ColorSet };
    /** Eckenradius der Karten in px */
    radius?: number;
    /** Sprache von Anzeige und Editor: auto (wie der HA-Benutzer), de oder en */
    language?: "auto" | "de" | "en";
    /** Lesbarkeit: Größe der kleineren Texte und Kontrast der gedämpften Schrift */
    text_size?: TextSize;
    contrast?: "normal" | "high";
    /** Eigenes CSS für alle Displays */
    css?: string;
    /** Gespeicherte eigene Stile (Momentaufnahme des Designs) */
    presets?: { name: string; design: Record<string, unknown> }[];
  };
  photos: { folder: string; bing: boolean; bing_mix?: boolean; bing_market?: string; credit: boolean; icloud?: string };
  /** KI-Zusammenfassung (ai_task, bevorzugt Gemini) */
  summary?: { enabled?: boolean; times?: string[]; ai_task?: string; style?: "facts" | "friendly" };
  displays: DisplayConfig[];
  pages: PageConfig[];
  events: EventConfig[];
  /** Eigene Vorlagen: Widget-Gruppen und ganze Seiten */
  templates?: {
    widgets?: { name: string; widgets: WidgetConfig[] }[];
    pages?: { name: string; page: Omit<PageConfig, "id" | "name"> }[];
  };
}

export interface Photo {
  url: string;
  credit: string;
}
