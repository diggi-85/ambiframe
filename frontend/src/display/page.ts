// Eine Seite: Hintergrund (Foto/Farbe/Kamera) und Widgets im Raster der Bühne (quer 12×8, hoch 8×12)
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { html as staticHtml, unsafeStatic } from "lit/static-html.js";
import type { DisplayContext } from "../data";
import { fontStack } from "../fonts";
import { MOTION_BASE, motionOf, motionVars, nightTokens, photoTokens, stillStyles } from "../styles";

/** URL sicher für CSS (Hochkomma, Klammern im Dateinamen) */
/**
 * Langsames Zoomen/Schwenken je Foto in wechselnder Richtung (rein, raus, Schwenk, zur anderen Ecke) – fest je Bild,
 * damit es beim Neuzeichnen nicht springt. Stärke: soft halb, strong 1,8-fach; off = steht.
 */
export const kenBurns = (url: string, motion?: string): string => {
  if (motion === "off") return "--af-photo-motion:none";
  const k = motion === "soft" ? 0.5 : motion === "strong" ? 1.8 : 1;
  let h = 0;
  for (const c of url) h = (h * 31 + c.charCodeAt(0)) | 0;
  const v = [
    [0.02, 0, 0, 0.12, -1.2, -0.8],
    [0.12, 1, 0.6, 0.02, 0, 0],
    [0.08, -2, 0, 0.08, 2, 0],
    [0.02, 0, 0, 0.12, 1.2, 0.8],
  ][Math.abs(h) % 4];
  const t = (s: number, x: number, y: number) => `scale(${(1 + s * k).toFixed(3)}) translate(${(x * k).toFixed(2)}%,${(y * k).toFixed(2)}%)`;
  return `--kb-a:${t(v[0], v[1], v[2])};--kb-b:${t(v[3], v[4], v[5])}`;
};

/** Cover des laufenden Titels für den Hintergrund „Musik-Cover“: Player der Musik-Widgets dieser Seite, sonst alle */
export const musicCover = (hass: Hass | undefined, page: PageConfig): string | undefined => {
  const listed = page.widgets.filter((w) => w.type === "media").flatMap((w) => (w.options?.entities as string[] | undefined) ?? []);
  const ids = listed.length ? listed : Object.keys(hass?.states ?? {}).filter((id) => id.startsWith("media_player."));
  const states = ids.map((id) => hass?.states[id]).filter((s) => s?.attributes.entity_picture);
  const s = states.find((x) => x!.state === "playing") ?? states.find((x) => x!.state === "paused");
  return s?.attributes.entity_picture as string | undefined;
};

/** Eigene Bewegungsdauer einer Kachel in s (begrenzt wie die der Seite) */
const tileDuration = (look: { motion_duration?: number }): number => Math.max(0.2, Math.min(5, Number(look.motion_duration)));

export const cssUrl = (u: string): string => `url(${JSON.stringify(u)})`;
import type { AmbientKind, Hass, PageConfig, Photo, WidgetConfig } from "../types";
import { templateChanges } from "../template";
import { checkConditions, customStyle } from "../util";
import { define } from "../widgets/base";
import { WIDGETS } from "../widgets/registry";
import "../widgets/media";
import "./ambient";
import { weatherAmbient } from "./effects";

import { BASE, cellRect, layoutOf, type Grid, type Orientation, type Pos } from "./grid";

const FLEX: Record<string, string> = { start: "flex-start", center: "center", end: "flex-end" };
const TEXT: Record<string, string> = { start: "left", center: "center", end: "right" };

/** Welche Webcam zuletzt je Seite lief (bleibt über Seitenwechsel erhalten) */
const camTurns = new Map<string, number>();

/** Rahmen und Schatten einer einzelnen Kachel (look.border, look.shadow) */
const BORDERS: Record<string, string> = {
  none: "none",
  line: "1px solid var(--af-line)",
  accent: "1.5px solid var(--af-accent)",
};
const SHADOWS: Record<string, string> = {
  none: "none",
  soft: "0 8px 24px rgba(0, 0, 0, 0.14)",
  strong: "0 18px 48px rgba(0, 0, 0, 0.32)",
};

/** Diese Widgets haben eine eigene Fläche (Tagesvorschau: eigene Karten) oder stehen frei – Kachel-Stile setzen sie nicht in eine Kachel */
const FREE = new Set(["hometiles", "pills", "clock", "date", "dayclock", "text", "image", "camera", "card", "infoline", "wordclock", "pixel", "radar", "map", "news", "daily", "pet", "balance", "today"]);

