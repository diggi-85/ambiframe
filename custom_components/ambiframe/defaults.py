"""Startkonfiguration: baut aus den vorhandenen Entitäten sinnvolle erste Seiten.

Wird nur beim allerersten Start verwendet (und im Editor über „Standard laden“).
Danach gehört die Konfiguration dem Benutzer.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar, device_registry as dr, entity_registry as er

from .const import CONFIG_VERSION
from .lang import resolve_lang, tr
from .validation import DEFAULT_PHOTO_FOLDER

_WASTE_HINTS = ("waste", "abfall", "muell", "müll", "trash", "garbage", "bin")
_MAX_ROOMS = 6


def _w(wid: str, wtype: str, x: int, y: int, w: int, h: int, **options: Any) -> dict[str, Any]:
    return {"id": wid, "type": wtype, "x": x, "y": y, "w": w, "h": h, "options": options}


def _area_name(hass: HomeAssistant, entity_id: str) -> str | None:
    entry = er.async_get(hass).async_get(entity_id)
    if entry is None or entry.hidden or entry.entity_category is not None:
        return None
    area_id = entry.area_id
    if area_id is None and entry.device_id:
        device = dr.async_get(hass).async_get(entry.device_id)
        area_id = device.area_id if device else None
    if area_id is None:
        return None
    area = ar.async_get(hass).async_get_area(area_id)
    return area.name if area else None


def _sensor_by_class(hass: HomeAssistant, device_class: str) -> dict[str, str]:
    """Erster brauchbarer Sensor einer Geräteklasse pro Bereich (Bereichsname → entity_id)."""
    found: dict[str, str] = {}
    for state in hass.states.async_all("sensor"):
        if state.attributes.get("device_class") != device_class or state.state in ("unknown", "unavailable"):
            continue
        area = _area_name(hass, state.entity_id)
        if area and area not in found:
            found[area] = state.entity_id
    return found


def _discover_rooms(hass: HomeAssistant) -> list[dict[str, str]]:
    temperatures = _sensor_by_class(hass, "temperature")
    humidities = _sensor_by_class(hass, "humidity")
    rooms = []
    for area, entity_id in list(temperatures.items())[:_MAX_ROOMS]:
        room = {"name": area, "temperature": entity_id}
        if area in humidities:
            room["humidity"] = humidities[area]
        rooms.append(room)
    return rooms


def _first(hass: HomeAssistant, domain: str, hints: tuple[str, ...] = ()) -> str | None:
    for state in hass.states.async_all(domain):
        if not hints or any(h in state.entity_id for h in hints):
            return state.entity_id
    return None


def build_default_config(hass: HomeAssistant) -> dict[str, Any]:
    """Erste Konfiguration aus Wetter, Raumsensoren und Müllkalender (falls vorhanden) – in der Sprache von HA."""
    lang = resolve_lang(hass)
    weather = _first(hass, "weather")
    waste = _first(hass, "calendar", _WASTE_HINTS)
    rooms = _discover_rooms(hass)

    line_items: list[dict[str, Any]] = []
    if weather:
        line_items.append({"type": "weather", "entity": weather})
    if waste:
        line_items.append({"type": "calendar", "entity": waste, "days": 2})

    side = _w("wetter", "weather", 8, 1, 4, 6, entity=weather, variant="card") if weather else _w(
        "datum_karte", "date", 8, 1, 4, 6, style="card"
    )

    pages: list[dict[str, Any]] = [
        {
            "id": "foto",
            "name": tr(lang, "Bilderrahmen"),
            "duration": 90,
            "background": {"type": "photo"},
            "widgets": [
                _w("uhr", "clock", 0, 4, 6, 2, valign="end"),
                _w("datum", "date", 0, 6, 7, 1),
                _w("zeile", "infoline", 0, 7, 9, 1, items=line_items),
            ],
        },
        {
            "id": "standby",
            "name": tr(lang, "StandBy"),
            "duration": 60,
            "widgets": [
                _w("uhr", "clock", 0, 2, 7, 3, valign="end"),
                _w("datum", "date", 0, 5, 7, 1, color="accent"),
                side,
            ],
        },
    ]
    playlist = [{"page": "foto"}, {"page": "standby"}]

    if weather:
        pages.append(
            {
                "id": "wetter",
                "name": tr(lang, "Wetter"),
                "duration": 20,
                "widgets": [
                    _w("titel", "text", 0, 0, 6, 1, text=tr(lang, "Wetter"), style="label"),
                    _w("uhr", "clock", 9, 0, 3, 1, align="end", size="small"),
                    _w("jetzt", "weather", 0, 1, 4, 7, entity=weather, variant="now"),
                    _w("stunden", "weather", 5, 1, 7, 3, entity=weather, variant="hourly", hours=12),
                    _w("tage", "weather", 5, 4, 7, 4, entity=weather, variant="daily", days=5),
                ],
            }
        )
        playlist += [{"page": "foto"}, {"page": "wetter"}]

    pages.append(
        {
            "id": "zuhause",
            "name": tr(lang, "Zuhause"),
            "duration": 20,
            "widgets": [
                _w("titel", "text", 0, 0, 6, 1, text=tr(lang, "Zuhause"), style="label"),
                _w("uhr", "clock", 9, 0, 3, 1, align="end", size="small"),
                _w("raeume", "rooms", 0, 1, 8, 7, rooms=rooms, cold=16, warm=25),
                _w("status", "status", 8, 1, 4, 7, windows="auto", lights="auto", waste=waste),
            ],
        }
    )
    playlist += [{"page": "foto"}, {"page": "zuhause"}]

    if waste:
        pages.append(
            {
                "id": "muell",
                "name": tr(lang, "Müll"),
                "duration": 20,
                "show_if": [{"condition": "within_days", "entity": waste, "days": 1}],
                "widgets": [
                    _w("uhr", "clock", 0, 2, 7, 3, valign="end"),
                    _w("datum", "date", 0, 5, 7, 1, color="accent"),
                    _w("muell", "calendar", 8, 1, 4, 6, entity=waste, variant="card", label=tr(lang, "Müll")),
                ],
            }
        )
        playlist.append({"page": "muell"})

    pages.append(
        {
            "id": "nacht",
            "name": tr(lang, "Nacht"),
            "duration": 60,
            "palette": "night",
            "widgets": [
                _w("uhr", "clock", 2, 3, 8, 2, align="center", valign="end"),
                _w("datum", "date", 2, 5, 8, 1, align="center"),
            ],
        }
    )

    return {
        "version": CONFIG_VERSION,
        # Frisch angelegt: der Editor startet den Einrichtungsassistenten
        "setup_complete": False,
        "design": {"theme": "ruhig", "evening": "sun"},
        "photos": {"folder": DEFAULT_PHOTO_FOLDER, "bing": True, "credit": True},
        "displays": [
            {
                # Nicht „ambiframe“ – so heißt schon das Gerät der Integration selbst
                "id": "display",
                "name": tr(lang, "Display"),
                "playlist": playlist,
                "night": {"page": "nacht"},
                "control": {"enabled": True, "dashboard": "/lovelace/0", "idle": 60},
                "events": "all",
            }
        ],
        "pages": pages,
        "events": [],
    }
