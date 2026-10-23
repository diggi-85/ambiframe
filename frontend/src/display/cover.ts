// Farben aus dem Album-Cover: Hintergrund, Akzent und Karten passen sich der laufenden Musik an.
// Die Farbwerte sind als <color> angemeldet – der Browser blendet jeden Wechsel selbst weich über.

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

/** Bis zu drei prägende Farbtöne eines Bildes (RGBA-Pixel), kräftigste zuerst */
export const paletteFromPixels = (data: Uint8ClampedArray | number[]): Hsl[] => {
  const buckets = Array.from({ length: 24 }, () => ({ w: 0, h: 0, s: 0, l: 0 }));
  let grey = { w: 0, l: 0 };
  for (let i = 0; i + 3 < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const c = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    if (c.l < 0.08 || c.l > 0.94 || c.s < 0.15) {
      grey = { w: grey.w + 1, l: grey.l + c.l };
      continue;
    }
    // Kräftige, mittelhelle Farben zählen mehr als blasse
    const w = c.s * (1 - Math.abs(c.l - 0.5));
    const b = buckets[Math.floor(c.h / 15) % 24];
    b.w += w;
    b.h += c.h * w;
    b.s += c.s * w;
    b.l += c.l * w;
  }
  const picked: Hsl[] = [];
  for (const b of buckets.filter((x) => x.w > 0).sort((a, z) => z.w - a.w)) {
    const c = { h: b.h / b.w, s: b.s / b.w, l: b.l / b.w };
    // benachbarte Töne nicht doppelt nehmen
    if (picked.some((p) => Math.min(Math.abs(p.h - c.h), 360 - Math.abs(p.h - c.h)) < 28)) continue;
    picked.push(c);
    if (picked.length === 3) break;
  }
  if (!picked.length) return grey.w ? [0, 1, 2].map(() => ({ h: 0, s: 0, l: grey.l / grey.w })) : [];
  // Weniger als drei Töne (z. B. einfarbiges Cover): mit verschobenen Varianten auffüllen
  while (picked.length < 3) picked.push({ ...picked[0], h: (picked[0].h + 25 * picked.length) % 360 });
  return picked;
};

export const rgbToHsl = (r: number, g: number, b: number): Hsl => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
};

const hsl = (c: Hsl, s: number, l: number, a = 1) =>
  `hsl(${Math.round(c.h)} ${Math.round(Math.min(c.s, s) * 100)}% ${Math.round(l * 100)}% / ${a})`;

/** Stil-Werte aus der Palette – im Dunkeln heller Akzent auf fast schwarzem Grund, im Hellen umgekehrt */
export const coverTokens = (pal: Hsl[], mode: "light" | "dark"): Record<string, string> => {
  const [a, b, c] = pal;
  const dark = mode === "dark";
  return {
    "--af-accent": hsl(a, 0.8, dark ? 0.7 : 0.38),
    "--af-bg": hsl(a, 0.45, dark ? 0.07 : 0.94),
    "--af-cover-tint": hsl(b, 0.5, dark ? 0.5 : 0.6, dark ? 0.1 : 0.12),
    "--af-cover-1": hsl(a, 0.8, dark ? 0.45 : 0.68, dark ? 0.42 : 0.5),
    "--af-cover-2": hsl(b, 0.8, dark ? 0.42 : 0.7, dark ? 0.36 : 0.45),
    "--af-cover-3": hsl(c, 0.8, dark ? 0.4 : 0.72, dark ? 0.32 : 0.42),
  };
};

/** Einmal pro Dokument: die Farbwerte als <color> anmelden, damit sie sich animieren lassen */
export const registerCoverProperties = (): void => {
  const props: [string, string][] = [
    ["--af-accent", "#d6a865"],
    ["--af-bg", "#0a0d0b"],
    ["--af-cover-tint", "transparent"],
    ["--af-cover-1", "transparent"],
    ["--af-cover-2", "transparent"],
    ["--af-cover-3", "transparent"],
  ];
  for (const [name, initialValue] of props) {
    try {
      CSS.registerProperty({ name, syntax: "<color>", inherits: true, initialValue });
    } catch {
      // schon angemeldet (zweites Display im selben Tab) oder Browser ohne Unterstützung – dann ohne Überblenden
    }
  }
};

/** Cover laden und Palette bestimmen; null, wenn das Bild nicht lesbar ist (fremde Seite ohne CORS) */
export const loadPalette = (url: string): Promise<Hsl[] | null> =>
  new Promise((resolve) => {
    const img = new Image();
    // Bilder über HA (media_player_proxy) sind gleiche Herkunft; fremde nur mit CORS lesbar
    if (/^https?:/.test(url) && !url.startsWith(location.origin)) img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 48;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, 48, 48);
        const pal = paletteFromPixels(ctx.getImageData(0, 0, 48, 48).data);
        resolve(pal.length ? pal : null);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
