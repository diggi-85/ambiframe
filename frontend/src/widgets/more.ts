// Übersicht-Widgets: Termine, Läuft gerade, Geräte, Rollläden
import { locale, t } from "../i18n";
import { css, html, nothing } from "lit";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import type { HassEntity } from "../types";
import { batteryOverview, dayDiff, fmt, fmtTime, numberOf, parseDate, relDay, stateOf, valueOf, type BatteryItem } from "../util";
import { AfTickingWidget, define } from "./base";

const rowStyles = css`
  .label {
    margin-bottom: 14px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: calc(14px * var(--af-dense, 1)) 0;
    border-top: 1px solid var(--af-line);
  }
  .row > .ic {
    font-size: 26px;
    color: var(--af-accent);
    flex: none;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .a {
    font-size: calc(21px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b {
    font-size: calc(16px * var(--af-fs, 1));
    color: var(--af-ink-3);
    margin-top: 4px;
  }
  .end {
    text-align: right;
    flex: none;
    font-size: calc(19px * var(--af-fs, 1));
  }
  .meter {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--af-line);
    overflow: hidden;
    margin-top: 10px;
  }
  .meter i {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background: var(--af-accent);
  }
  .calm {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: calc(20px * var(--af-fs, 1));
    color: var(--af-ink-2);
  }
  .calm .ic {
    color: var(--af-good);
    font-size: calc(24px * var(--af-fs, 1));
  }
`;

/* ───────── Termine ───────── */

interface CalEvent {
  start: string;
  end: string;
  summary: string;
  location?: string;
  calendar: string;
}

/** Termine der nächsten Tage. Optionen: calendars [ids], days, max, location (bool), label. */
class AfAgenda extends AfTickingWidget {
  static styles = [
    widgetStyles,
    rowStyles,
    css`
      .day {
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-accent);
        margin: 18px 0 2px;
      }
      .day:first-of-type {
        margin-top: 0;
      }
      /* Breit genug für „ganztags“, auch bei großer Schrift */
      .time {
        width: calc(92px * var(--af-fs, 1));
        flex: none;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        white-space: nowrap;
      }
      .time.allday {
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.02em;
      }
    `,
  ];

  private events: CalEvent[] = [];
  private loadedAt = 0;
  private loading = false;

  protected shouldUpdate(): boolean {
    return true;
  }

  private async load(): Promise<void> {
    const ids = (this.options.calendars ?? []) as string[];
    if (!this.hass || !ids.length || this.loading) return;
    this.loading = true;
    try {
      const res = await this.hass.callWS<{ response: Record<string, { events: Omit<CalEvent, "calendar">[] }> }>({
        type: "call_service",
        domain: "calendar",
        service: "get_events",
        target: { entity_id: ids },
        service_data: { duration: { days: Number(this.options.days ?? 7) } },
        return_response: true,
      });
      this.events = Object.entries(res.response ?? {})
        .flatMap(([calendar, r]) => r.events.map((e) => ({ ...e, calendar })))
        .sort((a, b) => (parseDate(a.start)?.getTime() ?? 0) - (parseDate(b.start)?.getTime() ?? 0));
    } catch {
      this.events = [];
    } finally {
      this.loadedAt = Date.now();
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (Date.now() - this.loadedAt > 10 * 60e3) void this.load();
    const o = this.options;
    const now = Date.now();
    const list = this.events
      .filter((e) => (parseDate(e.end)?.getTime() ?? 0) > now)
      .slice(0, Number(o.max ?? 6));
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? t("Termine")}</div>`;
    if (!list.length) return html`${label}<div class="calm">${anyIcon("check")}${this.loadedAt ? o.empty_text ?? t("Keine Termine in den nächsten Tagen") : t("Lädt …")}</div>`;
    let lastDay = "";
    return html`${label}
      ${list.map((e) => {
        const start = parseDate(e.start)!;
        const allDay = !e.start.includes("T");
        const dayKey = start.toDateString();
        const head = dayKey !== lastDay ? html`<div class="day">${dayDiff(start) <= 2 ? relDay(start) : start.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })}</div>` : nothing;
        lastDay = dayKey;
        return html`${head}
          <div class="row">
            <div class="time num ${allDay ? "allday" : ""}">${allDay ? t("ganztags") : fmtTime(start)}</div>
            <div class="grow">
              <div class="a">${e.summary}</div>
              ${o.location !== false && e.location ? html`<div class="b">${e.location.split(",")[0]}</div>` : nothing}
            </div>
          </div>`;
      })}`;
  }
}

/* ───────── Läuft gerade ───────── */

/** Abgelaufene Wiedergabezeit eines Players in Sekunden (läuft zwischen den Meldungen von HA selbst weiter) */
const mediaPosition = (s: HassEntity): number | undefined => {
  let pos = Number(s.attributes.media_position);
  if (!Number.isFinite(pos)) return undefined;
  const at = s.attributes.media_position_updated_at as string | undefined;
  if (s.state === "playing" && at) pos += (Date.now() - new Date(at).getTime()) / 1000;
  return pos;
};

const mmss = (secs: number): string => {
  const v = Math.max(0, Math.round(secs));
  const h = Math.floor(v / 3600);
  const m = Math.floor((v % 3600) / 60);
  const sec = String(v % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
};

/**
 * Medien. Optionen: entities [media_player], label, show_paused (bool), variant (full = ganze Seite mit großem Cover
 * und Wiedergabefortschritt). Zeigt den ersten, der spielt.
 */
class AfMedia extends AfTickingWidget {
  static styles = [
    widgetStyles,
    rowStyles,
    css`
      .wrap {
        display: flex;
        gap: 22px;
        align-items: center;
      }
      .cover {
        width: 120px;
        height: 120px;
        border-radius: 18px;
        flex: none;
        background: var(--af-surface) center / cover;
        border: 1px solid var(--af-line);
        display: grid;
        place-items: center;
        font-size: 44px;
        color: var(--af-accent);
      }
      .title {
        font-size: 30px;
        line-height: 1.15;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 6px;
      }
      .where {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .where i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--af-accent);
      }

