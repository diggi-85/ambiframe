// Gesundheitscheck für den Editor: Was fehlt, was hängt, was wird nie gezeigt?
// Reine Logik – der Editor zeigt die Liste und springt mit „Zeigen“ an die richtige Stelle.
import { t } from "../i18n";
import type { AmbiframeConfig, Hass } from "../types";

export type HealthLevel = "error" | "warn" | "info";

export interface HealthGo {
  tab: "seiten" | "wiedergabe" | "ereignisse" | "design";
  pageId?: string;
  widgetId?: string;
  eventId?: string;
  displayId?: string;
}

export interface HealthIssue {
  level: HealthLevel;
  text: string;
  go?: HealthGo;
}

export interface DisplayHealth {
  online: boolean;
  last_seen: string | null;
  clients: { name: string; version: string | null; safe?: string | null }[];
}

/** Ergebnis der Fotoprüfung (asynchron im Editor ermittelt) */
export interface PhotoHealth {
  folder: number | null;
  icloud: number | null;
}

/** Domänen, deren IDs in der Konfiguration als Entität gelten (alles andere ist Text, Link, Icon …) */
const DOMAINS = new Set(
  (
    "sensor binary_sensor weather camera calendar light switch media_player person device_tracker input_boolean input_number " +
    "input_select input_text input_datetime input_button cover climate vacuum fan lock button event image todo zone sun " +
    "alarm_control_panel automation script scene select number update ai_task water_heater humidifier siren valve " +
    "lawn_mower text time date schedule counter timer group remote"
  ).split(" "),
);
const ENTITY = /^([a-z_]+)\.[a-z0-9_]+$/;

/** Alle Entitäts-IDs in einem Teil der Konfiguration (Optionen, Bedingungen, Aktionen …) */
const entitiesIn = (value: unknown, out = new Set<string>()): Set<string> => {
  if (typeof value === "string") {
    const m = ENTITY.exec(value);
    if (m && DOMAINS.has(m[1])) out.add(value);
  } else if (Array.isArray(value)) {
    for (const v of value) entitiesIn(v, out);
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) entitiesIn(v, out);
  }
  return out;
};

const OFFLINE_MINUTES = 15;

