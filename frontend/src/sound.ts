// Töne für Ereignisse: mitgelieferte Klänge oder eigener Link. Auf dem Tablet über Fully (umgeht die Autoplay-Sperre),
// sonst über <audio> – dort klappt es erst, nachdem einmal auf den Bildschirm getippt wurde.

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

interface Fully {
  playSound?: (url: string, loop: boolean) => void;
  stopSound?: () => void;
  setAudioVolume?: (level: number, stream: number) => void;
}

/** Android-Tonkanal „Medien“ – darüber spielt Fully Töne ab */
const STREAM_MUSIC = 3;

let current: HTMLAudioElement | undefined;

/** Ton abspielen; Lautstärke 0–100. In Fully stellt sie die Medienlautstärke des Tablets ein. */
export const playSound = (sound: string, volume = 70): void => {
  const url = soundUrl(sound);
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
