import { describe, expect, it } from "vitest";
import { dayAverage, profileFacts, vsAverage } from "../src/widgets/extras";

describe("Energie-Bilanz", () => {
  it("bildet den Ø erst ab 3 Tagen", () => {
    expect(dayAverage([1, null, 2])).toBeNull();
    expect(dayAverage([1, 2, 3, null])).toBe(2);
  });
  it("vergleicht mit dem Ø: über, unter, gleich", () => {
    expect(vsAverage(11.2, 10)).toEqual({ dir: "up", pct: 12 });
    expect(vsAverage(9, 10)).toEqual({ dir: "down", pct: 10 });
    expect(vsAverage(10.3, 10)).toEqual({ dir: "same", pct: 3 });
    expect(vsAverage(5, null)).toBeNull();
  });
  it("findet Spitzenstunde und Grundlast nachts", () => {
    const use = Array(24).fill(0.3);
    use[2] = 0.15;
    use[18] = 1.4;
    use[23] = null;
    const f = profileFacts(use);
    expect(f.peak).toEqual({ hour: 18, kwh: 1.4 });
    expect(f.base).toBeCloseTo(150);
  });
});

import { humidityAdvice } from "../src/widgets/home";
describe("Raumklima", () => {
  it("bewertet die Luftfeuchte", () => {
    expect(humidityAdvice(67)?.tone).toBe("bad");
    expect(humidityAdvice(61)?.tone).toBe("warn");
    expect(humidityAdvice(50)?.tone).toBe("good");
    expect(humidityAdvice(30)?.tone).toBe("dry");
    expect(humidityAdvice(null)).toBeNull();
  });
});

import { kwhFactor, slotValues } from "../src/widgets/extras";
describe("Energie-Bilanz: Stunden", () => {
  it("rechnet Wh und MWh in kWh um", () => {
    expect(kwhFactor("Wh")).toBe(0.001);
    expect(kwhFactor("MWh")).toBe(1000);
    expect(kwhFactor("kWh")).toBe(1);
  });
  it("legt Stunden nach der Uhrzeit ab – auch am Tag der Zeitumstellung", () => {
    const day = new Date(2026, 9, 25); // letzter Sonntag im Oktober
    const next = new Date(2026, 9, 26);
    const rows = [];
    for (let t = day.getTime(); t < next.getTime(); t += 3600e3) rows.push({ start: t, change: 1 });
    const out = slotValues(rows, day, false);
    expect(out).toHaveLength(24);
    expect(out.reduce<number>((a, v) => a + (v ?? 0), 0)).toBe(rows.length); // nichts geht verloren
    if (rows.length === 25) expect(out[2]).toBe(2); // die doppelte Stunde 2–3 Uhr
    expect(slotValues([{ start: new Date(2026, 9, 25, 5).getTime(), change: 500 }], day, false, kwhFactor("Wh"))[5]).toBe(0.5);
  });
});

import { sourceLogo, warningLines } from "../src/util";
describe("Warnungen", () => {
  it("zeigen das Logo ihrer Quelle", () => {
    expect(sourceLogo("dwd")).toContain("dwd_weather_warnings");
    expect(sourceLogo("nina")).toContain("/nina/");
    expect(sourceLogo(undefined)).toBeUndefined();
    const hass = { states: { "sensor.dwd": { entity_id: "sensor.dwd", state: "1", attributes: { warning_count: 1, warning_1_headline: "Frost", warning_1_level: 2 } } } } as never;
    expect(warningLines(hass)[0].logo).toContain("dwd_weather_warnings");
  });
});
