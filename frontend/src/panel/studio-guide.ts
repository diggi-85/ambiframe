/**
 * Geführtes Studio: fertige Stimmungen („Ruhig“, „Lebendig“ …) setzen viele Einstellungen auf einmal, die Details
 * liegen in zugeklappten Gruppen mit einer Zeile, was gerade eingestellt ist. Reine Daten und Funktionen – testbar.
 */
import { t } from "../i18n";
import type { EventConfig, MotionConfig, TransitionConfig } from "../types";

/* ───────── Bewegung (Aussehen) ───────── */

export interface MotionState {
  chart_motion?: string;
  motion?: Omit<MotionConfig, "style">;
  transition?: Partial<TransitionConfig>;
}

export const MOTION_MOODS: { id: string; name: string; hint: string; set: MotionState }[] = [
  { id: "still", name: "Still", hint: "Nichts bewegt sich – Seiten blenden sanft über", set: { chart_motion: "off", transition: { type: "fade", duration: 1.5 } } },
  { id: "calm", name: "Ruhig", hint: "Zahlen zählen, Balken wachsen, Karten kommen sanft nacheinander", set: {} },
  {
    id: "lively",
    name: "Lebendig",
    hint: "Flotter, Karten deutlich nacheinander, neue Werte leuchten auf, Seitenwechsel jedes Mal anders",
    set: { chart_motion: "soft", motion: { duration: 0.9, strength: "strong", stagger: "strong", highlight: "both" }, transition: { type: "random", duration: 1.6 } },
  },
  {
    id: "playful",
    name: "Verspielt",
    hint: "Federnd mit Nachschwingen, Seiten drehen sich um",
    set: { chart_motion: "spring", motion: { strength: "strong", stagger: "strong", highlight: "both" }, transition: { type: "flip", duration: 1.4 } },
  },
];

const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const empty = (o?: object) => (o && Object.keys(o).length ? o : undefined);

/** Welche Stimmung ist eingestellt? undefined = eigene Mischung */
export const motionMood = (s: MotionState): string | undefined =>
  MOTION_MOODS.find((m) => same(s.chart_motion, m.set.chart_motion) && same(empty(s.motion), m.set.motion) && same(empty(s.transition), m.set.transition))?.id;

const STYLE_NAME: Record<string, string> = { soft: "weich", spring: "federnd", fade: "einblenden", off: "aus" };
const TRANS_NAME: Record<string, string> = {
  fade: "Überblenden",
  blur: "Weich (Unschärfe)",
  slide: "Schieben",
  zoom: "Zoom",
  cube: "Würfel (3D)",
  flip: "Umdrehen (3D)",
  page: "Blättern",
  curtain: "Vorhang",
  circle: "Kreis aus der Mitte",
  rise: "Aufsteigen (Karten nacheinander)",
  random: "Zufällig – jedes Mal anders",
};

/** Eine Zeile: was ist bei der Bewegung eingestellt? */
export const motionSummary = (s: MotionState): string => {
  const m = s.motion ?? {};
  const trans = t(TRANS_NAME[s.transition?.type ?? "fade"]);
  if (s.chart_motion === "off") return [t("Zahlen und Diagramme still"), trans].join(" · ");
  return [
    t(STYLE_NAME[s.chart_motion ?? ""] ?? "wie der Stil"),
    `${String(m.duration ?? 1.1).replace(".", ",")} s`,
    m.stagger === "off" ? t("alle Karten zugleich") : m.stagger === "strong" ? t("Karten deutlich nacheinander") : t("Karten nacheinander"),
    m.highlight === "off" ? t("ohne Hervorhebung") : m.highlight === "arrow" ? t("Pfeil bei neuen Werten") : t("neue Werte leuchten auf"),
    trans,
  ].join(" · ");
};

/* ───────── Kamera und Musik (Momente) ───────── */

export interface EventMood {
  id: string;
  name: string;
  hint: string;
  /** Diese Felder setzt die Stimmung (fehlt ein Wert = Standard) */
  set: Partial<EventConfig>;
}

