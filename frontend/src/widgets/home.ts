// Haus-Widgets: value, rooms, status, calendar, infoline
import { locale, t } from "../i18n";
import { css, html, nothing, type PropertyValues } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { repeat } from "lit/directives/repeat.js";
import { isAllDay, loadEvents, type CalEvent } from "../data";
import { MDI_MAP, binIcon, iconSvg, weatherIcon, weatherLabel } from "../icons";
import { alignStyles, widgetStyles } from "../styles";
import type { Condition, Hass } from "../types";
import { areaOf, binDays, checkCondition, dayDiff, dueWithin, duration, fmt, fmtTime, nameOf, numberOf, parseDate, relDay, stateOf, valueOf } from "../util";
import { AfTickingWidget, AfWidget, define } from "./base";

const icon = (name?: string) => iconSvg(name ? MDI_MAP[name] ?? name : undefined);
const unitSuffix = (unit?: string) => (unit === "°C" || unit === "°F" ? "°" : unit ? ` ${unit}` : "");

const cardStyles = css`
  .card .bigic {
    font-size: 60px;
    color: var(--af-accent);
    margin-top: 26px;
    display: flex;
    gap: 14px;
  }
  .line .binic {
    width: 1.35em;
    height: 1.35em;
    flex: none;
  }
  .card .bigic .binic {
    width: 92px;
    height: 92px;
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
    line-height: 1.4;
  }
  .split {
    margin-top: auto;
    padding-top: 22px;
    border-top: 1px solid var(--af-line);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .split .r {
    display: flex;
    justify-content: space-between;
    font-size: calc(20px * var(--af-fs, 1));
  }
  .split .r span:first-child {
    color: var(--af-ink-2);
  }
  .cold {
    color: var(--af-cold);
  }
`;

/**
 * Ein Wert groß. Optionen: entity, attribute, name, label, icon, unit, decimals, style (plain | card),
 * sub {entity, attribute, suffix}, secondary [{name, entity, attribute, decimals}], cold (Schwelle).
 */
class AfValue extends AfWidget {
  static styles = [
    widgetStyles,
    alignStyles,
    cardStyles,
    css`
      .plain .name {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .plain .big {
        font-size: 88px;
        line-height: 1;
        margin-top: 12px;
      }
      /* Riesig: ein Wert füllt das Feld – lesbar von weit weg */
      :host([huge]) {
        container-type: size;
      }
      .huge {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .huge .name {
        font-size: max(22px, 7cqh);
        color: var(--af-ink-2);
      }
      .huge .big {
        font-size: min(62cqh, calc(165cqw / var(--n, 4)));
        line-height: 1.05;
        white-space: nowrap;
      }
    `,
  ];

  protected watched() {
    const o = this.options;
    return [o.entity, o.sub?.entity, ...((o.secondary ?? []) as { entity?: string }[]).map((s) => s.entity)];
  }

  private formatted(entity?: string, attribute?: string, decimals = 1, unit?: string): string {
    const s = stateOf(this.hass, entity);
    const raw = valueOf(this.hass, entity, attribute);
    const n = parseFloat(String(raw));
    const u = unit ?? (attribute ? "" : (s?.attributes.unit_of_measurement as string | undefined));
    return Number.isFinite(n) ? `${fmt(n, decimals)}${unitSuffix(u)}` : String(raw ?? "–");
  }

  render() {
    const o = this.options;
    const decimals = o.decimals ?? 1;
    const value = this.formatted(o.entity, o.attribute, decimals, o.unit);
    const name = o.name ?? nameOf(this.hass, o.entity);
    const cold = (entity?: string, attribute?: string) => {
      const n = numberOf(this.hass, entity, attribute);
      return o.cold != null && n != null && n < Number(o.cold);
    };
    this.toggleAttribute("huge", o.style === "huge");
    if (o.style === "huge") {
      return html`<div class="huge">
        <div class="name">${o.icon ? html`${icon(o.icon)} ` : nothing}${name}</div>
        <div class="big display num ${cold(o.entity, o.attribute) ? "cold" : ""}" style="--n:${Math.max(2, value.length)}">${value}</div>
      </div>`;
    }
    if (o.style !== "card") {
      return html`<div class="plain">
        <div class="name">${o.icon ? html`${icon(o.icon)} ` : nothing}${name}</div>
        <div class="big display num ${cold(o.entity, o.attribute) ? "cold" : ""}">${value}</div>
      </div>`;
    }
    const sub = o.sub?.entity ? `${this.formatted(o.sub.entity, o.sub.attribute, 0, "")} ${o.sub.suffix ?? ""}` : "";
    const secondary = (o.secondary ?? []) as { name?: string; entity: string; attribute?: string; decimals?: number }[];
    return html`<div class="card" style="width:100%">
      <div class="label">${o.label ?? ""}</div>
      <div class="bigic">${icon(o.icon ?? "thermo")}</div>
      <div class="big display num ${cold(o.entity, o.attribute) ? "cold" : ""}">${value}</div>
      <div class="cond">${name}</div>
      ${sub ? html`<div class="sub num">${sub}</div>` : nothing}
      ${secondary.length
        ? html`<div class="split">
            ${secondary.map(
              (r) => html`<div class="r num ${cold(r.entity, r.attribute) ? "cold" : ""}">
                <span>${r.name ?? nameOf(this.hass, r.entity)}</span><span>${this.formatted(r.entity, r.attribute, r.decimals ?? 1)}</span>
              </div>`,
            )}
          </div>`
        : nothing}
    </div>`;
  }
}

