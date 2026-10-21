"""Bedienmodus „Bildschirmschoner“: Fully umstellen und Ambiframe bei der Klingel nach vorn holen."""

from __future__ import annotations

from typing import Any

from pytest_homeassistant_custom_component.common import MockConfigEntry, async_mock_service

from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import device_registry as dr, entity_registry as er

from custom_components.ambiframe.const import DOMAIN
from custom_components.ambiframe.fully import triggered

from .conftest import minimal_config

KLINGEL = {"id": "klingel", "kind": "alarm", "entity": "binary_sensor.klingel", "to": "on", "title": "Klingel", "where": "Haustür"}


def test_triggered_matches_frontend() -> None:
    ev = {"to": "on"}
    assert triggered(ev, State("binary_sensor.a", "off"), State("binary_sensor.a", "on"))
    assert not triggered(ev, State("binary_sensor.a", "on"), State("binary_sensor.a", "on"))
    assert not triggered({"to": "on", "from": "unavailable"}, State("binary_sensor.a", "off"), State("binary_sensor.a", "on"))
    anything = {"to": "*"}
    assert triggered(anything, State("sensor.a", "1"), State("sensor.a", "2"))
    assert not triggered(anything, State("sensor.a", "unavailable"), State("sensor.a", "2"))
    assert not triggered(anything, State("sensor.a", "1"), State("sensor.a", "unknown"))


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    """Ambiframe plus ein nachgebautes Fully-Gerät mit Bildschirmschoner-Schalter."""
    fully_entry = MockConfigEntry(domain="fully_kiosk", data={})
    fully_entry.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(config_entry_id=fully_entry.entry_id, identifiers={("fully_kiosk", "abc")})
    ents = er.async_get(hass)
    ents.async_get_or_create("switch", "fully_kiosk", "abc-screensaver", device_id=device.id, suggested_object_id="tab_schoner")
    ents.async_get_or_create("number", "fully_kiosk", "abc-screenBrightness", device_id=device.id, suggested_object_id="tab_hell")
    hass.states.async_set("switch.tab_schoner", "off")
    hass.states.async_set("number.tab_hell", "150")
    hass.states.async_set("binary_sensor.klingel", "off")
    entry = MockConfigEntry(domain=DOMAIN, title="Ambiframe", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_screensaver_mode_sets_up_fully_and_wakes(hass: HomeAssistant, hass_ws_client: Any) -> None:
    set_config = async_mock_service(hass, "fully_kiosk", "set_config")
    load_url = async_mock_service(hass, "fully_kiosk", "load_url")
    entry = await _setup(hass)
    # Erst nach der Einrichtung – sonst ersetzt die echte switch-Komponente den Testdienst
    turn_on = async_mock_service(hass, "switch", "turn_on")
    turn_off = async_mock_service(hass, "switch", "turn_off")
    client = await hass_ws_client(hass)

    config = minimal_config(events=[KLINGEL])
    config["displays"][0]["control"] = {"mode": "screensaver", "dashboard": "/lovelace/0", "idle": 90}
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]

    # Ambiframe meldet sich aus Fully → Fully wird auf Dashboard + Bildschirmschoner gestellt
    await client.send_json_auto_id(
        {"type": "ambiframe/display/connect", "display_id": "kueche", "client_id": "t1", "fully": "abc", "origin": "http://ha:8123/"}
    )
    assert (await client.receive_json())["success"]
    await client.receive_json()  # hello
    await hass.async_block_till_done()
    settings = {c.data["key"]: c.data["value"] for c in set_config}
    assert settings == {
        "startURL": "http://ha:8123/lovelace/0",
        "screensaverWallpaperURL": "http://ha:8123/ambiframe-display?display=kueche",
        "timeToScreensaverV2": "90",
        "screensaverBrightness": "150",
    }
    assert load_url[-1].data["url"] == "http://ha:8123/lovelace/0"

    # Dashboard offen (Bildschirmschoner aus) → Klingel startet den Bildschirmschoner …
    hass.states.async_set("binary_sensor.klingel", "on")
    await hass.async_block_till_done()
    assert turn_on and turn_on[-1].data["entity_id"] == "switch.tab_schoner"

    # … und das frisch verbundene Ambiframe bekommt das Ereignis nachgereicht
    await client.send_json_auto_id({"type": "ambiframe/display/connect", "display_id": "kueche", "client_id": "t2"})
    assert (await client.receive_json())["success"]
    await client.receive_json()  # hello
    msg = await client.receive_json()
    assert msg["event"] == {"command": "event", "id": "klingel"}

    # Zurück zu „Dashboard über Ambiframe“ → Fully startet wieder mit Ambiframe
    config["displays"][0]["control"] = {"mode": "embedded"}
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    keys = {c.data["key"]: c.data["value"] for c in set_config[4:]}
    assert keys["startURL"] == "http://ha:8123/ambiframe-display?display=kueche"
    assert keys["timeToScreensaverV2"] == "0"
    assert load_url[-1].data["url"] == "http://ha:8123/ambiframe-display?display=kueche"
    assert turn_off and turn_off[-1].data["entity_id"] == "switch.tab_schoner"

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_embedded_mode_leaves_fully_alone(hass: HomeAssistant, hass_ws_client: Any) -> None:
    set_config = async_mock_service(hass, "fully_kiosk", "set_config")
    entry = await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id(
        {"type": "ambiframe/display/connect", "display_id": "kueche", "client_id": "t1", "fully": "abc", "origin": "http://ha:8123"}
    )
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert not set_config
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_show_on_tv_opens_lg_browser(hass: HomeAssistant, hass_ws_client: Any) -> None:
    entry = await _setup(hass)
    er.async_get(hass).async_get_or_create("media_player", "webostv", "lg1", suggested_object_id="lg")
    command = async_mock_service(hass, "webostv", "command")
    await hass.config.async_update(internal_url="http://ha.local:8123")
    display = hass.data[DOMAIN].config["displays"][0]["id"]
    await hass.services.async_call(DOMAIN, "show_on_tv", {"entity_id": "media_player.lg", "display": display}, blocking=True)
    assert command[-1].data["command"] == "system.launcher/open"
    assert command[-1].data["payload"] == {"target": f"http://ha.local:8123/ambiframe-display?display={display}"}
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
