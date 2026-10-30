// Studio: Einrichtung „Display zuerst“ mit rotem Faden. Jedes Display hat eine eigene Seite mit denselben
// Fragen (Ort & Gerät · Inhalte · Aussehen · Momente · Technik), dazu eine Seite „Alle Displays“ für das Gemeinsame
// (Aussehen für alle, Momente, Seiten-Bibliothek, Fotos & KI). Rechts immer die echte Vorschau.
// Gestalten einer Seite (Raster, Widgets) öffnet den Seiteneditor im Studio. Rückgängig, Speichern, Hinweise der
// Prüfung, eigene Farben, Stile, YAML und der Einrichtungsassistent beim ersten Start gehören ebenfalls hierher.
import { dump, load } from "js-yaml";
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import "../display/display";
import type { AfDisplay } from "../display/display";
import { lang, locale, t } from "../i18n";
import { anyIcon, iconSvg } from "../icons";
import { PALETTES, THEME_DEFS, seasonTheme } from "../styles";
import type { AmbiframeConfig, AmbientKind, Condition, DisplayConfig, EventConfig, Hass, HassEntity, PageConfig, SoundConfig } from "../types";
import { formContext, type Field } from "../editor/form";
import "../editor/form";
import "../editor/sounds";
import "../editor/page-editor";
import "../editor/wizard";
import type { Note } from "../editor/page-editor";
import { checkHealth, type HealthGo, type PhotoHealth } from "../editor/health";
import { PROFILES, displayFromProfile, profilePlaylist } from "../editor/profiles";
import {
  AMBIENT_OPTIONS,
  DESIGN_FIELDS,
  DISPLAY_DESIGN_FIELDS,
  DISPLAY_PHOTO_FIELDS,
  DISPLAY_SOUND_FIELDS,
  DISPLAY_STREAM_FIELDS,
  LOOK_FIELDS,
  MOTION_FIELDS,
  SHAPE_FIELDS,
  colorFields,
  PAGE_TEMPLATES,
  SUMMARY_FIELDS,
  displayFields,
  eventFields,
  slug,
  uniqueId,
} from "../editor/schemas";
import { define } from "../widgets/base";
import { WIDGETS } from "../widgets/registry";

/** Seite „Alle Displays“ */
const ALL = "__all";

/** Was ein Display gerade tut (ambiframe/displays/status) */
interface DisplayStatus {
  online?: boolean;
  last_seen?: string | null;
  paused?: boolean;
  until?: string | null;
  clients?: { name: string; page: string | null; version: string | null; hidden: boolean; safe?: string | null; last_seen: string }[];
}

const toYaml = (c: unknown) => dump(c, { lineWidth: 120, noRefs: true });

/** „Erweitert“ pro Gerät merken */
const ADVANCED_KEY = "ambiframe-editor-advanced";
const readAdvanced = (): boolean => {
  try {
    return localStorage.getItem(ADVANCED_KEY) === "1";
  } catch {
    return false;
  }
};

type Step = "ort" | "inhalte" | "aussehen" | "momente" | "technik";
const DISPLAY_STEPS: [Step, string, string][] = [
  ["ort", "Ort & Gerät", "Wo hängt es?"],
  ["inhalte", "Inhalte", "Was soll es zeigen?"],
  ["aussehen", "Aussehen", "Wie soll es wirken?"],
  ["momente", "Momente", "Wann soll etwas passieren?"],
  ["technik", "Technik", "Steuerung, Ton, Videostream"],
];
const ALL_STEPS: [Step, string, string][] = [
  ["aussehen", "Aussehen für alle", "Stil, Farben und Atmosphäre aller Displays"],
  ["momente", "Momente", "Wenn … dann … – für alle Displays"],
  ["inhalte", "Seiten-Bibliothek", "Alle Seiten, die Displays zeigen können"],
  ["technik", "Fotos & KI", "Gemeinsame Quellen und Dienste"],
];

/** Technik → Display: ohne Name (Ort & Gerät), Stil und Hell/Dunkel (Aussehen) – Nacht steht bei den Inhalten */
const ELSEWHERE = new Set(["name", "theme", "mode"]);

/** Feinschliff ohne das, was oben schon als Karten/Knöpfe steht (Palette, Animation, Cover-Farben, Kacheln) */
const SHOWN_ABOVE = new Set(["design.palette", "design.ambient.type", "design.cover_colors", "design.card_style", "design.gap", "design.radius"]);
const notShownAbove = (fields: Field[]): Field[] => fields.filter((f) => !SHOWN_ABOVE.has(f.key));

/** „Wann?“ als einfache Sätze – jede Wahl ist eine ganz normale Bedingung (show_if) */
const WHEN: { id: string; name: string; show_if: Condition[] }[] = [
  { id: "always", name: "immer", show_if: [] },
  { id: "morning", name: "nur morgens", show_if: [{ condition: "time", after: "05:00", before: "11:00" }] },
  { id: "day", name: "nur tagsüber", show_if: [{ condition: "time", after: "08:00", before: "18:00" }] },
  { id: "evening", name: "nur abends", show_if: [{ condition: "time", after: "17:00", before: "23:00" }] },
];
const whenOf = (show_if?: Condition[]) =>
  !show_if?.length ? "always" : (WHEN.find((w) => JSON.stringify(w.show_if) === JSON.stringify(show_if))?.id ?? "custom");

/** Atmosphäre in Gruppen statt einer langen Liste */
const AMBIENT_GROUPS: [string, AmbientKind[]][] = [
  ["Ruhig", ["none", "particles", "flow", "hue", "bokeh", "mist", "aurora"]],
  ["Natur & Wetter", ["weather", "snow", "raindrops", "wind", "clouds", "stars", "fireflies", "leaves", "blossoms", "bubbles"]],
  ["Gemütlich", ["fire", "lava", "waves", "glitter"]],
  ["Kräftig", ["matrix", "warp", "mystify", "logo", "pipes"]],
];
const ambientName = (k: string) => AMBIENT_OPTIONS.find(([id]) => id === k)?.[1] ?? k;

/** Vorlagen für neue Momente – Wenn … dann … */
const MOMENT_TEMPLATES: { id: string; name: string; icon: string; event: Partial<EventConfig> }[] = [
  { id: "klingel", name: "Es klingelt", icon: "bell", event: { kind: "alarm", to: "on", title: "Es klingelt", sound: "gong" } },
  { id: "bewegung", name: "Bewegung an der Tür", icon: "cam", event: { kind: "live", to: "on", title: "Bewegung", duration: 30, cooldown: 120 } },
  { id: "waesche", name: "Wäsche ist fertig", icon: "washer", event: { kind: "info", from: "on", to: "off", title: "Wäsche fertig", icon: "washer" } },
  { id: "musik", name: "Musik läuft", icon: "music", event: { kind: "media", style: "mini" } },
  { id: "geburtstag", name: "Geburtstag", icon: "sparkle", event: { kind: "effect", effect: "confetti", to: "on", title: "Alles Gute!" } },
  { id: "warnung", name: "Wetterwarnung", icon: "warning", event: { kind: "info", to: "on", title: "Wetterwarnung", icon: "warning", at_night: true } },
];

/** Ohne Auslöser (bzw. Player bei Musik) lässt sich ein Moment nicht speichern */
export const needsTrigger = (ev: EventConfig): boolean =>
  ev.kind === "media" ? !ev.entities?.length : !ev.entity && !ev.entities?.length;

/** Passende Entität für eine Vorlage aus dem, was es in HA gibt (erste, die passt) */
export const guessTrigger = (hass: Hass | undefined, id: string): Partial<EventConfig> => {
  const ids = Object.keys(hass?.states ?? {});
  const find = (domains: string[], re: RegExp, deviceClass?: string) =>
    ids.find((e) => domains.some((d) => e.startsWith(`${d}.`)) && re.test(e) && (!deviceClass || hass?.states[e]?.attributes.device_class === deviceClass)) ??
    (deviceClass ? ids.find((e) => domains.some((d) => e.startsWith(`${d}.`)) && hass?.states[e]?.attributes.device_class === deviceClass) : undefined);
  const camera = ids.find((e) => e.startsWith("camera.") && /t[uü]r|door|front|haus|eingang/i.test(e));
  switch (id) {
    case "klingel":
      return { entity: find(["binary_sensor", "event"], /klingel|doorbell|ring|besucher|bell/i), camera };
    case "bewegung":
      return { entity: find(["binary_sensor"], /t[uü]r|door|front|eingang|einfahrt/i, "motion"), camera };
    case "waesche":
      return { entity: find(["input_boolean", "binary_sensor", "sensor"], /wasch|wama|washer|w[aä]sche/i) };
    case "musik":
      return { entities: ids.filter((e) => e.startsWith("media_player.")) };
    case "geburtstag":
      return { entity: find(["calendar"], /geburtstag|birthday|anniversaire|verjaardag/i) };
    case "warnung":
      return { entity: find(["binary_sensor"], /nina|warn|dwd|unwetter/i) };
    default:
      return {};
  }
};

const KIND_TEXT: Record<string, string> = {
  alarm: "Vollbild",
  live: "Bild-im-Bild",
  info: "Hinweis",
  page: "Seite zeigen",
  media: "Musik-Cover",
  effect: "Anlass-Animation",
};

/** Vorschau-Wetter: so tun, als wäre es draußen so */
const WEATHER_SIM: [string, string][] = [
  ["", "echt"],
  ["sunny", "Sonne"],
  ["rainy", "Regen"],
  ["snowy", "Schnee"],
  ["windy", "Wind"],
  ["clear-night", "klare Nacht"],
];

export class AmbiframeStudio extends LitElement {
  static properties = {
    hass: { attribute: false },
    draft: { state: true },
    view: { state: true },
    displayId: { state: true },
    step: { state: true },
    wizard: { state: true },
    pageIdx: { state: true },
    previewMode: { state: true },
    previewWeather: { state: true },
    hoverTheme: { state: true },
    openEvent: { state: true },
    dirty: { state: true },
    saving: { state: true },
    status: { state: true },
    advanced: { state: true },
    narrow: { attribute: false },
    editPage: { state: true },
    note: { state: true },
    healthOpen: { state: true },
    photoHealth: { state: true },
    yaml: { state: true },
    importText: { state: true },
    presetName: { state: true },
    condOpen: { state: true },
    summaryNote: { state: true },
    canUndo: { state: true },
    canRedo: { state: true },
  };

