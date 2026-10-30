// Gemeinsame Datenquellen eines Displays: Wettervorhersagen und Fotos
import type { AmbientSettings } from "./display/ambient";
import type { Hass, Photo, AmbiframeConfig, PlaceholderSource } from "./types";

export type ForecastType = "hourly" | "daily";

export interface Forecast {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
}

/** Eine Abo-Verbindung pro Wetter-Entität und Typ, geteilt von allen Widgets eines Displays. */
export class ForecastStore extends EventTarget {
  private data = new Map<string, Forecast[]>();
  private subs = new Map<string, Promise<(() => unknown) | undefined>>();
  private hass?: Hass;

  setHass(hass: Hass | undefined): void {
    this.hass = hass;
  }

  get(entity: string | undefined, type: ForecastType): Forecast[] | undefined {
    if (!entity) return undefined;
    const key = `${entity}|${type}`;
    if (!this.subs.has(key) && this.hass) {
      const sub = this.hass.connection
        .subscribeMessage<{ forecast?: Forecast[] }>(
          (msg) => {
            this.data.set(key, msg.forecast ?? []);
            this.dispatchEvent(new Event("change"));
          },
          { type: "weather/subscribe_forecast", entity_id: entity, forecast_type: type },
        )
        .catch(() => undefined);
      this.subs.set(key, sub);
    }
    return this.data.get(key);
  }

  dispose(): void {
    for (const sub of this.subs.values()) void sub.then((unsub) => unsub?.());
    this.subs.clear();
  }
}

interface PhotoItem {
  url?: string;
  mediaId?: string;
  credit: string;
}

const shuffle = <T>(list: T[]): T[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const RELOAD_MS = 6 * 3600e3;

/** Gewählte Platzhalter-Quelle; ältere Konfigurationen kennen nur Bing an/aus */
export const placeholderOf = (cfg: Partial<AmbiframeConfig["photos"]>): PlaceholderSource =>
  cfg.placeholder ?? (cfg.bing === false ? "none" : "bing");

/** Fotos aus einer HA-Medienquelle, iCloud- und Google-Alben; ersatzweise Platzhalter-Bilder. */
export class PhotoProvider {
  private items: PhotoItem[] = [];
  private index = -1;
  private loading?: Promise<void>;
  private loadedAt = 0;

  constructor(
    private readonly getHass: () => Hass | undefined,
    private readonly getConfig: () => AmbiframeConfig["photos"] | undefined,
  ) {}

  reload(): void {
    this.loading = undefined;
  }

  private async load(): Promise<void> {
    const hass = this.getHass();
    const cfg = this.getConfig();
    if (!hass || !cfg) return;
    let items: PhotoItem[] = [];
    if (cfg.folder) {
      try {
        const res = await hass.callWS<{ children?: { media_content_id: string; media_class: string; title: string }[] }>({
          type: "media_source/browse_media",
          media_content_id: cfg.folder,
        });
        items = (res.children ?? [])
          .filter((c) => c.media_class === "image" || /\.(jpe?g|png|webp|avif)$/i.test(c.title))
          .map((c) => ({ mediaId: c.media_content_id, credit: "" }));
      } catch {
        // Ordner existiert (noch) nicht – dann Bing
      }
    }
    if (cfg.icloud) {
      try {
        const album = await hass.callWS<Photo[]>({ type: "ambiframe/photos/icloud", url: cfg.icloud });
        items = [...items, ...album.map((p) => ({ url: p.url, credit: p.credit }))];
      } catch {
        // Album nicht erreichbar – andere Quellen reichen
      }
    }
    if (cfg.google) {
      try {
        const album = await hass.callWS<Photo[]>({ type: "ambiframe/photos/google", url: cfg.google });
        items = [...items, ...album.map((p) => ({ url: p.url, credit: p.credit }))];
      } catch {
        // Album nicht erreichbar – andere Quellen reichen
      }
    }
    // Platzhalter: als Ersatz, wenn nichts Eigenes da ist – oder untergemischt
    const source = placeholderOf(cfg);
    if (source !== "none" && (!items.length || (cfg.placeholder_mix ?? cfg.bing_mix))) {
      try {
        const extra = await hass.callWS<Photo[]>({ type: "ambiframe/photos/placeholder", source });
        items = [...items, ...extra.map((p) => ({ url: p.url, credit: p.credit }))];
      } catch {
        // ohne Platzhalter weiter
      }
    }
    this.items = shuffle(items);
    this.index = -1;
    this.loadedAt = Date.now();
  }

  async next(): Promise<Photo | null> {
    // iCloud-Adressen laufen nach etwa 15 Minuten ab – dann alle 5 Minuten neu holen
    const every = this.getConfig()?.icloud ? 5 * 60e3 : RELOAD_MS;
    if (!this.loading || Date.now() - this.loadedAt > every) this.loading = this.load();
    await this.loading;
    if (!this.items.length) return null;
    this.index = (this.index + 1) % this.items.length;
    const item = this.items[this.index];
    const credit = this.getConfig()?.credit ? item.credit : "";
    if (item.url) return { url: item.url, credit };
    const hass = this.getHass();
    if (!hass || !item.mediaId) return null;
    try {
      const res = await hass.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: item.mediaId, expires: 3600 });
      return { url: res.url, credit };
    } catch {
      return null;
    }
  }
}

