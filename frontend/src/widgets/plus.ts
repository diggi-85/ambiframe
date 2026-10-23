// Weitere Widgets: Timer, Pinnwand, Countdown, Abfahrten, Wetterradar, Sonne & Mond, Pollen & Luft.
// Alle finden passende Entitäten selbst, lassen sich aber vollständig einstellen. Die Rechenlogik (Mondphase,
// Sonnenzeiten, Abfahrten lesen, Stufen für Pollen/Luft) steht als eigene Funktionen darunter – sie ist getestet.
import { locale, t } from "../i18n";
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { iconSvg } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass, HassEntity } from "../types";
import { ago, dayDiff, fmtTime, nameOf, parseDate, stateOf } from "../util";
import { AfWidget, define } from "./base";
import "./clocks";

/* ───────── Gemeinsame Helfer ───────── */

/** Liste aus Optionen: Text („a, b“), Liste von Texten oder Editor-Liste [{value}] */
const listOf = (v: unknown): string[] =>
  (Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : [])
    .map((x) => (typeof x === "string" ? x : (x as { value?: string; entity?: string })?.value ?? (x as { entity?: string })?.entity))
    .filter((x): x is string => !!x && !!x.trim())
    .map((x) => x.trim());

const allOf = (hass: Hass | undefined, test: (id: string, s: HassEntity) => boolean): string[] =>
  Object.entries(hass?.states ?? {})
    .filter(([id, s]) => test(id, s))
    .map(([id]) => id);

const label = (o: Record<string, unknown>, fallback: string) =>
  o.label === false ? nothing : html`<div class="label">${(o.label as string | undefined) ?? fallback}</div>`;

/** Ort für Radar und Sonne: Optionen vor zone.home */
export const homeOf = (hass: Hass | undefined, o: Record<string, unknown>): { lat: number; lon: number } | null => {
  const lat = Number(o.latitude ?? hass?.states["zone.home"]?.attributes.latitude);
  const lon = Number(o.longitude ?? hass?.states["zone.home"]?.attributes.longitude);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
};

const mmss = (ms: number): string => {
  const s = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
};

