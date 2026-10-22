// Bühne und Raster für Quer- und Hochformat. Hochkant werden Widgets automatisch „gestapelt“,
// solange eine Seite keine eigene Hochformat-Anordnung hat (widget.portrait).
import type { WidgetConfig } from "../types";

export type Orientation = "landscape" | "portrait";

export interface Grid {
  w: number;
  h: number;
  padX: number;
  padY: number;
  gap: number;
  cols: number;
  rows: number;
}

export interface Pos {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Grundmaße: quer 1280×800 (12×8), hoch 800×1280 (8×12) – die Zellen sind in beiden fast gleich groß. */
export const BASE: Record<Orientation, Grid> = {
  landscape: { w: 1280, h: 800, padX: 56, padY: 48, gap: 16, cols: 12, rows: 8 },
  portrait: { w: 800, h: 1280, padX: 40, padY: 56, gap: 16, cols: 8, rows: 12 },
};

/**
 * Bühne passend zum Bildschirm, ohne Balken: Die Bühne wächst nur – nie schrumpft sie unter die Grundmaße, damit
 * jedes Widget mindestens den Platz hat, für den es gestaltet ist. Breitere Bildschirme (16:9) bekommen breitere
 * Spalten, höhere (4:3 quer, Handy hochkant) höhere Zeilen. Begrenzt auf sinnvolle Seitenverhältnisse.
 */
export const gridFor = (orientation: Orientation, aspect?: number): Grid => {
  const g = BASE[orientation];
  if (!aspect || !Number.isFinite(aspect)) return g;
  const base = g.w / g.h;
  // quer: 1,25 … 2,2 · hoch: 0,45 … 0,8
  const [min, max] = orientation === "landscape" ? [1.25, 2.2] : [0.45, 0.8];
  const a = Math.min(max, Math.max(min, aspect));
  return a > base ? { ...g, w: Math.round(g.h * a) } : { ...g, h: Math.round(g.w / a) };
};

/** Feinstes Raster im Editor: halbe Zellen (Ziehen, Größe, Pfeiltasten) */
export const GRID_STEP = 0.5;
export const snap = (v: number): number => Math.round(v / GRID_STEP) * GRID_STEP;

/** Pixel-Rechteck einer Rasterposition */
export const cellRect = (g: Grid, p: Pos) => {
  const colW = (g.w - 2 * g.padX - (g.cols - 1) * g.gap) / g.cols;
  const rowH = (g.h - 2 * g.padY - (g.rows - 1) * g.gap) / g.rows;
  return {
    left: g.padX + p.x * (colW + g.gap),
    top: g.padY + p.y * (rowH + g.gap),
    width: p.w * colW + (p.w - 1) * g.gap,
    height: p.h * rowH + (p.h - 1) * g.gap,
  };
};

interface Placed {
  widget: WidgetConfig;
  x: number;
  dy: number;
  w: number;
  h: number;
}

/**
 * Automatische Hochformat-Anordnung („stapeln“): Was quer nebeneinander steht, kommt untereinander in voller Breite –
 * in Lesereihenfolge (erst die linke Spalte, dann die rechte). Flache Kopfzeilen (Titel + kleine Uhr) bleiben
 * nebeneinander. Passt nicht alles in 12 Zeilen, werden hohe Widgets anteilig gestaucht; bleibt Platz, sitzt der
 * Inhalt dort, wo er auch quer saß (unten beim Bilderrahmen, mittig bei der Nachtuhr).
 */
export const autoPortrait = (widgets: WidgetConfig[]): Record<string, Pos> => {
  const P = BASE.portrait;
  if (!widgets.length) return {};
  // Bänder: Widgets, deren Zeilen sich (auch über Ketten) überschneiden
  const sorted = [...widgets].sort((a, b) => a.y - b.y || a.x - b.x);
  const bands: WidgetConfig[][] = [];
  let bandEnd = -1;
  for (const w of sorted) {
    if (bands.length && w.y < bandEnd) {
      bands[bands.length - 1].push(w);
      bandEnd = Math.max(bandEnd, w.y + w.h);
    } else {
      bands.push([w]);
      bandEnd = w.y + w.h;
    }
  }

  // Zeilen der Hochkant-Seite: entweder ein flaches Band nebeneinander oder je Widget eine volle Zeile
  const rows: { items: Placed[]; h: number; flex: boolean }[] = [];
  for (const band of bands) {
    const top = Math.min(...band.map((w) => w.y));
    const span = Math.max(...band.map((w) => w.y + w.h)) - top;
    if (span <= 2 && band.length > 1) {
      let cursor = 0;
      const items = [...band]
        .sort((a, b) => a.x - b.x)
        .map((w) => {
          const width = Math.max(2, Math.round((w.w * P.cols) / 12));
          const x = Math.max(cursor, Math.min(P.cols - width, Math.round((w.x * P.cols) / 12)));
          cursor = x + width;
          return { widget: w, x, dy: w.y - top, w: width, h: w.h };
        });
      if (cursor <= P.cols) {
        rows.push({ items, h: span, flex: false });
        continue;
      }
    }
    for (const w of [...band].sort((a, b) => a.x - b.x || a.y - b.y)) {
      rows.push({ items: [{ widget: w, x: 0, dy: 0, w: P.cols, h: w.h }], h: w.h, flex: w.h > 1 });
    }
  }

  // Zu viel: hohe Widgets anteilig stauchen (mindestens eine Zeile)
  const total = rows.reduce((s, r) => s + r.h, 0);
  if (total > P.rows) {
    const fixed = rows.filter((r) => !r.flex).reduce((s, r) => s + r.h, 0);
    const flexRows = rows.filter((r) => r.flex);
    const flexTotal = flexRows.reduce((s, r) => s + r.h, 0);
    const available = Math.max(flexRows.length, P.rows - fixed);
    for (const r of flexRows) r.h = Math.max(1, Math.floor((r.h * available) / flexTotal));
    // Rest an die größten verteilen
    let rest = P.rows - rows.reduce((s, r) => s + r.h, 0);
    for (const r of [...flexRows].sort((a, b) => b.h - a.h)) {
      if (rest <= 0) break;
      r.h++;
      rest--;
    }
    for (const r of rows) for (const it of r.items) it.h = Math.min(it.h, r.h - it.dy);
  }

  // Freie Zeilen dort lassen, wo quer auch Platz war – füllte die Seite quer die ganze Höhe, bekommen die hohen
  // Widgets den Platz (Nachrichten, Kamera …), statt unten eine leere Fläche zu lassen
  const topFree = Math.min(...widgets.map((w) => w.y));
  const bottomFree = 8 - Math.max(...widgets.map((w) => w.y + w.h));
  const spare = P.rows - rows.reduce((s, r) => s + r.h, 0);
  const growable = rows.filter((r) => r.flex);
  if (spare > 0 && topFree + bottomFree === 0 && growable.length) {
    const base = growable.reduce((s, r) => s + r.h, 0);
    let rest = spare;
    for (const r of growable) {
      const add = Math.floor((spare * r.h) / base);
      r.h += add;
      rest -= add;
    }
    for (const r of [...growable].sort((a, b) => b.h - a.h)) {
      if (rest <= 0) break;
      r.h++;
      rest--;
    }
    for (const r of growable) for (const it of r.items) it.h = r.h;
  }
  const used = rows.reduce((s, r) => s + r.h, 0);
  const free = Math.max(0, P.rows - used);
  let y = topFree + bottomFree > 0 ? Math.round((free * topFree) / (topFree + bottomFree)) : 0;

  const result: Record<string, Pos> = {};
  for (const r of rows) {
    for (const it of r.items) {
      const py = y + it.dy;
      if (py < P.rows) result[it.widget.id] = { x: it.x, y: py, w: it.w, h: Math.max(1, Math.min(it.h, P.rows - py)) };
    }
    y += r.h;
  }
  return result;
};

/** Positionen aller Widgets in einer Ausrichtung: quer wie gespeichert, hoch eigene Angabe oder automatisch */
export const layoutOf = (widgets: WidgetConfig[], orientation: Orientation): Record<string, Pos> => {
  if (orientation === "landscape") return Object.fromEntries(widgets.map((w) => [w.id, { x: w.x, y: w.y, w: w.w, h: w.h }]));
  const auto = widgets.some((w) => !w.portrait) ? autoPortrait(widgets) : {};
  return Object.fromEntries(widgets.map((w) => [w.id, w.portrait ?? auto[w.id]]).filter((e): e is [string, Pos] => !!e[1]));
};
