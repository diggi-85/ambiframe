// Pixel-Anzeige im Stil einer LED-Uhr: links ein farbiges 8×8-Symbol, rechts ein Wert in Punktschrift.
// Mehrere Infos wechseln sich ab (kurzes Hochschieben), unten Punkte für die Position – wie die Apps einer Pixel-Uhr.
import { css, html, nothing, svg } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { fontStack } from "../fonts";
import { locale } from "../i18n";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { fmt, isAvailable, stateOf } from "../util";
import { AfWidget, define } from "./base";

const COLORS: Record<string, string> = {
  y: "#ffc21a",
  o: "#ff8a1f",
  r: "#ff4d4d",
  p: "#ff4fd8",
  b: "#3fa9ff",
  c: "#3fe0f0",
  G: "#3ddc84",
  w: "#f2f2f2",
  g: "#8a8f98",
};

/** 8×8 Pixel; Buchstaben = Farben oben, „.“ = aus */
export const PIXEL_ICONS: Record<string, string[]> = {
  sun: ["y..y..y.", ".y.y.y..", "..yyy...", "yyyyyyy.", "..yyy...", ".y.y.y..", "y..y..y.", "........"],
  moon: ["..yyy...", ".yy.....", "yy......", "yy......", "yy......", ".yy.....", "..yyy...", "........"],
  cloud: ["........", "...ww...", "..wwww..", ".wwwwww.", "wwwwwwww", "wwwwwwww", ".wwwwww.", "........"],
  partly: ["y.y.....", ".yyy....", "yyyww...", ".ywwww..", "y.wwwwww", ".wwwwwww", "..wwwww.", "........"],
  rain: ["...ww...", "..wwww..", ".wwwwww.", "wwwwwwww", ".wwwwww.", "........", ".b.b.b..", "b.b.b..."],
  snow: ["...ww...", "..wwww..", ".wwwwww.", "wwwwwwww", ".wwwwww.", "........", ".w..w..w", "w..w..w."],
  bolt: ["....yy..", "...yy...", "..yy....", ".yyyyy..", "...yy...", "..yy....", ".yy.....", ".y......"],
  drop: ["...b....", "...b....", "..bbb...", ".bbbbb..", ".bbbbb..", ".bbbbb..", "..bbb...", "........"],
  thermo: ["...rr...", "...wr...", "...wr...", "...wr...", "...rr...", "..rrrr..", "..rrrr..", "...rr..."],
  home: ["...o....", "..ooo...", ".ooooo..", "ooooooo.", ".w...w..", ".w.o.w..", ".w.o.w..", ".wwwww.."],
  bell: ["...y....", "..yyy...", ".yyyyy..", ".yyyyy..", ".yyyyy..", "yyyyyyy.", "........", "...y...."],
  music: ["..pppppp", "..p....p", "..p....p", "..p....p", "ppp..ppp", "ppp..ppp", "........", "........"],
  bin: ["..gggg..", "gggggggg", ".gGgGgg.", ".gGgGgg.", ".gGgGgg.", ".gGgGgg.", ".gggggg.", "........"],
  car: ["........", "..cccc..", ".c.cc.c.", "cccccccc", "cccccccc", ".w....w.", "........", "........"],
  heart: [".rr.rr..", "rrrrrrr.", "rrrrrrr.", "rrrrrrr.", ".rrrrr..", "..rrr...", "...r....", "........"],
  check: ["........", "......G.", ".....GG.", "G...GG..", "GG.GG...", ".GGG....", "..G.....", "........"],
  clock: ["..www...", ".w.y.w..", "w..y..w.", "w..yy.w.", "w.....w.", ".w...w..", "..www...", "........"],
  calendar: ["r.r.r...", "rrrrrrr.", "wwwwwww.", "w.w.w.w.", "wwwwwww.", "w.w.w.w.", "wwwwwww.", "........"],
  leaf: [".....GG.", "...GGGG.", "..GGGGG.", ".GGGGGG.", ".GGGGG..", ".GGGG...", "G.......", "........"],
  battery: ["..gg....", ".gggg...", ".gGGg...", ".gGGg...", ".gGGg...", ".gGGg...", ".gggg...", "........"],
  euro: ["..oooo..", ".o....o.", "oooo....", ".o......", "oooo....", ".o....o.", "..oooo..", "........"],
};

const WEATHER: Record<string, string> = {
  sunny: "sun",
  "clear-night": "moon",
  partlycloudy: "partly",
  cloudy: "cloud",
  fog: "cloud",
  rainy: "rain",
  pouring: "rain",
  "snowy-rainy": "snow",
  snowy: "snow",
  lightning: "bolt",
  "lightning-rainy": "bolt",
  windy: "cloud",
};

export interface PixelItem {
  /** time | date – sonst Wert einer Entität (Wetter: Temperatur mit passendem Symbol) oder fester Text */
  type?: string;
  entity?: string;
  attribute?: string;
  text?: string;
  icon?: string;
  unit?: string;
  decimals?: number;
  color?: string;
}

