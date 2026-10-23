// Wortuhr: Buchstabengitter, in dem die Uhrzeit als Satz aufleuchtet („ES IST FÜNF VOR HALB DREI“), dazu vier
// Minutenpunkte in den Ecken. Gitter für Deutsch, Englisch, Niederländisch und Französisch.
import { css, html, nothing } from "lit";
import { lang, type Lang } from "../i18n";
import { widgetStyles } from "../styles";
import { AfTickingWidget, define } from "./base";

interface Clock {
  rows: string[];
  /** Wörter in Lesereihenfolge; „WORT@3“ = erst ab Zeile 3 suchen (für doppelte Wörter) */
  words: (h: number, m: number) => string[];
}

const h12 = (h: number) => ((h + 11) % 12) + 1;

const DE_HOURS = ["", "EINS@5", "ZWEI@5", "DREI@6", "VIER@6", "FÜNF@4", "SECHS@7", "SIEBEN@8", "ACHT@7", "NEUN@9", "ZEHN@9", "ELF@4", "ZWÖLF@8"];
const EN_HOURS = ["", "ONE@5", "TWO@6", "THREE@5", "FOUR@6", "FIVE@6", "SIX@5", "SEVEN@8", "EIGHT@7", "NINE@4", "TEN@9", "ELEVEN@7", "TWELVE@8"];
const NL_HOURS = ["", "EEN@4", "TWEE@5", "DRIE@5", "VIER@6", "VIJF@6", "ZES@6", "ZEVEN@7", "ACHT@8", "NEGEN@7", "TIEN@8", "ELF@8", "TWAALF@9"];
const FR_HOURS = ["", "UNE@2", "DEUX@0", "TROIS@1", "QUATRE@1", "CINQ@3", "SIX@3", "SEPT@2", "HUIT@3", "NEUF@2", "DIX@4", "ONZE@5"];

