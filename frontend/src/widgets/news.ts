// Nachrichten: großes Bild mit Schlagzeile, Liste oder Laufband – die Feeds holt der Server (ambiframe/news)
import { lang, t } from "../i18n";
import { css, html, nothing, type PropertyValues } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { ago, fmtTime, nextInRound, tickerKey, videoRatio, type TickerDetail, type TickerLine } from "../util";
import { TickerLane, tickerLineTpl } from "../ticker-lane";
import { AfWidget, define } from "./base";

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  image: string;
  source: string;
  published: string | null;
  /** Logo der Website (apple-touch-icon oder Favicon) */
  icon?: string;
}

/** Quellen abwechselnd statt nur nach Zeit (sonst überdeckt eine fleißige Quelle die anderen); je Quelle neueste zuerst */
export const interleave = (items: NewsItem[]): NewsItem[] => {
  const by = new Map<string, NewsItem[]>();
  for (const i of items) by.set(i.source, [...(by.get(i.source) ?? []), i]);
  const lists = [...by.values()];
  return Array.from({ length: Math.max(0, ...lists.map((l) => l.length)) }, (_, n) => lists.map((l) => l[n]).filter(Boolean)).flat();
};

/** Logo vor dem Namen der Quelle – lädt es nicht, verschwindet es */
const srcIcon = (i: NewsItem) =>
  i.icon ? html`<img class="src-ico" src=${i.icon} alt="" loading="lazy" @error=${(e: Event) => ((e.target as HTMLElement).hidden = true)} />` : nothing;
const srcIconStyle = css`
  .src-ico {
    height: 1.1em;
    width: 1.1em;
    object-fit: contain;
    border-radius: 0.22em;
    vertical-align: -0.2em;
    margin-right: 0.4em;
    background: #fff;
  }
`;

/** Fertige Quellen – Kennungen wie in news.py (PRESETS); jede RSS-, Atom- oder RDF-Adresse geht ebenso */
export const NEWS_PRESETS: [string, string][] = [
  ["tagesschau", "tagesschau (DE)"],
  ["ntv", "n-tv (DE)"],
  ["spiegel", "SPIEGEL (DE)"],
  ["zdf", "ZDFheute (DE)"],
  ["dlf", "Deutschlandfunk (DE)"],
  ["zeit", "ZEIT ONLINE (DE)"],
  ["faz", "FAZ (DE)"],
  ["sz", "Süddeutsche Zeitung (DE)"],
  ["heise", "heise online (DE)"],
  ["orf", "ORF (AT)"],
  ["srf", "SRF News (CH)"],
  ["bbc", "BBC News (UK)"],
  ["bbc_world", "BBC World (UK)"],
  ["guardian", "The Guardian (UK)"],
  ["sky", "Sky News (UK)"],
  ["npr", "NPR (US)"],
  ["nyt", "New York Times (US)"],
  ["abc_us", "ABC News (US)"],
  ["cbc", "CBC News (CA)"],
  ["abc_au", "ABC News (AU)"],
  ["aljazeera", "Al Jazeera (EN)"],
  ["dw_en", "DW (EN)"],
  ["nos", "NOS (NL)"],
  ["nunl", "NU.nl (NL)"],
  ["vrtnws", "VRT NWS (BE)"],
  ["lemonde", "Le Monde (FR)"],
  ["franceinfo", "franceinfo (FR)"],
  ["rfi", "RFI (FR)"],
  ["lefigaro", "Le Figaro (FR)"],
];

/** Quellen, wenn im Widget keine gewählt sind – passend zur Sprache der Anzeige (wie DEFAULT_FEEDS in news.py) */
const DEFAULT_FEEDS: Record<string, string[]> = {
  de: ["tagesschau", "ntv", "spiegel"],
  en: ["bbc", "guardian", "npr"],
  nl: ["nos", "nunl", "vrtnws"],
  fr: ["lemonde", "franceinfo", "rfi"],
};
export const defaultFeeds = (): string[] => DEFAULT_FEEDS[lang()] ?? DEFAULT_FEEDS.en;

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

