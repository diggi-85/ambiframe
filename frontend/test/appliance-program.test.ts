import { describe, expect, it } from "vitest";
import { programOf } from "../src/widgets/more";

const hass = (state: string, format?: (s: unknown) => string) =>
  ({ states: { "select.p": { entity_id: "select.p", state, attributes: {} } }, formatEntityState: format }) as never;

describe("Programmname", () => {
  it("nimmt die HA-Übersetzung, sonst den Home-Connect-Namen, sonst den lesbaren Schlüssel", () => {
    expect(programOf(hass("laundry_care_dryer_program_mix", () => "Mischwäsche"), "select.p")).toBe("Mischwäsche");
    expect(programOf(hass("laundry_care_dryer_program_super_40"), "select.p")).toBe("Super 40'");
    expect(programOf(hass("schnell_mix"), "select.p")).toBe("Schnell mix");
    expect(programOf(hass("Schnell / Mix"), "select.p")).toBe("Schnell / Mix");
  });
  it("zeigt nichts, wenn kein Programm läuft", () => {
    expect(programOf(hass("unknown"), "select.p")).toBe("");
    expect(programOf(hass("x"), undefined)).toBe("");
  });
});
