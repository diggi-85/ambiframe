# Ambiframe per AirPlay auf den Apple TV bringen

Diese Anleitung zeigt Schritt für Schritt, wie ein Ambiframe-Display als Video auf dem **Apple TV** erscheint –
mit einem Schalter, den du im Dashboard drücken und in Automationen benutzen kannst. Voraussetzung: Ambiframe ist
installiert und mindestens ein Display ist eingerichtet.

## So funktioniert es

1. Die App (früher Add-on) **Puppet** öffnet Ambiframe in einem unsichtbaren Browser und liefert laufend Bilder.
2. Ambiframe macht daraus mit ffmpeg einen **Videostream** (Kamera-Entität „Videostream“, bis 25 fps).
3. Der Schalter **„Auf dem Fernseher“** schickt diesen Stream per **AirPlay** an den Apple TV. Dafür nutzt Ambiframe
   die Kopplung der Home-Assistant-Integration **Apple TV** – sie muss also **mit AirPlay gekoppelt** sein.
4. Gerechnet wird nur, solange jemand zuschaut. Schalter aus → Stream und Puppet ruhen.

> **Zugangsdaten:** PINs und Tokens tippst du nur in Home Assistant ein. Gib sie nirgends weiter – auch nicht in
> Fehlerberichten oder Chats.

## Schritt 1 – Voraussetzungen

- Home Assistant OS oder Supervised (für die App Puppet).
- Ambiframe ist installiert (*Einstellungen → Geräte & Dienste → Ambiframe*).
- Am schönsten ist ein **eigenes Display für den Fernseher**: im Studio **+ Display hinzufügen** und unter
  *Ort & Gerät* den Ort **Fernseher** wählen (große Schrift, dunkel, OLED-Schutz, ohne Ton und Bedienung). Merke dir
  die **ID** des Displays (steht in der Adresse, z. B. `?display=fernseher`).
- Apple TV und Home Assistant sind im **selben Netzwerk**, der Apple TV am besten per Kabel.

## Schritt 2 – Apple TV vorbereiten

Am Apple TV unter **Einstellungen → AirPlay und HomeKit**:

- **AirPlay:** Ein
- **Zugriff erlauben:** „Jeder im selben Netzwerk“
- **Passwort verlangen:** Aus

## Schritt 3 – Apple-TV-Integration mit AirPlay koppeln

1. Ist die Integration **Apple TV** noch nicht da: *Einstellungen → Geräte & Dienste → Integration hinzufügen →
   Apple TV* (meist wird sie automatisch gefunden).
2. Ist sie schon da: beim Apple-TV-Eintrag ⋮ → **Neu konfigurieren**.
3. Der Assistent koppelt mehrere Protokolle nacheinander. **Alle koppeln, vor allem AirPlay.** Für jedes erscheint
   ein **PIN auf dem Fernseher**, den du in Home Assistant eintippst.
4. Merke dir die Entität des Apple TV, z. B. `media_player.apple_tv`.

**Prüfen:** Die Integration zeigt keinen Fehler, und der `media_player` hat einen Zustand wie `idle`, `standby` oder
`playing`.

## Schritt 4 – App „Puppet“ installieren

1. *Einstellungen → Apps → App-Store → ⋮ → Repositories* → `https://github.com/balloob/home-assistant-addons`
   hinzufügen.
2. **Puppet** installieren.
3. Einen **langlebigen Zugriffstoken** anlegen (*Profil → Sicherheit → Langlebige Zugriffstoken → Token erstellen*,
   Name z. B. „Puppet“) und ihn in der Konfiguration von Puppet eintragen.
4. Puppet starten und **Beim Start starten** einschalten.

Ambiframe findet Puppet automatisch. Nur wenn das nicht klappt: beim Display unter *Technik → Videostream* (mit
Häkchen **Erweitert**) die **Puppet-Adresse** eintragen, z. B. `http://homeassistant.local:10000`.

## Schritt 5 – Videostream und Fernseher in Ambiframe einschalten

Im Studio beim Fernseher-Display unter **Technik → Videostream**:

- **Videostream:** an
- **Auflösung:** „4K und Full HD (zwei Kameras)“ oder „Full HD“ – AirPlay nutzt Full HD
- **Fernseher (Apple TV):** den `media_player` aus Schritt 3
- **Neues Bild alle (s):** 0,2 lassen (Standard, flüssiges Video; nur mit **Erweitert** sichtbar)
- **Speichern**

Dasselbe als YAML (Experten-Editor → *Erweitert → YAML* oder Aktion `ambiframe.import_config`), hier nur der
relevante Teil des Displays:

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

Danach hat das Gerät des Displays:

- die Kameras **Videostream** und **Videostream Full HD**
- den Schalter **„Auf dem Fernseher“** (z. B. `switch.ambiframe_fernseher_auf_dem_fernseher`)

Die genauen Entitäts-IDs hängen vom Namen des Displays ab – unter *Einstellungen → Geräte & Dienste → Ambiframe*
nachsehen.

## Schritt 6 – Testen

1. Die Kamera **Videostream Full HD** öffnen: Ambiframe muss zu sehen sein. Das erste Bild kann einige Sekunden
   dauern, weil Puppet erst startet.
2. Den Schalter **„Auf dem Fernseher“** einschalten. Nach etwa 5–15 Sekunden erscheint Ambiframe auf dem Apple TV
   (anfangs evtl. kurz schwarz oder ein Ladekreis). Ausschalten beendet AirPlay.

Statt des Schalters gehen auch Aktionen:

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

Dashboard bearbeiten → Karte hinzufügen → *Kachel* mit dem Schalter, oder per YAML:

```yaml
type: tile
entity: switch.ambiframe_fernseher_auf_dem_fernseher
name: Ambiframe auf dem Fernseher
icon: mdi:television-play
tap_action:
  action: toggle
```

## Schritt 8 – Automationen (Beispiele)

**Klingel → Ambiframe auf den Fernseher.** Der Fernseher zeigt dann die Klingel, wenn das Fernseher-Display das
Klingel-Ereignis zeigt (Studio → *Momente*):

```yaml
alias: Klingel – Ambiframe auf den Fernseher
triggers:
  - trigger: state
    entity_id: binary_sensor.haustuer_klingel   # anpassen
    to: "on"
conditions:
  - condition: state
    entity_id: media_player.apple_tv
    state: idle                                 # nur, wenn gerade nichts läuft
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
| Schalter geht an, Fernseher zeigt nichts oder Anmeldefehler | Apple TV nicht mit **AirPlay** gekoppelt → Schritt 3 wiederholen; „Zugriff erlauben“ prüfen (Schritt 2). |
| Bild kommt, bricht aber ab | WLAN des Apple TV schwach → wenn möglich per Kabel. Nach einem Neustart von Home Assistant ist die AirPlay-Verbindung weg – Schalter erneut einschalten. |
| Ruckelt | „Neues Bild alle“ auf 0,2 s lassen. Ist der Home-Assistant-Rechner zu langsam, auf 0,5 s erhöhen. |

Für einen Fehlerbericht die Log-Einträge zu `ambiframe` sammeln – ohne private Daten wie IP-Adressen, Tokens oder
Namen – und als [Issue](https://github.com/diggi-85/ambiframe/issues) melden.
