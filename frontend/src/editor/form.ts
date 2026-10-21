// Formular-Baukasten des Editors: Felder aus einem Schema, HA-Entitätssuche wenn verfügbar
import { t } from "../i18n";
import { dump, load } from "js-yaml";
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { anyIcon } from "../icons";
import type { Hass } from "../types";
import { define } from "../widgets/base";

export type Field = {
  key: string;
  label: string;
  help?: string;
  when?: (value: Record<string, any>) => boolean;
  /** Nur im Editor-Modus „Erweitert“; fehlt = anhand des Schlüssels (ADVANCED_KEYS) */
  advanced?: boolean;
} & (
  | { type: "text" | "textarea" | "icon" | "color"; placeholder?: string; suggestions?: [string, string][] }
  | { type: "number"; min?: number; max?: number; step?: number; placeholder?: string }
  | { type: "boolean"; default?: boolean }
  | { type: "select"; options: [string | number | boolean | undefined, string][] | ((value: Record<string, any>) => [string | undefined, string][]) }
  | { type: "entity"; domains?: string[]; placeholder?: string }
  | { type: "entities"; domains?: string[] }
  | { type: "list"; fields: Field[]; itemLabel?: (item: any, i: number) => string; addLabel?: string; newItem?: () => any }
  | { type: "object"; fields: Field[] }
  | { type: "autolist"; fields?: Field[]; domains?: string[]; autoLabel?: string; offValue?: unknown }
  | { type: "yaml" }
  | { type: "conditions" }
  /** Mehrfachauswahl als Knöpfe; Optionen werden beim Zeichnen geholt */
  | { type: "multi"; options: (value: Record<string, any>, hass?: Hass) => [string, string][] }
);

/** Feinwerte, die der einfache Editor-Modus ausblendet (letzter Teil des Schlüssels) */
const ADVANCED_KEYS = new Set([
  "attribute",
  "text_attribute",
  "decimals",
  "unit",
  "min",
  "max",
  "cold",
  "warm",
  "refresh",
  "radius",
  "speed",
  "interval",
  "cooldown",
  "hold_after",
  "period",
  "timeout",
  "volume",
  "event_types",
  "quiet_action",
  "show_if",
  "css",
  "typeface",
  "from",
  "sub",
  "secondary",
  "transition",
  "watchdog",
  "pause_minutes",
  "ambient",
]);

export const isAdvanced = (f: Field): boolean => f.advanced ?? ADVANCED_KEYS.has(f.key.split(".").pop() ?? "");

/** Was Formulare über die Konfiguration wissen müssen (setzt der Editor) */
export const formContext: { displays: [string, string][]; pages: [string, string][] } = { displays: [], pages: [] };

export const getPath = (obj: any, path: string): any => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

/** Unveränderlich setzen; leere Werte entfernen den Schlüssel, damit die Konfiguration schlank bleibt. */
export const setPath = (obj: Record<string, any>, path: string, value: unknown): Record<string, any> => {
  const [head, ...rest] = path.split(".");
  const next = { ...(obj ?? {}) };
  if (rest.length) {
    next[head] = setPath(next[head] ?? {}, rest.join("."), value);
    if (!Object.keys(next[head]).length) delete next[head];
  } else if (value === undefined || value === "") {
    delete next[head];
  } else {
    next[head] = value;
  }
  return next;
};

let pickersReady: Promise<boolean> | undefined;

/** HAs Auswahlfelder (Entitäten, Icons) nachladen – über den Editor einer eingebauten Karte. */
export const ensureHaPickers = (): Promise<boolean> => {
  if (customElements.get("ha-entity-picker")) return Promise.resolve(true);
  const w = window as unknown as { loadCardHelpers?: () => Promise<{ createCardElement: (c: unknown) => Promise<any> }> };
  if (!w.loadCardHelpers) return Promise.resolve(false);
  pickersReady ??= (async () => {
    try {
      const helpers = await w.loadCardHelpers!();
      const card = await helpers.createCardElement({ type: "entities", entities: [] });
      await card.constructor.getConfigElement?.();
      await Promise.race([customElements.whenDefined("ha-entity-picker"), new Promise((r) => setTimeout(r, 4000))]);
      return !!customElements.get("ha-entity-picker");
    } catch {
      return false;
    }
  })();
  return pickersReady;
};