      /* Ganze Seite: großes Cover in der Mitte, darunter Titel und Fortschritt – alles zentriert */
      .full {
        height: 100%;
        container-type: size;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 36px;
      }
      .full .art {
        position: relative;
        /* so groß wie möglich und immer quadratisch – im Querformat nach Höhe, im Hochformat nach Breite */
        width: min(64cqh, 88cqw);
        aspect-ratio: 1;
        flex: none;
      }
      .full .glow,
      .full .pic {
        position: absolute;
        inset: 0;
        border-radius: 26px;
        background: var(--af-surface) center / cover;
      }
      .full .glow {
        filter: blur(56px) saturate(1.4);
        opacity: 0.6;
        transform: scale(1.08) translateY(22px);
      }
      .full .pic {
        border: 1px solid var(--af-line);
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        display: grid;
        place-items: center;
        font-size: 120px;
        color: var(--af-accent);
        animation: cover-in 1.2s var(--af-ease, ease) backwards;
      }
      @keyframes cover-in {
        from {
          opacity: 0;
          transform: scale(0.97);
        }
      }
      .full .text {
        width: min(100%, 900px);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .full .title {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1.1;
        margin-top: 10px;
        -webkit-line-clamp: 2;
        text-wrap: balance;
      }
      .full .artist {
        font-size: calc(24px * var(--af-fs, 1));
        margin-top: 8px;
      }
      .full .album {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 4px;
      }
      .full .prog {
        margin-top: 24px;
        width: min(100%, 560px);
      }
      .full .bar {
        height: 4px;
        border-radius: 2px;
        background: var(--af-line);
        overflow: hidden;
      }
      .full .bar i {
        display: block;
        height: 100%;
        background: var(--af-accent);
        transform-origin: left;
        transition: transform 1s linear;
      }
      .full .times {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  private secTimer?: number;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.secTimer);
  }

  protected shouldUpdate(): boolean {
    return true;
  }

  /** Ganze Seite: Fortschritt jede Sekunde weiterzählen, solange etwas spielt */
  private tickEverySecond(on: boolean): void {
    if (on && !this.secTimer) this.secTimer = window.setInterval(() => this.requestUpdate(), 1000);
    if (!on && this.secTimer) {
      clearInterval(this.secTimer);
      this.secTimer = undefined;
    }
  }

