// @vitest-environment happy-dom
// Studio: YAML, eigene Stile, Hinweise „Zeigen“, Rückgängig-Schritte, Tastenkürzel
import { describe, expect, it, vi } from "vitest";
import { dump } from "js-yaml";

if (typeof globalThis.localStorage === "undefined") {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, String(v)), removeItem: (k: string) => void data.delete(k) },
  });
}
(globalThis as Record<string, unknown>).__WB_VERSION__ = "test";

const config = () => ({
  version: 1,
  design: { theme: "ruhig" },
  photos: { folder: "", placeholder: "samples", credit: true },
  displays: [{ id: "kueche", name: "Küche", playlist: [{ page: "a" }], control: { enabled: false, dashboard: "", idle: 60 }, events: "all" }],
  pages: [{ id: "a", name: "A", duration: 30, background: { type: "none" }, palette: "normal", widgets: [] }],
  events: [{ id: "klingel", kind: "alarm", entity: "binary_sensor.klingel", to: "on", title: "Klingel", enabled: true }],
});

type El = HTMLElement & Record<string, any>;
const mount = async () => {
  await import("../src/panel/studio");
  const saved: unknown[] = [];
  const el = document.createElement("ambiframe-studio") as El;
  el.hass = {
    language: "de",
    states: {},
    callWS: vi.fn(async (msg: { type: string; config?: unknown }) => {
      if (msg.type === "ambiframe/config") return config();
      if (msg.type === "ambiframe/config/save") saved.push(msg.config);
      return {};
    }),
    connection: { subscribeMessage: vi.fn() },
    callService: vi.fn(),
  };
  document.body.append(el);
  await vi.waitFor(() => expect(el.draft).toBeTruthy());
  return { el, saved };
};

describe("Studio: YAML", () => {
  it("übernimmt gültiges YAML in den Entwurf, ohne zu speichern", async () => {
    const { el, saved } = await mount();
    el.yaml = dump({ ...config(), design: { theme: "zeitung" } });
    el.setAdvanced(true);
    el.openDisplay("__all");
    el.step = "technik";
    await el.updateComplete;
    const btn = [...el.shadowRoot!.querySelectorAll("button")].find((b: HTMLButtonElement) => b.textContent!.includes("In den Editor übernehmen")) as HTMLButtonElement;
    btn.click();
    expect(el.draft.design.theme).toBe("zeitung");
    expect(el.dirty).toBe(true);
    expect(saved).toEqual([]);
  });

  it("lehnt YAML ab, das keine Ambiframe-Konfiguration ist, und lässt den Entwurf unverändert", async () => {
    const { el } = await mount();
    const before = JSON.stringify(el.draft);
    el.yaml = "nur: text";
    el.setAdvanced(true);
    el.openDisplay("__all");
    el.step = "technik";
    await el.updateComplete;
    ([...el.shadowRoot!.querySelectorAll("button")].find((b: HTMLButtonElement) => b.textContent!.includes("In den Editor übernehmen")) as HTMLButtonElement).click();
    expect(JSON.stringify(el.draft)).toBe(before);
    expect(el.note.kind).toBe("error");
  });
});

describe("Studio: Rückgängig", () => {
  it("fasst aufeinanderfolgende Eingaben im selben Formular zu einem Schritt zusammen", async () => {
    const { el } = await mount();
    el.formKey = "form-name";
    el.mutateDisplay((d: { name: string }) => (d.name = "K"));
    el.mutateDisplay((d: { name: string }) => (d.name = "Kü"));
    el.formKey = "";
    el.undo();
    expect(el.draft.displays[0].name).toBe("Küche");
    expect(el.canUndo).toBe(false);
  });

  it("macht einzelne Änderungen ohne Formular einzeln rückgängig", async () => {
    const { el } = await mount();
    el.mutate((c: any) => (c.design.theme = "papier"));
    el.mutate((c: any) => (c.design.theme = "galerie"));
    el.undo();
    expect(el.draft.design.theme).toBe("papier");
  });

  it("speichert mit ⌘S bzw. Strg+S und wiederholt mit Strg+Y", async () => {
    const { el, saved } = await mount();
    el.mutate((c: any) => (c.design.theme = "papier"));
    el.undo();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "y", ctrlKey: true }));
    expect(el.draft.design.theme).toBe("papier");
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "s", ctrlKey: true }));
    await vi.waitFor(() => expect(saved).toHaveLength(1));
  });
});

