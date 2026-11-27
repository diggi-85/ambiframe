// Geräte-Kacheln und Übersicht-Pillen – wie eine Smart-Home-App: eingeschaltete Geräte hell mit farbigem runden Icon,
// ausgeschaltete als Glas; oben Pillen mit Klima, Licht, Sicherheit und Medien. Passt zu jedem Stil, am besten zu „Daheim“.
import { css, html, nothing } from "lit";
import { t } from "../i18n";
import { anyIcon } from "../icons";
import { widgetStyles } from "../styles";
import type { Hass, HassEntity } from "../types";
import { fmt, nameOf, stateOf } from "../util";
import { AfWidget, define } from "./base";
import { listOf } from "./plus";

const ON = new Set(["on", "open", "opening", "playing", "unlocked", "heat", "cool", "heat_cool", "auto", "cleaning"]);
/** Diese Geräte schaltet ein Antippen um */
const TOGGLE = new Set(["light", "switch", "fan", "input_boolean"]);
const DOMAIN_ICON: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:power-plug",
  fan: "mdi:fan",
  lock: "mdi:lock",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  media_player: "mdi:speaker",
  input_boolean: "mdi:toggle-switch",
  sensor: "mdi:gauge",
};

export const tileOn = (s?: HassEntity): boolean => !!s && ON.has(s.state);

/** Zustand kurz: „80 %“, „Aus“, „21,5 °C“ – sonst wie HA ihn übersetzt */
export const tileState = (hass: Hass | undefined, s?: HassEntity): string => {
  if (!s) return "–";
  const d = s.entity_id.split(".")[0];
  if (d === "light" && s.state === "on" && s.attributes.brightness != null) return `${Math.round((Number(s.attributes.brightness) / 255) * 100)} %`;
  if (d === "sensor") return `${s.state}${s.attributes.unit_of_measurement ? ` ${s.attributes.unit_of_measurement}` : ""}`;
  const format = (hass as { formatEntityState?: (x: HassEntity) => string } | undefined)?.formatEntityState;
  try {
    if (format) return format(s);
  } catch {
    /* ältere HA-Versionen */
  }
  return s.state === "on" ? t("Ein") : s.state === "off" ? t("Aus") : s.state;
};

