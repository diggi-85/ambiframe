// @vitest-environment happy-dom
// Laufband: beim Anhalten verschwinden die selbst angehängten Zeilen und die Verschiebung
import { html } from "lit";
import { expect, it } from "vitest";
import { TickerLane } from "../src/ticker-lane";

it("räumt die Spur beim Anhalten auf, Lits eigene Zeilen bleiben", async () => {
  const band = document.createElement("div");
  const lane = document.createElement("div");
  band.append(lane);
  document.body.append(band);
  let found = true;
  const tl = new TickerLane({ find: () => (found ? { band, lane } : undefined), next: () => html`<span>Zeile</span>`, speed: () => 45 });
  tl.start();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  found = false; // Band läuft nicht mehr – Lit rendert die stehenden Zeilen in dieselbe Spur
  const own = document.createElement("span");
  lane.append(Object.assign(document.createElement("div"), { className: "q" }), own);
  lane.style.transform = "translateX(-80px)";
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  expect(lane.querySelectorAll(".q").length).toBe(0);
  expect(lane.style.transform).toBe("");
  expect(own.isConnected).toBe(true);
});

it("baut die Laufband-Zeile für beide Bänder gleich: Cover sicher im CSS, Logo, Antippen nur mit Details", async () => {
  const { render } = await import("lit");
  const { tickerLineTpl } = await import("../src/ticker-lane");
  const box = document.createElement("div");
  render(tickerLineTpl({ text: "Bloom", img: 'a"b.jpg', logo: "logo.png" }, true, () => undefined, "home"), box);
  const span = box.querySelector("span")!;
  expect(span.className).toContain("home");
  expect(span.className).toContain("tap");
  expect(box.querySelector<HTMLElement>(".tk-art")!.getAttribute("style")).toBe('background-image:url("a\\"b.jpg")');
  expect(box.querySelector("img.tk-logo")!.getAttribute("src")).toBe("logo.png");
  render(tickerLineTpl({ text: "x" }, false, () => undefined), box);
  expect(box.querySelector("span")!.className).not.toContain("tap");
});
