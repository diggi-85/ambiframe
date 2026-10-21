// Auslöser von Ereignissen: Hat sich eine Entität so geändert, dass das Ereignis feuern soll?
import type { EventConfig, HassEntity } from "./types";

const UNSET = new Set(["unavailable", "unknown"]);

/**
 * Hat sich der Auslöser passend geändert? to: "*" heißt jede Änderung – aber nie von/zu „nicht verfügbar“ (Neustart),
 * und bei event.*-Entitäten nur frisch (der Zeitstempel im Zustand liegt höchstens 2 min zurück) und ggf. nur
 * für bestimmte Ereignistypen.
 */
export const triggered = (ev: EventConfig, o?: HassEntity, n?: HassEntity): boolean => {
  if (!o || !n || o.state === n.state) return false;
  if (ev.from && o.state !== ev.from) return false;
  if (ev.to !== "*") return n.state === ev.to;
  if (UNSET.has(n.state) || o.state === "unavailable") return false;
  if (n.entity_id.startsWith("event.")) {
    const t = Date.parse(n.state);
    if (!Number.isFinite(t) || Date.now() - t > 120e3) return false;
    if (ev.event_types?.length && !ev.event_types.includes(String(n.attributes.event_type))) return false;
  }
  return true;
};
