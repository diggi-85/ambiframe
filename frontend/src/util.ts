// Formatierung, Zustandshilfen und Bedingungen
import { locale, t } from "./i18n";
import { templateCondition } from "./template";
import type { AmbiframeConfig, Condition, ConditionContext, Hass, HassEntity, HomeTickerItem } from "./types";


export const fmt = (n: unknown, digits = 1): string => {
  const v = typeof n === "number" ? n : parseFloat(String(n));
  return Number.isFinite(v)
    ? v.toLocaleString(locale(), { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : "–";
};

export const fmtTime = (d: Date): string => d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" });
export const fmtDate = (d: Date, style: "long" | "short" = "long"): string =>
  style === "long"
    ? d.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })
    : d.toLocaleDateString(locale(), { weekday: "short", day: "numeric", month: "short" });
export const weekdayShort = (d: Date): string => d.toLocaleDateString(locale(), { weekday: "short" }).replace(".", "");

export const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
export const dayDiff = (d: Date): number => Math.round((startOfDay(d).getTime() - startOfDay(new Date()).getTime()) / 864e5);
export const relDay = (d: Date): string =>
  [t("heute"), t("morgen"), t("übermorgen")][dayDiff(d)] ?? d.toLocaleDateString(locale(), { weekday: "long" });

export const duration = (ms: number): string => {
  const m = Math.max(1, Math.round(ms / 60e3));
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")} h`;
};

export const compass = (b: unknown): string =>
  typeof b === "number" ? ["N", "NO", "O", "SO", "S", "SW", "W", "NW"][Math.round(b / 45) % 8] : String(b ?? "");

