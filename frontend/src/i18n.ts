// Sprache von Anzeige und Editor: Deutsch (Quelltext), Englisch, Niederländisch oder Französisch. Der deutsche Text ist
// der Schlüssel; fehlt eine Übersetzung, erscheint die englische Fassung (Tests prüfen, dass alle Texte übersetzt sind).
import { EN } from "./i18n-en";
import { FR } from "./i18n-fr";
import { NL } from "./i18n-nl";

export const LANGS = ["de", "en", "nl", "fr"] as const;
export type Lang = (typeof LANGS)[number];

const DICTS: Record<Exclude<Lang, "de">, Record<string, string>> = { en: EN, nl: NL, fr: FR };
const LOCALES: Record<Lang, string> = { de: "de-DE", en: "en-GB", nl: "nl-NL", fr: "fr-FR" };

let current: Lang = "de";

export const lang = (): Lang => current;

const isLang = (l: string | undefined): l is Lang => !!l && (LANGS as readonly string[]).includes(l);

/** Einstellung „auto“ (oder leer) folgt der Sprache des HA-Benutzers; unbekannte Sprachen werden Englisch */
export const resolveLang = (setting?: string, hassLanguage?: string): Lang => {
  if (isLang(setting)) return setting;
  const l = (hassLanguage || (typeof navigator !== "undefined" ? navigator.language : "") || "de").toLowerCase().split("-")[0];
  return isLang(l) ? l : "en";
};

export const setLang = (l: Lang): void => {
  current = l;
};

/** Gebietsschema für Datum, Uhrzeit und Zahlen */
export const locale = (): string => LOCALES[current];

/** Übersetzen; {name} wird durch vars.name ersetzt */
export const t = (de: string, vars?: Record<string, string | number>): string => {
  const s = current === "de" ? de : (DICTS[current][de] ?? EN[de] ?? de);
  return vars ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? "")) : s;
};