/** „0:04:59“ → Millisekunden */
const hms = (v: unknown): number => {
  const parts = String(v ?? "").split(":").map(Number);
  if (parts.some((n) => !Number.isFinite(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0) * 1000;
};

/* ───────── Timer ───────── */

/** Restzeit eines HA-Timers in ms (läuft: bis finishes_at, pausiert: remaining) – null, wenn er nicht läuft */
export const timerLeft = (s: HassEntity | undefined, now = Date.now()): number | null => {
  if (!s || (s.state !== "active" && s.state !== "paused")) return null;
  if (s.state === "active") {
    const end = parseDate(s.attributes.finishes_at);
    if (end) return Math.max(0, end.getTime() - now);
    return Math.max(0, hms(s.attributes.remaining) - (now - new Date(s.last_changed).getTime()));
  }
  return hms(s.attributes.remaining);
};

/**
 * Timer (Küchentimer). Optionen: entities (timer.*; leer = alle), presets („5, 10, 15“ Minuten), target (Timer, den die
 * Vorgaben starten; leer = erster), show_idle (auch ruhende zeigen), label.
 * Antippen einer Vorgabe startet den Timer; laufende lassen sich anhalten, fortsetzen und abbrechen.
 */
class AfTimer extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: calc(12px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .row .ic {
        font-size: 30px;
        color: var(--af-accent);
      }
      .name {
        flex: 1;
        min-width: 0;
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .left {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1;
      }
      .row.paused .left {
        opacity: 0.55;
      }
      .row.idle .left {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      button {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 999px;
        padding: 8px 16px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      button.ctl {
        width: 44px;
        height: 44px;
        padding: 0;
        display: grid;
        place-items: center;
        font-size: 20px;
      }
      .presets {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 4px;
      }
      .presets button {
        font-size: calc(19px * var(--af-fs, 1));
        padding: 10px 20px;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  private ticker?: number;

  private get timers(): string[] {
    const own = listOf(this.options.entities);
    return own.length ? own : allOf(this.hass, (id) => id.startsWith("timer."));
  }

  protected watched() {
    return this.timers;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.ticker);
    this.ticker = undefined;
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    // Sekundentakt nur, solange ein Timer läuft
    const running = this.timers.some((id) => this.hass?.states[id]?.state === "active");
    if (running && !this.ticker) this.ticker = window.setInterval(() => this.requestUpdate(), 1000);
    if (!running && this.ticker) {
      clearInterval(this.ticker);
      this.ticker = undefined;
    }
  }

  /** Knöpfe im Widget: Klick nicht an die Anzeige weitergeben (sonst würde z. B. das Dashboard aufgehen) */
  private act(e: Event, service: string, entity: string, data: Record<string, unknown> = {}): void {
    e.stopPropagation();
    void this.hass?.callService("timer", service, { entity_id: entity, ...data });
  }

  render() {
    const timers = this.timers;
    const presets = listOf(this.options.presets ?? "5, 10, 15")
      .map(Number)
      .filter((n) => n > 0);
    const target = (this.options.target as string | undefined) ?? timers[0];
    const rows = timers
      .map((id) => ({ id, s: this.hass?.states[id], left: timerLeft(this.hass?.states[id]) }))
      .filter((r) => r.s && (r.left !== null || this.options.show_idle));
    return html`${label(this.options, t("Timer"))}
      ${rows.length
        ? rows.map(
            (r) => html`<div class="row ${r.left === null ? "idle" : r.s!.state}">
              ${iconSvg("timer")}
              <span class="name">${nameOf(this.hass, r.id)}</span>
              <span class="left display num">${r.left === null ? t("bereit") : mmss(r.left)}</span>
              ${r.left === null
                ? nothing
                : html`<button class="ctl" title=${r.s!.state === "active" ? t("Anhalten") : t("Weiter")} @click=${(e: Event) => this.act(e, r.s!.state === "active" ? "pause" : "start", r.id)}>
                      ${iconSvg(r.s!.state === "active" ? "pause" : "play")}
                    </button>
                    <button class="ctl" title=${t("Abbrechen")} @click=${(e: Event) => this.act(e, "cancel", r.id)}>${iconSvg("close")}</button>`}
            </div>`,
          )
        : html`<div class="calm">${timers.length ? t("Kein Timer läuft") : t("Kein Timer gefunden – in HA unter Helfer einen Timer anlegen.")}</div>`}
      ${presets.length && target
        ? html`<div class="presets">
            ${presets.map(
              (m) => html`<button @click=${(e: Event) => this.act(e, "start", target, { duration: `00:${String(m).padStart(2, "0")}:00` })}>
                ${t("{n} min", { n: m })}
              </button>`,
            )}
          </div>`
        : nothing}`;
  }
}

/* ───────── Pinnwand ───────── */

/**
 * Pinnwand: Nachrichten aus Textspeichern (input_text, text, sensor …), z. B. vom Handy gesetzt.
 * Optionen: entities (Liste), expire_hours (ältere ausblenden), empty_text, size (Schrift px), label.
 */
class AfBoard extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .note {
        padding: 18px 22px;
        border-radius: var(--af-card-radius, 20px);
        background: var(--af-surface);
        border: 1px solid var(--af-line);
      }
      .text {
        font-size: var(--size, calc(30px * var(--af-fs, 1)));
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      .meta {
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  private get sources(): string[] {
    const own = listOf(this.options.entities);
    return own.length ? own : allOf(this.hass, (id) => /^(input_text|text)\..*(pinnwand|board|nachricht|message|notiz|note)/.test(id));
  }

  protected watched() {
    return this.sources;
  }

  render() {
    const hours = Number(this.options.expire_hours ?? 0);
    const notes = this.sources
      .map((id) => this.hass?.states[id])
      .filter((s): s is HassEntity => !!s && !!s.state.trim() && !["unknown", "unavailable"].includes(s.state))
      .filter((s) => !hours || Date.now() - new Date(s.last_changed).getTime() < hours * 3600e3);
    const size = this.options.size ? `--size:${Number(this.options.size)}px` : "";
    return html`${label(this.options, t("Pinnwand"))}
      ${notes.length
        ? notes.map(
            (s) => html`<div class="note" style=${size}>
              <div class="text">${s.state}</div>
              <div class="meta">${nameOf(this.hass, s.entity_id)} · ${ago(s.last_changed)}</div>
            </div>`,
          )
        : html`<div class="calm">${(this.options.empty_text as string | undefined) ?? t("Keine Nachrichten")}</div>`}`;
  }
}

/* ───────── Countdown ───────── */

/** Datum aus Text, input_datetime, Zeitstempel-Sensor oder Kalender (nächster Termin) */
export const targetDate = (hass: Hass | undefined, item: { date?: string; entity?: string }): Date | null => {
  if (item.date) return parseDate(item.date.length === 10 ? `${item.date}T00:00:00` : item.date);
  const s = stateOf(hass, item.entity);
  if (!s) return null;
  if (item.entity!.startsWith("calendar.")) return parseDate(s.attributes.start_time);
  const a = s.attributes;
  if (a.has_date && a.year) return new Date(Number(a.year), Number(a.month) - 1, Number(a.day), Number(a.hour ?? 0), Number(a.minute ?? 0));
  const v = s.state.length === 10 ? `${s.state}T00:00:00` : s.state;
  return parseDate(v);
};

/** „heute“, „morgen“, „noch 12 Tage“, „noch 3 Wochen“ */
export const countdownText = (days: number): string => {
  if (days === 0) return t("heute");
  if (days === 1) return t("morgen");
  if (days < 0) return t("vor {n} Tagen", { n: -days });
  if (days >= 21) return t("noch {n} Wochen", { n: Math.round(days / 7) });
  return t("noch {n} Tage", { n: days });
};

/**
 * Countdown: Tage bis zu Ereignissen. Optionen: items [{name, date | entity, icon}] (Datum, input_datetime, Zeitstempel,
 * Kalender = nächster Termin), show_past, max, label. Ein einzelner Eintrag wird groß gezeigt.
 */
class AfCountdown extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 10px;
        container-type: size;
      }
      .one {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .one .n {
        font-size: min(46cqh, 200px);
        line-height: 0.95;
      }
      .one .unit {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }
      .one .what {
        font-size: calc(30px * var(--af-fs, 1));
        margin-top: 6px;
      }
      .row {
        display: flex;
        align-items: baseline;
        gap: 14px;
        padding: calc(10px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .row .what {
        flex: 1;
        min-width: 0;
      }
      .row .when {
        color: var(--af-accent);
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  protected watched() {
    return ((this.options.items ?? []) as { entity?: string }[]).map((i) => i.entity);
  }

  render() {
    const items = ((this.options.items ?? []) as { name?: string; date?: string; entity?: string; icon?: string }[])
      .map((i) => {
        const d = targetDate(this.hass, i);
        return d ? { ...i, days: dayDiff(d), name: i.name || (i.entity ? nameOf(this.hass, i.entity) : "") } : null;
      })
      .filter((i): i is NonNullable<typeof i> => !!i && (i.days >= 0 || !!this.options.show_past))
      .sort((a, b) => a.days - b.days)
      .slice(0, Number(this.options.max ?? 5));
    if (!items.length) return html`${label(this.options, t("Countdown"))}<div class="calm">${t("Nichts geplant")}</div>`;
    if (items.length === 1) {
      const i = items[0];
      return html`${label(this.options, t("Countdown"))}
        <div class="one">
          ${i.days > 1 ? html`<div class="n display num">${i.days}</div><div class="unit">${t("Tage bis")}</div>` : html`<div class="n display">${countdownText(i.days)}</div>`}
          <div class="what">${i.icon ? iconSvg(i.icon) : nothing} ${i.name}</div>
        </div>`;
    }
    return html`${label(this.options, t("Countdown"))}
      ${items.map((i) => html`<div class="row"><span class="what">${i.icon ? iconSvg(i.icon) : nothing} ${i.name}</span><span class="when num">${countdownText(i.days)}</span></div>`)}`;
  }
}

/* ───────── Abfahrten ───────── */

export interface Departure {
  line: string;
  destination: string;
  time: Date;
  delay: number;
  platform?: string;
}

const pick = (o: Record<string, unknown>, keys: string[]): unknown => {
  const lower = Object.fromEntries(Object.entries(o).map(([k, v]) => [k.toLowerCase(), v]));
  for (const k of keys) if (lower[k] != null && lower[k] !== "") return lower[k];
  return undefined;
};

/** Uhrzeit aus ISO-Zeit, „HH:MM“ oder Minuten bis zur Abfahrt */
const departureTime = (v: unknown, now: number): Date | null => {
  if (typeof v === "number") return new Date(now + v * 60e3);
  const s = String(v ?? "").trim();
  if (/^\d{1,2}:\d{2}$/.test(s)) {
    const [h, m] = s.split(":").map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    if (d.getTime() < now - 6 * 3600e3) d.setDate(d.getDate() + 1); // nach Mitternacht
    return d;
  }
  if (/^\d+$/.test(s)) return new Date(now + Number(s) * 60e3);
  return parseDate(s);
};

const LINE = ["line", "name", "number", "train", "route", "product"];
const DEST = ["direction", "destination", "to", "final_destination", "headsign"];
const TIME = ["departure", "departure_time", "time", "planned", "scheduled", "when", "minutes"];
const DELAY = ["delay", "delay_minutes", "delay_departure"];
const TRACK = ["platform", "track", "gleis"];

/** Abfahrten aus einem Sensor lesen: Liste in einem Attribut (departures, next_departures …) oder der Sensor selbst */
export const readDepartures = (s: HassEntity | undefined, attribute?: string, now = Date.now()): Departure[] => {
  if (!s) return [];
  const a = s.attributes;
  const list = (attribute ? a[attribute] : Object.values(a).find((v) => Array.isArray(v) && v.some((x) => x && typeof x === "object"))) as
    | Record<string, unknown>[]
    | undefined;
  const rows = Array.isArray(list) ? list : [{ ...a, departure: pick(a, TIME) ?? s.state }];
  return rows
    .map((r): Departure | null => {
      const time = departureTime(pick(r, TIME), now);
      if (!time) return null;
      const delay = Number(pick(r, DELAY) ?? 0) || 0;
      const line = pick(r, LINE);
      return {
        line: String(typeof line === "object" && line ? ((line as Record<string, unknown>).name ?? "") : (line ?? "")),
        destination: String(pick(r, DEST) ?? ""),
        time,
        delay,
        platform: pick(r, TRACK) != null ? String(pick(r, TRACK)) : undefined,
      } as Departure;
    })
    .filter((d): d is Departure => !!d);
};

/**
 * Abfahrten (Bus/Bahn). Optionen: entities (Sensoren der ÖPNV-Integration), attribute (Liste, sonst automatisch),
 * lines (nur diese Linien, „S1, 42“), max (6), walk (Minuten Fußweg: frühere ausblenden), show_platform, label.
 */
class AfDepartures extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: calc(10px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .line {
        min-width: 3.2em;
        text-align: center;
        padding: 3px 10px;
        border-radius: 8px;
        background: var(--af-accent);
        color: var(--af-on-accent, var(--af-bg, #000));
        font-weight: 600;
        font-size: 0.85em;
      }
      .dest {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .plat {
        color: var(--af-ink-3);
        font-size: 0.8em;
      }
      .in {
        min-width: 4.2em;
        text-align: right;
      }
      .late {
        color: var(--af-warn, #e06c5c);
        font-size: 0.8em;
        margin-left: 6px;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .row.flap {
        gap: 0.5em;
        font-size: calc(24px * var(--af-fs, 1));
        border-bottom: 0;
        padding: calc(4px * var(--af-dense, 1)) 0;
      }
      .row.flap .dest {
        flex: 1;
      }
    `,
  ];

  private ticker?: number;

  connectedCallback(): void {
    super.connectedCallback();
    // „in 4 min“ läuft mit
    this.ticker = window.setInterval(() => this.requestUpdate(), 30e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.ticker);
  }

  private get sources(): string[] {
    const own = listOf(this.options.entities);
    return own.length ? own : allOf(this.hass, (_id, s) => Object.values(s.attributes).some((v) => Array.isArray(v) && v.some((x) => x && typeof x === "object" && ("departure" in x || "direction" in x))));
  }

  protected watched() {
    return this.sources;
  }

  render() {
    const now = Date.now();
    const lines = listOf(this.options.lines).map((l) => l.toLowerCase());
    const walk = Number(this.options.walk ?? 0) * 60e3;
    // Fallblatt-Tafel: im Fallblatt-Stil oder mit flap: true
    const flap = (this.options.flap as boolean | undefined) ?? !!this.ctx?.flap;
    const list = this.sources
      .flatMap((id) => readDepartures(this.hass?.states[id], this.options.attribute as string | undefined, now))
      .filter((d) => d.time.getTime() + d.delay * 60e3 >= now + walk)
      .filter((d) => !lines.length || lines.includes(d.line.toLowerCase()))
      .sort((a, b) => a.time.getTime() + a.delay * 60e3 - (b.time.getTime() + b.delay * 60e3))
      .slice(0, Number(this.options.max ?? 6));
    return html`${label(this.options, t("Abfahrten"))}
      ${list.length
        ? list.map((d) => {
            const mins = Math.round((d.time.getTime() + d.delay * 60e3 - now) / 60e3);
            if (flap)
              return html`<div class="row flap">
                <af-flap .text=${d.line.slice(0, 3).padEnd(3)}></af-flap>
                <af-flap class="dest" .text=${d.destination.slice(0, 14).padEnd(14)}></af-flap>
                <af-flap .text=${(mins <= 0 ? "0" : mins < 100 ? String(mins) : "99").padStart(2)}></af-flap>
              </div>`;
            return html`<div class="row">
              <span class="line">${d.line || iconSvg("train")}</span>
              <span class="dest">${d.destination}${this.options.show_platform && d.platform ? html` <span class="plat">· ${t("Gleis {n}", { n: d.platform })}</span>` : nothing}</span>
              <span class="in num">${mins <= 0 ? t("jetzt") : mins < 60 ? t("{n} min", { n: mins }) : fmtTime(d.time)}${d.delay > 0 ? html`<span class="late">+${d.delay}</span>` : nothing}</span>
            </div>`;
          })
        : html`<div class="calm">${this.sources.length ? t("Keine Abfahrten") : t("Keinen ÖPNV-Sensor gefunden – unter Sensoren eintragen.")}</div>`}`;
  }
}

/* ───────── Wetterradar ───────── */

/** Kachel-Koordinaten (Web-Mercator) eines Orts als Bruchzahl */
export const tileOf = (lat: number, lon: number, z: number): { x: number; y: number } => {
  const n = 2 ** z;
  const rad = (lat * Math.PI) / 180;
  return { x: ((lon + 180) / 360) * n, y: ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n };
};

// Frei nutzbare Karten ohne Schlüssel (CARTO verlangt inzwischen einen)
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";
const MAPS: Record<string, { url: string; credit: string }> = {
  light: { url: `${ESRI}/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`, credit: "© Esri, HERE, OpenStreetMap" },
  dark: { url: `${ESRI}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`, credit: "© Esri, HERE, OpenStreetMap" },
  osm: { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", credit: "© OpenStreetMap" },
};

interface RadarFrame {
  time: number;
  path: string;
}
let radarCache: { at: number; host: string; frames: RadarFrame[] } | undefined;

/**
 * Wetterradar (RainViewer, letzte ~2 Stunden als Animation) auf einer Karte. Optionen: zoom (4–7, Standard 7),
 * latitude/longitude (sonst Zuhause), map (auto | light | dark | osm), map_url (eigene Kachel-Adresse mit {z}/{x}/{y}),
 * frames (Bilder der Animation, 6 = letzte Stunde), speed (ms je Bild), label. RainViewer liefert frei nur ein Farbschema und höchstens Zoom 7.
 */
class AfRadar extends AfWidget {
  static properties = { ...AfWidget.properties, frame: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
        overflow: hidden;
        border-radius: var(--af-card-radius, 20px);
        background: var(--af-surface);
      }
      .map {
        position: absolute;
        inset: 0;
      }
      .map img,
      .rain img {
        position: absolute;
        /* 1 px Überlappung: keine feinen Linien zwischen den Kacheln */
        width: 257px;
        height: 257px;
        user-select: none;
        pointer-events: none;
      }
      .rain {
        /* Deckkraft auf der Ebene, nicht je Kachel – sonst wären die Überlappungen dunkler */
        opacity: 0.8;
        position: absolute;
        inset: 0;
      }
      .rain.hidden {
        visibility: hidden;
      }
      .home {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 12px;
        height: 12px;
        margin: -6px 0 0 -6px;
        border-radius: 50%;
        background: var(--af-accent);
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.25);
      }
      .info {
        position: absolute;
        left: 14px;
        top: 12px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--af-chip);
        font-size: calc(15px * var(--af-fs, 1));
      }
      .credit {
        position: absolute;
        right: 10px;
        bottom: 6px;
        font-size: 10px;
        color: var(--af-ink-3);
      }
      .calm {
        padding: 20px;
        color: var(--af-ink-3);
      }
    `,
  ];

  private frame = 0;
  private frames: RadarFrame[] = [];
  private host = "";
  // Wie viele der neuesten Bilder schon geladen werden dürfen – nacheinander, damit RainViewer nicht drosselt (429)
  private loaded = 1;
  private lastLoad = 0;
  private anim?: number;
  private reload?: number;
  private resize?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    void this.load();
    this.reload = window.setInterval(() => void this.load(), 10 * 60e3);
    // Nur so viele Kacheln laden, wie zu sehen sind
    this.resize = new ResizeObserver(() => this.requestUpdate());
    this.resize.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.reload);
    clearTimeout(this.anim);
    this.resize?.disconnect();
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    // Neue Zustände in HA ändern das Radar nicht
    return !(changed.size === 1 && changed.has("hass")) || !this.frames.length;
  }

  /** Bilder der Animation: die letzten „frames“ (Standard 6 = eine Stunde) */
  private get shown(): RadarFrame[] {
    const n = Math.min(13, Math.max(1, Number(this.options.frames ?? 6)));
    return this.frames.slice(-n);
  }

  private async load(): Promise<void> {
    if (!radarCache || Date.now() - radarCache.at > 9 * 60e3) {
      try {
        const res = await fetch("https://api.rainviewer.com/public/weather-maps.json");
        const data = (await res.json()) as { host: string; radar?: { past?: RadarFrame[] } };
        radarCache = { at: Date.now(), host: data.host, frames: data.radar?.past ?? [] };
      } catch {
        return;
      }
    }
    this.host = radarCache.host;
    this.frames = radarCache.frames;
    this.frame = this.shown.length - 1;
    this.lastLoad = Date.now();
    this.step();
  }

  private step(): void {
    clearTimeout(this.anim);
    const count = this.shown.length;
    if (count < 2) return;
    const last = this.frame >= count - 1;
    // Am neuesten Bild kurz stehen bleiben
    this.anim = window.setTimeout(
      () => {
        if (this.loaded < count && Date.now() - this.lastLoad > 1500) {
          this.loaded++;
          this.lastLoad = Date.now();
        }
        this.frame = last ? count - Math.min(this.loaded, count) : this.frame + 1;
        this.step();
      },
      last ? 2500 : Number(this.options.speed ?? 500),
    );
  }

  private map(): { url: string; credit: string } {
    const own = String(this.options.map_url ?? "");
    if (own.includes("{z}")) return { url: own, credit: "" };
    const m = String(this.options.map ?? "auto");
    if (MAPS[m]) return MAPS[m];
    if (m === "voyager") return MAPS.osm;
    // wie die Anzeige: helle Karte im hellen Modus (af-display trägt mode, auch über Shadow-Grenzen hinweg suchen)
    let n: Node | null = this;
    while (n && !(n instanceof Element && n.tagName === "AF-DISPLAY")) n = n.parentNode ?? (n as ShadowRoot).host ?? null;
    return MAPS[(n as Element | null)?.getAttribute("mode") === "light" ? "light" : "dark"];
  }

  render() {
    const home = homeOf(this.hass, this.options);
    if (!home) return html`<div class="calm">${t("Kein Ort – Zuhause in HA eintragen oder Breite/Länge angeben.")}</div>`;
    const z = Math.min(7, Math.max(3, Number(this.options.zoom ?? 7)));
    const c = tileOf(home.lat, home.lon, z);
    const tiles: { x: number; y: number; dx: number; dy: number }[] = [];
    const hw = (this.clientWidth || 512) / 512;
    const hh = (this.clientHeight || 512) / 512;
    for (let tx = Math.floor(c.x - hw); tx <= Math.floor(c.x + hw); tx++)
      for (let ty = Math.floor(c.y - hh); ty <= Math.floor(c.y + hh); ty++) tiles.push({ x: tx, y: ty, dx: Math.round((tx - c.x) * 256), dy: Math.round((ty - c.y) * 256) });
    const pos = (d: { dx: number; dy: number }) => `left:calc(50% + ${d.dx}px);top:calc(50% + ${d.dy}px)`;
    const map = this.map();
    const shown = this.shown;
    const f = shown[this.frame];
    const from = shown.length - Math.min(this.loaded, shown.length);
    return html`<div class="map">
        ${tiles.map((d) => html`<img alt="" src=${map.url.replace("{z}", String(z)).replace("{x}", String(d.x)).replace("{y}", String(d.y))} style=${pos(d)} />`)}
      </div>
      ${shown.slice(from).map(
        (fr, i) => html`<div class="rain ${i + from === this.frame ? "" : "hidden"}">
          ${tiles.map((d) => html`<img alt="" src="${this.host}${fr.path}/256/${z}/${d.x}/${d.y}/2/1_1.png" style=${pos(d)} />`)}
        </div>`,
      )}
      <div class="home"></div>
      ${this.options.label === false
        ? nothing
        : html`<div class="info">${(this.options.label as string | undefined) ?? t("Regenradar")}${f ? html` · <span class="num">${fmtTime(new Date(f.time * 1000))}</span>` : nothing}</div>`}
      <div class="credit">${map.credit ? `${map.credit} · ` : ""}RainViewer</div>`;
  }
}

/* ───────── Sonne & Mond ───────── */

/** Sonnenauf- und -untergang (NOAA-Näherung, auf etwa eine Minute genau); null bei Polartag/-nacht */
export const sunTimes = (day: Date, lat: number, lon: number): { rise: Date; set: Date } | null => {
  const rad = Math.PI / 180;
  const start = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
  const n = Math.round((start - Date.UTC(2000, 0, 1, 12)) / 864e5);
  const jStar = n - lon / 360;
  const m = (357.5291 + 0.98560028 * jStar) % 360;
  const cEq = 1.9148 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 0.0003 * Math.sin(3 * m * rad);
  const lambda = (m + cEq + 180 + 102.9372) % 360;
  const jTransit = 2451545 + jStar + 0.0053 * Math.sin(m * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const decl = Math.asin(Math.sin(lambda * rad) * Math.sin(23.4397 * rad));
  const cosH = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(decl)) / (Math.cos(lat * rad) * Math.cos(decl));
  if (cosH < -1 || cosH > 1) return null;
  const h = Math.acos(cosH) / rad / 360;
  const toDate = (j: number) => new Date((j - 2440587.5) * 864e5);
  return { rise: toDate(jTransit - h), set: toDate(jTransit + h) };
};

const MOON = ["Neumond", "Zunehmende Sichel", "Erstes Viertel", "Zunehmender Mond", "Vollmond", "Abnehmender Mond", "Letztes Viertel", "Abnehmende Sichel"];

/** Mondphase: Anteil im Zyklus (0 = Neumond, 0,5 = Vollmond), beleuchteter Teil, Name */
export const moonPhase = (d: Date): { phase: number; lit: number; name: string; next_full: Date } => {
  const synodic = 29.530588853;
  const ref = Date.UTC(2000, 0, 6, 18, 14) / 864e5;
  const age = (((d.getTime() / 864e5 - ref) % synodic) + synodic) % synodic;
  const phase = age / synodic;
  const lit = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  const name = MOON[Math.round(phase * 8) % 8];
  const toFull = ((0.5 - phase + 1) % 1) * synodic;
  return { phase, lit, name, next_full: new Date(d.getTime() + toFull * 864e5) };
};

/** Umriss des beleuchteten Teils (Kreis r=20 um 24/24) */
export const moonPath = (phase: number): string => {
  const waxing = phase < 0.5;
  const k = Math.cos(2 * Math.PI * phase); // > 0: Sichel, < 0: mehr als halb
  const rx = (Math.abs(k) * 20).toFixed(2);
  const back = waxing === k > 0 ? 0 : 1;
  return `M24 4 A20 20 0 0 ${waxing ? 1 : 0} 24 44 A${rx} 20 0 0 ${back} 24 4 Z`;
};

/**
 * Sonne & Mond. Optionen: show (sun, moon – beides, wenn leer), latitude/longitude (sonst Zuhause), label.
 * Sonnenauf- und -untergang, Tageslänge mit Änderung zu gestern, Mondphase mit Beleuchtung und nächstem Vollmond.
 */
class AfSky extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: calc(14px * var(--af-dense, 1));
        container-type: inline-size;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
        gap: calc(18px * var(--af-dense, 1)) 28px;
      }
      .big {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .big .ic {
        font-size: calc(46px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      /* passt sich der Breite an – auch bei großer Schrift läuft nichts über */
      .v {
        font-size: min(calc(40px * var(--af-fs, 1)), 3.6cqw);
        line-height: 1.05;
      }
      .s {
        font-size: min(calc(17px * var(--af-fs, 1)), 2.5cqw);
        color: var(--af-ink-3);
        margin-top: 4px;
      }
      .moon .dark {
        fill: color-mix(in srgb, var(--af-ink) 13%, transparent);
      }
      .moon {
        width: calc(46px * var(--af-fs, 1));
        height: calc(46px * var(--af-fs, 1));
        flex: none;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    // einmal pro Stunde reicht
    this.timer = window.setInterval(() => this.requestUpdate(), 3600e3);
  }

  private timer?: number;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return !(changed.size === 1 && changed.has("hass"));
  }

  /** Mond als Scheibe: beleuchtete Hälfte (rechts zunehmend, links abnehmend) plus/minus halbe Ellipse als Schattengrenze */
  private moonSvg(phase: number, south: boolean): TemplateResult {
    // Südhalbkugel: Mond erscheint seitenverkehrt
    return html`<svg class="moon" viewBox="0 0 48 48" style=${south ? "transform:scaleX(-1)" : ""}>
      <circle cx="24" cy="24" r="20" class="dark" />
      <path d=${moonPath(phase)} fill="var(--af-accent)" opacity="0.9" />
    </svg>`;
  }

  render() {
    const show = listOf(this.options.show);
    const want = (k: string) => !show.length || show.includes(k);
    const home = homeOf(this.hass, this.options);
    const now = new Date();
    const today = home ? sunTimes(now, home.lat, home.lon) : null;
    const yesterday = home ? sunTimes(new Date(now.getTime() - 864e5), home.lat, home.lon) : null;
    const len = (s: { rise: Date; set: Date } | null) => (s ? s.set.getTime() - s.rise.getTime() : 0);
    const diffMin = Math.round((len(today) - len(yesterday)) / 60e3);
    const dayLen = len(today);
    const moon = moonPhase(now);
    return html`${label(this.options, t("Sonne & Mond"))}
      <div class="grid">
        ${want("sun") && today
          ? html`<div class="big">
                ${iconSvg("sun")}
                <div>
                  <div class="v display num">${fmtTime(today.rise)} – ${fmtTime(today.set)}</div>
                  <div class="s num">
                    ${t("{h} h {m} min Tageslicht", { h: Math.floor(dayLen / 3600e3), m: Math.round((dayLen % 3600e3) / 60e3) })}
                    · ${diffMin === 0 ? t("wie gestern") : t("{n} min zu gestern", { n: `${diffMin > 0 ? "+" : "−"}${Math.abs(diffMin)}` })}
                  </div>
                </div>
              </div>`
          : nothing}
        ${want("moon")
          ? html`<div class="big">
              ${this.moonSvg(moon.phase, (home?.lat ?? 1) < 0)}
              <div>
                <div class="v display">${t(moon.name)}</div>
                <div class="s num">
                  ${t("{n} % beleuchtet", { n: Math.round(moon.lit * 100) })} · ${t("Vollmond {when}", {
                    when: moon.next_full.toLocaleDateString(locale(), { weekday: "short", day: "numeric", month: "short" }),
                  })}
                </div>
              </div>
            </div>`
          : nothing}
      </div>`;
  }
}

/* ───────── Pollen & Luft ───────── */

export type AirKind = "pollen" | "aqi" | "pm25" | "pm10" | "ozone" | "no2";

/** Stufe 0 (keine/gut) … 3 (hoch/schlecht) für einen Messwert */
export const airLevel = (kind: AirKind, value: number, scale = 3): number => {
  if (!Number.isFinite(value)) return -1;
  const steps: Record<AirKind, number[]> = {
    pollen: scale === 5 ? [0.5, 2, 3.5] : [0.25, 1.25, 2.25],
    aqi: [50, 100, 150],
    pm25: [10, 25, 50],
    pm10: [20, 50, 100],
    ozone: [60, 120, 180],
    no2: [40, 100, 200],
  };
  const [a, b, c] = steps[kind];
  return value < a ? 0 : value < b ? 1 : value < c ? 2 : 3;
};

/** Art eines Sensors aus Gerätklasse oder Name */
export const airKindOf = (id: string, s?: HassEntity): AirKind | null => {
  const dc = String(s?.attributes.device_class ?? "");
  if (/pollen|pollenflug/i.test(id)) return "pollen";
  if (dc === "aqi" || /_aqi|luftqualitat|air_quality_index/.test(id)) return "aqi";
  if (dc === "pm25" || /pm2_?5/.test(id)) return "pm25";
  if (dc === "pm10" || /pm10/.test(id)) return "pm10";
  if (dc === "ozone" || /ozon/.test(id)) return "ozone";
  if (dc === "nitrogen_dioxide" || /no2|stickstoffdioxid/.test(id)) return "no2";
  return null;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Gemeinsamen Anfang mehrerer Namen entfernen („Musterstadt-Nord, Germany PM2,5“ → „PM2,5“), nur an Wortgrenzen */
export const stripCommon = (names: string[]): string[] => {
  if (names.length < 2) return names;
  let prefix = names[0];
  for (const n of names) while (prefix && !n.startsWith(prefix)) prefix = prefix.slice(0, -1);
  const cut = prefix.search(/[\s,·:–-]+[^\s,·:–-]*$/);
  const len = /[\s,·:–-]$/.test(prefix) ? prefix.length : cut;
  if (len <= 0) return names;
  return names.map((n) => n.slice(len).replace(/^[\s,·:–-]+/, "") || n);
};

const LEVELS = ["keine", "gering", "mittel", "hoch"];
const AIR_LEVELS = ["gut", "mäßig", "schlecht", "sehr schlecht"];

/**
 * Pollen & Luft: Ampel für Pollenflug (z. B. DWD) und Luftqualität (AQI, Feinstaub, Ozon, NO₂).
 * Optionen: entities [{entity, name, kind, scale}] (leer = automatisch), only_elevated (nur ab „gering“/„mäßig“), max, label.
 */
class AfAir extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: calc(9px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(21px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex: none;
      }
      .l0 {
        background: var(--af-good, #6fbf73);
      }
      .l1 {
        background: #d8c24a;
      }
      .l2 {
        background: #e39a3c;
      }
      .l3 {
        background: var(--af-warn, #e06c5c);
      }
      .name {
        flex: 1;
        min-width: 0;
      }
      .lvl {
        color: var(--af-ink-2);
        font-size: 0.85em;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  private get items(): { entity: string; name?: string; kind: AirKind; scale?: number }[] {
    const own = (this.options.entities ?? []) as ({ entity?: string; name?: string; kind?: AirKind; scale?: number } | string)[];
    const list = own
      .map((x) => (typeof x === "string" ? { entity: x } : x))
      .filter((x): x is { entity: string; name?: string; kind?: AirKind; scale?: number } => !!x?.entity)
      .map((x) => ({ ...x, kind: x.kind ?? airKindOf(x.entity, this.hass?.states[x.entity]) ?? "aqi" }));
    if (list.length) return list;
    return allOf(this.hass, (id, s) => id.startsWith("sensor.") && !!airKindOf(id, s) && Number.isFinite(parseFloat(s.state))).map((entity) => ({
      entity,
      kind: airKindOf(entity, this.hass?.states[entity])!,
    }));
  }

  protected watched() {
    return this.items.map((i) => i.entity);
  }

  render() {
    const rows = this.items
      .map((i) => {
        const v = parseFloat(this.hass?.states[i.entity]?.state ?? "");
        return { ...i, level: airLevel(i.kind, v, Number(i.scale ?? 3)) };
      })
      .filter((r) => r.level >= 0 && (!this.options.only_elevated || r.level >= 1))
      .sort((a, b) => b.level - a.level)
      .slice(0, Number(this.options.max ?? 8));
    const names = stripCommon(rows.map((r) => nameOf(this.hass, r.entity)));
    return html`${label(this.options, t("Pollen & Luft"))}
      ${rows.length
        ? rows.map(
            (r, i) => html`<div class="row">
              <span class="dot l${r.level}"></span>
              <span class="name">${r.name || cap(names[i].replace(/^(Pollenflug|Pollen)\s*/i, ""))}</span>
              <span class="lvl">${t((r.kind === "pollen" ? LEVELS : AIR_LEVELS)[r.level])}</span>
            </div>`,
          )
        : html`<div class="calm">${this.items.length ? t("Alles im grünen Bereich") : t("Keine Pollen- oder Luftsensoren gefunden.")}</div>`}`;
  }
}

define("af-timer", AfTimer);
define("af-board", AfBoard);
define("af-countdown", AfCountdown);
define("af-departures", AfDepartures);
define("af-radar", AfRadar);
define("af-sky", AfSky);
define("af-air", AfAir);
