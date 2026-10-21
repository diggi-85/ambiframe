// Alltag: Auto, Personen, Saugroboter, Mülltonnen, Bewegung, Umwelt-Liste, Warnungen
import { locale, t } from "../i18n";
import { css, html, nothing } from "lit";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass, HassEntity } from "../types";
import { ago, areaOf, binDays, distanceKm, fmt, fmtTime, nameOf, numberOf, parseDate, placeOf, relDay, stateOf, valueOf } from "../util";
import { AfTickingWidget, define } from "./base";

const listStyles = css`
  .label {
    margin-bottom: calc(14px * var(--af-dense, 1));
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: calc(16px * var(--af-dense, 1)) 0;
    border-top: 1px solid var(--af-line);
  }
  .row:first-of-type {
    border-top: 0;
  }
  .row > .ic,
  .badge {
    font-size: 26px;
    color: var(--af-accent);
    flex: none;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .a {
    font-size: calc(21px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b {
    font-size: calc(16px * var(--af-fs, 1));
    color: var(--af-ink-3);
    margin-top: 4px;
  }
  .end {
    text-align: right;
    flex: 0 1 auto;
    min-width: 0;
    max-width: 62%;
  }
  .val {
    font-size: calc(24px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .good {
    color: var(--af-good);
  }
  .warn {
    color: var(--af-accent);
  }
  .bad {
    color: var(--af-alert);
  }
  .meter {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--af-line);
    overflow: hidden;
  }
  .meter i {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background: var(--af-accent);
  }
`;

const isOn = (s?: HassEntity) => s?.state === "on";

/* ───────────────────────── Auto ───────────────────────── */

/**
 * Auto. Optionen: name, battery, range, charging, plugged, charger_power, time_full, location (device_tracker),
 * lock, limit, inside_temp.
 */
