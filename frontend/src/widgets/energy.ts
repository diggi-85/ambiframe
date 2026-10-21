// Energie: Strompreis-Verlauf (Tibber) und Leistung (PV gegen Verbrauch)
import { t } from "../i18n";
import { css, html, nothing, svg } from "lit";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { fmt, fmtTime, numberOf, stateOf, valueOf } from "../util";
import { AfTickingWidget, define } from "./base";

interface PricePoint {
  start: Date;
  price: number;
}

/** Preise werden einmal pro Display geladen und 15 Minuten wiederverwendet. */
const priceCache: { at: number; homes: Record<string, PricePoint[]>; loading?: Promise<void>; error?: string } = { at: 0, homes: {} };

const loadPrices = (hass: Hass): Promise<void> => {
  if (priceCache.loading) return priceCache.loading;
  priceCache.loading = hass
    .callWS<{ homes: Record<string, { start: string; price: number }[]> }>({ type: "ambiframe/tibber/prices" })
    .then((res) => {
      priceCache.homes = Object.fromEntries(
        Object.entries(res.homes ?? {}).map(([home, list]) => [home, list.map((p) => ({ start: new Date(p.start), price: p.price }))]),
      );
      priceCache.error = undefined;
    })
    .catch((err: { message?: string }) => {
      priceCache.error = err?.message ?? String(err);
    })
    .finally(() => {
      priceCache.at = Date.now();
      priceCache.loading = undefined;
    });
  return priceCache.loading;
};

const ct = (eur: number, digits = 1) => `${fmt(eur * 100, digits)} ct`;
const watt = (w: number | null) => (w == null ? "–" : Math.abs(w) >= 1000 ? `${fmt(w / 1000, 1)} kW` : `${fmt(w, 0)} W`);

/** Stundenmittel aus Viertelstunden. */
const hourly = (points: PricePoint[]): PricePoint[] => {
  const map = new Map<number, number[]>();
  for (const p of points) {
    const h = new Date(p.start);
    h.setMinutes(0, 0, 0);
    const list = map.get(h.getTime()) ?? [];
    list.push(p.price);
    map.set(h.getTime(), list);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([t, l]) => ({ start: new Date(t), price: l.reduce((a, b) => a + b, 0) / l.length }));
};

/** Günstigstes zusammenhängendes Fenster von `len` Stunden ab der laufenden Stunde. */
const cheapestWindow = (hours: PricePoint[], len: number): { start: Date; end: Date; avg: number } | null => {
  const now = Date.now() - 3600e3;
  const future = hours.filter((h) => h.start.getTime() >= now);
  let best: { start: Date; end: Date; avg: number } | null = null;
  for (let i = 0; i + len <= future.length; i++) {
    const slice = future.slice(i, i + len);
    const avg = slice.reduce((a, b) => a + b.price, 0) / len;
    if (!best || avg < best.avg) best = { start: slice[0].start, end: new Date(slice[len - 1].start.getTime() + 3600e3), avg };
  }
  return best;
};

/**
 * Strompreis. Optionen: entity (aktueller Preis, optional), home (Tibber-Zuhause), label, note,
 * window (Stunden für „am günstigsten“), tomorrow (false = nur heute).
 */
