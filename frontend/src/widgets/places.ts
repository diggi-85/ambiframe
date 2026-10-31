// Karte (Personen und Fahrzeuge), To-do-Liste, Pendelzeit
import { t } from "../i18n";
import { css, html, nothing, svg, type PropertyValues } from "lit";
import { anyIcon, iconSvg } from "../icons";
import { widgetStyles } from "../styles";
import type { HassEntity } from "../types";
import { ago, fmtTime, nameOf, stateOf } from "../util";
import { AfTickingWidget, AfWidget, define } from "./base";
import { allOf, label, listOf, mapFor, tileOf } from "./plus";

/* ───────── Karte ───────── */

const coords = (s?: HassEntity): { lat: number; lon: number } | null => {
  const lat = Number(s?.attributes.latitude);
  const lon = Number(s?.attributes.longitude);
  return s && Number.isFinite(lat) && Number.isFinite(lon) && (lat || lon) ? { lat, lon } : null;
};

/**
 * Größter Zoom (höchstens max), bei dem alle Punkte mit Rand pad in w × h Pixel passen – und die Mitte dazu
 * (in Kachel-Koordinaten dieses Zooms).
 */
export const fitView = (points: { lat: number; lon: number }[], w: number, h: number, pad = 60, max = 15): { z: number; x: number; y: number } => {
  for (let z = max; z >= 2; z--) {
    const t = points.map((p) => tileOf(p.lat, p.lon, z));
    const xs = t.map((p) => p.x);
    const ys = t.map((p) => p.y);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    if ((x1 - x0) * 256 <= w - 2 * pad && (y1 - y0) * 256 <= h - 2 * pad) return { z, x: (x0 + x1) / 2, y: (y0 + y1) / 2 };
  }
  return { z: 2, ...tileOf(points[0].lat, points[0].lon, 2) };
};

/** Meter je Pixel bei Zoom z (Web-Mercator) */
const metersPerPx = (lat: number, z: number) => (156543.03 * Math.cos((lat * Math.PI) / 180)) / 2 ** z;

/**
 * Karte mit Personen und Fahrzeugen. Optionen: entities (person.*, device_tracker.*; leer = alle Personen mit
 * Standort), exclude (nie zeigen), away_only (nur wer nicht zu Hause ist), tags (full | name | none),
 * routes (Reisezeit-Sensoren – ihre Strecke wird eingezeichnet), zone (false = Zuhause nicht einzeichnen),
 * max_zoom (Standard 15), map (auto | light | dark | osm), map_url, label. Der Ausschnitt passt sich selbst an,
 * damit alle und alle Strecken zu sehen sind.
 */
class AfMap extends AfTickingWidget {
  static properties = { ...AfTickingWidget.properties, paths: { state: true } };
  static styles = [
    widgetStyles,
    css`
      :host {
        position: relative;
        overflow: hidden;
        border-radius: var(--af-card-radius, 20px);
        background: var(--af-surface);
      }
      .map {
        position: absolute;
        inset: 0;
      }
      .map img {
        position: absolute;
        width: 257px;
        height: 257px;
        user-select: none;
        pointer-events: none;
      }
      .zone {
        position: absolute;
        border-radius: 50%;
        background: var(--af-accent-soft);
        border: 2px solid var(--af-accent);
        transform: translate(-50%, -50%);
      }
      .pin {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -24px);
      }
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--af-accent) center / cover no-repeat;
        color: var(--af-on-accent, #fff);
        display: grid;
        place-items: center;
        font-size: 22px;
        font-weight: 700;
        border: 3px solid var(--af-bg);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      }
      .avatar .ic {
        font-size: 28px;
        stroke-width: 2.2;
      }
      .stack {
        display: flex;
      }
      /* Stapel: Avatare überlappen wie in einer Gruppe */
      .stack .avatar + .avatar {
        margin-left: -18px;
      }
      .tag {
        margin-top: 6px;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--af-chip);
        font-size: calc(14px * var(--af-fs, 1));
        white-space: nowrap;
        line-height: 1.3;
        text-align: center;
      }
      .tag small {
        display: block;
        color: var(--af-ink-2);
        font-size: 0.85em;
      }
      .info {
        position: absolute;
        left: 14px;
        top: 12px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--af-chip);
        font-size: calc(15px * var(--af-fs, 1));
      }
      .credit {
        position: absolute;
        right: 8px;
        bottom: 6px;
        font-size: 10px;
        color: var(--af-ink-3);
      }
      svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .route {
        fill: none;
        stroke: var(--af-accent);
        stroke-width: 5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .casing {
        fill: none;
        stroke: var(--af-bg);
        stroke-width: 9;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0.8;
      }
      .goal {
        fill: var(--af-accent);
        stroke: var(--af-bg);
        stroke-width: 3;
      }
    `,
  ];