/** Als Kachel zeigen: per Widget (look.card) oder automatisch im Kachel-Stil */
export const boxed = (w: WidgetConfig, tiles?: boolean): boolean =>
  w.look?.card ?? (!!tiles && !FREE.has(w.type) && w.options?.style !== "card" && w.options?.variant !== "card");

export class AfPage extends LitElement {
  static properties = {
    hass: { attribute: false },
    page: { attribute: false },
    ctx: { attribute: false },
    photo: { attribute: false },
    grid: { attribute: false },
    orientation: { attribute: false },
    motionAt: { attribute: false },
    keep: { attribute: false },
  };

  static styles = [
    nightTokens,
    photoTokens,
    stillStyles,
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
        /* Cover-Farben (sonst durchsichtig), darunter die weichen Farbflächen des Stils */
        background-image:
          radial-gradient(60% 70% at 12% 18%, var(--af-cover-1), transparent 62%),
          radial-gradient(55% 65% at 88% 26%, var(--af-cover-2), transparent 62%),
          radial-gradient(75% 70% at 58% 100%, var(--af-cover-3), transparent 64%),
          var(--af-bg-art, none);
        background-size: 100% 100%, 100% 100%, 100% 100%, var(--af-bg-size, auto);
        color: var(--af-ink);
        overflow: hidden;
      }
      .root.flat {
        background-image: none;
      }
      .photo {
        position: absolute;
        /* Galerie: Foto im Passepartout (Abstand, Rahmen) und ohne langsames Heranzoomen */
        inset: var(--af-photo-inset, 0);
        background: #050706 center / cover no-repeat;
        box-shadow: var(--af-photo-frame, none);
        /* E-Ink: Graustufen mit mehr Kontrast */
        filter: var(--af-photo-filter, none);
        animation: var(--af-photo-motion, kb 70s linear both);
      }
      /* Zwei Hochkant-Fotos nebeneinander */
      .photo.duo {
        display: flex;
        gap: var(--af-photo-gap, 6px);
        background-image: none !important;
      }
      .photo.duo i {
        flex: 1;
        background: center / cover no-repeat;
      }
      /* Ein Hochkant-Foto ganz, dahinter dasselbe Bild unscharf */
      .photo.fit {
        background-image: none !important;
        overflow: hidden;
      }
      .photo.fit::before,
      .photo.fit::after {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--img) center / cover no-repeat;
      }
      .photo.fit::before {
        inset: -60px;
        filter: blur(40px) brightness(0.6);
      }
      .photo.fit::after {
        background-size: contain;
      }
      /* Hintergrund „Musik-Cover“: unscharf, leuchtend, langsam treibend – wie das Vollbild beim Liedwechsel */
      .mbg {
        position: absolute;
        inset: -80px;
        background: #000 center / cover no-repeat;
        filter: blur(70px) saturate(1.5) brightness(0.62);
        transform: scale(1.1);
        animation: var(--af-photo-motion, mbg-drift 40s linear both);
        transition: background-image 1.2s ease;
      }
      .mbg.none {
        background: radial-gradient(ellipse 60% 70% at 30% 40%, var(--af-accent), transparent 70%), #111;
        filter: blur(40px) brightness(0.5);
      }
      .mveil {
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.38));
      }
      @keyframes mbg-drift {
        to {
          transform: scale(1.25) rotate(2deg);
        }
      }
      @keyframes kb {
        from {
          transform: var(--kb-a, scale(1.02));
        }
        to {
          transform: var(--kb-b, scale(1.12) translate(-1.2%, -0.8%));
        }
      }
      /* Zwei Hochkant-Fotos bewegen sich gegenläufig */
      .photo.duo {
        animation: none;
        overflow: hidden;
      }
      .photo.duo i {
        animation: var(--af-photo-motion, kb 70s linear both);
      }
      .photo.duo i + i {
        animation-direction: reverse;
      }
      /* Bleibende Widgets beim Seitenwechsel: sie stehen, der Rest blendet über (Dauer --t vom Display) */
      :host(.keep:not(.out)) .root > :not(.stay) {
        animation: af-in calc(var(--t) * 0.62) ease calc(var(--t) * 0.38) backwards;
      }
      :host(.keep.out) .root > :not(.stay) {
        animation: af-out calc(var(--t) * 0.48) ease both;
      }
      :host(.keep.out) .root > .stay {
        visibility: hidden;
      }
      .cell.stay {
        animation: none;
        --af-bar-anim: none;
        --af-curve-anim: none;
        --af-ring-anim: none;
        --af-dot-anim: none;
      }
      /* Aufsteigen: die Karten der alten Seite gehen nacheinander nach oben */
      :host(.t-rise.out) .cell {
        animation: af-card-out calc(var(--t) * 0.4) ease both;
        animation-delay: calc(var(--af-i, 0) * 60ms);
      }
      @keyframes af-in {
        from {
          opacity: 0;
        }
      }
      @keyframes af-out {
        to {
          opacity: 0;
        }
      }
      @keyframes af-card-out {
        to {
          opacity: 0;
          transform: translateY(calc(-1 * var(--af-rise, 14px)));
        }
      }
      /* Antippen einer Kachel mit Aktion: kurzes Nachgeben */
      .cell.act > * {
        transition: transform 0.15s ease;
      }
      .cell.act:active > * {
        transform: scale(0.97);
      }
      :host-context([evening]) .photo {
        filter: brightness(0.8) saturate(0.88);
      }
      /* Kamerabilder sind oft hell (Auto, Hauswand) – unten links kräftiger abdunkeln, damit Uhr und Text lesbar bleiben */
      .shade.cam {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.12) 72%, rgba(0, 0, 0, 0) 100%),
          linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 58%);
      }
      /* Abdunkeln pro Seite einstellbar: leicht = halb so stark, kräftig = über die ganze Fläche */
      .shade.light {
        opacity: 0.5;
      }
      .shade.strong::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
      }
      .bgcam {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .shade {
        position: absolute;
        inset: var(--af-photo-inset, 0);
        background: linear-gradient(to top, rgba(6, 8, 7, 0.84) 0%, rgba(6, 8, 7, 0.42) 27%, rgba(6, 8, 7, 0) 54%),
          linear-gradient(to right, rgba(6, 8, 7, 0.4) 0%, rgba(6, 8, 7, 0) 48%);
      }
      .credit {
        position: absolute;
        right: 56px;
        bottom: max(56px, calc(var(--af-dock, 0px) + 14px));
        max-width: 380px;
        text-align: right;
        font: calc(15px * var(--af-fs, 1)) / 1.4 var(--af-sans);
        color: var(--af-ink-3);
      }
      .cell {
        position: absolute;
        display: flex;
        box-sizing: border-box;
        /* Karten nacheinander – erst, wenn der Seitenwechsel die Seite weitgehend eingeblendet hat */
        animation: var(--af-card-anim, af-card-in 1.1s cubic-bezier(0.22, 0.8, 0.24, 1) both);
        animation-duration: calc(0.9s * var(--af-tempo, 1));
        animation-delay: calc(var(--af-motion-delay, 0s) + var(--af-i, 0) * var(--af-stagger, 0ms));
      }
      @keyframes af-card-in {
        from {
          opacity: 0;
          transform: translateY(var(--af-rise, 14px)) scale(var(--af-card-scale, 1));
        }
      }
      @keyframes af-fade {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cell {
          animation: none;
        }
      }
      .cell > * {
        flex: 1;
        min-width: 0;
      }
      /* Darstellung „als Karte“ – Fläche, Rand und Radius des Stils; Inhalte dürfen die Karte mittig füllen */
      .cell.boxed {
        --af-fill-align: center;
        --af-fill-pad: 0;
        background:
          /* Zierde des Stils auf der Karte (z. B. Schrauben) */
          var(--af-card-art, none),
          linear-gradient(var(--af-card-tint, var(--af-cover-tint)), var(--af-card-tint, var(--af-cover-tint))),
          color-mix(in srgb, var(--af-card, var(--af-surface)) var(--af-card-alpha, 100%), transparent);
        border: var(--af-card-border, 1px solid var(--af-line));
        border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
        border-radius: var(--af-card-radius, 32px);
        /* eigene Kartenform des Stils (z. B. abgeschrägte Ecken) */
        clip-path: var(--af-card-clip, none);
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
  /** performance.now(), ab dem sich Zahlen bewegen (vom Display: nach dem größten Teil des Seitenwechsels) */
  motionAt?: number;
  /** ctx für die Widgets – mit der Bewegung dieser Seite */
  private wctx?: DisplayContext;
  /** Widgets, die beim Seitenwechsel stehen bleiben (gleich auf alter und neuer Seite) */
  keep?: Set<string>;
  private calmCtx?: DisplayContext;
  /** CSS-Variablen der Bewegung dieser Seite (am Inhalt, nicht am Host – dessen style setzt das Display) */
  private motionCss = "";
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

  /** ctx je Kachel: bleibende (ohne Hochzählen) oder mit eigener Bewegung – je Einstellung einmal angelegt */
  private tileCtxs = new Map<string, DisplayContext>();
  private tileCtx(w: WidgetConfig): DisplayContext | undefined {
    const base = this.keep?.has(w.id) ? this.calmCtx : this.wctx;
    const look = w.look ?? {};
    if (!base?.motion || (look.motion !== "off" && !(Number(look.motion_duration) > 0))) return base;
    const key = `${w.id}|${base === this.calmCtx}|${look.motion ?? ""}|${look.motion_duration ?? ""}`;
    let ctx = this.tileCtxs.get(key);
    if (!ctx) {
      ctx = { ...base, motion: look.motion === "off" ? { ...base.motion, style: "off" } : { ...base.motion, duration: tileDuration(look) } };
      this.tileCtxs.set(key, ctx);
    }
    return ctx;
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("ctx") && !changed.has("page") && !changed.has("motionAt") && this.wctx) return;
    const motion = motionOf(this.ctx?.config?.design, this.page, this.ctx?.theme);
    this.wctx = this.ctx && { ...this.ctx, motion, motionAt: this.motionAt };
    this.calmCtx = this.wctx && { ...this.wctx, calm: true };
    this.tileCtxs.clear();
    // „initial“ = Standard aus widgetStyles, auch wenn das Display (Design) etwas anderes setzt
    this.motionCss = Object.entries(motionVars(motion))
      .map(([k, v]) => `${k}:${v ?? "initial"}`)
      .join(";");
  }

  private renderWidget(w: WidgetConfig, pos: Pos, i: number) {
    const type = WIDGETS[w.type];
    // Abstand der Kacheln: das Raster bleibt (Editor), jede Kachel rückt um die Hälfte der Differenz nach innen
    const inset = this.ctx?.gap != null ? (this.ctx.gap - this.grid.gap) / 2 : 0;
    const raw = cellRect(this.grid, pos);
    const r = { left: raw.left + inset, top: raw.top + inset, width: raw.width - 2 * inset, height: raw.height - 2 * inset };
    const o = w.options ?? {};
    // Die Tagesuhr füllt meist die ganze Seite – ohne eigene Angabe mittig
    const mid = w.type === "dayclock" ? "center" : undefined;
    const face = fontStack(o.typeface);
    const look = w.look ?? {};
    const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    const style = [
      `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;--af-i:${i}`,
      face ? `--af-display:${face};--af-sans:${face}` : "",
      `--af-align:${FLEX[o.align ?? mid] ?? "flex-start"}`,
      `--af-valign:${FLEX[o.valign ?? mid] ?? "flex-start"}`,
      `--af-text-align:${TEXT[o.align ?? mid] ?? "left"}`,
      // Darstellung pro Widget
      look.accent ? `--af-accent:${look.accent};--af-accent-soft:${mix(look.accent, 14)}` : "",
      look.ink ? `--af-ink:${look.ink};--af-ink-2:${mix(look.ink, 66)};--af-ink-3:${mix(look.ink, 40)};color:${look.ink}` : "",
      look.opacity != null ? `opacity:${Math.max(0, Math.min(100, Number(look.opacity))) / 100}` : "",
      look.padding != null ? `padding:${Number(look.padding)}px` : "",
      // Bewegung nur dieser Kachel: still oder eigene Dauer (Tempo relativ zur Grunddauer)
      look.motion === "off" ? "--af-bar-anim:none;--af-curve-anim:none;--af-ring-anim:none;--af-dot-anim:none;--af-card-anim:none;--af-glide:0s" : "",
      look.motion !== "off" && Number(look.motion_duration) > 0 ? `--af-tempo:${tileDuration(look) / MOTION_BASE};--af-glide:${((0.9 * tileDuration(look)) / MOTION_BASE).toFixed(2)}s` : "",
      // Kachel: Kartenfarbe/-deckkraft, Radius, Rahmen, Glas, Schatten
      look.bg ? `--af-card:${look.bg}` : "",
      look.bg_opacity != null ? `--af-card-alpha:${Math.max(0, Math.min(100, Number(look.bg_opacity)))}%` : "",
      look.radius != null ? `--af-card-radius:${Number(look.radius)}px` : "",
      look.border ? `--af-card-border:${BORDERS[look.border]};--af-card-rule:${BORDERS[look.border]}` : "",
      look.glass === true ? "--af-card-filter:blur(22px) saturate(1.4)" : look.glass === false ? "--af-card-filter:none" : "",
      look.shadow ? `--af-card-shadow:${SHADOWS[look.shadow]}` : "",
    ]
      .filter(Boolean)
      .join(";");
    if (!type) return html`<div class="cell" style=${style}><div class="unknown">Unbekanntes Widget „${w.type}“</div></div>`;
    const tag = unsafeStatic(type.tag);
    const cls = ["cell", w.tap_action || w.hold_action ? "act" : "", boxed(w, this.ctx?.tiles) ? "boxed" : "", this.keep?.has(w.id) ? "stay" : ""].filter(Boolean).join(" ");
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
      ${staticHtml`<${tag} style=${zoom} ?nolabel=${look.label === false} .hass=${this.hass} .options=${o} .ctx=${this.tileCtx(w)}></${tag}>`}
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
    const shown = widgets.filter((w) => layout[w.id]);
    // Karten erscheinen in Lesereihenfolge nacheinander: Zeile, dann Spalte
    const order = [...shown].sort((a, b) => layout[a.id].y - layout[b.id].y || layout[a.id].x - layout[b.id].x);
    const night = p.palette === "night";
    // Animation: Seite > Design/Stil; nachts nie
    const base = this.ctx?.ambient;
    const wanted = night || this.ctx?.still ? "none" : (bg.ambient ?? base?.type ?? "none");
    // „Wie das Wetter“: Animation nach dem Zustand der Wetter-Entität (Schnee bei Schnee, Tropfen bei Regen …)
    const ambient =
      wanted === "weather"
        ? (weatherAmbient(this.hass?.states[base?.weather ?? Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith("weather.")) ?? ""]?.state) as AmbientKind)
        : wanted;
    const colored = bg.type === "color" && bg.color;
    const onImage = bg.type === "photo" || bg.type === "camera" || bg.type === "music";
    const cover = bg.type === "music" ? musicCover(this.hass, p) : undefined;
    const cam = this.cameraSource(p);
    const kb = this.photo ? kenBurns(this.photo.url, this.ctx?.config?.photos?.motion) : "";
    const evening = ((this.getRootNode() as ShadowRoot).host as HTMLElement | undefined)?.hasAttribute?.("evening") ?? false;
    const cls = [night ? "night" : "", onImage ? "onphoto" : "", night || colored || onImage || ambient === "flow" ? "flat" : ""].join(" ");
    return html`<div class="root ${cls}" style=${`${this.motionCss};${colored ? `background-color:${bg.color}` : ""}`}>
      ${bg.type === "photo" && this.photo
        ? html`${this.photo.pair
              ? html`<div class="photo duo" style=${kb}><i style="background-image:${cssUrl(this.photo.url)}"></i><i style="background-image:${cssUrl(this.photo.pair)}"></i></div>`
              : html`<div class="photo ${this.photo.fit ? "fit" : ""}" style="background-image:${cssUrl(this.photo.url)};--img:${cssUrl(this.photo.url)};${kb}"></div>`}
            ${bg.shade === "none" ? nothing : html`<div class="shade ${bg.shade ?? ""}"></div>`}
            ${this.photo.credit ? html`<div class="credit">${this.photo.credit}</div>` : nothing}`
        : nothing}
      ${bg.type === "music"
        ? html`<div class="mbg ${cover ? "" : "none"}" style=${cover ? `background-image:${cssUrl(cover)}` : ""}></div>
            <div class="mveil"></div>`
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
            ${bg.shade === "none" ? nothing : html`<div class="shade cam ${bg.shade ?? ""}"></div>`}
            ${cam.name ? html`<div class="credit">${cam.name}</div>` : nothing}`
        : nothing}
      ${ambient !== "none"
        ? html`<af-ambient .type=${ambient} .strength=${base?.strength ?? 1} .speed=${base?.speed ?? "slow"} .calm=${evening} .tint=${base?.color} .small=${!!this.ctx?.preview}></af-ambient>`
        : nothing}
      ${repeat(
        shown,
        (w) => w.id,
        (w) => this.renderWidget(w, layout[w.id], order.indexOf(w)),
      )}
    </div>`;
  }
}

define("af-page", AfPage);
