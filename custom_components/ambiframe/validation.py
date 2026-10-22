"""Prüfung der Ambiframe-Konfiguration (Struktur und Querverweise)."""

from __future__ import annotations

import copy
from typing import Any

import voluptuous as vol
from voluptuous.humanize import humanize_error

from homeassistant.helpers import config_validation as cv

from .const import (
    AMBIENTS,
    BING_MARKETS,
    LANGUAGES,
    CONFIG_VERSION,
    EVENT_KINDS,
    EVENT_KINDS_TITLED,
    GRID_COLUMNS,
    GRID_ROWS,
    PORTRAIT_COLUMNS,
    PORTRAIT_ROWS,
    THEME_MODES,
    THEMES,
    TRANSITIONS,
)

DEFAULT_PHOTO_FOLDER = "media-source://media_source/local/ambiframe"

_ID = vol.All(cv.string, vol.Match(r"^[a-z0-9_\-]+$", msg="erlaubt sind Kleinbuchstaben, Ziffern, _ und -"))
_SECONDS = vol.All(vol.Coerce(int), vol.Range(min=1, max=86400))
_SECONDS_OR_ZERO = vol.All(vol.Coerce(int), vol.Range(min=0, max=86400))

_FONT = vol.All(cv.string, vol.Match(r"^[a-z0-9\-]+$"))

TRANSITION = vol.Schema(
    {
        vol.Optional("type"): vol.In(TRANSITIONS),
        vol.Optional("duration"): vol.All(vol.Coerce(float), vol.Range(min=0.2, max=10)),
    }
)

_TIME = vol.All(cv.string, vol.Match(r"^([01]?\d|2[0-3]):[0-5]\d$", msg="Uhrzeit als HH:MM"))

CONDITION = vol.Any(
    vol.Schema(
        {
            vol.Required("condition"): "time",
            vol.Optional("after"): _TIME,
            vol.Optional("before"): _TIME,
        },
        extra=vol.ALLOW_EXTRA,
    ),
    vol.Schema(
        {
            vol.Required("condition"): vol.In(["state", "not_state", "numeric", "within_days"]),
            vol.Required("entity"): cv.entity_id,
        },
        extra=vol.ALLOW_EXTRA,
    ),
    vol.Schema(
        {
            vol.Required("condition"): "any_state",
            vol.Required("entities"): [cv.entity_id],
            vol.Required("state"): vol.Any(cv.string, [cv.string]),
        },
        extra=vol.ALLOW_EXTRA,
    ),
    # Gruppen: alle (and), mindestens eine (or), keine (not) – beliebig verschachtelt
    vol.Schema(
        {
            vol.Required("condition"): vol.In(["and", "or", "not"]),
            vol.Required("conditions"): vol.All(list, lambda items: [CONDITION(item) for item in items]),
        },
        extra=vol.ALLOW_EXTRA,
    ),
    # Jinja-Vorlage, wahr wie in HA („true“, „on“, Zahl ≠ 0)
    vol.Schema({vol.Required("condition"): "template", vol.Required("value_template"): cv.string}, extra=vol.ALLOW_EXTRA),
    # Entität hat sich in den letzten Minuten geändert (optional: zu einem bestimmten Zustand)
    vol.Schema(
        {
            vol.Required("condition"): "changed",
            vol.Required("entity"): cv.entity_id,
            vol.Optional("minutes", default=10): vol.All(vol.Coerce(int), vol.Range(min=1, max=1440)),
        },
        extra=vol.ALLOW_EXTRA,
    ),
    # Nur auf bestimmten Displays bzw. nur in einer Ausrichtung
    vol.Schema({vol.Required("condition"): "display", vol.Required("displays"): [cv.string]}, extra=vol.ALLOW_EXTRA),
    vol.Schema({vol.Required("condition"): "orientation", vol.Required("orientation"): vol.In(["landscape", "portrait"])}, extra=vol.ALLOW_EXTRA),
)