  /** Strecken je Reisezeit-Sensor: [[Breite, Länge], …] */
  paths: Record<string, [number, number][]> = {};
  private resize?: ResizeObserver;
  private routeTimer?: number;
  private loadedRoutes = "";

  connectedCallback(): void {
    super.connectedCallback();
    // Größe erst nach dem Einsetzen bekannt – und bei Drehung neu
    this.resize = new ResizeObserver(() => this.requestUpdate());
    this.resize.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize?.disconnect();
    clearInterval(this.routeTimer);
    this.loadedRoutes = "";
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const routes = listOf(this.options.routes);
    if (this.hass && routes.join() !== this.loadedRoutes) {
      this.loadedRoutes = routes.join();
      clearInterval(this.routeTimer);
      void this.loadRoutes(routes);
      // Der Verlauf ändert sich kaum – HA hält ihn ohnehin 6 h vor
      if (routes.length) this.routeTimer = window.setInterval(() => void this.loadRoutes(routes), 30 * 60e3);
    }
  }

  private async loadRoutes(routes: string[]): Promise<void> {
    const paths: Record<string, [number, number][]> = {};
    for (const entity of routes) {
      try {
        const r = await this.hass!.callWS<{ path: [number, number][] } | null>({ type: "ambiframe/route", entity });
        if (r?.path?.length) paths[entity] = r.path;
      } catch {
        /* nicht eingetragen oder nicht erreichbar – Karte ohne diese Strecke */
      }
    }
    this.paths = paths;
  }

  private ids(): string[] {
    const own = listOf(this.options.entities);
    const hidden = new Set(listOf(this.options.exclude));
    const ids = own.length ? own : allOf(this.hass, (id, s) => id.startsWith("person.") && !!coords(s));
    return ids.filter((id) => !hidden.has(id) && !(this.options.away_only && this.hass?.states[id]?.state === "home"));
  }

  protected watched() {
    return [...this.ids(), "zone.home", ...listOf(this.options.routes)];
  }

  private avatar(id: string, s: HassEntity) {
    const pic = s.attributes.entity_picture as string | undefined;
    const icon = id.startsWith("person.") ? undefined : ((s.attributes.icon as string | undefined) ?? "mdi:car");
    return html`<div class="avatar" style=${pic ? `background-image:url('${pic}')` : ""}>${pic ? "" : icon ? anyIcon(icon) : nameOf(this.hass, id).slice(0, 1)}</div>`;
  }

  /** Wo: Zuhause, Name der Zone oder „unterwegs“ */
  private where(s: HassEntity): string {
    if (s.state === "home") return t("Zuhause");
    if (s.state === "not_home") return t("unterwegs");
    return s.state;
  }

