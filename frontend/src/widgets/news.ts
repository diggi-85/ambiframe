// Nachrichten: großes Bild mit Schlagzeile, Liste oder Laufband – die Feeds holt der Server (ambiframe/news)
import { t } from "../i18n";
import { css, html, nothing, type PropertyValues } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { ago } from "../util";
import { AfWidget, define } from "./base";

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  image: string;
  source: string;
  published: string | null;
}

/** Fertige Quellen – Kennungen wie in news.py (PRESETS) */
export const NEWS_PRESETS: [string, string][] = [
  ["tagesschau", "tagesschau"],
  ["ntv", "n-tv"],
  ["spiegel", "SPIEGEL"],
];

const REFRESH_MS = 10 * 60e3;

/** Gleiche Feeds → eine gemeinsame Anfrage für alle Widgets; Ergebnis 10 min merken */
const cache = new Map<string, { at: number; items: NewsItem[]; pending?: Promise<NewsItem[]> }>();
const loadNews = (hass: Hass, feeds: string[]): Promise<NewsItem[]> => {
  const key = feeds.join("|");
  const entry = cache.get(key);
  if (entry?.pending) return entry.pending;
  if (entry && Date.now() - entry.at < REFRESH_MS) return Promise.resolve(entry.items);
  const pending = hass
    .callWS<{ items?: NewsItem[] }>({ type: "ambiframe/news", feeds, limit: 30 })
    .then((r) => r.items ?? [])
    .catch(() => entry?.items ?? [])
    .then((items) => {
      // Bei Fehlern in einer Minute erneut versuchen, sonst in zehn
      cache.set(key, { at: items.length ? Date.now() : Date.now() - REFRESH_MS + 60e3, items });
      return items;
    });
  cache.set(key, { at: entry?.at ?? 0, items: entry?.items ?? [], pending });
  return pending;
};

const preload = (url: string): Promise<void> =>
  new Promise((resolve) => {
    if (!url) return resolve();
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = url;
  });

/**
 * Nachrichten. Optionen: feeds (Liste: tagesschau, ntv, spiegel oder RSS-Adressen), variant (hero | list | ticker),
 * interval (s, Wechsel im Großbild), max (Anzahl), label, speed (Laufband, px/s).
 */
