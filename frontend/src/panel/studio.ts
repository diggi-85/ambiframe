// Studio (Prototyp): Einrichtung „Display zuerst“ mit rotem Faden. Jedes Display hat eine eigene Seite mit denselben
// Fragen (Ort & Gerät · Inhalte · Aussehen · Momente · Technik), dazu eine Seite „Alle Displays“ für das Gemeinsame
// (Aussehen für alle, Momente, Seiten-Bibliothek, Fotos & KI). Rechts immer die echte Vorschau.
// Arbeitet auf derselben Konfiguration wie der bisherige Editor – nach einem Update geht nichts verloren.
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import "../display/display";
import type { AfDisplay } from "../display/display";
import { lang, t } from "../i18n";
import { iconSvg } from "../icons";
import { PALETTES, THEME_DEFS } from "../styles";
import type { AmbiframeConfig, AmbientKind, Condition, DisplayConfig, EventConfig, Hass, HassEntity, PageConfig } from "../types";
import { formContext, type Field } from "../editor/form";
import "../editor/form";
import { PROFILES, displayFromProfile, profilePlaylist } from "../editor/profiles";
import {
  AMBIENT_OPTIONS,
  DESIGN_FIELDS,
  DISPLAY_DESIGN_FIELDS,
  DISPLAY_PHOTO_FIELDS,
  DISPLAY_SOUND_FIELDS,
  DISPLAY_STREAM_FIELDS,
  MOTION_FIELDS,
  PAGE_TEMPLATES,
  SUMMARY_FIELDS,
  displayFields,
  eventFields,
  slug,
  uniqueId,
} from "../editor/schemas";
import { WIDGETS } from "../widgets/registry";

/** Seite „Alle Displays“ */
const ALL = "__all";

type Step = "ort" | "inhalte" | "aussehen" | "momente" | "technik";
const DISPLAY_STEPS: [Step, string, string][] = [
  ["ort", "Ort & Gerät", "Wo hängt es?"],
  ["inhalte", "Inhalte", "Was soll es zeigen?"],
  ["aussehen", "Aussehen", "Wie soll es wirken?"],
  ["momente", "Momente", "Wann soll etwas passieren?"],
  ["technik", "Technik", "Steuerung, Ton, Videostream"],
];
const ALL_STEPS: [Step, string, string][] = [
  ["aussehen", "Aussehen für alle", "Stil, Farben und Atmosphäre aller Displays"],
  ["momente", "Momente", "Wenn … dann … – für alle Displays"],
  ["inhalte", "Seiten-Bibliothek", "Alle Seiten, die Displays zeigen können"],
  ["technik", "Fotos & KI", "Gemeinsame Quellen und Dienste"],
];

/** „Wann?“ als einfache Sätze – jede Wahl ist eine ganz normale Bedingung (show_if) */
const WHEN: { id: string; name: string; show_if: Condition[] }[] = [
  { id: "always", name: "immer", show_if: [] },
  { id: "morning", name: "nur morgens", show_if: [{ condition: "time", after: "05:00", before: "11:00" }] },
  { id: "day", name: "nur tagsüber", show_if: [{ condition: "time", after: "08:00", before: "18:00" }] },
  { id: "evening", name: "nur abends", show_if: [{ condition: "time", after: "17:00", before: "23:00" }] },
];
const whenOf = (show_if?: Condition[]) =>
  !show_if?.length ? "always" : (WHEN.find((w) => JSON.stringify(w.show_if) === JSON.stringify(show_if))?.id ?? "custom");

/** Atmosphäre in Gruppen statt einer langen Liste */
const AMBIENT_GROUPS: [string, AmbientKind[]][] = [
  ["Ruhig", ["none", "particles", "flow", "hue", "bokeh", "mist", "aurora"]],
  ["Natur & Wetter", ["weather", "snow", "raindrops", "wind", "clouds", "stars", "fireflies", "leaves", "blossoms", "bubbles"]],
  ["Gemütlich", ["fire", "lava", "waves", "glitter"]],
  ["Kräftig", ["matrix", "warp", "mystify", "logo", "pipes"]],
];
const ambientName = (k: string) => AMBIENT_OPTIONS.find(([id]) => id === k)?.[1] ?? k;

/** Vorlagen für neue Momente – Wenn … dann … */
const MOMENT_TEMPLATES: { id: string; name: string; icon: string; event: Partial<EventConfig> }[] = [
  { id: "klingel", name: "Es klingelt", icon: "bell", event: { kind: "alarm", to: "on", title: "Es klingelt", sound: "gong" } },
  { id: "bewegung", name: "Bewegung an der Tür", icon: "cam", event: { kind: "live", to: "on", title: "Bewegung", duration: 30, cooldown: 120 } },
  { id: "waesche", name: "Wäsche ist fertig", icon: "washer", event: { kind: "info", from: "on", to: "off", title: "Wäsche fertig", icon: "washer" } },
  { id: "musik", name: "Musik läuft", icon: "music", event: { kind: "media", style: "mini" } },
  { id: "geburtstag", name: "Geburtstag", icon: "sparkle", event: { kind: "effect", effect: "confetti", to: "on", title: "Alles Gute!" } },
  { id: "warnung", name: "Wetterwarnung", icon: "warning", event: { kind: "info", to: "on", title: "Wetterwarnung", icon: "warning", at_night: true } },
];

const KIND_TEXT: Record<string, string> = {
  alarm: "Vollbild",
  live: "Bild-im-Bild",
  info: "Hinweis",
  page: "Seite zeigen",
  media: "Musik-Cover",
  effect: "Anlass-Animation",
};

/** Vorschau-Wetter: so tun, als wäre es draußen so */
const WEATHER_SIM: [string, string][] = [
  ["", "echt"],
  ["sunny", "Sonne"],
  ["rainy", "Regen"],
  ["snowy", "Schnee"],
  ["windy", "Wind"],
  ["clear-night", "klare Nacht"],
];

export class AmbiframeStudio extends LitElement {
  static properties = {
    hass: { attribute: false },
    draft: { state: true },
    view: { state: true },
    displayId: { state: true },
    step: { state: true },
    wizard: { state: true },
    pageIdx: { state: true },
    previewMode: { state: true },
    previewWeather: { state: true },
    hoverTheme: { state: true },
    openEvent: { state: true },
    dirty: { state: true },
    saving: { state: true },
    status: { state: true },
    advanced: { state: true },
  };