describe("Studio: eigene Stile", () => {
  it("speichert den aktuellen Stil unter einem Namen und wendet ihn später wieder an", async () => {
    const { el } = await mount();
    el.mutate((c: any) => (c.design.theme = "artdeco"));
    el.presetName = "Abend";
    el.setAdvanced(true);
    el.openDisplay("__all");
    el.step = "aussehen";
    await el.updateComplete;
    ([...el.shadowRoot!.querySelectorAll("button")].find((b: HTMLButtonElement) => b.textContent!.includes("Aktuellen Stil speichern")) as HTMLButtonElement).click();
    expect(el.draft.design.presets[0]).toMatchObject({ name: "Abend", design: { theme: "artdeco" } });
    el.mutate((c: any) => (c.design.theme = "ruhig"));
    await el.updateComplete;
    ([...el.shadowRoot!.querySelectorAll("button")].find((b: HTMLButtonElement) => b.textContent!.trim() === "Anwenden") as HTMLButtonElement).click();
    expect(el.draft.design.theme).toBe("artdeco");
    expect(el.draft.design.presets).toHaveLength(1); // Anwenden löscht die gespeicherten Stile nicht
  });
});

describe("Studio: Hinweise „Zeigen“", () => {
  it("führt zur richtigen Stelle", async () => {
    const { el } = await mount();
    el.goTo({ tab: "seiten", pageId: "a" });
    expect([el.view, el.editPage]).toEqual(["page", "a"]);
    el.goTo({ tab: "ereignisse", eventId: "klingel" });
    expect([el.view, el.displayId, el.step, el.openEvent]).toEqual(["display", "__all", "momente", "klingel"]);
    el.goTo({ tab: "wiedergabe", displayId: "kueche" });
    expect([el.displayId, el.step]).toEqual(["kueche", "inhalte"]);
    el.goTo({ tab: "design" });
    expect([el.displayId, el.step]).toEqual(["__all", "technik"]);
  });
});

describe("Studio: Änderungen von anderswo", () => {
  const withPush = async () => {
    const r = await mount();
    const sub = r.el.hass.connection.subscribeMessage as ReturnType<typeof vi.fn>;
    await vi.waitFor(() => expect(sub).toHaveBeenCalled());
    const push = sub.mock.calls[0][0] as (m: unknown) => void;
    return { ...r, push };
  };

  it("übernimmt einen neueren Stand still, solange hier nichts offen ist", async () => {
    const { el, push } = await withPush();
    push({ config: config() }); // derselbe Stand (z. B. Echo des eigenen Speicherns) → nichts tun
    expect(el.draft.design.theme).toBe("ruhig");
    push({ config: { ...config(), design: { theme: "zeitung" } } });
    expect(el.draft.design.theme).toBe("zeitung");
    expect(el.dirty).toBe(false);
  });

  it("überschreibt fremde Änderungen nur nach Rückfrage", async () => {
    const { el, push, saved } = await withPush();
    el.mutate((c: { design: { theme: string } }) => (c.design.theme = "papier"));
    push({ config: { ...config(), pages: [...config().pages, { id: "neu", name: "Neu", duration: 30, background: { type: "none" }, palette: "normal", widgets: [] }] } });
    expect(el.draft.design.theme).toBe("papier"); // eigene Änderung bleibt
    await el.save(); // erster Klick warnt nur
    expect(saved).toEqual([]);
    await el.save(); // zweiter Klick überschreibt – ohne confirm(), das manche Browser unterdrücken
    expect(saved).toHaveLength(1);
  });
});

describe("Studio: Dashboard beim Verlassen", () => {
  it("listet die Dashboards aus HA und behält eine eigene Adresse", async () => {
    const { dashboardOptions, dashboardsOf } = await import("../src/editor/schemas");
    const { formContext } = await import("../src/editor/form");
    const hass = {
      panels: {
        lovelace: { url_path: "lovelace", title: null, component_name: "lovelace" },
        "dashboard-kueche": { url_path: "dashboard-kueche", title: "Küche", component_name: "lovelace" },
        map: { url_path: "map", title: "Karte", component_name: "map" },
      },
    } as never;
    formContext.dashboards = dashboardsOf(hass);
    expect(formContext.dashboards).toEqual([
      ["/dashboard-kueche", "Küche"],
      ["/lovelace", "Übersicht"],
    ]);
    const opts = dashboardOptions("/lovelace/flur");
    expect(opts[0]).toEqual(["/", "Standard-Dashboard von Home Assistant"]);
    expect(opts.at(-1)).toEqual(["/lovelace/flur", "/lovelace/flur"]); // eigene Ansicht bleibt wählbar
    expect(dashboardOptions("/dashboard-kueche")).toHaveLength(3);
  });
});
