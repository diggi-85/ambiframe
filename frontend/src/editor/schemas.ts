// Was der Editor pro Widget, Seite, Ereignis und Display anzeigt – plus Vorlagen für neue Elemente
import { t } from "../i18n";
import { FONTS } from "../fonts";
import { THEMES } from "../styles";
import { WEBCAM_PRESETS } from "../widgets/media";
import { NEWS_PRESETS } from "../widgets/news";
import type { EventConfig, Hass, PageConfig, AmbiframeConfig, WidgetConfig } from "../types";
import { SOUNDS } from "../sound";
import { formContext, type Field } from "./form";

const COLOR: Field = {
  key: "color",
  label: "Farbe",
  type: "select",
  options: [
    [undefined, "Standard"],
    ["ink", "Hell / Tinte"],
    ["muted", "Gedämpft"],
    ["faint", "Leise"],
    ["accent", "Akzent (Gold)"],
  ],
};
const LABEL: Field = { key: "label", label: "Überschrift", type: "text" };
const TONE: Field = {
  key: "color",
  label: "Farbe",
  type: "select",
  options: [
    [undefined, "automatisch"],
    ["accent", "Akzent"],
    ["cold", "Kühl (blau)"],
    ["good", "Gut (grün)"],
    ["alert", "Warnung (rot)"],
    ["ink", "Hell / Tinte"],
    ["muted", "Gedämpft"],
  ],
};
const FRAME: Field = { key: "style", label: "Rahmen", type: "select", options: [[undefined, "Schlicht"], ["card", "Karte"]] };

