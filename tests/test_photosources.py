"""Google-Fotos-Album: Adressen aus der öffentlichen Albumseite lesen."""

from custom_components.ambiframe.photosources import _art_title, google_link, parse_google_album

PAGE = (
    'AF_initDataCallback({key: \'ds:1\', data:[null,[["AF1Qip1",["https://lh3.googleusercontent.com/pw/AP1GczAbc_-1",4032,3024,null],'
    '1700000000000],["AF1Qip2",["https://lh3.googleusercontent.com/pw/AP1GczDef2",3024,4032,null],1700000000001],'
    '["AF1Qip1",["https://lh3.googleusercontent.com/pw/AP1GczAbc_-1",4032,3024,null],1700000000000]]]});'
    '<img src="https://lh3.googleusercontent.com/a/profilbild=s32">'
)


def test_google_album_page() -> None:
    photos = parse_google_album(PAGE)
    assert [p["url"] for p in photos] == [
        "https://lh3.googleusercontent.com/pw/AP1GczAbc_-1=w2560-h1440",
        "https://lh3.googleusercontent.com/pw/AP1GczDef2=w2560-h1440",
    ]
    # Beispielfotos und Google-Fotos ohne Bildunterschrift
    assert all(p["credit"] == "" for p in photos)
    assert parse_google_album("<html>kein Album</html>") == []


def test_google_link_and_art_title() -> None:
    assert google_link("https://photos.app.goo.gl/AbC123")
    assert google_link("https://photos.google.com/share/AF1QipX?key=abc")
    assert not google_link("https://photos.google.com/album/AF1QipX")
    assert not google_link("https://evil.example/photos.app.goo.gl/")
    assert _art_title('A Storm at Seatitle QS:P1476,en:"A Storm at Sea"') == "A Storm at Sea"


# ── Platzhalter-Anbieter gegen gespeicherte Antworten (kein Netz) ─────────────────────────────────────────────────

import re as _re
from unittest.mock import patch

import pytest
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.ambiframe.photosources import PhotoSources

WIKI = _re.compile(r"https://api\.wikimedia\.org/feed/.*")


def _wiki_day(title: str, width: int, height: int) -> dict:
    return {"image": {"title": f"File:{title}", "image": {"width": width, "height": height}, "description": {"text": "<b>Nebel</b> am See"}, "artist": {"text": "Anna"}}}


