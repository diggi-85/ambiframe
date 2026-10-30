// Seiteneditor: Seitenliste, Leinwand (Raster) und Eigenschaften von Seite und Widgets.
// Der Entwurf gehört dem Studio: Änderungen gehen als „change“ (Funktion + Schlüssel zum Zusammenfassen) zurück,
// Hinweise als „note“. Speichern und Rückgängig (⌘S, ⌘Z) regelt das Studio.
import { dump, load } from "js-yaml";
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import "./canvas";
import "./form";
import type { Field } from "./form";
import { t } from "../i18n";
import { ACTION_FORM, ALIGN_FIELDS, WIDGET_LOOK_FIELDS, PAGE_FIELDS, PAGE_TEMPLATES, WIDGET_FIELDS, defaultOptions, slug, uniqueId } from "./schemas";
import { BASE, GRID_STEP, layoutOf, type Orientation, type Pos } from "../display/grid";
import { anyIcon } from "../icons";
import type { AmbiframeConfig, Hass, PageConfig, WidgetConfig } from "../types";
import { define } from "../widgets/base";
import { WIDGETS } from "../widgets/registry";

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

export type Note = { kind: "ok" | "error"; text: string };

export class AfPageEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    pageId: { attribute: false },
    displayId: { attribute: false },
    advanced: { attribute: false },
    widgetId: { state: true },
    multi: { state: true },
    clip: { state: true },
    pageImport: { state: true },
    menu: { state: true },
    layout: { state: true },
  };

  hass?: Hass;
  config?: AmbiframeConfig;
  pageId = "";
  /** Display für Vorschau und Wiedergabeliste neuer Seiten */
  displayId = "";
  advanced = false;
  private widgetId: string | null = null;
  /** weitere ausgewählte Widgets neben widgetId (Mehrfachauswahl) */
  private multi: string[] = [];
  /** zuletzt kopierte Widgets (für den „Einfügen“-Knopf) */
  private clip: WidgetConfig[] | null = null;
  /** Seiten-Import: eingefügter Text (null = zu) */
  private pageImport: string | null = null;
  private menu: "" | "page" | "widget" = "";
  /** Anordnung quer oder hoch bearbeiten */
  private layout: Orientation = "landscape";

  /** Änderung am Entwurf – das Studio wendet sie an (Rückgängig, Speichern) */
  private mutate(fn: (d: AmbiframeConfig) => void, coalesce = ""): void {
    this.dispatchEvent(new CustomEvent("change", { detail: { fn, coalesce } }));
  }

  /** Hinweis ans Studio (oben eingeblendet) */
  private set message(note: Note | null) {
    if (note) this.dispatchEvent(new CustomEvent("note", { detail: note }));
  }

  /** Ende einer Bewegung: das Studio beginnt danach einen neuen Rückgängig-Schritt */
  private set coalesceKey(key: string) {
    if (!key) this.dispatchEvent(new CustomEvent("change-end"));
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
  }

  render() {
    return this.config ? this.renderPages() : nothing;
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("pageId") || changed.has("layout")) this.multi = [];
    // Seite gelöscht oder per Rückgängig verschwunden: erste Seite nehmen
    if (this.config && !this.config.pages.some((p) => p.id === this.pageId)) this.pageId = this.config.pages[0]?.id ?? "";
    if (this.widgetId && !this.page?.widgets.some((w) => w.id === this.widgetId)) this.widgetId = null;
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
    if (typing || !this.selection.length) return;
    const widgets = this.selectedWidgets();
    e.preventDefault();
    e.clipboardData?.setData("text/plain", dump({ ambiframe_widgets: widgets }, { lineWidth: 120 }));
    this.clip = widgets;
    this.message = { kind: "ok", text: widgets.length === 1 ? t("Widget kopiert.") : t("{n} Widgets kopiert.", { n: widgets.length }) };
  };

  private onPaste = (e: ClipboardEvent): void => {
    const typing = (e.composedPath()[0] as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");
    if (typing) return;
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
    const id = uniqueId(slug(title), this.config?.pages.map((p) => p.id) ?? []);
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
    // Speichern und Rückgängig (⌘S, ⌘Z) übernimmt das Studio
    if (!typing && this.widgetId) {
      // Pfeiltasten verschieben in halben Zellen (wie das Raster)
      const q = GRID_STEP;
      const step: Record<string, [number, number]> = { ArrowLeft: [-q, 0], ArrowRight: [q, 0], ArrowUp: [0, -q], ArrowDown: [0, q] };
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
          const next = { ...c, w: Math.min(Math.max(q, c.w + dx), g.cols - c.x), h: Math.min(Math.max(q, c.h + dy), g.rows - c.y) };
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
    return this.config?.pages.find((p) => p.id === this.pageId);
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
    const id = uniqueId(slug(name), this.config?.pages.map((p) => p.id) ?? []);
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
    const id = uniqueId(`${p.id}_kopie`, this.config?.pages.map((x) => x.id) ?? []);
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
    const d = this.config!;
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

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color, #eee);
      font-size: 14px;
    }
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
    .seg {
      display: inline-flex;
      gap: 4px;
    }
    .seg button.on {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: transparent;
    }
    [hidden] {
      display: none !important;
    }
    textarea.import {
      width: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 6px 8px;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      font: 12px ui-monospace, Menlo, monospace;
      margin-top: 8px;
    }
    @media (max-width: 760px) {
      :host .pages {
        grid-template-columns: minmax(0, 1fr);
      }
      .list .entries {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .list .entry {
        flex: none;
        width: auto;
        max-width: 200px;
        margin-top: 8px;
      }
    }
  `;
}

define("af-page-editor", AfPageEditor);
