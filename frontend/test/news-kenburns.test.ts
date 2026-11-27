import { describe, expect, it } from "vitest";
import { kenBurnsVars } from "../src/widgets/news";

describe("Ken Burns je Nachrichtenbild", () => {
  it("ist je Bild stabil und variiert zwischen Bildern", () => {
    expect(kenBurnsVars("https://x/a.jpg")).toBe(kenBurnsVars("https://x/a.jpg"));
    const all = new Set(["a", "b", "c", "d", "e", "f", "g", "h"].map((n) => kenBurnsVars(`https://x/${n}.jpg`)));
    expect(all.size).toBeGreaterThan(2);
    expect(kenBurnsVars("https://x/a.jpg")).toMatch(/--kb:-?1;--ox:\d+%;--s0:[\d.]+;--s1:[\d.]+/);
  });
});
