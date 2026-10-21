// Eine Seite: Hintergrund (Foto/Farbe/Kamera) und Widgets im Raster der Bühne (quer 12×8, hoch 8×12)
import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { html as staticHtml, unsafeStatic } from "lit/static-html.js";
import type { DisplayContext } from "../data";
import { fontStack } from "../fonts";
import { nightTokens, photoTokens } from "../styles";
import type { Hass, PageConfig, Photo, WidgetConfig } from "../types";
import { templateChanges } from "../template";
import { checkConditions, customStyle } from "../util";
import { define } from "../widgets/base";
import { WIDGETS } from "../widgets/registry";
import "../widgets/media";
import "./ambient";

import { BASE, cellRect, layoutOf, type Grid, type Orientation, type Pos } from "./grid";

const FLEX: Record<string, string> = { start: "flex-start", center: "center", end: "flex-end" };
const TEXT: Record<string, string> = { start: "left", center: "center", end: "right" };

/** Welche Webcam zuletzt je Seite lief (bleibt über Seitenwechsel erhalten) */
const camTurns = new Map<string, number>();

export class AfPage extends LitElement {
  static properties = {
    hass: { attribute: false },
    page: { attribute: false },
    ctx: { attribute: false },
    photo: { attribute: false },
    grid: { attribute: false },
    orientation: { attribute: false },
  };

  static styles = [
    nightTokens,
    photoTokens,
    css`
      :host {
        position: absolute;
        inset: 0;
        display: block;
      }
      .root {
        position: absolute;
        inset: 0;
        background-color: var(--af-bg);
        /* weiche Farbflächen des Stils (Glas, Aurora) – der fließende Verlauf ersetzt sie */
        background-image: var(--af-bg-art, none);
        color: var(--af-ink);
        overflow: hidden;
      }
      .root.flat {
        background-image: none;
      }
      .photo {
        position: absolute;
        inset: 0;
        background: #050706 center / cover no-repeat;
        animation: kb 70s linear both;
      }
      @keyframes kb {
        from {
          transform: scale(1.02);
        }
        to {
          transform: scale(1.12) translate(-1.2%, -0.8%);
        }
      }
      :host-context([evening]) .photo {
        filter: brightness(0.8) saturate(0.88);
      }
      /* Kamerabilder sind oft hell (Auto, Hauswand) – unten links kräftiger abdunkeln, damit Uhr und Text lesbar bleiben */
      .shade.cam {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.12) 72%, rgba(0, 0, 0, 0) 100%),
          linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 58%);
      }
      .bgcam {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(6, 8, 7, 0.84) 0%, rgba(6, 8, 7, 0.42) 27%, rgba(6, 8, 7, 0) 54%),
          linear-gradient(to right, rgba(6, 8, 7, 0.4) 0%, rgba(6, 8, 7, 0) 48%);
      }
      .credit {
        position: absolute;
        right: 56px;
        bottom: 56px;
        max-width: 380px;
        text-align: right;
        font: calc(15px * var(--af-fs, 1)) / 1.4 var(--af-sans);
        color: var(--af-ink-3);
      }
      .cell {
        position: absolute;
        display: flex;
        box-sizing: border-box;
      }
      .cell > * {
        flex: 1;
        min-width: 0;
      }
      /* Darstellung „als Karte“ – Fläche, Rand und Radius des Stils */
      .cell.boxed {
        background: var(--af-card, var(--af-surface));
        border: var(--af-card-border, 1px solid var(--af-line));
        border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
        border-radius: var(--af-card-radius, 32px);
        box-shadow: var(--af-card-shadow, none);
        backdrop-filter: var(--af-card-filter, none);
        -webkit-backdrop-filter: var(--af-card-filter, none);
        padding: var(--af-card-pad, 28px);
        overflow: hidden;
      }
      /* Antippbar: kurz eindrücken als Rückmeldung */
      .cell.act {
        cursor: pointer;
        transition: transform 0.25s var(--af-ease, ease), opacity 0.25s;
      }
      .cell.act:active {
        transform: scale(0.985);
        opacity: 0.85;
      }
      .unknown {
        border: 1px dashed var(--af-line);
        border-radius: 12px;
        color: var(--af-ink-3);
        font: 14px var(--af-sans);
        display: grid;
        place-items: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .photo {
          animation: none;
        }
      }
    `,
  ];