const ENTITY_CONDITIONS = ["state", "not_state", "numeric", "within_days", "changed"];

const CONDITION_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Art",
    type: "select",
    options: [
      ["state", "Zustand ist"],
      ["not_state", "Zustand ist nicht"],
      ["numeric", "Zahl über/unter"],
      ["changed", "Kürzlich geändert"],
      ["within_days", "Termin in den nächsten Tagen"],
      ["any_state", "Eine von mehreren ist"],
      ["time", "Uhrzeit von – bis"],
      ["or", "Mindestens eine von … (oder)"],
      ["and", "Alle von … (und)"],
      ["not", "Keine von … (nicht)"],
      ["template", "Vorlage (Jinja)"],
      ["display", "Nur auf Display …"],
      ["orientation", "Nur im Hoch-/Querformat"],
    ],
  },
  { key: "after", label: "ab", type: "text", placeholder: "05:00", when: (v) => v.condition === "time" },
  { key: "before", label: "bis", type: "text", placeholder: "11:00", when: (v) => v.condition === "time" },
  { key: "entity", label: "Entität", type: "entity", when: (v) => ENTITY_CONDITIONS.includes(v.condition) },
  { key: "entities", label: "Entitäten", type: "entities", when: (v) => v.condition === "any_state" },
  { key: "state", label: "Zustand", type: "text", placeholder: "on", when: (v) => ["state", "not_state", "any_state"].includes(v.condition) },
  { key: "minutes", label: "in den letzten … Minuten", type: "number", min: 1, placeholder: "10", when: (v) => v.condition === "changed" },
  { key: "state", label: "zu Zustand (optional)", type: "text", placeholder: "beliebig", when: (v) => v.condition === "changed" },
  { key: "attribute", label: "Attribut (optional)", type: "text", when: (v) => ["state", "not_state", "numeric", "within_days"].includes(v.condition) },
  { key: "above", label: "über", type: "number", when: (v) => v.condition === "numeric" },
  { key: "below", label: "unter", type: "number", when: (v) => v.condition === "numeric" },
  { key: "days", label: "Tage", type: "number", min: 0, when: (v) => v.condition === "within_days" },
  {
    key: "value_template",
    label: "Vorlage",
    type: "textarea",
    placeholder: "{{ is_state('person.alex', 'home') and now().hour >= 18 }}",
    help: "Erfüllt bei true, on, Zahl ≠ 0",
    when: (v) => v.condition === "template",
  },
  { key: "displays", label: "Displays", type: "multi", options: () => formContext.displays, when: (v) => v.condition === "display" },
  {
    key: "orientation",
    label: "Format",
    type: "select",
    options: [
      ["landscape", "Querformat"],
      ["portrait", "Hochformat"],
    ],
    when: (v) => v.condition === "orientation",
  },
  { key: "conditions", label: "", type: "conditions", when: (v) => ["and", "or", "not"].includes(v.condition) },
];

