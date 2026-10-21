// Sprache von Anzeige und Editor: Deutsch (Quelltext) oder Englisch. Der deutsche Text ist der Schlüssel –
// fehlt eine Übersetzung, erscheint er unverändert (ein Test prüft, dass alle Texte übersetzt sind).
import { EN } from "./i18n-en";

export type Lang = "de" | "en";

let current: Lang = "de";

export const lang = (): Lang => current;

/** Einstellung „auto“ (oder leer) folgt der Sprache des HA-Benutzers; alles außer Deutsch wird Englisch */
export const resolveLang = (setting?: string, hassLanguage?: string): Lang => {
  if (setting === "de" || setting === "en") return setting;
  const l = (hassLanguage || (typeof navigator !== "undefined" ? navigator.language : "") || "de").toLowerCase();
  return l.startsWith("de") ? "de" : "en";
};

export const setLang = (l: Lang): void => {
  current = l;
};

/** Gebietsschema für Datum, Uhrzeit und Zahlen */
export const locale = (): string => (current === "de" ? "de-DE" : "en-GB");

/** Übersetzen; {name} wird durch vars.name ersetzt */
export const t = (de: string, vars?: Record<string, string | number>): string => {
  const s = current === "en" ? (EN[de] ?? de) : de;
  return vars ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? "")) : s;
};
