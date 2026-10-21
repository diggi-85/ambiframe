// Wetter-Widget: variant = now | card | hourly | daily | line
import { t } from "../i18n";
import { css, html, nothing, svg, type PropertyValues } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import type { DisplayContext, Forecast } from "../data";
import { PATHS, iconSvg, weatherIcon, weatherLabel } from "../icons";
import { widgetStyles } from "../styles";
import { compass, dayDiff, fmt, stateOf, weekdayShort } from "../util";
import { AfWidget, define } from "./base";

interface Hour {
  t: Date;
  temp: number;
  cond?: string;
  pp: number;
}
interface Day {
  t: Date;
  hi: number;
  lo: number;
  cond?: string;
  pp: number;
}

const toHours = (list: Forecast[] | undefined): Hour[] => {
  const from = Date.now() - 30 * 60e3;
  return (list ?? [])
    .map((f) => ({ t: new Date(f.datetime), temp: Number(f.temperature), cond: f.condition, pp: f.precipitation_probability ?? 0 }))
    .filter((h) => h.t.getTime() > from && Number.isFinite(h.temp));
};
const toDays = (list: Forecast[] | undefined): Day[] =>
  (list ?? [])
    .map((f) => ({ t: new Date(f.datetime), hi: Number(f.temperature), lo: Number(f.templow ?? f.temperature), cond: f.condition, pp: f.precipitation_probability ?? 0 }))
    .filter((d) => dayDiff(d.t) >= 0);