class AfNews extends AfWidget {
  static properties = { ...AfWidget.properties, items: { state: true }, idx: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
      }
      /* Großbild: Foto der Meldung, darüber Quelle, Schlagzeile und Anriss – Schrift immer hell */
      .hero {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: var(--af-card-radius, 28px);
        background: #111;
        --af-ink: #fff;
        --af-ink-2: rgba(255, 255, 255, 0.8);
        --af-ink-3: rgba(255, 255, 255, 0.6);
        color: var(--af-ink);
      }
      .img {
        position: absolute;
        inset: 0;
        background: #1a1a1a center / cover no-repeat;
      }
      .img.cur {
        animation: news-in 1.4s var(--af-ease-soft, ease) backwards, drift var(--t, 16s) linear both;
      }
      @keyframes news-in {
        from {
          opacity: 0;
        }
      }
      @keyframes drift {
        from {
          transform: scale(1.02);
        }
        to {
          transform: scale(1.08);
        }
      }
      .grad {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0.5) 34%, rgba(0, 0, 0, 0) 62%);
      }
      .txt {
        position: absolute;
        left: 44px;
        right: 44px;
        bottom: 40px;
        animation: text-in 1s var(--af-ease, ease) 0.3s backwards;
      }
      @keyframes text-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
      }
      .meta {
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
        font-weight: 500;
      }
      .meta b {
        color: #fff;
        font-weight: 600;
      }
      .title {
        font-size: 50px;
        line-height: 1.08;
        margin-top: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-wrap: balance;
      }
      .sum {
        font-size: calc(20px * var(--af-fs, 1));
        line-height: 1.45;
        color: var(--af-ink-2);
        margin-top: 14px;
        max-width: 900px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .dots {
        position: absolute;
        right: 44px;
        top: 34px;
        display: flex;
        gap: 6px;
      }
      .dots i {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.35);
        transition: width 0.6s var(--af-ease, ease), background 0.6s;
      }
      .dots i.on {
        width: 22px;
        background: #fff;
      }

      /* Liste */
      .rows {
        display: flex;
        flex-direction: column;
        gap: 18px;
        margin-top: 18px;
      }
      .row {
        display: flex;
        gap: 18px;
        align-items: center;
      }
      .thumb {
        width: 132px;
        height: 84px;
        flex: none;
        border-radius: 12px;
        background: var(--af-surface) center / cover no-repeat;
      }
      .rt {
        font-size: calc(20px * var(--af-fs, 1));
        line-height: 1.25;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .rm {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 4px;
      }

      /* Laufband */
      .tick {
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
        mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
      }
      .track {
        display: flex;
        white-space: nowrap;
        will-change: transform;
        animation: marquee 120s linear infinite;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .track span {
        padding-right: 22px;
      }
      .track b {
        color: var(--af-accent);
        font-weight: 500;
        margin-right: 10px;
      }
      .track .sep {
        color: var(--af-ink-3);
      }
      @keyframes marquee {
        to {
          transform: translateX(-50%);
        }
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
      @media (prefers-reduced-motion: reduce) {
        .img.cur,
        .track {
          animation: none;
        }
      }
    `,
  ];

  private items: NewsItem[] = [];
  private idx = 0;
  private prevImage = "";
  private rotateTimer?: number;
  private refreshTimer?: number;
  private feedsKey = "";

  private get feeds(): string[] {
    // Text („tagesschau“) oder aus dem Editor-Listenfeld {value: …}
    const f = (Array.isArray(this.options.feeds) ? this.options.feeds : [])
      .map((x: unknown) => (typeof x === "string" ? x : (x as { value?: string })?.value))
      .filter((x: unknown): x is string => !!x);
    return f.length ? f : ["tagesschau"];
  }

  /** Großbild zeigt nur Meldungen mit Bild */
  private get heroItems(): NewsItem[] {
    const withImage = this.items.filter((i) => i.image);
    return (withImage.length ? withImage : this.items).slice(0, Number(this.options.max ?? 8));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.refreshTimer = window.setInterval(() => void this.load(), REFRESH_MS + 5e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.refreshTimer);
    clearTimeout(this.rotateTimer);
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    // Neue HA-Zustände betreffen die Nachrichten nicht
    return !(changed.size === 1 && changed.has("hass")) || !this.items.length;
  }

  protected willUpdate(changed: PropertyValues): void {
    const key = this.feeds.join("|");
    if (this.hass && (key !== this.feedsKey || changed.has("options"))) {
      this.feedsKey = key;
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.hass) return;
    const items = await loadNews(this.hass, this.feeds);
    if (!items.length && this.items.length) return; // lieber alte Meldungen als gar keine
    this.items = items;
    if (this.idx >= this.heroItems.length) this.idx = 0;
    if ((this.options.variant ?? "hero") === "hero") this.schedule();
  }

  private schedule(): void {
    clearTimeout(this.rotateTimer);
    const secs = Math.max(5, Number(this.options.interval ?? 14));
    this.rotateTimer = window.setTimeout(() => void this.advance(), secs * 1000);
  }

  /** Nächste Meldung: Bild erst laden, dann weich überblenden */
  private async advance(): Promise<void> {
    const list = this.heroItems;
    if (list.length > 1) {
      const next = (this.idx + 1) % list.length;
      await preload(list[next].image);
      this.prevImage = list[this.idx]?.image ?? "";
      this.idx = next;
    }
    this.schedule();
  }

  protected updated(): void {
    // Laufband: gleichmäßiges Tempo (~45 px/s), egal wie lang die Schlagzeilen sind
    const track = this.renderRoot.querySelector<HTMLElement>(".track");
    if (track) {
      const half = track.scrollWidth / 2;
      const speed = Number(this.options.speed ?? 45);
      if (half > 0) track.style.animationDuration = `${Math.round(half / speed)}s`;
    }
  }

  render() {
    const variant = this.options.variant ?? "hero";
    if (!this.items.length) {
      return html`<div class="calm">${this.options.empty_text ?? t("Nachrichten werden geladen …")}</div>`;
    }
    if (variant === "ticker") {
      const list = this.items.slice(0, Number(this.options.max ?? 12));
      const run = list.map((i) => html`<span><b>${i.source}</b>${i.title}</span><span class="sep">•</span>`);
      return html`<div class="tick"><div class="track">${run}${run}</div></div>`;
    }
    if (variant === "list") {
      const list = this.items.slice(0, Number(this.options.max ?? 4));
      return html`${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Nachrichten")}</div>`}
        <div class="rows">
          ${list.map(
            (i) => html`<div class="row">
              ${i.image ? html`<div class="thumb" style="background-image:url('${i.image}')"></div>` : nothing}
              <div>
                <div class="rt">${i.title}</div>
                <div class="rm">${i.source}${i.published ? ` · ${ago(i.published)}` : ""}</div>
              </div>
            </div>`,
          )}
        </div>`;
    }
    const list = this.heroItems;
    const item = list[this.idx] ?? list[0];
    const secs = Math.max(5, Number(this.options.interval ?? 14));
    return html`<div class="hero">
      ${this.prevImage ? html`<div class="img" style="background-image:url('${this.prevImage}')"></div>` : nothing}
      ${item.image ? keyed(item.image, html`<div class="img cur" style="background-image:url('${item.image}');--t:${secs + 2}s"></div>`) : nothing}
      <div class="grad"></div>
      ${keyed(
        item.title,
        html`<div class="txt">
          <div class="meta"><b>${item.source}</b>${item.published ? ` · ${ago(item.published)}` : ""}</div>
          <div class="title display">${item.title}</div>
          ${item.summary ? html`<div class="sum">${item.summary}</div>` : nothing}
        </div>`,
      )}
      ${list.length > 1 ? html`<div class="dots">${list.map((_, i) => html`<i class=${i === this.idx ? "on" : ""}></i>`)}</div>` : nothing}
    </div>`;
  }
}

define("af-news", AfNews);
