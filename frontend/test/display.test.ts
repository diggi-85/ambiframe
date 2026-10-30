// @vitest-environment happy-dom
// @vitest-environment-options {"url": "http://localhost:8123/ambiframe"}
// Anzeige im (nachgebildeten) Browser: Laufband, Erinnerungen und Stapel, Mitteilungszentrale, Töne, Mini-Karte,
// Dashboard-Wechsel in der HA-App
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Node ab Version 25 hat ein eigenes, ohne Datei leeres localStorage, das das der Testumgebung verdeckt
if (typeof globalThis.localStorage === "undefined") {
  const data = new Map<string, string>();
  const storage = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, String(v)),
    removeItem: (k: string) => void data.delete(k),
    clear: () => data.clear(),
    key: (i: number) => [...data.keys()][i] ?? null,
    get length() {
      return data.size;
    },
  };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });
}

const played: string[] = [];
vi.mock("../src/sound", () => ({
  SOUNDS: [],
  playSound: vi.fn(async (sound: string) => {
    played.push(sound);
  }),
  stopSound: vi.fn(),
}));

import "../src/display/display";
import { leaveToDashboard } from "../src/display/leave";
import type { AmbiframeConfig, DisplayConfig, EventConfig, Hass, HassEntity } from "../src/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type El = HTMLElement & Record<string, any>;

const ent = (entity_id: string, state: string, attributes: Record<string, unknown> = {}, secondsAgo = 0): HassEntity => {
  const t = new Date(Date.now() - secondsAgo * 1000).toISOString();
  return { entity_id, state, attributes, last_changed: t, last_updated: t };
};

const hassWith = (...states: HassEntity[]): Hass =>
  ({
    states: Object.fromEntries(states.map((s) => [s.entity_id, s])),
    language: "de",
    connection: { subscribeMessage: async () => () => undefined },
    callWS: async () => [],
    callService: async () => undefined,
  }) as unknown as Hass;

const config = (display: Partial<DisplayConfig> = {}, events: EventConfig[] = []): AmbiframeConfig =>
  ({
    version: 1,
    design: { theme: "ruhig", evening: "off", mode: "dark" },
    photos: { folder: "", bing: false, credit: false },
    pages: [{ id: "start", name: "Start", duration: 30, background: { type: "none" }, palette: "normal", show_if: [], widgets: [] }],
    displays: [
      { id: "test", name: "Test", playlist: [{ page: "start" }], night: {}, control: { enabled: true, dashboard: "/lovelace/0", idle: 60 }, events: "all", ...display },
    ],
    events,
  }) as unknown as AmbiframeConfig;

const info = (extra: Partial<EventConfig> = {}): EventConfig =>
  ({ id: "fertig", kind: "info", entity: "sensor.geraet", from: "run", to: "finished", title: "Fertig", enabled: true, where: "", ...extra }) as EventConfig;

async function mount(cfg: AmbiframeConfig, hass = hassWith(), stream = false): Promise<El> {
  const el = document.createElement("af-display") as El;
  el.setAttribute("display-id", "test");
  el.streamMode = stream;
  el.config = cfg;
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

beforeEach(() => {
  played.length = 0;
  localStorage.clear();
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("Nachrichten-Laufband", () => {
  it("ist normal an, beim Profil Fernseher aus und im Videostream immer aus", async () => {
    expect((await mount(config())).ctx.ticker).toBe(true);
    expect((await mount(config({ profile: "tv" }))).ctx.ticker).toBe(false);
    expect((await mount(config({ profile: "tv", ticker: true }))).ctx.ticker).toBe(true);
    expect((await mount(config({ ticker: true }), hassWith(), true)).ctx.ticker).toBe(false);
    expect((await mount(config({ ticker: false }))).ctx.ticker).toBe(false);
  });
});

describe("Erinnerungen oben rechts", () => {
  it("lassen sich pro Ereignis und pro Display abschalten", async () => {
    const el = await mount(config());
    el.addChip(info({ reminder: "off" }), new Date());
    expect(el.chips).toHaveLength(0);
    el.addChip(info(), new Date());
    expect(el.chips).toHaveLength(1);
    const off = await mount(config({ reminders: false }));
    off.addChip(info(), new Date());
    expect(off.chips).toHaveLength(0);
  });

  it("verschwinden nach der eingestellten Zeit", async () => {
    vi.useFakeTimers();
    const el = await mount(config());
    el.addChip(info({ reminder: 15 }), new Date());
    el.addChip(info({ id: "bleibt" }), new Date());
    vi.advanceTimersByTime(14 * 60e3);
    el.pruneChips();
    expect(el.chips.map((c: { id: string }) => c.id)).toEqual(["fertig", "bleibt"]);
    vi.advanceTimersByTime(2 * 60e3);
    el.pruneChips();
    expect(el.chips.map((c: { id: string }) => c.id)).toEqual(["bleibt"]);
  });

  it("stapeln sich ab der eingestellten Zahl mit Zähler", async () => {
    const el = await mount(config());
    for (const id of ["a", "b"]) el.addChip(info({ id }), new Date());
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".chips.stack")).toBeNull();
    el.addChip(info({ id: "c" }), new Date());
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".chips.stack .count")?.textContent).toBe("3");
    const never = await mount(config({ reminders_stack: 0 }));
    for (const id of ["a", "b", "c", "d"]) never.addChip(info({ id }), new Date());
    await never.updateComplete;
    expect(never.shadowRoot!.querySelector(".chips.stack")).toBeNull();
    expect(never.shadowRoot!.querySelectorAll(".chip")).toHaveLength(4);
  });
});

