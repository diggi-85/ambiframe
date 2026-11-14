# Testmatrix – Anforderungen und ihre Tests

Jede Anforderung verweist auf den Test, der sie belegt. Was hier ohne automatischen Test steht, gilt als **nicht
abgesichert** und wird vor einem Release von Hand geprüft.

Ausführen: `cd frontend && npm test` (Frontend) · `.venv/bin/python -m pytest` (Integration) ·
`cd frontend && npm run visual` (Bildvergleiche; nach bewusster Änderung am Aussehen `npm run visual:update`).

## Fotoquellen

| Anforderung | Test |
|---|---|
| Wikimedia: nur Querformat, Bildunterschrift aus Beschreibung und Urheber | `tests/test_photosources.py::test_wikimedia_*` |
| Kunst: nur gemeinfreie Gemälde im Querformat, Titel ohne Wikidata-Reste | `test_art_keeps_public_domain_landscape_only`, `test_google_link_and_art_title` |
| NASA: keine Diagramme, nur Bilder mit großer Fassung | `test_nasa_drops_diagrams_and_items_without_large_image` |
| Lorem Picsum: Querformat, Urheber genannt | `test_picsum_landscape_with_author_credit` |
| Beispielfotos ab Werk, nie mit Bildunterschrift | `test_samples_are_bundled_and_never_credited` |
| Ausfall eines Anbieters: letzte gute Liste bleibt | `test_failed_fetch_returns_last_good_list` |
| Unbekannte Quelle wird abgelehnt | `test_unknown_source_is_empty`, `tests/test_integration.py::test_placeholder_rejects_unknown_source` |
| Reihenfolge: eigene Fotos, Alben, Platzhalter nur ersatzweise oder untergemischt | `frontend/test/logic.test.ts` › Fotoquellen |

## Google-Fotos-Album

| Anforderung | Test |
|---|---|
| Fotos aus der Albumseite, jede Adresse einmal, ohne Bildunterschrift | `test_google_album_page` |
| Nur echte Freigabe-Links | `test_google_link_and_art_title`, `test_google_album_rejects_foreign_links` |
| Zwischenspeicher, nicht erreichbar → leer | `test_google_album_fetch_parses_and_caches`, `test_google_album_unreachable_returns_empty` |
| **Sicherheit:** Displays rufen nur eingetragene Alben ab | `test_google_album_only_when_configured` |
| Route zur Pendelzeit: Adressen umrechnen und merken, Verlauf von OSRM, Luftlinie bei Ausfall, unbekannter Start = Zuhause; Karte zeichnet sie ein | `tests/test_routes.py`, `widgets.test.ts` › Karte |
| **Sicherheit:** Strecken nur zu eingetragenen Reisezeit-Sensoren | `test_route_only_for_configured_sensors` |
| Google baut die Albumseite um: letzte Fotos bleiben, Hinweis unter Reparaturen, verschwindet von selbst | `test_google_album_changed_page_keeps_photos_and_raises_repair` |
| iCloud-Album nicht erreichbar → Hinweis unter Reparaturen | `test_icloud_album_unreachable_raises_repair` |

## Rechte

| Anforderung | Test |
|---|---|
| Konfiguration speichern, Standard, KI-Zusammenfassung, Vorversion nur für Admins | `test_non_admin_cannot_save`, `test_admin_only_commands` |
| Konten ohne Admin rendern nur gespeicherte Templates | `test_integration.py` › Templates |
| News nur aus fertigen oder eingetragenen Feeds | `test_news_only_fetches_known_feeds` |
| Erfundene Display-IDs legen keine Einträge oder Pause-Timer an | `test_unknown_display_ids_are_rejected` |

## Updates ohne Neuanfang

| Anforderung | Test |
|---|---|
| Konfiguration aus 0.6 lädt unverändert, Bing bleibt Bing | `test_older_config_loads_unchanged_after_update` |
| Bing an/aus → Platzhalter-Wahl, auch pro Display | `tests/test_validation.py::test_placeholder_sources_and_migration`, `test_display_own_design_sound_and_photos` |
| Studio speichert nur, was geändert wurde | `frontend/test/studio.test.ts` |
| Kamera später wieder zeigen: 30 min / 1 h auf diesem Gerät ohne Bild und Ton | `display.test.ts` › Kamera später wieder zeigen (mit Gegenprobe) |
| Wer war an der Tür: Standbild beim Auslösen, höchstens eins pro Minute, Links signiert, fremde Dateinamen abgelehnt; Widget zeigt Liste | `test_doorlog_records_snapshot_once_per_minute`, `test_snapshot_view_rejects_foreign_names`, `widgets.test.ts` › Wer war an der Tür? |
| Einblendungen wegwischen (Kamera, Musik, Hinweis, Klingel, Erinnerung): weit genug zur Seite schließt, zu kurz springt zurück, senkrecht bleibt Scrollen, Rückfragen nicht | `display.test.ts` › Einblendungen wegwischen |
| Dashboard beim Verlassen: Auswahl aus den Dashboards von HA, eigene Adresse bleibt; ohne Angabe das Standard-Dashboard des Benutzers („/“) | `studio-advanced.test.ts` › Dashboard beim Verlassen, `test_dashboard_defaults_to_users_own_default_dashboard` |
| Offenes Studio übernimmt Änderungen von anderswo; mit eigenen offenen Änderungen überschreibt es nur nach Rückfrage | `studio-advanced.test.ts` › Änderungen von anderswo |
| Bildschirm aus, wenn alle gewählten Personen weg sind; an, sobald jemand heimkommt; unbekannter Zustand zählt nicht als weg | `display.test.ts` › Bildschirm aus, `test_screen_off_when_everyone_is_away` |