/** Feeds eines Widgets: Text („tagesschau“) oder aus dem Editor-Listenfeld {value: …}; leer = Vorgabe */
const feedsOf = (feeds: unknown, fallback: string[]): string[] => {
  const f = (Array.isArray(feeds) ? feeds : []).map((x: unknown) => (typeof x === "string" ? x : (x as { value?: string })?.value)).filter((x): x is string => !!x);
  return f.length ? f : fallback;
};

const preload = (url: string): Promise<void> =>
  new Promise((resolve) => {
    if (!url) return resolve();
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = url;
  });

/** Ken-Burns-Variante je Bild, stabil über die Adresse: Schwenk links/rechts, mal hinein-, mal herauszoomen */
export const kenBurnsVars = (url: string): string => {
  let h = 0;
  for (const c of url) h = (h * 31 + c.charCodeAt(0)) | 0;
  const v = Math.abs(h);
  const dir = v % 2 ? 1 : -1;
  const out = (v >> 1) % 3 === 0; // jedes dritte Bild zoomt heraus statt hinein
  const ox = [35, 50, 65][(v >> 3) % 3];
  return `--kb:${dir};--ox:${ox}%;--s0:${out ? 1.16 : 1.04};--s1:${out ? 1.04 : 1.16}`;
};

/**
 * Nachrichten. Optionen: feeds (Liste: tagesschau, ntv, spiegel oder RSS-Adressen), variant (hero | list | ticker),
 * interval (s, Wechsel im Großbild), max (Anzahl), label, speed (Laufband, px/s).
 */
class AfNews extends AfWidget {
  static properties = { ...AfWidget.properties, items: { state: true }, idx: { state: true }, lead: { attribute: false } };

  /** Laufband: Zeilen, die vor den Meldungen laufen (gemischtes Band: Laufband für Zuhause) */
  lead: TickerLine[] = [];