interface RoomConfig {
  name: string;
  temperature: string;
  humidity?: string;
  climate?: string;
  windows?: string[];
}

/** Luftfeuchte bewerten: über 60 % feucht (ab 65 % lüften), unter 35 % zu trocken */
export const humidityAdvice = (hum: number | null): { tone: "good" | "warn" | "bad" | "dry"; text: string } | null => {
  if (hum == null) return null;
  if (hum >= 65) return { tone: "bad", text: "lüften" };
  if (hum >= 60) return { tone: "warn", text: "etwas feucht" };
  if (hum < 35) return { tone: "dry", text: "zu trocken" };
  return { tone: "good", text: "gut" };
};

/**
 * Räume als ruhiges Raster. Optionen: rooms [{name, temperature, humidity, climate, windows}], cold, warm, columns,
 * advice (Luftfeuchte bewerten: „lüften“, „zu trocken“ – mit Zusammenfassung oben).
 */
class AfRooms extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      /* In einer Karte stehen die Werte mittig (sonst oben angeklebt, unten leer); frei stehend bündig mit den Nachbarn */
      .grid {
        display: grid;
        column-gap: 24px;
        row-gap: 64px;
        box-sizing: border-box;
        min-height: 100%;
        align-content: var(--af-fill-align, start);
        padding-top: var(--af-fill-pad, 40px);
      }
      .n {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .grid > div {
        container-type: inline-size;
        min-width: 0;
      }
      /* passt in die Spalte – breite Schriften (LED-Punkte, Monospace) setzen --af-wide kleiner */
      .v {
        font-size: min(88px, calc(44cqi * var(--af-wide, 1)));
        line-height: 1;
        margin-top: 14px;
        white-space: nowrap;
      }
      .s {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
      }
      .cold .v,
      .cold .s {
        color: var(--af-cold);
      }
      .warm .v {
        color: var(--af-alert);
      }
      .adv {
        font-weight: 500;
      }
      .adv.good {
        color: var(--af-good);
      }
      .adv.warn {
        color: var(--af-warn, var(--af-alert));
      }
      .adv.bad {
        color: var(--af-alert);
      }
      .adv.dry {
        color: var(--af-cold);
      }
      .advice {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-alert);
      }
      .advice.ok {
        color: var(--af-good);
      }
      .advice .ic {
        font-size: 1.2em;
      }
    `,
  ];

  private rooms(): RoomConfig[] {
    return (this.options.rooms ?? []) as RoomConfig[];
  }

  /** Eine Zeile oben: alles gut – oder welche Räume gelüftet werden sollten */
  private adviceLine() {
    const by = (tone: string) => this.rooms().filter((r) => humidityAdvice(numberOf(this.hass, r.humidity))?.tone === tone).map((r) => r.name);
    const wet = [...by("bad"), ...by("warn")];
    const dry = by("dry");
    const list = (n: string[]) => (n.length > 1 ? `${n.slice(0, -1).join(", ")} ${t("und")} ${n.at(-1)}` : n[0]);
    const parts = [wet.length ? t("Lüften: {rooms}", { rooms: list(wet) }) : "", dry.length ? t("Zu trocken: {rooms}", { rooms: list(dry) }) : ""].filter(Boolean);
    return html`<div class="advice ${parts.length ? "" : "ok"}">${icon(parts.length ? "window" : "check")}<span>${parts.length ? parts.join(" · ") : t("Überall gutes Raumklima")}</span></div>`;
  }

  protected watched() {
    return this.rooms().flatMap((r) => [r.temperature, r.humidity, r.climate, ...(r.windows ?? [])]);
  }

  render() {
    const cold = Number(this.options.cold ?? 16);
    const warm = Number(this.options.warm ?? 26);
    const columns = Number(this.options.columns ?? 3);
    return html`${this.options.advice ? this.adviceLine() : nothing}<div class="grid" style="grid-template-columns:repeat(${columns},1fr)">
      ${this.rooms().map((r) => {
        const isClimate = r.temperature?.startsWith("climate.");
        const temp = numberOf(this.hass, r.temperature, isClimate ? "current_temperature" : undefined);
        const hum = numberOf(this.hass, r.humidity);
        const open = (r.windows ?? []).some((w) => stateOf(this.hass, w)?.state === "on");
        const climate = stateOf(this.hass, r.climate ?? (isClimate ? r.temperature : undefined));
        let note = open ? t("Fenster offen") : "";
        if (!note && climate?.attributes.hvac_action === "heating") note = t("heizt auf {temp}°", { temp: fmt(climate.attributes.temperature, 0) });
        const adv = this.options.advice ? humidityAdvice(hum) : null;
        if (!note && hum != null) note = `${fmt(hum, 0)} %`;
        const cls = temp == null ? "" : temp < cold ? "cold" : temp > warm ? "warm" : "";
        return html`<div class="${cls}">
          <div class="n">${r.name}</div>
          <div class="v display num">${fmt(temp, 1)}°</div>
          <div class="s num">${note || html`&nbsp;`}${adv && !open ? html` <b class="adv ${adv.tone}">${t(adv.text)}</b>` : nothing}</div>
        </div>`;
      })}
    </div>`;
  }
}

const OPENING_CLASSES = new Set(["window", "door", "garage_door", "opening"]);
const isGroup = (hass: Hass, id: string) => {
  const a = hass.states[id]?.attributes;
  return Array.isArray(a?.entity_id) || !!a?.is_hue_group;
};

interface StatusItem {
  icon: string;
  title: string;
  sub: string;
  /** Eigenes Bild statt Symbol (z. B. die gezeichnete Mülltonne) */
  pic?: unknown;
}

/**
 * „Gerade“: zeigt nur, was relevant ist.
 * Optionen: windows (auto | [{entity, name, room}]), appliances [{entity, name, icon}], lights (auto | false),
 * waste (Kalender), waste_days, extra [{entity, state, text, icon}], max, label.
 */
class AfStatus extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      .item {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        padding: calc(18px * var(--af-dense, 1)) 0;
        border-top: 1px solid var(--af-line);
      }
      .item .binic {
        width: 30px;
        height: 30px;
        flex: none;
        margin-top: -2px;
      }
      .item .ic {
        font-size: 26px;
        color: var(--af-accent);
        margin-top: 1px;
      }
      .a {
        font-size: calc(21px * var(--af-fs, 1));
      }
      .b {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 5px;
        line-height: 1.4;
      }
      .label {
        margin-bottom: 14px;
        padding-top: 6px;
      }
    `,
  ];

  protected shouldUpdate(): boolean {
    return true;
  }

  private items(): StatusItem[] {
    const hass = this.hass;
    if (!hass) return [];
    const o = this.options;
    const items: StatusItem[] = [];
    const now = Date.now();

    if (o.windows === "auto") {
      for (const s of Object.values(hass.states)) {
        if (s.entity_id.startsWith("binary_sensor.") && s.state === "on" && OPENING_CLASSES.has(s.attributes.device_class)) {
          items.push({ icon: s.attributes.device_class === "window" ? "window" : "door", title: `${s.attributes.friendly_name ?? s.entity_id} offen`, sub: areaOf(hass, s.entity_id) ?? "" });
        }
      }
    } else if (Array.isArray(o.windows)) {
      for (const w of o.windows as { entity: string; name?: string; room?: string }[]) {
        if (stateOf(hass, w.entity)?.state === "on") items.push({ icon: "window", title: t("{name} offen", { name: w.name ?? nameOf(hass, w.entity) }), sub: w.room ?? areaOf(hass, w.entity) ?? "" });
      }
    }

    for (const a of (o.appliances ?? []) as { entity: string; name?: string; icon?: string; on?: string }[]) {
      const s = stateOf(hass, a.entity);
      if (s && s.state === (a.on ?? "on")) {
        items.push({ icon: a.icon ?? "washer", title: t("{name} läuft", { name: a.name ?? nameOf(hass, a.entity) }), sub: t("seit {time}", { time: duration(now - new Date(s.last_changed).getTime()) }) });
      }
    }

    if (o.lights === "auto") {
      const on = Object.values(hass.states).filter((s) => s.entity_id.startsWith("light.") && s.state === "on" && !isGroup(hass, s.entity_id));
      if (on.length) {
        const names = on.map((s) => s.attributes.friendly_name ?? s.entity_id);
        items.push({ icon: "bulb", title: on.length === 1 ? t("1 Licht an") : t("{n} Lichter an", { n: on.length }), sub: names.slice(0, 3).join(", ") + (names.length > 3 ? " …" : "") });
      }
    }

    const due = dueWithin(hass, o.waste, Number(o.waste_days ?? 2));
    if (due && o.waste) {
      const title = String(valueOf(hass, o.waste, "message") ?? t("Müll"));
      items.push({ icon: "bin", pic: binIcon(title), title, sub: t("Abholung {when}", { when: relDay(due) }) });
    }

    for (const x of (o.extra ?? []) as { entity: string; state?: string; text?: string; icon?: string }[]) {
      if (stateOf(hass, x.entity)?.state === (x.state ?? "on")) items.push({ icon: x.icon ?? "info", title: x.text ?? nameOf(hass, x.entity), sub: "" });
    }

    if (!items.length) items.push({ icon: "check", title: o.calm_title ?? t("Alles ruhig"), sub: o.calm_text ?? t("Nichts offen, nichts läuft") });
    return items.slice(0, Number(o.max ?? 5));
  }

  render() {
    return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? "Gerade"}</div>`}
      ${this.items().map((i) => html`<div class="item">${i.pic ?? icon(i.icon)}<div><div class="a">${i.title}</div>${i.sub ? html`<div class="b">${i.sub}</div>` : nothing}</div></div>`)}`;
  }
}

