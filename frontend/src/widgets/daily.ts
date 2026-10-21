// Kurze Tagesseiten: Wikipedia-Artikel des Tages oder Zitat des Tages – der Server holt beides einmal am Tag (ambiframe/daily)
import { t } from "../i18n";
import { css, html, nothing, type PropertyValues } from "lit";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { AfWidget, define } from "./base";

interface Daily {
  title?: string;
  text: string;
  image?: string;
  url?: string;
  author?: string;
  source?: string;
}

const RETRY_MS = 10 * 60e3;

/** Pro Art und Tag eine Anfrage für alle Widgets */
const cache = new Map<string, { day: string; at: number; data: Daily | null; pending?: Promise<Daily | null> }>();
const today = (): string => new Date().toDateString();
const loadDaily = (hass: Hass, kind: string): Promise<Daily | null> => {
  const entry = cache.get(kind);
  if (entry?.pending) return entry.pending;
  if (entry && entry.day === today() && (entry.data || Date.now() - entry.at < RETRY_MS)) return Promise.resolve(entry.data);
  const pending = hass
    .callWS<Daily | null>({ type: "ambiframe/daily", kind })
    .catch(() => null)
    .then((data) => {
      const fresh = data ?? entry?.data ?? null;
      cache.set(kind, { day: data ? today() : (entry?.day ?? ""), at: Date.now(), data: fresh });
      return fresh;
    });
  cache.set(kind, { day: entry?.day ?? "", at: entry?.at ?? 0, data: entry?.data ?? null, pending });
  return pending;
};

/**
 * Tagesinhalt. Optionen: kind (article | quote), label (eigene Überschrift oder false), image (false = ohne Bild).
 * Artikel: Bild rechts, Titel und Einleitung links. Zitat: groß und mittig mit Autor.
 */
class AfDaily extends AfWidget {
  static properties = { ...AfWidget.properties, data: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
      }
      .art {
        display: flex;
        gap: 48px;
        height: 100%;
        align-items: stretch;
      }
      .body {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        animation: daily-in 1s var(--af-ease, ease) backwards;
      }
      .title {
        font-size: calc(54px * var(--af-fs, 1));
        line-height: 1.08;
        margin: 14px 0 22px;
        text-wrap: balance;
      }
      .text {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1.55;
        color: var(--af-ink-2);
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .pic {
        flex: 0 0 42%;
        border-radius: var(--af-card-radius, 28px);
        background: var(--af-surface) center / cover no-repeat;
        animation: daily-in 1.4s var(--af-ease-soft, ease) backwards;
      }
      .quote {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 6%;
        animation: daily-in 1.2s var(--af-ease, ease) backwards;
      }
      .mark {
        font-size: calc(120px * var(--af-fs, 1));
        line-height: 0.6;
        height: calc(56px * var(--af-fs, 1));
        color: var(--af-accent);
        opacity: 0.55;
      }
      .q {
        font-size: calc(var(--q, 46px) * var(--af-fs, 1));
        line-height: 1.3;
        text-wrap: balance;
        max-width: 1300px;
        margin-top: 18px;
      }
      .who {
        margin-top: 34px;
        font-size: calc(20px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-2);
      }
      .quote .label {
        margin-bottom: 34px;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
      @keyframes daily-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .body,
        .pic,
        .quote {
          animation: none;
        }
      }
    `,
  ];

  private data: Daily | null = null;
  private loaded = false;
  private timer?: number;

  private get kind(): string {
    return this.options.kind === "quote" ? "quote" : "article";
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Stündlich nachsehen – nach Mitternacht kommt so der neue Tag
    this.timer = window.setInterval(() => void this.load(), 60 * 60e3);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    // HA-Zustände betreffen den Tagesinhalt nicht
    return !(changed.size === 1 && changed.has("hass")) || !this.loaded;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (this.hass && (!this.loaded || changed.has("options"))) {
      this.loaded = true;
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.hass) return;
    const data = await loadDaily(this.hass, this.kind);
    if (data || !this.data) this.data = data;
    this.requestUpdate();
  }

  private label(fallback: string) {
    return this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? fallback}</div>`;
  }

  render() {
    const d = this.data;
    if (!d) return html`<div class="calm">${this.loaded ? t("Wird geladen …") : ""}</div>`;
    if (this.kind === "quote") {
      // Lange Zitate etwas kleiner
      const size = d.text.length > 220 ? 34 : d.text.length > 120 ? 40 : 46;
      return html`<div class="quote" style="--q:${size}px">
        ${this.label(t("Zitat des Tages"))}
        <div class="mark display">“</div>
        <div class="q display">${d.text}</div>
        ${d.author ? html`<div class="who">${d.author}</div>` : nothing}
      </div>`;
    }
    const image = this.options.image === false ? "" : d.image;
    return html`<div class="art">
      <div class="body">
        ${this.label(t("Artikel des Tages · Wikipedia"))}
        <div class="title display">${d.title}</div>
        <div class="text">${d.text}</div>
      </div>
      ${image ? html`<div class="pic" style="background-image:url('${image}')"></div>` : nothing}
    </div>`;
  }
}

define("af-daily", AfDaily);
