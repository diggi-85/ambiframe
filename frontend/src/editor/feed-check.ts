// Rückmeldung unter einer Nachrichten-Quelle: ruft den Feed probeweise ab (ambiframe/news_check)
import { LitElement, css, html, nothing } from "lit";
import { t } from "../i18n";
import type { Hass } from "../types";
import { define } from "../widgets/base";

type Check = { ok: boolean; name?: string; count?: number; latest?: string; error?: string; status?: number };

const ERRORS: Record<string, string> = {
  address: "Bitte eine Adresse mit https:// eintragen oder einen Vorschlag wählen.",
  unreachable: "Nicht erreichbar – Adresse prüfen oder später nochmal versuchen.",
  http: "Der Server antwortet mit Fehler {status}.",
  not_feed: "Das ist eine Webseite, kein RSS-/Atom-Feed. Oft heißt die Adresse …/feed oder …/rss.",
  empty: "Feed gefunden, aber ohne Meldungen.",
};

export class AfFeedCheck extends LitElement {
  static properties = { hass: { attribute: false }, feed: {}, result: { state: true } };
  hass?: Hass;
  feed = "";
  result?: Check | "busy";
  private timer?: number;
  private asked = "";

  protected updated(changed: Map<string, unknown>): void {
    if (!changed.has("feed") || this.feed === this.asked) return;
    clearTimeout(this.timer);
    this.result = undefined;
    if (!this.feed || !this.hass) return;
    // erst prüfen, wenn das Tippen kurz ruht
    this.timer = window.setTimeout(() => this.check(this.feed), 700);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
  }

  private async check(feed: string) {
    this.asked = feed;
    this.result = "busy";
    const res = await this.hass!.callWS<Check>({ type: "ambiframe/news_check", feed }).catch(() => undefined);
    if (feed === this.feed) this.result = res ?? { ok: false, error: "unreachable" };
  }

  render() {
    const r = this.result;
    if (!r) return nothing;
    if (r === "busy") return html`<span class="busy">${t("Prüfe Quelle …")}</span>`;
    if (r.ok)
      return html`<span class="ok">✓ ${t("{n} Meldungen von {name}", { n: r.count ?? 0, name: r.name ?? "" })}</span>
        <span class="latest">${t("Neueste:")} ${r.latest}</span>`;
    return html`<span class="bad">✕ ${t(ERRORS[r.error ?? "unreachable"] ?? ERRORS.unreachable, { status: r.status ?? "" })}</span>`;
  }

  static styles = css`
    :host { display: grid; gap: 2px; font-size: 12px; grid-column: 1 / -1; }
    .busy, .latest { color: var(--secondary-text-color); }
    .latest { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ok { color: var(--success-color, #43a047); font-weight: 500; }
    .bad { color: var(--error-color, #db4437); }
  `;
}
define("af-feed-check", AfFeedCheck);