export const CLOCKS: Record<Lang, Clock> = {
  de: {
    rows: ["ESKISTAFÜNF", "ZEHNZWANZIG", "DREIVIERTEL", "VORFUNKNACH", "HALBAELFÜNF", "EINSXAMZWEI", "DREIPMJVIER", "SECHSNLACHT", "SIEBENZWÖLF", "ZEHNEUNKUHR"],
    words: (h, m) => {
      const hour = (n: number) => DE_HOURS[h12(n)];
      const next = hour(h + 1);
      return [
        "ES",
        "IST",
        ...[
          [h12(h) === 1 ? "EIN@5" : hour(h), "UHR"],
          ["FÜNF", "NACH", hour(h)],
          ["ZEHN", "NACH", hour(h)],
          ["VIERTEL", "NACH", hour(h)],
          ["ZWANZIG", "NACH", hour(h)],
          ["FÜNF", "VOR", "HALB", next],
          ["HALB", next],
          ["FÜNF", "NACH", "HALB", next],
          ["ZWANZIG", "VOR", next],
          ["VIERTEL", "VOR", next],
          ["ZEHN", "VOR", next],
          ["FÜNF", "VOR", next],
        ][m / 5],
      ];
    },
  },
  en: {
    rows: ["ITLISASAMPM", "ACQUARTERDC", "TWENTYFIVEX", "HALFSTENFTO", "PASTERUNINE", "ONESIXTHREE", "FOURFIVETWO", "EIGHTELEVEN", "SEVENTWELVE", "TENSEOCLOCK"],
    words: (h, m) => {
      const now = EN_HOURS[h12(h)];
      const next = EN_HOURS[h12(h + 1)];
      return [
        "IT",
        "IS",
        ...[
          [now, "OCLOCK"],
          ["FIVE", "PAST", now],
          ["TEN", "PAST", now],
          ["A@1", "QUARTER", "PAST", now],
          ["TWENTY", "PAST", now],
          ["TWENTY", "FIVE", "PAST", now],
          ["HALF", "PAST", now],
          ["TWENTY", "FIVE", "TO", next],
          ["TWENTY", "TO", next],
          ["A@1", "QUARTER", "TO", next],
          ["TEN", "TO", next],
          ["FIVE", "TO", next],
        ][m / 5],
      ];
    },
  },
  nl: {
    rows: ["HETKISAVIJF", "TIENATZVOOR", "OVERMEKWART", "HALFSPMOVER", "VOORTHGEENS", "TWEEAMCDRIE", "VIERVIJFZES", "ZEVENONEGEN", "ACHTTIENELF", "TWAALFPMUUR"],
    words: (h, m) => {
      const now = NL_HOURS[h12(h)];
      const next = NL_HOURS[h12(h + 1)];
      return [
        "HET",
        "IS",
        ...[
          [now, "UUR"],
          ["VIJF", "OVER", now],
          ["TIEN", "OVER", now],
          ["KWART", "OVER", now],
          ["TIEN", "VOOR", "HALF", next],
          ["VIJF", "VOOR", "HALF", next],
          ["HALF", next],
          ["VIJF", "OVER", "HALF", next],
          ["TIEN", "OVER", "HALF", next],
          ["KWART", "VOOR", next],
          ["TIEN", "VOOR", next],
          ["VIJF", "VOOR", next],
        ][m / 5],
      ];
    },
  },
  fr: {
    rows: ["ILNESTODEUX", "QUATRETROIS", "NEUFUNESEPT", "HUITSIXCINQ", "MIDIXMINUIT", "ONZERHEURES", "MOINSOLEDIX", "ETRQUARTPMD", "VINGT-CINQU", "ETSDEMIEPAM"],
    words: (h, m) => {
      // Ab „moins vingt-cinq“ zählt die nächste Stunde; 0 Uhr = minuit, 12 Uhr = midi (ohne „heures“)
      const hh = (m >= 35 ? h + 1 : h) % 24;
      const noon = hh === 0 || hh === 12;
      const hour = hh === 0 ? ["MINUIT@4"] : hh === 12 ? ["MIDI@4"] : [FR_HOURS[hh % 12], hh % 12 === 1 ? "HEURE@5" : "HEURES@5"];
      return [
        "IL",
        "EST",
        ...hour,
        ...[
          [],
          ["CINQ@8"],
          ["DIX@6"],
          ["ET@7", "QUART"],
          ["VINGT@8"],
          ["VINGT-CINQ@8"],
          ["ET@9", noon ? "DEMI" : "DEMIE"],
          ["MOINS", "VINGT-CINQ@8"],
          ["MOINS", "VINGT@8"],
          ["MOINS", "LE", "QUART"],
          ["MOINS", "DIX@6"],
          ["MOINS", "CINQ@8"],
        ][m / 5],
      ];
    },
  },
};

/** Leuchtende Zellen („Zeile,Spalte“) für eine Uhrzeit, ab dem Wort `skip` – null, wenn ein Wort nicht im Gitter steht */
export const litCells = (l: Lang, h: number, minute: number, skip = 0): Set<string> | null => {
  const clock = CLOCKS[l];
  const m = minute - (minute % 5);
  const lit = new Set<string>();
  let row = 0;
  let col = 0;
  clock.words(h, m).forEach((token, n) => {
    if (row < 0) return;
    const [word, from] = token.split("@");
    for (let r = Math.max(row, Number(from ?? 0)); r < clock.rows.length; r++) {
      const idx = clock.rows[r].indexOf(word, r === row ? col : 0);
      if (idx < 0) continue;
      if (n >= skip) for (let i = 0; i < word.length; i++) lit.add(`${r},${idx + i}`);
      row = r;
      col = idx + word.length;
      return;
    }
    row = -1;
  });
  return row < 0 ? null : lit;
};

