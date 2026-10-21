"""Fully Kiosk: Bedienmodus „Bildschirmschoner“ einrichten und Ambiframe bei wichtigen Ereignissen wecken.

Zwei Bedienmodi pro Display (`control.mode`):
- `embedded`: Ambiframe ist die Start-Seite von Fully, Tippen blendet das Dashboard darüber ein (wie bisher).
- `screensaver`: Fully zeigt das HA-Dashboard als Start-Seite und Ambiframe als Bildschirmschoner nach `control.idle`
  Sekunden ohne Berührung. Klingel, Kamera und Ereignis-Seiten starten den Bildschirmschoner sofort, damit sie
  auch erscheinen, während jemand das Dashboard benutzt.

Ambiframe meldet beim Verbinden die Fully-Geräte-ID und die Adresse, unter der es HA erreicht. Damit stellt die
Integration Fully über dessen Integration um (`fully_kiosk.set_config`, `load_url`) – niemand muss in die
Fully-Einstellungen.
"""

from __future__ import annotations

import logging
import time
from typing import TYPE_CHECKING, Any
from urllib.parse import urljoin

from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, HomeAssistant, State, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.storage import Store

from .const import DOMAIN

if TYPE_CHECKING:
    from .store import AmbiframeStore

_LOGGER = logging.getLogger(__name__)

FULLY = "fully_kiosk"
# Diese Ereignisse holen Ambiframe nach vorn; Hinweise und Musik warten, bis der Bildschirmschoner von selbst kommt
WAKE_KINDS = {"alarm", "live", "page"}
# So lange nach dem Wecken bekommt ein frisch gestartetes Ambiframe das auslösende Ereignis nachgereicht
PENDING_SECONDS = 90
_UNSET = {"unavailable", "unknown"}


def control_mode(display: dict[str, Any]) -> str:
    control = display.get("control") or {}
    return control.get("mode", "embedded") if control.get("enabled", True) else "embedded"


def triggered(ev: dict[str, Any], old: State | None, new: State | None) -> bool:
    """Wie `triggered()` im Frontend: passt die Änderung zum Auslöser des Ereignisses?"""
    if old is None or new is None or old.state == new.state:
        return False
    if ev.get("from") and old.state != ev["from"]:
        return False
    if ev.get("to") != "*":
        return new.state == ev.get("to")
    if new.state in _UNSET or old.state == "unavailable":
        return False
    types = ev.get("event_types")
    return not (new.entity_id.startswith("event.") and types and new.attributes.get("event_type") not in types)


def _triggers(ev: dict[str, Any]) -> list[str]:
    return list(dict.fromkeys(([ev["entity"]] if ev.get("entity") else []) + ev.get("entities", [])))