  private renderFull(s: HassEntity) {
    const a = s.attributes;
    const pic = a.entity_picture as string | undefined;
    const dur = Number(a.media_duration);
    const pos = mediaPosition(s);
    const known = dur > 0 && pos != null;
    const share = known ? Math.min(1, Math.max(0, pos / dur)) : 0;
    const where = [a.friendly_name, s.state === "paused" ? t("pausiert") : ""].filter(Boolean).join(" · ");
    return html`<div class="full">
      <div class="art">
        ${pic ? html`<div class="glow" style="background-image:url('${pic}')"></div>` : nothing}
        <div class="pic" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? "" : anyIcon("mdi:music")}</div>
      </div>
      <div class="text">
        ${this.options.label === false ? nothing : html`<div class="label">${this.options.label ?? t("Läuft gerade")}${where ? ` · ${where}` : ""}</div>`}
        <div class="title display">${a.media_title ?? a.app_name ?? t("Musik")}</div>
        ${a.media_artist ? html`<div class="artist">${a.media_artist}</div>` : nothing}
        ${a.media_album_name ? html`<div class="album">${a.media_album_name}</div>` : nothing}
        ${known
          ? html`<div class="prog">
              <div class="bar"><i style="transform:scaleX(${share})"></i></div>
              <div class="times num"><span>${mmss(pos)}</span><span>−${mmss(dur - pos)}</span></div>
            </div>`
          : nothing}
      </div>
    </div>`;
  }

  render() {
    const o = this.options;
    const players = ((o.entities ?? []) as string[]).map((id) => stateOf(this.hass, id)).filter((s): s is HassEntity => !!s);
    const playing = players.find((s) => s.state === "playing") ?? (o.show_paused ? players.find((s) => s.state === "paused") : undefined);
    this.tickEverySecond(o.variant === "full" && playing?.state === "playing");
    if (playing && o.variant === "full") return this.renderFull(playing);
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? t("Läuft gerade")}</div>`;
    if (!playing) return html`${label}<div class="calm">${anyIcon("check")}${o.empty_text ?? t("Gerade läuft nichts")}</div>`;
    const a = playing.attributes;
    const pic = a.entity_picture as string | undefined;
    return html`${label}
      <div class="wrap">
        <div class="cover" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? "" : anyIcon("mdi:music")}</div>
        <div class="grow">
          <div class="title display">${a.media_title ?? a.app_name ?? t("Musik")}</div>
          ${a.media_artist ? html`<div class="artist">${a.media_artist}</div>` : nothing}
          <div class="where"><i></i>${a.friendly_name}${playing.state === "paused" ? ` · ${t("pausiert")}` : ""}${a.source ? ` · ${a.source}` : ""}</div>
        </div>
      </div>`;
  }
}

/* ───────── Geräte ───────── */

interface ApplianceConfig {
  name: string;
  running: string;
  icon?: string;
  power?: string;
  progress?: string;
  end?: string;
  cost?: string;
}

/** Laufende Haushaltsgeräte mit Details. Optionen: items [{name, running, icon, power, progress, end, cost}], label, empty_text. */
class AfAppliances extends AfTickingWidget {
  static styles = [widgetStyles, rowStyles];

  protected watched() {
    return ((this.options.items ?? []) as ApplianceConfig[]).flatMap((i) => [i.running, i.power, i.progress, i.end, i.cost]);
  }

  render() {
    const o = this.options;
    const h = this.hass;
    const running = ((o.items ?? []) as ApplianceConfig[]).filter((i) => stateOf(h, i.running)?.state === "on");
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? t("Geräte")}</div>`;
    if (!running.length) return html`${label}<div class="calm">${anyIcon("check")}${o.empty_text ?? t("Nichts läuft gerade")}</div>`;
    return html`${label}
      ${running.map((i) => {
        const since = parseDate(stateOf(h, i.running)?.last_changed);
        const watts = numberOf(h, i.power);
        const progress = numberOf(h, i.progress);
        const end = parseDate(valueOf(h, i.end));
        const cost = numberOf(h, i.cost);
        const facts = [
          since ? t("seit {time}", { time: fmtTime(since) }) : "",
          end ? t("fertig {time}", { time: fmtTime(end) }) : "",
          watts != null ? `${fmt(watts, 0)} W` : "",
          cost != null && cost > 0 ? `${fmt(cost, 2)} €` : "",
        ].filter(Boolean);
        return html`<div class="row">
          ${anyIcon(i.icon ?? "washer")}
          <div class="grow">
            <div class="a">${i.name}</div>
            <div class="b num">${facts.join(" · ")}</div>
            ${progress != null ? html`<div class="meter"><i style="width:${progress}%"></i></div>` : nothing}
          </div>
          ${progress != null ? html`<div class="end num">${fmt(progress, 0)} %</div>` : nothing}
        </div>`;
      })}`;
  }
}

