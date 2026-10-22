// @vitest-environment happy-dom
// @vitest-environment-options {"url": "http://localhost:8123/ambiframe-wohnzimmer"}
// Vollbild-Panel/Karte: Neu-Einhängen (Dashboard-Wechsel, Bildschirm an, App im Vordergrund) ist kein Neustart
import { describe, expect, it } from "vitest";

// Node ab Version 25 hat ein eigenes, ohne Datei leeres localStorage, das das der Testumgebung verdeckt
if (typeof globalThis.localStorage === "undefined") {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, String(v)),
      removeItem: (k: string) => void data.delete(k),
      clear: () => data.clear(),
      key: (i: number) => [...data.keys()][i] ?? null,
      get length() {
        return data.size;
      },
    },
  });
}

// Beim Build setzt esbuild die Version ein – im Test von Hand, dann erst das Panel laden
(globalThis as Record<string, unknown>).__WB_VERSION__ = "test";
await import("../src/panel/display-panel");

const hass = {
  states: {},
  language: "de",
  connection: { subscribeMessage: async () => () => undefined },
  callWS: async () => ({}),
  callService: async () => undefined,
};

describe("Neustart-Erkennung", () => {
  it("zählt mehrfaches Ein- und Aushängen der Karte nicht als Neustart-Schleife", async () => {
    localStorage.clear();
    for (let i = 0; i < 6; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const el = document.createElement("ambiframe-display-panel") as HTMLElement & Record<string, any>;
      el.hass = hass;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.autoSafe, `Durchgang ${i + 1}`).toBeFalsy();
      el.remove();
    }
    expect(JSON.parse(localStorage.getItem("ambiframe-starts") ?? "[]")).toHaveLength(1);
  });
});