/** Bild vorladen, damit Überblendungen nie ein leeres Feld zeigen. */
export interface CalEvent {
  start: string;
  end: string;
  summary: string;
  location?: string;
  calendar: string;
}

/** Termine mehrerer Kalender – gemeinsamer Zwischenspeicher (10 min) für Tagesvorschau, Infozeile & Co. */
const eventCache = new Map<string, { at: number; events: CalEvent[]; pending?: Promise<CalEvent[]> }>();
export const loadEvents = (hass: Hass, calendars: string[], days = 2): Promise<CalEvent[]> => {
  const key = `${[...calendars].sort().join(",")}|${days}`;
  const hit = eventCache.get(key);
  if (hit?.pending) return hit.pending;
  if (hit && Date.now() - hit.at < 10 * 60e3) return Promise.resolve(hit.events);
  const pending = hass
    .callWS<{ response: Record<string, { events: Omit<CalEvent, "calendar">[] }> }>({
      type: "call_service",
      domain: "calendar",
      service: "get_events",
      target: { entity_id: calendars },
      service_data: { duration: { days } },
      return_response: true,
    })
    .then((res) =>
      Object.entries(res.response ?? {})
        .flatMap(([calendar, r]) => r.events.map((e) => ({ ...e, calendar })))
        .sort((x, y) => new Date(x.start).getTime() - new Date(y.start).getTime()),
    )
    .catch(() => hit?.events ?? [])
    .then((events) => {
      eventCache.set(key, { at: Date.now(), events });
      return events;
    });
  eventCache.set(key, { at: hit?.at ?? 0, events: hit?.events ?? [], pending });
  return pending;
};

/** Ganztägig, wenn ohne Uhrzeit („2026-10-17“) */
export const isAllDay = (e: CalEvent): boolean => !e.start.includes("T");

export const preload = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

/** Was jedes Widget über sein Display wissen darf. */
export interface DisplayContext {
  forecasts: ForecastStore;
  config: AmbiframeConfig;
  preview: boolean;
  /** Hintergrund-Animation laut Design/Stil – eine Seite kann sie überschreiben */
  ambient: AmbientSettings;
  /** Display, auf dem gerade angezeigt wird (für Bedingungen „nur auf Display“) */
  displayId?: string;
  /** false: kein Nachrichten-Laufband (Videostream, Fernseher oder abgeschaltet) */
  ticker?: boolean;
  /** Stil zeigt Widgets als Kacheln (Kacheln, Tonal, Cockpit) */
  tiles?: boolean;
  /** Stil zeigt Uhr und Abfahrten als Fallblatt */
  flap?: boolean;
  /** Kleine Vorschau: keine Hintergrund-Animationen, auch nicht die einer Seite */
  still?: boolean;
  /** Abstand zwischen den Kacheln in px (Raster: 16) */
  gap?: number;
}
