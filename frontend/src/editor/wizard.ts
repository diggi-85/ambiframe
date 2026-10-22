// Einrichtungsassistent: geführter erster Start und „Neues Display“ – ohne YAML.
// Arbeitet auf einer Kopie der Konfiguration und gibt sie am Ende mit „wizard-done“ zurück (der Editor speichert).
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import qrcode from "qrcode-generator";
import { t, type Lang } from "../i18n";
import { iconSvg } from "../icons";
import { SOUNDS, playSound } from "../sound";
import { THEMES } from "../styles";
import type { AmbiframeConfig, DisplayConfig, EventConfig, Hass, Theme } from "../types";
import { define } from "../widgets/base";
import { displayFromProfile, PROFILES, profilePlaylist, type Profile } from "./profiles";
import { EVENT_TEMPLATES, PAGE_TEMPLATES, slug, uniqueId } from "./schemas";

type Step = "welcome" | "place" | "content" | "events" | "photos" | "device" | "done";
const FIRST: Step[] = ["welcome", "place", "content", "events", "photos", "device", "done"];
const ADD: Step[] = ["place", "content", "device", "done"];

/** Vorlagen, die der Assistent zusätzlich anbieten kann (falls es so eine Seite noch nicht gibt) */
const EXTRA_TEMPLATES = ["news", "morgen", "kamera"];

interface EventChoice {
  on: boolean;
  entity: string;
  camera: string;
  sound: string;
}

const clone = <T>(v: T): T => structuredClone(v);
const ids = (hass: Hass | undefined, domain: string) => Object.keys(hass?.states ?? {}).filter((id) => id.startsWith(`${domain}.`));
const label = (hass: Hass | undefined, id: string): string => String(hass?.states[id]?.attributes.friendly_name ?? id);
const matches = (hass: Hass | undefined, id: string, re: RegExp) => re.test(id) || re.test(label(hass, id));

const DOORBELL = /klingel|doorbell|ding|besucher|visitor|ring/i;
const DOOR = /t[üu]r|door|front|eingang|haus|entrance/i;
const APPLIANCE = /wasch|washer|washing|trockner|dryer|sp[üu]l|dishwash/i;