/** Kurzbeschreibung einer Bedingung für die Liste */
export const conditionLabel = (c: Record<string, any>): string => {
  const list = (x: unknown) => (Array.isArray(x) ? x.join("/") : String(x ?? ""));
  switch (c.condition) {
    case "state":
      return `${c.entity ?? "…"} = ${list(c.state)}`;
    case "not_state":
      return `${c.entity ?? "…"} ≠ ${list(c.state)}`;
    case "numeric":
      return `${c.entity ?? "…"}${c.above !== undefined ? ` > ${c.above}` : ""}${c.below !== undefined ? ` < ${c.below}` : ""}`;
    case "changed":
      return t("{entity} geändert ({n} min)", { entity: c.entity ?? "…", n: c.minutes ?? 10 });
    case "within_days":
      return t("{entity} in {n} Tagen", { entity: c.entity ?? "…", n: c.days ?? 0 });
    case "any_state":
      return t("eine von {n} = {state}", { n: (c.entities ?? []).length, state: list(c.state) });
    case "time":
      return t("Uhrzeit {from}–{to}", { from: c.after ?? "…", to: c.before ?? "…" });
    case "or":
    case "and":
    case "not":
      return `${t({ or: "oder", and: "und", not: "nicht" }[c.condition as "or"])} (${(c.conditions ?? []).length})`;
    case "template":
      return t("Vorlage");
    case "display":
      return t("nur auf {names}", { names: (c.displays ?? []).map((id: string) => formContext.displays.find(([d]) => d === id)?.[1] ?? id).join(", ") || "…" });
    case "orientation":
      return c.orientation === "portrait" ? t("nur Hochformat") : t("nur Querformat");
    default:
      return t("Bedingung");
  }
};

export class AfForm extends LitElement {
  static properties = {
    hass: { attribute: false },
    fields: { attribute: false },
    value: { attribute: false },
    pickers: { state: true },
    advanced: { type: Boolean },
  };

  hass?: Hass;
  fields: Field[] = [];
  value: Record<string, any> = {};
  /** false = einfacher Modus: Feinwerte ausblenden */
  advanced = true;
  private pickers = !!customElements.get("ha-entity-picker");

