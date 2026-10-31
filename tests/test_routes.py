"""Streckenverlauf für die Karte: Adressen umrechnen, Route holen, Ersatz und Sperre (alles ohne Netz)."""

from __future__ import annotations

import re
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.ambiframe.routes import RouteService, thin

OSRM = re.compile(r"https://router\.project-osrm\.org/.*")
NOMINATIM = re.compile(r"https://nominatim\.openstreetmap\.org/.*")


def _sensor(hass: HomeAssistant, origin: str = "Musterweg 1 Essen", destination: str = "Beispielstraße 2 Bochum") -> None:
    hass.states.async_set("sensor.weg", "28", {"origin": origin, "destination": destination, "unit_of_measurement": "min"})


def test_thin_keeps_start_and_end() -> None:
    path = [(float(i), 0.0) for i in range(1000)]
    short = thin(path, 50)
    assert len(short) == 50
    assert short[0] == path[0] and short[-1] == path[-1]
    assert thin(path[:10]) == path[:10]


async def test_route_from_addresses(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    _sensor(hass)
    aioclient_mock.get(NOMINATIM, json=[{"lat": "51.45", "lon": "7.01"}])
    aioclient_mock.get(OSRM, json={"routes": [{"geometry": {"coordinates": [[7.01, 51.45], [7.1, 51.47], [7.2, 51.48]]}}]})
    routes = RouteService(hass)
    result = await routes.async_route("sensor.weg")
    assert result is not None
    assert result["path"] == [[51.45, 7.01], [51.47, 7.1], [51.48, 7.2]]  # [Breite, Länge]
    calls = aioclient_mock.call_count
    await routes.async_route("sensor.weg")
    assert aioclient_mock.call_count == calls  # Adressen und Route aus dem Zwischenspeicher


async def test_route_from_coordinates_and_entities_needs_no_geocoding(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    hass.states.async_set("zone.home", "0", {"latitude": 51.5, "longitude": 7.0})
    _sensor(hass, origin="zone.home", destination="51.4, 7.2")
    aioclient_mock.get(OSRM, json={"routes": [{"geometry": {"coordinates": [[7.0, 51.5], [7.2, 51.4]]}}]})
    result = await RouteService(hass).async_route("sensor.weg")
    assert result and result["start"] == [51.5, 7.0] and result["end"] == [51.4, 7.2]
    assert not any("nominatim" in str(c[1]) for c in aioclient_mock.mock_calls)


async def test_route_falls_back_to_straight_line(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    _sensor(hass, origin="51.5,7.0", destination="51.4,7.2")
    aioclient_mock.get(OSRM, status=503)
    result = await RouteService(hass).async_route("sensor.weg")
    assert result and result["path"] == [[51.5, 7.0], [51.4, 7.2]]


async def test_route_unknown_address_or_sensor(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    _sensor(hass)
    aioclient_mock.get(NOMINATIM, json=[])
    routes = RouteService(hass)
    assert await routes.async_route("sensor.weg") is None
    assert await routes.async_route("sensor.fehlt") is None


async def test_unknown_start_address_starts_at_home(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    """Startadresse fehlt in OpenStreetMap: Pendelstrecke beginnt an zone.home."""
    hass.states.async_set("zone.home", "0", {"latitude": 51.5, "longitude": 7.0})
    _sensor(hass, origin="Unbekannter Weg 9 12345 Nirgendwo", destination="51.4,7.2")
    aioclient_mock.get(NOMINATIM, json=[])
    aioclient_mock.get(OSRM, json={"routes": [{"geometry": {"coordinates": [[7.0, 51.5], [7.2, 51.4]]}}]})
    result = await RouteService(hass).async_route("sensor.weg")
    assert result and result["start"] == [51.5, 7.0]
