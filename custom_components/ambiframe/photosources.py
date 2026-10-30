"""Platzhalter-Bilder aus freien Quellen und Fotos aus geteilten Google-Fotos-Alben.

Jede Quelle liefert eine Liste aus {"url", "credit"}. Die Listen werden zwischengespeichert, damit Displays nicht bei
jedem Bildwechsel fragen. Bing steckt weiter im Store (ältere Konfigurationen nutzen es direkt).
"""

from __future__ import annotations

import asyncio
import html
import logging
import random
import re
import time
from datetime import timedelta
from pathlib import Path
from typing import Any

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.util import dt as dt_util

from .const import URL_BASE

_LOGGER = logging.getLogger(__name__)

CACHE_SECONDS = 6 * 3600
GOOGLE_CACHE_SECONDS = 3600
TIMEOUT = aiohttp.ClientTimeout(total=15)
# Wikimedia verlangt eine erkennbare Anwendung im User-Agent
USER_AGENT = "Ambiframe (https://github.com/diggi-85/ambiframe)"
SAMPLES_DIR = Path(__file__).parent / "frontend" / "photos"

# Kunst: gemeinfreie Gemälde-Scans des Google Art Project auf Wikimedia Commons, nach Themen gemischt
_ART_TOPICS = ("landscape", "sea", "garden", "river", "winter", "flowers", "harbour", "mountains", "sunset", "village")
# Weltall: NASA-Bildbibliothek (die Schnittstelle „Astronomy Picture of the Day“ liefert derzeit nur ein Logo)
_NASA_TOPICS = ("webb nebula", "webb galaxy", "hubble nebula", "hubble galaxy", "hubble cluster", "aurora iss", "earth at night iss")
# Keine Grafiken, Diagramme oder Logos – nur Aufnahmen
_NASA_SKIP = re.compile(r"diagram|chart|graph|illustration|infographic|logo|poster|artist|concept|animation|render|map", re.I)

# Geteiltes Google-Fotos-Album: Bildadressen stehen in der öffentlichen Albumseite als ["https://lh3…",Breite,Höhe,…]
_GOOGLE_LINK = re.compile(r"^https://(photos\.app\.goo\.gl/|photos\.google\.com/(u/\d+/)?share/)")
_GOOGLE_PHOTO = re.compile(r'\["(https://lh3\.googleusercontent\.com/pw/[A-Za-z0-9_-]+)",(\d+),(\d+)')
# Ohne Browser-Kennung liefert Google nur eine leere JavaScript-Hülle statt der Albumseite
_BROWSER_UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
MAX_GOOGLE = 300

_TAGS = re.compile(r"<[^>]+>")


def _text(value: str | None, limit: int = 90) -> str:
    """HTML aus Wikimedia-Metadaten zu kurzem Text."""
    text = " ".join(html.unescape(_TAGS.sub(" ", value or "")).split())
    return text if len(text) <= limit else text[: limit - 1].rstrip() + "…"


def _art_title(value: str | None) -> str:
    # Commons hängt an Titel oft Wikidata-Schnipsel an („… title QS:P1476,en:…“)
    return re.split(r"\s*(?:title|label) QS:", _text(value, 200))[0].strip()


def google_link(url: str | None) -> bool:
    return bool(_GOOGLE_LINK.match(url or ""))


def parse_google_album(page: str) -> list[dict[str, str]]:
    """Fotos aus der HTML-Seite eines geteilten Albums (jede Adresse einmal)."""
    seen: set[str] = set()
    photos: list[dict[str, str]] = []
    for url, _width, _height in _GOOGLE_PHOTO.findall(page):
        if url in seen:
            continue
        seen.add(url)
        # Größe an Google anhängen: höchstens 2560 × 1440, Seitenverhältnis bleibt
        photos.append({"url": f"{url}=w2560-h1440", "credit": ""})
    # shortcut: nur die erste Seite des Albums (bis ~300 Fotos); für größere Alben Googles Blättern nachbauen
    return photos[:MAX_GOOGLE]


