"""Tägliche Inhalte: Wikipedia-Artikel des Tages und ein Zitat – einmal am Tag geholt und zwischengespeichert.

- Artikel: Wikimedia-Feed „featured“ (Artikel des Tages), Einleitung und Bild über die Wikipedia-API.
  Ohne Titelbild nimmt Ambiframe das größte Foto aus dem Artikel – nie ein fremdes Bild.
- Zitat: Deutsch aus der Wikiquote-Vorlage „Zitat des Tages“ (wechselt inzwischen wöchentlich), Englisch über
  ZenQuotes („today“, täglich).
"""

from __future__ import annotations

import asyncio
import html
import logging
import re
from datetime import date
from typing import Any
from urllib.parse import quote

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.util import dt as dt_util

_LOGGER = logging.getLogger(__name__)

# Wikimedia bittet um eine erkennbare Kennung
HEADERS = {"User-Agent": "Ambiframe/0.4.0 (Home Assistant integration; https://github.com/diggi-85/ambiframe)"}
TIMEOUT = aiohttp.ClientTimeout(total=20)


def _text(fragment: str) -> str:
    """HTML-Schnipsel zu schlichtem Text."""
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", fragment))).strip()


def parse_wikiquote(page_html: str) -> dict[str, str] | None:
    """Zitat und Autor aus der gerenderten Vorlage „Zitat des Tages“ (Tabelle: Zitat, darunter Autor).

    Die Vorlage heißt noch so, Wikiquote wechselt das Zitat aber seit 2026 nur noch einmal pro Kalenderwoche
    („period“: „week“ – die Anzeige schreibt dann „Zitat der Woche“).
    """
    found = re.search(r'<td style="padding:\s*\.5em 1em;[^"]*">(.*?)</td>', page_html, re.S)
    if not found:
        return None
    text = _text(found.group(1))
    if not text:
        return None
    author = re.search(r'<td colspan="3"[^>]*>\s*(?:<a [^>]*>)?(.*?)(?:</a>|,|<br)', page_html, re.S)
    return {"text": text, "author": _text(author.group(1)) if author else "", "source": "Wikiquote", "period": "week"}


# Quellen für das Zitat: Wikiquote (Deutsch, wechselt wöchentlich) oder ZenQuotes (Englisch, täglich)
QUOTE_SOURCES = ("wikiquote", "zenquotes")
# Wikipedia-Sprachen mit „Artikel des Tages“ im Featured-Feed
ARTICLE_LANGUAGES = ("de", "en", "sv")


class DailyService:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._cache: dict[tuple[str, str, str], dict[str, Any] | None] = {}
        self._lock = asyncio.Lock()

    async def _json(self, url: str) -> Any:
        session = async_get_clientsession(self.hass)
        async with session.get(url, headers=HEADERS, timeout=TIMEOUT) as resp:
            resp.raise_for_status()
            return await resp.json(content_type=None)

    async def async_get(self, kind: str, lang: str, source: str | None = None) -> dict[str, Any] | None:
        """kind „article“ (lang: Wikipedia-Sprache) oder „quote“ (source: wikiquote | zenquotes, sonst nach Sprache)."""
        today = dt_util.now().date()
        if kind == "article" and lang not in ARTICLE_LANGUAGES:
            lang = "en"
        if kind == "quote":
            source = source if source in QUOTE_SOURCES else ("wikiquote" if lang == "de" else "zenquotes")
        key = (kind, source or lang, today.isoformat())
        async with self._lock:
            if self._cache.get(key) is not None:
                return self._cache[key]
            try:
                result = await (self._article(lang, today) if kind == "article" else self._quote(source or "zenquotes"))
            except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, IndexError) as err:
                _LOGGER.warning("Ambiframe: %s des Tages nicht abrufbar: %s", "Artikel" if kind == "article" else "Zitat", err)
                result = None
            # Alte Tage vergessen
            self._cache = {k: v for k, v in self._cache.items() if k[2] == today.isoformat()}
            self._cache[key] = result
            return result

    async def _article(self, lang: str, day: date) -> dict[str, Any] | None:
        feed = await self._json(f"https://api.wikimedia.org/feed/v1/wikipedia/{lang}/featured/{day:%Y/%m/%d}")
        tfa = feed.get("tfa")
        if not tfa:
            return None
        title = (tfa.get("titles") or {}).get("normalized") or tfa.get("title", "")
        text = tfa.get("extract", "")
        image = (tfa.get("originalimage") or tfa.get("thumbnail") or {}).get("source")
        # Längere Einleitung und Bild direkt vom Artikel
        try:
            page = (
                await self._json(
                    f"https://{lang}.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&explaintext=1"
                    f"&exsentences=4&piprop=thumbnail&pithumbsize=1600&format=json&formatversion=2&titles={quote(title)}"
                )
            )["query"]["pages"][0]
            text = page.get("extract") or text
            image = image or (page.get("thumbnail") or {}).get("source")
        except (aiohttp.ClientError, TimeoutError, KeyError, IndexError):
            pass
        if not image:
            image = await self._largest_photo(lang, title)
        url = ((tfa.get("content_urls") or {}).get("desktop") or {}).get("page", "")
        return {"title": title, "text": text.strip(), "image": image, "url": url}

    async def _largest_photo(self, lang: str, title: str) -> str | None:
        """Größtes Foto (JPEG) im Artikel – Symbole und Logos sind SVG/PNG und fallen so heraus."""
        try:
            data = await self._json(
                f"https://{lang}.wikipedia.org/w/api.php?action=query&generator=images&gimlimit=30&prop=imageinfo"
                f"&iiprop=url|size|mime&iiurlwidth=1600&format=json&formatversion=2&titles={quote(title)}"
            )
        except (aiohttp.ClientError, TimeoutError):
            return None
        photos = [
            info
            for page in (data.get("query") or {}).get("pages", [])
            for info in page.get("imageinfo", [])[:1]
            if info.get("mime") == "image/jpeg" and info.get("width", 0) >= 600
        ]
        best = max(photos, key=lambda i: i.get("width", 0) * i.get("height", 0), default=None)
        return (best.get("thumburl") or best.get("url")) if best else None

    async def _quote(self, source: str) -> dict[str, Any] | None:
        if source == "wikiquote":
            data = await self._json(
                "https://de.wikiquote.org/w/api.php?action=parse&page=Vorlage:Zitat_des_Tages&prop=text&format=json&formatversion=2"
            )
            return parse_wikiquote(data["parse"]["text"])
        data = await self._json("https://zenquotes.io/api/today")
        first = data[0] if isinstance(data, list) and data else {}
        if not first.get("q"):
            return None
        return {"text": first["q"], "author": first.get("a", ""), "source": "ZenQuotes", "period": "day"}
