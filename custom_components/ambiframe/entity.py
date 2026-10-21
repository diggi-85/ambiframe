"""Gemeinsame Basis der Ambiframe-Entitäten: ein Gerät pro Display."""

from __future__ import annotations

from collections.abc import Callable
from typing import TYPE_CHECKING, Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_CONFIG_UPDATED
from .hub import DisplayHub, signal_display

if TYPE_CHECKING:
    from . import AmbiframeConfigEntry


def display_device(display: dict[str, Any]) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, display["id"])},
        name=f"Ambiframe {display['name']}",
        manufacturer="Ambiframe",
        model="Display",
    )


def hub_device() -> DeviceInfo:
    """Gerät für alles, was nicht zu einem einzelnen Display gehört (z. B. die KI-Zusammenfassung)."""
    return DeviceInfo(identifiers={(DOMAIN, "ambiframe")}, name="Ambiframe", manufacturer="Ambiframe", model="Ambient-Display")


class AmbiframeEntity(Entity):
    """Entität eines Displays; aktualisiert sich, wenn das Display etwas meldet."""

    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, hub: DisplayHub, display: dict[str, Any], key: str) -> None:
        self.hub = hub
        self.display_id: str = display["id"]
        self._attr_unique_id = f"{display['id']}_{key}"
        self._attr_translation_key = key
        self._attr_device_info = display_device(display)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_dispatcher_connect(self.hass, signal_display(self.display_id), self.async_write_ha_state))


@callback
def async_setup_display_entities(
    hass: HomeAssistant,
    entry: AmbiframeConfigEntry,
    async_add_entities: AddEntitiesCallback,
    factory: Callable[[DisplayHub, dict[str, Any]], list[Entity]],
) -> None:
    """Entitäten für jedes Display anlegen – auch für Displays, die später im Editor dazukommen."""
    store = entry.runtime_data
    known: set[str] = set()

    @callback
    def add(config: dict[str, Any]) -> None:
        ids = {d["id"] for d in config.get("displays", [])}
        known.intersection_update(ids)  # entfernte Displays dürfen später neu angelegt werden
        new = [d for d in config.get("displays", []) if d["id"] not in known]
        known.update(d["id"] for d in new)
        if new:
            async_add_entities([entity for display in new for entity in factory(store.hub, display)])

    add(store.config)
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, add))
