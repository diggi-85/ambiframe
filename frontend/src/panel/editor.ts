// Panel „ambiframe“ in der HA-Seitenleiste: zeigt das Studio. Seiteneditor, Momente, Aussehen, Technik, YAML und
// der Einrichtungsassistent sind dort – der frühere Experten-Editor ist darin aufgegangen.
import { LitElement, css, html } from "lit";
import "./studio";
import type { Hass } from "../types";
import { define } from "../widgets/base";

class AmbiframePanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { attribute: false },
    route: { attribute: false },
    panel: { attribute: false },
  };

  hass?: Hass;
  narrow = false;

  render() {
    return html`<ambiframe-studio .hass=${this.hass} .narrow=${this.narrow}></ambiframe-studio>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
    }
  `;
}

define("ambiframe-panel", AmbiframePanel);