export const WIDGET_FIELDS: Record<string, Field[]> = {
  clock: [
    { key: "size", label: "Größe", type: "select", options: [[undefined, "füllt das Feld"], ["small", "klein (Kopfzeile)"]] },
    { key: "font", label: "Schrift", type: "select", options: [[undefined, "Stil-Schrift"], ["sans", "Schlicht"]] },
    { key: "seconds", label: "Sekunden", type: "boolean" },
    COLOR,
  ],
  date: [
    { key: "style", label: "Darstellung", type: "select", options: [[undefined, "Zeile"], ["card", "Karte"]] },
    { key: "format", label: "Format", type: "select", options: [[undefined, "Montag, 12. Oktober"], ["short", "Mo., 12. Okt."]] },
    { key: "size", label: "Schriftgröße", type: "number", min: 10, max: 120, placeholder: "26" },
    COLOR,
  ],
  text: [
    {
      key: "text",
      label: "Text",
      type: "textarea",
      help: "Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} °C – wird live aktualisiert.",
    },
    { key: "markdown", label: "Formatierung (Markdown)", type: "boolean", help: "# Titel, - Liste, **fett**, *Akzent*, [mdi:icon], --- Linie" },
    { key: "style", label: "Stil", type: "select", options: [[undefined, "Fließtext"], ["label", "Überschrift klein"], ["title", "Titel"], ["big", "Groß"]] },
    { key: "size", label: "Schriftgröße", type: "number", min: 10, max: 200 },
    { key: "icon", label: "Icon", type: "icon" },
    COLOR,
  ],
  chart: [
    LABEL,
    {
      key: "entities",
      label: "Entitäten",
      type: "list",
      addLabel: "Entität hinzufügen",
      itemLabel: (it) => it.name || it.entity || "Entität",
      newItem: () => ({}),
      fields: [{ key: "entity", label: "Entität", type: "entity" }, { key: "name", label: "Name", type: "text", placeholder: "automatisch" }, TONE],
    },
    { key: "kind", label: "Darstellung", type: "select", options: [[undefined, "Linie"], ["area", "Fläche"], ["bar", "Balken"]] },
    { key: "hours", label: "Zeitraum (Stunden)", type: "number", min: 1, placeholder: "24", help: "168 = eine Woche, 720 = 30 Tage" },
    { key: "period", label: "Ein Balken je", type: "select", options: [[undefined, "automatisch"], ["hour", "Stunde"], ["day", "Tag"]], when: (v) => v.kind === "bar" },
    { key: "value", label: "Aktuellen Wert zeigen", type: "boolean", default: true, when: (v) => v.kind !== "bar" },
    { key: "min", label: "Achse von", type: "number", placeholder: "automatisch" },
    { key: "max", label: "Achse bis", type: "number", placeholder: "automatisch" },
    { key: "unit", label: "Einheit", type: "text", placeholder: "automatisch" },
    { key: "decimals", label: "Nachkommastellen", type: "number", min: 0, max: 4 },
    FRAME,
  ],
  gauge: [
    { key: "entity", label: "Entität", type: "entity" },
    { key: "attribute", label: "Attribut", type: "text" },
    { key: "name", label: "Name", type: "text", placeholder: "automatisch" },
    { key: "icon", label: "Icon", type: "icon" },
    { key: "kind", label: "Form", type: "select", options: [[undefined, "Ring"], ["half", "Halbkreis"]] },
    { key: "min", label: "Minimum", type: "number", placeholder: "0", advanced: false },
    { key: "max", label: "Maximum", type: "number", placeholder: "100", advanced: false },
    { key: "unit", label: "Einheit", type: "text", placeholder: "automatisch" },
    { key: "decimals", label: "Nachkommastellen", type: "number", min: 0, max: 4 },
    TONE,
    {
      key: "severity",
      label: "Farbe ab Wert",
      type: "list",
      addLabel: "Stufe hinzufügen",
      itemLabel: (it) => t("ab {n}", { n: it.from ?? "?" }),
      newItem: () => ({ from: 0, color: "good" }),
      fields: [{ key: "from", label: "ab Wert", type: "number" }, TONE],
    },
    FRAME,
  ],
  image: [
    {
      key: "url",
      label: "Bild-Link",
      type: "text",
      placeholder: "https://…, /local/bild.jpg oder media-source://…",
      help: "Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg",
    },
    { key: "entity", label: "… oder Bild einer Entität", type: "entity", when: (v) => !v.url, help: "Person, image.*, Kamera, Medienplayer …" },
    { key: "fit", label: "Einpassen", type: "select", options: [[undefined, "Füllen (zuschneiden)"], ["contain", "Ganz zeigen"]] },
    { key: "refresh", label: "Neu laden alle (s)", type: "number", min: 0, placeholder: "nie" },
    { key: "caption", label: "Bildunterschrift", type: "text", help: "Darf eine Vorlage sein." },
    { key: "radius", label: "Eckenradius (px)", type: "number", min: 0, placeholder: "28" },
  ],
  weather: [
    { key: "entity", label: "Wetter", type: "entity", domains: ["weather"] },
    {
      key: "variant",
      label: "Darstellung",
      type: "select",
      options: [
        [undefined, "Jetzt (groß)"],
        ["card", "Karte mit 4 Stunden"],
        ["hourly", "Stunden-Kurve"],
        ["daily", "Nächste Tage"],
        ["rain", "Regen-Vorschau"],
        ["line", "Eine Zeile"],
      ],
    },
    { key: "name", label: "Ortsname", type: "text", when: (v) => v.variant === "card" },
    { key: "hours", label: "Stunden", type: "number", min: 2, max: 48, when: (v) => v.variant === "hourly" || v.variant === "rain" },
    { key: "days", label: "Tage", type: "number", min: 1, max: 7, when: (v) => v.variant === "daily" },
    { key: "rain_sensor", label: "Regensensor", type: "entity", domains: ["binary_sensor"], when: (v) => v.variant === "rain" },
    { key: "threshold", label: "Regen ab %", type: "number", min: 0, max: 100, when: (v) => v.variant === "rain" },
    { ...LABEL, when: (v) => v.variant === "hourly" || v.variant === "daily" },
  ],
  value: [
    { key: "entity", label: "Entität", type: "entity" },
    { key: "attribute", label: "Attribut", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "style", label: "Darstellung", type: "select", options: [[undefined, "Schlicht"], ["card", "Karte"]] },
    { ...LABEL, when: (v) => v.style === "card" },
    { key: "icon", label: "Icon", type: "icon" },
    { key: "unit", label: "Einheit", type: "text", placeholder: "automatisch" },
    { key: "decimals", label: "Nachkommastellen", type: "number", min: 0, max: 4 },
    { key: "cold", label: "Kalt unter", type: "number", help: "Wert wird blau, wenn er darunter liegt." },
    {
      key: "sub",
      label: "Unterzeile",
      type: "object",
      when: (v) => v.style === "card",
      fields: [
        { key: "entity", label: "Entität", type: "entity" },
        { key: "suffix", label: "Text danach", type: "text", placeholder: "% Luftfeuchte" },
      ],
    },
    {
      key: "secondary",
      label: "Weitere Werte",
      type: "list",
      when: (v) => v.style === "card",
      addLabel: "Wert",
      itemLabel: (it) => it.name ?? it.entity ?? "Wert",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "entity", label: "Entität", type: "entity" },
        { key: "decimals", label: "Nachkommastellen", type: "number", min: 0, max: 4 },
      ],
    },
  ],
  rooms: [
    {
      key: "rooms",
      label: "Räume",
      type: "list",
      addLabel: "Raum",
      itemLabel: (it) => it.name ?? "Raum",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "temperature", label: "Temperatur", type: "entity", domains: ["sensor", "climate"] },
        { key: "humidity", label: "Luftfeuchte", type: "entity", domains: ["sensor"] },
        { key: "climate", label: "Heizung", type: "entity", domains: ["climate"] },
        { key: "windows", label: "Fenster", type: "entities", domains: ["binary_sensor"] },
      ],
    },
    { key: "cold", label: "Kalt unter °C", type: "number", placeholder: "16" },
    { key: "warm", label: "Warm über °C", type: "number", placeholder: "26" },
    { key: "columns", label: "Spalten", type: "number", min: 1, max: 6, placeholder: "3" },
  ],
  status: [
    LABEL,
    {
      key: "windows",
      label: "Offene Fenster & Türen",
      type: "autolist",
      autoLabel: "Alle Fenster- und Türsensoren",
      fields: [
        { key: "entity", label: "Sensor", type: "entity", domains: ["binary_sensor"] },
        { key: "name", label: "Name", type: "text" },
        { key: "room", label: "Raum", type: "text" },
      ],
    },
    {
      key: "appliances",
      label: "Laufende Geräte",
      type: "list",
      addLabel: "Gerät",
      itemLabel: (it) => it.name ?? it.entity ?? "Gerät",
      fields: [
        { key: "entity", label: "Läuft-Entität", type: "entity" },
        { key: "name", label: "Name", type: "text" },
        { key: "icon", label: "Icon", type: "icon" },
      ],
    },
    { key: "lights", label: "Lichter an", type: "select", options: [["auto", "zählen"], [undefined, "nicht zeigen"]] },
    { key: "waste", label: "Müllkalender", type: "entity", domains: ["calendar"] },
    { key: "waste_days", label: "Müll zeigen ab Tagen", type: "number", min: 0, max: 7, placeholder: "2" },
    { key: "max", label: "Höchstens Einträge", type: "number", min: 1, max: 10, placeholder: "5" },
    { key: "calm_title", label: "Text wenn alles ruhig", type: "text", placeholder: "Alles ruhig" },
  ],
  calendar: [
    { key: "entity", label: "Kalender", type: "entity", domains: ["calendar"] },
    { key: "variant", label: "Darstellung", type: "select", options: [[undefined, "Karte"], ["line", "Zeile"]] },
    { key: "waste", label: "Ist Müllkalender", type: "boolean" },
    { key: "days", label: "Nur zeigen bis Tage", type: "number", min: 0 },
    LABEL,
    { key: "icon", label: "Icon", type: "icon" },
  ],
  infoline: [
    {
      key: "items",
      label: "Teile",
      type: "list",
      addLabel: "Teil",
      itemLabel: (it) =>
        it.name ??
        it.text ??
        ({ weather: "Wetter", calendar: "Termin", entity: "Wert", text: "Text", waste: "Mülltonnen", status: "Hinweis", device: "Gerät", media: "Wiedergabe", agenda: "Nächster Termin" } as Record<string, string>)[it.type] ??
        "Teil",
      newItem: () => ({ type: "entity" }),
      fields: [
        {
          key: "type",
          label: "Art",
          type: "select",
          options: [
            ["weather", "Wetter"],
            ["calendar", "Termin"],
            ["waste", "Mülltonnen (im Wechsel)"],
            ["entity", "Wert"],
            ["text", "Text"],
            ["status", "Hinweis – nur wenn zutreffend (z. B. Regen)"],
            ["device", "Gerät läuft – mit Restzeit"],
            ["media", "Wiedergabe (z. B. Apple TV)"],
            ["agenda", "Nächster Termin"],
          ],
        },
        { key: "entity", label: "Entität", type: "entity", when: (v) => !["text", "waste", "media"].includes(v.type) },
        { key: "entities", label: "Player", type: "entities", domains: ["media_player"], when: (v) => v.type === "media" },
        { key: "entities", label: "Kalender", type: "entities", domains: ["calendar"], help: "Leer = die ersten Kalender automatisch", when: (v) => v.type === "agenda" },
        { key: "hours", label: "Termine der nächsten … Stunden", type: "number", min: 1, max: 72, placeholder: "24", when: (v) => v.type === "agenda" },
        { key: "state", label: "Zeigen bei Zustand", type: "text", placeholder: "on", when: (v) => v.type === "status" },
        { key: "state", label: "Läuft bei Zustand", type: "text", placeholder: "on, run, running …", help: "Leer = übliche „läuft“-Zustände", when: (v) => v.type === "device" },
        { key: "text", label: "Text", type: "text", placeholder: "Es regnet", when: (v) => v.type === "status" },
        { key: "remaining", label: "Restzeit oder Endzeit", type: "entity", domains: ["sensor"], when: (v) => v.type === "device" },
        { key: "progress", label: "Fortschritt %", type: "entity", domains: ["sensor"], when: (v) => v.type === "device" },
        { key: "detail", label: "Zusatz", type: "entity", help: "z. B. aktueller Raum des Saugers", when: (v) => v.type === "device" },
        { key: "show_end", label: "Endzeit statt Restzeit", type: "boolean", when: (v) => v.type === "device" },
        {
          key: "list",
          label: "Nur wenn eine davon an ist",
          type: "list",
          addLabel: "Entität",
          help: "z. B. Fenster – die offenen werden genannt",
          itemLabel: (l) => l.name ?? l.entity ?? "Entität",
          newItem: () => ({}),
          fields: [
            { key: "entity", label: "Entität", type: "entity", domains: ["binary_sensor", "input_boolean", "switch"] },
            { key: "name", label: "Name", type: "text" },
          ],
          when: (v) => v.type === "status",
        },
        { key: "show_if", label: "Nur zeigen, wenn", type: "conditions" },
        { key: "days", label: "Nur wenn in Tagen", type: "number", when: (v) => v.type === "calendar" },
        { key: "days", label: "Tonnen der nächsten … Tage", type: "number", min: 0, placeholder: "7", when: (v) => v.type === "waste" },
        {
          key: "bins",
          label: "Tonnen",
          type: "list",
          addLabel: "Tonne",
          help: "Leer = alle Müll-Sensoren (…_tage) automatisch",
          itemLabel: (b) => b.name ?? b.entity ?? "Tonne",
          newItem: () => ({}),
          fields: [
            { key: "name", label: "Name", type: "text" },
            { key: "entity", label: "Tage-Sensor", type: "entity", domains: ["sensor"] },
            { key: "color", label: "Farbe", type: "color" },
          ],
          when: (v) => v.type === "waste",
        },
        { key: "name", label: "Name", type: "text", when: (v) => ["entity", "device", "media"].includes(v.type) },
        { key: "icon", label: "Icon", type: "icon", when: (v) => ["entity", "status", "device", "media", "agenda"].includes(v.type) },
        { key: "text", label: "Text", type: "text", when: (v) => v.type === "text" },
      ],
    },
  ],
  camera: [
    { key: "entity", label: "Kamera", type: "entity", domains: ["camera", "image"], when: (v) => !v.url },
    {
      key: "url",
      label: "… oder Webcam-Link",
      type: "text",
      placeholder: "https://… (Bild, MJPEG, .m3u8 oder YouTube)",
      suggestions: WEBCAM_PRESETS,
      help: "Öffentliche Kamera statt HA-Kamera – Vorschläge per Klick ins Feld",
    },
    { key: "mode", label: "Modus", type: "select", options: [[undefined, "Live"], ["snapshot", "Standbild"]], when: (v) => !v.url },
    { key: "refresh", label: "Standbild neu laden (s)", type: "number", min: 0, when: (v) => !v.url && v.mode === "snapshot" },
    { key: "refresh", label: "Bild neu laden (s)", type: "number", min: 10, placeholder: "60", when: (v) => !!v.url },
    { key: "title", label: "Bildunterschrift", type: "text" },
    { key: "text", label: "Text aus Entität", type: "entity", help: "z. B. KI-Analyse der Kamera" },
    { key: "radius", label: "Eckenradius", type: "number", min: 0, max: 60, placeholder: "28" },
  ],
  pet: [
    { key: "name", label: "Name", type: "text", placeholder: "Polly" },
    { key: "visits", label: "Zähler „heute“", type: "entity", domains: ["sensor", "counter"], help: "z. B. Katzenklo-Besuche, setzt sich täglich zurück" },
    { key: "unit", label: "Bezeichnung", type: "text", placeholder: "Besuche heute" },
    { key: "days", label: "Verlauf (Tage)", type: "number", min: 0, max: 31, placeholder: "7" },
    { key: "icon", label: "Icon", type: "icon" },
    LABEL,
  ],
  balance: [
    { key: "switch_hour", label: "Heute ab (Uhr)", type: "number", min: 0, max: 24, placeholder: "18", help: "Davor zeigt die Bilanz den Vortag" },
    {
      key: "groups",
      label: "Gruppen (YAML)",
      type: "yaml",
      help: "- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.…, price: 0.37}\n    - {name: Trockner, entity: sensor.…, cost: sensor.…, hide_zero: true}",
    },
    LABEL,
  ],
  qr: [
    { key: "ssid", label: "Netzname (SSID)", type: "text" },
    { key: "password", label: "Passwort", type: "text" },
    { key: "encryption", label: "Verschlüsselung", type: "select", options: [[undefined, "WPA/WPA2/WPA3"], ["WEP", "WEP"], ["nopass", "Offen"]] },
    { key: "hidden", label: "Verstecktes Netz", type: "boolean" },
    { key: "show_password", label: "Passwort zusätzlich als Text", type: "boolean" },
    { key: "hint", label: "Hinweis", type: "text", placeholder: "Handy-Kamera auf den Code halten" },
    {
      key: "image",
      label: "Eigenes QR-Bild",
      type: "text",
      placeholder: "/local/gaeste-wlan.png",
      help: "Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/…)",
      advanced: true,
    },
    LABEL,
  ],
  job: [
    LABEL,
    { key: "title", label: "Name des Auftrags", type: "entity" },
    { key: "progress", label: "Fortschritt (%)", type: "entity", domains: ["sensor"] },
    { key: "remaining", label: "Restzeit", type: "entity", domains: ["sensor"] },
    { key: "end", label: "Endzeit", type: "entity", domains: ["sensor"] },
    { key: "layer", label: "Schicht", type: "entity", domains: ["sensor"] },
    { key: "layers", label: "Schichten gesamt", type: "entity", domains: ["sensor"] },
    { key: "status", label: "Status", type: "entity" },
    {
      key: "temps",
      label: "Temperaturen",
      type: "list",
      addLabel: "Temperatur",
      itemLabel: (it) => it.name ?? "Temperatur",
      newItem: () => ({}),
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "entity", label: "Entität", type: "entity", domains: ["sensor"] },
      ],
    },
  ],
  summary: [
    { key: "style", label: "Darstellung", type: "select", options: [[undefined, "Ohne Rahmen"], ["card", "Karte"]] },
    { key: "size", label: "Schriftgröße Punkte (px)", type: "number", min: 14, max: 40, placeholder: "22" },
    LABEL,
  ],
  news: [
    {
      key: "variant",
      label: "Darstellung",
      type: "select",
      options: [[undefined, "Großbild mit Schlagzeile"], ["list", "Liste mit Vorschaubildern"], ["ticker", "Laufband"]],
    },
    {
      key: "feeds",
      label: "Quellen",
      type: "list",
      addLabel: "Quelle",
      help: "tagesschau, ntv, spiegel – oder die Adresse eines RSS-Feeds",
      itemLabel: (f) => NEWS_PRESETS.find(([id]) => id === f.value)?.[1] ?? f.value ?? "Quelle",
      newItem: () => ({ value: "tagesschau" }),
      fields: [{ key: "value", label: "Quelle", type: "text", suggestions: NEWS_PRESETS, placeholder: "tagesschau oder https://…" }],
    },
    { key: "interval", label: "Wechsel nach (s)", type: "number", min: 5, placeholder: "14", when: (v) => !v.variant },
    { key: "max", label: "Meldungen", type: "number", min: 1, max: 30, placeholder: "8" },
    { key: "speed", label: "Tempo (px/s)", type: "number", min: 10, max: 200, placeholder: "45", when: (v) => v.variant === "ticker" },
    LABEL,
  ],
  today: [
    { key: "calendars", label: "Kalender", type: "entities", domains: ["calendar"], help: "Leer = die ersten Kalender automatisch" },
    { key: "weather", label: "Wetter", type: "entity", domains: ["weather"] },
    LABEL,
  ],
  daily: [
    { key: "kind", label: "Inhalt", type: "select", options: [[undefined, "Wikipedia-Artikel des Tages"], ["quote", "Zitat des Tages"]] },
    { key: "image", label: "Bild", type: "select", options: [[undefined, "Mit Bild"], [false, "Ohne Bild"]], when: (v) => v.kind !== "quote" },
    LABEL,
  ],
  card: [{ key: "card", label: "Lovelace-Karte (YAML)", type: "yaml", help: "Jede Karte aus dem Dashboard, z. B. type: entities …" }],
  price: [
    LABEL,
    { key: "entity", label: "Aktueller Preis", type: "entity", domains: ["sensor"], help: "Optional – sonst aus dem Tibber-Verlauf." },
    { key: "home", label: "Tibber-Zuhause", type: "text", placeholder: "erstes" },
    { key: "window", label: "Günstigstes Fenster (h)", type: "number", min: 1, max: 6, placeholder: "2" },
    { key: "tomorrow", label: "Morgen anzeigen", type: "boolean", default: true },
    { key: "note", label: "Fußnote", type: "text" },
  ],
  power: [
    LABEL,
    {
      key: "production",
      label: "Erzeugung (W)",
      type: "list",
      addLabel: "Quelle",
      itemLabel: (it) => it.name ?? it.entity ?? "Quelle",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "entity", label: "Leistung", type: "entity", domains: ["sensor"] },
      ],
    },
    {
      key: "consumption",
      label: "Verbrauch",
      type: "object",
      fields: [
        { key: "name", label: "Name", type: "text", placeholder: "Verbrauch" },
        { key: "entity", label: "Leistung (W)", type: "entity", domains: ["sensor"] },
      ],
    },
    { key: "forecast", label: "Prognose heute (kWh)", type: "entity", domains: ["sensor"] },
    { key: "forecast_remaining", label: "Prognose Rest (kWh)", type: "entity", domains: ["sensor"] },
    { key: "extra", label: "Zusatzwert", type: "entity", domains: ["sensor"] },
    { key: "extra_name", label: "Zusatzwert Name", type: "text" },
  ],
  car: [
    { key: "name", label: "Name", type: "text" },
    { key: "battery", label: "Akku %", type: "entity", domains: ["sensor"] },
    { key: "range", label: "Reichweite", type: "entity", domains: ["sensor"] },
    { key: "location", label: "Standort", type: "entity", domains: ["device_tracker", "person"] },
    { key: "charging", label: "Lädt", type: "entity", domains: ["binary_sensor"] },
    { key: "plugged", label: "Angesteckt", type: "entity", domains: ["binary_sensor"] },
    { key: "charger_power", label: "Ladeleistung", type: "entity", domains: ["sensor"] },
    { key: "time_full", label: "Voll um", type: "entity", domains: ["sensor"] },
    { key: "lock", label: "Schloss", type: "entity", domains: ["lock"] },
    { key: "limit", label: "Ladelimit", type: "entity", domains: ["number", "sensor"] },
    { key: "inside_temp", label: "Innentemperatur", type: "entity", domains: ["sensor"] },
  ],
  persons: [
    LABEL,
    {
      key: "persons",
      label: "Personen",
      type: "list",
      addLabel: "Person",
      itemLabel: (it) => it.name ?? it.entity ?? "Person",
      fields: [
        { key: "entity", label: "Person", type: "entity", domains: ["person", "device_tracker"] },
        { key: "name", label: "Name", type: "text" },
        { key: "location", label: "Ortsangabe", type: "entity", domains: ["sensor"], help: "z. B. „Geocoded Location“ der Companion-App" },
      ],
    },
  ],
  vacuum: [
    LABEL,
    {
      key: "vacuums",
      label: "Sauger",
      type: "list",
      addLabel: "Sauger",
      itemLabel: (it) => it.name ?? it.entity ?? "Sauger",
      fields: [
        { key: "entity", label: "Sauger", type: "entity", domains: ["vacuum"] },
        { key: "name", label: "Name", type: "text" },
        { key: "battery", label: "Akku", type: "entity", domains: ["sensor"], help: "Leer = automatisch suchen" },
        { key: "room", label: "Aktueller Raum", type: "entity", domains: ["sensor"] },
        { key: "map", label: "Saugkarte", type: "entity", domains: ["image", "camera"], help: "Leer = Karte des Saugers automatisch" },
      ],
    },
    { key: "maps", label: "Kleine Karten", type: "select", options: [[undefined, "Neben jedem Sauger"], [false, "Ausblenden"]] },
    { key: "map", label: "Große Karte darunter", type: "entity", domains: ["image", "camera"] },
  ],
  waste: [
    LABEL,
    {
      key: "bins",
      label: "Tonnen",
      type: "list",
      addLabel: "Tonne",
      itemLabel: (it) => it.name ?? "Tonne",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "entity", label: "Tage bis Abholung", type: "entity", domains: ["sensor"] },
        { key: "color", label: "Farbe", type: "color" },
        { key: "out", label: "Steht draußen", type: "entity", domains: ["input_boolean", "binary_sensor"] },
      ],
    },
    { key: "max", label: "Höchstens", type: "number", min: 1, max: 8, placeholder: "4" },
    { key: "highlight", label: "Hervorheben ab Tagen", type: "number", min: 0, max: 7, placeholder: "1" },
  ],
  activity: [
    { key: "variant", label: "Darstellung", type: "select", options: [[undefined, "Eine Zeile (dezent)"], ["list", "Liste"]] },
    { key: "entities", label: "Melder", type: "autolist", autoLabel: "Alle Bewegungs-/Präsenzmelder", domains: ["binary_sensor"], offValue: "auto" },
    { key: "exclude", label: "Ausnehmen", type: "entities", domains: ["binary_sensor"] },
    { key: "max", label: "Höchstens", type: "number", min: 1, max: 8, placeholder: "3" },
    { key: "within", label: "Zeitraum (min)", type: "number", min: 5, placeholder: "120" },
    { ...LABEL, when: (v) => v.variant === "list" },
  ],
  list: [
    LABEL,
    {
      key: "rows",
      label: "Zeilen",
      type: "list",
      addLabel: "Zeile",
      itemLabel: (it) => it.name ?? it.entity ?? "Zeile",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "entity", label: "Entität", type: "entity" },
        { key: "attribute", label: "Attribut", type: "text" },
        { key: "icon", label: "Icon", type: "icon" },
        {
          key: "format",
          label: "Bewertung",
          type: "select",
          options: [
            [undefined, "keine"],
            ["aqi", "Luftqualität (AQI)"],
            ["uv", "UV-Index"],
            ["lux", "Helligkeit (Lux)"],
            ["humidity", "Luftfeuchte (Raum)"],
            ["rain", "Regen an/aus"],
            ["onoff", "An/Aus"],
          ],
        },
        { key: "unit", label: "Einheit", type: "text" },
        { key: "decimals", label: "Nachkommastellen", type: "number", min: 0, max: 4 },
      ],
    },
  ],
  agenda: [
    LABEL,
    { key: "calendars", label: "Kalender", type: "entities", domains: ["calendar"] },
    { key: "days", label: "Tage voraus", type: "number", min: 1, max: 31, placeholder: "7" },
    { key: "max", label: "Höchstens", type: "number", min: 1, max: 12, placeholder: "6" },
    { key: "location", label: "Ort zeigen", type: "boolean", default: true },
  ],
  media: [
    LABEL,
    { key: "entities", label: "Player", type: "entities", domains: ["media_player"] },
    { key: "variant", label: "Darstellung", type: "select", options: [[undefined, "Kompakt"], ["full", "Ganze Seite mit großem Cover"]] },
    { key: "show_paused", label: "Auch pausiert zeigen", type: "boolean" },
  ],
  appliances: [
    LABEL,
    {
      key: "items",
      label: "Geräte",
      type: "list",
      addLabel: "Gerät",
      itemLabel: (it) => it.name ?? "Gerät",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "running", label: "Läuft-Entität", type: "entity" },
        { key: "icon", label: "Icon", type: "icon" },
        { key: "power", label: "Leistung", type: "entity", domains: ["sensor"] },
        { key: "progress", label: "Fortschritt %", type: "entity", domains: ["sensor"] },
        { key: "end", label: "Endzeit", type: "entity", domains: ["sensor"] },
        { key: "cost", label: "Kosten", type: "entity", domains: ["sensor"] },
      ],
    },
    { key: "empty_text", label: "Text wenn nichts läuft", type: "text", placeholder: "Nichts läuft gerade" },
  ],
  consumers: [
    LABEL,
    { key: "count", label: "Anzahl", type: "number", min: 1, max: 10, placeholder: "3" },
    {
      key: "devices",
      label: "Geräte",
      type: "list",
      addLabel: "Gerät",
      itemLabel: (it) => it.name ?? it.entity ?? "Gerät",
      help: "Leer = die Einzelgeräte aus dem Energie-Dashboard von Home Assistant",
      fields: [
        { key: "entity", label: "Energiezähler (kWh)", type: "entity", domains: ["sensor"] },
        { key: "name", label: "Name", type: "text" },
      ],
      advanced: true,
    },
    { key: "exclude", label: "Ausnehmen", type: "entities", domains: ["sensor"], advanced: true },
  ],
  batteries: [
    LABEL,
    {
      key: "part",
      label: "Zeigen",
      type: "select",
      options: [
        [undefined, "Geräte und schwache Batterien"],
        ["devices", "Nur Geräte"],
        ["low", "Nur schwache Batterien"],
      ],
    },
    {
      key: "devices",
      label: "Geräte (immer zeigen)",
      type: "list",
      addLabel: "Gerät",
      itemLabel: (it) => it.name ?? it.entity ?? "Gerät",
      help: "Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App",
      fields: [
        { key: "entity", label: "Akkustand", type: "entity", domains: ["sensor"] },
        { key: "name", label: "Name", type: "text" },
      ],
    },
    { key: "threshold", label: "Zubehör zeigen unter (%)", type: "number", min: 1, max: 100, placeholder: "21" },
    { key: "max", label: "Höchstens Zeilen Zubehör", type: "number", min: 1, max: 12, placeholder: "5", advanced: true },
    { key: "exclude", label: "Ausnehmen", type: "entities", domains: ["sensor", "binary_sensor"], advanced: true },
  ],
  covers: [
    LABEL,
    {
      key: "covers",
      label: "Rollläden",
      type: "list",
      addLabel: "Rollladen",
      itemLabel: (it) => it.name ?? it.entity ?? "Rollladen",
      fields: [
        { key: "entity", label: "Rollladen", type: "entity", domains: ["cover"] },
        { key: "name", label: "Name", type: "text" },
        { key: "invert", label: "Richtung umkehren", type: "boolean", help: "Wenn der Antrieb offen und zu andersherum meldet" },
      ],
    },
    { key: "only_open", label: "Nur offene listen", type: "boolean" },
  ],
  warnings: [
    LABEL,
    { key: "entities", label: "Warn-Sensoren", type: "entities", domains: ["binary_sensor"] },
    { key: "calm_text", label: "Text ohne Warnung", type: "text", placeholder: "Keine Warnungen" },
  ],
};

