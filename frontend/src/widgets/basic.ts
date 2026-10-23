// Uhr, Datum, Text
import { locale } from "../i18n";
import { css, html, nothing } from "lit";
import { anyIcon } from "../icons";
import { markdown, markdownStyles } from "../markdown";
import { alignStyles, widgetStyles } from "../styles";
import { TemplateWatch } from "../template";
import { fmtDate, fmtTime } from "../util";
import "./clocks";
import { AfTickingWidget, AfWidget, define } from "./base";

const COLORS: Record<string, string> = {
  ink: "var(--af-ink)",
  muted: "var(--af-ink-2)",
  faint: "var(--af-ink-3)",
  accent: "var(--af-accent)",
};
const color = (name: unknown, fallback: string): string => COLORS[String(name)] ?? (name ? String(name) : fallback);

/**
 * Uhr. Optionen: size (auto | small), seconds (bool), font (display | sans), color.
 * „auto“ füllt die Rasterzelle – je größer das Widget, desto größer die Uhr.
 */
class AfClock extends AfTickingWidget {
  static styles = [
    widgetStyles,
    alignStyles,
    css`
      :host {
        container-type: size;
      }
      .clock {
        line-height: 0.86;
        white-space: nowrap;
        font-size: min(110cqh, 36cqw);
      }
      .clock.small {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1;
        color: var(--af-ink-2);
      }
      af-flap {
        font-size: min(70cqh, 21cqw);
      }
      .col {
        color: var(--af-colon, inherit);
        opacity: var(--af-colon-opacity, 0.55);
        margin: 0 0.02em;
      }
    `,
  ];

  private secTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.options.seconds) this.secTimer = window.setInterval(() => this.requestUpdate(), 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.secTimer);
  }

  render() {
    const now = new Date();
    const [h, m] = fmtTime(now).split(":");
    const small = this.options.size === "small";
    const font = this.options.font === "sans" || small ? "" : "display";
    const sec = this.options.seconds ? html`<span class="col">:</span>${String(now.getSeconds()).padStart(2, "0")}` : nothing;
    // Fallblatt: im Fallblatt-Stil oder mit style: flap (style: plain schaltet es ab)
    if (!small && (this.options.style === "flap" || (this.ctx?.flap && this.options.style !== "plain")))
      return html`<af-flap .text=${`${h}:${m}${this.options.seconds ? `:${String(now.getSeconds()).padStart(2, "0")}` : ""}`}></af-flap>`;
    return html`<div class="clock num ${font} ${small ? "small" : ""}" style="color:${color(this.options.color, "")}">
      ${h}<span class="col">:</span>${m}${sec}
    </div>`;
  }
}

/** Datum. Optionen: format (long | short), color, size (px), style (line | card). */
class AfDate extends AfTickingWidget {
  static styles = [
    widgetStyles,
    alignStyles,
    css`
      .date {
        line-height: 1.2;
      }
      .card .day {
        font-size: 128px;
        line-height: 0.9;
        margin-top: auto;
      }
      .card .month {
        font-size: 28px;
        margin-top: 16px;
      }
    `,
  ];

  render() {
    const now = new Date();
    if (this.options.style === "card") {
      return html`<div class="card" style="width:100%">
        <div class="label">${now.toLocaleDateString(locale(), { weekday: "long" })}</div>
        <div class="day display num">${now.getDate()}</div>
        <div class="month">${now.toLocaleDateString(locale(), { month: "long", year: "numeric" })}</div>
      </div>`;
    }
    const size = Number(this.options.size) || 26;
    const fallback = this.options.color ? "" : "var(--af-ink-2)";
    return html`<div class="date" style="font-size:${size}px;color:${color(this.options.color, fallback)}">
      ${fmtDate(now, this.options.format === "short" ? "short" : "long")}
    </div>`;
  }
}

const TEXT_STYLES: Record<string, string> = {
  label: "font-size: calc(16px * var(--af-fs, 1));letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--af-ink-3)",
  title: "font-size:44px;line-height:1.05",
  body: "font-size: calc(21px * var(--af-fs, 1));line-height:1.45;color:var(--af-ink-2)",
  big: "font-size:84px;line-height:1",
};

/**
 * Freier Text. Optionen: text (darf Jinja enthalten: {{ states('sensor.x') }}), markdown (Formatierung), style
 * (label | title | body | big), color, size, icon, font (display | sans).
 */
class AfText extends AfWidget {
  static styles = [
    widgetStyles,
    alignStyles,
    markdownStyles,
    css`
      .md {
        width: 100%;
      }
      .wait {
        opacity: 0.35;
      }
      .cursor {
        animation: blink 1s steps(1) infinite;
        color: var(--af-accent);
        margin-left: 0.04em;
      }
      @keyframes blink {
        50% {
          opacity: 0;
        }
      }
    `,
  ];

  private tpl = new TemplateWatch(this);
  /** Schreibmaschine: so viele Zeichen sind schon „getippt“ */
  private typed = 0;
  private typedFor = "";
  private typeTimer?: number;

  protected willUpdate(): void {
    this.tpl.set(this.hass, this.options.text);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.typeTimer);
    this.typeTimer = undefined;
    this.typedFor = "";
  }

  /** Text Zeichen für Zeichen erscheinen lassen – neu, sobald sich der Text ändert */
  private typewriter(text: string): string {
    if (text !== this.typedFor) {
      this.typedFor = text;
      this.typed = 0;
      clearInterval(this.typeTimer);
      this.typeTimer = window.setInterval(() => {
        this.typed++;
        if (this.typed >= this.typedFor.length) {
          clearInterval(this.typeTimer);
          this.typeTimer = undefined;
        }
        this.requestUpdate();
      }, 55);
    }
    return text.slice(0, this.typed);
  }

  render() {
    const o = this.options;
    const style = TEXT_STYLES[o.style] ?? TEXT_STYLES.body;
    const extra = [o.size ? `font-size:${Number(o.size)}px` : "", o.color ? `color:${color(o.color, "")}` : ""].join(";");
    const font = o.font === "display" || o.style === "title" || o.style === "big" ? "display" : "";
    const text = this.tpl.text(o.text);
    if (text === undefined) return html`<div class="wait" style="${style};${extra}">…</div>`;
    const icon = o.icon ? html`${anyIcon(o.icon)} ` : nothing;
    if (o.markdown) return html`<div style="${style};${extra};width:100%">${icon}${markdown(text)}</div>`;
    if (o.typewriter && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      return html`<div class="${font}" style="${style};${extra};white-space:pre-line">${icon}${this.typewriter(text)}<span class="cursor">▍</span></div>`;
    return html`<div class="${font}" style="${style};${extra};white-space:pre-line">${icon}${text}</div>`;
  }
}

define("af-clock", AfClock);
define("af-date", AfDate);
define("af-text", AfText);
