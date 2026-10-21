// Tagesvorschau: der heutige Tag auf einen Blick – Termine, Wetter, Müll (für die Morgen-Seite)
import { locale, t } from "../i18n";
import { css, html, nothing, type PropertyValues } from "lit";
import { isAllDay, loadEvents, type CalEvent } from "../data";
import { iconSvg, weatherIcon, weatherLabel } from "../icons";
import { widgetStyles } from "../styles";
import { dayDiff, fmt, fmtTime, parseDate, stateOf } from "../util";
import { AfTickingWidget, define } from "./base";
import { wasteGroups, whenLabel } from "./home";

interface Forecast {
  datetime: string;
  temperature?: number;
  templow?: number;
  condition?: string;
  precipitation_probability?: number;
}

/**
 * Tagesvorschau. Optionen: calendars [ids], weather (Entität), bins [{name, entity, color}] (leer = automatisch),
 * label. Termine heute (und der erste morgen), Höchst-/Tiefstwert mit Regenhinweis, fällige Mülltonnen.
 */
class AfToday extends AfTickingWidget {
  static properties = { ...AfTickingWidget.properties, events: { state: true } };

  static styles = [
    widgetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .head {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1.1;
      }
      .sub {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .cols {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 28px;
        margin-top: 34px;
      }
      .col {
        min-width: 0;
        padding: 26px 28px;
        border-radius: var(--af-card-radius, 24px);
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        animation: col-in 0.9s var(--af-ease) backwards;
      }
      .col:nth-child(2) {
        animation-delay: 0.12s;
      }
      .col:nth-child(3) {
        animation-delay: 0.24s;
      }
      @keyframes col-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
      }
      .ct {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-accent);
        margin-bottom: 18px;
      }
      .ev {
        display: flex;
        gap: 16px;
        align-items: baseline;
        padding: calc(9px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
      }
      .ev:last-of-type {
        border-bottom: 0;
      }
      .ev .when {
        width: calc(78px * var(--af-fs, 1));
        flex: none;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .ev .what {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1.25;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ev.past {
        opacity: 0.45;
      }
      .note {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
        line-height: 1.4;
      }
      .calm {
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .wx {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .wx .ic {
        font-size: calc(64px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .wx .hi {
        font-size: calc(56px * var(--af-fs, 1));
        line-height: 1;
      }
      .wx .lo {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .cond {
        font-size: calc(21px * var(--af-fs, 1));
        margin-top: 14px;
      }
      .bin {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(22px * var(--af-fs, 1));
        padding: calc(6px * var(--af-dense, 1)) 0;
      }
      .bin i {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex: none;
      }
      .bin .d {
        color: var(--af-ink-3);
        margin-left: auto;
        font-size: calc(18px * var(--af-fs, 1));
      }
      .bin.soon .d {
        color: var(--af-accent);
      }
      @media (prefers-reduced-motion: reduce) {
        .col {
          animation: none;
        }
      }
    `,
  ];

  private events: CalEvent[] = [];
  private listening?: EventTarget;

  private get calendars(): string[] {
    const own = (this.options.calendars ?? []) as string[];
    return own.length ? own : Object.keys(this.hass?.states ?? {}).filter((id) => id.startsWith("calendar.")).slice(0, 3);
  }

  private get weather(): string | undefined {
    return this.options.weather ?? Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith("weather."));
  }

  private onForecast = (): void => this.requestUpdate();

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.listening?.removeEventListener("change", this.onForecast);
    this.listening = undefined;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return changed.has("ctx") || changed.has("options") || changed.has("events") || super.shouldUpdate(changed);
  }

  protected watched() {
    return [this.weather, ...((this.options.bins ?? []) as { entity: string }[]).map((b) => b.entity)];
  }

  protected willUpdate(): void {
    const forecasts = this.ctx?.forecasts;
    if (forecasts && this.listening !== forecasts) {
      this.listening?.removeEventListener("change", this.onForecast);
      forecasts.addEventListener("change", this.onForecast);
      this.listening = forecasts;
    }
    if (this.hass && this.calendars.length) {
      void loadEvents(this.hass, this.calendars, 2).then((events) => {
        if (events !== this.events) this.events = events;
      });
    }
  }

  private renderEvents() {
    const now = Date.now();
    const todays = this.events.filter((e) => {
      const start = parseDate(e.start);
      const end = parseDate(e.end);
      if (!start || !end) return false;
      // Ganztägige: läuft heute noch; sonst: beginnt heute
      return isAllDay(e) ? dayDiff(start) <= 0 && end.getTime() > now : dayDiff(start) === 0;
    });
    const tomorrow = this.events.find((e) => {
      const start = parseDate(e.start);
      return !!start && dayDiff(start) === 1;
    });
    return html`<div class="col">
      <div class="ct">${iconSvg("calendar")}${t("Termine heute")}</div>
      ${todays.length
        ? todays.slice(0, 5).map((e) => {
            const past = !isAllDay(e) && (parseDate(e.end)?.getTime() ?? 0) < now;
            return html`<div class="ev ${past ? "past" : ""}">
              <span class="when num">${isAllDay(e) ? t("ganztags") : fmtTime(parseDate(e.start)!)}</span><span class="what">${e.summary}</span>
            </div>`;
          })
        : html`<div class="calm">${t("Heute keine Termine")}</div>`}
      ${tomorrow
        ? html`<div class="note">${t("Morgen")}: ${isAllDay(tomorrow) ? "" : `${fmtTime(parseDate(tomorrow.start)!)} `}${tomorrow.summary}</div>`
        : nothing}
    </div>`;
  }

  private renderWeather() {
    const s = stateOf(this.hass, this.weather);
    if (!s) return nothing;
    const daily = (this.ctx?.forecasts.get(this.weather, "daily") ?? []) as Forecast[];
    const hourly = (this.ctx?.forecasts.get(this.weather, "hourly") ?? []) as Forecast[];
    const day = daily.find((f) => dayDiff(new Date(f.datetime)) === 0) ?? daily[0];
    const cond = day?.condition ?? s.state;
    // Erste Stunde heute (ab jetzt) mit wahrscheinlichem Regen
    const rain = hourly.find((h) => {
      const at = new Date(h.datetime);
      return dayDiff(at) === 0 && at.getTime() > Date.now() - 36e5 && (h.precipitation_probability ?? 0) >= 50;
    });
    const pp = day?.precipitation_probability;
    return html`<div class="col">
      <div class="ct">${iconSvg("sun")}${t("Wetter heute")}</div>
      <div class="wx">
        ${iconSvg(weatherIcon(cond))}
        <div>
          <div class="hi display num">${fmt(day?.temperature ?? s.attributes.temperature, 0)}°</div>
          ${day?.templow != null ? html`<div class="lo num">${fmt(day.templow, 0)}°</div>` : nothing}
        </div>
      </div>
      <div class="cond">${weatherLabel(cond)}</div>
      <div class="note">
        ${rain
          ? t("Regen ab etwa {time} Uhr", { time: fmtTime(new Date(rain.datetime)) })
          : pp != null && pp >= 30
            ? t("Regenrisiko {n} %", { n: fmt(pp, 0) })
            : t("Trocken")}
      </div>
    </div>`;
  }

  private renderWaste() {
    const groups = wasteGroups(this.hass, { bins: this.options.bins, days: 2 });
    return html`<div class="col">
      <div class="ct">${iconSvg("bin")}${t("Müll")}</div>
      ${groups.length
        ? groups.flatMap((g) =>
            g.bins.map(
              (b) => html`<div class="bin ${g.days <= 1 ? "soon" : ""}">
                <i style="background:${b.color ?? "var(--af-ink-3)"}"></i><span>${b.name}</span><span class="d">${whenLabel(g.days)}</span>
              </div>`,
            ),
          )
        : html`<div class="calm">${t("Keine Abholung")}</div>`}
      ${groups.some((g) => g.days === 1) ? html`<div class="note">${t("Heute Abend rausstellen")}</div>` : nothing}
    </div>`;
  }

  render() {
    const now = new Date();
    const hour = now.getHours();
    const greet = hour < 11 ? t("Guten Morgen") : hour < 18 ? t("Guten Tag") : t("Guten Abend");
    return html`${this.options.label === false
        ? nothing
        : html`<div class="head display">${this.options.label ?? greet}</div>
            <div class="sub">${now.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })}</div>`}
      <div class="cols">${this.renderEvents()} ${this.renderWeather()} ${this.renderWaste()}</div>`;
  }
}

define("af-today", AfToday);