/* ───────── Gemeinsame Auswahllisten für Design, Display, Seite ───────── */

const FONT_OPTIONS: [string | undefined, string][] = [
  [undefined, "Schrift des Stils"],
  ...FONTS.map((f) => [f.id, `${f.name} · ${f.kind === "serif" ? "Serife" : "ohne Serife"}`] as [string, string]),
];
const MODE_OPTIONS: [string | undefined, string][] = [
  ["auto", "Automatisch – hell bei Tag, dunkel nach Sonnenuntergang"],
  ["light", "Immer hell"],
  ["dark", "Immer dunkel"],
];
export const AMBIENT_OPTIONS: [string, string][] = [
  ["none", "Aus"],
  ["particles", "Schwebende Partikel"],
  ["flow", "Fließender Verlauf"],
  ["bokeh", "Lichtschimmer"],
  ["mist", "Nebel"],
];
const TRANSITION_OPTIONS: [string, string][] = [
  ["fade", "Überblenden"],
  ["blur", "Weich (Unschärfe)"],
  ["slide", "Schieben"],
  ["zoom", "Zoom"],
];

/** Aktion beim Antippen / langen Drücken eines Widgets */
const ACTION_FIELDS: Field[] = [
  {
    key: "action",
    label: "Aktion",
    type: "select",
    options: [
      [undefined, "keine"],
      ["toggle", "Ein/aus schalten"],
      ["more_info", "Details (HA-Dialog)"],
      ["perform", "Aktion/Skript ausführen"],
      ["page", "Seite zeigen"],
      ["popup", "Pop-up mit HA-Karte"],
      ["pause", "Wiedergabe anhalten/fortsetzen"],
      ["dashboard", "HA-Dashboard öffnen"],
    ],
  },
  { key: "entity", label: "Entität", type: "entity", when: (v) => ["toggle", "more_info"].includes(v.action) },
  {
    key: "perform",
    label: "Aktion (domain.dienst)",
    type: "text",
    placeholder: "script.turn_on",
    suggestions: [
      ["script.turn_on", "Skript starten"],
      ["scene.turn_on", "Szene aktivieren"],
      ["light.toggle", "Licht umschalten"],
      ["cover.toggle", "Rollladen/Tor umschalten"],
      ["media_player.media_play_pause", "Wiedergabe/Pause"],
      ["input_boolean.toggle", "Helfer umschalten"],
    ],
    when: (v) => v.action === "perform",
  },
  { key: "entity", label: "Ziel-Entität", type: "entity", when: (v) => v.action === "perform" },
  { key: "data", label: "Daten (YAML, optional)", type: "yaml", when: (v) => v.action === "perform" },
  { key: "page", label: "Seite", type: "select", options: () => formContext.pages, when: (v) => v.action === "page" },
  { key: "title", label: "Titel", type: "text", when: (v) => v.action === "popup" },
  { key: "card", label: "Karte (YAML)", type: "yaml", help: "z. B. type: entities, entities: [light.kueche]", when: (v) => v.action === "popup" },
  { key: "timeout", label: "Schließt nach (s)", type: "number", min: 5, max: 600, placeholder: "30", when: (v) => v.action === "popup" },
  {
    key: "confirm",
    label: "Vorher nachfragen",
    type: "boolean",
    help: "Für Tor, Türschloss & Co.",
    when: (v) => ["toggle", "perform"].includes(v.action),
  },
];

