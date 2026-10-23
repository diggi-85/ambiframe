// @vitest-environment happy-dom
// Neue Widgets: Timer, Pinnwand, Countdown, Abfahrten, Sonne & Mond, Pollen & Luft – Rechenlogik und Anzeige
import { describe, expect, it, vi } from "vitest";
import { CLOCKS, litCells } from "../src/widgets/wordclock";
import "../src/widgets/clocks";
import { airKindOf, airLevel, countdownText, moonPhase, readDepartures, sunTimes, targetDate, tileOf, timerLeft } from "../src/widgets/plus";
import type { Hass, HassEntity } from "../src/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type El = HTMLElement & Record<string, any>;

const ent = (entity_id: string, state: string, attributes: Record<string, unknown> = {}, secondsAgo = 0): HassEntity => {
  const t = new Date(Date.now() - secondsAgo * 1000).toISOString();
  return { entity_id, state, attributes, last_changed: t, last_updated: t } as HassEntity;
};
const hassOf = (list: HassEntity[]): Hass =>
  ({ states: Object.fromEntries(list.map((s) => [s.entity_id, s])), callService: vi.fn(async () => undefined), language: "de", locale: { language: "de" } }) as unknown as Hass;

const mount = async (tag: string, hass: Hass, options: Record<string, unknown> = {}): Promise<El> => {
  const el = document.createElement(tag) as El;
  el.hass = hass;
  el.options = options;
  document.body.append(el);
  await el.updateComplete;
  return el;
};
const text = (el: El) => (el.shadowRoot?.textContent ?? "").replace(/\s+/g, " ").trim();

describe("Sonne & Mond", () => {
  it("rechnet Sonnenauf- und -untergang auf wenige Minuten genau", () => {
    // Berlin, 21. Juni 2026: Aufgang 04:43, Untergang 21:33 (MESZ) = 02:43 / 19:33 UTC
    const s = sunTimes(new Date(2026, 5, 21), 52.52, 13.405)!;
    const utc = (d: Date) => d.getUTCHours() * 60 + d.getUTCMinutes();
    expect(Math.abs(utc(s.rise) - (2 * 60 + 43))).toBeLessThanOrEqual(3);
    expect(Math.abs(utc(s.set) - (19 * 60 + 33))).toBeLessThanOrEqual(3);
  });

  it("kennt Polartag", () => {
    expect(sunTimes(new Date(2026, 5, 21), 78.2, 15.6)).toBeNull();
  });

  it("findet Vollmond und Neumond", () => {
    // Vollmond 26.10.2026 04:12 UTC, Neumond 10.10.2026 15:50 UTC
    const full = moonPhase(new Date(Date.UTC(2026, 9, 26, 4)));
    expect(full.name).toBe("Vollmond");
    expect(full.lit).toBeGreaterThan(0.98);
    const nm = moonPhase(new Date(Date.UTC(2026, 9, 10, 16)));
    expect(nm.name).toBe("Neumond");
    expect(nm.lit).toBeLessThan(0.02);
    const before = moonPhase(new Date(Date.UTC(2026, 9, 22)));
    expect(Math.abs(before.next_full.getTime() - Date.UTC(2026, 9, 26, 4, 12))).toBeLessThan(18 * 3600e3);
  });

  it("liegt für das Radar in der richtigen Kachel", () => {
    const c = tileOf(52.52, 13.405, 7);
    expect(Math.floor(c.x)).toBe(68);
    expect(Math.floor(c.y)).toBe(41);
  });
});