  render() {
    const w = this.clientWidth;
    const h = this.clientHeight;
    const home = stateOf(this.hass, "zone.home");
    const homeAt = coords(home);
    const pts = this.ids()
      .map((id) => ({ id, s: stateOf(this.hass, id) }))
      .map((p) => ({ ...p, at: coords(p.s) }))
      .filter((p): p is { id: string; s: HassEntity; at: { lat: number; lon: number } } => !!p.at);
    const lines = Object.values(this.paths);
    const all = [
      ...pts.map((p) => p.at),
      ...(this.options.zone !== false && homeAt ? [homeAt] : []),
      ...lines.flat().map(([lat, lon]) => ({ lat, lon })),
    ];
    if (!w || !h) return nothing;
    if (!all.length) return html`<div class="calm" style="padding:20px">${t("Keine Standorte – Personen oder Geräte mit GPS wählen.")}</div>`;
    const view = fitView(all, w, h, 70, Math.min(18, Number(this.options.max_zoom ?? 15)));
    const px = (lat: number, lon: number) => {
      const p = tileOf(lat, lon, view.z);
      return { x: w / 2 + (p.x - view.x) * 256, y: h / 2 + (p.y - view.y) * 256 };
    };
    const tiles: { x: number; y: number; left: number; top: number }[] = [];
    for (let tx = Math.floor(view.x - w / 512) - 1; tx <= Math.floor(view.x + w / 512) + 1; tx++)
      for (let ty = Math.floor(view.y - h / 512) - 1; ty <= Math.floor(view.y + h / 512) + 1; ty++)
        tiles.push({ x: tx, y: ty, left: Math.round(w / 2 + (tx - view.x) * 256), top: Math.round(h / 2 + (ty - view.y) * 256) });
    const map = mapFor(this, this.options);
    const n = 2 ** view.z;
    // Wer (fast) am selben Ort ist (z. B. alle zu Hause), wird zu einem Stapel mit gemeinsamem Schild
    const groups: { x: number; y: number; members: typeof pts }[] = [];
    for (const p of pts) {
      const at = px(p.at.lat, p.at.lon);
      const near = groups.find((g) => Math.hypot(g.x - at.x, g.y - at.y) < 40);
      if (near) near.members.push(p);
      else groups.push({ ...at, members: [p] });
    }
    const zone =
      this.options.zone !== false && homeAt ? { ...px(homeAt.lat, homeAt.lon), r: Math.max(8, Number(home?.attributes.radius ?? 100) / metersPerPx(homeAt.lat, view.z)) } : null;
    return html`<div class="map">
        ${tiles.map(
          (d) =>
            html`<img alt="" src=${map.url.replace("{z}", String(view.z)).replace("{x}", String(((d.x % n) + n) % n)).replace("{y}", String(d.y))} style="left:${d.left}px;top:${d.top}px" />`,
        )}
      </div>
      ${zone ? html`<div class="zone" style="left:${zone.x}px;top:${zone.y}px;width:${2 * zone.r}px;height:${2 * zone.r}px"></div>` : nothing}
      ${lines.length
        ? svg`<svg>${lines.map((line) => {
            const xy = line.map(([lat, lon]) => px(lat, lon));
            const d = xy.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(" ");
            const end = xy[xy.length - 1];
            return svg`<polyline class="casing" points=${d}></polyline><polyline class="route" points=${d}></polyline><circle class="goal" cx=${end.x} cy=${end.y} r="9"></circle>`;
          })}</svg>`
        : nothing}
      ${groups.map((g) => {
        const first = g.members[0].s;
        // Seit wann: der jüngste Wechsel der Gruppe
        const since = g.members.map((m) => m.s.last_changed).sort().at(-1);
        return html`<div class="pin" style="left:${g.x}px;top:${g.y}px">
          <div class="stack">${g.members.map((m) => this.avatar(m.id, m.s))}</div>
          ${this.options.tags === "none"
            ? nothing
            : html`<div class="tag">
                ${g.members.map((m) => nameOf(this.hass, m.id)).join(", ")}${this.options.tags === "name" ? nothing : html`<small>${this.where(first)} · ${ago(since)}</small>`}
              </div>`}
        </div>`;
      })}
      ${this.options.label === false ? nothing : html`<div class="info">${(this.options.label as string | undefined) ?? t("Karte")}</div>`}
      <div class="credit">${map.credit}</div>`;
  }
}

/* ───────── To-do-Liste ───────── */

interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
}

/** Erst nach dieser Zeit wirklich abhaken – so lange lässt sich ein versehentliches Tippen zurücknehmen */
const UNDO_MS = 4000;

/**
 * To-do- oder Einkaufsliste (todo.*). Optionen: entity (leer = erste Liste), max (Standard 8), show_completed,
 * check (false = nur anzeigen; sonst Antippen hakt ab, 4 s lang zurücknehmbar), size (px), empty_text, label.
 */
class AfTodo extends AfWidget {
  static properties = { ...AfWidget.properties, items: { state: true }, pending: { state: true } };

