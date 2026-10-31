"""Integration in einem echten HA-Kern: Einrichtung, Speichern, Startkonfiguration und WebSocket-Rechte."""

from __future__ import annotations

import re
from typing import Any
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.ambiframe.const import DOMAIN
from custom_components.ambiframe.validation import validate_config
from custom_components.ambiframe.websocket import _saved_templates

from .conftest import minimal_config


@pytest.fixture
async def setup_ambiframe(hass: HomeAssistant) -> MockConfigEntry:
    """Ambiframe einrichten und nach dem Test sauber entladen (keine Timer bleiben liegen)."""
    entry = MockConfigEntry(domain=DOMAIN, title="Ambiframe", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    yield entry
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_config_flow_creates_single_entry(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Ambiframe"


async def test_default_config_is_valid(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    hass.states.async_set("weather.home", "sunny", {"friendly_name": "Zuhause"})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/default"})
    msg = await client.receive_json()
    assert msg["success"], msg
    validate_config(msg["result"])


async def test_save_and_read_config(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    msg = await client.receive_json()
    assert msg["success"], msg
    await client.send_json_auto_id({"type": "ambiframe/config"})
    msg = await client.receive_json()
    assert msg["result"]["displays"][0]["id"] == "kueche"


async def test_invalid_config_is_not_saved(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    client = await hass_ws_client(hass)
    bad = minimal_config()
    bad["displays"][0]["playlist"] = [{"page": "fehlt"}]
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": bad})
    msg = await client.receive_json()
    assert not msg["success"]
    assert "fehlt" in msg["error"]["message"]


async def test_non_admin_cannot_save(
    hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, hass_read_only_access_token: str
) -> None:
    client = await hass_ws_client(hass, hass_read_only_access_token)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "unauthorized"


async def test_admin_only_commands(
    hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, hass_read_only_access_token: str
) -> None:
    """Konten ohne Admin (Tablets) dürfen nichts ändern und keine KI-Abrufe auslösen."""
    client = await hass_ws_client(hass, hass_read_only_access_token)
    for cmd in ("ambiframe/config/default", "ambiframe/config/previous", "ambiframe/summary/generate"):
        await client.send_json_auto_id({"type": cmd})
        msg = await client.receive_json()
        assert not msg["success"] and msg["error"]["code"] == "unauthorized", cmd


async def test_news_only_fetches_known_feeds(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Displays können den Server keine beliebigen Adressen abrufen lassen – nur fertige oder eingetragene Feeds."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    with patch("custom_components.ambiframe.news.NewsService.async_items", return_value=[]) as items:
        await client.send_json_auto_id({"type": "ambiframe/news", "feeds": ["http://192.0.2.1/intern", "tagesschau"]})
        assert (await client.receive_json())["success"]
    assert "http://192.0.2.1/intern" not in items.call_args.args[0]


def test_saved_templates_are_collected() -> None:
    config = minimal_config()
    config["pages"][0]["widgets"][0]["options"] = {"text": "{{ states('sensor.a') }}", "plain": "kein Jinja"}
    config["pages"][0]["show_if"] = [{"condition": "template", "value_template": "{% if true %}1{% endif %}"}]
    found = _saved_templates(config, set())
    assert found == {"{{ states('sensor.a') }}", "{% if true %}1{% endif %}"}


async def test_template_rights(
    hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, hass_read_only_access_token: str
) -> None:
    """Admins dürfen jede Vorlage auswerten, andere Benutzer nur gespeicherte."""
    hass.states.async_set("sensor.aussen", "11.4")
    saved = "{{ states('sensor.aussen') }} °C"
    config = minimal_config()
    config["pages"][0]["widgets"][0]["options"] = {"text": saved}
    admin = await hass_ws_client(hass)
    await admin.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await admin.receive_json())["success"]

    # Admin: beliebige Vorlage
    await admin.send_json_auto_id({"type": "ambiframe/template/subscribe", "template": "{{ 1 + 1 }}"})
    assert (await admin.receive_json())["success"]
    event = await admin.receive_json()
    assert event["event"] == {"result": 2}

    reader = await hass_ws_client(hass, hass_read_only_access_token)
    # Nicht gespeichert → abgelehnt
    await reader.send_json_auto_id({"type": "ambiframe/template/subscribe", "template": "{{ states.person | list }}"})
    msg = await reader.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "unauthorized"
    # Gespeichert → erlaubt und live
    await reader.send_json_auto_id({"type": "ambiframe/template/subscribe", "template": saved})
    assert (await reader.receive_json())["success"]
    event = await reader.receive_json()
    assert event["event"] == {"result": "11.4 °C"}


async def test_display_pause_from_tablet(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/display/pause", "display_id": "kueche", "paused": True})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/displays/status"})
    status = (await client.receive_json())["result"]
    assert status["kueche"]["paused"] is True
    await client.send_json_auto_id({"type": "ambiframe/display/pause", "display_id": "kueche", "paused": False})
    assert (await client.receive_json())["success"]


async def test_unknown_display_ids_are_rejected(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Erfundene Display-IDs legen weder Einträge noch Pause-Timer an (jedes Konto darf diese Befehle schicken)."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    for cmd in (
        {"type": "ambiframe/display/connect", "display_id": "erfunden", "client_id": "x"},
        {"type": "ambiframe/display/report", "display_id": "erfunden", "client_id": "x"},
        {"type": "ambiframe/display/pause", "display_id": "erfunden", "paused": True},
    ):
        await client.send_json_auto_id(cmd)
        msg = await client.receive_json()
        assert not msg["success"] and msg["error"]["code"] == "unknown_display"
    await client.send_json_auto_id({"type": "ambiframe/displays/status"})
    assert "erfunden" not in (await client.receive_json())["result"]


async def test_safe_mode_switch_and_reason(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Schalter „Notfallmodus“ erzwingt ihn; ein Gerät meldet seinen eigenen Grund im Herzschlag."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()

    # Gerät meldet sich an und bekommt „hello“ mit safe=False
    await client.send_json_auto_id({"type": "ambiframe/display/connect", "display_id": "kueche", "client_id": "tab", "name": "Tablet"})
    assert (await client.receive_json())["success"]
    hello = (await client.receive_json())["event"]
    assert hello["command"] == "hello" and hello["safe"] is False

    switch = "switch.ambiframe_kuche_safe_mode"
    assert hass.states.get(switch).state == "off"
    await hass.services.async_call("switch", "turn_on", {"entity_id": switch}, blocking=True)
    assert (await client.receive_json())["event"] == {"command": "safe", "on": True}
    assert hass.states.get(switch).state == "on"

    await client.send_json_auto_id(
        {"type": "ambiframe/display/report", "display_id": "kueche", "client_id": "tab", "page": None, "safe": "Anzeigefehler"}
    )
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert hass.states.get(switch).attributes["grund"] == "Anzeigefehler"


async def test_previous_config_is_kept(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    client = await hass_ws_client(hass)
    first = minimal_config()
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": first})
    assert (await client.receive_json())["success"]
    second = minimal_config()
    second["pages"][0]["name"] = "Geändert"
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": second})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/config/previous"})
    previous = (await client.receive_json())["result"]
    assert previous["pages"][0]["name"] == "Start"


async def test_data_from_wandbild_is_taken_over(hass: HomeAssistant, hass_storage: dict[str, Any]) -> None:
    """Früherer Name „Wandbild“: Konfiguration und Geräte werden einmalig übernommen."""
    hass_storage["wandbild"] = {"version": 1, "key": "wandbild", "data": validate_config(minimal_config())}
    hass_storage["wandbild.devices"] = {"version": 1, "key": "wandbild.devices", "data": {"kueche": {"fully": "abc"}}}
    entry = MockConfigEntry(domain=DOMAIN, title="Ambiframe", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    store = hass.data[DOMAIN]
    assert store.config["displays"][0]["id"] == "kueche"
    assert store.fully.devices["kueche"]["fully"] == "abc"
    assert hass_storage["ambiframe"]["data"]["displays"][0]["id"] == "kueche"
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_fresh_install_starts_wizard(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Frisch angelegte Konfiguration: Assistent soll starten; nach dem Speichern nicht mehr."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config"})
    config = (await client.receive_json())["result"]
    assert config["setup_complete"] is False
    assert config["displays"][0]["id"] == "display"
    config["setup_complete"] = True
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    assert hass.data[DOMAIN].config["setup_complete"] is True


async def test_offline_notification(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Meldet sich ein Display „notify“ Minuten nicht, erscheint eine Benachrichtigung – und verschwindet, wenn es zurück ist."""
    from datetime import timedelta

    from homeassistant.components.persistent_notification import _async_get_or_create_notifications

    config = minimal_config()
    config["displays"][0]["watchdog"] = {"notify": 5}
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()

    hub = setup_ambiframe.runtime_data.hub
    display = hub.display_config("kueche")
    rt = hub.runtime("kueche")
    notes = _async_get_or_create_notifications(hass)
    key = "ambiframe_offline_kueche"

    hub._check_offline(display, rt, hub.started + timedelta(minutes=4))
    assert key not in notes  # noch zu früh
    hub._check_offline(display, rt, hub.started + timedelta(minutes=6))
    assert key in notes and "Küche" in notes[key]["message"]

    # Display meldet sich wieder → Benachrichtigung weg
    await client.send_json_auto_id({"type": "ambiframe/display/connect", "display_id": "kueche", "client_id": "tab", "name": "Tablet"})
    assert (await client.receive_json())["success"]
    hub._check_offline(display, rt, hub.started + timedelta(minutes=7))
    assert key not in notes
    assert rt.offline_notified is False


async def test_offline_notification_off_or_sleeping(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    """Ohne „notify“ und bei ausgeschaltetem Bildschirm keine Benachrichtigung."""
    from datetime import timedelta

    from homeassistant.components.persistent_notification import _async_get_or_create_notifications

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    hub = setup_ambiframe.runtime_data.hub
    rt = hub.runtime("kueche")
    hub._check_offline(hub.display_config("kueche"), rt, hub.started + timedelta(hours=3))
    assert "ambiframe_offline_kueche" not in _async_get_or_create_notifications(hass)

    rt.asleep = True
    hub._check_offline({"id": "kueche", "name": "Küche", "watchdog": {"notify": 5}}, rt, hub.started + timedelta(hours=3))
    assert "ambiframe_offline_kueche" not in _async_get_or_create_notifications(hass)


async def test_google_album_only_when_configured(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, aioclient_mock: Any) -> None:
    """Sicherheitsgrenze: Displays dürfen nur eingetragene Alben abrufen lassen (kein beliebiger Abruf über HA)."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/photos/google", "url": "https://photos.app.goo.gl/Fremd"})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "unknown_album"
    aioclient_mock.get("https://photos.app.goo.gl/Mein", text='["https://lh3.googleusercontent.com/pw/AbC",400,300')
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config(photos={"google": "https://photos.app.goo.gl/Mein"})})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/photos/google", "url": "https://photos.app.goo.gl/Mein"})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"][0]["url"].endswith("=w2560-h1440")


async def test_placeholder_rejects_unknown_source(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/photos/placeholder", "source": "flickr"})
    assert not (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/photos/placeholder", "source": "samples"})
    msg = await client.receive_json()
    assert msg["success"] and len(msg["result"]) >= 6


async def test_older_config_loads_unchanged_after_update(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, example_config: dict) -> None:
    """Nach dem Update muss niemand neu anfangen: eine Konfiguration aus 0.6 lädt, Bing bleibt Bing."""
    old = {**example_config, "photos": {"folder": "media-source://media_source/local/ambiframe", "bing": True, "bing_mix": False, "credit": True}}
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": old})
    msg = await client.receive_json()
    assert msg["success"], msg
    await client.send_json_auto_id({"type": "ambiframe/config"})
    cfg = (await client.receive_json())["result"]
    assert cfg["photos"]["placeholder"] == "bing" and cfg["photos"]["placeholder_mix"] is False
    assert [p["id"] for p in cfg["pages"]] == [p["id"] for p in example_config["pages"]]
    assert [e["id"] for e in cfg["events"]] == [e["id"] for e in example_config["events"]]


async def test_route_only_for_configured_sensors(hass: HomeAssistant, setup_ambiframe: MockConfigEntry, hass_ws_client: Any, aioclient_mock: AiohttpClientMocker) -> None:
    """Sicherheit: Displays lassen den Server nur Strecken zu eingetragenen Sensoren abfragen."""
    hass.states.async_set("sensor.weg", "28", {"origin": "51.5,7.0", "destination": "51.4,7.2"})
    aioclient_mock.get(re.compile(r"https://router\.project-osrm\.org/.*"), json={"routes": [{"geometry": {"coordinates": [[7.0, 51.5], [7.2, 51.4]]}}]})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/route", "entity": "sensor.weg"})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "unknown_route"
    config = minimal_config()
    config["pages"][0]["widgets"].append({"id": "p", "type": "commute", "x": 6, "y": 0, "w": 5, "h": 3, "options": {"routes": [{"entity": "sensor.weg"}]}})
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "ambiframe/route", "entity": "sensor.weg"})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"]["end"] == [51.4, 7.2]
