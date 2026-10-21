"""Sensoren: „Zuletzt aktiv“ pro Display und die KI-Zusammenfassung."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import AmbiframeConfigEntry
from .entity import AmbiframeEntity, async_setup_display_entities, hub_device
from .summary import SIGNAL_SUMMARY_UPDATED, SummaryService


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_setup_display_entities(hass, entry, async_add_entities, lambda hub, display: [LastSeenSensor(hub, display, "last_seen")])
    async_add_entities([SummarySensor(entry.runtime_data.summarizer)])


class SummarySensor(SensorEntity):
    """Überschrift der letzten KI-Zusammenfassung; die Punkte stehen in den Attributen (z. B. für Ansagen)."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_translation_key = "summary"
    _attr_unique_id = "ambiframe_summary"
    _attr_icon = "mdi:text-box-outline"

    def __init__(self, summarizer: SummaryService) -> None:
        self.summarizer = summarizer
        self._attr_device_info = hub_device()

    @property
    def native_value(self) -> str | None:
        summary = self.summarizer.summary
        return (summary.get("headline") or "")[:255] if summary else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        summary = self.summarizer.summary or {}
        generated = dt_util.parse_datetime(summary.get("generated_at", "")) if summary else None
        return {
            "punkte": summary.get("points", []),
            "text": summary.get("text"),
            "tageszeit": summary.get("period"),
            "erstellt": generated.isoformat() if generated else None,
            "ki": summary.get("model"),
        }

    async def async_added_to_hass(self) -> None:
        @callback
        def _updated(_summary: dict[str, Any]) -> None:
            self.async_write_ha_state()

        self.async_on_remove(async_dispatcher_connect(self.hass, SIGNAL_SUMMARY_UPDATED, _updated))


class LastSeenSensor(AmbiframeEntity, SensorEntity):
    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    @property
    def native_value(self) -> datetime | None:
        return self.hub.runtime(self.display_id).last_seen