const FACES: Record<string, string> = {
  black: "--face:#0c0c0c;--lit:#ffffff;--dim:rgba(255,255,255,0.08)",
  white: "--face:#f3f2ee;--lit:#141414;--dim:rgba(0,0,0,0.07)",
  brass: "--face:linear-gradient(135deg,#b8945c,#7a5d33);--lit:#fff8e6;--dim:rgba(40,25,5,0.18)",
  copper: "--face:linear-gradient(135deg,#b06a48,#6e3a22);--lit:#ffeee2;--dim:rgba(40,15,5,0.2)",
  accent: "--face:var(--af-accent);--lit:#ffffff;--dim:rgba(0,0,0,0.12)",
};

/**
 * Wortuhr. Optionen: face (leer = Hintergrund der Seite, black, white, brass, copper, accent), color (Leuchtfarbe,
 * Standard je Front), font (display = Schrift des Stils für Uhr/Titel, sonst Text-Schrift), glow (Leuchten, Standard an),
 * dots (Minutenpunkte, Standard an), prefix („ES IST“ zeigen, Standard an), language (Standard: wie die Anzeige).
 */
class AfWordclock extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
        display: grid;
        place-items: center;
      }
      .face {
        --size: min(100cqw, 100cqh);
        position: relative;
        width: var(--size);
        height: var(--size);
        box-sizing: border-box;
        padding: calc(var(--size) * 0.13);
        background: var(--face, transparent);
        border-radius: calc(var(--size) * 0.025);
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        grid-template-rows: repeat(10, 1fr);
        place-items: center;
        font-size: calc(var(--size) * 0.052);
        font-weight: 500;
        color: var(--dim, color-mix(in srgb, var(--af-ink) 10%, transparent));
        user-select: none;
      }
      .face.display {
        font-family: var(--af-display);
        font-weight: 400;
      }
      .face span {
        transition:
          color 1.4s ease,
          text-shadow 1.4s ease;
      }
      .face span.on {
        color: var(--lit, var(--af-ink));
        text-shadow: var(--shine, none);
      }
      .dot {
        position: absolute;
        width: calc(var(--size) * 0.018);
        height: calc(var(--size) * 0.018);
        border-radius: 50%;
        background: var(--dim, color-mix(in srgb, var(--af-ink) 10%, transparent));
        transition: background 1.4s ease;
      }
      .dot.on {
        background: var(--lit, var(--af-ink));
        box-shadow: var(--shine, none);
      }
      .d1 {
        left: 5.5%;
        top: 5.5%;
      }
      .d2 {
        right: 5.5%;
        top: 5.5%;
      }
      .d3 {
        right: 5.5%;
        bottom: 5.5%;
      }
      .d4 {
        left: 5.5%;
        bottom: 5.5%;
      }
    `,
  ];

  render() {
    const o = this.options;
    const l = CLOCKS[o.language as Lang] ? (o.language as Lang) : lang();
    const now = new Date();
    // „ES IST“ auf Wunsch weglassen: die ersten beiden Wörter leuchten dann nicht
    const lit = litCells(l, now.getHours(), now.getMinutes(), o.prefix === false ? 2 : 0) ?? new Set();
    const color = o.color as string | undefined;
    const style = [
      FACES[o.face as string] ?? "",
      color ? `--lit:${color}` : "",
      o.glow === false ? "" : "--shine:0 0 0.45em color-mix(in srgb, var(--lit, var(--af-ink)) 55%, transparent)",
    ]
      .filter(Boolean)
      .join(";");
    const dots = now.getMinutes() % 5;
    return html`<div class="face ${o.font === "display" ? "display" : ""}" style=${style} role="img" aria-label=${now.toLocaleTimeString()}>
      ${CLOCKS[l].rows.map((row, r) => [...row].map((ch, c) => html`<span class=${lit.has(`${r},${c}`) ? "on" : ""}>${ch}</span>`))}
      ${o.dots === false ? nothing : [1, 2, 3, 4].map((i) => html`<i class="dot d${i} ${i <= dots ? "on" : ""}"></i>`)}
    </div>`;
  }
}

define("af-wordclock", AfWordclock);
