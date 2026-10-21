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

/** Schriften müssen im Dokument stehen, damit sie auch in Shadow-DOMs greifen. Geladen wird nur, was benutzt wird. */
export const registerFonts = (): void => {
  if (document.getElementById("ambiframe-fonts")) return;
  const style = document.createElement("style");
  style.id = "ambiframe-fonts";
  style.textContent = FONTS.map((f) => {
    const url = new URL(`./fonts/${f.file}`, import.meta.url).href;
    const format = f.weight.includes(" ") ? "woff2-variations" : "woff2";
    return `@font-face { font-family: "${family(f)}"; font-style: normal; font-display: swap; font-weight: ${f.weight}; src: url("${url}") format("${format}"); }`;
  }).join("\n");
  document.head.appendChild(style);
};
