// Einstieg: Schriften registrieren und alle Elemente laden (Widgets, Anzeige, Panels)
import { registerFonts } from "./fonts";
import "./widgets/registry";
import "./display/page";
import "./display/display";
import "./panel/display-panel";
import "./panel/editor";
import "./panel/studio";

registerFonts();
