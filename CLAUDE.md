# Ambiframe (Beta) installieren – Anleitung für Claude

Du hilfst dabei, **Ambiframe** in ein bestehendes Home Assistant (HA) einzubauen. Ambiframe ist eine eigene
Integration, die Tablets, iPads und Fernseher zu ruhigen Ambient-Displays macht (Fotos, Uhr, Wetter, Termine,
Hinweise bei Klingel oder fertiger Wäsche). Dieser Ordner enthält die fertige Integration – es muss nichts gebaut
werden.

Antworte in der Sprache des Nutzers und erkläre jeden Schritt kurz, bevor du ihn ausführst.

## Regeln

- **Erst sichern:** Vor der Installation ein HA-Backup anlegen (oder den Nutzer bitten, es unter
  *Einstellungen → System → Backups* zu tun).
- **Nichts Bestehendes verändern:** Keine vorhandenen Automationen, Dashboards, Helfer oder Integrationen ändern
  oder löschen. Ambiframe bringt alles selbst mit.
- **Keine Zugangsdaten eintippen:** Passwörter, Tokens und Codes gibt der Nutzer selbst ein.
- **Neustart nur nach Rückfrage:** HA-Neustarts unterbrechen kurz alle Automationen.

## 1. Voraussetzungen prüfen

- Home Assistant **2025.1 oder neuer**; das Integrations-Icon erscheint ab 2026.3.
- Zugriff auf den HA-Ordner `/config`, z. B. über
  - das Add-on **Samba share** (am Mac: Finder → *Gehe zu* → *Mit Server verbinden* → `smb://<ha-ip>/config`,
    danach unter `/Volumes/config`),
  - das Add-on **Advanced SSH & Web Terminal**,
  - oder das Add-on **File editor / Studio Code Server** (Ordner hochladen).
- Optional, falls vorhanden: der Home-Assistant-MCP-Server (Werkzeuge `ha_*`) für Neustart, Logs und Prüfungen.

## 2. Installieren

**Weg A – HACS (empfohlen, bekommt Updates):** Ist HACS installiert, den Nutzer bitten: HACS → ⋮ →
*Benutzerdefinierte Repositories* → `https://github.com/diggi-85/ambiframe`, Typ *Integration* → „Ambiframe“
herunterladen. Weiter mit Schritt 2.

**Weg B – Dateien kopieren:**

1. Den Ordner `custom_components/ambiframe` aus diesem Ordner nach `/config/custom_components/ambiframe`
   kopieren (bei Samba z. B. `rsync -a --inplace custom_components/ambiframe/ /Volumes/config/custom_components/ambiframe/`).
   Gibt es den Zielordner schon (Update), ersetzt die neue Version die alte; die Einstellungen liegen woanders
   (`.storage/ambiframe`) und bleiben erhalten.
2. Nach Rückfrage HA neu starten.
3. *Einstellungen → Geräte & Dienste → Integration hinzufügen → **Ambiframe*** (der Nutzer klickt das, falls du
   keinen Zugriff auf die Oberfläche hast).
4. Im Log prüfen, dass keine Fehler mit `ambiframe` auftauchen.

## 3. Einrichten

1. In der HA-Seitenleiste **Ambiframe** öffnen. Beim ersten Start legt Ambiframe aus den vorhandenen Entitäten
   eine Startkonfiguration an (Wetter, Räume nach Bereichen, Müllkalender) und ein Assistent fragt nach dem
   ersten Display (wo es hängt, was es zeigt, worauf es reagiert).
2. Danach im Editor Seiten, Wiedergabeliste und Ereignisse anpassen. Konfiguration geht auch als YAML
   (Editor → *YAML* oder Aktion `ambiframe.import_config`).
3. Hilf dem Nutzer, passende Entitäten zu finden (Klingel, Kameras, Waschmaschine/Trockner mit Status „fertig“,
   Fenster, Kalender, Wetter). Ereignisse am besten auf den Gerätestatus selbst legen (z. B. Betriebszustand
   `run` → `finished`), nicht auf Hilfsschalter, die nichts setzt.

## 4. Displays anschließen

- **Android-Tablet:** [Fully Kiosk Browser](https://www.fully-kiosk.com), Start-URL aus dem Editor
  (*Displays* → Adresse kopieren, z. B. `http://homeassistant.local:8123/ambiframe-display?display=<id>`).
  Einmal anmelden – am besten mit einem eigenen HA-Benutzer ohne Admin-Rechte. Optional in Fully die
  *JavaScript-Schnittstelle* aktivieren, dann weckt Ambiframe den Bildschirm bei Ereignissen.
- **iPad/iPhone mit der HA-App:** ein eigenes Dashboard mit nur dieser Karte anlegen und es im Kiosk-Modus öffnen:
  ```yaml
  type: custom:ambiframe-card
  display: <id>
  ```
  Ambiframe zeigt sich dann im Vollbild. Der Benutzer braucht keine Admin-Rechte.
- **Fernseher (optional, fortgeschritten):** Ambiframe kann ein Display als Videostream auf einen Apple TV
  (AirPlay) oder LG-webOS-TV schicken. Dafür braucht es das Add-on **Puppet** (Repository von balloob) mit einem
  eigenen Zugangstoken, das der Nutzer selbst im Add-on einträgt. Im Editor beim Display unter *Stream* den
  Fernseher wählen; danach gibt es den Schalter *Auf dem Fernseher* und die Aktionen `ambiframe.show_on_tv` /
  `ambiframe.stop_on_tv`.

## 5. Optionale Extras

- **Fotos:** HA → *Medien* → *Lokale Medien* → Ordner `ambiframe` anlegen und Bilder hineinladen, oder im Editor
  bei den Fotos den Link eines **öffentlich geteilten iCloud-Albums** eintragen. Ohne beides zeigt
  Ambiframe die Bing-Bilder des Tages.
- **KI-Zusammenfassung:** braucht eine eingerichtete `ai_task`-Integration (z. B. Google Gemini).
- **Strompreis:** nutzt die Tibber-Integration, wenn vorhanden.

## Rückmeldung an den Entwickler (Beta)

Bei Fehlern: Die Log-Einträge mit `ambiframe` sammeln, kurz beschreiben, was passiert ist, und das dem Nutzer zum
Weitergeben geben. **Vorher private Daten entfernen** (IP-Adressen, Namen, Links, Tokens).
