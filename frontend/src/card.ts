// Kleiner Einstieg für Dashboards: Karte „Ambiframe“. Sie lädt die eigentliche Anzeige erst, wenn sie gebraucht wird –
// so kann z. B. der Kiosk-Modus der HA-App (iPad) ein normales Dashboard öffnen und zeigt trotzdem Ambiframe im Vollbild.
//   type: custom:ambiframe-card
//   display: wohnzimmer

interface CardConfig {
  display?: string;
}

// Gleiche Adresse wie das Panel (inkl. ?v=…), damit das Bündel nur einmal geladen wird
const BUNDLE = new URL(`ambiframe.js${new URL(import.meta.url).search}`, import.meta.url).href;

class AmbiframeCard extends HTMLElement {
  private config: CardConfig = {};
  private current?: unknown;
  private panel?: HTMLElement & { hass?: unknown; display?: string };
  private editing = false;

  setConfig(config: CardConfig): void {
    this.config = config ?? {};
    if (this.panel) this.panel.display = this.config.display;
    this.render();
  }

  set hass(hass: unknown) {
    this.current = hass;
    if (this.panel) this.panel.hass = hass;
    else this.render();
  }

  // Im Bearbeiten-Modus nur ein Platzhalter – sonst läge die Vollbild-Anzeige über dem Dashboard-Editor
  set editMode(on: boolean) {
    this.setEditing(on);
  }

  set preview(on: boolean) {
    this.setEditing(on);
  }

  private setEditing(on: boolean): void {
    if (on === this.editing) return;
    this.editing = on;
    this.panel?.remove();
    this.panel = undefined;
    this.render();
  }

  getCardSize(): number {
    return 8;
  }

  private render(): void {
    if (!this.current) return;
    if (this.editing) {
      this.innerHTML = "";
      const box = document.createElement("ha-card");
      box.style.cssText = "padding:24px;text-align:center;color:var(--secondary-text-color)";
      box.textContent = `Ambiframe${this.config.display ? ` · ${this.config.display}` : ""} – Vollbild außerhalb des Bearbeitens`;
      this.append(box);
      return;
    }
    if (this.panel) return;
    this.innerHTML = "";
    void import(/* @vite-ignore */ BUNDLE).then(() => {
      if (this.panel || this.editing) return;
      const panel = document.createElement("ambiframe-display-panel") as HTMLElement & { hass?: unknown; display?: string };
      panel.display = this.config.display;
      panel.hass = this.current;
      this.panel = panel;
      this.append(panel);
    });
  }
}

if (!customElements.get("ambiframe-card")) customElements.define("ambiframe-card", AmbiframeCard);

const w = window as unknown as { customCards?: { type: string; name: string; description: string }[] };
w.customCards = w.customCards ?? [];
if (!w.customCards.some((c) => c.type === "ambiframe-card")) {
  w.customCards.push({
    type: "ambiframe-card",
    name: "Ambiframe",
    description: "Ambiframe im Vollbild – z. B. für den Kiosk-Modus der HA-App auf dem iPad",
  });
}
