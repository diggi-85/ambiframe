// Sammelt alle Texte, die übersetzt werden müssen: t("…")-Aufrufe und Beschriftungen der Editor-Formulare
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = join(__dirname, "..", "src");

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : p.endsWith(".ts") && !p.endsWith("i18n-en.ts") ? [p] : [];
  });

const STR = String.raw`"((?:[^"\\\n]|\\.)*)"`;
const unescape = (s: string) => s.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");

/** HA-Domänen und Aktionsnamen, die in Listen wie [x, "y"] auftauchen, aber kein Text sind */
const CODE_WORDS = new Set(
  "binary_sensor camera climate counter device_tracker image input_button more_info on perform person sensor waste weather calendar light switch cover media_player vacuum script scene input_boolean input_number number event zone light dark landscape portrait tap_action hold_action live alarm".split(" "),
);

/** Texte, die nicht übersetzt werden: Code, Beispiele, Links, reine Zahlen */
const isCode = (s: string) =>
  CODE_WORDS.has(s) ||
  !/[A-Za-zÄÖÜäöüß]{2,}/.test(s) || /^(https?:|\/|\{\{|mdi:|media-source:|#)/.test(s) || /^[a-z_]+\.[a-z0-9_.…*]+$/.test(s) || /^[A-Z]{2,}$/.test(s);

export const collectKeys = (): Set<string> => {
  const keys = new Set<string>();
  const add = (s: string) => {
    const v = unescape(s);
    if (v && !isCode(v)) keys.add(v);
  };
  for (const file of files(SRC)) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(new RegExp(String.raw`\bt\(\s*` + STR, "g"))) {
      const v = unescape(m[1]);
      if (v.includes(" ")) keys.add(v);
      else add(m[1]);
    }
    // t({ a: "…", b: "…" }[x]) – Werte des Objekts
    for (const m of src.matchAll(/\bt\(\{([^}]*)\}\[/g)) for (const v of m[1].matchAll(new RegExp(STR, "g"))) add(v[1]);
    const form = /editor[\\/](schemas|form|profiles)\.ts$|panel[\\/]editor\.ts$|registry\.ts$|styles\.ts$|sound\.ts$|widgets[\\/](media|news)\.ts$/.test(file);
    // Reiter des Editors: ["seiten", "Seiten"]
    if (/panel[\\/]editor\.ts$/.test(file)) for (const m of src.matchAll(new RegExp(String.raw`\["[a-z]+", ` + STR + String.raw`\]`, "g"))) add(m[1]);
    if (form) {
      for (const m of src.matchAll(new RegExp(String.raw`\b(label|help|addLabel|autoLabel|name|short|hint): ` + STR, "g"))) add(m[2]);
      for (const m of src.matchAll(new RegExp(String.raw`placeholder: ` + STR, "g"))) add(m[1]);
      // Optionen und Vorschläge: [wert, "Beschriftung"]
      for (const m of src.matchAll(new RegExp(String.raw`\[\s*(?:undefined|true|false|-?[\d.]+|"[^"\n]*")\s*,\s*` + STR + String.raw`\s*\]`, "g"))) add(m[1]);
      // itemLabel-Rückfallwerte: ?? "Entität"
      for (const m of src.matchAll(new RegExp(String.raw`itemLabel:[^\n]*?(?:\?\?|\|\|) ` + STR, "g"))) add(m[1]);
    }
  }
  // Wetterbegriffe, Saugerzustände, Warnstufen, Bewertungen, Zusammenfassungs-Titel (werden über Tabellen übersetzt)
  const tables: [string, RegExp][] = [
    ["icons.ts", /\["\w+", "([^"]+)"\]/g],
    ["widgets/life.ts", /^\s+[a-z]+: "([^"]+)",$/gm],
    ["widgets/life.ts", /\[[\d]+|Infinity, "([^"]+)", "/g],
    ["widgets/life.ts", /\[-?[\dInfinity]+, "([^"]+)",/g],
    ["widgets/life.ts", /^\s+[a-z]+: \["([^"]+)", "/gm],
    ["widgets/summary.ts", /(?:morning|midday|evening): "([^"]+)"/g],
    // Gründe für den Notfallmodus
    ["panel/display-panel.ts", /enterSafe\("([^"]+)"/g],
    ["panel/display-panel.ts", /if \(this\.(?:urlSafe|forcedSafe)\) return "([^"]+)"/g],
  ];
  for (const [file, re] of tables) {
    const src = readFileSync(join(SRC, file), "utf8");
    for (const m of src.matchAll(re)) if (m[1]) add(m[1]);
  }
  return keys;
};
