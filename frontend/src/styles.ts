// Design-Tokens: sieben Stile, jeder hell und dunkel, dazu Abend, Nacht, Fotos und gemeinsame Widget-Stile
import { css, unsafeCSS } from "lit";
import { fontStack } from "./fonts";
import type { AmbientKind, Theme } from "./types";

type Tokens = Record<string, string>;

interface ThemeDef {
  id: Theme;
  name: string;
  hint: string;
  /** Hintergrund-Animation, wenn im Design nichts anderes gewählt ist */
  ambient: AmbientKind;
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
    name: "Liquid Glass",
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
];

/** Für Editor-Auswahl und Vorschauen */
export const THEMES = THEME_DEFS.map(({ id, name, hint, ambient }) => ({ id, name, hint, ambient }));

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
  }
  .label {
    font-size: calc(16px * var(--af-fs, 1));
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--af-ink-3);
    font-weight: 500;
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
    background: var(--af-card, var(--af-surface));
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
