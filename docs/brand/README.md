# Ambiframe – Marke

**Claim:** *Calm until it matters.* · Deutsch: *Ruhig, bis es zählt.*

Das Zeichen ist ein ruhiger Rahmen – das Display. Nur an der Ecke bricht ein Lichtpunkt durch die Linie: der
Moment, in dem sich Ambiframe meldet. Die Wortmarke ist aus gleich starken Strichen mit runden Enden gebaut und passt
damit zum Rahmen; der i-Punkt trägt dasselbe Licht.

## Farben

| Name | Wert | Einsatz |
|---|---|---|
| Tinte | `#0F1012` | Hintergrund, Schrift auf hellem Grund |
| Papier | `#F4F1EA` | Zeichen und Schrift auf dunklem Grund |
| Bernstein | `#F4B14A` | Lichtpunkt auf dunklem Grund (und in der Oberfläche) |
| Bernstein auf Hell | `#EE9A1F` | Lichtpunkt auf hellem Grund (mehr Kontrast) |
| Dämpfung | `#8B877D` / `#6F6B62` | Claim auf dunklem / hellem Grund |

Bernstein ist die einzige Akzentfarbe und immer **nur ein Punkt** – nie Flächen, nie Verläufe.

## Dateien

„**-light**“ heißt: helle Schrift für **dunklen** Grund. Ohne Zusatz: dunkle Schrift für hellen Grund.

| Datei | Einsatz |
|---|---|
| `mark.svg`, `mark-light.svg` | Nur das Zeichen (ab 32 px) |
| `mark-mini.svg`, `mark-mini-light.svg` | Kräftigere Fassung für 16–32 px (Tabs, Listen, Chips) |
| `logo.svg`, `logo-light.svg` | Zeichen + Wortmarke |
| `logo-claim-en*.svg`, `logo-claim-de*.svg` | Zeichen + Wortmarke + Claim (README-Titel) |
| `banner.svg` / `.png` | Titelbild auf dunklem Grund (1376 × 768) |
| `social.svg` / `.png` | GitHub-Vorschaubild, unter *Settings → Social preview* hochladen (1280 × 640) |
| `icon.svg`, `icon.png`, `icon@2x.png` | Kachel für Home Assistant (`custom_components/ambiframe/brand/`) |
| `icon-mini.svg` | Kachel mit der kräftigen Fassung |

Alles ist aus Strichen und Kreisen gebaut, ohne Schriftdatei. Neu erzeugen:

```bash
python3 scripts/make-brand.py        # alle SVGs
node scripts/render-brand.mjs        # PNGs (braucht Google Chrome und frontend/node_modules)
```

Änderungen an Form oder Farbe gehören in `scripts/make-brand.py`, nicht in die SVGs.

## Regeln

- **Schutzraum:** rund um das Logo mindestens die Höhe des Punktes (¼ der Rahmenhöhe) frei lassen.
- **Mindestgröße:** Zeichen 16 px (Mini-Fassung), Logo 96 px Breite, Logo mit Claim 200 px Breite.
- **Nicht:** strecken, drehen, mit Schatten oder Verlauf versehen, den Punkt umfärben, den Rahmen füllen.
- **Nicht auf Gold:** die alte Gold-Optik ist abgelöst; weder goldene Rahmen noch Gold-Verläufe verwenden.
- **Claim:** nur als Teil von `logo-claim-*` oder als Unterzeile in Großbuchstaben, nie als Fließtext-Überschrift.
- **Auf dem Display selbst:** kein Logo. Die Anzeige bleibt ruhig und gehört den Fotos und Inhalten.