class AfPrice extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .top {
        display: flex;
        align-items: flex-end;
        gap: 40px;
        margin-top: 18px;
      }
      .now {
        font-size: 104px;
        line-height: 0.9;
      }
      .now small {
        font-size: 0.32em;
        margin-left: 0.1em;
        color: var(--af-ink-2);
        font-family: var(--af-sans);
        letter-spacing: 0;
      }
      .level {
        font-size: calc(22px * var(--af-fs, 1));
        margin-bottom: 8px;
      }
      .level.good {
        color: var(--af-good);
      }
      .level.bad {
        color: var(--af-alert);
      }
      .facts {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 6px;
      }
      .best {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(19px * var(--af-fs, 1));
        margin-top: 18px;
        color: var(--af-ink-2);
      }
      .best .ic {
        color: var(--af-accent);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .best b {
        color: var(--af-ink);
        font-weight: 500;
      }
      svg {
        display: block;
        margin-top: auto;
        overflow: visible;
      }
      .t3 {
        fill: var(--af-ink-3);
        font: calc(15px * var(--af-fs, 1)) var(--af-sans);
      }
      .note {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
      }
      .muted {
        color: var(--af-ink-3);
        font-size: calc(17px * var(--af-fs, 1));
      }
    `,
  ];

  private size = { w: 0, h: 0 };
  private resize = new ResizeObserver(() => {
    this.size = { w: this.offsetWidth, h: this.offsetHeight };
    this.requestUpdate();
  });

  connectedCallback(): void {
    super.connectedCallback();
    this.resize.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize.disconnect();
  }

  protected shouldUpdate(): boolean {
    return true;
  }

  render() {
    const o = this.options;
    if (this.hass && Date.now() - priceCache.at > 15 * 60e3) void loadPrices(this.hass).then(() => this.requestUpdate());
    const homes = priceCache.homes;
    const all = homes[o.home] ?? Object.values(homes)[0] ?? [];
    const label = html`<div class="label">${o.label ?? t("Strompreis heute")}</div>`;
    if (!all.length) {
      return html`${label}<div class="muted" style="margin-top:16px">${priceCache.error ?? (priceCache.at ? t("Keine Preisdaten") : t("Lädt …"))}</div>`;
    }
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    const endTomorrow = startToday.getTime() + 2 * 864e5;
    const hours = hourly(all.filter((p) => p.start.getTime() >= startToday.getTime() && p.start.getTime() < endTomorrow));
    const today = hours.filter((h) => h.start.getTime() < startToday.getTime() + 864e5);
    const shown = o.tomorrow === false ? today : hours;
    const nowQuarter = [...all].reverse().find((p) => p.start.getTime() <= Date.now());
    const current = o.entity ? numberOf(this.hass, o.entity) ?? nowQuarter?.price : nowQuarter?.price;
    const sorted = [...today].map((h) => h.price).sort((a, b) => a - b);
    const third = (i: number) => sorted[Math.floor((sorted.length - 1) * i)];
    const level = current == null ? "" : current <= third(1 / 3) ? "good" : current >= third(2 / 3) ? "bad" : "";
    const levelText = t({ good: "günstig", bad: "teuer", "": "normal" }[level]);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const avg = sorted.reduce((a, b) => a + b, 0) / sorted.length;
    const best = cheapestWindow(hours, Number(o.window ?? 2));

    // Balken: Stunden, günstige grün, teure gold, jetzt hervorgehoben, Vergangenes blass
    const W = this.size.w || 600;
    const H = Math.max(90, Math.min(380, (this.size.h || 360) - 240));
    const gMin = Math.min(...shown.map((h) => h.price)) * 0.92;
    const gMax = Math.max(...shown.map((h) => h.price));
    const bw = W / shown.length;
    const nowH = new Date();
    nowH.setMinutes(0, 0, 0);
    const bars = shown.map((h, i) => {
      const bh = Math.max(3, ((h.price - gMin) / (gMax - gMin || 1)) * (H - 22));
      const past = h.start.getTime() < nowH.getTime();
      const isNow = h.start.getTime() === nowH.getTime();
      const color = isNow ? "var(--af-ink)" : h.price <= third(1 / 3) ? "var(--af-good)" : h.price >= third(2 / 3) ? "var(--af-accent)" : "var(--af-ink-3)";
      const lbl =
        h.start.getHours() % 6 === 0
          ? svg`<text class="t3" x=${i * bw + bw / 2} y=${H} text-anchor="middle">${h.start.getHours() === 0 && i > 0 ? t("morgen") : `${h.start.getHours()}`}</text>`
          : nothing;
      return svg`<rect x=${i * bw + 1.5} y=${H - 20 - bh} width=${Math.max(2, bw - 3)} height=${bh} rx="2" fill=${color} opacity=${past ? 0.3 : isNow ? 1 : 0.75}></rect>${lbl}`;
    });

    return html`${label}
      <div class="top">
        <div class="now display num">${current != null ? fmt(current * 100, 1) : "–"}<small>ct/kWh</small></div>
        <div>
          <div class="level ${level}">${levelText}</div>
          <div class="facts num">Ø ${ct(avg)} · ${ct(min)} – ${ct(max)}</div>
        </div>
      </div>
      ${best
        ? html`<div class="best">${anyIcon("charge")}<span>${t("Am günstigsten")} <b class="num">${fmtTime(best.start)}–${fmtTime(best.end)}</b> · Ø ${ct(best.avg)}</span></div>`
        : nothing}
      <svg width=${W} height=${H} viewBox="0 0 ${W} ${H}">${bars}</svg>
      ${o.note ? html`<div class="note">${o.note}</div>` : nothing}`;
  }
}

interface Source {
  name?: string;
  entity: string;
}

/**
 * Leistung jetzt: Erzeugung gegen Verbrauch.
 * Optionen: production [{name, entity}] (W), consumption {name, entity} (W), forecast (kWh heute),
 * forecast_remaining, extra (Entität für die Zeile unter dem Balken), label, production_label.
 */
class AfPower extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-top: 18px;
      }
      .k {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .k .ic {
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .v {
        font-size: 72px;
        line-height: 1;
        margin-top: 10px;
      }
      .src {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
        line-height: 1.5;
      }
      .bar {
        position: relative;
        height: 8px;
        border-radius: 4px;
        background: var(--af-line);
        margin-top: 26px;
        overflow: hidden;
      }
      .bar i {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 4px;
        background: var(--af-accent);
      }
      .share {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
    `,
  ];

  protected watched() {
    const o = this.options;
    return [...((o.production ?? []) as Source[]).map((s) => s.entity), o.consumption?.entity, o.forecast, o.forecast_remaining, o.extra];
  }

  render() {
    const o = this.options;
    const sources = (o.production ?? []) as Source[];
    const values = sources.map((s) => ({ name: s.name ?? (stateOf(this.hass, s.entity)?.attributes.friendly_name as string) ?? s.entity, w: numberOf(this.hass, s.entity) }));
    const prod = values.reduce((a, v) => a + (v.w ?? 0), 0);
    const cons = o.consumption?.entity ? numberOf(this.hass, o.consumption.entity) : null;
    const share = cons ? Math.min(100, (prod / cons) * 100) : null;
    const fc = o.forecast ? numberOf(this.hass, o.forecast) : null;
    const fcRest = o.forecast_remaining ? numberOf(this.hass, o.forecast_remaining) : null;
    const extra = o.extra ? stateOf(this.hass, o.extra) : undefined;
    return html`<div class="label">${o.label ?? t("Energie jetzt")}</div>
      <div class="row">
        <div>
          <div class="k">${anyIcon("solar")}${o.production_label ?? t("Erzeugung")}</div>
          <div class="v display num">${watt(prod)}</div>
          <div class="src num">${values.map((v) => html`${v.name} ${watt(v.w)}<br />`)}</div>
        </div>
        ${o.consumption?.entity
          ? html`<div>
              <div class="k">${anyIcon("home")}${o.consumption.name ?? t("Verbrauch")}</div>
              <div class="v display num">${watt(cons)}</div>
              ${fc != null ? html`<div class="src num">${t("Prognose heute {n} kWh", { n: fmt(fc, 1) })}${fcRest != null ? html`<br />${t("noch {n} kWh", { n: fmt(fcRest, 1) })}` : nothing}</div>` : nothing}
            </div>`
          : nothing}
      </div>
      ${share != null
        ? html`<div class="bar"><i style="width:${share}%"></i></div>
            <div class="share num">
              <span>${t("{n} % aus eigener Sonne", { n: fmt(share, 0) })}</span>
              <span>${extra ? `${o.extra_name ?? extra.attributes.friendly_name ?? ""} ${fmt(valueOf(this.hass, o.extra), 0)} ${extra.attributes.unit_of_measurement ?? ""}` : ""}</span>
            </div>`
        : nothing}`;
  }
}

define("af-price", AfPrice);
define("af-power", AfPower);
