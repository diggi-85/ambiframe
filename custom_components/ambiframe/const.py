"""Konstanten für Ambiframe."""

from __future__ import annotations

from pathlib import Path
from typing import Final

DOMAIN: Final = "ambiframe"
VERSION: Final = "0.2.0"

STORAGE_KEY: Final = DOMAIN
STORAGE_VERSION: Final = 1
CONFIG_VERSION: Final = 1

FRONTEND_DIR: Final = Path(__file__).parent / "frontend"
URL_BASE: Final = "/ambiframe_static"
FRONTEND_MODULE: Final = "ambiframe.js"
CARD_MODULE: Final = "ambiframe-card.js"

PANEL_EDITOR: Final = "ambiframe"
PANEL_DISPLAY: Final = "ambiframe-display"
ELEMENT_EDITOR: Final = "ambiframe-panel"
ELEMENT_DISPLAY: Final = "ambiframe-display-panel"

SIGNAL_CONFIG_UPDATED: Final = f"{DOMAIN}_config_updated"

DATA_STATIC_REGISTERED: Final = f"{DOMAIN}_static_registered"
DATA_WS_REGISTERED: Final = f"{DOMAIN}_ws_registered"
DATA_CARD_URL: Final = f"{DOMAIN}_card_url"
DATA_STREAM_VIEW: Final = f"{DOMAIN}_stream_view"

BING_URL: Final = "https://www.bing.com/HPImageArchive.aspx"
BING_CACHE_SECONDS: Final = 6 * 3600
PRICE_CACHE_SECONDS: Final = 15 * 60

# Raster jeder Seite: 12 Spalten × 8 Zeilen
GRID_COLUMNS: Final = 12
GRID_ROWS: Final = 8
# Hochformat: 8 Spalten × 12 Zeilen
PORTRAIT_COLUMNS: Final = 8
PORTRAIT_ROWS: Final = 12

EVENT_KINDS: Final = ("alarm", "live", "info", "page", "media")
# Diese Arten zeigen Titel/Ort und brauchen deshalb einen Titel
EVENT_KINDS_TITLED: Final = ("alarm", "live", "info")
THEMES: Final = ("ruhig", "klar", "gold", "glass", "aurora", "editorial", "minimal")
THEME_MODES: Final = ("auto", "light", "dark")
AMBIENTS: Final = ("none", "particles", "flow", "bokeh", "mist")
TRANSITIONS: Final = ("fade", "blur", "slide", "zoom")
