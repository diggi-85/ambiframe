// Panel „ambiframe“: WYSIWYG-Editor – Seiten (Leinwand + Eigenschaften), Wiedergabe, Ereignisse, Design, YAML
import { dump, load } from "js-yaml";
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import "../display/display";
import type { AfDisplay } from "../display/display";
import "../editor/canvas";
import "../editor/form";
import "../editor/wizard";
import { checkHealth, type HealthGo, type PhotoHealth } from "../editor/health";
import { conditionLabel, formContext, type Field } from "../editor/form";
import { lang, locale, resolveLang, setLang, t } from "../i18n";
import {
  ACTION_FORM,
  ALIGN_FIELDS,
  SHAPE_FIELDS,
  WIDGET_LOOK_FIELDS,
  colorFields,
  DESIGN_FIELDS,
  EVENT_KINDS,
  LOOK_FIELDS,
  MOTION_FIELDS,
  SUMMARY_FIELDS,
  EVENT_TEMPLATES,
  PAGE_FIELDS,
  PAGE_TEMPLATES,
  WIDGET_FIELDS,
  defaultOptions,
  displayFields,
  DISPLAY_DESIGN_FIELDS,
  DISPLAY_PHOTO_FIELDS,
  DISPLAY_SOUND_FIELDS,
  DISPLAY_STREAM_FIELDS,
  eventFields,
  slug,
  uniqueId,
} from "../editor/schemas";
import { BASE, layoutOf, type Orientation, type Pos } from "../display/grid";
import { anyIcon } from "../icons";
import { THEMES } from "../styles";
import type { DisplayConfig, EventConfig, Hass, PageConfig, AmbiframeConfig, Theme, WidgetConfig } from "../types";
import { define } from "../widgets/base";

interface DisplayStatus {
  online: boolean;
  last_seen: string | null;
  page: string | null;
  paused: boolean;
  until: string | null;
  clients: { name: string; page: string | null; version: string | null; hidden: boolean; safe?: string | null; last_seen: string }[];
}
import { WIDGETS } from "../widgets/registry";

type Tab = "seiten" | "wiedergabe" | "ereignisse" | "design" | "yaml";
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

