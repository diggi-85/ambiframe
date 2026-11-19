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
import type { AmbiframeConfig, DisplayConfig, EventConfig, Hass, HassEntity, HomeTickerItem } from "../src/types";

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

describe("Bildschirm aus, wenn alle weg sind", () => {
  const person = (id: string, state: string) => ({ entity_id: id, state, attributes: {}, last_changed: "", last_updated: "" }) as HassEntity;

  it("schaltet über Fully aus, wenn alle weg sind, und wieder an, sobald jemand heimkommt", async () => {
    const fully = { turnScreenOff: vi.fn(), turnScreenOn: vi.fn() };
    (window as unknown as { fully?: unknown }).fully = fully;
    const cfg = config({ screen_off: { away: ["person.a", "person.b"] } });
    const el = await mount(cfg, hassWith(person("person.a", "not_home"), person("person.b", "Arbeit")));
    expect(fully.turnScreenOff).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("asleep")).toBe(true);
    el.hass = hassWith(person("person.a", "home"), person("person.b", "Arbeit"));
    await el.updateComplete;
    expect(fully.turnScreenOn).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("asleep")).toBe(false);
    delete (window as unknown as { fully?: unknown }).fully;
  });

  it("bleibt an bei unbekanntem Zustand, ohne Auswahl und in der Vorschau", async () => {
    const away = hassWith(person("person.a", "unavailable"));
    expect((await mount(config({ screen_off: { away: ["person.a"] } }), away)).hasAttribute("asleep")).toBe(false);
    expect((await mount(config(), hassWith(person("person.a", "not_home")))).hasAttribute("asleep")).toBe(false);
  });
});

describe("Einblendungen wegwischen", () => {
  const swipe = async (el: El, target: Element, dx: number, dy = 0) => {
    const at = (type: string, x: number, y: number) => target.dispatchEvent(new PointerEvent(type, { clientX: x, clientY: y, bubbles: true, composed: true }));
    at("pointerdown", 200, 200);
    at("pointermove", 200 + dx / 2, 200 + dy / 2);
    at("pointermove", 200 + dx, 200 + dy);
    at("pointerup", 200 + dx, 200 + dy);
    await el.updateComplete;
  };
  const withPip = async () => {
    const ev = { id: "tuer", kind: "live", entity: "binary_sensor.tuer", to: "on", title: "Haustür", camera: "camera.tuer", enabled: true } as EventConfig;
    const el = await mount(config({}, [ev]));
    el.testEvent("tuer");
    await el.updateComplete;
    return el;
  };

  it("schließt das Kamera-Bild, wenn man es weit genug zur Seite wischt", async () => {
    const el = await withPip();
    await swipe(el, el.shadowRoot!.querySelector(".pip")!, 40);
    expect(el.shadowRoot!.querySelector(".pip")).toBeTruthy(); // zu kurz: springt zurück
    await swipe(el, el.shadowRoot!.querySelector(".pip")!, -150);
    expect(el.shadowRoot!.querySelector(".pip")).toBeNull();
  });

  it("lässt senkrechtes Wischen in Ruhe", async () => {
    const el = await withPip();
    await swipe(el, el.shadowRoot!.querySelector(".pip")!, 10, 160);
    expect(el.shadowRoot!.querySelector(".pip")).toBeTruthy();
  });
});

describe("Kamera später wieder zeigen", () => {
  it("blendet einen Kamera-Moment auf diesem Gerät für die gewählte Zeit aus – auch ohne Ton", async () => {
    const ev = { id: "tuer", kind: "live", entity: "binary_sensor.tuer", to: "on", title: "Haustür", camera: "camera.tuer", enabled: true, sound: "gong" } as EventConfig;
    const off = ent("binary_sensor.tuer", "off");
    const el = await mount(config({}, [ev]), hassWith(off));
    el.testEvent("tuer");
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[data-snooze="30"]') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".pip")).toBeNull();
    played.length = 0;
    // Bewegung kommt wieder: in den nächsten 30 min weder Bild noch Ton
    el.hass = hassWith(ent("binary_sensor.tuer", "on"));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".pip")).toBeNull();
    expect(played).toEqual([]);
  });
});

