"""Nachrichten: Feeds lesen (RSS 2.0, RSS 1.0/RDF, Atom) und fertige Quellen."""

import html
import json

from custom_components.ambiframe.news import DEFAULT_FEEDS, PRESETS, NewsService, parse_feed, parse_video_page

RDF = """<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://purl.org/rss/1.0/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel><title>Beispiel</title></channel>
  <item>
    <title>Erste Meldung</title>
    <link>https://example.org/1</link>
    <description>Kurz &lt;b&gt;erklärt&lt;/b&gt;</description>
    <dc:date>2026-10-22T06:00:00+02:00</dc:date>
  </item>
</rdf:RDF>""".encode()

ATOM = b"""<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>Atom-Meldung</title>
    <link href="https://example.org/a"/>
    <summary>Zusammenfassung</summary>
    <updated>2026-10-22T05:00:00Z</updated>
  </entry>
</feed>"""


def test_parse_rdf() -> None:
    [item] = parse_feed(RDF, "Beispiel")
    assert item["title"] == "Erste Meldung"
    assert item["link"] == "https://example.org/1"
    assert item["summary"] == "Kurz erklärt"
    assert item["published"].startswith("2026-10-22T06:00:00")


def test_parse_atom() -> None:
    [item] = parse_feed(ATOM, "Beispiel")
    assert (item["title"], item["link"]) == ("Atom-Meldung", "https://example.org/a")


def test_presets_cover_both_languages() -> None:
    languages = {lang for _name, _url, lang in PRESETS.values()}
    assert {"de", "en"} <= languages
    # Standardquellen je Sprache sind Vorschläge in genau dieser Sprache
    for lang, feeds in DEFAULT_FEEDS.items():
        assert all(PRESETS[f][2] == lang for f in feeds)


def test_resolve_preset_and_url() -> None:
    assert NewsService.resolve("bbc") == ("BBC News", "https://feeds.bbci.co.uk/news/rss.xml")
    assert NewsService.resolve("https://www.example.com/feed.xml") == ("example.com", "https://www.example.com/feed.xml")


def _player(title: str, files: list[tuple[str, int]], poster: str = "https://images.example/p.webp") -> str:
    """Player-Daten wie auf tagesschau.de: JSON im Attribut data-v, HTML-maskiert."""
    data = {
        "posterImage": poster,
        "mc": {
            "meta": {"title": title, "durationSeconds": 101},
            "streams": [{"media": [{"url": url, "mimeType": "video/mp4", "maxHResolutionPx": px} for url, px in files]}],
        },
    }
    return f'<div data-v="{html.escape(json.dumps(data))}"></div>'


def test_parse_video_page_takes_the_matching_edition_up_to_1280px() -> None:
    base = "https://cdn.example/video/2026/1121/TV-20261121-0455-5000"
    page = (
        _player("Schülerdemos", [("https://cdn.example/andere.webxl.h264.mp4", 1280)])
        + _player("tagesschau in 100 Sekunden", [(f"{base}.webs.h264.mp4", 480), (f"{base}.webxl.h264.mp4", 1280), (f"{base}.webxxl.h264.mp4", 1920)])
    )
    video = parse_video_page(page, "tagesschau in 100 Sekunden")
    assert video == {
        "title": "tagesschau in 100 Sekunden",
        "url": f"{base}.webxl.h264.mp4",
        "poster": "https://images.example/p.webp",
        "duration": 101,
        "edition": "2026-11-21T04:55",
    }


def test_parse_video_page_without_edition_or_video() -> None:
    assert parse_video_page("<html>kein Player</html>", "tagesschau in 100 Sekunden") is None
    assert parse_video_page(_player("Andere Sendung", [("https://cdn.example/x.mp4", 640)]), "tagesschau in 100 Sekunden") is None


def test_configured_feeds_include_news_band_and_video_widget() -> None:
    from custom_components.ambiframe.websocket import _configured_feeds

    config = {
        "design": {"news_band": {"enabled": True, "feeds": [{"value": "https://feeds.example/band.xml"}]}},
        "pages": [{"widgets": [{"type": "newsvideo", "options": {"feeds": ["https://feeds.example/video.xml"]}}]}],
    }
    assert _configured_feeds(config) == {"https://feeds.example/band.xml", "https://feeds.example/video.xml"}


def test_parse_video_page_picks_the_newest_edition_not_the_first() -> None:
    old = "https://cdn.example/video/2026/1120/TV-20261120-2155-1000"
    new = "https://cdn.example/video/2026/1121/TV-20261121-0455-5000"
    page = _player("tagesschau in 100 Sekunden", [(f"{old}.webxl.h264.mp4", 1280)]) + _player("tagesschau in 100 Sekunden", [(f"{new}.webxl.h264.mp4", 1280)])
    video = parse_video_page(page, "tagesschau in 100 Sekunden")
    assert video is not None
    assert video["edition"] == "2026-11-21T04:55"
    assert video["url"] == f"{new}.webxl.h264.mp4"
