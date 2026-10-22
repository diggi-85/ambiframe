"""Integration in einem echten HA-Kern: Einrichtung, Speichern, Startkonfiguration und WebSocket-Rechte."""

from __future__ import annotations

from typing import Any

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

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