class PhotoSources:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._cache: dict[str, tuple[float, list[dict[str, str]]]] = {}

    async def _json(self, url: str, params: dict[str, Any] | None = None) -> Any:
        session = async_get_clientsession(self.hass)
        async with session.get(url, params=params, headers={"User-Agent": USER_AGENT}, timeout=TIMEOUT) as resp:
            resp.raise_for_status()
            return await resp.json(content_type=None)

    async def async_photos(self, source: str, language: str = "en") -> list[dict[str, str]]:
        """Platzhalter-Bilder einer Quelle; bei Fehlern die letzte gute Liste (oder leer)."""
        key = f"{source}:{language}"
        cached = self._cache.get(key)
        if cached and time.monotonic() - cached[0] < CACHE_SECONDS:
            return cached[1]
        fetch = {
            "samples": self._samples,
            "wikimedia": self._wikimedia,
            "art": self._art,
            "nasa": self._nasa,
            "picsum": self._picsum,
        }.get(source)
        if fetch is None:
            return []
        try:
            photos = await fetch(language)
        except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, TypeError) as err:
            _LOGGER.debug("Ambiframe: Bilder von %s nicht abrufbar: %s", source, err)
            return cached[1] if cached else []
        if photos:
            self._cache[key] = (time.monotonic(), photos)
        return photos or (cached[1] if cached else [])

    async def _samples(self, _language: str) -> list[dict[str, str]]:
        # Beispielfotos ab Werk – bewusst ohne Bildunterschrift
        names = await self.hass.async_add_executor_job(lambda: sorted(p.name for p in SAMPLES_DIR.glob("*.jpg")))
        return [{"url": f"{URL_BASE}/photos/{name}", "credit": ""} for name in names]

    async def _wikimedia(self, language: str) -> list[dict[str, str]]:
        """Bild des Tages (Wikimedia Commons) der letzten zwei Wochen, nur Querformat."""
        lang = language if language in ("de", "en", "fr", "nl") else "en"
        today = dt_util.now().date()

        async def day(offset: int) -> dict[str, Any] | None:
            d = today - timedelta(days=offset)
            try:
                feed = await self._json(f"https://api.wikimedia.org/feed/v1/wikipedia/{lang}/featured/{d:%Y/%m/%d}")
            except (aiohttp.ClientError, TimeoutError, ValueError):
                return None
            return feed.get("image")

        photos = []
        for image in await asyncio.gather(*(day(i) for i in range(14))):
            if not image or not image.get("title"):
                continue
            size = image.get("image") or {}
            if size.get("width", 1) < size.get("height", 0):
                continue
            name = image["title"].removeprefix("File:").replace(" ", "_")
            desc = _text((image.get("description") or {}).get("text"))
            artist = _text((image.get("artist") or {}).get("text"), 40)
            photos.append(
                {
                    "url": f"https://commons.wikimedia.org/wiki/Special:FilePath/{name}?width=1920",
                    "credit": " · ".join(x for x in (desc, artist) if x),
                }
            )
        return photos

    async def _art(self, _language: str) -> list[dict[str, str]]:
        """Gemeinfreie Gemälde (Google Art Project auf Wikimedia Commons), Querformat, 1920 px breit."""
        topic = random.choice(_ART_TOPICS)
        data = await self._json(
            "https://commons.wikimedia.org/w/api.php",
            {
                "action": "query",
                "format": "json",
                "generator": "search",
                "gsrnamespace": "6",
                "gsrsearch": f'incategory:"Google Art Project paintings" {topic} filetype:bitmap',
                "gsrlimit": "40",
                "prop": "imageinfo",
                "iiprop": "url|size|extmetadata",
                "iiurlwidth": "1920",
                "iiextmetadatafilter": "Artist|ObjectName|LicenseShortName",
            },
        )
        photos = []
        for page in (data.get("query") or {}).get("pages", {}).values():
            info = (page.get("imageinfo") or [{}])[0]
            meta = info.get("extmetadata") or {}
            if "public domain" not in (meta.get("LicenseShortName") or {}).get("value", "").lower():
                continue
            if info.get("width", 0) < info.get("height", 0) * 1.15 or not info.get("thumburl"):
                continue
            title = _art_title((meta.get("ObjectName") or {}).get("value"))
            artist = _text((meta.get("Artist") or {}).get("value"), 40)
            photos.append({"url": info["thumburl"], "credit": " · ".join(x for x in (title, artist) if x)})
        return photos

    async def _nasa(self, _language: str) -> list[dict[str, str]]:
        """Weltall-Aufnahmen aus der NASA-Bildbibliothek (gemeinfrei)."""
        data = await self._json(
            "https://images-api.nasa.gov/search",
            {"q": random.choice(_NASA_TOPICS), "media_type": "image", "year_start": "2012", "page_size": "40"},
        )
        items = [
            i
            for i in (data.get("collection") or {}).get("items", [])
            if i.get("href") and i.get("data") and not _NASA_SKIP.search(f"{i['data'][0].get('title', '')} {' '.join(i['data'][0].get('keywords') or [])}")
        ]

        async def large(item: dict[str, Any]) -> dict[str, str] | None:
            # Nicht jedes Bild hat eine große Fassung (~large, etwa 1920 px) – die Dateiliste verrät es
            try:
                files = await self._json(item["href"])
            except (aiohttp.ClientError, TimeoutError, ValueError):
                return None
            url = next((f for f in files if isinstance(f, str) and f.endswith("~large.jpg")), None)
            if not url:
                return None
            return {"url": url.replace("http://", "https://", 1), "credit": f"{_text(item['data'][0].get('title'), 70)} · NASA"}

        return [p for p in await asyncio.gather(*(large(i) for i in items[:30])) if p]

    async def _picsum(self, _language: str) -> list[dict[str, str]]:
        """Zufällige Fotos (Lorem Picsum, Fotos von Unsplash), Querformat."""
        data = await self._json("https://picsum.photos/v2/list", {"page": str(random.randint(1, 30)), "limit": "40"})
        return [
            {"url": f"https://picsum.photos/id/{p['id']}/1920/1080", "credit": f"{p.get('author', '')} · Unsplash"}
            for p in data
            if p.get("width", 0) > p.get("height", 0)
        ]

    async def async_google(self, url: str) -> list[dict[str, str]]:
        """Fotos eines geteilten Google-Fotos-Albums (Link mit „Teilen → Link erstellen“)."""
        if not google_link(url):
            raise HomeAssistantError("Kein Link zu einem geteilten Google-Fotos-Album")
        cached = self._cache.get(url)
        if cached and time.monotonic() - cached[0] < GOOGLE_CACHE_SECONDS:
            return cached[1]
        try:
            session = async_get_clientsession(self.hass)
            async with session.get(url, headers={"User-Agent": _BROWSER_UA, "Accept-Language": "en"}, timeout=TIMEOUT) as resp:
                resp.raise_for_status()
                page = await resp.text()
        except (aiohttp.ClientError, TimeoutError) as err:
            _LOGGER.warning("Ambiframe: Google-Fotos-Album nicht erreichbar: %s", err)
            return cached[1] if cached else []
        photos = parse_google_album(page)
        if not photos:
            _LOGGER.warning("Ambiframe: Im Google-Fotos-Album wurden keine Fotos gefunden – ist der Link öffentlich geteilt?")
        else:
            self._cache[url] = (time.monotonic(), photos)
        return photos
