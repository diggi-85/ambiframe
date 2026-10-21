// Freie Bausteine: Verlauf (Linie, Fläche, Balken), Anzeige (Ring, Halbkreis) und Bild (Link, Vorlage, Medien, Entität)
import { locale, t } from "../i18n";
import { css, html, nothing, svg, type PropertyValues } from "lit";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import { TemplateWatch } from "../template";
import type { HassEntity } from "../types";
import { fmtTime, nameOf, startOfDay, stateOf, weekdayShort } from "../util";
import { AfWidget, define } from "./base";

/** Farbnamen des Stils – oder jede CSS-Farbe */
export const TONES: Record<string, string> = {
  accent: "var(--af-accent)",
  cold: "var(--af-cold)",
  good: "var(--af-good)",
  alert: "var(--af-alert)",
  ink: "var(--af-ink)",
  muted: "var(--af-ink-2)",
};
const PALETTE = ["accent", "cold", "good", "alert", "muted"];
const tone = (name: unknown, i = 0): string => TONES[String(name)] ?? (name ? String(name) : TONES[PALETTE[i % PALETTE.length]]);

const ON = new Set(["on", "home", "open", "true", "playing", "heat", "cool", "detected"]);
const OFF = new Set(["off", "not_home", "closed", "false", "idle", "paused", "standby", "clear"]);
const toNumber = (state: string): number | null => {
  const n = parseFloat(state);
  if (Number.isFinite(n)) return n;
  if (ON.has(state)) return 1;
  if (OFF.has(state)) return 0;
  return null;
};

/** Zahl mit sinnvollen Nachkommastellen */
const fmtNum = (v: number, decimals?: number | string): string => {
  const given = decimals === undefined || decimals === "" ? undefined : Number(decimals);
  const d = given ?? (Number.isInteger(v) || Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 1 ? 1 : 2);
  return v.toLocaleString(locale(), { minimumFractionDigits: d, maximumFractionDigits: d });
};

const unitOf = (s?: HassEntity): string => (s?.attributes.unit_of_measurement as string) ?? "";

interface Series {
  id: string;
  name: string;
  color: string;
  step: boolean;
  points: [number, number][];
}

const HOUR = 3600e3;

/** Gleichmäßig ausdünnen: höchstens max Punkte, je Abschnitt der Mittelwert (bei Schaltzuständen der letzte) */
const thin = (pts: [number, number][], max: number, step: boolean): [number, number][] => {
  if (pts.length <= max) return pts;
  const t0 = pts[0][0];
  const span = pts[pts.length - 1][0] - t0 || 1;
  const buckets = new Map<number, [number, number, number]>();
  for (const [t, v] of pts) {
    const b = Math.min(max - 1, Math.floor(((t - t0) / span) * max));
    const cur = buckets.get(b);
    if (!cur) buckets.set(b, [t, v, 1]);
    else if (step) buckets.set(b, [cur[0], v, 1]);
    else buckets.set(b, [cur[0], cur[1] + v, cur[2] + 1]);
  }
  return [...buckets.values()].map(([t, sum, n]) => [t, sum / n]);
};

/**
 * Verlauf einer oder mehrerer Entitäten. Optionen: entities [{entity, name, color}], hours (Zeitraum, Standard 24),
 * kind (line | area | bar), period (bar: hour | day), label, style (card), value (aktuellen Wert zeigen, Standard an),
 * min, max, decimals, unit.
 * Linien kommen bis 72 h aus dem Verlauf, darüber aus der Langzeitstatistik; Balken immer aus der Statistik
 * (Zähler: Verbrauch je Stunde/Tag, Messwerte: Mittelwert).
 */
