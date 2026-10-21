"""Dienste: Konfiguration importieren und auslesen (für Automationen, Skripte und Backups)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse, callback
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError, Unauthorized
from homeassistant.helpers import config_validation as cv, entity_registry as er
from homeassistant.helpers.network import NoURLAvailableError, get_url
from homeassistant.util.yaml import parse_yaml

from .const import DOMAIN
from .airplay import async_cast_display
from .store import AmbiframeStore

SERVICE_IMPORT_CONFIG = "import_config"
SERVICE_GET_CONFIG = "get_config"
SERVICE_GENERATE_SUMMARY = "generate_summary"
SERVICE_SHOW_ON_TV = "show_on_tv"
SERVICE_STOP_ON_TV = "stop_on_tv"

SHOW_ON_TV_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Required("display"): cv.string,
        vol.Optional("resolution"): vol.In(["1080p", "4k"]),
    }
)
STOP_ON_TV_SCHEMA = vol.Schema({vol.Required("entity_id"): cv.entity_id})

IMPORT_SCHEMA = vol.Schema(
    {
        vol.Exclusive("config", "source"): dict,
        vol.Exclusive("yaml", "source"): cv.string,
        vol.Exclusive("file", "source"): cv.string,
    }
)


@callback
def async_setup_services(hass: HomeAssistant) -> None:
    async def _require_admin(call: ServiceCall) -> None:
        # Aufrufe aus Automationen haben keinen Benutzer und sind erlaubt
        if call.context.user_id is None:
            return
        user = await hass.auth.async_get_user(call.context.user_id)
        if user is None or not user.is_admin:
            raise Unauthorized(context=call.context)

    def _store() -> AmbiframeStore:
        store: AmbiframeStore | None = hass.data.get(DOMAIN)
        if store is None:
            raise ServiceValidationError("Ambiframe ist nicht eingerichtet")
        return store

    async def import_config(call: ServiceCall) -> None:
        await _require_admin(call)
        store = _store()
        raw: Any
        if "yaml" in call.data:
            try:
                raw = parse_yaml(call.data["yaml"])
            except HomeAssistantError as err:
                raise ServiceValidationError(f"YAML ist nicht lesbar: {err}") from err
        elif "config" in call.data:
            raw = call.data["config"]
        elif "file" in call.data:
            # nur Dateien innerhalb des Konfigurationsordners
            base = Path(hass.config.config_dir).resolve()
            path = Path(hass.config.path(call.data["file"])).resolve()
            if base not in path.parents:
                raise ServiceValidationError("Die Datei muss im Konfigurationsordner liegen")
            try:
                text = await hass.async_add_executor_job(path.read_text, "utf-8")
                raw = parse_yaml(text)
            except (OSError, HomeAssistantError) as err:
                raise ServiceValidationError(f"Datei nicht lesbar: {err}") from err
        else:
            raise ServiceValidationError("Bitte „config“, „yaml“ oder „file“ angeben")
        try:
            await store.async_save(raw)
        except vol.Invalid as err:
            raise ServiceValidationError(f"Konfiguration ungültig: {err}") from err

    async def get_config(call: ServiceCall) -> ServiceResponse:
        await _require_admin(call)
        return _store().config

    async def generate_summary(call: ServiceCall) -> ServiceResponse:
        await _require_admin(call)
        result = await _store().summarizer.async_generate()
        if result is None:
            raise HomeAssistantError("Zusammenfassung konnte nicht erstellt werden – Details im Log")
        return result if call.return_response else None

    async def show_on_tv(call: ServiceCall) -> None:
        """Ein Display auf den Fernseher holen: Apple TV per AirPlay (Videostream), LG (webOS) im Browser."""
        store = _store()
        display_id = call.data["display"]
        display = next((d for d in store.config.get("displays", []) if d["id"] == display_id), None)
        if display is None:
            raise ServiceValidationError(f"Display „{display_id}“ gibt es nicht")
        entry = er.async_get(hass).async_get(call.data["entity_id"])
        if entry is None or entry.platform not in ("webostv", "apple_tv"):
            raise ServiceValidationError("Ambiframe kann Apple TV (AirPlay) und LG-Fernseher (webOS) direkt bedienen")
        try:
            base = get_url(hass, allow_external=False, allow_ip=True)
        except NoURLAvailableError as err:
            raise ServiceValidationError("Interne Adresse von HA unbekannt (Einstellungen → Netzwerk)") from err
        if entry.platform == "apple_tv":
            await async_cast_display(hass, store.airplay, display, entry.entity_id, call.data.get("resolution"))
            return
        await hass.services.async_call(
            "webostv",
            "command",
            {
                "entity_id": entry.entity_id,
                "command": "system.launcher/open",
                "payload": {"target": f"{base}/ambiframe-display?display={display_id}"},
            },
            blocking=True,
        )

    async def stop_on_tv(call: ServiceCall) -> None:
        """AirPlay-Wiedergabe von Ambiframe auf dem Apple TV beenden."""
        await _store().airplay.async_stop(call.data["entity_id"])

    hass.services.async_register(DOMAIN, SERVICE_IMPORT_CONFIG, import_config, schema=IMPORT_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_STOP_ON_TV, stop_on_tv, schema=STOP_ON_TV_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_SHOW_ON_TV, show_on_tv, schema=SHOW_ON_TV_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_GENERATE_SUMMARY, generate_summary, supports_response=SupportsResponse.OPTIONAL)
    hass.services.async_register(
        DOMAIN, SERVICE_GET_CONFIG, get_config, supports_response=SupportsResponse.ONLY
    )
