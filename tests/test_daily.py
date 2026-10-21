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
    }


def test_parse_wikiquote_empty() -> None:
    assert parse_wikiquote("<p>nichts</p>") is None