export const CAMERA_KEYS = ["pip_size", "pip_layout", "open_full", "full_duration"] as const;
export const CAMERA_MOODS: EventMood[] = [
  { id: "small", name: "Klein in der Ecke", hint: "Nur das Bild, Titel darauf", set: { pip_size: "small", pip_layout: "video" } },
  { id: "normal", name: "Normal", hint: "Bild mit Text darunter – Antippen zeigt es groß", set: {} },
  { id: "large", name: "Groß", hint: "Gut aus der Entfernung zu sehen", set: { pip_size: "large" } },
  { id: "full", name: "Gleich Vollbild", hint: "Sofort die ganze Fläche, nach 2 min zurück", set: { open_full: true, full_duration: 120 } },
];

export const MUSIC_KEYS = ["style", "mini_layout"] as const;
export const MUSIC_MOODS: EventMood[] = [
  { id: "pill", name: "Pille", hint: "Eine Zeile mit rundem Cover, solange Musik läuft", set: { style: "mini", mini_layout: "pill" } },
  { id: "card", name: "Karte", hint: "Cover und Titel in der Ecke, solange Musik läuft", set: { style: "mini" } },
  { id: "cover", name: "Großes Cover", hint: "Cover groß, Text darunter", set: { style: "mini", mini_layout: "cover" } },
  { id: "full", name: "Vollbild beim Liedwechsel", hint: "Kurz das Cover über den ganzen Bildschirm", set: { style: "fullscreen" } },
];

/** Welche Stimmung passt zum Moment? (nur die Felder der Stimmung zählen) */
export const eventMood = (ev: EventConfig, moods: EventMood[], keys: readonly string[]): string | undefined =>
  moods.find((m) => keys.every((k) => same((ev as unknown as Record<string, unknown>)[k], (m.set as Record<string, unknown>)[k])))?.id;

/** Stimmung anwenden: ihre Felder zurücksetzen, dann setzen */
export const applyEventMood = (ev: EventConfig, mood: EventMood, keys: readonly string[]): EventConfig => {
  const next = { ...ev } as unknown as Record<string, unknown>;
  for (const k of keys) delete next[k];
  return { ...(next as unknown as EventConfig), ...mood.set };
};

/* ───────── Gruppen eines Moments ───────── */

export const EVENT_GROUPS: { id: string; title: string; keys: string[] }[] = [
  { id: "trigger", title: "Auslöser", keys: ["entity", "entities", "from", "to", "event_types"] },
  {
    id: "look",
    title: "Darstellung",
    keys: [
      "page",
      "style",
      "mini_layout",
      "mini_full",
      "mini_position",
      "mini_size",
      "mini_cover",
      "mini_progress",
      "mini_background",
      "camera",
      "effect",
      "title",
      "where",
      "icon",
      "text",
      "text_attribute",
      "cost",
      "open_full",
      "both_full",
      "pip_tap",
      "full_duration",
      "pip_position",
      "pip_size",
      "pip_layout",
      "pip_snooze",
    ],
  },
  { id: "time", title: "Dauer und Erinnerung", keys: ["duration", "max", "hold_after", "cooldown", "interval", "mini_duration", "mini_paused", "reminder", "chip", "reminder_clear"] },
  { id: "sound", title: "Ton", keys: ["sound", "sound_repeat", "sound_interval", "volume"] },
  { id: "limits", title: "Wann nicht", keys: ["at_night", "quiet.after", "quiet.before", "quiet_action", "only_home", "show_if", "displays"] },
];

/** Gruppe eines Feldes (für die Suche) */
export const eventGroupOf = (key: string): string | undefined => EVENT_GROUPS.find((g) => g.keys.includes(key))?.id;

