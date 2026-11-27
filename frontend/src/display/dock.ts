// Laufbänder am unteren Rand des Displays: Laufband für Zuhause und Nachrichten-Band in einem Behälter (Dock).
// Ein Controller des Displays – das DOM bleibt im Shadow-Root des Displays, die Form kommt über :host([ticker=…]).
import { css, html, nothing, type ReactiveController, type ReactiveControllerHost, type TemplateResult } from "lit";
import type { DisplayContext } from "../data";
import { TickerLane, tickerLineTpl } from "../ticker-lane";
import type { AmbiframeConfig, Hass } from "../types";
import { nextTickerLine, tickerLines, type TickerDetail, type TickerLine, type TickerMemory } from "../util";

/** Was das Dock vom Display wissen muss – bei jedem Zeichnen frisch gelesen */
export interface DockEnv {
  hass?: Hass;
  config?: AmbiframeConfig;
  ctx?: DisplayContext;
  displayId?: string;
  /** Laufband für Zuhause auf diesem Display an (display.home_ticker) */
  homeOn: boolean;
  night: boolean;
  /** Laufbänder, die die gerade sichtbare Seite zulässt (page.tickers) */
  tickers: { news: boolean; home: boolean };
  /** Antippen zeigt Einzelheiten */
  detailOn: boolean;
  openDetail: (e: Event, detail?: TickerDetail) => void;
}

export class TickerDock implements ReactiveController {
  /** Aktuelle Zeilen (aus dem letzten Zeichnen) und die laufende Spur – neue Meldungen kommen hinter die laufende */
  private now: TickerLine[] = [];
  private seen = new Set<string>();
  /** Zuletzt gezeigte Zeilen – Ereignisse bleiben nach ihrem Ende noch `hold` Minuten stehen */
  private memory: TickerMemory = new Map();
  /** Passt das Laufband für Zuhause nicht ins Band? (undefined = noch nicht gemessen) */
  private runs?: boolean;
  private bandKey = "";
  private bandOptions: Record<string, unknown> = {};
  private lane = new TickerLane({
    find: () => {
      const band = this.host.shadowRoot?.querySelector<HTMLElement>(".hticker.run");
      const lane = band?.querySelector<HTMLElement>(".lane");
      return band && lane ? { band, lane } : undefined;
    },
    next: () => (this.now.length ? this.item(nextTickerLine(this.now, this.seen)) : undefined),
    speed: () => Number(this.env().config?.design.home_ticker_speed) || 45,
    reset: () => this.seen.clear(),
  });

  constructor(
    private readonly host: ReactiveControllerHost & HTMLElement,
    private readonly env: () => DockEnv,
  ) {
    host.addController(this);
  }

  hostDisconnected(): void {
    this.lane.stop();
  }

  /** Nach dem Zeichnen: Form am Host, Höhe der Bänder (Bildunterschriften rücken darüber), laufen oder stehen */
  afterUpdate(look: string): void {
    if (this.host.getAttribute("ticker") !== look) this.host.setAttribute("ticker", look);
    const bands = this.host.shadowRoot?.querySelectorAll(".newsband, .hticker").length ?? 0;
    this.host.style.setProperty("--af-dock", `${bands * 38 + (bands && look === "float" ? 14 : 0)}px`);
    this.measure();
  }

  private item(l: TickerLine): TemplateResult {
    const e = this.env();
    return html`${tickerLineTpl(l, !!l.detail && e.detailOn, (ev) => e.openDetail(ev, l.detail))}<i>•</i>`;
  }

  /** Beide Laufbänder in einem Behälter: eine Fläche, ein Rand, eine Form – passend zum Stil (ticker="bar|float|line") */
  render(): TemplateResult | typeof nothing {
    const home = this.renderHome();
    const news = this.renderNews();
    if (home === nothing && news === nothing) return nothing;
    return html`<div class="dock">${home}${news}</div>`;
  }

