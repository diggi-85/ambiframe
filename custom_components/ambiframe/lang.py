"""Sprache auf dem Server: Startkonfiguration und KI-Zusammenfassung – Deutsch, Englisch, Niederländisch, Französisch.

„auto“ (oder leer) folgt der Sprache von Home Assistant; unbekannte Sprachen werden Englisch.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from .const import LANGUAGES

_NAMES = {
    "nl": {"Bilderrahmen": "Fotolijst", "StandBy": "StandBy", "Wetter": "Weer", "Zuhause": "Thuis", "Müll": "Afval", "Nacht": "Nacht"},
    "fr": {"Bilderrahmen": "Cadre photo", "StandBy": "StandBy", "Wetter": "Météo", "Zuhause": "Maison", "Müll": "Poubelles", "Nacht": "Nuit"},
}

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
    """Sprachkürzel – Einstellung im Design vor der Sprache von HA; unbekannte Sprachen werden „en“."""
    setting = ((config or {}).get("design") or {}).get("language")
    if setting in LANGUAGES:
        return setting
    language = (hass.config.language or "").lower().split("-")[0]
    return language if language in LANGUAGES else "en"


def tr(lang: str, text: str) -> str:
    """Deutschen Text der Startkonfiguration übersetzen (unbekannt = unverändert)."""
    if lang == "de":
        return text
    return _NAMES.get(lang, {}).get(text) or _EN.get(text, text)