class AfWeather extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      .now > .ic {
        font-size: 76px;
        color: var(--af-accent);
      }
      .now .temp {
        font-size: 184px;
        line-height: 0.9;
        margin-top: 10px;
      }
      .now .cond {
        font-size: 32px;
        margin-top: 12px;
      }
      .now .range {
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 12px;
      }
      .now .meta {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 28px;
        line-height: 1.75;
      }
      .card .bigic {
        font-size: 60px;
        color: var(--af-accent);
        margin-top: 26px;
      }
      .card .big {
        font-size: 128px;
        line-height: 0.9;
        margin-top: 22px;
      }
      .card .cond {
        font-size: 28px;
        margin-top: 16px;
      }
      .card .sub {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }
      .mini {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin-top: auto;
        padding-top: 22px;
        border-top: 1px solid var(--af-line);
        text-align: center;
      }
      .mini .h {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .mini .ic {
        font-size: 26px;
        color: var(--af-ink-2);
        margin: 10px auto;
        display: block;
      }
      .mini .v {
        font-size: calc(20px * var(--af-fs, 1));
      }
      svg.chart {
        display: block;
        overflow: visible;
        margin-top: 12px;
      }
      svg.chart text {
        font-family: var(--af-sans);
        font-variant-numeric: tabular-nums;
      }
      .t1 {
        fill: var(--af-ink);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .t3 {
        fill: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
      }
      .tc {
        fill: var(--af-cold);
        font-size: calc(15px * var(--af-fs, 1));
      }
      .gi {
        color: var(--af-ink-2);
      }
      .days {
        margin-top: 14px;
      }
      .day {
        display: grid;
        grid-template-columns: 78px 30px 52px 44px 1fr 44px;
        align-items: center;
        column-gap: 12px;
        height: 50px;
        border-top: 1px solid var(--af-line);
        font-size: calc(20px * var(--af-fs, 1));
      }
      .day .ic {
        font-size: 26px;
        color: var(--af-ink-2);
      }
      .pp {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-cold);
      }
      .lo {
        color: var(--af-ink-3);
        text-align: right;
      }
      .bar {
        position: relative;
        height: 6px;
        border-radius: 3px;
        background: var(--af-line);
      }
      .bar i {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 3px;
        background: linear-gradient(90deg, var(--af-cold), var(--af-accent));
      }
      .line {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .line .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
      }
    `,
  ];

  private size = { w: 0, h: 0 };
  private resize?: ResizeObserver;
  private onForecast = () => this.requestUpdate();
  private listeningTo?: DisplayContext;

  protected watched() {
    return [this.options.entity];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resize = new ResizeObserver(() => {
      const w = this.offsetWidth;
      const h = this.offsetHeight;
      if (w !== this.size.w || h !== this.size.h) {
        this.size = { w, h };
        if (this.options.variant === "hourly") this.requestUpdate();
      }
    });
    this.resize.observe(this);
    this.listen();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize?.disconnect();
    this.listeningTo?.forecasts.removeEventListener("change", this.onForecast);
    this.listeningTo = undefined;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("ctx")) this.listen();
  }

  private listen(): void {
    if (this.listeningTo === this.ctx) return;
    this.listeningTo?.forecasts.removeEventListener("change", this.onForecast);
    this.ctx?.forecasts.addEventListener("change", this.onForecast);
    this.listeningTo = this.ctx;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return changed.has("ctx") || changed.has("options") || super.shouldUpdate(changed);
  }

  private hours(): Hour[] {
    return toHours(this.ctx?.forecasts.get(this.options.entity, "hourly"));
  }
  private days(): Day[] {
    return toDays(this.ctx?.forecasts.get(this.options.entity, "daily"));
  }

  render() {
    const s = stateOf(this.hass, this.options.entity);
    if (!s) return html`<div class="faint">${t("Wetter-Entität fehlt")}</div>`;
    const a = s.attributes;
    switch (this.options.variant ?? "now") {
      case "line":
        return html`<div class="line">${iconSvg(weatherIcon(s.state))}<span class="num">${fmt(a.temperature, 0)}°</span><span>${weatherLabel(s.state)}</span></div>`;
      case "card":
        return this.renderCard(s.state, a);
      case "hourly":
        return this.renderHourly();
      case "rain":
        return this.renderRain();
      case "daily":
        return this.renderDaily();
      default: {
        const today = this.days().find((d) => dayDiff(d.t) === 0);
        return html`<div class="now">
          ${iconSvg(weatherIcon(s.state))}
          <div class="temp display num">${fmt(a.temperature, 0)}°</div>
          <div class="cond">${weatherLabel(s.state)}</div>
          ${today ? html`<div class="range num">${t("Heute {lo}° bis {hi}°", { lo: fmt(today.lo, 0), hi: fmt(today.hi, 0) })}</div>` : nothing}
          <div class="meta num">
            ${t("Wind")} ${fmt(a.wind_speed, 0)} ${a.wind_speed_unit ?? "km/h"} ${compass(a.wind_bearing)}<br />
            ${t("Luftfeuchte")} ${fmt(a.humidity, 0)} %${a.uv_index != null ? ` · UV ${fmt(a.uv_index, 0)}` : ""}
          </div>
        </div>`;
      }
    }
  }

  private renderCard(state: string, a: Record<string, any>) {
    const today = this.days().find((d) => dayDiff(d.t) === 0);
    const hrs = this.hours().filter((_, i) => i % 3 === 0).slice(0, 4);
    return html`<div class="card">
      <div class="label">${this.options.name ?? a.friendly_name ?? ""}</div>
      <div class="bigic">${iconSvg(weatherIcon(state))}</div>
      <div class="big display num">${fmt(a.temperature, 0)}°</div>
      <div class="cond">${weatherLabel(state)}</div>
      ${today ? html`<div class="sub num">${t("Bis {hi}°, nachts {lo}°", { hi: fmt(today.hi, 0), lo: fmt(today.lo, 0) })}</div>` : nothing}
      ${hrs.length
        ? html`<div class="mini">
            ${hrs.map((h) => html`<div><div class="h num">${t("{h} Uhr", { h: h.t.getHours() })}</div>${iconSvg(weatherIcon(h.cond))}<div class="v num">${fmt(h.temp, 0)}°</div></div>`)}
          </div>`
        : nothing}
    </div>`;
  }

  private renderHourly() {
    const pts = this.hours().slice(0, Number(this.options.hours) || 12);
    const W = this.size.w || 668;
    const H = Math.max(140, Math.min(220, (this.size.h || 254) - 40));
    const label = html`<div class="label">${this.options.label ?? t("Nächste Stunden")}</div>`;
    if (pts.length < 2) return label;
    const top = 76;
    const bot = H - 34;
    const temps = pts.map((p) => p.temp);
    const lo = Math.min(...temps) - 1;
    const hi = Math.max(...temps) + 1;
    const x = (i: number) => 24 + (i * (W - 48)) / (pts.length - 1);
    const y = (t: number) => top + (bot - top) * (1 - (t - lo) / (hi - lo || 1));
    let d = `M${x(0)},${y(temps[0])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = (x(i) + x(i + 1)) / 2;
      d += ` C${cx},${y(temps[i])} ${cx},${y(temps[i + 1])} ${x(i + 1)},${y(temps[i + 1])}`;
    }
    const area = `${d} L${x(pts.length - 1)},${bot + 10} L${x(0)},${bot + 10} Z`;
    const step = pts.length > 8 ? 2 : 1;
    return html`${label}
      <svg class="chart" width=${W} height=${H} viewBox="0 0 ${W} ${H}">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--af-accent)" stop-opacity=".22" />
            <stop offset="1" stop-color="var(--af-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d=${area} fill="url(#wg)" />
        <path d=${d} fill="none" stroke="var(--af-accent)" stroke-width="2.4" stroke-linecap="round" />
        ${pts.map((p, i) => {
          if (i % step) return nothing;
          const cx = x(i);
          const cy = y(p.temp);
          return svg`
            <g class="gi" transform="translate(${cx - 13},0) scale(1.08)" fill="none" stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round">${unsafeSVG(PATHS[weatherIcon(p.cond)])}</g>
            ${p.pp >= 30 ? svg`<text class="tc" x=${cx} y="46" text-anchor="middle">${fmt(p.pp, 0)} %</text>` : nothing}
            <text class="t1" x=${cx} y=${cy - 14} text-anchor="middle">${fmt(p.temp, 0)}°</text>
            <circle cx=${cx} cy=${cy} r="3.5" fill="var(--af-bg)" stroke="var(--af-accent)" stroke-width="2" />
            <text class="t3" x=${cx} y=${H - 6} text-anchor="middle">${t("{h} Uhr", { h: p.t.getHours() })}</text>`;
        })}
      </svg>`;
  }

  /** Regen: Sensor jetzt (optional rain_sensor) und nächster Regen laut Vorhersage (ab threshold %). */
  private renderRain() {
    const o = this.options;
    const raining = o.rain_sensor ? this.hass?.states[o.rain_sensor]?.state === "on" : false;
    const threshold = Number(o.threshold ?? 40);
    const hours = this.hours().slice(0, Number(o.hours ?? 12));
    const rainy = (h: Hour) => h.pp >= threshold || ["rainy", "pouring", "lightning-rainy", "snowy-rainy"].includes(h.cond ?? "");
    const next = hours.find(rainy);
    const dryFrom = raining ? hours.find((h) => !rainy(h)) : undefined;
    const last = hours[hours.length - 1];
    let title: string;
    let sub = "";
    if (raining) {
      title = t("Es regnet gerade");
      sub = dryFrom ? t("Trocken ab etwa {h} Uhr", { h: dryFrom.t.getHours() }) : t("Bleibt vorerst nass");
    } else if (next) {
      title = t("Regen ab {h} Uhr", { h: next.t.getHours() });
      sub = t("{n} % Wahrscheinlichkeit", { n: fmt(next.pp, 0) });
    } else {
      title = t("Trocken");
      sub = last ? t("Kein Regen bis {h} Uhr", { h: last.t.getHours() }) : "";
    }
    return html`<div class="line" style="align-items:flex-start">
      <span style="font-size:30px;color:var(--af-accent)">${iconSvg(raining || next ? "rain" : "sun")}</span>
      <div><div style="font-size: calc(24px * var(--af-fs, 1));color:var(--af-ink)">${title}</div><div style="font-size: calc(17px * var(--af-fs, 1));color:var(--af-ink-3);margin-top:6px">${sub}</div></div>
    </div>`;
  }

  private renderDaily() {
    const days = this.days()
      .filter((d) => dayDiff(d.t) >= 1)
      .slice(0, Number(this.options.days) || 5);
    const label = html`<div class="label">${this.options.label ?? t("Nächste Tage")}</div>`;
    if (!days.length) return label;
    const gMin = Math.min(...days.map((d) => d.lo));
    const gMax = Math.max(...days.map((d) => d.hi));
    const pos = (v: number) => ((v - gMin) / (gMax - gMin || 1)) * 100;
    return html`${label}
      <div class="days">
        ${days.map(
          (d) => html`<div class="day num">
            <span>${dayDiff(d.t) === 1 ? t("Morgen") : weekdayShort(d.t)}</span>
            ${iconSvg(weatherIcon(d.cond))}
            <span class="pp">${d.pp >= 20 ? `${fmt(d.pp, 0)} %` : ""}</span>
            <span class="lo">${fmt(d.lo, 0)}°</span>
            <span class="bar"><i style="left:${pos(d.lo)}%;right:${100 - pos(d.hi)}%"></i></span>
            <span>${fmt(d.hi, 0)}°</span>
          </div>`,
        )}
      </div>`;
  }
}

define("af-weather", AfWeather);
