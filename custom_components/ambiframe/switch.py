"""Schalter „Pause“ (die Wiedergabeliste bleibt stehen), „Notfallmodus“ (nur Uhr, Datum, Wetter) und
„Auf dem Fernseher“ (Display per AirPlay aufs Apple TV – nur bei Displays mit Videostream und eingetragenem Apple TV)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AmbiframeConfigEntry
from .airplay import SIGNAL_AIRPLAY, async_cast_display
from .const import SIGNAL_CONFIG_UPDATED
from .entity import AmbiframeEntity, async_setup_display_entities, display_device
from .store import AmbiframeStore
from .stream import stream_resolutions


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_setup_display_entities(
        hass,
        entry,
        async_add_entities,
        lambda hub, display: [PauseSwitch(hub, display, "pause"), SafeModeSwitch(hub, display, "safe_mode")],
    )

    store = entry.runtime_data
    tv_switches: dict[str, TvSwitch] = {}

    @callback
    def sync(config: dict[str, Any]) -> None:
        """Schalter „Auf dem Fernseher“ an- und abmelden, wenn Videostream oder Apple TV im Display wechseln."""
        wanted = {d["id"]: d for d in config.get("displays", []) if stream_resolutions(d) and (d.get("stream") or {}).get("tv")}
        registry = er.async_get(hass)
        for display_id in [k for k in tv_switches if k not in wanted]:
            switch = tv_switches.pop(display_id)
            if switch.entity_id and registry.async_get(switch.entity_id):
                registry.async_remove(switch.entity_id)
        new = [TvSwitch(store, d) for display_id, d in wanted.items() if display_id not in tv_switches]
        tv_switches.update({sw.display_id: sw for sw in new})
        if new:
            async_add_entities(new)

    sync(store.config)
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, sync))


class PauseSwitch(AmbiframeEntity, SwitchEntity):
    _attr_icon = "mdi:pause-circle-outline"

    @property
    def is_on(self) -> bool:
        return self.hub.runtime(self.display_id).paused

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        until = self.hub.runtime(self.display_id).paused_until
        return {"bis": until.isoformat() if until else None}

    async def async_turn_on(self, **kwargs: Any) -> None:
        self.hub.pause(self.display_id)

    async def async_turn_off(self, **kwargs: Any) -> None:
        self.hub.resume(self.display_id)


class SafeModeSwitch(AmbiframeEntity, SwitchEntity):
    """An = Notfallmodus erzwingen. Schaltet ein Gerät selbst in den Notfallmodus (Fehler), steht der Grund im Attribut."""

    _attr_icon = "mdi:lifebuoy"

    @property
    def is_on(self) -> bool:
        return self.hub.runtime(self.display_id).safe

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"grund": self.hub.safe_reason(self.display_id)}

    async def async_turn_on(self, **kwargs: Any) -> None:
        self.hub.set_safe(self.display_id, True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        self.hub.set_safe(self.display_id, False)


class TvSwitch(SwitchEntity):
    """An = das Display läuft per AirPlay auf dem eingetragenen Apple TV. Zeigt auch, wenn am Apple TV beendet wurde."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_translation_key = "tv"
    _attr_icon = "mdi:television-play"

    def __init__(self, store: AmbiframeStore, display: dict[str, Any]) -> None:
        self.store = store
        self.display_id: str = display["id"]
        self._attr_unique_id = f"{display['id']}_tv"
        self._attr_device_info = display_device(display)

    @property
    def _display(self) -> dict[str, Any]:
        return next((d for d in self.store.config.get("displays", []) if d["id"] == self.display_id), {})

    @property
    def _tv(self) -> str | None:
        return (self._display.get("stream") or {}).get("tv")

    @property
    def is_on(self) -> bool:
        return bool(self._tv) and self.store.airplay.playing(self._tv)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"apple_tv": self._tv}

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_dispatcher_connect(self.hass, SIGNAL_AIRPLAY, self._changed))

    @callback
    def _changed(self, entity_id: str) -> None:
        if entity_id == self._tv:
            self.async_write_ha_state()

    async def async_turn_on(self, **kwargs: Any) -> None:
        if self._tv:
            await async_cast_display(self.hass, self.store.airplay, self._display, self._tv)

    async def async_turn_off(self, **kwargs: Any) -> None:
        if self._tv:
            await self.store.airplay.async_stop(self._tv)
