// Design-Tokens: sieben Stile, jeder hell und dunkel, dazu Abend, Nacht, Fotos und gemeinsame Widget-Stile
import { css, unsafeCSS } from "lit";
import { digitFamily, fontStack } from "./fonts";
import type { AmbientKind, ColorSet, MotionConfig, Theme } from "./types";

type Tokens = Record<string, string>;

interface ThemeDef {
  id: Theme;
  name: string;
  hint: string;
  /** Hintergrund-Animation, wenn im Design nichts anderes gewählt ist */
  ambient: AmbientKind;
  /** Widgets ohne eigene Fläche automatisch als Kachel zeigen */
  tiles?: boolean;
  /** Uhr und Abfahrten als Fallblatt-Anzeige */
  flap?: boolean;
  /** Nur intern (Jahreszeiten) – nicht in der Auswahl */
  hidden?: boolean;
  /** Ränder der Seite als Faktor (1 = normal): mehr Luft oder mehr Fläche */
  air?: number;
  /** Ganz ohne Bewegung (E-Ink): keine Animationen, Übergänge, Effekte, Farbverläufe */
  still?: boolean;
  /** Schriften und Formen – gelten hell wie dunkel */
  shared: Tokens;
  dark: Tokens;
  light: Tokens;
}

const SERIF = fontStack("fraunces");
const SANS = fontStack("inter");

/** Grundwerte dunkel/hell („Ruhig“); die übrigen Stile überschreiben nur, was sie anders machen. */
const DARK: Tokens = {
  bg: "#0a0d0b",
  "bg-art": "none",
  ink: "#ede7db",
  "ink-2": "rgba(237, 231, 219, 0.66)",
  "ink-3": "rgba(237, 231, 219, 0.4)",
  line: "rgba(237, 231, 219, 0.1)",
  surface: "rgba(237, 231, 219, 0.045)",
  accent: "#d6a865",
  "accent-soft": "rgba(214, 168, 101, 0.14)",
  cold: "#9dbad6",
  alert: "#ef8b63",
  good: "#9cc5a1",
  panel: "rgba(18, 21, 19, 0.92)",
  chip: "rgba(10, 13, 11, 0.62)",
  shadow: "0 30px 80px rgba(0, 0, 0, 0.55)",
  veil: "rgba(6, 9, 7, 0.52)",
  colon: "inherit",
  "colon-opacity": "0.55",
  mist: "rgba(255, 255, 255, 0.07)",
};

const LIGHT: Tokens = {
  bg: "#f2ede3",
  "bg-art": "none",
  ink: "#1e1b16",
  "ink-2": "rgba(30, 27, 22, 0.64)",
  "ink-3": "rgba(30, 27, 22, 0.42)",
  line: "rgba(30, 27, 22, 0.11)",
  surface: "rgba(255, 255, 255, 0.55)",
  accent: "#9a7334",
  "accent-soft": "rgba(154, 115, 52, 0.13)",
  cold: "#3d6a8f",
  alert: "#c0552f",
  good: "#4f8a5b",
  panel: "rgba(250, 247, 240, 0.95)",
  chip: "rgba(250, 247, 240, 0.8)",
  shadow: "0 30px 80px rgba(60, 45, 20, 0.16)",
  veil: "rgba(242, 237, 227, 0.55)",
  colon: "inherit",
  "colon-opacity": "0.5",
  mist: "rgba(120, 100, 70, 0.07)",
};

const SHARED: Tokens = {
  display: SERIF,
  sans: SANS,
  "clock-weight": "300",
  "clock-track": "-0.02em",
};

/** Karten ohne Fläche, nur eine feine Linie oben (Editorial, Minimal) */
const RULED: Tokens = {
  card: "transparent",
  "card-tint": "transparent",
  "card-border": "0 solid transparent",
  "card-radius": "0",
  "card-pad": "26px 0 0",
};

const blobs = (a: string, b: string, c: string) =>
  `radial-gradient(60% 70% at 12% 18%, ${a}, transparent 62%), radial-gradient(55% 65% at 88% 26%, ${b}, transparent 62%), radial-gradient(75% 70% at 58% 100%, ${c}, transparent 64%)`;

/** Schreibmaschinen-/Monitorschrift: auf jedem Gerät vorhanden */
const MONO = 'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, "Liberation Mono", monospace';

/** Eine Jahreszeit oder ein Anlass für „Jahreszeiten“ – nicht einzeln wählbar */
const season = (id: Theme, name: string, ambient: AmbientKind, dark: Tokens, light: Tokens): ThemeDef => ({
  id,
  name,
  hint: "",
  ambient,
  hidden: true,
  shared: { ...SHARED, "label-case": "none", "label-track": "0.02em", "label-weight": "600", "label-color": "var(--af-accent)" },
  dark: { ...DARK, ...dark },
  light: { ...LIGHT, ...light },
});
const ink = (rgb: string): Tokens => ({ ink: `rgb(${rgb})`, "ink-2": `rgba(${rgb}, 0.72)`, "ink-3": `rgba(${rgb}, 0.48)`, line: `rgba(${rgb}, 0.12)` });

const SEASONS: ThemeDef[] = [
  season(
    "saison-weihnachten",
    "Weihnachten",
    "snow",
    { bg: "#0f1d17", "bg-art": blobs("rgba(168, 50, 42, 0.32)", "rgba(212, 169, 79, 0.2)", "rgba(40, 110, 70, 0.32)"), ...ink("245, 239, 228"), accent: "#d4a94f", "accent-soft": "rgba(212, 169, 79, 0.15)", alert: "#d0574a" },
    { bg: "#f6f1e7", "bg-art": blobs("rgba(190, 60, 50, 0.16)", "rgba(212, 169, 79, 0.2)", "rgba(60, 120, 80, 0.16)"), ...ink("35, 52, 43"), accent: "#a8322a", "accent-soft": "rgba(168, 50, 42, 0.12)" },
  ),
  season(
    "saison-silvester",
    "Silvester",
    "fireworks",
    { bg: "#08090f", "bg-art": blobs("rgba(120, 80, 200, 0.26)", "rgba(232, 198, 107, 0.18)", "rgba(40, 80, 180, 0.26)"), ...ink("244, 240, 230"), accent: "#e8c66b", "accent-soft": "rgba(232, 198, 107, 0.15)" },
    { bg: "#f5f0e6", "bg-art": blobs("rgba(168, 129, 47, 0.18)", "rgba(120, 90, 180, 0.12)", "rgba(80, 110, 190, 0.12)"), ...ink("30, 28, 40"), accent: "#a8812f", "accent-soft": "rgba(168, 129, 47, 0.12)" },
  ),
  season(
    "saison-valentin",
    "Valentinstag",
    "hearts",
    { bg: "#1f0f16", "bg-art": blobs("rgba(255, 107, 139, 0.3)", "rgba(180, 60, 120, 0.24)", "rgba(255, 160, 140, 0.18)"), ...ink("255, 236, 240"), accent: "#ff6b8b", "accent-soft": "rgba(255, 107, 139, 0.16)" },
    { bg: "#fff1f3", "bg-art": blobs("rgba(255, 150, 170, 0.35)", "rgba(240, 120, 160, 0.22)", "rgba(255, 200, 180, 0.3)"), ...ink("70, 30, 45"), accent: "#d94a6a", "accent-soft": "rgba(217, 74, 106, 0.12)" },
  ),
  season(
    "saison-ostern",
    "Ostern",
    "blossoms",
    { bg: "#1b1d26", "bg-art": blobs("rgba(201, 182, 255, 0.24)", "rgba(250, 220, 120, 0.18)", "rgba(140, 220, 180, 0.2)"), ...ink("243, 241, 250"), accent: "#c9b6ff", "accent-soft": "rgba(201, 182, 255, 0.15)" },
    { bg: "#f7f5ec", "bg-art": blobs("rgba(250, 225, 120, 0.4)", "rgba(170, 225, 190, 0.38)", "rgba(205, 185, 245, 0.4)"), ...ink("50, 45, 70"), accent: "#8a6fd1", "accent-soft": "rgba(138, 111, 209, 0.12)" },
  ),
  season(
    "saison-halloween",
    "Halloween",
    "fireflies",
    { bg: "#120d14", "bg-art": blobs("rgba(255, 138, 42, 0.26)", "rgba(110, 50, 140, 0.3)", "rgba(80, 140, 60, 0.14)"), ...ink("243, 231, 214"), accent: "#ff8a2a", "accent-soft": "rgba(255, 138, 42, 0.15)" },
    { bg: "#f6ece0", "bg-art": blobs("rgba(240, 140, 60, 0.26)", "rgba(140, 90, 170, 0.18)", "rgba(200, 160, 90, 0.2)"), ...ink("45, 30, 40"), accent: "#d4641c", "accent-soft": "rgba(212, 100, 28, 0.12)" },
  ),
  season(
    "saison-fruehling",
    "Frühling",
    "blossoms",
    { bg: "#13181a", "bg-art": blobs("rgba(244, 166, 192, 0.24)", "rgba(140, 200, 130, 0.22)", "rgba(250, 230, 150, 0.14)"), ...ink("240, 244, 236"), accent: "#f4a6c0", "accent-soft": "rgba(244, 166, 192, 0.15)" },
    { bg: "#f4f6ee", "bg-art": blobs("rgba(244, 180, 200, 0.35)", "rgba(160, 210, 150, 0.35)", "rgba(250, 235, 160, 0.3)"), ...ink("38, 50, 36"), accent: "#4f9a5c", "accent-soft": "rgba(79, 154, 92, 0.12)" },
  ),
  season(
    "saison-sommer",
    "Sommer",
    "none",
    { bg: "#1a1410", "bg-art": blobs("rgba(255, 170, 70, 0.28)", "rgba(255, 220, 110, 0.2)", "rgba(60, 170, 180, 0.2)"), ...ink("252, 242, 226"), accent: "#ffb54d", "accent-soft": "rgba(255, 181, 77, 0.15)" },
    { bg: "#fdf6e8", "bg-art": blobs("rgba(255, 190, 110, 0.38)", "rgba(255, 230, 140, 0.4)", "rgba(110, 200, 210, 0.3)"), ...ink("55, 40, 25"), accent: "#e07a2f", "accent-soft": "rgba(224, 122, 47, 0.12)" },
  ),
  season(
    "saison-herbst",
    "Herbst",
    "leaves",
    { bg: "#1a120c", "bg-art": blobs("rgba(200, 90, 40, 0.3)", "rgba(220, 160, 60, 0.2)", "rgba(120, 70, 40, 0.28)"), ...ink("245, 234, 220"), accent: "#e0913a", "accent-soft": "rgba(224, 145, 58, 0.15)" },
    { bg: "#f5ece0", "bg-art": blobs("rgba(210, 120, 60, 0.28)", "rgba(230, 180, 90, 0.3)", "rgba(160, 100, 60, 0.2)"), ...ink("58, 38, 24"), accent: "#b45a24", "accent-soft": "rgba(180, 90, 36, 0.12)" },
  ),
  season(
    "saison-winter",
    "Winter",
    "snow",
    { bg: "#0d131c", "bg-art": blobs("rgba(120, 170, 220, 0.24)", "rgba(200, 220, 240, 0.12)", "rgba(80, 110, 170, 0.24)"), ...ink("236, 242, 248"), accent: "#9cc9f0", "accent-soft": "rgba(156, 201, 240, 0.15)" },
    { bg: "#eef3f7", "bg-art": blobs("rgba(150, 190, 230, 0.35)", "rgba(220, 230, 245, 0.5)", "rgba(130, 160, 210, 0.25)"), ...ink("30, 42, 56"), accent: "#3f7bb3", "accent-soft": "rgba(63, 123, 179, 0.12)" },
  ),
];

/** Ostersonntag (gregorianisch, Algorithmus nach Meeus/Jones/Butcher) */
export const easter = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  return new Date(year, month - 1, ((h + l - 7 * m + 114) % 31) + 1);
};

/** Welcher Stil „Jahreszeiten“ heute ist: Anlässe zuerst, sonst die Jahreszeit (meteorologisch) */
export const seasonTheme = (date: Date): Theme => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if ((m === 12 && d === 31) || (m === 1 && d === 1)) return "saison-silvester";
  if (m === 12 && d <= 26) return "saison-weihnachten";
  if (m === 2 && d === 14) return "saison-valentin";
  if (m === 10 && d >= 24) return "saison-halloween";
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const sunday = easter(date.getFullYear()).getTime();
  if (day >= sunday - 7 * 864e5 && day <= sunday + 864e5) return "saison-ostern";
  if (m >= 3 && m <= 5) return "saison-fruehling";
  if (m >= 6 && m <= 8) return "saison-sommer";
  if (m >= 9 && m <= 11) return "saison-herbst";
  return "saison-winter";
};

