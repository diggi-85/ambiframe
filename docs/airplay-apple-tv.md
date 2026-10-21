# Auftrag an Claude: Ambiframe per AirPlay auf den Apple TV bringen

> **So benutzt du diese Datei:** Den gesamten Text in Claude (Claude Code oder Claude Desktop mit Zugriff auf
> Home Assistant) einfügen oder die Datei anhängen und schreiben: *„Richte das bitte für mich ein.“*

---

Du bist Claude und hilfst mir, **Ambiframe** (Home-Assistant-Integration, https://github.com/diggi-85/ambiframe)
per AirPlay auf meinem **Apple TV** anzuzeigen – mit einem **Schalter/Knopf**, den ich im Dashboard drücken und in
Automationen benutzen kann. Ambiframe ist bei mir schon installiert und mindestens ein Display ist eingerichtet.

Antworte auf Deutsch, erkläre jeden Schritt kurz und frag nach, bevor du etwas Größeres änderst.

## Regeln

- **Keine Zugangsdaten eintippen oder anzeigen.** PINs, Passwörter und Tokens gebe ich selbst ein. Gib Tokens,
  Kopplungsdaten (Credentials) oder Codes nie im Chat aus.
- **Nichts Bestehendes kaputt machen:** Keine vorhandenen Automationen, Dashboards oder Integrationen löschen.
  Vor größeren Änderungen ein Backup anlegen (lassen).
- **Neustarts nur nach Rückfrage.**

## Wie es funktioniert (damit du Fehler einordnen kannst)

1. Das Add-on **Puppet** öffnet Ambiframe in einem unsichtbaren Browser und liefert laufend Bilder.
2. Ambiframe macht daraus mit ffmpeg einen **Videostream** (Kamera-Entität „Videostream“, 25 fps).
3. Der Schalter **„Auf dem Fernseher“** schickt diesen Stream per **AirPlay** an den Apple TV. Ambiframe nutzt dafür
   die Kopplungsdaten der Home-Assistant-Integration **Apple TV** – die muss also **mit AirPlay gekoppelt** sein.
4. Gerechnet wird nur, solange jemand zuschaut. Schalter aus → Stream und Puppet ruhen.

## Schritt 1 – Voraussetzungen prüfen

- Home Assistant mit Add-ons (HA OS oder Supervised), weil das Add-on Puppet gebraucht wird.
- Ambiframe ist installiert (*Einstellungen → Geräte & Dienste → Ambiframe*). Notiere die **ID des Displays**, das
  auf den Fernseher soll (Ambiframe-Editor → *Displays*). Am schönsten ist ein **eigenes Display für den
  Fernseher** mit dem Profil **„Fernseher“** (große Schrift, dunkel, OLED-Schutz, ohne Ton und Bedienung).
- Apple TV und Home Assistant sind im **selben Netzwerk**, der Apple TV am besten per Kabel.

## Schritt 2 – Apple TV vorbereiten

Am Apple TV: **Einstellungen → AirPlay und HomeKit**
- **AirPlay:** Ein
- **Zugriff erlauben:** „**Jeder im selben Netzwerk**“
- **Passwort verlangen:** Aus

## Schritt 3 – Apple-TV-Integration mit AirPlay koppeln

- Ist die Integration **Apple TV** noch nicht da: *Einstellungen → Geräte & Dienste → Integration hinzufügen →
  Apple TV* (meist wird sie automatisch gefunden).
- Ist sie schon da: beim Apple-TV-Eintrag die drei Punkte → **Neu konfigurieren**.
- Der Assistent koppelt mehrere Protokolle nacheinander. **Alle koppeln, besonders AirPlay.** Für jedes erscheint
  ein **PIN auf dem Fernseher**, den ich in Home Assistant eintippe.
- Danach die Entität des Apple TV merken, z. B. `media_player.apple_tv`.

Prüfen (ohne Kopplungsdaten auszugeben): Die Integration läuft ohne Fehler und der `media_player` zeigt einen
Zustand (z. B. `idle`, `standby`, `playing`).

## Schritt 4 – Add-on „Puppet“ installieren

1. *Einstellungen → Add-ons → Add-on-Store → ⋮ → Repositories* →
   `https://github.com/balloob/home-assistant-addons` hinzufügen.
2. **Puppet** installieren.
3. Ich lege einen **langlebigen Zugriffstoken** an (*Profil → Sicherheit → Langlebige Zugriffstoken → Token
   erstellen*, Name z. B. „Puppet“) und trage ihn **selbst** in der Konfiguration des Add-ons ein.
4. Puppet starten und *Beim Start starten* einschalten.

Ambiframe findet Puppet automatisch. Nur wenn das nicht klappt, im Ambiframe-Editor beim Display (Ansicht
*Erweitert*) unter **Puppet-Adresse** z. B. `http://homeassistant.local:10000` eintragen.

## Schritt 5 – Videostream und Fernseher in Ambiframe einschalten

Im Ambiframe-Editor beim Fernseher-Display:
- **Videostream:** an
- **Auflösung:** „**4K und Full HD (zwei Kameras)**“ oder „Full HD“ – AirPlay nutzt Full HD
- **Fernseher (Apple TV):** den `media_player` aus Schritt 3 wählen
- **Neues Bild alle (s):** 0,2 lassen (Standard, ergibt ein flüssiges Video; nur in der Ansicht *Erweitert*)
- Speichern.

Oder als YAML (Editor → *YAML* bzw. Aktion `ambiframe.import_config`), hier nur der relevante Teil des Displays:

```yaml
displays:
  - id: fernseher
    name: Fernseher
    profile: tv
    stream:
      enabled: true
      resolution: both
      interval: 0.2
      tv: media_player.apple_tv
```

Danach gibt es beim Gerät des Displays:
- die Kameras **Videostream** und **Videostream Full HD**
- den Schalter **„Auf dem Fernseher“** (z. B. `switch.ambiframe_fernseher_auf_dem_fernseher`)

Die genauen Entitäts-IDs bitte nachsehen – sie hängen vom Namen des Displays ab.

## Schritt 6 – Testen

1. Kurz die Kamera **Videostream Full HD** öffnen: Ambiframe muss zu sehen sein. Das erste Bild kann einige Sekunden
   dauern, weil Puppet erst startet.
2. Den Schalter **„Auf dem Fernseher“** einschalten. Nach etwa 5–15 Sekunden erscheint Ambiframe auf dem Apple TV
   (anfangs evtl. kurz schwarz oder ein Ladekreis). Ausschalten beendet AirPlay.

Statt des Schalters gehen auch die Aktionen:

```yaml
action: ambiframe.show_on_tv
data:
  entity_id: media_player.apple_tv
  display: fernseher
  resolution: 1080p        # optional: 1080p (Standard) oder 4k
```

```yaml
action: ambiframe.stop_on_tv
data:
  entity_id: media_player.apple_tv
```

## Schritt 7 – Knopf im Dashboard

Eine Kachel, die den Schalter umschaltet (Dashboard bearbeiten → Karte hinzufügen → *Manuell* / YAML):

```yaml
type: tile
entity: switch.ambiframe_fernseher_auf_dem_fernseher
name: Ambiframe auf dem Fernseher
icon: mdi:television-play
tap_action:
  action: toggle
```

## Schritt 8 – Automationen (Vorschläge, vorher fragen)

**Klingel → Ambiframe auf den Fernseher** (der Fernseher zeigt dann die Klingel, wenn das Fernseher-Display auf
das Klingel-Ereignis reagiert – im Editor unter *Ereignisse* einstellbar):

```yaml
alias: Klingel – Ambiframe auf den Fernseher
triggers:
  - trigger: state
    entity_id: binary_sensor.KLINGEL        # anpassen
    to: "on"
conditions:
  - condition: state
    entity_id: media_player.apple_tv
    state: idle                             # nur, wenn gerade nichts läuft
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.ambiframe_fernseher_auf_dem_fernseher
mode: single
```

**Abends um 22:30 wieder ausschalten:**

```yaml
alias: Ambiframe vom Fernseher nehmen
triggers:
  - trigger: time
    at: "22:30:00"
actions:
  - action: switch.turn_off
    target:
      entity_id: switch.ambiframe_fernseher_auf_dem_fernseher
mode: single
```

## Wenn etwas nicht klappt

| Problem | Ursache und Lösung |
|---|---|
| Schalter „Auf dem Fernseher“ fehlt | Beim Display ist kein Fernseher gewählt oder der Videostream ist aus (Schritt 5). |
| Kamera „Videostream“ bleibt schwarz | Puppet läuft nicht oder hat keinen Zugriffstoken (Schritt 4). Im HA-Log nach `ambiframe` suchen. |
| Schalter geht an, Fernseher zeigt nichts oder es gibt einen Anmeldefehler | Apple TV nicht mit **AirPlay** gekoppelt → Schritt 3 wiederholen; „Zugriff erlauben“ prüfen (Schritt 2). |
| Bild kommt, bricht aber ab | WLAN des Apple TV schwach → wenn möglich per Kabel. Nach einem Neustart von Home Assistant ist die AirPlay-Verbindung weg – Schalter erneut einschalten. |
| Ruckelt | „Neues Bild alle“ auf 0,2 s lassen. Ist der Home-Assistant-Rechner zu langsam, auf 0,5 s erhöhen. |

Wenn du nicht weiterkommst: die Log-Einträge zu `ambiframe` sammeln (ohne private Daten wie IP-Adressen, Tokens
oder Namen) und mir zum Weitergeben an den Entwickler geben.