describe("Timer", () => {
  it("rechnet die Restzeit aus finishes_at oder remaining", () => {
    const now = Date.now();
    expect(timerLeft(ent("timer.a", "active", { finishes_at: new Date(now + 90e3).toISOString() }), now)).toBe(90e3);
    expect(timerLeft(ent("timer.a", "paused", { remaining: "0:04:30" }), now)).toBe(270e3);
    expect(timerLeft(ent("timer.a", "idle", { remaining: "0:05:00" }), now)).toBeNull();
  });

  it("zeigt laufende Timer, startet Vorgaben und gibt Klicks nicht weiter", async () => {
    const hass = hassOf([
      ent("timer.kueche", "active", { friendly_name: "Küche", finishes_at: new Date(Date.now() + 125e3).toISOString() }),
      ent("timer.tee", "idle", { friendly_name: "Tee" }),
    ]);
    const el = await mount("af-timer", hass, { presets: "3, 8", target: "timer.tee" });
    expect(text(el)).toContain("Küche");
    expect(text(el)).toMatch(/2:0[45]/);
    expect(text(el)).not.toContain("Tee");
    const outer = vi.fn();
    document.body.addEventListener("click", outer);
    const btn = [...el.shadowRoot!.querySelectorAll(".presets button")].find((b) => b.textContent!.includes("8")) as HTMLButtonElement;
    btn.click();
    expect(hass.callService).toHaveBeenCalledWith("timer", "start", { entity_id: "timer.tee", duration: "00:08:00" });
    expect(outer).not.toHaveBeenCalled();
    el.remove();
  });
});

describe("Pinnwand", () => {
  it("zeigt Nachrichten und blendet alte und leere aus", async () => {
    const hass = hassOf([
      ent("input_text.pinnwand", "Bin um 6 zurück", { friendly_name: "Pinnwand" }, 600),
      ent("input_text.alt", "Alte Notiz", {}, 3 * 3600),
      ent("input_text.leer", ""),
    ]);
    const el = await mount("af-board", hass, { entities: ["input_text.pinnwand", "input_text.alt", "input_text.leer"], expire_hours: 2 });
    expect(text(el)).toContain("Bin um 6 zurück");
    expect(text(el)).not.toContain("Alte Notiz");
    expect(el.shadowRoot!.querySelectorAll(".note").length).toBe(1);
    el.remove();
  });

  it("findet Pinnwand-Texte selbst", async () => {
    const el = await mount("af-board", hassOf([ent("input_text.nachricht_familie", "Hallo")]));
    expect(text(el)).toContain("Hallo");
    el.remove();
  });
});

describe("Countdown", () => {
  it("liest Datum, Datum-Helfer und Kalender", () => {
    const hass = hassOf([
      ent("input_datetime.urlaub", "2026-12-24", { has_date: true, has_time: false, year: 2026, month: 12, day: 24 }),
      ent("calendar.familie", "off", { start_time: "2026-11-02 10:00:00" }),
    ]);
    expect(targetDate(hass, { date: "2026-12-24" })!.getDate()).toBe(24);
    expect(targetDate(hass, { entity: "input_datetime.urlaub" })!.getMonth()).toBe(11);
    expect(targetDate(hass, { entity: "calendar.familie" })!.getDate()).toBe(2);
  });

  it("formuliert verständlich", () => {
    expect(countdownText(0)).toBe("heute");
    expect(countdownText(1)).toBe("morgen");
    expect(countdownText(12)).toBe("noch 12 Tage");
    expect(countdownText(42)).toBe("noch 6 Wochen");
  });

  it("zeigt ein einzelnes Ereignis groß und lässt vergangene weg", async () => {
    const in10 = new Date(Date.now() + 10 * 864e5).toISOString().slice(0, 10);
    const el = await mount("af-countdown", hassOf([]), {
      items: [
        { name: "Urlaub", date: in10 },
        { name: "Vorbei", date: "2020-01-01" },
      ],
    });
    expect(el.shadowRoot!.querySelector(".one .n")!.textContent!.trim()).toMatch(/^1[01]$/);
    expect(text(el)).toContain("Urlaub");
    expect(text(el)).not.toContain("Vorbei");
    el.remove();
  });
});

