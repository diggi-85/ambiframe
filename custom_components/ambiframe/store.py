"""Speicher für die Ambiframe-Konfiguration und gemeinsam genutzte Daten."""

from __future__ import annotations

from datetime import timedelta
import logging
import time
from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import BING_CACHE_SECONDS, BING_URL, PRICE_CACHE_SECONDS, SIGNAL_CONFIG_UPDATED, STORAGE_KEY, STORAGE_VERSION
from .airplay import AirPlayCaster
from .daily import DailyService
from .defaults import build_default_config
from .fully import FullyLink
from .stream import StreamManager
from .hub import DisplayHub
from .icloud import ICloudAlbum
from .news import NewsService
from .summary import SummaryService
from .validation import validate_config

_LOGGER = logging.getLogger(__name__)

# Früherer Name „Wandbild“: dessen Daten einmalig übernehmen (die alten Dateien bleiben als Sicherung liegen)
_LEGACY = "wandbild"
_LEGACY_SUFFIXES = ("", ".previous", ".summary", ".devices")


async def _async_migrate_legacy(hass: HomeAssistant) -> None:
    for suffix in _LEGACY_SUFFIXES:
        new: Store[Any] = Store(hass, STORAGE_VERSION, f"{STORAGE_KEY}{suffix}")
        if await new.async_load() is not None:
            continue
        data = await Store[Any](hass, STORAGE_VERSION, f"{_LEGACY}{suffix}").async_load()
        if data is not None:
            await new.async_save(data)
            _LOGGER.info("Ambiframe: Daten aus .storage/%s%s übernommen", _LEGACY, suffix)


_BING_MARKETS = {"de": "de-DE", "en": "en-US", "fr": "fr-FR", "nl": "nl-NL", "it": "it-IT", "es": "es-ES"}


class AmbiframeStore:
    """Hält die Konfiguration im Speicher und schreibt sie nach `.storage/ambiframe`."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        # Fassung vor dem letzten Speichern – Rettungsweg, falls eine Änderung das Display kaputt macht
        self._previous: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{STORAGE_KEY}.previous")
        self.previous: dict[str, Any] | None = None
        self.config: dict[str, Any] = {}
        self._bing: list[dict[str, str]] = []
        self._bing_fetched = 0.0
        self._prices: dict[str, list[dict[str, Any]]] = {}
        self._prices_fetched = 0.0
        self._prices_day = ""
        self.hub = DisplayHub(hass, self)
        self.fully = FullyLink(hass, self)
        self.streams = StreamManager(hass, self)
        self.news = NewsService(hass)
        self.daily = DailyService(hass)
        self.airplay = AirPlayCaster(hass)
        self.icloud = ICloudAlbum(hass)
        self.summarizer = SummaryService(hass, self)

    async def async_load(self) -> None:
        await _async_migrate_legacy(self.hass)
        data = await self._store.async_load()
        self.previous = await self._previous.async_load()
        await self.fully.async_load()
        if data is None:
            data = validate_config(build_default_config(self.hass))
            await self._store.async_save(data)
            _LOGGER.info("Ambiframe: Startkonfiguration mit %d Seiten angelegt", len(data["pages"]))
        else:
            try:
                data = validate_config(data)
            except vol.Invalid as err:
                # Lieber mit der gespeicherten Fassung starten als das Display leer zu lassen
                _LOGGER.warning("Ambiframe: gespeicherte Konfiguration ist ungültig: %s", err)
        self.config = data

    async def async_save(self, raw: Any, lang: str = "de") -> dict[str, Any]:
        """Prüfen, speichern und alle verbundenen Displays benachrichtigen (Fehlermeldung in der Editor-Sprache)."""
        config = validate_config(raw, lang)
        if self.config and self.config != config:
            self.previous = self.config
            await self._previous.async_save(self.previous)
        self.config = config
        await self._store.async_save(config)
        async_dispatcher_send(self.hass, SIGNAL_CONFIG_UPDATED, config)
        return config

    async def async_bing_photos(self) -> list[dict[str, str]]:
        """Bilder des Tages von Bing (Liste aus URL und Bildunterschrift), 6 h zwischengespeichert."""
        if self._bing and time.monotonic() - self._bing_fetched < BING_CACHE_SECONDS:
            return self._bing
        language = (self.hass.config.language or "en").split("-")[0]
        params = {"format": "js", "idx": "0", "n": "8", "mkt": _BING_MARKETS.get(language, "en-US")}
        try:
            session = async_get_clientsession(self.hass)
            async with session.get(BING_URL, params=params, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                resp.raise_for_status()
                data = await resp.json(content_type=None)
        except (aiohttp.ClientError, TimeoutError, ValueError) as err:
            _LOGGER.debug("Ambiframe: Bing-Bilder nicht abrufbar: %s", err)
            return self._bing
        self._bing = [
            {
                "url": f"https://www.bing.com{image['urlbase']}_1920x1080.jpg",
                "credit": image.get("copyright", "").split(" (©")[0],
            }
            for image in data.get("images", [])
            if image.get("urlbase")
        ]
        self._bing_fetched = time.monotonic()
        return self._bing

    async def async_tibber_prices(self) -> dict[str, list[dict[str, Any]]]:
        """Strompreise heute und morgen je Tibber-Zuhause (Viertelstunden), 15 min zwischengespeichert."""
        today = dt_util.start_of_local_day()
        if self._prices and self._prices_day == today.isoformat() and time.monotonic() - self._prices_fetched < PRICE_CACHE_SECONDS:
            return self._prices
        if not self.hass.services.has_service("tibber", "get_prices"):
            raise HomeAssistantError("Tibber ist nicht eingerichtet")
        response = await self.hass.services.async_call(
            "tibber",
            "get_prices",
            {"start": today.isoformat(), "end": (today + timedelta(days=2)).isoformat()},
            blocking=True,
            return_response=True,
        )
        prices = (response or {}).get("prices", {})
        self._prices = {
            home: [{"start": p["start_time"], "price": p["price"]} for p in points if p.get("price") is not None]
            for home, points in prices.items()
        }
        self._prices_fetched = time.monotonic()
        self._prices_day = today.isoformat()
        return self._prices