_PERCENT = vol.All(vol.Coerce(int), vol.Range(min=0, max=100))
# Lesbarkeit: Größe kleinerer Texte und Kontrast gedämpfter Schrift
TEXT_SIZES = ("normal", "large", "xlarge")
CONTRASTS = ("normal", "high")
_COLORS = vol.Schema(
    {
        vol.Optional(key): cv.string
        for key in ("bg", "ink", "accent", "card", "good", "alert", "cold")
    }
    | {vol.Optional("card_opacity"): _PERCENT},
    extra=vol.ALLOW_EXTRA,
)

# Darstellung eines einzelnen Widgets
LOOK = vol.Schema(
    {
        vol.Optional("card"): cv.boolean,
        vol.Optional("accent"): cv.string,
        vol.Optional("ink"): cv.string,
        vol.Optional("size"): vol.All(vol.Coerce(int), vol.Range(min=25, max=400)),
        vol.Optional("opacity"): _PERCENT,
        vol.Optional("padding"): vol.All(vol.Coerce(int), vol.Range(min=0, max=200)),
    },
    extra=vol.ALLOW_EXTRA,
)

# Aktion beim Antippen/langen Drücken eines Widgets
ACTION = vol.Schema(
    {
        vol.Required("action"): vol.In(["toggle", "more_info", "perform", "page", "popup", "pause", "dashboard"]),
        vol.Optional("entity"): cv.entity_id,
        vol.Optional("perform"): vol.All(cv.string, vol.Match(r"^[a-z0-9_]+\.[a-z0-9_]+$", msg="Aktion als domain.dienst")),
        vol.Optional("data"): dict,
        vol.Optional("page"): _ID,
        vol.Optional("card"): dict,
        vol.Optional("title"): cv.string,
        vol.Optional("timeout"): vol.All(vol.Coerce(int), vol.Range(min=5, max=600)),
        vol.Optional("confirm"): vol.Any(bool, cv.string),
    },
    extra=vol.ALLOW_EXTRA,
)

WIDGET = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("type"): cv.string,
        vol.Required("x"): vol.All(vol.Coerce(int), vol.Range(min=0, max=GRID_COLUMNS - 1)),
        vol.Required("y"): vol.All(vol.Coerce(int), vol.Range(min=0, max=GRID_ROWS - 1)),
        vol.Required("w"): vol.All(vol.Coerce(int), vol.Range(min=1, max=GRID_COLUMNS)),
        vol.Required("h"): vol.All(vol.Coerce(int), vol.Range(min=1, max=GRID_ROWS)),
        vol.Optional("options", default=dict): dict,
        vol.Optional("show_if", default=list): [CONDITION],
        vol.Optional("tap_action"): ACTION,
        vol.Optional("hold_action"): ACTION,
        vol.Optional("look"): LOOK,
        # Eigene Position im Hochformat (Raster 8×12)
        vol.Optional("portrait"): vol.Schema(
            {
                vol.Required("x"): vol.All(vol.Coerce(int), vol.Range(min=0, max=PORTRAIT_COLUMNS - 1)),
                vol.Required("y"): vol.All(vol.Coerce(int), vol.Range(min=0, max=PORTRAIT_ROWS - 1)),
                vol.Required("w"): vol.All(vol.Coerce(int), vol.Range(min=1, max=PORTRAIT_COLUMNS)),
                vol.Required("h"): vol.All(vol.Coerce(int), vol.Range(min=1, max=PORTRAIT_ROWS)),
            }
        ),
    },
    extra=vol.ALLOW_EXTRA,
)