describe("Abfahrten", () => {
  const now = new Date(2026, 9, 22, 12, 0).getTime();

  it("liest Listen verschiedener Integrationen", () => {
    const hafas = ent("sensor.bahnhof", "12:05", {
      connections: [
        { departure: new Date(now + 5 * 60e3).toISOString(), line: "S1", direction: "Flughafen", delay: 2, platform: "3" },
        { departure: new Date(now + 20 * 60e3).toISOString(), line: { name: "RE5" }, destination: "Koblenz" },
      ],
    });
    const d = readDepartures(hafas, undefined, now);
    expect(d.map((x) => x.line)).toEqual(["S1", "RE5"]);
    expect(d[0]).toMatchObject({ destination: "Flughafen", delay: 2, platform: "3" });
    expect(d[1].destination).toBe("Koblenz");

    const minutes = ent("sensor.bus", "4", { next_departures: [{ route: "42", headsign: "Zentrum", minutes: 4 }, { route: "42", headsign: "Zentrum", time: "12:30" }] });
    const m = readDepartures(minutes, undefined, now);
    expect(m[0].time.getTime()).toBe(now + 4 * 60e3);
    expect(m[1].time.getHours()).toBe(12);
    expect(m[1].time.getMinutes()).toBe(30);
  });

  it("sortiert, filtert Linien und berücksichtigt den Fußweg", async () => {
    const soon = (min: number) => new Date(Date.now() + min * 60e3).toISOString();
    const hass = hassOf([
      ent("sensor.halt", "x", {
        departures: [
          { departure: soon(15), line: "42", direction: "Zentrum" },
          { departure: soon(2), line: "42", direction: "Zu knapp" },
          { departure: soon(8), line: "7", direction: "Andere Linie" },
          { departure: soon(9), line: "42", direction: "Bahnhof", delay: 3 },
        ],
      }),
    ]);
    const el = await mount("af-departures", hass, { lines: "42", walk: 5 });
    const rows = [...el.shadowRoot!.querySelectorAll(".row .dest")].map((r) => r.textContent!.trim());
    expect(rows).toEqual(["Bahnhof", "Zentrum"]);
    expect(text(el)).toContain("+3");
    el.remove();
  });
});

describe("Pollen & Luft", () => {
  it("ordnet Werte Stufen zu", () => {
    expect(airLevel("pollen", 0)).toBe(0);
    expect(airLevel("pollen", 1.5)).toBe(2);
    expect(airLevel("pollen", 3)).toBe(3);
    expect(airLevel("pm25", 8)).toBe(0);
    expect(airLevel("aqi", 120)).toBe(2);
    expect(airLevel("aqi", NaN)).toBe(-1);
    expect(airKindOf("sensor.pollenflug_birke")).toBe("pollen");
    expect(airKindOf("sensor.x", ent("sensor.x", "5", { device_class: "pm25" }))).toBe("pm25");
  });

  it("findet Sensoren selbst und zeigt auf Wunsch nur erhöhte Werte", async () => {
    const hass = hassOf([
      ent("sensor.pollenflug_birke", "3", { friendly_name: "Pollenflug Birke" }),
      ent("sensor.pollenflug_graeser", "0", { friendly_name: "Pollenflug Gräser" }),
      ent("sensor.luft_pm25", "12", { device_class: "pm25", friendly_name: "Feinstaub" }),
      ent("sensor.temperatur", "21", { device_class: "temperature" }),
    ]);
    const all = await mount("af-air", hass);
    expect(all.shadowRoot!.querySelectorAll(".row").length).toBe(3);
    expect(text(all)).toContain("Birke");
    expect(text(all)).toContain("hoch");
    all.remove();
    const high = await mount("af-air", hass, { only_elevated: true });
    expect(high.shadowRoot!.querySelectorAll(".row").length).toBe(2);
    expect(text(high)).not.toContain("Gräser");
    high.remove();
  });
});