  static styles = [
    widgetStyles,
    css`
      ul {
        list-style: none;
        margin: 12px 0 0;
        padding: 0;
      }
      li {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: calc(10px * var(--af-dense, 1) + 2px) 0;
        border-top: 1px solid var(--af-line);
        font-size: var(--size, calc(26px * var(--af-fs, 1)));
        line-height: 1.2;
      }
      li.tap {
        cursor: pointer;
      }
      .box {
        flex: none;
        width: 0.9em;
        height: 0.9em;
        border-radius: 0.22em;
        border: 2px solid var(--af-ink-3);
        display: grid;
        place-items: center;
        color: var(--af-on-accent, #fff);
        font-size: 0.8em;
      }
      li.done .box,
      li.pending .box {
        background: var(--af-accent);
        border-color: var(--af-accent);
      }
      li.done span,
      li.pending span {
        color: var(--af-ink-3);
        text-decoration: line-through;
      }
      .undo {
        margin-left: auto;
        font-size: 0.6em;
        font-style: normal;
        color: var(--af-accent);
      }
      .more {
        margin-top: 10px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `,
  ];

  items: TodoItem[] = [];
  pending: Record<string, number> = {};
  private unsub?: Promise<() => void>;
  private subscribedTo?: string;

  private entity(): string | undefined {
    return (this.options.entity as string | undefined) ?? allOf(this.hass, (id) => id.startsWith("todo."))[0];
  }

  protected watched() {
    return [this.entity()];
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const id = this.entity();
    if (this.hass && id && id !== this.subscribedTo) this.subscribe(id);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.unsub?.then((u) => u()).catch(() => undefined);
    this.unsub = undefined;
    this.subscribedTo = undefined;
    for (const timer of Object.values(this.pending)) clearTimeout(timer);
    this.pending = {};
  }

  /** Einträge live: HA schickt die ganze Liste bei jeder Änderung (auch aus der App) */
  private subscribe(id: string): void {
    void this.unsub?.then((u) => u()).catch(() => undefined);
    this.subscribedTo = id;
    this.unsub = this.hass!.connection.subscribeMessage<{ items: TodoItem[] }>((msg) => (this.items = msg.items ?? []), { type: "todo/item/subscribe", entity_id: id });
    this.unsub.catch(() => (this.subscribedTo = undefined));
  }

  private tap(e: Event, item: TodoItem): void {
    if (this.options.check === false) return;
    // Nicht an die Anzeige weitergeben (sonst ginge z. B. das Dashboard auf)
    e.stopPropagation();
    const { [item.uid]: running, ...rest } = this.pending;
    if (running) {
      clearTimeout(running);
      this.pending = rest;
      return;
    }
    const entity = this.subscribedTo;
    this.pending = {
      ...this.pending,
      [item.uid]: window.setTimeout(() => {
        const { [item.uid]: _done, ...left } = this.pending;
        this.pending = left;
        void this.hass?.callService("todo", "update_item", { entity_id: entity, item: item.uid, status: "completed" });
      }, UNDO_MS),
    };
  }

  render() {
    const id = this.entity();
    if (!id) return html`${label(this.options, t("To-do"))}<div class="calm">${t("Keine To-do-Liste – in HA z. B. „Lokale To-do-Liste“ hinzufügen.")}</div>`;
    const open = this.items.filter((i) => i.status === "needs_action");
    const shown = this.options.show_completed ? [...open, ...this.items.filter((i) => i.status === "completed")] : open;
    const max = Number(this.options.max ?? 8);
    const tap = this.options.check !== false;
    const size = Number(this.options.size);
    return html`${label(this.options, nameOf(this.hass, id))}
      ${shown.length
        ? html`<ul style=${size ? `--size:${size}px` : ""}>
              ${shown.slice(0, max).map(
                (i) =>
                  html`<li
                    class="${tap && i.status !== "completed" ? "tap" : ""} ${i.status === "completed" ? "done" : ""} ${this.pending[i.uid] ? "pending" : ""}"
                    @click=${(e: Event) => i.status !== "completed" && this.tap(e, i)}
                  >
                    <div class="box">${i.status === "completed" || this.pending[i.uid] ? iconSvg("check") : nothing}</div>
                    <span>${i.summary}</span>
                    ${this.pending[i.uid] ? html`<em class="undo">${t("Zurücknehmen")}</em>` : nothing}
                  </li>`,
              )}
            </ul>
            ${shown.length > max ? html`<div class="more">${t("+ {n} weitere", { n: shown.length - max })}</div>` : nothing}`
        : html`<div class="calm">${(this.options.empty_text as string | undefined) ?? t("Alles erledigt")}</div>`}`;
  }
}