PAGE = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("name"): cv.string,
        vol.Optional("duration", default=30): vol.All(vol.Coerce(int), vol.Range(min=3, max=86400)),
        vol.Optional("background", default=dict): vol.Schema(
            {
                vol.Optional("type", default="none"): vol.In(["none", "photo", "color", "camera"]),
                vol.Optional("color"): cv.string,
                # Kamera als Hintergrund: HA-Kamera oder Webcam-Link, Standbild alle refresh s (0 = live)
                vol.Optional("entity"): cv.entity_id,
                vol.Optional("url"): cv.string,
                vol.Optional("refresh"): vol.All(vol.Coerce(int), vol.Range(min=0, max=3600)),
                vol.Optional("name"): cv.string,
                # Mehrere Webcams: bei jedem Erscheinen der Seite die nächste
                vol.Optional("sources"): [
                    vol.Schema(
                        {
                            vol.Required("url"): cv.string,
                            vol.Optional("name"): cv.string,
                            vol.Optional("refresh"): vol.All(vol.Coerce(int), vol.Range(min=0, max=3600)),
                        }
                    )
                ],
                vol.Optional("ambient"): vol.In(AMBIENTS),
            },
            extra=vol.ALLOW_EXTRA,
        ),
        vol.Optional("palette", default="normal"): vol.In(["normal", "night"]),
        vol.Optional("transition"): TRANSITION,
        vol.Optional("show_if", default=list): [CONDITION],
        vol.Optional("css"): cv.string,
        vol.Optional("widgets", default=list): [WIDGET],
    },
    extra=vol.ALLOW_EXTRA,
)

EVENT = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Optional("name"): cv.string,
        vol.Optional("enabled", default=True): cv.boolean,
        vol.Optional("entity"): cv.entity_id,
        vol.Optional("entities"): [cv.entity_id],
        vol.Optional("from"): cv.string,
        vol.Optional("to"): cv.string,
        vol.Required("kind"): vol.In(EVENT_KINDS),
        vol.Optional("camera"): cv.entity_id,
        vol.Optional("title", default=""): cv.string,
        vol.Optional("page"): _ID,
        vol.Optional("style"): vol.In(["card", "fullscreen", "mini"]),
        vol.Optional("interval"): vol.All(vol.Coerce(int), vol.Range(min=0, max=1440)),
        vol.Optional("where", default=""): cv.string,
        vol.Optional("text"): cv.entity_id,
        vol.Optional("icon"): cv.string,
        vol.Optional("cost"): cv.entity_id,
        vol.Optional("chip"): cv.string,
        vol.Optional("duration"): _SECONDS,
        vol.Optional("max"): _SECONDS,
        vol.Optional("hold_after"): _SECONDS_OR_ZERO,
        vol.Optional("cooldown"): _SECONDS_OR_ZERO,
        vol.Optional("at_night"): cv.boolean,
        vol.Optional("displays"): [_ID],
        # Ton: mitgelieferter, eigener aus der Tonbibliothek (ID) oder Link/media-source://; Lautstärke im Browser
        vol.Optional("sound"): cv.string,
        vol.Optional("volume"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100)),
        # Wiederholen: once | loop (bis angetippt/geschlossen) | 2–10 Mal; Abstand in s
        vol.Optional("sound_repeat"): vol.Any(vol.In(["once", "loop"]), vol.All(vol.Coerce(int), vol.Range(min=2, max=10))),
        vol.Optional("sound_interval"): vol.All(vol.Coerce(float), vol.Range(min=1, max=60)),
        # Erinnerung oben rechts: „off“ oder nach n Minuten weg (fehlt = bis angetippt); verschwindet beim Neustart des Geräts
        vol.Optional("reminder"): vol.Any("off", vol.All(vol.Coerce(int), vol.Range(min=1, max=10080))),
        vol.Optional("reminder_clear"): cv.boolean,
        # Mini-Karte „Läuft gerade“: je Titel nach n s ausblenden (fehlt = dauerhaft); nach Pause noch n s
        vol.Optional("mini_duration"): _SECONDS,
        vol.Optional("mini_paused"): _SECONDS_OR_ZERO,
        # Optik der Mini-Karte
        vol.Optional("mini_position"): vol.In(["bottom-right", "bottom-left", "top-right", "top-left"]),
        vol.Optional("mini_size"): vol.In(["small", "large"]),
        vol.Optional("mini_cover"): cv.boolean,
        vol.Optional("mini_progress"): cv.boolean,
        vol.Optional("mini_background"): vol.In(["none"]),
        # Ruhezeit: stumm (mute) oder gar nicht zeigen (skip)
        vol.Optional("quiet"): vol.Schema({vol.Optional("after"): _TIME, vol.Optional("before"): _TIME}),
        vol.Optional("quiet_action"): vol.In(["mute", "skip"]),
        vol.Optional("only_home"): cv.boolean,
        vol.Optional("show_if"): [CONDITION],
        # to: "*" = jede Änderung; bei event.* optional nur diese Ereignistypen
        vol.Optional("event_types"): [cv.string],
    },
    extra=vol.ALLOW_EXTRA,
)

