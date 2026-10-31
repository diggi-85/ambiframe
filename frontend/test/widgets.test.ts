// @vitest-environment happy-dom
// Neue Widgets: Timer, Pinnwand, Countdown, Abfahrten, Sonne & Mond, Pollen & Luft – Rechenlogik und Anzeige
import { describe, expect, it, vi } from "vitest";
import { CLOCKS, litCells } from "../src/widgets/wordclock";
import "../src/widgets/clocks";
import "../src/widgets/places";
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

describe("Tagesuhr", () => {
  it("nennt die Tageszeit in Worten, auch an den Grenzen", async () => {
    const { dayPart } = await import("../src/widgets/basic");
    expect([4, 5, 9, 10, 11, 12, 13, 14, 17, 18, 21, 22, 0].map(dayPart)).toEqual([
      "Nacht", "Morgen", "Morgen", "Vormittag", "Vormittag", "Mittag", "Mittag", "Nachmittag", "Nachmittag", "Abend", "Abend", "Nacht", "Nacht",
    ]);
  });

  it("zeigt Wochentag, Tageszeit und Datum – auf Wunsch ohne Datum, mit Uhrzeit", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 27, 15, 5)); // Dienstag
    const el = await mount("af-dayclock", hassOf([]));
    const text = () => el.shadowRoot!.textContent!.replace(/\s+/g, " ");
    expect(text()).toContain("Dienstag");
    expect(text()).toContain("Nachmittag");
    expect(text()).toContain("27. Oktober 2026");
    el.remove();
    const plain = await mount("af-dayclock", hassOf([]), { date: false, time: true });
    expect(plain.shadowRoot!.textContent).not.toContain("Oktober");
    expect(plain.shadowRoot!.textContent).toContain("15:05");
    plain.remove();
    // Englisch: eigene Tageszeit-Wörter, nicht „Tomorrow“ (Schlüssel „Morgen“ gehört dem Wetter)
    const { setLang } = await import("../src/i18n");
    setLang("en");
    vi.setSystemTime(new Date(2026, 9, 27, 7, 0));
    const en = await mount("af-dayclock", hassOf([]));
    expect(en.shadowRoot!.textContent).toContain("Morning");
    expect(en.shadowRoot!.textContent).not.toContain("Tomorrow");
    en.remove();
    setLang("fr");
    const fr = await mount("af-dayclock", hassOf([]));
    expect(fr.shadowRoot!.textContent).toContain("Mardi"); // groß, obwohl Französisch klein schreibt
    fr.remove();
    setLang("de");
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

describe("Karte, To-do, Pendelzeit", () => {
  it("wählt den Ausschnitt so, dass alle Punkte hineinpassen – nah, wenn alle beieinander sind", async () => {
    const { fitView } = await import("../src/widgets/places");
    const home = { lat: 51.5, lon: 7.0 };
    const near = fitView([home, { lat: 51.501, lon: 7.001 }], 600, 400);
    const far = fitView([home, { lat: 52.52, lon: 13.4 }], 600, 400);
    expect(near.z).toBe(15); // höchstens Straße
    expect(far.z).toBeLessThan(10);
    // beide Punkte mit Rand im Bild
    for (const p of [home, { lat: 52.52, lon: 13.4 }]) {
      const t = tileOf(p.lat, p.lon, far.z);
      expect(Math.abs((t.x - far.x) * 256)).toBeLessThanOrEqual(300 - 60);
      expect(Math.abs((t.y - far.y) * 256)).toBeLessThanOrEqual(200 - 60);
    }
  });

  it("zeigt Personen und Fahrzeuge mit Ort, Gleiche als Stapel mit einem Schild", async () => {
    const hass = hassOf([
      ent("zone.home", "0", { latitude: 51.5, longitude: 7.0, radius: 30 }),
      ent("person.anna", "home", { latitude: 51.5, longitude: 7.0, friendly_name: "Anna" }),
      ent("person.ben", "home", { latitude: 51.5, longitude: 7.0, friendly_name: "Ben" }),
      ent("device_tracker.auto", "not_home", { latitude: 51.52, longitude: 7.05, friendly_name: "Auto" }),
    ]);
    const el = document.createElement("af-map") as El;
    Object.defineProperty(el, "clientWidth", { value: 600 });
    Object.defineProperty(el, "clientHeight", { value: 400 });
    el.hass = hass;
    el.options = { entities: ["person.anna", "person.ben", "device_tracker.auto"] };
    document.body.append(el);
    await el.updateComplete;
    // Anna und Ben zu Hause: ein Stapel mit gemeinsamem Schild, das Auto für sich
    const pins = [...el.shadowRoot!.querySelectorAll<HTMLElement>(".pin")];
    expect(pins).toHaveLength(2);
    expect(pins[0].querySelectorAll(".avatar")).toHaveLength(2);
    expect(pins[0].textContent).toContain("Anna, Ben");
    expect(text(el)).toContain("Zuhause");
    expect(text(el)).toContain("unterwegs");
    expect(el.shadowRoot!.querySelector(".zone")).toBeTruthy();
    expect(el.shadowRoot!.querySelectorAll(".map img").length).toBeGreaterThan(0);
    el.remove();
  });

  it("blendet Personen aus: ausgeschlossene, auf Wunsch alle zu Hause, und Schilder lassen sich abschalten", async () => {
    const hass = hassOf([
      ent("person.anna", "home", { latitude: 51.5, longitude: 7.0, friendly_name: "Anna" }),
      ent("person.ben", "not_home", { latitude: 51.6, longitude: 7.2, friendly_name: "Ben" }),
      ent("person.tab", "home", { latitude: 51.5, longitude: 7.0, friendly_name: "Tablet" }),
    ]);
    const show = async (options: Record<string, unknown>) => {
      const el = document.createElement("af-map") as El;
      Object.defineProperty(el, "clientWidth", { value: 600 });
      Object.defineProperty(el, "clientHeight", { value: 400 });
      el.hass = hass;
      el.options = options;
      document.body.append(el);
      await el.updateComplete;
      const t = text(el);
      const tags = el.shadowRoot!.querySelectorAll(".tag").length;
      el.remove();
      return { t, tags };
    };
    expect((await show({})).t).toContain("Tablet"); // ohne Auswahl: alle Personen
    expect((await show({ exclude: ["person.tab"] })).t).not.toContain("Tablet");
    const away = await show({ away_only: true });
    expect(away.t).toContain("Ben");
    expect(away.t).not.toContain("Anna");
    expect((await show({ tags: "name" })).t).not.toContain("unterwegs");
    expect((await show({ tags: "none" })).tags).toBe(0);
  });

  it("zeichnet die Strecke eines Reisezeit-Sensors ein und zoomt so weit heraus, dass sie ganz zu sehen ist", async () => {
    const hass = hassOf([
      ent("zone.home", "0", { latitude: 51.5, longitude: 7.0, radius: 30 }),
      ent("person.anna", "home", { latitude: 51.5, longitude: 7.0, friendly_name: "Anna" }),
    ]);
    (hass as unknown as Record<string, unknown>).callWS = vi.fn(async () => ({ path: [[51.5, 7.0], [51.45, 7.1], [51.4, 7.3]] }));
    const el = document.createElement("af-map") as El;
    Object.defineProperty(el, "clientWidth", { value: 600 });
    Object.defineProperty(el, "clientHeight", { value: 400 });
    el.hass = hass;
    el.options = { entities: ["person.anna"], routes: ["sensor.weg"] };
    document.body.append(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callWS).toHaveBeenCalledWith({ type: "ambiframe/route", entity: "sensor.weg" });
    const line = el.shadowRoot!.querySelector(".route")!;
    const pts = line.getAttribute("points")!.split(" ").map((p) => p.split(",").map(Number));
    expect(pts).toHaveLength(3);
    // Start und Ziel liegen im Bild
    for (const [x, y] of [pts[0], pts[2]]) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(600);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(400);
    }
    expect(el.shadowRoot!.querySelector(".goal")).toBeTruthy();
    el.remove();
  });

  it("To-do: zeigt offene Einträge, hakt nach 4 s ab und lässt sich vorher zurücknehmen", async () => {
    vi.useFakeTimers();
    let push: (m: unknown) => void = () => undefined;
    const hass = hassOf([ent("todo.einkauf", "2", { friendly_name: "Einkauf" })]);
    (hass as unknown as Record<string, unknown>).connection = {
      subscribeMessage: vi.fn(async (cb: (m: unknown) => void) => ((push = cb), () => undefined)),
    };
    const el = await mount("af-todo", hass);
    push({ items: [{ uid: "1", summary: "Milch", status: "needs_action" }, { uid: "2", summary: "Brot", status: "needs_action" }, { uid: "3", summary: "Eier", status: "completed" }] });
    await el.updateComplete;
    expect(text(el)).toContain("Milch");
    expect(text(el)).not.toContain("Eier");
    const rows = el.shadowRoot!.querySelectorAll<HTMLElement>("li");
    rows[0].click(); // Milch abhaken …
    rows[1].click(); // Brot abhaken …
    await el.updateComplete;
    el.shadowRoot!.querySelectorAll<HTMLElement>("li")[1].click(); // … Brot doch nicht
    vi.advanceTimersByTime(4100);
    expect(hass.callService).toHaveBeenCalledTimes(1);
    expect(hass.callService).toHaveBeenCalledWith("todo", "update_item", { entity_id: "todo.einkauf", item: "1", status: "completed" });
    el.remove();
    vi.useRealTimers();
  });

  it("Pendelzeit: „losfahren bis“, Verkehr und fehlender Sensor", async () => {
    const { leaveAt } = await import("../src/widgets/places");
    const now = new Date(2026, 9, 30, 7, 0);
    expect(leaveAt("08:00", 23, now)!.getHours() * 60 + leaveAt("08:00", 23, now)!.getMinutes()).toBe(7 * 60 + 37);
    expect(leaveAt("acht", 23, now)).toBeNull();
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const hass = hassOf([ent("sensor.buero", "31", { distance: 18.4, route: "A40" })]);
    const el = await mount("af-commute", hass, { routes: [{ entity: "sensor.buero", name: "Büro", arrive: "08:00", usual: 22 }, { entity: "sensor.fehlt", name: "Schule" }] });
    expect(text(el)).toContain("losfahren bis 07:29");
    expect(text(el)).toContain("über A40");
    expect(text(el)).toContain("18 km");
    expect(text(el)).toContain("+9 min");
    expect(text(el)).toContain("nicht verfügbar");
    el.remove();
    vi.useRealTimers();
  });
});