/* ───────── Rollläden ───────── */

interface CoverConfig {
  entity: string;
  name?: string;
  /** Antrieb meldet andersherum (offen ↔ zu) */
  invert?: boolean;
}

/** Rollläden mit Position. Optionen: covers [{entity, name}], label, only_open (bool). */
class AfCovers extends AfTickingWidget {
  static styles = [
    widgetStyles,
    rowStyles,
    css`
      .sum {
        font-size: 44px;
        line-height: 1;
        margin-bottom: 14px;
      }
      .sum small {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        font-family: var(--af-sans);
        letter-spacing: 0;
        margin-left: 8px;
      }
      .row {
        padding: calc(10px * var(--af-dense, 1)) 0;
      }
      .a {
        font-size: calc(18px * var(--af-fs, 1));
      }
      .row > .ic {
        font-size: 28px;
        color: var(--af-ink-2);
      }
      .row.shut > .ic {
        color: var(--af-accent);
      }
      .pos {
        height: 3px;
        border-radius: 2px;
        background: var(--af-line);
        margin-top: 7px;
        overflow: hidden;
      }
      .pos i {
        display: block;
        height: 100%;
        background: var(--af-ink-3);
      }
      .end {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-2);
        min-width: calc(74px * var(--af-fs, 1));
        white-space: nowrap;
      }
    `,
  ];

  protected watched() {
    return ((this.options.covers ?? []) as CoverConfig[]).map((c) => c.entity);
  }

  render() {
    const o = this.options;
    const list = ((o.covers ?? []) as CoverConfig[])
      .map((c) => ({ ...c, s: stateOf(this.hass, c.entity) }))
      .filter((c) => c.s);
    /** Öffnung 0–100 (100 = offen bzw. Markise ausgefahren); null = unbekannt */
    const pos = (c: CoverConfig & { s?: HassEntity }): number | null => {
      const s = c.s!;
      let p: number | null =
        typeof s.attributes.current_position === "number"
          ? s.attributes.current_position
          : s.state === "closed" || s.state === "closing"
            ? 0
            : s.state === "open" || s.state === "opening"
              ? 100
              : null;
      if (p != null && c.invert) p = 100 - p;
      return p;
    };
    const awning = (c: { s?: HassEntity }) => c.s!.attributes.device_class === "awning";
    // Markisen zählen nicht als „geschlossen“ – gemeint sind Fenster und Türen
    const windows = list.filter((c) => !awning(c));
    const closed = windows.filter((c) => (pos(c) ?? 100) < 10).length;
    const shown = o.only_open ? list.filter((c) => (pos(c) ?? 100) >= 10) : list;
    return html`${o.label === false ? nothing : html`<div class="label">${o.label ?? t("Rollläden")}</div>`}
      ${windows.length ? html`<div class="sum display num">${closed}<small>${t("von {n} geschlossen", { n: windows.length })}</small></div>` : nothing}
      ${shown.map((c) => {
        const p = pos(c);
        const isAwning = awning(c);
        const shut = p != null && p <= 2;
        const icon = isAwning ? (p != null && p > 2 ? "awning_out" : "awning") : shut ? "shutter" : "shutter_open";
        const text =
          p == null
            ? "–"
            : isAwning
              ? p <= 2
                ? t("eingefahren")
                : p >= 98
                  ? t("ausgefahren")
                  : `${fmt(p, 0)} %`
              : p >= 98
                ? t("offen")
                : p <= 2
                  ? t("zu")
                  : `${fmt(p, 0)} %`;
        return html`<div class="row ${shut ? "shut" : ""}">
          ${anyIcon(icon)}
          <div class="grow">
            <div class="a">${c.name ?? c.s!.attributes.friendly_name}</div>
            ${p != null && p > 2 && p < 98 ? html`<div class="pos"><i style="width:${isAwning ? p : 100 - p}%"></i></div>` : nothing}
          </div>
          <div class="end num">${text}</div>
        </div>`;
      })}`;
  }
}

