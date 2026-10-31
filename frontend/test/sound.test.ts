// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { playSound, stopSound } from "../src/sound";

// Merkt sich jedes Abspielen und ob es noch im Klick passierte
const started: { src: string; sync: boolean }[] = [];
let inClick = false;
class FakeAudio {
  src: string;
  volume = 1;
  constructor(src = "") {
    this.src = src;
  }
  play() {
    started.push({ src: this.src, sync: inClick });
    return Promise.resolve();
  }
  pause() {}
}
vi.stubGlobal("Audio", FakeAudio);

const slowHass = () => {
  let answer!: (v: { url: string }) => void;
  const hass = { callWS: vi.fn(() => new Promise<{ url: string }>((r) => (answer = r))) };
  return { hass: hass as never, answer: (url: string) => answer({ url }) };
};

afterEach(() => {
  started.length = 0;
  stopSound();
});

describe("Ton (Safari)", () => {
  it("startet das Element noch im Klick und spielt die HA-Datei, sobald HA antwortet", async () => {
    const { hass, answer } = slowHass();
    inClick = true;
    const done = playSound("media-source://media_source/local/1.mp3", 70, { hass });
    inClick = false;
    expect(started).toHaveLength(1);
    expect(started[0].sync).toBe(true); // im Klick – Safari entsperrt das Element
    answer("/media/local/1.mp3?authSig=x");
    await done;
    expect(started.at(-1)?.src).toContain("/media/local/1.mp3");
  });

  it("spielt nicht nach, wenn der Ton inzwischen gestoppt wurde", async () => {
    const { hass, answer } = slowHass();
    const done = playSound("media-source://media_source/local/2.mp3", 70, { hass });
    stopSound();
    answer("/media/local/2.mp3");
    await done;
    expect(started.some((s) => s.src.includes("2.mp3"))).toBe(false);
  });
});
