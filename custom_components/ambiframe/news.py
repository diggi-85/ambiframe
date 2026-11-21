"""Nachrichten aus RSS-/Atom-Feeds: Schlagzeile, Bild, Quelle, Zeit – serverseitig geholt und zwischengespeichert."""

from __future__ import annotations

import asyncio
from email.utils import parsedate_to_datetime
import html
import json
import logging
import re
import time
from typing import Any
import xml.etree.ElementTree as ET

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.util import dt as dt_util

_LOGGER = logging.getLogger(__name__)

# Fertige Quellen (ID → Name, Adresse, Sprache) – nur Vorschläge: jede RSS-, Atom- oder RDF-Adresse geht ebenso.
# Gleiche Liste im Frontend (widgets/news.ts, NEWS_PRESETS).
PRESETS: dict[str, tuple[str, str, str]] = {
    "tagesschau": ("tagesschau", "https://www.tagesschau.de/index~rss2.xml", "de"),
    "ntv": ("n-tv", "https://www.n-tv.de/rss", "de"),
    "spiegel": ("SPIEGEL", "https://www.spiegel.de/schlagzeilen/index.rss", "de"),
    "zdf": ("ZDFheute", "https://www.zdf.de/rss/zdf/nachrichten", "de"),
    "dlf": ("Deutschlandfunk", "https://www.deutschlandfunk.de/nachrichten-100.rss", "de"),
    "zeit": ("ZEIT ONLINE", "https://newsfeed.zeit.de/index", "de"),
    "faz": ("FAZ", "https://www.faz.net/rss/aktuell/", "de"),
    "sz": ("Süddeutsche Zeitung", "https://rss.sueddeutsche.de/rss/Topthemen", "de"),
    "heise": ("heise online", "https://www.heise.de/rss/heise-atom.xml", "de"),
    "orf": ("ORF", "https://rss.orf.at/news.xml", "de"),
    "srf": ("SRF News", "https://www.srf.ch/news/bnf/rss/1646", "de"),
    "bbc": ("BBC News", "https://feeds.bbci.co.uk/news/rss.xml", "en"),
    "bbc_world": ("BBC World", "https://feeds.bbci.co.uk/news/world/rss.xml", "en"),
    "guardian": ("The Guardian", "https://www.theguardian.com/world/rss", "en"),
    "npr": ("NPR", "https://feeds.npr.org/1001/rss.xml", "en"),
    "sky": ("Sky News", "https://feeds.skynews.com/feeds/rss/home.xml", "en"),
    "nyt": ("New York Times", "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", "en"),
    "abc_us": ("ABC News", "https://abcnews.go.com/abcnews/topstories", "en"),
    "cbc": ("CBC News", "https://www.cbc.ca/webfeed/rss/rss-topstories", "en"),
    "abc_au": ("ABC News Australia", "https://www.abc.net.au/news/feed/51120/rss.xml", "en"),
    "aljazeera": ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml", "en"),
    "dw_en": ("DW", "https://rss.dw.com/rdf/rss-en-all", "en"),
    "nos": ("NOS", "https://feeds.nos.nl/nosnieuwsalgemeen", "nl"),
    "nunl": ("NU.nl", "https://www.nu.nl/rss/Algemeen", "nl"),
    "vrtnws": ("VRT NWS", "https://www.vrt.be/vrtnws/nl.rss.articles.xml", "nl"),
    "lemonde": ("Le Monde", "https://www.lemonde.fr/rss/une.xml", "fr"),
    "franceinfo": ("franceinfo", "https://www.francetvinfo.fr/titres.rss", "fr"),
    "rfi": ("RFI", "https://www.rfi.fr/fr/rss", "fr"),
    "lefigaro": ("Le Figaro", "https://www.lefigaro.fr/rss/figaro_actualites.xml", "fr"),
}

# Ohne eigene Auswahl: Quellen in der Sprache der Anzeige
DEFAULT_FEEDS: dict[str, list[str]] = {
    "de": ["tagesschau", "ntv", "spiegel"],
    "en": ["bbc", "guardian", "npr"],
    "nl": ["nos", "nunl", "vrtnws"],
    "fr": ["lemonde", "franceinfo", "rfi"],
}

FEED_CACHE_SECONDS = 10 * 60
IMAGE_LOOKUPS_PER_FEED = 12
_HEADERS = {"User-Agent": "Mozilla/5.0 (Ambiframe für Home Assistant)"}
_NS = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "media": "http://search.yahoo.com/mrss/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "atom": "http://www.w3.org/2005/Atom",
    "rss1": "http://purl.org/rss/1.0/",
}
_IMG = re.compile(r"<img[^>]+src=[\"']([^\"']+)[\"']", re.I)
_TAGS = re.compile(r"<[^>]+>")
_OG_IMAGE = re.compile(r"<meta[^>]+property=[\"']og:image[\"'][^>]+content=[\"']([^\"']+)[\"']", re.I)