/* ───────── Akkus ───────── */

/**
 * Akkus: Geräte (iPhone, iPad, Watch …) immer mit Stand und Ladezustand, darunter Zubehör unter `threshold` %.
 * Optionen: label, devices [{entity, name}] (leer = automatisch), threshold (21), exclude [ids], max (Zubehör-Zeilen).
 */
class AfBatteries extends AfTickingWidget {
  static styles = [
    widgetStyles,
    rowStyles,
    css`
      /* Für den Blick aus ein paar Metern: große Zeilen */
      .row {
        padding: calc(18px * var(--af-dense, 1)) 0;
        gap: 20px;
      }
      .row > .ic {
        font-size: 34px;
        color: var(--af-ink-2);
      }
      /* Neutral, nur Laden (grün) und Schwach (Warnfarbe) fallen auf – die Akzentfarbe kann rot sein */
      .meter i {
        background: var(--af-ink-2);
      }
      .a {
        font-size: calc(27px * var(--af-fs, 1));
      }
      .pct {
        font-size: calc(30px * var(--af-fs, 1));
        min-width: 3.2em;
      }
      .meter {
        height: 8px;
        border-radius: 4px;
        margin-top: 12px;
      }
      .row .bolt {
        font-size: 0.8em;
        color: var(--af-good);
        margin-left: 6px;
        vertical-align: -0.08em;
      }
      .meter i.low {
        background: var(--af-alert);
      }
      .meter i.charging {
        background: var(--af-good);
      }
      .sub {
        margin: 18px 0 4px;
        font-size: calc(14px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .lowrow > .ic,
      .lowrow .pct {
        color: var(--af-alert);
      }
      .calm {
        margin-top: 14px;
      }
      .more {
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        padding-top: 8px;
      }
    `,
  ];

  // Bekannte Akkus sofort; neu schwache Batterien kommen spätestens mit dem Minutentakt dazu
  protected watched() {
    const { devices, low } = batteryOverview(this.hass, this.options);
    return [...devices.flatMap((d) => [d.id, d.id.replace(/_level$/, "_state")]), ...low.map((l) => l.id)];
  }

  private row(b: BatteryItem, warn: boolean) {
    const threshold = Number(this.options.threshold ?? 21);
    const low = b.level != null && b.level < threshold;
    return html`<div class="row ${warn ? "lowrow" : ""}">
      ${anyIcon(warn ? "battery" : b.kind === "other" ? "battery" : b.kind)}
      <div class="grow">
        <div class="a">${b.name}${b.charging ? anyIcon("bolt", "bolt") : nothing}</div>
        ${b.level != null && !warn
          ? html`<div class="meter"><i class=${b.charging ? "charging" : low ? "low" : ""} style="width:${Math.max(2, Math.min(100, b.level))}%"></i></div>`
          : nothing}
      </div>
      <div class="end pct num">${b.level != null ? `${fmt(b.level, 0)} %` : t("schwach")}</div>
    </div>`;
  }

