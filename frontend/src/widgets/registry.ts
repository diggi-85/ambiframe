// Widget-Katalog: Typ → Element, Name und Standardgröße (wird im Editor wiederverwendet)
import "./basic";
import "./custom";
import "./daily";
import "./energy";
import "./home";
import "./life";
import "./media";
import "./more";
import "./extras";
import "./news";
import "./plus";
import "./pixel";
import "./wordclock";
import "./clocks";
import "./summary";
import "./today";
import "./weather";

export interface WidgetType {
  tag: string;
  name: string;
  icon: string;
  size: [number, number];
}

export const WIDGETS: Record<string, WidgetType> = {
  clock: { tag: "af-clock", name: "Uhr", icon: "mdi:clock-outline", size: [6, 2] },
  date: { tag: "af-date", name: "Datum", icon: "mdi:calendar-today", size: [6, 1] },
  text: { tag: "af-text", name: "Text & Vorlage", icon: "mdi:format-text", size: [4, 1] },
  chart: { tag: "af-chart", name: "Verlauf", icon: "mdi:chart-line", size: [6, 3] },
  gauge: { tag: "af-gauge", name: "Anzeige (Ring)", icon: "mdi:gauge", size: [3, 3] },
  image: { tag: "af-image", name: "Bild", icon: "mdi:image-outline", size: [4, 4] },
  weather: { tag: "af-weather", name: "Wetter", icon: "mdi:weather-partly-cloudy", size: [4, 6] },
  value: { tag: "af-value", name: "Wert", icon: "mdi:numeric", size: [3, 2] },
  rooms: { tag: "af-rooms", name: "Räume", icon: "mdi:home-thermometer-outline", size: [8, 6] },
  status: { tag: "af-status", name: "Status", icon: "mdi:list-status", size: [4, 6] },
  calendar: { tag: "af-calendar", name: "Kalender", icon: "mdi:calendar", size: [4, 6] },
  infoline: { tag: "af-infoline", name: "Infozeile", icon: "mdi:dots-horizontal", size: [8, 1] },
  camera: { tag: "af-camera", name: "Kamera", icon: "mdi:cctv", size: [6, 4] },
  price: { tag: "af-price", name: "Strompreis", icon: "mdi:currency-eur", size: [8, 6] },
  power: { tag: "af-power", name: "Energie jetzt", icon: "mdi:solar-power", size: [6, 4] },
  car: { tag: "af-car", name: "Auto", icon: "mdi:car-electric", size: [5, 7] },
  persons: { tag: "af-persons", name: "Personen", icon: "mdi:account", size: [5, 4] },
  vacuum: { tag: "af-vacuum", name: "Saugroboter", icon: "mdi:robot-vacuum", size: [6, 4] },
  waste: { tag: "af-waste", name: "Mülltonnen", icon: "mdi:trash-can", size: [5, 5] },
  activity: { tag: "af-activity", name: "Bewegung", icon: "mdi:motion-sensor", size: [7, 1] },
  list: { tag: "af-list", name: "Werte-Liste", icon: "mdi:format-list-bulleted", size: [5, 6] },
  warnings: { tag: "af-warnings", name: "Warnungen", icon: "mdi:alert", size: [6, 3] },
  agenda: { tag: "af-agenda", name: "Termine", icon: "mdi:calendar", size: [6, 6] },
  media: { tag: "af-media", name: "Läuft gerade", icon: "mdi:music", size: [6, 3] },
  appliances: { tag: "af-appliances", name: "Geräte", icon: "mdi:washing-machine", size: [6, 4] },
  batteries: { tag: "af-batteries", name: "Akkus", icon: "mdi:battery-heart-variant", size: [6, 7] },
  consumers: { tag: "af-consumers", name: "Größte Verbraucher", icon: "mdi:podium", size: [6, 3] },
  covers: { tag: "af-covers", name: "Rollläden", icon: "mdi:window-shutter", size: [5, 7] },
  summary: { tag: "af-summary", name: "KI-Zusammenfassung", icon: "mdi:creation-outline", size: [7, 7] },
  pet: { tag: "af-pet", name: "Haustier", icon: "mdi:cat", size: [12, 8] },
  balance: { tag: "af-balance", name: "Tagesbilanz", icon: "mdi:chart-box-outline", size: [12, 8] },
  qr: { tag: "af-qr", name: "WLAN-QR-Code", icon: "mdi:qrcode", size: [6, 7] },
  job: { tag: "af-job", name: "Auftrag/Druck", icon: "mdi:printer-3d", size: [4, 6] },
  news: { tag: "af-news", name: "Nachrichten", icon: "mdi:newspaper-variant-outline", size: [12, 7] },
  daily: { tag: "af-daily", name: "Tagesinhalt (Wikipedia, Zitat)", icon: "mdi:book-open-page-variant-outline", size: [12, 8] },
  today: { tag: "af-today", name: "Tagesvorschau", icon: "mdi:calendar-today-outline", size: [12, 7] },
  timer: { tag: "af-timer", name: "Timer", icon: "mdi:timer-outline", size: [5, 4] },
  board: { tag: "af-board", name: "Pinnwand", icon: "mdi:pin-outline", size: [5, 4] },
  countdown: { tag: "af-countdown", name: "Countdown", icon: "mdi:calendar-clock", size: [4, 4] },
  departures: { tag: "af-departures", name: "Abfahrten", icon: "mdi:train", size: [6, 5] },
  radar: { tag: "af-radar", name: "Regenradar", icon: "mdi:radar", size: [6, 6] },
  sky: { tag: "af-sky", name: "Sonne & Mond", icon: "mdi:weather-sunset", size: [8, 2] },
  air: { tag: "af-air", name: "Pollen & Luft", icon: "mdi:flower-pollen", size: [4, 5] },
  analog: { tag: "af-analog", name: "Analoge Uhr", icon: "mdi:clock-time-four-outline", size: [4, 4] },
  wordclock: { tag: "af-wordclock", name: "Wortuhr", icon: "mdi:clock-digital", size: [8, 8] },
  pixel: { tag: "af-pixel", name: "Pixel-Anzeige", icon: "mdi:dots-grid", size: [5, 2] },
  card: { tag: "af-card", name: "HA-Karte", icon: "mdi:card-outline", size: [4, 4] },
};