export const THEME_DEFS: ThemeDef[] = [
  {
    // Der Stil der Marke (docs/brand): Tinte und Papier, feine Rahmen mit runden Ecken wie das Zeichen,
    // Bernstein nur als Punkt – auf jeder Karte oben rechts und im Doppelpunkt der Uhr
    id: "signature",
    name: "Ambiframe",
    hint: "Der Stil der Marke: Tinte und Papier, feine runde Rahmen, ein Lichtpunkt in Bernstein – modern und klar",
    ambient: "none",
    tiles: true,
    air: 1.08,
    shared: {
      ...SHARED,
      display: fontStack("outfit"),
      sans: fontStack("geist"),
      "clock-weight": "200",
      "clock-track": "-0.03em",
      "card-radius": "22px",
      "card-art": "radial-gradient(circle at calc(100% - 17px) 17px, var(--af-accent) 0 3.5px, transparent 4.2px)",
      "label-weight": "500",
      "label-track": "0.14em",
      "bar-radius": "999px",
      // Balken neutral in der Schriftfarbe – Bernstein bleibt dem Punkt (und der Spitze) vorbehalten
      "bar-fill": "color-mix(in srgb, var(--af-ink) 60%, transparent)",
      "curve-w": "2.5",
    },
    dark: {
      ...DARK,
      bg: "#0f1012",
      ink: "#f4f1ea",
      "ink-2": "rgba(244, 241, 234, 0.68)",
      "ink-3": "rgba(244, 241, 234, 0.46)",
      line: "rgba(244, 241, 234, 0.1)",
      surface: "rgba(244, 241, 234, 0.04)",
      accent: "#f4b14a",
      "accent-soft": "rgba(244, 177, 74, 0.14)",
      card: "rgba(244, 241, 234, 0.025)",
      "card-border": "1.5px solid rgba(244, 241, 234, 0.16)",
      "card-shadow": "none",
      panel: "rgba(22, 23, 26, 0.96)",
      chip: "rgba(15, 16, 18, 0.72)",
      veil: "rgba(15, 16, 18, 0.55)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f4f1ea",
      ink: "#0f1012",
      "ink-2": "rgba(15, 16, 18, 0.66)",
      "ink-3": "rgba(15, 16, 18, 0.48)",
      line: "rgba(15, 16, 18, 0.1)",
      surface: "rgba(255, 255, 255, 0.5)",
      // Bernstein auf hellem Grund: kräftiger (Marke #EE9A1F), für Schrift und Linien noch etwas dunkler
      accent: "#c97a0a",
      "accent-soft": "rgba(238, 154, 31, 0.14)",
      card: "rgba(255, 255, 255, 0.35)",
      "card-border": "1.5px solid rgba(15, 16, 18, 0.14)",
      "card-shadow": "none",
      panel: "rgba(250, 248, 243, 0.96)",
      chip: "rgba(244, 241, 234, 0.82)",
      shadow: "0 30px 80px rgba(15, 16, 18, 0.12)",
      veil: "rgba(244, 241, 234, 0.55)",
      colon: "#ee9a1f",
      "colon-opacity": "1",
    },
  },
  {
    id: "ruhig",
    name: "Ruhig",
    hint: "Serifen-Uhr, warmes Weiß, Bambus – ein leiser Lichtschein wie von einer Leselampe",
    ambient: "none",
    shared: SHARED,
    dark: { ...DARK, "bg-art": "radial-gradient(75% 85% at 0% 0%, rgba(214, 168, 101, 0.09), transparent 70%)" },
    light: { ...LIGHT, "bg-art": "radial-gradient(75% 85% at 0% 0%, rgba(255, 246, 228, 0.9), transparent 70%)" },
  },
  {
    id: "klar",
    name: "Klar",
    hint: "StandBy-Stil: reines Schwarz, dünne Ziffern, gefüllte Flächen ohne Rahmen, Salbei",
    ambient: "none",
    shared: { ...SHARED, display: SANS, "clock-weight": "200", "clock-track": "-0.05em" },
    dark: {
      ...DARK,
      bg: "#000000",
      ink: "#f4f6f4",
      "ink-2": "rgba(244, 246, 244, 0.68)",
      "ink-3": "rgba(244, 246, 244, 0.44)",
      line: "rgba(244, 246, 244, 0.1)",
      surface: "rgba(244, 246, 244, 0.06)",
      accent: "#a8cab5",
      "accent-soft": "rgba(168, 202, 181, 0.14)",
      card: "#131514",
      "card-border": "0 solid transparent",
      panel: "rgba(19, 21, 20, 0.95)",
      chip: "rgba(0, 0, 0, 0.62)",
    },
    light: {
      ...LIGHT,
      card: "#f1f2ef",
      "card-border": "0 solid transparent",
      bg: "#ffffff",
      ink: "#141714",
      "ink-2": "rgba(20, 23, 20, 0.64)",
      "ink-3": "rgba(20, 23, 20, 0.42)",
      line: "rgba(20, 23, 20, 0.1)",
      surface: "rgba(255, 255, 255, 0.7)",
      accent: "#4f7d63",
      "accent-soft": "rgba(79, 125, 99, 0.13)",
      panel: "rgba(250, 251, 249, 0.95)",
      chip: "rgba(250, 251, 249, 0.8)",
      shadow: "0 30px 80px rgba(20, 30, 20, 0.14)",
      veil: "rgba(243, 244, 241, 0.55)",
    },
  },
  {
    id: "glass",
    name: "Glas",
    hint: "Glasflächen mit Lichtkante über weichen Farben",
    ambient: "flow",
    shared: { ...SHARED, display: SANS, "clock-weight": "300", "clock-track": "-0.04em", "card-radius": "34px" },
    dark: {
      ...DARK,
      bg: "#0b1020",
      "bg-art": blobs("rgba(90, 120, 255, 0.5)", "rgba(255, 120, 175, 0.38)", "rgba(60, 210, 195, 0.36)"),
      "flow-1": "rgba(90, 120, 255, 0.55)",
      "flow-2": "rgba(255, 120, 175, 0.42)",
      "flow-3": "rgba(60, 210, 195, 0.4)",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.74)",
      "ink-3": "rgba(255, 255, 255, 0.5)",
      line: "rgba(255, 255, 255, 0.16)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#9fd4ff",
      "accent-soft": "rgba(159, 212, 255, 0.16)",
      cold: "#a8c8ff",
      good: "#8fe3b0",
      alert: "#ff9f7a",
      card: "linear-gradient(140deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.1))",
      "card-border": "1px solid rgba(255, 255, 255, 0.24)",
      "card-filter": "blur(24px) saturate(1.8)",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 30, 0.3)",
      panel: "rgba(28, 32, 58, 0.7)",
      chip: "rgba(255, 255, 255, 0.14)",
      veil: "rgba(10, 14, 30, 0.4)",
      shadow: "0 30px 80px rgba(0, 0, 30, 0.5)",
      mist: "rgba(255, 255, 255, 0.09)",
    },
    light: {
      ...LIGHT,
      bg: "#e9edf7",
      "bg-art": blobs("rgba(150, 140, 255, 0.5)", "rgba(255, 175, 150, 0.5)", "rgba(120, 215, 205, 0.45)"),
      "flow-1": "rgba(150, 140, 255, 0.55)",
      "flow-2": "rgba(255, 175, 150, 0.55)",
      "flow-3": "rgba(120, 215, 205, 0.5)",
      ink: "#0f1320",
      "ink-2": "rgba(15, 19, 32, 0.66)",
      "ink-3": "rgba(15, 19, 32, 0.44)",
      line: "rgba(15, 19, 32, 0.09)",
      surface: "rgba(255, 255, 255, 0.5)",
      accent: "#2f6fe0",
      "accent-soft": "rgba(47, 111, 224, 0.12)",
      cold: "#2f6fe0",
      good: "#2f8a5b",
      alert: "#d0552f",
      card: "linear-gradient(140deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.4) 55%, rgba(255, 255, 255, 0.58))",
      "card-border": "1px solid rgba(255, 255, 255, 0.85)",
      "card-filter": "blur(24px) saturate(1.6)",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 18px 44px rgba(40, 50, 100, 0.14)",
      panel: "rgba(255, 255, 255, 0.75)",
      chip: "rgba(255, 255, 255, 0.62)",
      veil: "rgba(233, 237, 247, 0.45)",
      shadow: "0 30px 80px rgba(40, 50, 100, 0.18)",
      mist: "rgba(255, 255, 255, 0.55)",
    },
  },
  {
    id: "daheim",
    name: "Daheim",
    hint: "Wie eine Smart-Home-App: rauchige Glaskacheln über warmem, unscharfem Himmel, große runde Ecken",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      // Systemschrift auf Apple-Geräten, sonst die mitgelieferte Inter
      display: `-apple-system, "SF Pro Display", ${SANS}`,
      sans: `-apple-system, "SF Pro Text", ${SANS}`,
      "clock-weight": "600",
      "clock-track": "-0.03em",
      "card-radius": "28px",
    },
    dark: {
      ...DARK,
      bg: "#6b5a44",
      "bg-art":
        "radial-gradient(70% 55% at 75% 100%, rgba(255, 190, 90, 0.75), transparent 65%), radial-gradient(60% 50% at 20% 85%, rgba(150, 95, 40, 0.8), transparent 70%), linear-gradient(180deg, #7fa6cf 0%, #a9bfd2 32%, #c8b391 58%, #8a6a42 100%)",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.78)",
      "ink-3": "rgba(255, 255, 255, 0.58)",
      line: "rgba(255, 255, 255, 0.18)",
      surface: "rgba(255, 255, 255, 0.12)",
      accent: "#ffcc00",
      "accent-soft": "rgba(255, 204, 0, 0.2)",
      cold: "#5ac8fa",
      good: "#34c759",
      alert: "#ff9f0a",
      card: "rgba(70, 52, 30, 0.42)",
      "card-border": "1px solid rgba(255, 255, 255, 0.1)",
      "card-filter": "blur(30px) saturate(1.6)",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 10px 30px rgba(40, 25, 10, 0.18)",
      panel: "rgba(90, 70, 45, 0.72)",
      chip: "rgba(80, 90, 100, 0.45)",
      veil: "rgba(60, 45, 30, 0.35)",
      shadow: "0 24px 60px rgba(40, 25, 10, 0.35)",
      mist: "rgba(255, 255, 255, 0.1)",
    },
    light: {
      ...LIGHT,
      bg: "#d9cbb4",
      "bg-art":
        "radial-gradient(70% 55% at 75% 100%, rgba(255, 200, 110, 0.7), transparent 65%), radial-gradient(60% 50% at 20% 85%, rgba(190, 140, 80, 0.6), transparent 70%), linear-gradient(180deg, #8fb4da 0%, #c2d3e2 34%, #e3cfa8 62%, #b48d5c 100%)",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.82)",
      "ink-3": "rgba(255, 255, 255, 0.64)",
      line: "rgba(255, 255, 255, 0.24)",
      surface: "rgba(255, 255, 255, 0.18)",
      accent: "#ffcc00",
      "accent-soft": "rgba(255, 204, 0, 0.22)",
      cold: "#32ade6",
      good: "#30b350",
      alert: "#ff9500",
      card: "rgba(105, 78, 42, 0.5)",
      "card-border": "1px solid rgba(255, 255, 255, 0.16)",
      "card-filter": "blur(30px) saturate(1.6)",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 30px rgba(60, 40, 15, 0.14)",
      panel: "rgba(120, 95, 60, 0.7)",
      chip: "rgba(100, 110, 120, 0.4)",
      veil: "rgba(120, 95, 60, 0.3)",
      shadow: "0 24px 60px rgba(60, 40, 15, 0.25)",
      mist: "rgba(255, 255, 255, 0.14)",
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    hint: "Ruhig fließende Farben wie Nordlicht",
    ambient: "flow",
    shared: { ...SHARED, display: fontStack("outfit"), "clock-weight": "200", "clock-track": "-0.03em" },
    dark: {
      ...DARK,
      bg: "#060a14",
      "bg-art": blobs("rgba(60, 220, 170, 0.36)", "rgba(130, 90, 255, 0.36)", "rgba(40, 120, 255, 0.3)"),
      "flow-1": "rgba(60, 220, 170, 0.42)",
      "flow-2": "rgba(130, 90, 255, 0.4)",
      "flow-3": "rgba(40, 120, 255, 0.34)",
      ink: "#eef3f7",
      "ink-2": "rgba(238, 243, 247, 0.7)",
      "ink-3": "rgba(238, 243, 247, 0.45)",
      line: "rgba(238, 243, 247, 0.12)",
      surface: "rgba(238, 243, 247, 0.06)",
      accent: "#7fe0c4",
      "accent-soft": "rgba(127, 224, 196, 0.14)",
      cold: "#8fb8ff",
      card: "rgba(255, 255, 255, 0.06)",
      "card-border": "1px solid rgba(255, 255, 255, 0.1)",
      "card-filter": "blur(18px) saturate(1.4)",
      panel: "rgba(12, 18, 32, 0.85)",
      chip: "rgba(12, 18, 32, 0.6)",
      veil: "rgba(6, 10, 20, 0.5)",
    },
    light: {
      ...LIGHT,
      bg: "#f7f3ef",
      "bg-art": blobs("rgba(255, 185, 140, 0.5)", "rgba(200, 165, 255, 0.45)", "rgba(140, 225, 205, 0.42)"),
      "flow-1": "rgba(255, 185, 140, 0.55)",
      "flow-2": "rgba(200, 165, 255, 0.5)",
      "flow-3": "rgba(140, 225, 205, 0.45)",
      ink: "#1b1820",
      "ink-2": "rgba(27, 24, 32, 0.64)",
      "ink-3": "rgba(27, 24, 32, 0.42)",
      line: "rgba(27, 24, 32, 0.09)",
      surface: "rgba(255, 255, 255, 0.45)",
      accent: "#7457d6",
      "accent-soft": "rgba(116, 87, 214, 0.12)",
      cold: "#4a7fd6",
      card: "rgba(255, 255, 255, 0.45)",
      "card-border": "1px solid rgba(255, 255, 255, 0.75)",
      "card-filter": "blur(18px) saturate(1.3)",
      panel: "rgba(255, 252, 249, 0.85)",
      chip: "rgba(255, 252, 249, 0.65)",
      veil: "rgba(247, 243, 239, 0.5)",
      mist: "rgba(255, 255, 255, 0.5)",
    },
  },
  {
    id: "editorial",
    name: "Editorial",
    hint: "Wie ein Magazin: große Serifen, Papier, feine Linien",
    ambient: "none",
    shared: {
      ...SHARED,
      ...RULED,
      display: fontStack("instrument"),
      "clock-weight": "400",
      "clock-track": "-0.01em",
      "card-rule": "1.5px solid currentColor",
    },
    dark: {
      ...DARK,
      bg: "#141311",
      ink: "#ece5d8",
      "ink-2": "rgba(236, 229, 216, 0.68)",
      "ink-3": "rgba(236, 229, 216, 0.44)",
      line: "rgba(236, 229, 216, 0.16)",
      surface: "rgba(236, 229, 216, 0.05)",
      accent: "#e08d63",
      "accent-soft": "rgba(224, 141, 99, 0.14)",
      panel: "rgba(24, 23, 20, 0.95)",
      chip: "rgba(20, 19, 17, 0.7)",
      veil: "rgba(10, 9, 8, 0.55)",
    },
    light: {
      ...LIGHT,
      bg: "#f3eee4",
      ink: "#1c1915",
      "ink-2": "rgba(28, 25, 21, 0.7)",
      "ink-3": "rgba(28, 25, 21, 0.48)",
      line: "rgba(28, 25, 21, 0.16)",
      surface: "rgba(28, 25, 21, 0.05)",
      accent: "#a8432a",
      "accent-soft": "rgba(168, 67, 42, 0.1)",
      cold: "#2f5d8a",
      alert: "#b8401f",
      good: "#3f7a4b",
      panel: "rgba(246, 242, 234, 0.97)",
      chip: "rgba(246, 242, 234, 0.85)",
      veil: "rgba(243, 238, 228, 0.6)",
      shadow: "0 30px 80px rgba(40, 30, 20, 0.14)",
    },
  },
  {
    id: "pixel",
    name: "Pixel",
    hint: "LED-Punktmatrix wie eine Pixel-Uhr – kräftige Farben auf Schwarz",
    ambient: "none",
    shared: {
      "num-font": "var(--af-sans)",
      wide: "0.7",
      ...SHARED,
      display: fontStack("doto"),
      sans: fontStack("geist"),
      "clock-weight": "800",
      "clock-track": "0.02em",
      "card-radius": "18px",
      "label-font": fontStack("doto"),
      "label-weight": "800",
      "label-track": "0.12em", "bar-h": "12px", "bar-radius": "0", "bar-mask": "repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 9px)", "curve-dash": "1 7", "curve-w": "4", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#000000",
      // feines LED-Raster hinter allem
      "bg-art": "radial-gradient(rgba(255, 255, 255, 0.055) 1.2px, transparent 1.6px)",
      "bg-size": "9px 9px",
      ink: "#f4f4f4",
      "ink-2": "rgba(244, 244, 244, 0.68)",
      "ink-3": "rgba(244, 244, 244, 0.42)",
      line: "rgba(255, 255, 255, 0.1)",
      surface: "rgba(255, 255, 255, 0.05)",
      accent: "#ffc21a",
      "accent-soft": "rgba(255, 194, 26, 0.16)",
      cold: "#3fb6ff",
      good: "#3ddc84",
      alert: "#ff5146",
      card: "#0b0b0b",
      "card-border": "1px solid #1f1f1f",
      "label-color": "var(--af-accent)",
      glow: "0 0 18px rgba(255, 255, 255, 0.22)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
      panel: "rgba(12, 12, 12, 0.96)",
      chip: "rgba(0, 0, 0, 0.75)",
      veil: "rgba(0, 0, 0, 0.55)",
    },
    light: {
      ...LIGHT,
      bg: "#e9e9e6",
      "bg-art": "radial-gradient(rgba(0, 0, 0, 0.06) 1.2px, transparent 1.6px)",
      "bg-size": "9px 9px",
      ink: "#111111",
      "ink-2": "rgba(17, 17, 17, 0.66)",
      "ink-3": "rgba(17, 17, 17, 0.44)",
      line: "rgba(17, 17, 17, 0.1)",
      surface: "rgba(255, 255, 255, 0.6)",
      accent: "#d9480f",
      "accent-soft": "rgba(217, 72, 15, 0.12)",
      cold: "#1971c2",
      good: "#2b8a3e",
      alert: "#e03131",
      card: "#ffffff",
      "card-border": "1px solid rgba(0, 0, 0, 0.08)",
      "label-color": "var(--af-accent)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "arcade",
    name: "Arcade",
    hint: "Neon wie in der Spielhalle: Magenta, Türkis, Leuchtschrift, Raster am Horizont",
    ambient: "stars",
    shared: {
      "num-font": "var(--af-sans)",
      wide: "0.7",
      ...SHARED,
      display: fontStack("doto"),
      sans: fontStack("space-grotesk"),
      "clock-weight": "900",
      "clock-track": "0.04em",
      "card-radius": "6px",
      "label-font": fontStack("doto"),
      "label-weight": "900",
      "label-track": "0.18em", "bar-h": "12px", "bar-radius": "0", "bar-mask": "repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 9px)", "curve-dash": "1 7", "curve-w": "4", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#0a0518",
      // Synthwave: Glühen am Horizont und ein Bodenraster
      "bg-art":
        "radial-gradient(80% 45% at 50% 100%, rgba(255, 61, 242, 0.28), transparent 70%), " +
        "repeating-linear-gradient(90deg, rgba(0, 229, 255, 0.07) 0 1px, transparent 1px 64px), " +
        "linear-gradient(180deg, transparent 58%, rgba(255, 61, 242, 0.1))",
      ink: "#f6f0ff",
      "ink-2": "rgba(246, 240, 255, 0.72)",
      "ink-3": "rgba(246, 240, 255, 0.48)",
      line: "rgba(255, 61, 242, 0.25)",
      surface: "rgba(255, 61, 242, 0.06)",
      accent: "#ff3df2",
      "accent-soft": "rgba(255, 61, 242, 0.18)",
      cold: "#00e5ff",
      good: "#39ff88",
      alert: "#ff5c5c",
      card: "rgba(20, 8, 42, 0.72)",
      "card-border": "1px solid rgba(255, 61, 242, 0.5)",
      "card-shadow": "0 0 26px rgba(255, 61, 242, 0.22), inset 0 0 22px rgba(0, 229, 255, 0.07)",
      "label-color": "var(--af-cold)",
      glow: "0 0 6px var(--af-accent), 0 0 24px rgba(255, 61, 242, 0.55)",
      colon: "var(--af-cold)",
      "colon-opacity": "1",
      panel: "rgba(16, 6, 34, 0.94)",
      chip: "rgba(16, 6, 34, 0.72)",
      veil: "rgba(10, 5, 24, 0.55)",
      mist: "rgba(255, 61, 242, 0.08)",
    },
    light: {
      ...LIGHT,
      bg: "#f7f2ff",
      "bg-art":
        "radial-gradient(80% 45% at 50% 100%, rgba(195, 0, 159, 0.14), transparent 70%), " +
        "repeating-linear-gradient(90deg, rgba(0, 136, 168, 0.07) 0 1px, transparent 1px 64px)",
      ink: "#1a0b2e",
      "ink-2": "rgba(26, 11, 46, 0.68)",
      "ink-3": "rgba(26, 11, 46, 0.46)",
      line: "rgba(195, 0, 159, 0.2)",
      surface: "rgba(255, 255, 255, 0.6)",
      accent: "#c3009f",
      "accent-soft": "rgba(195, 0, 159, 0.12)",
      cold: "#0088a8",
      good: "#1f9d55",
      alert: "#d6336c",
      card: "rgba(255, 255, 255, 0.8)",
      "card-border": "1px solid rgba(195, 0, 159, 0.35)",
      "card-shadow": "0 0 22px rgba(195, 0, 159, 0.12)",
      "label-color": "var(--af-cold)",
      glow: "0 0 14px rgba(195, 0, 159, 0.3)",
      colon: "var(--af-cold)",
      "colon-opacity": "1",
    },
  },
  {
    id: "cockpit",
    name: "Cockpit",
    hint: "Wie ein modernes Auto-Display: tiefes Grau, klare Karten, ein Blau",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("geist"),
      sans: fontStack("geist"),
      "clock-weight": "250",
      "clock-track": "-0.04em",
      "card-radius": "22px",
      "card-pad": "34px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "500",
    },
    dark: {
      ...DARK,
      bg: "#0b0c0d",
      "bg-art": "radial-gradient(circle at 100% 100%, transparent 0 21%, color-mix(in srgb, var(--af-accent) 70%, transparent) 21% 21.25%, transparent 21.25% 23.5%, color-mix(in srgb, var(--af-ink) 22%, transparent) 23.5% 23.65%, transparent 23.65%), linear-gradient(180deg, var(--af-bg) 0 97.6%, transparent 97.6%), repeating-linear-gradient(90deg, color-mix(in srgb, var(--af-ink) 35%, transparent) 0 1px, transparent 1px 2.0833%)",
      ink: "#f2f3f5",
      "ink-2": "rgba(242, 243, 245, 0.62)",
      "ink-3": "rgba(242, 243, 245, 0.4)",
      line: "rgba(242, 243, 245, 0.08)",
      surface: "rgba(242, 243, 245, 0.05)",
      accent: "#4d7cfe",
      "accent-soft": "rgba(77, 124, 254, 0.16)",
      cold: "#4d7cfe",
      good: "#3ecf8e",
      alert: "#e5484d",
      card: "#17191c",
      "card-border": "0 solid transparent",
      "card-shadow": "0 1px 0 rgba(255, 255, 255, 0.04) inset",
      panel: "rgba(23, 25, 28, 0.97)",
      chip: "rgba(23, 25, 28, 0.85)",
      veil: "rgba(11, 12, 13, 0.55)",
    },
    light: {
      ...LIGHT,
      bg: "#f4f5f7",
      "bg-art": "radial-gradient(circle at 100% 100%, transparent 0 21%, color-mix(in srgb, var(--af-accent) 70%, transparent) 21% 21.25%, transparent 21.25% 23.5%, color-mix(in srgb, var(--af-ink) 22%, transparent) 23.5% 23.65%, transparent 23.65%), linear-gradient(180deg, var(--af-bg) 0 97.6%, transparent 97.6%), repeating-linear-gradient(90deg, color-mix(in srgb, var(--af-ink) 35%, transparent) 0 1px, transparent 1px 2.0833%)",
      ink: "#171a20",
      "ink-2": "rgba(23, 26, 32, 0.62)",
      "ink-3": "rgba(23, 26, 32, 0.42)",
      line: "rgba(23, 26, 32, 0.08)",
      surface: "rgba(23, 26, 32, 0.04)",
      accent: "#3e6ae1",
      "accent-soft": "rgba(62, 106, 225, 0.12)",
      cold: "#3e6ae1",
      good: "#1f9d6b",
      alert: "#d93036",
      card: "#ffffff",
      "card-border": "0 solid transparent",
      "card-shadow": "0 1px 2px rgba(23, 26, 32, 0.06), 0 8px 24px rgba(23, 26, 32, 0.05)",
      panel: "rgba(255, 255, 255, 0.97)",
      chip: "rgba(255, 255, 255, 0.85)",
    },
  },
  {
    id: "axel",
    name: "Axel",
    hint: "Wie ein Sprachassistent mit Bildschirm: kühles Blaugrau mit weichem Verlauf, Milchglas-Kacheln, Cyan als Akzent – dunkel in Nachtblau",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: SANS,
      "clock-weight": "400",
      "clock-track": "-0.02em",
      "card-radius": "16px",
      "card-pad": "22px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "600",
      "label-color": "var(--af-ink-2)",
    },
    dark: {
      ...DARK,
      bg: "#0e1922",
      "bg-art": blobs("rgba(40, 110, 140, 0.45)", "rgba(30, 70, 110, 0.4)", "rgba(190, 140, 90, 0.18)"),
      ink: "#f2f7fa",
      "ink-2": "rgba(242, 247, 250, 0.72)",
      "ink-3": "rgba(242, 247, 250, 0.48)",
      line: "rgba(255, 255, 255, 0.1)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#1fc6e8",
      "accent-soft": "rgba(31, 198, 232, 0.16)",
      cold: "#5fb8e6",
      good: "#3bc47a",
      alert: "#ff6a5c",
      card: "rgba(30, 48, 62, 0.62)",
      "card-border": "0 solid transparent",
      "card-filter": "blur(24px) saturate(1.3)",
      "card-shadow": "none",
      panel: "rgba(24, 38, 50, 0.95)",
      chip: "rgba(24, 38, 50, 0.8)",
      veil: "rgba(14, 25, 34, 0.5)",
    },
    light: {
      ...LIGHT,
      bg: "#d6e1e8",
      "bg-art": blobs("rgba(255, 255, 255, 0.7)", "rgba(150, 190, 210, 0.5)", "rgba(235, 215, 190, 0.45)"),
      ink: "#14232e",
      "ink-2": "rgba(20, 35, 46, 0.7)",
      "ink-3": "rgba(20, 35, 46, 0.48)",
      line: "rgba(20, 35, 46, 0.1)",
      surface: "rgba(255, 255, 255, 0.6)",
      accent: "#0a8fb3",
      "accent-soft": "rgba(10, 143, 179, 0.14)",
      cold: "#1d7fb8",
      good: "#1f9d55",
      alert: "#e0453a",
      card: "rgba(255, 255, 255, 0.66)",
      "card-border": "0 solid transparent",
      "card-filter": "blur(24px) saturate(1.3)",
      "card-shadow": "0 2px 12px rgba(20, 50, 70, 0.08)",
      panel: "rgba(255, 255, 255, 0.95)",
      chip: "rgba(255, 255, 255, 0.78)",
      veil: "rgba(214, 225, 232, 0.5)",
    },
  },
  {
    id: "wohnapp",
    name: "Wohn-App",
    hint: "Wie eine Smart-Home-App: helles Grau, weiße Kacheln mit runden Ecken, kräftige Statuspunkte – dunkel als Anthrazit",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: SANS,
      "clock-weight": "700",
      "clock-track": "-0.03em",
      "card-radius": "20px",
      "card-pad": "24px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "700",
      "label-color": "var(--af-ink)",
    },
    dark: {
      ...DARK,
      bg: "#141518",
      ink: "#f5f6f8",
      "ink-2": "rgba(245, 246, 248, 0.7)",
      "ink-3": "rgba(245, 246, 248, 0.45)",
      line: "rgba(255, 255, 255, 0.08)",
      surface: "#2a2c32",
      accent: "#3d8bff",
      "accent-soft": "rgba(61, 139, 255, 0.16)",
      cold: "#4fb3ff",
      good: "#3ddc6a",
      alert: "#ff5a4f",
      card: "#232529",
      "card-border": "0 solid transparent",
      "card-filter": "none",
      "card-shadow": "none",
      panel: "rgba(35, 37, 41, 0.96)",
      chip: "rgba(35, 37, 41, 0.92)",
      veil: "rgba(20, 21, 24, 0.5)",
    },
    light: {
      ...LIGHT,
      bg: "#f1f2f6",
      ink: "#15171c",
      "ink-2": "rgba(21, 23, 28, 0.66)",
      "ink-3": "rgba(21, 23, 28, 0.44)",
      line: "rgba(21, 23, 28, 0.08)",
      surface: "#ffffff",
      accent: "#2f7cf6",
      "accent-soft": "rgba(47, 124, 246, 0.12)",
      cold: "#1ea0e6",
      good: "#1fb85a",
      alert: "#f04438",
      card: "#ffffff",
      "card-border": "0 solid transparent",
      "card-filter": "none",
      "card-shadow": "0 2px 10px rgba(20, 30, 60, 0.07)",
      panel: "rgba(255, 255, 255, 0.97)",
      chip: "rgba(255, 255, 255, 0.94)",
      veil: "rgba(241, 242, 246, 0.5)",
    },
  },
  {
    id: "klartext",
    air: 0.75,
    name: "Klartext",
    hint: "Große, kräftige Schrift mit starkem Kontrast – gut lesbar aus der Ferne",
    ambient: "none",
    shared: {
      ...SHARED,
      display: SANS,
      "clock-weight": "650",
      "clock-track": "-0.03em",
      "card-radius": "20px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "700",
      "label-color": "var(--af-ink-2)",
      // kleinere Texte größer, gedämpfte Schrift kräftiger (wie „Lesbarkeit: groß, hoher Kontrast“)
      fs: "1.2",
      c2: "0.92",
      c3: "0.78", "bar-h": "10px", "curve-w": "4", },
    dark: {
      ...DARK,
      bg: "#000000",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.9)",
      "ink-3": "rgba(255, 255, 255, 0.74)",
      line: "rgba(255, 255, 255, 0.35)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#ffd60a",
      "accent-soft": "rgba(255, 214, 10, 0.2)",
      cold: "#64d2ff",
      good: "#32d74b",
      alert: "#ff453a",
      card: "#111111",
      "card-border": "2px solid rgba(255, 255, 255, 0.35)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#ffffff",
      ink: "#000000",
      "ink-2": "rgba(0, 0, 0, 0.88)",
      "ink-3": "rgba(0, 0, 0, 0.72)",
      line: "rgba(0, 0, 0, 0.35)",
      surface: "rgba(0, 0, 0, 0.05)",
      accent: "#0040dd",
      "accent-soft": "rgba(0, 64, 221, 0.12)",
      cold: "#0071a4",
      good: "#007d2a",
      alert: "#c1001a",
      card: "#f2f2f2",
      "card-border": "2px solid rgba(0, 0, 0, 0.3)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "fallblatt",
    name: "Fallblatt",
    hint: "Wie eine alte Bahnhofstafel: Uhr und Abfahrten auf klappernden Blättern",
    ambient: "none",
    tiles: true,
    flap: true,
    shared: {
      ...SHARED,
      display: SANS,
      "clock-weight": "700",
      "clock-track": "0",
      "card-radius": "10px",
      "card-pad": "28px",
      "label-weight": "700",
      "label-track": "0.2em",
      "label-color": "var(--af-accent)",
      "flap-bg": "linear-gradient(180deg, #2a2b2e 0%, #232427 50%, #1d1e21 50%, #252629 100%)",
      "flap-ink": "#f4f1e8",
    },
    dark: {
      ...DARK,
      bg: "#101112",
      ink: "#f4f1e8",
      "ink-2": "rgba(244, 241, 232, 0.7)",
      "ink-3": "rgba(244, 241, 232, 0.46)",
      line: "rgba(244, 241, 232, 0.1)",
      surface: "rgba(244, 241, 232, 0.05)",
      accent: "#f5c400",
      "accent-soft": "rgba(245, 196, 0, 0.16)",
      cold: "#7fb3e6",
      good: "#7ccf8a",
      alert: "#ff6a4d",
      card: "#18191b",
      "card-border": "1px solid rgba(255, 255, 255, 0.06)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#e8e6e0",
      ink: "#18191b",
      "ink-2": "rgba(24, 25, 27, 0.7)",
      "ink-3": "rgba(24, 25, 27, 0.46)",
      line: "rgba(24, 25, 27, 0.1)",
      surface: "rgba(255, 255, 255, 0.6)",
      accent: "#b88a00",
      "accent-soft": "rgba(184, 138, 0, 0.14)",
      cold: "#2f6fa8",
      good: "#2f8a4b",
      alert: "#c8442c",
      card: "#f7f6f2",
      "card-border": "1px solid rgba(0, 0, 0, 0.08)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    hint: "Grundfarben, klare Formen, kräftige Kanten",
    ambient: "none",
    tiles: true,
    shared: { ...SHARED, display: fontStack("outfit"), sans: fontStack("space-grotesk"), "clock-weight": "800", "clock-track": "-0.03em", "card-radius": "0", "label-weight": "800", "label-track": "0.14em", "bar-h": "14px", "bar-radius": "0", "bar-fill": "var(--af-accent)", "curve-w": "5", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#161616",
      "bg-art":
        "radial-gradient(circle at 90% 96%, #c9a227 0 11%, transparent 11.2%), radial-gradient(circle at 57% -2%, #b53a28 0 8%, transparent 8.2%), " +
        "linear-gradient(90deg, transparent 74%, rgba(40, 80, 160, 0.55) 74% 76.5%, transparent 76.5%)",
      ink: "#f2ead8",
      "ink-2": "rgba(242, 234, 216, 0.74)",
      "ink-3": "rgba(242, 234, 216, 0.5)",
      line: "rgba(242, 234, 216, 0.2)",
      surface: "rgba(242, 234, 216, 0.06)",
      accent: "#e04a35",
      "accent-soft": "rgba(224, 74, 53, 0.16)",
      cold: "#4f7fd6",
      good: "#e9b931",
      card: "#202020",
      "card-border": "3px solid #f2ead8",
      "card-shadow": "7px 7px 0 #e04a35",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#efe7d6",
      "bg-art":
        "radial-gradient(circle at 90% 96%, #f0b323 0 11%, transparent 11.2%), radial-gradient(circle at 57% -2%, #d33f2b 0 8%, transparent 8.2%), " +
        "linear-gradient(90deg, transparent 74%, #1d4e9e 74% 76.5%, transparent 76.5%)",
      ink: "#111111",
      "ink-2": "rgba(17, 17, 17, 0.72)",
      "ink-3": "rgba(17, 17, 17, 0.5)",
      line: "rgba(17, 17, 17, 0.25)",
      surface: "rgba(255, 255, 255, 0.6)",
      accent: "#d33f2b",
      "accent-soft": "rgba(211, 63, 43, 0.12)",
      cold: "#1d4e9e",
      good: "#c48a00",
      card: "#ffffff",
      "card-border": "3px solid #111111",
      "card-shadow": "7px 7px 0 #111111",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "softui",
    name: "Soft-UI",
    hint: "Weiche, herausgeprägte Flächen aus einem Guss – ruhig und plastisch",
    ambient: "none",
    tiles: true,
    shared: { ...SHARED, display: fontStack("nunito"), sans: fontStack("nunito"), "clock-weight": "300", "clock-track": "-0.03em", "card-radius": "30px", "label-case": "none", "label-track": "0", "label-weight": "700" },
    dark: {
      ...DARK,
      bg: "#2b2e35",
      ink: "#e3e6ec",
      "ink-2": "rgba(227, 230, 236, 0.7)",
      "ink-3": "rgba(227, 230, 236, 0.46)",
      line: "rgba(255, 255, 255, 0.07)",
      surface: "rgba(255, 255, 255, 0.04)",
      accent: "#8f9bff",
      "accent-soft": "rgba(143, 155, 255, 0.16)",
      card: "#2b2e35",
      "card-border": "0 solid transparent",
      "card-shadow": "9px 9px 18px #1e2025, -9px -9px 18px #383c45",
    },
    light: {
      ...LIGHT,
      bg: "#e6e9ef",
      ink: "#3b4252",
      "ink-2": "rgba(59, 66, 82, 0.72)",
      "ink-3": "rgba(59, 66, 82, 0.48)",
      line: "rgba(59, 66, 82, 0.08)",
      surface: "rgba(255, 255, 255, 0.4)",
      accent: "#5b6cff",
      "accent-soft": "rgba(91, 108, 255, 0.12)",
      card: "#e6e9ef",
      "card-border": "0 solid transparent",
      "card-shadow": "10px 10px 22px #c3c8d1, -10px -10px 22px #ffffff",
    },
  },
  {
    id: "boho",
    name: "Boho",
    hint: "Terrakotta, Sand und Salbei, weiche Bögen und eine elegante Serifenschrift",
    ambient: "none",
    tiles: true,
    // Playfair hat Mediävalziffern – kleine Texte (Uhrzeiten, Datum) behalten die gleich hohen Ziffern der Textschrift
    shared: { ...SHARED, display: fontStack("playfair"), sans: fontStack("jakarta"), "text-digits": "own", "clock-weight": "500", "clock-track": "-0.01em", "card-radius": "28px", "label-case": "none", "label-track": "0.02em", "label-weight": "600", "label-color": "var(--af-accent)" },
    dark: {
      ...DARK,
      bg: "#2a201b",
      "bg-art": "radial-gradient(circle at 90% 104%, transparent 0 11%, color-mix(in srgb, var(--af-accent) 60%, transparent) 11% 13%, transparent 13% 15.5%, color-mix(in srgb, var(--af-accent) 38%, transparent) 15.5% 17.5%, transparent 17.5% 20%, color-mix(in srgb, var(--af-accent) 20%, transparent) 20% 22%, transparent 22%), " + "radial-gradient(60% 80% at 100% 100%, rgba(224, 154, 116, 0.18) 0 40%, transparent 40.5%), radial-gradient(40% 55% at 100% 100%, rgba(214, 170, 90, 0.16) 0 60%, transparent 60.5%), " +
        "radial-gradient(30% 30% at 6% 10%, rgba(140, 160, 100, 0.14) 0 50%, transparent 51%)",
      ink: "#f3e6d6",
      "ink-2": "rgba(243, 230, 214, 0.72)",
      "ink-3": "rgba(243, 230, 214, 0.48)",
      line: "rgba(243, 230, 214, 0.12)",
      surface: "rgba(243, 230, 214, 0.05)",
      accent: "#e09a74",
      "accent-soft": "rgba(224, 154, 116, 0.16)",
      cold: "#9fbcbc",
      good: "#a9b77a",
      alert: "#e07a5f",
      card: "#36291f",
      "card-border": "0 solid transparent",
      "card-shadow": "0 10px 26px rgba(0, 0, 0, 0.25)",
    },
    light: {
      ...LIGHT,
      bg: "#f3e7d7",
      "bg-art": "radial-gradient(circle at 90% 104%, transparent 0 11%, color-mix(in srgb, var(--af-accent) 60%, transparent) 11% 13%, transparent 13% 15.5%, color-mix(in srgb, var(--af-accent) 38%, transparent) 15.5% 17.5%, transparent 17.5% 20%, color-mix(in srgb, var(--af-accent) 20%, transparent) 20% 22%, transparent 22%), " + "radial-gradient(60% 80% at 100% 100%, rgba(192, 108, 70, 0.22) 0 40%, transparent 40.5%), radial-gradient(40% 55% at 100% 100%, rgba(224, 169, 86, 0.25) 0 60%, transparent 60.5%), " +
        "radial-gradient(30% 30% at 6% 10%, rgba(138, 154, 91, 0.2) 0 50%, transparent 51%)",
      ink: "#3d2b22",
      "ink-2": "rgba(61, 43, 34, 0.72)",
      "ink-3": "rgba(61, 43, 34, 0.48)",
      line: "rgba(61, 43, 34, 0.1)",
      surface: "rgba(255, 255, 255, 0.45)",
      accent: "#b8603c",
      "accent-soft": "rgba(184, 96, 60, 0.12)",
      cold: "#5f8586",
      good: "#6f7f45",
      alert: "#b5523b",
      card: "#fbf4ea",
      "card-border": "0 solid transparent",
      "card-shadow": "0 10px 26px rgba(120, 70, 40, 0.08)",
    },
  },
  {
    id: "landhaus",
    name: "Landhaus",
    hint: "Leinen, Salbeigrün und Creme, klassische Serifen – gemütlich wie ein Bauernhaus",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("newsreader"),
      sans: fontStack("manrope"),
      "clock-weight": "400",
      "clock-track": "-0.01em",
      "card-radius": "12px",
      "label-weight": "700",
      "label-track": "0.16em",
      "label-color": "var(--af-accent)",
      // feines Leinengewebe
      "bg-size": "56px 56px, 56px 56px, 3px 3px, 3px 3px",
    },
    dark: {
      ...DARK,
      bg: "#1d211b",
      "bg-art": "linear-gradient(90deg, color-mix(in srgb, var(--af-accent) 8%, transparent) 50%, transparent 50%), linear-gradient(color-mix(in srgb, var(--af-accent) 8%, transparent) 50%, transparent 50%), " + "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
      ink: "#ece6d6",
      "ink-2": "rgba(236, 230, 214, 0.72)",
      "ink-3": "rgba(236, 230, 214, 0.48)",
      line: "rgba(236, 230, 214, 0.12)",
      surface: "rgba(236, 230, 214, 0.05)",
      accent: "#a8bd8c",
      "accent-soft": "rgba(168, 189, 140, 0.16)",
      cold: "#9ab5c4",
      alert: "#d98a6a",
      good: "#a8bd8c",
      card: "#262b23",
      "card-border": "1px solid rgba(236, 230, 214, 0.1)",
    },
    light: {
      ...LIGHT,
      bg: "#f4efe4",
      "bg-art": "linear-gradient(90deg, color-mix(in srgb, var(--af-accent) 8%, transparent) 50%, transparent 50%), linear-gradient(color-mix(in srgb, var(--af-accent) 8%, transparent) 50%, transparent 50%), " + "linear-gradient(rgba(120, 100, 70, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 100, 70, 0.045) 1px, transparent 1px)",
      ink: "#3a3426",
      "ink-2": "rgba(58, 52, 38, 0.72)",
      "ink-3": "rgba(58, 52, 38, 0.48)",
      line: "rgba(58, 52, 38, 0.12)",
      surface: "rgba(255, 255, 255, 0.55)",
      accent: "#6f8a5b",
      "accent-soft": "rgba(111, 138, 91, 0.13)",
      cold: "#5f7f95",
      alert: "#b0573a",
      good: "#6f8a5b",
      card: "#fbf8f1",
      "card-border": "1px solid #e3d9c4",
    },
  },
  {
    id: "galerie",
    air: 1.35,
    name: "Galerie",
    hint: "Wie ein Ausstellungsraum: Spots von der Decke, Fotos im Passepartout, still und ohne Zoom – kleine Schilder statt Kacheln",
    ambient: "none",
    shared: {
      ...SHARED,
      display: fontStack("instrument"),
      sans: fontStack("geist"),
      "text-digits": "own",
      "clock-weight": "400",
      "clock-track": "-0.01em",
      "label-track": "0.24em",
      "label-weight": "500",
      ...RULED,
      // Foto mit weißem Passepartout und schmalem Rahmen; ohne langsames Heranzoomen
      "photo-inset": "34px 40px",
      "photo-motion": "none",
    },
    dark: {
      ...DARK,
      bg: "#1b1b1a",
      "bg-art":
        "radial-gradient(26% 62% at 24% -12%, rgba(255, 236, 205, 0.17), transparent 72%), radial-gradient(26% 62% at 76% -12%, rgba(255, 236, 205, 0.17), transparent 72%), " +
        "linear-gradient(180deg, transparent 96%, rgba(0, 0, 0, 0.42) 96%)",
      ink: "#f1eee8",
      "ink-2": "rgba(241, 238, 232, 0.7)",
      "ink-3": "rgba(241, 238, 232, 0.46)",
      line: "rgba(241, 238, 232, 0.14)",
      accent: "#c8b89a",
      "accent-soft": "rgba(200, 184, 154, 0.14)",
      "card-rule": "1px solid rgba(241, 238, 232, 0.22)",
      "photo-frame": "0 0 0 22px #f4f1ea, 0 0 0 23px rgba(0, 0, 0, 0.6), 0 30px 70px rgba(0, 0, 0, 0.55)",
    },
    light: {
      ...LIGHT,
      bg: "#eceae5",
      "bg-art":
        "radial-gradient(26% 62% at 24% -12%, rgba(255, 255, 255, 0.95), transparent 72%), radial-gradient(26% 62% at 76% -12%, rgba(255, 255, 255, 0.95), transparent 72%), " +
        "linear-gradient(180deg, transparent 96%, rgba(40, 35, 25, 0.08) 96%)",
      ink: "#1c1c1b",
      "ink-2": "rgba(28, 28, 27, 0.66)",
      "ink-3": "rgba(28, 28, 27, 0.44)",
      line: "rgba(28, 28, 27, 0.12)",
      accent: "#7d6a4f",
      "accent-soft": "rgba(125, 106, 79, 0.12)",
      "card-rule": "1px solid rgba(28, 28, 27, 0.2)",
      "photo-frame": "0 0 0 22px #ffffff, 0 0 0 23px rgba(40, 35, 25, 0.35), 0 26px 60px rgba(40, 35, 25, 0.22)",
    },
  },
  {
    id: "papier",
    name: "Papier",
    hint: "Schwarz auf Papier: Papierton mit feiner Struktur, schwarze Linien, Serifenschrift – wie gedruckt",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("newsreader"),
      sans: fontStack("inter"),
      "clock-weight": "400",
      "clock-track": "-0.02em",
      "card-radius": "0",
      "label-weight": "700",
      "label-track": "0.14em",
      "photo-motion": "none", "bar-h": "3px", "bar-radius": "0", "bar-fill": "var(--af-ink)", "curve-w": "1.5", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#0d0c0b",
      "bg-art": "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22220%22%3E%3Cfilter id=%22p%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix values=%220 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.07 0 0 0 0%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23p)%22/%3E%3C/svg%3E')",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.82)",
      "ink-3": "rgba(255, 255, 255, 0.62)",
      line: "rgba(255, 255, 255, 0.45)",
      surface: "transparent",
      accent: "#ffffff",
      "accent-soft": "rgba(255, 255, 255, 0.12)",
      cold: "#ffffff",
      alert: "#ffffff",
      good: "#ffffff",
      card: "transparent",
      "card-tint": "transparent",
      "card-border": "2px solid #ffffff",
      "card-shadow": "none",
      "card-filter": "none",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f7f3ea",
      "bg-art": "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22220%22%3E%3Cfilter id=%22p%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix values=%220 0 0 0 0.35 0 0 0 0 0.29 0 0 0 0 0.2 0.16 0 0 0 0%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23p)%22/%3E%3C/svg%3E')",
      ink: "#000000",
      "ink-2": "rgba(0, 0, 0, 0.78)",
      "ink-3": "rgba(0, 0, 0, 0.58)",
      line: "rgba(0, 0, 0, 0.4)",
      surface: "transparent",
      accent: "#000000",
      "accent-soft": "rgba(0, 0, 0, 0.08)",
      cold: "#000000",
      alert: "#000000",
      good: "#000000",
      card: "transparent",
      "card-tint": "transparent",
      "card-border": "2px solid #000000",
      "card-shadow": "none",
      "card-filter": "none",
      "colon-opacity": "1",
    },
  },
  {
    id: "eink",
    name: "E-Ink",
    hint: "Für E-Ink-Displays: ohne Bewegung und Übergänge, kräftige Schrift, Schwarz-Weiß mit wenigen Graustufen, Fotos in Graustufen",
    ambient: "none",
    tiles: true,
    still: true,
    shared: {
      ...SHARED,
      display: fontStack("inter"),
      sans: fontStack("inter"),
      // Dünne Striche verschwimmen auf E-Ink – alles etwas kräftiger
      "clock-weight": "600",
      "clock-track": "-0.03em",
      "card-radius": "6px",
      "label-weight": "700",
      "label-track": "0.12em",
      "photo-motion": "none",
      "photo-filter": "grayscale(1) contrast(1.3)",
      still: "1", "bar-h": "8px", "bar-radius": "0", "bar-fill": "var(--af-ink)", "curve-w": "3.5", "curve-area": "0", },
    light: {
      ...LIGHT,
      bg: "#ffffff",
      "bg-art": "none",
      ink: "#000000",
      "ink-2": "#333333",
      "ink-3": "#666666",
      line: "#999999",
      surface: "#ffffff",
      accent: "#000000",
      "accent-soft": "#e6e6e6",
      cold: "#000000",
      alert: "#000000",
      good: "#000000",
      card: "#ffffff",
      "card-tint": "transparent",
      "card-border": "2px solid #000000",
      "card-shadow": "none",
      "card-filter": "none",
      panel: "#ffffff",
      chip: "#ffffff",
      shadow: "none",
      veil: "rgba(255, 255, 255, 0.85)",
      mist: "transparent",
      "colon-opacity": "1",
    },
    dark: {
      ...DARK,
      bg: "#000000",
      "bg-art": "none",
      ink: "#ffffff",
      "ink-2": "#cccccc",
      "ink-3": "#999999",
      line: "#666666",
      surface: "#000000",
      accent: "#ffffff",
      "accent-soft": "#333333",
      cold: "#ffffff",
      alert: "#ffffff",
      good: "#ffffff",
      card: "#000000",
      "card-tint": "transparent",
      "card-border": "2px solid #ffffff",
      "card-shadow": "none",
      "card-filter": "none",
      panel: "#000000",
      chip: "#000000",
      shadow: "none",
      veil: "rgba(0, 0, 0, 0.85)",
      mist: "transparent",
      "colon-opacity": "1",
    },
  },
  {
    id: "artdeco",
    name: "Art déco",
    hint: "Gold auf Schwarz, Strahlen und doppelte Rahmen – Glanz der Zwanziger",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED, "card-clip": "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
      display: fontStack("cormorant"),
      sans: fontStack("outfit"),
      "clock-weight": "300",
      "clock-track": "0.03em",
      "card-radius": "0",
      "label-weight": "500",
      "label-track": "0.32em",
      "label-color": "var(--af-accent)",
    },
    dark: {
      ...DARK,
      bg: "#0d0c0a",
      "bg-art": "radial-gradient(circle at 50% 0%, transparent 0 16%, var(--af-bg) 16.2%), repeating-conic-gradient(from 90deg at 50% 0%, color-mix(in srgb, var(--af-accent) 45%, transparent) 0 0.6deg, transparent 0.6deg 6deg), " + "repeating-conic-gradient(from -90deg at 50% 118%, rgba(201, 164, 92, 0.07) 0deg 1.2deg, transparent 1.2deg 7deg), " +
        "radial-gradient(70% 60% at 50% 115%, rgba(201, 164, 92, 0.12), transparent 70%)",
      ink: "#efe6d2",
      "ink-2": "rgba(239, 230, 210, 0.72)",
      "ink-3": "rgba(239, 230, 210, 0.48)",
      line: "rgba(201, 164, 92, 0.22)",
      surface: "rgba(201, 164, 92, 0.04)",
      accent: "#c9a45c",
      "accent-soft": "rgba(201, 164, 92, 0.14)",
      card: "rgba(13, 12, 10, 0.72)",
      "card-border": "1px solid rgba(201, 164, 92, 0.6)",
      "card-shadow": "inset 0 0 0 5px #0d0c0a, inset 0 0 0 6px rgba(201, 164, 92, 0.35)",
      glow: "0 0 22px rgba(201, 164, 92, 0.25)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f1eadb",
      "bg-art": "radial-gradient(circle at 50% 0%, transparent 0 16%, var(--af-bg) 16.2%), repeating-conic-gradient(from 90deg at 50% 0%, color-mix(in srgb, var(--af-accent) 45%, transparent) 0 0.6deg, transparent 0.6deg 6deg), " + "repeating-conic-gradient(from -90deg at 50% 118%, rgba(150, 110, 40, 0.08) 0deg 1.2deg, transparent 1.2deg 7deg), " +
        "radial-gradient(70% 60% at 50% 115%, rgba(150, 110, 40, 0.1), transparent 70%)",
      ink: "#1a1712",
      "ink-2": "rgba(26, 23, 18, 0.72)",
      "ink-3": "rgba(26, 23, 18, 0.5)",
      line: "rgba(156, 122, 52, 0.3)",
      surface: "rgba(255, 255, 255, 0.4)",
      accent: "#9c7a34",
      "accent-soft": "rgba(156, 122, 52, 0.12)",
      card: "rgba(250, 246, 236, 0.8)",
      "card-border": "1px solid rgba(156, 122, 52, 0.7)",
      "card-shadow": "inset 0 0 0 5px #f1eadb, inset 0 0 0 6px rgba(156, 122, 52, 0.4)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "terminal",
    name: "Terminal",
    hint: "Grüne Monitorschrift mit feinen Zeilen – wie ein Rechner aus den Achtzigern",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: MONO,
      sans: MONO,
      // Monospace läuft breiter: Spalte für Uhrzeiten („ganztags“) breiter
      "time-col": "calc(104px * var(--af-fs, 1))",
      wide: "0.72",
      "clock-weight": "500",
      "clock-track": "0",
      "card-radius": "0",
      "label-weight": "500",
      "label-track": "0.12em", "bar-h": "12px", "bar-radius": "0", "bar-mask": "repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 9px)", "curve-dash": "1 7", "curve-w": "4", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#030805",
      "bg-art":
        "repeating-linear-gradient(0deg, rgba(80, 255, 140, 0.035) 0 1px, transparent 1px 3px), radial-gradient(120% 90% at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.65))",
      ink: "#7dff9b",
      "ink-2": "rgba(125, 255, 155, 0.72)",
      "ink-3": "rgba(125, 255, 155, 0.48)",
      line: "rgba(125, 255, 155, 0.2)",
      surface: "rgba(125, 255, 155, 0.04)",
      accent: "#c6ff7d",
      "accent-soft": "rgba(198, 255, 125, 0.12)",
      cold: "#7de0ff",
      alert: "#ffb35c",
      good: "#7dff9b",
      card: "rgba(3, 8, 5, 0.6)",
      "card-border": "1px solid rgba(125, 255, 155, 0.35)",
      "card-shadow": "0 0 24px rgba(125, 255, 155, 0.06)",
      glow: "0 0 10px rgba(125, 255, 155, 0.45)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#eeeee4",
      "bg-art": "repeating-linear-gradient(0deg, rgba(30, 80, 40, 0.04) 0 1px, transparent 1px 3px)",
      ink: "#173a22",
      "ink-2": "rgba(23, 58, 34, 0.74)",
      "ink-3": "rgba(23, 58, 34, 0.52)",
      line: "rgba(23, 58, 34, 0.22)",
      surface: "rgba(23, 58, 34, 0.04)",
      accent: "#2f7d3c",
      "accent-soft": "rgba(47, 125, 60, 0.12)",
      card: "rgba(255, 255, 255, 0.45)",
      "card-border": "1px solid rgba(23, 58, 34, 0.35)",
      "card-shadow": "none",
      "colon-opacity": "1",
    },
  },
  {
    id: "verspielt",
    name: "Verspielt",
    hint: "Runde Formen, fröhliche Farben, dicke Schrift – fürs Kinderzimmer und die Familienküche",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("nunito"),
      sans: fontStack("nunito"),
      "clock-weight": "800",
      "clock-track": "-0.02em",
      "card-radius": "34px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "800",
      "label-color": "var(--af-accent)", "bar-h": "14px", "bar-radius": "7px", "curve-w": "5", },
    dark: {
      ...DARK,
      bg: "#1d1a33",
      "bg-art": blobs("rgba(255, 111, 145, 0.32)", "rgba(80, 200, 190, 0.26)", "rgba(255, 179, 71, 0.24)"),
      ink: "#f6f1ff",
      "ink-2": "rgba(246, 241, 255, 0.74)",
      "ink-3": "rgba(246, 241, 255, 0.5)",
      line: "rgba(246, 241, 255, 0.12)",
      surface: "rgba(255, 255, 255, 0.06)",
      accent: "#ffb347",
      "accent-soft": "rgba(255, 179, 71, 0.16)",
      cold: "#6fc8ff",
      good: "#6ee7a8",
      alert: "#ff7a8a",
      card: "rgba(255, 255, 255, 0.08)",
      "card-border": "0 solid transparent",
      "card-shadow": "0 10px 0 rgba(0, 0, 0, 0.22)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#fff7ef",
      "bg-art": blobs("rgba(255, 170, 150, 0.45)", "rgba(140, 220, 200, 0.45)", "rgba(190, 170, 255, 0.4)"),
      ink: "#3a2f4a",
      "ink-2": "rgba(58, 47, 74, 0.74)",
      "ink-3": "rgba(58, 47, 74, 0.5)",
      line: "rgba(58, 47, 74, 0.1)",
      surface: "rgba(255, 255, 255, 0.7)",
      accent: "#ff6f61",
      "accent-soft": "rgba(255, 111, 97, 0.14)",
      cold: "#4aa3df",
      good: "#3fbf7f",
      alert: "#e5484d",
      card: "#ffffff",
      "card-border": "0 solid transparent",
      "card-shadow": "0 10px 0 rgba(58, 47, 74, 0.08)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "leitsystem",
    air: 0.75,
    name: "Leitsystem",
    hint: "Wie Wegweiser am Flughafen: Gelb auf Anthrazit, große klare Schrift – auch aus der Ferne lesbar",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("inter"),
      sans: fontStack("inter"),
      "clock-weight": "700",
      "clock-track": "-0.02em",
      "card-radius": "6px",
      "label-weight": "800",
      "label-track": "0.08em", "bar-h": "10px", "bar-radius": "0", "bar-fill": "var(--af-accent)", "curve-w": "4", },
    dark: {
      ...DARK,
      bg: "#1b1e21",
      // Gelbes Leitband am oberen Rand
      "bg-art": "linear-gradient(180deg, #ffc400 0 10px, transparent 10px)",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.8)",
      "ink-3": "rgba(255, 255, 255, 0.56)",
      line: "rgba(255, 255, 255, 0.16)",
      surface: "rgba(255, 255, 255, 0.06)",
      accent: "#ffc400",
      "accent-soft": "rgba(255, 196, 0, 0.16)",
      cold: "#5fb4ff",
      good: "#4cd28a",
      alert: "#ff6b4a",
      card: "#25292d",
      "card-border": "0 solid transparent",
      "card-shadow": "none",
      "label-color": "#ffc400",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#ececea",
      "bg-art": "linear-gradient(180deg, #ffc400 0 10px, transparent 10px)",
      ink: "#141414",
      "ink-2": "rgba(20, 20, 20, 0.76)",
      "ink-3": "rgba(20, 20, 20, 0.54)",
      line: "rgba(20, 20, 20, 0.14)",
      surface: "rgba(255, 255, 255, 0.7)",
      accent: "#b88600",
      "accent-soft": "rgba(255, 196, 0, 0.25)",
      cold: "#1f6fc4",
      good: "#1f8a4c",
      alert: "#d23f1f",
      card: "#ffffff",
      "card-border": "0 solid transparent",
      "card-shadow": "none",
      "label-color": "#141414",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "swiss",
    name: "Swiss Grid",
    hint: "Schweizer Typografie: strenges Raster, riesige Zahlen, Schwarz-Weiß mit Signalrot",
    ambient: "none",
    shared: {
      ...SHARED,
      ...RULED,
      display: fontStack("inter"),
      sans: fontStack("inter"),
      "clock-weight": "800",
      "clock-track": "-0.05em",
      "label-case": "none",
      "label-weight": "700",
      "label-track": "0",
      "label-color": "var(--af-accent)",
      "card-rule": "4px solid currentColor",
      // 12 Spalten wie das Raster der Seite
      "bg-size": "calc(100% / 12) 100%", "bar-h": "2px", "bar-radius": "0", "bar-fill": "var(--af-ink)", "curve-w": "1.5", "curve-area": "0", },
    dark: {
      ...DARK,
      bg: "#0f0f0f",
      "bg-art": "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      ink: "#f4f3ef",
      "ink-2": "rgba(244, 243, 239, 0.74)",
      "ink-3": "rgba(244, 243, 239, 0.5)",
      line: "rgba(244, 243, 239, 0.18)",
      surface: "transparent",
      accent: "#ff3321",
      "accent-soft": "rgba(255, 51, 33, 0.16)",
      cold: "#f4f3ef",
      good: "#f4f3ef",
      alert: "#ff3321",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f4f3ef",
      "bg-art": "linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
      ink: "#111111",
      "ink-2": "rgba(17, 17, 17, 0.74)",
      "ink-3": "rgba(17, 17, 17, 0.5)",
      line: "rgba(17, 17, 17, 0.16)",
      surface: "transparent",
      accent: "#e30613",
      "accent-soft": "rgba(227, 6, 19, 0.1)",
      cold: "#111111",
      good: "#111111",
      alert: "#e30613",
      "colon-opacity": "1",
    },
  },
  {
    id: "rams",
    name: "Rams",
    hint: "Wie Geräte von Dieter Rams: warmes Grau, ein orangener Akzent, Lautsprecher-Raster – ruhig und funktional",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED, "card-art": "radial-gradient(circle at 13px 13px, color-mix(in srgb, var(--af-ink) 38%, transparent) 0 2.5px, transparent 3.2px), radial-gradient(circle at calc(100% - 13px) 13px, color-mix(in srgb, var(--af-ink) 38%, transparent) 0 2.5px, transparent 3.2px), radial-gradient(circle at 13px calc(100% - 13px), color-mix(in srgb, var(--af-ink) 38%, transparent) 0 2.5px, transparent 3.2px), radial-gradient(circle at calc(100% - 13px) calc(100% - 13px), color-mix(in srgb, var(--af-ink) 38%, transparent) 0 2.5px, transparent 3.2px)",
      display: fontStack("manrope"),
      sans: fontStack("manrope"),
      "clock-weight": "300",
      "clock-track": "-0.03em",
      "card-radius": "16px",
      "label-weight": "600",
      "label-track": "0.12em",
      "bg-size": "14px 14px",
    },
    dark: {
      ...DARK,
      bg: "#1e1e1c",
      "bg-art": "radial-gradient(circle, rgba(255, 255, 255, 0.06) 1.3px, transparent 1.7px)",
      ink: "#eae8e2",
      "ink-2": "rgba(234, 232, 226, 0.7)",
      "ink-3": "rgba(234, 232, 226, 0.46)",
      line: "rgba(234, 232, 226, 0.12)",
      surface: "rgba(234, 232, 226, 0.05)",
      accent: "#ff6a13",
      "accent-soft": "rgba(255, 106, 19, 0.16)",
      cold: "#8fb3c9",
      good: "#9cbf7a",
      alert: "#ff6a13",
      card: "#2a2a27",
      "card-border": "1px solid rgba(234, 232, 226, 0.08)",
      "card-shadow": "0 2px 0 rgba(0, 0, 0, 0.35)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#d9d7d0",
      "bg-art": "radial-gradient(circle, rgba(0, 0, 0, 0.08) 1.3px, transparent 1.7px)",
      ink: "#2b2a27",
      "ink-2": "rgba(43, 42, 39, 0.7)",
      "ink-3": "rgba(43, 42, 39, 0.48)",
      line: "rgba(43, 42, 39, 0.12)",
      surface: "rgba(255, 255, 255, 0.4)",
      accent: "#e85a0c",
      "accent-soft": "rgba(232, 90, 12, 0.13)",
      cold: "#4f7c96",
      good: "#5c8a3f",
      alert: "#e85a0c",
      card: "#eceae4",
      "card-border": "1px solid rgba(255, 255, 255, 0.7)",
      "card-shadow": "0 2px 0 rgba(43, 42, 39, 0.12)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "lobby",
    air: 1.5,
    name: "Lobby",
    hint: "Wie die Rezeption eines guten Hotels: Flaschengrün, doppelter Messingrahmen, viel Luft, feine Serifen – nur das Nötigste",
    ambient: "none",
    shared: {
      ...SHARED,
      ...RULED,
      // Instrument Serif hat gleich hohe Ziffern (Cormorant setzt Mediävalziffern – unruhig in Tabellen)
      display: fontStack("instrument"),
      sans: fontStack("jakarta"),
      "text-digits": "own",
      "clock-weight": "400",
      "clock-track": "0",
      "label-weight": "500",
      "label-track": "0.32em",
      "label-color": "var(--af-accent)",
    },
    dark: {
      ...DARK,
      bg: "#0c1611",
      "bg-art": "linear-gradient(180deg, transparent 2%, color-mix(in srgb, var(--af-accent) 70%, transparent) 2% 2.2%, transparent 2.2% 2.9%, color-mix(in srgb, var(--af-accent) 40%, transparent) 2.9% 3.05%, transparent 3.05% 96.95%, color-mix(in srgb, var(--af-accent) 40%, transparent) 96.95% 97.1%, transparent 97.1% 97.8%, color-mix(in srgb, var(--af-accent) 70%, transparent) 97.8% 98%, transparent 98%), linear-gradient(90deg, transparent 16px, color-mix(in srgb, var(--af-accent) 70%, transparent) 16px 17px, transparent 17px 23px, color-mix(in srgb, var(--af-accent) 40%, transparent) 23px 24px, transparent 24px calc(100% - 24px), color-mix(in srgb, var(--af-accent) 40%, transparent) calc(100% - 24px) calc(100% - 23px), transparent calc(100% - 23px) calc(100% - 17px), color-mix(in srgb, var(--af-accent) 70%, transparent) calc(100% - 17px) calc(100% - 16px), transparent calc(100% - 16px)), " + "radial-gradient(120% 90% at 50% 0%, rgba(195, 164, 107, 0.1), transparent 70%), linear-gradient(180deg, #0f1c15, #0a120e)",
      ink: "#efe6d6",
      "ink-2": "rgba(239, 230, 214, 0.68)",
      "ink-3": "rgba(239, 230, 214, 0.44)",
      line: "rgba(195, 164, 107, 0.22)",
      surface: "transparent",
      accent: "#c3a46b",
      "accent-soft": "rgba(195, 164, 107, 0.12)",
      cold: "#a9bccb",
      good: "#a8bf9a",
      alert: "#d98c6a",
      "card-rule": "1px solid rgba(195, 164, 107, 0.45)",
      colon: "var(--af-accent)",
      "colon-opacity": "0.8",
    },
    light: {
      ...LIGHT,
      bg: "#f5f0e8",
      "bg-art": "linear-gradient(180deg, transparent 2%, color-mix(in srgb, var(--af-accent) 70%, transparent) 2% 2.2%, transparent 2.2% 2.9%, color-mix(in srgb, var(--af-accent) 40%, transparent) 2.9% 3.05%, transparent 3.05% 96.95%, color-mix(in srgb, var(--af-accent) 40%, transparent) 96.95% 97.1%, transparent 97.1% 97.8%, color-mix(in srgb, var(--af-accent) 70%, transparent) 97.8% 98%, transparent 98%), linear-gradient(90deg, transparent 16px, color-mix(in srgb, var(--af-accent) 70%, transparent) 16px 17px, transparent 17px 23px, color-mix(in srgb, var(--af-accent) 40%, transparent) 23px 24px, transparent 24px calc(100% - 24px), color-mix(in srgb, var(--af-accent) 40%, transparent) calc(100% - 24px) calc(100% - 23px), transparent calc(100% - 23px) calc(100% - 17px), color-mix(in srgb, var(--af-accent) 70%, transparent) calc(100% - 17px) calc(100% - 16px), transparent calc(100% - 16px)), " + "radial-gradient(120% 90% at 50% 0%, rgba(140, 109, 58, 0.07), transparent 70%)",
      ink: "#2a2420",
      "ink-2": "rgba(42, 36, 32, 0.68)",
      "ink-3": "rgba(42, 36, 32, 0.46)",
      line: "rgba(140, 109, 58, 0.22)",
      surface: "transparent",
      accent: "#8c6d3a",
      "accent-soft": "rgba(140, 109, 58, 0.1)",
      cold: "#4d6a80",
      good: "#5a7a4d",
      alert: "#a8522e",
      "card-rule": "1px solid rgba(140, 109, 58, 0.45)",
      colon: "var(--af-accent)",
      "colon-opacity": "0.8",
    },
  },
  {
    id: "bilderbuch",
    name: "Bilderbuch",
    hint: "Wie ein Kinderbuch: Hügel mit Sonne oder Mond und Sternen, Karten wie ausgeschnitten mit dicker Kontur",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("fraunces"),
      sans: fontStack("nunito"),
      "clock-weight": "800",
      "clock-track": "-0.02em",
      "card-radius": "22px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "800",
      "label-color": "var(--af-accent)", "bar-h": "14px", "bar-radius": "7px", "curve-w": "5", },
    dark: {
      ...DARK,
      bg: "#1c2552",
      // Nacht: Mond, ein paar Sterne, dunkle Hügel
      "bg-art":
        "radial-gradient(circle at 62% 8%, #fff3c4 0 3.2%, transparent 3.5%), " +
        "radial-gradient(circle at 20% 14%, #fff3c4 0 0.35%, transparent 0.5%), radial-gradient(circle at 48% 8%, #fff3c4 0 0.3%, transparent 0.45%), " +
        "radial-gradient(circle at 66% 22%, #fff3c4 0 0.3%, transparent 0.45%), radial-gradient(circle at 8% 30%, #fff3c4 0 0.25%, transparent 0.4%), " +
        "radial-gradient(ellipse 62% 15% at 18% 109%, #24603f 0 99%, transparent 100%), radial-gradient(ellipse 60% 38% at 92% 112%, #1d4f34 0 99%, transparent 100%)",
      ink: "#fff6e0",
      "ink-2": "rgba(255, 246, 224, 0.8)",
      "ink-3": "rgba(255, 246, 224, 0.56)",
      line: "rgba(255, 246, 224, 0.16)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#ffc94a",
      "accent-soft": "rgba(255, 201, 74, 0.18)",
      cold: "#8cc8ff",
      good: "#7fdc8f",
      alert: "#ff8a6b",
      card: "#2b3670",
      "card-border": "3px solid #fff6e0",
      "card-shadow": "6px 6px 0 rgba(0, 0, 0, 0.4)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#bfe4f2",
      // Tag: Sonne, Wolke, grüne Hügel
      "bg-art":
        "radial-gradient(circle at 62% 8%, #ffd24a 0 3.6%, transparent 3.9%), " +
        "radial-gradient(ellipse 9% 4.5% at 16% 15%, #ffffff 0 99%, transparent 100%), radial-gradient(ellipse 6% 4% at 21% 12%, #ffffff 0 99%, transparent 100%), " +
        "radial-gradient(ellipse 62% 15% at 18% 109%, #9fd38a 0 99%, transparent 100%), radial-gradient(ellipse 60% 38% at 92% 112%, #7cc46e 0 99%, transparent 100%)",
      ink: "#2b2340",
      "ink-2": "rgba(43, 35, 64, 0.76)",
      "ink-3": "rgba(43, 35, 64, 0.54)",
      line: "rgba(43, 35, 64, 0.14)",
      surface: "rgba(255, 255, 255, 0.7)",
      accent: "#e8553a",
      "accent-soft": "rgba(232, 85, 58, 0.14)",
      cold: "#2f7cc7",
      good: "#2f9a4e",
      alert: "#d93a3a",
      card: "#fffaf0",
      "card-border": "3px solid #2b2340",
      "card-shadow": "6px 6px 0 #2b2340",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "saisonal",
    name: "Jahreszeiten",
    hint: "Wechselt von selbst: Frühling, Sommer, Herbst, Winter – und zu Weihnachten, Silvester, Valentinstag, Ostern und Halloween",
    ambient: "none",
    // Die Farben kommen zur Laufzeit aus der passenden Jahreszeit (seasonTheme); diese hier nur als Rückfall
    shared: { ...SHARED },
    dark: { ...DARK },
    light: { ...LIGHT },
  },
  ...SEASONS,
];