/** Darstellung eines einzelnen Widgets */
export const WIDGET_LOOK_FIELDS: Field[] = [
  { key: "look.card", label: "Als Karte", type: "boolean", help: "Fläche, Rand und Radius des Stils" },
  { key: "look.accent", label: "Akzentfarbe", type: "color" },
  { key: "look.ink", label: "Schriftfarbe", type: "color" },
  { key: "look.size", label: "Größe (%)", type: "number", min: 50, max: 200, step: 5, placeholder: "100" },
  { key: "look.opacity", label: "Deckkraft (%)", type: "number", min: 10, max: 100, step: 5, placeholder: "100" },
  { key: "look.padding", label: "Innenabstand (px)", type: "number", min: 0, max: 80, placeholder: "0" },
];

/** Eigene Farben für Hell bzw. Dunkel */
export const colorFields = (mode: "dark" | "light"): Field[] => [
  { key: `design.colors.${mode}.bg`, label: "Hintergrund", type: "color" },
  { key: `design.colors.${mode}.ink`, label: "Schrift", type: "color" },
  { key: `design.colors.${mode}.accent`, label: "Akzent", type: "color" },
  { key: `design.colors.${mode}.card`, label: "Karten", type: "color" },
  { key: `design.colors.${mode}.card_opacity`, label: "Karten-Deckkraft (%)", type: "number", min: 0, max: 100, placeholder: "100" },
  { key: `design.colors.${mode}.good`, label: "Gut (grün)", type: "color" },
  { key: `design.colors.${mode}.alert`, label: "Warnung (rot)", type: "color" },
  { key: `design.colors.${mode}.cold`, label: "Kühl (blau)", type: "color" },
];