class AfHomeTiles extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr));
        gap: 12px;
      }
      .tile {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 18px 14px 14px;
        border-radius: 22px;
        background: var(--af-tile-off, rgba(0, 0, 0, 0.22));
        backdrop-filter: blur(24px) saturate(1.5);
        -webkit-backdrop-filter: blur(24px) saturate(1.5);
        color: var(--af-ink);
        cursor: pointer;
        transition:
          background 0.3s ease,
          color 0.3s ease,
          transform 0.15s ease;
        min-width: 0;
      }
      .tile:active {
        transform: scale(0.97);
      }
      .tile.on {
        background: var(--af-tile-on, rgba(255, 255, 255, 0.94));
        color: #1c1c1e;
      }
      .ic {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        flex: none;
        display: grid;
        place-items: center;
        font-size: 28px;
        background: rgba(0, 0, 0, 0.2);
        color: var(--af-ink-2);
      }
      .on .ic {
        background: var(--af-accent);
        color: #fff;
      }
      .n {
        font-size: calc(19px * var(--af-fs, 1));
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .s {
        font-size: calc(16px * var(--af-fs, 1));
        opacity: 0.66;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile > div:last-child {
        min-width: 0;
      }
    `,
  ];

  private toggle(id: string): void {
    if (this.ctx?.preview || !TOGGLE.has(id.split(".")[0])) return;
    void this.hass?.callService("homeassistant", "toggle", { entity_id: id });
  }

  render() {
    const ids = listOf(this.options.entities);
    const label = this.options.label ? html`<div class="label">${this.options.label}</div>` : nothing;
    if (!ids.length) return html`${label}<div class="calm">${t("Geräte wählen")}</div>`;
    return html`${label}
      <div class="grid">
        ${ids.map((id) => {
          const s = stateOf(this.hass, id);
          const on = tileOn(s);
          const icon = (s?.attributes.icon as string | undefined) ?? DOMAIN_ICON[id.split(".")[0]] ?? "mdi:circle-outline";
          return html`<div class="tile ${on ? "on" : ""}" @click=${() => this.toggle(id)}>
            <span class="ic">${anyIcon(icon)}</span>
            <div><div class="n">${nameOf(this.hass, id)}</div><div class="s">${tileState(this.hass, s)}</div></div>
          </div>`;
        })}
      </div>`;
  }
}

/** Übersicht-Pillen: zählen selbst aus HA – Klima (Spanne der Raumtemperaturen), Licht, Sicherheit, Medien */
export const pillsOf = (hass: Hass | undefined): { icon: string; name: string; value: string; color: string }[] => {
  const all = Object.values(hass?.states ?? {});
  const of = (d: string) => all.filter((s) => s.entity_id.startsWith(`${d}.`));
  const temps = [
    ...of("climate").map((s) => Number(s.attributes.current_temperature)),
    ...of("sensor")
      .filter((s) => s.attributes.device_class === "temperature" && !/au(ss|ß)en|outdoor|outside/i.test(String(s.attributes.friendly_name ?? "")))
      .map((s) => Number(s.state)),
  ].filter((n) => Number.isFinite(n) && n > 5 && n < 35);
  // Lichtgruppen (attributes.entity_id) nicht mitzählen – ihre Lampen zählen schon einzeln
  const lights = of("light").filter((s) => s.state === "on" && !Array.isArray(s.attributes.entity_id)).length;
  const unlocked = of("lock").filter((s) => s.state === "unlocked").length;
  const playing = of("media_player").filter((s) => s.state === "playing").length;
  const out: { icon: string; name: string; value: string; color: string }[] = [];
  if (temps.length) {
    const lo = Math.min(...temps);
    const hi = Math.max(...temps);
    out.push({ icon: "mdi:fan", name: t("Klima"), value: Math.round(lo) === Math.round(hi) ? `${fmt(lo, 1)}°` : `${Math.round(lo)}–${Math.round(hi)}°`, color: "#5ac8fa" });
  }
  out.push({ icon: "mdi:lightbulb", name: t("Licht"), value: lights ? t("{n} an", { n: lights }) : t("alle aus"), color: "#ffcc00" });
  if (of("lock").length) out.push({ icon: unlocked ? "mdi:lock-open-variant" : "mdi:lock", name: t("Sicherheit"), value: unlocked ? t("{n} aufgeschlossen", { n: unlocked }) : t("alles zu"), color: "#5ce1c6" });
  if (of("media_player").length) out.push({ icon: "mdi:speaker", name: t("Lautsprecher & TVs"), value: playing ? t("{n} spielt", { n: playing }) : t("nichts läuft"), color: "#b9c4d0" });
  return out;
};

class AfPills extends AfWidget {
  static styles = [
    widgetStyles,
    css`
      .row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
        height: 100%;
      }
      .pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 22px 10px 14px;
        border-radius: 999px;
        background: var(--af-chip, rgba(120, 130, 140, 0.45));
        backdrop-filter: blur(20px) saturate(1.4);
        -webkit-backdrop-filter: blur(20px) saturate(1.4);
      }
      .pill .ic {
        font-size: 26px;
        display: grid;
      }
      .pill b {
        display: block;
        font-size: calc(17px * var(--af-fs, 1));
        font-weight: 600;
      }
      .pill span {
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
    `,
  ];

  render() {
    return html`<div class="row">
      ${pillsOf(this.hass).map(
        (p) => html`<div class="pill"><span class="ic" style="color:${p.color}">${anyIcon(p.icon)}</span><div><b>${p.name}</b><span>${p.value}</span></div></div>`,
      )}
    </div>`;
  }
}

define("af-hometiles", AfHomeTiles);
define("af-pills", AfPills);
