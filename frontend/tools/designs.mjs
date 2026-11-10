// Alle Stile als Daten für andere Projekte (z. B. Ambidash): node tools/designs.mjs [Zielordner]
// Liest THEME_DEFS, PALETTES und fonts.json direkt aus dem Quellcode – nichts wird abgeschrieben.
// Schreibt ambiframe-designs.json (zum Einlesen) und ambiframe-designs.md (zum Lesen).
import { build } from "esbuild";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SRC = resolve(import.meta.dirname, "../src");
const OUT = resolve(process.argv[2] ?? resolve(import.meta.dirname, "../../exports"));
const tmp = join(OUT, ".designs-entry.mjs");
mkdirSync(OUT, { recursive: true });

await build({
  stdin: { contents: `export { THEME_DEFS, PALETTES } from "./styles";`, resolveDir: SRC, loader: "ts" },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: tmp,
  logLevel: "silent",
});
const { THEME_DEFS, PALETTES } = await import(pathToFileURL(tmp).href);
rmSync(tmp, { force: true });
const FONTS = JSON.parse(readFileSync(join(SRC, "fonts.json"), "utf8"));

// Schriftstapel („"Ambiframe Inter", system-ui …“) → Schrift-ID und Name
const fontOf = (stack) => {
  if (!stack) return null;
  const f = FONTS.find((x) => stack.startsWith(`"Ambiframe ${x.name.replace(/ \(.*\)$/, "")}"`));
  return f ? { id: f.id, name: f.name, stack } : { id: null, name: stack.split(",")[0].replace(/"/g, ""), stack };
};

/** Was jeder Wert bedeutet – gilt für alle Stile (in Ambiframe als CSS-Variable --af-<name>) */
const TOKENS = {
  bg: "Hintergrundfarbe der Anzeige",
  "bg-art": "Hintergrundbild aus CSS (Verläufe, Muster, Motive); none = keins",
  "bg-size": "background-size für bg-art (z. B. Punktraster)",
  ink: "Haupttext",
  "ink-2": "Zweittext (Untertitel, Beschriftungen)",
  "ink-3": "Leiser Text (Meta, Einheiten)",
  line: "Trennlinien",
  surface: "Flächen ohne Karte (z. B. Balken-Hintergrund)",
  accent: "Akzentfarbe (Doppelpunkt der Uhr, Symbole, Hervorhebung)",
  "accent-soft": "Akzent als zarte Fläche",
  cold: "Kalt / Info (Regen, Kälte)",
  alert: "Warnung / Fehler",
  good: "Gut / Erfolg",
  panel: "Hinweis-Karten (Momente, Menüs)",
  chip: "Kleine Schilder über Fotos",
  shadow: "Schatten großer Flächen",
  veil: "Abdunklung über Fotos",
  mist: "Leichter Schleier",
  colon: "Farbe des Doppelpunkts der Uhr",
  "colon-opacity": "Deckkraft des Doppelpunkts",
  card: "Kartenfläche",
  "card-tint": "Tönung über der Kartenfläche",
  "card-border": "Kartenrahmen (CSS border)",
  "card-shadow": "Kartenschatten (CSS box-shadow)",
  "card-filter": "backdrop-filter der Karte (Glas)",
  "card-radius": "Eckenradius der Karten",
  "card-pad": "Innenabstand der Karten",
  "card-rule": "Linie über Blöcken statt Karte (Editorial-Stile)",
  display: "Schrift für Uhr, Titel und Zahlen",
  sans: "Schrift für Text",
  "num-font": "Eigene Schrift nur für Zahlen (LED-Stile)",
  "clock-weight": "Strichstärke der Uhr",
  "clock-track": "Laufweite der Uhr",
  "label-case": "Überschriften: uppercase oder none",
  "label-track": "Laufweite der Überschriften",
  "label-weight": "Strichstärke der Überschriften",
  "label-color": "Farbe der Überschriften",
  "label-font": "Eigene Schrift für Überschriften",
  "photo-motion": "Bewegung der Fotos (none = ruhig)",
  "photo-filter": "CSS-Filter auf Fotos (z. B. Graustufen)",
  "photo-frame": "Passepartout um Fotos (Galerie)",
  "photo-inset": "Abstand des Fotos zum Rand",
  still: "1 = keine Animationen und Übergänge (E-Ink)",
  wide: "Faktor für breite Schriften (LED-Punkte)",
};

const themes = THEME_DEFS.map((t) => ({
  id: t.id,
  name: t.name,
  hint: t.hint,
  ambient: t.ambient,
  tiles: !!t.tiles,
  flap: !!t.flap,
  still: !!t.still,
  // Fassungen von „Jahreszeiten“ – nicht einzeln wählbar, wechseln nach Datum
  seasonal: !!t.hidden,
  fonts: { display: fontOf(t.shared.display), text: fontOf(t.shared.sans), numbers: fontOf(t.shared["num-font"]) },
  shared: t.shared,
  dark: t.dark,
  light: t.light,
}));
const fonts = FONTS.map(({ id, name, kind, pkg, weight }) => ({ id, name, kind, package: pkg, weights: weight, license: "SIL Open Font License 1.1" }));
const today = new Date().toISOString().slice(0, 10);

writeFileSync(
  join(OUT, "ambiframe-designs.json"),
  JSON.stringify({ source: "Ambiframe – frontend/src/styles.ts", generated: today, tokens: TOKENS, fonts, themes, palettes: PALETTES }, null, 2) + "\n",
);

// Lesbare Übersicht
const v = (c) => (c ? `\`${c}\`` : "–");
const own = themes.filter((t) => !t.seasonal);
const md = [
  "# Ambiframe – Designs",
  "",
  `Erzeugt aus \`frontend/src/styles.ts\` am ${today} (\`node frontend/tools/designs.mjs\`). Alle Werte vollständig in \`ambiframe-designs.json\`.`,
  "",
  "## So ist ein Stil aufgebaut",
  "",
  "Jeder Stil hat **gemeinsame Werte** (Schriften, Formen) und je einen Satz **Farben für hell und dunkel**. In Ambiframe sind das CSS-Variablen `--af-<name>`.",
  "",
  "| Wert | Bedeutung |",
  "|---|---|",
  ...Object.entries(TOKENS).map(([k, d]) => `| \`${k}\` | ${d} |`),
  "",
  "## Schriften",
  "",
  "Alle über Fontsource, Lizenz SIL Open Font License 1.1.",
  "",
  "| ID | Name | Art | Strichstärken | Paket |",
  "|---|---|---|---|---|",
  ...fonts.map((f) => `| ${f.id} | ${f.name} | ${f.kind} | ${f.weights} | \`${f.package}\` |`),
  "",
  `## Stile (${own.length})`,
  "",
  "| Stil | Titel/Zahlen | Text | Dunkel: Grund · Text · Akzent | Hell: Grund · Text · Akzent | Animation | Kacheln |",
  "|---|---|---|---|---|---|---|",
  ...own.map(
    (t) =>
      `| **${t.name}** (\`${t.id}\`) | ${t.fonts.display?.name ?? "–"} ${t.shared["clock-weight"] ?? ""} | ${t.fonts.text?.name ?? "–"} | ${v(t.dark.bg)} · ${v(t.dark.ink)} · ${v(t.dark.accent)} | ${v(t.light.bg)} · ${v(t.light.ink)} · ${v(t.light.accent)} | ${t.ambient} | ${t.tiles ? "ja" : "–"} |`,
  ),
  "",
  ...own.flatMap((t) => [
    `### ${t.name} (\`${t.id}\`)`,
    "",
    t.hint,
    "",
    `Schriften: ${t.fonts.display?.name ?? "–"} (Titel/Zahlen) · ${t.fonts.text?.name ?? "–"} (Text)${t.fonts.numbers ? ` · ${t.fonts.numbers.name} (Zahlen)` : ""} · Animation: ${t.ambient}${t.tiles ? " · Kachel-Stil" : ""}${t.flap ? " · Fallblatt" : ""}${t.still ? " · ohne Bewegung" : ""}`,
    "",
    "| Wert | Dunkel | Hell |",
    "|---|---|---|",
    ...[...new Set([...Object.keys(t.dark), ...Object.keys(t.light)])].map((k) => `| \`${k}\` | ${v(t.dark[k])} | ${v(t.light[k])} |`),
    "",
    "Gemeinsam: " +
      Object.entries(t.shared)
        .filter(([k]) => !["display", "sans", "num-font", "label-font"].includes(k))
        .map(([k, x]) => `\`${k}\`: ${x}`)
        .join(" · "),
    "",
  ]),
  "## Jahreszeiten (Stil „Jahreszeiten“ wechselt nach Datum)",
  "",
  ...themes.filter((t) => t.seasonal).map((t) => `- **${t.name}** (\`${t.id}\`): dunkel ${v(t.dark.bg)} / ${v(t.dark.accent)}, hell ${v(t.light.bg)} / ${v(t.light.accent)}, Animation ${t.ambient}`),
  "",
  "## Farbpaletten (liegen über jedem Stil)",
  "",
  "| Palette | Dunkel: Grund · Text · Akzent · Karte | Hell: Grund · Text · Akzent · Karte |",
  "|---|---|---|",
  ...Object.entries(PALETTES).map(([id, p]) => `| **${p.name}** (\`${id}\`) | ${v(p.dark.bg)} · ${v(p.dark.ink)} · ${v(p.dark.accent)} · ${v(p.dark.card)} | ${v(p.light.bg)} · ${v(p.light.ink)} · ${v(p.light.accent)} · ${v(p.light.card)} |`),
  "",
];
writeFileSync(join(OUT, "ambiframe-designs.md"), md.join("\n"));
console.log(`${own.length} Stile, ${themes.length - own.length} Jahreszeiten, ${Object.keys(PALETTES).length} Paletten, ${fonts.length} Schriften → ${OUT}`);