_ICLOUD = vol.All(
    cv.string,
    vol.Match(
        r"^https://((www\.)?icloud\.com/sharedalbum/|photos\.icloud\.com/shared/album/)",
        msg="Link eines geteilten iCloud-Albums (https://photos.icloud.com/shared/album/… oder https://www.icloud.com/sharedalbum/#…)",
    ),
)
_AMBIENT = vol.Schema(
    {
        vol.Optional("type"): vol.In(AMBIENTS),
        vol.Optional("strength"): vol.All(vol.Coerce(int), vol.Range(min=1, max=3)),
        vol.Optional("speed"): vol.In(["slow", "normal"]),
    }
)
# Pro Display abweichend vom Haupt-Design (fehlt ein Wert, gilt das Design)
DISPLAY_DESIGN = vol.Schema(
    {
        vol.Optional("accent"): cv.string,
        vol.Optional("evening"): vol.In(["sun", "off"]),
        vol.Optional("fonts"): vol.Schema({vol.Optional("display"): _FONT, vol.Optional("text"): _FONT}),
        vol.Optional("ambient"): _AMBIENT,
        vol.Optional("colors"): vol.Schema({vol.Optional("dark"): _COLORS, vol.Optional("light"): _COLORS}),
        vol.Optional("radius"): vol.All(vol.Coerce(int), vol.Range(min=0, max=120)),
        vol.Optional("css"): cv.string,
        vol.Optional("language"): vol.In(["auto", *LANGUAGES]),
    }
)
# Töne pro Display: stumm, Lautstärke (skaliert die des Ereignisses), Ruhezeit „HH:MM“–„HH:MM“
DISPLAY_SOUND = vol.Schema(
    {
        vol.Optional("mute"): cv.boolean,
        vol.Optional("volume"): _PERCENT,
        vol.Optional("quiet"): vol.Schema({vol.Optional("after"): _TIME, vol.Optional("before"): _TIME}),
    }
)
# Fotos pro Display (fehlt ein Wert, gilt die Fotoquelle aus dem Design)
DISPLAY_PHOTOS = vol.Schema(
    {
        vol.Optional("folder"): cv.string,
        vol.Optional("bing"): cv.boolean,
        vol.Optional("bing_mix"): cv.boolean,
        vol.Optional("credit"): cv.boolean,
        vol.Optional("icloud"): _ICLOUD,
    }
)

