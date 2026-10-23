// @vitest-environment happy-dom
// Studio (Prototyp): liest die bestehende Konfiguration, ändert nur das Gewählte und speichert im bisherigen Format
import { describe, expect, it, vi } from "vitest";

if (typeof globalThis.localStorage === "undefined") {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, String(v)), removeItem: (k: string) => void data.delete(k) },
  });
}
(globalThis as Record<string, unknown>).__WB_VERSION__ = "test";

const config = () => ({
  version: 1,
  design: { theme: "ruhig", evening: "sun" },
  photos: { folder: "", bing: false, credit: true },
  displays: [
    { id: "kueche", name: "Küche", playlist: [{ page: "a" }, { page: "b" }], control: { enabled: false, dashboard: "", idle: 60 }, events: "all" },
    { id: "flur", name: "Flur", playlist: [{ page: "a" }], control: { enabled: false, dashboard: "", idle: 60 }, events: "all" },
  ],
  pages: [
    { id: "a", name: "A", duration: 30, background: { type: "none" }, palette: "normal", widgets: [] },
    { id: "b", name: "B", duration: 30, background: { type: "none" }, palette: "normal", widgets: [] },
  ],
  events: [
    { id: "klingel", kind: "alarm", entity: "binary_sensor.klingel", to: "on", title: "Klingel", enabled: true },
    { id: "musik", kind: "media", entities: [], enabled: true, title: "" },
  ],
  sounds: [],
});

describe("Studio", () => {
  it("arbeitet mit der bestehenden Konfiguration und speichert nur, was geändert wurde", async () => {
    await import("../src/panel/studio");
    const saved: unknown[] = [];
    const hass = {
      states: {},
      callWS: vi.fn(async (msg: { type: string; config?: unknown }) => {
        if (msg.type === "ambiframe/config") return config();
        if (msg.type === "ambiframe/config/save") saved.push(msg.config);
        return {};
      }),
      connection: { subscribeMessage: vi.fn() },
      callService: vi.fn(),
    };
    const el = document.createElement("ambiframe-studio") as HTMLElement & Record<string, any>;
    el.hass = hass;
    document.body.append(el);
    await vi.waitFor(() => expect(el.draft).toBeTruthy());
    await el.updateComplete;
    // Übersicht: „Alle Displays“ und beide Displays
    expect(el.shadowRoot!.querySelector(".allcard")).toBeTruthy();
    expect(el.shadowRoot!.querySelectorAll(".dcard").length).toBe(2);

    // Eigener Stil für die Küche, global unverändert
    el.openDisplay("kueche");
    el.setTop("theme", "boho");
    // Moment „Musik“ nur auf diesem Display aus
    el.toggleEvent("musik", false);
    // „Alle Displays“: Atmosphäre für alle
    el.openDisplay("__all");
    el.setDesign("ambient", { type: "snow" });
    await el.save();

    const out = saved[0] as ReturnType<typeof config>;
    const before = config();
    expect(out.displays[0]).toMatchObject({ theme: "boho", events: ["klingel"] });
    expect(out.displays[1]).toEqual(before.displays[1]);
    expect(out.design).toMatchObject({ theme: "ruhig", ambient: { type: "snow" } });
    expect(out.pages).toEqual(before.pages);
    expect(out.events).toEqual(before.events);
    el.remove();
  });
});
