import { html, nothing, render, type TemplateResult } from "lit";
import { anyIcon } from "./icons";
import type { TickerLine } from "./util";

/** Eine Zeile im Laufband (Zuhause und gemischtes Nachrichten-Band): Cover oder Symbol, Logo der Quelle, Text */
export const tickerLineTpl = (l: TickerLine, tap: boolean, onTap: (e: Event) => void, cls = ""): TemplateResult =>
  html`<span class="${cls} ${l.tone ?? ""} ${tap ? "tap" : ""}" @click=${onTap}>${l.img ? html`<b class="tk-art" style="background-image:url(${JSON.stringify(l.img)})"></b>` : l.icon ? anyIcon(l.icon) : nothing}${l.logo ? html`<img class="tk-logo" src=${l.logo} alt="" @error=${(e: Event) => ((e.target as HTMLElement).hidden = true)} />` : nothing}${l.text}</span>`;

/**
 * Laufende Spur für Laufbänder (Zuhause und Nachrichten): verschiebt die Spur gleichmäßig um Tempo × Zeit, entfernt
 * links, was hinausgelaufen ist, und hängt rechts erst dann die nächste Zeile an, wenn Platz ist. Was sichtbar ist,
 * ändert sich nie – neue Meldungen und neue Zahlen ruckeln daher nicht ins Bild.
 */
export class TickerLane {
  private raf = 0;
  private x = 0;
  private prev = 0;
  private gap = 0;
  private lane?: HTMLElement;

  constructor(
    private readonly opts: {
      /** Band (sichtbarer Ausschnitt) und Spur – undefined: Band ist weg, Spur hält an */
      find: () => { band: HTMLElement; lane: HTMLElement } | undefined;
      /** nächste Zeile oder undefined, wenn es nichts zu zeigen gibt */
      next: () => TemplateResult | undefined;
      /** Tempo in px/s */
      speed: () => number;
      /** neue Spur (z. B. Band neu aufgebaut): Runde von vorn */
      reset?: () => void;
    },
  ) {}

  start(): void {
    if (!this.raf) this.raf = requestAnimationFrame(this.frame);
  }

  stop(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    // eigene Zeilen und Verschiebung entfernen – läuft das Band nicht mehr, rendert Lit dort die stehenden Zeilen
    if (this.lane) {
      this.lane.querySelectorAll(":scope > .q").forEach((q) => q.remove());
      this.lane.style.transform = "";
    }
    this.lane = undefined;
  }

  private frame = (t: number): void => {
    const found = this.opts.find();
    if (!found) return this.stop();
    const { band, lane } = found;
    if (lane !== this.lane) {
      this.lane = lane;
      this.x = band.clientWidth; // von rechts einlaufen
      this.prev = t;
      this.gap = parseFloat(getComputedStyle(lane).columnGap) || 0;
      this.opts.reset?.();
    }
    const dt = Math.min(0.5, (t - this.prev) / 1000); // nach Pausen (Tab verdeckt) nicht springen
    this.prev = t;
    // verborgenes Band (display:none): nichts anlegen oder entfernen, nur warten
    if (band.checkVisibility?.() === false) {
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    this.x -= dt * this.opts.speed();
    for (let first = lane.firstElementChild as HTMLElement | null; first && first.offsetWidth + this.gap <= -this.x; first = lane.firstElementChild as HTMLElement | null) {
      this.x += first.offsetWidth + this.gap;
      first.remove();
    }
    // höchstens 40 Zeilen je Bild – schützt vor Endlosschleifen, wenn nichts eine Breite hat (verstecktes Band)
    for (let n = 0; n < 40 && lane.scrollWidth + this.x < band.clientWidth + 200; n++) {
      const tpl = this.opts.next();
      if (!tpl) break;
      const item = document.createElement("div");
      item.className = "q";
      render(tpl, item);
      lane.append(item);
    }
    lane.style.transform = `translateX(${this.x}px)`;
    this.raf = requestAnimationFrame(this.frame);
  };
}
