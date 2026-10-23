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
    { id: "musik", kind: "media", entities: ["media_player.kueche"], enabled: true, title: "" },
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

describe("Studio: Momente ohne Auslöser", () => {
  it("erkennt fehlende Auslöser und schlägt passende vor", async () => {
    const { needsTrigger, guessTrigger } = await import("../src/panel/studio");
    expect(needsTrigger({ id: "w", kind: "info", enabled: true, title: "" } as never)).toBe(true);
    expect(needsTrigger({ id: "m", kind: "media", entities: [], enabled: true, title: "" } as never)).toBe(true);
    expect(needsTrigger({ id: "k", kind: "alarm", entity: "binary_sensor.x", enabled: true, title: "" } as never)).toBe(false);
    const hass = {
      states: Object.fromEntries(
        ["binary_sensor.nina_warning_musterstadt_1", "binary_sensor.haustuer_klingel", "media_player.kueche", "media_player.bad", "camera.haustuer"].map((id) => [id, { entity_id: id, state: "off", attributes: {} }]),
      ),
    } as never;
    expect(guessTrigger(hass, "warnung").entity).toBe("binary_sensor.nina_warning_musterstadt_1");
    expect(guessTrigger(hass, "klingel")).toMatchObject({ entity: "binary_sensor.haustuer_klingel", camera: "camera.haustuer" });
    expect(guessTrigger(hass, "musik").entities).toEqual(["media_player.kueche", "media_player.bad"]);
    expect(guessTrigger(hass, "geburtstag").entity).toBeUndefined();
  });

  it("speichert nicht, solange ein Auslöser fehlt, und zeigt den Moment", async () => {
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
    };
    vi.stubGlobal("alert", vi.fn());
    const el = document.createElement("ambiframe-studio") as HTMLElement & Record<string, any>;
    el.hass = hass;
    document.body.append(el);
    await vi.waitFor(() => expect(el.draft).toBeTruthy());
    el.openDisplay("__all");
    el.addMoment({ id: "warnung", name: "Wetterwarnung", icon: "warning", event: { kind: "info", to: "on", title: "Wetterwarnung" } });
    await el.save();
    expect(saved).toHaveLength(0);
    expect(el.step).toBe("momente");
    expect(el.openEvent).toBe("warnung");
    el.remove();
    vi.unstubAllGlobals();
  });
});