DISPLAY = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("name"): cv.string,
        vol.Required("playlist"): vol.All(
            [vol.Schema({vol.Required("page"): _ID, vol.Optional("duration"): _SECONDS, vol.Optional("show_if"): [CONDITION]})],
            vol.Length(min=1, msg="die Wiedergabeliste braucht mindestens eine Seite"),
        ),
        vol.Optional("theme"): vol.In(THEMES),
        vol.Optional("mode"): vol.In(THEME_MODES),
        vol.Optional("orientation"): vol.In(["auto", "landscape", "portrait"]),
        vol.Optional("transition"): TRANSITION,
        # Watchdog: diese Taste drücken, wenn sich das Display „after“ Sekunden nicht meldet
        vol.Optional("watchdog"): vol.Schema(
            {
                vol.Optional("button"): cv.entity_id,
                vol.Optional("after", default=120): vol.All(vol.Coerce(int), vol.Range(min=60, max=3600)),
            }
        ),
        # Pause endet nach so vielen Minuten von selbst (0 = nie)
        vol.Optional("pause_minutes"): vol.All(vol.Coerce(int), vol.Range(min=0, max=1440)),
        vol.Optional("text_size"): vol.In(TEXT_SIZES),
        vol.Optional("contrast"): vol.In(CONTRASTS),
        vol.Optional("design"): DISPLAY_DESIGN,
        vol.Optional("sound"): DISPLAY_SOUND,
        vol.Optional("photos"): DISPLAY_PHOTOS,
        # Mit welchem Profil angelegt (Küche, Flur, Schlafzimmer, Fernseher) – nur zur Info
        vol.Optional("profile"): cv.string,
        # Pfeile zum Blättern in den unteren Ecken (fehlt = an, wenn das Display bedient wird)
        vol.Optional("nav"): cv.boolean,
        # OLED-Schutz: die Anzeige wandert alle paar Minuten um wenige Pixel
        vol.Optional("oled"): cv.boolean,
        # Nachrichten-Laufband; fehlt = an, außer beim Profil „tv“ (im Videostream ohnehin aus)
        vol.Optional("ticker"): cv.boolean,
        # Erinnerungen oben rechts (fehlt = an)
        vol.Optional("reminders"): cv.boolean,
        # ab so vielen Erinnerungen zu einem Stapel mit Zahl zusammenfassen (0 = nie)
        vol.Optional("reminders_stack"): vol.All(vol.Coerce(int), vol.Range(min=0, max=20)),
        # Mitteilungszentrale: Verlauf an/aus und wie weit zurück (Stunden)
        vol.Optional("history"): cv.boolean,
        vol.Optional("history_hours"): vol.All(vol.Coerce(int), vol.Range(min=1, max=168)),
        # Videostream (Kamera-Entität), gerendert vom Puppet-Add-on – nur auf Abruf
        vol.Optional("stream"): vol.Schema(
            {
                vol.Optional("enabled", default=False): cv.boolean,
                vol.Optional("resolution", default="4k"): vol.In(["4k", "1080p", "both"]),
                # Sekunden zwischen zwei neu gerechneten Bildern (Puppet schafft ~0,2 s in Full HD)
                vol.Optional("interval", default=0.2): vol.All(vol.Coerce(float), vol.Range(min=0.2, max=60)),
                # Apple TV, auf das der Schalter „Auf dem Fernseher“ das Display per AirPlay schickt
                vol.Optional("tv"): cv.entity_id,
                vol.Optional("renderer"): vol.All(cv.string, vol.Match(r"^https?://", msg="Adresse des Puppet-Add-ons, z. B. http://homeassistant.local:10000")),
            }
        ),
        vol.Optional("night", default=dict): vol.Schema(
            {vol.Optional("entity"): cv.entity_id, vol.Optional("page"): _ID}
        ),
        vol.Optional("control", default=dict): vol.Schema(
            {
                vol.Optional("enabled", default=True): cv.boolean,
                # embedded: Dashboard über Ambiframe · screensaver: Dashboard in Fully, Ambiframe als Bildschirmschoner
                vol.Optional("mode"): vol.In(["embedded", "screensaver"]),
                vol.Optional("dashboard", default="/lovelace/0"): cv.string,
                vol.Optional("idle", default=60): vol.All(vol.Coerce(int), vol.Range(min=10, max=3600)),
            }
        ),
        vol.Optional("events", default="all"): vol.Any("all", [_ID]),
    },
    extra=vol.ALLOW_EXTRA,
)