  /**
   * Laufband für Zuhause: unten über allen Seiten, nur solange eine Zeile zutrifft; nachts aus. Es läuft nur, wenn der
   * Text nicht ins Band passt, und nur, wo ein Laufband flüssig ist (nicht im Videostream, auf E-Ink, am Fernseher).
   */
  private renderHome() {
    // gemischt laufen die Zeilen im Nachrichten-Band vorweg (renderNews)
    if (this.mixed) return nothing;
    const lines = this.homeLines();
    this.now = lines;
    if (!lines.length) return nothing;
    const e = this.env();
    const run = lines.map((l) => this.item(l));
    // läuft, wenn der Text nicht ins Band passt (gemessen nach dem Zeichnen); ohne Messung ab drei Zeilen
    const moves = e.ctx?.ticker !== false && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move = moves && (this.runs ?? lines.length > 2);
    const up = e.config?.design.news_band?.enabled && e.ctx?.ticker !== false && e.tickers.news;
    // läuft es, füllt die Spur Zeile für Zeile – neue Meldungen kommen hinten an, nichts Sichtbares springt
    return html`<div class="hticker ${move ? "run" : ""} ${up ? "up" : ""}"><div class="tick"><div class="track measure" aria-hidden="true">${run}</div><div class="track lane">${move ? nothing : run}</div></div></div>`;
  }

  /** Zeilen des Laufbands für Zuhause für dieses Display (nachts, abgeschaltet oder auf der Seite aus: keine) */
  private homeLines(): TickerLine[] {
    const e = this.env();
    if (e.night || !e.homeOn || !e.tickers.home) return [];
    return tickerLines(e.hass, e.config?.design.home_ticker, Date.now(), e.displayId, this.memory);
  }

  /** Läuft nur, wenn der Text nicht ins Band passt – dann mit gleichmäßigem Tempo (design.home_ticker_speed, px/s) */
  private measure(): void {
    const band = this.host.shadowRoot?.querySelector<HTMLElement>(".hticker");
    const measure = band?.querySelector<HTMLElement>(".measure");
    if (!band || !measure || !band.clientWidth) return;
    const runs = measure.scrollWidth > band.clientWidth - 24;
    if (runs !== this.runs) {
      this.runs = runs;
      this.host.requestUpdate();
      return;
    }
    if (band.classList.contains("run")) this.lane.start();
  }

  /** Beide Laufbänder in einem – nur wo das Nachrichten-Band überhaupt läuft */
  private get mixed(): boolean {
    const e = this.env();
    const band = e.config?.design.news_band;
    return !!band?.enabled && !!band.mix && !e.night && e.ctx?.ticker !== false && e.tickers.news;
  }

  /**
   * Nachrichten-Laufband über allen Seiten (design.news_band) – dasselbe Widget wie auf einer Seite, nur am unteren
   * Rand. Aus, wo ein Laufband nicht flüssig läuft oder abgeschaltet ist (ctx.ticker), und nachts.
   */
  private renderNews() {
    const e = this.env();
    const band = e.config?.design.news_band;
    if (!band?.enabled || e.night || e.ctx?.ticker === false || !e.tickers.news) return nothing;
    // Optionen nur bei Änderung neu – sonst lädt das Widget bei jedem Neuzeichnen die Meldungen neu
    const key = JSON.stringify(band);
    if (key !== this.bandKey) {
      this.bandKey = key;
      this.bandOptions = { ...band, variant: "ticker" };
    }
    return html`<af-news class="newsband" .hass=${e.hass} .ctx=${e.ctx} .options=${this.bandOptions} .lead=${band.mix ? this.homeLines() : []} @af-ticker=${(ev: CustomEvent<TickerDetail>) => e.openDetail(ev, ev.detail)}></af-news>`;
  }
}

