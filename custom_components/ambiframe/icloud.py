"""Fotos aus einem geteilten iCloud-Album mit öffentlichem Link.

Zwei Link-Formate:
- alt: https://www.icloud.com/sharedalbum/#B0… (Webstream-API „sharedstreams“)
- neu: https://photos.icloud.com/shared/album/<Schlüssel> (CloudKit: Freigabe auflösen, dann Fotos abfragen)
"""

from __future__ import annotations

import json
import logging
import re
import time
from typing import Any
from urllib.parse import quote

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

# Bild-Adressen von iCloud laufen nach etwa 15 Minuten ab (Parameter e=…). Die Liste gilt bis 5 Minuten vorher –
# die Anzeige holt sie alle 5 Minuten neu und hat so immer gültige Adressen.
CACHE_SECONDS = 2400
EXPIRY_MARGIN = 300
_EXPIRES = re.compile(r"[?&]e=(\d+)")
MAX_WIDTH = 2560
_TOKEN = re.compile(r"sharedalbum/#([A-Za-z0-9]+)")
_KEY = re.compile(r"photos\.icloud\.com/shared/album/([A-Za-z0-9_-]+)")
_CK = "https://ckdatabasews.icloud.com/database/1/com.apple.photos.cloud/production"
# Fassungen in dieser Reihenfolge: mittel (~2200 px) reicht für Tablet und TV, sonst groß, sonst Original
_CK_SIZES = ("resJPEGMedRes", "resJPEGLargeRes", "resOriginalRes")
MAX_PHOTOS = 500


def album_token(url: str) -> str | None:
    match = _TOKEN.search(url or "")
    return match.group(1) if match else None


def album_key(url: str) -> str | None:
    """Schlüssel eines Links im neuen Format (photos.icloud.com/shared/album/…)."""
    match = _KEY.search(url or "")
    return match.group(1) if match else None


def _partition(token: str) -> int:
    """Server-Nummer steckt im Token (bekanntes Schema der öffentlichen Album-Webseite)."""
    return int(token[1], 36) if token[0] == "A" else int(token[1:3], 36)