/** Datum aus Kalender-Attribut („2026-10-14 00:00:00“) oder ISO-String lesen. */
export const parseDate = (v: unknown): Date | null => {
  if (!v) return null;
  const d = new Date(String(v).replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? null : d;
};

export const stateOf = (hass: Hass | undefined, id?: string): HassEntity | undefined =>
  id ? hass?.states[id] : undefined;

export const valueOf = (hass: Hass | undefined, id?: string, attribute?: string): unknown => {
  const s = stateOf(hass, id);
  if (!s) return undefined;
  return attribute ? s.attributes?.[attribute] : s.state;
};

export const numberOf = (hass: Hass | undefined, id?: string, attribute?: string): number | null => {
  const n = parseFloat(String(valueOf(hass, id, attribute)));
  return Number.isFinite(n) ? n : null;
};

export const nameOf = (hass: Hass | undefined, id?: string): string =>
  (stateOf(hass, id)?.attributes.friendly_name as string) ?? id ?? "";

export const isAvailable = (s?: HassEntity): boolean => !!s && s.state !== "unavailable" && s.state !== "unknown";

/** Bereichsname einer Entität (direkt oder über das Gerät). */
export const areaOf = (hass: Hass, id: string): string | undefined => {
  const entry = hass.entities?.[id];
  const areaId = entry?.area_id ?? (entry?.device_id ? hass.devices?.[entry.device_id]?.area_id : undefined);
  return areaId ? hass.areas?.[areaId]?.name : undefined;
};

const minutesOf = (hhmm?: string): number | null => {
  const m = hhmm?.match(/^(\d{1,2}):(\d{2})$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
};

export function checkCondition(hass: Hass | undefined, c: Condition, ctx?: ConditionContext): boolean {
  switch (c.condition) {
    case "and":
      return (c.conditions ?? []).every((x) => checkCondition(hass, x, ctx));
    case "or":
      return (c.conditions ?? []).some((x) => checkCondition(hass, x, ctx));
    case "not":
      return !(c.conditions ?? []).some((x) => checkCondition(hass, x, ctx));
    case "display":
      return !ctx?.display || !c.displays?.length || c.displays.includes(ctx.display);
    case "orientation":
      return !ctx?.orientation || ctx.orientation === c.orientation;
    case "template":
      return !!hass && !!c.value_template && templateCondition(hass, c.value_template);
    case "changed": {
      const s = stateOf(hass, c.entity);
      if (!s) return false;
      const wanted = c.state === undefined || c.state === "" ? null : (Array.isArray(c.state) ? c.state : [c.state]).map(String);
      if (wanted && !wanted.includes(s.state)) return false;
      return Date.now() - new Date(s.last_changed).getTime() <= (Number(c.minutes) || 10) * 60e3;
    }
  }
  if (c.condition === "time") {
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    const after = minutesOf(c.after);
    const before = minutesOf(c.before);
    if (after !== null && before !== null && after > before) return now >= after || now < before; // über Mitternacht
    return (after === null || now >= after) && (before === null || now < before);
  }
  if (!hass) return true;
  switch (c.condition) {
    case "state":
    case "not_state": {
      const v = String(valueOf(hass, c.entity, c.attribute));
      const match = (Array.isArray(c.state) ? c.state : [c.state]).map(String).includes(v);
      return c.condition === "state" ? match : !match;
    }
    case "numeric": {
      const n = numberOf(hass, c.entity, c.attribute);
      if (n === null) return false;
      return (c.above === undefined || n > c.above) && (c.below === undefined || n < c.below);
    }
    case "any_state": {
      const wanted = (Array.isArray(c.state) ? c.state : [c.state]).map(String);
      return (c.entities ?? []).some((id) => wanted.includes(String(hass.states[id]?.state)));
    }
    case "within_days": {
      const d = parseDate(valueOf(hass, c.entity, c.attribute ?? (c.entity.startsWith("calendar.") ? "start_time" : undefined)));
      if (!d) return false;
      const diff = dayDiff(d);
      return diff >= 0 && diff <= c.days;
    }
    default:
      return true;
  }
}

export const checkConditions = (hass: Hass | undefined, conds?: Condition[], ctx?: ConditionContext): boolean =>
  !conds?.length || conds.every((c) => checkCondition(hass, c, ctx));

/** Ist eine Entität im kommenden Zeitraum fällig? (Müll, Termine) */
export const dueWithin = (hass: Hass | undefined, id: string | undefined, days: number): Date | null => {
  if (!id) return null;
  const d = parseDate(valueOf(hass, id, id.startsWith("calendar.") ? "start_time" : undefined));
  if (!d) return null;
  const diff = dayDiff(d);
  return diff >= 0 && diff <= days ? d : null;
};

/** Einzelheiten hinter einer Laufband-Zeile (Antippen): Titel, Text und Wertepaare */
export interface TickerDetail {
  title: string;
  body?: string;
  rows?: { name: string; value: string }[];
}
export type TickerLine = { icon?: string; text: string; tone?: "warn" | "bad"; detail?: TickerDetail; /** Text ohne „seit …“ – für Zeilen, die nach dem Ende stehen bleiben */ base?: string };

/** Stufen von NINA/Wetterwarnungen (severity) und der DWD (warning_N_level 1–4) → Wort und Farbe der Zeile */
const WARN_LEVEL: Record<string, ["Hinweis" | "Warnung" | "Unwetter" | "Extrem", "warn" | "bad"]> = {
  minor: ["Hinweis", "warn"],
  moderate: ["Warnung", "warn"],
  severe: ["Unwetter", "bad"],
  extreme: ["Extrem", "bad"],
};
const DWD_LEVEL = ["", "minor", "moderate", "severe", "extreme"];

/**
 * Aktive Warnungen als Zeilen mit ihrem Text: NINA/Wetter-Binärsensoren (headline, severity, expires) und DWD-Sensoren
 * (warning_count, warning_N_headline/_name/_level/_end). Ohne `ids` automatisch alles, was so aussieht.
 */
export const warningLines = (hass: Hass | undefined, ids?: string[]): TickerLine[] => {
  const states = hass?.states ?? {};
  const list = ids?.length ? ids : Object.keys(states);
  const lines: TickerLine[] = [];
  const line = (headline: unknown, level: string, until: unknown, more: { description?: unknown; instruction?: unknown; sender?: unknown } = {}) => {
    const [word, tone] = WARN_LEVEL[level.toLowerCase()] ?? WARN_LEVEL.moderate;
    const end = parseDate(until);
    const text = String(headline).replace(/\s+/g, " ").trim().slice(0, 160);
    const body = [more.description, more.instruction].filter(Boolean).map((x) => String(x).trim()).join("\n\n").slice(0, 1200);
    const rows = [{ name: t("Stufe"), value: t(word) }, ...(more.sender ? [{ name: t("Sender"), value: String(more.sender) }] : []), ...(end ? [{ name: t("Gültig bis"), value: `${relDay(end)} ${fmtTime(end)}` }] : [])];
    lines.push({ icon: "mdi:alert", tone, text: `${t(word)}: ${text}${end ? ` · ${t("bis {when}", { when: `${relDay(end)} ${fmtTime(end)}` })}` : ""}`, detail: { title: text, body: body || undefined, rows } });
  };
  for (const id of list) {
    const s = states[id];
    if (!s || !isAvailable(s)) continue;
    const a = s.attributes;
    if (id.startsWith("binary_sensor.") && s.state === "on" && a.headline && (ids?.length || a.sender !== undefined || a.severity !== undefined)) line(a.headline, String(a.severity ?? "moderate"), a.expires, { description: a.description, instruction: a.recommended_actions ?? a.instruction, sender: a.sender });
    else if (id.startsWith("sensor.") && Number(a.warning_count) > 0) {
      for (let n = 1; n <= Number(a.warning_count); n++) {
        const headline = a[`warning_${n}_headline`] ?? a[`warning_${n}_name`];
        if (headline) line(headline, DWD_LEVEL[Number(a[`warning_${n}_level`])] ?? "moderate", a[`warning_${n}_end`], { description: a[`warning_${n}_description`], instruction: a[`warning_${n}_instruction`] });
      }
    }
  }
  return lines;
};

const minutesSince = (s: HassEntity, now: number) => Math.floor((now - new Date(s.last_changed).getTime()) / 60e3);
const sinceText = (min: number) => (min >= 1 ? (min < 90 ? t("seit {n} min", { n: min }) : t("seit {n} h", { n: Math.round(min / 60) })) : "");
const nameOfEntity = (s: HassEntity | undefined, id?: string) => (s?.attributes.friendly_name as string | undefined) || id || "";

/** Zustand als lesbarer Text: Zeitpunkte als Uhrzeit (morgen/Wochentag), Zahlen mit Einheit, unbekannt als „–“ */
const stateText = (hass: Hass | undefined, s: HassEntity | undefined): string => {
  if (!isAvailable(s)) return "–";
  const unit = s!.attributes.unit_of_measurement as string | undefined;
  if (s!.attributes.device_class === "timestamp") {
    const d = parseDate(s!.state);
    return d ? `${dayDiff(d) === 0 ? "" : `${relDay(d)} `}${fmtTime(d)}` : "–";
  }
  const n = Number(s!.state);
  if (s!.state !== "" && Number.isFinite(n)) return `${fmt(n, Math.abs(n) >= 100 || Number.isInteger(n) ? 0 : 1)}${unit ? ` ${unit}` : ""}`;
  // Zustände wie Home Assistant sie anzeigt („Hauptbürste blockiert“ statt „main_brush_jammed“)
  const format = (hass as { formatEntityState?: (s: HassEntity) => string } | undefined)?.formatEntityState;
  return format ? format(s!) : s!.state;
};

/**
 * Platzhalter im Text einer Zeile: {state} = Zustand der Entität, {message} = eines ihrer Attribute,
 * {sensor.ladestand} = Zustand einer anderen Entität. Unbekanntes bleibt stehen, damit Tippfehler auffallen.
 */
export const fillText = (hass: Hass | undefined, text: string, s?: HassEntity): string =>
  text.replace(/\{([a-z_]+(?:\.[a-z0-9_]+)?)\}/g, (m, key: string) => {
    if (key.includes(".")) return hass?.states[key] ? stateText(hass, hass.states[key]) : m;
    if (key === "state") return stateText(hass, s);
    const v = s?.attributes[key];
    return v == null ? m : String(v);
  });

/** Trifft die Bedingung der Zeile (Zustand oder Schwelle, „erst nach“) für diese Entität zu? */
const matches = (s: HassEntity | undefined, it: HomeTickerItem, now: number): s is HassEntity => {
  if (!isAvailable(s)) return false;
  const numeric = it.above != null || it.below != null;
  const n = parseFloat(s!.state);
  // Zustand: mehrere mit Komma („cleaning,returning“), „!“ davor = alle außer diesen („!none“)
  const want = String(it.state ?? "on").trim();
  const not = want.startsWith("!");
  const list = (not ? want.slice(1) : want).split(",").map((x) => x.trim());
  const hit = numeric ? Number.isFinite(n) && (it.above == null || n > Number(it.above)) && (it.below == null || n < Number(it.below)) : list.includes(s!.state) !== not;
  return hit && !(it.after && minutesSince(s!, now) < Number(it.after));
};

/** Wert einer Entität als Text (mit Einheit) oder „seit …“ bei Zuständen */
const valueText = (s: HassEntity, it: HomeTickerItem, now: number) => {
  if (it.above != null || it.below != null) {
    const n = parseFloat(s.state);
    const unit = s.attributes.unit_of_measurement as string | undefined;
    return `${fmt(n, Math.abs(n) >= 100 ? 0 : 1)}${unit ? ` ${unit}` : ""}`;
  }
  return sinceText(minutesSince(s, now)) || t("gerade");
};

/** Zeilen einer einzelnen Konfigurationszeile, die jetzt zutreffen */
const hitLines = (hass: Hass | undefined, it: HomeTickerItem, now: number): TickerLine[] => {
  const withDetail = (l: TickerLine, detail: TickerDetail): TickerLine => (it.detail === false ? l : { ...l, detail });
  if (it.kind === "warnings") return warningLines(hass, it.warn_entities).map((l) => ({ ...l, icon: it.icon ?? l.icon, detail: it.detail === false ? undefined : l.detail }));
  if (it.kind === "batteries") {
    const low = batteryOverview(hass, { threshold: Number(it.below ?? 15), exclude: it.exclude }).low;
    const rows = low.map((b) => ({ name: b.name, value: b.level == null ? t("schwach") : `${fmt(b.level, 0)} %` }));
    return low.map((b) => withDetail({ icon: it.icon ?? "mdi:battery-alert", text: `${it.text || t("Akku")} ${b.name}${b.level == null ? "" : ` ${fmt(b.level, 0)} %`}` }, { title: t("Schwache Akkus"), rows }));
  }
  if (it.kind === "group") {
    const hits = (it.entities ?? []).map((id) => ({ id, s: stateOf(hass, id) })).filter((h) => matches(h.s, it, now)) as { id: string; s: HassEntity }[];
    if (hits.length < Math.max(1, Number(it.min) || 1)) return [];
    const names = it.names === "area" ? [...new Set(hits.map((h) => (hass && areaOf(hass, h.id)) || nameOfEntity(h.s, h.id)))] : hits.map((h) => nameOfEntity(h.s, h.id));
    const text = (it.text || "{names}").replace(/\{n\}/g, String(hits.length)).replace(/\{names\}/g, names.join(", "));
    const rows = hits.map((h) => ({ name: it.names === "area" ? `${(hass && areaOf(hass, h.id)) || nameOfEntity(h.s, h.id)} · ${nameOfEntity(h.s, h.id)}` : nameOfEntity(h.s, h.id), value: valueText(h.s, it, now) }));
    return [withDetail({ icon: it.icon, text, base: text }, { title: text, rows })];
  }
  const s = stateOf(hass, it.entity);
  if (!matches(s, it, now)) return [];
  const numeric = it.above != null || it.below != null;
  const n = parseFloat(s.state);
  const min = minutesSince(s, now);
  const name = it.text ? fillText(hass, it.text, s) : nameOfEntity(s, it.entity);
  const unit = s.attributes.unit_of_measurement as string | undefined;
  // Bei Werten ist last_changed die letzte Änderung des Werts, nicht der Moment der Überschreitung – daher ohne „seit“
  const tail = numeric ? ` ${fmt(n, Math.abs(n) >= 100 ? 0 : 1)}${unit ? ` ${unit}` : ""}` : min >= 1 ? ` · ${sinceText(min)}` : "";
  const when = new Date(s.last_changed);
  return [
    withDetail({ icon: it.icon, text: `${name}${tail}`, base: name }, {
      title: name,
      rows: [{ name: t("Zustand"), value: numeric ? `${fmt(n, 1)}${unit ? ` ${unit}` : ""}` : s.state }, { name: t("Seit"), value: `${fmtTime(when)} · ${ago(when)}` }],
    }),
  ];
};

/** Zuletzt gezeigte Zeilen je Eintrag – damit Ereignisse nach ihrem Ende noch `hold` Minuten stehen bleiben */
export type TickerMemory = Map<string, { at: number; line: TickerLine }>;

/**
 * Zeilen des Laufbands für Zuhause, die gerade zutreffen – oder noch stehen bleiben (hold). Warnungen laufen vorweg.
 * shortcut: das Erinnern liegt im Speicher der Seite; nach einem Neuladen erkennen nur Ein/Aus-Sensoren (Bewegung,
 * Klingel) ein gerade beendetes Ereignis wieder (über ihre letzte Änderung).
 */
export const tickerLines = (hass: Hass | undefined, items?: HomeTickerItem[], now = Date.now(), displayId?: string, memory?: TickerMemory): TickerLine[] => {
  const out: TickerLine[] = [];
  (items ?? []).forEach((it, idx) => {
    if (it.enabled === false || (it.displays?.length && displayId && !it.displays.includes(displayId))) return;
    const lines = hitLines(hass, it, now);
    const hold = Number(it.hold) || 0;
    if (hold > 0) {
      const seen = new Set<string>();
      for (const l of lines) {
        const key = `${idx}|${l.base ?? l.text}`;
        seen.add(key);
        memory?.set(key, { at: now, line: l });
      }
      for (const [key, m] of memory ?? []) {
        if (!key.startsWith(`${idx}|`) || seen.has(key) || now - m.at >= hold * 60e3) continue;
        lines.push({ ...m.line, text: `${m.line.base ?? m.line.text} · ${ago(new Date(m.at))}` });
        seen.add(key);
      }
      // Nach einem Neuladen: ein Ein/Aus-Sensor, der gerade wieder auf „aus“ ging, war eben noch an
      const s = !it.kind ? stateOf(hass, it.entity) : undefined;
      if (!lines.length && s && isAvailable(s) && (it.state ?? "on") === "on" && s.state === "off" && /^(binary_sensor|input_boolean|switch)\./.test(it.entity ?? "") && now - new Date(s.last_changed).getTime() < hold * 60e3)
        lines.push({ icon: it.icon, text: `${it.text || nameOfEntity(s, it.entity)} · ${ago(new Date(s.last_changed))}`, base: it.text || nameOfEntity(s, it.entity) });
    }
    out.push(...lines);
  });
  if (memory) for (const [k, m] of memory) if (now - m.at > 3600e3) memory.delete(k);
  // Warnungen laufen vorweg
  return out.sort((a, b) => (b.tone === "bad" ? 2 : b.tone ? 1 : 0) - (a.tone === "bad" ? 2 : a.tone ? 1 : 0));
};

/** „gerade“, „vor 12 min“, „vor 3 h“, „gestern 18:04“ */
export const ago = (iso?: string | Date): string => {
  if (!iso) return "";
  const when = typeof iso === "string" ? new Date(iso) : iso;
  const min = Math.round((Date.now() - when.getTime()) / 60e3);
  if (min < 1) return t("gerade");
  if (min < 60) return t("vor {n} min", { n: min });
  if (min < 12 * 60) return t("vor {n} h", { n: Math.round(min / 60) });
  return dayDiff(when) === -1 ? t("gestern {time}", { time: fmtTime(when) }) : when.toLocaleDateString(locale(), { weekday: "short", day: "numeric", month: "short" });
};

/** Zustand einer Person/eines Trackers lesbar: home → Zuhause, not_home → Unterwegs, Zone → Name der Zone. */
export const placeOf = (hass: Hass | undefined, state?: string): string => {
  if (!state) return "–";
  if (state === "home") return t("Zuhause");
  if (state === "not_home") return t("Unterwegs");
  const zone = Object.values(hass?.states ?? {}).find((s) => s.entity_id.startsWith("zone.") && (s.attributes.friendly_name === state || s.entity_id === `zone.${state}`));
  return (zone?.attributes.friendly_name as string) ?? state;
};

/** Entfernung in km zwischen zwei Koordinaten (Haversine). */
export const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const r = (d: number) => (d * Math.PI) / 180;
  const a = Math.sin(r(lat2 - lat1) / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(r(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/** Tage bis zur Abholung: Zahl, Datum „TT.MM.JJJJ“ oder Datums-Attribute (waste_collection_schedule) */
export const binDays = (hass: Hass | undefined, id: string): number | null => {
  const s = stateOf(hass, id);
  if (!s) return null;
  const n = parseFloat(s.state);
  if (Number.isFinite(n) && /^\d+(\.\d+)?$/.test(s.state.trim())) return n;
  const m = s.state.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (m) return dayDiff(new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
  const dates = Object.keys(s.attributes).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
  const next = dates.map((d) => parseDate(d)).find((d) => d && dayDiff(d) >= 0);
  return next ? dayDiff(next) : null;
};

/** Eigenes CSS in einem Shadow-Root halten (ein <style>, nur bei Änderung neu) */
export const customStyle = (root: ParentNode, text?: string): void => {
  let el = [...(root as Element).children].find((x) => x.classList.contains("af-custom")) as HTMLStyleElement | undefined;
  if (!text?.trim()) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("style");
    el.className = "af-custom";
    root.appendChild(el);
  }
  if (el.textContent !== text) el.textContent = text;
};

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** Objekte zusammenführen: Werte aus `over` gewinnen, verschachtelte Objekte (Farben, Schriften) werden gemischt. */
const merge = <T extends Record<string, unknown>>(base: T, over?: Record<string, unknown>): T => {
  if (!over) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = isObj(v) && isObj(out[k]) ? merge(out[k] as Record<string, unknown>, v) : v;
  }
  return out as T;
};

/** Konfiguration aus Sicht eines Displays: dessen Design- und Foto-Vorgaben über die allgemeinen gelegt. */
export const effectiveConfig = (config: AmbiframeConfig | undefined, displayId?: string): AmbiframeConfig | undefined => {
  const d = config?.displays.find((x) => x.id === displayId);
  if (!config || !d || (!d.design && !d.photos)) return config;
  const design = merge(config.design as Record<string, unknown>, d.design as Record<string, unknown>) as AmbiframeConfig["design"];
  // Eigenes CSS ergänzt das allgemeine statt es zu ersetzen
  if (d.design?.css && config.design.css) design.css = `${config.design.css}\n${d.design.css}`;
  return {
    ...config,
    design,
    photos: merge(config.photos as Record<string, unknown>, d.photos as Record<string, unknown>) as AmbiframeConfig["photos"],
  };
};

/* ───────── Akkus ───────── */

export interface BatteryItem {
  id: string;
  name: string;
  /** Prozent, null bei reinem „schwach“-Melder */
  level: number | null;
  charging: boolean;
  kind: "phone" | "tablet" | "watch" | "other";
}

export interface BatteryOptions {
  /** Immer zeigen (z. B. iPhones, iPads, Watches); leer = automatisch aus der Companion-App */
  devices?: (string | { entity: string; name?: string })[];
  /** Zubehör erscheint unter diesem Wert (Standard 21 %) */
  threshold?: number;
  exclude?: string[];
}

const BATTERY_SUFFIX = /\s*(battery level|batteriestand|batterie|battery|akku)\s*$/i;
const LOW_TEXT = /^(low|niedrig|schwach|critical|kritisch)$/i;

const batteryKind = (text: string): BatteryItem["kind"] =>
  /watch/i.test(text) ? "watch" : /ipad|tablet|tab[ _]/i.test(text) ? "tablet" : /iphone|phone|pixel|galaxy/i.test(text) ? "phone" : "other";

/**
 * Akku-Übersicht: Geräte (immer, mit Ladezustand) und Zubehör, dessen Batterie unter `threshold` liegt
 * (oder das „schwach“ meldet). Geräte der Companion-App: …_battery_level mit passendem …_battery_state.
 */
export const batteryOverview = (hass: Hass | undefined, o: BatteryOptions = {}): { devices: BatteryItem[]; low: BatteryItem[] } => {
  const states = hass?.states ?? {};
  const threshold = Number(o.threshold ?? 21);
  const exclude = new Set(o.exclude ?? []);
  const nameOfState = (id: string) => String(states[id]?.attributes.friendly_name ?? id).replace(BATTERY_SUFFIX, "").trim();
  const listed = (o.devices ?? []).map((d) => (typeof d === "string" ? { entity: d } : d)).filter((d) => d.entity);
  const auto = Object.keys(states)
    .filter((id) => id.startsWith("sensor.") && id.endsWith("_battery_level") && states[id.replace(/_level$/, "_state")])
    .map((entity) => ({ entity, name: undefined as string | undefined }));
  const devices = (listed.length ? listed : auto)
    .filter((d) => states[d.entity] && !exclude.has(d.entity))
    .map((d): BatteryItem => {
      const s = states[d.entity];
      const level = parseFloat(s.state);
      const charge = states[d.entity.replace(/_level$/, "_state")]?.state ?? "";
      const name = d.name || nameOfState(d.entity);
      return {
        id: d.entity,
        name,
        level: Number.isFinite(level) ? level : null,
        charging: /^(charging|full|lädt|voll)$/i.test(charge) || s.attributes.is_charging === true,
        kind: batteryKind(`${d.entity} ${name}`),
      };
    });
  const skip = new Set(devices.flatMap((d) => [d.id, d.id.replace(/_level$/, "_state")]));
  const low: BatteryItem[] = [];
  for (const [id, s] of Object.entries(states)) {
    if (skip.has(id) || exclude.has(id) || s.attributes.device_class !== "battery") continue;
    if (s.state === "unavailable" || s.state === "unknown") continue;
    if (id.startsWith("binary_sensor.")) {
      if (s.state === "on") low.push({ id, name: nameOfState(id), level: null, charging: false, kind: "other" });
      continue;
    }
    if (!id.startsWith("sensor.")) continue;
    const level = parseFloat(s.state);
    if (Number.isFinite(level) ? s.attributes.unit_of_measurement === "%" && level < threshold : LOW_TEXT.test(s.state)) {
      low.push({ id, name: nameOfState(id), level: Number.isFinite(level) ? level : null, charging: false, kind: "other" });
    }
  }
  low.sort((a, b) => (a.level ?? -1) - (b.level ?? -1));
  return { devices, low };
};
