"""Videostream: Kamera nur, wenn eingeschaltet; Bilder vom Puppet-Add-on; Zugang nur mit Schlüssel."""

from __future__ import annotations

from typing import Any

from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from homeassistant.components.camera import async_get_image
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from custom_components.ambiframe.const import DOMAIN

from .conftest import minimal_config

JPEG = b"\xff\xd8\xff\xe0fake-jpeg"


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="Ambiframe", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def _cameras(hass: HomeAssistant) -> list[str]:
    return [e.entity_id for e in er.async_entries_for_config_entry(er.async_get(hass), next(iter(hass.config_entries.async_entries(DOMAIN))).entry_id) if e.domain == "camera"]


async def test_camera_only_when_enabled(hass: HomeAssistant, hass_ws_client: Any, aioclient_mock: AiohttpClientMocker) -> None:
    entry = await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": minimal_config()})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert _cameras(hass) == []  # aus = keine Kamera, nichts wird berechnet

    config = minimal_config()
    config["displays"][0]["stream"] = {"enabled": True, "resolution": "1080p", "renderer": "http://puppet.test:10000"}
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    cameras = _cameras(hass)
    assert len(cameras) == 1

    aioclient_mock.get(
        "http://puppet.test:10000/ambiframe-display/kueche/stream?viewport=1920x1080&format=jpeg&wait=6000",
        content=JPEG,
        headers={"Content-Type": "image/jpeg"},
    )
    image = await async_get_image(hass, cameras[0])
    assert image.content == JPEG
    # Innerhalb des Intervalls kein zweites Rendern
    await async_get_image(hass, cameras[0])
    assert aioclient_mock.call_count == 1

    config["displays"][0]["stream"]["enabled"] = False
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert _cameras(hass) == []

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_stream_needs_token(hass: HomeAssistant, hass_ws_client: Any, hass_client_no_auth: Any) -> None:
    entry = await _setup(hass)
    ws = await hass_ws_client(hass)
    config = minimal_config()
    config["displays"][0]["stream"] = {"enabled": True}
    await ws.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await ws.receive_json())["success"]
    await hass.async_block_till_done()
    http = await hass_client_no_auth()
    assert (await http.get("/api/ambiframe/stream/kueche?token=falsch")).status == 401
    assert (await http.get("/api/ambiframe/stream/gibtsnicht?token=x")).status == 404
    url = hass.data[DOMAIN].streams.stream_url("kueche", "4k")
    assert "res=4k" in url and "token=" in url
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_both_resolutions_give_two_cameras(hass: HomeAssistant, hass_ws_client: Any) -> None:
    entry = await _setup(hass)
    ws = await hass_ws_client(hass)
    config = minimal_config()
    config["displays"][0]["stream"] = {"enabled": True, "resolution": "both"}
    await ws.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await ws.receive_json())["success"]
    await hass.async_block_till_done()
    registry = er.async_get(hass)
    uniques = sorted(e.unique_id for e in er.async_entries_for_config_entry(registry, entry.entry_id) if e.domain == "camera")
    assert uniques == ["kueche_stream", "kueche_stream_1080p"]
    # Nur noch Full HD: die 4K-Kamera verschwindet
    config["displays"][0]["stream"]["resolution"] = "1080p"
    await ws.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await ws.receive_json())["success"]
    await hass.async_block_till_done()
    uniques = sorted(e.unique_id for e in er.async_entries_for_config_entry(registry, entry.entry_id) if e.domain == "camera")
    assert uniques == ["kueche_stream_1080p"]
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


def test_downscale_keeps_jpeg() -> None:
    from io import BytesIO

    from PIL import Image

    from custom_components.ambiframe.stream import _downscale

    buf = BytesIO()
    Image.new("RGB", (3840, 2160), (20, 40, 60)).save(buf, "JPEG")
    small = _downscale(buf.getvalue(), (1920, 1080))
    with Image.open(BytesIO(small)) as img:
        assert img.size == (1920, 1080) and img.format == "JPEG"


def test_airplay_playback_state_from_events() -> None:
    """Der Ereigniskanal meldet den Zustand verschachtelt (params.data als plist) oder direkt."""
    import plistlib

    from custom_components.ambiframe.airplay import playback_state

    inner = plistlib.dumps({"type": "playbackState", "params": {"playbackState": "Playing"}}, fmt=plistlib.FMT_BINARY)
    nested = plistlib.dumps({"params": {"data": inner}}, fmt=plistlib.FMT_BINARY)
    assert playback_state(nested) == "playing"
    assert playback_state(plistlib.dumps({"type": "playbackState", "name": "Paused"}, fmt=plistlib.FMT_BINARY)) == "paused"
    assert playback_state(plistlib.dumps({"type": "other"}, fmt=plistlib.FMT_BINARY)) is None


async def test_tv_switch_only_with_stream_and_apple_tv(hass: HomeAssistant, hass_ws_client: Any) -> None:
    """Schalter „Auf dem Fernseher“ nur bei eingeschaltetem Videostream mit eingetragenem Apple TV."""
    entry = await _setup(hass)
    client = await hass_ws_client(hass)

    def switches() -> list[str]:
        return [e.unique_id for e in er.async_entries_for_config_entry(er.async_get(hass), entry.entry_id) if e.domain == "switch"]

    config = minimal_config()
    config["displays"][0]["stream"] = {"enabled": True, "resolution": "1080p", "renderer": "http://puppet.test:10000"}
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    display_id = config["displays"][0]["id"]
    assert f"{display_id}_tv" not in switches()

    config["displays"][0]["stream"]["tv"] = "media_player.apple_tv"
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert f"{display_id}_tv" in switches()
    state = hass.states.get(er.async_get(hass).async_get_entity_id("switch", DOMAIN, f"{display_id}_tv"))
    assert state is not None and state.state == "off"

    config["displays"][0]["stream"]["enabled"] = False
    await client.send_json_auto_id({"type": "ambiframe/config/save", "config": config})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert f"{display_id}_tv" not in switches()
