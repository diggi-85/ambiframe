// Mitgelieferte Schriften (lokal, ohne Google-Abruf) – Liste in fonts.json, die auch build.mjs liest
import list from "./fonts.json";

export interface FontInfo {
  id: string;
  name: string;
  kind: "serif" | "sans";
  file: string;
  weight: string;
}

export const FONTS = list as FontInfo[];

const FALLBACK = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'system-ui, -apple-system, "Segoe UI", sans-serif',
};

const family = (f: FontInfo) => `Ambiframe ${f.name.replace(/ \(.*\)$/, "")}`;

/** CSS-Schriftstapel für eine Schrift-ID, z. B. `"Ambiframe Geist", system-ui, …` – leer, wenn unbekannt. */
export const fontStack = (id?: string): string => {
  const f = FONTS.find((x) => x.id === id);
  return f ? `"${family(f)}", ${FALLBACK[f.kind]}` : "";
};

/** Nur die Ziffern einer Schrift (dazu , . - : ° % +): „Zahlen in der Titelschrift, Wörter in der Textschrift“ */
export const digitFamily = (family: string): string => `${family} Ziffern`;
const DIGITS = "U+0030-0039, U+002B-002E, U+003A, U+00B0, U+0025, U+2212";

/** Schriften müssen im Dokument stehen, damit sie auch in Shadow-DOMs greifen. Geladen wird nur, was benutzt wird. */
export const registerFonts = (): void => {
  if (document.getElementById("ambiframe-fonts")) return;
  const style = document.createElement("style");
  style.id = "ambiframe-fonts";
  style.textContent = FONTS.map((f) => {
    const url = new URL(`./fonts/${f.file}`, import.meta.url).href;
    const format = f.weight.includes(" ") ? "woff2-variations" : "woff2";
    const face = (name: string, extra = "") =>
      `@font-face { font-family: "${name}"; font-style: normal; font-display: swap; font-weight: ${f.weight}; src: url("${url}") format("${format}");${extra} }`;
    return face(family(f)) + "\n" + face(digitFamily(family(f)), ` unicode-range: ${DIGITS};`);
  }).join("\n");
  document.head.appendChild(style);
};
