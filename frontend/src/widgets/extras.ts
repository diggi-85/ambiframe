// Haustier, Tagesbilanz, WLAN-QR-Code und Fortschritt eines Auftrags (z. B. 3D-Druck)
import { locale, t } from "../i18n";
import qrcode from "qrcode-generator";
import { css, html, nothing, svg } from "lit";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { ago, fmt, fmtTime, stateOf } from "../util";
import { AfTickingWidget, AfWidget, define } from "./base";

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const WEEKDAY = (d: Date) => d.toLocaleDateString(locale(), { weekday: "short" }).replace(".", "");

/* ───────────────────────── Haustier ───────────────────────── */

/**
 * Haustier, z. B. Katzenklo-Besuche. Optionen: name, visits (Zähler „heute“, setzt sich täglich zurück), days (Verlauf, 7),
 * icon, label. Zeigt die Zahl von heute, die Uhrzeiten der Besuche und die letzten Tage.
 */
class AfPet extends AfTickingWidget {
  static properties = { ...AfWidget.properties, times: { state: true }, history: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
      }
      .wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 40px 72px;
        align-items: flex-end;
        height: 100%;
        align-content: center;
      }
      .left {
        min-width: 340px;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 30px;
      }
      .head .ic {
        font-size: 40px;
        color: var(--af-accent);
      }
      .big {
        font-size: min(46cqh, 240px);
        line-height: 0.9;
        margin-top: 18px;
      }
      .unit {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 10px;
      }
      .last {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .times {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 22px;
      }
      .times span {
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        font-size: calc(17px * var(--af-fs, 1));
      }
      .chart {
        flex: 1;
        min-width: 360px;
      }
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 14px;
        height: 220px;
        margin-top: 16px;
      }
      .bar {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        height: 100%;
      }
      .bar i {
        width: 100%;
        max-width: 48px;
        border-radius: 10px 10px 4px 4px;
        background: var(--af-accent-soft);
        border: 1px solid var(--af-line);
      }
      .bar.today i {
        background: var(--af-accent);
      }
      .bar b {
        font-weight: 500;
        font-size: calc(18px * var(--af-fs, 1));
      }
      .bar span {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .avg {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
      }
    `,
  ];

  /** Uhrzeiten der heutigen Besuche (aus dem Verlauf des Zählers) */
  private times: Date[] = [];
  /** Besuche der letzten Tage (aus der Langzeit-Statistik) */
  private history: { day: Date; count: number }[] = [];
  private loadedFor = "";
  private loadedAt = 0;

  protected watched() {
    return [this.options.visits];
  }

  protected willUpdate(): void {
    const state = stateOf(this.hass, this.options.visits)?.state ?? "";
    // Bei jedem neuen Besuch und spätestens alle 30 min nachladen
    if (this.hass && this.options.visits && (state !== this.loadedFor || Date.now() - this.loadedAt > 30 * 60e3)) {
      this.loadedFor = state;
      this.loadedAt = Date.now();
      void this.load();
    }
  }

  private async load(): Promise<void> {
    const hass = this.hass!;
    const id = this.options.visits as string;
    const days = Number(this.options.days ?? 7);
    try {
      const hist = await hass.callWS<Record<string, { s: string; lu?: number; lc?: number }[]>>({
        type: "history/history_during_period",
        start_time: startOfDay().toISOString(),
        entity_ids: [id],
        minimal_response: true,
        no_attributes: true,
      });
      const rows = hist[id] ?? [];
      const times: Date[] = [];
      let prev = NaN;
      for (const r of rows) {
        const n = parseFloat(r.s);
        const t = (r.lc ?? r.lu ?? 0) * 1000;
        if (Number.isFinite(n) && Number.isFinite(prev) && n > prev && t) times.push(new Date(t));
        if (Number.isFinite(n)) prev = n;
      }
      this.times = times;
    } catch {
      /* ohne Verlauf eben nur die Zahl */
    }
    try {
      const start = startOfDay(new Date(Date.now() - (days - 1) * 864e5));
      const stats = await hass.callWS<Record<string, { start: number; change?: number }[]>>({
        type: "recorder/statistics_during_period",
        statistic_ids: [id],
        period: "day",
        start_time: start.toISOString(),
        types: ["change"],
      });
      this.history = (stats[id] ?? []).map((s) => ({ day: new Date(s.start), count: Math.max(0, Math.round(s.change ?? 0)) }));
    } catch {
      this.history = [];
    }
  }

  render() {
    const o = this.options;
    const s = stateOf(this.hass, o.visits);
    const today = s ? Math.round(parseFloat(s.state)) : NaN;
    const last = this.times.at(-1);
    // Heute aus dem Zähler (aktueller als die Statistik)
    const isToday = (d: Date) => startOfDay(d).getTime() === startOfDay().getTime();
    const days = this.history.map((h) => (isToday(h.day) && Number.isFinite(today) ? { ...h, count: today } : h));
    const max = Math.max(1, ...days.map((d) => d.count));
    const past = days.filter((d) => !isToday(d.day));
    const avg = past.length ? past.reduce((a, d) => a + d.count, 0) / past.length : NaN;
    return html`<div class="wrap">
      <div class="left">
        <div class="head">${anyIcon(o.icon ?? "cat")}<span>${o.name ?? t("Haustier")}</span></div>
        <div class="big display num">${Number.isFinite(today) ? today : "–"}<span style="font-size:.4em">×</span></div>
        <div class="unit">${o.unit ?? t("Besuche heute")}</div>
        ${last ? html`<div class="last">${t("zuletzt {time}", { time: fmtTime(last) })} · ${ago(last)}</div>` : nothing}
        ${this.times.length ? html`<div class="times">${this.times.map((time) => html`<span class="num">${fmtTime(time)}</span>`)}</div>` : nothing}
      </div>
      ${days.length > 1
        ? html`<div class="chart">
            <div class="label">${o.label ?? t("Letzte Tage")}</div>
            <div class="bars">
              ${days.map(
                (d, j) => html`<div class="bar ${isToday(d.day) ? "today" : ""}">
                  <b class="num">${d.count}</b>
                  <i class="grow-y" style="height:${Math.max(4, (d.count / max) * 150)}px;--af-j:${(j / days.length).toFixed(3)}"></i>
                  <span>${WEEKDAY(d.day)}</span>
                </div>`,
              )}
            </div>
            ${Number.isFinite(avg) ? html`<div class="avg">${t("Ø {n} pro Tag", { n: fmt(avg, 1) })}</div>` : nothing}
          </div>`
        : nothing}
    </div>`;
  }
}

/* ───────────────────────── Tagesbilanz ───────────────────────── */

/** Faktor auf kWh: Wh-Zähler durch 1000, MWh mal 1000, sonst kWh */
export const kwhFactor = (unit?: unknown): number => (unit === "Wh" ? 1e-3 : unit === "MWh" ? 1e3 : 1);

/**
 * Statistik-Zeilen in Fächer: Tag = 24 Stunden nach der Uhrzeit (Sommerzeit: die doppelte Stunde wird addiert, die
 * fehlende bleibt leer), Woche = 7 Tage nach dem Datum. Werte in kWh.
 */
export const slotValues = (rows: { start: number; change?: number }[], day: Date, week: boolean, factor = 1): (number | null)[] => {
  const out: (number | null)[] = Array(week ? 7 : 24).fill(null);
  for (const x of rows) {
    if (x.change == null) continue;
    const at = new Date(x.start);
    const i = week ? Math.round((startOfDay(at).getTime() - day.getTime()) / 864e5) : startOfDay(at).getTime() === day.getTime() ? at.getHours() : -1;
    if (i >= 0 && i < out.length) out[i] = (out[i] ?? 0) + Math.max(0, x.change) * factor;
  }
  return out;
};

/** Ø je Tag aus Tagesänderungen; erst ab 3 Tagen mit Werten aussagekräftig */
export const dayAverage = (days: (number | null)[]): number | null => {
  const v = days.filter((x): x is number => x != null && Number.isFinite(x));
  return v.length >= 3 ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

/** Abweichung vom Ø: „▲ 12 % über Ø“; null bei zu wenig Daten */
export const vsAverage = (value: number, avg: number | null): { dir: "up" | "down" | "same"; pct: number } | null => {
  if (avg == null || avg < 0.05) return null;
  const pct = Math.round(((value - avg) / avg) * 100);
  return { dir: Math.abs(pct) < 5 ? "same" : pct > 0 ? "up" : "down", pct: Math.abs(pct) };
};

/** Stundenverlauf in Sätzen: Spitzenstunde und Grundlast (nachts 0–5 Uhr, kleinste Stunde in W) */
export const profileFacts = (use: (number | null)[]) => {
  let peak = -1;
  use.forEach((v, h) => v != null && (peak < 0 || v > (use[peak] ?? 0)) && (peak = h));
  const night = use.slice(0, 6).filter((v): v is number => v != null);
  return {
    peak: peak >= 0 && (use[peak] ?? 0) > 0 ? { hour: peak, kwh: use[peak] as number } : null,
    base: night.length >= 3 ? Math.min(...night) * 1000 : null,
    total: use.reduce<number>((a, v) => a + (v ?? 0), 0),
  };
};

interface BalanceRow {
  name: string;
  icon?: string;
  /** Zählerstand (total_increasing) → Tagesänderung; mit type: mean der Tagesmittelwert */
  entity: string;
  type?: "change" | "mean";
  unit?: string;
  decimals?: number;
  /** Kosten: fester Preis pro Einheit … */
  price?: number;
  /** … oder ein eigener Kosten-Zähler (€) */
  cost?: string;
  /** Nur zeigen, wenn an dem Tag etwas war (Wäsche, Laden) */
  hide_zero?: boolean;
}

interface BalanceGroup {
  label: string;
  rows: BalanceRow[];
}

/**
 * Tagesbilanz aus der Langzeit-Statistik. Optionen: groups [{label, rows: [{name, icon, entity, type, unit, decimals,
 * price, cost, hide_zero}]}], switch_hour (bis dahin der Vortag, danach heute; Standard 18), label,
 * period (week = Wochenrückblick: letzte Woche, sonntags ab switch_hour die laufende; Vergleich mit Ø 4 Wochen, Tagesbalken),
 * profile {entity, solar} (Stundenverlauf: wann wie viel Strom, PV darübergelegt), compare (false = ohne Vergleich mit Ø 7 Tage).
 */
class AfBalance extends AfTickingWidget {
  static properties = { ...AfWidget.properties, values: { state: true }, hours: { state: true } };

  static styles = [
    widgetStyles,
    css`
      /* Spalte über die ganze Kachel: der Stundenverlauf nimmt den Rest der Höhe */
      .bal {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 22px;
        margin-top: 22px;
      }
      .group {
        background: var(--af-card, var(--af-surface));
        border: var(--af-card-border, 1px solid var(--af-line));
        border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
        border-radius: var(--af-card-radius, 32px);
        backdrop-filter: var(--af-card-filter, none);
        -webkit-backdrop-filter: var(--af-card-filter, none);
        box-shadow: var(--af-card-shadow, none);
        padding: 26px 30px;
      }
      .row {
        display: flex;
        align-items: baseline;
        gap: 14px;
        margin-top: 18px;
      }
      .row .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
        align-self: center;
      }
      .name {
        flex: 1;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .val {
        font-size: 34px;
        text-align: right;
      }
      .val small {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-left: 4px;
      }
      .cost {
        display: block;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 2px;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
        margin-top: 14px;
      }
      .vs {
        display: block;
        font-family: var(--af-sans);
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 2px;
      }
      .vs.up {
        color: var(--af-warn, var(--af-alert));
      }
      .vs.down {
        color: var(--af-good);
      }
      .share {
        margin-top: 18px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .sbar {
        height: 6px;
        border-radius: 3px;
        background: var(--af-line);
        overflow: hidden;
        margin-bottom: 8px;
      }
      .sbar i {
        display: block;
        height: 100%;
        border-radius: 3px;
        background: var(--af-good);
      }
      /* Stundenverlauf füllt den Rest der Kachel */
      .profile {
        flex: 1;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        margin-top: 22px;
        background: var(--af-card, var(--af-surface));
        border: var(--af-card-border, 1px solid var(--af-line));
        border-radius: var(--af-card-radius, 32px);
        backdrop-filter: var(--af-card-filter, none);
        -webkit-backdrop-filter: var(--af-card-filter, none);
        box-shadow: var(--af-card-shadow, none);
        padding: 22px 30px 16px;
      }
      .phead {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
      }
      .facts {
        display: flex;
        gap: 26px;
        flex-wrap: wrap;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .facts b {
        font-weight: 500;
        color: var(--af-ink-3);
        margin-right: 4px;
      }
      .leg {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--af-ink-3);
      }
      .k {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        margin-left: 8px;
      }
      .k.use,
      .h .use {
        background: var(--af-bar-fill, var(--af-accent));
      }
      .k.sol,
      .h .sol {
        background: var(--af-good);
      }
      .hours {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(24, 1fr);
        gap: 5px;
        margin-top: 24px;
        min-height: 0;
      }
      .h {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .stack {
        flex: 1;
        position: relative;
        min-height: 0;
      }
      .stack i {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px 4px 2px 2px;
        transform-origin: bottom;
      }
      .h .use {
        opacity: 0.55;
      }
      /* PV als schmaler Balken davor – man sieht, wann sie den Verbrauch deckt */
      .h .sol {
        left: 22%;
        right: 22%;
        opacity: 0.9;
        z-index: 1;
      }
      /* die Spitze in der Akzentfarbe – auch wenn der Stil die Balken neutral füllt */
      .h.peak .use {
        opacity: 1;
        background: var(--af-accent);
      }
      .h.later .use {
        opacity: 0.15;
      }
      .h span {
        text-align: left;
        font-size: calc(13px * var(--af-fs, 1));
        color: var(--af-ink-3);
        height: 1.4em;
        margin-top: 4px;
      }
    `,
  ];

  private values: Record<string, { value: number | null; cost: number | null; avg: number | null }> = {};
  private hours: { use: (number | null)[]; solar: (number | null)[] } | null = null;
  private key = "";

  /** period: week = Wochenrückblick (Mo–So) statt eines Tages */
  private get week(): boolean {
    return this.options.period === "week";
  }

  /** Tag: Vortag bis switch_hour, danach der laufende Tag. Woche: letzte Woche – nur sonntags ab switch_hour die laufende */
  private get offset(): number {
    const late = new Date().getHours() >= Number(this.options.switch_hour ?? 18);
    if (this.week) return new Date().getDay() === 0 && late ? 0 : -1;
    return late ? 0 : -1;
  }

  /** Beginn des gezeigten Zeitraums (Mitternacht; bei Woche der Montag) */
  private get start(): Date {
    const d = startOfDay();
    if (!this.week) return addDays(d, this.offset);
    return addDays(d, -((d.getDay() + 6) % 7) + this.offset * 7);
  }

  protected willUpdate(): void {
    // Neu laden: anderer Tag, Umschaltung um 18 Uhr oder alle 15 Minuten
    const key = `${startOfDay().getTime()}|${this.offset}|${this.week}|${Math.floor(Date.now() / 900e3)}|${JSON.stringify(this.options.groups ?? [])}`;
    if (this.hass && key !== this.key) {
      this.key = key;
      void this.load();
    }
  }

  private async stat(id: string, type: "change" | "mean"): Promise<number | null> {
    try {
      const r = await this.hass!.callWS<Record<string, number | null>>({
        type: "recorder/statistic_during_period",
        statistic_id: id,
        calendar: { period: this.week ? "week" : "day", offset: this.offset },
        types: [type],
      });
      const v = r[type];
      return typeof v === "number" && Number.isFinite(v) ? v : null;
    } catch {
      return null;
    }
  }

  /** Änderungen der 7 Tage (bzw. 4 Wochen) vor dem gezeigten Zeitraum (für den Vergleich) – eine Abfrage für alle Zeilen */
  private async averages(ids: string[]): Promise<Record<string, number | null>> {
    if (!ids.length || this.options.compare === false) return {};
    try {
      const day = this.start;
      const r = await this.hass!.callWS<Record<string, { start: number; change?: number }[]>>({
        type: "recorder/statistics_during_period",
        statistic_ids: ids,
        period: this.week ? "week" : "day",
        start_time: addDays(day, this.week ? -28 : -7).toISOString(),
        end_time: day.toISOString(),
        types: ["change"],
      });
      return Object.fromEntries(ids.map((id) => [id, dayAverage((r[id] ?? []).filter((x) => x.start < day.getTime()).map((x) => x.change ?? null))]));
    } catch {
      return {};
    }
  }

  /** Stundenwerte des gezeigten Tags (bei Woche: Tageswerte): Verbrauch und PV */
  private async profile(): Promise<void> {
    const p = this.options.profile as { entity?: string; solar?: string } | undefined;
    const req = ++this.profileReq;
    if (!p?.entity) return void (this.hours = null);
    try {
      const day = this.start;
      const slots = this.week ? 7 : 24;
      const ids = [p.entity, p.solar].filter(Boolean) as string[];
      const r = await this.hass!.callWS<Record<string, { start: number; change?: number }[]>>({
        type: "recorder/statistics_during_period",
        statistic_ids: ids,
        period: this.week ? "day" : "hour",
        start_time: day.toISOString(),
        end_time: addDays(day, this.week ? 7 : 1).toISOString(),
        types: ["change"],
      });
      if (req !== this.profileReq) return; // inzwischen ein anderer Tag angefragt (z. B. Umschaltung um 18 Uhr)
      const byHour = (id?: string) => (id ? slotValues(r[id] ?? [], day, this.week, kwhFactor(stateOf(this.hass, id)?.attributes.unit_of_measurement)) : Array(slots).fill(null));
      this.hours = { use: byHour(p.entity), solar: byHour(p.solar) };
    } catch {
      if (req === this.profileReq) this.hours = null;
    }
  }

  private profileReq = 0;
  private loadReq = 0;

  private async load(): Promise<void> {
    const req = ++this.loadReq;
    const rows = ((this.options.groups ?? []) as BalanceGroup[]).flatMap((g) => g.rows ?? []);
    void this.profile();
    const avg = await this.averages([...new Set(rows.filter((r) => (r.type ?? "change") === "change").map((r) => r.entity))]);
    const entries = await Promise.all(
      rows.map(async (r) => {
        const value = await this.stat(r.entity, r.type ?? "change");
        const cost = r.cost ? await this.stat(r.cost, "change") : value != null && r.price != null ? value * r.price : null;
        return [`${r.entity}|${r.cost ?? ""}`, { value, cost, avg: avg[r.entity] ?? null }] as const;
      }),
    );
    if (req === this.loadReq) this.values = Object.fromEntries(entries); // ältere Antwort überschreibt keine neuere
  }

  /** Vergleich mit dem Ø der 7 Tage davor – nur für ganze Tage (gestern), ein halber Tag wäre immer „weniger“ */
  private compare(value: number, avg: number | null) {
    if (this.offset === 0) return nothing;
    const c = vsAverage(value, avg);
    if (!c) return nothing;
    const text = c.dir === "same" ? t("wie im Ø") : c.dir === "up" ? t("▲ {n} % über Ø", { n: c.pct }) : t("▼ {n} % unter Ø", { n: c.pct });
    return html`<span class="vs ${c.dir}">${text}</span>`;
  }

  /** PV-Anteil: wie viel vom Verbrauch hat die Solaranlage gedeckt? (Zeile mit Sonnen-Icon + Zeile mit gleicher Einheit) */
  private solarShare(rows: BalanceRow[]) {
    const solar = rows.find((r) => /solar|sun/.test(r.icon ?? ""));
    const grid = rows.find((r) => r !== solar && (r.type ?? "change") === "change" && this.unitOf(r) === (solar ? this.unitOf(solar) : ""));
    if (!solar || !grid) return nothing;
    const pv = this.values[`${solar.entity}|${solar.cost ?? ""}`]?.value ?? 0;
    const use = this.values[`${grid.entity}|${grid.cost ?? ""}`]?.value ?? 0;
    if (pv <= 0.01 || use + pv <= 0) return nothing;
    const share = Math.round((pv / (use + pv)) * 100);
    return html`<div class="share">
      <div class="sbar"><i style="width:${share}%"></i></div>
      <span>${t("{name} deckte {n} % vom Verbrauch", { name: solar.name, n: share })}</span>
    </div>`;
  }

  /** Wann wie viel Strom: 24 Stundenbalken, PV als zweite Farbe darüber, Spitze und Grundlast in Worten */
  private renderProfile() {
    const hv = this.hours;
    if (!hv || !hv.use.some((v) => v != null)) return nothing;
    const week = this.week;
    const f = profileFacts(hv.use);
    const max = Math.max(0.01, ...hv.use.map((v) => v ?? 0), ...hv.solar.map((v) => v ?? 0));
    const now = this.offset < 0 ? 99 : week ? (new Date().getDay() + 6) % 7 : new Date().getHours();
    const dayName = (i: number, style: "long" | "short") => addDays(this.start, i).toLocaleDateString(locale(), { weekday: style });
    const days = hv.use.filter((v): v is number => v != null);
    const hasSolar = hv.solar.some((v) => (v ?? 0) > 0.005);
    return html`<div class="profile">
      <div class="phead">
        <div class="label">${week ? t("Welcher Tag wie viel Strom") : t("Wann wie viel Strom")}</div>
        <div class="facts">
          ${f.peak
            ? html`<span><b>${t("Spitze")}</b> ${week ? dayName(f.peak.hour, "long") : t("{from}–{to} Uhr", { from: f.peak.hour, to: f.peak.hour + 1 })} · ${fmt(f.peak.kwh, week ? 1 : 2)} kWh</span>`
            : nothing}
          ${week && days.length ? html`<span><b>${t("Ø pro Tag")}</b> ${fmt(days.reduce((a, b) => a + b, 0) / days.length, 1)} kWh</span>` : nothing}
          ${!week && f.base != null ? html`<span><b>${t("Grundlast nachts")}</b> ≈ ${fmt(f.base, 0)} W</span>` : nothing}
          ${hasSolar ? html`<span class="leg"><i class="k use"></i>${t("Netz")}<i class="k sol"></i>${t("PV")}</span>` : nothing}
        </div>
      </div>
      <div class="hours" style="grid-template-columns:repeat(${hv.use.length},1fr)">
        ${hv.use.map((v, h) => {
          const sol = hv.solar[h] ?? 0;
          const j = (h / hv.use.length).toFixed(3);
          return html`<div class="h ${h === f.peak?.hour ? "peak" : ""} ${h > now || (!week && h === now) ? "later" : ""}">
            <div class="stack">
              ${sol > 0.005 ? html`<i class="sol grow-y" style="height:${(sol / max) * 100}%;--af-j:${j}"></i>` : nothing}
              <i class="use grow-y" style="height:${Math.max(v ? 2 : 0, ((v ?? 0) / max) * 100)}%;--af-j:${j}"></i>
            </div>
            <span>${week ? dayName(h, "short") : h % 3 === 0 ? h : ""}</span>
          </div>`;
        })}
      </div>
    </div>`;
  }

  private unitOf(r: BalanceRow): string {
    return r.unit ?? (stateOf(this.hass, r.entity)?.attributes.unit_of_measurement as string) ?? "";
  }

  render() {
    const o = this.options;
    const day = this.start;
    const fmtDay = (d: Date, o2: Intl.DateTimeFormatOptions) => d.toLocaleDateString(locale(), o2);
    const when = this.week
      ? this.offset < 0
        ? t("Letzte Woche, {from} – {to}", { from: fmtDay(day, { day: "numeric", month: "numeric" }), to: fmtDay(addDays(day, 6), { day: "numeric", month: "long" }) })
        : t("Diese Woche bis jetzt")
      : this.offset < 0
        ? t("Gestern, {date}", { date: fmtDay(day, { weekday: "long", day: "numeric", month: "long" }) })
        : t("Heute bis jetzt");
    const groups = ((o.groups ?? []) as BalanceGroup[])
      .map((g) => ({
        ...g,
        rows: (g.rows ?? []).filter((r) => {
          const v = this.values[`${r.entity}|${r.cost ?? ""}`];
          return v && v.value != null && !(r.hide_zero && Math.abs(v.value) < 0.05);
        }),
      }))
      .filter((g) => g.rows.length);
    return html`<div class="bal"><div class="label">${o.label ?? t("Energie-Bilanz")} · ${when}</div>
      ${groups.length
        ? html`<div class="groups">
            ${groups.map(
              (g) => html`<div class="group">
                <div class="label">${g.label}</div>
                ${g.rows.map((r) => {
                  const v = this.values[`${r.entity}|${r.cost ?? ""}`];
                  const unit = this.unitOf(r);
                  const value = v.value as number;
                  const dec = r.decimals ?? (Math.abs(value) >= 100 ? 0 : Math.abs(value) >= 10 ? 1 : 2);
                  return html`<div class="row">
                    ${anyIcon(r.icon ?? "charge")}
                    <span class="name">${r.name}</span>
                    <span class="val display num"
                      >${fmt(value, dec)}<small>${unit}</small>${v.cost != null && v.cost > 0.004
                        ? html`<span class="cost">${fmt(v.cost, 2)} €</span>`
                        : nothing}${this.compare(value, v.avg)}</span
                    >
                  </div>`;
                })}
                ${this.solarShare(g.rows)}
              </div>`,
            )}
          </div>`
        : html`<div class="calm">${t("Noch keine Werte für diesen Tag.")}</div>`}
      ${this.renderProfile()}</div>`;
  }
}

/* ───────────────────────── WLAN-QR-Code ───────────────────────── */

const esc = (v: string) => v.replace(/([\\;,:"])/g, "\\$1");

/** WLAN zum Scannen. Optionen: ssid, password, encryption (WPA | WEP | nopass), hidden, show_password, label, hint. */
class AfQr extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
      }
      .wrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 22px;
        text-align: center;
      }
      .tile {
        background: #fff;
        border-radius: 28px;
        padding: 22px;
        box-shadow: var(--af-shadow);
      }
      svg,
      .qrimg {
        display: block;
        width: min(62cqh, 80cqw);
        height: min(62cqh, 80cqw);
      }
      /* Fertiges QR-Bild als Hintergrund: bleibt quadratisch, egal wie der Kasten ausfällt */
      .qrimg {
        background: center / contain no-repeat;
        image-rendering: pixelated;
      }
      .ssid {
        font-size: 30px;
      }
      .hint {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .pass {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
    `,
  ];

  render() {
    const o = this.options;
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? t("Gäste-WLAN")}</div>`;
    if (o.image) {
      // Fertiges QR-Bild (z. B. aus der Fritzbox) – Zugangsdaten stehen nur im Bild
      return html`<div class="wrap">
        ${label}
        <div class="tile"><div class="qrimg" role="img" aria-label="QR-Code" style=${`background-image:url("${String(o.image).replace(/"/g, "%22")}")`}></div></div>
        ${o.ssid ? html`<div class="ssid display">${o.ssid}</div>` : nothing}
        <div class="hint">${o.hint ?? t("Handy-Kamera auf den Code halten")}</div>
      </div>`;
    }
    if (!o.ssid) return html`<div class="wrap">${label}<div class="hint">${t("Netzname und Passwort im Editor eintragen.")}</div></div>`;
    const type = o.encryption ?? (o.password ? "WPA" : "nopass");
    const data = `WIFI:T:${type};S:${esc(String(o.ssid))};${type === "nopass" ? "" : `P:${esc(String(o.password ?? ""))};`}${o.hidden ? "H:true;" : ""};`;
    const qr = qrcode(0, "M");
    qr.addData(data, "Byte");
    qr.make();
    const n = qr.getModuleCount();
    let path = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
    return html`<div class="wrap">
      ${label}
      <div class="tile">${svg`<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" aria-label="QR-Code"><path d=${path} fill="#000"/></svg>`}</div>
      <div class="ssid display">${o.ssid}</div>
      ${o.show_password && o.password ? html`<div class="pass num">${t("Passwort")}: ${o.password}</div>` : nothing}
      <div class="hint">${o.hint ?? t("Handy-Kamera auf den Code halten")}</div>
    </div>`;
  }
}

/* ───────────────────────── Auftrag (z. B. 3D-Druck) ───────────────────────── */

const minutesOf = (hass: Hass | undefined, id?: string): number | null => {
  const s = stateOf(hass, id);
  const n = s ? parseFloat(s.state) : NaN;
  if (!s || !Number.isFinite(n)) return null;
  const unit = String(s.attributes.unit_of_measurement ?? "min");
  return unit === "h" ? n * 60 : unit === "s" ? n / 60 : unit === "d" ? n * 1440 : n;
};

const hm = (minutes: number) => (minutes >= 60 ? `${Math.floor(minutes / 60)}:${String(Math.round(minutes % 60)).padStart(2, "0")} h` : `${Math.round(minutes)} min`);

/**
 * Fortschritt eines Auftrags. Optionen: label, title (Entität mit Namen), progress (%), remaining (Restzeit), end
 * (Zeitstempel), layer, layers, temps [{name, entity}], status.
 */
class AfJob extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      .title {
        font-size: 32px;
        line-height: 1.12;
        margin-top: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .pct {
        font-size: 96px;
        line-height: 1;
        margin-top: 22px;
      }
      .pct small {
        font-size: 0.4em;
        color: var(--af-ink-3);
      }
      .bar {
        height: 8px;
        border-radius: 4px;
        background: var(--af-line);
        overflow: hidden;
        margin-top: 16px;
      }
      .bar i {
        display: block;
        height: 100%;
        background: var(--af-accent);
        border-radius: 4px;
        transition: width 1s var(--af-ease, ease);
      }
      .rows {
        margin-top: 22px;
        display: grid;
        gap: 12px;
      }
      .r {
        display: flex;
        justify-content: space-between;
        font-size: calc(19px * var(--af-fs, 1));
      }
      .r span:first-child {
        color: var(--af-ink-3);
      }
    `,
  ];

  protected watched() {
    const o = this.options;
    return [o.title, o.progress, o.remaining, o.end, o.layer, o.layers, o.status, ...((o.temps ?? []) as { entity: string }[]).map((t) => t.entity)];
  }

  render() {
    const o = this.options;
    const val = (id?: string) => {
      const s = stateOf(this.hass, id);
      return s && s.state !== "unknown" && s.state !== "unavailable" ? s.state : undefined;
    };
    const progress = parseFloat(val(o.progress) ?? "");
    const remaining = minutesOf(this.hass, o.remaining);
    const endRaw = val(o.end);
    const end = endRaw ? new Date(endRaw) : null;
    const rows: [string, string][] = [];
    if (remaining != null && remaining > 0) rows.push([t("Noch"), hm(remaining)]);
    if (end && !isNaN(end.getTime())) rows.push([t("Fertig um"), fmtTime(end)]);
    if (val(o.layer) && val(o.layers)) rows.push([t("Schicht"), `${val(o.layer)} / ${val(o.layers)}`]);
    for (const temp of (o.temps ?? []) as { name: string; entity: string }[]) {
      const v = parseFloat(val(temp.entity) ?? "");
      if (Number.isFinite(v)) rows.push([temp.name, `${fmt(v, 0)}°`]);
    }
    if (val(o.status)) rows.push([t("Status"), String(val(o.status))]);
    return html`<div class="label">${o.label ?? t("Auftrag")}</div>
      ${val(o.title) ? html`<div class="title display">${val(o.title)}</div>` : nothing}
      ${Number.isFinite(progress)
        ? html`<div class="pct display num">${fmt(progress, 0)}<small>%</small></div>
            <div class="bar"><i style="width:${Math.max(0, Math.min(100, progress))}%"></i></div>`
        : nothing}
      <div class="rows">${rows.map(([k, v]) => html`<div class="r"><span>${k}</span><span class="num">${v}</span></div>`)}</div>`;
  }
}

define("af-pet", AfPet);
define("af-balance", AfBalance);
define("af-qr", AfQr);
define("af-job", AfJob);
