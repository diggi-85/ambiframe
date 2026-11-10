// @vitest-environment happy-dom
// Seiteneditor: jedes Verhalten einzeln – Änderungen gehen als „change“ ans Studio und werden hier wie dort angewendet
import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/editor/page-editor";
import type { AmbiframeConfig, WidgetConfig } from "../src/types";

type El = HTMLElement & Record<string, any>;

const widget = (id: string, x: number, y: number, w = 2, h = 1, extra: Partial<WidgetConfig> = {}): WidgetConfig => ({ id, type: "text", x, y, w, h, options: {}, ...extra });
const config = (): AmbiframeConfig =>
  ({
    version: 1,
    design: { theme: "ruhig" },
    photos: { folder: "", bing: false, credit: true },
    displays: [{ id: "kueche", name: "Küche", playlist: [{ page: "a" }], events: "all" }],
    pages: [{ id: "a", name: "A", duration: 30, background: { type: "none" }, palette: "normal", widgets: [widget("t1", 0, 0)] }],
    events: [],
  }) as unknown as AmbiframeConfig;

/** Editor wie im Studio: Änderungen anwenden und zurückgeben; Schlüssel zum Zusammenfassen mitschreiben */
const mount = async (cfg = config()) => {
  const el = document.createElement("af-page-editor") as El;
  const keys: string[] = [];
  const notes: string[] = [];
  el.hass = { states: {} };
  el.config = cfg;
  el.pageId = "a";
  el.displayId = "kueche";
  el.addEventListener("change", (e: Event) => {
    const { fn, coalesce } = (e as CustomEvent).detail;
    const next = structuredClone(el.config);
    fn(next);
    el.config = next;
    keys.push(coalesce);
  });
  el.addEventListener("note", (e: Event) => notes.push((e as CustomEvent).detail.text));
  document.body.append(el);
  await el.updateComplete;
  return { el, keys, notes, page: () => el.config.pages[0] };
};
const key = (k: string, mods: Partial<KeyboardEventInit> = {}) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, ...mods }));

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("Seiteneditor", () => {
  it("setzt ein neues Widget an die erste freie Stelle und wählt es aus", async () => {
    const { el, page } = await mount();
    el.addWidget("clock");
    const added = page().widgets.at(-1)!;
    expect(added.type).toBe("clock");
    expect(added.x >= 2 || added.y >= 1).toBe(true); // nicht über t1 (0,0 2×1)
    expect(el.widgetId).toBe(added.id);
  });

  it("verschiebt das gewählte Widget mit Pfeiltasten in halben Zellen", async () => {
    const { el, page } = await mount();
    el.widgetId = "t1";
    key("ArrowRight");
    key("ArrowDown");
    expect(page().widgets[0]).toMatchObject({ x: 0.5, y: 0.5 });
  });

  it("ändert mit ⇧ + Pfeil die Größe statt der Position", async () => {
    const { el, page } = await mount();
    el.widgetId = "t1";
    key("ArrowRight", { shiftKey: true });
    expect(page().widgets[0]).toMatchObject({ x: 0, w: 2.5 });
  });

  it("schiebt nie über den Rand des Rasters", async () => {
    const { el, page } = await mount();
    el.widgetId = "t1";
    key("ArrowLeft");
    key("ArrowUp");
    expect(page().widgets[0]).toMatchObject({ x: 0, y: 0 });
  });

  it("fasst Tastenschritte zu einem Rückgängig-Schritt zusammen", async () => {
    const { el, keys } = await mount();
    el.widgetId = "t1";
    key("ArrowRight");
    key("ArrowRight");
    expect(keys).toEqual(["keys", "keys"]);
  });

  it("reagiert nicht auf Tasten, während in einem Feld getippt wird", async () => {
    const { el, page } = await mount();
    el.widgetId = "t1";
    const input = document.createElement("input");
    document.body.append(input);
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Delete", bubbles: true, composed: true }));
    expect(page().widgets).toHaveLength(1);
  });

  it("löscht die Auswahl mit Entf", async () => {
    const { el, page } = await mount();
    el.widgetId = "t1";
    key("Delete");
    expect(page().widgets).toHaveLength(0);
    expect(el.widgetId).toBeNull();
  });

  it("hebt die Auswahl mit Esc auf, ohne etwas zu ändern", async () => {
    const { el, keys } = await mount();
    el.widgetId = "t1";
    key("Escape");
    expect(el.widgetId).toBeNull();
    expect(keys).toEqual([]);
  });

  it("dupliziert mit ⌘D bzw. Strg+D versetzt und mit neuer ID", async () => {
    for (const mod of [{ metaKey: true }, { ctrlKey: true }]) {
      const { el, page } = await mount();
      el.widgetId = "t1";
      key("d", mod);
      const [a, b] = page().widgets;
      expect(b.id).not.toBe(a.id);
      expect(b).toMatchObject({ x: 1, y: 1 });
    }
  });

  it("fügt kopierte Widgets mit neuen IDs ein und ändert die Quelle nicht", async () => {
    const { el, page } = await mount();
    el.pasteWidgets([widget("t1", 0, 0)]);
    expect(page().widgets.map((w: WidgetConfig) => w.id)).toEqual(["t1", "t1_2"]);
    expect(page().widgets[1]).toMatchObject({ x: 1, y: 1 }); // gleiche Stelle → eine Zelle versetzt
  });

  it("ignoriert beim Einfügen unbekannte Widget-Arten", async () => {
    const { el, page } = await mount();
    el.pasteWidgets([{ ...widget("x", 0, 0), type: "gibtsnicht" }]);
    expect(page().widgets).toHaveLength(1);
  });

  it("importiert eine Seite aus YAML in die Wiedergabe des Displays", async () => {
    const { el } = await mount();
    expect(el.pasteText("ambiframe_page:\n  name: Neu\n  widgets: []\n")).toBe(true);
    expect(el.config.pages.map((p: { name: string }) => p.name)).toContain("Neu");
    expect(el.config.displays[0].playlist.at(-1).page).toBe(el.pageId);
  });

  it("lehnt Text ab, der weder Widgets noch eine Seite ist", async () => {
    const { el, keys } = await mount();
    expect(el.pasteText("einfach nur Text")).toBe(false);
    expect(keys).toEqual([]);
  });

  it("speichert die Auswahl als eigene Vorlage unter dem eingegebenen Namen", async () => {
    vi.stubGlobal("prompt", () => "Kopfzeile");
    const { el } = await mount();
    el.widgetId = "t1";
    el.saveWidgetTemplate();
    expect(el.config.templates.widgets[0]).toMatchObject({ name: "Kopfzeile", widgets: [{ id: "t1" }] });
    vi.unstubAllGlobals();
  });

  it("legt im Hochformat beim ersten Verschieben die Anordnung aller Widgets fest", async () => {
    const cfg = config();
    cfg.pages[0].widgets.push(widget("t2", 4, 0));
    const { el, page } = await mount(cfg);
    el.layout = "portrait";
    el.widgetId = "t1";
    key("ArrowDown");
    expect(page().widgets.every((w: WidgetConfig) => w.portrait)).toBe(true);
    expect(page().widgets[0]).toMatchObject({ x: 0, y: 0 }); // Querformat bleibt unberührt
  });

  it("wählt nach dem Löschen der Seite die erste vorhandene", async () => {
    // ohne Rückfrage – confirm() wird in manchen Browsern unterdrückt und gälte dort als „Abbrechen“
    vi.stubGlobal("confirm", () => false);
    const cfg = config();
    cfg.pages.push({ ...cfg.pages[0], id: "b", name: "B", widgets: [] });
    const { el, notes } = await mount(cfg);
    el.removePage();
    await el.updateComplete;
    expect(el.config.pages.map((p: { id: string }) => p.id)).toEqual(["b"]);
    expect(el.pageId).toBe("b");
    expect(notes.at(-1)).toMatch(/zurückholen|bring it back/);
    vi.unstubAllGlobals();
  });
});

