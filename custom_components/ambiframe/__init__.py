"""Ambiframe – ruhiges Ambient-Display für Home Assistant.

Die Integration speichert Displays, Seiten, Widgets und Ereignisse, stellt sie über
die WebSocket-API bereit und registriert zwei Panels: den Editor in der Seitenleiste
und die Vollbild-Anzeige für Tablets und TVs.
"""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv, device_registry as dr
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.start import async_at_started
from homeassistant.helpers.typing import ConfigType

from . import panel, services, websocket
from .const import DATA_STREAM_VIEW, DOMAIN, SIGNAL_CONFIG_UPDATED
from .store import AmbiframeStore
from .stream import StreamView

PLATFORMS = [Platform.BINARY_SENSOR, Platform.BUTTON, Platform.CAMERA, Platform.SELECT, Platform.SENSOR, Platform.SWITCH]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

type AmbiframeConfigEntry = ConfigEntry[AmbiframeStore]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Dienste einmalig registrieren – sie prüfen selbst, ob ein Eintrag geladen ist."""
    services.async_setup_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry) -> bool:
    """Speicher laden, WebSocket-Befehle und Panels registrieren."""
    store = AmbiframeStore(hass)
    await store.async_load()
    entry.runtime_data = store
    hass.data[DOMAIN] = store

    websocket.async_register_commands(hass)
    if not hass.data.get(DATA_STREAM_VIEW):
        hass.data[DATA_STREAM_VIEW] = True
        hass.http.register_view(StreamView(hass))
    await panel.async_register_panels(hass)

    store.hub.async_start()
    entry.async_on_unload(store.hub.async_stop)
    await store.summarizer.async_start()
    entry.async_on_unload(store.summarizer.async_stop)
    _async_sync_devices(hass, entry, store.config)
    store.fully.async_listen()
    entry.async_on_unload(store.fully.async_stop)
    # Nach dem Start: Fully nachziehen, falls sich Adresse oder Bedienmodus geändert haben (z. B. nach Umbenennung)
    async def _sync_fully(_hass: HomeAssistant) -> None:
        await store.fully.async_apply_all()

    entry.async_on_unload(async_at_started(hass, _sync_fully))

    @callback
    def _config_updated(config: dict[str, Any]) -> None:
        _async_sync_devices(hass, entry, config)
        # Bedienmodus geändert → Fully umstellen; Auslöser fürs Wecken neu abonnieren
        store.fully.async_listen()
        hass.async_create_task(store.fully.async_apply_all())

    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, _config_updated))

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


@callback
def _async_sync_devices(hass: HomeAssistant, entry: AmbiframeConfigEntry, config: dict[str, Any]) -> None:
    """Geräte gelöschter Displays entfernen, umbenannte Displays nachziehen."""
    names = {d["id"]: f"Ambiframe {d['name']}" for d in config.get("displays", [])}
    registry = dr.async_get(hass)
    for device in dr.async_entries_for_config_entry(registry, entry.entry_id):
        display_id = next((ident for domain, ident in device.identifiers if domain == DOMAIN), None)
        if display_id == "ambiframe":
            continue  # Gerät der Integration selbst (Zusammenfassung)
        if display_id not in names:
            registry.async_remove_device(device.id)
        elif device.name != names[display_id]:
            registry.async_update_device(device.id, name=names[display_id])


async def async_unload_entry(hass: HomeAssistant, entry: AmbiframeConfigEntry) -> bool:
    """Panels entfernen; statische Pfade und WebSocket-Befehle bleiben bis zum Neustart."""
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    panel.async_unregister_panels(hass)
    if store := hass.data.pop(DOMAIN, None):
        await store.airplay.async_stop_all()
    return True