describe("Kamera später wieder zeigen (Gegenprobe)", () => {
  it("zeigt die Kamera bei Bewegung, wenn sie nicht ausgeblendet ist", async () => {
    const ev = { id: "tuer2", kind: "live", entity: "binary_sensor.tuer2", to: "on", title: "Haustür", camera: "camera.tuer", enabled: true } as EventConfig;
    const el = await mount(config({}, [ev]), hassWith(ent("binary_sensor.tuer2", "off")));
    el.hass = hassWith(ent("binary_sensor.tuer2", "on"));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".pip")).toBeTruthy();
  });
});

describe("Laufband für Zuhause", () => {
  const withTicker = (items: unknown[], display: Partial<DisplayConfig> = {}) => {
    const c = config(display);
    c.design = { ...c.design, home_ticker: items } as AmbiframeConfig["design"];
    return c;
  };
  const band = (el: El) => el.shadowRoot!.querySelector(".hticker") as HTMLElement | null;
  const fenster = ent("binary_sensor.fenster", "on", { friendly_name: "Fenster Bad" }, 40 * 60);
  const akku = ent("sensor.akku", "8", { friendly_name: "Akku Flur", unit_of_measurement: "%" });

  it("erscheint nur, solange eine Zeile zutrifft – mit „seit …“ bei Zuständen und dem Wert bei Schwellen", async () => {
    const items = [{ entity: "binary_sensor.fenster" }, { entity: "sensor.akku", below: 15 }];
    const el = await mount(withTicker(items), hassWith(fenster, akku));
    expect(band(el)!.textContent).toMatch(/Fenster Bad · (seit|for) 40 min/);
    expect(band(el)!.textContent).toMatch(/Akku Flur 8[,.]0 %/);
    expect(band(el)!.classList.contains("run")).toBe(false); // zwei Zeilen stehen
    const quiet = await mount(withTicker(items), hassWith(ent("binary_sensor.fenster", "off"), ent("sensor.akku", "80")));
    expect(band(quiet)).toBeNull();
  });

  it("wartet mit „erst nach“ und nimmt den eigenen Text", async () => {
    const items = [{ entity: "binary_sensor.fenster", after: 60, text: "Bad lüftet" }];
    expect(band(await mount(withTicker(items), hassWith(fenster)))).toBeNull(); // erst 40 Minuten offen
    const late = await mount(withTicker([{ ...items[0], after: 30 }]), hassWith(fenster));
    expect(band(late)!.textContent).toContain("Bad lüftet");
  });

  it("läuft ab drei Zeilen, steht im Videostream und lässt sich pro Display abschalten", async () => {
    const three = [{ entity: "binary_sensor.fenster" }, { entity: "sensor.akku", below: 15 }, { entity: "sensor.akku", above: 5, text: "Noch eins" }];
    expect(band(await mount(withTicker(three), hassWith(fenster, akku)))!.classList.contains("run")).toBe(true);
    expect(band(await mount(withTicker(three), hassWith(fenster, akku), true))!.classList.contains("run")).toBe(false);
    expect(band(await mount(withTicker(three, { home_ticker: false }), hassWith(fenster, akku)))).toBeNull();
  });
});

describe("Textgröße „aus der Ferne“", () => {
  it("vergrößert um 60 % und meldet den Widgets, dass Kleingedrucktes entfällt", async () => {
    const el = await mount(config({ text_size: "far" }));
    expect(el.style.getPropertyValue("--af-fs")).toBe("1.6");
    expect(el.style.getPropertyValue("--af-far")).toBe("1");
    expect((await mount(config({ text_size: "xlarge" }))).style.getPropertyValue("--af-far")).toBe("");
  });

  it("schaltet wachsende Balken mit „Zahlen und Balken bewegen: aus“ ab", async () => {
    const c = config();
    c.design = { ...c.design, count_up: false } as AmbiframeConfig["design"];
    expect((await mount(c)).style.getPropertyValue("--af-grow")).toBe("none");
  });
});

