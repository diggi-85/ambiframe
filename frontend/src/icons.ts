// Linien-Icons im Ambiframe-Stil (24er Raster, 1,5 px Strich) und Wetter-Zuordnung
import { t } from "./i18n";
import { html, svg, type SVGTemplateResult, type TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

const CLOUD = "M7.2 18.5h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 18.5z";
const CLOUD_HI = "M7.2 14.8h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 14.8z";
const WASHER = '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M4 7.5h16M7 5.3h.01M9.5 5.3h.01"/><circle cx="12" cy="14" r="4.2"/>';

export const PATHS: Record<string, string> = {
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5"/>',
  moon: '<path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z"/>',
  cloud: `<path d="${CLOUD}"/>`,
  partly: '<path d="M8 3.2v1.3M3.2 8h1.3M4.6 4.6l.9.9M11.4 4.6l-.9.9M5.4 10.6A3 3 0 1 1 10.9 6.9"/><path d="M9.2 19.5h8.3a3.4 3.4 0 0 0 .4-6.78 4.6 4.6 0 0 0-8.9 1.2 2.8 2.8 0 0 0 .2 5.58z"/>',
  rain: `<path d="${CLOUD_HI}"/><path d="M8.6 17.6l-1 2.4M12.6 17.6l-1 2.4M16.6 17.6l-1 2.4"/>`,
  pour: `<path d="${CLOUD_HI}"/><path d="M8.2 17.4l-1.4 3.4M11.4 17.4l-1.4 3.4M14.6 17.4l-1.4 3.4M17.8 17.4l-1.4 3.4"/>`,
  snow: `<path d="${CLOUD_HI}"/><path d="M8.5 18.2h.01M12 19.8h.01M15.5 18.2h.01M10.2 21.4h.01M13.8 21.4h.01" stroke-width="2.2"/>`,
  fog: '<path d="M4 8.5h16M6.5 12.5h11M4 16.5h16"/>',
  bolt: `<path d="${CLOUD_HI}"/><path d="M12.8 15.6l-2.2 3.3h3l-2.2 3.3"/>`,
  wind: '<path d="M3 8.5h10.5A2.5 2.5 0 1 0 11 6M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7"/>',
  washer: WASHER,
  dryer: WASHER + '<path d="M9.6 14.4c.8-.9 1.6-.9 2.4 0s1.6.9 2.4 0"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.5a2.1 2.1 0 0 0 4 0"/>',
  window: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M5 12h14"/>',
  door: '<path d="M6 21V3.5h12V21M4 21h16"/><path d="M14.5 12.5h.01" stroke-width="2.2"/>',
  bulb: '<path d="M9.5 17.5h5M10.3 20.5h3.4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',
  bin: '<path d="M4.5 6.5h15M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14M10 10.5v6M14 10.5v6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.7"/>',
  cam: '<path d="M3.5 7.5h3l1.8-2.5h7.4l1.8 2.5h3v12h-17z"/><circle cx="12" cy="13" r="3.6"/>',
  thermo: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  plug: '<path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0zM12 16.5V21"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  forward: '<path d="M9 6l6 6-6 6"/>',
  shutter: '<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7.5h16M4 11h16M4 14.5h16M4 18h16"/>',
  shutter_open: '<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7h16"/>',
  awning: '<path d="M3 5h18"/><path d="M4.5 5v2.5h15V5"/>',
  awning_out: '<path d="M3 4.5h18l-2.5 8h-13z"/><path d="M5.5 12.5q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0"/>',
  pause: '<path d="M9 5.5v13M15 5.5v13"/>',
  play: '<path d="M8 5.5l11 6.5-11 6.5z"/>',
  mute: '<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  speaker: '<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  reload: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
  tablet: '<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',
  watch: '<rect x="7" y="6.5" width="10" height="11" rx="2.6"/><path d="M9 6.5l.6-3.5h4.8l.6 3.5M9 17.5l.6 3.5h4.8l.6-3.5"/>',
  battery: '<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3"/><path d="M6 10.5v3" stroke-width="2.2"/>',
  car: '<path d="M4 15.5V12l1.8-4.2A2 2 0 0 1 7.6 6.5h8.8a2 2 0 0 1 1.8 1.3L20 12v3.5"/><path d="M3 15.5h18v2.3a.7.7 0 0 1-.7.7H18.6M5.4 18.5H3.7a.7.7 0 0 1-.7-.7v-2.3"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/><path d="M4.6 11.8h14.8"/>',
  robot: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.6 8.6a6.8 6.8 0 0 1 10.8 0"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',
  home: '<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
  solar: '<path d="M3.5 18l2-8h13l2 8z"/><path d="M4.6 14h14.8M9.2 10l-.9 8M14.8 10l.9 8"/><path d="M12 2.8v2.4M7.4 4.3l1.1 1.6M16.6 4.3l-1.1 1.6"/>',
  charge: '<path d="M13 3L6 13.5h5L10 21l7-10.5h-5z"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-4 6-6.5 9-8"/>',
  warning: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.3h.01"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  euro: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.6a4 4 0 1 0 0 6.8M7.5 11h6M7.5 13.2h6"/>',
  motion: '<path d="M12 12h.01" stroke-width="2.4"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  unlock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.7-1.5"/>',
  gauge: '<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 13l3.5-4"/>',
  leak: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
  music: '<path d="M9 17.5V5.5l10-2v12"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/><path d="M9 9.5l10-2"/>',
  page: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M9 9v10.5"/>',
  tv: '<rect x="2.5" y="4.5" width="19" height="12.5" rx="1.8"/><path d="M8.5 20.5h7M12 17v3.5"/>',
  sparkle: '<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  cat: '<path d="M5 9.5V4l4 3h6l4-3v5.5c0 5-3.1 9.5-7 9.5s-7-4.5-7-9.5z"/><path d="M9.5 12h.01M14.5 12h.01" stroke-width="2.2"/><path d="M10.8 15c.7.5 1.7.5 2.4 0"/>',
  printer: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 8h16M8 13.5h8M10 16.5h4M12 8v3.5"/>',
  wifi: '<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><path d="M12 19.5h.01" stroke-width="2.4"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M9.5 3h5M12 3v2.5M18.5 6.5l1.5-1.5"/>',
  train: '<rect x="5.5" y="3" width="13" height="14" rx="3"/><path d="M5.5 10.5h13M9 14h.01M15 14h.01M8.5 17l-2 3.5M15.5 17l2 3.5"/>',
  flower: '<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8c0-2.4 1.2-3.8 2.4-3.8s1.6 1.6.6 3.4M14.2 9c2.4 0 3.8 1.2 3.8 2.4s-1.6 1.6-3.4.6M12 11.2c0 2.4-1.2 3.8-2.4 3.8S8 13.4 9 11.6M9.8 9C7.4 9 6 7.8 6 6.6s1.6-1.6 3.4-.6M12 11.5V21M12 17c1.5-2 3.5-2.5 5-2"/>',
};

export const iconSvg = (name: string | undefined, cls = ""): SVGTemplateResult =>
  svg`<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(PATHS[name ?? ""] ?? PATHS.info)}</svg>`;

const CONDITIONS: Record<string, [string, string]> = {
  sunny: ["sun", "Sonnig"],
  "clear-night": ["moon", "Klar"],
  partlycloudy: ["partly", "Teils bewölkt"],
  cloudy: ["cloud", "Bewölkt"],
  rainy: ["rain", "Regen"],
  pouring: ["pour", "Starkregen"],
  snowy: ["snow", "Schnee"],
  "snowy-rainy": ["snow", "Schneeregen"],
  hail: ["snow", "Hagel"],
  fog: ["fog", "Nebel"],
  lightning: ["bolt", "Gewitter"],
  "lightning-rainy": ["bolt", "Gewitter"],
  windy: ["wind", "Windig"],
  "windy-variant": ["wind", "Windig"],
  exceptional: ["bolt", "Unwetter"],
};

export const weatherIcon = (c?: string): string => CONDITIONS[c ?? ""]?.[0] ?? "cloud";
export const weatherLabel = (c?: string): string => (CONDITIONS[c ?? ""] ? t(CONDITIONS[c ?? ""][1]) : (c ?? "–"));

/** mdi:-Icons der Konfiguration auf eigene Linien-Icons abbilden, sonst HA-Icon verwenden. */
export const MDI_MAP: Record<string, string> = {
  "mdi:washing-machine": "washer",
  "mdi:tumble-dryer": "dryer",
  "mdi:bell": "bell",
  "mdi:timer-outline": "timer",
  "mdi:timer-sand": "timer",
  "mdi:train": "train",
  "mdi:bus": "train",
  "mdi:flower-pollen": "flower",
  "mdi:flower": "flower",
  "mdi:pin-outline": "pin",
  "mdi:calendar-clock": "calendar",
  "mdi:radar": "rain",
  "mdi:weather-sunset": "sun",
  "mdi:doorbell": "bell",
  "mdi:window-open": "window",
  "mdi:door-open": "door",
  "mdi:lightbulb": "bulb",
  "mdi:trash-can": "bin",
  "mdi:thermometer": "thermo",
  "mdi:water-percent": "drop",
  "mdi:calendar": "calendar",
  "mdi:cctv": "cam",
  "mdi:car": "car",
  "mdi:car-electric": "car",
  "mdi:robot-vacuum": "robot",
  "mdi:account": "person",
  "mdi:home": "home",
  "mdi:solar-power": "solar",
  "mdi:solar-panel": "solar",
  "mdi:lightning-bolt": "charge",
  "mdi:flash": "charge",
  "mdi:leaf": "leaf",
  "mdi:alert": "warning",
  "mdi:map-marker": "pin",
  "mdi:currency-eur": "euro",
  "mdi:motion-sensor": "motion",
  "mdi:lock": "lock",
  "mdi:lock-open": "unlock",
  "mdi:water-alert": "leak",
  "mdi:weather-sunny": "sun",
  "mdi:weather-rainy": "rain",
  "mdi:air-filter": "leaf",
  "mdi:brightness-5": "sun",
  "mdi:music": "music",
  "mdi:cat": "cat",
  "mdi:printer-3d": "printer",
  "mdi:wifi": "wifi",
  "mdi:music-note": "music",
  "mdi:speaker": "music",
};

/**
 * Beliebiges Icon: eigene Linien-Icons (z. B. „car“), bekannte mdi:-Namen werden darauf abgebildet,
 * alle anderen mdi:-Icons zeichnet Home Assistant selbst (<ha-icon>).
 */
export const anyIcon = (name: string | undefined, cls = ""): SVGTemplateResult | TemplateResult => {
  if (!name) return iconSvg(undefined, cls);
  if (PATHS[name]) return iconSvg(name, cls);
  if (MDI_MAP[name]) return iconSvg(MDI_MAP[name], cls);
  if (name.includes(":") && customElements.get("ha-icon")) {
    return html`<ha-icon class="ic ${cls}" icon=${name} style="--mdc-icon-size:1em;width:1em;height:1em;display:inline-flex"></ha-icon>`;
  }
  return iconSvg(undefined, cls);
};