async def test_wikimedia_keeps_only_landscape_and_builds_credit(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    aioclient_mock.get(WIKI, json=_wiki_day("Quer See.jpg", 4000, 2500))
    photos = await PhotoSources(hass).async_photos("wikimedia", "de")
    assert photos and all("Special:FilePath/Quer_See.jpg?width=1920" in p["url"] for p in photos)
    assert photos[0]["credit"] == "Nebel am See · Anna"


async def test_wikimedia_skips_portrait(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    aioclient_mock.get(WIKI, json=_wiki_day("Hoch.jpg", 2000, 3000))
    assert await PhotoSources(hass).async_photos("wikimedia", "de") == []


async def test_art_keeps_public_domain_landscape_only(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    def page(name, lic, w, h):
        return {"imageinfo": [{"width": w, "height": h, "thumburl": f"https://thumb/{name}", "extmetadata": {"LicenseShortName": {"value": lic}, "ObjectName": {"value": f'{name}title QS:P1476,en:"x"'}, "Artist": {"value": "Monet"}}}]}

    pages = {"1": page("Garten", "Public domain", 3000, 2000), "2": page("Frei", "CC BY-SA 4.0", 3000, 2000), "3": page("Hoch", "Public domain", 2000, 3000)}
    aioclient_mock.get(_re.compile(r"https://commons\.wikimedia\.org/w/api\.php.*"), json={"query": {"pages": pages}})
    photos = await PhotoSources(hass).async_photos("art", "de")
    assert [p["url"] for p in photos] == ["https://thumb/Garten"]
    assert photos[0]["credit"] == "Garten · Monet"


async def test_nasa_drops_diagrams_and_items_without_large_image(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    def item(nid, title):
        return {"href": f"https://assets/{nid}/collection.json", "data": [{"nasa_id": nid, "title": title, "keywords": []}]}

    aioclient_mock.get(_re.compile(r"https://images-api\.nasa\.gov/search.*"), json={"collection": {"items": [item("a", "Lagoon Nebula"), item("b", "Orbit diagram"), item("c", "Galaxy")]}})
    aioclient_mock.get("https://assets/a/collection.json", json=["http://images-assets.nasa.gov/image/a/a~large.jpg"])
    aioclient_mock.get("https://assets/c/collection.json", json=["http://images-assets.nasa.gov/image/c/c~orig.jpg"])
    photos = await PhotoSources(hass).async_photos("nasa", "de")
    assert photos == [{"url": "https://images-assets.nasa.gov/image/a/a~large.jpg", "credit": "Lagoon Nebula · NASA"}]


async def test_picsum_landscape_with_author_credit(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    aioclient_mock.get(_re.compile(r"https://picsum\.photos/v2/list.*"), json=[{"id": "7", "author": "Ola", "width": 5000, "height": 3000}, {"id": "8", "author": "X", "width": 1000, "height": 2000}])
    assert await PhotoSources(hass).async_photos("picsum", "de") == [{"url": "https://picsum.photos/id/7/1920/1080", "credit": "Ola · Unsplash"}]


async def test_samples_are_bundled_and_never_credited(hass: HomeAssistant) -> None:
    photos = await PhotoSources(hass).async_photos("samples", "de")
    assert len(photos) >= 6
    assert all(p["url"].startswith("/ambiframe_static/photos/") and p["credit"] == "" for p in photos)


async def test_failed_fetch_returns_last_good_list(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    src = PhotoSources(hass)
    aioclient_mock.get(_re.compile(r"https://picsum\.photos/v2/list.*"), json=[{"id": "7", "author": "Ola", "width": 5000, "height": 3000}])
    good = await src.async_photos("picsum", "de")
    aioclient_mock.clear_requests()
    aioclient_mock.get(_re.compile(r"https://picsum\.photos/v2/list.*"), status=500)
    with patch("custom_components.ambiframe.photosources.CACHE_SECONDS", 0):
        assert await src.async_photos("picsum", "de") == good


async def test_unknown_source_is_empty(hass: HomeAssistant) -> None:
    assert await PhotoSources(hass).async_photos("flickr", "de") == []


# ── Google-Album ──────────────────────────────────────────────────────────────────────────────────────────────

async def test_google_album_fetch_parses_and_caches(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    url = "https://photos.app.goo.gl/AbC"
    aioclient_mock.get(url, text=PAGE)
    src = PhotoSources(hass)
    assert len(await src.async_google(url)) == 2
    assert len(await src.async_google(url)) == 2
    assert aioclient_mock.call_count == 1  # zweiter Aufruf aus dem Zwischenspeicher


async def test_google_album_rejects_foreign_links(hass: HomeAssistant) -> None:
    from homeassistant.exceptions import HomeAssistantError

    with pytest.raises(HomeAssistantError):
        await PhotoSources(hass).async_google("https://evil.example/album")


async def test_google_album_unreachable_returns_empty(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    aioclient_mock.get("https://photos.app.goo.gl/X", status=404)
    assert await PhotoSources(hass).async_google("https://photos.app.goo.gl/X") == []


async def test_google_album_changed_page_keeps_photos_and_raises_repair(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    """Baut Google die Albumseite um, bleiben die letzten Fotos – und unter Reparaturen steht ein Hinweis."""
    from homeassistant.helpers import issue_registry as ir

    url = "https://photos.app.goo.gl/AbC"
    issue = ("ambiframe", "album_empty_google_photos")
    aioclient_mock.get(url, text=PAGE)
    src = PhotoSources(hass)
    assert len(await src.async_google(url)) == 2
    assert ir.async_get(hass).async_get_issue(*issue) is None

    aioclient_mock.clear_requests()
    aioclient_mock.get(url, text="<html>neues Format</html>")
    with patch("custom_components.ambiframe.photosources.time.monotonic", return_value=10**9):
        assert len(await src.async_google(url)) == 2  # letzte gute Liste
    found = ir.async_get(hass).async_get_issue(*issue)
    assert found and found.translation_key == "album_empty"

    aioclient_mock.clear_requests()
    aioclient_mock.get(url, text=PAGE)
    with patch("custom_components.ambiframe.photosources.time.monotonic", return_value=2 * 10**9):
        assert len(await src.async_google(url)) == 2
    assert ir.async_get(hass).async_get_issue(*issue) is None  # verschwindet von selbst


async def test_icloud_album_unreachable_raises_repair(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    from homeassistant.helpers import issue_registry as ir

    from custom_components.ambiframe.icloud import ICloudAlbum

    aioclient_mock.post(_re.compile(r"https://p\d+-sharedstreams\.icloud\.com/.*"), status=500)
    assert await ICloudAlbum(hass).async_photos("https://www.icloud.com/sharedalbum/#B0aBcDeF") == []
    assert ir.async_get(hass).async_get_issue("ambiframe", "album_empty_icloud")