describe("Nachrichten-Laufband über allen Seiten", () => {
  const withBand = (display: Partial<DisplayConfig> = {}) => {
    const c = config(display);
    c.design = { ...c.design, news_band: { enabled: true, feeds: [{ value: "tagesschau" }] } } as AmbiframeConfig["design"];
    return c;
  };
  const band = (el: El) => el.shadowRoot!.querySelector("af-news.newsband") as El | null;

  it("liegt als Laufband am unteren Rand – unabhängig von der Seite – und lädt nicht bei jedem Neuzeichnen neu", async () => {
    const el = await mount(withBand());
    expect(band(el)!.options).toMatchObject({ variant: "ticker", feeds: [{ value: "tagesschau" }] });
    const first = band(el)!.options;
    el.requestUpdate();
    await el.updateComplete;
    expect(band(el)!.options).toBe(first);
    expect(band(await mount(config()))).toBeNull(); // nicht eingeschaltet
  });

  it("bleibt aus, wo ein Laufband aus ist: pro Display abgeschaltet, Fernseher, Videostream", async () => {
    expect(band(await mount(withBand({ ticker: false })))).toBeNull();
    expect(band(await mount(withBand({ profile: "tv" })))).toBeNull();
    expect(band(await mount(withBand(), hassWith(), true))).toBeNull();
  });
});

describe("Laufband für Zuhause: Zeilen wählen und mischen", () => {
  const cfg = (items: unknown[], news?: Record<string, unknown>, display: Partial<DisplayConfig> = {}) => {
    const c = config(display);
    c.design = { ...c.design, home_ticker: items, ...(news ? { news_band: news } : {}) } as AmbiframeConfig["design"];
    return c;
  };
  const fenster = ent("binary_sensor.fenster", "on", { friendly_name: "Fenster Bad" }, 300);
  const band = (el: El) => el.shadowRoot!.querySelector(".hticker") as HTMLElement | null;

  it("lässt abgeschaltete Zeilen und Zeilen für andere Displays weg", async () => {
    expect(band(await mount(cfg([{ entity: "binary_sensor.fenster", enabled: false }]), hassWith(fenster)))).toBeNull();
    expect(band(await mount(cfg([{ entity: "binary_sensor.fenster", displays: ["anderes"] }]), hassWith(fenster)))).toBeNull();
    expect(band(await mount(cfg([{ entity: "binary_sensor.fenster", displays: ["test"] }]), hassWith(fenster)))).not.toBeNull();
  });

  it("meldet mit einer Sammelzeile jeden Akku unter der Schwelle – außer den ausgenommenen", async () => {
    const akku = (id: string, level: string, name: string) => ent(id, level, { friendly_name: name, device_class: "battery", unit_of_measurement: "%" });
    const hass = hassWith(akku("sensor.flur_battery", "8", "Flur Battery"), akku("sensor.bad_battery", "60", "Bad Battery"), akku("sensor.auto_battery", "5", "Auto Battery"));
    const el = await mount(cfg([{ kind: "batteries", below: 15, exclude: ["sensor.auto_battery"] }]), hass);
    expect(band(el)!.textContent).toMatch(/Flur 8 %/);
    expect(band(el)!.textContent).not.toMatch(/Bad|Auto/);
  });

  it("mischt auf Wunsch beide Bänder: Zeilen von Zuhause laufen im Nachrichten-Band vorweg", async () => {
    const mixed = await mount(cfg([{ entity: "binary_sensor.fenster" }], { enabled: true, mix: true }), hassWith(fenster));
    expect(band(mixed)).toBeNull(); // kein zweites Band
    const news = mixed.shadowRoot!.querySelector("af-news.newsband") as El;
    expect(news.lead.map((l: { text: string }) => l.text).join()).toContain("Fenster Bad");
    await news.updateComplete;
    expect(news.shadowRoot!.querySelector(".track .home")!.textContent).toContain("Fenster Bad"); // auch bevor Meldungen geladen sind
    // ohne Mischen: zwei Bänder, das für Zuhause eine Zeile höher
    const two = await mount(cfg([{ entity: "binary_sensor.fenster" }], { enabled: true }), hassWith(fenster));
    expect(band(two)!.classList.contains("up")).toBe(true);
    // wo das Nachrichten-Band aus ist (Fernseher), steht das Laufband für Zuhause weiter allein
    const tv = await mount(cfg([{ entity: "binary_sensor.fenster" }], { enabled: true, mix: true }, { profile: "tv" }), hassWith(fenster));
    expect(band(tv)).not.toBeNull();
  });
});