describe("Mitteilungszentrale", () => {
  it("merkt sich, was erschienen ist – auch über ein Neuladen hinweg", async () => {
    const ev = info();
    const el = await mount(config({}, [ev]));
    el.remember(ev);
    el.remember({ ...ev, id: "klingel", kind: "alarm", title: "Es klingelt" });
    const again = await mount(config({}, [ev]));
    expect(again.loadHistory().map((h: { title: string }) => h.title)).toEqual(["Fertig", "Es klingelt"]);
  });

  it("schreibt nichts, wenn sie abgeschaltet ist, und vergisst Altes", async () => {
    const off = await mount(config({ history: false }));
    off.remember(info());
    expect(localStorage.getItem("ambiframe-history-test")).toBeNull();
    localStorage.setItem("ambiframe-history-test", JSON.stringify([{ id: "alt", kind: "info", title: "Alt", at: Date.now() - 30 * 3600e3 }]));
    const el = await mount(config({ history_hours: 24 }));
    expect(el.loadHistory()).toHaveLength(0);
  });
});

describe("Töne", () => {
  it("wiederholen sich so oft wie eingestellt", async () => {
    vi.useFakeTimers();
    const el = await mount(config());
    el.ring(info({ sound: "glas", sound_repeat: 3, sound_interval: 2 }));
    vi.advanceTimersByTime(10e3);
    expect(played).toEqual(["glas", "glas", "glas"]);
  });

  it("„bis geschlossen“ hört auf, sobald die Einblendung weg ist", async () => {
    vi.useFakeTimers();
    const el = await mount(config());
    const ev = info({ sound: "gong", sound_repeat: "loop", sound_interval: 1 });
    el.notice = { ev, at: new Date(), secs: 60, seq: 1 };
    el.ring(ev);
    vi.advanceTimersByTime(2500);
    const before = played.length;
    el.notice = undefined;
    vi.advanceTimersByTime(5000);
    expect(before).toBe(3);
    expect(played).toHaveLength(before);
  });

  it("wiederholt ohne Angabe nur den Ton „alarm“ beim Vollbild-Alarm", async () => {
    vi.useFakeTimers();
    const el = await mount(config());
    el.ring(info({ sound: "glas" }));
    vi.advanceTimersByTime(10e3);
    expect(played).toEqual(["glas"]);
  });
});

describe("Mini-Karte „Läuft gerade“", () => {
  const media = (extra: Partial<EventConfig> = {}) =>
    ({ id: "musik", kind: "media", entities: ["media_player.test"], style: "mini", enabled: true, title: "", where: "", ...extra }) as EventConfig;
  const player = (state: string, secondsAgo = 0) => ent("media_player.test", state, { media_title: "Lied", media_artist: "Band" }, secondsAgo);

  it("zeigt Pausiertes nur so lange wie eingestellt", async () => {
    const el = await mount(config({}, [media({ mini_paused: 30 })]), hassWith(player("paused", 20)));
    expect(el.nowPlaying()?.s.entity_id).toBe("media_player.test");
    el.hass = hassWith(player("paused", 40));
    expect(el.nowPlaying()).toBeUndefined();
  });

  it("blendet je Titel nach der eingestellten Zeit aus", async () => {
    vi.useFakeTimers();
    const el = await mount(config({}, [media({ mini_duration: 10 })]), hassWith(player("playing")));
    expect(el.nowPlaying()).toBeDefined();
    vi.advanceTimersByTime(11e3);
    expect(el.nowPlaying()).toBeUndefined();
  });

  it("beachtet Bedingungen", async () => {
    const cond = media({ show_if: [{ condition: "state", entity: "input_boolean.musik", state: "on" }] });
    const el = await mount(config({}, [cond]), hassWith(player("playing"), ent("input_boolean.musik", "off")));
    expect(el.nowPlaying()).toBeUndefined();
    el.hass = hassWith(player("playing"), ent("input_boolean.musik", "on"));
    expect(el.nowPlaying()).toBeDefined();
  });
});