  render() {
    const o = this.options;
    const { devices, low } = batteryOverview(this.hass, o);
    const part: "both" | "devices" | "low" = o.part ?? "both";
    const max = Number(o.max ?? (part === "low" ? 7 : 5));
    const title = part === "low" ? t("Batterie wechseln") : t("Akkus");
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? title}</div>`;
    const lows = low.length
      ? html`${part === "both" ? html`<div class="sub">${t("Batterie wechseln")}</div>` : nothing}
          ${low.slice(0, max).map((l) => this.row(l, true))}
          ${low.length > max ? html`<div class="more">${t("+ {n} weitere", { n: low.length - max })}</div>` : nothing}`
      : html`<div class="calm">${anyIcon("check")}${part === "low" ? t("Alle Batterien in Ordnung") : t("Zubehör: alle Batterien in Ordnung")}</div>`;
    return html`${label} ${part !== "low" ? devices.map((d) => this.row(d, false)) : nothing} ${part !== "devices" ? lows : nothing}`;
  }
}

/* ───────── Größte Verbraucher ───────── */

interface ConsumerRow {
  id: string;
  name: string;
  kwh: number;
}

/**
 * Größte Verbraucher des Tages aus der Langzeit-Statistik (Verbrauch seit Mitternacht).
 * Geräte: die Einzelgeräte aus dem Energie-Dashboard von HA oder eine eigene Liste.
 * Optionen: label, count (3), devices [{entity, name}], exclude [ids].
 */
class AfConsumers extends AfTickingWidget {
  static styles = [
    widgetStyles,
    rowStyles,
    css`
      .row > .rank {
        width: 1.4em;
        flex: none;
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .pct {
        font-size: calc(22px * var(--af-fs, 1));
      }
      .meter i {
        background: var(--af-accent);
      }
    `,
  ];

  private rows: ConsumerRow[] = [];
  private loaded = false;
  private key = "";

  protected willUpdate(): void {
    // Neu rechnen: neuer Tag, alle 10 Minuten oder geänderte Optionen
    const key = `${new Date().toDateString()}|${Math.floor(Date.now() / 600e3)}|${JSON.stringify([this.options.devices, this.options.exclude])}`;
    if (this.hass && key !== this.key) {
      this.key = key;
      void this.load();
    }
  }

  private async devices(): Promise<{ id: string; name?: string }[]> {
    const own = ((this.options.devices ?? []) as { entity: string; name?: string }[]).filter((d) => d.entity);
    if (own.length) return own.map((d) => ({ id: d.entity, name: d.name }));
    try {
      const prefs = await this.hass!.callWS<{ device_consumption?: { stat_consumption: string; name?: string }[] }>({ type: "energy/get_prefs" });
      return (prefs.device_consumption ?? []).map((d) => ({ id: d.stat_consumption, name: d.name }));
    } catch {
      return [];
    }
  }

  private async load(): Promise<void> {
    const exclude = new Set((this.options.exclude ?? []) as string[]);
    const list = (await this.devices()).filter((d) => !exclude.has(d.id));
    const rows = await Promise.all(
      list.map(async (d): Promise<ConsumerRow | null> => {
        try {
          const r = await this.hass!.callWS<{ change?: number | null }>({
            type: "recorder/statistic_during_period",
            statistic_id: d.id,
            calendar: { period: "day" },
            types: ["change"],
          });
          let kwh = typeof r.change === "number" ? r.change : NaN;
          const unit = String(stateOf(this.hass, d.id)?.attributes.unit_of_measurement ?? "kWh");
          if (unit === "Wh") kwh /= 1000;
          if (unit === "MWh") kwh *= 1000;
          if (!Number.isFinite(kwh) || kwh <= 0) return null;
          const name = d.name || String(stateOf(this.hass, d.id)?.attributes.friendly_name ?? d.id).replace(/\s*(energie|energy|energieverbrauch|verbrauch)$/i, "");
          return { id: d.id, name, kwh };
        } catch {
          return null;
        }
      }),
    );
    this.rows = rows.filter((r): r is ConsumerRow => !!r).sort((a, b) => b.kwh - a.kwh);
    this.loaded = true;
    this.requestUpdate();
  }

  render() {
    const o = this.options;
    const top = this.rows.slice(0, Number(o.count ?? 3));
    const max = top[0]?.kwh ?? 1;
    const label = o.label === false ? nothing : html`<div class="label">${o.label ?? t("Größte Verbraucher heute")}</div>`;
    if (!top.length) return html`${label}<div class="calm">${anyIcon("plug")}${this.loaded ? t("Heute noch kein Verbrauch gemessen") : t("Wird berechnet …")}</div>`;
    return html`${label}
      ${top.map(
        (r, i) => html`<div class="row">
          <div class="rank num">${i + 1}</div>
          <div class="grow">
            <div class="a">${r.name}</div>
            <div class="meter"><i style="width:${Math.max(3, (r.kwh / max) * 100)}%"></i></div>
          </div>
          <div class="end pct num">${fmt(r.kwh, r.kwh < 10 ? 2 : 1)} kWh</div>
        </div>`,
      )}`;
  }
}

define("af-agenda", AfAgenda);
define("af-consumers", AfConsumers);
define("af-batteries", AfBatteries);
define("af-media", AfMedia);
define("af-appliances", AfAppliances);
define("af-covers", AfCovers);
