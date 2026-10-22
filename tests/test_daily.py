"""Tagesinhalte: Zitat aus der Wikiquote-Vorlage lesen."""

from custom_components.ambiframe.daily import parse_wikiquote

SAMPLE = """<table><tr><td>„</td>
<td style="padding: .5em 1em; text-align: center;">Man muss das Unm&ouml;gliche <i>versuchen</i>,
um das M&ouml;gliche zu erreichen.</td><td>“</td></tr>
<tr><td colspan="3" style="text-align: right;"><a href="/wiki/Hermann_Hesse" title="Hermann Hesse">Hermann Hesse</a>, Briefe</td></tr></table>"""


def test_parse_wikiquote() -> None:
    assert parse_wikiquote(SAMPLE) == {
        "text": "Man muss das Unmögliche versuchen, um das Mögliche zu erreichen.",
        "author": "Hermann Hesse",
        "source": "Wikiquote",
        "period": "week",
    }


def test_parse_wikiquote_empty() -> None:
    assert parse_wikiquote("<p>nichts</p>") is None


async def test_quote_source_by_language_and_choice(hass) -> None:
    """Ohne Wahl: Deutsch → Wikiquote, sonst ZenQuotes; eine gewählte Quelle gilt in jeder Sprache."""
    from unittest.mock import AsyncMock, patch

    from custom_components.ambiframe.daily import DailyService

    service = DailyService(hass)
    with patch.object(service, "_quote", AsyncMock(return_value={"text": "x"})) as quote:
        await service.async_get("quote", "de")
        await service.async_get("quote", "en")
        await service.async_get("quote", "en", "wikiquote")
    assert [c.args[0] for c in quote.call_args_list] == ["wikiquote", "zenquotes"]
