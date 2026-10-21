"""Auswahl „Seite“: zeigt die aktuelle Seite eines Displays und springt auf Wunsch zu einer anderen."""

from __future__ import annotations

from typing import Any

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AmbiframeConfigEntry
from .const import SIGNAL_CONFIG_UPDATED
from .entity import AmbiframeEntity, async_setup_display_entities


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_setup_display_entities(hass, entry, async_add_entities, lambda hub, display: [PageSelect(hub, display, "page")])


class PageSelect(AmbiframeEntity, SelectEntity):
    _attr_icon = "mdi:page-layout-body"

    def _labels(self) -> dict[str, str]:
        """Seiten-ID → Anzeigename; doppelte Namen bekommen die ID dazu."""
        pages = self.hub.store.config.get("pages", [])
        names = [p["name"] for p in pages]
        return {p["id"]: p["name"] if names.count(p["name"]) == 1 else f"{p['name']} ({p['id']})" for p in pages}

    @property
    def options(self) -> list[str]:
        return list(self._labels().values())

    @property
    def current_option(self) -> str | None:
        page = self.hub.runtime(self.display_id).page
        return self._labels().get(page) if page else None

    async def async_select_option(self, option: str) -> None:
        page_id = next((pid for pid, label in self._labels().items() if label == option), None)
        if page_id:
            self.hub.show_page(self.display_id, page_id)

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()

        @callback
        def _config_changed(_config: dict[str, Any]) -> None:
            self.async_write_ha_state()  # Seitenliste geändert

        self.async_on_remove(async_dispatcher_connect(self.hass, SIGNAL_CONFIG_UPDATED, _config_changed))