class AfChart extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
      }
      .head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
      }
      .now {
        font-size: 46px;
        line-height: 1;
        margin-top: 6px;
      }
      .now small {
        font-size: 0.42em;
        color: var(--af-ink-2);
        margin-left: 4px;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 16px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-2);
        justify-content: flex-end;
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        white-space: nowrap;
      }
      .legend i {
        width: 9px;
        height: 9px;
        border-radius: 50%;
      }
      .legend b {
        font-weight: 500;
        color: var(--af-ink);
      }
      .plot {
        position: relative;
        flex: 1;
        min-height: 40px;
      }
      svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      path {
        vector-effect: non-scaling-stroke;
        fill: none;
        stroke-width: 2.5;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      path.fill {
        stroke: none;
      }
      line.grid {
        stroke: var(--af-line);
        vector-effect: non-scaling-stroke;
        stroke-dasharray: 3 5;
      }
      .ylab {
        position: absolute;
        right: 0;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .bars {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        gap: var(--gap, 6px);
      }
      .slot {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 2px;
      }
      .bar {
        flex: 1;
        max-width: 48px;
        border-radius: 6px 6px 2px 2px;
        min-height: 2px;
        transition: height 0.6s var(--af-ease, ease);
      }
      .bar.dim {
        opacity: 0.55;
      }
      .x {
        position: relative;
        height: 18px;
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .x span {
        position: absolute;
        transform: translateX(-50%);
        white-space: nowrap;
      }
      .x.slots {
        display: flex;
        gap: var(--gap, 6px);
      }
      .x.slots span {
        position: static;
        transform: none;
        flex: 1;
        text-align: center;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(17px * var(--af-fs, 1));
        margin: auto 0;
      }
    `,
  ];

  private series: Series[] = [];
  private loadedKey = "";
  private loading = false;
  private failed = "";
  private timer?: number;
  private static gid = 0;
  private gid = AfChart.gid++;

  private get ids(): { entity: string; name?: string; color?: string }[] {
    const o = this.options;
    const list: unknown[] = Array.isArray(o.entities) ? o.entities : o.entity ? [{ entity: o.entity }] : [];
    return list
      .map((e) => (typeof e === "string" ? { entity: e } : (e as { entity: string; name?: string; color?: string })))
      .filter((e) => !!e?.entity);
  }

  private get hours(): number {
    return Math.max(1, Number(this.options.hours) || 24);
  }

  private get period(): "hour" | "day" {
    return this.options.period ?? (this.hours > 72 ? "day" : "hour");
  }

  protected watched() {
    return this.ids.map((e) => e.entity);
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Alle 5 min nachladen – der aktuelle Wert kommt dazwischen live aus hass
    this.timer = window.setInterval(() => void this.load(), 5 * 60e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
    this.loadedKey = "";
  }

  protected willUpdate(): void {
    const key = JSON.stringify([this.ids, this.hours, this.options.kind, this.period]);
    if (this.hass && key !== this.loadedKey) {
      this.loadedKey = key;
      void this.load();
    }
  }

  private async load(): Promise<void> {
    const hass = this.hass;
    const ids = this.ids;
    if (!hass || !ids.length || this.loading) return;
    this.loading = true;
    const kind = this.options.kind ?? "line";
    const start = new Date(Date.now() - this.hours * HOUR);
    try {
      const raw: Record<string, [number, number][]> = {};
      const step: Record<string, boolean> = {};
      if (kind === "bar" || this.hours > 72) {
        const period = kind === "bar" ? this.period : this.hours > 24 * 14 ? "day" : "hour";
        const from = period === "day" ? startOfDay(start) : new Date(Math.floor(start.getTime() / HOUR) * HOUR);
        const stats = await hass.callWS<Record<string, { start: number; change?: number | null; mean?: number | null; state?: number | null }[]>>({
          type: "recorder/statistics_during_period",
          statistic_ids: ids.map((e) => e.entity),
          period,
          start_time: from.toISOString(),
          types: kind === "bar" ? ["change", "mean"] : ["mean", "state"],
        });
        for (const e of ids) {
          raw[e.entity] = (stats[e.entity] ?? [])
            .map((s): [number, number] => [s.start, Number(kind === "bar" ? s.change ?? s.mean : s.mean ?? s.state)])
            .filter(([, v]) => Number.isFinite(v));
        }
      } else {
        const hist = await hass.callWS<Record<string, { s: string; lu?: number; lc?: number }[]>>({
          type: "history/history_during_period",
          start_time: start.toISOString(),
          entity_ids: ids.map((e) => e.entity),
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        for (const e of ids) {
          const rows = hist[e.entity] ?? [];
          step[e.entity] = !/^(sensor|input_number|number)\./.test(e.entity);
          raw[e.entity] = rows
            .map((r): [number, number | null] => [Math.max(start.getTime(), (r.lc ?? r.lu ?? 0) * 1000), toNumber(r.s)])
            .filter((p): p is [number, number] => p[1] !== null);
        }
      }
      this.series = ids.map((e, i) => ({
        id: e.entity,
        name: e.name ?? nameOf(hass, e.entity),
        color: tone(e.color, i),
        step: !!step[e.entity],
        points: kind === "bar" ? raw[e.entity] : thin(raw[e.entity], 360, !!step[e.entity]),
      }));
      this.failed = "";
    } catch (err) {
      this.failed = (err as { message?: string })?.message ?? t("Verlauf nicht verfügbar");
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  /** Aktueller Wert einer Reihe live aus hass */
  private current(id: string): number | null {
    const s = stateOf(this.hass, id);
    return s ? toNumber(s.state) : null;
  }

  private domain(values: number[], bars: boolean): [number, number] {
    const o = this.options;
    let lo = Math.min(...values);
    let hi = Math.max(...values);
    if (bars) lo = Math.min(0, lo);
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) [lo, hi] = [0, 1];
    if (hi - lo < 1e-9) [lo, hi] = [lo - 1, hi + 1];
    const pad = bars ? 0 : (hi - lo) * 0.1;
    const given = (v: unknown) => v !== undefined && v !== "" && Number.isFinite(Number(v));
    return [given(o.min) ? Number(o.min) : lo - pad, given(o.max) ? Number(o.max) : hi + pad];
  }

  private renderLines(end: number) {
    const start = end - this.hours * HOUR;
    const area = this.options.kind === "area";
    const series = this.series.map((s) => {
      const live = this.current(s.id);
      const pts = live !== null && this.hours <= 72 ? [...s.points, [end, live] as [number, number]] : s.points;
      return { ...s, pts };
    });
    const all = series.flatMap((s) => s.pts.map(([, v]) => v));
    if (!all.length) return html`<div class="calm">${t("Noch keine Daten im Zeitraum")}</div>`;
    const [lo, hi] = this.domain(all, false);
    const X = (t: number) => ((Math.min(end, Math.max(start, t)) - start) / (end - start)) * 1000;
    const Y = (v: number) => 300 - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * 300;
    const paths = series.map((s, i) => {
      if (!s.pts.length) return nothing;
      let d = "";
      s.pts.forEach(([t, v], k) => {
        const x = X(t).toFixed(1);
        const y = Y(v).toFixed(1);
        if (k === 0) d += `M${x},${y}`;
        else if (s.step) d += `H${x}V${y}`;
        else d += `L${x},${y}`;
      });
      if (X(s.pts[s.pts.length - 1][0]) < 1000) d += "H1000";
      const firstX = X(s.pts[0][0]).toFixed(1);
      const fill = area || s.step ? svg`<path class="fill" d="${d}V300H${firstX}Z" fill="url(#g${this.gid}-${i})"></path>` : nothing;
      return svg`<defs><linearGradient id="g${this.gid}-${i}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${s.color}" stop-opacity="0.3"></stop>
          <stop offset="1" stop-color="${s.color}" stop-opacity="0"></stop></linearGradient></defs>
        ${fill}<path d="${d}" style="stroke:${s.color}"></path>`;
    });
    const unit = this.options.unit ?? unitOf(stateOf(this.hass, this.series[0]?.id));
    const dec = this.options.decimals;
    return html`<div class="plot">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line class="grid" x1="0" x2="1000" y1="0" y2="0"></line>
          <line class="grid" x1="0" x2="1000" y1="150" y2="150"></line>
          <line class="grid" x1="0" x2="1000" y1="300" y2="300"></line>
          ${paths}
        </svg>
        <span class="ylab num" style="top:0;transform:translateY(-130%)">${fmtNum(hi, dec)} ${unit}</span>
        <span class="ylab num" style="top:100%;transform:translateY(-130%)">${fmtNum(lo, dec)} ${unit}</span>
      </div>
      ${this.renderTimeAxis(start, end)}`;
  }

  private renderTimeAxis(start: number, end: number) {
    const span = end - start;
    const steps = [1, 2, 3, 6, 12, 24, 48, 168].map((h) => h * HOUR);
    const step = steps.find((s) => span / s <= 5) ?? steps[steps.length - 1];
    const ticks: number[] = [];
    const tz = new Date().getTimezoneOffset() * 60e3;
    const first = step >= 24 * HOUR ? startOfDay(new Date(start + step)).getTime() : Math.ceil((start - tz) / step) * step + tz;
    for (let t = first; t < end - step * 0.3; t += step) if (t > start + step * 0.15) ticks.push(t);
    const label = (t: number) => (step >= 24 * HOUR ? weekdayShort(new Date(t)) : fmtTime(new Date(t)));
    return html`<div class="x">
      ${ticks.map((t) => html`<span style="left:${((t - start) / span) * 100}%">${label(t)}</span>`)}
    </div>`;
  }

  private renderBars() {
    const period = this.period;
    const len = period === "day" ? 24 * HOUR : HOUR;
    // Feste Zeitfenster bis jetzt – fehlende Werte bleiben leer
    const now = Date.now();
    const count = period === "day" ? Math.max(1, Math.round(this.hours / 24)) : this.hours;
    const slots = Array.from({ length: count }, (_, i) =>
      period === "day" ? startOfDay(new Date(now - (count - 1 - i) * 864e5)).getTime() : Math.floor(now / HOUR) * HOUR - (count - 1 - i) * HOUR,
    );
    const value = (s: Series, t: number) => s.points.find(([st]) => Math.abs(st - t) < len / 2)?.[1];
    const all = this.series.flatMap((s) => slots.map((t) => value(s, t) ?? 0));
    if (!all.some((v) => v !== 0)) return html`<div class="calm">${t("Noch keine Statistik im Zeitraum")}</div>`;
    const [lo, hi] = this.domain(all, true);
    const gap = count > 30 ? 2 : count > 14 ? 4 : 8;
    const label = (t: number, i: number) => {
      const d = new Date(t);
      if (period === "day") return count <= 14 || i % Math.ceil(count / 10) === 0 ? (count <= 8 ? weekdayShort(d) : `${d.getDate()}.`) : "";
      return d.getHours() % (count > 12 ? 6 : 3) === 0 ? `${d.getHours()}` : "";
    };
    return html`<div class="plot" style="--gap:${gap}px">
        <div class="bars">
          ${slots.map(
            (t, i) => html`<div class="slot">
              ${this.series.map((s) => {
                const v = value(s, t);
                const h = v === undefined ? 0 : ((Math.max(lo, v) - lo) / (hi - lo)) * 100;
                return html`<div class="bar ${i === count - 1 ? "dim" : ""}" style="height:${h}%;background:${s.color}"></div>`;
              })}
            </div>`,
          )}
        </div>
      </div>
      <div class="x slots" style="--gap:${gap}px">${slots.map((t, i) => html`<span>${label(t, i)}</span>`)}</div>`;
  }

  render() {
    const o = this.options;
    const ids = this.ids;
    let body;
    if (!ids.length) body = html`<div class="calm">${t("Entität wählen")}</div>`;
    else if (this.failed) body = html`<div class="calm">${this.failed}</div>`;
    else if (!this.series.length) body = html`<div class="calm">${t("Verlauf wird geladen …")}</div>`;
    else body = o.kind === "bar" ? this.renderBars() : this.renderLines(Date.now());

    const first = stateOf(this.hass, ids[0]?.entity);
    const firstValue = first ? toNumber(first.state) : null;
    const showNow = o.value !== false && ids.length === 1 && firstValue !== null && o.kind !== "bar";
    const legend =
      ids.length > 1
        ? html`<div class="legend">
            ${this.series.map((s) => {
              const v = this.current(s.id);
              return html`<span><i style="background:${s.color}"></i>${s.name}${v !== null && o.value !== false ? html` <b class="num">${fmtNum(v, o.decimals)}</b>` : nothing}</span>`;
            })}
          </div>`
        : nothing;
    const head =
      showNow || ids.length > 1 || o.label
        ? html`<div class="head">
            <div>
              ${o.label ? html`<div class="label">${o.label}</div>` : nothing}
              ${showNow ? html`<div class="now display num">${fmtNum(firstValue!, o.decimals)}<small>${o.unit ?? unitOf(first)}</small></div>` : nothing}
            </div>
            ${legend}
          </div>`
        : nothing;
    return html`<div class="wrap ${o.style === "card" ? "card" : ""}">${head}${body}</div>`;
  }
}

/**
 * Anzeige als Ring oder Halbkreis. Optionen: entity, attribute, name, icon, unit, min (0), max (100), decimals,
 * kind (ring | half), color, style (card), severity [{from, color}] – Farbe nach dem höchsten erreichten „from“.
 */
class AfGauge extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
      }
      .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
      .dial {
        position: relative;
        flex: 1;
        width: 100%;
        min-height: 0;
      }
      .dial > svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .dial path {
        fill: none;
        stroke-linecap: round;
      }
      .track {
        stroke: var(--af-line);
      }
      .val {
        transition: stroke-dasharray 0.9s var(--af-ease, ease), stroke 0.6s;
      }
      .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1;
      }
      .half .center {
        justify-content: flex-end;
        padding-bottom: 2%;
      }
      .v {
        font-size: min(20cqmin, 110px);
      }
      .half .v {
        font-size: min(24cqmin, 110px);
      }
      .v small {
        font-size: 0.38em;
        color: var(--af-ink-2);
        margin-left: 3px;
      }
      .name {
        margin-top: 10px;
        font-size: min(7cqmin, 22px);
        color: var(--af-ink-2);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .name .ic {
        width: 1.1em;
        height: 1.1em;
        color: var(--af-accent);
      }
      .range {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        padding: 4px 4% 0;
        box-sizing: border-box;
      }
    `,
  ];

  protected watched() {
    return [this.options.entity];
  }

  render() {
    const o = this.options;
    const s = stateOf(this.hass, o.entity);
    const raw = o.attribute ? s?.attributes[o.attribute] : s?.state;
    const v = parseFloat(String(raw));
    const min = Number(o.min ?? 0);
    const max = Number(o.max ?? 100);
    const ok = Number.isFinite(v);
    const pct = ok ? Math.min(100, Math.max(0, ((v - min) / (max - min || 1)) * 100)) : 0;
    const sev = (Array.isArray(o.severity) ? o.severity : [])
      .filter((x: { from?: unknown }) => x && x.from !== "" && Number.isFinite(Number(x.from)))
      .sort((a: { from: number }, b: { from: number }) => Number(a.from) - Number(b.from));
    const hit = ok ? sev.filter((x: { from: number }) => v >= Number(x.from)).pop() : undefined;
    const color = tone(hit?.color ?? o.color ?? "accent");
    const half = o.kind === "half";
    const d = half ? "M 16 100 A 84 84 0 0 1 184 100" : "M 100 16 A 84 84 0 1 1 99.99 16";
    const unit = o.unit ?? (o.attribute ? "" : unitOf(s));
    const name = o.name ?? (s ? nameOf(this.hass, o.entity) : "");
    const nameRow = name ? html`<div class="name">${o.icon ? anyIcon(o.icon) : nothing}${name}</div>` : nothing;
    return html`<div class="wrap ${half ? "half" : ""} ${o.style === "card" ? "card" : ""}">
      <div class="dial">
        <svg viewBox=${half ? "0 0 200 108" : "0 0 200 200"} preserveAspectRatio="xMidYMid meet">
          <path class="track" d=${d} pathLength="100" stroke-width="12"></path>
          <path class="val" d=${d} pathLength="100" stroke-width="12" style="stroke:${color};stroke-dasharray:${pct} 100;${pct ? "" : "opacity:0"}"></path>
        </svg>
        <div class="center">
          <div class="v display num">${ok ? fmtNum(v, o.decimals) : "–"}${unit ? html`<small>${unit}</small>` : nothing}</div>
          ${half ? nothing : nameRow}
        </div>
      </div>
      ${half
        ? html`<div class="range"><span class="num">${fmtNum(min, 0)}</span><span class="num">${fmtNum(max, 0)}</span></div>
            ${nameRow}`
        : nothing}
    </div>`;
  }
}

/**
 * Bild. Optionen: url (Link, /local/…, media-source://… oder Jinja-Vorlage), entity (Bild aus entity_picture – Person,
 * image.*, camera.*, Medienplayer …), fit (cover | contain), refresh (s), caption (darf Vorlage sein), radius (px).
 * Neue Bilder werden erst vorgeladen und dann getauscht – nie ein leeres Feld.
 */
class AfImage extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
        overflow: hidden;
        border-radius: var(--r, 28px);
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: var(--fit, cover);
        animation: img-in 0.8s var(--af-ease, ease) backwards;
      }
      @keyframes img-in {
        from {
          opacity: 0;
        }
      }
      .ph {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--af-surface);
        color: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
        text-align: center;
        padding: 16px;
      }
      .cap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px 22px 18px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: #fff;
        font-size: calc(18px * var(--af-fs, 1));
      }
    `,
  ];

  private urlTpl = new TemplateWatch(this);
  private capTpl = new TemplateWatch(this);
  private shown?: string;
  private wanted?: string;
  private tick = 0;
  private timer?: number;
  private resolved = new Map<string, { url: string; at: number }>();
  private failed = false;

  protected shouldUpdate(changed: PropertyValues): boolean {
    // Entitätsbild: nur neu, wenn sich das Bild ändert
    if (changed.size === 1 && changed.has("hass") && this.options.entity && !this.options.url) {
      const old = changed.get("hass") as typeof this.hass;
      const id = this.options.entity as string;
      return old?.states[id]?.attributes.entity_picture !== this.hass?.states[id]?.attributes.entity_picture;
    }
    return super.shouldUpdate(changed);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.restartTimer();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  private restartTimer(): void {
    clearInterval(this.timer);
    const every = Number(this.options.refresh) || 0;
    if (every > 0)
      this.timer = window.setInterval(() => {
        this.tick++;
        this.requestUpdate();
      }, Math.max(5, every) * 1000);
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("options")) this.restartTimer();
    this.urlTpl.set(this.hass, this.options.url);
    this.capTpl.set(this.hass, this.options.caption);
    void this.pick();
  }

  /** Quelle bestimmen, ggf. Medienquelle auflösen, mit Cache-Brecher versehen und vorladen */
  private async pick(): Promise<void> {
    const o = this.options;
    let src: string | undefined;
    if (o.url) {
      src = this.urlTpl.text(o.url)?.trim();
      if (src?.startsWith("⚠")) src = undefined;
    } else if (o.entity) {
      src = stateOf(this.hass, o.entity)?.attributes.entity_picture as string | undefined;
    }
    if (!src) {
      this.wanted = undefined;
      return;
    }
    if (src.startsWith("media-source://")) {
      const hit = this.resolved.get(src);
      // aufgelöste Links laufen nach einer Stunde ab
      if (hit && Date.now() - hit.at < 45 * 60e3) src = hit.url;
      else if (this.hass) {
        const id = src;
        try {
          const res = await this.hass.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: id, expires: 3600 });
          this.resolved.set(id, { url: res.url, at: Date.now() });
          src = res.url;
        } catch {
          this.failed = true;
          this.requestUpdate();
          return;
        }
      }
    }
    // Neu laden: signierte Links (authSig) nicht verändern
    const next = this.tick && !src.includes("authSig") ? `${src}${src.includes("?") ? "&" : "?"}_wb=${this.tick}` : src;
    if (next === this.wanted) return;
    this.wanted = next;
    const img = new Image();
    img.onload = () => {
      if (this.wanted !== next) return;
      this.shown = next;
      this.failed = false;
      this.requestUpdate();
    };
    img.onerror = () => {
      if (this.wanted !== next) return;
      this.failed = !this.shown;
      this.requestUpdate();
    };
    img.src = next;
  }

  render() {
    const o = this.options;
    const cap = o.caption ? this.capTpl.text(o.caption) : "";
    this.style.setProperty("--fit", o.fit === "contain" ? "contain" : "cover");
    this.style.setProperty("--r", `${Number(o.radius ?? 28)}px`);
    const empty = !o.url && !o.entity ? t("Bild-Link oder Entität wählen") : this.failed ? t("Bild nicht ladbar") : "";
    return html`${this.shown ? html`<img src=${this.shown} alt="" @error=${(e: Event) => ((e.target as HTMLElement).style.visibility = "hidden")} />` : html`<div class="ph">${empty}</div>`}
    ${cap ? html`<div class="cap">${cap}</div>` : nothing}`;
  }
}

define("af-chart", AfChart);
define("af-gauge", AfGauge);
define("af-image", AfImage);
