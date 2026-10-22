"""Prüfregeln der Konfiguration: Standardwerte, Migration, Querverweise und alle neueren Felder."""

from __future__ import annotations

import copy
from typing import Any

import pytest
import voluptuous as vol

from custom_components.ambiframe.validation import validate_config

from .conftest import minimal_config


def _invalid(config: dict[str, Any], *fragments: str) -> None:
    """Muss abgelehnt werden – und die Meldung soll die genannten Teile enthalten."""
    with pytest.raises(vol.Invalid) as err:
        validate_config(config)
    for fragment in fragments:
        assert fragment in str(err.value), f"„{fragment}“ fehlt in: {err.value}"


def test_example_config_is_valid(example_config: dict[str, Any]) -> None:
    config = validate_config(example_config)
    assert config["pages"] and config["displays"]


def test_minimal_config_gets_defaults() -> None:
    config = validate_config(minimal_config())
    assert config["design"]["theme"] == "ruhig"
    assert config["design"]["mode"] == "auto"
    assert config["pages"][0]["widgets"][0]["options"] == {}
    assert config["pages"][0]["show_if"] == []


def test_validation_does_not_mutate_input() -> None:
    raw = minimal_config()
    before = copy.deepcopy(raw)
    validate_config(raw)
    assert raw == before


# ───────── Migration ─────────


def test_migrate_weissgold_to_gold_light() -> None:
    config = validate_config(minimal_config(design={"theme": "weissgold"}))
    assert config["design"]["theme"] == "gold"
    assert config["design"]["mode"] == "light"


def test_migrate_strips_digit_keys_from_editor_bug() -> None:
    raw = minimal_config()
    raw["displays"][0].update({"0": "s", "1": "e"})
    config = validate_config(raw)
    assert "0" not in config["displays"][0] and "1" not in config["displays"][0]


# ───────── Querverweise ─────────


def test_duplicate_page_is_rejected() -> None:
    raw = minimal_config()
    raw["pages"].append(copy.deepcopy(raw["pages"][0]))
    _invalid(raw, "Seite „start“ gibt es doppelt")


def test_widget_outside_grid_is_rejected() -> None:
    raw = minimal_config()
    raw["pages"][0]["widgets"][0].update(x=8, w=6)
    _invalid(raw, "ragt rechts aus dem Raster")


def test_portrait_outside_grid_is_rejected() -> None:
    raw = minimal_config()
    raw["pages"][0]["widgets"][0]["portrait"] = {"x": 4, "y": 0, "w": 6, "h": 2}
    _invalid(raw, "Hochformat")


def test_playlist_to_missing_page_is_rejected() -> None:
    raw = minimal_config()
    raw["displays"][0]["playlist"].append({"page": "gibtsnicht"})
    _invalid(raw, "„gibtsnicht“ gibt es nicht")


def test_empty_playlist_is_rejected() -> None:
    raw = minimal_config()
    raw["displays"][0]["playlist"] = []
    _invalid(raw, "mindestens eine Seite")


# ───────── Bedingungen ─────────


def test_nested_conditions_are_valid() -> None:
    raw = minimal_config()
    raw["pages"][0]["show_if"] = [
        {
            "condition": "or",
            "conditions": [
                {"condition": "state", "entity": "person.a", "state": "home"},
                {"condition": "not", "conditions": [{"condition": "time", "after": "22:00", "before": "06:00"}]},
            ],
        },
        {"condition": "template", "value_template": "{{ true }}"},
        {"condition": "changed", "entity": "binary_sensor.tuer", "minutes": 5},
        {"condition": "display", "displays": ["kueche"]},
        {"condition": "orientation", "orientation": "portrait"},
    ]
    config = validate_config(raw)
    assert config["pages"][0]["show_if"][2]["minutes"] == 5


@pytest.mark.parametrize(
    "condition",
    [
        {"condition": "gibtsnicht"},
        {"condition": "or", "conditions": [{"condition": "time", "after": "25:00"}]},
        {"condition": "template"},
        {"condition": "orientation", "orientation": "schraeg"},
        {"condition": "changed", "entity": "binary_sensor.tuer", "minutes": 0},
    ],
)
def test_bad_conditions_are_rejected(condition: dict[str, Any]) -> None:
    raw = minimal_config()
    raw["pages"][0]["widgets"][0]["show_if"] = [condition]
    with pytest.raises(vol.Invalid):
        validate_config(raw)


