// Cover-Farben und Kachel-Stile: Farbanalyse, abgeleitete Stilwerte, automatische Kacheln
import { describe, expect, it } from "vitest";
import { coverTokens, paletteFromPixels } from "../src/display/cover";
import { boxed } from "../src/display/page";
import type { WidgetConfig } from "../src/types";

const pixels = (...colors: [number, number, number, number][]) => colors.flatMap(([r, g, b, n]) => Array.from({ length: n }, () => [r, g, b, 255]).flat());

describe("Cover-Farben", () => {
  it("findet die prägenden Farbtöne, kräftigste zuerst", () => {
    const pal = paletteFromPixels(pixels([200, 30, 30, 60], [30, 60, 200, 30], [0, 0, 0, 200], [250, 250, 250, 100]));
    expect(pal).toHaveLength(3);
    expect(Math.round(pal[0].h)).toBe(0); // rot
    expect(Math.round(pal[1].h)).toBe(229); // blau
  });

  it("kommt mit Graustufen-Covern zurecht", () => {
    const pal = paletteFromPixels(pixels([120, 120, 120, 50]));
    expect(pal).toHaveLength(3);
    expect(pal[0].s).toBe(0);
  });

  it("hält Akzent lesbar: hell im Dunkeln, dunkel im Hellen", () => {
    const pal = paletteFromPixels(pixels([20, 120, 40, 50]));
    expect(coverTokens(pal, "dark")["--af-accent"]).toMatch(/ 70% \/ 1\)$/);
    expect(coverTokens(pal, "light")["--af-accent"]).toMatch(/ 38% \/ 1\)$/);
    expect(coverTokens(pal, "dark")["--af-bg"]).toMatch(/ 7% \/ 1\)$/);
  });
});

describe("Kachel-Stile", () => {
  const w = (type: string, extra: Partial<WidgetConfig> = {}) => ({ id: "x", type, x: 0, y: 0, w: 4, h: 2, options: {}, ...extra }) as WidgetConfig;
  it("setzt Widgets ohne eigene Fläche automatisch in Kacheln", () => {
    expect(boxed(w("rooms"), true)).toBe(true);
    expect(boxed(w("clock"), true)).toBe(false);
    expect(boxed(w("wordclock"), true)).toBe(false);
    expect(boxed(w("weather", { options: { variant: "card" } }), true)).toBe(false);
    expect(boxed(w("rooms"), false)).toBe(false);
  });
  it("lässt sich pro Widget ein- und ausschalten", () => {
    expect(boxed(w("rooms", { look: { card: false } }), true)).toBe(false);
    expect(boxed(w("clock", { look: { card: true } }), false)).toBe(true);
  });
});

describe("Wetter, Tagesverlauf und Paletten", () => {
  it("wählt die Animation passend zum Wetter", async () => {
    const { weatherAmbient } = await import("../src/display/effects");
    expect(weatherAmbient("snowy")).toBe("snow");
    expect(weatherAmbient("pouring")).toBe("raindrops");
    expect(weatherAmbient("windy")).toBe("wind");
    expect(weatherAmbient("clear-night")).toBe("stars");
    expect(weatherAmbient(undefined)).toBe("none");
  });

  it("wandert über den Tag durch die Farbtöne", async () => {
    const { dayHue } = await import("../src/styles");
    const at = (h: number, m = 0) => dayHue(new Date(2026, 9, 23, h, m));
    expect(Math.round(at(7))).toBe(25); // Morgen orange
    expect(Math.round(at(13))).toBe(195); // Mittag Himmelblau
    expect(Math.round(at(19))).toBe(320); // Dämmerung violett
    // weicher Übergang dazwischen, ohne Sprung über den ganzen Farbkreis
    expect(at(18)).toBeGreaterThan(320 - 180);
    expect(at(23, 59)).toBeGreaterThan(230);
  });

  it("hat für jede Palette hell und dunkel alle Farben", async () => {
    const { PALETTES } = await import("../src/styles");
    for (const p of Object.values(PALETTES)) for (const m of [p.dark, p.light]) expect(Object.keys(m).sort()).toEqual(["accent", "alert", "bg", "card", "cold", "good", "ink"]);
  });
});