class AfCar extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .place {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .place .ic {
        color: var(--af-accent);
      }
      .car {
        font-size: 64px;
        color: var(--af-accent);
        margin-top: 22px;
      }
      .main {
        display: flex;
        align-items: baseline;
        gap: 28px;
        margin-top: 14px;
      }
      .pct {
        font-size: 120px;
        line-height: 0.9;
      }
      .pct small,
      .km small {
        font-size: 0.3em;
        color: var(--af-ink-2);
        font-family: var(--af-sans);
        letter-spacing: 0;
        margin-left: 0.1em;
      }
      .km {
        font-size: 56px;
        line-height: 1;
      }
      .battery {
        position: relative;
        height: 10px;
        border-radius: 5px;
        background: var(--af-line);
        margin-top: 26px;
      }
      .battery i {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background: var(--af-accent);
      }
      .battery b {
        position: absolute;
        top: -5px;
        bottom: -5px;
        width: 2px;
        background: var(--af-ink-2);
      }
      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(20px * var(--af-fs, 1));
        margin-top: 22px;
      }
      .status .ic {
        color: var(--af-accent);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .facts {
        display: flex;
        gap: 22px;
        flex-wrap: wrap;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
      }
      .facts span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    `,
  ];

  protected watched() {
    const o = this.options;
    return [o.battery, o.range, o.charging, o.plugged, o.charger_power, o.time_full, o.location, o.lock, o.limit, o.inside_temp];
  }

  render() {
    const o = this.options;
    const h = this.hass;
    const pct = numberOf(h, o.battery);
    const km = numberOf(h, o.range);
    const limit = numberOf(h, o.limit);
    const tracker = stateOf(h, o.location);
    const charging = isOn(stateOf(h, o.charging));
    const plugged = isOn(stateOf(h, o.plugged));
    const power = numberOf(h, o.charger_power);
    const full = parseDate(valueOf(h, o.time_full));
    const lock = stateOf(h, o.lock);
    const inside = numberOf(h, o.inside_temp);
    let place = placeOf(h, tracker?.state);
    const home = stateOf(h, "zone.home");
    if (tracker && tracker.state !== "home" && home && tracker.attributes.latitude != null) {
      const d = distanceKm(home.attributes.latitude, home.attributes.longitude, tracker.attributes.latitude, tracker.attributes.longitude);
      place = `${place} · ${fmt(d, d < 10 ? 1 : 0)} km`;
    }
    const status = charging
      ? html`${anyIcon("charge")}${t("Lädt")}${power ? ` · ${fmt(power, 1)} kW` : ""}${full ? ` · ${t("voll um {time}", { time: fmtTime(full) })}` : ""}`
      : plugged
        ? html`${anyIcon("plug")}${t("Angesteckt")}`
        : html`${anyIcon("car")}${tracker?.state === "home" ? t("Steht zuhause") : t("Unterwegs")}`;
    return html`<div class="head">
        <div class="label">${o.name ?? t("Auto")}</div>
        ${tracker ? html`<div class="place">${anyIcon("pin")}${place}</div>` : nothing}
      </div>
      <div class="car">${anyIcon("car")}</div>
      <div class="main">
        <div class="pct display num">${fmt(pct, 0)}<small>%</small></div>
        ${km != null ? html`<div class="km display num">${fmt(km, 0)}<small>km</small></div>` : nothing}
      </div>
      <div class="battery">
        <i style="width:${Math.max(0, Math.min(100, pct ?? 0))}%"></i>
        ${limit != null && limit < 100 ? html`<b style="left:${limit}%"></b>` : nothing}
      </div>
      <div class="status">${status}</div>
      <div class="facts num">
        ${lock ? html`<span>${anyIcon(lock.state === "locked" ? "lock" : "unlock")}${lock.state === "locked" ? t("Verriegelt") : t("Offen")}</span>` : nothing}
        ${inside != null ? html`<span>${anyIcon("thermo")}${t("Innen {temp}°", { temp: fmt(inside, 0) })}</span>` : nothing}
        ${limit != null ? html`<span>${t("Ladelimit {n} %", { n: fmt(limit, 0) })}</span>` : nothing}
      </div>`;
  }
}

/* ───────────────────────── Personen ───────────────────────── */

interface PersonConfig {
  entity: string;
  name?: string;
  location?: string;
}

/** Personen mit Foto und Ort. Optionen: persons [{entity, name, location (geocoded sensor)}], label. */
class AfPersons extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        flex: none;
        background: var(--af-surface) center / cover;
        border: 2px solid var(--af-line);
        display: grid;
        place-items: center;
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .avatar.home {
        border-color: var(--af-accent);
      }
      .a {
        font-size: 26px;
      }
      .b {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: calc(17px * var(--af-fs, 1));
        margin-top: 6px;
        color: var(--af-ink-2);
      }
      .b .ic {
        color: var(--af-accent);
      }
      .since {
        color: var(--af-ink-3);
      }
    `,
  ];

  protected watched() {
    return ((this.options.persons ?? []) as PersonConfig[]).flatMap((p) => [p.entity, p.location]);
  }

  render() {
    const h = this.hass;
    const home = stateOf(h, "zone.home");
    const people = (this.options.persons ?? []) as PersonConfig[];
    return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Familie")}</div>`}
      ${people.map((p) => {
        const s = stateOf(h, p.entity);
        if (!s) return nothing;
        const name = p.name ?? (s.attributes.friendly_name as string) ?? p.entity;
        const pic = s.attributes.entity_picture as string | undefined;
        const loc = stateOf(h, p.location);
        let where = placeOf(h, s.state);
        if (s.state !== "home") {
          const town = (loc?.attributes["Sub Locality"] as string) || (loc?.attributes.Locality as string);
          if (town && s.state === "not_home") where = town;
          if (home && s.attributes.latitude != null) {
            const d = distanceKm(home.attributes.latitude, home.attributes.longitude, s.attributes.latitude, s.attributes.longitude);
            if (d >= 0.3) where = `${where} · ${fmt(d, d < 10 ? 1 : 0)} km`;
          }
        }
        return html`<div class="row">
          <div class="avatar ${s.state === "home" ? "home" : ""}" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? "" : name.slice(0, 1)}</div>
          <div class="grow">
            <div class="a">${name}</div>
            <div class="b">${anyIcon(s.state === "home" ? "home" : "pin")}${where}<span class="since">· ${ago(s.last_changed)}</span></div>
          </div>
        </div>`;
      })}`;
  }
}

/* ───────────────────────── Saugroboter ───────────────────────── */

interface VacuumConfig {
  entity: string;
  name?: string;
  battery?: string;
  status?: string;
  room?: string;
  progress?: string;
  last_end?: string;
  area?: string;
  /** Karte (image.*) – leer = vom selben Gerät, false = keine */
  map?: string | false;
}

const VACUUM_STATE: Record<string, string> = {
  cleaning: "Saugt",
  docked: "In der Station",
  returning: "Fährt zurück",
  paused: "Pausiert",
  idle: "Bereit",
  error: "Störung",
};

/** Sensoren eines Saugers über den Objektnamen finden (Roborock: deutsch und englisch). */
const vacuumSensor = (hass: Hass | undefined, entity: string, suffixes: string[]): string | undefined => {
  const base = entity.split(".")[1];
  return suffixes.map((s) => `sensor.${base}_${s}`).find((id) => hass?.states[id]);
};

/** Kartenbild des Saugers: Bild-Entität desselben Geräts (Roborock: image.<name>_map_0), sonst nach Namen */
const vacuumMap = (hass: Hass | undefined, entity: string): string | undefined => {
  const registry = hass?.entities;
  const device = registry?.[entity]?.device_id;
  const own = device
    ? Object.values(registry ?? {})
        .filter((e) => e.device_id === device && e.entity_id.startsWith("image."))
        .map((e) => e.entity_id)
    : [];
  const base = entity.split(".")[1];
  return own.find((id) => /map|karte/.test(id)) ?? own[0] ?? [`image.${base}_map_0`, `image.${base}_map`].find((id) => hass?.states[id]);
};

/**
 * Saugroboter. Optionen: vacuums [{entity, name, battery, status, room, progress, last_end, area, map}], maps (false = ohne
 * kleine Karten), map (eine große Karte darunter), label.
 */
class AfVacuum extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .badge {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
      }
      .badge.active {
        background: var(--af-accent-soft);
        border-color: var(--af-accent);
      }
      .end .val {
        font-size: calc(20px * var(--af-fs, 1));
      }
      .end .meter {
        width: 64px;
        margin: 8px 0 0 auto;
      }
      .progress {
        margin-top: 10px;
      }
      .map {
        margin-top: 18px;
        border-radius: 22px;
        overflow: hidden;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        height: 220px;
        display: grid;
        place-items: center;
      }
      /* Kleine Karte rechts in der Zeile – Roborock liefert sie mit durchsichtigem Hintergrund */
      .mini {
        flex: none;
        width: calc(150px * var(--af-fs, 1));
        height: calc(96px * var(--af-fs, 1));
        border-radius: 14px;
        background: var(--af-surface) center / contain no-repeat;
        border: 1px solid var(--af-line);
      }
      .map img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    `,
  ];

  private vacuums(): VacuumConfig[] {
    return ((this.options.vacuums ?? []) as VacuumConfig[]).map((v) => ({
      ...v,
      battery: v.battery ?? vacuumSensor(this.hass, v.entity, ["batterie", "battery"]),
      status: v.status ?? vacuumSensor(this.hass, v.entity, ["status"]),
      room: v.room ?? vacuumSensor(this.hass, v.entity, ["aktueller_raum", "current_room"]),
      progress: v.progress ?? vacuumSensor(this.hass, v.entity, ["reinigungsfortschritt", "cleaning_progress"]),
      last_end: v.last_end ?? vacuumSensor(this.hass, v.entity, ["letztes_reinigungsende", "last_clean_end"]),
      area: v.area ?? vacuumSensor(this.hass, v.entity, ["reinigungsbereich", "cleaning_area"]),
      map: this.options.maps === false || v.map === false ? undefined : (v.map ?? vacuumMap(this.hass, v.entity)),
    }));
  }

  protected watched() {
    return this.vacuums().flatMap((v) => [v.entity, v.battery, v.status, v.room, v.progress, v.last_end, v.area, v.map || undefined]).concat(this.options.map);
  }

  render() {
    const h = this.hass;
    const list = this.vacuums();
    const map = stateOf(h, this.options.map);
    return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Saugroboter")}</div>`}
      ${list.map((v) => {
        const s = stateOf(h, v.entity);
        if (!s) return nothing;
        const status = valueOf(h, v.status);
        const active = s.state === "cleaning" || s.state === "returning";
        let text = VACUUM_STATE[s.state] ? t(VACUUM_STATE[s.state]) : s.state;
        if (s.state === "docked" && status === "charging") text = t("Lädt in der Station");
        const battery = numberOf(h, v.battery);
        const room = valueOf(h, v.room);
        const progress = numberOf(h, v.progress);
        const lastEnd = parseDate(valueOf(h, v.last_end));
        const area = numberOf(h, v.area);
        const mapPic = v.map ? (stateOf(h, v.map)?.attributes.entity_picture as string | undefined) : undefined;
        const sub = active
          ? `${room ?? ""}${progress ? ` · ${fmt(progress, 0)} %` : ""}`
          : lastEnd
            ? `${t("Zuletzt fertig {when}", { when: `${relDay(lastEnd)} ${fmtTime(lastEnd)}` })}${area ? ` · ${fmt(area, 0)} m²` : ""}`
            : "";
        return html`<div class="row">
          <div class="badge ${active ? "active" : ""}">${anyIcon("robot")}</div>
          <div class="grow">
            <div class="a">${v.name ?? s.attributes.friendly_name ?? v.entity}</div>
            <div class="b">${text}${sub ? ` · ${sub}` : ""}</div>
            ${active && progress != null ? html`<div class="meter progress"><i style="width:${progress}%"></i></div>` : nothing}
          </div>
          ${battery != null ? html`<div class="end"><div class="val num">${fmt(battery, 0)} %</div><div class="meter"><i style="width:${battery}%"></i></div></div>` : nothing}
          ${mapPic ? html`<div class="mini" style="background-image:url('${mapPic}')"></div>` : nothing}
        </div>`;
      })}
      ${map?.attributes.entity_picture ? html`<div class="map"><img src=${map.attributes.entity_picture} alt="Karte" @error=${(e: Event) => ((e.target as HTMLElement).style.visibility = "hidden")} /></div>` : nothing}`;
  }
}

/* ───────────────────────── Mülltonnen ───────────────────────── */

interface BinConfig {
  name: string;
  entity: string;
  color?: string;
  out?: string;
}

const BIN_COLORS: Record<string, string> = { bio: "#8a6a3d", gelb: "#e3c03a", papier: "#4a86c5", grau: "#8d9196", rest: "#8d9196" };

/** Tage bis zur Abholung: Zahl, „on Wed, 14.10.2026“ oder Datumsattribute. */

/** Mülltonnen. Optionen: bins [{name, entity, color}], max, highlight (Tage), label. */
class AfWaste extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .bin {
        width: 18px;
        height: 22px;
        border-radius: 4px 4px 6px 6px;
        flex: none;
        position: relative;
      }
      .bin::before {
        content: "";
        position: absolute;
        left: -3px;
        right: -3px;
        top: -5px;
        height: 4px;
        border-radius: 2px;
        background: inherit;
      }
      .soon .a {
        color: var(--af-accent);
      }
      .end .val {
        font-size: calc(20px * var(--af-fs, 1));
      }
      .end .b {
        margin-top: 2px;
      }
    `,
  ];

  protected watched() {
    return ((this.options.bins ?? []) as BinConfig[]).flatMap((b) => [b.entity, b.out]);
  }

  render() {
    const o = this.options;
    const highlight = Number(o.highlight ?? 1);
    const bins = ((o.bins ?? []) as BinConfig[])
      .map((b) => ({ ...b, days: binDays(this.hass, b.entity) }))
      .filter((b) => b.days != null && b.days >= 0)
      .sort((a, b) => (a.days ?? 99) - (b.days ?? 99))
      .slice(0, Number(o.max ?? 4));
    return html`${o.label === false ? nothing : html`<div class="label">${o.label ?? t("Müllabfuhr")}</div>`}
      ${bins.map((b) => {
        const d = b.days as number;
        const date = new Date();
        date.setDate(date.getDate() + d);
        const color = b.color ?? BIN_COLORS[Object.keys(BIN_COLORS).find((k) => b.name.toLowerCase().includes(k)) ?? "rest"];
        const when = d <= 2 ? relDay(date) : t("in {n} Tagen", { n: fmt(d, 0) });
        return html`<div class="row ${d <= highlight ? "soon" : ""}">
          <div class="bin" style="background:${color}"></div>
          <div class="grow">
            <div class="a">${b.name}</div>
            ${b.out && this.hass?.states[b.out]?.state === "on"
              ? html`<div class="b" style="color:var(--af-good)">${t("Steht draußen")} ✓</div>`
              : d === 1
                ? html`<div class="b">${t("Heute Abend rausstellen")}</div>`
                : d === 0
                  ? html`<div class="b">${t("Wird heute abgeholt")}</div>`
                  : nothing}
          </div>
          <div class="end"><div class="val">${when}</div><div class="b num">${date.toLocaleDateString(locale(), { weekday: "short", day: "numeric", month: "numeric" })}</div></div>
        </div>`;
      })}`;
  }
}

