// Profile für neue Displays: passende Seiten, Bedienung, Töne und Aussehen mit einem Klick.
// Seiten werden aus den vorhandenen ausgewählt (nach Inhalt erkannt), nichts wird doppelt angelegt.
import type { AmbiframeConfig, DisplayConfig, EventConfig, PageConfig } from "../types";

type PageTest = (p: PageConfig) => boolean;

const has = (p: PageConfig, ...types: string[]) => p.widgets.some((w) => types.includes(w.type));
const named = (p: PageConfig, re: RegExp) => re.test(p.id) || re.test(p.name);

/** Seitenarten, nach Inhalt erkannt */
export const PAGE_KINDS: Record<string, PageTest> = {
  photo: (p) => p.background.type === "photo",
  camera: (p) => p.background.type === "camera",
  // StandBy: große Uhr mit Datum und einem Wert (Wetter, Temperatur)
  standby: (p) => p.background.type === "none" && has(p, "clock") && has(p, "date") && has(p, "weather", "value") && !has(p, "summary"),
  morning: (p) => has(p, "summary"),
  weather: (p) => has(p, "weather") && !has(p, "summary") && !has(p, "date") && (named(p, /wetter|weather/i) || !has(p, "clock")),
  agenda: (p) => has(p, "agenda", "calendar") && !named(p, /m[üu]ll|waste|bins/i),
  waste: (p) => has(p, "waste") || named(p, /m[üu]ll|waste|bins/i),
  home: (p) => has(p, "rooms", "status", "covers"),
  persons: (p) => has(p, "persons", "car"),
  energy: (p) => has(p, "power", "price", "balance"),
  news: (p) => has(p, "news"),
  night: (p) => named(p, /^nacht$|^night$/i),
};

export interface Profile {
  id: string;
  name: string;
  hint: string;
  icon: string;
  /** Seitenarten in dieser Reihenfolge; „photo“ wird zwischen die anderen gestreut */
  pages: string[];
  /** Welche Ereignisarten dieses Display zeigt (fehlt = alle) */
  eventKinds?: EventConfig["kind"][];
  display: Partial<DisplayConfig>;
}

export const PROFILES: Profile[] = [
  {
    id: "kitchen",
    name: "Küche",
    hint: "Alles im Blick: Fotos, Wetter, Termine, Müll, Haushalt und Energie. Antippen öffnet das Dashboard.",
    icon: "home",
    pages: ["photo", "morning", "standby", "agenda", "weather", "waste", "home", "energy", "news", "persons"],
    display: {
      orientation: "auto",
      control: { enabled: true, mode: "embedded", dashboard: "/lovelace/0", idle: 60 },
      sound: { volume: 80, quiet: { after: "22:00", before: "07:00" } },
    },
  },
  {
    id: "hallway",
    name: "Flur",
    hint: "Kurz im Vorbeigehen: Uhr, Wetter, Müll und wer zu Hause ist – große Schrift.",
    icon: "door",
    pages: ["standby", "photo", "waste", "persons", "weather"],
    display: {
      orientation: "auto",
      text_size: "large",
      control: { enabled: true, mode: "embedded", dashboard: "/lovelace/0", idle: 30 },
      sound: { volume: 60, quiet: { after: "22:00", before: "07:00" } },
    },
  },
  {
    id: "bedroom",
    name: "Schlafzimmer",
    hint: "Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.",
    icon: "moon",
    pages: ["standby", "photo", "weather"],
    eventKinds: ["alarm"],
    display: {
      mode: "dark",
      control: { enabled: true, mode: "embedded", dashboard: "/lovelace/0", idle: 30 },
      sound: { volume: 35, quiet: { after: "21:00", before: "08:00" } },
      design: { ambient: { type: "none" } },
    },
  },
  {
    id: "tv",
    name: "Fernseher",
    hint: "Großer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.",
    icon: "tv",
    pages: ["photo", "camera", "weather", "news", "standby"],
    eventKinds: ["alarm", "live"],
    display: {
      orientation: "landscape",
      mode: "dark",
      text_size: "large",
      control: { enabled: false, dashboard: "/lovelace/0", idle: 60 },
      sound: { mute: true },
      oled: true,
      design: { ambient: { type: "none" } },
    },
  },
];

/** Seiten für ein Profil aus den vorhandenen wählen; Fotos zwischen die Info-Seiten streuen (Mischung). */
export const profilePlaylist = (profile: Profile, pages: PageConfig[]): DisplayConfig["playlist"] => {
  const used = new Set<string>();
  const pick = (kind: string): PageConfig | undefined => {
    const test = PAGE_KINDS[kind];
    const page = test && pages.find((p) => !used.has(p.id) && test(p));
    if (page) used.add(page.id);
    return page;
  };
  const photo = profile.pages.includes("photo") ? pick("photo") : undefined;
  const info = profile.pages.filter((k) => k !== "photo").map(pick).filter((p): p is PageConfig => !!p);
  const list: string[] = [];
  if (photo) list.push(photo.id);
  info.forEach((p, i) => {
    list.push(p.id);
    // Nach jeder zweiten Info-Seite wieder der Bilderrahmen
    if (photo && i % 2 === 1 && i < info.length - 1) list.push(photo.id);
  });
  if (!list.length && pages[0]) list.push(pages[0].id);
  return list.map((page) => ({ page }));
};

/** Neues Display nach Profil */
export const displayFromProfile = (profile: Profile, config: AmbiframeConfig, id: string, name: string): DisplayConfig => {
  const night = config.pages.find((p) => PAGE_KINDS.night(p));
  const events = profile.eventKinds ? config.events.filter((e) => profile.eventKinds!.includes(e.kind)).map((e) => e.id) : "all";
  return {
    id,
    name,
    profile: profile.id,
    playlist: profilePlaylist(profile, config.pages),
    night: night ? { page: night.id } : {},
    control: { enabled: true, dashboard: "/lovelace/0", idle: 60 },
    events,
    ...structuredClone(profile.display),
  } as DisplayConfig;
};