/** Aussehen der Laufbänder – gehört in die Stile des Displays (die Form hängt an :host([ticker=…])) */
export const dockStyles = css`
  /* Behälter der Laufbänder am unteren Rand: trägt Fläche, Rand und Form; die Bänder selbst sind durchsichtig */
  .dock {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 19;
    display: flex;
    flex-direction: column;
    background: var(--af-chip);
    border-top: 1px solid var(--af-line);
  }
  /* zwei Bänder: dazwischen nur eine feine Linie */
  .dock > * + * {
    border-top: 1px solid color-mix(in srgb, var(--af-line) 45%, transparent);
  }
  .hticker {
    position: relative;
    flex: none;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    /* Schrift genau wie das Nachrichten-Laufband: 21 px × 0,82, normales Gewicht, Zweittext-Farbe */
    color: var(--af-ink-2);
    font: 400 calc(21px * 0.82) / 1 var(--af-sans);
  }
  /* Nachrichten-Laufband: im selben Behälter unter dem Laufband für Zuhause */
  .newsband {
    position: relative;
    flex: none;
    height: 38px;
    box-sizing: border-box;
    --af-fs: 0.82;
  }
  /* Zwei Bänder übereinander wirken als eine Leiste: links ausgerichtet wie die Nachrichten */
  .hticker.up:not(.run) {
    justify-content: flex-start;
  }
  /* Schwebend: abgerundete Karte mit Abstand zum Rand – Material, Rahmen und Schatten aus dem Stil */
  :host([ticker="float"]) .dock {
    left: 18px;
    right: 18px;
    bottom: 14px;
    border: var(--af-card-border, 1px solid var(--af-line));
    border-radius: min(var(--af-card-radius, 18px), 19px);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    backdrop-filter: blur(18px) saturate(1.3);
    box-shadow: var(--af-card-shadow, 0 10px 30px rgba(0, 0, 0, 0.18));
    overflow: hidden;
  }
  /* Nur Linie: keine Fläche, nur ein sanfter Verlauf für die Lesbarkeit und eine feine Linie */
  :host([ticker="line"]) .dock {
    background: linear-gradient(to top, var(--af-veil) 45%, transparent);
  }
  .hticker .track {
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 0 22px;
  }
  .hticker span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .hticker span.tap {
    cursor: pointer;
  }
  /* Logo der Quelle (DWD, NINA) vor dem Text – fehlt das Bild, verschwindet es einfach */
  .tk-logo {
    height: 1.25em;
    width: auto;
    max-width: 2.6em;
    object-fit: contain;
    border-radius: 0.2em;
    flex: none;
  }
  .tk-art {
    width: 1.5em;
    height: 1.5em;
    border-radius: 0.3em;
    background: var(--af-surface) center / cover no-repeat;
    flex: none;
  }
  .hticker svg,
  .hticker ha-icon {
    width: 1.1em;
    height: 1.1em;
    color: var(--af-accent);
  }
  /* Warnungen (DWD, NINA): in Warnfarbe */
  .hticker span.warn,
  .hticker span.bad {
    color: var(--af-alert);
  }
  .hticker span.bad {
    font-weight: 700;
  }
  .hticker span.warn svg,
  .hticker span.bad svg,
  .hticker span.warn ha-icon,
  .hticker span.bad ha-icon {
    color: inherit;
  }
  .hticker i {
    font-style: normal;
    color: var(--af-ink-3);
  }
  .hticker:not(.run) i:last-child {
    display: none;
  }
  .hticker .tick {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }
  .hticker.run {
    justify-content: flex-start;
  }
  /* läuft es, blendet nur der Text an den Rändern weich aus – der Hintergrund bleibt durchgehend wie beim Nachrichten-Laufband */
  .hticker.run .tick {
    flex: 1;
    min-width: 0;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
  }
  /* unsichtbare Messspur: wie breit wären alle Zeilen? */
  .hticker .measure {
    position: absolute;
    left: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .hticker .measure i:last-child {
    display: none;
  }
  .hticker .lane {
    flex: none;
    will-change: transform;
  }
  .hticker .q {
    display: flex;
    align-items: center;
    gap: 22px;
  }
`;