describe("Sonne & Mond im Display", () => {
  it("zeigt Zeiten und Mondphase", async () => {
    const el = await mount("af-sky", hassOf([ent("zone.home", "0", { latitude: 52.5, longitude: 13.4 })]));
    expect(text(el)).toMatch(/\d{2}:\d{2} – \d{2}:\d{2}/);
    expect(text(el)).toContain("beleuchtet");
    el.remove();
  });
});

describe("Mondbild", () => {
  it("zeigt die beleuchtete Seite richtig herum", async () => {
    const { moonPath } = await import("../src/widgets/plus");
    // zunehmende Sichel: rechte Hälfte, Schattengrenze nach rechts gewölbt
    expect(moonPath(0.125)).toMatch(/^M24 4 A20 20 0 0 1 24 44 A14\.14 20 0 0 0 24 4 Z$/);
    // abnehmender Mond (mehr als halb): linke Hälfte, Grenze nach rechts
    expect(moonPath(0.625)).toMatch(/0 0 0 24 44 A14\.14 20 0 0 0 24 4 Z$/);
    // abnehmende Sichel: linke Hälfte, Grenze nach links
    expect(moonPath(0.875)).toMatch(/0 0 0 24 44 A14\.14 20 0 0 1 24 4 Z$/);
  });
});

describe("Regenradar", () => {
  it("lädt nur sichtbare Kacheln und die Bilder nacheinander", async () => {
    const frames = Array.from({ length: 13 }, (_, i) => ({ time: 1_800_000_000 + i * 600, path: `/v2/radar/f${i}` }));
    const fetchMock = vi.fn(async () => ({ json: async () => ({ host: "https://tiles.example", radar: { past: frames } }) }));
    vi.stubGlobal("fetch", fetchMock);
    vi.useFakeTimers();
    const el = await mount("af-radar", hassOf([ent("zone.home", "0", { latitude: 52.5, longitude: 13.4 })]), { speed: 500 });
    await vi.advanceTimersByTimeAsync(10);
    await el.updateComplete;
    const rainImgs = () => [...el.shadowRoot!.querySelectorAll(".rain img")].map((i) => i.getAttribute("src")!);
    // zuerst nur das neueste Bild
    expect(new Set(rainImgs().map((s) => s.split("/256/")[0])).size).toBe(1);
    expect(rainImgs()[0]).toContain("/f12/");
    await vi.advanceTimersByTimeAsync(30_000);
    await el.updateComplete;
    const paths = new Set(rainImgs().map((s) => s.split("/256/")[0]));
    // höchstens die letzte Stunde (6 Bilder)
    expect(paths.size).toBe(6);
    expect([...paths].some((p) => p.endsWith("/f6"))).toBe(false);
    el.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
});

describe("Wortuhr", () => {
  const words = (l: "de" | "en" | "nl" | "fr", h: number, m: number) => {
    // Leuchtende Buchstaben zeilenweise zu Wörtern zusammensetzen
    const lit = litCells(l, h, m)!;
    return CLOCKS[l].rows
      .map((row, r) => [...row].map((ch, c) => (lit.has(`${r},${c}`) ? ch : " ")).join(""))
      .join(" ")
      .split(/\s+/)
      .filter(Boolean)
      .join(" ");
  };

  it("findet für jede Uhrzeit in jeder Sprache alle Wörter im Gitter", () => {
    for (const l of ["de", "en", "nl", "fr"] as const) {
      expect(CLOCKS[l].rows.every((r) => [...r].length === 11)).toBe(true);
      for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m += 5) expect(litCells(l, h, m), `${l} ${h}:${m}`).not.toBeNull();
    }
  });

  it("sagt die Uhrzeit richtig", () => {
    expect(words("de", 14, 25)).toBe("ES IST FÜNF VOR HALB DREI");
    expect(words("de", 1, 0)).toBe("ES IST EIN UHR");
    expect(words("de", 9, 45)).toBe("ES IST VIERTEL VOR ZEHN");
    expect(words("de", 22, 10)).toBe("ES IST ZEHN NACH ZEHN");
    expect(words("en", 15, 15)).toBe("IT IS A QUARTER PAST THREE");
    expect(words("en", 10, 0)).toBe("IT IS TEN OCLOCK");
    expect(words("en", 11, 35)).toBe("IT IS TWENTYFIVE TO TWELVE");
    expect(words("nl", 7, 25)).toBe("HET IS VIJF VOOR HALF ACHT");
    expect(words("fr", 13, 30)).toBe("IL EST UNE HEURE ET DEMIE");
    expect(words("fr", 11, 45)).toBe("IL EST MIDI MOINS LE QUART");
    expect(words("fr", 0, 30)).toBe("IL EST MINUIT ET DEMI");
    // Minuten zwischen den Fünfern: gleiche Wörter wie davor
    expect(words("de", 14, 27)).toBe(words("de", 14, 25));
  });

  it("zeigt Minutenpunkte und lässt „ES IST“ auf Wunsch weg", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 23, 14, 27));
    const el = await mount("af-wordclock", hassOf([]), { prefix: false, language: "de" });
    expect(el.shadowRoot!.querySelectorAll(".dot.on").length).toBe(2);
    const on = [...el.shadowRoot!.querySelectorAll("span.on")].map((s) => s.textContent).join("");
    expect(on).toBe("FÜNFVORHALBDREI");
    el.remove();
    vi.useRealTimers();
  });
});