def _text(node: ET.Element | None) -> str:
    return (node.text or "").strip() if node is not None else ""


def _plain(value: str, limit: int = 260) -> str:
    text = html.unescape(_TAGS.sub(" ", value))
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= limit else text[: limit - 1].rsplit(" ", 1)[0] + "…"


def _date(value: str) -> str | None:
    if not value:
        return None
    try:
        return parsedate_to_datetime(value).isoformat()
    except (TypeError, ValueError):
        parsed = dt_util.parse_datetime(value)
        return parsed.isoformat() if parsed else None


def _upgrade(url: str) -> str:
    """Kleine Vorschaubilder gegen große tauschen, wo die Adresse es verrät."""
    # n-tv: …/Img_4_3/250/… → 16:9 in 1280 px
    return re.sub(r"/Img_\d+_\d+/\d+/", "/Img_16_9/1280/", url)


def _small(url: str) -> bool:
    """Bild zu klein für eine große Darstellung? (z. B. SPIEGEL _w520_)"""
    match = re.search(r"_w(\d+)_", url)
    return bool(match and int(match.group(1)) < 800)


def _child(entry: ET.Element, tag: str) -> str:
    """Text eines Unterelements – ohne Namensraum (RSS 2.0) oder im RSS-1.0-Namensraum (RDF)."""
    return _text(entry.find(tag)) or _text(entry.find(f"rss1:{tag}", _NS))


def parse_feed(data: bytes, source: str) -> list[dict[str, Any]]:
    """RSS 2.0, RSS 1.0 (RDF) oder Atom → Liste von Meldungen."""
    root = ET.fromstring(data)
    items: list[dict[str, Any]] = []
    entries = root.findall(".//item") or root.findall(".//rss1:item", _NS) or root.findall(".//atom:entry", _NS)
    for entry in entries:
        title = _plain(_child(entry, "title") or _text(entry.find("atom:title", _NS)), 200)
        if not title:
            continue
        link = _child(entry, "link")
        if not link and (alt := entry.find("atom:link", _NS)) is not None:
            link = alt.get("href", "")
        content = _text(entry.find("content:encoded", _NS))
        description = _child(entry, "description") or _text(entry.find("atom:summary", _NS)) or content
        image = ""
        for enclosure in entry.findall("enclosure"):
            if enclosure.get("type", "image/").startswith("image/") and enclosure.get("url"):
                image = enclosure.get("url", "")
                break
        if not image:
            for tag in ("media:content", "media:thumbnail"):
                if (media := entry.find(tag, _NS)) is not None and media.get("url"):
                    image = media.get("url", "")
                    break
        if not image and (match := _IMG.search(content or description)):
            image = html.unescape(match.group(1))
        published = (
            _date(_text(entry.find("pubDate"))) or _date(_text(entry.find("dc:date", _NS))) or _date(_text(entry.find("atom:updated", _NS)))
        )
        items.append(
            {
                "title": title,
                "summary": _plain(description),
                "link": link.split("#ref=")[0],
                "image": _upgrade(image) if image else "",
                "source": source,
                "published": published,
            }
        )
    return items


# Videos „tagesschau in 100 Sekunden“: die Seite bettet die Player-Daten als JSON in data-v ein (Stand 11/2026)
VIDEO_SOURCES: dict[str, tuple[str, str]] = {
    "tagesschau100": ("tagesschau in 100 Sekunden", "https://www.tagesschau.de/tagesschau_in_100_sekunden"),
}
VIDEO_CACHE_SECONDS = 300
_DATA_V = re.compile(r'data-v="([^"]+)"')
_EDITION = re.compile(r"TV-(\d{8})-(\d{4})")


def parse_video_page(page: str, title: str) -> dict[str, Any] | None:
    """Neueste Ausgabe aus den Player-Daten: MP4 bis 1280 px (Tablets), Vorschaubild, Dauer, Zeitpunkt der Ausgabe.

    Stehen mehrere Folgen auf der Seite, gewinnt die jüngste Sendezeit – nicht die erste, die zufällig oben steht.
    """
    found: list[dict[str, Any]] = []
    for raw in _DATA_V.findall(page):
        try:
            data = json.loads(html.unescape(raw))
        except ValueError:
            continue
        mc = data.get("mc") if isinstance(data, dict) else None
        meta = (mc or {}).get("meta") or {}
        if title not in f"{meta.get('title', '')} {meta.get('seriesTitle', '')}":
            continue
        media = [m for s in mc.get("streams") or [] for m in s.get("media") or [] if m.get("mimeType") == "video/mp4" and m.get("url")]
        if not media:
            continue
        # größte Fassung bis 1280 px – 1920 px lohnt auf Tablets nicht und kostet Datenvolumen
        media.sort(key=lambda m: int(m.get("maxHResolutionPx") or 0))
        best = ([m for m in media if int(m.get("maxHResolutionPx") or 0) <= 1280] or media)[-1]
        edition = _EDITION.search(best["url"])
        poster = data.get("posterImage")
        found.append({
            "title": meta.get("title") or title,
            "url": best["url"],
            "poster": poster if isinstance(poster, str) and poster.startswith("http") else "",
            "duration": meta.get("durationSeconds") or mc.get("durationSeconds"),
            # „20261121-0455“ → 2026-11-21T04:55 (Ortszeit der Sendung)
            "edition": f"{edition.group(1)[:4]}-{edition.group(1)[4:6]}-{edition.group(1)[6:]}T{edition.group(2)[:2]}:{edition.group(2)[2:]}" if edition else "",
        })
    # „2026-11-21T04:55“ lässt sich als Text vergleichen; ohne Zeitpunkt zählt die Reihenfolge auf der Seite
    return max(found, key=lambda v: v["edition"]) if found else None


