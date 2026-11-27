/** Teilen von Seiten und Stilen: Datei speichern/laden, private Teile weglassen, fremde Entitäten finden und ersetzen. */
import type { Hass } from "./types";

/** Teile des Designs, die zum Haus gehören statt zum Aussehen – nie mit dem Stil teilen oder überschreiben */
export const HOUSE_KEYS = ["presets", "home_ticker", "home_ticker_speed", "news_band", "ticker_detail", "ticker_look", "cover_players", "language"];

export const lookOnly = (design: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(design).filter(([k]) => !HOUSE_KEYS.includes(k)));

/** Text als Datei herunterladen */
export const saveFile = (name: string, text: string): void => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/yaml" }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

/** Datei wählen und als Text lesen; null = abgebrochen */
export const pickFile = (): Promise<string | null> =>
  new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".yaml,.yml,.txt,text/yaml,text/plain";
    input.oncancel = () => resolve(null);
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) return resolve(null);
      f.text().then(resolve, () => resolve(null));
    };
    input.click();
  });

const DOMAINS = "sensor binary_sensor light switch media_player weather camera calendar todo person climate cover lock input_boolean input_number input_select input_text input_datetime button script automation scene vacuum fan alarm_control_panel device_tracker sun update number select event image lawn_mower valve water_heater humidifier siren timer counter".split(" ");
// nicht nach „/“, „.“ oder „-“ und nicht vor „.“: Dateinamen wie /local/camera.jpg sind keine Entitäten
const ID = /(?<![\w/.-])([a-z_]+)\.([a-z0-9_]+)(?![\w.])/g;
/** Felder mit Dienstnamen (light.turn_on) statt Entitäten */
const SERVICE_KEYS = new Set(["service", "action", "perform_action"]);

/** Entitäts-IDs in einer importierten Seite, die es in diesem Home Assistant nicht gibt */
export const missingEntities = (data: unknown, hass?: Hass): string[] => {
  if (!hass) return [];
  const known = new Set([...DOMAINS, ...Object.keys(hass.states).map((id) => id.split(".")[0])]);
  // Dienste wie light.turn_on sehen aus wie Entitäten – nicht zum Ersetzen anbieten
  const services = (hass as { services?: Record<string, Record<string, unknown>> }).services ?? {};
  const found = new Set<string>();
  const walk = (v: unknown): void => {
    if (typeof v === "string") for (const m of v.matchAll(ID)) known.has(m[1]) && !hass.states[m[0]] && !services[m[1]]?.[m[2]] && found.add(m[0]);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) if (!SERVICE_KEYS.has(k)) walk(x);
  };
  walk(data);
  return [...found].sort();
};

/** Entität überall ersetzen (auch in Vorlagen-Text) */
export const replaceEntity = <T>(data: T, from: string, to: string): T => {
  const re = new RegExp(`(?<![\\w/.-])${from.replace(/\./g, "\\.")}(?![\\w.])`, "g");
  const walk = (v: unknown): unknown =>
    typeof v === "string" ? v.replace(re, to) : Array.isArray(v) ? v.map(walk) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)])) : v;
  return walk(data) as T;
};
