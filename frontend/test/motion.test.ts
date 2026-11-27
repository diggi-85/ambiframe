import { describe, expect, it } from "vitest";
import { motionOf, motionVars } from "../src/styles";

describe("Bewegung", () => {
  it("Seite geht vor Design, Design vor Stil, Dauer begrenzt", () => {
    const m = motionOf({ chart_motion: "soft", motion: { duration: 99, stagger: "strong" } }, { motion: { style: "spring", stagger: "off" } });
    expect(m).toMatchObject({ style: "spring", duration: 5, stagger: "off", highlight: "glow", count: "all", when: "always" });
    expect(motionOf(undefined).duration).toBe(1.1);
  });
  it("Aus: keine Karten-Bewegung, kein Gleiten; dezent startet bei 65 %", () => {
    expect(motionVars(motionOf({ chart_motion: "off" }))).toMatchObject({ "--af-card-anim": "none", "--af-glide": "0s", "--af-stagger": "0ms" });
    const v = motionVars(motionOf({ motion: { strength: "subtle", duration: 2.2 } }));
    expect(v["--af-from"]).toBe("0.65");
    expect(v["--af-tempo"]).toBe("2");
    expect(v["--af-stagger"]).toBe("140ms");
  });
});

import { tickerLines } from "../src/util";

describe("Musik im Laufband", () => {
  const st = (id: string, state: string, title: string) => ({
    entity_id: id,
    state,
    attributes: { friendly_name: id.split(".")[1], media_title: title, media_artist: "Band", entity_picture: "/cover.jpg" },
    last_changed: "",
    last_updated: "",
  });
  const hass = {
    states: {
      "media_player.a": st("media_player.a", "playing", "Lied"),
      "media_player.gruppe": st("media_player.gruppe", "playing", "Lied"),
      "media_player.b": st("media_player.b", "paused", "Anderes"),
    },
  } as never;
  it("eine Zeile je laufendem Titel, mit Cover und eigenem Text", () => {
    const lines = tickerLines(hass, [{ kind: "music" }]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ text: "Lied – Band · a", img: "/cover.jpg" });
    expect(tickerLines(hass, [{ kind: "music", text: "♪ {title}", cover: false }])[0]).toMatchObject({ text: "♪ Lied", img: undefined, icon: "music" });
  });
});

import { staying } from "../src/display/display";
import { kenBurns } from "../src/display/page";

describe("Seitenwechsel und Fotos", () => {
  const w = (id: string, type: string, x: number, options = {}) => ({ id, type, x, y: 0, w: 4, h: 2, options });
  const page = (id: string, widgets: unknown[], bg = "none") => ({ id, name: id, duration: 30, palette: "normal", background: { type: bg }, widgets }) as never;
  it("gleiches Widget an gleicher Stelle bleibt stehen – nicht bei anderem Hintergrund oder derselben Seite", () => {
    const a = page("a", [w("uhr", "clock", 0), w("x", "weather", 4)]);
    const b = page("b", [w("uhr2", "clock", 0), w("y", "weather", 4, { entity: "weather.b" })]);
    expect(staying(a, b, "landscape")).toEqual({ prev: new Set(["uhr"]), next: new Set(["uhr2"]) });
    expect(staying(a, page("c", [w("u", "clock", 0)], "photo"), "landscape")).toBeUndefined();
    expect(staying(a, a, "landscape")).toBeUndefined();
  });
  it("Foto-Bewegung: fest je Bild, aus = steht", () => {
    expect(kenBurns("a.jpg")).toBe(kenBurns("a.jpg"));
    expect(kenBurns("a.jpg", "off")).toBe("--af-photo-motion:none");
    expect(kenBurns("a.jpg", "strong")).not.toBe(kenBurns("a.jpg"));
  });
});

import { musicCover } from "../src/display/page";

describe("Musik im Vollbild als Seite", () => {
  it("Hintergrund nimmt das Cover des laufenden Players dieser Seite", () => {
    const st = (id: string, state: string, pic: string) => ({ entity_id: id, state, attributes: { entity_picture: pic }, last_changed: "", last_updated: "" });
    const hass = { states: { "media_player.a": st("media_player.a", "paused", "/a.jpg"), "media_player.b": st("media_player.b", "playing", "/b.jpg") } } as never;
    const page = (entities?: string[]) => ({ widgets: [{ id: "m", type: "media", options: { entities } }] }) as never;
    expect(musicCover(hass, page())).toBe("/b.jpg");
    expect(musicCover(hass, page(["media_player.a"]))).toBe("/a.jpg");
  });
});

import { tickerLookOf } from "../src/styles";
describe("Form der Laufbänder", () => {
  it("passt sich dem Stil an, eigene Wahl gewinnt", () => {
    expect(tickerLookOf("glass")).toBe("float");
    expect(tickerLookOf("editorial")).toBe("line");
    expect(tickerLookOf("terminal")).toBe("bar");
    expect(tickerLookOf("glass", "bar")).toBe("bar");
    expect(tickerLookOf("saisonal")).toBe("float");
    expect(tickerLookOf("saison-weihnachten")).toBe("float");
  });
});
