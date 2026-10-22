// Töne für Ereignisse: mitgelieferte Klänge, eigene aus der Tonbibliothek (config.sounds), ein Link oder eine Datei aus
// HA-Medien (media-source://…). Auf dem Tablet über Fully (umgeht die Autoplay-Sperre), sonst über <audio> – dort klappt
// es erst, nachdem einmal auf den Bildschirm getippt wurde.
import type { Hass, SoundConfig } from "./types";

export const SOUNDS: [string, string][] = [
  ["klangschale", "Klangschale (tief, schwebend)"],
  ["marimba", "Marimba (zwei Holztöne)"],
  ["glas", "Glas (klares Ding-Dong)"],
  ["kalimba", "Kalimba (drei gezupfte Töne)"],
  ["windspiel", "Windspiel (zart)"],
  ["hinweis", "Hinweis (sehr leise, kurz)"],
  ["gong", "Gong (warm, tief)"],
  ["dingdong", "Ding-Dong"],
  ["glocke", "Glocke (kurz, hell)"],
  ["alarm", "Alarm (eindringlich, wiederholt)"],
];

const BUILTIN = new Set(SOUNDS.map(([id]) => id));

/** Link zum Ton – mitgelieferte liegen neben ambiframe.js */
export const soundUrl = (sound: string): string =>
  BUILTIN.has(sound) ? new URL(`./sounds/${sound}.wav`, import.meta.url).href : new URL(sound, location.href).href;

/** Wo Ambiframe eigene Töne nachschlägt bzw. HA-Medien auflöst */
export interface SoundContext {
  hass?: Hass;
  library?: SoundConfig[];
}

// Aufgelöste HA-Medien-Links sind signiert und gelten eine Stunde – 50 min merken
const resolved = new Map<string, { url: string; until: number }>();

/** Ton (ID, Link oder media-source://…) → abspielbarer Link */
export const resolveSound = async (sound: string, ctx: SoundContext = {}): Promise<string> => {
  const own = ctx.library?.find((s) => s.id === sound);
  const source = own?.url ?? sound;
  if (!source.startsWith("media-source://")) return soundUrl(source);
  const hit = resolved.get(source);
  if (hit && hit.until > Date.now()) return hit.url;
  if (!ctx.hass) throw new Error("media-source ohne Home Assistant");
  const res = await ctx.hass.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: source, expires: 3600 });
  const url = new URL(res.url, location.href).href;
  resolved.set(source, { url, until: Date.now() + 50 * 60e3 });
  return url;
};

interface Fully {
  playSound?: (url: string, loop: boolean) => void;
  stopSound?: () => void;
  setAudioVolume?: (level: number, stream: number) => void;
}

/** Android-Tonkanal „Medien“ – darüber spielt Fully Töne ab */
const STREAM_MUSIC = 3;

let current: HTMLAudioElement | undefined;

/** Ton abspielen; Lautstärke 0–100. In Fully stellt sie die Medienlautstärke des Tablets ein. */
export const playSound = async (sound: string, volume = 70, ctx: SoundContext = {}): Promise<void> => {
  let url: string;
  try {
    url = await resolveSound(sound, ctx);
  } catch (err) {
    console.warn("Ambiframe: Ton nicht abspielbar:", sound, err);
    return;
  }
  const fully = (window as unknown as { fully?: Fully }).fully;
  if (fully?.playSound) {
    try {
      fully.setAudioVolume?.(Math.max(0, Math.min(100, Math.round(volume))), STREAM_MUSIC);
    } catch {
      /* ältere Fully-Version – dann mit der eingestellten Lautstärke */
    }
    fully.playSound(url, false);
    return;
  }
  current?.pause();
  current = new Audio(url);
  current.volume = Math.max(0, Math.min(1, volume / 100));
  void current.play().catch(() => {
    /* Autoplay gesperrt – ohne Ton weiter */
  });
};

export const stopSound = (): void => {
  const fully = (window as unknown as { fully?: Fully }).fully;
  fully?.stopSound?.();
  current?.pause();
  current = undefined;
};
