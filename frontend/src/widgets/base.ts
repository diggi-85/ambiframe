// Basisklasse aller Widgets: bekommt hass, Optionen und den Display-Kontext
import { LitElement, type CSSResultGroup, type PropertyValues } from "lit";
import type { DisplayContext } from "../data";
import { MOTION_BASE, motionOf, widgetStyles, type Motion } from "../styles";
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

  private counts = new WeakMap<Element, { last: string; value: number; raf: number; safety?: number; trend?: number }>();

  /**
   * Zahlen zählen zum neuen Wert, statt zu springen – beim Erscheinen der Seite von 0 (bei „dezent“ ab ~65 %), aber erst,
   * wenn der Seitenwechsel die Seite weitgehend eingeblendet hat (ctx.motionAt) plus Versatz der Karte. Ändert sich ein
   * Wert, während die Seite steht: gleiten (motion.when) und kurz hervorheben (motion.highlight). Nur auf einem Display,
   * nicht bei E-Ink/Vorschau-Standbild, „weniger Bewegung“, im Videostream oder im Hintergrund.
   */
  private countUp(): void {
    const ctx = this.ctx;
    if (!ctx || ctx.still || ctx.ticker === false || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const m = ctx.motion ?? motionOf(ctx.config?.design, undefined, ctx.theme);
    const moving = m.style === "soft" || m.style === "spring";
    const els = this.renderRoot.querySelectorAll(".big.num, .v.num, .now.num, .val.num");
    if (!els.length) return;
    const ms = m.duration * 1000;
    let wait: number | undefined;
    for (const el of els) {
      const node = [...el.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && /\d/.test((n as Text).data)) as Text | undefined;
      const st = this.counts.get(el);
      // Steht noch, was wir zuletzt geschrieben haben, hat Lit nichts Neues gesetzt
      if (!node || node.data === st?.last) continue;
      cancelAnimationFrame(st?.raf ?? 0);
      clearTimeout(st?.safety);
      const target = node.data;
      const p = parseCount(target);
      const counts = moving && (m.count === "all" || (m.count === "big" && !el.classList.contains("val")));
      const changed = !!st && !!p && p.value !== st.value;
      if (changed && m.style !== "off") this.highlight(el, p!.value > st!.value, m, st!);
      // beim Erscheinen ab 0 (dezent: ab ~65 %), danach vom alten Wert – oder springen, wenn nur beim Seitenwechsel
      const from = st ? st.value : p ? (ctx.calm ? p.value : p.value * (m.strength === "subtle" ? 0.65 : 0)) : 0;
      if (!p || !counts || p.value === from || (st && m.when === "page")) {
        this.counts.set(el, { ...st, last: target, value: p?.value ?? from, raf: 0 });
        continue;
      }
      if (wait === undefined) {
        // erstes Erscheinen: auf den Seitenwechsel und die eigene Karte warten
        const cs = getComputedStyle(this);
        const stagger = (parseFloat(cs.getPropertyValue("--af-i")) || 0) * (parseFloat(cs.getPropertyValue("--af-stagger")) || 0);
        wait = st ? 0 : Math.max(0, (ctx.motionAt ?? 0) + stagger - performance.now());
      }
      const state: { last: string; value: number; raf: number; safety?: number; trend?: number } = { last: target, value: from, raf: 0, trend: st?.trend };
      this.counts.set(el, state);
      // Sicherheitsnetz: Hält der Browser die Animation an (Tab im Hintergrund), steht trotzdem der echte Wert da
      state.safety = window.setTimeout(() => {
        cancelAnimationFrame(state.raf);
        state.value = p.value;
        state.last = node.data = target;
      }, wait + ms + 300);
      const start = performance.now() + wait;
      // federnd: Nachschwingen je nach Größe der Änderung – kleine Änderungen schwingen kaum
      const rel = Math.min(1, Math.abs(p.value - from) / Math.max(Math.abs(p.value), Math.abs(from), 1e-9));
      const c1 = m.style === "spring" ? 1.2 * rel : 0;
      const ease = (k: number) => 1 + (c1 + 1) * (k - 1) ** 3 + c1 * (k - 1) ** 2;
      const step = (now: number) => {
        const k = Math.max(0, Math.min(1, (now - start) / ms));
        state.value = from + (p.value - from) * ease(k);
        const shown = Math.abs(state.value).toFixed(p.decimals).replace(".", p.sep || ".");
        state.last = node.data = k === 1 ? target : `${p.pre}${state.value < 0 ? p.minus : ""}${shown}${p.post}`;
        if (k < 1) state.raf = requestAnimationFrame(step);
      };
      step(performance.now());
    }
  }

  /** Neuer Wert, während die Seite steht: kurz in der Akzentfarbe aufleuchten und/oder Pfeil ▲▼ */
  private highlight(el: Element, up: boolean, m: Motion, st: { trend?: number }): void {
    if (m.highlight === "glow" || m.highlight === "both") {
      const accent = getComputedStyle(el).getPropertyValue("--af-accent").trim() || "currentColor";
      const glow = m.strength === "subtle" ? 8 : m.strength === "strong" ? 28 : 16;
      el.animate?.([{ color: accent, textShadow: `0 0 ${glow}px ${accent}` }, {}], { duration: 1800 * (m.duration / MOTION_BASE), easing: "ease-out" });
    }
    if (m.highlight === "arrow" || m.highlight === "both") {
      const h = el as HTMLElement;
      clearTimeout(st.trend);
      h.dataset.trend = "";
      delete h.dataset.trend;
      void h.offsetWidth; // Pfeil-Animation neu starten
      h.dataset.trend = up ? "up" : "down";
      st.trend = window.setTimeout(() => delete h.dataset.trend, 6000);
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