class FullyLink:
    """Verknüpft Displays mit ihrem Fully-Gerät in HA."""

    def __init__(self, hass: HomeAssistant, store: AmbiframeStore) -> None:
        self.hass = hass
        self.store = store
        self._store: Store[dict[str, Any]] = Store(hass, 1, f"{DOMAIN}.devices")
        # display_id → {"fully": Geräte-ID in Fully, "origin": Adresse von HA, "applied": zuletzt eingestellt}
        self.devices: dict[str, dict[str, Any]] = {}
        self._pending: dict[str, tuple[str, float]] = {}
        self._unsub: CALLBACK_TYPE | None = None

    async def async_load(self) -> None:
        self.devices = await self._store.async_load() or {}

    @callback
    def async_stop(self) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None

    def _save(self) -> None:
        self._store.async_delay_save(lambda: self.devices, 2)

    # ───────── Gerät finden ─────────

    @callback
    def seen(self, display_id: str, fully_id: str | None, origin: str | None) -> None:
        """Ein Display hat sich aus Fully gemeldet – Gerät merken und ggf. den Bedienmodus einstellen."""
        if not fully_id or not origin:
            return
        origin = origin.rstrip("/")
        info = self.devices.setdefault(display_id, {})
        if info.get("fully") == fully_id and info.get("origin") == origin:
            return
        info.update(fully=fully_id, origin=origin)
        self._save()
        self.hass.async_create_task(self.async_apply(display_id))

    def _device(self, display_id: str) -> dr.DeviceEntry | None:
        fully_id = (self.devices.get(display_id) or {}).get("fully")
        if not fully_id:
            return None
        # Selbst suchen statt async_get_device(identifiers=…) – das ist ab HA 2027.8 weg, der Ersatz fehlt in älteren
        return next((d for d in dr.async_get(self.hass).devices.values() if (FULLY, fully_id) in d.identifiers), None)

    def _entity(self, display_id: str, domain: str, key: str) -> str | None:
        """Entität des Fully-Geräts, z. B. switch …-screensaver (unique_id „<Geräte-ID>-<key>“)."""
        device = self._device(display_id)
        if device is None:
            return None
        return next(
            (
                e.entity_id
                for e in er.async_entries_for_device(er.async_get(self.hass), device.id)
                if e.domain == domain and e.unique_id.endswith(f"-{key}")
            ),
            None,
        )

    def screensaver_switch(self, display_id: str) -> str | None:
        return self._entity(display_id, "switch", "screensaver")

    def dashboard_in_use(self, display_id: str) -> bool:
        """Bildschirmschoner-Modus und gerade das Dashboard im Vordergrund – dann fehlt Ambiframe absichtlich."""
        if control_mode(self.store.hub.display_config(display_id)) != "screensaver":
            return False
        switch = self.screensaver_switch(display_id)
        state = self.hass.states.get(switch) if switch else None
        return state is None or state.state != "on"

    # ───────── Bedienmodus in Fully einstellen ─────────

    async def async_apply_all(self) -> None:
        for display in self.store.config.get("displays", []):
            await self.async_apply(display["id"])

    async def async_apply(self, display_id: str) -> None:
        display = self.store.hub.display_config(display_id)
        info = self.devices.get(display_id)
        if not display or not info or not info.get("origin"):
            return
        control = display.get("control") or {}
        mode = control_mode(display)
        origin = info["origin"]
        own = f"{origin}/ambiframe-display?display={display_id}"
        dashboard = urljoin(f"{origin}/", control.get("dashboard", "/lovelace/0"))
        want = {"mode": mode, "own": own, "dashboard": dashboard, "idle": control.get("idle", 60)}
        if info.get("applied") == want:
            return
        if mode == "embedded" and not info.get("applied"):
            # So ist Fully von Hand eingerichtet – nichts verstellen, nur merken
            info["applied"] = want
            self._save()
            return
        device = self._device(display_id)
        if device is None:
            return
        if mode == "screensaver":
            settings = {"startURL": dashboard, "screensaverWallpaperURL": own, "timeToScreensaverV2": str(want["idle"])}
            # Gedimmter Bildschirmschoner wäre zu dunkel für Ambiframe – Helligkeit wie im Betrieb
            bright = self._entity(display_id, "number", "screenBrightness")
            state = self.hass.states.get(bright) if bright else None
            if state is not None and state.state not in _UNSET:
                settings["screensaverBrightness"] = str(int(float(state.state)))
            load = dashboard
        else:
            settings = {"startURL": own, "timeToScreensaverV2": "0", "screensaverWallpaperURL": "fully://color#000000"}
            load = own
        try:
            for key, value in settings.items():
                await self.hass.services.async_call(
                    FULLY, "set_config", {"device_id": device.id, "key": key, "value": value}, blocking=True
                )
            await self.hass.services.async_call(FULLY, "load_url", {"device_id": device.id, "url": load}, blocking=True)
            # Ein laufender Bildschirmschoner würde Ambiframe sonst bis zur nächsten Berührung verdecken
            if mode == "embedded" and (switch := self.screensaver_switch(display_id)):
                await self.hass.services.async_call("switch", "turn_off", {"entity_id": switch}, blocking=True)
        except (HomeAssistantError, ValueError) as err:
            _LOGGER.warning("Ambiframe: Fully für „%s“ ließ sich nicht umstellen: %s", display.get("name", display_id), err)
            return
        _LOGGER.info("Ambiframe: Fully für „%s“ auf Bedienmodus „%s“ gestellt", display.get("name", display_id), mode)
        info["applied"] = want
        self._save()

    # ───────── Wecken bei Ereignissen ─────────

    def _wake_events(self) -> list[tuple[str, dict[str, Any]]]:
        """(Display, Ereignis) für alle Displays im Bildschirmschoner-Modus."""
        config = self.store.config
        out: list[tuple[str, dict[str, Any]]] = []
        for display in config.get("displays", []):
            if control_mode(display) != "screensaver":
                continue
            allowed = display.get("events", "all")
            for ev in config.get("events", []):
                if (
                    ev.get("enabled", True)
                    and ev.get("kind") in WAKE_KINDS
                    and (allowed == "all" or ev["id"] in allowed)
                    and (not ev.get("displays") or display["id"] in ev["displays"])
                ):
                    out.append((display["id"], ev))
        return out

    @callback
    def async_listen(self) -> None:
        """Auslöser neu abonnieren (beim Start und nach jedem Speichern)."""
        self.async_stop()
        entities = sorted({e for _, ev in self._wake_events() for e in _triggers(ev)})
        if entities:
            self._unsub = async_track_state_change_event(self.hass, entities, self._state_changed)

    @callback
    def _state_changed(self, event: Event[EventStateChangedData]) -> None:
        old, new = event.data["old_state"], event.data["new_state"]
        for display_id, ev in self._wake_events():
            if new is not None and new.entity_id in _triggers(ev) and triggered(ev, old, new):
                self.wake(display_id, ev["id"])

    @callback
    def wake(self, display_id: str, event_id: str) -> None:
        """Bildschirmschoner starten, falls gerade das Dashboard offen ist; das Ereignis folgt beim Verbinden."""
        if not self.dashboard_in_use(display_id) and self.store.hub.online(display_id):
            return  # Ambiframe läuft schon und reagiert selbst
        switch = self.screensaver_switch(display_id)
        if switch is None:
            return
        self._pending[display_id] = (event_id, time.monotonic())
        self.hass.async_create_task(
            self.hass.services.async_call("switch", "turn_on", {"entity_id": switch}, blocking=False)
        )

    def take_pending(self, display_id: str) -> str | None:
        """Ereignis, wegen dem dieses Display gerade geweckt wurde (einmalig)."""
        event_id, at = self._pending.pop(display_id, ("", 0.0))
        return event_id if event_id and time.monotonic() - at < PENDING_SECONDS else None
