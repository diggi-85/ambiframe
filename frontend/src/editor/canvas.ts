// Leinwand: echte Vorschau der Seite plus Bearbeitungsebene (auswählen, ziehen, Größe ändern) – quer 12×8 oder hoch 8×12.
// Mehrfachauswahl mit ⇧/⌘ – die Gruppe wird gemeinsam verschoben; beim Ziehen zeigen Hilfslinien bündige Kanten.
import { LitElement, css, html, nothing } from "lit";
import { t } from "../i18n";
import "../display/display";
import { BASE, cellRect, layoutOf, type Orientation, type Pos } from "../display/grid";
import type { Hass, AmbiframeConfig, WidgetConfig } from "../types";
import { checkConditions } from "../util";
import { define } from "../widgets/base";
import { WIDGETS } from "../widgets/registry";

interface Drag {
  id: string;
  mode: "move" | "resize";
  x0: number;
  y0: number;
  orig: Pos;
  /** alle mitbewegten Widgets mit Startposition */
  group: { id: string; pos: Pos }[];
}

export class AfCanvas extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    pageId: { attribute: false },
    displayId: { attribute: false },
    selected: { attribute: false },
    selection: { attribute: false },
    orientation: { attribute: false },
    scale: { state: true },
    grid: { type: Boolean },
  };

  hass?: Hass;
  config?: AmbiframeConfig;
  pageId = "";
  displayId = "";
  selected: string | null = null;
  /** alle ausgewählten Widgets (inkl. selected) */
  selection: string[] = [];
  orientation: Orientation = "landscape";
  grid = true;
  private scale = 0.5;
  private drag?: Drag;
  private resize = new ResizeObserver(() => this.measure());

  private get stage() {
    return BASE[this.orientation];
  }

  /** Hochkant: so hoch wie möglich, aber nicht höher als der sichtbare Bereich */
  private measure(): void {
    const g = this.stage;
    const maxHeight = Math.max(320, window.innerHeight - 220);
    const s = Math.min(this.offsetWidth / g.w, maxHeight / g.h);
    if (s > 0 && Math.abs(s - this.scale) > 0.001) this.scale = s;
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("orientation")) this.measure();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resize.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize.disconnect();
  }

  private emit(name: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail }));
  }

  private down(e: PointerEvent, w: WidgetConfig, pos: Pos, mode: Drag["mode"], layout: Record<string, Pos>): void {
    e.stopPropagation();
    e.preventDefault();
    if (mode === "move" && (e.shiftKey || e.metaKey || e.ctrlKey)) {
      this.emit("select", { id: w.id, toggle: true });
      return;
    }
    const ids = mode === "move" && this.selection.length > 1 && this.selection.includes(w.id) ? this.selection : [w.id];
    this.emit("select", { id: w.id, keep: ids.length > 1 });
    const group = ids.filter((id) => layout[id]).map((id) => ({ id, pos: { ...layout[id] } }));
    this.drag = { id: w.id, mode, x0: e.clientX, y0: e.clientY, orig: { ...pos }, group };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private move(e: PointerEvent): void {
    const d = this.drag;
    if (!d) return;
    const g = this.stage;
    const dc = Math.round((e.clientX - d.x0) / this.scale / ((g.w - 2 * g.padX + g.gap) / g.cols));
    const dr = Math.round((e.clientY - d.y0) / this.scale / ((g.h - 2 * g.padY + g.gap) / g.rows));
    const o = d.orig;
    if (d.mode === "resize") {
      const next = { x: o.x, y: o.y, w: Math.min(Math.max(1, o.w + dc), g.cols - o.x), h: Math.min(Math.max(1, o.h + dr), g.rows - o.y) };
      this.emit("move", { moves: [{ id: d.id, ...next }], done: false });
      return;
    }
    // Gruppe gemeinsam: Versatz so begrenzen, dass alle im Raster bleiben
    const ps = d.group.map((x) => x.pos);
    const cx = Math.min(Math.max(dc, -Math.min(...ps.map((p) => p.x))), Math.min(...ps.map((p) => g.cols - p.x - p.w)));
    const cy = Math.min(Math.max(dr, -Math.min(...ps.map((p) => p.y))), Math.min(...ps.map((p) => g.rows - p.y - p.h)));
    this.emit("move", { moves: d.group.map(({ id, pos }) => ({ id, x: pos.x + cx, y: pos.y + cy, w: pos.w, h: pos.h })), done: false });
  }

  /** Hilfslinien: Kanten und Mitten der gezogenen Widgets, die mit anderen bündig sind (in Pixeln der Bühne) */
  private guides(layout: Record<string, Pos>): { v: number[]; h: number[] } {
    const d = this.drag;
    if (!d) return { v: [], h: [] };
    const g = this.stage;
    const moving = new Set(d.group.map((x) => x.id));
    const edges = (p: Pos) => {
      const r = cellRect(g, p);
      return { v: [r.left, r.left + r.width / 2, r.left + r.width], h: [r.top, r.top + r.height / 2, r.top + r.height] };
    };
    const mine = Object.entries(layout).filter(([id]) => moving.has(id)).map(([, p]) => edges(p));
    const others = Object.entries(layout).filter(([id]) => !moving.has(id)).map(([, p]) => edges(p));
    const hit = (a: number[], b: number[]) => a.filter((x) => b.some((y) => Math.abs(x - y) < 0.5));
    const v = new Set<number>();
    const h = new Set<number>();
    for (const m of mine)
      for (const o of others) {
        hit(m.v, o.v).forEach((x) => v.add(x));
        hit(m.h, o.h).forEach((x) => h.add(x));
      }
    return { v: [...v], h: [...h] };
  }

  private up(): void {
    if (!this.drag) return;
    this.emit("move", { moves: [], done: true });
    this.drag = undefined;
  }

  render() {
    const page = this.config?.pages.find((p) => p.id === this.pageId);
    const s = this.scale;
    const g = this.stage;
    const layout = layoutOf(page?.widgets ?? [], this.orientation);
    const guides = this.guides(layout);
    const many = this.selection.length > 1;
    return html`<div class="frame" style="width:${g.w * s}px;height:${g.h * s}px">
      <af-display
        preview
        .hass=${this.hass}
        .config=${this.config}
        display-id=${this.displayId}
        .fixedPage=${this.pageId}
        .forceOrientation=${this.orientation}
      ></af-display>
      <div class="edit" @pointerdown=${() => this.emit("select", { id: null })} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
        ${this.grid
          ? Array.from({ length: g.cols * g.rows }, (_, i) => {
              const r = cellRect(g, { x: i % g.cols, y: Math.floor(i / g.cols), w: 1, h: 1 });
              return html`<i class="cell" style="left:${r.left * s}px;top:${r.top * s}px;width:${r.width * s}px;height:${r.height * s}px"></i>`;
            })
          : nothing}
        ${(page?.widgets ?? []).map((w) => {
          const pos = layout[w.id];
          if (!pos) return nothing;
          const r = cellRect(g, pos);
          const sel = this.selected === w.id || this.selection.includes(w.id);
          const hidden = !checkConditions(this.hass, w.show_if, { display: this.displayId, orientation: this.orientation });
          return html`<div
            class="box ${sel ? "sel" : ""} ${hidden ? "hidden" : ""}"
            style="left:${r.left * s}px;top:${r.top * s}px;width:${r.width * s}px;height:${r.height * s}px"
            @pointerdown=${(e: PointerEvent) => this.down(e, w, pos, "move", layout)}
          >
            <span class="tag">${t(WIDGETS[w.type]?.name ?? w.type)}${hidden ? ` · ${t("bedingt")}` : ""}</span>
            ${sel && !many ? html`<span class="handle" @pointerdown=${(e: PointerEvent) => this.down(e, w, pos, "resize", layout)}></span>` : nothing}
          </div>`;
        })}
        ${guides.v.map((x) => html`<i class="guide v" style="left:${x * s}px"></i>`)}
        ${guides.h.map((y) => html`<i class="guide h" style="top:${y * s}px"></i>`)}
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      user-select: none;
    }
    .frame {
      position: relative;
      margin: 0 auto;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
    }
    af-display {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .edit {
      position: absolute;
      inset: 0;
      touch-action: none;
    }
    .cell {
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, 0.07);
      border-radius: 4px;
      pointer-events: none;
    }
    .box {
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, 0.28);
      border-radius: 8px;
      cursor: grab;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .box:hover {
      border-color: rgba(255, 255, 255, 0.6);
    }
    .box.sel {
      border: 2px solid var(--primary-color, #d9b45f);
      background: rgba(217, 180, 95, 0.06);
      cursor: move;
    }
    .box.hidden {
      border-style: dotted;
      background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0 8px, transparent 8px 16px);
    }
    .tag {
      position: absolute;
      left: 6px;
      top: 6px;
      font: 500 11px/1 system-ui, sans-serif;
      color: #fff;
      background: rgba(0, 0, 0, 0.55);
      padding: 4px 7px;
      border-radius: 6px;
      opacity: 0;
      transition: opacity 0.15s;
      pointer-events: none;
      white-space: nowrap;
    }
    .box:hover .tag,
    .box.sel .tag {
      opacity: 1;
    }
    .guide {
      position: absolute;
      pointer-events: none;
      background: #ff4fa3;
      opacity: 0.85;
    }
    .guide.v {
      top: 0;
      bottom: 0;
      width: 1px;
    }
    .guide.h {
      left: 0;
      right: 0;
      height: 1px;
    }
    .handle {
      position: absolute;
      right: -7px;
      bottom: -7px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #d9b45f);
      border: 2px solid #fff;
      cursor: nwse-resize;
    }
  `;
}

define("af-canvas", AfCanvas);