CONFIG = vol.Schema(
    {
        vol.Optional("version", default=CONFIG_VERSION): vol.Coerce(int),
        # false = frisch installiert → der Editor startet den Einrichtungsassistenten
        vol.Optional("setup_complete"): cv.boolean,
        # Eigene Vorlagen: Widget-Gruppen und Seiten (werden beim Einsetzen wie normale Widgets/Seiten geprüft)
        vol.Optional("templates"): vol.Schema(
            {
                vol.Optional("widgets"): [vol.Schema({vol.Required("name"): cv.string, vol.Required("widgets"): [dict]})],
                vol.Optional("pages"): [vol.Schema({vol.Required("name"): cv.string, vol.Required("page"): dict})],
            }
        ),
        vol.Optional("design", default=dict): vol.Schema(
            {
                vol.Optional("theme", default="ruhig"): vol.In(THEMES),
                vol.Optional("mode", default="auto"): vol.In(THEME_MODES),
                vol.Optional("accent"): cv.string,
                vol.Optional("evening", default="sun"): vol.In(["sun", "off"]),
                vol.Optional("fonts"): vol.Schema({vol.Optional("display"): _FONT, vol.Optional("text"): _FONT}),
                vol.Optional("ambient"): _AMBIENT,
                vol.Optional("transition"): TRANSITION,
                vol.Optional("colors"): vol.Schema({vol.Optional("dark"): _COLORS, vol.Optional("light"): _COLORS}),
                vol.Optional("radius"): vol.All(vol.Coerce(int), vol.Range(min=0, max=120)),
                vol.Optional("text_size"): vol.In(TEXT_SIZES),
                vol.Optional("contrast"): vol.In(CONTRASTS),
                vol.Optional("css"): cv.string,
                vol.Optional("language"): vol.In(["auto", *LANGUAGES]),
                vol.Optional("presets"): [vol.Schema({vol.Required("name"): cv.string, vol.Required("design"): dict})],
            },
            extra=vol.ALLOW_EXTRA,
        ),
        vol.Optional("photos", default=dict): vol.Schema(
            {
                vol.Optional("folder", default=DEFAULT_PHOTO_FOLDER): cv.string,
                vol.Optional("bing", default=True): cv.boolean,
                # Bing-Bilder auch zwischen eigene Fotos mischen (sonst nur, wenn Ordner und Album leer sind)
                vol.Optional("bing_mix", default=False): cv.boolean,
                # Region der Bing-Bilder (z. B. en-GB); fehlt = nach der Sprache von Home Assistant
                vol.Optional("bing_market"): vol.In(BING_MARKETS),
                vol.Optional("credit", default=True): cv.boolean,
                vol.Optional("icloud"): _ICLOUD,
            },
            extra=vol.ALLOW_EXTRA,
        ),
        # KI-Zusammenfassung (ai_task, bevorzugt Gemini); leere Angaben (z. B. ein geleertes KI-Feld) gelten als
        # „nicht gesetzt“, statt die ganze Konfiguration abzulehnen
        vol.Optional("summary"): vol.All(
            lambda v: {k: x for k, x in v.items() if x not in (None, "")} if isinstance(v, dict) else v,
            vol.Schema(
                {
                    vol.Optional("enabled", default=False): cv.boolean,
                    # Liste oder Text aus dem Editor („05:30, 12:00, 17:30“)
                    vol.Optional("times"): vol.All(
                        vol.Any([cv.string], cv.string),
                        lambda v: sorted({t.strip() for t in (v.split(",") if isinstance(v, str) else v) if t.strip()}),
                        [_TIME],
                    ),
                    vol.Optional("ai_task"): cv.entity_id,
                    vol.Optional("style", default="facts"): vol.In(["facts", "friendly"]),
                }
            ),
        ),
        # Eigene Töne (Tonbibliothek): in Ereignissen über die ID wählbar
        vol.Optional("sounds", default=list): [
            vol.Schema({vol.Required("id"): _ID, vol.Required("name"): cv.string, vol.Optional("url", default=""): cv.string})
        ],
        vol.Optional("displays", default=list): [DISPLAY],
        vol.Optional("pages", default=list): [PAGE],
        vol.Optional("events", default=list): [EVENT],
    },
    extra=vol.ALLOW_EXTRA,
)


def _duplicates(items: list[dict[str, Any]]) -> set[str]:
    seen: set[str] = set()
    dup: set[str] = set()
    for item in items:
        (dup if item["id"] in seen else seen).add(item["id"])
    return dup


