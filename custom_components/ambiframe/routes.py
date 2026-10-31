"""Streckenverlauf zu einem Reisezeit-Sensor (Waze, Google, HERE) für die Karte.

Die Sensoren liefern nur Fahrzeit und Namen der Strecke, keinen Verlauf. Start und Ziel (Adresse, „Breite,Länge“ oder
eine Entität mit Standort) werden einmal über Nominatim in Koordinaten umgerechnet, der Verlauf kommt von OSRM.
Beides sind freie OpenStreetMap-Dienste – nur für geringe Nutzung gedacht, daher großzügig zwischengespeichert.
"""

from __future__ import annotations

import logging
import re
import time
from typing import Any

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .photosources import TIMEOUT, USER_AGENT

_LOGGER = logging.getLogger(__name__)

ROUTE_CACHE_SECONDS = 6 * 3600
# shortcut: öffentliche Demo-Instanzen von OSRM/Nominatim, bei vielen Nutzern eigene Instanz oder Schlüssel-Dienst nehmen
OSRM = "https://router.project-osrm.org/route/v1/driving/{a};{b}"
NOMINATIM = "https://nominatim.openstreetmap.org/search"
MAX_POINTS = 400
_COORDS = re.compile(r"^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$")

Point = tuple[float, float]


def thin(path: list[Point], limit: int = MAX_POINTS) -> list[Point]:
    """Höchstens limit Punkte, Anfang und Ende bleiben – reicht für eine Linie auf dem Display."""
    if len(path) <= limit:
        return path
    step = (len(path) - 1) / (limit - 1)
    return [path[round(i * step)] for i in range(limit)]


class RouteService:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._places: dict[str, Point | None] = {}
        self._routes: dict[tuple[Point, Point], tuple[float, list[Point]]] = {}

    async def _place(self, value: str) -> Point | None:
        """Ort aus Entität, „Breite,Länge“ oder Adresse (Adressen einmal nachschlagen und merken)."""
        value = value.strip()
        if state := self.hass.states.get(value):
            lat, lon = state.attributes.get("latitude"), state.attributes.get("longitude")
            return (float(lat), float(lon)) if lat is not None and lon is not None else None
        if m := _COORDS.match(value):
            return (float(m[1]), float(m[2]))
        if value in self._places:
            return self._places[value]
        session = async_get_clientsession(self.hass)
        try:
            async with session.get(
                NOMINATIM, params={"q": value, "format": "json", "limit": "1"}, headers={"User-Agent": USER_AGENT}, timeout=TIMEOUT
            ) as resp:
                resp.raise_for_status()
                hits = await resp.json(content_type=None)
        except (aiohttp.ClientError, TimeoutError, ValueError) as err:
            _LOGGER.debug("Ambiframe: Adresse nicht auflösbar: %s", err)
            return None
        place = (float(hits[0]["lat"]), float(hits[0]["lon"])) if hits else None
        self._places[value] = place
        return place

    async def async_route(self, entity_id: str) -> dict[str, Any] | None:
        """Verlauf zum Reisezeit-Sensor: {path: [[lat, lon], …], start, end} oder None."""
        state = self.hass.states.get(entity_id)
        if not state:
            return None
        origin, destination = state.attributes.get("origin"), state.attributes.get("destination")
        if not origin or not destination:
            return None
        # Unbekannte Startadresse (fehlt z. B. in OpenStreetMap): Pendelstrecken beginnen praktisch immer zu Hause
        start = await self._place(str(origin)) or await self._place("zone.home")
        end = await self._place(str(destination))
        if not start or not end:
            return None
        cached = self._routes.get((start, end))
        if cached and time.monotonic() - cached[0] < ROUTE_CACHE_SECONDS:
            path = cached[1]
        else:
            session = async_get_clientsession(self.hass)
            url = OSRM.format(a=f"{start[1]},{start[0]}", b=f"{end[1]},{end[0]}")
            try:
                async with session.get(
                    url, params={"overview": "simplified", "geometries": "geojson"}, headers={"User-Agent": USER_AGENT}, timeout=TIMEOUT
                ) as resp:
                    resp.raise_for_status()
                    data = await resp.json(content_type=None)
                path = thin([(lat, lon) for lon, lat in data["routes"][0]["geometry"]["coordinates"]])
            except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, IndexError) as err:
                _LOGGER.debug("Ambiframe: Route nicht abrufbar: %s", err)
                # Ohne Verlauf wenigstens die Luftlinie, damit Start und Ziel zu sehen sind
                path = cached[1] if cached else [start, end]
            else:
                self._routes[(start, end)] = (time.monotonic(), path)
        return {"path": [list(p) for p in path], "start": list(start), "end": list(end)}
