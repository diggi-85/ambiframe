// Jeder Text muss eine englische, niederländische und französische Übersetzung haben – sonst erscheint Deutsch
import { describe, expect, it } from "vitest";
import { lang, locale, resolveLang, setLang, t } from "../src/i18n";
import { EN } from "../src/i18n-en";
import { FR } from "../src/i18n-fr";
import { NL } from "../src/i18n-nl";
import { collectKeys } from "./i18n-keys";

describe("Übersetzung", () => {
  it("hat für jeden Text eine englische Fassung", () => {
    const missing = [...collectKeys()].filter((k) => !(k in EN)).sort();
    expect(missing, `Fehlende Übersetzungen:\n${missing.map((k) => JSON.stringify(k)).join(",\n")}`).toEqual([]);
  });

  it.each([
    ["Niederländisch", NL],
    ["Französisch", FR],
  ])("hat für jeden Text eine Fassung auf %s", (_name, dict) => {
    const missing = [...collectKeys()].filter((k) => !(k in dict)).sort();
    expect(missing, `Fehlende Übersetzungen:\n${missing.map((k) => JSON.stringify(k)).join(",\n")}`).toEqual([]);
  });

  it.each([
    ["Englisch", EN],
    ["Niederländisch", NL],
    ["Französisch", FR],
  ])("Platzhalter bleiben erhalten (%s)", (_name, dict) => {
    const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
    const bad = Object.entries(dict).filter(([de, other]) => ph(de) !== ph(other));
    expect(bad).toEqual([]);
  });

  it("wählt die Sprache: Einstellung vor HA-Benutzer, unbekannte Sprachen werden Englisch", () => {
    expect(resolveLang("de", "en")).toBe("de");
    expect(resolveLang("auto", "de-AT")).toBe("de");
    expect(resolveLang(undefined, "fr")).toBe("fr");
    expect(resolveLang(undefined, "nl-BE")).toBe("nl");
    expect(resolveLang(undefined, "es")).toBe("en");
    setLang("nl");
    expect(locale()).toBe("nl-NL");
    expect(t("vor {n} min", { n: 5 })).toBe("5 min geleden");
    setLang("fr");
    expect(t("vor {n} min", { n: 5 })).toBe("il y a 5 min");
    setLang("en");
    expect(lang()).toBe("en");
    expect(locale()).toBe("en-GB");
    expect(t("vor {n} min", { n: 5 })).toBe("5 min ago");
    setLang("de");
    expect(t("vor {n} min", { n: 5 })).toBe("vor 5 min");
  });
});