export const SHAPE_FIELDS: Field[] = [
  { key: "design.radius", label: "Eckenradius der Karten (px)", type: "number", min: 0, max: 80, placeholder: "wie Stil" },
  {
    key: "design.css",
    label: "Eigenes CSS (alle Displays)",
    type: "textarea",
    placeholder: ":host { --af-accent: #e0a060 }",
    help: "Für Fortgeschrittene: gilt im Display; Farben und Abstände über --af-…-Variablen.",
  },
];

export const ACTION_FORM: Field[] = [
  { key: "tap_action", label: "Beim Antippen", type: "object", fields: ACTION_FIELDS },
  { key: "hold_action", label: "Beim langen Drücken", type: "object", fields: ACTION_FIELDS },
];

export const ALIGN_FIELDS: Field[] = [
  { key: "align", label: "Waagerecht", type: "select", options: [[undefined, "links"], ["center", "mittig"], ["end", "rechts"]] },
  { key: "valign", label: "Senkrecht", type: "select", options: [[undefined, "oben"], ["center", "mittig"], ["end", "unten"]] },
  { key: "typeface", label: "Schrift", type: "select", options: [[undefined, "wie Design"], ...FONT_OPTIONS.slice(1)] },
];

export const PAGE_FIELDS: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "duration", label: "Dauer (s)", type: "number", min: 3 },
  {
    key: "background.type",
    label: "Hintergrund",
    type: "select",
    options: [["none", "Stil-Farbe"], ["photo", "Foto"], ["camera", "Kamera / Webcam"], ["color", "Eigene Farbe"]],
  },
  { key: "background.color", label: "Farbe", type: "color", when: (v) => v.background?.type === "color" },
  { key: "background.entity", label: "Kamera", type: "entity", domains: ["camera"], when: (v) => v.background?.type === "camera" && !v.background?.url },
  {
    key: "background.url",
    label: "… oder Webcam-Link",
    type: "text",
    placeholder: "https://…",
    suggestions: WEBCAM_PRESETS,
    when: (v) => v.background?.type === "camera",
  },
  {
    key: "background.refresh",
    label: "Bild neu laden (s)",
    type: "number",
    min: 0,
    placeholder: "20",
    help: "0 = Livebild",
    when: (v) => v.background?.type === "camera",
  },
  { key: "background.name", label: "Ortsname", type: "text", help: "Klein unten rechts, z. B. „Cuxhaven“", when: (v) => v.background?.type === "camera" && !v.background?.sources?.length },
  {
    key: "background.sources",
    label: "Mehrere Webcams im Wechsel",
    type: "list",
    addLabel: "Webcam hinzufügen",
    help: "Bei jedem Erscheinen der Seite die nächste – ersetzt Kamera und Link oben",
    itemLabel: (it) => it.name || it.url || "Webcam",
    newItem: () => ({}),
    when: (v) => v.background?.type === "camera",
    fields: [
      { key: "url", label: "Webcam-Link", type: "text", placeholder: "https://… (Bild, MJPEG, .m3u8 oder YouTube)", suggestions: WEBCAM_PRESETS },
      { key: "name", label: "Ortsname", type: "text" },
      { key: "refresh", label: "Bild neu laden (s)", type: "number", min: 0, placeholder: "wie oben" },
    ],
  },
  { key: "palette", label: "Farben", type: "select", options: [["normal", "Normal"], ["night", "Nacht (gedimmt)"]] },
  {
    key: "background.ambient",
    label: "Animation",
    type: "select",
    options: [[undefined, "wie Design"], ...AMBIENT_OPTIONS],
    when: (v) => v.palette !== "night",
  },
  { key: "transition.type", label: "Übergang", type: "select", options: [[undefined, "wie Design"], ...TRANSITION_OPTIONS], advanced: true },
  { key: "transition.duration", label: "Übergang (s)", type: "number", min: 0.2, max: 10, step: 0.1, placeholder: "wie Design", advanced: true },
  { key: "show_if", label: "Nur anzeigen wenn …", type: "conditions" },
  {
    key: "css",
    label: "Eigenes CSS (nur diese Seite)",
    type: "textarea",
    placeholder: ".cell[data-widget=\"uhr\"] { filter: drop-shadow(0 4px 20px #0008) }",
    help: "Für Fortgeschrittene: gilt innerhalb der Seite; Widgets sind über .cell[data-widget=\"id\"] erreichbar.",
  },
];

export const EVENT_KINDS: { id: EventConfig["kind"]; name: string; short: string; icon: string }[] = [
  { id: "alarm", name: "Vollbild (Klingel, Alarm)", short: "Vollbild", icon: "bell" },
  { id: "live", name: "Bild-im-Bild (Bewegung)", short: "Bild-im-Bild", icon: "cam" },
  { id: "info", name: "Hinweis + Erinnerung (Geräte)", short: "Hinweis", icon: "info" },
  { id: "page", name: "Seite zeigen (z. B. bei Bewegung)", short: "Seite", icon: "page" },
  { id: "media", name: "Musik-Cover (bei Liedwechsel)", short: "Musik-Cover", icon: "music" },
];

const titled = (v: Record<string, any>) => ["alarm", "live", "info"].includes(v.kind);
const is = (...kinds: string[]) => (v: Record<string, any>) => kinds.includes(v.kind);