/* ───────────────────────── Bewegung ───────────────────────── */

const MOTION_CLASSES = new Set(["motion", "occupancy", "presence"]);
const NOISE = /\s*(bewegungsmelder|bewegungssensor|bewegung|anwesenheitssensor|belegung|occupancy|presence|motion)\s*\d*/gi;

/**
 * Wo zuletzt Bewegung war – bewusst dezent.
 * Optionen: entities (auto | Liste), max, within (Minuten), variant (line | list), label, exclude [ids].
 */
class AfActivity extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .line {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .line .ic {
        color: var(--af-accent);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .line b {
        color: var(--af-ink-2);
        font-weight: 400;
      }
      .now {
        color: var(--af-accent);
      }
    `,
  ];

  protected shouldUpdate(): boolean {
    return true;
  }

  private sensors(): HassEntity[] {
    const h = this.hass;
    if (!h) return [];
    const o = this.options;
    const exclude = new Set<string>(o.exclude ?? []);
    const ids: string[] = Array.isArray(o.entities)
      ? o.entities
      : Object.keys(h.states).filter((id) => id.startsWith("binary_sensor.") && MOTION_CLASSES.has(h.states[id].attributes.device_class));
    return ids.filter((id) => !exclude.has(id)).map((id) => h.states[id]).filter(Boolean);
  }

  render() {
    const h = this.hass;
    const o = this.options;
    const within = Number(o.within ?? 120) * 60e3;
    const items = this.sensors()
      .map((s) => ({
        name: (h && areaOf(h, s.entity_id)) || nameOf(h, s.entity_id).replace(NOISE, "").trim() || s.entity_id,
        on: s.state === "on",
        at: new Date(s.last_changed),
      }))
      .filter((i) => i.on || Date.now() - i.at.getTime() < within)
      .sort((a, b) => Number(b.on) - Number(a.on) || b.at.getTime() - a.at.getTime());
    // pro Bereich nur einmal
    const seen = new Set<string>();
    const unique = items.filter((i) => (seen.has(i.name) ? false : (seen.add(i.name), true))).slice(0, Number(o.max ?? 3));
    if (o.variant === "list") {
      return html`${o.label === false ? nothing : html`<div class="label">${o.label ?? t("Bewegung")}</div>`}
        ${unique.length
          ? unique.map((i) => html`<div class="row">${anyIcon("motion")}<div class="grow"><div class="a">${i.name}</div></div><div class="end b ${i.on ? "now" : ""}">${i.on ? t("jetzt") : ago(i.at)}</div></div>`)
          : html`<div class="b">${t("Keine Bewegung in letzter Zeit")}</div>`}`;
    }
    if (!unique.length) return o.hide_empty === false ? html`<div class="line">${anyIcon("motion")}${t("Ruhig")}</div>` : nothing;
    return html`<div class="line">
      ${anyIcon("motion")}
      ${unique.map((i, n) => html`${n ? html`<span>·</span>` : nothing}<b>${i.name}</b><span class=${i.on ? "now" : ""}>${i.on ? t("jetzt") : ago(i.at)}</span>`)}
    </div>`;
  }
}

/* ───────────────────────── Liste (Umwelt, beliebige Werte) ───────────────────────── */

interface RowConfig {
  name?: string;
  entity: string;
  attribute?: string;
  icon?: string;
  unit?: string;
  decimals?: number;
  format?: "aqi" | "uv" | "lux" | "humidity" | "rain" | "onoff";
  on_text?: string;
  off_text?: string;
}

const scale = (v: number, steps: [number, string, string][]): [string, string] => {
  for (const [max, text, cls] of steps) if (v <= max) return [text, cls];
  const last = steps[steps.length - 1];
  return [last[1], last[2]];
};

const qualify = (row: RowConfig, v: number): [string, string] => {
  switch (row.format) {
    case "aqi":
      return scale(v, [[50, "gut", "good"], [100, "mäßig", "warn"], [150, "empfindliche Gruppen", "bad"], [Infinity, "ungesund", "bad"]]);
    case "uv":
      return scale(v, [[2, "niedrig", "good"], [5, "mäßig", "warn"], [7, "hoch", "bad"], [Infinity, "sehr hoch", "bad"]]);
    case "lux":
      return scale(v, [[10, "dunkel", ""], [300, "dämmrig", ""], [5000, "hell", ""], [Infinity, "sonnig", "warn"]]);
    case "humidity":
      return scale(v, [[34, "trocken", "warn"], [60, "gut", "good"], [65, "feucht", ""], [Infinity, "zu feucht", "warn"]]);
    default:
      return ["", ""];
  }
};

/** Werte-Liste mit Bewertung. Optionen: rows [{name, entity, attribute, icon, unit, decimals, format, on_text, off_text}], label. */
class AfList extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .q {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 4px;
      }
    `,
  ];

