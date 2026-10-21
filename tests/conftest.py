"""Gemeinsame Fixtures: eigene Integrationen erlauben, Beispielkonfiguration laden."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """custom_components/ambiframe für jeden Test verfügbar machen."""


@pytest.fixture
def example_config() -> dict[str, Any]:
    """Die mitgelieferte Beispielkonfiguration (examples/beispiel.yaml)."""
    return yaml.safe_load((ROOT / "examples" / "beispiel.yaml").read_text(encoding="utf-8"))


def minimal_config(**extra: Any) -> dict[str, Any]:
    """Kleinste gültige Konfiguration: eine Seite, ein Display."""
    config: dict[str, Any] = {
        "pages": [
            {
                "id": "start",
                "name": "Start",
                "duration": 30,
                "background": {"type": "none"},
                "palette": "normal",
                "widgets": [{"id": "uhr", "type": "clock", "x": 0, "y": 0, "w": 6, "h": 2}],
            }
        ],
        "displays": [{"id": "kueche", "name": "Küche", "playlist": [{"page": "start"}]}],
        "events": [],
    }
    config.update(extra)
    return config