export const eventFields = (config: AmbiframeConfig): Field[] => [
  { key: "name", label: "Name", type: "text" },
  { key: "enabled", label: "Aktiv", type: "boolean", default: true },
  { key: "kind", label: "Darstellung", type: "select", options: EVENT_KINDS.map((k) => [k.id, k.name] as [string, string]) },
  { key: "entity", label: "Auslöser", type: "entity", when: (v) => v.kind !== "media" },
  { key: "entities", label: "Weitere Auslöser", type: "entities", when: is("page"), help: "z. B. mehrere Bewegungsmelder – einer genügt" },
  { key: "entities", label: "Player", type: "entities", domains: ["media_player"], when: is("media"), help: "Gruppen zeigen jedes Lied nur einmal" },
  { key: "from", label: "von Zustand", type: "text", placeholder: "beliebig", when: (v) => v.kind !== "media" },
  {
    key: "to",
    label: "zu Zustand",
    type: "text",
    placeholder: "on",
    suggestions: [
      ["on", "an"],
      ["*", "jede Änderung (Tasten, event.*)"],
    ],
    help: "* = bei jeder Änderung – z. B. für Tasten und event.*-Entitäten",
    when: (v) => v.kind !== "media",
  },
  {
    key: "event_types",
    label: "Nur diese Ereignistypen",
    type: "multi",
    options: (v, hass) => ((hass?.states[v.entity]?.attributes.event_types as string[] | undefined) ?? []).map((t) => [t, t] as [string, string]),
    help: "Keiner gewählt = alle",
    when: (v) => v.to === "*" && String(v.entity ?? "").startsWith("event."),
  },
  { key: "page", label: "Seite", type: "select", options: [[undefined, "– wählen –"], ...config.pages.map((p) => [p.id, p.name] as [string, string])], when: is("page") },
  {
    key: "style",
    label: "Cover",
    type: "select",
    options: [
      [undefined, "Karte unten rechts (kurz beim Liedwechsel)"],
      ["fullscreen", "Vollbild (kurz beim Liedwechsel)"],
      ["mini", "Mini-Karte – bleibt, solange etwas läuft"],
    ],
    when: is("media"),
  },
  {
    key: "interval",
    label: "Zwischendurch alle (min)",
    type: "number",
    min: 0,
    when: (v) => v.kind === "media" && v.style !== "mini",
    help: "Während der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel",
  },
  { key: "camera", label: "Kamera", type: "entity", domains: ["camera"], when: is("alarm", "live") },
  { key: "title", label: "Titel", type: "text", when: titled },
  { key: "where", label: "Ort / Zusatz", type: "text", when: titled },
  { key: "where", label: "Raum", type: "text", when: is("media"), placeholder: "Name des Players" },
  { key: "icon", label: "Icon", type: "icon", when: titled },
  { key: "text", label: "Text aus Entität", type: "entity", when: titled, help: "z. B. KI-Beschreibung oder Warn-Überschrift" },
  { key: "text_attribute", label: "… aus Attribut", type: "text", when: (v) => titled(v) && !!v.text },
  { key: "cost", label: "Kosten-Sensor", type: "entity", domains: ["sensor"], when: is("info") },
  { key: "chip", label: "Erinnerungstext", type: "text", when: is("info") },
  { key: "duration", label: "Dauer (s)", type: "number", min: 3, placeholder: "30", when: is("live") },
  { key: "duration", label: "Dauer (s)", type: "number", min: 3, placeholder: "60", when: is("info") },
  { key: "duration", label: "Dauer (s)", type: "number", min: 3, placeholder: "12 / Vollbild 15", when: is("media") },
  { key: "duration", label: "Mindestens (s)", type: "number", min: 3, placeholder: "60", when: is("page"), help: "Ab dem letzten Auslösen; solange ein Melder an ist, bleibt die Seite ohnehin." },
  { key: "max", label: "Höchstens (s)", type: "number", min: 3, when: is("alarm") },
  { key: "max", label: "Höchstens (s)", type: "number", min: 3, placeholder: "600", when: is("page"), help: "Obergrenze, auch wenn ein Melder dauerhaft an bleibt." },
  { key: "hold_after", label: "Nachlauf (s)", type: "number", min: 0, when: is("alarm", "page"), help: "So lange bleibt die Anzeige, nachdem der Auslöser wieder aus ist." },
  { key: "cooldown", label: "Abklingzeit (s)", type: "number", min: 0, when: is("live"), help: "Danach erst wieder zeigen – gegen Dauerfeuer." },
  { key: "cooldown", label: "Abklingzeit (s)", type: "number", min: 0, when: is("page"), help: "Nach dem Ende so lange nicht erneut zeigen." },
  { key: "at_night", label: "Auch nachts", type: "boolean" },
  {
    key: "sound",
    label: "Ton",
    type: "text",
    placeholder: "kein Ton",
    suggestions: SOUNDS,
    help: "Klick ins Feld für die mitgelieferten Töne – oder ein Link (/local/ton.mp3). Auf dem Tablet über Fully.",
    when: (v) => v.kind !== "media",
  },
  { key: "volume", label: "Lautstärke (%)", type: "number", min: 5, max: 100, placeholder: "70", when: (v) => !!v.sound && v.kind !== "media", help: "Nur im Browser – Fully nutzt die Medienlautstärke des Tablets." },
  { key: "quiet.after", label: "Ruhezeit ab", type: "text", placeholder: "22:00" },
  { key: "quiet.before", label: "Ruhezeit bis", type: "text", placeholder: "07:00" },
  {
    key: "quiet_action",
    label: "In der Ruhezeit",
    type: "select",
    options: [
      [undefined, "ohne Ton zeigen"],
      ["skip", "gar nicht zeigen"],
    ],
    when: (v) => !!(v.quiet?.after || v.quiet?.before),
  },
  { key: "only_home", label: "Nur wenn jemand zu Hause ist", type: "boolean", help: "Mindestens eine Person (person.*) ist „home“." },
  { key: "show_if", label: "Nur wenn außerdem …", type: "conditions" },
];

export const displayFields = (config: AmbiframeConfig): Field[] => [
  { key: "name", label: "Name", type: "text" },
  {
    key: "theme",
    label: "Stil",
    type: "select",
    options: [[undefined, "wie Design"], ...THEMES.map((t) => [t.id, t.name] as [string, string])],
  },
  { key: "mode", label: "Hell/Dunkel", type: "select", options: [[undefined, "wie Design"], ...MODE_OPTIONS] },
  {
    key: "orientation",
    label: "Ausrichtung",
    type: "select",
    options: [[undefined, "Automatisch (nach Gerät, auch beim Drehen)"], ["landscape", "Immer quer"], ["portrait", "Immer hoch"]],
  },
  { key: "transition.type", label: "Übergang", type: "select", options: [[undefined, "wie Design"], ...TRANSITION_OPTIONS], advanced: true },
  { key: "transition.duration", label: "Übergang (s)", type: "number", min: 0.2, max: 10, step: 0.1, placeholder: "wie Design", advanced: true },
  { key: "night.entity", label: "Nacht, wenn an", type: "entity", domains: ["input_boolean", "binary_sensor", "switch", "schedule"] },
  { key: "night.page", label: "Nachtseite", type: "select", options: [[undefined, "eingebaut"], ...config.pages.map((p) => [p.id, p.name] as [string, string])] },
  { key: "control.enabled", label: "Bedienmodus", type: "boolean", default: true },
  {
    key: "nav",
    label: "Pfeile zum Blättern",
    type: "boolean",
    default: true,
    help: "Dezent unten links und rechts: vorherige und nächste Seite, ohne Ambiframe zu verlassen",
    when: (v) => v.control?.enabled !== false,
  },
  {
    key: "control.mode",
    label: "Bedienung",
    type: "select",
    options: [
      [undefined, "Dashboard über Ambiframe (Antippen)"],
      ["screensaver", "Dashboard in Fully, Ambiframe als Bildschirmschoner"],
    ],
    help: "Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Berührung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.",
    when: (v) => v.control?.enabled !== false,
  },
  { key: "control.dashboard", label: "Dashboard", type: "text", placeholder: "/lovelace/0", when: (v) => v.control?.enabled !== false },
  {
    key: "control.idle",
    label: "Zurück nach (s)",
    type: "number",
    min: 10,
    help: "Ohne Berührung so lange, bis Ambiframe wieder erscheint",
    when: (v) => v.control?.enabled !== false,
  },
  { key: "pause_minutes", label: "Pause endet nach (min)", type: "number", min: 0, placeholder: "60", help: "Für den Schalter „Pause“ in HA; 0 = nie" },
  {
    key: "watchdog.button",
    label: "Neustart-Taste",
    type: "entity",
    domains: ["button", "input_button"],
    help: "Wird gedrückt, wenn sich das Display nicht mehr meldet – z. B. Fully „Start-URL laden“.",
  },
  { key: "watchdog.after", label: "Neustart nach (s)", type: "number", min: 60, placeholder: "120", when: (v) => !!v.watchdog?.button },
  {
    key: "oled",
    label: "OLED-Schutz",
    type: "boolean",
    help: "Für OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit „dunkel“.",
  },
  {
    key: "text_size",
    label: "Textgröße",
    type: "select",
    options: [
      [undefined, "wie Design"],
      ["normal", "normal"],
      ["large", "groß (+15 %)"],
      ["xlarge", "sehr groß (+30 %)"],
    ],
  },
  {
    key: "contrast",
    label: "Kontrast",
    type: "select",
    options: [
      [undefined, "wie Design"],
      ["normal", "normal"],
      ["high", "hoch"],
    ],
  },
];

/** Display: eigenes Design – leer = wie Design */
export const DISPLAY_DESIGN_FIELDS: Field[] = [
  { key: "design.accent", label: "Akzentfarbe", type: "color", help: "Leer = wie Design" },
  { key: "design.fonts.display", label: "Schrift Uhr & Titel", type: "select", options: [[undefined, "wie Design"], ...FONT_OPTIONS.slice(1)] },
  { key: "design.fonts.text", label: "Schrift Text", type: "select", options: [[undefined, "wie Design"], ...FONT_OPTIONS.slice(1)] },
  { key: "design.ambient.type", label: "Animation", type: "select", options: [[undefined, "wie Design"], ...AMBIENT_OPTIONS] },
  {
    key: "design.evening",
    label: "Abendstimmung",
    type: "select",
    options: [
      [undefined, "wie Design"],
      ["sun", "dunkel: nach Sonnenuntergang wärmer"],
      ["off", "aus"],
    ],
  },
  {
    key: "design.language",
    label: "Sprache",
    type: "select",
    options: [
      [undefined, "wie Design"],
      ["auto", "automatisch (wie der HA-Benutzer)"],
      ["de", "Deutsch"],
      ["en", "English"],
    ],
  },
  { key: "design.radius", label: "Eckenradius der Karten (px)", type: "number", min: 0, max: 80, placeholder: "wie Design", advanced: true },
  {
    key: "design.css",
    label: "Eigenes CSS (nur dieses Display)",
    type: "textarea",
    placeholder: ":host { --af-accent: #e0a060 }",
    help: "Ergänzt das CSS aus dem Design.",
    advanced: true,
  },
];

