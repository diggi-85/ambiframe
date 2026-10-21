// Reine Logik ohne Browser: Raster, Bedingungen, Auslöser, Vorlagen-Wahrheitswerte
import { afterEach, describe, expect, it, vi } from "vitest";
import { autoPortrait, gridFor, layoutOf } from "../src/display/grid";
import { triggered } from "../src/events";
import { templateText, templateTruthy } from "../src/template";
import type { AmbiframeConfig, Condition, EventConfig, Hass, HassEntity, WidgetConfig } from "../src/types";
import { batteryOverview, checkCondition, checkConditions, effectiveConfig } from "../src/util";
import { PROFILES, profilePlaylist } from "../src/editor/profiles";
import { checkHealth } from "../src/editor/health";

const ent = (entity_id: string, state: string, attributes: Record<string, unknown> = {}, changedMinutesAgo = 0): HassEntity => {
  const t = new Date(Date.now() - changedMinutesAgo * 60e3).toISOString();
  return { entity_id, state, attributes, last_changed: t, last_updated: t };
};

const hassWith = (...states: HassEntity[]): Hass =>
  ({ states: Object.fromEntries(states.map((s) => [s.entity_id, s])) }) as unknown as Hass;

const w = (id: string, x: number, y: number, ww: number, h: number): WidgetConfig => ({ id, type: "text", x, y, w: ww, h, options: {} });

describe("Raster", () => {
  it("wächst nur, schrumpft nie", () => {
    expect(gridFor("landscape", 16 / 10).w).toBe(1280);
    expect(gridFor("landscape", 16 / 9).w).toBeGreaterThan(1280);
    expect(gridFor("landscape", 4 / 3).h).toBeGreaterThan(800);
    expect(gridFor("portrait", 9 / 19.5).h).toBeGreaterThan(1280);
  });

  it("stapelt nebeneinander liegende Widgets hochkant untereinander", () => {
    const pos = autoPortrait([w("links", 0, 0, 6, 4), w("rechts", 6, 0, 6, 4)]);
    expect(pos.links.y).toBeLessThan(pos.rechts.y);
    expect(pos.links.w).toBe(8);
    for (const p of Object.values(pos)) {
      expect(p.y + p.h).toBeLessThanOrEqual(12);
      expect(p.x + p.w).toBeLessThanOrEqual(8);
    }
  });

  it("staucht, wenn es hochkant nicht passt – alles bleibt im Raster", () => {
    const pos = autoPortrait([w("a", 0, 0, 4, 8), w("b", 4, 0, 4, 8), w("c", 8, 0, 4, 8)]);
    expect(Object.keys(pos)).toHaveLength(3);
    for (const p of Object.values(pos)) expect(p.y + p.h).toBeLessThanOrEqual(12);
  });

  it("füllt hochkant die freien Zeilen, wenn die Seite quer die ganze Höhe nutzt", () => {
    const pos = autoPortrait([w("aufmacher", 0, 0, 12, 7), w("laufband", 0, 7, 12, 1)]);
    expect(pos.aufmacher).toEqual({ x: 0, y: 0, w: 8, h: 11 });
    expect(pos.laufband).toEqual({ x: 0, y: 11, w: 8, h: 1 });
  });

  it("lässt bewusst freie Flächen frei (Bilderrahmen: Uhr unten)", () => {
    const pos = autoPortrait([w("uhr", 0, 4, 6, 2), w("datum", 0, 6, 7, 1), w("zeile", 0, 7, 8, 1)]);
    expect(pos.uhr.h).toBe(2);
    expect(pos.zeile.y + pos.zeile.h).toBe(12);
  });

  it("nimmt eigene Hochformat-Positionen, wenn vorhanden", () => {
    const own = { ...w("a", 0, 0, 6, 2), portrait: { x: 1, y: 2, w: 3, h: 4 } };
    expect(layoutOf([own], "portrait").a).toEqual({ x: 1, y: 2, w: 3, h: 4 });
    expect(layoutOf([own], "landscape").a).toEqual({ x: 0, y: 0, w: 6, h: 2 });
  });
});

