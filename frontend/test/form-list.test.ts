// @vitest-environment happy-dom
// Listen im Editor: Einträge als reiner Text (alte Konfigurationen) werden beim Bearbeiten nicht in Buchstaben zerlegt
import { expect, it } from "vitest";
import "../src/editor/form";
import type { AfForm } from "../src/editor/form";

it("bearbeitet Text-Einträge einer Liste als { value }", async () => {
  const form = document.createElement("af-form") as AfForm;
  form.fields = [{ key: "feeds", label: "Quellen", type: "list", fields: [{ key: "value", label: "Quelle", type: "text" }] }];
  form.value = { feeds: ["tagesschau"] };
  document.body.append(form);
  await form.updateComplete;
  const inner = form.shadowRoot!.querySelector("af-form") as AfForm;
  expect(inner.value).toEqual({ value: "tagesschau" });
  let saved: any;
  form.addEventListener("value-changed", (e) => (saved = (e as CustomEvent).detail.value));
  inner.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { value: "spiegel" } } }));
  expect(saved).toEqual({ feeds: [{ value: "spiegel" }] });
});