/** Text und Symbol eines Eintrags – kurz und in Großbuchstaben wie auf einer LED-Anzeige */
export const pixelFrame = (hass: Hass | undefined, item: PixelItem, now = new Date()): { icon: string; text: string } => {
  if (item.type === "time") return { icon: item.icon ?? "clock", text: now.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }) };
  if (item.type === "date")
    return {
      icon: item.icon ?? "calendar",
      text: now.toLocaleDateString(locale(), { weekday: "short", day: "numeric" }).replace(/[.,]/g, "").toUpperCase(),
    };
  if (item.text) return { icon: item.icon ?? "check", text: item.text.toUpperCase() };
  const s = stateOf(hass, item.entity);
  if (!s || !isAvailable(s)) return { icon: item.icon ?? "check", text: "--" };
  if (item.entity!.startsWith("weather.") && !item.attribute) {
    const temp = Number(s.attributes.temperature);
    return { icon: item.icon ?? WEATHER[s.state] ?? "cloud", text: Number.isFinite(temp) ? `${Math.round(temp)}°` : "--" };
  }
  const raw = String(item.attribute ? s.attributes[item.attribute] : s.state).trim();
  const unit = item.unit ?? (item.attribute ? "" : ((s.attributes.unit_of_measurement as string | undefined) ?? ""));
  const n = Number(raw);
  // Zahlen kompakt: ab 100 ohne Nachkommastellen; °C und % direkt am Wert
  const value = raw !== "" && Number.isFinite(n) ? fmt(n, item.decimals ?? (Math.abs(n) >= 100 || Number.isInteger(n) ? 0 : 1)) : raw;
  const suffix = unit === "°C" || unit === "°F" ? "°" : unit === "%" ? "%" : unit ? ` ${unit}` : "";
  return { icon: item.icon ?? "check", text: `${value}${suffix}`.toUpperCase() };
};

/**
 * Pixel-Anzeige. Optionen: items [{type: time|date, entity, attribute, text, icon (Pixel-Symbol), unit, decimals, color}]
 * (leer = Uhrzeit, Wetter, Datum), interval (Sekunden je Info, Standard 6), frame (schwarzes Gehäuse, Standard an).
 */
class AfPixel extends AfWidget {
  static properties = { ...AfWidget.properties, idx: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        container-type: size;
        display: grid;
        place-items: center;
      }
      .dev {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 6cqh;
        padding: 10cqh 8cqh;
        border-radius: min(14cqh, 40px);
        overflow: hidden;
        font-family: var(--pixel-font);
        font-weight: 800;
        color: var(--c, var(--af-ink));
      }
      .dev.frame {
        color: var(--c, #f2f2f2);
        background:
          radial-gradient(rgba(255, 255, 255, 0.05) 1.2px, transparent 1.6px) 0 0 / 8px 8px,
          linear-gradient(180deg, #121212, #050505);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          0 18px 40px rgba(0, 0, 0, 0.35);
      }
      .slide {
        display: flex;
        align-items: center;
        gap: 6cqh;
        flex: 1;
        min-width: 0;
        height: 100%;
        animation: up 0.5s cubic-bezier(0.22, 0.8, 0.24, 1) both;
      }
      @keyframes up {
        from {
          transform: translateY(60%);
          opacity: 0;
        }
      }
      svg {
        height: 70cqh;
        width: 70cqh;
        flex: none;
      }
      .text {
        flex: 1;
        min-width: 0;
        text-align: center;
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 0 3cqh color-mix(in srgb, currentColor 45%, transparent);
      }
      .dots {
        position: absolute;
        left: 50%;
        bottom: 4cqh;
        transform: translateX(-50%);
        display: flex;
        gap: 2.4cqh;
      }
      .dots i {
        width: 3cqh;
        height: 3cqh;
        background: currentColor;
        opacity: 0.25;
      }
      .dots i.on {
        opacity: 0.9;
      }
      @media (prefers-reduced-motion: reduce) {
        .slide {
          animation: none;
        }
      }
    `,
  ];

  private idx = 0;
  private timer?: number;

  private get items(): PixelItem[] {
    const own = (this.options.items ?? []) as PixelItem[];
    if (own.length) return own;
    const weather = Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith("weather."));
    return [{ type: "time" }, ...(weather ? [{ entity: weather }] : []), { type: "date" }];
  }

  protected watched() {
    return this.items.map((i) => i.entity);
  }

  connectedCallback(): void {
    super.connectedCallback();
    const tick = () => {
      this.idx++;
      this.requestUpdate();
      this.timer = window.setTimeout(tick, Math.max(2, Number(this.options.interval ?? 6)) * 1000);
    };
    this.timer = window.setTimeout(tick, Math.max(2, Number(this.options.interval ?? 6)) * 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
  }

  private icon(name: string) {
    const rows = PIXEL_ICONS[name] ?? PIXEL_ICONS.check;
    return svg`<svg viewBox="0 0 8 8">${rows.flatMap((row, y) =>
      [...row].map((ch, x) => (ch === "." ? nothing : svg`<rect x=${x + 0.08} y=${y + 0.08} width="0.84" height="0.84" rx="0.12" fill=${COLORS[ch] ?? "#fff"} />`)),
    )}</svg>`;
  }

  render() {
    const items = this.items;
    const i = this.idx % items.length;
    const item = items[i];
    const f = pixelFrame(this.hass, item);
    // Schrift passend zur Länge: lange Werte kleiner, damit nichts abgeschnitten wird
    const size = `min(46cqh, calc((100cqw - 96cqh) / ${(Math.max(3, f.text.length) * 0.72).toFixed(2)}))`;
    return html`<div class="dev ${this.options.frame === false ? "" : "frame"}" style="--pixel-font:${fontStack("doto")};${item.color ? `--c:${item.color}` : ""}">
      ${keyed(i, html`<div class="slide">${this.icon(f.icon)}<div class="text num" style="font-size:${size}">${f.text}</div></div>`)}
      ${items.length > 1 ? html`<div class="dots">${items.map((_, n) => html`<i class=${n === i ? "on" : ""}></i>`)}</div>` : nothing}
    </div>`;
  }
}

define("af-pixel", AfPixel);
