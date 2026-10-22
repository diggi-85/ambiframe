"""Nachrichten: Feeds lesen (RSS 2.0, RSS 1.0/RDF, Atom) und fertige Quellen."""

from custom_components.ambiframe.news import DEFAULT_FEEDS, PRESETS, NewsService, parse_feed

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
