import { describe, expect, it } from "vitest";
import { pillsOf, tileOn, tileState } from "../src/widgets/hometiles";

const st = (entity_id: string, state: string, attributes: Record<string, unknown> = {}) => ({ entity_id, state, attributes, last_changed: "", last_updated: "" });

describe("Geräte-Kacheln und Pillen", () => {
  it("hell bei an, Helligkeit in Prozent", () => {
    const l = st("light.a", "on", { brightness: 128 });
    expect(tileOn(l as never)).toBe(true);
    expect(tileOn(st("light.b", "off") as never)).toBe(false);
    expect(tileState(undefined, l as never)).toBe("50 %");
  });
  it("Pillen zählen selbst", () => {
    const hass = { states: { a: st("light.a", "on"), b: st("light.b", "on"), c: st("lock.t", "unlocked"), d: st("sensor.wz", "21", { device_class: "temperature", friendly_name: "Wohnzimmer" }), e: st("sensor.au", "3", { device_class: "temperature", friendly_name: "Außen" }), f: st("sensor.ku", "19", { device_class: "temperature" }) } } as never;
    const p = pillsOf(hass);
    expect(p.map((x) => x.value)).toEqual(["19–21°", "2 an", "1 aufgeschlossen"]);
  });
});