/** Kalender / Müll. Optionen: entity, variant (card | line), label, icon, waste (bool), days (nur zeigen wenn so bald fällig). */
class AfCalendar extends AfTickingWidget {
  static styles = [widgetStyles, alignStyles, cardStyles, css`.line { font-size: calc(21px * var(--af-fs, 1)); color: var(--af-ink-2); display:flex; gap:10px; align-items:center } .line .ic { color: var(--af-accent); font-size: 22px }`];

  /** Alle Termine am Tag des nächsten Termins – der Kalenderzustand nennt nur einen (Biotonne und Restmüll am selben Tag) */
  private sameDay?: { key: string; titles: string[] };
  private loadingKey?: string;

  protected watched() {
    return [this.options.entity];
  }

  private titlesOn(start: Date, message: string): string[] {
    const o = this.options;
    const key = `${o.entity}|${start.getTime()}`;
    if (this.hass && this.sameDay?.key !== key && this.loadingKey !== key) {
      this.loadingKey = key;
      const day = start.toLocaleDateString("sv"); // JJJJ-MM-TT in Ortszeit
      void loadEvents(this.hass, [o.entity], Math.max(1, dayDiff(start) + 1)).then((events) => {
        const dayOf = (e: CalEvent) => (isAllDay(e) ? e.start.slice(0, 10) : parseDate(e.start)?.toLocaleDateString("sv"));
        this.sameDay = { key, titles: [...new Set(events.filter((e) => dayOf(e) === day).map((e) => e.summary).filter(Boolean))] };
        this.requestUpdate();
      });
    }
    const titles = this.sameDay?.key === key && this.sameDay.titles.length ? this.sameDay.titles : [message];
    return titles.includes(message) || !message ? titles : [message, ...titles];
  }

