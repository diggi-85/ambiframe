// Basisklasse aller Widgets: bekommt hass, Optionen und den Display-Kontext
import { LitElement, type CSSResultGroup, type PropertyValues } from "lit";
import type { DisplayContext } from "../data";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";

/** Stufen der Auto-Anpassung: [Zeilenabstand, Schrift] */
const FIT_STEPS: [number, number][] = [
  [0.65, 1],
  [0.45, 0.94],
  [0.35, 0.88],
  [0.3, 0.82],
];

/**
 * Zahl in einem Text – für „Zahlen, die sich bewegen“: Vorspann, Wert, Nachkommastellen, Trennzeichen, Rest.
 * null, wenn der Text nicht genau eine schlichte Zahl enthält (Uhrzeit, Spanne, Tausenderpunkt).
 */
export const parseCount = (text: string): { pre: string; post: string; sep: string; decimals: number; value: number; minus: string } | null => {
  const m = /^([^\d]*?)([-−]?)(\d+(?:[.,]\d+)?)([^\d]*)$/s.exec(text);
  if (!m) return null;
  const [, pre, minus, num, post] = m;
  const sep = /[.,]/.exec(num)?.[0] ?? "";
  const decimals = sep ? num.length - num.indexOf(sep) - 1 : 0;
  if (decimals === 3) return null; // 1.234 ist eher ein Tausenderpunkt
  return { pre, post, sep, decimals, minus: minus || "-", value: (minus ? -1 : 1) * parseFloat(num.replace(",", ".")) };
};
const COUNT_MS = 900;

export abstract class AfWidget extends LitElement {
  static properties = {
    hass: { attribute: false },
    options: { attribute: false },
    ctx: { attribute: false },
  };

  static styles: CSSResultGroup = widgetStyles;

  hass?: Hass;
  options: Record<string, any> = {};
  ctx?: DisplayContext;

  /** Entitäten, deren Änderung ein Neuzeichnen auslöst – alles andere wird ignoriert. */
  protected watched(): (string | undefined)[] {
    return [];
  }

  /**
   * Passt der Inhalt nicht in den Kasten, erst die Zeilenabstände (--af-dense), dann die Schrift (--af-fs) schrittweise
   * verkleinern – statt in das Widget darunter zu laufen. Nach jedem Neuzeichnen neu, damit es auch wieder wächst.
   */
  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    this.fitToBox();
    this.countUp();
  }

  private counts = new WeakMap<Element, { last: string; value: number; raf: number; safety?: number }>();

  /**
   * Große Zahlen (.big.num) zählen zum neuen Wert, statt zu springen – beim ersten Zeigen von 0. Nur auf einem
   * Display (ctx), nicht bei E-Ink/Vorschau-Standbild, „weniger Bewegung“ oder abgeschaltet (design.count_up: false) –
   * und nur, wo es flüssig läuft (nicht im Videostream, nicht im Hintergrund: dort pausiert der Browser die Animation).
   */
  private countUp(): void {
    const design = this.ctx?.config?.design as { count_up?: boolean } | undefined;
    const smooth = this.ctx && !this.ctx.still && this.ctx.ticker !== false && design?.count_up !== false && !document.hidden;
    if (!smooth || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const el of this.renderRoot.querySelectorAll(".big.num")) {
      const node = [...el.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && /\d/.test((n as Text).data)) as Text | undefined;
      const st = this.counts.get(el);
      // Steht noch, was wir zuletzt geschrieben haben, hat Lit nichts Neues gesetzt
      if (!node || node.data === st?.last) continue;
      cancelAnimationFrame(st?.raf ?? 0);
      clearTimeout(st?.safety);
      const target = node.data;
      const p = parseCount(target);
      const from = st?.value ?? 0;
      if (!p || p.value === from) {
        this.counts.set(el, { last: target, value: p?.value ?? from, raf: 0 });
        continue;
      }
      const state: { last: string; value: number; raf: number; safety?: number } = { last: target, value: from, raf: 0 };
      this.counts.set(el, state);
      // Sicherheitsnetz: Hält der Browser die Animation an (Tab im Hintergrund), steht trotzdem der echte Wert da
      state.safety = window.setTimeout(() => {
        cancelAnimationFrame(state.raf);
        state.value = p.value;
        state.last = node.data = target;
      }, COUNT_MS + 300);
      const start = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / COUNT_MS);
        state.value = from + (p.value - from) * (1 - (1 - k) ** 3);
        const shown = Math.abs(state.value).toFixed(p.decimals).replace(".", p.sep || ".");
        state.last = node.data = k === 1 ? target : `${p.pre}${state.value < 0 ? p.minus : ""}${shown}${p.post}`;
        if (k < 1) state.raf = requestAnimationFrame(step);
      };
      step(start);
    }
  }

  private fitToBox(): void {
    this.style.removeProperty("--af-dense");
    this.style.removeProperty("--af-fs");
    if (!this.clientHeight || this.scrollHeight <= this.clientHeight + 2) return;
    const base = parseFloat(getComputedStyle(this).getPropertyValue("--af-fs")) || 1;
    for (const [dense, scale] of FIT_STEPS) {
      this.style.setProperty("--af-dense", String(dense));
      this.style.setProperty("--af-fs", String(base * scale));
      if (this.scrollHeight <= this.clientHeight + 2) return;
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size === 1 && changed.has("hass")) {
      const old = changed.get("hass") as Hass | undefined;
      if (!old || !this.hass) return true;
      return this.watched().some((id) => id && old.states[id] !== this.hass!.states[id]);
    }
    return true;
  }
}

/** Zeichnet ein Widget jede volle Minute neu (Uhr, Datum, relative Zeiten). */
export abstract class AfTickingWidget extends AfWidget {
  private tickTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    const schedule = () => {
      const ms = 60e3 - (Date.now() % 60e3) + 50;
      this.tickTimer = window.setTimeout(() => {
        this.requestUpdate();
        schedule();
      }, ms);
    };
    schedule();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.tickTimer);
  }
}

export const define = (name: string, ctor: CustomElementConstructor): void => {
  if (!customElements.get(name)) customElements.define(name, ctor);
};
