"""Sensor „Verbunden“: ist das Display offen und meldet sich regelmäßig?"""

from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AmbiframeConfigEntry
from .entity import AmbiframeEntity, async_setup_display_entities


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_setup_display_entities(hass, entry, async_add_entities, lambda hub, display: [ConnectedSensor(hub, display, "connected")])


class ConnectedSensor(AmbiframeEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.CONNECTIVITY
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    @property
    def is_on(self) -> bool:
        return self.hub.online(self.display_id)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        clients = self.hub.runtime(self.display_id).clients.values()
        return {
            "geraete": [c.name for c in clients],
            "bildschirm_aus": any(c.hidden for c in clients),
            "version": next((c.version for c in clients if c.version), None),
        }
