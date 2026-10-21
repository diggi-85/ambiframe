"""Kamera „Videostream“ pro Display – nur, wenn im Display eingeschaltet (sonst wird nichts berechnet)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.camera import Camera, CameraEntityFeature
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AmbiframeConfigEntry
from .const import SIGNAL_CONFIG_UPDATED
from .entity import display_device
from .store import AmbiframeStore
from .stream import stream_config, stream_resolutions


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    store = entry.runtime_data
    active: dict[tuple[str, str], StreamCamera] = {}

    @callback
    def sync(config: dict[str, Any]) -> None:
        """Kameras an- und abmelden, wenn der Videostream eines Displays (oder eine Auflösung) ein- oder ausgeht."""
        wanted = {(d["id"], res): d for d in config.get("displays", []) for res in stream_resolutions(d)}
        registry = er.async_get(hass)
        for key in [k for k in active if k not in wanted]:
            camera = active.pop(key)
            if camera.entity_id and registry.async_get(camera.entity_id):
                registry.async_remove(camera.entity_id)
            else:
                hass.async_create_task(camera.async_remove())
        new = [StreamCamera(store, display, res) for (display_id, res), display in wanted.items() if (display_id, res) not in active]
        for camera in new:
            active[(camera.display_id, camera.resolution)] = camera
        if new:
            async_add_entities(new)

    sync(store.config)
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, sync))


class StreamCamera(Camera):
    """Die Ambiframe-Anzeige als Kamera: Standbild auf Abruf, Video für AirPlay, Apple Home oder Dashboards."""

    _attr_has_entity_name = True
    _attr_translation_key = "stream"
    _attr_supported_features = CameraEntityFeature.STREAM

    def __init__(self, store: AmbiframeStore, display: dict[str, Any], resolution: str) -> None:
        super().__init__()
        self.store = store
        self.display_id: str = display["id"]
        self.resolution = resolution
        # 4K behält die ursprüngliche Kennung; Full HD bekommt eine eigene (beide können gleichzeitig laufen)
        suffix = "" if resolution == "4k" else "_1080p"
        self._attr_unique_id = f"{display['id']}_stream{suffix}"
        self._attr_translation_key = f"stream{suffix}"
        self._attr_device_info = display_device(display)
        self._attr_frame_interval = float(stream_config(display).get("interval", 2))

    async def async_camera_image(self, width: int | None = None, height: int | None = None) -> bytes | None:
        return await self.store.streams.source(self.display_id, self.resolution).async_frame()

    async def stream_source(self) -> str | None:
        return self.store.streams.stream_url(self.display_id, self.resolution)
