"""Registriert das Frontend: Editor in der Seitenleiste und die Vollbild-Anzeige."""

from __future__ import annotations

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant, callback

from .const import (
    CARD_MODULE,
    DATA_CARD_URL,
    DATA_STATIC_REGISTERED,
    ELEMENT_DISPLAY,
    ELEMENT_EDITOR,
    FRONTEND_DIR,
    FRONTEND_MODULE,
    PANEL_DISPLAY,
    PANEL_EDITOR,
    URL_BASE,
    VERSION,
)


def _bundle_version() -> str:
    """Änderungszeit des Bundles als Cache-Schlüssel, damit Updates sofort ankommen."""
    try:
        return str(int((FRONTEND_DIR / FRONTEND_MODULE).stat().st_mtime))
    except OSError:
        return VERSION


async def async_register_panels(hass: HomeAssistant) -> None:
    if not hass.data.get(DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths([StaticPathConfig(URL_BASE, str(FRONTEND_DIR), cache_headers=False)])
        hass.data[DATA_STATIC_REGISTERED] = True

    version = await hass.async_add_executor_job(_bundle_version)
    module_url = f"{URL_BASE}/{FRONTEND_MODULE}?v={version}"
    panel_config = {"version": VERSION}
    # Dashboard-Karte „Ambiframe“ (klein; lädt das Bündel erst, wenn die Karte gezeigt wird) – gleiche Version wie oben,
    # damit Karte und Panel dasselbe Bündel nutzen
    card_url = f"{URL_BASE}/{CARD_MODULE}?v={version}"
    if hass.data.get(DATA_CARD_URL) != card_url:
        if old := hass.data.get(DATA_CARD_URL):
            frontend.remove_extra_js_url(hass, old)
        frontend.add_extra_js_url(hass, card_url)
        hass.data[DATA_CARD_URL] = card_url

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_EDITOR,
        webcomponent_name=ELEMENT_EDITOR,
        sidebar_title="Ambiframe",
        sidebar_icon="mdi:image-frame",
        module_url=module_url,
        require_admin=True,
        config=panel_config,
    )
    # Ohne Seitenleisten-Eintrag: wird direkt auf dem Tablet/TV geöffnet
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_DISPLAY,
        webcomponent_name=ELEMENT_DISPLAY,
        module_url=module_url,
        require_admin=False,
        config=panel_config,
    )


@callback
def async_unregister_panels(hass: HomeAssistant) -> None:
    for path in (PANEL_EDITOR, PANEL_DISPLAY):
        frontend.async_remove_panel(hass, path, warn_if_unknown=False)