/** Display: Videostream als Kamera-Entität */
export const DISPLAY_STREAM_FIELDS: Field[] = [
  {
    key: "stream.enabled",
    label: "Videostream",
    type: "boolean",
    help: "Legt die Kamera „Videostream“ an – z. B. für Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on „Puppet“. Gerechnet wird nur, solange jemand zuschaut.",
  },
  {
    key: "stream.resolution",
    label: "Auflösung",
    type: "select",
    options: [
      [undefined, "4K (3840 × 2160)"],
      ["1080p", "Full HD (1920 × 1080)"],
      ["both", "4K und Full HD (zwei Kameras)"],
    ],
    when: (v) => !!v.stream?.enabled,
  },
  {
    key: "stream.tv",
    label: "Fernseher (Apple TV)",
    type: "entity",
    domains: ["media_player"],
    help: "Legt den Schalter „Auf dem Fernseher“ an – schickt das Display per AirPlay aufs Apple TV",
    when: (v) => !!v.stream?.enabled,
  },
  { key: "stream.interval", label: "Neues Bild alle (s)", type: "number", min: 0.2, max: 60, step: 0.1, placeholder: "0.2", when: (v) => !!v.stream?.enabled, advanced: true },
  {
    key: "stream.renderer",
    label: "Puppet-Adresse",
    type: "text",
    placeholder: "automatisch",
    help: "Nur nötig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000",
    when: (v) => !!v.stream?.enabled,
    advanced: true,
  },
];

/** Display: Töne und Ruhezeit */
export const DISPLAY_SOUND_FIELDS: Field[] = [
  { key: "sound.mute", label: "Stumm", type: "boolean", help: "Keine Töne auf diesem Display – Einblendungen bleiben" },
  {
    key: "sound.volume",
    label: "Lautstärke (%)",
    type: "number",
    min: 0,
    max: 100,
    placeholder: "100",
    help: "Skaliert die Lautstärke der Ereignisse; in Fully die Medienlautstärke des Tablets",
    when: (v) => !v.sound?.mute,
  },
  { key: "sound.quiet.after", label: "Ruhezeit ab", type: "text", placeholder: "22:00", when: (v) => !v.sound?.mute },
  { key: "sound.quiet.before", label: "Ruhezeit bis", type: "text", placeholder: "07:00", when: (v) => !v.sound?.mute },
];

/** Display: eigene Fotoquelle – leer = wie Design */
export const DISPLAY_PHOTO_FIELDS: Field[] = [
  { key: "photos.folder", label: "Fotoordner", type: "text", placeholder: "wie Design", help: "Z. B. media-source://media_source/local/kueche" },
  { key: "photos.icloud", label: "iCloud-Album", type: "text", placeholder: "wie Design" },
  {
    key: "photos.bing",
    label: "Bing-Bilder",
    type: "select",
    options: [
      [undefined, "wie Design"],
      [true, "ja"],
      [false, "nein"],
    ],
  },
  {
    key: "photos.bing_mix",
    label: "Bing-Bilder untermischen",
    type: "select",
    options: [
      [undefined, "wie Design"],
      [true, "ja"],
      [false, "nein – nur, wenn nichts Eigenes da ist"],
    ],
  },
];

/** Design-Reiter, Abschnitt „Hell/Dunkel & Schrift“ */
export const LOOK_FIELDS: Field[] = [
  {
    key: "design.language",
    label: "Sprache",
    type: "select",
    options: [
      [undefined, "automatisch (wie der HA-Benutzer)"],
      ["de", "Deutsch"],
      ["en", "English"],
    ],
    help: "Anzeige, Editor und KI-Zusammenfassung",
  },
  { key: "design.mode", label: "Hell/Dunkel", type: "select", options: MODE_OPTIONS },
  { key: "design.fonts.display", label: "Schrift Uhr & Titel", type: "select", options: FONT_OPTIONS },
  { key: "design.fonts.text", label: "Schrift Text", type: "select", options: FONT_OPTIONS },
  { key: "design.accent", label: "Akzentfarbe", type: "color", help: "Leer = Farbe des Stils" },
  {
    key: "design.text_size",
    label: "Textgröße",
    type: "select",
    options: [
      [undefined, "normal"],
      ["large", "groß (+15 %)"],
      ["xlarge", "sehr groß (+30 %)"],
    ],
    help: "Kleinere Texte (Beschriftungen, Listen, Details) – für Lesen aus der Entfernung",
  },
  {
    key: "design.contrast",
    label: "Kontrast",
    type: "select",
    options: [
      [undefined, "normal (ruhig)"],
      ["high", "hoch (gedämpfte Schrift kräftiger)"],
    ],
  },
  { key: "design.evening", label: "Abendstimmung", type: "select", options: [["sun", "dunkel: nach Sonnenuntergang wärmer"], ["off", "aus"]] },
];

/** Design-Reiter, Abschnitt „KI-Zusammenfassung“ */
export const SUMMARY_FIELDS: Field[] = [
  { key: "summary.enabled", label: "Zusammenfassung", type: "boolean", help: "Gemini (ai_task) fasst Wetter, Termine, Müll, Strom, Auto und Haus zusammen." },
  {
    key: "summary.times",
    label: "Erstellen um",
    type: "text",
    placeholder: "05:30, 12:00, 17:30",
    help: "Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.",
    when: (v) => !!v.summary?.enabled,
  },
  { key: "summary.style", label: "Stil", type: "select", options: [[undefined, "Knapp, nur Fakten"], ["friendly", "Freundlich"]], when: (v) => !!v.summary?.enabled },
  {
    key: "summary.ai_task",
    label: "KI",
    type: "entity",
    domains: ["ai_task"],
    placeholder: "automatisch: Gemini",
    when: (v) => !!v.summary?.enabled,
  },
];

/** Design-Reiter, Abschnitt „Bewegung“ */
export const MOTION_FIELDS: Field[] = [
  { key: "design.ambient.type", label: "Animation", type: "select", options: [[undefined, "wie der Stil"], ...AMBIENT_OPTIONS], help: "Sehr ruhig; nachts aus. Pro Seite änderbar." },
  { key: "design.ambient.strength", label: "Stärke", type: "select", options: [[undefined, "dezent"], [2, "mittel"], [3, "deutlich"]], advanced: true },
  { key: "design.ambient.speed", label: "Tempo", type: "select", options: [[undefined, "langsam"], ["normal", "normal"]], advanced: true },
  { key: "design.transition.type", label: "Seitenwechsel", type: "select", options: [[undefined, "Überblenden"], ...TRANSITION_OPTIONS.slice(1)] },
  { key: "design.transition.duration", label: "Dauer (s)", type: "number", min: 0.2, max: 10, step: 0.1, placeholder: "2.4", advanced: true },
];

export const DESIGN_FIELDS: Field[] = [
  { key: "photos.folder", label: "Fotoordner", type: "text", help: "HA → Medien → Lokale Medien → Ordner „ambiframe“" },
  {
    key: "photos.icloud",
    label: "iCloud-Album",
    type: "text",
    placeholder: "https://photos.icloud.com/shared/album/…",
    help: "Fotos-App → Album teilen → „Öffentliche Website“ an → Link kopieren. Wird mit dem Ordner gemischt.",
  },
  { key: "photos.bing", label: "Bing-Bilder", type: "boolean", help: "Wenn Ordner und Album leer sind" },
  { key: "photos.bing_mix", label: "Bing-Bilder untermischen", type: "boolean", help: "Bing-Bilder des Tages auch zwischen die eigenen Fotos", when: (v) => v.photos?.bing !== false },
  { key: "photos.credit", label: "Bildunterschrift", type: "boolean" },
];

/* ───────── Vorlagen und Standardwerte ───────── */

const firstOf = (hass: Hass | undefined, domain: string): string | undefined =>
  Object.keys(hass?.states ?? {}).find((id) => id.startsWith(`${domain}.`));
const allOf = (hass: Hass | undefined, domain: string): string[] => Object.keys(hass?.states ?? {}).filter((id) => id.startsWith(`${domain}.`));