describe("Widget-Katalog", () => {
  it("führt jedes Widget in genau einer Gruppe, „HA-Karte“ nur mit Erweitert", async () => {
    const { paletteGroups } = await import("../src/editor/page-editor");
    const { WIDGETS } = await import("../src/widgets/registry");
    const all = paletteGroups(true).flatMap(([, types]) => types);
    expect(all.sort()).toEqual(Object.keys(WIDGETS).sort());
    expect(new Set(all).size).toBe(all.length);
    expect(paletteGroups(false).flatMap(([, types]) => types)).not.toContain("card");
  });
});

describe("Seite duplizieren", () => {
  it("nimmt die Kopie dort in die Wiedergabe auf, wo das Original läuft – direkt dahinter, mit gleichen Bedingungen", async () => {
    const cfg = config();
    const when = [{ condition: "time", after: "04:00", before: "12:00" }];
    cfg.displays = [
      { ...cfg.displays[0], playlist: [{ page: "a", duration: 20, show_if: when }, { page: "b" }] },
      { ...cfg.displays[0], id: "buero", name: "Büro", playlist: [{ page: "b" }] },
    ] as never;
    cfg.pages.push({ ...cfg.pages[0], id: "b", name: "B" });
    const { el, notes } = await mount(cfg);
    el.duplicatePage();
    const [kueche, buero] = el.config.displays;
    expect(kueche.playlist.map((e: { page: string }) => e.page)).toEqual(["a", "a_kopie", "b"]);
    expect(kueche.playlist[1]).toEqual({ page: "a_kopie", duration: 20, show_if: when });
    expect(buero.playlist.map((e: { page: string }) => e.page)).toEqual(["b"]); // dort lief das Original nicht
    expect(notes.at(-1)).toContain("Küche");
  });

  it("legt eine Kopie einer nirgends laufenden Seite ins aktuelle Display", async () => {
    const cfg = config();
    cfg.displays[0].playlist = [];
    const { el } = await mount(cfg);
    el.duplicatePage();
    expect(el.config.displays[0].playlist).toEqual([{ page: "a_kopie" }]);
  });
});