  hass?: Hass;
  draft?: AmbiframeConfig;
  view: "overview" | "display" | "page" = "overview";
  narrow = false;
  /** Seiteneditor: welche Seite, und wohin „Zurück“ führt */
  editPage = "";
  private backView: "overview" | "display" = "overview";
  note: Note | null = null;
  private noteTimer?: number;
  healthOpen = false;
  photoHealth?: PhotoHealth;
  /** YAML-Ansicht (Technik für alle, erweitert) und Stil-Import */
  yaml = "";
  importText: string | null = null;
  presetName = "";
  /** Wiedergabeliste: Eintrag mit aufgeklappter eigener Bedingung */
  condOpen = -1;
  summaryNote = "";
  canUndo = false;
  canRedo = false;
  private history: string[] = [];
  private future: string[] = [];
  private coalesceKey = "";
  /** Formular, das gerade ändert – aufeinanderfolgende Eingaben ergeben einen Rückgängig-Schritt */
  private formKey = "";
  private statusTimer?: number;
  /** Einrichtungsassistent beim ersten Start übersprungen */
  private wizardSkipped = false;
  /** Display-ID oder ALL für die Seite „Alle Displays“ */
  displayId = "";
  step: Step = "ort";
  /** Assistent: dieselben Schritte nacheinander, mit Weiter/Zurück */
  wizard = false;
  pageIdx = 0;
  previewMode: "" | "light" | "dark" | "night" = "";
  previewWeather = "";
  hoverTheme = "";
  openEvent = "";
  dirty = false;
  saving = false;
  advanced = readAdvanced();
  status: Record<string, DisplayStatus> = {};
  private saved = "";

  connectedCallback(): void {
    super.connectedCallback();
    void this.load();
    window.addEventListener("keydown", this.onKey);
    this.statusTimer = window.setInterval(() => void this.loadStatus(), 15e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.onKey);
    clearInterval(this.statusTimer);
  }

  /** ⌘S speichert, ⌘Z / ⇧⌘Z macht rückgängig bzw. wiederholt (nicht beim Tippen in Feldern) */
  private onKey = (e: KeyboardEvent): void => {
    const typing = (e.composedPath()[0] as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (this.dirty) void this.save();
    } else if (mod && e.key.toLowerCase() === "z" && !typing) {
      e.preventDefault();
      if (e.shiftKey) this.redo();
      else this.undo();
    } else if (mod && e.key.toLowerCase() === "y" && !typing) {
      // Wiederholen wie unter Windows üblich (Strg+Y)
      e.preventDefault();
      this.redo();
    }
  };

  private async loadStatus(): Promise<void> {
    if (!this.hass) return;
    try {
      this.status = await this.hass.callWS({ type: "ambiframe/displays/status" });
    } catch {
      /* ältere Fassung ohne Gerätestatus */
    }
  }