  /** Am Abholtag ist die Tonne schon weg: nächster Abholtag mit allen Tonnen (Kalenderzustand kennt nur den laufenden Termin) */
  private upcoming?: { key: string; start: Date; titles: string[] } | null;
  private nextPickup(): { start: Date; titles: string[] } | null | undefined {
    const key = `${this.options.entity}|${new Date().toLocaleDateString("sv")}`;
    if (this.hass && this.upcoming?.key !== key && this.loadingKey !== key) {
      this.loadingKey = key;
      const today = new Date().toLocaleDateString("sv");
      void loadEvents(this.hass, [this.options.entity], 31).then((events) => {
        const dayOf = (e: CalEvent) => (isAllDay(e) ? e.start.slice(0, 10) : parseDate(e.start)?.toLocaleDateString("sv"));
        const next = events.find((e) => (dayOf(e) ?? "") > today);
        const day = next && dayOf(next);
        this.upcoming = next && day
          ? { key, start: isAllDay(next) ? new Date(`${day}T00:00:00`) : parseDate(next.start)!, titles: [...new Set(events.filter((e) => dayOf(e) === day).map((e) => e.summary).filter(Boolean))] }
          : { key, start: new Date(NaN), titles: [] };
        this.requestUpdate();
      });
    }
    return this.upcoming?.key === key ? (this.upcoming.titles.length ? this.upcoming : null) : undefined;
  }

