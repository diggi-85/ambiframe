import { describe, expect, it } from "vitest";
import { lookOnly, missingEntities, replaceEntity } from "../src/share";

describe("Teilen", () => {
  it("lässt Hausteile aus dem Stil weg", () => {
    expect(lookOnly({ theme: "glas", home_ticker: [1], news_band: {}, presets: [] })).toEqual({ theme: "glas" });
  });
  it("findet fehlende Entitäten, ignoriert Dateinamen und vorhandene", () => {
    const hass = { states: { "sensor.da": {} } } as any;
    const page = { widgets: [{ options: { entity: "sensor.da", other: "light.fehlt", img: "/local/camera.jpg", lk: "lock.lock", tpl: "{{ states('sensor.weg') }}" }, tap: { action: "call-service", service: "light.turn_on" } }] };
    expect(missingEntities(page, hass)).toEqual(["light.fehlt", "lock.lock", "sensor.weg"]);
  });
  it("ersetzt Entitäten genau, auch in Vorlagen", () => {
    const page = { a: "sensor.x", b: "{{ states('sensor.x') }} sensor.x_2", c: ["sensor.x"] };
    expect(replaceEntity(page, "sensor.x", "sensor.y")).toEqual({ a: "sensor.y", b: "{{ states('sensor.y') }} sensor.x_2", c: ["sensor.y"] });
  });
});