  hass?: Hass;
  page?: PageConfig;
  ctx?: DisplayContext;
  photo: Photo | null = null;
  grid: Grid = BASE.landscape;
  orientation: Orientation = "landscape";
  private refresh = () => this.requestUpdate();
  private holdTimer?: number;
  private held = false;

  /** Aktion ans Display melden – dort wird sie ausgeführt (mit Nachfrage, Rückmeldung, Vorschau-Schutz) */
  private act(w: WidgetConfig, kind: "tap_action" | "hold_action"): void {
    const action = w[kind];
    if (action) this.dispatchEvent(new CustomEvent("af-action", { detail: { action, widget: w }, bubbles: true, composed: true }));
  }

  private onDown(w: WidgetConfig): void {
    this.held = false;
    clearTimeout(this.holdTimer);
    if (!w.hold_action) return;
    this.holdTimer = window.setTimeout(() => {
      this.held = true;
      this.act(w, "hold_action");
    }, 600);
  }

  private onClick(e: Event, w: WidgetConfig): void {
    clearTimeout(this.holdTimer);
    if (this.held) {
      this.held = false;
      e.stopPropagation();
    } else if (w.tap_action) {
      e.stopPropagation();
      this.act(w, "tap_action");
    }
  }
  private tick?: number;

  connectedCallback(): void {
    super.connectedCallback();
    // Bedingungen neu prüfen: wenn eine Vorlage umschlägt und alle 30 s („kürzlich geändert“ läuft ab)
    templateChanges.addEventListener("change", this.refresh);
    this.tick = window.setInterval(() => {
      if (this.page?.widgets?.some((w) => w.show_if?.length)) this.requestUpdate();
    }, 30e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    templateChanges.removeEventListener("change", this.refresh);
    clearInterval(this.tick);
  }

  private renderWidget(w: WidgetConfig, pos: Pos) {
    const type = WIDGETS[w.type];
    const r = cellRect(this.grid, pos);
    const o = w.options ?? {};
    const face = fontStack(o.typeface);
    const look = w.look ?? {};
    const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    const style = [
      `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`,
      face ? `--af-display:${face};--af-sans:${face}` : "",
      `--af-align:${FLEX[o.align] ?? "flex-start"}`,
      `--af-valign:${FLEX[o.valign] ?? "flex-start"}`,
      `--af-text-align:${TEXT[o.align] ?? "left"}`,
      // Darstellung pro Widget
      look.accent ? `--af-accent:${look.accent};--af-accent-soft:${mix(look.accent, 14)}` : "",
      look.ink ? `--af-ink:${look.ink};--af-ink-2:${mix(look.ink, 66)};--af-ink-3:${mix(look.ink, 40)};color:${look.ink}` : "",
      look.opacity != null ? `opacity:${Math.max(0, Math.min(100, Number(look.opacity))) / 100}` : "",
      look.padding != null ? `padding:${Number(look.padding)}px` : "",
    ]
      .filter(Boolean)
      .join(";");
    if (!type) return html`<div class="cell" style=${style}><div class="unknown">Unbekanntes Widget „${w.type}“</div></div>`;
    const tag = unsafeStatic(type.tag);
    const cls = ["cell", w.tap_action || w.hold_action ? "act" : "", look.card ? "boxed" : ""].filter(Boolean).join(" ");
    const zoom = look.size && Number(look.size) !== 100 ? `zoom:${Number(look.size) / 100}` : "";
    return html`<div
      class=${cls}
      style=${style}
      data-widget=${w.id}
      @pointerdown=${() => this.onDown(w)}
      @pointerup=${() => clearTimeout(this.holdTimer)}
      @pointerleave=${() => clearTimeout(this.holdTimer)}
      @click=${(e: Event) => this.onClick(e, w)}
    >
      ${staticHtml`<${tag} style=${zoom} .hass=${this.hass} .options=${o} .ctx=${this.ctx}></${tag}>`}
    </div>`;
  }

  protected updated(): void {
    customStyle(this.renderRoot, this.page?.css);
  }

  /** Mehrere Webcams im Wechsel: diese Anzeige der Seite bekommt die nächste – fest für ihre ganze Dauer */
  private camPick?: { page: string; index: number };

  private cameraSource(p: PageConfig): { entity?: string; url?: string; refresh?: number; name?: string } {
    const bg = p.background ?? { type: "none" };
    const list = (bg.sources ?? []).filter((s) => s?.url);
    if (!list.length) return { entity: bg.entity, url: bg.url, refresh: bg.refresh, name: bg.name };
    if (this.camPick?.page !== p.id) {
      const index = ((camTurns.get(p.id) ?? -1) + 1) % list.length;
      camTurns.set(p.id, index);
      this.camPick = { page: p.id, index };
    }
    const s = list[this.camPick.index % list.length];
    return { url: s.url, refresh: s.refresh ?? bg.refresh, name: s.name };
  }

  render() {
    const p = this.page;
    if (!p) return nothing;
    const bg = p.background ?? { type: "none" };
    const where = { display: this.ctx?.displayId, orientation: this.orientation };
    const widgets = (p.widgets ?? []).filter((w) => checkConditions(this.hass, w.show_if, where));
    // Hochkant: eigene Anordnung oder automatisch gestapelt (aus allen Widgets, damit sie stabil bleibt)
    const layout = layoutOf(p.widgets ?? [], this.orientation);
    const night = p.palette === "night";
    // Animation: Seite > Design/Stil; nachts nie
    const base = this.ctx?.ambient;
    const ambient = night ? "none" : bg.ambient ?? base?.type ?? "none";
    const colored = bg.type === "color" && bg.color;
    const onImage = bg.type === "photo" || bg.type === "camera";
    const cam = this.cameraSource(p);
    const cls = [night ? "night" : "", onImage ? "onphoto" : "", night || colored || onImage || ambient === "flow" ? "flat" : ""].join(" ");
    return html`<div class="root ${cls}" style=${colored ? `background-color:${bg.color}` : ""}>
      ${bg.type === "photo" && this.photo
        ? html`<div class="photo" style="background-image:url('${this.photo.url}')"></div>
            <div class="shade"></div>
            ${this.photo.credit ? html`<div class="credit">${this.photo.credit}</div>` : nothing}`
        : nothing}
      ${bg.type === "camera" && (cam.entity || cam.url)
        ? html`<af-camera-view
              class="bgcam"
              .hass=${this.hass}
              .entity=${cam.url ? undefined : cam.entity}
              .url=${cam.url}
              .mode=${cam.refresh === 0 ? "live" : "snapshot"}
              .refresh=${cam.refresh ?? 20}
              .osd=${"KAMERA"}
            ></af-camera-view>
            <div class="shade cam"></div>
            ${cam.name ? html`<div class="credit">${cam.name}</div>` : nothing}`
        : nothing}
      ${ambient !== "none"
        ? html`<af-ambient .type=${ambient} .strength=${base?.strength ?? 1} .speed=${base?.speed ?? "slow"} .small=${!!this.ctx?.preview}></af-ambient>`
        : nothing}
      ${repeat(
        widgets.filter((w) => layout[w.id]),
        (w) => w.id,
        (w) => this.renderWidget(w, layout[w.id]),
      )}
    </div>`;
  }
}

define("af-page", AfPage);
