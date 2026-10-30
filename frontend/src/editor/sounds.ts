// Tonbibliothek „Eigene Töne“: Name und Quelle (Link, /local/… oder Datei aus HA-Medien), mit Probehören.
// Gemeinsam für Studio (Momente) und Experten-Editor (Ereignisse); Änderungen gehen als „sounds-changed“ an den Editor.
import { LitElement, css, html } from "lit";
import { t } from "../i18n";
import { playSound } from "../sound";
import type { Hass, SoundConfig } from "../types";
import { define } from "../widgets/base";
import { uniqueId } from "./schemas";

/** Audiodateien unter „Lokale Medien“ (bis zwei Ordner tief) – einmal pro Seite laden */
let mediaSounds: Promise<[string, string][]> | undefined;
const loadMediaSounds = (hass: Hass): Promise<[string, string][]> =>
  (mediaSounds ??= (async () => {
    type Item = { media_content_id: string; title: string; media_class?: string; media_content_type?: string; can_expand?: boolean; children?: Item[] };
    const found: [string, string][] = [];
    const walk = async (id: string, depth: number, path: string): Promise<void> => {
      if (found.length >= 200) return;
      let item: Item;
      try {
        item = await hass.callWS<Item>({ type: "media_source/browse_media", media_content_id: id });
      } catch {
        return;
      }
      for (const child of item.children ?? []) {
        const name = path ? `${path}/${child.title}` : child.title;
        if (child.can_expand) {
          if (depth < 2) await walk(child.media_content_id, depth + 1, name);
        } else if (child.media_class === "music" || child.media_content_type?.startsWith("audio/")) {
          found.push([child.media_content_id, name]);
        }
      }
    };
    await walk("media-source://media_source/local", 0, "");
    return found;
  })());

class AfSoundLibrary extends LitElement {
  static properties = { hass: { attribute: false }, sounds: { attribute: false }, media: { state: true } };

  static styles = css`
    :host {
      display: block;
    }
    h4 {
      margin: 14px 0 4px;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.7;
    }
    .hint {
      margin: 0 0 6px;
      font-size: 13px;
      opacity: 0.7;
    }
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto auto;
      gap: 6px;
      margin: 6px 0;
    }
    input {
      min-width: 0;
      font: inherit;
      color: inherit;
      background: rgba(127, 127, 127, 0.12);
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 8px;
      padding: 6px 8px;
    }
    button {
      font: inherit;
      font-size: 13px;
      color: inherit;
      background: rgba(127, 127, 127, 0.15);
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 999px;
      padding: 4px 10px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .danger {
      color: #e5484d;
    }
  `;

  hass?: Hass;
  sounds: SoundConfig[] = [];
  private media: [string, string][] = [];

  protected firstUpdated(): void {
    if (this.hass) void loadMediaSounds(this.hass).then((m) => (this.media = m));
  }

  /** key: Änderungen am selben Feld fasst der Experten-Editor zu einem Rückgängig-Schritt zusammen */
  private emit(sounds: SoundConfig[], key?: string): void {
    this.dispatchEvent(new CustomEvent("sounds-changed", { detail: { sounds, key } }));
  }

  render() {
    const list = this.sounds;
    const set = (i: number, field: "name" | "url", value: string) =>
      this.emit(
        list.map((s, n) => (n === i ? { ...s, [field]: value } : s)),
        `sound-${list[i].id}-${field}`,
      );
    return html`<h4>${t("Eigene Töne")}</h4>
      <p class="hint">${t("Audiodatei in HA unter Medien → Lokale Medien hochladen und hier auswählen – oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.")}</p>
      ${list.map(
        (s, i) => html`<div class="row">
          <input .value=${s.name} placeholder=${t("Name")} @input=${(e: Event) => set(i, "name", (e.target as HTMLInputElement).value)} />
          <input
            .value=${s.url}
            list="media"
            placeholder="media-source://…, /local/… ${t("oder")} https://…"
            @input=${(e: Event) => set(i, "url", (e.target as HTMLInputElement).value.trim())}
          />
          <button title=${t("Anhören")} ?disabled=${!s.url} @click=${() => void playSound(s.id, 70, { hass: this.hass, library: list })}>▶</button>
          <button class="danger" title=${t("Löschen")} @click=${() => this.emit(list.filter((_, n) => n !== i))}>✕</button>
        </div>`,
      )}
      <datalist id="media">${this.media.map(([value, label]) => html`<option value=${value}>${label}</option>`)}</datalist>
      <button @click=${() => this.emit([...list, { id: uniqueId("ton", list.map((x) => x.id)), name: t("Mein Ton"), url: "" }])}>${t("+ Ton hinzufügen")}</button>`;
  }
}

define("af-sound-library", AfSoundLibrary);