def test_playlist_entry_conditions() -> None:
    raw = minimal_config()
    raw["displays"][0]["playlist"][0]["show_if"] = [{"condition": "time", "after": "05:00", "before": "11:00"}]
    assert validate_config(raw)["displays"][0]["playlist"][0]["show_if"]


# ───────── Aktionen, Aussehen, Vorlagen ─────────


def test_actions_are_checked() -> None:
    raw = minimal_config()
    widget = raw["pages"][0]["widgets"][0]
    widget["tap_action"] = {"action": "page", "page": "start"}
    widget["hold_action"] = {"action": "perform", "perform": "script.turn_on", "entity": "script.x", "confirm": True}
    validate_config(raw)

    widget["tap_action"] = {"action": "page", "page": "fehlt"}
    _invalid(raw, "zeigt Seite „fehlt“")

    widget["tap_action"] = {"action": "toggle"}
    _invalid(raw, "braucht eine Entität")

    widget["tap_action"] = {"action": "popup", "card": {}}
    _invalid(raw, "Karte mit „type“")

    widget["tap_action"] = {"action": "perform", "perform": "kein-dienst"}
    _invalid(raw, "domain.dienst")


def test_look_colors_css_presets_templates() -> None:
    raw = minimal_config(
        design={
            "colors": {"dark": {"bg": "#000", "accent": "#fa0", "card_opacity": 80}, "light": {"ink": "#111"}},
            "radius": 24,
            "css": ":host { --wb-accent: red }",
            "presets": [{"name": "Herbst", "design": {"theme": "gold"}}],
        },
        templates={
            "widgets": [{"name": "Uhr", "widgets": [{"id": "u", "type": "clock"}]}],
            "pages": [{"name": "Leer", "page": {"widgets": []}}],
        },
    )
    raw["pages"][0]["css"] = ".cell { outline: 0 }"
    raw["pages"][0]["widgets"][0]["look"] = {"card": True, "size": 120, "opacity": 80, "padding": 8}
    config = validate_config(raw)
    assert config["design"]["colors"]["dark"]["card_opacity"] == 80

    raw["pages"][0]["widgets"][0]["look"]["size"] = 1000
    with pytest.raises(vol.Invalid):
        validate_config(raw)


# ───────── Ereignisse ─────────


def _event(**extra: Any) -> dict[str, Any]:
    return {"id": "sos", "kind": "alarm", "entity": "event.sos", "to": "*", "title": "SOS", **extra}


def test_event_any_change_sound_quiet() -> None:
    raw = minimal_config(
        events=[
            _event(
                sound="alarm",
                volume=80,
                quiet={"after": "22:00", "before": "07:00"},
                quiet_action="mute",
                only_home=True,
                event_types=["on"],
                show_if=[{"condition": "state", "entity": "person.a", "state": "home"}],
            )
        ]
    )
    assert validate_config(raw)["events"][0]["to"] == "*"


@pytest.mark.parametrize(
    ("extra", "fragment"),
    [
        ({"to": None}, "zu Zustand"),
        ({"title": ""}, "Titel fehlt"),
        ({"quiet": {"after": "abends"}}, ""),
        ({"quiet_action": "laut"}, ""),
        ({"volume": 150}, ""),
    ],
)
def test_bad_events_are_rejected(extra: dict[str, Any], fragment: str) -> None:
    event = _event(**extra)
    if event.get("to") is None:
        event.pop("to")
    _invalid(minimal_config(events=[event]), fragment)


def test_page_event_needs_existing_page() -> None:
    _invalid(minimal_config(events=[{"id": "e", "kind": "page", "entity": "binary_sensor.b", "to": "on", "page": "x"}]), "„x“ gibt es nicht")


def test_readability_settings() -> None:
    raw = minimal_config(design={"text_size": "large", "contrast": "high"})
    raw["displays"][0].update(text_size="xlarge", contrast="normal")
    config = validate_config(raw)
    assert config["displays"][0]["text_size"] == "xlarge"
    raw["design"]["text_size"] = "riesig"
    with pytest.raises(vol.Invalid):
        validate_config(raw)