describe("Dashboard in der HA-App", () => {
  it("wechselt zum Dashboard und kehrt nach der Ruhezeit zurück", () => {
    vi.useFakeTimers();
    history.replaceState(null, "", "/ambiframe-wohnzimmer");
    const seen: string[] = [];
    const onChange = () => seen.push(location.pathname);
    window.addEventListener("location-changed", onChange);
    leaveToDashboard("/lovelace/0", 5);
    expect(location.pathname).toBe("/lovelace/0");
    expect(document.body.textContent).toContain("5 s");
    vi.advanceTimersByTime(3000);
    window.dispatchEvent(new Event("pointerdown")); // Berührung: Zeit beginnt von vorn
    vi.advanceTimersByTime(3000);
    expect(location.pathname).toBe("/lovelace/0");
    vi.advanceTimersByTime(3000);
    expect(location.pathname).toBe("/ambiframe-wohnzimmer");
    expect(seen).toEqual(["/lovelace/0", "/ambiframe-wohnzimmer"]);
    window.removeEventListener("location-changed", onChange);
  });
});

describe("Kamera live", () => {
  const cam = ent("camera.einfahrt", "idle", { access_token: "abc", entity_picture: "/api/camera_proxy/camera.einfahrt?token=abc" });

  it("öffnet keine eigene MJPEG-Verbindung, solange HAs Player lädt", async () => {
    const el = document.createElement("af-camera-view") as El;
    el.hass = hassWith(cam);
    el.entity = "camera.einfahrt";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("img[src*='camera_proxy_stream']")).toBeNull();
    // Standbild statt leerer Fläche, bis der Player läuft
    expect(el.shadowRoot!.querySelector("img[src*='camera_proxy/']")).not.toBeNull();
  });

  it("nutzt HAs gemeinsamen Stream, sobald der Player da ist", async () => {
    if (!customElements.get("ha-camera-stream")) customElements.define("ha-camera-stream", class extends HTMLElement {});
    const el = document.createElement("af-camera-view") as El;
    el.hass = hassWith(cam);
    el.entity = "camera.einfahrt";
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("ha-camera-stream")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("img[src*='camera_proxy_stream']")).toBeNull();
  });
});

describe("Kachel-Stil", () => {
  it("setzt Karte, Radius, Rahmen, Glas, Schatten, Überschrift und Abstand pro Kachel", async () => {
    await import("../src/display/page");
    const el = document.createElement("af-page") as El;
    el.hass = { states: {} } as unknown as Hass;
    el.grid = { w: 1280, h: 800, padX: 56, padY: 48, gap: 16, cols: 12, rows: 8 };
    el.orientation = "landscape";
    el.ctx = { tiles: false, gap: 32, config: { design: {} } };
    el.page = {
      id: "p",
      name: "P",
      duration: 30,
      background: { type: "none" },
      palette: "normal",
      widgets: [
        {
          id: "t",
          type: "text",
          x: 0,
          y: 0,
          w: 4,
          h: 2,
          options: { text: "Hallo" },
          look: { card: true, bg: "#123456", bg_opacity: 50, radius: 6, border: "accent", glass: true, shadow: "soft", label: false },
        },
      ],
    };
    document.body.appendChild(el);
    await el.updateComplete;
    const cell = el.shadowRoot!.querySelector(".cell.boxed") as HTMLElement;
    const style = cell.getAttribute("style")!;
    expect(style).toContain("--af-card:#123456");
    expect(style).toContain("--af-card-alpha:50%");
    expect(style).toContain("--af-card-radius:6px");
    expect(style).toContain("--af-card-border:1.5px solid var(--af-accent)");
    expect(style).toContain("--af-card-filter:blur(22px)");
    expect(style).toContain("--af-card-shadow:0 8px 24px");
    // Abstand 32 statt 16: 8 px nach innen gerückt
    expect(style).toContain("left:64px;top:56px");
    expect(cell.firstElementChild!.hasAttribute("nolabel")).toBe(true);
    el.remove();
  });
});

describe("E-Ink", () => {
  const eink = () => {
    const c = config({ ticker: true });
    c.design = { ...c.design, theme: "eink", ambient: { type: "snow" }, palette: "tagesverlauf" } as AmbiframeConfig["design"];
    return c;
  };

  it("stellt das ganze Display still: keine Animation, kein Laufband, Seitenwechsel ohne Übergang", async () => {
    const el = await mount(eink());
    expect(el.hasAttribute("eink")).toBe(true);
    expect(el.ctx.still).toBe(true);
    expect(el.ctx.ambient.type).toBe("none"); // auch wenn im Design Schnee gewählt ist
    expect(el.ctx.ticker).toBe(false); // auch wenn das Display es eingeschaltet hat
    expect(el.transitionFor(el.config.pages[0]).duration).toBe(0);
  });

  it("zeigt keine Effekte (Konfetti) und keine Tagesverlauf-Farben", async () => {
    const el = await mount(eink());
    el.openEffect({ id: "fest", kind: "effect", effect: "confetti", title: "Hurra", enabled: true, where: "" } as EventConfig);
    expect(el.effect).toBeUndefined();
    await el.updateComplete;
    expect(el.style.getPropertyValue("--af-cover-1")).toBe("");
  });

  it("andere Stile bleiben unverändert in Bewegung", async () => {
    const el = await mount(config());
    expect(el.hasAttribute("eink")).toBe(false);
    expect(el.transitionFor(el.config.pages[0]).duration).toBeGreaterThan(0);
  });
});
