"""Laufzeitzustand der Displays: verbundene Geräte, Herzschlag, Pause, Befehle und Watchdog."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from datetime import datetime, timedelta
import json
import logging
import time
from typing import TYPE_CHECKING, Any

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import DOMAIN, FRONTEND_DIR

if TYPE_CHECKING:
    from .store import AmbiframeStore

_LOGGER = logging.getLogger(__name__)

# Ohne Meldung so lange gilt ein Display noch als verbunden (Herzschlag alle 30 s)
HEARTBEAT_TIMEOUT = 90
WATCHDOG_INTERVAL = timedelta(seconds=30)
# Nach einem Neustart-Versuch warten; jeder weitere erfolglose Versuch verdoppelt die Pause
KICK_PAUSE_MIN = 600
KICK_PAUSE_MAX = 7200
DEFAULT_PAUSE_MINUTES = 60
DEFAULT_WATCHDOG_AFTER = 120


def signal_display(display_id: str) -> str:
    """Dispatcher-Signal, wenn sich der Zustand eines Displays ändert."""
    return f"{DOMAIN}_display_{display_id}"


@dataclass
class Client:
    """Ein geöffnetes Gerät (Browser-Tab) eines Displays."""

    client_id: str
    name: str
    send: Callable[[dict[str, Any]], None]
    connected: datetime
    last_seen: datetime
    page: str | None = None
    version: str | None = None
    hidden: bool = False
    # Warum das Gerät gerade im Notfallmodus ist (None = normal)
    safe: str | None = None


@dataclass
class DisplayRuntime:
    clients: dict[str, Client] = field(default_factory=dict)
    last_seen: datetime | None = None
    page: str | None = None
    paused: bool = False
    paused_until: datetime | None = None
    pause_timer: CALLBACK_TYPE | None = None
    kicked_at: float = 0.0
    kick_pause: float = KICK_PAUSE_MIN
    # Zuletzt mit ausgeschaltetem Bildschirm getrennt → schläft, kein Neustart-Versuch bis zur nächsten Meldung
    asleep: bool = False
    # Notfallmodus aus HA erzwungen (Schalter)
    safe: bool = False


class DisplayHub:
    """Vermittelt zwischen den Displays (WebSocket) und den Entitäten in HA."""

    def __init__(self, hass: HomeAssistant, store: AmbiframeStore) -> None:
        self.hass = hass
        self.store = store
        self.started = dt_util.utcnow()
        self.displays: dict[str, DisplayRuntime] = {}
        self._unsub_watchdog: CALLBACK_TYPE | None = None
        self._version: tuple[float, str] = (0.0, "")

    def runtime(self, display_id: str) -> DisplayRuntime:
        return self.displays.setdefault(display_id, DisplayRuntime())

    def display_config(self, display_id: str) -> dict[str, Any]:
        return next((d for d in self.store.config.get("displays", []) if d["id"] == display_id), {})

    @callback
    def async_start(self) -> None:
        self._unsub_watchdog = async_track_time_interval(self.hass, self._async_watchdog, WATCHDOG_INTERVAL)

    @callback
    def async_stop(self) -> None:
        if self._unsub_watchdog:
            self._unsub_watchdog()
            self._unsub_watchdog = None
        for rt in self.displays.values():
            if rt.pause_timer:
                rt.pause_timer()
                rt.pause_timer = None

    @callback
    def _notify(self, display_id: str) -> None:
        async_dispatcher_send(self.hass, signal_display(display_id))

    # ───────── Version des Frontends (für automatisches Neuladen) ─────────

    def _read_version(self) -> tuple[float, str]:
        path = FRONTEND_DIR / "version.json"
        try:
            mtime = path.stat().st_mtime
            if mtime == self._version[0]:
                return self._version
            return (mtime, str(json.loads(path.read_text("utf-8")).get("version", "")))
        except (OSError, ValueError):
            return self._version

    async def async_frontend_version(self) -> str:
        self._version = await self.hass.async_add_executor_job(self._read_version)
        return self._version[1]

    # ───────── Geräte ─────────

    @callback
    def connect(
        self, display_id: str, client_id: str, name: str, version: str | None, send: Callable[[dict[str, Any]], None]
    ) -> CALLBACK_TYPE:
        rt = self.runtime(display_id)
        now = dt_util.utcnow()
        client = Client(client_id, name or "Gerät", send, now, now, version=version)
        rt.clients[client_id] = client
        rt.last_seen = now
        rt.kick_pause = KICK_PAUSE_MIN
        rt.asleep = False
        self._notify(display_id)

        @callback
        def disconnect() -> None:
            # Nur entfernen, wenn nicht schon eine neuere Verbindung desselben Geräts besteht
            if rt.clients.get(client_id) is client:
                del rt.clients[client_id]
                if client.hidden and not rt.clients:
                    rt.asleep = True
                self._notify(display_id)

        return disconnect

    @callback
    def report(
        self, display_id: str, client_id: str, page: str | None, hidden: bool, version: str | None, safe: str | None = None
    ) -> None:
        rt = self.runtime(display_id)
        now = dt_util.utcnow()
        if (client := rt.clients.get(client_id)) is not None:
            client.last_seen = now
            client.page = page
            client.hidden = hidden
            client.version = version
            client.safe = safe
        rt.last_seen = now
        if page:
            rt.page = page
        self._notify(display_id)

    def online(self, display_id: str) -> bool:
        """Verbunden und meldet sich – oder schläft gerade (Bildschirm aus)."""
        rt = self.displays.get(display_id)
        if not rt or not rt.clients:
            return False
        now = dt_util.utcnow()
        return any(c.hidden or (now - c.last_seen).total_seconds() < HEARTBEAT_TIMEOUT for c in rt.clients.values())

    def hello(self, display_id: str) -> dict[str, Any]:
        """Was ein Gerät beim Verbinden wissen muss."""
        rt = self.runtime(display_id)
        return {
            "command": "hello",
            "paused": rt.paused,
            "until": rt.paused_until.isoformat() if rt.paused_until else None,
            "safe": rt.safe,
        }

    def safe_reason(self, display_id: str) -> str | None:
        """Grund, falls ein Gerät dieses Displays gerade im Notfallmodus ist."""
        rt = self.displays.get(display_id)
        return next((c.safe for c in rt.clients.values() if c.safe), None) if rt else None

    def status(self) -> dict[str, Any]:
        """Übersicht für den Editor."""
        return {
            display_id: {
                "online": self.online(display_id),
                "last_seen": rt.last_seen.isoformat() if rt.last_seen else None,
                "page": rt.page,
                "paused": rt.paused,
                "until": rt.paused_until.isoformat() if rt.paused_until else None,
                "safe": rt.safe,
                "clients": [
                    {
                        "name": c.name,
                        "page": c.page,
                        "version": c.version,
                        "hidden": c.hidden,
                        "safe": c.safe,
                        "last_seen": c.last_seen.isoformat(),
                    }
                    for c in rt.clients.values()
                ],
            }
            for display_id, rt in self.displays.items()
        }

    # ───────── Befehle ─────────

    @callback
    def command(self, display_id: str, command: str, **data: Any) -> None:
        for client in list(self.runtime(display_id).clients.values()):
            client.send({"command": command, **data})

    @callback
    def show_page(self, display_id: str, page_id: str) -> None:
        self.command(display_id, "show_page", page=page_id)
        self.runtime(display_id).page = page_id
        self._notify(display_id)

    @callback
    def pause(self, display_id: str, minutes: int | None = None) -> None:
        rt = self.runtime(display_id)
        if minutes is None:
            minutes = int(self.display_config(display_id).get("pause_minutes", DEFAULT_PAUSE_MINUTES))
        if rt.pause_timer:
            rt.pause_timer()
            rt.pause_timer = None
        rt.paused = True
        rt.paused_until = dt_util.utcnow() + timedelta(minutes=minutes) if minutes > 0 else None
        if minutes > 0:

            @callback
            def _end(_now: datetime) -> None:
                rt.pause_timer = None
                self.resume(display_id)

            rt.pause_timer = async_call_later(self.hass, minutes * 60, _end)
        self.command(display_id, "pause", until=rt.paused_until.isoformat() if rt.paused_until else None)
        self._notify(display_id)

    @callback
    def set_safe(self, display_id: str, on: bool) -> None:
        """Notfallmodus erzwingen (nur Uhr, Datum, Wetter) – oder wieder normal anzeigen."""
        rt = self.runtime(display_id)
        rt.safe = on
        self.command(display_id, "safe", on=on)
        self._notify(display_id)

    @callback
    def resume(self, display_id: str) -> None:
        rt = self.runtime(display_id)
        if rt.pause_timer:
            rt.pause_timer()
            rt.pause_timer = None
        rt.paused = False
        rt.paused_until = None
        self.command(display_id, "resume")
        self._notify(display_id)

    # ───────── Watchdog ─────────

    async def _async_watchdog(self, now: datetime) -> None:
        """Hängende oder getrennte Displays über eine Taste (z. B. Fully „Start-URL laden“) neu starten."""
        for display in self.store.config.get("displays", []):
            display_id = display["id"]
            rt = self.runtime(display_id)
            # „Verbunden“ hängt von der Zeit ab – Entitäten regelmäßig auffrischen
            self._notify(display_id)
            watchdog = display.get("watchdog") or {}
            button = watchdog.get("button")
            if not button:
                continue
            if (rt.clients and all(c.hidden for c in rt.clients.values())) or (not rt.clients and rt.asleep):
                continue  # Bildschirm aus – kein Fehler
            if self.store.fully.dashboard_in_use(display_id):
                continue  # Bildschirmschoner-Modus: gerade ist das Dashboard dran
            last = rt.last_seen or self.started
            if (now - last).total_seconds() < watchdog.get("after", DEFAULT_WATCHDOG_AFTER):
                continue
            mono = time.monotonic()
            if rt.kicked_at and mono - rt.kicked_at < rt.kick_pause:
                continue
            if rt.kicked_at:
                rt.kick_pause = min(rt.kick_pause * 2, KICK_PAUSE_MAX)
            rt.kicked_at = mono
            _LOGGER.warning(
                "Ambiframe: Display „%s“ meldet sich seit %d s nicht – starte es über %s neu",
                display.get("name", display_id),
                (now - last).total_seconds(),
                button,
            )
            await self.hass.services.async_call(button.split(".")[0], "press", {"entity_id": button}, blocking=False)