def test_errors_in_english() -> None:
    raw = minimal_config()
    raw["displays"][0]["playlist"].append({"page": "gibtsnicht"})
    with pytest.raises(vol.Invalid) as err:
        validate_config(raw, "en")
    assert str(err.value) == "Display “kueche”: Page “gibtsnicht” does not exist"


def test_language_setting() -> None:
    for language in ("en", "nl", "fr"):
        assert validate_config(minimal_config(design={"language": language}))["design"]["language"] == language
    with pytest.raises(vol.Invalid):
        validate_config(minimal_config(design={"language": "xx"}))


def test_display_own_design_sound_and_photos() -> None:
    config = minimal_config()
    config["displays"][0].update(
        design={"accent": "#88aacc", "fonts": {"display": "fraunces"}, "ambient": {"type": "mist"}, "language": "en"},
        sound={"mute": False, "volume": 40, "quiet": {"after": "22:00", "before": "07:00"}},
        photos={"folder": "media-source://media_source/local/kueche", "bing": False},
        profile="kitchen",
    )
    display = validate_config(config)["displays"][0]
    assert display["sound"]["volume"] == 40
    assert display["design"]["ambient"]["type"] == "mist"
    bad = minimal_config()
    bad["displays"][0]["sound"] = {"quiet": {"after": "25:00"}}
    _invalid(bad, "HH:MM")
    bad = minimal_config()
    bad["displays"][0]["photos"] = {"icloud": "https://example.com/album"}
    _invalid(bad, "iCloud")


def test_wizard_result_is_valid() -> None:
    """So sieht ein vom Einrichtungsassistenten angelegtes Display mit Ereignissen aus."""
    config = minimal_config(setup_complete=True)
    config["displays"].append(
        {
            "id": "fernseher",
            "name": "Fernseher",
            "profile": "tv",
            "playlist": [{"page": "start"}],
            "night": {},
            "control": {"enabled": False, "dashboard": "/lovelace/0", "idle": 60},
            "events": ["klingel"],
            "orientation": "landscape",
            "mode": "dark",
            "text_size": "large",
            "sound": {"mute": True},
            "design": {"ambient": {"type": "none"}},
        }
    )
    config["displays"][0].update(
        profile="kitchen",
        control={"enabled": True, "mode": "embedded", "dashboard": "/lovelace/0", "idle": 60},
        sound={"volume": 80, "quiet": {"after": "22:00", "before": "07:00"}},
    )
    config["events"] = [
        {
            "id": "klingel",
            "name": "Klingel",
            "enabled": True,
            "entity": "binary_sensor.klingel",
            "to": "on",
            "kind": "alarm",
            "title": "Es klingelt",
            "where": "Haustür",
            "max": 120,
            "hold_after": 30,
            "sound": "klangschale",
            "volume": 80,
        },
        {
            "id": "bewegung",
            "name": "Bewegung",
            "enabled": True,
            "entity": "binary_sensor.tuer_bewegung",
            "to": "on",
            "kind": "live",
            "camera": "camera.tuer",
            "title": "Bewegung",
            "where": "",
            "duration": 30,
            "cooldown": 120,
            "sound": "hinweis",
            "volume": 30,
            "quiet": {"after": "22:00", "before": "07:00"},
            "quiet_action": "mute",
        },
    ]
    result = validate_config(config)
    assert result["setup_complete"] is True
    assert [d["id"] for d in result["displays"]] == ["kueche", "fernseher"]


def test_icloud_links_old_and_new_format() -> None:
    from custom_components.ambiframe.icloud import album_key, album_token

    new = "https://photos.icloud.com/shared/album/0abcDEF-xyz_9"
    old = "https://www.icloud.com/sharedalbum/#B0aBcDeF"
    assert album_key(new) == "0abcDEF-xyz_9" and album_token(new) is None
    assert album_token(old) == "B0aBcDeF" and album_key(old) is None
    for url in (new, old):
        assert validate_config(minimal_config(photos={"icloud": url}))["photos"]["icloud"] == url


def test_media_mini_card() -> None:
    config = minimal_config(
        events=[{"id": "musik", "kind": "media", "entities": ["media_player.kueche"], "style": "mini", "title": "", "where": "Sonos"}]
    )
    assert validate_config(config)["events"][0]["style"] == "mini"