class NewsService:
    """Holt Feeds, merkt sie sich 10 min und ersetzt zu kleine Bilder durch das Artikelbild (einmal je Artikel)."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._feeds: dict[str, tuple[float, list[dict[str, Any]]]] = {}
        self._og: dict[str, str] = {}
        self._lock = asyncio.Lock()
        self._videos: dict[str, tuple[float, dict[str, Any] | None]] = {}

    async def async_video(self, source: str) -> dict[str, Any] | None:
        """Neueste Ausgabe einer Video-Quelle, 10 min zwischengespeichert (bei Fehlern die letzte bekannte)."""
        if source not in VIDEO_SOURCES:
            return None
        cached = self._videos.get(source)
        if cached and time.monotonic() - cached[0] < VIDEO_CACHE_SECONDS:
            return cached[1]
        title, url = VIDEO_SOURCES[source]
        page = await self._fetch(url)
        found = parse_video_page(page.decode("utf-8", "replace"), title) if page else None
        result = found or (cached[1] if cached else None)
        self._videos[source] = (time.monotonic() if found else time.monotonic() - VIDEO_CACHE_SECONDS + 60, result)
        return result

    @staticmethod
    def resolve(feed: str) -> tuple[str, str]:
        """Feed-Angabe (Preset-ID oder Adresse) → (Name, Adresse)."""
        if feed in PRESETS:
            name, url, _lang = PRESETS[feed]
            return name, url
        host = re.sub(r"^https?://(www\.)?", "", feed).split("/")[0]
        return host, feed

    async def _fetch(self, url: str) -> bytes | None:
        try:
            session = async_get_clientsession(self.hass)
            async with session.get(url, headers=_HEADERS, timeout=aiohttp.ClientTimeout(total=15)) as resp:
                resp.raise_for_status()
                return await resp.read()
        except (aiohttp.ClientError, TimeoutError) as err:
            _LOGGER.debug("Ambiframe: %s nicht abrufbar: %s", url, err)
            return None

    async def _og_image(self, link: str) -> str:
        if link in self._og:
            return self._og[link]
        page = await self._fetch(link)
        match = _OG_IMAGE.search(page.decode("utf-8", "replace")) if page else None
        image = html.unescape(match.group(1)) if match else ""
        if len(self._og) > 500:
            self._og.clear()
        self._og[link] = image
        return image

    async def _feed(self, feed: str) -> list[dict[str, Any]]:
        name, url = self.resolve(feed)
        cached = self._feeds.get(url)
        if cached and time.monotonic() - cached[0] < FEED_CACHE_SECONDS:
            return cached[1]
        data = await self._fetch(url)
        if data is None:
            return cached[1] if cached else []
        try:
            items = await self.hass.async_add_executor_job(parse_feed, data, name)
        except ET.ParseError as err:
            _LOGGER.warning("Ambiframe: Feed %s ist kein gültiges RSS/Atom: %s", url, err)
            return cached[1] if cached else []
        # Kleine Bilder (z. B. SPIEGEL 520 px) durch das große Artikelbild ersetzen – nur für die neuesten Meldungen
        small = [item for item in items[:IMAGE_LOOKUPS_PER_FEED] if item["link"] and (not item["image"] or _small(item["image"]))]
        for item, image in zip(small, await asyncio.gather(*(self._og_image(i["link"]) for i in small)), strict=True):
            if image:
                item["image"] = image
        self._feeds[url] = (time.monotonic(), items)
        return items

    async def async_items(self, feeds: list[str], limit: int = 30) -> list[dict[str, Any]]:
        async with self._lock:
            results = await asyncio.gather(*(self._feed(f) for f in feeds))
        seen: set[str] = set()
        merged: list[dict[str, Any]] = []
        for item in sorted((i for r in results for i in r), key=lambda i: i["published"] or "", reverse=True):
            key = item["title"].lower()
            if key not in seen:
                seen.add(key)
                merged.append(item)
        return merged[:limit]