describe("Bedingungen", () => {
  afterEach(() => vi.useRealTimers());
  const hass = hassWith(ent("person.a", "home"), ent("person.b", "not_home"), ent("sensor.co2", "1200"), ent("binary_sensor.tuer", "on", {}, 3));

  it("Zustand, Zahl, eine-von-mehreren", () => {
    expect(checkCondition(hass, { condition: "state", entity: "person.a", state: "home" })).toBe(true);
    expect(checkCondition(hass, { condition: "not_state", entity: "person.a", state: "home" })).toBe(false);
    expect(checkCondition(hass, { condition: "numeric", entity: "sensor.co2", above: 1000 })).toBe(true);
    expect(checkCondition(hass, { condition: "any_state", entities: ["person.a", "person.b"], state: "home" })).toBe(true);
  });

  it("oder / und / nicht – verschachtelt", () => {
    const home = { condition: "state", entity: "person.b", state: "home" } as const;
    const co2 = { condition: "numeric", entity: "sensor.co2", above: 1000 } as const;
    expect(checkCondition(hass, { condition: "or", conditions: [home, co2] })).toBe(true);
    expect(checkCondition(hass, { condition: "and", conditions: [home, co2] })).toBe(false);
    expect(checkCondition(hass, { condition: "not", conditions: [home] })).toBe(true);
    expect(checkCondition(hass, { condition: "not", conditions: [{ condition: "or", conditions: [home, co2] }] })).toBe(false);
  });

  it("kürzlich geändert – mit Zeitfenster und Zielzustand", () => {
    expect(checkCondition(hass, { condition: "changed", entity: "binary_sensor.tuer", minutes: 5 })).toBe(true);
    expect(checkCondition(hass, { condition: "changed", entity: "binary_sensor.tuer", minutes: 2 })).toBe(false);
    expect(checkCondition(hass, { condition: "changed", entity: "binary_sensor.tuer", minutes: 5, state: "off" })).toBe(false);
  });

  it("Uhrzeit, auch über Mitternacht", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 23, 30));
    expect(checkCondition(hass, { condition: "time", after: "22:00", before: "06:00" })).toBe(true);
    expect(checkCondition(hass, { condition: "time", after: "06:00", before: "22:00" })).toBe(false);
    vi.setSystemTime(new Date(2026, 9, 14, 5, 0));
    expect(checkCondition(hass, { condition: "time", after: "22:00", before: "06:00" })).toBe(true);
  });

  it("Display und Ausrichtung – ohne Kontext immer erfüllt (Editor)", () => {
    const disp: Condition = { condition: "display", displays: ["kueche"] };
    const hoch: Condition = { condition: "orientation", orientation: "portrait" };
    expect(checkConditions(hass, [disp, hoch])).toBe(true);
    expect(checkConditions(hass, [disp], { display: "buero" })).toBe(false);
    expect(checkConditions(hass, [disp, hoch], { display: "kueche", orientation: "portrait" })).toBe(true);
    expect(checkConditions(hass, [hoch], { orientation: "landscape" })).toBe(false);
  });
});

describe("Auslöser", () => {
  const ev = (extra: Partial<EventConfig>): EventConfig => ({ id: "e", enabled: true, kind: "alarm", title: "", where: "", ...extra }) as EventConfig;

  it("klassisch: von → zu", () => {
    const e = ev({ entity: "binary_sensor.k", from: "off", to: "on" });
    expect(triggered(e, ent("binary_sensor.k", "off"), ent("binary_sensor.k", "on"))).toBe(true);
    expect(triggered(e, ent("binary_sensor.k", "unavailable"), ent("binary_sensor.k", "on"))).toBe(false);
  });

  it("jede Änderung – aber nie nach einem Neustart", () => {
    const e = ev({ entity: "sensor.x", to: "*" });
    expect(triggered(e, ent("sensor.x", "1"), ent("sensor.x", "2"))).toBe(true);
    expect(triggered(e, ent("sensor.x", "unavailable"), ent("sensor.x", "2"))).toBe(false);
    expect(triggered(e, ent("sensor.x", "1"), ent("sensor.x", "unknown"))).toBe(false);
  });

  it("event.* – nur frische Ereignisse und gewünschte Typen", () => {
    const e = ev({ entity: "event.sos", to: "*", event_types: ["on"] });
    const now = new Date().toISOString();
    const old = new Date(Date.now() - 10 * 60e3).toISOString();
    expect(triggered(e, ent("event.sos", "unknown"), ent("event.sos", now, { event_type: "on" }))).toBe(true);
    expect(triggered(e, ent("event.sos", "unknown"), ent("event.sos", now, { event_type: "off" }))).toBe(false);
    expect(triggered(e, ent("event.sos", "unknown"), ent("event.sos", old, { event_type: "on" }))).toBe(false);
  });
});

