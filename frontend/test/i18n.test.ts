// Jeder Text muss eine englische Übersetzung haben – sonst erscheint Deutsch im englischen Ambiframe
import { describe, expect, it } from "vitest";
import { lang, locale, resolveLang, setLang, t } from "../src/i18n";
import { EN } from "../src/i18n-en";
import { collectKeys } from "./i18n-keys";

describe("Übersetzung", () => {
  it("hat für jeden Text eine englische Fassung", () => {
    const missing = [...collectKeys()].filter((k) => !(k in EN)).sort();
    expect(missing, `Fehlende Übersetzungen:\n${missing.map((k) => JSON.stringify(k)).join(",\n")}`).toEqual([]);
  });

  it("Platzhalter bleiben in der Übersetzung erhalten", () => {
    const bad = Object.entries(EN).filter(([de, en]) => {
      const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
      return ph(de) !== ph(en);
    });
    expect(bad).toEqual([]);
  });

  it("wählt die Sprache: Einstellung vor HA-Benutzer, alles außer Deutsch wird Englisch", () => {
    expect(resolveLang("de", "en")).toBe("de");
    expect(resolveLang("auto", "de-AT")).toBe("de");
    expect(resolveLang(undefined, "fr")).toBe("en");
    setLang("en");
    expect(lang()).toBe("en");
    expect(locale()).toBe("en-GB");
    expect(t("vor {n} min", { n: 5 })).toBe("5 min ago");
    setLang("de");
    expect(t("vor {n} min", { n: 5 })).toBe("vor 5 min");
  });
});
