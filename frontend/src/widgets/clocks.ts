// Analoge Uhr (Bahnhof, schlicht, elegant, Punkte) und Fallblatt-Anzeige (klappernde Ziffern wie alte Bahnhofstafeln).
// Die Zeiger drehen per CSS-Animation (ruckelfrei, ohne Rechenlast); jede Minute wird die Phase neu angeglichen.
import { LitElement, css, html, nothing, svg } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { widgetStyles } from "../styles";
import { AfTickingWidget, define } from "./base";

/* ───────── Analoge Uhr ───────── */

type Face = "bahnhof" | "schlicht" | "elegant" | "punkte";

const ROMAN = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

/** Phasen der Zeiger in Sekunden (für negative animation-delay) */
export const handPhases = (d: Date): { h: number; m: number; s: number } => {
  const s = d.getSeconds() + d.getMilliseconds() / 1000;
  const m = d.getMinutes() * 60 + s;
  const h = (d.getHours() % 12) * 3600 + m;
  return { h, m, s };
};

/**
 * Analoge Uhr. Optionen: face (bahnhof | schlicht | elegant | punkte), seconds (Sekundenzeiger, Standard an),
 * numbers (Ziffern; Standard nur bei „elegant“).
 * Bahnhof: Sekundenzeiger läuft in 58,5 s rum und wartet oben, der Minutenzeiger springt zur vollen Minute.
 */