/** Fertige Farbpaletten – liegen über dem Stil, eigene Farben gehen vor. „tagesverlauf“ rechnet das Display selbst. */
export const PALETTES: Record<string, { name: string; dark: ColorSet; light: ColorSet }> = {
  nordisch: {
    name: "Nordisch (kühl, Fjordblau)",
    dark: { bg: "#2e3440", ink: "#eceff4", accent: "#88c0d0", card: "#3b4252", good: "#a3be8c", alert: "#bf616a", cold: "#81a1c1" },
    light: { bg: "#eceff4", ink: "#2e3440", accent: "#5e81ac", card: "#e5e9f0", good: "#6f8f55", alert: "#bf616a", cold: "#5e81ac" },
  },
  vampir: {
    name: "Vampir (Lila, Pink, Grün)",
    dark: { bg: "#282a36", ink: "#f8f8f2", accent: "#bd93f9", card: "#343746", good: "#50fa7b", alert: "#ff5555", cold: "#8be9fd" },
    light: { bg: "#f8f8f2", ink: "#282a36", accent: "#7c5cc4", card: "#ffffff", good: "#2e9e4f", alert: "#d73a49", cold: "#2a8fb0" },
  },
  mocha: {
    name: "Mocha (Pastell)",
    dark: { bg: "#1e1e2e", ink: "#cdd6f4", accent: "#cba6f7", card: "#313244", good: "#a6e3a1", alert: "#f38ba8", cold: "#89b4fa" },
    light: { bg: "#eff1f5", ink: "#4c4f69", accent: "#8839ef", card: "#e6e9ef", good: "#40a02b", alert: "#d20f39", cold: "#1e66f5" },
  },
  retro: {
    name: "Retro (Senf, Rost, Oliv)",
    dark: { bg: "#282828", ink: "#ebdbb2", accent: "#fabd2f", card: "#3c3836", good: "#b8bb26", alert: "#fb4934", cold: "#83a598" },
    light: { bg: "#fbf1c7", ink: "#3c3836", accent: "#b57614", card: "#f2e5bc", good: "#79740e", alert: "#9d0006", cold: "#076678" },
  },
  nachtstadt: {
    name: "Nachtstadt (Neonblau)",
    dark: { bg: "#1a1b26", ink: "#c0caf5", accent: "#7aa2f7", card: "#24283b", good: "#9ece6a", alert: "#f7768e", cold: "#7dcfff" },
    light: { bg: "#e1e2e7", ink: "#3760bf", accent: "#2e7de9", card: "#d5d6db", good: "#587539", alert: "#f52a65", cold: "#007197" },
  },
};