describe("Vorlagen", () => {
  it("Wahrheitswerte wie in HA", () => {
    for (const v of [true, 1, "on", "true", "home", "2"]) expect(templateTruthy(v)).toBe(true);
    for (const v of [false, 0, "off", "", "0", null, "nein"]) expect(templateTruthy(v)).toBe(false);
  });

  it("Text: Zahlen deutsch ohne Tausenderpunkt, Listen mit Komma", () => {
    expect(templateText(21.5)).toBe("21,5");
    expect(templateText(2026)).toBe("2026");
    expect(templateText(["a", "b"])).toBe("a, b");
    expect(templateText(null)).toBe("");
  });
});

describe("Vorgaben pro Display", () => {
  const config = {
    design: { theme: "ruhig", accent: "#d6a865", fonts: { display: "inter", text: "inter" }, css: ".a{}", evening: "sun" },
    photos: { folder: "media-source://x/alle", bing: true, credit: true },
    displays: [
      { id: "kueche", name: "Küche", playlist: [] },
      { id: "tv", name: "TV", playlist: [], design: { accent: "#88aacc", fonts: { display: "fraunces" }, css: ".b{}" }, photos: { bing: false } },
    ],
    pages: [],
    events: [],
  } as unknown as AmbiframeConfig;

  it("lässt Displays ohne eigene Vorgaben unverändert", () => {
    expect(effectiveConfig(config, "kueche")).toBe(config);
  });

  it("legt Design und Fotos des Displays über die allgemeinen", () => {
    const eff = effectiveConfig(config, "tv")!;
    expect(eff.design.accent).toBe("#88aacc");
    expect(eff.design.fonts).toEqual({ display: "fraunces", text: "inter" });
    expect(eff.design.css).toBe(".a{}\n.b{}");
    expect(eff.photos).toEqual({ folder: "media-source://x/alle", bing: false, credit: true });
    expect(config.design.accent).toBe("#d6a865");
  });
});

describe("Profile", () => {
  const page = (id: string, bg: string, ...types: string[]) =>
    ({ id, name: id, duration: 30, palette: "normal", background: { type: bg }, widgets: types.map((type, i) => ({ id: `w${i}`, type, x: 0, y: 0, w: 1, h: 1, options: {} })) }) as unknown as import("../src/types").PageConfig;
  const pages = [
    page("foto", "photo", "clock", "date", "infoline"),
    page("standby_wetter", "none", "clock", "date", "weather"),
    page("wetter", "none", "clock", "text", "weather"),
    page("muell", "none", "calendar", "clock", "date"),
    page("nachrichten", "none", "news"),
    page("webcams", "camera", "clock"),
  ];

  it("Fernseher: Fotos zwischen Webcams, Wetter, Nachrichten und StandBy", () => {
    const tv = PROFILES.find((p) => p.id === "tv")!;
    expect(profilePlaylist(tv, pages).map((p) => p.page)).toEqual(["foto", "webcams", "wetter", "foto", "nachrichten", "standby_wetter"]);
  });

  it("Schlafzimmer: StandBy statt Wetter-Seite doppelt", () => {
    const bed = PROFILES.find((p) => p.id === "bedroom")!;
    expect(profilePlaylist(bed, pages).map((p) => p.page)).toEqual(["foto", "standby_wetter", "wetter"]);
  });
});