class AfAnalog extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
        display: grid;
        place-items: center;
      }
      svg {
        width: min(100cqw, 100cqh);
        height: min(100cqw, 100cqh);
        overflow: visible;
      }
      .hand {
        transform-box: view-box;
        transform-origin: 100px 100px;
        animation-name: spin;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .hh {
        animation-duration: 43200s;
        animation-delay: var(--dh);
      }
      .mh {
        animation-duration: 3600s;
        animation-delay: var(--dm);
      }
      .sh {
        animation-duration: 60s;
        animation-delay: var(--ds);
      }
      /* Bahnhofsuhr: Minute springt, Sekunde wartet 1,5 s oben */
      .bahnhof .mh {
        animation-timing-function: steps(60, end);
      }
      .bahnhof .sh {
        animation-name: sweep;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes sweep {
        97.5%,
        100% {
          transform: rotate(360deg);
        }
      }
      .num {
        font-family: var(--af-display);
        font-weight: var(--af-clock-weight);
      }
    `,
  ];

  render() {
    const o = this.options;
    const face = (["bahnhof", "schlicht", "elegant", "punkte"].includes(o.face as string) ? o.face : "schlicht") as Face;
    const seconds = o.seconds !== false;
    const numbers = (o.numbers as boolean | undefined) ?? face === "elegant";
    const p = handPhases(new Date());
    const style = `--dh:-${p.h}s;--dm:-${p.m}s;--ds:-${p.s}s`;
    const ink = face === "bahnhof" ? "#111" : "var(--af-ink)";
    const sec = face === "bahnhof" ? "#d62d20" : "var(--af-accent)";
    const ticks = Array.from({ length: 60 }, (_, i) => i);
    return html`<svg viewBox="0 0 200 200" class=${face} style=${style} role="img" aria-label=${new Date().toLocaleTimeString()}>
      ${face === "bahnhof"
        ? svg`<circle cx="100" cy="100" r="98" fill="#f7f7f4" stroke="#d8d8d4" stroke-width="2" />`
        : face === "elegant"
          ? svg`<circle cx="100" cy="100" r="97" fill="var(--af-surface)" stroke="var(--af-accent)" stroke-width="1.5" /><circle cx="100" cy="100" r="91" fill="none" stroke="var(--af-line)" stroke-width="0.8" />`
          : nothing}
      ${ticks.map((i) => {
        const hour = i % 5 === 0;
        if (face === "punkte")
          return hour ? svg`<circle cx="100" cy=${i % 15 === 0 ? 12 : 11} r=${i % 15 === 0 ? 4.2 : 2.8} fill="var(--af-ink)" transform="rotate(${i * 6} 100 100)" />` : nothing;
        if (face === "schlicht")
          return hour ? svg`<line x1="100" y1="8" x2="100" y2=${i % 15 === 0 ? 24 : 18} stroke="var(--af-ink-2)" stroke-width=${i % 15 === 0 ? 3 : 2} stroke-linecap="round" transform="rotate(${i * 6} 100 100)" />` : nothing;
        if (face === "elegant")
          return svg`<line x1="100" y1="12" x2="100" y2=${hour ? 20 : 15} stroke=${hour ? "var(--af-accent)" : "var(--af-ink-3)"} stroke-width=${hour ? 1.6 : 0.8} transform="rotate(${i * 6} 100 100)" />`;
        // Bahnhof: dicke Stundenbalken, feine Minutenstriche
        return svg`<rect x=${hour ? 97 : 99} y="6" width=${hour ? 6 : 2} height=${hour ? 24 : 7} fill="#111" transform="rotate(${i * 6} 100 100)" />`;
      })}
      ${numbers
        ? Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const r = face === "elegant" ? 72 : 70;
            const label = face === "elegant" ? ROMAN[i] : String(i || 12);
            return svg`<text class="num" x=${100 + r * Math.sin(a)} y=${100 - r * Math.cos(a)} text-anchor="middle" dominant-baseline="central"
              font-size=${face === "elegant" ? 12 : 16} fill=${ink}>${label}</text>`;
          })
        : nothing}
      ${face === "bahnhof"
        ? svg`<g class="hand hh"><polygon points="96.2,36 103.8,36 105,122 95,122" fill=${ink} /></g>
            <g class="hand mh"><polygon points="97,12 103,12 104,124 96,124" fill=${ink} /></g>`
        : face === "punkte"
          ? svg`<g class="hand hh"><line x1="100" y1="100" x2="100" y2="52" stroke="var(--af-ink)" stroke-width="9" stroke-linecap="round" /></g>
              <g class="hand mh"><line x1="100" y1="100" x2="100" y2="26" stroke="var(--af-ink)" stroke-width="6" stroke-linecap="round" /></g>`
          : svg`<g class="hand hh"><line x1="100" y1="112" x2="100" y2="50" stroke=${ink} stroke-width=${face === "elegant" ? 3.2 : 5} stroke-linecap="round" /></g>
              <g class="hand mh"><line x1="100" y1="114" x2="100" y2="22" stroke=${ink} stroke-width=${face === "elegant" ? 2 : 3.4} stroke-linecap="round" /></g>`}
      ${seconds
        ? face === "bahnhof"
          ? svg`<g class="hand sh"><rect x="98.8" y="30" width="2.4" height="98" fill=${sec} /><circle cx="100" cy="36" r="8.5" fill=${sec} /></g>`
          : svg`<g class="hand sh"><line x1="100" y1="122" x2="100" y2="16" stroke=${sec} stroke-width="1.4" stroke-linecap="round" /></g>`
        : nothing}
      <circle cx="100" cy="100" r=${face === "bahnhof" ? 3 : 4} fill=${seconds ? sec : ink} />
    </svg>`;
  }
}

/* ───────── Fallblatt ───────── */

/** Reihenfolge der Blätter: beim Wechsel blättert die Anzeige über die Zwischenzeichen (höchstens 6 Schritte) */
const SEQ = " 0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ.-+'/";

/** Zwischenzeichen von a nach b (ohne a, mit b) */
export const flapPath = (a: string, b: string, max = 6): string[] => {
  if (a === b) return [];
  const i = SEQ.indexOf(a);
  const j = SEQ.indexOf(b);
  if (i < 0 || j < 0) return [b];
  const steps: string[] = [];
  for (let k = (i + 1) % SEQ.length; k !== j; k = (k + 1) % SEQ.length) steps.push(SEQ[k]);
  // lange Wege abkürzen: die letzten Schritte zeigen, damit es sichtbar „klappert“
  return [...steps.slice(-(max - 1)), b];
};

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Cell {
  cur: string;
  prev: string;
  n: number;
  queue: string[];
}

/**
 * Fallblatt-Text: jedes Zeichen ein eigenes Blatt, das bei Änderungen über ein paar Zwischenzeichen umklappt.
 * Größe über font-size; Farben über --af-flap-bg / --af-flap-ink.
 */
export class AfFlap extends LitElement {
  static properties = { text: {} };
  text = "";
  private cells: Cell[] = [];
  private timer?: number;

  static styles = css`
    :host {
      display: inline-flex;
      gap: 0.06em;
      line-height: 1;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .c {
      position: relative;
      width: 0.76em;
      height: 1.18em;
      border-radius: 0.07em;
      background: var(--af-flap-bg, #222326);
      color: var(--af-flap-ink, #f4f1e8);
      perspective: 3em;
      box-shadow: 0 0.04em 0.08em rgba(0, 0, 0, 0.35);
    }
    /* Trennlinie in der Mitte */
    .c::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: calc(50% - 0.01em);
      height: 0.02em;
      background: rgba(0, 0, 0, 0.55);
      z-index: 3;
    }
    .half {
      position: absolute;
      left: 0;
      right: 0;
      height: 50%;
      overflow: hidden;
      background: inherit;
      border-radius: inherit;
      backface-visibility: hidden;
    }
    .half span {
      position: absolute;
      left: 0;
      right: 0;
      height: 1.18em;
      line-height: 1.18em;
      text-align: center;
    }
    /* breite Buchstaben schmaler, damit sie aufs Blatt passen (wie bei echten Fallblattschriften) */
    .c.wide .half span {
      transform: scaleX(0.78);
    }
    .top {
      top: 0;
    }
    .bot {
      bottom: 0;
    }
    .bot span,
    .flip-bot span {
      bottom: 0;
    }
    .flip-top {
      top: 0;
      transform-origin: 50% 100%;
      animation: down-top 70ms ease-in both;
      z-index: 2;
      filter: brightness(1.15);
    }
    .flip-bot {
      bottom: 0;
      transform-origin: 50% 0;
      animation: down-bot 70ms ease-out 70ms both;
      z-index: 2;
      filter: brightness(0.85);
    }
    @keyframes down-top {
      to {
        transform: rotateX(-90deg);
      }
    }
    @keyframes down-bot {
      from {
        transform: rotateX(90deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .flip-top,
      .flip-bot {
        display: none;
      }
    }
  `;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
    this.timer = undefined;
  }

  protected willUpdate(): void {
    const chars = [...(this.text ?? "").toUpperCase()];
    while (this.cells.length < chars.length) this.cells.push({ cur: " ", prev: " ", n: 0, queue: [] });
    this.cells.length = chars.length;
    chars.forEach((ch, i) => {
      const c = this.cells[i];
      const target = c.queue.length ? c.queue[c.queue.length - 1] : c.cur;
      if (target !== ch) c.queue = flapPath(c.cur, ch);
    });
    if (this.cells.some((c) => c.queue.length) && !this.timer && this.isConnected) this.timer = window.setInterval(() => this.step(), 150);
  }

  /** Ein Blatt weiter – alle Zeichen gleichzeitig, wie auf einer echten Tafel */
  private step(): void {
    let busy = false;
    for (const c of this.cells) {
      const next = c.queue.shift();
      if (next === undefined) continue;
      c.prev = c.cur;
      c.cur = next;
      c.n++;
      // ohne Animation (Bewegung reduzieren) kommt kein animationend – gleich fertig
      if (reduced()) c.prev = c.cur;
      busy = true;
    }
    if (!busy) {
      clearInterval(this.timer);
      this.timer = undefined;
      return;
    }
    this.requestUpdate();
  }

  render() {
    return this.cells.map(
      (c) => html`<span class="c ${"MWÄÖ".includes(c.cur) || "MWÄÖ".includes(c.prev) ? "wide" : ""}">
        <span class="half top"><span>${c.cur}</span></span>
        <span class="half bot"><span>${c.prev}</span></span>
        ${c.n
          ? keyed(
              c.n,
              html`<span class="half flip-top"><span>${c.prev}</span></span
                ><span class="half flip-bot" @animationend=${() => this.settle(c)}><span>${c.cur}</span></span>`,
            )
          : nothing}
      </span>`,
    );
  }

  /** Nach dem Umklappen zeigt auch die untere Hälfte das neue Zeichen */
  private settle(c: Cell): void {
    c.prev = c.cur;
    this.requestUpdate();
  }
}

define("af-analog", AfAnalog);
define("af-flap", AfFlap);
