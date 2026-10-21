"""Sprache auf dem Server: Startkonfiguration und KI-Zusammenfassung – Deutsch oder Englisch.

„auto“ (oder leer) folgt der Sprache von Home Assistant; alles außer Deutsch wird Englisch.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

_EN = {
    "Bilderrahmen": "Photo frame",
    "StandBy": "StandBy",
    "Wetter": "Weather",
    "Zuhause": "Home",
    "Müll": "Bins",
    "Nacht": "Night",
    "Ambiframe": "Ambiframe",
}


def resolve_lang(hass: HomeAssistant, config: dict[str, Any] | None = None) -> str:
    """„de“ oder „en“ – Einstellung im Design vor der Sprache von HA."""
    setting = ((config or {}).get("design") or {}).get("language")
    if setting in ("de", "en"):
        return setting
    return "de" if (hass.config.language or "").lower().startswith("de") else "en"


def tr(lang: str, text: str) -> str:
    """Deutschen Text der Startkonfiguration übersetzen (unbekannt = unverändert)."""
    return _EN.get(text, text) if lang == "en" else text