class ICloudAlbum:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._cache: dict[str, tuple[float, list[dict[str, str]]]] = {}

    async def _post(self, host: str, token: str, endpoint: str, payload: dict[str, Any]) -> tuple[str, dict[str, Any]]:
        """POST an die Album-API; folgt dem Umzug auf einen anderen Server (HTTP 330)."""
        session = async_get_clientsession(self.hass)
        for _ in range(3):
            url = f"https://{host}/{token}/sharedstreams/{endpoint}"
            async with session.post(url, json=payload, timeout=aiohttp.ClientTimeout(total=20)) as resp:
                data = await resp.json(content_type=None)
                if resp.status == 330 and isinstance(data, dict) and data.get("X-Apple-MMe-Host"):
                    host = data["X-Apple-MMe-Host"]
                    continue
                resp.raise_for_status()
                return host, data
        raise HomeAssistantError("iCloud-Album: zu viele Weiterleitungen")

    async def _ck_post(self, url: str, payload: dict[str, Any]) -> dict[str, Any]:
        session = async_get_clientsession(self.hass)
        headers = {"Content-Type": "text/plain", "Origin": "https://photos.icloud.com"}
        async with session.post(url, data=json.dumps(payload), headers=headers, timeout=aiohttp.ClientTimeout(total=20)) as resp:
            resp.raise_for_status()
            return await resp.json(content_type=None)

    async def _ck_photos(self, key: str) -> list[dict[str, str]]:
        """Neues Format: Freigabe auflösen (anonymer Zugang + Server), dann Fotos seitenweise abfragen."""
        resolved = await self._ck_post(
            f"{_CK}/public/records/resolve?remapEnums=true&sharing_url_key={quote(key)}", {"shortGUIDs": [{"value": key}]}
        )
        share = resolved["results"][0]
        access = share["anonymousPublicAccess"]
        base = access["databasePartition"].replace(":443", "")
        query = (
            f"{base}/database/1/com.apple.photos.cloud/production/shared/records/query"
            f"?remapEnums=true&sharing_url_key={quote(key)}&publicAccessAuthToken={quote(access['token'])}"
        )
        body: dict[str, Any] = {
            "query": {
                "recordType": "CPLAssetAndMasterByAssetDateWithoutHiddenOrDeleted",
                "filterBy": [
                    {"fieldName": "startRank", "fieldValue": {"type": "INT64", "value": 0}, "comparator": "EQUALS"},
                    {"fieldName": "direction", "fieldValue": {"type": "STRING", "value": "ASCENDING"}, "comparator": "EQUALS"},
                ],
            },
            "zoneID": share["zoneID"],
            "resultsLimit": 200,
        }
        result: list[dict[str, str]] = []
        while len(result) < MAX_PHOTOS:
            page = await self._ck_post(query, body)
            for record in page.get("records", []):
                if record.get("recordType") != "CPLMaster":
                    continue
                fields = record.get("fields", {})
                kind = str((fields.get("itemType") or {}).get("value", ""))
                if re.search(r"movie|mpeg|video", kind):
                    continue
                for size in _CK_SIZES:
                    res = (fields.get(size) or {}).get("value") or {}
                    file_type = (fields.get(size.replace("Res", "FileType")) or {}).get("value", "public.jpeg")
                    if res.get("downloadURL") and file_type == "public.jpeg":
                        result.append({"url": res["downloadURL"].replace("${f}", "photo.jpg"), "credit": ""})
                        break
            marker = page.get("continuationMarker")
            if not marker:
                break
            body["continuationMarker"] = marker
        return result

    async def async_photos(self, url: str) -> list[dict[str, str]]:
        """Liste aus Bild-URL und Bildunterschrift; leer bei Fehlern (dann übernehmen Ordner/Bing)."""
        key = album_key(url)
        token = album_token(url)
        cache_key = key or token
        if not cache_key:
            return []
        cached = self._cache.get(cache_key)
        if cached and time.monotonic() < cached[0]:
            return cached[1]
        # Abgelaufene Adressen nützen nichts – bei Fehlern dann lieber leer (Ordner/Bing übernehmen)
        cached = None
        if key:
            try:
                result = await self._ck_photos(key)
            except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, IndexError) as err:
                _LOGGER.warning("Ambiframe: iCloud-Album nicht abrufbar: %s", err)
                return cached[1] if cached else []
            self._cache[cache_key] = (_valid_until(result), result)
            _LOGGER.debug("Ambiframe: %d Fotos aus dem iCloud-Album", len(result))
            return result
        assert token is not None
        try:
            host = f"p{_partition(token):02d}-sharedstreams.icloud.com"
            host, stream = await self._post(host, token, "webstream", {"streamCtag": None})
            photos = [p for p in stream.get("photos", []) if p.get("mediaAssetType") != "video"]
            # Pro Foto die größte Fassung bis MAX_WIDTH
            wanted: dict[str, dict[str, Any]] = {}
            for photo in photos:
                derivatives = [d for d in (photo.get("derivatives") or {}).values() if d.get("checksum")]
                fitting = [d for d in derivatives if int(d.get("width", 0)) <= MAX_WIDTH] or derivatives
                if fitting:
                    best = max(fitting, key=lambda d: int(d.get("width", 0)))
                    wanted[photo["photoGuid"]] = {"checksum": best["checksum"], "caption": photo.get("caption", "")}
            result: list[dict[str, str]] = []
            guids = list(wanted)
            for start in range(0, len(guids), 50):
                _host, assets = await self._post(host, token, "webasseturls", {"photoGuids": guids[start : start + 50]})
                items = assets.get("items", {})
                for guid in guids[start : start + 50]:
                    item = items.get(wanted[guid]["checksum"])
                    if item:
                        result.append({"url": f"https://{item['url_location']}{item['url_path']}", "credit": wanted[guid]["caption"]})
        except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, HomeAssistantError) as err:
            _LOGGER.warning("Ambiframe: iCloud-Album nicht abrufbar: %s", err)
            return cached[1] if cached else []
        self._cache[token] = (_valid_until(result), result)
        _LOGGER.debug("Ambiframe: %d Fotos aus dem iCloud-Album", len(result))
        return result


def _valid_until(photos: list[dict[str, str]]) -> float:
    """Bis wann die Liste gilt (monotone Uhr): bis kurz vor Ablauf der ersten Bild-Adresse, höchstens CACHE_SECONDS."""
    now = time.time()
    expiries = [int(m.group(1)) for p in photos if (m := _EXPIRES.search(p.get("url", "")))]
    left = min(expiries) - now - EXPIRY_MARGIN if expiries else CACHE_SECONDS
    return time.monotonic() + max(30.0, min(float(CACHE_SECONDS), left))