  protected watched() {
    return ((this.options.rows ?? []) as RowConfig[]).map((r) => r.entity);
  }

  render() {
    const rows = (this.options.rows ?? []) as RowConfig[];
    return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Umwelt")}</div>`}
      ${rows.map((r) => {
        const s = stateOf(this.hass, r.entity);
        if (!s) return nothing;
        const raw = valueOf(this.hass, r.entity, r.attribute);
        let value: string;
        let q: [string, string] = ["", ""];
        if (r.format === "rain" || r.format === "onoff" || s.entity_id.startsWith("binary_sensor.")) {
          const on = raw === "on";
          value = on ? r.on_text ?? (r.format === "rain" ? t("Regnet") : t("An")) : r.off_text ?? (r.format === "rain" ? t("Trocken") : t("Aus"));
          q = on ? ["", r.format === "rain" ? "warn" : ""] : ["", ""];
        } else {
          const n = parseFloat(String(raw));
          const unit = r.unit ?? (r.attribute ? "" : (s.attributes.unit_of_measurement as string) ?? "");
          value = Number.isFinite(n) ? `${fmt(n, r.decimals ?? (Math.abs(n) >= 100 ? 0 : 1))}${unit ? ` ${unit}` : ""}` : String(raw ?? "–");
          if (Number.isFinite(n)) q = qualify(r, n);
        }
        return html`<div class="row">
          ${anyIcon(r.icon ?? "info")}
          <div class="grow"><div class="a">${r.name ?? s.attributes.friendly_name ?? r.entity}</div></div>
          <div class="end"><div class="val num ${q[0] ? "" : q[1]}">${value}</div>${q[0] ? html`<div class="q ${q[1]}">${t(q[0])}</div>` : nothing}</div>
        </div>`;
      })}`;
  }
}

/* ───────────────────────── Warnungen ───────────────────────── */

const SEVERITY: Record<string, [string, string]> = {
  minor: ["Hinweis", "warn"],
  moderate: ["Warnung", "warn"],
  severe: ["Unwetter", "bad"],
  extreme: ["Extrem", "bad"],
};

/** Aktive Warnungen (NINA u. ä.). Optionen: entities [binary_sensor], label, calm_text. */
class AfWarnings extends AfTickingWidget {
  static styles = [
    widgetStyles,
    listStyles,
    css`
      .row {
        align-items: flex-start;
      }
      .desc {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
        line-height: 1.45;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .a {
        white-space: normal;
      }
      .calm {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .calm .ic {
        color: var(--af-good);
        font-size: calc(24px * var(--af-fs, 1));
      }
    `,
  ];

  protected watched() {
    return (this.options.entities ?? []) as string[];
  }

  render() {
    const active = ((this.options.entities ?? []) as string[]).map((id) => stateOf(this.hass, id)).filter((s): s is HassEntity => isOn(s));
    return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Warnungen")}</div>`}
      ${active.length
        ? active.map((s) => {
            const a = s.attributes;
            const [sevDe, cls] = SEVERITY[String(a.severity ?? "").toLowerCase()] ?? ["Warnung", "warn"];
            const sev = t(sevDe);
            const until = parseDate(a.expires);
            return html`<div class="row">
              <span class=${cls}>${anyIcon("warning")}</span>
              <div class="grow">
                <div class="a">${a.headline ?? a.friendly_name}</div>
                <div class="b ${cls}">${sev}${until ? ` · ${t("bis {when}", { when: `${relDay(until)} ${fmtTime(until)}` })}` : ""}</div>
                ${a.description ? html`<div class="desc">${a.description}</div>` : nothing}
              </div>
            </div>`;
          })
        : html`<div class="calm">${anyIcon("check")}${this.options.calm_text ?? t("Keine Warnungen")}</div>`}`;
  }
}

define("af-car", AfCar);
define("af-persons", AfPersons);
define("af-vacuum", AfVacuum);
define("af-waste", AfWaste);
define("af-activity", AfActivity);
define("af-list", AfList);
define("af-warnings", AfWarnings);
