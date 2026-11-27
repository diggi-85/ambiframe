import { describe, expect, it } from "vitest";
import { applyEventMood, CAMERA_KEYS, CAMERA_MOODS, eventGroupOf, eventMood, lookGroupOf, motionMood, MOTION_MOODS, MUSIC_KEYS, MUSIC_MOODS } from "../src/panel/studio-guide";
import type { EventConfig } from "../src/types";

describe("Studio: Stimmungen", () => {
  it("erkennt die gewählte Bewegung – und eigene Mischungen", () => {
    for (const m of MOTION_MOODS) expect(motionMood(structuredClone(m.set))).toBe(m.id);
    expect(motionMood({ motion: {}, transition: {} })).toBe("calm");
    expect(motionMood({ chart_motion: "soft", motion: { duration: 2 } })).toBeUndefined();
  });
  it("Kamera und Musik: Stimmung setzt nur ihre Felder", () => {
    const ev = { id: "k", kind: "live", enabled: true, title: "Tür", pip_size: "large", pip_position: "top-left" } as EventConfig;
    const full = applyEventMood(ev, CAMERA_MOODS.find((m) => m.id === "full")!, CAMERA_KEYS);
    expect(full).toMatchObject({ open_full: true, full_duration: 120, pip_position: "top-left", title: "Tür" });
    expect(full.pip_size).toBeUndefined();
    expect(eventMood(full, CAMERA_MOODS, CAMERA_KEYS)).toBe("full");
    const music = { id: "m", kind: "media", enabled: true, title: "", style: "mini", mini_layout: "pill" } as EventConfig;
    expect(eventMood(music, MUSIC_MOODS, MUSIC_KEYS)).toBe("pill");
  });
  it("Suche findet die Gruppe einer Einstellung", () => {
    expect(eventGroupOf("full_duration")).toBe("look");
    expect(eventGroupOf("quiet.after")).toBe("limits");
    expect(lookGroupOf("design.motion.stagger")).toBe("motion");
    expect(lookGroupOf("design.text_size")).toBe("type");
  });
});

import { changedKeys, clearOverrides } from "../src/panel/studio-guide";

describe("Studio: „Für alle Displays“ gilt für alle", () => {
  it("entfernt die eigenen Werte der Displays für genau diese Einstellungen", () => {
    const c = {
      displays: [
        { name: "Küche", theme: "verspielt", mode: "auto", transition: { type: "blur" }, design: { ambient: { type: "snow" }, accent: "#f00" } },
        { name: "Büro", theme: "rams", design: { css: "x" } },
        { name: "Flur" },
      ],
    };
    expect(clearOverrides(c, ["theme"])).toEqual(["Küche", "Büro"]);
    expect(c.displays[0]).toMatchObject({ mode: "auto", design: { accent: "#f00" } });
    expect("theme" in c.displays[1]).toBe(false);
    expect(clearOverrides(c, ["ambient", "transition", "css"])).toEqual(["Küche"]);
    expect(c.displays[0]).not.toHaveProperty("transition");
    expect(c.displays[1].design).toEqual({ css: "x" }); // eigenes CSS ergänzt nur
    expect(changedKeys({ a: 1, b: { x: 1 } }, { a: 1, b: { x: 2 }, c: 3 })).toEqual(["b", "c"]);
  });
});
