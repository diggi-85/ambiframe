// Nachrichten: Quellen im Wechsel statt eine fleißige Quelle vorweg
import { expect, it } from "vitest";
import { interleave, type NewsItem } from "../src/widgets/news";

const n = (source: string, title: string): NewsItem => ({ title, source, summary: "", link: "", image: "", published: null });

it("wechselt die Quellen ab und behält die Reihenfolge je Quelle", () => {
  const out = interleave([n("A", "a1"), n("A", "a2"), n("A", "a3"), n("B", "b1"), n("C", "c1"), n("B", "b2")]);
  expect(out.map((i) => i.title)).toEqual(["a1", "b1", "c1", "a2", "b2", "a3"]);
  expect(interleave([])).toEqual([]);
});