/** Sinnvolle Startwerte für ein neues Widget. */
export const defaultOptions = (type: string, hass?: Hass): Record<string, any> => {
  switch (type) {
    case "weather":
      return { entity: firstOf(hass, "weather"), variant: "card" };
    case "camera":
      return { entity: firstOf(hass, "camera") };
    case "calendar":
      return { entity: firstOf(hass, "calendar") };
    case "text":
      return { text: t("Text"), style: "title" };
    case "status":
      return { windows: "auto", lights: "auto" };
    case "chart": {
      const temp = allOf(hass, "sensor").find((id) => hass?.states[id]?.attributes.device_class === "temperature");
      return { entities: temp ? [{ entity: temp }] : [] };
    }
    case "gauge": {
      const pct = allOf(hass, "sensor").find((id) => hass?.states[id]?.attributes.unit_of_measurement === "%");
      return pct ? { entity: pct } : {};
    }
    case "persons":
      return { persons: allOf(hass, "person").map((entity) => ({ entity })) };
    case "vacuum":
      return { vacuums: allOf(hass, "vacuum").map((entity) => ({ entity })) };
    case "activity":
      return { entities: "auto" };
    case "agenda":
      return { calendars: allOf(hass, "calendar").slice(0, 1) };
    case "media":
      return { entities: allOf(hass, "media_player") };
    case "covers":
      return { covers: allOf(hass, "cover").map((entity) => ({ entity })) };
    case "infoline":
      return { items: [{ type: "weather", entity: firstOf(hass, "weather") }] };
    case "news":
      return { feeds: ["tagesschau", "ntv", "spiegel"] };
    case "card":
      return { card: { type: "entities", entities: [] } };
    default:
      return {};
  }
};

export const slug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "neu";

export const uniqueId = (base: string, taken: Iterable<string>): string => {
  const set = new Set(taken);
  if (!set.has(base)) return base;
  let n = 2;
  while (set.has(`${base}_${n}`)) n++;
  return `${base}_${n}`;
};

const w = (id: string, type: string, x: number, y: number, ww: number, h: number, options: Record<string, any> = {}): WidgetConfig => ({ id, type, x, y, w: ww, h, options });

export const PAGE_TEMPLATES: { id: string; name: string; build: (hass?: Hass) => Omit<PageConfig, "id" | "name"> }[] = [
  { id: "leer", name: "Leere Seite", build: () => ({ duration: 30, background: { type: "none" }, palette: "normal", widgets: [] }) },
  {
    id: "foto",
    name: "Bilderrahmen",
    build: (hass) => ({
      duration: 90,
      background: { type: "photo" },
      palette: "normal",
      widgets: [
        w("uhr", "clock", 0, 4, 6, 2, { valign: "end" }),
        w("datum", "date", 0, 6, 7, 1),
        w("zeile", "infoline", 0, 7, 8, 1, { items: [{ type: "weather", entity: firstOf(hass, "weather") }] }),
      ],
    }),
  },
  {
    id: "standby",
    name: "StandBy",
    build: (hass) => ({
      duration: 60,
      background: { type: "none" },
      palette: "normal",
      widgets: [
        w("uhr", "clock", 0, 2, 7, 3, { valign: "end" }),
        w("datum", "date", 0, 5, 7, 1, { color: "accent", size: 28 }),
        w("karte", "weather", 8, 1, 4, 6, { entity: firstOf(hass, "weather"), variant: "card" }),
      ],
    }),
  },
  {
    id: "morgen",
    name: "Guten Morgen (KI-Zusammenfassung)",
    build: (hass) => ({
      duration: 45,
      background: { type: "none" },
      palette: "normal",
      show_if: [{ condition: "time", after: "05:00", before: "11:00" }],
      widgets: [
        w("uhr", "clock", 9, 0, 3, 1, { size: "small", align: "end" }),
        w("ueberblick", "summary", 0, 0, 8, 8),
        w("wetter", "weather", 8, 1, 4, 6, { entity: firstOf(hass, "weather"), variant: "card" }),
        w("datum", "date", 8, 7, 4, 1, { align: "end" }),
      ],
    }),
  },
  {
    id: "news",
    name: "Nachrichten",
    build: () => ({
      duration: 60,
      background: { type: "none" },
      palette: "normal",
      widgets: [
        w("aufmacher", "news", 0, 0, 12, 7, { feeds: ["tagesschau", "ntv", "spiegel"], interval: 12 }),
        w("laufband", "news", 0, 7, 12, 1, { feeds: ["tagesschau", "ntv", "spiegel"], variant: "ticker" }),
      ],
    }),
  },
  {
    id: "tagesvorschau",
    name: "Tagesvorschau am Morgen",
    build: (hass) => ({
      duration: 30,
      background: { type: "none" },
      palette: "normal",
      show_if: [{ condition: "time", after: "05:00", before: "11:00" }],
      widgets: [
        w("vorschau", "today", 0, 0, 12, 7, { calendars: allOf(hass, "calendar").slice(0, 2), weather: firstOf(hass, "weather") }),
        w("zeile", "infoline", 0, 7, 12, 1, { items: [{ type: "weather", entity: firstOf(hass, "weather") }] }),
      ],
    }),
  },
  {
    id: "musik",
    name: "Läuft gerade (ganze Seite)",
    // Nur solange einer der Player spielt
    build: (hass) => {
      const players = allOf(hass, "media_player");
      return {
        duration: 30,
        background: { type: "none" },
        palette: "normal",
        show_if: [{ condition: "or", conditions: players.map((entity) => ({ condition: "state", entity, state: "playing" })) }],
        widgets: [w("musik", "media", 0, 0, 12, 8, { entities: players, variant: "full" })],
      };
    },
  },
  {
    id: "artikel",
    name: "Wikipedia-Artikel des Tages",
    build: () => ({
      duration: 25,
      background: { type: "none" },
      palette: "normal",
      widgets: [w("artikel", "daily", 0, 0, 12, 8)],
    }),
  },
  {
    id: "zitat",
    name: "Zitat des Tages",
    build: () => ({
      duration: 20,
      background: { type: "none" },
      palette: "normal",
      widgets: [w("zitat", "daily", 0, 0, 12, 8, { kind: "quote" })],
    }),
  },
  {
    id: "kamera",
    name: "Kamera als Hintergrund",
    build: (hass) => ({
      duration: 30,
      background: { type: "camera", entity: firstOf(hass, "camera"), refresh: 20 },
      palette: "normal",
      widgets: [
        w("uhr", "clock", 0, 4, 6, 2, { valign: "end" }),
        w("datum", "date", 0, 6, 7, 1),
        w("zeile", "infoline", 0, 7, 10, 1, { items: [{ type: "weather", entity: firstOf(hass, "weather") }, { type: "waste" }] }),
      ],
    }),
  },
  {
    id: "info",
    name: "Info mit Kopfzeile",
    build: () => ({
      duration: 20,
      background: { type: "none" },
      palette: "normal",
      widgets: [w("titel", "text", 0, 0, 6, 1, { text: t("Titel"), style: "label" }), w("uhr", "clock", 9, 0, 3, 1, { size: "small", align: "end" })],
    }),
  },
];

const motionSensor = (hass?: Hass): string | undefined =>
  Object.values(hass?.states ?? {}).find((s) => s.entity_id.startsWith("binary_sensor.") && ["motion", "occupancy", "presence"].includes(s.attributes.device_class))?.entity_id;

/** Player, die gerade spielen oder pausieren, zuerst – dann solche mit Titel, dann der Rest. */
const playingFirst = (hass?: Hass): string[] => {
  const rank = (id: string) => {
    const s = hass?.states[id];
    return s?.state === "playing" ? 0 : s?.state === "paused" ? 1 : s?.attributes.media_title ? 2 : 3;
  };
  return allOf(hass, "media_player")
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 3);
};

export const EVENT_TEMPLATES: { id: string; name: string; build: (hass?: Hass, config?: AmbiframeConfig) => Omit<EventConfig, "id"> }[] = [
  {
    id: "klingel",
    name: "Klingel → Vollbild",
    build: (hass) => ({ name: t("Klingel"), enabled: true, entity: "", to: "on", kind: "alarm", camera: firstOf(hass, "camera"), title: t("Es klingelt"), where: t("Haustür"), max: 120, hold_after: 30 }),
  },
  {
    id: "bewegung",
    name: "Bewegung → Bild-im-Bild",
    build: (hass) => ({ name: t("Bewegung"), enabled: true, entity: "", to: "on", kind: "live", camera: firstOf(hass, "camera"), title: t("Bewegung"), where: "", duration: 30, cooldown: 120 }),
  },
  {
    id: "geraet",
    name: "Gerät fertig → Hinweis",
    build: () => ({ name: t("Gerät fertig"), enabled: true, entity: "", from: "on", to: "off", kind: "info", icon: "washer", title: t("Waschmaschine fertig"), where: "", chip: t("Wäsche fertig") }),
  },
  {
    id: "warnung",
    name: "Warnung → Vollbild",
    build: () => ({ name: t("Warnung"), enabled: true, entity: "", to: "on", kind: "info", icon: "warning", title: t("Warnung"), where: "", text_attribute: "headline", at_night: true, duration: 120 }),
  },
  {
    id: "seite",
    name: "Bewegung → Seite zeigen",
    build: (hass, config) => ({ name: t("Bewegung → Seite"), enabled: true, entity: motionSensor(hass), to: "on", kind: "page", page: config?.pages[0]?.id, title: "", where: "", duration: 60 }),
  },
  {
    id: "musik",
    name: "Musik → Cover",
    build: (hass) => ({ name: t("Musik"), enabled: true, kind: "media", entities: playingFirst(hass), title: "", where: "" }),
  },
];
