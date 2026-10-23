// Design-Tokens: sieben Stile, jeder hell und dunkel, dazu Abend, Nacht, Fotos und gemeinsame Widget-Stile
import { css, unsafeCSS } from "lit";
import { fontStack } from "./fonts";
import type { AmbientKind, ColorSet, Theme } from "./types";

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
  /** Schriften und Formen – gelten hell wie dunkel */
  shared: Tokens;
  dark: Tokens;
  light: Tokens;
}

const SERIF = fontStack("fraunces");
const SANS = fontStack("inter");
/** Schrift wie auf Desktops um 2001 (auf Tablets ohne Tahoma: Verdana oder Systemschrift) */
const TAHOMA = 'Tahoma, Verdana, "Segoe UI", system-ui, sans-serif';

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

export const THEME_DEFS: ThemeDef[] = [
  {
    id: "ruhig",
    name: "Ruhig",
    hint: "Serifen-Uhr, warmes Weiß, Bambus",
    ambient: "none",
    shared: SHARED,
    dark: DARK,
    light: LIGHT,
  },
  {
    id: "klar",
    name: "Klar",
    hint: "StandBy-Stil, schlicht, Salbei",
    ambient: "none",
    shared: { ...SHARED, display: SANS, "clock-weight": "200", "clock-track": "-0.05em" },
    dark: { ...DARK, accent: "#a8cab5", "accent-soft": "rgba(168, 202, 181, 0.14)" },
    light: {
      ...LIGHT,
      bg: "#f3f4f1",
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
    id: "gold",
    name: "Gold",
    hint: "Weiß und Gold – dunkel auf Schwarz, hell auf Elfenbein",
    ambient: "none",
    shared: SHARED,
    dark: {
      ...DARK,
      bg: "#09090a",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.68)",
      "ink-3": "rgba(255, 255, 255, 0.42)",
      line: "rgba(255, 255, 255, 0.1)",
      surface: "rgba(255, 255, 255, 0.045)",
      accent: "#d9b45f",
      "accent-soft": "rgba(217, 180, 95, 0.15)",
      cold: "#a9c4dc",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f6f3ec",
      ink: "#16130f",
      "ink-2": "rgba(22, 19, 15, 0.64)",
      "ink-3": "rgba(22, 19, 15, 0.42)",
      line: "rgba(22, 19, 15, 0.11)",
      surface: "rgba(255, 255, 255, 0.7)",
      accent: "#a8803a",
      "accent-soft": "rgba(168, 128, 58, 0.13)",
      cold: "#3f6f9c",
      panel: "rgba(255, 255, 255, 0.94)",
      chip: "rgba(255, 255, 255, 0.78)",
      shadow: "0 30px 80px rgba(60, 45, 20, 0.18)",
      veil: "rgba(246, 243, 236, 0.55)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
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
    id: "minimal",
    name: "Minimal",
    hint: "Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie",
    ambient: "none",
    shared: {
      ...SHARED,
      ...RULED,
      display: fontStack("geist"),
      sans: fontStack("geist"),
      "clock-weight": "400",
      "clock-track": "-0.055em",
      "card-rule": "1px solid color-mix(in srgb, currentColor 22%, transparent)",
    },
    dark: {
      ...DARK,
      bg: "#000000",
      ink: "#ffffff",
      "ink-2": "rgba(255, 255, 255, 0.6)",
      "ink-3": "rgba(255, 255, 255, 0.38)",
      line: "rgba(255, 255, 255, 0.14)",
      surface: "rgba(255, 255, 255, 0.06)",
      accent: "#ff5a36",
      "accent-soft": "rgba(255, 90, 54, 0.14)",
      cold: "#7fb2ff",
      panel: "rgba(16, 16, 16, 0.96)",
      chip: "rgba(0, 0, 0, 0.7)",
      veil: "rgba(0, 0, 0, 0.55)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#f6f6f4",
      ink: "#0b0b0b",
      "ink-2": "rgba(11, 11, 11, 0.6)",
      "ink-3": "rgba(11, 11, 11, 0.4)",
      line: "rgba(11, 11, 11, 0.12)",
      surface: "rgba(11, 11, 11, 0.05)",
      accent: "#e8401c",
      "accent-soft": "rgba(232, 64, 28, 0.1)",
      cold: "#2f6fe0",
      panel: "rgba(250, 250, 248, 0.97)",
      chip: "rgba(250, 250, 248, 0.85)",
      veil: "rgba(246, 246, 244, 0.6)",
      shadow: "0 30px 80px rgba(0, 0, 0, 0.12)",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
    },
  },
  {
    id: "pixel",
    name: "Pixel",
    hint: "LED-Punktmatrix wie eine Pixel-Uhr – kräftige Farben auf Schwarz",
    ambient: "none",
    shared: {
      ...SHARED,
      display: fontStack("doto"),
      sans: fontStack("geist"),
      "clock-weight": "800",
      "clock-track": "0.02em",
      "card-radius": "18px",
      "label-font": fontStack("doto"),
      "label-weight": "800",
      "label-track": "0.12em",
    },
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
      ...SHARED,
      display: fontStack("doto"),
      sans: fontStack("space-grotesk"),
      "clock-weight": "900",
      "clock-track": "0.04em",
      "card-radius": "6px",
      "label-font": fontStack("doto"),
      "label-weight": "900",
      "label-track": "0.18em",
    },
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
    id: "tonal",
    name: "Tonal",
    hint: "Runde, farbige Flächen in Pastelltönen, große freundliche Schrift",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("outfit"),
      sans: fontStack("jakarta"),
      "clock-weight": "500",
      "clock-track": "-0.02em",
      "card-radius": "36px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "700",
      "label-color": "var(--af-accent)",
    },
    dark: {
      ...DARK,
      bg: "#141218",
      ink: "#e6e0e9",
      "ink-2": "rgba(230, 224, 233, 0.72)",
      "ink-3": "rgba(230, 224, 233, 0.5)",
      line: "rgba(230, 224, 233, 0.1)",
      surface: "rgba(208, 188, 255, 0.08)",
      accent: "#d0bcff",
      "accent-soft": "rgba(208, 188, 255, 0.18)",
      cold: "#a8c7fa",
      good: "#80d99a",
      alert: "#ffb4ab",
      card: "#2b2930",
      "card-border": "0 solid transparent",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
      panel: "rgba(43, 41, 48, 0.97)",
      chip: "rgba(43, 41, 48, 0.85)",
      veil: "rgba(20, 18, 24, 0.55)",
    },
    light: {
      ...LIGHT,
      bg: "#fef7ff",
      ink: "#1d1b20",
      "ink-2": "rgba(29, 27, 32, 0.7)",
      "ink-3": "rgba(29, 27, 32, 0.48)",
      line: "rgba(29, 27, 32, 0.08)",
      surface: "rgba(103, 80, 164, 0.06)",
      accent: "#6750a4",
      "accent-soft": "rgba(103, 80, 164, 0.12)",
      cold: "#2b62c4",
      good: "#2e7d4f",
      alert: "#ba1a1a",
      card: "#f3edf7",
      "card-border": "0 solid transparent",
      colon: "var(--af-accent)",
      "colon-opacity": "1",
      panel: "rgba(243, 237, 247, 0.97)",
      chip: "rgba(243, 237, 247, 0.85)",
    },
  },
  {
    id: "kacheln",
    name: "Kacheln",
    hint: "Abgerundete Widget-Kacheln über einem weichen Hintergrundbild, farbige Überschriften",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: SANS,
      "clock-weight": "600",
      "clock-track": "-0.04em",
      "card-radius": "30px",
      "card-pad": "30px",
      "label-case": "none",
      "label-track": "0",
      "label-weight": "650",
      "label-color": "var(--af-accent)",
    },
    dark: {
      ...DARK,
      bg: "#0d1022",
      "bg-art": blobs("rgba(80, 90, 255, 0.55)", "rgba(255, 80, 150, 0.4)", "rgba(255, 170, 60, 0.35)"),
      ink: "#ffffff",
      "ink-2": "rgba(235, 235, 245, 0.68)",
      "ink-3": "rgba(235, 235, 245, 0.45)",
      line: "rgba(255, 255, 255, 0.12)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#0a84ff",
      "accent-soft": "rgba(10, 132, 255, 0.18)",
      cold: "#64d2ff",
      good: "#30d158",
      alert: "#ff453a",
      card: "rgba(28, 28, 32, 0.66)",
      "card-border": "0 solid transparent",
      "card-filter": "blur(30px) saturate(1.8)",
      "card-shadow": "0 10px 30px rgba(0, 0, 0, 0.25)",
      panel: "rgba(28, 28, 32, 0.9)",
      chip: "rgba(28, 28, 32, 0.66)",
      veil: "rgba(10, 12, 26, 0.45)",
    },
    light: {
      ...LIGHT,
      bg: "#dfe6f5",
      "bg-art": blobs("rgba(120, 140, 255, 0.55)", "rgba(255, 150, 190, 0.5)", "rgba(255, 200, 120, 0.5)"),
      ink: "#000000",
      "ink-2": "rgba(60, 60, 67, 0.75)",
      "ink-3": "rgba(60, 60, 67, 0.5)",
      line: "rgba(60, 60, 67, 0.12)",
      surface: "rgba(255, 255, 255, 0.5)",
      accent: "#007aff",
      "accent-soft": "rgba(0, 122, 255, 0.12)",
      cold: "#32ade6",
      good: "#34c759",
      alert: "#ff3b30",
      card: "rgba(255, 255, 255, 0.72)",
      "card-border": "0 solid transparent",
      "card-filter": "blur(30px) saturate(1.8)",
      "card-shadow": "0 10px 30px rgba(40, 50, 100, 0.12)",
      panel: "rgba(255, 255, 255, 0.92)",
      chip: "rgba(255, 255, 255, 0.72)",
      veil: "rgba(223, 230, 245, 0.45)",
    },
  },
  {
    id: "klartext",
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
      c3: "0.78",
    },
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
    id: "millennium",
    name: "Millennium",
    hint: "Wie ein Desktop um 2001: blaue Fensterleisten, grüner Hügel, blauer Himmel",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: TAHOMA,
      sans: TAHOMA,
      "clock-weight": "700",
      "clock-track": "-0.01em",
      "card-radius": "9px 9px 4px 4px",
      "card-pad": "5px 22px 22px",
      "label-font": TAHOMA,
      "label-case": "none",
      "label-track": "0",
      "label-weight": "700",
      "label-color": "#ffffff",
    },
    dark: {
      ...DARK,
      bg: "#0d1b33",
      "bg-art":
        "radial-gradient(140% 55% at 25% 108%, #1f3d1a 0 52%, transparent 52.5%), radial-gradient(120% 45% at 85% 110%, #2a4d22 0 50%, transparent 50.5%), " +
        "linear-gradient(180deg, #050c1c 0%, #10264a 60%, #1d3b66 100%)",
      ink: "#f2f2f2",
      "ink-2": "rgba(242, 242, 242, 0.72)",
      "ink-3": "rgba(242, 242, 242, 0.48)",
      line: "rgba(255, 255, 255, 0.12)",
      surface: "rgba(255, 255, 255, 0.06)",
      accent: "#4fc04a",
      "accent-soft": "rgba(79, 192, 74, 0.16)",
      cold: "#5c9cff",
      card: "linear-gradient(180deg, #3a3a3a 0, #1b1b1b 28px, #2b2b2b 28px)",
      "card-border": "1px solid #000000",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px rgba(0, 0, 0, 0.45)",
    },
    light: {
      ...LIGHT,
      bg: "#5f9de8",
      "bg-art":
        "radial-gradient(140% 55% at 25% 108%, #4f9a35 0 52%, transparent 52.5%), radial-gradient(120% 45% at 85% 110%, #6db446 0 50%, transparent 50.5%), " +
        "radial-gradient(30% 14% at 70% 22%, rgba(255, 255, 255, 0.85), transparent 70%), linear-gradient(180deg, #1f63cf 0%, #5f9de8 45%, #b3d4f5 75%)",
      ink: "#111111",
      "ink-2": "rgba(17, 17, 17, 0.72)",
      "ink-3": "rgba(17, 17, 17, 0.5)",
      line: "rgba(0, 0, 0, 0.14)",
      surface: "rgba(255, 255, 255, 0.5)",
      accent: "#2f9e31",
      "accent-soft": "rgba(47, 158, 49, 0.14)",
      "on-accent": "#ffffff",
      cold: "#0b56d6",
      card: "linear-gradient(180deg, #3d8af7 0, #0a5fe0 4px, #0058e6 24px, #0b50cc 28px, #ece9d8 28px)",
      "card-border": "1px solid #0831d9",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 6px 18px rgba(0, 30, 90, 0.35)",
    },
  },
  {
    id: "glanz",
    name: "Glanz",
    hint: "Glänzendes Glas, Wasser und Himmel – der freundliche Look um 2008",
    ambient: "bubbles",
    tiles: true,
    shared: { ...SHARED, display: fontStack("nunito"), sans: fontStack("nunito"), "clock-weight": "300", "clock-track": "-0.02em", "card-radius": "22px", "label-case": "none", "label-track": "0", "label-weight": "700", "label-color": "var(--af-accent)" },
    dark: {
      ...DARK,
      bg: "#021827",
      "bg-art":
        "radial-gradient(120% 55% at 50% 118%, rgba(60, 170, 70, 0.45) 0 45%, transparent 46%), radial-gradient(60% 50% at 75% 15%, rgba(80, 180, 255, 0.35), transparent 70%), " +
        "linear-gradient(180deg, #03243d 0%, #064a73 60%, #0a6c8e 100%)",
      ink: "#f2fbff",
      "ink-2": "rgba(242, 251, 255, 0.74)",
      "ink-3": "rgba(242, 251, 255, 0.5)",
      line: "rgba(255, 255, 255, 0.16)",
      surface: "rgba(255, 255, 255, 0.08)",
      accent: "#5fd0ff",
      "accent-soft": "rgba(95, 208, 255, 0.16)",
      cold: "#5fd0ff",
      good: "#7fe07a",
      card: "linear-gradient(180deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.04) 52%, rgba(255, 255, 255, 0.1) 100%)",
      "card-border": "1px solid rgba(255, 255, 255, 0.35)",
      "card-filter": "blur(14px) saturate(1.5)",
      "card-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 12px 30px rgba(0, 20, 40, 0.4)",
    },
    light: {
      ...LIGHT,
      bg: "#a9e2fb",
      "bg-art":
        "radial-gradient(120% 60% at 50% 118%, #7fd06b 0 45%, #5fb84f 45.4%, transparent 46%), radial-gradient(50% 40% at 80% 18%, rgba(255, 255, 255, 0.75), transparent 70%), " +
        "linear-gradient(180deg, #2fa8ec 0%, #a9e2fb 55%, #e8f8ff 100%)",
      ink: "#0b2a44",
      "ink-2": "rgba(11, 42, 68, 0.72)",
      "ink-3": "rgba(11, 42, 68, 0.5)",
      line: "rgba(11, 42, 68, 0.12)",
      surface: "rgba(255, 255, 255, 0.5)",
      accent: "#0088cc",
      "accent-soft": "rgba(0, 136, 204, 0.14)",
      cold: "#0088cc",
      good: "#2f9a2f",
      card: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 48%, rgba(255, 255, 255, 0.4) 52%, rgba(255, 255, 255, 0.6) 100%)",
      "card-border": "1px solid rgba(255, 255, 255, 0.95)",
      "card-filter": "blur(12px) saturate(1.4)",
      "card-shadow": "inset 0 1px 0 #ffffff, 0 12px 30px rgba(0, 80, 140, 0.18)",
    },
  },
  {
    id: "handheld",
    name: "Handheld",
    hint: "Vier Grüntöne und Pixelschrift wie auf einer alten Spielkonsole",
    ambient: "none",
    tiles: true,
    shared: {
      ...SHARED,
      display: fontStack("doto"),
      sans: fontStack("space-grotesk"),
      "clock-weight": "900",
      "clock-track": "0.02em",
      "card-radius": "4px",
      "label-font": fontStack("doto"),
      "label-weight": "900",
      "label-track": "0.12em",
      // LCD-Raster
      "bg-size": "4px 4px, 4px 4px",
    },
    dark: {
      ...DARK,
      bg: "#0f380f",
      "bg-art": "linear-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
      ink: "#9bbc0f",
      "ink-2": "#8bac0f",
      "ink-3": "#5a7f1a",
      line: "#306230",
      surface: "rgba(155, 188, 15, 0.08)",
      accent: "#9bbc0f",
      "accent-soft": "rgba(155, 188, 15, 0.16)",
      cold: "#8bac0f",
      good: "#9bbc0f",
      alert: "#c4d84a",
      card: "#0f380f",
      "card-border": "3px solid #306230",
      panel: "rgba(15, 56, 15, 0.96)",
      chip: "rgba(15, 56, 15, 0.85)",
      veil: "rgba(15, 56, 15, 0.6)",
      colon: "var(--af-ink)",
      "colon-opacity": "1",
    },
    light: {
      ...LIGHT,
      bg: "#9bbc0f",
      "bg-art": "linear-gradient(rgba(15, 56, 15, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 56, 15, 0.07) 1px, transparent 1px)",
      ink: "#0f380f",
      "ink-2": "#306230",
      "ink-3": "#4b6f2b",
      line: "#306230",
      surface: "rgba(15, 56, 15, 0.08)",
      accent: "#0f380f",
      "accent-soft": "rgba(15, 56, 15, 0.14)",
      cold: "#306230",
      good: "#0f380f",
      alert: "#0f380f",
      card: "#8bac0f",
      "card-border": "3px solid #306230",
      panel: "rgba(139, 172, 15, 0.97)",
      chip: "rgba(139, 172, 15, 0.9)",
      veil: "rgba(155, 188, 15, 0.6)",
      colon: "var(--af-ink)",
      "colon-opacity": "1",
    },
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    hint: "Grundfarben, klare Formen, kräftige Kanten",
    ambient: "none",
    tiles: true,
    shared: { ...SHARED, display: fontStack("outfit"), sans: fontStack("space-grotesk"), "clock-weight": "800", "clock-track": "-0.03em", "card-radius": "0", "label-weight": "800", "label-track": "0.14em" },
    dark: {
      ...DARK,
      bg: "#161616",
      "bg-art":
        "radial-gradient(circle at 90% 12%, #c9a227 0 9%, transparent 9.2%), radial-gradient(circle at 6% 94%, #b53a28 0 13%, transparent 13.2%), " +
        "linear-gradient(90deg, transparent 74%, rgba(40, 80, 160, 0.55) 74% 77%, transparent 77%)",
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
        "radial-gradient(circle at 90% 12%, #f0b323 0 9%, transparent 9.2%), radial-gradient(circle at 6% 94%, #d33f2b 0 13%, transparent 13.2%), " +
        "linear-gradient(90deg, transparent 74%, #1d4e9e 74% 77%, transparent 77%)",
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
    shared: { ...SHARED, display: fontStack("playfair"), sans: fontStack("jakarta"), "clock-weight": "500", "clock-track": "-0.01em", "card-radius": "28px", "label-case": "none", "label-track": "0.02em", "label-weight": "600", "label-color": "var(--af-accent)" },
    dark: {
      ...DARK,
      bg: "#2a201b",
      "bg-art":
        "radial-gradient(60% 80% at 100% 100%, rgba(224, 154, 116, 0.18) 0 40%, transparent 40.5%), radial-gradient(40% 55% at 100% 100%, rgba(214, 170, 90, 0.16) 0 60%, transparent 60.5%), " +
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
      "bg-art":
        "radial-gradient(60% 80% at 100% 100%, rgba(192, 108, 70, 0.22) 0 40%, transparent 40.5%), radial-gradient(40% 55% at 100% 100%, rgba(224, 169, 86, 0.25) 0 60%, transparent 60.5%), " +
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
      "bg-size": "3px 3px, 3px 3px",
    },
    dark: {
      ...DARK,
      bg: "#1d211b",
      "bg-art": "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
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
      "bg-art": "linear-gradient(rgba(120, 100, 70, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 100, 70, 0.045) 1px, transparent 1px)",
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
    id: "natur",
    name: "Natur",
    hint: "Moos, Blätter und Holz – frische Grüntöne und weiche Formen",
    ambient: "none",
    tiles: true,
    shared: { ...SHARED, display: fontStack("fraunces"), sans: fontStack("jakarta"), "clock-weight": "350", "clock-track": "-0.02em", "card-radius": "24px", "label-case": "none", "label-track": "0", "label-weight": "650", "label-color": "var(--af-accent)" },
    dark: {
      ...DARK,
      bg: "#0d1a12",
      "bg-art": blobs("rgba(60, 120, 60, 0.4)", "rgba(120, 110, 50, 0.28)", "rgba(40, 100, 80, 0.32)"),
      ink: "#e6efe0",
      "ink-2": "rgba(230, 239, 224, 0.72)",
      "ink-3": "rgba(230, 239, 224, 0.48)",
      line: "rgba(230, 239, 224, 0.12)",
      surface: "rgba(230, 239, 224, 0.05)",
      accent: "#9cc77a",
      "accent-soft": "rgba(156, 199, 122, 0.16)",
      cold: "#7fb8c4",
      good: "#9cc77a",
      alert: "#e0875a",
      card: "rgba(255, 255, 255, 0.05)",
      "card-border": "1px solid rgba(156, 199, 122, 0.16)",
      "card-filter": "blur(12px)",
    },
    light: {
      ...LIGHT,
      bg: "#eef2e6",
      "bg-art": blobs("rgba(120, 170, 90, 0.38)", "rgba(210, 195, 120, 0.32)", "rgba(90, 150, 110, 0.32)"),
      ink: "#23301f",
      "ink-2": "rgba(35, 48, 31, 0.72)",
      "ink-3": "rgba(35, 48, 31, 0.48)",
      line: "rgba(35, 48, 31, 0.1)",
      surface: "rgba(255, 255, 255, 0.5)",
      accent: "#4f7d36",
      "accent-soft": "rgba(79, 125, 54, 0.13)",
      cold: "#4a8a9a",
      good: "#4f7d36",
      alert: "#c0612f",
      card: "rgba(255, 255, 255, 0.6)",
      "card-border": "1px solid rgba(80, 110, 60, 0.15)",
      "card-filter": "blur(12px)",
    },
  },
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

/** Für Editor-Auswahl und Vorschauen */
export const THEMES = THEME_DEFS.map(({ id, name, hint, ambient, tiles, flap }) => ({ id, name, hint, ambient, tiles, flap }));

/** Alte Stilnamen: „Weißgold“ ist jetzt „Gold“ in hell. */
export const normalizeTheme = (theme?: string): { theme: Theme; light: boolean } =>
  theme === "weissgold"
    ? { theme: "gold", light: true }
    : { theme: (THEME_DEFS.some((t) => t.id === theme) ? theme : "ruhig") as Theme, light: false };

const decl = (t: Tokens) =>
  Object.entries(t)
    .map(([k, v]) => `--af-${k}: ${v};`)
    .join("\n    ");

const themeCss = THEME_DEFS.map(
  (t) => `
  :host([theme="${t.id}"]) {
    ${decl({ ...t.shared, ...t.dark })}
  }
  :host([theme="${t.id}"][mode="light"]) {
    ${decl({ ...t.shared, ...t.light })}
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
  unsafeCSS(`:host { ${decl({ ...SHARED, ...DARK })} }`),
  unsafeCSS(themeCss),
  css`
    /* Abendstimmung: dunkle Stile werden nach Sonnenuntergang etwas wärmer */
    :host([evening]:not([mode="light"])) {
      --af-ink: #f2e0c8;
      --af-ink-2: rgba(242, 224, 200, 0.64);
      --af-ink-3: rgba(242, 224, 200, 0.38);
    }
    :host([evening][theme="gold"]:not([mode="light"])),
    :host([evening][theme="glass"]:not([mode="light"])),
    :host([evening][theme="minimal"]:not([mode="light"])) {
      --af-ink: #fbf3e4;
      --af-ink-2: rgba(251, 243, 228, 0.68);
      --af-ink-3: rgba(251, 243, 228, 0.42);
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

export const widgetStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: var(--af-ink);
    font-family: var(--af-sans);
    -webkit-font-smoothing: antialiased;
  }
  .num {
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
`;

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
