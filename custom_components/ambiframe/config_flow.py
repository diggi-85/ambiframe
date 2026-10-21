"""Einrichtung von Ambiframe – ein Eintrag, keine Eingaben nötig."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class AmbiframeConfigFlow(ConfigFlow, domain=DOMAIN):
    """Legt den einzigen Ambiframe-Eintrag an; alles Weitere passiert im Editor-Panel."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(title="Ambiframe", data={})
        return self.async_show_form(step_id="user")