/** Farbton über den Tag: Nacht blau, Morgen orange, Mittag Himmelblau, Abend golden, Dämmerung violett */
const DAY_HUES: [number, number][] = [
  [0, 235],
  [5, 255],
  [7, 25],
  [10, 45],
  [13, 195],
  [17, 32],
  [19, 320],
  [21, 255],
  [24, 235],
];
export const dayHue = (d: Date): number => {
  const h = d.getHours() + d.getMinutes() / 60;
  const i = DAY_HUES.findIndex(([at]) => at > h);
  const [h0, a] = DAY_HUES[i - 1];
  const [h1, b] = DAY_HUES[i];
  // kürzester Weg auf dem Farbkreis
  const diff = ((b - a + 540) % 360) - 180;
  return (a + diff * ((h - h0) / (h1 - h0)) + 360) % 360;
};

/* ───────── Lesbarkeit: Mindestkontraste für jeden Stil, hell und dunkel ───────── */

/** Mindestkontrast gegen den Hintergrund (WCAG): Zweittext wie Fließtext, leiser Text und Akzent für kleine Schrift */
export const MIN_CONTRAST = { "ink-2": 6.5, "ink-3": 4.2, accent: 3.6 } as const;

type Rgba = [number, number, number, number];
export const parseColor = (c?: string): Rgba | null => {
  if (!c) return null;
  const v = c.trim();
  let m = /^#([0-9a-f]{3,8})$/i.exec(v);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((x) => x + x).join("");
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1];
  }
  m = /^rgba?\(([^)]+)\)$/.exec(v);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  return p.length >= 3 && p.every(Number.isFinite) ? [p[0], p[1], p[2], p[3] ?? 1] : null;
};
const luminance = ([r, g, b]: number[]) => {
  const f = (x: number) => ((x /= 255) <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const over = (fg: Rgba, bg: Rgba): Rgba => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1) as Rgba;
/** Kontrastverhältnis einer (auch halbdurchsichtigen) Farbe auf dem Hintergrund */
export const contrastOn = (fg: string, bg: string): number | null => {
  const f = parseColor(fg);
  const b = parseColor(bg);
  if (!f || !b) return null;
  const [x, y] = [luminance(over(f, b)), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/**
 * Hebt zu blasse Farben an, bis sie den Mindestkontrast erreichen: halbdurchsichtige werden deckender,
 * volle Farben werden Richtung Schrift gemischt (auf hellem Grund dunkler, auf dunklem heller). Der Charakter bleibt.
 */
const readable = (t: Tokens): Tokens => {
  const bg = t.bg;
  if (!parseColor(bg)) return t; // Hintergrund als Verlauf: nicht messbar, bleibt wie gestaltet
  const out = { ...t };
  const target = parseColor(t.ink) ?? [0, 0, 0, 1];
  // nie mehr verlangen, als die Hauptschrift selbst schafft (Handheld: Grün auf Grün)
  const ceiling = (contrastOn(t.ink, bg) ?? 21) * 0.92;
  for (const [key, wanted] of Object.entries(MIN_CONTRAST)) {
    const min = Math.min(wanted, ceiling);
    const c = parseColor(t[key]);
    if (!c || (contrastOn(t[key], bg) ?? 99) >= min) continue;
    let [r, g, b, a] = c;
    for (let i = 0; i < 60 && (contrastOn(`rgba(${r}, ${g}, ${b}, ${a})`, bg) ?? 99) < min; i++) {
      if (a < 1) a = Math.min(1, +(a + 0.02).toFixed(2));
      // mit Kommawerten rechnen – gerundet bliebe die Annäherung kurz vor dem Ziel stehen
      else [r, g, b] = [r, g, b].map((v, j) => v + (target[j] - v) * 0.06);
    }
    // aufrunden Richtung Schrift, damit das Runden den Kontrast nicht wieder unter die Grenze drückt
    const toward = (v: number, j: number) => (target[j] > v ? Math.ceil(v) : Math.floor(v));
    [r, g, b] = [r, g, b].map(toward);
    out[key] = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }
  return out;
};
for (const t of THEME_DEFS) {
  t.dark = readable(t.dark);
  t.light = readable(t.light);
}

/** Bewegung, die zum Stil passt: verspielte federn, ruhige und edle blenden nur ein, alle anderen wachsen ruhig */
const SPRING_THEMES = new Set(["verspielt", "bilderbuch", "arcade"]);
const FADE_THEMES = new Set(["galerie", "lobby", "papier", "editorial"]);
export type ChartMotion = "soft" | "spring" | "fade" | "off";

/** Wirksame Bewegung: eigene Wahl, sonst „aus“ für alte Konfigurationen (count_up: false), sonst nach dem Stil */
export const chartMotion = (design?: { chart_motion?: string; count_up?: boolean; theme?: string }, theme?: string): ChartMotion => {
  if (design?.chart_motion) return design.chart_motion as ChartMotion;
  if (design?.count_up === false) return "off";
  const raw = theme ?? design?.theme ?? "";
  const id = MERGED_THEMES[raw] ?? raw; // alter Stilname → Nachfolger
  return SPRING_THEMES.has(id) ? "spring" : FADE_THEMES.has(id) ? "fade" : "soft";
};

/** CSS-Animationen je Bewegung (leer = Standard aus widgetStyles, also „ruhig“); Dauer kommt aus --af-tempo */
export const CHART_ANIMS: Record<ChartMotion, { bar?: string; curve?: string; ring?: string; dot?: string; card?: string }> = {
  soft: {},
  spring: {
    bar: "af-grow 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) both",
    curve: "af-reveal 1.1s cubic-bezier(0.34, 1.3, 0.64, 1) both",
    ring: "af-sweep 1.1s cubic-bezier(0.34, 1.45, 0.64, 1) both",
    card: "af-card-in 1.1s cubic-bezier(0.34, 1.4, 0.64, 1) both",
  },
  fade: { bar: "af-fade 1.1s ease both", curve: "af-fade 1.1s ease both", ring: "af-fade 1.1s ease both", dot: "af-show 1.1s ease both", card: "af-fade 1.1s ease both" },
  off: { bar: "none", curve: "none", ring: "none", dot: "none", card: "none" },
};

/** Grunddauer einer Bewegung in Sekunden – Balken, Kurven, Ringe und Zahlen kommen gemeinsam an */
export const MOTION_BASE = 1.1;
export type Motion = Required<MotionConfig>;

/** Wirksame Bewegung: Seite > Design > Stil */
export const motionOf = (
  design?: { chart_motion?: string; count_up?: boolean; theme?: string; motion?: MotionConfig },
  page?: { motion?: MotionConfig },
  theme?: string,
): Motion => {
  const m = { ...design?.motion, ...page?.motion };
  const d = Number(m.duration);
  return {
    style: page?.motion?.style ?? chartMotion(design, theme),
    duration: Number.isFinite(d) && d > 0 ? Math.max(0.2, Math.min(5, d)) : MOTION_BASE,
    strength: m.strength ?? "normal",
    stagger: m.stagger ?? "soft",
    highlight: m.highlight ?? "glow",
    count: m.count ?? "all",
    when: m.when ?? "always",
  };
};

/** CSS-Variablen der Bewegung (undefined = Standard aus widgetStyles) */
export const motionVars = (m: Motion): Record<string, string | undefined> => {
  const a = CHART_ANIMS[m.style];
  const tempo = m.duration / MOTION_BASE;
  const still = m.style === "off";
  const stagger = still || m.stagger === "off" ? 0 : m.stagger === "strong" ? 140 : 70;
  return {
    "--af-bar-anim": a.bar,
    "--af-curve-anim": a.curve,
    "--af-ring-anim": a.ring,
    "--af-dot-anim": a.dot,
    "--af-card-anim": stagger ? a.card : "none",
    "--af-tempo": tempo === 1 ? undefined : String(tempo),
    "--af-from": m.strength === "subtle" ? "0.65" : undefined,
    "--af-rise": m.strength === "subtle" ? "6px" : m.strength === "strong" ? "28px" : undefined,
    "--af-card-scale": m.strength === "strong" ? "0.94" : undefined,
    "--af-stagger": `${Math.round(stagger * tempo)}ms`,
    "--af-glide": !still && m.when === "always" ? `${(0.9 * tempo).toFixed(2)}s` : "0s",
  };
};

/** Für Editor-Auswahl und Vorschauen */
export const THEMES = THEME_DEFS.filter((t) => !t.hidden).map(({ id, name, hint, ambient, tiles, flap }) => ({ id, name, hint, ambient, tiles, flap }));

/** Alte Stilnamen: „Weißgold“ ist jetzt „Gold“ in hell. */
/** Ränder-Faktor des Stils („Luft“) – „Jahreszeiten“ folgt der Fassung von heute */
/** Form der Laufbänder passend zum Stil: schwebend bei Glas und weichen Stilen, nur Linie bei Editorial & Co., sonst Leiste */
const FLOAT_TICKER = new Set(["signature", "glass", "aurora", "softui", "verspielt", "bilderbuch", "boho", "daheim", "wohnapp", "axel"]);
const LINE_TICKER = new Set(["editorial", "swiss", "rams", "galerie", "papier", "klartext", "lobby"]);
export type TickerLook = "bar" | "float" | "line";
export const tickerLookOf = (theme: string | undefined, chosen?: string): TickerLook =>
  chosen === "bar" || chosen === "float" || chosen === "line"
    ? chosen
    : // „Jahreszeiten“ kommt zur Laufzeit als saison-… an (Frühling, Weihnachten …): weich und farbig → schwebend
      FLOAT_TICKER.has(theme ?? "") || (theme ?? "").startsWith("saison")
      ? "float"
      : LINE_TICKER.has(theme ?? "")
        ? "line"
        : "bar";

export const airOf = (theme?: string): number => {
  const id = MERGED_THEMES[theme ?? ""] ?? theme;
  return THEME_DEFS.find((t) => t.id === (id === "saisonal" ? seasonTheme(new Date()) : id))?.air ?? 1;
};

/** Raster mit den Rändern des Stils – Display und Seiteneditor rechnen damit gleich */
export const withAir = <G extends { padX: number; padY: number }>(g: G, air: number): G =>
  air === 1 ? g : { ...g, padX: Math.round(g.padX * air), padY: Math.round(g.padY * air) };

/** Zusammengelegte Stile (0.12): Gold glich Ruhig, Minimal glich Klar – alte Einstellungen laufen weiter */
export const MERGED_THEMES: Record<string, string> = {
  gold: "ruhig",
  minimal: "klar",
  weissgold: "ruhig",
  // 0.x: ähnliche Stile zusammengelegt – wer sie gewählt hat, bekommt den nächsten Verwandten
  pastell: "wohnapp",
  tonal: "wohnapp",
  kacheln: "daheim",
  zeitung: "editorial",
  weihnachten: "saisonal",
  natur: "landhaus",
  glanz: "glass",
  millennium: "glass",
  handheld: "pixel",
  rgb: "arcade",
};

/** Der Stil der Marke – Standard für neue Einrichtungen und Rückfall für unbekannte Stile (wie DEFAULT_THEME in const.py) */
export const DEFAULT_THEME: Theme = "signature";

export const normalizeTheme = (theme?: string): { theme: Theme; light: boolean } => {
  const id = MERGED_THEMES[theme ?? ""] ?? theme;
  return { theme: (THEME_DEFS.some((t) => t.id === id) ? id : DEFAULT_THEME) as Theme, light: theme === "weissgold" };
};

const decl = (t: Tokens) =>
  Object.entries(t)
    .map(([k, v]) => `--af-${k}: ${v};`)
    .join("\n    ");

/** Ziffern-Schrift zur Titelschrift eines Stapels („"Ambiframe Fraunces", …“) – leer bei Systemschriften */
export const digitFace = (displayStack?: string): string => {
  const m = /^"(Ambiframe [^"]+)"/.exec(displayStack ?? "");
  return m ? `"${digitFamily(m[1])}"` : "";
};

/**
 * Zahlen überall gleich: In der Textschrift kommen die Ziffern aus der Titelschrift (Uhr, Werte, Daten, Diagramme),
 * Wörter bleiben in der Textschrift. Stile mit eigener Zahlenschrift (LED) bleiben, wie sie sind.
 */
const withNum = (t: Tokens): Tokens => {
  // „text-digits: own“: Titelschrift mit kleinen Ziffern (Instrument Serif) – kleine Texte behalten ihre eigenen
  if (t["num-font"] || t["text-digits"] === "own") return t;
  const face = digitFace(t.display);
  return face ? { ...t, sans: `${face}, ${t.sans}`, "sans-plain": t.sans } : t;
};

const themeCss = THEME_DEFS.map(
  (t) => `
  :host([theme="${t.id}"]) {
    ${decl(withNum({ ...t.shared, ...t.dark }))}
  }
  :host([theme="${t.id}"][mode="light"]) {
    ${decl(withNum({ ...t.shared, ...t.light }))}
  }`,
).join("\n");

export const themeTokens = [
  css`
    :host {
      --af-ease: cubic-bezier(0.22, 0.8, 0.24, 1);
      --af-ease-io: cubic-bezier(0.65, 0, 0.35, 1);
      --af-ease-soft: cubic-bezier(0.45, 0, 0.25, 1);
    }
  `,
  unsafeCSS(`:host { ${decl(withNum({ ...SHARED, ...readable(DARK) }))} }`),
  unsafeCSS(themeCss),
  css`
    /* Abendstimmung: dunkle Stile werden nach Sonnenuntergang etwas wärmer */
    :host([evening]:not([mode="light"])) {
      --af-ink: #f2e0c8;
      --af-ink-2: rgba(242, 224, 200, 0.64);
      --af-ink-3: rgba(242, 224, 200, 0.5);
    }
    :host([evening][theme="glass"]:not([mode="light"])) {
      --af-ink: #fbf3e4;
      --af-ink-2: rgba(251, 243, 228, 0.68);
      --af-ink-3: rgba(251, 243, 228, 0.5);
    }
  `,
];

/** Auf Fotos ist Schrift immer hell – unabhängig vom Stil. */
export const photoTokens = css`
  .onphoto {
    --af-ink: #ffffff;
    --af-ink-2: rgba(255, 255, 255, var(--af-c2, 0.78));
    --af-ink-3: rgba(255, 255, 255, var(--af-c3, 0.55));
    --af-line: rgba(255, 255, 255, 0.16);
    --af-surface: rgba(10, 10, 10, 0.28);
    --af-cold: #b8d0e6;
  }
`;

/** Nachtfarben – werden auf Seiten mit palette: night gesetzt. */
export const nightTokens = css`
  .night {
    --af-bg-art: none;
    --af-cover-1: transparent;
    --af-cover-2: transparent;
    --af-cover-3: transparent;
    --af-cover-tint: transparent;
    --af-card: rgba(106, 82, 52, 0.06);
    --af-card-filter: none;
    --af-card-shadow: none;
    --af-card-border: 1px solid rgba(106, 82, 52, 0.2);
    --af-bg: #000;
    --af-ink: #6a5234;
    --af-ink-2: #4d3b24;
    --af-ink-3: #3a2c1a;
    --af-accent: #6a5234;
    --af-line: rgba(106, 82, 52, 0.2);
    --af-surface: rgba(106, 82, 52, 0.06);
  }
`;

/** E-Ink (--af-still: 1): keine Animationen und Übergänge – in Anzeige, Seite und allen Widgets */
export const stillStyles = css`
/* E-Ink (--af-still: 1): keine Animationen und Übergänge – jedes Zwischenbild zeichnet den Bildschirm neu */
@container style(--af-still: 1) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

export const widgetStyles = [stillStyles, css`
  /* Bewegte Anzeigen (design.chart_motion / motion): Balken wachsen, Kurven zeichnen sich ein, Ringe laufen auf ihren Wert.
     Die Anzeige setzt --af-*-anim (Art), --af-tempo (Dauer), --af-from (Deutlichkeit) und --af-motion-delay: Die Bewegung
     beginnt erst, wenn der Seitenwechsel die Seite weitgehend eingeblendet hat – plus Versatz je Karte (--af-i) und Balken (--af-j). */
  :host {
    --af-motion-wait: calc(var(--af-motion-delay, 0s) + var(--af-i, 0) * var(--af-stagger, 0ms));
  }
  .bar > i,
  .meter > i,
  .pos > i,
  .grow-y {
    transform-origin: left;
    animation: var(--af-bar-anim, af-grow 1.1s cubic-bezier(0.22, 0.8, 0.24, 1) both);
    animation-duration: calc(1.1s * var(--af-tempo, 1));
    animation-delay: calc(var(--af-motion-wait) + var(--af-j, 0) * 0.6s * var(--af-tempo, 1));
    /* neuer Wert, während die Seite steht: gleiten statt springen */
    transition-property: width, height, left, right, transform;
    transition-duration: var(--af-glide, 0s);
    transition-timing-function: cubic-bezier(0.22, 0.8, 0.24, 1);
  }
  /* Säulen wachsen von unten */
  .grow-y,
  .bar > i.grow-y {
    transform-origin: bottom;
    transform-box: fill-box;
    --af-gx: 1;
    --af-gy: var(--af-from, 0);
  }
  .chart-reveal {
    animation: var(--af-curve-anim, af-reveal 1.1s cubic-bezier(0.22, 0.8, 0.24, 1) both);
    animation-duration: calc(1.1s * var(--af-tempo, 1));
    animation-delay: var(--af-motion-wait);
  }
  .ring-sweep {
    animation: var(--af-ring-anim, af-sweep 1.1s cubic-bezier(0.22, 0.8, 0.24, 1) both);
    animation-duration: calc(1.1s * var(--af-tempo, 1));
    animation-delay: var(--af-motion-wait);
    transition: stroke-dasharray var(--af-glide, 0s) cubic-bezier(0.22, 0.8, 0.24, 1);
  }
  /* Diagramm: erst die Linie, dann füllt sich die Fläche, zuletzt setzt sich ein Punkt auf den aktuellen Wert */
  .chart-reveal .fill {
    animation: af-show calc(0.8s * var(--af-tempo, 1)) ease both;
    animation-delay: calc(var(--af-motion-wait) + 0.5s * var(--af-tempo, 1));
  }
  .chart-dot {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--c, var(--af-accent));
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: var(--af-dot-anim, af-pop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both);
    animation-duration: calc(0.9s * var(--af-tempo, 1));
    animation-delay: calc(var(--af-motion-wait) + 1s * var(--af-tempo, 1));
  }
  /* Neuer Wert: Pfeil in Richtung der Änderung, blendet nach ein paar Sekunden aus */
  .num[data-trend]::after {
    content: "▲";
    display: inline-block;
    margin-left: 0.25em;
    font-size: 0.4em;
    vertical-align: 0.9em;
    color: var(--af-accent);
    animation: af-trend 6s ease both;
  }
  .num[data-trend="down"]::after {
    content: "▼";
    color: var(--af-cold, var(--af-accent));
  }
  @keyframes af-grow {
    from {
      transform: scale(var(--af-gx, var(--af-from, 0)), var(--af-gy, 1));
    }
  }
  @keyframes af-fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
  }
  @keyframes af-reveal {
    from {
      clip-path: inset(0 calc((1 - var(--af-from, 0)) * 100%) 0 0);
    }
  }
  @keyframes af-sweep {
    from {
      stroke-dasharray: 0 100;
    }
  }
  @keyframes af-pop {
    0% {
      transform: translate(-50%, -50%) scale(0);
      box-shadow: 0 0 0 0 var(--c, var(--af-accent));
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 0 14px transparent;
    }
  }
  @keyframes af-show {
    from {
      opacity: 0;
    }
  }
  @keyframes af-trend {
    0%, 70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bar > i,
    .meter > i,
    .pos > i,
    .grow-y,
    .chart-reveal,
    .chart-reveal .fill,
    .chart-dot,
    .ring-sweep {
      animation: none;
      transition: none;
    }
  }
  /* Textgröße „aus der Ferne“ (--af-far: 1): Zweitzeilen und Details entfallen, der Rest wird groß */
  @container style(--af-far: 1) {
    .b,
    .desc,
    .rm,
    .meta {
      display: none !important;
    }
  }
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: var(--af-ink);
    font-family: var(--af-sans);
    -webkit-font-smoothing: antialiased;
  }
  /* Ziffern in der Schrift des Stils für Uhr und Titel, Wörter in der Textschrift (LED-Stile: ganz Textschrift) */
  .num {
    font-family: var(--af-num-font, var(--af-sans));
    font-variant-numeric: tabular-nums lining-nums;
  }
  .display {
    font-family: var(--af-display);
    font-weight: var(--af-clock-weight);
    letter-spacing: var(--af-clock-track);
    font-optical-sizing: auto;
    /* Leuchten (Neon, LED) – nur in Stilen, die es setzen */
    text-shadow: var(--af-glow, none);
  }
  /* Überschriften: Form kommt vom Stil (Versalien gesperrt oder z. B. farbig im Satzbau) */
  .label {
    font-size: calc(16px * var(--af-fs, 1));
    letter-spacing: var(--af-label-track, 0.16em);
    text-transform: var(--af-label-case, uppercase);
    color: var(--af-label-color, var(--af-ink-3));
    font-weight: var(--af-label-weight, 500);
    font-family: var(--af-label-font, inherit);
  }
  /* Kachel ohne Überschrift (look.label: false) */
  :host([nolabel]) .label {
    display: none !important;
  }
  .muted {
    color: var(--af-ink-2);
  }
  .faint {
    color: var(--af-ink-3);
  }
  .ic {
    width: 1em;
    height: 1em;
    flex: none;
    display: inline-block;
    vertical-align: -0.14em;
  }
  /* Karten-Form kommt vom Stil: Fläche, Glas oder nur eine Linie oben */
  .card {
    box-sizing: border-box;
    height: 100%;
    /* oben eine Tönung in der Cover-Farbe (sonst durchsichtig) – nicht bei Stilen, deren Karten nur eine Linie sind */
    background:
      linear-gradient(var(--af-card-tint, var(--af-cover-tint)), var(--af-card-tint, var(--af-cover-tint))),
      var(--af-card, var(--af-surface));
    border: var(--af-card-border, 1px solid var(--af-line));
    border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
    border-radius: var(--af-card-radius, 40px);
    box-shadow: var(--af-card-shadow, none);
    backdrop-filter: var(--af-card-filter, none);
    -webkit-backdrop-filter: var(--af-card-filter, none);
    padding: var(--af-card-pad, 40px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--af-ink-3);
    flex: none;
  }
`];

/** Für einfache Widgets: Ausrichtung kommt von der Rasterzelle (align / valign). */
export const alignStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: var(--af-valign, flex-start);
    align-items: var(--af-align, flex-start);
    text-align: var(--af-text-align, left);
  }
`;
