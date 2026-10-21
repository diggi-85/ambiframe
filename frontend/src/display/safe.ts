// Notfallmodus: Uhr, Datum und Wetter – ohne Konfiguration, Stile, Schriften oder eigenes CSS.
// Läuft auch dann, wenn die Ambiframe-Konfiguration kaputt ist oder die normale Anzeige abstürzt.
import { locale, t } from "../i18n";
import { LitElement, css, html, nothing } from "lit";
import { iconSvg, weatherIcon, weatherLabel } from "../icons";
import type { Hass } from "../types";
import { define } from "../widgets/base";

export class AfSafe extends LitElement {
  static properties = {
    hass: { attribute: false },
    reason: {},
    weather: {},
  };

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 2vmin;
      background: #0d0d0c;
      color: #ece6da;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      text-align: center;
      -webkit-font-smoothing: antialiased;
    }
    .clock {
      font-size: 26vmin;
      font-weight: 200;
      line-height: 0.9;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
    }
    .date {
      font-size: 4.6vmin;
      color: rgba(236, 230, 218, 0.72);
    }
    .weather {
      display: flex;
      align-items: center;
      gap: 2vmin;
      margin-top: 3vmin;
      font-size: 4.6vmin;
      color: rgba(236, 230, 218, 0.85);
    }
    .weather .ic {
      width: 6vmin;
      height: 6vmin;
      color: #d6a865;
    }
    .note {
      position: absolute;
      left: 50%;
      bottom: 3vmin;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: max(14px, 2vmin);
      color: rgba(236, 230, 218, 0.45);
      white-space: nowrap;
    }
    .note .ic {
      width: 1.2em;
      height: 1.2em;
    }
  `;

  hass?: Hass;
  /** Kurzer Grund, unten klein angezeigt */
  reason = "";
  /** Wetter-Entität; leer = erste gefundene */
  weather = "";
  private timer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    const tick = () => {
      this.requestUpdate();
      this.timer = window.setTimeout(tick, 60e3 - (Date.now() % 60e3) + 50);
    };
    tick();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
  }

  render() {
    const now = new Date();
    const lang = locale();
    const id = this.weather || Object.keys(this.hass?.states ?? {}).find((e) => e.startsWith("weather."));
    const w = id ? this.hass?.states[id] : undefined;
    const temp = Number(w?.attributes.temperature);
    return html`<div class="clock">${now.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" })}</div>
      <div class="date">${now.toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long" })}</div>
      ${w && w.state !== "unavailable"
        ? html`<div class="weather">
            ${iconSvg(weatherIcon(w.state))}<span>${Number.isFinite(temp) ? `${Math.round(temp)}°` : ""} ${weatherLabel(w.state)}</span>
          </div>`
        : nothing}
      <div class="note">${iconSvg("info")}<span>${t("Ambiframe · Notfallmodus")}${this.reason ? ` – ${t(this.reason)}` : ""}</span></div>`;
  }
}

define("af-safe", AfSafe);
