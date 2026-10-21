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
                (d) => html`<div class="bar ${isToday(d.day) ? "today" : ""}">
                  <b class="num">${d.count}</b>
                  <i style="height:${Math.max(4, (d.count / max) * 150)}px"></i>
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
 * price, cost, hide_zero}]}], switch_hour (bis dahin der Vortag, danach heute; Standard 18), label.
 */
class AfBalance extends AfTickingWidget {
  static properties = { ...AfWidget.properties, values: { state: true } };

  static styles = [
    widgetStyles,
    css`
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
    `,
  ];

  private values: Record<string, { value: number | null; cost: number | null }> = {};
  private key = "";

  /** Vortag bis switch_hour, danach der laufende Tag */
  private get offset(): number {
    return new Date().getHours() < Number(this.options.switch_hour ?? 18) ? -1 : 0;
  }

  protected willUpdate(): void {
    // Neu laden: anderer Tag, Umschaltung um 18 Uhr oder alle 15 Minuten
    const key = `${startOfDay().getTime()}|${this.offset}|${Math.floor(Date.now() / 900e3)}|${JSON.stringify(this.options.groups ?? [])}`;
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
        calendar: { period: "day", offset: this.offset },
        types: [type],
      });
      const v = r[type];
      return typeof v === "number" && Number.isFinite(v) ? v : null;
    } catch {
      return null;
    }
  }

  private async load(): Promise<void> {
    const rows = ((this.options.groups ?? []) as BalanceGroup[]).flatMap((g) => g.rows ?? []);
    const entries = await Promise.all(
      rows.map(async (r) => {
        const value = await this.stat(r.entity, r.type ?? "change");
        const cost = r.cost ? await this.stat(r.cost, "change") : value != null && r.price != null ? value * r.price : null;
        return [`${r.entity}|${r.cost ?? ""}`, { value, cost }] as const;
      }),
    );
    this.values = Object.fromEntries(entries);
  }

  private unitOf(r: BalanceRow): string {
    return r.unit ?? (stateOf(this.hass, r.entity)?.attributes.unit_of_measurement as string) ?? "";
  }

  render() {
    const o = this.options;
    const day = new Date(Date.now() + this.offset * 864e5);
    const when = this.offset < 0 ? t("Gestern, {date}", { date: day.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" }) }) : t("Heute bis jetzt");
    const groups = ((o.groups ?? []) as BalanceGroup[])
      .map((g) => ({
        ...g,
        rows: (g.rows ?? []).filter((r) => {
          const v = this.values[`${r.entity}|${r.cost ?? ""}`];
          return v && v.value != null && !(r.hide_zero && Math.abs(v.value) < 0.05);
        }),
      }))
      .filter((g) => g.rows.length);
    return html`<div class="label">${o.label ?? t("Energie-Bilanz")} · ${when}</div>
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
                        : nothing}</span
                    >
                  </div>`;
                })}
              </div>`,
            )}
          </div>`
        : html`<div class="calm">${t("Noch keine Werte für diesen Tag.")}</div>`}`;
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