## Studio und Seiteneditor

| Anforderung | Test |
|---|---|
| Seite gestalten im Studio, Rückgängig/Wiederholen | `studio.test.ts` › Seiteneditor und Rückgängig |
| Eingaben in einem Formular = ein Rückgängig-Schritt | `studio-advanced.test.ts` › Rückgängig |
| ⌘S/Strg+S speichert, Strg+Y wiederholt; Anzeige passend zum System | `studio-advanced.test.ts`, `logic.test.ts` › Tastenkürzel |
| YAML übernehmen, Ungültiges ablehnen | `studio-advanced.test.ts` › YAML |
| Eigene Stile speichern und anwenden | `studio-advanced.test.ts` › eigene Stile |
| Hinweis „Zeigen“ führt an die richtige Stelle | `studio-advanced.test.ts` › Hinweise |
| Eigene Töne im Studio | `studio.test.ts` › Tonbibliothek |
| Widgets platzieren, verschieben, Größe, Rand, löschen, duplizieren, einfügen, Vorlagen, Seiten-Import, Hochformat | `frontend/test/page-editor.test.ts` |
| Seite duplizieren: Kopie läuft dort, wo das Original läuft (direkt dahinter, gleiche Dauer und Bedingungen), sonst im aktuellen Display | `page-editor.test.ts` › Seite duplizieren |

## Darstellung

| Anforderung | Test |
|---|---|
| Jeder Stil hat alle Farben hell und dunkel | `frontend/test/themes.test.ts` |
| Nur mitgelieferte Schriften, keine fehlenden Strichstärken | `themes.test.ts` |
| Zahlen aus der Titelschrift, Wörter aus der Textschrift | `themes.test.ts`, `logic.test.ts` › Zahlen in der Titelschrift |
| Frontend und Backend kennen dieselben Stile, Animationen, Quellen, Kartenstile | `themes.test.ts` › Stile insgesamt |
| Kachel-Stil pro Widget und Abstand | `display.test.ts` › Kachel-Stil, `test_validation.py::test_tile_look_card_style_and_gap` |
| Karte: Personen ausblenden (Ausschluss, nur Unterwegs), Namensschilder abschaltbar | `widgets.test.ts` › Karte, To-do, Pendelzeit |
| Karte: Ausschnitt passt alle ein, Personen am selben Ort als Stapel mit einem Schild, Zuhause eingezeichnet | `widgets.test.ts` › Karte, To-do, Pendelzeit |
| To-do: nur Offenes, Abhaken nach 4 s, vorher zurücknehmbar | `widgets.test.ts` › Karte, To-do, Pendelzeit |
| Pendelzeit: „losfahren bis“, Mehrzeit bei Verkehr, fehlender Sensor | `widgets.test.ts` › Karte, To-do, Pendelzeit |
| Tagesuhr: Tageszeit in Worten (auch an den Grenzen), Wochentag groß, eigene Wörter je Sprache | `widgets.test.ts` › Tagesuhr |
| Jahreszeiten: Ostern, Anlässe vor Jahreszeit | `logic.test.ts` › Jahreszeiten |
| E-Ink: keine Animation, keine Überblendung, kein Seitenwechsel-Effekt, Fotos in Graustufen | `display.test.ts` › E-Ink, `visual.mjs` zählt bewegte Elemente (muss 0 sein) |
| Zusammengelegte Stile (Gold → Ruhig, Minimal → Klar) laufen weiter – global, pro Display, in eigenen Stilen | `test_merged_styles_keep_working`, `themes.test.ts` › Zusammengelegte Stile |
| Aussehen aller 35 Stile auf Zuhause, Wetter und Tagesvorschau bleibt gleich (Uhrzeit und Zufall eingefroren) | `frontend/tools/visual.mjs`, Referenzbilder in `frontend/test/visual/` |
| Studio: Wiedergabe per Ziehen sortieren, Tagesband „Was läuft wann?“ (auch über Mitternacht), Hinweis auf verborgene Einstellungen | `studio-advanced.test.ts` › Wiedergabe sortieren, Was läuft wann?, Erweitert |
| Seiteneditor: Widget-Suche, Vorschau unter der Maus ändert nichts, Seite direkt aufs Display nehmen | `page-editor.test.ts` › Widget-Liste, Seite in die Wiedergabe aufnehmen |

## Noch ohne automatischen Test (vor Releases von Hand)

- Bildvergleiche für Seiten mit Fotos, Kamera und Regenradar (ändern sich von außen) und für helle Fassungen.
- Echtes geteiltes Google-Album: von Hand geprüft am 31.10.2026 (11 von 11 Fotos, volle Größe). Vor Releases erneut prüfen – Google kann den Seitenaufbau ändern.
- Erreichbarkeit der echten Anbieter (Wikimedia, NASA, Picsum).
- Geräte: iPad (HA-App-Karte), Android mit Fully, Fernseher per Videostream – von Hand geprüft am 10.11.2026. Vor Releases mit größeren Änderungen am Display erneut prüfen.
- Studio am Handy (375 px breit: Leiste, Schritte, Wiedergabe, Seiteneditor): von Hand geprüft am 14.11.2026.
- Studio im hellen HA-Theme (Übersicht, Momente, Seiteneditor, Assistent): von Hand geprüft am 10.11.2026.