export class AfWizard extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    mode: {},
    step: { state: true },
    profileId: { state: true },
    name: { state: true },
    pages: { state: true },
    extras: { state: true },
    language: { state: true },
    theme: { state: true },
    doorbell: { state: true },
    motion: { state: true },
    appliances: { state: true },
    photos: { state: true },
    control: { state: true },
    dashboard: { state: true },
  };

  hass?: Hass;
  config?: AmbiframeConfig;
  /** first: erster Start · display: weiteres Display anlegen */
  mode: "first" | "display" = "first";

  private step = 0;
  private profileId = "kitchen";
  private name = "";
  private pages = new Set<string>();
  private extras = new Set<string>();
  private language: "auto" | Lang = "auto";
  private theme: Theme = "ruhig";
  private doorbell: EventChoice = { on: false, entity: "", camera: "", sound: "klangschale" };
  private motion: EventChoice = { on: false, entity: "", camera: "", sound: "hinweis" };
  private appliances = new Set<string>();
  private photos = { folder: "", icloud: "", bing: true };
  private control: "embedded" | "screensaver" | "off" = "embedded";
  private dashboard = "/lovelace/0";
  private prepared = false;

  private get steps(): Step[] {
    return this.mode === "first" ? FIRST : ADD;
  }

  private get profile(): Profile {
    return PROFILES.find((p) => p.id === this.profileId) ?? PROFILES[0];
  }

  protected willUpdate(): void {
    if (this.prepared || !this.config) return;
    this.prepared = true;
    const c = this.config;
    this.language = c.design.language ?? "auto";
    this.theme = c.design.theme;
    this.photos = { folder: c.photos.folder ?? "", icloud: c.photos.icloud ?? "", bing: c.photos.bing !== false };
    this.dashboard = c.displays[0]?.control?.dashboard ?? "/lovelace/0";
    this.pickProfile(this.profileId);
    this.detectEvents();
  }

  /* ───────── Vorschläge aus den vorhandenen Entitäten ───────── */

  private doorbellCandidates(): string[] {
    const h = this.hass;
    return [...ids(h, "binary_sensor"), ...ids(h, "event")].filter(
      (id) => matches(h, id, DOORBELL) || h?.states[id]?.attributes.device_class === "doorbell",
    );
  }

  private motionCandidates(): string[] {
    const h = this.hass;
    const motion = ids(h, "binary_sensor").filter(
      (id) => ["motion", "occupancy", "presence"].includes(h?.states[id]?.attributes.device_class) || matches(h, id, /bewegung|motion/i),
    );
    return [...motion.filter((id) => matches(h, id, DOOR)), ...motion.filter((id) => !matches(h, id, DOOR))];
  }

  private applianceCandidates(): string[] {
    const h = this.hass;
    return [...ids(h, "input_boolean"), ...ids(h, "binary_sensor")].filter((id) => matches(h, id, APPLIANCE));
  }

  private detectEvents(): void {
    const events = this.config?.events ?? [];
    const existing = new Set(events.flatMap((e) => [e.entity, ...(e.entities ?? [])]));
    const cams = ids(this.hass, "camera");
    const cam = cams.find((id) => matches(this.hass, id, DOOR)) ?? cams[0] ?? "";
    // Gibt es so ein Ereignis schon, ist es vorbelegt, aber aus (nichts doppelt anlegen)
    const bellEvent = events.find((e) => e.kind === "alarm" && e.entity && matches(this.hass, e.entity, DOORBELL));
    const moveEvent = events.find((e) => e.kind === "live");
    const bell = bellEvent?.entity ?? this.doorbellCandidates()[0] ?? "";
    const move = moveEvent?.entity ?? this.motionCandidates()[0] ?? "";
    this.doorbell = { ...this.doorbell, on: !!bell && !bellEvent, entity: bell, camera: bellEvent?.camera ?? cam };
    this.motion = { ...this.motion, on: !!move && !moveEvent, entity: move, camera: moveEvent?.camera ?? cam };
    this.appliances = new Set(this.applianceCandidates().filter((id) => !existing.has(id)));
  }

  private pickProfile(id: string): void {
    const oldName = t(this.profile.name);
    this.profileId = id;
    const profile = this.profile;
    if (!this.name || this.name === oldName) this.name = t(profile.name);
    this.pages = new Set(profilePlaylist(profile, this.config?.pages ?? []).map((p) => p.page));
    const ctl = profile.display.control;
    this.control = ctl?.enabled === false ? "off" : (ctl?.mode ?? "embedded");
    const wanted: Record<string, string> = { news: "news", morgen: "morning", kamera: "camera" };
    this.extras = new Set(this.offeredTemplates().filter((x) => profile.pages.includes(wanted[x])));
  }

  /** Vorlagen, die es als Seite noch nicht gibt (Kamera nur, wenn eine da ist) */
  private offeredTemplates(): string[] {
    const pages = this.config?.pages ?? [];
    const present: Record<string, boolean> = {
      news: pages.some((p) => p.widgets.some((w) => w.type === "news")),
      morgen: pages.some((p) => p.widgets.some((w) => w.type === "summary")),
      kamera: pages.some((p) => p.background.type === "camera") || !ids(this.hass, "camera").length,
    };
    return EXTRA_TEMPLATES.filter((x) => !present[x]);
  }

  /* ───────── Ergebnis ───────── */

  private build(): { config: AmbiframeConfig; displayId: string } {
    const c = clone(this.config!);
    if (this.mode === "first") {
      c.design.theme = this.theme;
      if (this.language === "auto") delete c.design.language;
      else c.design.language = this.language;
      c.photos = { ...c.photos, folder: this.photos.folder.trim(), bing: this.photos.bing };
      if (this.photos.icloud.trim()) c.photos.icloud = this.photos.icloud.trim();
      else delete c.photos.icloud;
      this.addEvents(c);
    }
    // Zusätzliche Seiten aus Vorlagen
    const added: string[] = [];
    for (const tid of this.extras) {
      const tpl = PAGE_TEMPLATES.find((x) => x.id === tid);
      if (!tpl) continue;
      const id = uniqueId(tid, c.pages.map((p) => p.id));
      c.pages.push({ id, name: t(tpl.name), ...tpl.build(this.hass) });
      added.push(id);
    }
    const profile = this.profile;
    const name = this.name.trim() || t(profile.name);
    const first = this.mode === "first" ? c.displays[0] : undefined;
    const id = first ? first.id : uniqueId(slug(name) || "display", c.displays.map((d) => d.id));
    const display = displayFromProfile(profile, c, id, name);
    // Reihenfolge des Profils, dann weitere gewählte Seiten, dann neue Vorlagen
    const order = display.playlist.map((p) => p.page).filter((p) => this.pages.has(p));
    const rest = c.pages.map((p) => p.id).filter((p) => this.pages.has(p) && !order.includes(p));
    const playlist = [...order, ...rest, ...added];
    display.playlist = (playlist.length ? playlist : [c.pages[0].id]).map((page) => ({ page }));
    display.control =
      this.control === "off"
        ? { enabled: false, dashboard: this.dashboard, idle: 60 }
        : { ...display.control, enabled: true, mode: this.control, dashboard: this.dashboard };
    const watchdog = this.fullyButton();
    if (watchdog) display.watchdog = { button: watchdog, after: 120 };
    if (first) {
      // Bewährtes behalten (Nachtmodus, Neustart-Taste), Profil drüberlegen
      c.displays[0] = { ...first, ...display, night: display.night.page ? display.night : first.night } as DisplayConfig;
    } else {
      c.displays.push(display);
    }
    c.setup_complete = true;
    return { config: c, displayId: id };
  }

  private addEvents(c: AmbiframeConfig): void {
    const taken = () => c.events.map((e) => e.id);
    const add = (tplId: string, extra: Partial<EventConfig>) => {
      const tpl = EVENT_TEMPLATES.find((x) => x.id === tplId)!;
      c.events.push({ ...tpl.build(this.hass, c), ...extra, id: uniqueId(tplId, taken()) } as EventConfig);
    };
    const bell = this.doorbell;
    if (bell.on && bell.entity) {
      const isEvent = bell.entity.startsWith("event.");
      add("klingel", { entity: bell.entity, to: isEvent ? "*" : "on", camera: bell.camera || undefined, sound: bell.sound || undefined, volume: 80 });
    }
    const move = this.motion;
    if (move.on && move.entity) {
      add("bewegung", {
        entity: move.entity,
        camera: move.camera || undefined,
        sound: move.sound || undefined,
        volume: 30,
        quiet: { after: "22:00", before: "07:00" },
        quiet_action: "mute",
      });
    }
    for (const id of this.appliances) {
      const text = id + label(this.hass, id);
      const dryer = /trockner|dryer/i.test(text);
      const dish = /sp[üu]l|dishwash/i.test(text);
      add("geraet", {
        name: label(this.hass, id),
        entity: id,
        title: dryer ? t("Trockner fertig") : dish ? t("Spülmaschine fertig") : t("Waschmaschine fertig"),
        chip: dryer ? t("Trockner fertig") : dish ? t("Spülmaschine fertig") : t("Wäsche fertig"),
        icon: dryer ? "dryer" : "washer",
        sound: "glas",
        volume: 50,
        quiet: { after: "22:00", before: "07:00" },
        quiet_action: "mute",
      });
    }
  }

  /** „Start-URL laden“ eines Fully-Geräts als Neustart-Taste – nur wenn es genau eines gibt, das noch kein anderes Display nutzt */
  private fullyButton(): string | undefined {
    if (this.control === "off") return undefined;
    const used = new Set(
      (this.config?.displays ?? []).filter((d, i) => !(this.mode === "first" && i === 0)).map((d) => d.watchdog?.button),
    );
    const buttons = ids(this.hass, "button").filter((id) => /start_?url/i.test(id) && !used.has(id));
    return buttons.length === 1 ? buttons[0] : undefined;
  }

  private finish(): void {
    this.dispatchEvent(new CustomEvent("wizard-done", { detail: this.build(), bubbles: true, composed: true }));
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent("wizard-close", { bubbles: true, composed: true }));
  }

  /* ───────── Darstellung ───────── */

  protected render() {
    if (!this.config) return nothing;
    const steps = this.steps;
    const step = steps[this.step];
    const last = this.step === steps.length - 1;
    return html`<div class="card" role="dialog" aria-modal="true">
      <header>
        <div class="title">${iconSvg("sparkle", "ic")}${this.mode === "first" ? t("Willkommen bei Ambiframe") : t("Neues Display")}</div>
        <div class="dots">${steps.map((_, i) => html`<i class=${i === this.step ? "on" : i < this.step ? "done" : ""}></i>`)}</div>
      </header>
      <main>${this.renderStep(step)}</main>
      <footer>
        <button class="ghost" @click=${() => this.close()}>${this.mode === "first" ? t("Überspringen") : t("Abbrechen")}</button>
        <span class="grow"></span>
        ${this.step > 0 ? html`<button @click=${() => this.step--}>${t("Zurück")}</button>` : nothing}
        ${last
          ? html`<button class="primary" @click=${() => this.finish()}>${t("Fertig – speichern")}</button>`
          : html`<button class="primary" ?disabled=${step === "place" && !this.name.trim()} @click=${() => this.step++}>${t("Weiter")}</button>`}
      </footer>
    </div>`;
  }

  private renderStep(step: Step): TemplateResult {
    switch (step) {
      case "welcome":
        return this.renderWelcome();
      case "place":
        return this.renderPlace();
      case "content":
        return this.renderContent();
      case "events":
        return this.renderEvents();
      case "photos":
        return this.renderPhotos();
      case "device":
        return this.renderDevice();
      default:
        return this.renderDone();
    }
  }

  private renderWelcome() {
    const langs: [string, string][] = [
      ["auto", t("automatisch (wie der HA-Benutzer)")],
      ["de", "Deutsch"],
      ["en", "English"],
      ["nl", "Nederlands"],
      ["fr", "Français"],
    ];
    return html`<h2>${t("Ein ruhiges Bild – das nur spricht, wenn etwas ist")}</h2>
      <p class="lead">
        ${t("In wenigen Schritten richtest du dein erstes Display ein: wo es hängt, was es zeigt, worauf es reagiert. Alles lässt sich später im Editor ändern.")}
      </p>
      <label class="field"
        ><span>${t("Sprache")}</span>
        <select @change=${(e: Event) => (this.language = (e.target as HTMLSelectElement).value as "auto" | Lang)}>
          ${langs.map(([v, l]) => html`<option value=${v} ?selected=${this.language === v}>${l}</option>`)}
        </select></label
      >
      <h3>${t("Stil")}</h3>
      <div class="grid">
        ${THEMES.map(
          (th) => html`<button class="choice ${this.theme === th.id ? "on" : ""}" @click=${() => (this.theme = th.id as Theme)}>
            <b>${t(th.name)}</b><span>${t(th.hint)}</span>
          </button>`,
        )}
      </div>`;
  }

  private renderPlace() {
    return html`<h2>${t("Wo hängt das Display?")}</h2>
      <p class="lead">${t("Das Profil wählt passende Seiten, Bedienung, Töne und Aussehen. Du kannst danach alles anpassen.")}</p>
      <div class="grid">
        ${PROFILES.map(
          (p) => html`<button class="choice ${this.profileId === p.id ? "on" : ""}" @click=${() => this.pickProfile(p.id)}>
            <b>${iconSvg(p.icon, "ic")}${t(p.name)}</b><span>${t(p.hint)}</span>
          </button>`,
        )}
      </div>
      <label class="field"
        ><span>${t("Name")}</span><input .value=${this.name} @input=${(e: Event) => (this.name = (e.target as HTMLInputElement).value)}
      /></label>`;
  }

  private toggled(set: Set<string>, id: string): Set<string> {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  }

  private renderContent() {
    const offer = this.offeredTemplates();
    return html`<h2>${t("Was soll das Display zeigen?")}</h2>
      <p class="lead">${t("Vorausgewählt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.")}</p>
      <div class="checks">
        ${this.config!.pages.map(
          (p) => html`<label class="check"
            ><input type="checkbox" .checked=${this.pages.has(p.id)} @change=${() => (this.pages = this.toggled(this.pages, p.id))} /><span
              >${p.name}</span
            ></label
          >`,
        )}
      </div>
      ${offer.length
        ? html`<h3>${t("Neue Seiten dazu")}</h3>
            <div class="checks">
              ${offer.map(
                (x) => html`<label class="check"
                  ><input type="checkbox" .checked=${this.extras.has(x)} @change=${() => (this.extras = this.toggled(this.extras, x))} /><span
                    >${t(PAGE_TEMPLATES.find((p) => p.id === x)!.name)}</span
                  ></label
                >`,
              )}
            </div>`
        : nothing}`;
  }

  private entitySelect(value: string, options: string[], onChange: (v: string) => void) {
    return html`<select @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
      <option value="" ?selected=${!value}>${t("keine")}</option>
      ${options.map((id) => html`<option value=${id} ?selected=${id === value}>${label(this.hass, id)}</option>`)}
    </select>`;
  }

  private soundSelect(value: string, onChange: (v: string) => void, volume: number) {
    return html`<span class="sound">
      <select @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
        <option value="" ?selected=${!value}>${t("ohne Ton")}</option>
        ${SOUNDS.filter(([id]) => id !== "alarm").map(([id, name]) => html`<option value=${id} ?selected=${id === value}>${t(name)}</option>`)}
      </select>
      <button class="small" ?disabled=${!value} title=${t("Anhören")} @click=${() => value && playSound(value, volume)}>▶</button>
    </span>`;
  }

  private renderEvent(icon: string, title: string, choice: EventChoice, set: (c: EventChoice) => void, candidates: string[], volume: number, note?: string) {
    return html`<div class="event ${choice.on ? "" : "off"}">
      <label class="switch"
        ><input type="checkbox" .checked=${choice.on} @change=${() => set({ ...choice, on: !choice.on })} /><b>${iconSvg(icon, "ic")}${title}</b></label
      >
      <div class="rows">
        <label><span>${t("Auslöser")}</span>${this.entitySelect(choice.entity, candidates, (v) => set({ ...choice, entity: v }))}</label>
        <label><span>${t("Kamera")}</span>${this.entitySelect(choice.camera, ids(this.hass, "camera"), (v) => set({ ...choice, camera: v }))}</label>
        <label><span>${t("Ton")}</span>${this.soundSelect(choice.sound, (v) => set({ ...choice, sound: v }), volume)}</label>
      </div>
      ${note ? html`<p class="hint">${note}</p>` : nothing}
    </div>`;
  }

  private renderEvents() {
    const appliances = this.applianceCandidates();
    return html`<h2>${t("Worauf soll es reagieren?")}</h2>
      <p class="lead">${t("Gefunden in deinem Home Assistant. Töne sind dezent und passen zum Design – zum Anhören ▶ drücken.")}</p>
      ${this.renderEvent("bell", t("Klingel → Vollbild mit Kamera"), this.doorbell, (c) => (this.doorbell = c), this.doorbellCandidates(), 80)}
      ${this.renderEvent(
        "motion",
        t("Bewegung an der Tür → Kamera als Bild-im-Bild"),
        this.motion,
        (c) => (this.motion = c),
        this.motionCandidates(),
        30,
        t("Leiser als die Klingel, nachts (22–7 Uhr) stumm."),
      )}
      ${appliances.length
        ? html`<div class="event">
            <b>${iconSvg("washer", "ic")}${t("Gerät fertig → Hinweis und Erinnerung")}</b>
            <div class="checks">
              ${appliances.map(
                (id) => html`<label class="check"
                  ><input type="checkbox" .checked=${this.appliances.has(id)} @change=${() => (this.appliances = this.toggled(this.appliances, id))} /><span
                    >${label(this.hass, id)}</span
                  ></label
                >`,
              )}
            </div>
          </div>`
        : nothing}`;
  }

  private renderPhotos() {
    const p = this.photos;
    return html`<h2>${t("Woher kommen die Fotos?")}</h2>
      <p class="lead">${t("Für den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.")}</p>
      <label class="field"
        ><span>${t("Fotoordner")}</span
        ><input
          .value=${p.folder}
          placeholder="media-source://media_source/local/ambiframe"
          @input=${(e: Event) => (this.photos = { ...p, folder: (e.target as HTMLInputElement).value })}
      /></label>
      <p class="hint">${t("HA → Medien → Lokale Medien → Ordner „ambiframe“ anlegen und Fotos hochladen.")}</p>
      <label class="field"
        ><span>${t("iCloud-Album")}</span
        ><input
          .value=${p.icloud}
          placeholder="https://photos.icloud.com/shared/album/…"
          @input=${(e: Event) => (this.photos = { ...p, icloud: (e.target as HTMLInputElement).value })}
      /></label>
      <p class="hint">${t("Fotos-App → Album teilen → „Öffentliche Website“ an → Link kopieren.")}</p>
      <label class="check"
        ><input type="checkbox" .checked=${p.bing} @change=${() => (this.photos = { ...p, bing: !p.bing })} /><span
          >${t("Bing-Bilder, wenn Ordner und Album leer sind")}</span
        ></label
      >`;
  }

  private renderDevice() {
    const options: ["embedded" | "screensaver" | "off", string, string][] = [
      ["embedded", t("Dashboard über Ambiframe"), t("Ambiframe läuft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zurück.")],
      [
        "screensaver",
        t("Ambiframe als Bildschirmschoner"),
        t("Fully zeigt das Dashboard; nach einer Minute ohne Berührung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn."),
      ],
      ["off", t("Nur anzeigen"), t("Keine Bedienung – z. B. für den Fernseher.")],
    ];
    return html`<h2>${t("Bedienung")}</h2>
      <div class="grid">
        ${options.map(
          ([v, name, hint]) => html`<button class="choice ${this.control === v ? "on" : ""}" @click=${() => (this.control = v)}>
            <b>${name}</b><span>${hint}</span>
          </button>`,
        )}
      </div>
      ${this.control !== "off"
        ? html`<label class="field"
            ><span>${t("Dashboard")}</span><input .value=${this.dashboard} @input=${(e: Event) => (this.dashboard = (e.target as HTMLInputElement).value)}
          /></label>`
        : nothing}
      <p class="hint">
        ${this.fullyButton()
          ? t("Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es hängt.")
          : t("Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.")}
      </p>`;
  }

  private renderDone() {
    const { config, displayId } = this.build();
    const display = config.displays.find((d) => d.id === displayId)!;
    const url = `${location.origin}/ambiframe-display?display=${encodeURIComponent(displayId)}`;
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    const newEvents = config.events.length - this.config!.events.length;
    const controlName =
      this.control === "off" ? t("Nur anzeigen") : this.control === "screensaver" ? t("Ambiframe als Bildschirmschoner") : t("Dashboard über Ambiframe");
    return html`<h2>${t("Fertig!")}</h2>
      <p class="lead">
        ${t("So richtest du das Gerät ein: diese Adresse im Browser des Tablets oder Fernsehers öffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.")}
      </p>
      <div class="done">
        <div class="qr">${unsafeSVG(qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true }))}</div>
        <div>
          <code>${url}</code>
          <p><button class="small" @click=${() => navigator.clipboard?.writeText(url)}>${t("Adresse kopieren")}</button></p>
          <ul>
            <li>${t("Display „{name}“ mit {n} Seiten", { name: display.name, n: display.playlist.length })}</li>
            ${newEvents > 0 ? html`<li>${t("{n} neue Ereignisse", { n: newEvents })}</li>` : nothing}
            <li>${controlName}</li>
          </ul>
        </div>
      </div>`;
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 20;
      display: grid;
      place-items: center;
      padding: 16px;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(6px);
      color: var(--primary-text-color, #eee);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    }
    .card {
      width: min(760px, 100%);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 18px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
      overflow: hidden;
    }
    header,
    footer {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
    }
    header {
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    footer {
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .ic {
      width: 18px;
      height: 18px;
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .dots {
      display: flex;
      gap: 6px;
    }
    .dots i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--divider-color, rgba(127, 127, 127, 0.35));
    }
    .dots i.done {
      background: var(--secondary-text-color, #999);
    }
    .dots i.on {
      background: var(--primary-color, #03a9f4);
    }
    main {
      padding: 6px 20px 18px;
      overflow: auto;
    }
    h2 {
      margin: 14px 0 6px;
      font-size: 21px;
      font-weight: 600;
    }
    h3 {
      margin: 18px 0 8px;
      font-size: 15px;
    }
    .lead,
    .hint {
      color: var(--secondary-text-color, #aaa);
      margin: 0 0 12px;
      line-height: 1.45;
    }
    .hint {
      font-size: 13px;
      margin-top: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }
    .choice {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 12px 14px;
      text-align: left;
      border-radius: 12px;
    }
    .choice b {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
    }
    .choice span {
      color: var(--secondary-text-color, #aaa);
      font-size: 13px;
      line-height: 1.35;
    }
    .choice.on {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: inset 0 0 0 1px var(--primary-color, #03a9f4);
    }
    button,
    select,
    input:not([type="checkbox"]) {
      font: inherit;
      color: inherit;
      background: var(--primary-background-color, #111);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 8px;
      padding: 8px 12px;
      min-width: 0;
    }
    button {
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.ghost {
      background: none;
      border-color: transparent;
      color: var(--secondary-text-color, #aaa);
    }
    button.small {
      padding: 6px 10px;
    }
    .grow {
      flex: 1;
    }
    .field {
      display: grid;
      grid-template-columns: 140px 1fr;
      align-items: center;
      gap: 10px;
      margin: 12px 0 0;
    }
    .field span,
    .rows label span {
      color: var(--secondary-text-color, #aaa);
      font-size: 14px;
    }
    .checks {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 6px 14px;
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
    .event {
      margin: 12px 0;
      padding: 12px 14px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 12px;
    }
    .event b {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .event.off .rows {
      opacity: 0.45;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .rows {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }
    .rows label {
      display: grid;
      grid-template-columns: 90px 1fr;
      align-items: center;
      gap: 10px;
    }
    .sound {
      display: flex;
      gap: 6px;
    }
    .sound select {
      flex: 1;
    }
    .done {
      display: grid;
      grid-template-columns: 170px 1fr;
      gap: 18px;
      align-items: start;
    }
    .qr {
      background: #fff;
      padding: 8px;
      border-radius: 10px;
    }
    .qr svg {
      display: block;
      width: 100%;
      height: auto;
    }
    code {
      word-break: break-all;
      font-size: 13px;
    }
    ul {
      padding-left: 18px;
      color: var(--secondary-text-color, #aaa);
    }
    @media (max-width: 560px) {
      .field,
      .rows label,
      .done {
        grid-template-columns: 1fr;
      }
      .done .qr {
        width: 160px;
      }
    }
  `;
}

define("af-wizard", AfWizard);