  static styles = [
    widgetStyles,
    srcIconStyle,
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
      /* Gesichter sitzen bei Pressefotos meist im oberen Drittel: Ausschnitt dort statt mittig, sonst halbe Köpfe */
      .img {
        position: absolute;
        inset: 0;
        background: #1a1a1a 50% 22% / cover no-repeat;
        transform-origin: var(--ox, 50%) 25%;
      }
      .img.cur {
        animation: news-in 1.4s var(--af-ease-soft, ease) backwards, drift var(--t, 16s) ease-in-out both;
      }
      @keyframes news-in {
        from {
          opacity: 0;
        }
      }
      /* Ken Burns: je Bild anders (Richtung über --kb), Zoom zum oberen Bildteil hin – der Kopf bleibt im Bild */
      @keyframes drift {
        from {
          transform: scale(var(--s0, 1.04)) translateX(calc(var(--kb, 1) * -1.5%));
        }
        to {
          transform: scale(var(--s1, 1.16)) translateX(calc(var(--kb, 1) * 1.5%));
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
        flex: none;
        will-change: transform;
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
      /* Zeilen von Zuhause im gemischten Band: kräftiger als die Meldungen */
      .track .home {
        color: var(--af-ink);
        font-weight: 500;
      }
      .track .home .ic {
        color: var(--af-accent);
        margin-right: 8px;
      }
      /* wie im Laufband für Zuhause: Musik-Cover und Logo der Warnquelle */
      .track .home .tk-art,
      .track .home .tk-logo {
        display: inline-block;
        vertical-align: -0.3em;
        height: 1.3em;
        margin-right: 8px;
        border-radius: 0.2em;
      }
      .track .home .tk-art {
        width: 1.3em;
        background: var(--af-surface) center / cover no-repeat;
      }
      .track .home .tk-logo {
        width: auto;
        max-width: 2.6em;
        object-fit: contain;
      }
      /* Warnungen (DWD, NINA) im gemischten Band: Warnfarbe, schwere fett */
      .track .home.warn,
      .track .home.bad,
      .track .home.warn .ic,
      .track .home.bad .ic {
        color: var(--af-alert);
      }
      .track .home.bad {
        font-weight: 700;
      }
      .track .home.tap {
        cursor: pointer;
      }
      .track .q {
        display: flex;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
      @media (prefers-reduced-motion: reduce) {
        .img.cur {
          animation: none;
        }
      }
    `,
  ];

  /** Tipp auf eine Zeile von Zuhause: das Display zeigt die Einzelheiten (statt das Dashboard zu öffnen) */
  private openDetail(e: Event, detail?: TickerDetail): void {
    if (!detail) return;
    e.stopPropagation(); // sonst erreicht derselbe Tipp die Bühne und schließt die Ansicht gleich wieder
    this.dispatchEvent(new CustomEvent("af-ticker", { detail, bubbles: true, composed: true }));
  }

  private items: NewsItem[] = [];
  private idx = 0;
  private prevImage = "";
  private prevTransform = "";
  private rotateTimer?: number;
  private refreshTimer?: number;
  private feedsKey = "";

  private get feeds(): string[] {
    return feedsOf(this.options.feeds, defaultFeeds());
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
    this.lane.stop();
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
    this.items = this.options.interleave ? interleave(items) : items;
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
      // Zoom und Schwenk des alten Bilds mitnehmen – sonst springt es beim Wechsel auf Anfang zurück
      const cur = this.renderRoot.querySelector<HTMLElement>(".img.cur");
      this.prevTransform = cur ? getComputedStyle(cur).transform : "";
      this.prevImage = list[this.idx]?.image ?? "";
      this.idx = next;
    }
    this.schedule();
  }

  /** Laufband: fortlaufende Spur wie das Laufband für Zuhause – neue Schlagzeilen kommen hinter die laufende */
  private seen = new Set<string>();
  private lane = new TickerLane({
    find: () => {
      const band = this.renderRoot.querySelector<HTMLElement>(".tick");
      const lane = band?.querySelector<HTMLElement>(".lane");
      return band && lane ? { band, lane } : undefined;
    },
    next: () => {
      const entries = this.tickerEntries();
      return entries.length ? nextInRound(entries, this.seen, (e) => e.key).tpl : undefined;
    },
    speed: () => Number(this.options.speed ?? 45),
    reset: () => this.seen.clear(),
  });

  private tickerEntries() {
    return [
      ...this.lead.map((l) => ({ key: `h|${tickerKey(l)}`, tpl: html`${tickerLineTpl(l, !!l.detail, (e) => this.openDetail(e, l.detail), "home")}<span class="sep">•</span>` })),
      ...this.items.slice(0, Number(this.options.max ?? 12)).map((i) => ({ key: `n|${i.title}`, tpl: html`<span><b>${srcIcon(i)}${i.source}</b>${i.title}</span><span class="sep">•</span>` })),
    ];
  }

  protected updated(): void {
    if (this.renderRoot.querySelector(".lane")) this.lane.start();
  }


  render() {
    const variant = this.options.variant ?? "hero";
    if (!this.items.length && !(variant === "ticker" && this.lead.length)) {
      return html`<div class="calm">${this.options.empty_text ?? t("Nachrichten werden geladen …")}</div>`;
    }
    if (variant === "ticker") {
      // Laufband nur, wo es flüssig läuft: nicht im Videostream und (ohne eigene Einstellung) nicht auf dem Fernseher
      if (this.ctx?.ticker === false) return nothing;
      // bei „weniger Bewegung“ steht die Liste still, sonst füllt TickerLane die Spur
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return html`<div class="tick"><div class="track">${this.tickerEntries().map((e) => e.tpl)}</div></div>`;
      return html`<div class="tick"><div class="track lane"></div></div>`;
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
                <div class="rm">${srcIcon(i)}${i.source}${i.published ? ` · ${ago(i.published)}` : ""}</div>
              </div>
            </div>`,
          )}
        </div>`;
    }
    const list = this.heroItems;
    const item = list[this.idx] ?? list[0];
    const secs = Math.max(5, Number(this.options.interval ?? 14));
    return html`<div class="hero">
      ${this.prevImage ? html`<div class="img" style="background-image:url('${this.prevImage}');${kenBurnsVars(this.prevImage)};transform:${this.prevTransform || "none"}"></div>` : nothing}
      ${item.image ? keyed(item.image, html`<div class="img cur" style="background-image:url('${item.image}');--t:${secs + 2}s;${kenBurnsVars(item.image)}"></div>`) : nothing}
      <div class="grad"></div>
      ${keyed(
        item.title,
        html`<div class="txt">
          <div class="meta"><b>${srcIcon(item)}${item.source}</b>${item.published ? ` · ${ago(item.published)}` : ""}</div>
          <div class="title display">${item.title}</div>
          ${item.summary ? html`<div class="sum">${item.summary}</div>` : nothing}
        </div>`,
      )}
      ${list.length > 1 ? html`<div class="dots">${list.map((_, i) => html`<i class=${i === this.idx ? "on" : ""}></i>`)}</div>` : nothing}
    </div>`;
  }
}

define("af-news", AfNews);

/* ───────────────────────── Video-Nachrichten ───────────────────────── */

export interface NewsVideo {
  title: string;
  url: string;
  poster?: string;
  duration?: number;
  /** Zeitpunkt der Ausgabe „2026-11-21T04:55“ */
  edition?: string;
}

/**
 * Video-Nachrichten: die neueste „tagesschau in 100 Sekunden“ – stumm, in Dauerschleife –, daneben oder darunter die
 * aktuellen Schlagzeilen. Optionen: source (tagesschau100), headlines (false = ohne), layout (side | below),
 * feeds (Schlagzeilen, Standard tagesschau), max, label. Auf E-Ink nur das Vorschaubild.
 */
class AfNewsVideo extends AfWidget {
  static properties = { ...AfWidget.properties, video: { state: true }, items: { state: true } };

  static styles = [
    widgetStyles,
    srcIconStyle,
    css`
      :host {
        container-type: inline-size;
      }
      .wrap {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
        gap: 28px;
        height: 100%;
        align-items: center;
      }
      .wrap.below,
      .wrap.only {
        grid-template-columns: 1fr;
        align-content: center;
      }
      @container (max-width: 640px) {
        .wrap {
          grid-template-columns: 1fr;
        }
      }
      .screen {
        position: relative;
        aspect-ratio: 16 / 9;
        max-height: 100%;
        border-radius: var(--af-card-radius, 24px);
        display: flex;
        align-items: center;
        justify-content: center;
        container-type: size;
      }
      /* Originalformat der Quelle, nichts abschneiden: so groß wie möglich im Seitenverhältnis des Videos
         (--ar aus den Metadaten, bis dahin 16:9) – die Ecken runden das Bild selbst, keine leere Kastenfläche */
      video,
      .screen img {
        display: block;
        width: min(100cqw, calc(100cqh * var(--ar, 1.7778)));
        height: min(100cqh, calc(100cqw / var(--ar, 1.7778)));
        object-fit: contain;
        border-radius: var(--af-card-radius, 24px);
      }
      /* Bildschirmfüllend: über das Raster hinaus bis an die Ränder der Anzeige. Die Bühne ist transformiert,
         daher bezieht sich „fixed“ auf sie – nicht auf das Browserfenster. */
      .screen.full {
        position: fixed;
        inset: 0;
        aspect-ratio: auto;
        max-height: none;
        border-radius: 0;
        /* freie Ränder zeigen den Hintergrund des Stils statt der Karten dahinter */
        background-color: var(--af-bg);
        background-image: var(--af-bg-art, none);
        background-size: var(--af-bg-size, auto);
      }
      .screen.full video,
      .screen.full img {
        border-radius: 0;
      }
      .screen.full .edition {
        left: 48px;
        bottom: 48px;
      }
      .edition {
        position: absolute;
        left: 14px;
        bottom: 12px;
        padding: 5px 12px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: calc(15px * var(--af-fs, 1));
      }
      .rows {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
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
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
    `,
  ];

  video?: NewsVideo | null;
  items: NewsItem[] = [];
  private timer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    // neue Ausgaben erscheinen mehrmals am Tag – alle 10 min nachsehen (der Server merkt sie sich ebenso lange)
    this.timer = window.setInterval(() => void this.refresh(), REFRESH_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  protected firstUpdated(): void {
    void this.refresh();
  }

  /** Video zu Ende (oder nicht abspielbar): die Anzeige darf zur nächsten Seite – nur mit „Weiter erst nach dem Video“ */
  private done = (): void => {
    this.dispatchEvent(new CustomEvent("af-video-end", { bubbles: true, composed: true }));
  };

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("options") && changed.get("options") !== undefined) void this.refresh();
    // Verweigert das Gerät das automatische Abspielen, käme nie ein Ende – dann gleich weiter statt zu warten
    const video = this.renderRoot.querySelector("video");
    if (video && this.options.until_end && video.dataset.tried !== video.src) {
      video.dataset.tried = video.src;
      void video.play?.()?.catch?.(() => this.done());
    }
  }

  private async refresh(): Promise<void> {
    if (!this.hass) return;
    const source = String(this.options.source ?? "tagesschau100");
    const res = await this.hass.callWS<{ video?: NewsVideo | null }>({ type: "ambiframe/news_video", source }).catch(() => undefined);
    if (res) this.video = res.video ?? null;
    if (this.options.headlines !== false) this.items = await loadNews(this.hass, feedsOf(this.options.feeds, ["tagesschau"]));
  }

  render() {
    const v = this.video;
    const label = this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("tagesschau in 100 Sekunden")}</div>`;
    if (v === undefined) return html`${label}<div class="calm">${t("Nachrichten werden geladen …")}</div>`;
    const edition = v?.edition ? new Date(v.edition) : null;
    const still = !!this.ctx?.still;
    const full = this.options.layout === "fullscreen";
    const untilEnd = !!this.options.until_end;
    // stumm und in Schleife: so spielen iPad, Android und Fully ohne Antippen ab; neue Ausgabe = neue Adresse = neu laden
    const screen = v
      ? html`<div class="screen ${full ? "full" : ""}">
          ${still
            ? v.poster
              ? html`<img src=${v.poster} alt="" />`
              : nothing
            : !v.url
              ? nothing
              : keyed(
                  v.url,
                  untilEnd
                    ? html`<video src=${v.url} poster=${v.poster || nothing} muted autoplay playsinline preload="auto" disablepictureinpicture @loadedmetadata=${videoRatio} @ended=${this.done} @error=${this.done}></video>`
                    : html`<video src=${v.url} poster=${v.poster || nothing} muted autoplay loop playsinline preload="auto" disablepictureinpicture @loadedmetadata=${videoRatio}></video>`,
                )}
          ${edition && !Number.isNaN(edition.getTime()) ? html`<span class="edition">${t("Ausgabe {time}", { time: fmtTime(edition) })}</span>` : nothing}
        </div>`
      : html`<div class="calm">${t("Gerade keine Ausgabe abrufbar")}</div>`;
    const showList = this.options.headlines !== false && !full;
    const list = this.items.slice(0, Number(this.options.max ?? 5));
    return html`${full ? nothing : label}<div class="wrap ${showList ? (this.options.layout === "below" ? "below" : "") : "only"}">
      ${screen}
      ${showList
        ? html`<div class="rows">
            ${list.map((i) => html`<div><div class="rt">${i.title}</div><div class="rm">${srcIcon(i)}${i.source}${i.published ? ` · ${ago(i.published)}` : ""}</div></div>`)}
          </div>`
        : nothing}
    </div>`;
  }
}

define("af-newsvideo", AfNewsVideo);