  constructor() {
    super();
    // HA-Auswahlfelder (Entität, Icon) melden „value-changed“ über Komponentengrenzen hinweg. Nach außen darf nur
    // unser eigenes Ereignis mit dem ganzen Formularwert dringen – sonst landet z. B. der Entitätsname als Wert
    // im Editor. Dieser Listener ist der erste am Element und hält fremde Ereignisse auf.
    this.addEventListener("value-changed", (e) => {
      if (e.composedPath()[0] !== this) e.stopImmediatePropagation();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.pickers) void ensureHaPickers().then((ok) => (this.pickers = ok));
  }

  private emit(value: Record<string, any>): void {
    this.value = value;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value } }));
  }

  private set(key: string, v: unknown): void {
    this.emit(setPath(this.value, key, v));
  }

  private entityInput(value: string | undefined, domains: string[] | undefined, onChange: (v: string | undefined) => void, placeholder = "") {
    if (this.pickers && this.hass) {
      return html`<ha-entity-picker
        .hass=${this.hass}
        .value=${value ?? ""}
        .includeDomains=${domains}
        allow-custom-entity
        @value-changed=${(e: CustomEvent) => onChange(e.detail.value || undefined)}
      ></ha-entity-picker>`;
    }
    const listId = `ents-${(domains ?? ["alle"]).join("-")}`;
    const name = value ? (this.hass?.states[value]?.attributes.friendly_name as string | undefined) : undefined;
    return html`<input
        list=${listId}
        .value=${value ?? ""}
        placeholder=${placeholder || (domains ? `${domains.join(", ")}.…` : "entity_id")}
        @change=${(e: Event) => onChange((e.target as HTMLInputElement).value.trim() || undefined)}
      />${name ? html`<div class="hint">${name}</div>` : nothing}`;
  }

  private datalists(): TemplateResult[] {
    if (this.pickers || !this.hass) return [];
    const domainSets = new Set<string>();
    const walk = (fields: Field[]) =>
      fields.forEach((f) => {
        if (f.type === "entity" || f.type === "entities" || f.type === "autolist") domainSets.add((("domains" in f && f.domains) || ["alle"]).join("-"));
        if (f.type === "conditions") domainSets.add("alle");
      });
    walk(this.fields);
    const ids = Object.keys(this.hass.states).sort();
    return [...domainSets].map((set) => {
      const domains = set === "alle" ? null : set.split("-");
      const list = domains ? ids.filter((id) => domains.includes(id.split(".")[0])) : ids;
      return html`<datalist id=${`ents-${set}`}>${list.map((id) => html`<option value=${id}>${this.hass!.states[id].attributes.friendly_name ?? ""}</option>`)}</datalist>`;
    });
  }

  private renderList(f: Extract<Field, { type: "list" }>, items: any[], onChange: (items: any[]) => void) {
    const move = (i: number, d: number) => {
      const next = [...items];
      const [x] = next.splice(i, 1);
      next.splice(i + d, 0, x);
      onChange(next);
    };
    return html`<div class="list">
      ${items.map(
        (item, i) => html`<div class="item">
          <div class="item-head">
            <span>${t(f.itemLabel?.(item, i) ?? `#${i + 1}`)}</span>
            <span class="tools">
              <button title=${t("nach oben")} ?disabled=${i === 0} @click=${() => move(i, -1)}>↑</button>
              <button title=${t("nach unten")} ?disabled=${i === items.length - 1} @click=${() => move(i, 1)}>↓</button>
              <button title=${t("entfernen")} @click=${() => onChange(items.filter((_, j) => j !== i))}>✕</button>
            </span>
          </div>
          <af-form
            .hass=${this.hass}
            .advanced=${this.advanced}
            .fields=${f.fields}
            .value=${item ?? {}}
            @value-changed=${(e: CustomEvent) => onChange(items.map((x, j) => (j === i ? e.detail.value : x)))}
          ></af-form>
        </div>`,
      )}
      <button class="add" @click=${() => onChange([...items, f.newItem?.() ?? {}])}>+ ${t(f.addLabel ?? "Hinzufügen")}</button>
    </div>`;
  }

  private renderField(f: Field): TemplateResult | typeof nothing {
    if (f.when && !f.when(this.value)) return nothing;
    if (!this.advanced && isAdvanced(f)) return nothing;
    const v = getPath(this.value, f.key);
    let control: TemplateResult;
    switch (f.type) {
      case "text": {
        // Vorschläge als Auswahlliste unter dem Feld (eigene Eingabe bleibt möglich)
        const list = f.suggestions?.length ? `sug-${f.key.replace(/\W/g, "-")}` : undefined;
        control = html`<input
            .value=${v ?? ""}
            list=${list ?? nothing}
            placeholder=${t(f.placeholder ?? "")}
            @input=${(e: Event) => this.set(f.key, (e.target as HTMLInputElement).value || undefined)}
          />${list ? html`<datalist id=${list}>${f.suggestions!.map(([value, label]) => html`<option value=${value}>${t(label)}</option>`)}</datalist>` : nothing}`;
        break;
      }
      case "textarea":
        control = html`<textarea rows="3" .value=${v ?? ""} @input=${(e: Event) => this.set(f.key, (e.target as HTMLTextAreaElement).value || undefined)}></textarea>`;
        break;
      case "number":
        control = html`<input
          type="number"
          .value=${v ?? ""}
          min=${f.min ?? ""}
          max=${f.max ?? ""}
          step=${f.step ?? "any"}
          placeholder=${t(f.placeholder ?? "")}
          @input=${(e: Event) => {
            const raw = (e.target as HTMLInputElement).value;
            this.set(f.key, raw === "" ? undefined : Number(raw));
          }}
        />`;
        break;
      case "boolean":
        control = html`<label class="switch"
          ><input type="checkbox" .checked=${v ?? f.default ?? false} @change=${(e: Event) => this.set(f.key, (e.target as HTMLInputElement).checked)} /><span></span
        ></label>`;
        break;
      case "select": {
        const options = typeof f.options === "function" ? f.options(this.value) : f.options;
        control = html`<select
          @change=${(e: Event) => {
            const i = (e.target as HTMLSelectElement).selectedIndex;
            this.set(f.key, options[i][0]);
          }}
        >
          ${options.map(([val, label]) => html`<option ?selected=${v === val || (v === undefined && val === undefined)}>${t(label)}</option>`)}
        </select>`;
        break;
      }
      case "icon":
        control = customElements.get("ha-icon-picker") && this.hass
          ? html`<ha-icon-picker .hass=${this.hass} .value=${v ?? ""} @value-changed=${(e: CustomEvent) => this.set(f.key, e.detail.value || undefined)}></ha-icon-picker>`
          : html`<div class="with-icon">
              <span class="preview">${anyIcon(v)}</span>
              <input .value=${v ?? ""} placeholder=${t("mdi:… oder washer, car, bell …")} @change=${(e: Event) => this.set(f.key, (e.target as HTMLInputElement).value || undefined)} />
            </div>`;
        break;
      case "color":
        control = html`<div class="with-icon">
          <input type="color" .value=${/^#[0-9a-f]{6}$/i.test(v ?? "") ? v : "#d9b45f"} @input=${(e: Event) => this.set(f.key, (e.target as HTMLInputElement).value)} />
          <input .value=${v ?? ""} placeholder=${t("Standard")} @change=${(e: Event) => this.set(f.key, (e.target as HTMLInputElement).value || undefined)} />
        </div>`;
        break;
      case "entity":
        control = this.entityInput(v, f.domains, (x) => this.set(f.key, x), f.placeholder);
        break;
      case "entities": {
        const list: string[] = Array.isArray(v) ? v : [];
        control = html`<div class="chips">
            ${list.map(
              (id) => html`<span class="chip">${this.hass?.states[id]?.attributes.friendly_name ?? id}<button @click=${() => this.set(f.key, list.filter((x) => x !== id))}>✕</button></span>`,
            )}
          </div>
          ${this.entityInput(undefined, f.domains, (x) => x && !list.includes(x) && this.set(f.key, [...list, x]), t("Entität hinzufügen …"))}`;
        break;
      }
      case "multi": {
        const list: string[] = Array.isArray(v) ? v : [];
        control = html`<div class="chips">
          ${f.options(this.value, this.hass).map(
            ([val, label]) => html`<button
              class="pick ${list.includes(val) ? "on" : ""}"
              @click=${() => this.set(f.key, list.includes(val) ? list.filter((x) => x !== val) : [...list, val])}
            >
              ${label}
            </button>`,
          )}
        </div>`;
        break;
      }
      case "list":
        control = this.renderList(f, Array.isArray(v) ? v : [], (items) => this.set(f.key, items));
        break;
      case "object":
        control = html`<div class="nested">
          <af-form .hass=${this.hass} .advanced=${this.advanced} .fields=${f.fields} .value=${v ?? {}} @value-changed=${(e: CustomEvent) => this.set(f.key, Object.keys(e.detail.value).length ? e.detail.value : undefined)}></af-form>
        </div>`;
        break;
      case "autolist": {
        const auto = v === "auto";
        const off = v === undefined || v === false || v === f.offValue;
        const mode = auto ? "auto" : off ? "off" : "list";
        control = html`<select
            @change=${(e: Event) => {
              const m = (e.target as HTMLSelectElement).value;
              this.set(f.key, m === "auto" ? "auto" : m === "off" ? (f.offValue ?? undefined) : []);
            }}
          >
            <option value="auto" ?selected=${mode === "auto"}>${t(f.autoLabel ?? "Automatisch")}</option>
            <option value="list" ?selected=${mode === "list"}>${t("Selbst auswählen")}</option>
            <option value="off" ?selected=${mode === "off"}>${t("Aus")}</option>
          </select>
          ${mode === "list"
            ? f.fields
              ? this.renderList({ key: f.key, label: f.label, type: "list", fields: f.fields, itemLabel: (it) => it.name ?? it.entity ?? t("Eintrag") }, v as any[], (items) => this.set(f.key, items))
              : html`<af-form
                  .hass=${this.hass}
                  .fields=${[{ key: "list", label: "", type: "entities", domains: f.domains } as Field]}
                  .value=${{ list: v }}
                  @value-changed=${(e: CustomEvent) => this.set(f.key, e.detail.value.list ?? [])}
                ></af-form>`
            : nothing}`;
        break;
      }
      case "yaml":
        control = html`<textarea
          class="code"
          rows="8"
          .value=${v === undefined ? "" : dump(v, { lineWidth: 100 })}
          @change=${(e: Event) => {
            const ta = e.target as HTMLTextAreaElement;
            try {
              this.set(f.key, ta.value.trim() ? load(ta.value) : undefined);
              ta.setCustomValidity("");
            } catch (err) {
              ta.setCustomValidity(String(err));
              ta.reportValidity();
            }
          }}
        ></textarea>`;
        break;
      case "conditions":
        control = this.renderList(
          { key: f.key, label: f.label, type: "list", fields: CONDITION_FIELDS, addLabel: "Bedingung", itemLabel: (c) => conditionLabel(c), newItem: () => ({ condition: "state", state: "on" }) },
          Array.isArray(v) ? v : [],
          (items) => this.set(f.key, items.length ? items : undefined),
        );
        break;
    }
    const wide = ["list", "object", "autolist", "yaml", "conditions", "textarea", "entities"].includes(f.type);
    return html`<div class="field ${wide ? "wide" : ""}">
      ${f.label ? html`<label class="lbl">${t(f.label)}</label>` : nothing}
      <div class="ctl">${control}</div>
      ${f.help ? html`<div class="help">${t(f.help)}</div>` : nothing}
    </div>`;
  }

  render() {
    return html`${this.datalists()}${this.fields.map((f) => this.renderField(f))}`;
  }

  static styles = css`
    :host {
      display: block;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .field {
      display: grid;
      grid-template-columns: 128px minmax(0, 1fr);
      gap: 6px 12px;
      align-items: center;
      padding: 6px 0;
    }
    .field.wide {
      grid-template-columns: 1fr;
    }
    .lbl {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .help {
      grid-column: 1 / -1;
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-top: -2px;
    }
    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--af-input, rgba(127, 127, 127, 0.08));
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 8px;
      padding: 7px 9px;
    }
    textarea.code {
      font: 12px/1.45 ui-monospace, Menlo, monospace;
    }
    input[type="color"] {
      width: 44px;
      flex: none;
      padding: 2px;
      height: 34px;
    }
    .with-icon {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .preview {
      font-size: 22px;
      width: 28px;
      display: grid;
      place-items: center;
    }
    .preview .ic {
      width: 1em;
      height: 1em;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 3px;
    }
    ha-entity-picker,
    ha-icon-picker {
      display: block;
      width: 100%;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .switch span {
      position: absolute;
      inset: 0;
      border-radius: 11px;
      background: rgba(127, 127, 127, 0.35);
      transition: background 0.2s;
      cursor: pointer;
    }
    .switch span::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      left: 3px;
      top: 3px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch input:checked + span {
      background: var(--primary-color, #03a9f4);
    }
    .switch input:checked + span::before {
      transform: translateX(18px);
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .item {
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 10px;
      padding: 4px 10px 6px;
    }
    .item-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    .tools button,
    .chip button,
    .add {
      font: inherit;
      font-size: 12px;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 6px;
      padding: 2px 7px;
      cursor: pointer;
      margin-left: 3px;
    }
    .tools button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .add {
      align-self: flex-start;
      padding: 6px 12px;
      border-style: dashed;
      margin-left: 0;
    }
    .nested {
      border-left: 2px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      padding-left: 10px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    .pick {
      font: inherit;
      font-size: 13px;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 999px;
      padding: 4px 12px;
      cursor: pointer;
    }
    .pick.on {
      background: var(--primary-color, #03a9f4);
      border-color: transparent;
      color: var(--text-primary-color, #fff);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      border-radius: 999px;
      padding: 3px 4px 3px 10px;
      background: rgba(127, 127, 127, 0.12);
    }
  `;
}

define("af-form", AfForm);