def _event_errors(event: dict[str, Any], page_ids: set[str]) -> list[str]:
    """Was jede Ereignisart zwingend braucht."""
    where = f"Ereignis „{event['id']}“"
    kind = event["kind"]
    triggers = ([event["entity"]] if event.get("entity") else []) + event.get("entities", [])
    errors: list[str] = []
    if kind == "media":
        if not triggers:
            errors.append(f"{where}: braucht mindestens einen Player")
        errors += [f"{where}: „{e}“ ist kein Player (media_player)" for e in triggers if not e.startswith("media_player.")]
    else:
        if not triggers:
            errors.append(f"{where}: braucht einen Auslöser")
        if not event.get("to"):
            errors.append(f"{where}: „zu Zustand“ fehlt")
    if kind in EVENT_KINDS_TITLED and not event["title"]:
        errors.append(f"{where}: Titel fehlt")
    if kind == "page":
        if not event.get("page"):
            errors.append(f"{where}: welche Seite soll erscheinen?")
        elif event["page"] not in page_ids:
            errors.append(f"{where}: Seite „{event['page']}“ gibt es nicht")
    return errors


def _migrate(raw: Any) -> Any:
    """Ältere Fassungen angleichen: „Weißgold“ ist seit Block B der Stil „Gold“ in hell."""
    if not isinstance(raw, dict):
        return raw
    raw = copy.deepcopy(raw)
    design = raw.get("design")
    if isinstance(design, dict) and design.get("theme") == "weissgold":
        design["theme"] = "gold"
        design.setdefault("mode", "light")
    # Reste eines Editor-Fehlers (bis 0.2.0): einzelne Buchstaben eines Entitätsnamens als Schlüssel "0", "1", …
    for key in ("displays", "pages", "events"):
        for item in raw.get(key) or []:
            if isinstance(item, dict):
                for junk in [k for k in item if isinstance(k, str) and k.isdigit()]:
                    del item[junk]
    for display in raw.get("displays") or []:
        if isinstance(display, dict) and display.get("theme") == "weissgold":
            display["theme"] = "gold"
            display.setdefault("mode", "light")
    return raw


# Fehlermeldungen auf Englisch: Satzteile in dieser Reihenfolge ersetzen (längere zuerst)
_EN_PHRASES: list[tuple[str, str]] = [
    ("„", "“"),
    ("“", "”"),
    ("erlaubt sind Kleinbuchstaben, Ziffern, _ und -", "allowed are lowercase letters, digits, _ and -"),
    ("Uhrzeit als HH:MM", "time as HH:MM"),
    ("Aktion als domain.dienst", "action as domain.service"),
    ("die Wiedergabeliste braucht mindestens eine Seite", "the playlist needs at least one page"),
    ("Link eines geteilten iCloud-Albums", "link of a shared iCloud album"),
    (": braucht mindestens einen Player", ": needs at least one player"),
    ("ist kein Player", "is not a player"),
    (": braucht einen Auslöser", ": needs a trigger"),
    (": ”zu Zustand” fehlt", ": “to state” is missing"),
    (": Titel fehlt", ": title is missing"),
    (": welche Seite soll erscheinen?", ": which page should appear?"),
    (": ragt rechts aus dem Raster", ": sticks out of the grid on the right"),
    (": ragt unten aus dem Raster", ": sticks out of the grid at the bottom"),
    (": ragt im Hochformat aus dem Raster", ": sticks out of the portrait grid"),
    ("Langes Drücken", "long press"),
    ("Antippen", "tap"),
    ("zeigt Seite", "shows page"),
    (", die es nicht gibt", " that does not exist"),
    (" braucht eine Entität", " needs an entity"),
    (" braucht eine Aktion (domain.dienst)", " needs an action (domain.service)"),
    (" braucht eine Karte mit", " needs a card with"),
    ("Watchdog braucht eine Taste (button.…), nicht", "watchdog needs a button (button.…), not"),
    ("Nachtseite", "night page"),
    (" gibt es nicht", " does not exist"),
    (" gibt es doppelt", " exists twice"),
    ("Ereignis ", "Event "),
    ("Seite ", "Page "),
    (", Widget ", ", widget "),
    (": Widget ", ": widget "),
    ("Event ”", "Event “"),
    ("Page ”", "Page “"),
    ("Display ”", "Display “"),
    ("widget ”", "widget “"),
]