/* ───────── Pendelzeit ───────── */

interface Route {
  entity?: string;
  name?: string;
  arrive?: string;
  usual?: number;
}

/** Losfahren um: Ankunft („HH:MM“, heute) minus Fahrzeit */
export const leaveAt = (arrive: string, minutes: number, now = new Date()): Date | null => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(arrive.trim());
  if (!m) return null;
  const at = new Date(now);
  at.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return new Date(at.getTime() - minutes * 60e3);
};

/**
 * Fahrzeit zu einem oder mehreren Zielen aus Reisezeit-Sensoren (Waze, Google, HERE). Optionen: routes
 * [{entity, name, arrive ("08:00" → „losfahren bis“), usual (Minuten ohne Verkehr)}], label.
 */
class AfCommute extends AfTickingWidget {
  static styles = [
    widgetStyles,
    css`
      .route {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: end;
        gap: 4px 16px;
        padding: calc(12px * var(--af-dense, 1) + 4px) 0;
        border-top: 1px solid var(--af-line);
      }
      .route:first-of-type {
        border-top: 0;
      }
      .name {
        font-size: calc(22px * var(--af-fs, 1));
      }
      .min {
        font-size: calc(54px * var(--af-fs, 1));
        line-height: 1;
        text-align: right;
        white-space: nowrap;
      }
      .min small {
        font-size: 0.4em;
        color: var(--af-ink-2);
        margin-left: 4px;
      }
      .sub {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .late {
        color: var(--af-alert);
      }
      .ok {
        color: var(--af-good);
      }
    `,
  ];

  private routes(): Route[] {
    return ((this.options.routes as Route[] | undefined) ?? []).filter((r) => r.entity);
  }

  protected watched() {
    return this.routes().map((r) => r.entity);
  }

  render() {
    const routes = this.routes();
    if (!routes.length) return html`${label(this.options, t("Pendelzeit"))}<div class="calm">${t("Reisezeit-Sensor wählen (z. B. Waze Travel Time).")}</div>`;
    const now = new Date();
    return html`${label(this.options, t("Pendelzeit"))}
      ${routes.map((r) => {
        const s = stateOf(this.hass, r.entity);
        const min = Number(s?.state);
        const name = r.name ?? nameOf(this.hass, r.entity);
        if (!s || !Number.isFinite(min)) return html`<div class="route"><div class="name">${name}</div><div class="sub">${t("nicht verfügbar")}</div></div>`;
        const extra = r.usual ? Math.round(min - Number(r.usual)) : 0;
        const leave = r.arrive ? leaveAt(r.arrive, min, now) : null;
        const left = leave ? Math.round((leave.getTime() - now.getTime()) / 60e3) : null;
        const km = Number(s.attributes.distance);
        const via = (s.attributes.route as string | undefined)?.trim();
        return html`<div class="route">
          <div>
            <div class="name">${name}</div>
            <div class="sub">
              ${leave && left !== null
                ? html`<span class=${left < 5 ? "late" : left < 15 ? "" : "ok"}
                    >${left < 0 ? t("{n} min zu spät losgefahren", { n: -left }) : t("losfahren bis {time}", { time: fmtTime(leave) })}</span
                  >`
                : nothing}${via ? html`${leave ? " · " : ""}${t("über {route}", { route: via })}` : nothing}${Number.isFinite(km) && km > 0 ? ` · ${Math.round(km)} km` : ""}
            </div>
          </div>
          <div class="min display num ${extra >= 5 ? "late" : ""}">${Math.round(min)}<small>min</small>${extra >= 5 ? html`<div class="sub late">+${extra} min</div>` : nothing}</div>
        </div>`;
      })}`;
  }
}

define("af-map", AfMap);
define("af-todo", AfTodo);
define("af-commute", AfCommute);