export const checkHealth = (
  config: AmbiframeConfig,
  hass: Hass | undefined,
  status: Record<string, DisplayHealth> = {},
  photos?: PhotoHealth,
  version?: string,
): HealthIssue[] => {
  const issues: HealthIssue[] = [];
  const states = hass?.states ?? {};
  const known = Object.keys(states).length > 0;

  // Entitäten: fehlt ganz (umbenannt/gelöscht) oder gerade nicht verfügbar – pro Entität eine Zeile mit allen Fundstellen
  const found = new Map<string, { level: HealthLevel; wheres: string[]; go: HealthGo }>();
  const entityCheck = (value: unknown, where: string, go: HealthGo) => {
    if (!known) return;
    for (const id of entitiesIn(value)) {
      const s = states[id];
      const level: HealthLevel | undefined = !s ? "error" : s.state === "unavailable" ? "warn" : undefined;
      if (!level) continue;
      const hit = found.get(id) ?? { level, wheres: [], go };
      if (!hit.wheres.includes(where)) hit.wheres.push(where);
      found.set(id, hit);
    }
  };
  for (const page of config.pages) {
    entityCheck([page.show_if, page.background], t("Seite „{name}“", { name: page.name }), { tab: "seiten", pageId: page.id });
    for (const w of page.widgets) {
      entityCheck([w.options, w.show_if, w.tap_action, w.hold_action], t("Seite „{name}“", { name: page.name }), {
        tab: "seiten",
        pageId: page.id,
        widgetId: w.id,
      });
    }
  }
  for (const ev of config.events) {
    if (ev.enabled === false) continue;
    entityCheck(ev, t("Ereignis „{name}“", { name: ev.name || ev.title || ev.id }), { tab: "ereignisse", eventId: ev.id });
  }
  for (const d of config.displays) {
    entityCheck([d.night, d.watchdog, d.playlist], t("Display „{name}“", { name: d.name }), { tab: "wiedergabe", displayId: d.id });
  }
  entityCheck(config.summary, t("KI-Zusammenfassung"), { tab: "design" });
  for (const [id, hit] of found) {
    const where = hit.wheres.length > 2 ? `${hit.wheres.slice(0, 2).join(", ")} …` : hit.wheres.join(", ");
    issues.push({
      level: hit.level,
      text: hit.level === "error" ? t("{id} gibt es nicht (mehr) – {where}", { id, where }) : t("{id} ist nicht verfügbar – {where}", { id, where }),
      go: hit.go,
    });
  }

  // Displays: lange nicht gemeldet, Notfallmodus, alte Version
  const now = Date.now();
  for (const d of config.displays) {
    const st = status[d.id];
    const go: HealthGo = { tab: "wiedergabe", displayId: d.id };
    if (!st || (!st.online && !st.last_seen)) {
      issues.push({ level: "info", text: t("Display „{name}“ war noch nie verbunden", { name: d.name }), go });
      continue;
    }
    if (!st.online && st.last_seen && now - new Date(st.last_seen).getTime() > OFFLINE_MINUTES * 60e3) {
      const hours = Math.round((now - new Date(st.last_seen).getTime()) / 3600e3);
      issues.push({
        level: "warn",
        text:
          hours >= 1
            ? t("Display „{name}“ meldet sich seit {n} h nicht", { name: d.name, n: hours })
            : t("Display „{name}“ meldet sich nicht", { name: d.name }),
        go,
      });
    }
    for (const c of st.clients) {
      if (c.safe) issues.push({ level: "warn", text: t("„{name}“ ist im Notfallmodus: {reason}", { name: c.name, reason: t(c.safe) }), go });
      else if (version && c.version && c.version !== version) issues.push({ level: "info", text: t("„{name}“ hat noch eine ältere Version", { name: c.name }), go });
    }
  }

  // Seiten, die nirgends erscheinen (weder Wiedergabe noch Nacht, Ereignis oder Antippen)
  const used = new Set<string>();
  for (const d of config.displays) {
    for (const p of d.playlist) used.add(p.page);
    if (d.night?.page) used.add(d.night.page);
  }
  for (const ev of config.events) if (ev.page) used.add(ev.page);
  for (const p of config.pages) for (const w of p.widgets) for (const a of [w.tap_action, w.hold_action]) if (a?.page) used.add(a.page);
  for (const p of config.pages) {
    if (!used.has(p.id)) issues.push({ level: "info", text: t("Seite „{name}“ wird nirgends gezeigt", { name: p.name }), go: { tab: "seiten", pageId: p.id } });
  }

  // Bilderrahmen ohne Fotos
  const photoPage = config.pages.some((p) => p.background.type === "photo" && used.has(p.id));
  if (photoPage && photos) {
    const total = (photos.folder ?? 0) + (photos.icloud ?? 0);
    if (!total && !config.photos.bing) {
      issues.push({ level: "error", text: t("Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)"), go: { tab: "design" } });
    } else if (config.photos.folder && photos.folder === 0) {
      issues.push({ level: "warn", text: t("Der Fotoordner ist leer oder fehlt"), go: { tab: "design" } });
    }
    if (config.photos.icloud && photos.icloud === 0) issues.push({ level: "warn", text: t("Das iCloud-Album liefert keine Fotos"), go: { tab: "design" } });
  }

  // KI-Zusammenfassung ohne KI
  if (config.summary?.enabled && known && !config.summary.ai_task && !Object.keys(states).some((id) => id.startsWith("ai_task."))) {
    issues.push({ level: "warn", text: t("KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant"), go: { tab: "design" } });
  }

  const order: Record<HealthLevel, number> = { error: 0, warn: 1, info: 2 };
  return issues.sort((a, b) => order[a.level] - order[b.level]);
};