  render() {
    const o = this.options;
    const s = stateOf(this.hass, o.entity);
    let start = parseDate(s?.attributes.start_time);
    if (!s || !start) return nothing;
    const waste = o.waste ?? /waste|abfall|muell|müll|trash/i.test(o.entity ?? "");
    let names: string[] | undefined;
    if (waste && dayDiff(start) <= 0) {
      const next = this.nextPickup();
      if (!next) return nothing; // lädt noch oder nichts mehr in Sicht
      start = next.start;
      names = next.titles;
    }
    if (o.days != null && (dayDiff(start) < 0 || dayDiff(start) > Number(o.days))) return nothing;
    names ??= this.titlesOn(start, String(s.attributes.message ?? ""));
    const title = names.length > 1 ? `${names.slice(0, -1).join(", ")} ${t("und")} ${names.at(-1)}` : (names[0] ?? "");
    const when = `${relDay(start)}${s.attributes.all_day ? "" : `, ${t("{time} Uhr", { time: fmtTime(start) })}`}`;
    // Müll ohne eigenes Icon: je fällige Tonne die gezeichnete Tonne in ihrer Farbe
    const pic = waste && !o.icon ? names.map((n) => binIcon(n)) : icon(o.icon ?? (waste ? "bin" : "calendar"));
    if (o.variant === "line") return html`<div class="line">${pic}<span>${title} ${when}</span></div>`;
    const evening = dayDiff(start) === 1 ? t("heute Abend") : t("{day} Abend", { day: relDay(new Date(start.getTime() - 864e5)) });
    return html`<div class="card" style="width:100%">
      <div class="label">${o.label ?? (waste ? t("Müll") : t("Termin"))}</div>
      <div class="bigic">${pic}</div>
      <div class="big display" style="font-size:72px;margin-top:28px">${title}</div>
      <div class="cond">${waste ? t("Abholung") : ""} ${when}</div>
      <div class="sub">${start.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })}</div>
      ${waste ? html`<div class="split"><div class="r"><span>${t("Rausstellen")}</span><span>${evening}</span></div></div>` : nothing}
    </div>`;
  }
}

interface LineItem {
  type: "weather" | "calendar" | "entity" | "text" | "waste" | "status" | "device" | "media" | "agenda";
  /** agenda: Termine der nächsten … Stunden (Standard 24) */
  hours?: number;
  entity?: string;
  /** media: mehrere Player – der erste, der spielt */
  entities?: string[];
  /** status: zeigen, wenn die Entität so steht (Standard „on“); device: eigener „läuft“-Zustand */
  state?: string;
  /** device: Restzeit (Minuten-Sensor) oder Endzeit (Zeitstempel) */
  remaining?: string;
  /** device: Fortschritt in % */
  progress?: string;
  /** device: Zusatz hinten dran, z. B. aktueller Raum des Saugers */
  detail?: string;
  /** device: „fertig 18:40“ statt „noch 25 min“ */
  show_end?: boolean;
  /** status: nur wenn mindestens eine davon an ist – die offenen werden genannt („Fenster zu! Es regnet · Schlafzimmer“) */
  list?: { entity: string; name?: string }[];
  /** Nur zeigen, wenn diese Bedingungen erfüllt sind (wie bei Seiten und Widgets) */
  show_if?: Condition[];
  days?: number;
  /** waste: Tonnen mit Tage-Sensor; leer = alle Müll-Sensoren automatisch */
  bins?: { name?: string; entity: string; color?: string }[];
  name?: string;
  text?: string;
  icon?: string;
}

/** Müll-Sensoren automatisch finden (waste_collection_schedule & Co.), Name aus der ID: „graue_tonne“ → „Graue Tonne“ */
export const autoBins = (hass?: Hass): { name: string; entity: string }[] =>
  Object.keys(hass?.states ?? {})
    .filter((id) => id.startsWith("sensor.") && /waste|abfall|muell|müll|tonne/i.test(id) && /_(tage|days)$/.test(id))
    .map((id) => ({
      entity: id,
      name: id
        .replace(/^sensor\.(waste_collection_schedule_)?/, "")
        .replace(/_(tage|days)$/, "")
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    }));

/** Fällige Tonnen nach Tag gruppiert: [{days, bins}] – „Biotonne und Restmüll morgen“ */
export const wasteGroups = (hass: Hass | undefined, item: { bins?: { name?: string; entity: string; color?: string }[]; days?: number }) => {
  const bins = item.bins?.length ? item.bins : autoBins(hass);
  const groups = new Map<number, { name: string; color?: string }[]>();
  for (const b of bins) {
    const days = binDays(hass, b.entity);
    if (days == null || days < 0 || days > Number(item.days ?? 7)) continue;
    const name = b.name || nameOf(hass, b.entity);
    groups.set(days, [...(groups.get(days) ?? []), { name, color: (b as { color?: string }).color }]);
  }
  return [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([days, list]) => ({ days, bins: list }));
};