/** Eine Zeile je Gruppe: was ist eingestellt? */
export const eventGroupSummary = (id: string, ev: EventConfig, trigger: string): string => {
  if (id === "trigger") return trigger;
  if (id === "sound") return ev.sound ? [ev.sound, ev.volume != null ? `${ev.volume} %` : "", ev.sound_repeat === "loop" ? t("bis angetippt") : ""].filter(Boolean).join(" · ") : t("ohne Ton");
  if (id === "time") return [ev.duration ? `${ev.duration} s` : t("Standarddauer"), ev.cooldown ? t("Pause {n} s", { n: ev.cooldown }) : ""].filter(Boolean).join(" · ");
  if (id === "limits") {
    const parts = [
      ev.quiet?.after || ev.quiet?.before ? t("Ruhezeit {from}–{to}", { from: ev.quiet?.after ?? "…", to: ev.quiet?.before ?? "…" }) : "",
      ev.only_home ? t("nur wenn jemand zu Hause ist") : "",
      ev.at_night ? t("auch nachts") : "",
      ev.show_if?.length ? t("{n} Bedingungen", { n: ev.show_if.length }) : "",
    ].filter(Boolean);
    return parts.length ? parts.join(" · ") : t("keine Einschränkungen");
  }
  // Darstellung
  if (ev.kind === "live") return [ev.open_full ? t("gleich Vollbild") : ev.pip_size === "small" ? t("klein") : ev.pip_size === "large" ? t("groß") : t("normal"), ev.title].filter(Boolean).join(" · ");
  if (ev.kind === "media")
    return ev.style === "fullscreen"
      ? t("Vollbild")
      : ev.style === "mini"
        ? [t(ev.mini_layout === "pill" ? "Pille" : ev.mini_layout === "cover" ? "Großes Cover" : ev.mini_layout === "bar" ? "Leiste über die ganze Breite" : "Karte"), ev.mini_full ? t("Vollbild beim Liedwechsel") : ""].filter(Boolean).join(" + ")
        : t("Karte beim Liedwechsel");
  return ev.title || "–";
};

/* ───────── Gruppen im Aussehen ───────── */

export const LOOK_GROUPS: { id: string; title: string; keys: string[] }[] = [
  { id: "type", title: "Schrift und Lesbarkeit", keys: ["design.fonts.display", "design.fonts.text", "design.text_size", "design.contrast", "design.language"] },
  { id: "color", title: "Farben im Detail", keys: ["design.accent", "design.evening", "design.cover_players"] },
  { id: "ambient", title: "Atmosphäre im Detail", keys: ["design.ambient.strength", "design.ambient.speed", "design.ambient.color", "design.ambient.weather"] },
];

/** Gruppe eines Aussehen-Feldes (für die Suche); „motion“ = Bewegung → Anpassen */
export const lookGroupOf = (key: string): string | undefined =>
  key.startsWith("design.motion") || key.startsWith("design.transition") || key === "design.chart_motion" ? "motion" : LOOK_GROUPS.find((g) => g.keys.includes(key))?.id;

/* ───────── „Für alle Displays“ wirklich für alle ───────── */

/** Diese Design-Werte legt ein Display direkt fest (nicht unter design) */
const DISPLAY_TOP = new Set(["theme", "mode", "transition", "text_size", "contrast"]);

/**
 * Unter „Alle Displays“ gewählt = gilt für alle: die eigenen Werte der Displays für genau diese Einstellungen
 * entfernen (sonst gewinnen sie und auf keinem Display ändert sich etwas). Gibt die Namen der betroffenen Displays zurück.
 */
export const clearOverrides = (config: { displays: { name: string; design?: object }[] }, keys: string[]): string[] => {
  const touched: string[] = [];
  for (const d of config.displays) {
    const top = d as unknown as Record<string, unknown>;
    const design = (d.design ?? {}) as Record<string, unknown>;
    let hit = false;
    for (const k of keys) {
      if (k === "css") continue; // eigenes CSS eines Displays ergänzt das allgemeine, statt es zu ersetzen
      if (DISPLAY_TOP.has(k) && top[k] !== undefined) {
        delete top[k];
        hit = true;
      }
      if (design[k] !== undefined) {
        delete design[k];
        hit = true;
      }
    }
    if (d.design && !Object.keys(d.design).length) delete top.design;
    if (hit) touched.push(d.name);
  }
  return touched;
};

/** Welche Design-Werte haben sich geändert? (für Formulare unter „Alle Displays“) */
export const changedKeys = (before: object, after: object): string[] => {
  const a = before as Record<string, unknown>;
  const b = after as Record<string, unknown>;
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
};