/** Leere Werte entfernen (undefined, "", leere Objekte) – leer heißt „wie alle Displays“ */
const prune = (v: unknown): unknown => {
  if (v === undefined || v === null || v === "") return undefined;
  if (Array.isArray(v)) return v;
  if (typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      const c = prune(x);
      if (c !== undefined) out[k] = c;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return v;
};

/** Felder des Design-Reiters für ein einzelnes Display: jede Auswahl bekommt „wie alle Displays“ */
const inheritFields = (fields: Field[]): Field[] =>
  fields.map((f) => {
    if (f.type === "select" && Array.isArray(f.options)) {
      return { ...f, options: [[undefined, "wie alle Displays"], ...f.options.filter(([v]) => v !== undefined)] } as Field;
    }
    if (f.type === "number" || f.type === "text" || f.type === "textarea") return { ...f, placeholder: "wie alle Displays" } as Field;
    return f;
  });
const toYaml = (c: unknown) => dump(c, { lineWidth: 120, noRefs: true });

class AmbiframePanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { attribute: false },
    route: { attribute: false },
    panel: { attribute: false },
    saved: { state: true },
    draft: { state: true },
    tab: { state: true },
    pageId: { state: true },
    widgetId: { state: true },
    eventId: { state: true },
    displayId: { state: true },
    message: { state: true },
    saving: { state: true },
    yaml: { state: true },
    menu: { state: true },
    previewMode: { state: true },
    summaryBusy: { state: true },
    summaryNote: { state: true },
    devices: { state: true },
    layout: { state: true },
    plOpen: { state: true },
    multi: { state: true },
    clip: { state: true },
    pageImport: { state: true },
    advanced: { state: true },
    importText: { state: true },
    presetName: { state: true },
    wizard: { state: true },
    healthOpen: { state: true },
    designScope: { state: true },
    photoHealth: { state: true },
  };

  hass?: Hass;
  narrow = false;
  private saved?: AmbiframeConfig;
  private draft?: AmbiframeConfig;
  private tab: Tab = "seiten";
  /** Wiedergabe-Einträge, deren Bedingungen gerade aufgeklappt sind */
  private plOpen = new Set<number>();
  /** weitere ausgewählte Widgets neben widgetId (Mehrfachauswahl) */
  private multi: string[] = [];
  /** zuletzt kopierte Widgets (für den „Einfügen“-Knopf) */
  private clip: WidgetConfig[] | null = null;
  /** Seiten-Import: eingefügter Text (null = zu) */
  private pageImport: string | null = null;
  /** Editor-Modus: einfach (nur das Nötige) oder erweitert (alles) – pro Gerät gemerkt */
  /** Design-Reiter: „“ = alle Displays, sonst die ID des Displays, für das abweichend gestaltet wird */
  private designScope = "";

  /** Gesundheitscheck: Liste offen? Fotos werden beim Öffnen gezählt */
  private healthOpen = false;
  private photoHealth?: PhotoHealth;

  /** Einrichtungsassistent: erster Start oder weiteres Display */
  private wizard: "" | "first" | "display" = "";
  private wizardSkipped = false;

  private advanced = (() => {
    try {
      return (localStorage.getItem("ambiframe-editor-advanced") ?? localStorage.getItem("wandbild-editor-advanced")) === "1";
    } catch {
      return false;
    }
  })();

  private setAdvanced(on: boolean): void {
    this.advanced = on;
    try {
      localStorage.setItem("ambiframe-editor-advanced", on ? "1" : "0");
    } catch {
      /* egal */
    }
    if (!on && this.tab === "yaml") this.tab = "seiten";
  }
  /** Design-Reiter: Text zum Importieren (null = zu) und Name für „als eigenen Stil speichern“ */
  private importText: string | null = null;
  private presetName = "";
  private pageId = "";
  private widgetId: string | null = null;
  private eventId = "";
  private displayId = "";
  private message: { kind: "ok" | "error"; text: string } | null = null;
  private saving = false;
  private yaml = "";
  private menu: "" | "page" | "widget" | "event" = "";
  /** Design-Reiter: Stile hell oder dunkel vorschauen */
  private previewMode: "light" | "dark" = "light";
  /** Seiten-Editor: Anordnung quer oder hoch bearbeiten */
  private layout: Orientation = "landscape";
  private summaryBusy = false;
  private summaryNote = "";
  private history: string[] = [];
  private future: string[] = [];
  private coalesceKey = "";
  private unsub?: Promise<(() => unknown) | undefined>;
  /** Welche Geräte gerade welches Display zeigen (Reiter „Wiedergabe“) */
  private devices: Record<string, DisplayStatus> = {};
  private devicesTimer?: number;

  /* ───────── Daten ───────── */

  protected updated(): void {
    if (this.hass && !this.unsub) {
      this.unsub = this.hass.connection
        .subscribeMessage<{ config: AmbiframeConfig }>((m) => this.onConfig(m.config), { type: "ambiframe/config/subscribe" })
        .catch((err: { message?: string }) => {
          this.message = { kind: "error", text: t("Ambiframe ist nicht erreichbar: {error}", { error: String(err?.message ?? err) }) };
          return undefined;
        });
    }
    // Gerätestatus nur abfragen, solange „Wiedergabe“ offen ist
    if (this.tab === "wiedergabe" && !this.devicesTimer && this.hass) {
      void this.loadDevices();
      this.devicesTimer = window.setInterval(() => void this.loadDevices(), 10e3);
    } else if (this.tab !== "wiedergabe" && this.devicesTimer) {
      clearInterval(this.devicesTimer);
      this.devicesTimer = undefined;
    }
  }

  /** KI-Zusammenfassung jetzt erstellen (nur gespeicherte Einstellungen zählen) */
  private async generateSummary(): Promise<void> {
    this.summaryBusy = true;
    this.summaryNote = "";
    try {
      const s = await this.hass!.callWS<{ headline: string }>({ type: "ambiframe/summary/generate" });
      this.summaryNote = `Fertig: „${s.headline}“`;
    } catch (err) {
      this.summaryNote = (err as { message?: string }).message ?? t("Fehlgeschlagen");
    } finally {
      this.summaryBusy = false;
    }
  }

  private async loadDevices(): Promise<void> {
    try {
      this.devices = (await this.hass?.callWS<Record<string, DisplayStatus>>({ type: "ambiframe/displays/status" })) ?? {};
    } catch {
      /* ältere Fassung ohne Gerätestatus */
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this.onKey);
    window.addEventListener("copy", this.onCopy);
    window.addEventListener("paste", this.onPaste);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("copy", this.onCopy);
    window.removeEventListener("paste", this.onPaste);
    void this.unsub?.then((u) => u?.());
    this.unsub = undefined;
    clearInterval(this.devicesTimer);
    this.devicesTimer = undefined;
  }

  private onConfig(config: AmbiframeConfig): void {
    const wasDirty = this.dirty;
    this.saved = config;
    if (!wasDirty || !this.draft) {
      this.draft = clone(config);
      this.history = [];
      this.future = [];
    }
    this.ensureSelection();
  }

  private ensureSelection(): void {
    const d = this.draft;
    if (!d) return;
    if (!d.pages.some((p) => p.id === this.pageId)) this.pageId = d.pages[0]?.id ?? "";
    if (!d.displays.some((x) => x.id === this.displayId)) this.displayId = d.displays[0]?.id ?? "";
    if (!d.events.some((e) => e.id === this.eventId)) this.eventId = d.events[0]?.id ?? "";
    const page = d.pages.find((p) => p.id === this.pageId);
    if (this.widgetId && !page?.widgets.some((w) => w.id === this.widgetId)) this.widgetId = null;
  }

  private get dirty(): boolean {
    return !!this.draft && !!this.saved && JSON.stringify(this.draft) !== JSON.stringify(this.saved);
  }

  /** Jede Änderung läuft hierüber: Kopie bearbeiten, Verlauf für Rückgängig pflegen. */
  private mutate(fn: (d: AmbiframeConfig) => void, coalesce = ""): void {
    if (!this.draft) return;
    if (!coalesce || coalesce !== this.coalesceKey) {
      this.history.push(JSON.stringify(this.draft));
      if (this.history.length > 100) this.history.shift();
      this.future = [];
    }
    this.coalesceKey = coalesce;
    const next = clone(this.draft);
    fn(next);
    this.draft = next;
    this.message = null;
    this.ensureSelection();
  }

  private undo(): void {
    const prev = this.history.pop();
    if (!prev || !this.draft) return;
    this.future.push(JSON.stringify(this.draft));
    this.draft = JSON.parse(prev);
    this.coalesceKey = "";
    this.ensureSelection();
  }

  private redo(): void {
    const next = this.future.pop();
    if (!next || !this.draft) return;
    this.history.push(JSON.stringify(this.draft));
    this.draft = JSON.parse(next);
    this.coalesceKey = "";
    this.ensureSelection();
  }

  private async save(): Promise<void> {
    if (!this.hass || !this.draft) return;
    this.saving = true;
    try {
      await this.hass.callWS({ type: "ambiframe/config/save", config: this.draft, language: lang() });
      this.saved = clone(this.draft);
      this.message = { kind: "ok", text: t("Gespeichert – alle Displays zeigen es sofort.") };
    } catch (err) {
      this.message = { kind: "error", text: (err as { message?: string }).message ?? String(err) };
    } finally {
      this.saving = false;
    }
  }

  private discard(): void {
    if (!this.saved) return;
    this.mutate((d) => Object.assign(d, clone(this.saved)));
    this.message = null;
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("pageId") || changed.has("layout")) this.multi = [];
  }

  /** Alle ausgewählten Widgets der aktuellen Seite (das zuletzt angeklickte zuerst) */
  private get selection(): string[] {
    const ids = new Set(this.page?.widgets.map((w) => w.id));
    return this.widgetId ? [this.widgetId, ...this.multi.filter((id) => id !== this.widgetId && ids.has(id))] : [];
  }

  private onSelect(e: CustomEvent): void {
    const { id, toggle, keep } = e.detail as { id: string | null; toggle?: boolean; keep?: boolean };
    const all = this.selection;
    if (!id) {
      this.widgetId = null;
      this.multi = [];
    } else if (toggle) {
      if (all.includes(id)) {
        const rest = all.filter((x) => x !== id);
        this.widgetId = rest[0] ?? null;
        this.multi = rest.slice(1);
      } else if (!this.widgetId) {
        this.widgetId = id;
      } else {
        this.multi = [...this.multi, id];
      }
    } else if (keep && all.includes(id)) {
      this.widgetId = id;
      this.multi = all.filter((x) => x !== id);
    } else {
      this.widgetId = id;
      this.multi = [];
    }
  }

  /* ───────── Kopieren, Einfügen, Vorlagen, Export ───────── */

  private selectedWidgets(): WidgetConfig[] {
    const ids = this.selection;
    return clone((this.page?.widgets ?? []).filter((w) => ids.includes(w.id)));
  }

  private async copyWidgets(widgets = this.selectedWidgets()): Promise<void> {
    if (!widgets.length) return;
    this.clip = widgets;
    try {
      await navigator.clipboard.writeText(dump({ ambiframe_widgets: widgets }, { lineWidth: 120 }));
    } catch {
      /* Zwischenablage gesperrt – „Einfügen“ im Editor geht trotzdem */
    }
    this.message = { kind: "ok", text: widgets.length === 1 ? t("Widget kopiert – mit ⌘V oder „Einfügen“ auf einer Seite einsetzen.") : t("{n} Widgets kopiert – mit ⌘V oder „Einfügen“ auf einer Seite einsetzen.", { n: widgets.length }) };
  }

  /** Widgets einfügen: neue IDs, gleiche Position (auf derselben Seite eine Zelle versetzt) */
  private pasteWidgets(widgets: WidgetConfig[]): void {
    const page = this.page;
    if (!page || !widgets.length) return;
    const taken = page.widgets.map((x) => x.id);
    const ids: string[] = [];
    const same = widgets.every((w) => page.widgets.some((o) => o.x === w.x && o.y === w.y && o.type === w.type));
    const portrait = page.widgets.some((o) => o.portrait);
    this.updatePage((p) => {
      for (const src of widgets) {
        if (!src?.type || !WIDGETS[src.type]) continue;
        const w = clone(src);
        w.id = uniqueId(w.id || w.type, [...taken, ...ids]);
        ids.push(w.id);
        w.w = Math.min(Math.max(1, w.w ?? 2), 12);
        w.h = Math.min(Math.max(1, w.h ?? 1), 8);
        w.x = Math.min(Math.max(0, (w.x ?? 0) + (same ? 1 : 0)), 12 - w.w);
        w.y = Math.min(Math.max(0, (w.y ?? 0) + (same ? 1 : 0)), 8 - w.h);
        w.options ??= {};
        if (!portrait) delete w.portrait;
        else if (!w.portrait) w.portrait = { x: 0, y: Math.max(0, BASE.portrait.rows - Math.min(w.h, BASE.portrait.rows)), w: BASE.portrait.cols, h: Math.min(w.h, BASE.portrait.rows) };
        p.widgets.push(w);
      }
    });
    this.widgetId = ids[0] ?? null;
    this.multi = ids.slice(1);
  }

  /** Text aus der Zwischenablage: Widgets oder eine ganze Seite */
  private pasteText(text: string): boolean {
    let raw: any;
    try {
      raw = load(text);
    } catch {
      return false;
    }
    if (Array.isArray(raw?.ambiframe_widgets)) {
      this.pasteWidgets(raw.ambiframe_widgets);
      return true;
    }
    if (raw?.ambiframe_page && typeof raw.ambiframe_page === "object") {
      this.importPage(raw.ambiframe_page);
      return true;
    }
    return false;
  }

  private onCopy = (e: ClipboardEvent): void => {
    const typing = (e.composedPath()[0] as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");
    if (typing || this.tab !== "seiten" || !this.selection.length) return;
    const widgets = this.selectedWidgets();
    e.preventDefault();
    e.clipboardData?.setData("text/plain", dump({ ambiframe_widgets: widgets }, { lineWidth: 120 }));
    this.clip = widgets;
    this.message = { kind: "ok", text: widgets.length === 1 ? t("Widget kopiert.") : t("{n} Widgets kopiert.", { n: widgets.length }) };
  };

  private onPaste = (e: ClipboardEvent): void => {
    const typing = (e.composedPath()[0] as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");
    if (typing || this.tab !== "seiten") return;
    const text = e.clipboardData?.getData("text/plain") ?? "";
    if (this.pasteText(text)) e.preventDefault();
  };

  private saveWidgetTemplate(): void {
    const widgets = this.selectedWidgets();
    if (!widgets.length) return;
    const name = prompt(t("Name der Vorlage"), widgets.length === 1 ? t(WIDGETS[widgets[0].type]?.name ?? widgets[0].type) : t("{n} Widgets", { n: widgets.length }));
    if (!name?.trim()) return;
    this.mutate((d) => {
      const list = ((d.templates ??= {}).widgets ??= []);
      const existing = list.find((x) => x.name === name.trim());
      if (existing) existing.widgets = widgets;
      else list.push({ name: name.trim(), widgets });
    });
    this.message = { kind: "ok", text: t("Vorlage „{name}“ gespeichert – unter „Eigene Vorlagen“.", { name: name.trim() }) };
  }

  private savePageTemplate(): void {
    const p = this.page;
    if (!p) return;
    const name = prompt(t("Name der Seitenvorlage"), p.name);
    if (!name?.trim()) return;
    const { id: _id, name: _name, ...rest } = clone(p);
    this.mutate((d) => {
      const list = ((d.templates ??= {}).pages ??= []);
      const existing = list.find((x) => x.name === name.trim());
      if (existing) existing.page = rest;
      else list.push({ name: name.trim(), page: rest });
    });
    this.menu = "";
    this.message = { kind: "ok", text: t("Seitenvorlage „{name}“ gespeichert – unter „+ Neu“.", { name: name.trim() }) };
  }

  private async exportPage(): Promise<void> {
    const p = this.page;
    if (!p) return;
    const text = dump({ ambiframe_page: p }, { lineWidth: 120 });
    try {
      await navigator.clipboard.writeText(text);
      this.message = { kind: "ok", text: t("Seite „{name}“ als YAML kopiert – woanders mit „+ Neu → Seite importieren“ oder ⌘V einsetzen.", { name: p.name }) };
    } catch {
      this.pageImport = text;
      this.message = { kind: "ok", text: t("Seite unten als YAML – zum Kopieren markieren.") };
    }
  }

  /** Seite aus Vorlage oder Import anlegen (neue ID, in die Wiedergabe des aktuellen Displays) */
  private importPage(src: Partial<PageConfig>, name?: string): void {
    if (!Array.isArray(src.widgets)) {
      this.message = { kind: "error", text: t("Keine Seite erkannt (es fehlen „widgets“).") };
      return;
    }
    const title = name ?? src.name ?? t("Importierte Seite");
    const id = uniqueId(slug(title), this.draft?.pages.map((p) => p.id) ?? []);
    const page: PageConfig = {
      duration: 30,
      background: { type: "none" },
      palette: "normal",
      ...clone(src),
      id,
      name: title,
    } as PageConfig;
    this.mutate((d) => {
      d.pages.push(page);
      const disp = d.displays.find((x) => x.id === this.displayId) ?? d.displays[0];
      disp?.playlist.push({ page: id });
    });
    this.pageId = id;
    this.widgetId = null;
    this.menu = "";
    this.pageImport = null;
    this.message = { kind: "ok", text: t("Seite „{name}“ angelegt – Seiten-IDs in Aktionen ggf. anpassen.", { name: title }) };
  }

  private onKey = (e: KeyboardEvent): void => {
    const typing = (e.composedPath()[0] as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === "s") {
      e.preventDefault();
      void this.save();
    } else if (mod && e.key.toLowerCase() === "z" && !typing) {
      e.preventDefault();
      if (e.shiftKey) this.redo();
      else this.undo();
    } else if (!typing && this.tab === "seiten" && this.widgetId) {
      const step: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        this.removeWidget();
      } else if (e.key === "Escape") {
        this.widgetId = null;
        this.multi = [];
      } else if (step[e.key]) {
        e.preventDefault();
        const [dx, dy] = step[e.key];
        const g = BASE[this.layout];
        const ws = (this.page?.widgets ?? []).filter((w) => this.selection.includes(w.id));
        const cur = ws.map((w) => ({ id: w.id, pos: this.posOf(w) }));
        if (!cur.length) return;
        if (e.shiftKey) {
          // Größe nur beim angeklickten Widget
          const c = cur[0].pos;
          const next = { ...c, w: Math.min(Math.max(1, c.w + dx), g.cols - c.x), h: Math.min(Math.max(1, c.h + dy), g.rows - c.y) };
          this.updatePage((p) => this.setPos(p, cur[0].id, next), "keys");
        } else {
          const fits = cur.every(({ pos }) => pos.x + dx >= 0 && pos.x + pos.w + dx <= g.cols && pos.y + dy >= 0 && pos.y + pos.h + dy <= g.rows);
          if (fits) this.updatePage((p) => cur.forEach(({ id, pos }) => this.setPos(p, id, { ...pos, x: pos.x + dx, y: pos.y + dy })), "keys");
        }
      } else if (mod && e.key.toLowerCase() === "d") {
        e.preventDefault();
        this.duplicateWidget();
      }
    }
  };

  /* ───────── Seiten & Widgets ───────── */

  private get page(): PageConfig | undefined {
    return this.draft?.pages.find((p) => p.id === this.pageId);
  }

  private get widget(): WidgetConfig | undefined {
    return this.page?.widgets.find((w) => w.id === this.widgetId);
  }

  private updatePage(fn: (p: PageConfig) => void, coalesce = ""): void {
    const id = this.pageId;
    this.mutate((d) => {
      const p = d.pages.find((x) => x.id === id);
      if (p) fn(p);
    }, coalesce);
  }

  /** Position eines Widgets in der gerade bearbeiteten Ausrichtung */
  private posOf(w: WidgetConfig): Pos {
    if (this.layout === "landscape") return { x: w.x, y: w.y, w: w.w, h: w.h };
    return layoutOf(this.page?.widgets ?? [], "portrait")[w.id] ?? { x: 0, y: 0, w: BASE.portrait.cols, h: 1 };
  }

  /**
   * Position setzen. Hochkant: Bei der ersten Änderung wird die automatische Anordnung für alle Widgets der Seite
   * festgeschrieben – so verschiebt sich nichts anderes, wenn man ein Widget bewegt.
   */
  private setPos(p: PageConfig, id: string, pos: Pos): void {
    const wd = p.widgets.find((o) => o.id === id);
    if (!wd) return;
    if (this.layout === "landscape") {
      Object.assign(wd, pos);
      return;
    }
    if (p.widgets.some((o) => !o.portrait)) {
      const auto = layoutOf(p.widgets, "portrait");
      for (const o of p.widgets) o.portrait ??= auto[o.id] ?? { x: 0, y: BASE.portrait.rows - 1, w: BASE.portrait.cols, h: 1 };
    }
    wd.portrait = { ...pos };
  }

  private updateWidget(fn: (w: WidgetConfig) => void, coalesce = ""): void {
    const id = this.widgetId;
    this.updatePage((p) => {
      const w = p.widgets.find((x) => x.id === id);
      if (w) fn(w);
    }, coalesce);
  }

  private addPage(templateId: string): void {
    const tpl = PAGE_TEMPLATES.find((x) => x.id === templateId) ?? PAGE_TEMPLATES[0];
    const name = tpl.id === "leer" ? t("Neue Seite") : t(tpl.name);
    const id = uniqueId(slug(name), this.draft?.pages.map((p) => p.id) ?? []);
    this.mutate((d) => {
      d.pages.push({ id, name, ...tpl.build(this.hass) });
      const disp = d.displays.find((x) => x.id === this.displayId) ?? d.displays[0];
      disp?.playlist.push({ page: id });
    });
    this.pageId = id;
    this.widgetId = null;
    this.menu = "";
  }

  private duplicatePage(): void {
    const p = this.page;
    if (!p) return;
    const id = uniqueId(`${p.id}_kopie`, this.draft?.pages.map((x) => x.id) ?? []);
    this.mutate((d) => d.pages.push({ ...clone(p), id, name: `${p.name} (Kopie)` }));
    this.pageId = id;
  }

  private removePage(): void {
    const p = this.page;
    if (!p || !confirm(t("Seite „{name}“ löschen?", { name: p.name }))) return;
    this.mutate((d) => {
      d.pages = d.pages.filter((x) => x.id !== p.id);
      for (const disp of d.displays) {
        disp.playlist = disp.playlist.filter((x) => x.page !== p.id);
        if (disp.night?.page === p.id) delete disp.night.page;
      }
    });
    this.widgetId = null;
  }

  private addWidget(type: string): void {
    const page = this.page;
    if (!page) return;
    const [w, h] = WIDGETS[type].size;
    const id = uniqueId(type, page.widgets.map((x) => x.id));
    // erste freie Stelle suchen, sonst oben links
    const taken = (x: number, y: number) => page.widgets.some((o) => x < o.x + o.w && x + w > o.x && y < o.y + o.h && y + h > o.y);
    let pos = { x: 0, y: 0 };
    outer: for (let y = 0; y + h <= 8; y++) {
      for (let x = 0; x + w <= 12; x++) {
        if (!taken(x, y)) {
          pos = { x, y };
          break outer;
        }
      }
    }
    this.updatePage((p) => {
      const widget: WidgetConfig = { id, type, ...pos, w, h, options: defaultOptions(type, this.hass) };
      if (p.widgets.some((o) => o.portrait)) {
        const P = BASE.portrait;
        const pw = Math.min(P.cols, Math.max(2, Math.round((w * P.cols) / 12)));
        const busy = (x: number, y: number) => p.widgets.some((o) => o.portrait && x < o.portrait.x + o.portrait.w && x + pw > o.portrait.x && y < o.portrait.y + o.portrait.h && y + h > o.portrait.y);
        let spot = { x: 0, y: Math.max(0, P.rows - h) };
        search: for (let y = 0; y + h <= P.rows; y++) {
          for (let x = 0; x + pw <= P.cols; x++) {
            if (!busy(x, y)) {
              spot = { x, y };
              break search;
            }
          }
        }
        widget.portrait = { ...spot, w: pw, h: Math.min(h, P.rows) };
      }
      p.widgets.push(widget);
    });
    this.widgetId = id;
    this.menu = "";
  }

  private duplicateWidget(): void {
    const widgets = this.selectedWidgets();
    if (!widgets.length) return;
    const taken = this.page?.widgets.map((x) => x.id) ?? [];
    const ids: string[] = [];
    this.updatePage((p) => {
      for (const w of widgets) {
        const id = uniqueId(w.id, [...taken, ...ids]);
        ids.push(id);
        const copy = { ...clone(w), id, x: Math.min(w.x + 1, 12 - w.w), y: Math.min(w.y + 1, 8 - w.h) };
        if (w.portrait) copy.portrait = { ...w.portrait, x: Math.min(w.portrait.x + 1, 8 - w.portrait.w), y: Math.min(w.portrait.y + 1, 12 - w.portrait.h) };
        p.widgets.push(copy);
      }
    });
    this.widgetId = ids[0] ?? null;
    this.multi = ids.slice(1);
  }

  private removeWidget(): void {
    const ids = this.selection;
    if (!ids.length) return;
    this.updatePage((p) => (p.widgets = p.widgets.filter((w) => !ids.includes(w.id))));
    this.widgetId = null;
    this.multi = [];
  }

  private onMove(e: CustomEvent): void {
    const { moves, done } = e.detail as { moves: (Pos & { id: string })[]; done: boolean };
    if (done) {
      this.coalesceKey = "";
      return;
    }
    const changed = moves.filter((m) => {
      const wd = this.page?.widgets.find((o) => o.id === m.id);
      if (!wd) return false;
      const cur = this.posOf(wd);
      return cur.x !== m.x || cur.y !== m.y || cur.w !== m.w || cur.h !== m.h;
    });
    if (!changed.length) return;
    this.updatePage((p) => changed.forEach(({ id, ...pos }) => this.setPos(p, id, pos)), `drag-${moves[0]?.id}-${this.layout}`);
  }

  /* ───────── Darstellung ───────── */

  private form(fields: Field[], value: Record<string, any>, onChange: (v: Record<string, any>) => void, coalesce: string): TemplateResult {
    return html`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${fields}
      .value=${value}
      @value-changed=${(e: CustomEvent) => {
        // Nur der Formularwert selbst (Objekt), nie ein einzelner Feldwert
        if (!e.detail?.value || typeof e.detail.value !== "object" || Array.isArray(e.detail.value)) return;
        onChange(e.detail.value);
        this.coalesceKey = coalesce;
      }}
    ></af-form>`;
  }

  private renderPages() {
    const d = this.draft!;
    const display = d.displays.find((x) => x.id === this.displayId);
    const inPlaylist = new Set(display?.playlist.map((x) => x.page));
    const w = this.widget;
    return html`<div class="pages">
      <aside class="list">
        <div class="head">
          <span>${t("Seiten")}</span>
          <span class="rel">
            <button class="small" @click=${() => (this.menu = this.menu === "page" ? "" : "page")}>${t("+ Neu")}</button>
            ${this.menu === "page"
              ? html`<div class="menu">
                  ${PAGE_TEMPLATES.map((tpl) => html`<button @click=${() => this.addPage(tpl.id)}>${t(tpl.name)}</button>`)}
                  ${d.templates?.pages?.length
                    ? html`<div class="sep">${t("Eigene Vorlagen")}</div>
                        ${d.templates.pages.map(
                          (tpl, i) => html`<div class="menu-row">
                            <button @click=${() => this.importPage(tpl.page, tpl.name)}>${tpl.name}</button>
                            <button
                              class="x"
                              title=${t("Vorlage löschen")}
                              @click=${() => confirm(t("Seitenvorlage „{name}“ löschen?", { name: tpl.name })) && this.mutate((dd) => dd.templates!.pages!.splice(i, 1))}
                            >
                              ✕
                            </button>
                          </div>`,
                        )}`
                    : nothing}
                  <div class="sep"></div>
                  <button @click=${() => ((this.pageImport = ""), (this.menu = ""))}>${t("Seite importieren …")}</button>
                </div>`
              : nothing}
          </span>
        </div>
        ${this.pageImport !== null
          ? html`<div class="import-box">
              <textarea
                class="code import"
                rows="8"
                placeholder="ambiframe_page: …"
                .value=${this.pageImport}
                @input=${(e: Event) => (this.pageImport = (e.target as HTMLTextAreaElement).value)}
              ></textarea>
              <span>
                <button
                  class="small"
                  @click=${() => {
                    try {
                      const raw = load(this.pageImport ?? "") as any;
                      this.importPage(raw?.ambiframe_page ?? raw);
                    } catch (err) {
                      this.message = { kind: "error", text: t("Import fehlgeschlagen: {error}", { error: String((err as Error)?.message ?? err) }) };
                    }
                  }}
                >
                  ${t("Importieren")}
                </button>
                <button class="small" @click=${() => (this.pageImport = null)}>${t("Abbrechen")}</button>
              </span>
            </div>`
          : nothing}
        <div class="entries">
        ${d.pages.map(
          (p) => html`<button class="entry ${p.id === this.pageId ? "on" : ""}" @click=${() => ((this.pageId = p.id), (this.widgetId = null))}>
            <span class="name">${p.name}</span>
            <span class="meta"
              >${[p.background?.type === "photo" ? t("Foto") : "", p.palette === "night" ? t("Nacht") : "", p.show_if?.length ? t("bedingt") : "", inPlaylist.has(p.id) ? "" : t("nicht in Wiedergabe")]
                .filter(Boolean)
                .join(" · ") || `${p.duration} s`}</span
            >
          </button>`,
        )}
        </div>
      </aside>
      <section class="stage">
        <div class="row-head">
          <span class="seg">
            ${(["landscape", "portrait"] as const).map(
              (o) => html`<button class="small ${this.layout === o ? "on" : ""}" @click=${() => (this.layout = o)}>${o === "landscape" ? t("Quer") : t("Hoch")}</button>`,
            )}
          </span>
          ${this.layout === "portrait"
            ? this.page?.widgets.some((x) => x.portrait)
              ? html`<span class="hint"
                  >Eigene Hochformat-Anordnung ·
                  <button class="small" @click=${() => this.updatePage((p) => p.widgets.forEach((x) => delete x.portrait))}>${t("Automatisch anordnen")}</button></span
                >`
              : html`<span class="hint">${t("Automatisch gestapelt – verschieben legt eine eigene Anordnung an")}</span>`
            : nothing}
        </div>
        <af-canvas
          .hass=${this.hass}
          .config=${d}
          .pageId=${this.pageId}
          .displayId=${this.displayId}
          .orientation=${this.layout}
          .selected=${this.widgetId}
          .selection=${this.selection}
          @select=${this.onSelect}
          @move=${this.onMove}
        ></af-canvas>
        <div class="palette">
          <span class="hint">${t("Widget hinzufügen:")}</span>
          ${Object.entries(WIDGETS)
            .filter(([type]) => this.advanced || type !== "card")
            .map(([type, wt]) => html`<button class="chip" @click=${() => this.addWidget(type)}>${anyIcon(wt.icon)} ${t(wt.name)}</button>`)}
        </div>
        ${d.templates?.widgets?.length || this.clip
          ? html`<div class="palette">
              <span class="hint">${t("Eigene Vorlagen:")}</span>
              ${this.clip
                ? html`<button class="chip accent" @click=${() => this.pasteWidgets(this.clip!)}>
                    Einfügen (${this.clip.length === 1 ? WIDGETS[this.clip[0].type]?.name ?? this.clip[0].type : `${this.clip.length} Widgets`})
                  </button>`
                : nothing}
              ${(d.templates?.widgets ?? []).map(
                (tpl, i) => html`<span class="chip tpl">
                  <button @click=${() => this.pasteWidgets(tpl.widgets)}>${tpl.name}</button>
                  <button
                    class="x"
                    title=${t("Vorlage löschen")}
                    @click=${() => confirm(t("Vorlage „{name}“ löschen?", { name: tpl.name })) && this.mutate((dd) => dd.templates!.widgets!.splice(i, 1))}
                  >
                    ✕
                  </button>
                </span>`,
              )}
            </div>`
          : nothing}
        <div class="hint keys">${t("Ziehen zum Verschieben · Punkt unten rechts zum Vergrößern · Pfeiltasten verschieben, mit ⇧ Größe · ⇧/⌘-Klick wählt mehrere · ⌘C/⌘V kopiert und fügt ein · ⌫ löscht · ⌘D dupliziert · ⌘Z rückgängig")}</div>
      </section>
      <aside class="inspector">
        ${this.selection.length > 1
          ? html`<div class="head">
                <span>${t("{n} Widgets ausgewählt", { n: this.selection.length })}</span>
              </div>
              <p class="actions-row">
                <button class="small" @click=${() => void this.copyWidgets()}>${t("Kopieren")}</button>
                <button class="small" @click=${this.duplicateWidget}>${t("Duplizieren")}</button>
                <button class="small" @click=${this.saveWidgetTemplate}>${t("Als Vorlage")}</button>
                <button class="small danger" @click=${this.removeWidget}>${t("Löschen")}</button>
              </p>
              <p class="hint">${t("Ziehen oder Pfeiltasten verschieben alle gemeinsam. ⇧/⌘-Klick nimmt eins heraus, Esc hebt die Auswahl auf.")}</p>`
          : w
          ? html`<div class="head">
                <span>${anyIcon(WIDGETS[w.type]?.icon)} ${t(WIDGETS[w.type]?.name ?? w.type)}</span>
                <span>
                  ${this.advanced
                    ? html`<button class="small" @click=${() => void this.copyWidgets()} title=${t("Kopieren (⌘C)")}>${t("Kopieren")}</button>
                        <button class="small" @click=${this.saveWidgetTemplate} title=${t("Als eigene Vorlage speichern")}>${t("Vorlage")}</button>`
                    : nothing}
                  <button class="small" @click=${this.duplicateWidget} title=${t("Duplizieren")}>${t("Duplizieren")}</button>
                  <button class="small danger" @click=${this.removeWidget} title=${t("Löschen")}>${t("Löschen")}</button>
                </span>
              </div>
              <div class="pos" ?hidden=${!this.advanced}>
                ${(["x", "y", "w", "h"] as const).map((k) => {
                  const g = BASE[this.layout];
                  const pos = this.posOf(w);
                  return html`<label
                    >${t({ x: "Spalte", y: "Zeile", w: "Breite", h: "Höhe" }[k])}
                    <input
                      type="number"
                      min=${k === "w" || k === "h" ? 1 : 0}
                      max=${k === "x" || k === "w" ? g.cols : g.rows}
                      .value=${String(pos[k])}
                      @input=${(e: Event) => {
                        const n = Number((e.target as HTMLInputElement).value);
                        if (Number.isFinite(n)) this.updatePage((p) => this.setPos(p, w.id, { ...pos, [k]: n }), `pos-${k}-${this.layout}`);
                      }}
                  /></label>`;
                })}
              </div>
              ${this.form(ALIGN_FIELDS, w.options, (v) => this.updateWidget((x) => (x.options = v), `opt-${w.id}`), `opt-${w.id}`)}
              <h4>${t("Einstellungen")}</h4>
              ${this.form(WIDGET_FIELDS[w.type] ?? [], w.options, (v) => this.updateWidget((x) => (x.options = v), `opt-${w.id}`), `opt-${w.id}`)}
              ${this.advanced
                ? html`<h4>${t("Sichtbarkeit")}</h4>
              ${this.form(
                [{ key: "show_if", label: "Nur anzeigen wenn …", type: "conditions" }],
                { show_if: w.show_if },
                (v) => this.updateWidget((x) => (x.show_if = v.show_if ?? []), `if-${w.id}`),
                `if-${w.id}`,
              )}
              <h4>${t("Darstellung")}</h4>
              ${this.form(
                WIDGET_LOOK_FIELDS,
                { look: w.look },
                (v) =>
                  this.updateWidget((x) => {
                    if (v.look && Object.keys(v.look).length) x.look = v.look;
                    else delete x.look;
                  }, `look-${w.id}`),
                `look-${w.id}`,
              )}
              <h4>${t("Antippen")}</h4>
              ${this.form(
                ACTION_FORM,
                { tap_action: w.tap_action, hold_action: w.hold_action },
                (v) =>
                  this.updateWidget((x) => {
                    for (const k of ["tap_action", "hold_action"] as const) {
                      if (v[k]?.action) x[k] = v[k];
                      else delete x[k];
                    }
                  }, `act-${w.id}`),
                `act-${w.id}`,
              )}`
                : html`<p class="hint">${t("Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus „Erweitert“ (oben rechts).")}</p>`}`
          : this.page
            ? html`<div class="head">
                  <span>${t("Seite")}</span>
                  <span>
                    ${this.advanced
                      ? html`<button class="small" @click=${() => void this.exportPage()} title=${t("Als YAML kopieren")}>${t("Exportieren")}</button>
                          <button class="small" @click=${this.savePageTemplate} title=${t("Als eigene Seitenvorlage speichern")}>${t("Vorlage")}</button>`
                      : nothing}
                    <button class="small" @click=${this.duplicatePage}>${t("Duplizieren")}</button>
                    <button class="small danger" @click=${this.removePage}>${t("Löschen")}</button>
                  </span>
                </div>
                ${this.form(PAGE_FIELDS, this.page, (v) => this.updatePage((p) => Object.assign(p, v, { widgets: p.widgets, id: p.id }), `page-${this.pageId}`), `page-${this.pageId}`)}
                <p class="hint">${t("Tipp: Ein Widget anklicken, um es zu bearbeiten.")}</p>`
            : html`<p class="hint">${t("Noch keine Seite – oben „+ Neu“.")}</p>`}
      </aside>
    </div>`;
  }

  private renderDevices(displayId: string) {
    const status = this.devices[displayId];
    const pageName = (id?: string | null) => this.draft?.pages.find((p) => p.id === id)?.name ?? id ?? "–";
    const ago = (iso?: string | null) => {
      if (!iso) return t("nie");
      const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
      return s < 60 ? t("gerade eben") : s < 3600 ? t("vor {n} min", { n: Math.round(s / 60) }) : t("vor {n} h", { n: Math.round(s / 3600) });
    };
    if (!status?.clients.length) {
      return html`<p class="hint">${t("Gerade ist kein Gerät mit diesem Display verbunden")}${status?.last_seen ? ` (${t("zuletzt {time}", { time: ago(status.last_seen) })})` : ""}.</p>`;
    }
    return html`<div class="devices">
      ${status.clients.map(
        (c) => html`<div class="device">
          <span class="dot ${c.hidden ? "sleep" : "on"}"></span>
          <span class="dname">${c.name}</span>
          <span class="dmeta"
            >${c.safe ? `${t("Notfallmodus")} (${t(c.safe)})` : c.hidden ? t("Bildschirm aus") : pageName(c.page)} · ${ago(c.last_seen)}${c.version && c.version !== __WB_VERSION__ ? ` · ${t("ältere Version")}` : ""}</span
          >
        </div>`,
      )}
      ${status.paused ? html`<p class="hint">${t("Pausiert")}${status.until ? ` ${t("bis {when}", { when: new Date(status.until).toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }) })}` : ""}.</p>` : nothing}
    </div>`;
  }

  private renderPlayback() {
    const d = this.draft!;
    const display = d.displays.find((x) => x.id === this.displayId);
    if (!display) return html`<p class="hint">${t("Kein Display.")}</p>`;
    const idx = d.displays.indexOf(display);
    const upd = (fn: (x: DisplayConfig) => void, c = "") => this.mutate((dd) => fn(dd.displays[idx]), c);
    const move = (i: number, dir: number) =>
      upd((x) => {
        const [it] = x.playlist.splice(i, 1);
        x.playlist.splice(i + dir, 0, it);
      });
    const url = `${location.origin}/ambiframe-display?display=${encodeURIComponent(display.id)}`;
    return html`<div class="two">
      <section>
        <div class="row-head">
          ${d.displays.length > 1
            ? html`<select @change=${(e: Event) => (this.displayId = (e.target as HTMLSelectElement).value)}>
                ${d.displays.map((x) => html`<option value=${x.id} ?selected=${x.id === this.displayId}>${x.name}</option>`)}
              </select>`
            : html`<h3>${display.name}</h3>`}
          <button class="small" @click=${() => (this.wizard = "display")}>+ ${t("Display")}</button>
          <button
            class="small"
            ?hidden=${!this.advanced}
            title=${t("Dieses Display mit allen Einstellungen kopieren")}
            @click=${() => {
              const id = uniqueId("display", d.displays.map((x) => x.id));
              this.mutate((dd) => dd.displays.push({ ...clone(display), id, name: `${display.name} (${t("Kopie")})` }));
              this.displayId = id;
            }}
          >
            ${t("Kopieren")}
          </button>
        </div>
        <h4>${t("Wiedergabeliste")}</h4>
        <div class="playlist">
          ${display.playlist.map(
            (item, i) => html`<div class="pl">
              <span class="num">${i + 1}</span>
              <select @change=${(e: Event) => upd((x) => (x.playlist[i].page = (e.target as HTMLSelectElement).value))}>
                ${d.pages.map((p) => html`<option value=${p.id} ?selected=${p.id === item.page}>${p.name}</option>`)}
              </select>
              <input
                type="number"
                min="3"
                placeholder=${String(d.pages.find((p) => p.id === item.page)?.duration ?? 30)}
                .value=${item.duration != null ? String(item.duration) : ""}
                title=${t("Dauer in Sekunden (leer = Seitendauer)")}
                @input=${(e: Event) => {
                  const raw = (e.target as HTMLInputElement).value;
                  upd((x) => {
                    if (raw) x.playlist[i].duration = Number(raw);
                    else delete x.playlist[i].duration;
                  }, `pl-${i}`);
                }}
              />
              <span class="tools">
                <button
                  ?hidden=${!this.advanced && !item.show_if?.length}
                  class="small ${item.show_if?.length ? "cond" : ""}"
                  title=${item.show_if?.length ? item.show_if.map((c) => conditionLabel(c)).join(" · ") : t("Nur zu bestimmten Zeiten oder Bedingungen zeigen")}
                  @click=${() => {
                    const open = new Set(this.plOpen);
                    if (open.has(i)) open.delete(i);
                    else open.add(i);
                    this.plOpen = open;
                  }}
                >
                  ${item.show_if?.length ? t("bedingt") : t("Wann?")}
                </button>
                <button class="small" ?disabled=${i === 0} @click=${() => move(i, -1)}>↑</button>
                <button class="small" ?disabled=${i === display.playlist.length - 1} @click=${() => move(i, 1)}>↓</button>
                <button class="small" ?disabled=${display.playlist.length === 1} @click=${() => upd((x) => x.playlist.splice(i, 1))}>✕</button>
              </span>
            </div>
            ${this.plOpen.has(i)
              ? html`<div class="pl-cond">
                  ${this.form(
                    [
                      {
                        key: "show_if",
                        label: "Diesen Eintrag nur zeigen, wenn …",
                        type: "conditions",
                        help: "Z. B. Uhrzeit 05:00–11:00 für eine Morgen-Seite. Zusätzlich gilt die Bedingung der Seite selbst.",
                      },
                    ],
                    { show_if: item.show_if },
                    (v) =>
                      upd((x) => {
                        if (v.show_if?.length) x.playlist[i].show_if = v.show_if;
                        else delete x.playlist[i].show_if;
                      }, `pl-if-${display.id}-${i}`),
                    `pl-if-${display.id}-${i}`,
                  )}
                </div>`
              : nothing}`,
          )}
          <button class="small dashed" @click=${() => upd((x) => x.playlist.push({ page: d.pages[0]?.id ?? "" }))}>+ ${t("Seite in die Wiedergabe")}</button>
        </div>
        <h4>${t("Display")}</h4>
        ${this.form(displayFields(d), display, (v) => upd((x) => Object.assign(x, v, { id: x.id, playlist: x.playlist }), `disp-${display.id}`), `disp-${display.id}`)}
        <h4>${t("Eigenes Design")}</h4>
        <p class="hint">
          ${t("Nur was hier eingetragen ist, weicht vom Design ab – leer heißt „wie Design“.")}
          <button
            class="small"
            @click=${() => {
              this.designScope = display.id;
              this.tab = "design";
            }}
          >
            ${t("Mit Stil-Vorschau gestalten")}
          </button>
        </p>
        ${this.form(DISPLAY_DESIGN_FIELDS, display, (v) => upd((x) => Object.assign(x, { design: v.design }), `disp-design-${display.id}`), `disp-design-${display.id}`)}
        <h4>${t("Töne")}</h4>
        ${this.form(DISPLAY_SOUND_FIELDS, display, (v) => upd((x) => Object.assign(x, { sound: v.sound }), `disp-sound-${display.id}`), `disp-sound-${display.id}`)}
        <h4>${t("Videostream")}</h4>
        ${this.form(DISPLAY_STREAM_FIELDS, display, (v) => upd((x) => Object.assign(x, { stream: v.stream }), `disp-stream-${display.id}`), `disp-stream-${display.id}`)}
        ${display.stream?.enabled
          ? html`<p class="hint">${t(display.stream.resolution === "both" ? "Kameras „Ambiframe {name} Videostream“ (4K) und „… Videostream Full HD“ – im Dashboard, in Apple Home (HomeKit-Bridge) oder per „camera.play_stream“ auf dem Apple TV." : "Kamera „Ambiframe {name} Videostream“ – im Dashboard, in Apple Home (HomeKit-Bridge) oder per „camera.play_stream“ auf dem Apple TV.", { name: display.name })}</p>`
          : nothing}
        <h4>${t("Fotos")}</h4>
        ${this.form(DISPLAY_PHOTO_FIELDS, display, (v) => upd((x) => Object.assign(x, { photos: v.photos }), `disp-photos-${display.id}`), `disp-photos-${display.id}`)}
        <h4>${t("Geräte")}</h4>
        ${this.renderDevices(display.id)}
        <h4>${t("Auf dem Gerät öffnen")}</h4>
        <div class="url">
          <code>${url}</code><button class="small" @click=${() => navigator.clipboard?.writeText(url)}>Kopieren</button
          ><a class="small button" href=${url} target="_blank">${t("Öffnen")}</a>
        </div>
      </section>
      <section>
        <h4>${t("Vorschau (schnell)")}</h4>
        <div class="preview"><af-display preview .hass=${this.hass} .config=${d} display-id=${display.id} .speed=${0.15}></af-display></div>
      </section>
    </div>`;
  }

  private renderEvents() {
    const d = this.draft!;
    const ev = d.events.find((e) => e.id === this.eventId);
    const idx = ev ? d.events.indexOf(ev) : -1;
    return html`<div class="two">
      <section>
        <div class="row-head">
          <h3>${t("Ereignisse")}</h3>
          <span class="rel">
            <button class="small" @click=${() => (this.menu = this.menu === "event" ? "" : "event")}>${t("+ Neu")}</button>
            ${this.menu === "event"
              ? html`<div class="menu">
                  ${EVENT_TEMPLATES.map(
                    (tpl) => html`<button
                      @click=${() => {
                        const id = uniqueId(slug(t(tpl.name).split(" ")[0]), d.events.map((e) => e.id));
                        this.mutate((dd) => dd.events.push({ id, ...tpl.build(this.hass, dd) } as EventConfig));
                        this.eventId = id;
                        this.menu = "";
                      }}
                    >
                      ${t(tpl.name)}
                    </button>`,
                  )}
                </div>`
              : nothing}
          </span>
        </div>
        ${d.events.map((e) => {
          const kind = EVENT_KINDS.find((k) => k.id === e.kind);
          const triggers = [e.entity, ...(e.entities ?? [])].filter(Boolean);
          const target = e.kind === "page" ? ` → ${d.pages.find((p) => p.id === e.page)?.name ?? t("keine Seite")}` : "";
          return html`<button class="entry ${e.id === this.eventId ? "on" : ""} ${e.enabled === false ? "off" : ""}" @click=${() => (this.eventId = e.id)}>
            <span class="name">${anyIcon(e.icon ?? kind?.icon)} ${e.name ?? e.title}</span>
            <span class="meta"
              >${kind ? t(kind.short) : e.kind}${target} · ${triggers[0] ?? t("kein Auslöser")}${triggers.length > 1 ? ` +${triggers.length - 1}` : ""}${e.enabled === false
                ? ` · ${t("aus")}`
                : ""}</span
            >
          </button>`;
        })}
        <h4>${t("Testen")}</h4>
        <div class="preview small"><af-display preview .hass=${this.hass} .config=${d} display-id=${this.displayId}></af-display></div>
      </section>
      <section>
        ${ev
          ? html`<div class="row-head">
                <h3>${ev.name ?? ev.title}</h3>
                <span>
                  <button class="small" @click=${() => (this.renderRoot.querySelector(".preview.small af-display") as AfDisplay | null)?.testEvent(ev.id)}>▶ Testen</button>
                  <button class="small danger" @click=${() => confirm(t("Ereignis „{name}“ löschen?", { name: ev.name ?? ev.title })) && this.mutate((dd) => dd.events.splice(idx, 1))}>${t("Löschen")}</button>
                </span>
              </div>
              ${this.form(eventFields(d), ev,(v) => this.mutate((dd) => (dd.events[idx] = { ...(v as EventConfig), id: ev.id }), `ev-${ev.id}`), `ev-${ev.id}`)}`
          : html`<p class="hint">${t("Noch keine Ereignisse – oben „+ Neu“.")}</p>`}
      </section>
    </div>`;
  }

  private renderDesign() {
    const d = this.draft!;
    const disp = this.designScope ? d.displays.find((x) => x.id === this.designScope) : undefined;
    if (this.designScope && !disp) this.designScope = "";
    return disp ? this.renderDisplayDesign(disp) : this.renderAllDesign();
  }

  /** „Gilt für: Alle Displays · Küche · Fernseher“ */
  private renderDesignScope() {
    const d = this.draft!;
    if (d.displays.length < 2 && !this.designScope) return nothing;
    return html`<div class="scope">
      <span class="hint">${t("Gilt für")}</span>
      <span class="seg">
        <button class="small ${this.designScope ? "" : "on"}" @click=${() => (this.designScope = "")}>${t("Alle Displays")}</button>
        ${d.displays.map(
          (x) => html`<button class="small ${this.designScope === x.id ? "on" : ""}" @click=${() => (this.designScope = x.id)}>${x.name}</button>`,
        )}
      </span>
    </div>`;
  }

  private renderThemeCards(current: Theme, choose: (th: Theme) => void, preview: (th: Theme) => { cfg: AmbiframeConfig; id?: string }) {
    const d = this.draft!;
    const samplePage =
      d.displays[0]?.playlist.map((p) => d.pages.find((x) => x.id === p.page)).find((p) => p && p.background?.type !== "photo")?.id ?? d.pages[0]?.id;
    return html`<div class="row-head">
        <h3>${t("Stil")}</h3>
        <span class="seg">
          ${(["light", "dark"] as const).map(
            (m) => html`<button class="small ${this.previewMode === m ? "on" : ""}" @click=${() => (this.previewMode = m)}>${m === "light" ? "Hell" : "Dunkel"}</button>`,
          )}
        </span>
      </div>
      <div class="themes">
        ${THEMES.map((th) => {
          const { cfg, id } = preview(th.id as Theme);
          return html`<button class="theme ${current === th.id ? "on" : ""}" @click=${() => choose(th.id as Theme)}>
            <div class="mini">
              <af-display preview .hass=${this.hass} .config=${cfg} display-id=${id ?? ""} .fixedPage=${samplePage} .modeOverride=${this.previewMode}></af-display>
            </div>
            <div class="tname">${t(th.name)}</div>
            <div class="hint">${t(th.hint)}</div>
          </button>`;
        })}
      </div>`;
  }

  /** Design für ein einzelnes Display: dieselben Felder, gespeichert als Abweichung am Display (leer = wie alle) */
  private renderDisplayDesign(disp: DisplayConfig) {
    const d = this.draft!;
    const idx = d.displays.indexOf(disp);
    const view = {
      design: {
        ...clone(disp.design ?? {}),
        mode: disp.mode,
        text_size: disp.text_size,
        contrast: disp.contrast,
        transition: disp.transition,
      },
      photos: clone(disp.photos ?? {}),
    };
    const setDisp = (v: Record<string, any>) =>
      this.mutate((dd) => {
        const x = dd.displays[idx];
        const { mode, text_size, contrast, transition, theme: _theme, ...rest } = (v.design ?? {}) as Record<string, any>;
        const put = (key: keyof DisplayConfig, value: unknown) => {
          const clean = prune(value);
          if (clean === undefined) delete x[key];
          else (x as unknown as Record<string, unknown>)[key] = clean;
        };
        put("mode", mode);
        put("text_size", text_size);
        put("contrast", contrast);
        put("transition", transition);
        put("design", rest);
        if (v.photos) put("photos", v.photos);
      }, `design-${disp.id}`);
    const inherit = inheritFields;
    return html`${this.renderDesignScope()}
      <p class="hint">${t("Für „{name}“ gestalten: Was hier eingestellt ist, gilt nur für dieses Display. Leer = wie bei allen Displays.", { name: disp.name })}</p>
      ${this.renderThemeCards(
        disp.theme ?? d.design.theme,
        (th) => this.mutate((dd) => (dd.displays[idx].theme = th)),
        (th) => ({ cfg: { ...d, displays: d.displays.map((x) => (x.id === disp.id ? { ...x, theme: th } : x)) } as AmbiframeConfig, id: disp.id }),
      )}
      ${disp.theme
        ? html`<p class="hint"><button class="small" @click=${() => this.mutate((dd) => delete dd.displays[idx].theme)}>${t("Stil wie alle Displays")}</button></p>`
        : nothing}
      <div class="cols">
        <section class="narrow">
          <h3>${t("Hell/Dunkel & Schrift")}</h3>
          ${this.form(inherit(LOOK_FIELDS), view, setDisp, `ddesign-look-${disp.id}`)}
        </section>
        ${this.advanced
          ? html`<section class="narrow">
                <h3>${t("Eigene Farben · Dunkel")}</h3>
                ${this.form(colorFields("dark"), view, setDisp, `ddesign-dark-${disp.id}`)}
              </section>
              <section class="narrow">
                <h3>${t("Eigene Farben · Hell")}</h3>
                ${this.form(colorFields("light"), view, setDisp, `ddesign-light-${disp.id}`)}
              </section>
              <section class="narrow">
                <h3>${t("Form & CSS")}</h3>
                ${this.form(inherit(SHAPE_FIELDS), view, setDisp, `ddesign-shape-${disp.id}`)}
              </section>`
          : nothing}
        <section class="narrow">
          <h3>${t("Bewegung")}</h3>
          ${this.form(inherit(MOTION_FIELDS), view, setDisp, `ddesign-motion-${disp.id}`)}
        </section>
        <section class="narrow">
          <h3>${t("Fotos")}</h3>
          ${this.form(DISPLAY_PHOTO_FIELDS, view, setDisp, `ddesign-photos-${disp.id}`)}
        </section>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${() =>
            this.mutate((dd) => {
              const x = dd.displays[idx];
              for (const k of ["theme", "mode", "text_size", "contrast", "transition", "design", "photos"] as const) delete x[k];
            })}
        >
          ${t("Alle Abweichungen dieses Displays zurücksetzen")}
        </button>
      </p>`;
  }

  private renderAllDesign() {
    const d = this.draft!;
    const set = (v: Record<string, any>) => this.mutate((dd) => Object.assign(dd, { design: v.design ?? dd.design, photos: v.photos ?? dd.photos }), "design");
    return html`${this.renderDesignScope()}
      ${this.renderThemeCards(
        d.design.theme,
        (th) => this.mutate((dd) => (dd.design.theme = th)),
        (th) => ({ cfg: { ...d, design: { ...d.design, theme: th } } as AmbiframeConfig }),
      )}
      <div class="cols">
        <section class="narrow">
          <h3>${t("Hell/Dunkel & Schrift")}</h3>
          ${this.form(LOOK_FIELDS, d, set, "design-look")}
        </section>
        ${this.advanced
          ? html`<section class="narrow">
          <h3>${t("Eigene Farben · Dunkel")}</h3>
          ${this.form(colorFields("dark"), d, set, "design-colors-dark")}
        </section>
        <section class="narrow">
          <h3>${t("Eigene Farben · Hell")}</h3>
          ${this.form(colorFields("light"), d, set, "design-colors-light")}
          ${d.design.colors
            ? html`<p class="hint"><button class="small" @click=${() => this.mutate((dd) => delete dd.design.colors)}>${t("Eigene Farben zurücksetzen")}</button></p>`
            : nothing}
        </section>
        <section class="narrow">
          <h3>${t("Form & CSS")}</h3>
          ${this.form(SHAPE_FIELDS, d, set, "design-shape")}
        </section>
        <section class="narrow">
          <h3>${t("Eigene Stile")}</h3>
          ${this.renderPresets()}
        </section>`
          : nothing}
        <section class="narrow">
          <h3>${t("Bewegung")}</h3>
          ${this.form(MOTION_FIELDS, d, set, "design-motion")}
        </section>
        <section class="narrow">
          <h3>${t("Fotos")}</h3>
          ${this.form(DESIGN_FIELDS, d, (v) => this.mutate((dd) => Object.assign(dd, { photos: v.photos ?? dd.photos }), "design"), "design-photos")}
        </section>
        <section class="narrow">
          <h3>${t("KI-Zusammenfassung")}</h3>
          ${this.form(SUMMARY_FIELDS, d, (v) => this.mutate((dd) => Object.assign(dd, { summary: v.summary }), "design"), "design-summary")}
          ${d.summary?.enabled
            ? html`<p class="hint">
                <button class="small" ?disabled=${this.summaryBusy} @click=${() => void this.generateSummary()}>
                  ${this.summaryBusy ? t("Gemini schreibt …") : t("Jetzt erstellen")}
                </button>
                ${this.summaryNote}
              </p>`
            : nothing}
        </section>
      </div>`;
  }


  /** Gespeicherte Stile: anwenden, löschen, aktuellen speichern, exportieren, importieren */
  private renderPresets() {
    const d = this.draft!;
    const presets = d.design.presets ?? [];
    const snapshot = () => {
      const { presets: _skip, ...rest } = clone(d.design);
      return rest as Record<string, unknown>;
    };
    const apply = (design: Record<string, unknown>) =>
      this.mutate((dd) => {
        const { presets: _skip, ...rest } = design as Record<string, unknown> & { presets?: unknown };
        dd.design = { ...(clone(rest) as unknown as AmbiframeConfig["design"]), presets: dd.design.presets };
      });
    return html`${presets.length
        ? html`<div class="presets">
            ${presets.map(
              (p, i) => html`<div class="preset">
                <span>${p.name}</span>
                <button class="small" @click=${() => apply(p.design)}>${t("Anwenden")}</button>
                <button class="small" title=${t("Löschen")} @click=${() => this.mutate((dd) => dd.design.presets!.splice(i, 1))}>✕</button>
              </div>`,
            )}
          </div>`
        : html`<p class="hint">${t("Noch keine eigenen Stile – stelle Stil, Farben und Schriften ein und speichere sie hier.")}</p>`}
      <div class="preset-new">
        <input placeholder=${t("Name, z. B. Herbst")} .value=${this.presetName} @input=${(e: Event) => (this.presetName = (e.target as HTMLInputElement).value)} />
        <button
          class="small"
          ?disabled=${!this.presetName.trim()}
          @click=${() => {
            const name = this.presetName.trim();
            this.mutate((dd) => {
              const list = (dd.design.presets ??= []);
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
      <p class="hint">
        <button
          class="small"
          @click=${async () => {
            const text = dump({ ambiframe_style: snapshot() }, { lineWidth: 120 });
            try {
              await navigator.clipboard.writeText(text);
              this.message = { kind: "ok", text: t("Stil als YAML in die Zwischenablage kopiert.") };
            } catch {
              this.importText = text;
              this.message = { kind: "ok", text: t("Stil unten als YAML – zum Kopieren markieren.") };
            }
          }}
        >
          ${t("Exportieren")}
        </button>
        <button class="small" @click=${() => (this.importText = this.importText === null ? "" : null)}>Importieren …</button>
      </p>
      ${this.importText !== null
        ? html`<textarea
              class="code import"
              rows="8"
              placeholder="ambiframe_style: …"
              .value=${this.importText}
              @input=${(e: Event) => (this.importText = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
            <p class="hint">
              <button
                class="small"
                @click=${() => {
                  try {
                    const raw = load(this.importText ?? "") as Record<string, unknown> | null;
                    const design = (raw?.ambiframe_style ?? raw?.design ?? raw) as Record<string, unknown> | null;
                    if (!design || typeof design !== "object" || Array.isArray(design)) throw new Error(t("kein Stil gefunden"));
                    apply(design);
                    this.importText = null;
                    this.message = { kind: "ok", text: t("Stil übernommen – mit „Speichern“ dauerhaft machen.") };
                  } catch (err) {
                    this.message = { kind: "error", text: t("Import fehlgeschlagen: {error}", { error: String((err as Error)?.message ?? err) }) };
                  }
                }}
              >
                ${t("Übernehmen")}
              </button>
            </p>`
        : nothing}`;
  }

  private renderYaml() {
    if (!this.yaml && this.draft) this.yaml = toYaml(this.draft);
    return html`<div class="yaml">
      <textarea spellcheck="false" .value=${this.yaml} @input=${(e: Event) => (this.yaml = (e.target as HTMLTextAreaElement).value)}></textarea>
      <div class="actions">
        <button
          class="primary"
          @click=${() => {
            try {
              const parsed = load(this.yaml) as AmbiframeConfig;
              this.mutate((d) => Object.assign(d, parsed));
              this.message = { kind: "ok", text: t("Übernommen – mit „Speichern“ dauerhaft machen.") };
            } catch (err) {
              this.message = { kind: "error", text: t("YAML ist nicht lesbar: {error}", { error: (err as Error).message }) };
            }
          }}
        >
          ${t("In den Editor übernehmen")}
        </button>
        <button @click=${() => (this.yaml = toYaml(this.draft))}>${t("Neu laden")}</button>
        <span class="spacer"></span>
        <button
          @click=${async () => {
            const c = await this.hass?.callWS<AmbiframeConfig>({ type: "ambiframe/config/default" });
            if (c) this.yaml = toYaml(c);
          }}
        >
          ${t("Startkonfiguration anzeigen")}
        </button>
        <button
          title=${t("Die Fassung vor dem letzten Speichern in den Editor holen (danach „Speichern“)")}
          @click=${async () => {
            const c = await this.hass?.callWS<AmbiframeConfig | null>({ type: "ambiframe/config/previous" }).catch(() => null);
            if (!c) {
              this.message = { kind: "error", text: t("Es gibt noch keine vorherige Fassung.") };
              return;
            }
            this.yaml = toYaml(c);
            this.message = { kind: "ok", text: t("Vorherige Fassung geladen – mit „In den Editor übernehmen“ und „Speichern“ wiederherstellen.") };
          }}
        >
          ${t("Vorherige Fassung laden")}
        </button>
      </div>
    </div>`;
  }

  /** Fotos zählen: Ordner und iCloud-Album (für „Bilderrahmen ohne Fotos“) */
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

  private goTo(go?: HealthGo): void {
    if (!go) return;
    this.healthOpen = false;
    this.tab = go.tab;
    if (go.pageId) this.pageId = go.pageId;
    this.widgetId = go.widgetId ?? (go.pageId ? null : this.widgetId);
    if (go.eventId) this.eventId = go.eventId;
    if (go.displayId) this.displayId = go.displayId;
  }

  private renderHealthButton() {
    if (!this.draft) return nothing;
    const issues = checkHealth(this.draft, this.hass, this.devices, this.photoHealth, __WB_VERSION__);
    const serious = issues.filter((i) => i.level !== "info").length;
    const bad = issues.some((i) => i.level === "error");
    return html`<button
      class="health ${bad ? "bad" : serious ? "warn" : "ok"}"
      title=${t("Gesundheitscheck: fehlende Entitäten, Geräte, Fotos")}
      @click=${() => {
        this.healthOpen = !this.healthOpen;
        if (this.healthOpen) void this.checkPhotos();
      }}
    >
      ${anyIcon(serious ? "warning" : "check")}<span>${serious ? (serious === 1 ? t("1 Hinweis") : t("{n} Hinweise", { n: serious })) : t("Alles gut")}</span>
    </button>`;
  }

  private renderHealth() {
    if (!this.healthOpen || !this.draft) return nothing;
    const issues = checkHealth(this.draft, this.hass, this.devices, this.photoHealth, __WB_VERSION__);
    const icons = { error: "warning", warn: "info", info: "info" } as const;
    return html`<div class="healthpanel">
      <div class="hhead">
        <h3>${t("Gesundheitscheck")}</h3>
        <button class="icon" title=${t("Schließen")} @click=${() => (this.healthOpen = false)}>✕</button>
      </div>
      ${issues.length
        ? html`<ul>
            ${issues.map(
              (i) => html`<li class=${i.level}>
                ${anyIcon(icons[i.level])}<span class="htext">${i.text}</span>
                ${i.go ? html`<button class="small" @click=${() => this.goTo(i.go)}>${t("Zeigen")}</button>` : nothing}
              </li>`,
            )}
          </ul>`
        : html`<p class="hint">${anyIcon("check")} ${t("Alles in Ordnung: alle Entitäten da, Geräte verbunden, Fotos vorhanden.")}</p>`}
      ${this.photoHealth === undefined ? html`<p class="hint">${t("Fotos werden gezählt …")}</p>` : nothing}
    </div>`;
  }

  private renderWizard() {
    const d = this.draft;
    const mode = this.wizard || (d?.setup_complete === false && !this.wizardSkipped ? "first" : "");
    if (!d || !mode) return nothing;
    return html`<af-wizard
      .hass=${this.hass}
      .config=${d}
      mode=${mode}
      @wizard-done=${(e: CustomEvent<{ config: AmbiframeConfig; displayId: string }>) => {
        this.mutate((dd) => Object.assign(dd, e.detail.config));
        this.displayId = e.detail.displayId;
        this.tab = "wiedergabe";
        this.wizard = "";
        void this.save();
      }}
      @wizard-close=${() => {
        this.wizard = "";
        if (mode === "first") {
          // Nicht wieder fragen – der Assistent bleibt über „+ Display“ erreichbar
          this.wizardSkipped = true;
          this.mutate((dd) => (dd.setup_complete = true));
          void this.save();
        }
      }}
    ></af-wizard>`;
  }

  render() {
    setLang(resolveLang(this.draft?.design.language, this.hass?.language));
    // Display-Auswahl für die Bedingung „nur auf Display“
    if (this.draft) {
      formContext.displays = this.draft.displays.map((x) => [x.id, x.name] as [string, string]);
      formContext.pages = this.draft.pages.map((x) => [x.id, x.name] as [string, string]);
    }
    const tabs: [Tab, string][] = [
      ["seiten", "Seiten"],
      ["wiedergabe", "Wiedergabe"],
      ["ereignisse", "Ereignisse"],
      ["design", "Design"],
      ["yaml", "YAML"],
    ];
    const visibleTabs = tabs.filter(([id]) => this.advanced || id !== "yaml");
    return html`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Ambiframe</div>
        <nav>
          ${visibleTabs.map(
            ([id, label]) => html`<button
              class="tab ${this.tab === id ? "on" : ""}"
              @click=${() => {
                this.tab = id;
                this.menu = "";
                if (id === "yaml") this.yaml = "";
              }}
            >
              ${t(label)}
            </button>`,
          )}
        </nav>
        <span class="spacer"></span>
        ${this.renderHealthButton()}
        <span class="seg mode" title=${t("Einfach: nur das Nötige · Erweitert: alle Möglichkeiten")}>
          <button class="small ${this.advanced ? "" : "on"}" @click=${() => this.setAdvanced(false)}>${t("Einfach")}</button>
          <button class="small ${this.advanced ? "on" : ""}" @click=${() => this.setAdvanced(true)}>${t("Erweitert")}</button>
        </span>
        <button class="icon" title=${t("Rückgängig (⌘Z)")} ?disabled=${!this.history.length} @click=${this.undo}>↶</button>
        <button class="icon" title=${t("Wiederholen (⇧⌘Z)")} ?disabled=${!this.future.length} @click=${this.redo}>↷</button>
        <button ?disabled=${!this.dirty} @click=${this.discard}>${t("Verwerfen")}</button>
        <button class="primary" ?disabled=${!this.dirty || this.saving} @click=${this.save}>${this.saving ? t("Speichert …") : this.dirty ? t("Speichern") : t("Gespeichert")}</button>
      </div>
      ${this.message ? html`<div class="msg ${this.message.kind}" @click=${() => (this.message = null)}>${this.message.text}</div>` : nothing}
      ${this.dirty || this.saving
        ? html`<div class="savebar">
            <button ?disabled=${!this.dirty} @click=${this.discard}>${t("Verwerfen")}</button>
            <button class="primary" ?disabled=${!this.dirty || this.saving} @click=${this.save}>${this.saving ? t("Speichert …") : t("Speichern")}</button>
          </div>`
        : nothing}
      ${this.renderWizard()} ${this.renderHealth()}
      <main>
        ${!this.draft
          ? html`<p class="hint">${t("Lädt …")}</p>`
          : this.tab === "seiten"
            ? this.renderPages()
            : this.tab === "wiedergabe"
              ? this.renderPlayback()
              : this.tab === "ereignisse"
                ? this.renderEvents()
                : this.tab === "design"
                  ? this.renderDesign()
                  : this.renderYaml()}
      </main>
    `;
  }

  static styles = css`
    .scope {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin: 0 0 14px;
    }
    .health {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .health .ic {
      width: 16px;
      height: 16px;
    }
    .health.bad {
      color: var(--error-color, #e57373);
      border-color: var(--error-color, #e57373);
    }
    .health.warn {
      color: var(--warning-color, #ffb74d);
    }
    .health.ok .ic {
      color: var(--success-color, #81c784);
    }
    .healthpanel {
      position: fixed;
      z-index: 15;
      top: calc(var(--header-height, 56px) + 8px);
      right: 12px;
      width: min(520px, calc(100vw - 24px));
      max-height: calc(100vh - var(--header-height, 56px) - 32px);
      overflow: auto;
      box-sizing: border-box;
      padding: 14px 16px;
      border-radius: 14px;
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.4);
    }
    .hhead {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .hhead h3 {
      margin: 0;
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
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      font-size: 14px;
    }
    .healthpanel li .ic {
      width: 18px;
      height: 18px;
      flex: none;
    }
    .healthpanel li.error .ic {
      color: var(--error-color, #e57373);
    }
    .healthpanel li.warn .ic {
      color: var(--warning-color, #ffb74d);
    }
    .healthpanel li.info .ic {
      color: var(--secondary-text-color, #999);
    }
    .htext {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    :host {
      display: block;
      min-height: 100vh;
      background: var(--primary-background-color, #111);
      color: var(--primary-text-color, #eee);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
      font-size: 14px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px;
      background: var(--app-header-background-color, var(--primary-background-color));
      color: var(--app-header-text-color, var(--primary-text-color));
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      position: sticky;
      top: 0;
      z-index: 5;
    }
    .title {
      font-size: 20px;
      margin-right: 12px;
    }
    nav {
      display: flex;
      gap: 2px;
    }
    .spacer {
      flex: 1;
    }
    button,
    .button,
    select {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 999px;
      padding: 7px 14px;
      cursor: pointer;
      text-decoration: none;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .tab {
      background: transparent;
      border-color: transparent;
    }
    .tab.on,
    .primary,
    .entry.on,
    .theme.on {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .icon {
      padding: 6px 11px;
      font-size: 16px;
    }
    .small {
      padding: 4px 10px;
      font-size: 13px;
    }
    .danger {
      color: var(--error-color, #e57373);
    }
    .dashed {
      border-style: dashed;
      align-self: flex-start;
    }
    .msg {
      margin: 10px 16px 0;
      padding: 10px 14px;
      border-radius: 10px;
      white-space: pre-wrap;
      cursor: pointer;
    }
    .msg.ok {
      background: rgba(76, 175, 80, 0.15);
    }
    .msg.error {
      background: rgba(244, 67, 54, 0.15);
    }
    main {
      padding: 16px;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 17px;
      font-weight: 500;
    }
    h4 {
      margin: 18px 0 6px;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .ic {
      width: 1.1em;
      height: 1.1em;
      vertical-align: -0.2em;
    }
    .pages {
      display: grid;
      grid-template-columns: 210px minmax(0, 1fr) 380px;
      gap: 16px;
      align-items: start;
    }
    /* Leiste fürs Handy: Speichern immer erreichbar, unten am Bildschirmrand (nur bei schmalem Bildschirm) */
    .savebar {
      display: none;
    }
    @media (max-width: 760px) {
      :host {
        overflow-x: hidden;
      }
      .toolbar {
        flex-wrap: wrap;
        height: auto;
        row-gap: 6px;
        padding: 8px 10px;
      }
      .title {
        font-size: 18px;
        margin-right: 0;
      }
      /* Reiter in eigener Zeile, seitlich wischbar */
      nav {
        order: 10;
        flex: 1 1 100%;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      nav::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
      }
      /* Oben bleibt nur das Nötigste – Speichern/Verwerfen stehen unten */
      .toolbar > .mode,
      .toolbar > .primary,
      .toolbar > button:not(.icon):not(.primary) {
        display: none;
      }
      main {
        padding: 12px 10px calc(84px + env(safe-area-inset-bottom));
      }
      /* :host davor, weil die Regel für ≤ 1250 px weiter unten steht */
      :host .pages {
        grid-template-columns: minmax(0, 1fr);
      }
      /* Seitenliste als wischbare Zeile – sonst schiebt sie Vorschau und Einstellungen weit nach unten */
      .list .entries {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .list .entries::-webkit-scrollbar {
        display: none;
      }
      .list .entry {
        flex: none;
        width: auto;
        max-width: 200px;
        margin-top: 8px;
      }
      .list .entry .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .savebar {
        display: flex;
        gap: 10px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
        background: var(--card-background-color, #1c1c1c);
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.25);
      }
      .savebar button {
        flex: 1;
        padding: 12px;
        font-size: 16px;
      }
    }
    @media (max-width: 1250px) {
      .pages {
        grid-template-columns: 180px minmax(0, 1fr);
      }
      .pages .inspector {
        grid-column: 1 / -1;
      }
    }
    aside,
    section {
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 14px;
      padding: 12px;
    }
    .stage {
      background: transparent;
      border: 0;
      padding: 0;
    }
    .inspector {
      position: sticky;
      top: 72px;
      max-height: calc(100vh - 92px);
      overflow: auto;
    }
    .head,
    .row-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .rel {
      position: relative;
    }
    .menu {
      position: absolute;
      right: 0;
      top: 32px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      border-radius: 12px;
      background: var(--card-background-color, #222);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      min-width: 220px;
    }
    .menu button {
      text-align: left;
      border-radius: 8px;
    }
    .entry {
      display: block;
      width: 100%;
      text-align: left;
      border-radius: 10px;
      margin-top: 6px;
      padding: 8px 10px;
    }
    .entry .name {
      display: block;
      font-weight: 500;
    }
    .entry .meta {
      display: block;
      font-size: 12px;
      opacity: 0.7;
      margin-top: 2px;
      /* lange Entitäten (binary_sensor.…) umbrechen statt über den Rand zu laufen */
      overflow-wrap: anywhere;
    }
    .entry.off {
      opacity: 0.55;
    }
    .palette {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-top: 12px;
    }
    .chip {
      padding: 5px 11px;
      font-size: 13px;
    }
    .chip.accent {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .chip.tpl {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 999px;
    }
    .chip.tpl button {
      border: 0;
      background: transparent;
      padding: 5px 4px 5px 11px;
      font-size: 13px;
    }
    .chip.tpl button.x,
    .menu-row .x {
      padding: 5px 9px 5px 4px;
      opacity: 0.55;
    }
    .menu .sep {
      margin: 6px 4px 2px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      padding-top: 8px;
    }
    .menu-row {
      display: flex;
      gap: 2px;
    }
    .menu-row button:first-child {
      flex: 1;
    }
    .import-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 8px 0;
    }
    .actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .keys {
      margin-top: 8px;
    }
    .pos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 4px;
    }
    .pos label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .pos input {
      width: 100%;
      box-sizing: border-box;
      margin-top: 3px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 8px;
      padding: 6px 8px;
    }
    .two {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1000px) {
      .two {
        /* minmax(0, …): breite Vorschauen dürfen die Spalte nicht über den Bildschirm hinaus aufblähen */
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .playlist {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pl {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 80px auto;
      gap: 8px;
      align-items: center;
    }
    .pl-cond {
      margin: 0 0 6px 32px;
      padding: 4px 12px 8px;
      border-left: 2px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    .small.cond {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .pl select,
    .pl input {
      border-radius: 8px;
      padding: 6px 8px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      width: 100%;
      box-sizing: border-box;
    }
    .num {
      color: var(--secondary-text-color);
      text-align: right;
    }
    .devices {
      display: grid;
      gap: 6px;
      margin-bottom: 8px;
    }
    .device {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }
    .device .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .device .dot.on {
      background: #4caf50;
    }
    .device .dot.sleep {
      background: #9e9e9e;
    }
    .device .dname {
      font-weight: 500;
    }
    .device .dmeta {
      color: var(--secondary-text-color, #888);
    }
    .url {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    code {
      font-size: 12px;
      word-break: break-all;
    }
    .preview {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
    }
    .preview af-display,
    .mini af-display {
      position: absolute;
      inset: 0;
    }
    .themes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 14px;
      margin-bottom: 20px;
    }
    .theme {
      border-radius: 16px;
      padding: 10px;
      text-align: left;
    }
    .mini {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 10px;
      overflow: hidden;
      pointer-events: none;
    }
    .tname {
      font-weight: 500;
      margin-top: 8px;
    }
    .cols {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 8px 32px;
      align-items: start;
    }
    .seg {
      display: inline-flex;
      gap: 4px;
    }
    .seg button.on {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: transparent;
    }
    .narrow {
      max-width: 620px;
    }
    .seg.mode {
      margin-right: 8px;
    }
    [hidden] {
      display: none !important;
    }
    .presets {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 10px;
    }
    .preset {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .preset span {
      flex: 1;
      font-weight: 500;
    }
    .preset-new {
      display: flex;
      gap: 6px;
    }
    .preset-new input,
    textarea.import {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 6px 8px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    textarea.import {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      margin-top: 8px;
    }
    .yaml textarea {
      width: 100%;
      box-sizing: border-box;
      min-height: 70vh;
      font: 13px/1.5 ui-monospace, Menlo, monospace;
      color: var(--primary-text-color);
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 12px;
      padding: 14px;
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
  `;
}

define("ambiframe-panel", AmbiframePanel);