export const whenLabel = (days: number): string => {
  if (days <= 2) return [t("heute"), t("morgen"), t("übermorgen")][days];
  if (days >= 7) return t("in {n} Tagen", { n: days }); // „am Dienstag“ wäre am Dienstag missverständlich
  const d = new Date();
  d.setDate(d.getDate() + days);
  return t("am {day}", { day: d.toLocaleDateString(locale(), { weekday: "long" }) });
};

/** Entitäten aus Bedingungen (auch verschachtelt) – damit die Zeile bei deren Änderung neu zeichnet */
const conditionEntities = (conds?: Condition[]): string[] =>
  (conds ?? []).flatMap((c) => [(c as { entity?: string }).entity ?? "", ...conditionEntities((c as { conditions?: Condition[] }).conditions)]).filter(Boolean);

/** So lange blendet ein verschwindendes Teil der Infozeile aus */
const LEAVE_MS = 520;

/** Zustände, in denen ein Gerät als „läuft“ gilt (Schalter, Home Connect, Bambu, Medien …) */
const RUNNING = ["on", "run", "running", "printing", "prepare", "pause", "paused", "delayedstart", "cleaning"];

/** Restzeit in ms – aus einem Endzeit-Zeitstempel oder einer Dauer (min, h, s); null, wenn unbekannt oder vorbei */
const remainingMs = (hass: Hass | undefined, entity?: string): number | null => {
  const s = stateOf(hass, entity);
  if (!s || ["unknown", "unavailable", ""].includes(s.state)) return null;
  if (s.attributes.device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}T/.test(s.state)) {
    const end = parseDate(s.state);
    const left = end ? end.getTime() - Date.now() : 0;
    return left > 0 ? left : null;
  }
  const n = parseFloat(s.state);
  if (!Number.isFinite(n) || n <= 0) return null;
  const unit = String(s.attributes.unit_of_measurement ?? "min");
  return n * (unit === "h" ? 3600e3 : unit === "s" ? 1e3 : 60e3);
};

/**
 * Eine ruhige Zeile mit Punkten dazwischen. Optionen: items [{type, …}]:
 * weather, calendar, entity, text, waste – und nur wenn gerade zutreffend: status (z. B. „Es regnet“),
 * device (Gerät läuft, mit Fortschritt und Restzeit), media (was gerade läuft, z. B. Apple TV).
 */
class AfInfoline extends AfTickingWidget {
  static styles = [
    widgetStyles,
    alignStyles,
    css`
      .line {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
        text-shadow: 0 2px 28px rgba(0, 0, 0, 0.35);
      }
      .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .part {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        white-space: nowrap;
      }
      .part .dot {
        margin-right: 0;
      }
      /* Verschwindendes Teil blendet aus, danach rücken die anderen weich nach */
      .part.out {
        animation: part-out 0.5s var(--af-ease) both;
      }
      @keyframes part-out {
        to {
          opacity: 0;
          filter: blur(2px);
        }
      }
      /* Neues oder geändertes Teil weich einblenden (z. B. „noch 2:09 h“ → „noch 2:08 h“) */
      .part.in {
        animation: part-in 0.9s var(--af-ease) both;
      }
      @keyframes part-in {
        from {
          opacity: 0;
          transform: translateY(5px);
          filter: blur(2px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .part.in {
          animation: none;
        }
      }
      .rot {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        animation: rot-in 0.8s var(--af-ease) backwards;
      }
      @keyframes rot-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      .binic {
        width: 1.35em;
        height: 1.35em;
        flex: none;
      }
    `,
  ];