describe("Warnungen im Laufband (DWD, NINA)", () => {
  const nina = ent("binary_sensor.nina_1", "on", { headline: "Gefahrendurchsage: Gasaustritt in Musterstadt", severity: "Severe", sender: "Stadt", expires: new Date(Date.now() + 3 * 3600e3).toISOString() });
  const ninaRuhig = ent("binary_sensor.nina_2", "off", { headline: "Alte Meldung", severity: "Minor", sender: "Stadt" });
  const dwd = ent("sensor.dwd_aktuell", "3", { warning_count: 2, warning_1_headline: "Amtliche WARNUNG vor STARKREGEN", warning_1_level: 2, warning_2_name: "Sturmböen", warning_2_level: 3 });
  const cfg = (items: unknown[]) => {
    const c = config();
    c.design = { ...c.design, home_ticker: items } as AmbiframeConfig["design"];
    return c;
  };
  const text = (el: El) => el.shadowRoot!.querySelector(".hticker")!.textContent!.replace(/\s+/g, " ");

  it("zeigt aktive Warnungen mit ihrem Text – automatisch aus NINA und DWD, ohne ruhige Sensoren", async () => {
    const el = await mount(cfg([{ kind: "warnings" }]), hassWith(nina, ninaRuhig, dwd));
    const t = text(el);
    expect(t).toMatch(/Gasaustritt in Musterstadt/);
    expect(t).toMatch(/STARKREGEN/);
    expect(t).toMatch(/Sturmböen/); // DWD: „name“, wenn es keine „headline“ gibt
    expect(t).not.toMatch(/Alte Meldung/);
    // schwere Warnungen in Warnfarbe (das laufende Band setzt die Liste doppelt – daher verschiedene Texte zählen)
    expect(new Set([...el.shadowRoot!.querySelectorAll(".hticker span.bad")].map((x) => x.textContent)).size).toBe(2);
  });

  it("nimmt nur die gewählten Entitäten und lässt schwere Warnungen vor anderen Zeilen laufen", async () => {
    const fenster = ent("binary_sensor.fenster", "on", { friendly_name: "Fenster Bad" }, 3000);
    const el = await mount(cfg([{ entity: "binary_sensor.fenster" }, { kind: "warnings", warn_entities: ["binary_sensor.nina_1"] }]), hassWith(fenster, nina, dwd));
    expect(text(el)).not.toMatch(/STARKREGEN/);
    expect(text(el).indexOf("Gasaustritt")).toBeLessThan(text(el).indexOf("Fenster Bad"));
  });

  it("zeigt nichts, solange keine Warnung aktiv ist", async () => {
    expect(await mount(cfg([{ kind: "warnings" }]), hassWith(ninaRuhig)).then((e) => e.shadowRoot!.querySelector(".hticker"))).toBeNull();
  });
});

