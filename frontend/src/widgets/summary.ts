// KI-Zusammenfassung (Gemini über ai_task): Überschrift und wenige Punkte, live vom Server
import { t } from "../i18n";
import { css, html, nothing } from "lit";
import { iconSvg } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass } from "../types";
import { fmtTime } from "../util";
import { AfWidget, define } from "./base";

export interface Summary {
  headline: string;
  points: string[];
  period: "morning" | "midday" | "evening";
  generated_at: string;
  model?: string;
}

const LABEL: Record<string, string> = { morning: "Heute", midday: "Heute Nachmittag", evening: "Heute Abend & morgen" };

/** Ein Abo pro Seite reicht – alle Widgets teilen sich den letzten Stand */
let latest: Summary | null | undefined;
const listeners = new Set<() => void>();
let subscription: Promise<unknown> | undefined;
const subscribe = (hass: Hass) => {
  subscription ??= hass.connection
    .subscribeMessage<{ summary: Summary | null }>(
      (msg) => {
        latest = msg.summary;
        listeners.forEach((l) => l());
      },
      { type: "ambiframe/summary/subscribe" },
    )
    .catch(() => {
      subscription = undefined;
    });
};

/** Zusammenfassung. Optionen: style (plain | card), label, size (Schriftgröße der Punkte, px). */
class AfSummary extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .headline {
        font-size: 52px;
        line-height: 1.06;
        margin-top: 14px;
        text-wrap: balance;
      }
      ul {
        list-style: none;
        margin: 26px 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      li {
        display: flex;
        gap: 14px;
        align-items: baseline;
        font-size: var(--size, 22px);
        line-height: 1.35;
        color: var(--af-ink-2);
        animation: point-in 0.7s var(--af-ease, ease) backwards;
      }
      li i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--af-accent);
        flex: none;
        transform: translateY(-3px);
      }
      @keyframes point-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      .meta {
        margin-top: auto;
        padding-top: 18px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .meta .ic {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
        margin-top: 14px;
      }
    `,
  ];

  private onUpdate = () => this.requestUpdate();

  connectedCallback(): void {
    super.connectedCallback();
    listeners.add(this.onUpdate);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    listeners.delete(this.onUpdate);
  }

  protected shouldUpdate(): boolean {
    return true;
  }

  protected willUpdate(): void {
    if (this.hass) subscribe(this.hass);
  }

  render() {
    const o = this.options;
    const s = latest;
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? (s ? t(LABEL[s.period] ?? "Heute") : t("Überblick"))}</div>`;
    const body = !s
      ? html`<div class="calm">${latest === undefined ? t("Wird geladen …") : t("Noch keine Zusammenfassung – sie entsteht zu den eingestellten Zeiten.")}</div>`
      : html`${s.headline ? html`<div class="headline display">${s.headline}</div>` : nothing}
          <ul style=${o.size ? `--size:${Number(o.size)}px` : ""}>
            ${s.points.map((p, i) => html`<li style="animation-delay:${0.15 + i * 0.12}s"><i></i><span>${p}</span></li>`)}
          </ul>
          <div class="meta">${iconSvg("info")}<span>${t("KI-Zusammenfassung")} · ${fmtTime(new Date(s.generated_at))}</span></div>`;
    return html`<div class="wrap ${o.style === "card" ? "card" : ""}">${label}${body}</div>`;
  }
}

define("af-summary", AfSummary);