  /** Mülltonnen wechseln alle paar Sekunden */
  private turn = 0;
  private turnTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this.turnTimer = window.setInterval(() => {
      if (((this.options.items ?? []) as LineItem[]).some((i) => i.type === "waste")) {
        this.turn++;
        this.requestUpdate();
      }
    }, 6000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.turnTimer);
  }

  private shown = false;

  /** Teile, deren Text sich geändert hat oder die neu dazukommen, weich einblenden – beim ersten Zeichnen nicht */
  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    for (const el of this.renderRoot.querySelectorAll<HTMLElement>(".part")) {
      // Verschobene Teile gleiten von ihrer alten Position auf die neue
      const before = el.dataset.key ? this.rects.get(el.dataset.key) : undefined;
      if (before && this.shown && !el.classList.contains("out")) {
        const after = el.getBoundingClientRect();
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 700, easing: "cubic-bezier(0.22, 0.8, 0.24, 1)" });
        }
      }
      const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      // Mülltonnen wechseln mit eigener Einblendung
      if (this.shown && el.dataset.text !== text && !el.querySelector(".rot") && !el.classList.contains("out")) {
        el.classList.remove("in");
        void el.offsetWidth; // Animation neu starten
        el.classList.add("in");
      }
      el.dataset.text = text;
    }
    this.shown = true;
  }

  protected watched() {
    return ((this.options.items ?? []) as LineItem[]).flatMap((i) => [
      i.entity,
      i.remaining,
      i.progress,
      i.detail,
      ...(i.entities ?? []),
      ...(i.list ?? []).map((l) => l.entity),
      ...conditionEntities(i.show_if), ...(i.type === "waste" ? (i.bins?.length ? i.bins : autoBins(this.hass)).map((b) => b.entity) : [])]);
  }

  /** Termine für Teile der Art „agenda“ (gemeinsamer Zwischenspeicher, 10 min) */
  private events: CalEvent[] = [];
  private eventsKey = "";

  private agenda(item: LineItem) {
    const calendars = item.entities?.length
      ? item.entities
      : Object.keys(this.hass?.states ?? {}).filter((id) => id.startsWith("calendar.")).slice(0, 3);
    const key = calendars.join(",");
    if (this.hass && calendars.length) {
      void loadEvents(this.hass, calendars, 2).then((events) => {
        if (events !== this.events || key !== this.eventsKey) {
          this.events = events;
          this.eventsKey = key;
          this.requestUpdate();
        }
      });
    }
    const now = Date.now();
    const within = now + Number(item.hours ?? 24) * 36e5;
    const upcoming = this.events.filter((e) => {
      const start = parseDate(e.start)?.getTime() ?? 0;
      const end = parseDate(e.end)?.getTime() ?? 0;
      return end > now && start < within && !(isAllDay(e) && dayDiff(new Date(start)) < 0);
    });
    // Termine mit Uhrzeit vor ganztägigen – „18:30 Training“ sagt mehr als „Kita geschlossen“
    const next = upcoming.find((e) => !isAllDay(e)) ?? upcoming[0];
    if (!next) return null;
    const start = parseDate(next.start)!;
    const end = parseDate(next.end)!;
    const day = relDay(start).replace(/^./, (c) => c.toUpperCase());
    const label = isAllDay(next)
      ? `${day}: ${next.summary}`
      : start.getTime() <= now
        ? t("Jetzt: {what} bis {time}", { what: next.summary, time: fmtTime(end) })
        : `${day} ${fmtTime(start)} ${next.summary}`;
    return html`${icon(item.icon ?? "calendar")}<span>${label}</span>`;
  }

  /* ───────── Weiche Übergänge: Teile gleiten auf ihren Platz, verschwindende blenden aus ───────── */

  private lastParts = new Map<string, unknown>();
  private leaving = new Map<string, { tpl: unknown; until: number }>();
  private rects = new Map<string, DOMRect>();

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate?.(changed);
    // Positionen vor dem Neuzeichnen merken (FLIP)
    this.rects.clear();
    for (const el of this.renderRoot?.querySelectorAll?.<HTMLElement>(".part") ?? []) {
      if (el.dataset.key) this.rects.set(el.dataset.key, el.getBoundingClientRect());
    }
  }

  render() {
    const items = (this.options.items ?? []) as LineItem[];
    const rendered = items
      .map((item) => (item.show_if?.length && !item.show_if.every((c) => checkCondition(this.hass, c)) ? null : item))
      .map((item) => {
        if (!item) return null;
        const s = stateOf(this.hass, item.entity);
        switch (item.type) {
          case "weather":
            return s ? html`${iconSvg(weatherIcon(s.state))}<span class="num">${fmt(s.attributes.temperature, 0)}°</span><span>${weatherLabel(s.state)}</span>` : null;
          case "calendar": {
            const due = dueWithin(this.hass, item.entity, Number(item.days ?? 2));
            return due ? html`<span>${s?.attributes.message ?? ""} ${relDay(due)}</span>` : null;
          }
          case "entity": {
            if (!s) return null;
            const n = parseFloat(s.state);
            const v = Number.isFinite(n) ? `${fmt(n, 1)}${unitSuffix(s.attributes.unit_of_measurement)}` : s.state;
            return html`${item.icon ? icon(item.icon) : nothing}<span>${item.name ? `${item.name} ` : ""}${v}</span>`;
          }
          case "text":
            return item.text ? html`<span>${item.text}</span>` : null;
          case "agenda":
            return this.agenda(item);
          case "status": {
            if (!s || s.state !== String(item.state ?? "on")) return null;
            const open = (item.list ?? []).filter((l) => stateOf(this.hass, l.entity)?.state === "on");
            if (item.list?.length && !open.length) return null;
            const names = open.map((l) => l.name ?? nameOf(this.hass, l.entity)).join(", ");
            return html`${icon(item.icon ?? "info")}<span>${item.text ?? item.name ?? nameOf(this.hass, item.entity)}${names ? ` · ${names}` : ""}</span>`;
          }
          case "device": {
            const running = item.state ? item.state.split(",").map((x) => x.trim()) : RUNNING;
            if (!s || !running.includes(s.state)) return null;
            const pct = numberOf(this.hass, item.progress);
            const left = remainingMs(this.hass, item.remaining);
            const detail = valueOf(this.hass, item.detail);
            const bits = [
              item.name ?? nameOf(this.hass, item.entity),
              detail && !["unknown", "unavailable"].includes(String(detail)) ? String(detail) : "",
              pct != null ? `${fmt(pct, 0)} %` : "",
              left != null
                ? item.show_end
                  ? t("fertig {time}", { time: fmtTime(new Date(Date.now() + left)) })
                  : t("noch {time}", { time: duration(left) })
                : "",
              s.state.startsWith("pause") ? t("pausiert") : "",
            ].filter(Boolean);
            return html`${icon(item.icon ?? "washer")}<span>${bits.join(" · ")}</span>`;
          }
          case "media": {
            const ids = item.entities?.length ? item.entities : item.entity ? [item.entity] : [];
            const p = ids.map((id) => stateOf(this.hass, id)).find((x) => x?.state === "playing");
            if (!p) return null;
            const a = p.attributes;
            const title = [a.media_title, a.media_series_title ?? a.media_artist].filter(Boolean).join(" – ");
            // Ohne Titel nichts zeigen – z. B. wenn das Apple TV gerade Ambiframe selbst per AirPlay zeigt
            if (!title) return null;
            const what = `${title}${a.app_name ? ` (${a.app_name})` : ""}`;
            return html`${icon(item.icon ?? "tv")}<span>${item.name ?? String(a.friendly_name ?? "").replace(/\s+/g, " ")}: ${what}</span>`;
          }
          case "waste": {
            const groups = wasteGroups(this.hass, item);
            if (!groups.length) return null;
            const g = groups[this.turn % groups.length];
            const names = g.bins.map((b) => b.name);
            const label = names.length > 1 ? `${names.slice(0, -1).join(", ")} ${t("und")} ${names.at(-1)}` : names[0];
            return keyed(
              `${g.days}|${label}`,
              html`<span class="rot">${item.icon ? icon(item.icon) : nothing}${g.bins.map((b) => binIcon(b.name, b.color))}<span>${label} ${whenLabel(g.days)}</span></span>`,
            );
          }
          default:
            return null;
        }
      });
    // Verschwundene Teile noch kurz ausblenden lassen, statt sie hart zu entfernen
    const now = Date.now();
    rendered.forEach((tpl, i) => {
      const key = String(i);
      if (tpl) {
        this.lastParts.set(key, tpl);
        this.leaving.delete(key);
      } else if (this.lastParts.has(key) && this.shown && !this.leaving.has(key)) {
        this.leaving.set(key, { tpl: this.lastParts.get(key), until: now + LEAVE_MS });
        this.lastParts.delete(key);
        window.setTimeout(() => this.requestUpdate(), LEAVE_MS + 20);
      }
    });
    for (const [key, l] of this.leaving) if (l.until <= now) this.leaving.delete(key);
    const parts = rendered
      .map((tpl, i) => {
        const key = String(i);
        const gone = this.leaving.get(key);
        return tpl ? { key, tpl, out: false } : gone ? { key, tpl: gone.tpl, out: true } : null;
      })
      .filter((p): p is { key: string; tpl: unknown; out: boolean } => !!p);
    // Jedes Teil zusammenhalten (Punkt davor gehört dazu) – bricht die Zeile um, bleibt das Symbol bei seinem Text
    return html`<div class="line">
      ${repeat(
        parts,
        (p) => p.key,
        (p, i) => html`<span class="part ${p.out ? "out" : ""}" data-key=${p.key}>${i ? html`<span class="dot"></span>` : nothing}${p.tpl}</span>`,
      )}
    </div>`;
  }
}

define("af-value", AfValue);
define("af-rooms", AfRooms);
define("af-status", AfStatus);
define("af-calendar", AfCalendar);
define("af-infoline", AfInfoline);