describe("Laufband für Zuhause: stehen lassen, gruppieren, Einzelheiten", () => {
  const cfg = (items: unknown[], extra: Record<string, unknown> = {}, news?: Record<string, unknown>) => {
    const c = config();
    c.design = { ...c.design, home_ticker: items, ...extra, ...(news ? { news_band: news } : {}) } as AmbiframeConfig["design"];
    return c;
  };
  const band = (el: El) => el.shadowRoot!.querySelector(".hticker") as HTMLElement | null;
  const fenster = (id: string, name: string, state = "on", secondsAgo = 1800) => ent(`binary_sensor.${id}`, state, { friendly_name: name }, secondsAgo);

  it("lässt ein Ereignis nach seinem Ende genau `hold` Minuten stehen – danach ist es weg", async () => {
    const { tickerLines } = await import("../src/util");
    const items = [{ entity: "binary_sensor.flur_bewegung", text: "Bewegung Flur", hold: 2 }];
    const memory = new Map();
    const t0 = Date.now();
    // der Sensor hat sich vor einer Stunde zuletzt geändert – gemerkt wird nur, was wir selbst gesehen haben
    const at = (min: number, state: string) => tickerLines(hassWith(ent("binary_sensor.flur_bewegung", state, {}, 3600)), items, t0 + min * 60e3, undefined, memory).map((l) => l.text);
    expect(at(0, "on")).toEqual([expect.stringMatching(/^Bewegung Flur · seit/)]);
    expect(at(1, "off")).toEqual([expect.stringMatching(/^Bewegung Flur · /)]); // vorbei, steht noch
    expect(at(2.5, "off")).toEqual([]); // 2 Minuten nach dem letzten Treffer: weg
    expect(tickerLines(hassWith(ent("binary_sensor.flur_bewegung", "off")), [{ ...items[0], hold: 0 }], 1_000_000, undefined, new Map())).toEqual([]); // ohne hold: nur solange es zutrifft
  });

  it("erkennt nach einem Neuladen ein gerade beendetes Ein/Aus-Ereignis über seine letzte Änderung wieder", async () => {
    const { tickerLines } = await import("../src/util");
    const items = [{ entity: "binary_sensor.klingel", text: "Es hat geklingelt", hold: 2 }];
    expect(tickerLines(hassWith(ent("binary_sensor.klingel", "off", {}, 60)), items, Date.now(), undefined, new Map()).map((l) => l.text)).toEqual([expect.stringMatching(/^Es hat geklingelt/)]);
    expect(tickerLines(hassWith(ent("binary_sensor.klingel", "off", {}, 600)), items, Date.now(), undefined, new Map())).toEqual([]);
  });

  it("fasst eine Gruppe zu einer Zeile zusammen: Platzhalter, Mindestanzahl, Einzelheiten je Entität", async () => {
    const hass = hassWith(fenster("bad", "Bad"), fenster("kueche", "Küche"), fenster("flur", "Flur", "off"));
    const items: HomeTickerItem[] = [{ kind: "group", entities: ["binary_sensor.bad", "binary_sensor.kueche", "binary_sensor.flur"], text: "{n} Fenster offen" }];
    const el = await mount(cfg(items), hass);
    expect(band(el)!.textContent).toContain("2 Fenster offen");
    expect(band(el)!.textContent).not.toMatch(/Bad|Küche/); // statt vieler Zeilen eine
    const { tickerLines } = await import("../src/util");
    const [line] = tickerLines(hass, items);
    expect(line.detail!.rows!.map((r) => r.name)).toEqual(["Bad", "Küche"]);
    expect(tickerLines(hass, [{ ...items[0], min: 3 }])).toEqual([]); // erst ab 3
    expect(tickerLines(hass, [{ ...items[0], text: undefined }])[0].text).toBe("Bad, Küche"); // leer = die Namen
  });

  it("öffnet beim Antippen die Einzelheiten, schließt beim Antippen und lässt das Dashboard in Ruhe", async () => {
    const el = await mount(cfg([{ kind: "group", entities: ["binary_sensor.bad", "binary_sensor.kueche"], text: "{n} Fenster offen" }]), hassWith(fenster("bad", "Bad"), fenster("kueche", "Küche")));
    (band(el)!.querySelector("span.tap") as HTMLElement).click();
    await el.updateComplete;
    const box = el.shadowRoot!.querySelector(".tdetail");
    expect(box!.textContent).toContain("2 Fenster offen");
    expect(box!.textContent).toMatch(/Bad[\s\S]*Küche/);
    expect(el.controlOpen).toBeFalsy(); // der Tipp hat nicht das Dashboard geöffnet
    el.onTap({ composedPath: () => [], stopPropagation: () => undefined } as unknown as Event);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".tdetail")).toBeNull();
  });

  it("lässt sich abschalten: global und pro Zeile", async () => {
    const hass = hassWith(fenster("bad", "Bad"));
    const line = { entity: "binary_sensor.bad", text: "Bad offen" };
    expect(band(await mount(cfg([line], { ticker_detail: false }), hass))!.querySelector("span.tap")).toBeNull();
    expect(band(await mount(cfg([{ ...line, detail: false }]), hass))!.querySelector("span.tap")).toBeNull();
    expect(band(await mount(cfg([line]), hass))!.querySelector("span.tap")).not.toBeNull();
  });

  it("öffnet die Einzelheiten auch aus dem gemischten Nachrichten-Band", async () => {
    const el = await mount(cfg([{ entity: "binary_sensor.bad", text: "Bad offen" }], {}, { enabled: true, mix: true }), hassWith(fenster("bad", "Bad")));
    const news = el.shadowRoot!.querySelector("af-news.newsband") as El;
    await news.updateComplete;
    (news.shadowRoot!.querySelector(".track .home.tap") as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".tdetail")!.textContent).toContain("Bad offen");
  });

  it("zeigt bei Warnungen den vollen Text, Stufe, Sender und Ablaufzeit", async () => {
    const { warningLines } = await import("../src/util");
    const [w] = warningLines(hassWith(ent("binary_sensor.nina_x", "on", { headline: "Sturm", severity: "Severe", sender: "Leitstelle", description: "Starke Böen.", recommended_actions: "Fenster schließen.", expires: new Date(Date.now() + 3600e3).toISOString() })));
    expect(w.detail!.body).toBe("Starke Böen.\n\nFenster schließen.");
    expect(w.detail!.rows!.map((r) => r.name).length).toBe(3);
  });
});

