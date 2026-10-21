// Formatierung, Zustandshilfen und Bedingungen
import { locale, t } from "./i18n";
import { templateCondition } from "./template";
import type { AmbiframeConfig, Condition, ConditionContext, Hass, HassEntity } from "./types";


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