  hass?: Hass;
  draft?: AmbiframeConfig;
  view: "overview" | "display" = "overview";
  /** Display-ID oder ALL für die Seite „Alle Displays“ */
  displayId = "";
  step: Step = "ort";
  /** Assistent: dieselben Schritte nacheinander, mit Weiter/Zurück */
  wizard = false;
  pageIdx = 0;
  previewMode: "" | "light" | "dark" | "night" = "";
  previewWeather = "";
  hoverTheme = "";
  openEvent = "";
  dirty = false;
  saving = false;
  advanced = false;
  status: Record<string, { online?: boolean }> = {};
  private saved = "";

  connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    if (!this.hass) return;
    const hass = this.hass;
    // Einmal lesen; falls nicht vorhanden (ältere Server, Testumgebung): erste Meldung des Abos wie im Editor
    const config = await hass.callWS<AmbiframeConfig>({ type: "ambiframe/config" }).catch(
      () =>
        new Promise<AmbiframeConfig>((resolve) => {
          let unsub: (() => unknown) | undefined;
          void hass.connection
            .subscribeMessage<{ config: AmbiframeConfig }>((m) => {
              resolve(m.config);
              void unsub?.();
            }, { type: "ambiframe/config/subscribe" })
            .then((u) => (unsub = u));
        }),
    );
    this.saved = JSON.stringify(config);
    this.draft = structuredClone(config);
    this.dirty = false;
    // Direkt auf ein Display und einen Schritt springen: ?studio=<display|__all>&step=<schritt>
    const q = new URLSearchParams(location.search);
    const target = q.get("studio");
    if (target && (target === ALL || config.displays.some((d) => d.id === target)) && this.view === "overview") {
      this.openDisplay(target);
      const step = q.get("step") as Step | null;
      if (step) this.step = step;
    }
    try {
      this.status = await this.hass.callWS({ type: "ambiframe/displays/status" });
    } catch {
      this.status = {};
    }
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && !this.draft && this.hass) void this.load();
    if (this.draft) {
      formContext.displays = this.draft.displays.map((x) => [x.id, x.name] as [string, string]);
      formContext.pages = this.draft.pages.map((x) => [x.id, x.name] as [string, string]);
    }
  }

  private get all(): boolean {
    return this.displayId === ALL;
  }

  private get display(): DisplayConfig | undefined {
    return this.draft?.displays.find((d) => d.id === this.displayId);
  }

  /** Display für die Vorschau – auf „Alle Displays“ das erste, ohne seine eigenen Abweichungen */
  private get previewDisplay(): DisplayConfig | undefined {
    return this.all ? this.draft?.displays[0] : this.display;
  }

  /** Änderung am Entwurf – immer als Kopie, damit die Vorschau sicher neu zeichnet */
  private mutate(fn: (c: AmbiframeConfig) => void): void {
    if (!this.draft) return;
    const next = structuredClone(this.draft);
    fn(next);
    this.draft = next;
    this.dirty = JSON.stringify(next) !== this.saved;
  }

  private mutateDisplay(fn: (d: DisplayConfig) => void): void {
    this.mutate((c) => {
      const d = c.displays.find((x) => x.id === this.displayId);
      if (d) fn(d);
    });
  }

  private async save(): Promise<void> {
    if (!this.hass || !this.draft) return;
    this.saving = true;
    try {
      await this.hass.callWS({ type: "ambiframe/config/save", config: this.draft, language: lang() });
      this.saved = JSON.stringify(this.draft);
      this.dirty = false;
    } catch (e) {
      alert(t("Speichern fehlgeschlagen: {msg}", { msg: (e as Error).message ?? String(e) }));
    } finally {
      this.saving = false;
    }
  }

  /* ───────── Vorschau ───────── */

  /** hass für die Vorschau: Wetter und Nacht lassen sich simulieren, ohne HA zu ändern */
  private previewHass(): Hass | undefined {
    const h = this.hass;
    if (!h || (!this.previewWeather && this.previewMode !== "night")) return h;
    const states: Record<string, HassEntity> = { ...h.states };
    if (this.previewWeather)
      for (const id of Object.keys(states)) if (id.startsWith("weather.")) states[id] = { ...states[id], state: this.previewWeather };
    const night = this.previewDisplay?.night?.entity;
    if (this.previewMode === "night" && night)
      states[night] = { ...(states[night] ?? { entity_id: night, attributes: {}, last_changed: "", last_updated: "" }), state: "on" } as HassEntity;
    return { ...h, states };
  }

  private previewConfig(): AmbiframeConfig | undefined {
    const c = this.draft;
    const d = this.previewDisplay;
    if (!c || !d || (!this.hoverTheme && !this.all)) return c;
    const next = structuredClone(c);
    const pd = next.displays.find((x) => x.id === d.id)!;
    // „Alle Displays“: zeigen, wie ein Display ohne eigene Abweichungen aussieht
    if (this.all) {
      delete pd.theme;
      delete pd.mode;
      delete pd.design;
    }
    // Stil nur ansehen (Maus über einer Stil-Karte), noch nicht übernehmen
    if (this.hoverTheme) {
      if (this.all) next.design.theme = this.hoverTheme as AmbiframeConfig["design"]["theme"];
      else pd.theme = this.hoverTheme as DisplayConfig["theme"];
    }
    return next;
  }

  private currentPage(): string | undefined {
    const d = this.previewDisplay;
    if (!d) return undefined;
    if (this.previewMode === "night" && d.night?.page) return d.night.page;
    // Bibliothek: die gewählte Seite der Bibliothek
    const list = this.all && this.step === "inhalte" ? (this.draft?.pages ?? []).map((p) => ({ page: p.id })) : d.playlist;
    return list.length ? list[((this.pageIdx % list.length) + list.length) % list.length].page : undefined;
  }

  private renderPreview() {
    const d = this.previewDisplay;
    if (!d) return nothing;
    const page = this.draft?.pages.find((p) => p.id === this.currentPage());
    const mode = this.previewMode === "light" || this.previewMode === "dark" ? this.previewMode : undefined;
    return html`<aside class="preview">
      <div class="screen ${d.orientation === "portrait" && !this.all ? "portrait" : ""}">
        <af-display preview .hass=${this.previewHass()} .config=${this.previewConfig()} display-id=${d.id} .fixedPage=${this.currentPage() ?? null} .modeOverride=${mode}></af-display>
      </div>
      <div class="controls">
        <div class="pager">
          <button class="icon" title=${t("Vorherige Seite")} @click=${() => this.pageIdx--}>${iconSvg("back")}</button>
          <span>${page?.name ?? t("keine Seite")}</span>
          <button class="icon" title=${t("Nächste Seite")} @click=${() => this.pageIdx++}>${iconSvg("forward")}</button>
        </div>
        <div class="seg">
          ${(
            [
              ["", "Automatisch"],
              ["light", "Hell"],
              ["dark", "Dunkel"],
              ["night", "Nacht"],
            ] as const
          ).map(([id, name]) => html`<button class=${this.previewMode === id ? "on" : ""} @click=${() => (this.previewMode = id)}>${t(name)}</button>`)}
        </div>
        <label class="inline"
          >${t("Wetter simulieren")}
          <select @change=${(e: Event) => (this.previewWeather = (e.target as HTMLSelectElement).value)}>
            ${WEATHER_SIM.map(([id, name]) => html`<option value=${id} ?selected=${this.previewWeather === id}>${t(name)}</option>`)}
          </select>
        </label>
      </div>
      <p class="hint">
        ${this.all ? t("Vorschau: so sieht ein Display ohne eigene Abweichungen aus.") : t("Vorschau mit deinen echten Daten – geändert wird erst beim Speichern.")}
      </p>
    </aside>`;
  }

  /* ───────── Übersicht ───────── */

  private renderOverview() {
    const c = this.draft!;
    return html`<div class="overview">
      <header class="top">
        <div>
          <h1>${t("Deine Displays")}</h1>
          <p class="muted">${t("Jedes Display beantwortet dieselben Fragen: Wo hängt es, was zeigt es, wie sieht es aus und wann passiert etwas.")}</p>
        </div>
        <button class="primary" @click=${this.addDisplay}>+ ${t("Display hinzufügen")}</button>
      </header>
      <article class="allcard" @click=${() => this.openDisplay(ALL)}>
        <span class="ic big">${iconSvg("sparkle")}</span>
        <div>
          <h3>${t("Alle Displays")}</h3>
          <span class="muted">${t("Gemeinsames Aussehen, Momente, Seiten-Bibliothek, Fotos & KI – gilt überall, wo ein Display nichts Eigenes festlegt.")}</span>
        </div>
        <div class="chips">
          <span class="chip">${iconSvg("page")} ${t("{n} Seiten", { n: c.pages.length })}</span>
          <span class="chip">${iconSvg("bell")} ${t("{n} Momente", { n: c.events.length })}</span>
        </div>
      </article>
      <div class="cards">
        ${c.displays.map((d) => {
          const st = this.status[d.id];
          const profile = PROFILES.find((p) => p.id === d.profile);
          const own = [d.theme && t("eigener Stil"), d.mode && t("eigenes Hell/Dunkel"), d.design && Object.keys(d.design).length && t("eigenes Design")].filter(Boolean);
          return html`<article class="dcard" @click=${() => this.openDisplay(d.id)}>
            <div class="mini"><af-display preview .hass=${this.hass} .config=${c} display-id=${d.id} .speed=${0.15}></af-display></div>
            <div class="meta">
              <div>
                <h3>${d.name}</h3>
                <span class="muted">${profile ? t(profile.name) : t("eigenes Profil")} · ${t("{n} Seiten", { n: d.playlist.length })}${own.length ? ` · ${own.join(", ")}` : ""}</span>
              </div>
              <span class="pill ${st?.online ? "ok" : ""}">${st?.online ? t("verbunden") : t("nicht verbunden")}</span>
            </div>
          </article>`;
        })}
      </div>
    </div>`;
  }

  private openDisplay(id: string, wizard = false): void {
    this.displayId = id;
    this.view = "display";
    this.step = id === ALL ? "aussehen" : "ort";
    this.wizard = wizard;
    this.pageIdx = 0;
    this.hoverTheme = "";
    this.openEvent = "";
  }

  /** Neues Display: sofort mit sinnvollen Vorgaben (Profil Küche), dann geführt durch die vier Schritte */
  private addDisplay = (): void => {
    const c = this.draft!;
    const name = t("Neues Display");
    const id = uniqueId(slug(name), c.displays.map((d) => d.id));
    this.mutate((cc) => cc.displays.push(displayFromProfile(PROFILES[0], cc, id, name)));
    this.openDisplay(id, true);
  };

  /* ───────── Ort & Gerät ───────── */

  private renderOrt(d: DisplayConfig) {
    const tv = d.profile === "tv" || !!d.stream?.enabled;
    return html`
      <label class="field">${t("Name")}<input .value=${d.name} @input=${(e: Event) => this.mutateDisplay((x) => (x.name = (e.target as HTMLInputElement).value))} /></label>
      <h3>${t("Wo hängt es?")}</h3>
      <p class="muted">${t("Der Ort setzt passende Vorgaben – alles lässt sich danach ändern.")}</p>
      <div class="grid3">
        ${PROFILES.map(
          (p) => html`<button class="choice ${d.profile === p.id ? "on" : ""}" @click=${() => this.applyProfile(p.id)}>
            <span class="ic">${iconSvg(p.icon)}</span><b>${t(p.name)}</b><small>${t(p.hint)}</small>
          </button>`,
        )}
      </div>
      <h3>${t("Auf welchem Gerät?")}</h3>
      <div class="grid3">
        <button class="choice ${!tv ? "on" : ""}" @click=${() => this.mutateDisplay((x) => x.stream && (x.stream.enabled = false))}>
          <span class="ic">${iconSvg("tablet")}</span><b>${t("Tablet, iPad oder Bilderrahmen")}</b>
          <small>${t("Fully Kiosk, ein Browser im Vollbild oder die Karte in der Home-Assistant-App")}</small>
        </button>
        <button
          class="choice ${tv ? "on" : ""}"
          @click=${() => this.mutateDisplay((x) => {
            x.stream = { ...(x.stream ?? {}), enabled: true } as DisplayConfig["stream"];
            x.profile = "tv";
          })}
        >
          <span class="ic">${iconSvg("tv")}</span><b>${t("Fernseher")}</b><small>${t("Als Videostream per AirPlay oder auf LG webOS")}</small>
        </button>
      </div>
      <div class="howto">
        <b>${t("So kommt es aufs Gerät")}</b>
        <code>${location.origin}/ambiframe-display?display=${d.id}</code>
        <span class="muted">${t("iPad/iPhone: Dashboard mit der Karte custom:ambiframe-card und display: {id}", { id: d.id })}</span>
      </div>
    `;
  }

  private applyProfile(id: string): void {
    const p = PROFILES.find((x) => x.id === id);
    if (!p) return;
    this.mutateDisplay((d) => {
      Object.assign(d, structuredClone(p.display));
      d.profile = p.id;
    });
  }

  /* ───────── Inhalte (Display) und Seiten-Bibliothek (alle) ───────── */

  private renderInhalte(d: DisplayConfig) {
    const c = this.draft!;
    const pageOf = (id: string) => c.pages.find((p) => p.id === id);
    const unused = c.pages.filter((p) => !d.playlist.some((e) => e.page === p.id) && p.id !== d.night?.page);
    const profile = PROFILES.find((p) => p.id === d.profile);
    const at = ((this.pageIdx % Math.max(1, d.playlist.length)) + d.playlist.length) % Math.max(1, d.playlist.length);
    return html`
      <p class="muted">${t("Die Seiten laufen nacheinander. Antippen zeigt sie rechts in der Vorschau.")}</p>
      <ol class="playlist">
        ${d.playlist.map((e, i) => {
          const p = pageOf(e.page);
          const when = whenOf(e.show_if);
          return html`<li class=${at === i ? "on" : ""} @click=${() => (this.pageIdx = i)}>
            <span class="num">${i + 1}</span>
            <div class="what">
              <b>${p?.name ?? e.page}</b>
              <span class="types">${this.widgetTags(p)}</span>
            </div>
            <select title=${t("Wann?")} @click=${(ev: Event) => ev.stopPropagation()} @change=${(ev: Event) => this.setWhen(i, (ev.target as HTMLSelectElement).value)}>
              ${WHEN.map((w) => html`<option value=${w.id} ?selected=${when === w.id}>${t(w.name)}</option>`)}
              ${when === "custom" ? html`<option value="custom" selected>${t("eigene Bedingung")}</option>` : nothing}
            </select>
            <input
              class="dur"
              type="number"
              min="5"
              title=${t("Sekunden")}
              placeholder=${String(p?.duration ?? 30)}
              .value=${e.duration ? String(e.duration) : ""}
              @click=${(ev: Event) => ev.stopPropagation()}
              @change=${(ev: Event) => this.mutateDisplay((x) => {
                const v = Number((ev.target as HTMLInputElement).value);
                if (v > 0) x.playlist[i].duration = v;
                else delete x.playlist[i].duration;
              })}
            />
            <span class="btns" @click=${(ev: Event) => ev.stopPropagation()}>
              <button class="icon" ?disabled=${i === 0} title=${t("nach oben")} @click=${() => this.move(i, -1)}>↑</button>
              <button class="icon" ?disabled=${i === d.playlist.length - 1} title=${t("nach unten")} @click=${() => this.move(i, 1)}>↓</button>
              <button class="icon" title=${t("entfernen")} @click=${() => this.mutateDisplay((x) => x.playlist.splice(i, 1))}>✕</button>
            </span>
          </li>`;
        })}
      </ol>
      <div class="adder">
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          (e.target as HTMLSelectElement).value = "";
          if (v.startsWith("tpl:")) this.addTemplatePage(v.slice(4), true);
          else if (v) this.mutateDisplay((x) => x.playlist.push({ page: v }));
        }}>
          <option value="">+ ${t("Seite hinzufügen …")}</option>
          <optgroup label=${t("Aus der Bibliothek")}>${unused.map((p) => html`<option value=${p.id}>${p.name}</option>`)}</optgroup>
          <optgroup label=${t("Neu aus Vorlage")}>${PAGE_TEMPLATES.map((tp) => html`<option value=${`tpl:${tp.id}`}>${t(tp.name)}</option>`)}</optgroup>
        </select>
        ${profile
          ? html`<button class="ghost" @click=${() => this.mutateDisplay((x) => (x.playlist = profilePlaylist(profile, c.pages)))}>
              ${t("Vorschlag für „{name}“ übernehmen", { name: t(profile.name) })}
            </button>`
          : nothing}
      </div>
      <h3>${t("Nachts")}</h3>
      <label class="field"
        >${t("Seite in der Nacht")}
        <select @change=${(e: Event) => this.mutateDisplay((x) => (x.night = { ...(x.night ?? {}), page: (e.target as HTMLSelectElement).value || undefined }))}>
          <option value="">${t("keine")}</option>
          ${c.pages.map((p) => html`<option value=${p.id} ?selected=${d.night?.page === p.id}>${p.name}</option>`)}
        </select>
      </label>
    `;
  }

  private widgetTags(p?: PageConfig) {
    const names = [...new Set((p?.widgets ?? []).map((w) => t(WIDGETS[w.type]?.name ?? w.type)))];
    return names.slice(0, 5).map((n) => html`<i>${n}</i>`);
  }

  /** Bibliothek: alle Seiten, wer sie zeigt, neue aus Vorlage */
  private renderLibrary() {
    const c = this.draft!;
    const at = ((this.pageIdx % Math.max(1, c.pages.length)) + c.pages.length) % Math.max(1, c.pages.length);
    return html`
      <p class="muted">${t("Jede Seite gibt es nur einmal – die Displays wählen in „Inhalte“, welche sie zeigen.")}</p>
      <ol class="playlist lib">
        ${c.pages.map((p, i) => {
          const users = c.displays.filter((d) => d.playlist.some((e) => e.page === p.id) || d.night?.page === p.id).map((d) => d.name);
          return html`<li class=${at === i ? "on" : ""} @click=${() => (this.pageIdx = i)}>
            <span class="num">${i + 1}</span>
            <div class="what">
              <b>${p.name}</b>
              <span class="types">${this.widgetTags(p)}</span>
            </div>
            <span class="muted users">${users.length ? users.join(", ") : t("von keinem Display gezeigt")}</span>
          </li>`;
        })}
      </ol>
      <div class="adder">
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          (e.target as HTMLSelectElement).value = "";
          if (v) this.addTemplatePage(v, false);
        }}>
          <option value="">+ ${t("Neue Seite aus Vorlage …")}</option>
          ${PAGE_TEMPLATES.map((tp) => html`<option value=${tp.id}>${t(tp.name)}</option>`)}
        </select>
      </div>
    `;
  }

  private setWhen(i: number, id: string): void {
    const w = WHEN.find((x) => x.id === id);
    if (!w) return;
    this.mutateDisplay((x) => {
      if (w.show_if.length) x.playlist[i].show_if = structuredClone(w.show_if);
      else delete x.playlist[i].show_if;
    });
  }

  private move(i: number, by: number): void {
    this.mutateDisplay((x) => {
      const [e] = x.playlist.splice(i, 1);
      x.playlist.splice(i + by, 0, e);
    });
    this.pageIdx = i + by;
  }

  private addTemplatePage(id: string, toPlaylist: boolean): void {
    const tp = PAGE_TEMPLATES.find((x) => x.id === id);
    if (!tp) return;
    this.mutate((c) => {
      const pid = uniqueId(slug(t(tp.name)), c.pages.map((p) => p.id));
      c.pages.push({ id: pid, name: t(tp.name), ...tp.build(this.hass) } as PageConfig);
      if (toPlaylist) c.displays.find((d) => d.id === this.displayId)?.playlist.push({ page: pid });
    });
    this.pageIdx = toPlaylist ? (this.display?.playlist.length ?? 1) - 1 : this.draft!.pages.length - 1;
  }

  /* ───────── Aussehen (Display oder alle) ───────── */

  /** Herkunft eines Werts: eigener Wert dieses Displays oder wie alle Displays (Link zur Seite „Alle Displays“) */
  private origin(own: unknown, reset: () => void) {
    if (this.all) return nothing;
    return own !== undefined
      ? html`<button class="origin own" title=${t("Auf „wie alle Displays“ zurücksetzen")} @click=${reset}>${t("eigener Wert")} ↺</button>`
      : html`<button class="origin" title=${t("Zur Seite „Alle Displays“")} @click=${() => this.openDisplay(ALL)}>${t("wie alle Displays")} ↗</button>`;
  }

  private renderAussehen() {
    const c = this.draft!;
    const d = this.all ? undefined : this.display;
    const theme = d?.theme ?? c.design.theme;
    const amb = d?.design?.ambient?.type ?? c.design.ambient?.type;
    const palette = d?.design?.palette ?? c.design.palette;
    const cover = d?.design?.cover_colors ?? c.design.cover_colors;
    const mode = d?.mode ?? c.design.mode ?? "auto";
    return html`
      <div class="row-head">
        <h3>${t("Stil")}</h3>
        ${this.origin(d?.theme, () => this.mutateDisplay((x) => delete x.theme))}
      </div>
      <p class="muted">${t("Mit der Maus über einen Stil fahren zeigt ihn rechts mit deinen Inhalten – Klicken übernimmt ihn.")}</p>
      <div class="themes" @mouseleave=${() => (this.hoverTheme = "")}>
        ${THEME_DEFS.map((td) => {
          const tok = td.dark;
          return html`<button
            class="theme ${theme === td.id ? "on" : ""}"
            style="--bg:${tok.bg};--ink:${tok.ink};--acc:${tok.accent};--font:${td.shared.display}"
            @mouseenter=${() => (this.hoverTheme = td.id)}
            @focus=${() => (this.hoverTheme = td.id)}
            @click=${() => {
              this.hoverTheme = "";
              this.setTop("theme", td.id);
            }}
          >
            <span class="sample"><span class="clock">12<i>:</i>34</span><span class="dot"></span></span>
            <b>${t(td.name)}</b>
          </button>`;
        })}
      </div>

      <div class="row-head">
        <h3>${t("Hell oder dunkel")}</h3>
        ${this.origin(d?.mode, () => this.mutateDisplay((x) => delete x.mode))}
      </div>
      <div class="seg wide">
        ${(
          [
            ["auto", "Nach der Sonne"],
            ["light", "Immer hell"],
            ["dark", "Immer dunkel"],
          ] as const
        ).map(([id, name]) => html`<button class=${mode === id ? "on" : ""} @click=${() => this.setTop("mode", id)}>${t(name)}</button>`)}
      </div>

      <div class="row-head">
        <h3>${t("Farben")}</h3>
        ${this.origin(d?.design?.palette ?? d?.design?.cover_colors, () => this.mutateDisplay((x) => (delete x.design?.palette, delete x.design?.cover_colors)))}
      </div>
      <div class="chips">
        <button class="chip ${!palette ? "on" : ""}" @click=${() => this.setDesign("palette", undefined)}>${t("Farben des Stils")}</button>
        ${Object.entries(PALETTES).map(
          ([id, p]) => html`<button class="chip ${palette === id ? "on" : ""}" @click=${() => this.setDesign("palette", id)}>
            <span class="sw" style="background:${p.dark.accent}"></span>${t(p.name)}
          </button>`,
        )}
        <button class="chip ${palette === "tagesverlauf" ? "on" : ""}" @click=${() => this.setDesign("palette", "tagesverlauf")}>${t("Tagesverlauf")}</button>
        <button class="chip ${cover ? "on" : ""}" @click=${() => this.setDesign("cover_colors", !cover)}>${t("Farben passend zum Cover")}</button>
      </div>

      <div class="row-head">
        <h3>${t("Atmosphäre")}</h3>
        ${this.origin(d?.design?.ambient?.type, () => this.mutateDisplay((x) => delete x.design?.ambient))}
      </div>
      <p class="muted">${t("Eine ruhige Bewegung im Hintergrund – nachts automatisch aus. „Wie das Wetter“ wechselt mit dem Wetter (rechts simulieren).")}</p>
      ${AMBIENT_GROUPS.map(
        ([group, kinds]) => html`<div class="group">
          <span class="glabel">${t(group)}</span>
          <div class="chips">
            ${kinds.map(
              (k) => html`<button
                class="chip ${(amb ?? "none") === k ? "on" : ""}"
                @click=${() => this.setDesign("ambient", { ...((this.all ? c.design.ambient : d?.design?.ambient) ?? {}), type: k })}
              >
                ${t(ambientName(k))}
              </button>`,
            )}
          </div>
        </div>`,
      )}
      ${this.advanced
        ? html`<h3>${t("Feinschliff")}</h3>
            ${this.all
              ? this.form([...MOTION_FIELDS], c, (v) => this.mutate((cc) => (cc.design = (v as AmbiframeConfig).design)))
              : this.form(DISPLAY_DESIGN_FIELDS, d!, (v) => this.replaceDisplay(v))}`
        : nothing}
    `;
  }

  /** Stil oder Hell/Dunkel: auf „Alle Displays“ global, sonst nur dieses Display */
  private setTop(key: "theme" | "mode", value: string): void {
    if (this.all) this.mutate((c) => ((c.design as Record<string, unknown>)[key] = value));
    else this.mutateDisplay((x) => ((x as unknown as Record<string, unknown>)[key] = value));
  }

  private setDesign(key: string, value: unknown): void {
    const apply = (design: Record<string, unknown>) => {
      if (value === undefined) delete design[key];
      else design[key] = value;
    };
    if (this.all) this.mutate((c) => apply(c.design as Record<string, unknown>));
    else
      this.mutateDisplay((x) => {
        x.design = { ...(x.design ?? {}) };
        apply(x.design as Record<string, unknown>);
      });
  }

  /* ───────── Momente ───────── */

  private renderMomente() {
    const c = this.draft!;
    const d = this.all ? undefined : this.display;
    const active = (ev: EventConfig) => !d || d.events === "all" || d.events.includes(ev.id);
    return html`
      <p class="muted">
        ${this.all
          ? t("Momente gelten für alle Displays. Auf der Seite eines Displays schaltest du einzelne für dieses Display ab.")
          : t("Momente gelten für alle Displays – hier legst du fest, welche dieses Display zeigt.")}
      </p>
      <div class="moments">
        ${c.events.map((ev) => {
          const open = this.openEvent === ev.id;
          const shownOn = c.displays.filter((x) => x.events === "all" || x.events.includes(ev.id)).map((x) => x.name);
          return html`<article class="moment ${active(ev) && ev.enabled !== false ? "" : "off"}">
            <div class="sentence">
              ${d
                ? html`<label class="switch" title=${t("Auf diesem Display")}
                    ><input type="checkbox" .checked=${active(ev)} @change=${(e: Event) => this.toggleEvent(ev.id, (e.target as HTMLInputElement).checked)} /><span></span
                  ></label>`
                : html`<label class="switch" title=${t("Aktiv")}
                    ><input
                      type="checkbox"
                      .checked=${ev.enabled !== false}
                      @change=${(e: Event) => this.mutate((cc) => (cc.events.find((x) => x.id === ev.id)!.enabled = (e.target as HTMLInputElement).checked))}
                    /><span></span
                  ></label>`}
              <div>
                <b>${ev.name || ev.title || ev.id}</b>
                <span class="muted">${this.sentence(ev)}</span>
                ${this.all ? html`<span class="muted small">${t("Auf: {list}", { list: shownOn.join(", ") || t("keinem Display") })}</span>` : nothing}
              </div>
              <span class="btns">
                <button class="small" @click=${() => this.testMoment(ev.id)}>▶ ${t("Testen")}</button>
                <button class="small ghost" @click=${() => (this.openEvent = open ? "" : ev.id)}>${open ? t("Fertig") : t("Anpassen")}</button>
              </span>
            </div>
            ${open ? this.form(eventFields(c), ev, (v) => this.mutate((cc) => (cc.events[cc.events.findIndex((x) => x.id === ev.id)] = v as EventConfig))) : nothing}
          </article>`;
        })}
      </div>
      <h3>${t("Neuer Moment")}</h3>
      <div class="grid3">
        ${MOMENT_TEMPLATES.map(
          (m) => html`<button class="choice small" @click=${() => this.addMoment(m)}>
            <span class="ic">${iconSvg(m.icon)}</span><b>${t(m.name)}</b>
          </button>`,
        )}
      </div>
    `;
  }

  /** Ein Moment als Satz: Wenn … dann … */
  private sentence(ev: EventConfig): string {
    const name = (id?: string) => (id ? ((this.hass?.states[id]?.attributes.friendly_name as string | undefined) ?? id) : "…");
    const who = name(ev.entity);
    const when =
      ev.kind === "media"
        ? t("Wenn Musik läuft")
        : ev.to === "*"
          ? t("Wenn {name} sich meldet", { name: who })
          : (ev.to ?? "on") === "on"
            ? t("Wenn {name} anspringt", { name: who })
            : ev.to === "off"
              ? t("Wenn {name} ausgeht", { name: who })
              : t("Wenn {name} „{state}“ meldet", { name: who, state: ev.to! });
    const then = t("dann {what}", { what: t(KIND_TEXT[ev.kind] ?? ev.kind) });
    return `${when}, ${then}${ev.sound ? t(" mit Ton") : ""}`;
  }

  private toggleEvent(id: string, on: boolean): void {
    const all = this.draft!.events.map((e) => e.id);
    this.mutateDisplay((x) => {
      const list = x.events === "all" ? all : [...x.events];
      const next = on ? [...new Set([...list, id])] : list.filter((e) => e !== id);
      x.events = next.length === all.length ? "all" : next;
    });
  }

  private testMoment(id: string): void {
    (this.renderRoot.querySelector(".preview af-display") as AfDisplay | null)?.testEvent(id);
  }

  private addMoment(m: (typeof MOMENT_TEMPLATES)[number]): void {
    const id = uniqueId(m.id, this.draft!.events.map((e) => e.id));
    this.mutate((c) => c.events.push({ id, name: t(m.name), enabled: true, title: "", ...structuredClone(m.event) } as EventConfig));
    this.openEvent = id;
  }

  /* ───────── Technik (Display) bzw. Fotos & KI (alle) ───────── */

  private renderTechnik() {
    const c = this.draft!;
    if (this.all)
      return html`
        <details open><summary>${t("Fotos")}</summary>${this.form(DESIGN_FIELDS, c, (v) => this.mutate((cc) => (cc.photos = (v as AmbiframeConfig).photos)))}</details>
        <details><summary>${t("KI-Zusammenfassung")}</summary>${this.form(SUMMARY_FIELDS, c, (v) => this.mutate((cc) => (cc.summary = (v as AmbiframeConfig).summary)))}</details>
      `;
    const d = this.display!;
    return html`
      <p class="muted">${t("Einmal einrichten und vergessen: Bedienung, Neustart, Ton, Videostream und Fotos.")}</p>
      <details open><summary>${t("Display")}</summary>${this.form(displayFields(c), d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Töne")}</summary>${this.form(DISPLAY_SOUND_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Videostream")}</summary>${this.form(DISPLAY_STREAM_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
      <details><summary>${t("Fotos")}</summary>${this.form(DISPLAY_PHOTO_FIELDS, d, (v) => this.replaceDisplay(v))}</details>
    `;
  }

  private replaceDisplay(v: Record<string, unknown>): void {
    this.mutate((c) => {
      const i = c.displays.findIndex((x) => x.id === this.displayId);
      if (i >= 0) c.displays[i] = v as unknown as DisplayConfig;
    });
  }

  /** Vorhandene Formulare wiederverwenden – dieselben Felder wie im bisherigen Editor */
  private form(fields: Field[], value: object, onChange: (v: Record<string, any>) => void) {
    return html`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${fields}
      .value=${value}
      @value-changed=${(e: CustomEvent) => {
        if (e.target === e.currentTarget && e.detail?.value && typeof e.detail.value === "object") onChange(e.detail.value);
      }}
    ></af-form>`;
  }

  /* ───────── Seite eines Displays bzw. „Alle Displays“ ───────── */

  private renderDisplay() {
    const d = this.display;
    if (!this.all && !d) return nothing;
    const all = this.all ? ALL_STEPS : this.wizard ? DISPLAY_STEPS.slice(0, 4) : DISPLAY_STEPS;
    const idx = Math.max(0, all.findIndex(([s]) => s === this.step));
    const [, title, question] = all[idx];
    const body =
      this.step === "ort" && d
        ? this.renderOrt(d)
        : this.step === "inhalte"
          ? this.all
            ? this.renderLibrary()
            : this.renderInhalte(d!)
          : this.step === "aussehen"
            ? this.renderAussehen()
            : this.step === "momente"
              ? this.renderMomente()
              : this.renderTechnik();
    return html`<div class="workspace">
      <nav class="steps">
        <button class="back" @click=${() => (this.view = "overview")}>${iconSvg("back")} ${t("Übersicht")}</button>
        <h2>${this.all ? t("Alle Displays") : d!.name}</h2>
        ${this.wizard ? html`<p class="muted">${t("Einrichtung in vier Schritten")}</p>` : nothing}
        ${all.map(
          ([s, name, q], i) => html`<button class="step ${this.step === s ? "on" : ""} ${this.wizard && i < idx ? "done" : ""}" @click=${() => ((this.step = s), (this.pageIdx = 0))}>
            <span class="n">${i + 1}</span><span><b>${t(name)}</b><small>${t(q)}</small></span>
          </button>`,
        )}
        <div class="jump">
          <span class="glabel">${t("Andere Seite")}</span>
          <select @change=${(e: Event) => this.openDisplay((e.target as HTMLSelectElement).value)}>
            <option value=${ALL} ?selected=${this.all}>${t("Alle Displays")}</option>
            ${this.draft!.displays.map((x) => html`<option value=${x.id} ?selected=${x.id === this.displayId}>${x.name}</option>`)}
          </select>
        </div>
      </nav>
      <main class="content">
        <header>
          <h2>${t(title)}</h2>
          <span class="muted">${t(question)}</span>
        </header>
        ${body}
        ${this.wizard
          ? html`<footer class="wiz">
              <button class="ghost" ?disabled=${idx === 0} @click=${() => (this.step = all[idx - 1][0])}>${t("Zurück")}</button>
              ${idx < all.length - 1
                ? html`<button class="primary" @click=${() => (this.step = all[idx + 1][0])}>${t("Weiter")}</button>`
                : html`<button
                    class="primary"
                    @click=${async () => {
                      await this.save();
                      this.wizard = false;
                    }}
                  >
                    ${t("Fertig – speichern")}
                  </button>`}
            </footer>`
          : nothing}
      </main>
      ${this.renderPreview()}
    </div>`;
  }

  render() {
    if (!this.draft) return html`<div class="loading">${t("Lädt …")}</div>`;
    return html`<div class="app">
      <div class="bar">
        <b>Ambiframe Studio</b><span class="beta">${t("Prototyp")}</span>
        <span class="spacer"></span>
        <label class="inline"><input type="checkbox" .checked=${this.advanced} @change=${(e: Event) => (this.advanced = (e.target as HTMLInputElement).checked)} />${t("Erweitert")}</label>
        <button class="ghost" ?disabled=${!this.dirty} @click=${() => this.load()}>${t("Verwerfen")}</button>
        <button class="primary" ?disabled=${!this.dirty || this.saving} @click=${() => this.save()}>
          ${this.saving ? t("Speichert …") : this.dirty ? t("Speichern") : t("Gespeichert")}
        </button>
      </div>
      ${this.view === "overview" ? this.renderOverview() : this.renderDisplay()}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      --s-bg: var(--primary-background-color, #0f1114);
      --s-card: var(--card-background-color, #181b20);
      --s-ink: var(--primary-text-color, #eceef2);
      --s-mute: var(--secondary-text-color, #9aa1ab);
      --s-line: var(--divider-color, rgba(255, 255, 255, 0.1));
      --s-acc: var(--primary-color, #4aa3ff);
      background: var(--s-bg);
      color: var(--s-ink);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    }
    * {
      box-sizing: border-box;
    }
    .app {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--s-line);
    }
    .beta {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--s-acc) 20%, transparent);
      color: var(--s-acc);
    }
    .spacer {
      flex: 1;
    }
    h1 {
      margin: 0 0 4px;
      font-size: 26px;
    }
    h2 {
      margin: 0;
      font-size: 20px;
    }
    h3 {
      margin: 22px 0 8px;
      font-size: 15px;
    }
    .muted {
      color: var(--s-mute);
      font-size: 13px;
      margin: 0 0 8px;
    }
    .small {
      font-size: 12px;
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
      border-radius: 10px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      padding: 8px 14px;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--s-acc);
      border-color: transparent;
      color: #fff;
    }
    button.ghost {
      background: transparent;
    }
    button.small {
      padding: 5px 10px;
      font-size: 12px;
    }
    button.icon {
      padding: 4px 9px;
      line-height: 1;
    }
    .ic {
      width: 20px;
      height: 20px;
    }
    .ic.big {
      width: 34px;
      height: 34px;
      color: var(--s-acc);
    }
    input,
    select {
      font: inherit;
      color: inherit;
      background: var(--s-card);
      border: 1px solid var(--s-line);
      border-radius: 8px;
      padding: 7px 10px;
    }
    .inline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .field {
      display: grid;
      gap: 6px;
      font-size: 13px;
      color: var(--s-mute);
      max-width: 420px;
    }
    .field input {
      color: var(--s-ink);
    }

    /* Übersicht */
    .overview {
      padding: 24px;
      overflow: auto;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      margin-bottom: 20px;
    }
    .allcard {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 16px;
      align-items: center;
      padding: 16px 18px;
      margin-bottom: 18px;
      border-radius: 16px;
      border: 1px solid var(--s-line);
      background: linear-gradient(120deg, color-mix(in srgb, var(--s-acc) 14%, var(--s-card)), var(--s-card));
      cursor: pointer;
    }
    .allcard:hover,
    .dcard:hover {
      border-color: var(--s-acc);
    }
    .allcard h3 {
      margin: 0 0 4px;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 18px;
    }
    .dcard {
      background: var(--s-card);
      border: 1px solid var(--s-line);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
    }
    .mini {
      aspect-ratio: 16 / 10;
      position: relative;
      background: #000;
    }
    .mini af-display,
    .screen af-display {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      gap: 10px;
    }
    .meta h3 {
      margin: 0;
    }
    .pill {
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--s-mute) 20%, transparent);
      white-space: nowrap;
    }
    .pill.ok {
      background: color-mix(in srgb, #3ecf8e 22%, transparent);
      color: #3ecf8e;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      font-size: 13px;
    }
    .chip .ic {
      width: 16px;
      height: 16px;
    }
    .chip.on {
      border-color: var(--s-acc);
      background: color-mix(in srgb, var(--s-acc) 18%, var(--s-card));
    }
    .sw {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    /* Seite: Schritte · Inhalt · Vorschau */
    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 230px minmax(0, 1fr) minmax(320px, 42%);
    }
    .steps {
      border-right: 1px solid var(--s-line);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow: auto;
    }
    .steps .back {
      border: 0;
      background: none;
      padding: 0 0 10px;
      color: var(--s-mute);
      display: flex;
      gap: 6px;
      align-items: center;
      text-align: left;
    }
    .steps h2 {
      margin-bottom: 10px;
    }
    .step {
      display: flex;
      gap: 10px;
      text-align: left;
      border: 1px solid transparent;
      background: none;
      padding: 10px;
    }
    .step small {
      display: block;
      color: var(--s-mute);
      font-size: 12px;
    }
    .step .n {
      width: 24px;
      height: 24px;
      flex: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 12px;
      border: 1px solid var(--s-line);
    }
    .step.on {
      background: var(--s-card);
      border-color: var(--s-line);
    }
    .step.on .n {
      background: var(--s-acc);
      border-color: var(--s-acc);
      color: #fff;
    }
    .step.done .n {
      border-color: var(--s-acc);
      color: var(--s-acc);
    }
    .jump {
      margin-top: auto;
      padding-top: 16px;
      display: grid;
      gap: 6px;
    }
    .content {
      padding: 20px 24px 40px;
      overflow: auto;
    }
    .content header {
      margin-bottom: 14px;
    }
    .row-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
    .origin {
      font-size: 11px;
      color: var(--s-mute);
      border: 0;
      background: none;
      padding: 0;
    }
    .origin.own {
      color: var(--s-acc);
    }
    .grid3 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 10px;
    }
    .choice {
      display: grid;
      gap: 4px;
      text-align: left;
      padding: 14px;
      border-radius: 14px;
    }
    .choice small {
      color: var(--s-mute);
      font-size: 12px;
      line-height: 1.35;
    }
    .choice.small {
      grid-template-columns: auto 1fr;
      align-items: center;
    }
    .choice.on {
      border-color: var(--s-acc);
      background: color-mix(in srgb, var(--s-acc) 12%, var(--s-card));
    }
    .howto {
      margin-top: 18px;
      display: grid;
      gap: 6px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px dashed var(--s-line);
      font-size: 13px;
    }
    .playlist {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 8px;
    }
    .playlist li {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto 70px auto;
      gap: 10px;
      align-items: center;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid var(--s-line);
      background: var(--s-card);
      cursor: pointer;
    }
    .playlist.lib li {
      grid-template-columns: 28px minmax(0, 1fr) auto;
    }
    .playlist li.on {
      border-color: var(--s-acc);
    }
    .playlist .num {
      color: var(--s-mute);
      text-align: center;
    }
    .users {
      margin: 0;
      max-width: 200px;
      text-align: right;
    }
    .types {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
    .types i {
      font-style: normal;
      font-size: 11px;
      color: var(--s-mute);
      border: 1px solid var(--s-line);
      border-radius: 6px;
      padding: 1px 6px;
    }
    .btns {
      display: inline-flex;
      gap: 4px;
    }
    .adder {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }
    .themes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
      gap: 10px;
    }
    .theme {
      padding: 0;
      overflow: hidden;
      display: grid;
      text-align: left;
    }
    .theme .sample {
      position: relative;
      height: 64px;
      background: var(--bg);
      color: var(--ink);
      display: grid;
      place-items: center;
    }
    .theme .clock {
      font-family: var(--font);
      font-size: 26px;
    }
    .theme .clock i {
      font-style: normal;
      color: var(--acc);
    }
    .theme .dot {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--acc);
    }
    .theme b {
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 500;
    }
    .theme.on {
      border-color: var(--s-acc);
      box-shadow: 0 0 0 2px var(--s-acc);
    }
    .seg {
      display: inline-flex;
      border: 1px solid var(--s-line);
      border-radius: 10px;
      overflow: hidden;
    }
    .seg button {
      border: 0;
      border-radius: 0;
      padding: 6px 12px;
      font-size: 13px;
    }
    .seg button.on {
      background: var(--s-acc);
      color: #fff;
    }
    .group {
      margin: 8px 0;
    }
    .glabel {
      display: block;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--s-mute);
      margin-bottom: 6px;
    }
    .moments {
      display: grid;
      gap: 10px;
    }
    .moment {
      border: 1px solid var(--s-line);
      border-radius: 14px;
      background: var(--s-card);
      padding: 12px 14px;
    }
    .moment.off {
      opacity: 0.6;
    }
    .sentence {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }
    .sentence .muted {
      display: block;
      margin: 2px 0 0;
    }
    .switch input {
      display: none;
    }
    .switch span {
      display: block;
      width: 38px;
      height: 22px;
      border-radius: 999px;
      background: var(--s-line);
      position: relative;
      cursor: pointer;
    }
    .switch span::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch input:checked + span {
      background: var(--s-acc);
    }
    .switch input:checked + span::after {
      transform: translateX(16px);
    }
    details {
      border: 1px solid var(--s-line);
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 10px;
      background: var(--s-card);
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    .wiz {
      position: sticky;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding: 14px 0 0;
      margin-top: 24px;
      background: linear-gradient(transparent, var(--s-bg) 30%);
    }
    .preview {
      border-left: 1px solid var(--s-line);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: auto;
    }
    .screen {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      border: 6px solid #111;
      flex: none;
    }
    .screen.portrait {
      aspect-ratio: 10 / 16;
      max-height: 70vh;
      align-self: center;
    }
    .controls {
      display: grid;
      gap: 10px;
    }
    .pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
    }
    .hint {
      font-size: 12px;
      color: var(--s-mute);
      margin: 0;
    }
    .loading {
      padding: 40px;
    }
    @media (max-width: 1000px) {
      .workspace {
        grid-template-columns: 1fr;
        overflow: auto;
      }
      .steps {
        flex-direction: row;
        flex-wrap: wrap;
        border-right: 0;
        border-bottom: 1px solid var(--s-line);
      }
      .steps h2,
      .step small,
      .jump {
        display: none;
      }
      /* Vorschau oben, damit man das Ergebnis immer sieht */
      .preview {
        order: -1;
        border-left: 0;
        border-bottom: 1px solid var(--s-line);
      }
      .playlist li {
        grid-template-columns: 24px minmax(0, 1fr) auto;
      }
      .allcard {
        grid-template-columns: auto 1fr;
      }
    }
  `;
}

customElements.define("ambiframe-studio", AmbiframeStudio);