describe("Laufband für Zuhause: Bereiche und Werte im Text", () => {
  it("nennt in Gruppen auf Wunsch die Bereiche – doppelte nur einmal", async () => {
    const { tickerLines } = await import("../src/util");
    const hass = hassWith(ent("binary_sensor.flur_1", "on", { friendly_name: "Flur Melder Belegung" }), ent("binary_sensor.flur_2", "on", { friendly_name: "Flur Melder 2" }), ent("binary_sensor.keller", "on", { friendly_name: "Keller Melder" }));
    Object.assign(hass, {
      entities: { "binary_sensor.flur_1": { entity_id: "binary_sensor.flur_1", area_id: "flur" }, "binary_sensor.flur_2": { entity_id: "binary_sensor.flur_2", area_id: "flur" }, "binary_sensor.keller": { entity_id: "binary_sensor.keller", device_id: "d1" } },
      devices: { d1: { area_id: "keller" } },
      areas: { flur: { area_id: "flur", name: "Flur" }, keller: { area_id: "keller", name: "Keller" } },
    });
    const [line] = tickerLines(hass, [{ kind: "group", entities: ["binary_sensor.flur_1", "binary_sensor.flur_2", "binary_sensor.keller"], text: "Bewegung: {names}", names: "area" }]);
    expect(line.text).toBe("Bewegung: Flur, Keller");
    expect(line.detail!.rows!.map((r) => r.name)).toEqual(["Flur · Flur Melder Belegung", "Flur · Flur Melder 2", "Keller · Keller Melder"]);
  });

  it("setzt Zustand, Attribute und andere Entitäten in den Text – Zeitpunkte als Uhrzeit, Unbekanntes bleibt stehen", async () => {
    const { tickerLines } = await import("../src/util");
    const end = new Date();
    end.setHours(17, 5, 0, 0);
    const hass = hassWith(
      ent("binary_sensor.auto_laedt", "on", { friendly_name: "Auto lädt", message: "Wallbox" }),
      ent("sensor.akku", "48", { unit_of_measurement: "%" }),
      ent("sensor.fertig", end.toISOString(), { device_class: "timestamp" }),
      ent("sensor.weg", "unavailable"),
    );
    const text = (t: string) => tickerLines(hass, [{ entity: "binary_sensor.auto_laedt", text: t }])[0].text.replace(/ · seit.*$/, "");
    expect(text("Lädt an {message} · {sensor.akku} · fertig {sensor.fertig}")).toBe("Lädt an Wallbox · 48 % · fertig 17:05");
    expect(text("{state} {sensor.weg} {sensor.gibtsnicht} {foo}")).toBe("on – {sensor.gibtsnicht} {foo}");
  });
});