describe("Analoge Uhr und Fallblatt", () => {
  it("rechnet die Zeigerstellung", async () => {
    const { handPhases } = await import("../src/widgets/clocks");
    const p = handPhases(new Date(2026, 9, 23, 15, 30, 15));
    expect(p.s).toBe(15);
    expect(p.m).toBe(30 * 60 + 15);
    expect(p.h).toBe(3 * 3600 + 30 * 60 + 15);
  });

  it("blättert über Zwischenzeichen und endet beim Ziel", async () => {
    const { flapPath } = await import("../src/widgets/clocks");
    expect(flapPath("3", "5")).toEqual(["4", "5"]);
    expect(flapPath("5", "5")).toEqual([]);
    expect(flapPath("0", "Z")).toHaveLength(6);
    expect(flapPath("0", "Z").at(-1)).toBe("Z");
    expect(flapPath("€", "A")).toEqual(["A"]);
  });

  it("zeigt am Ende den richtigen Text", async () => {
    vi.useFakeTimers();
    const flap = document.createElement("af-flap") as El;
    flap.text = "14:56";
    document.body.append(flap);
    await flap.updateComplete;
    await vi.advanceTimersByTimeAsync(3000);
    await flap.updateComplete;
    expect(flap.cells.map((c: { cur: string }) => c.cur).join("")).toBe("14:56");
    flap.text = "14:57";
    await flap.updateComplete;
    await vi.advanceTimersByTimeAsync(3000);
    expect(flap.cells.map((c: { cur: string }) => c.cur).join("")).toBe("14:57");
    flap.remove();
    vi.useRealTimers();
  });
});

describe("Namen kürzen", () => {
  it("entfernt den gemeinsamen Ortsnamen", async () => {
    const { stripCommon } = await import("../src/widgets/plus");
    expect(stripCommon(["Musterstadt-Nord, Germany PM2,5", "Musterstadt-Nord, Germany Ozon"])).toEqual(["PM2,5", "Ozon"]);
    expect(stripCommon(["Pollenflug Birke", "Pollenflug Gräser"])).toEqual(["Birke", "Gräser"]);
    expect(stripCommon(["Birke", "Erle"])).toEqual(["Birke", "Erle"]);
    expect(stripCommon(["Feinstaub"])).toEqual(["Feinstaub"]);
  });
});
