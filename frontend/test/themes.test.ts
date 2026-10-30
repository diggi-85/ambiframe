// Regeln für alle Stile: vollständige Farben, nur mitgelieferte Schriften in vorhandenen Stärken, Zahlen aus der
// Titelschrift, und Frontend und Backend kennen dieselben Werte
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FONTS } from "../src/fonts";
import { THEME_DEFS, THEMES } from "../src/styles";
import { AMBIENT_OPTIONS, PLACEHOLDER_OPTIONS } from "../src/editor/schemas";

const constPy = readFileSync(new URL("../../custom_components/ambiframe/const.py", import.meta.url), "utf8");
const pyTuple = (name: string): string[] => {
  const m = new RegExp(`^${name}: Final = \\(([\\s\\S]*?)\\)`, "m").exec(constPy);
  if (!m) throw new Error(`${name} fehlt in const.py`);
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
};
const REQUIRED = ["bg", "ink", "ink-2", "ink-3", "line", "surface", "accent", "accent-soft", "cold", "alert", "good"];
const fontOf = (stack?: string) => FONTS.find((f) => stack?.startsWith(`"Ambiframe ${f.name.replace(/ \(.*\)$/, "")}"`));

describe.each(THEME_DEFS.map((t) => [t.id, t] as const))("Stil %s", (_id, t) => {
  it("hat alle Pflichtfarben in hell und dunkel", () => {
    for (const mode of [t.dark, t.light]) for (const key of REQUIRED) expect(mode[key], key).toBeTruthy();
  });

  it("nutzt nur mitgelieferte Schriften (oder Systemschriften mit mitgeliefertem Rückfall)", () => {
    for (const stack of [t.shared.display, t.shared.sans]) {
      if (fontOf(stack)) continue;
      // Systemschriften: Monospace ist überall da; sonst muss eine mitgelieferte Schrift einspringen
      expect(/monospace|"Ambiframe /.test(stack ?? ""), stack).toBe(true);
    }
  });

  it("verlangt keine Strichstärke, die die Titelschrift nicht hat", () => {
    const f = fontOf(t.shared.display);
    const weight = Number(t.shared["clock-weight"] ?? 300);
    if (!f) return;
    const [lo, hi = lo] = f.weight.split(" ").map(Number);
    expect(weight).toBeGreaterThanOrEqual(lo);
    expect(weight).toBeLessThanOrEqual(hi);
  });
});

describe("Stile insgesamt", () => {
  it("Backend und Frontend kennen dieselben wählbaren Stile", () => {
    expect(pyTuple("THEMES").sort()).toEqual(THEMES.map((t) => t.id).sort());
  });

  it("Jahreszeiten-Fassungen sind nicht wählbar und stehen nicht im Backend", () => {
    expect(THEMES.some((t) => t.id.startsWith("saison-"))).toBe(false);
    expect(pyTuple("THEMES").some((id) => id.startsWith("saison-"))).toBe(false);
  });

  it("jede Animation der Auswahl ist im Backend erlaubt", () => {
    const allowed = new Set(pyTuple("AMBIENTS"));
    for (const [id] of AMBIENT_OPTIONS) if (id) expect(allowed.has(id as string), String(id)).toBe(true);
  });

  it("Ziffern-Schriften decken nur Zahlen und Zahlzeichen ab", async () => {
    const src = readFileSync(new URL("../src/fonts.ts", import.meta.url), "utf8");
    expect(src).toMatch(/unicode-range/);
    expect(src).toMatch(/U\+0030-0039/);
    expect(src).not.toMatch(/U\+0041/); // keine Buchstaben
  });

  it("Platzhalter-Quellen und Kartenstile stimmen mit dem Backend überein", () => {
    expect(PLACEHOLDER_OPTIONS.map(([id]) => id).sort()).toEqual(pyTuple("PLACEHOLDERS").sort());
    expect(pyTuple("CARD_STYLES").sort()).toEqual(["glass", "none", "outline", "solid"]);
  });
});