describe("Akkus", () => {
  const bat = (id: string, state: string, name: string, extra: Record<string, unknown> = {}) =>
    ent(id, state, { friendly_name: name, device_class: "battery", unit_of_measurement: "%", ...extra });
  const hass = hassWith(
    bat("sensor.anna_iphone_battery_level", "45", "Anna iPhone Battery Level"),
    ent("sensor.anna_iphone_battery_state", "Charging"),
    bat("sensor.anna_iphone_apple_watch_battery_level", "90", "Anna iPhone Apple Watch Battery Level"),
    ent("sensor.anna_iphone_apple_watch_battery_state", "Not Charging"),
    bat("sensor.bad_batterie", "10", "Bad Batterie"),
    bat("sensor.flur_battery", "20", "Flur Batterie"),
    bat("sensor.kueche_battery", "21", "Küche Batterie"),
    bat("sensor.alt_battery", "unavailable", "Alt Batterie"),
    ent("binary_sensor.heizung_battery_low", "on", { friendly_name: "Heizung Batteriestand", device_class: "battery" }),
    ent("binary_sensor.fenster_battery_low", "off", { friendly_name: "Fenster Batteriestand", device_class: "battery" }),
  );

  it("zeigt Geräte der HA-App immer, mit Ladezustand und Art", () => {
    const { devices } = batteryOverview(hass);
    expect(devices.map((d) => [d.name, d.level, d.charging, d.kind])).toEqual([
      ["Anna iPhone", 45, true, "phone"],
      ["Anna iPhone Apple Watch", 90, false, "watch"],
    ]);
  });

  it("zeigt Zubehör nur unter 21 % oder bei „schwach“, das Schwächste zuerst", () => {
    const { low } = batteryOverview(hass);
    expect(low.map((l) => [l.name, l.level])).toEqual([
      ["Heizung", null],
      ["Bad", 10],
      ["Flur", 20],
    ]);
  });

  it("nimmt feste Geräte und Ausnahmen", () => {
    const { devices, low } = batteryOverview(hass, { devices: [{ entity: "sensor.anna_iphone_battery_level", name: "Anna" }], exclude: ["sensor.bad_batterie"] });
    expect(devices.map((d) => d.name)).toEqual(["Anna"]);
    expect(low.map((l) => l.id)).not.toContain("sensor.bad_batterie");
    // Die Uhr ist jetzt kein festes Gerät mehr, mit 90 % aber auch kein schwaches Zubehör
    expect(low.map((l) => l.id)).not.toContain("sensor.anna_iphone_apple_watch_battery_level");
  });
});

describe("Gesundheitscheck", () => {
  const page = (id: string, widgets: Record<string, unknown>[], bg = "none") =>
    ({ id, name: id, duration: 30, palette: "normal", background: { type: bg }, widgets }) as unknown as import("../src/types").PageConfig;
  const config = {
    design: { theme: "ruhig" },
    photos: { folder: "media-source://x", bing: false },
    pages: [
      page("foto", [], "photo"),
      page("wetter", [{ id: "w", type: "weather", x: 0, y: 0, w: 1, h: 1, options: { entity: "weather.alt" } }]),
      page("vergessen", []),
    ],
    displays: [{ id: "kueche", name: "Küche", playlist: [{ page: "foto" }, { page: "wetter" }], night: {}, control: { enabled: true }, events: "all" }],
    events: [{ id: "klingel", kind: "alarm", entity: "binary_sensor.klingel", camera: "camera.tuer", to: "on", title: "x", where: "" }],
  } as unknown as AmbiframeConfig;
  const hass = hassWith(ent("binary_sensor.klingel", "off"), ent("camera.tuer", "unavailable"), ent("sun.sun", "above_horizon"));

  it("findet fehlende und nicht verfügbare Entitäten, vergessene Seiten, Displays und leere Fotos", () => {
    const issues = checkHealth(config, hass, {}, { folder: 0, icloud: null });
    const texts = issues.map((i) => `${i.level}: ${i.text}`);
    expect(texts.some((x) => x.startsWith("error") && x.includes("weather.alt"))).toBe(true);
    expect(texts.some((x) => x.startsWith("warn") && x.includes("camera.tuer"))).toBe(true);
    expect(texts.some((x) => x.includes("vergessen"))).toBe(true);
    expect(texts.some((x) => x.includes("noch nie verbunden"))).toBe(true);
    expect(texts.some((x) => x.startsWith("error") && x.includes("keine Fotos"))).toBe(true);
    expect(issues[0].level).toBe("error");
    const w = issues.find((i) => i.text.includes("weather.alt"))!;
    expect(w.go).toEqual({ tab: "seiten", pageId: "wetter", widgetId: "w" });
  });

  it("meldet nichts Ernstes, wenn alles da ist", () => {
    const ok = checkHealth({ ...config, pages: config.pages.slice(0, 1), displays: [{ ...config.displays[0], playlist: [{ page: "foto" }] }], events: [] } as AmbiframeConfig, hass, {
      kueche: { online: true, last_seen: new Date().toISOString(), clients: [{ name: "Tablet", version: "v1" }] },
    }, { folder: 12, icloud: null }, "v1");
    expect(ok.filter((i) => i.level !== "info")).toEqual([]);
  });
});