describe("Laufband für Zuhause: Zustände wählen", () => {
  it("versteht mehrere Zustände und „alle außer“ – und zeigt Zustände wie Home Assistant", async () => {
    const { tickerLines } = await import("../src/util");
    const hass = hassWith(ent("sensor.sauger_fehler", "main_brush_jammed"), ent("vacuum.sauger", "returning"));
    Object.assign(hass, { formatEntityState: (s: HassEntity) => (s.state === "main_brush_jammed" ? "Hauptbürste blockiert" : s.state) });
    expect(tickerLines(hass, [{ entity: "sensor.sauger_fehler", state: "!none", text: "Saugroboter: {state}" }])[0].text).toMatch(/^Saugroboter: Hauptbürste blockiert/);
    expect(tickerLines(hass, [{ entity: "vacuum.sauger", state: "cleaning, returning", text: "Sauger unterwegs" }])).toHaveLength(1);
    expect(tickerLines(hassWith(ent("sensor.sauger_fehler", "none")), [{ entity: "sensor.sauger_fehler", state: "!none" }])).toEqual([]);
  });
});

describe("Laufband für Zuhause: Tempo und Laufen", () => {
  const cfg = (extra: Record<string, unknown>) => {
    const c = config();
    c.design = { ...c.design, home_ticker: [{ entity: "binary_sensor.fenster", text: "Fenster offen" }], ...extra } as AmbiframeConfig["design"];
    return c;
  };
  const sized = (el: El, band: number, track: number) => {
    const b = el.shadowRoot!.querySelector(".hticker") as HTMLElement;
    Object.defineProperty(b, "clientWidth", { configurable: true, get: () => band });
    Object.defineProperty(b.querySelector(".track")!, "scrollWidth", { configurable: true, get: () => track });
  };

  it("läuft nur, wenn der Text nicht ins Band passt – und dann mit dem eingestellten Tempo", async () => {
    const el = await mount(cfg({ home_ticker_speed: 20 }), hassWith(ent("binary_sensor.fenster", "on")));
    sized(el, 1000, 2400); // passt nicht
    el.requestUpdate();
    await el.updateComplete;
    await el.updateComplete;
    const band = el.shadowRoot!.querySelector(".hticker") as HTMLElement;
    expect(band.classList.contains("run")).toBe(true);
    sized(el, 1000, 4800); // jetzt doppelt gesetzt: halbe Breite zählt
    el.requestUpdate();
    await el.updateComplete;
    expect((band.querySelector(".track") as HTMLElement).style.animationDuration).toBe("120s"); // 2400 px ÷ 20 px/s
  });

  it("steht still, wenn alles hineinpasst – auch bei vielen Zeilen", async () => {
    const el = await mount(cfg({}), hassWith(ent("binary_sensor.fenster", "on")));
    sized(el, 1000, 300);
    el.requestUpdate();
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".hticker")!.classList.contains("run")).toBe(false);
  });
});