def test_display_nav_arrows() -> None:
    config = minimal_config()
    config["displays"][0]["nav"] = False
    assert validate_config(config)["displays"][0]["nav"] is False


def test_icloud_list_expires_before_links() -> None:
    """iCloud-Adressen gelten ~15 min – die zwischengespeicherte Liste muss vorher verfallen."""
    import time

    from custom_components.ambiframe.icloud import CACHE_SECONDS, EXPIRY_MARGIN, _valid_until

    now = time.time()
    photos = [{"url": f"https://cvws.icloud-content.com/B/x/photo.jpg?o=a&v=1&e={int(now) + 900}&fl="}]
    left = _valid_until(photos) - time.monotonic()
    assert 900 - EXPIRY_MARGIN - 5 < left <= 900 - EXPIRY_MARGIN + 1
    # Ohne Ablaufdatum: normale Zwischenspeicherzeit; schon abgelaufen: nur kurz
    assert _valid_until([{"url": "https://example.com/a.jpg"}]) - time.monotonic() == pytest.approx(CACHE_SECONDS, abs=2)
    assert _valid_until([{"url": f"https://x/p.jpg?e={int(now) - 60}"}]) - time.monotonic() == pytest.approx(30, abs=2)


def test_summary_ignores_empty_values() -> None:
    """Ein geleertes Feld darf das Einschalten der Zusammenfassung nicht verhindern (Issue #1)."""
    raw = minimal_config()
    raw["summary"] = {"enabled": True, "ai_task": "", "times": None, "style": None}
    assert validate_config(raw)["summary"] == {"enabled": True, "style": "facts"}


def test_display_ticker_and_bing_market() -> None:
    """Laufband pro Display schaltbar; Bing-Region nur aus der Liste."""
    raw = minimal_config()
    raw["displays"][0]["ticker"] = False
    raw["photos"] = {"bing_market": "en-GB"}
    config = validate_config(raw)
    assert config["displays"][0]["ticker"] is False
    assert config["photos"]["bing_market"] == "en-GB"
    raw["photos"] = {"bing_market": "xx-XX"}
    with pytest.raises(vol.Invalid):
        validate_config(raw)


def test_sounds_reminders_and_mini_options() -> None:
    """Eigene Töne, Wiederholen, Erinnerungen und Mini-Karte sind einstellbar; Unsinn wird abgelehnt."""
    raw = minimal_config()
    raw["sounds"] = [{"id": "ton", "name": "Gong", "url": "media-source://media_source/local/gong.mp3"}, {"id": "neu", "name": "Leer"}]
    raw["events"] = [
        {"id": "fertig", "kind": "info", "entity": "sensor.waschmaschine", "to": "finished", "title": "Fertig",
         "sound": "ton", "sound_repeat": 3, "sound_interval": 1.5, "reminder": 60, "reminder_clear": False},
        {"id": "musik", "kind": "media", "entities": ["media_player.x"], "style": "mini", "mini_duration": 30, "mini_paused": 0,
         "mini_position": "top-left", "mini_size": "large", "mini_cover": False, "mini_progress": False, "mini_background": "none"},
    ]
    raw["displays"][0].update(reminders=True, reminders_stack=4)
    config = validate_config(raw)
    assert config["sounds"][1]["url"] == ""
    assert config["events"][0]["reminder"] == 60
    assert config["events"][1]["mini_position"] == "top-left"
    for bad in ({"reminder": "nie"}, {"sound_repeat": 20}, {"mini_position": "mitte"}):
        broken = copy.deepcopy(raw)
        broken["events"][0].update(bad)
        with pytest.raises(vol.Invalid):
            validate_config(broken)


def test_widget_grid_half_steps() -> None:
    """Feineres Raster: halbe Zellen erlaubt, ganze bleiben ganze Zahlen, krumme Werte nicht."""
    raw = minimal_config()
    raw["pages"][0]["widgets"][0].update(x=1.5, y=0, w=2.5, h=1)
    widget = validate_config(raw)["pages"][0]["widgets"][0]
    assert (widget["x"], widget["y"], widget["w"], widget["h"]) == (1.5, 0, 2.5, 1)
    assert isinstance(widget["y"], int)
    raw["pages"][0]["widgets"][0].update(x=1.3)
    with pytest.raises(vol.Invalid):
        validate_config(raw)
