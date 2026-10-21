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