  private async load(): Promise<void> {
    if (!this.hass) return;
    const hass = this.hass;
    // Einmal lesen; falls nicht vorhanden (ältere Server, Testumgebung): erste Meldung des Abos wie im Editor
    const config = await hass.callWS<AmbiframeConfig>({ type: "ambiframe/config" }).catch(
      () =>
        new Promise<AmbiframeConfig>((resolve) => {
          let unsub: (() => unknown) | undefined;
          void hass.connection
            .subscribeMessage<{ config: AmbiframeConfig }>((m) => {
              resolve(m.config);
              void unsub?.();
            }, { type: "ambiframe/config/subscribe" })
            .then((u) => (unsub = u));
        }),
    );
    this.saved = JSON.stringify(config);
    this.draft = structuredClone(config);
    this.dirty = false;
    this.history = [];
    this.future = [];
    this.coalesceKey = "";
    this.yaml = "";
    this.syncUndo();
    // Direkt auf ein Display und einen Schritt springen: ?studio=<display|__all>&step=<schritt>
    const q = new URLSearchParams(location.search);
    const target = q.get("studio");
    if (target && (target === ALL || config.displays.some((d) => d.id === target)) && this.view === "overview") {
      this.openDisplay(target);
      const step = q.get("step") as Step | null;
      if (step) this.step = step;
    }
    await this.loadStatus();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && !this.draft && this.hass) void this.load();
    if (this.draft) {
      formContext.displays = this.draft.displays.map((x) => [x.id, x.name] as [string, string]);
      formContext.pages = this.draft.pages.map((x) => [x.id, x.name] as [string, string]);
    }
  }

  private get all(): boolean {
    return this.displayId === ALL;
  }

  private get display(): DisplayConfig | undefined {
    return this.draft?.displays.find((d) => d.id === this.displayId);
  }

  /** Display für die Vorschau – auf „Alle Displays“ das erste, ohne seine eigenen Abweichungen */
  private get previewDisplay(): DisplayConfig | undefined {
    return this.all ? this.draft?.displays[0] : this.display;
  }

  /** Änderung am Entwurf – immer als Kopie, damit die Vorschau sicher neu zeichnet; mit Verlauf für Rückgängig */
  private mutate(fn: (c: AmbiframeConfig) => void, coalesce = ""): void {
    if (!this.draft) return;
    const key = coalesce || this.formKey;
    if (!key || key !== this.coalesceKey) {
      this.history.push(JSON.stringify(this.draft));
      if (this.history.length > 100) this.history.shift();
      this.future = [];
    }
    this.coalesceKey = key;
    const next = structuredClone(this.draft);
    fn(next);
    this.draft = next;
    this.dirty = JSON.stringify(next) !== this.saved;
    this.syncUndo();
  }

  private undo(): void {
    const prev = this.history.pop();
    if (!prev || !this.draft) return;
    this.future.push(JSON.stringify(this.draft));
    this.draft = JSON.parse(prev);
    this.coalesceKey = "";
    this.dirty = prev !== this.saved;
    this.syncUndo();
  }

  private redo(): void {
    const next = this.future.pop();
    if (!next || !this.draft) return;
    this.history.push(JSON.stringify(this.draft));
    this.draft = JSON.parse(next);
    this.coalesceKey = "";
    this.dirty = next !== this.saved;
    this.syncUndo();
  }

  private syncUndo(): void {
    this.canUndo = this.history.length > 0;
    this.canRedo = this.future.length > 0;
  }

  /** Hinweis oben in der Leiste, verschwindet nach ein paar Sekunden */
  private showNote(note: Note): void {
    this.note = note;
    clearTimeout(this.noteTimer);
    this.noteTimer = window.setTimeout(() => (this.note = null), note.kind === "error" ? 12e3 : 6e3);
  }

  private mutateDisplay(fn: (d: DisplayConfig) => void): void {
    this.mutate((c) => {
      const d = c.displays.find((x) => x.id === this.displayId);
      if (d) fn(d);
    });
  }

  private async save(): Promise<void> {
    if (!this.hass || !this.draft) return;
    // Unvollständige Momente vorher zeigen statt einer Fehlermeldung vom Server
    const missing = this.draft.events.find(needsTrigger);
    if (missing) {
      this.view = "display";
      if (!this.displayId) this.displayId = ALL;
      this.step = "momente";
      this.openEvent = missing.id;
      alert(t("Beim Moment „{name}“ fehlt noch der Auslöser – bitte unter „Anpassen“ wählen oder den Moment löschen.", { name: missing.name || missing.id }));
      return;
    }
    this.saving = true;
    try {
      await this.hass.callWS({ type: "ambiframe/config/save", config: this.draft, language: lang() });
      this.saved = JSON.stringify(this.draft);
      this.dirty = false;
      this.showNote({ kind: "ok", text: t("Gespeichert – alle Displays zeigen es sofort.") });
    } catch (e) {
      const err = e as { message?: unknown; code?: unknown };
      alert(t("Speichern fehlgeschlagen: {msg}", { msg: typeof err?.message === "string" ? err.message : String(err?.code ?? e) }));
    } finally {
      this.saving = false;
    }
  }

  /** Seite gestalten: Seiteneditor im Studio, „Zurück“ führt dorthin, wo man herkam */
  private openPage(page: string): void {
    if (this.view !== "page") this.backView = this.view;
    this.editPage = page;
    this.view = "page";
  }

  /* ───────── Vorschau ───────── */

  /** hass für die Vorschau: Wetter und Nacht lassen sich simulieren, ohne HA zu ändern */
  private previewHass(): Hass | undefined {
    const h = this.hass;
    if (!h || (!this.previewWeather && this.previewMode !== "night")) return h;
    const states: Record<string, HassEntity> = { ...h.states };
    if (this.previewWeather)
      for (const id of Object.keys(states)) if (id.startsWith("weather.")) states[id] = { ...states[id], state: this.previewWeather };
    const night = this.previewDisplay?.night?.entity;
    if (this.previewMode === "night" && night)
      states[night] = { ...(states[night] ?? { entity_id: night, attributes: {}, last_changed: "", last_updated: "" }), state: "on" } as HassEntity;
    return { ...h, states };
  }

  private previewConfig(): AmbiframeConfig | undefined {
    const c = this.draft;
    const d = this.previewDisplay;
    if (!c || !d || (!this.hoverTheme && !this.all)) return c;
    const next = structuredClone(c);
    const pd = next.displays.find((x) => x.id === d.id)!;
    // „Alle Displays“: zeigen, wie ein Display ohne eigene Abweichungen aussieht
    if (this.all) {
      delete pd.theme;
      delete pd.mode;
      delete pd.design;
    }
    // Stil nur ansehen (Maus über einer Stil-Karte), noch nicht übernehmen
    if (this.hoverTheme) {
      if (this.all) next.design.theme = this.hoverTheme as AmbiframeConfig["design"]["theme"];
      else pd.theme = this.hoverTheme as DisplayConfig["theme"];
    }
    return next;
  }

  private currentPage(): string | undefined {
    const d = this.previewDisplay;
    if (!d) return undefined;
    if (this.previewMode === "night" && d.night?.page) return d.night.page;
    // Bibliothek: die gewählte Seite der Bibliothek
    const list = this.all && this.step === "inhalte" ? (this.draft?.pages ?? []).map((p) => ({ page: p.id })) : d.playlist;
    return list.length ? list[((this.pageIdx % list.length) + list.length) % list.length].page : undefined;
  }

  private renderPreview() {
    const d = this.previewDisplay;
    if (!d) return nothing;
    const page = this.draft?.pages.find((p) => p.id === this.currentPage());
    const mode = this.previewMode === "light" || this.previewMode === "dark" ? this.previewMode : undefined;
    return html`<aside class="preview">
      <div class="screen ${d.orientation === "portrait" && !this.all ? "portrait" : ""}">
        <af-display preview .hass=${this.previewHass()} .config=${this.previewConfig()} display-id=${d.id} .fixedPage=${this.currentPage() ?? null} .modeOverride=${mode}></af-display>
      </div>
      <div class="controls">
        <div class="pager">
          <button class="icon" title=${t("Vorherige Seite")} @click=${() => this.pageIdx--}>${iconSvg("back")}</button>
          <span>${page?.name ?? t("keine Seite")}</span>
          <button class="icon" title=${t("Nächste Seite")} @click=${() => this.pageIdx++}>${iconSvg("forward")}</button>
        </div>
        <div class="seg">
          ${(
            [
              ["", "Automatisch"],
              ["light", "Hell"],
              ["dark", "Dunkel"],
              ["night", "Nacht"],
            ] as const
          ).map(([id, name]) => html`<button class=${this.previewMode === id ? "on" : ""} @click=${() => (this.previewMode = id)}>${t(name)}</button>`)}
        </div>
        <label class="inline"
          >${t("Wetter simulieren")}
          <select @change=${(e: Event) => (this.previewWeather = (e.target as HTMLSelectElement).value)}>
            ${WEATHER_SIM.map(([id, name]) => html`<option value=${id} ?selected=${this.previewWeather === id}>${t(name)}</option>`)}
          </select>
        </label>
      </div>
      <p class="hint">
        ${this.all ? t("Vorschau: so sieht ein Display ohne eigene Abweichungen aus.") : t("Vorschau mit deinen echten Daten – geändert wird erst beim Speichern.")}
      </p>
    </aside>`;
  }

  /* ───────── Übersicht ───────── */

  private renderOverview() {
    const c = this.draft!;
    return html`<div class="overview">
      <header class="top">
        <div>
          <h1>${t("Deine Displays")}</h1>
          <p class="muted">${t("Jedes Display beantwortet dieselben Fragen: Wo hängt es, was zeigt es, wie sieht es aus und wann passiert etwas.")}</p>
        </div>
        <button class="primary" @click=${this.addDisplay}>+ ${t("Display hinzufügen")}</button>
      </header>
      <article class="allcard" @click=${() => this.openDisplay(ALL)}>
        <span class="ic big">${iconSvg("sparkle")}</span>
        <div>
          <h3>${t("Alle Displays")}</h3>
          <span class="muted">${t("Gemeinsames Aussehen, Momente, Seiten-Bibliothek, Fotos & KI – gilt überall, wo ein Display nichts Eigenes festlegt.")}</span>
        </div>
        <div class="chips">
          <span class="chip">${iconSvg("page")} ${t("{n} Seiten", { n: c.pages.length })}</span>
          <span class="chip">${iconSvg("bell")} ${t("{n} Momente", { n: c.events.length })}</span>
        </div>
      </article>
      <div class="cards">
        ${c.displays.map((d) => {
          const st = this.status[d.id];
          const profile = PROFILES.find((p) => p.id === d.profile);
          const own = [d.theme && t("eigener Stil"), d.mode && t("eigenes Hell/Dunkel"), d.design && Object.keys(d.design).length && t("eigenes Design")].filter(Boolean);
          return html`<article class="dcard" @click=${() => this.openDisplay(d.id)}>
            <div class="mini"><af-display preview still .hass=${this.hass} .config=${c} display-id=${d.id} .speed=${0.15}></af-display></div>
            <div class="meta">
              <div>
                <h3>${d.name}</h3>
                <span class="muted">${profile ? t(profile.name) : t("eigenes Profil")} · ${t("{n} Seiten", { n: d.playlist.length })}${own.length ? ` · ${own.join(", ")}` : ""}</span>
              </div>
              <span class="pill ${st?.online ? "ok" : ""}">${st?.online ? t("verbunden") : t("nicht verbunden")}</span>
            </div>
            ${this.renderDevices(st)}
          </article>`;
        })}
      </div>
    </div>`;
  }

  /** Welche Geräte dieses Display gerade zeigen (Name, Seite, zuletzt gesehen) */
  private renderDevices(st?: DisplayStatus) {
    if (!st?.clients?.length) return nothing;
    const pageName = (id?: string | null) => this.draft?.pages.find((p) => p.id === id)?.name ?? id ?? "–";
    const ago = (iso?: string | null) => {
      if (!iso) return t("nie");
      const sec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
      return sec < 60 ? t("gerade eben") : sec < 3600 ? t("vor {n} min", { n: Math.round(sec / 60) }) : t("vor {n} h", { n: Math.round(sec / 3600) });
    };
    return html`<ul class="devices">
      ${st.clients.map(
        (c) => html`<li>
          <span class="dot ${c.hidden ? "sleep" : "on"}"></span>
          <b>${c.name}</b>
          <span class="muted"
            >${c.safe ? `${t("Notfallmodus")} (${t(c.safe)})` : c.hidden ? t("Bildschirm aus") : pageName(c.page)} · ${ago(c.last_seen)}${c.version && c.version !== __WB_VERSION__ ? ` · ${t("ältere Version")}` : ""}</span
          >
        </li>`,
      )}
      ${st.paused
        ? html`<li class="muted">${t("Pausiert")}${st.until ? ` ${t("bis {when}", { when: new Date(st.until).toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }) })}` : ""}</li>`
        : nothing}
    </ul>`;
  }

  private openDisplay(id: string, wizard = false): void {
    this.displayId = id;
    this.view = "display";
    this.step = id === ALL ? "aussehen" : "ort";
    this.wizard = wizard;
    this.pageIdx = 0;
    this.hoverTheme = "";
    this.openEvent = "";
  }

  /** Neues Display: sofort mit sinnvollen Vorgaben (Profil Küche), dann geführt durch die vier Schritte */
  private addDisplay = (): void => {
    const c = this.draft!;
    const name = t("Neues Display");
    const id = uniqueId(slug(name), c.displays.map((d) => d.id));
    this.mutate((cc) => cc.displays.push(displayFromProfile(PROFILES[0], cc, id, name)));
    this.openDisplay(id, true);
  };

  /* ───────── Ort & Gerät ───────── */

  private renderOrt(d: DisplayConfig) {
    const tv = d.profile === "tv" || !!d.stream?.enabled;
    return html`
      <label class="field">${t("Name")}<input .value=${d.name} @input=${(e: Event) => this.mutateDisplay((x) => (x.name = (e.target as HTMLInputElement).value))} /></label>
      <h3>${t("Wo hängt es?")}</h3>
      <p class="muted">${t("Der Ort setzt passende Vorgaben – alles lässt sich danach ändern.")}</p>
      <div class="grid3">
        ${PROFILES.map(
          (p) => html`<button class="choice ${d.profile === p.id ? "on" : ""}" @click=${() => this.applyProfile(p.id)}>
            <span class="ic">${iconSvg(p.icon)}</span><b>${t(p.name)}</b><small>${t(p.hint)}</small>
          </button>`,
        )}
      </div>
      <h3>${t("Auf welchem Gerät?")}</h3>
      <div class="grid3">
        <button class="choice ${!tv ? "on" : ""}" @click=${() => this.mutateDisplay((x) => x.stream && (x.stream.enabled = false))}>
          <span class="ic">${iconSvg("tablet")}</span><b>${t("Tablet, iPad oder Bilderrahmen")}</b>
          <small>${t("Fully Kiosk, ein Browser im Vollbild oder die Karte in der Home-Assistant-App")}</small>
        </button>
        <button
          class="choice ${tv ? "on" : ""}"
          @click=${() => this.mutateDisplay((x) => {
            x.stream = { ...(x.stream ?? {}), enabled: true } as DisplayConfig["stream"];
            x.profile = "tv";
          })}
        >
          <span class="ic">${iconSvg("tv")}</span><b>${t("Fernseher")}</b><small>${t("Als Videostream per AirPlay oder auf LG webOS")}</small>
        </button>
      </div>
      <div class="howto">
        <b>${t("So kommt es aufs Gerät")}</b>
        <code>${location.origin}/ambiframe-display?display=${d.id}</code>
        <span class="muted">${t("iPad/iPhone: Dashboard mit der Karte custom:ambiframe-card und display: {id}", { id: d.id })}</span>
      </div>
    `;
  }

  private applyProfile(id: string): void {
    const p = PROFILES.find((x) => x.id === id);
    if (!p) return;
    this.mutateDisplay((d) => {
      Object.assign(d, structuredClone(p.display));
      d.profile = p.id;
    });
  }

  /* ───────── Inhalte (Display) und Seiten-Bibliothek (alle) ───────── */

  private renderInhalte(d: DisplayConfig) {
    const c = this.draft!;
    const pageOf = (id: string) => c.pages.find((p) => p.id === id);
    const unused = c.pages.filter((p) => !d.playlist.some((e) => e.page === p.id) && p.id !== d.night?.page);
    const profile = PROFILES.find((p) => p.id === d.profile);
    const at = ((this.pageIdx % Math.max(1, d.playlist.length)) + d.playlist.length) % Math.max(1, d.playlist.length);
    return html`
      <p class="muted">${t("Die Seiten laufen nacheinander. Antippen zeigt sie rechts in der Vorschau.")}</p>
      <ol class="playlist">
        ${d.playlist.map((e, i) => {
          const p = pageOf(e.page);
          const when = whenOf(e.show_if);
          return html`<li class=${at === i ? "on" : ""} @click=${() => (this.pageIdx = i)}>
            <span class="num">${i + 1}</span>
            <div class="what">
              <b>${p?.name ?? e.page}</b>
              <span class="types">${this.widgetTags(p)}</span>
            </div>
            <select title=${t("Wann?")} @click=${(ev: Event) => ev.stopPropagation()} @change=${(ev: Event) => this.setWhen(i, (ev.target as HTMLSelectElement).value)}>
              ${WHEN.map((w) => html`<option value=${w.id} ?selected=${when === w.id}>${t(w.name)}</option>`)}
              ${when === "custom" || this.advanced ? html`<option value="custom" ?selected=${when === "custom"}>${t("eigene Bedingung …")}</option>` : nothing}
            </select>
            <input
              class="dur"
              type="number"
              min="5"
              title=${t("Sekunden")}
              placeholder=${String(p?.duration ?? 30)}
              .value=${e.duration ? String(e.duration) : ""}
              @click=${(ev: Event) => ev.stopPropagation()}
              @change=${(ev: Event) => this.mutateDisplay((x) => {
                const v = Number((ev.target as HTMLInputElement).value);
                if (v > 0) x.playlist[i].duration = v;
                else delete x.playlist[i].duration;
              })}
            />
            <span class="btns" @click=${(ev: Event) => ev.stopPropagation()}>
              <button class="small ghost" title=${t("Widgets der Seite anordnen und einstellen")} @click=${() => this.openPage(e.page)}>${t("Gestalten")}</button>
              <button class="icon" ?disabled=${i === 0} title=${t("nach oben")} @click=${() => this.move(i, -1)}>↑</button>
              <button class="icon" ?disabled=${i === d.playlist.length - 1} title=${t("nach unten")} @click=${() => this.move(i, 1)}>↓</button>
              <button class="icon" title=${t("entfernen")} @click=${() => this.mutateDisplay((x) => x.playlist.splice(i, 1))}>✕</button>
            </span>
            ${this.condOpen === i || (when === "custom" && this.advanced)
              ? html`<div class="cond" @click=${(ev: Event) => ev.stopPropagation()}>
                  ${this.form([{ key: "show_if", label: "Nur zeigen, wenn …", type: "conditions" }], { show_if: e.show_if ?? [] }, (v) =>
                    this.mutateDisplay((x) => {
                      if (v.show_if?.length) x.playlist[i].show_if = v.show_if;
                      else delete x.playlist[i].show_if;
                    }),
                  )}
                </div>`
              : nothing}
          </li>`;
        })}
      </ol>
      <div class="adder">
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          (e.target as HTMLSelectElement).value = "";
          if (v.startsWith("tpl:")) this.addTemplatePage(v.slice(4), true);
          else if (v) this.mutateDisplay((x) => x.playlist.push({ page: v }));
        }}>
          <option value="">+ ${t("Seite hinzufügen …")}</option>
          <optgroup label=${t("Aus der Bibliothek")}>${unused.map((p) => html`<option value=${p.id}>${p.name}</option>`)}</optgroup>
          <optgroup label=${t("Neu aus Vorlage")}>${PAGE_TEMPLATES.map((tp) => html`<option value=${`tpl:${tp.id}`}>${t(tp.name)}</option>`)}</optgroup>
        </select>
        ${profile
          ? html`<button class="ghost" @click=${() => this.mutateDisplay((x) => (x.playlist = profilePlaylist(profile, c.pages)))}>
              ${t("Vorschlag für „{name}“ übernehmen", { name: t(profile.name) })}
            </button>`
          : nothing}
      </div>
      <h3>${t("Nachts")}</h3>
      ${this.form(
        displayFields(c).filter((f) => f.key.startsWith("night.")),
        d,
        (v) => this.replaceDisplay(v),
      )}
    `;
  }

  private widgetTags(p?: PageConfig) {
    const names = [...new Set((p?.widgets ?? []).map((w) => t(WIDGETS[w.type]?.name ?? w.type)))];
    return names.slice(0, 5).map((n) => html`<i>${n}</i>`);
  }

  /** Bibliothek: alle Seiten, wer sie zeigt, neue aus Vorlage */
  private renderLibrary() {
    const c = this.draft!;
    const at = ((this.pageIdx % Math.max(1, c.pages.length)) + c.pages.length) % Math.max(1, c.pages.length);
    return html`
      <p class="muted">${t("Jede Seite gibt es nur einmal – die Displays wählen in „Inhalte“, welche sie zeigen.")}</p>
      <ol class="playlist lib">
        ${c.pages.map((p, i) => {
          const users = c.displays.filter((d) => d.playlist.some((e) => e.page === p.id) || d.night?.page === p.id).map((d) => d.name);
          return html`<li class=${at === i ? "on" : ""} @click=${() => (this.pageIdx = i)}>
            <span class="num">${i + 1}</span>
            <div class="what">
              <b>${p.name}</b>
              <span class="types">${this.widgetTags(p)}</span>
            </div>
            <span class="muted users">${users.length ? users.join(", ") : t("von keinem Display gezeigt")}</span>
            <button class="small ghost" title=${t("Widgets der Seite anordnen und einstellen")} @click=${(ev: Event) => (ev.stopPropagation(), this.openPage(p.id))}>${t("Gestalten")}</button>
          </li>`;
        })}
      </ol>
      <div class="adder">
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          (e.target as HTMLSelectElement).value = "";
          if (v) this.addTemplatePage(v, false);
        }}>
          <option value="">+ ${t("Neue Seite aus Vorlage …")}</option>
          ${PAGE_TEMPLATES.map((tp) => html`<option value=${tp.id}>${t(tp.name)}</option>`)}
        </select>
      </div>
    `;
  }

  private setWhen(i: number, id: string): void {
    // „eigene Bedingung …“: Bedingungen unter dem Eintrag aufklappen
    this.condOpen = id === "custom" ? i : -1;
    const w = WHEN.find((x) => x.id === id);
    if (!w) return;
    this.mutateDisplay((x) => {
      if (w.show_if.length) x.playlist[i].show_if = structuredClone(w.show_if);
      else delete x.playlist[i].show_if;
    });
  }

  private move(i: number, by: number): void {
    this.mutateDisplay((x) => {
      const [e] = x.playlist.splice(i, 1);
      x.playlist.splice(i + by, 0, e);
    });
    this.pageIdx = i + by;
  }

  private addTemplatePage(id: string, toPlaylist: boolean): void {
    const tp = PAGE_TEMPLATES.find((x) => x.id === id);
    if (!tp) return;
    this.mutate((c) => {
      const pid = uniqueId(slug(t(tp.name)), c.pages.map((p) => p.id));
      c.pages.push({ id: pid, name: t(tp.name), ...tp.build(this.hass) } as PageConfig);
      if (toPlaylist) c.displays.find((d) => d.id === this.displayId)?.playlist.push({ page: pid });
    });
    this.pageIdx = toPlaylist ? (this.display?.playlist.length ?? 1) - 1 : this.draft!.pages.length - 1;
  }

  /* ───────── Aussehen (Display oder alle) ───────── */

  /** Herkunft eines Werts: eigener Wert dieses Displays oder wie alle Displays (Link zur Seite „Alle Displays“) */
  private origin(own: unknown, reset: () => void) {
    if (this.all) return nothing;
    return own !== undefined
      ? html`<button class="origin own" title=${t("Auf „wie alle Displays“ zurücksetzen")} @click=${reset}>${t("eigener Wert")} ↺</button>`
      : html`<button class="origin" title=${t("Zur Seite „Alle Displays“")} @click=${() => this.openDisplay(ALL)}>${t("wie alle Displays")} ↗</button>`;
  }

  private renderAussehen() {
    const c = this.draft!;
    const d = this.all ? undefined : this.display;
    const theme = d?.theme ?? c.design.theme;
    const amb = d?.design?.ambient?.type ?? c.design.ambient?.type;
    const palette = d?.design?.palette ?? c.design.palette;
    const cover = d?.design?.cover_colors ?? c.design.cover_colors;
    const mode = d?.mode ?? c.design.mode ?? "auto";
    const cardStyle = d?.design?.card_style ?? c.design.card_style;
    const gap = d?.design?.gap ?? c.design.gap;
    const radius = d?.design?.radius ?? c.design.radius;
    return html`
      <div class="row-head">
        <h3>${t("Stil")}</h3>
        ${this.origin(d?.theme, () => this.mutateDisplay((x) => delete x.theme))}
      </div>
      <p class="muted">${t("Mit der Maus über einen Stil fahren zeigt ihn rechts mit deinen Inhalten – Klicken übernimmt ihn.")}</p>
      <div class="themes" @mouseleave=${() => (this.hoverTheme = "")}>
        ${THEME_DEFS.filter((td) => !td.hidden).map((td) => {
          // „Jahreszeiten“ zeigt die Farben von heute
          const look = td.id === "saisonal" ? (THEME_DEFS.find((x) => x.id === seasonTheme(new Date())) ?? td) : td;
          const tok = look.dark;
          return html`<button
            class="theme ${theme === td.id ? "on" : ""}"
            style="--bg:${tok.bg};--ink:${tok.ink};--acc:${tok.accent};--font:${look.shared.display}"
            @mouseenter=${() => (this.hoverTheme = td.id)}
            @focus=${() => (this.hoverTheme = td.id)}
            @click=${() => {
              this.hoverTheme = "";
              this.setTop("theme", td.id);
            }}
          >
            <span class="sample"><span class="clock">12<i>:</i>34</span><span class="dot"></span></span>
            <b>${t(td.name)}</b>
          </button>`;
        })}
      </div>

      <div class="row-head">
        <h3>${t("Hell oder dunkel")}</h3>
        ${this.origin(d?.mode, () => this.mutateDisplay((x) => delete x.mode))}
      </div>
      <div class="seg wide">
        ${(
          [
            ["auto", "Nach der Sonne"],
            ["light", "Immer hell"],
            ["dark", "Immer dunkel"],
          ] as const
        ).map(([id, name]) => html`<button class=${mode === id ? "on" : ""} @click=${() => this.setTop("mode", id)}>${t(name)}</button>`)}
      </div>

      <div class="row-head">
        <h3>${t("Farben")}</h3>
        ${this.origin(d?.design?.palette ?? d?.design?.cover_colors, () => this.mutateDisplay((x) => (delete x.design?.palette, delete x.design?.cover_colors)))}
      </div>
      <div class="chips">
        <button class="chip ${!palette ? "on" : ""}" @click=${() => this.setDesign("palette", undefined)}>${t("Farben des Stils")}</button>
        ${Object.entries(PALETTES).map(
          ([id, p]) => html`<button class="chip ${palette === id ? "on" : ""}" @click=${() => this.setDesign("palette", id)}>
            <span class="sw" style="background:${p.dark.accent}"></span>${t(p.name)}
          </button>`,
        )}
        <button class="chip ${palette === "tagesverlauf" ? "on" : ""}" @click=${() => this.setDesign("palette", "tagesverlauf")}>${t("Tagesverlauf")}</button>
        <button class="chip ${cover ? "on" : ""}" @click=${() => this.setDesign("cover_colors", !cover)}>${t("Farben passend zum Cover")}</button>
      </div>

      <div class="row-head">
        <h3>${t("Kacheln")}</h3>
        ${this.origin(d?.design?.card_style ?? d?.design?.gap ?? d?.design?.radius, () =>
          this.mutateDisplay((x) => (delete x.design?.card_style, delete x.design?.gap, delete x.design?.radius)),
        )}
      </div>
      <p class="muted">${t("Wie die Karten der Widgets aussehen – einzelne Kacheln stellst du beim Gestalten einer Seite ein.")}</p>
      ${(
        [
          ["Karten", "card_style", cardStyle, [[undefined, "wie der Stil"], ["solid", "gefüllt"], ["glass", "Glas"], ["outline", "nur Umriss"], ["none", "ohne Fläche"]]],
          ["Abstand", "gap", gap, [[8, "eng"], [undefined, "normal"], [28, "luftig"]]],
          ["Ecken", "radius", radius, [[0, "eckig"], [12, "leicht rund"], [undefined, "wie der Stil"], [40, "rund"]]],
        ] as [string, string, unknown, [unknown, string][]][]
      ).map(
        ([group, key, current, choices]) => html`<div class="group">
          <span class="glabel">${t(group)}</span>
          <div class="chips">
            ${choices.map(
              ([value, name]) => html`<button class="chip ${current === value ? "on" : ""}" @click=${() => this.setDesign(key, value)}>${t(name)}</button>`,
            )}
          </div>
        </div>`,
      )}

      <div class="row-head">
        <h3>${t("Atmosphäre")}</h3>
        ${this.origin(d?.design?.ambient?.type, () => this.mutateDisplay((x) => delete x.design?.ambient))}
      </div>
      <p class="muted">${t("Eine ruhige Bewegung im Hintergrund – nachts automatisch aus. „Wie das Wetter“ wechselt mit dem Wetter (rechts simulieren).")}</p>
      ${AMBIENT_GROUPS.map(
        ([group, kinds]) => html`<div class="group">
          <span class="glabel">${t(group)}</span>
          <div class="chips">
            ${kinds.map(
              (k) => html`<button
                class="chip ${(amb ?? "none") === k ? "on" : ""}"
                @click=${() => this.setDesign("ambient", { ...((this.all ? c.design.ambient : d?.design?.ambient) ?? {}), type: k })}
              >
                ${t(ambientName(k))}
              </button>`,
            )}
          </div>
        </div>`,
      )}
      ${this.advanced
        ? html`<h3>${t("Feinschliff")}</h3>
            ${this.all
              ? html`${this.form(notShownAbove(LOOK_FIELDS.filter((f) => f.key !== "design.mode")), c, (v) => this.mutate((cc) => (cc.design = (v as AmbiframeConfig).design)))}
                  ${this.form(notShownAbove(MOTION_FIELDS), c, (v) => this.mutate((cc) => (cc.design = (v as AmbiframeConfig).design)))}`
              : this.form(notShownAbove(DISPLAY_DESIGN_FIELDS.filter((f) => f.key !== "design.css")), d!, (v) => this.replaceDisplay(v))}
            ${this.renderOwnColors()}
            ${this.all ? html`<h3>${t("Eigene Stile")}</h3>${this.renderPresets()}` : nothing}`
        : nothing}
    `;
  }

  /** Stil oder Hell/Dunkel: auf „Alle Displays“ global, sonst nur dieses Display */
  private setTop(key: "theme" | "mode", value: string): void {
    if (this.all) this.mutate((c) => ((c.design as Record<string, unknown>)[key] = value));
    else this.mutateDisplay((x) => ((x as unknown as Record<string, unknown>)[key] = value));
  }

  private setDesign(key: string, value: unknown): void {
    const apply = (design: Record<string, unknown>) => {
      if (value === undefined) delete design[key];
      else design[key] = value;
    };
    if (this.all) this.mutate((c) => apply(c.design as Record<string, unknown>));
    else
      this.mutateDisplay((x) => {
        x.design = { ...(x.design ?? {}) };
        apply(x.design as Record<string, unknown>);
      });
  }

  /* ───────── Momente ───────── */

  /** Eigene Farben je Hell/Dunkel und eigenes CSS – für alle oder nur dieses Display */
  private renderOwnColors() {
    const c = this.draft!;
    const d = this.all ? undefined : this.display;
    const target = (d ?? c) as object;
    const set = (v: Record<string, any>) =>
      d ? this.replaceDisplay(v) : this.mutate((cc) => (cc.design = (v as AmbiframeConfig).design));
    const own = d ? d.design?.colors : c.design.colors;
    return html`<details>
        <summary>${t("Eigene Farben · Dunkel")}</summary>
        ${this.form(colorFields("dark"), target, set)}
      </details>
      <details>
        <summary>${t("Eigene Farben · Hell")}</summary>
        ${this.form(colorFields("light"), target, set)}
      </details>
      ${own
        ? html`<p><button class="small ghost" @click=${() => (d ? this.mutateDisplay((x) => delete x.design?.colors) : this.mutate((cc) => delete cc.design.colors))}>
            ${t("Eigene Farben zurücksetzen")}
          </button></p>`
        : nothing}
      <details>
        <summary>${t("Eigenes CSS")}</summary>
        ${this.form(
          d ? DISPLAY_DESIGN_FIELDS.filter((f) => f.key === "design.css") : SHAPE_FIELDS.filter((f) => f.key === "design.css"),
          target,
          set,
        )}
      </details>`;
  }

  /** Gespeicherte Stile: anwenden, löschen, aktuellen speichern, exportieren, importieren */
  private renderPresets() {
    const c = this.draft!;
    const presets = c.design.presets ?? [];
    const snapshot = () => {
      const { presets: _skip, ...rest } = structuredClone(c.design);
      return rest as Record<string, unknown>;
    };
    const apply = (design: Record<string, unknown>) =>
      this.mutate((cc) => {
        const { presets: _skip, ...rest } = design as Record<string, unknown> & { presets?: unknown };
        cc.design = { ...(structuredClone(rest) as unknown as AmbiframeConfig["design"]), presets: cc.design.presets };
      });
    return html`${presets.length
        ? html`<div class="presets">
            ${presets.map(
              (p, i) => html`<div class="preset">
                <span>${p.name}</span>
                <button class="small ghost" @click=${() => apply(p.design)}>${t("Anwenden")}</button>
                <button class="icon" title=${t("Löschen")} @click=${() => this.mutate((cc) => cc.design.presets!.splice(i, 1))}>✕</button>
              </div>`,
            )}
          </div>`
        : html`<p class="muted">${t("Noch keine eigenen Stile – stelle Stil, Farben und Schriften ein und speichere sie hier.")}</p>`}
      <div class="preset-new">
        <input placeholder=${t("Name, z. B. Herbst")} .value=${this.presetName} @input=${(e: Event) => (this.presetName = (e.target as HTMLInputElement).value)} />
        <button
          class="small"
          ?disabled=${!this.presetName.trim()}
          @click=${() => {
            const name = this.presetName.trim();
            this.mutate((cc) => {
              const list = (cc.design.presets ??= []);
              const existing = list.find((p) => p.name === name);
              if (existing) existing.design = snapshot();
              else list.push({ name, design: snapshot() });
            });
            this.presetName = "";
          }}
        >
          ${t("Aktuellen Stil speichern")}
        </button>
      </div>
      <p>
        <button
          class="small ghost"
          @click=${async () => {
            const text = dump({ ambiframe_style: snapshot() }, { lineWidth: 120 });
            try {
              await navigator.clipboard.writeText(text);
              this.showNote({ kind: "ok", text: t("Stil als YAML in die Zwischenablage kopiert.") });
            } catch {
              this.importText = text;
              this.showNote({ kind: "ok", text: t("Stil unten als YAML – zum Kopieren markieren.") });
            }
          }}
        >
          ${t("Exportieren")}
        </button>
        <button class="small ghost" @click=${() => (this.importText = this.importText === null ? "" : null)}>${t("Importieren …")}</button>
      </p>
      ${this.importText !== null
        ? html`<textarea
              class="code"
              rows="8"
              placeholder="ambiframe_style: …"
              .value=${this.importText}
              @input=${(e: Event) => (this.importText = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
            <p>
              <button
                class="small"
                @click=${() => {
                  try {
                    const raw = load(this.importText ?? "") as Record<string, unknown> | null;
                    const design = (raw?.ambiframe_style ?? raw?.design ?? raw) as Record<string, unknown> | null;
                    if (!design || typeof design !== "object" || Array.isArray(design)) throw new Error(t("kein Stil gefunden"));
                    apply(design);
                    this.importText = null;
                    this.showNote({ kind: "ok", text: t("Stil übernommen – mit „Speichern“ dauerhaft machen.") });
                  } catch (err) {
                    this.showNote({ kind: "error", text: t("Import fehlgeschlagen: {error}", { error: String((err as Error)?.message ?? err) }) });
                  }
                }}
              >
                ${t("Übernehmen")}
              </button>
            </p>`
        : nothing}`;
  }

  /** Die ganze Konfiguration als YAML – ansehen, ändern, übernehmen (Technik für alle, nur „Erweitert“) */
  private renderYaml() {
    if (!this.yaml && this.draft) this.yaml = toYaml(this.draft);
    return html`<textarea class="code yaml" spellcheck="false" .value=${this.yaml} @input=${(e: Event) => (this.yaml = (e.target as HTMLTextAreaElement).value)}></textarea>
      <p class="actions">
        <button
          class="small"
          @click=${() => {
            try {
              const parsed = load(this.yaml) as AmbiframeConfig;
              if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.displays)) throw new Error(t("keine Ambiframe-Konfiguration"));
              this.mutate((cc) => Object.assign(cc, parsed));
              this.showNote({ kind: "ok", text: t("Übernommen – mit „Speichern“ dauerhaft machen.") });
            } catch (err) {
              this.showNote({ kind: "error", text: t("YAML ist nicht lesbar: {error}", { error: (err as Error).message }) });
            }
          }}
        >
          ${t("In den Editor übernehmen")}
        </button>
        <button class="small ghost" @click=${() => (this.yaml = toYaml(this.draft))}>${t("Neu laden")}</button>
        <button
          class="small ghost"
          @click=${async () => {
            const c = await this.hass?.callWS<AmbiframeConfig>({ type: "ambiframe/config/default" });
            if (c) this.yaml = toYaml(c);
          }}
        >
          ${t("Startkonfiguration anzeigen")}
        </button>
        <button
          class="small ghost"
          title=${t("Die Fassung vor dem letzten Speichern in den Editor holen (danach „Speichern“)")}
          @click=${async () => {
            const c = await this.hass?.callWS<AmbiframeConfig | null>({ type: "ambiframe/config/previous" }).catch(() => null);
            if (!c) {
              this.showNote({ kind: "error", text: t("Es gibt noch keine vorherige Fassung.") });
              return;
            }
            this.yaml = toYaml(c);
            this.showNote({ kind: "ok", text: t("Vorherige Fassung geladen – mit „In den Editor übernehmen“ und „Speichern“ wiederherstellen.") });
          }}
        >
          ${t("Vorherige Fassung laden")}
        </button>
      </p>`;
  }

  /** KI-Zusammenfassung jetzt erstellen (zählt nur Gespeichertes) */
  private async generateSummary(): Promise<void> {
    this.summaryNote = t("Gemini schreibt …");
    try {
      const s = await this.hass!.callWS<{ headline: string }>({ type: "ambiframe/summary/generate" });
      this.summaryNote = `Fertig: „${s.headline}“`;
    } catch (err) {
      this.summaryNote = (err as { message?: string }).message ?? t("Fehlgeschlagen");
    }
  }

  private renderMomente() {
    const c = this.draft!;
    const d = this.all ? undefined : this.display;
    const active = (ev: EventConfig) => !d || d.events === "all" || d.events.includes(ev.id);
    return html`
      <p class="muted">
        ${this.all
          ? t("Momente gelten für alle Displays. Auf der Seite eines Displays schaltest du einzelne für dieses Display ab.")
          : t("Momente gelten für alle Displays – hier legst du fest, welche dieses Display zeigt.")}
      </p>
      <div class="moments">
        ${c.events.map((ev) => {
          const open = this.openEvent === ev.id;
          const shownOn = c.displays.filter((x) => x.events === "all" || x.events.includes(ev.id)).map((x) => x.name);
          return html`<article class="moment ${active(ev) && ev.enabled !== false ? "" : "off"}">
            <div class="sentence">
              ${d
                ? html`<label class="switch" title=${t("Auf diesem Display")}
                    ><input type="checkbox" .checked=${active(ev)} @change=${(e: Event) => this.toggleEvent(ev.id, (e.target as HTMLInputElement).checked)} /><span></span
                  ></label>`
                : html`<label class="switch" title=${t("Aktiv")}
                    ><input
                      type="checkbox"
                      .checked=${ev.enabled !== false}
                      @change=${(e: Event) => this.mutate((cc) => (cc.events.find((x) => x.id === ev.id)!.enabled = (e.target as HTMLInputElement).checked))}
                    /><span></span
                  ></label>`}
              <div>
                <b>${ev.name || ev.title || ev.id}</b>
                <span class="muted">${this.sentence(ev)}</span>
                ${needsTrigger(ev)
                  ? html`<span class="missing">${ev.kind === "media" ? t("Player fehlt – bitte unter „Anpassen“ wählen") : t("Auslöser fehlt – bitte unter „Anpassen“ wählen")}</span>`
                  : nothing}
                ${this.all ? html`<span class="muted small">${t("Auf: {list}", { list: shownOn.join(", ") || t("keinem Display") })}</span>` : nothing}
              </div>
              <span class="btns">
                <button class="small" @click=${() => this.testMoment(ev.id)}>▶ ${t("Testen")}</button>
                <button class="small ghost" @click=${() => (this.openEvent = open ? "" : ev.id)}>${open ? t("Fertig") : t("Anpassen")}</button>
                <button
                  class="small ghost danger"
                  title=${t("Löschen")}
                  @click=${() => {
                    if (!confirm(t("Moment „{name}“ für alle Displays löschen?", { name: ev.name || ev.title || ev.id }))) return;
                    this.mutate((cc) => {
                      cc.events = cc.events.filter((x) => x.id !== ev.id);
                      // aus den Listen der Displays nehmen
                      for (const x of cc.displays) if (Array.isArray(x.events)) x.events = x.events.filter((e) => e !== ev.id);
                    });
                  }}
                >
                  ✕
                </button>
              </span>
            </div>
            ${open ? this.form(eventFields(c), ev, (v) => this.mutate((cc) => (cc.events[cc.events.findIndex((x) => x.id === ev.id)] = v as EventConfig))) : nothing}
          </article>`;
        })}
      </div>
      <h3>${t("Neuer Moment")}</h3>
      <div class="grid3">
        ${MOMENT_TEMPLATES.map(
          (m) => html`<button class="choice small" @click=${() => this.addMoment(m)}>
            <span class="ic">${iconSvg(m.icon)}</span><b>${t(m.name)}</b>
          </button>`,
        )}
      </div>
      <af-sound-library
        .hass=${this.hass}
        .sounds=${c.sounds ?? []}
        @sounds-changed=${(e: CustomEvent<{ sounds: SoundConfig[] }>) => this.mutate((cc) => void (cc.sounds = e.detail.sounds))}
      ></af-sound-library>
    `;
  }

  /** Ein Moment als Satz: Wenn … dann … */
  private sentence(ev: EventConfig): string {
    const name = (id?: string) => (id ? ((this.hass?.states[id]?.attributes.friendly_name as string | undefined) ?? id) : "…");
    const who = name(ev.entity);
    const when =
      ev.kind === "media"
        ? t("Wenn Musik läuft")
        : ev.to === "*"
          ? t("Wenn {name} sich meldet", { name: who })
          : (ev.to ?? "on") === "on"
            ? t("Wenn {name} anspringt", { name: who })
            : ev.to === "off"
              ? t("Wenn {name} ausgeht", { name: who })
              : t("Wenn {name} „{state}“ meldet", { name: who, state: ev.to! });
    const then = t("dann {what}", { what: t(KIND_TEXT[ev.kind] ?? ev.kind) });
    return `${when}, ${then}${ev.sound ? t(" mit Ton") : ""}`;
  }

  private toggleEvent(id: string, on: boolean): void {
    const all = this.draft!.events.map((e) => e.id);
    this.mutateDisplay((x) => {
      const list = x.events === "all" ? all : [...x.events];
      const next = on ? [...new Set([...list, id])] : list.filter((e) => e !== id);
      x.events = next.length === all.length ? "all" : next;
    });
  }

  private testMoment(id: string): void {
    (this.renderRoot.querySelector(".preview af-display") as AfDisplay | null)?.testEvent(id);
  }

  private addMoment(m: (typeof MOMENT_TEMPLATES)[number]): void {
    const id = uniqueId(m.id, this.draft!.events.map((e) => e.id));
    const guess = guessTrigger(this.hass, m.id);
    const event = { id, name: t(m.name), enabled: true, title: "", ...structuredClone(m.event) } as EventConfig;
    for (const [k, v] of Object.entries(guess)) if (v !== undefined && !(Array.isArray(v) && !v.length)) (event as unknown as Record<string, unknown>)[k] = v;
    this.mutate((c) => c.events.push(event));
    this.openEvent = id;
  }

  /* ───────── Technik (Display) bzw. Fotos & KI (alle) ───────── */

  private renderTechnik() {
    const c = this.draft!;
    if (this.all)
      return html`
        <details open><summary>${t("Fotos")}</summary>${this.form(DESIGN_FIELDS, c, (v) => this.mutate((cc) => (cc.photos = (v as AmbiframeConfig).photos)))}</details>
        <details>
          <summary>${t("KI-Zusammenfassung")}</summary>
          ${this.form(SUMMARY_FIELDS, c, (v) => this.mutate((cc) => (cc.summary = (v as AmbiframeConfig).summary)))}
          ${c.summary?.enabled
            ? html`<p><button class="small ghost" @click=${() => void this.generateSummary()}>${t("Jetzt erstellen")}</button> <span class="muted">${this.summaryNote}</span></p>`
            : nothing}
        </details>
        ${this.advanced ? html`<details><summary>${t("Für Fortgeschrittene: YAML")}</summary>${this.renderYaml()}</details>` : nothing}
      `;
    const d = this.display!;
    return html`
      <p class="muted">${t("Einmal einrichten und vergessen: Bedienung, Neustart, Ton, Videostream und Fotos.")}</p>
      <details open><summary>${t("Display")}</summary>${this.form(displayFields(c).filter((f) => !ELSEWHERE.has(f.key) && !f.key.startsWith("night.")), d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Töne")}</summary>${this.form(DISPLAY_SOUND_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Videostream")}</summary>${this.form(DISPLAY_STREAM_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Fotos")}</summary>${this.form(DISPLAY_PHOTO_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
    `;
  }

  private replaceDisplay(v: Record<string, unknown>): void {
    this.mutate((c) => {
      const i = c.displays.findIndex((x) => x.id === this.displayId);
      if (i >= 0) c.displays[i] = v as unknown as DisplayConfig;
    });
  }

  /** Vorhandene Formulare wiederverwenden – dieselben Felder wie im bisherigen Editor */
  private form(fields: Field[], value: object, onChange: (v: Record<string, any>) => void) {
    const key = `form-${fields.map((f) => f.key).join(",")}`;
    return html`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${fields}
      .value=${value}
      @value-changed=${(e: CustomEvent) => {
        if (e.target !== e.currentTarget || !e.detail?.value || typeof e.detail.value !== "object") return;
        this.formKey = key;
        onChange(e.detail.value);
        this.formKey = "";
      }}
    ></af-form>`;
  }

  /* ───────── Seite eines Displays bzw. „Alle Displays“ ───────── */

  private renderDisplay() {
    const d = this.display;
    if (!this.all && !d) return nothing;
    const all = this.all ? ALL_STEPS : this.wizard ? DISPLAY_STEPS.slice(0, 4) : DISPLAY_STEPS;
    const idx = Math.max(0, all.findIndex(([s]) => s === this.step));
    const [, title, question] = all[idx];
    const body =
      this.step === "ort" && d
        ? this.renderOrt(d)
        : this.step === "inhalte"
          ? this.all
            ? this.renderLibrary()
            : this.renderInhalte(d!)
          : this.step === "aussehen"
            ? this.renderAussehen()
            : this.step === "momente"
              ? this.renderMomente()
              : this.renderTechnik();
    return html`<div class="workspace">
      <nav class="steps">
        <button class="back" @click=${() => (this.view = "overview")}>${iconSvg("back")} ${t("Übersicht")}</button>
        <h2>${this.all ? t("Alle Displays") : d!.name}</h2>
        ${this.wizard ? html`<p class="muted">${t("Einrichtung in vier Schritten")}</p>` : nothing}
        ${all.map(
          ([s, name, q], i) => html`<button class="step ${this.step === s ? "on" : ""} ${this.wizard && i < idx ? "done" : ""}" @click=${() => ((this.step = s), (this.pageIdx = 0))}>
            <span class="n">${i + 1}</span><span><b>${t(name)}</b><small>${t(q)}</small></span>
          </button>`,
        )}
        <div class="jump">
          <span class="glabel">${t("Andere Seite")}</span>
          <select @change=${(e: Event) => this.openDisplay((e.target as HTMLSelectElement).value)}>
            <option value=${ALL} ?selected=${this.all}>${t("Alle Displays")}</option>
            ${this.draft!.displays.map((x) => html`<option value=${x.id} ?selected=${x.id === this.displayId}>${x.name}</option>`)}
          </select>
        </div>
      </nav>
      <main class="content">
        <header>
          <h2>${t(title)}</h2>
          <span class="muted">${t(question)}</span>
        </header>
        ${body}
        ${this.wizard
          ? html`<footer class="wiz">
              <button class="ghost" ?disabled=${idx === 0} @click=${() => (this.step = all[idx - 1][0])}>${t("Zurück")}</button>
              ${idx < all.length - 1
                ? html`<button class="primary" @click=${() => (this.step = all[idx + 1][0])}>${t("Weiter")}</button>`
                : html`<button
                    class="primary"
                    @click=${async () => {
                      await this.save();
                      this.wizard = false;
                    }}
                  >
                    ${t("Fertig – speichern")}
                  </button>`}
            </footer>`
          : nothing}
      </main>
      ${this.renderPreview()}
    </div>`;
  }

  /** Fotos zählen (Ordner, iCloud) – für „Bilderrahmen ohne Fotos“ */
  private async checkPhotos(): Promise<void> {
    const hass = this.hass;
    const photos = this.draft?.photos;
    if (!hass || !photos) return;
    let folder: number | null = null;
    let icloud: number | null = null;
    if (photos.folder) {
      try {
        const res = await hass.callWS<{ children?: { media_class: string; title: string }[] }>({ type: "media_source/browse_media", media_content_id: photos.folder });
        folder = (res.children ?? []).filter((c) => c.media_class === "image" || /\.(jpe?g|png|webp|avif)$/i.test(c.title)).length;
      } catch {
        folder = 0;
      }
    }
    if (photos.icloud) {
      try {
        icloud = (await hass.callWS<unknown[]>({ type: "ambiframe/photos/icloud", url: photos.icloud })).length;
      } catch {
        icloud = 0;
      }
    }
    this.photoHealth = { folder, icloud };
  }

  /** „Zeigen“ bei einem Hinweis: an die passende Stelle im Studio */
  private goTo(go?: HealthGo): void {
    if (!go) return;
    this.healthOpen = false;
    if (go.tab === "seiten" && go.pageId) return this.openPage(go.pageId);
    if (go.tab === "ereignisse") {
      this.openDisplay(ALL);
      this.step = "momente";
      this.openEvent = go.eventId ?? "";
      return;
    }
    if (go.tab === "wiedergabe") {
      this.openDisplay(go.displayId ?? this.draft?.displays[0]?.id ?? ALL);
      this.step = "inhalte";
      return;
    }
    // Fotos und KI
    this.openDisplay(ALL);
    this.step = "technik";
  }

  private renderHealth() {
    const issues = checkHealth(this.draft!, this.hass, this.status as never, this.photoHealth, __WB_VERSION__);
    const serious = issues.filter((i) => i.level !== "info").length;
    const bad = issues.some((i) => i.level === "error");
    const icons = { error: "warning", warn: "info", info: "info" } as const;
    return html`<span class="rel">
      <button
        class="ghost health ${bad ? "bad" : serious ? "warn" : "ok"}"
        title=${t("Gesundheitscheck: fehlende Entitäten, Geräte, Fotos")}
        @click=${() => {
          this.healthOpen = !this.healthOpen;
          if (this.healthOpen) void this.checkPhotos();
        }}
      >
        ${anyIcon(serious ? "warning" : "check")}<span>${serious ? (serious === 1 ? t("1 Hinweis") : t("{n} Hinweise", { n: serious })) : t("Alles gut")}</span>
      </button>
      ${this.healthOpen
        ? html`<div class="healthpanel">
            <div class="hhead">
              <b>${t("Gesundheitscheck")}</b>
              <button class="icon" title=${t("Schließen")} @click=${() => (this.healthOpen = false)}>✕</button>
            </div>
            ${issues.length
              ? html`<ul>
                  ${issues.map(
                    (i) => html`<li class=${i.level}>
                      ${anyIcon(icons[i.level])}<span class="htext">${i.text}</span>
                      ${i.go ? html`<button class="small ghost" @click=${() => this.goTo(i.go)}>${t("Zeigen")}</button>` : nothing}
                    </li>`,
                  )}
                </ul>`
              : html`<p class="muted">${anyIcon("check")} ${t("Alles in Ordnung: alle Entitäten da, Geräte verbunden, Fotos vorhanden.")}</p>`}
            ${this.photoHealth === undefined ? html`<p class="muted">${t("Fotos werden gezählt …")}</p>` : nothing}
          </div>`
        : nothing}
    </span>`;
  }

  /** Erster Start: Einrichtungsassistent (Ort, Inhalte, Momente, Fotos, Gerät) */
  private renderWizard() {
    const c = this.draft;
    if (!c || c.setup_complete !== false || this.wizardSkipped) return nothing;
    return html`<af-wizard
      .hass=${this.hass}
      .config=${c}
      mode="first"
      @wizard-done=${(e: CustomEvent<{ config: AmbiframeConfig; displayId: string }>) => {
        this.mutate((cc) => Object.assign(cc, e.detail.config));
        this.wizardSkipped = true;
        void this.save().then(() => this.openDisplay(e.detail.displayId));
      }}
      @wizard-close=${() => {
        // Nicht wieder fragen – „+ Display hinzufügen“ führt später ebenso durch die Schritte
        this.wizardSkipped = true;
        this.mutate((cc) => (cc.setup_complete = true));
        void this.save();
      }}
    ></af-wizard>`;
  }

  /** Seite gestalten: Seitenliste, Raster und Eigenschaften – Änderungen landen im selben Entwurf */
  private renderPageView() {
    const back = this.backView === "display" ? (this.all ? t("Alle Displays") : (this.display?.name ?? t("Zurück"))) : t("Übersicht");
    return html`<div class="pageview">
      <div class="pagehead">
        <button class="back" @click=${() => (this.view = this.backView)}>${iconSvg("back")} ${back}</button>
        <span class="muted">${t("Seiten gestalten – Widgets anordnen und einstellen")}</span>
      </div>
      <af-page-editor
        .hass=${this.hass}
        .config=${this.draft}
        .pageId=${this.editPage}
        .displayId=${(this.all ? this.draft?.displays[0]?.id : this.displayId) ?? ""}
        .advanced=${this.advanced}
        @change=${(e: CustomEvent<{ fn: (c: AmbiframeConfig) => void; coalesce: string }>) => this.mutate(e.detail.fn, e.detail.coalesce)}
        @change-end=${() => (this.coalesceKey = "")}
        @note=${(e: CustomEvent<Note>) => this.showNote(e.detail)}
      ></af-page-editor>
    </div>`;
  }

  private setAdvanced(on: boolean): void {
    this.advanced = on;
    try {
      localStorage.setItem(ADVANCED_KEY, on ? "1" : "0");
    } catch {
      /* privater Modus */
    }
  }

  render() {
    if (!this.draft) return html`<div class="loading">${t("Lädt …")}</div>`;
    return html`<div class="app">
      <div class="bar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <b>Ambiframe</b>
        ${this.note ? html`<span class="note ${this.note.kind}" @click=${() => (this.note = null)}>${this.note.text}</span>` : nothing}
        <span class="spacer"></span>
        ${this.renderHealth()}
        <label class="inline" title=${t("Weitere Einstellungen, eigene Bedingungen, Farben, CSS und YAML")}
          ><input type="checkbox" .checked=${this.advanced} @change=${(e: Event) => this.setAdvanced((e.target as HTMLInputElement).checked)} />${t("Erweitert")}</label
        >
        <button class="icon" title=${t("Rückgängig (⌘Z)")} ?disabled=${!this.canUndo} @click=${() => this.undo()}>↶</button>
        <button class="icon" title=${t("Wiederholen (⇧⌘Z)")} ?disabled=${!this.canRedo} @click=${() => this.redo()}>↷</button>
        <button class="ghost" ?disabled=${!this.dirty} @click=${() => this.load()}>${t("Verwerfen")}</button>
        <button class="primary" ?disabled=${!this.dirty || this.saving} @click=${() => this.save()}>
          ${this.saving ? t("Speichert …") : this.dirty ? t("Speichern") : t("Gespeichert")}
        </button>
      </div>
      ${this.view === "overview" ? this.renderOverview() : this.view === "page" ? this.renderPageView() : this.renderDisplay()}
      ${this.renderWizard()}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      --s-bg: var(--primary-background-color, #0f1114);
      --s-card: var(--card-background-color, #181b20);
      --s-ink: var(--primary-text-color, #eceef2);
      --s-mute: var(--secondary-text-color, #9aa1ab);
      --s-line: var(--divider-color, rgba(255, 255, 255, 0.1));
      --s-acc: var(--primary-color, #4aa3ff);
      background: var(--s-bg);
      color: var(--s-ink);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    }
    * {
      box-sizing: border-box;
    }
    .app {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--s-line);
    }
    .beta {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--s-acc) 20%, transparent);
      color: var(--s-acc);
    }
    .spacer {
      flex: 1;
    }
    h1 {
      margin: 0 0 4px;
      font-size: 26px;
    }
    h2 {
      margin: 0;
      font-size: 20px;
    }
    h3 {
      margin: 22px 0 8px;
      font-size: 15px;
    }
    .muted {
      color: var(--s-mute);
      font-size: 13px;
      margin: 0 0 8px;
    }
    .small {
      font-size: 12px;
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
      border-radius: 10px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      padding: 8px 14px;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--s-acc);
      border-color: transparent;
      color: #fff;
    }
    button.ghost {
      background: transparent;
    }
    button.small {
      padding: 5px 10px;
      font-size: 12px;
    }
    button.icon {
      padding: 4px 9px;
      line-height: 1;
    }
    .ic {
      width: 20px;
      height: 20px;
    }
    .ic.big {
      width: 34px;
      height: 34px;
      color: var(--s-acc);
    }
    input,
    select {
      font: inherit;
      color: inherit;
      background: var(--s-card);
      border: 1px solid var(--s-line);
      border-radius: 8px;
      padding: 7px 10px;
    }
    .inline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .field {
      display: grid;
      gap: 6px;
      font-size: 13px;
      color: var(--s-mute);
      max-width: 420px;
    }
    .field input {
      color: var(--s-ink);
    }

    /* Übersicht */
    .overview {
      padding: 24px;
      overflow: auto;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      margin-bottom: 20px;
    }
    .allcard {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 16px;
      align-items: center;
      padding: 16px 18px;
      margin-bottom: 18px;
      border-radius: 16px;
      border: 1px solid var(--s-line);
      background: linear-gradient(120deg, color-mix(in srgb, var(--s-acc) 14%, var(--s-card)), var(--s-card));
      cursor: pointer;
    }
    .allcard:hover,
    .dcard:hover {
      border-color: var(--s-acc);
    }
    .allcard h3 {
      margin: 0 0 4px;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 18px;
    }
    .dcard {
      background: var(--s-card);
      border: 1px solid var(--s-line);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
    }
    .mini {
      aspect-ratio: 16 / 10;
      position: relative;
      background: #000;
    }
    .mini af-display,
    .screen af-display {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      gap: 10px;
    }
    .meta h3 {
      margin: 0;
    }
    .pill {
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--s-mute) 20%, transparent);
      white-space: nowrap;
    }
    .pill.ok {
      background: color-mix(in srgb, #3ecf8e 22%, transparent);
      color: #3ecf8e;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      font-size: 13px;
    }
    .chip .ic {
      width: 16px;
      height: 16px;
    }
    .chip.on {
      border-color: var(--s-acc);
      background: color-mix(in srgb, var(--s-acc) 18%, var(--s-card));
    }
    .sw {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    /* Seite: Schritte · Inhalt · Vorschau */
    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 230px minmax(0, 1fr) minmax(320px, 42%);
    }
    .steps {
      border-right: 1px solid var(--s-line);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow: auto;
    }
    .steps .back {
      border: 0;
      background: none;
      padding: 0 0 10px;
      color: var(--s-mute);
      display: flex;
      gap: 6px;
      align-items: center;
      text-align: left;
    }
    .steps h2 {
      margin-bottom: 10px;
    }
    .step {
      display: flex;
      gap: 10px;
      text-align: left;
      border: 1px solid transparent;
      background: none;
      padding: 10px;
    }
    .step small {
      display: block;
      color: var(--s-mute);
      font-size: 12px;
    }
    .step .n {
      width: 24px;
      height: 24px;
      flex: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 12px;
      border: 1px solid var(--s-line);
    }
    .step.on {
      background: var(--s-card);
      border-color: var(--s-line);
    }
    .step.on .n {
      background: var(--s-acc);
      border-color: var(--s-acc);
      color: #fff;
    }
    .step.done .n {
      border-color: var(--s-acc);
      color: var(--s-acc);
    }
    .jump {
      margin-top: auto;
      padding-top: 16px;
      display: grid;
      gap: 6px;
    }
    .content {
      padding: 20px 24px 40px;
      overflow: auto;
    }
    .content header {
      margin-bottom: 14px;
    }
    .row-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
    .origin {
      font-size: 11px;
      color: var(--s-mute);
      border: 0;
      background: none;
      padding: 0;
    }
    .origin.own {
      color: var(--s-acc);
    }
    .grid3 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 10px;
    }
    .choice {
      display: grid;
      gap: 4px;
      text-align: left;
      padding: 14px;
      border-radius: 14px;
    }
    .choice small {
      color: var(--s-mute);
      font-size: 12px;
      line-height: 1.35;
    }
    .choice.small {
      grid-template-columns: auto 1fr;
      align-items: center;
    }
    .choice.on {
      border-color: var(--s-acc);
      background: color-mix(in srgb, var(--s-acc) 12%, var(--s-card));
    }
    .howto {
      margin-top: 18px;
      display: grid;
      gap: 6px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px dashed var(--s-line);
      font-size: 13px;
    }
    .playlist {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 8px;
    }
    .playlist li {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto 70px auto;
      gap: 10px;
      align-items: center;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      cursor: pointer;
    }
    .playlist.lib li {
      grid-template-columns: 28px minmax(0, 1fr) auto auto;
    }
    .playlist li.on {
      border-color: var(--s-acc);
    }
    .playlist .num {
      color: var(--s-mute);
      text-align: center;
    }
    .users {
      margin: 0;
      max-width: 200px;
      text-align: right;
    }
    .types {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
    .types i {
      font-style: normal;
      font-size: 11px;
      color: var(--s-mute);
      border: 1px solid var(--s-line);
      border-radius: 6px;
      padding: 1px 6px;
    }
    .btns {
      display: inline-flex;
      gap: 4px;
    }
    .adder {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }
    .themes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
      gap: 10px;
    }
    .theme {
      padding: 0;
      overflow: hidden;
      display: grid;
      text-align: left;
    }
    .theme .sample {
      position: relative;
      height: 64px;
      background: var(--bg);
      color: var(--ink);
      display: grid;
      place-items: center;
    }
    .theme .clock {
      font-family: var(--font);
      font-size: 26px;
    }
    .theme .clock i {
      font-style: normal;
      color: var(--acc);
    }
    .theme .dot {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--acc);
    }
    .theme b {
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 500;
    }
    .theme.on {
      border-color: var(--s-acc);
      box-shadow: 0 0 0 2px var(--s-acc);
    }
    .seg {
      display: inline-flex;
      border: 1px solid var(--s-line);
      border-radius: 10px;
      overflow: hidden;
    }
    .seg button {
      border: 0;
      border-radius: 0;
      padding: 6px 12px;
      font-size: 13px;
    }
    .seg button.on {
      background: var(--s-acc);
      color: #fff;
    }
    .group {
      margin: 8px 0;
    }
    .glabel {
      display: block;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--s-mute);
      margin-bottom: 6px;
    }
    .moments {
      display: grid;
      gap: 10px;
    }
    .moment {
      border: 1px solid var(--s-line);
      border-radius: 14px;
      background: var(--s-card);
      padding: 12px 14px;
    }
    .moment.off {
      opacity: 0.6;
    }
    .missing {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      color: #ff6b5b;
    }
    button.danger {
      color: #ff6b5b;
    }
    .sentence {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }
    .sentence .muted {
      display: block;
      margin: 2px 0 0;
    }
    .switch input {
      display: none;
    }
    .switch span {
      display: block;
      width: 38px;
      height: 22px;
      border-radius: 999px;
      background: var(--s-line);
      position: relative;
      cursor: pointer;
    }
    .switch span::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch input:checked + span {
      background: var(--s-acc);
    }
    .switch input:checked + span::after {
      transform: translateX(16px);
    }
    details {
      border: 1px solid var(--s-line);
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 10px;
      background: var(--s-card);
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    .wiz {
      position: sticky;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding: 14px 0 0;
      margin-top: 24px;
      background: linear-gradient(transparent, var(--s-bg) 30%);
    }
    .preview {
      border-left: 1px solid var(--s-line);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: auto;
    }
    .screen {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      border: 6px solid #111;
      flex: none;
    }
    .screen.portrait {
      aspect-ratio: 10 / 16;
      max-height: 70vh;
      align-self: center;
    }
    .controls {
      display: grid;
      gap: 10px;
    }
    .pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
    }
    .hint {
      font-size: 12px;
      color: var(--s-mute);
      margin: 0;
    }
    .loading {
      padding: 40px;
    }
    @media (max-width: 1000px) {
      .workspace {
        grid-template-columns: 1fr;
        overflow: auto;
      }
      .steps {
        flex-direction: row;
        flex-wrap: wrap;
        border-right: 0;
        border-bottom: 1px solid var(--s-line);
      }
      .steps h2,
      .step small,
      .jump {
        display: none;
      }
      /* Vorschau oben, damit man das Ergebnis immer sieht */
      .preview {
        order: -1;
        border-left: 0;
        border-bottom: 1px solid var(--s-line);
      }
      .playlist li {
        grid-template-columns: 24px minmax(0, 1fr) auto;
      }
      .allcard {
        grid-template-columns: auto 1fr;
      }
    }
    /* Hinweis oben (gespeichert, kopiert, Fehler) */
    .note {
      font-size: 13px;
      padding: 5px 12px;
      border-radius: 999px;
      cursor: pointer;
      max-width: 46vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .note.ok {
      background: color-mix(in srgb, #4caf50 18%, transparent);
    }
    .note.error {
      background: color-mix(in srgb, #f44336 20%, transparent);
    }
    .rel {
      position: relative;
    }
    .health {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .health .ic,
    .healthpanel .ic {
      width: 16px;
      height: 16px;
      flex: none;
    }
    .health.bad {
      color: var(--error-color, #e57373);
    }
    .health.warn {
      color: var(--warning-color, #ffb74d);
    }
    .health.ok .ic {
      color: var(--success-color, #81c784);
    }
    .healthpanel {
      position: absolute;
      z-index: 20;
      top: calc(100% + 8px);
      right: 0;
      width: min(520px, calc(100vw - 24px));
      max-height: 70vh;
      overflow: auto;
      padding: 14px 16px;
      border-radius: 14px;
      background: var(--s-card);
      border: 1px solid var(--s-line);
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.4);
    }
    .hhead {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .healthpanel ul {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
    }
    .healthpanel li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      border-top: 1px solid var(--s-line);
      font-size: 14px;
    }
    .healthpanel li.error .ic {
      color: var(--error-color, #e57373);
    }
    .healthpanel li.warn .ic {
      color: var(--warning-color, #ffb74d);
    }
    .htext {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    /* Geräte unter einer Display-Karte */
    .devices {
      list-style: none;
      margin: 0;
      padding: 8px 14px 12px;
      display: grid;
      gap: 4px;
      font-size: 12.5px;
    }
    .devices li {
      display: flex;
      gap: 8px;
      align-items: center;
      min-width: 0;
    }
    .devices .muted {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .devices .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
      background: var(--s-mute);
    }
    .devices .dot.on {
      background: #4caf50;
    }
    /* Eigene Stile, YAML */
    .presets {
      display: grid;
      gap: 6px;
      margin-bottom: 8px;
    }
    .preset,
    .preset-new {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .preset span {
      flex: 1;
    }
    .preset-new input {
      flex: 1;
    }
    textarea.code {
      width: 100%;
      font: 12.5px/1.5 ui-monospace, Menlo, monospace;
      color: var(--s-ink);
      background: color-mix(in srgb, var(--s-ink) 5%, transparent);
      border: 1px solid var(--s-line);
      border-radius: 10px;
      padding: 10px 12px;
    }
    textarea.code.yaml {
      min-height: 55vh;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    /* Wiedergabeliste: eigene Bedingung unter dem Eintrag */
    .playlist li .cond {
      grid-column: 1 / -1;
      cursor: default;
    }
    /* Seiteneditor im Studio */
    .pageview {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 12px 18px 40px;
    }
    .pagehead {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }
  `;
}

define("ambiframe-studio", AmbiframeStudio);
