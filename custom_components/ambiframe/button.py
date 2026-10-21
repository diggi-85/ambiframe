"""Tasten „Nächste Seite“ und „Neu laden“ pro Display sowie „Zusammenfassung erstellen“."""

from __future__ import annotations

from homeassistant.components.button import ButtonDeviceClass, ButtonEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AmbiframeConfigEntry
from .entity import AmbiframeEntity, async_setup_display_entities, hub_device
from .summary import SummaryService


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_setup_display_entities(
        hass, entry, async_add_entities, lambda hub, display: [NextButton(hub, display, "next"), ReloadButton(hub, display, "reload")]
    )
    async_add_entities([GenerateSummaryButton(entry.runtime_data.summarizer)])


class GenerateSummaryButton(ButtonEntity):
    """KI-Zusammenfassung jetzt neu erstellen."""

    _attr_has_entity_name = True
    _attr_translation_key = "generate_summary"
    _attr_unique_id = "ambiframe_generate_summary"
    _attr_icon = "mdi:creation-outline"

    def __init__(self, summarizer: SummaryService) -> None:
        self.summarizer = summarizer
        self._attr_device_info = hub_device()

    async def async_press(self) -> None:
        if await self.summarizer.async_generate() is None:
            raise HomeAssistantError("Zusammenfassung konnte nicht erstellt werden – Details im Log")


class NextButton(AmbiframeEntity, ButtonEntity):
    _attr_icon = "mdi:skip-next-outline"

    async def async_press(self) -> None:
        self.hub.command(self.display_id, "next")


class ReloadButton(AmbiframeEntity, ButtonEntity):
    _attr_device_class = ButtonDeviceClass.RESTART
    _attr_entity_category = EntityCategory.CONFIG

    async def async_press(self) -> None:
        self.hub.command(self.display_id, "reload")
