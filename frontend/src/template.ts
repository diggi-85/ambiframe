// Jinja-Vorlagen live über ambiframe/template/subscribe. Mehrere Widgets mit derselben Vorlage teilen sich ein Abo;
// beim Seitenwechsel bleibt es kurz offen, damit die nächste Seite nicht neu abonnieren muss.
import { locale, t } from "./i18n";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Hass } from "./types";

export const isTemplate = (s: unknown): s is string => typeof s === "string" && (s.includes("{{") || s.includes("{%"));

export interface TemplateValue {
  value?: unknown;
  error?: string;
}

interface Sub {
  last?: TemplateValue;
  listeners: Set<(r: TemplateValue) => void>;
  unsub?: Promise<(() => unknown) | undefined>;
  closeTimer?: number;
}

const subs = new Map<string, Sub>();

export const watchTemplate = (hass: Hass, template: string, cb: (r: TemplateValue) => void): (() => void) => {
  let sub = subs.get(template);
  if (!sub) {
    const s: Sub = { listeners: new Set() };
    sub = s;
    subs.set(template, s);
    const emit = (r: TemplateValue) => {
      s.last = r;
      s.listeners.forEach((l) => l(r));
    };
    s.unsub = hass.connection
      .subscribeMessage<{ result?: unknown; error?: string }>(
        (msg) => emit(msg.error !== undefined ? { error: msg.error } : { value: msg.result }),
        { type: "ambiframe/template/subscribe", template },
      )
      .catch((err: { message?: string }) => {
        if (subs.get(template) === s) subs.delete(template);
        emit({ error: err?.message ?? t("Vorlage nicht verfügbar") });
        return undefined;
      });
  }
  const s = sub;
  clearTimeout(s.closeTimer);
  s.listeners.add(cb);
  if (s.last) cb(s.last);
  return () => {
    s.listeners.delete(cb);
    if (s.listeners.size) return;
    s.closeTimer = window.setTimeout(() => {
      if (s.listeners.size || subs.get(template) !== s) return;
      subs.delete(template);
      void s.unsub?.then((u) => u?.());
    }, 3000);
  };
};

/** Ergebnis als Anzeigetext: Zahlen deutsch, Listen und Objekte lesbar */
export const templateText = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "number") return v.toLocaleString(locale(), { useGrouping: false, maximumFractionDigits: 10 });
  if (typeof v === "boolean") return v ? t("ja") : t("nein");
  if (Array.isArray(v)) return v.map(templateText).join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

/** Wahrheitswert wie in HA-Bedingungen („true“, „on“, Zahl ≠ 0 …) */
export const templateTruthy = (v: unknown): boolean => {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const s = String(v ?? "").trim().toLowerCase();
  if (["true", "on", "yes", "ja", "home", "open"].includes(s)) return true;
  const n = Number(s);
  return s !== "" && Number.isFinite(n) ? n !== 0 : false;
};

/**
 * Für Widgets: hält ein Abo passend zum aktuellen Text. In willUpdate set(hass, text) aufrufen; ist der Text keine
 * Vorlage, gibt text() ihn unverändert zurück.
 */
export class TemplateWatch implements ReactiveController {
  private key?: string;
  private stop?: () => void;
  result?: TemplateValue;

  constructor(private host: ReactiveControllerHost) {
    host.addController(this);
  }

  set(hass: Hass | undefined, text: unknown): void {
    if (!hass || !isTemplate(text)) {
      if (this.key) this.clear();
      return;
    }
    if (text === this.key) return;
    this.clear();
    this.key = text;
    this.stop = watchTemplate(hass, text, (r) => {
      this.result = r;
      this.host.requestUpdate();
    });
  }

  /** Anzeigetext; undefined, solange die Vorlage noch rechnet */
  text(original: unknown): string | undefined {
    if (!isTemplate(original)) return original == null ? "" : String(original);
    if (!this.result) return undefined;
    return this.result.error !== undefined ? `⚠ ${this.result.error}` : templateText(this.result.value);
  }

  private clear(): void {
    this.stop?.();
    this.stop = undefined;
    this.key = undefined;
    this.result = undefined;
  }

  hostConnected(): void {
    this.host.requestUpdate();
  }

  hostDisconnected(): void {
    this.clear();
  }
}

/** Signal für Seiten und Displays: eine Vorlagen-Bedingung hat ihren Wert geändert */
export const templateChanges = new EventTarget();
const conditionValues = new Map<string, boolean>();

/**
 * Vorlage als Bedingung: abonniert beim ersten Aufruf (dauerhaft – Bedingungen sind wenige) und liefert den letzten
 * Wahrheitswert; bis zur ersten Antwort gilt „nicht erfüllt“.
 */
export const templateCondition = (hass: Hass, template: string): boolean => {
  if (!conditionValues.has(template)) {
    conditionValues.set(template, false);
    watchTemplate(hass, template, (r) => {
      const next = r.error === undefined && templateTruthy(r.value);
      if (conditionValues.get(template) === next) return;
      conditionValues.set(template, next);
      templateChanges.dispatchEvent(new Event("change"));
    });
  }
  return conditionValues.get(template) ?? false;
};