def localize_error(text: str, lang: str) -> str:
    """Deutsche Fehlermeldung für die Editor-Sprache aufbereiten (außer Deutsch: Englisch)."""
    if lang == "de":
        return text
    for de, en in _EN_PHRASES:
        text = text.replace(de, en)
    return text


def validate_config(raw: Any, lang: str = "de") -> dict[str, Any]:
    """Struktur prüfen, Standardwerte ergänzen und Querverweise kontrollieren.

    Wirft vol.Invalid mit einer lesbaren Fehlermeldung (Deutsch oder Englisch).
    """
    try:
        return _validate(raw)
    except vol.Invalid as err:
        raise vol.Invalid(localize_error(str(err.msg), lang)) from err


def _validate(raw: Any) -> dict[str, Any]:
    raw = _migrate(raw)
    try:
        config: dict[str, Any] = CONFIG(raw)
    except vol.Invalid as err:
        raise vol.Invalid(humanize_error(raw, err)) from err

    errors: list[str] = []
    for label, key in (("Seite", "pages"), ("Display", "displays"), ("Ereignis", "events")):
        errors += [f"{label} „{d}“ gibt es doppelt" for d in sorted(_duplicates(config[key]))]

    page_ids = {page["id"] for page in config["pages"]}
    event_ids = {event["id"] for event in config["events"]}

    for page in config["pages"]:
        errors += [f"Seite „{page['id']}“: Widget „{d}“ gibt es doppelt" for d in sorted(_duplicates(page["widgets"]))]
        for widget in page["widgets"]:
            where = f"Seite „{page['id']}“, Widget „{widget['id']}“"
            if widget["x"] + widget["w"] > GRID_COLUMNS:
                errors.append(f"{where}: ragt rechts aus dem Raster (x + w > {GRID_COLUMNS})")
            if widget["y"] + widget["h"] > GRID_ROWS:
                errors.append(f"{where}: ragt unten aus dem Raster (y + h > {GRID_ROWS})")
            if (portrait := widget.get("portrait")) and (
                portrait["x"] + portrait["w"] > PORTRAIT_COLUMNS or portrait["y"] + portrait["h"] > PORTRAIT_ROWS
            ):
                errors.append(f"{where}: ragt im Hochformat aus dem Raster ({PORTRAIT_COLUMNS}×{PORTRAIT_ROWS})")
            for key, label in (("tap_action", "Antippen"), ("hold_action", "Langes Drücken")):
                action = widget.get(key)
                if not action:
                    continue
                if action["action"] == "page" and action.get("page") not in page_ids:
                    errors.append(f"{where}: {label} zeigt Seite „{action.get('page', '')}“, die es nicht gibt")
                if action["action"] in ("toggle", "more_info") and not action.get("entity"):
                    errors.append(f"{where}: {label} braucht eine Entität")
                if action["action"] == "perform" and not action.get("perform"):
                    errors.append(f"{where}: {label} braucht eine Aktion (domain.dienst)")
                if action["action"] == "popup" and not (action.get("card") or {}).get("type"):
                    errors.append(f"{where}: {label} braucht eine Karte mit „type“")

    for display in config["displays"]:
        where = f"Display „{display['id']}“"
        errors += [f"{where}: Seite „{item['page']}“ gibt es nicht" for item in display["playlist"] if item["page"] not in page_ids]
        night_page = display["night"].get("page")
        if night_page and night_page not in page_ids:
            errors.append(f"{where}: Nachtseite „{night_page}“ gibt es nicht")
        if isinstance(display["events"], list):
            errors += [f"{where}: Ereignis „{e}“ gibt es nicht" for e in display["events"] if e not in event_ids]
        button = (display.get("watchdog") or {}).get("button")
        if button and not button.startswith(("button.", "input_button.")):
            errors.append(f"{where}: Watchdog braucht eine Taste (button.…), nicht „{button}“")

    for event in config["events"]:
        errors += _event_errors(event, page_ids)

    if errors:
        raise vol.Invalid("; ".join(errors))
    return config
