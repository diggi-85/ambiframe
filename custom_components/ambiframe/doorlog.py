"""„Wer war an der Tür?“ – Klingel und Bewegung an Kameras mit Standbild mitschreiben.

Beobachtet die Auslöser aller Momente mit Kamera (Vollbild oder Bild-im-Bild). Springt einer an, holt HA ein
Standbild der Kamera und merkt sich Moment, Ort und Zeit – die letzten MAX_ENTRIES. Die Bilder liegen unter
/config/ambiframe/snapshots (also auch in jeder Sicherung) und werden nur mit HA-Anmeldung ausgeliefert.
"""

from __future__ import annotations

from datetime import timedelta
import logging
from pathlib import Path
import re
import time
from typing import TYPE_CHECKING, Any

from aiohttp import web

from homeassistant.components import camera
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.http.auth import async_sign_path
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import DOMAIN, SIGNAL_CONFIG_UPDATED

if TYPE_CHECKING:
    from .store import AmbiframeStore

_LOGGER = logging.getLogger(__name__)

MAX_ENTRIES = 20
# Bewegung meldet oft mehrfach hintereinander – höchstens ein Bild je Moment und Minute
MIN_SECONDS = 60
_FILE = re.compile(r"^\d+-[a-z0-9_]+\.jpg$")


def triggers(ev: dict[str, Any]) -> list[str]:
    """Auslöser eines Moments: entity und weitere entities."""
    return [x for x in [ev.get("entity"), *(ev.get("entities") or [])] if isinstance(x, str)]


def camera_moments(config: dict[str, Any]) -> list[dict[str, Any]]:
    return [e for e in config.get("events", []) if e.get("kind") in ("alarm", "live") and e.get("camera") and e.get("enabled", True)]


def fires(ev: dict[str, Any], old: str | None, new: str) -> bool:
    """Springt der Moment bei diesem Wechsel an? (to „*“ = jede Änderung, from optional)"""
    if old == new:
        return False
    to, frm = ev.get("to", "on"), ev.get("from")
    return (to == "*" or new == str(to)) and (frm is None or old == str(frm))


class DoorLog:
    def __init__(self, hass: HomeAssistant, store: AmbiframeStore) -> None:
        self.hass = hass
        self.store = store
        self.dir = Path(hass.config.path(DOMAIN, "snapshots"))
        self.entries: list[dict[str, Any]] = []
        self._store: Store[list[dict[str, Any]]] = Store(hass, 1, f"{DOMAIN}_doorlog")
        self._last: dict[str, float] = {}
        self._unsub_state: CALLBACK_TYPE | None = None
        self._unsub_config: CALLBACK_TYPE | None = None

    async def async_start(self) -> None:
        self.entries = await self._store.async_load() or []
        self._watch(self.store.config)
        self._unsub_config = async_dispatcher_connect(self.hass, SIGNAL_CONFIG_UPDATED, self._watch)

    @callback
    def async_stop(self) -> None:
        for unsub in (self._unsub_state, self._unsub_config):
            if unsub:
                unsub()
        self._unsub_state = self._unsub_config = None

    @callback
    def _watch(self, config: dict[str, Any]) -> None:
        if self._unsub_state:
            self._unsub_state()
            self._unsub_state = None
        ids = sorted({t for ev in camera_moments(config) for t in triggers(ev)})
        if ids:
            self._unsub_state = async_track_state_change_event(self.hass, ids, self._changed)

    @callback
    def _changed(self, event: Event) -> None:
        old, new = event.data.get("old_state"), event.data.get("new_state")
        if new is None:
            return
        for ev in camera_moments(self.store.config):
            if new.entity_id in triggers(ev) and fires(ev, old.state if old else None, new.state):
                if time.monotonic() - self._last.get(ev["id"], -MIN_SECONDS) < MIN_SECONDS:
                    continue
                self._last[ev["id"]] = time.monotonic()
                self.hass.async_create_task(self.async_record(ev))

    async def async_record(self, ev: dict[str, Any]) -> None:
        try:
            image = await camera.async_get_image(self.hass, ev["camera"], timeout=10)
        except HomeAssistantError as err:
            _LOGGER.debug("Ambiframe: kein Standbild von %s: %s", ev["camera"], err)
            return
        now = dt_util.utcnow()
        name = f"{int(now.timestamp())}-{re.sub(r'[^a-z0-9_]', '_', str(ev['id']).lower())}.jpg"
        await self.hass.async_add_executor_job(self._write, name, image.content)
        entry = {"event": ev["id"], "title": ev.get("title") or ev.get("name") or ev["id"], "where": ev.get("where", ""), "camera": ev["camera"], "at": now.isoformat(), "file": name}
        self.entries = [entry, *self.entries]
        gone = [e["file"] for e in self.entries[MAX_ENTRIES:]]
        self.entries = self.entries[:MAX_ENTRIES]
        await self.hass.async_add_executor_job(self._remove, gone)
        await self._store.async_save(self.entries)

    def _write(self, name: str, content: bytes) -> None:
        self.dir.mkdir(parents=True, exist_ok=True)
        (self.dir / name).write_bytes(content)

    def _remove(self, names: list[str]) -> None:
        for name in names:
            (self.dir / name).unlink(missing_ok=True)

    @callback
    def listing(self) -> list[dict[str, Any]]:
        """Einträge mit Bild-Link, der zwei Stunden gilt (signiert – ohne Anmeldung kein Bild)."""
        return [{**e, "url": async_sign_path(self.hass, f"/api/{DOMAIN}/snapshot/{e['file']}", timedelta(hours=2))} for e in self.entries]


class SnapshotView(HomeAssistantView):
    """Standbilder von „Wer war an der Tür?“ – nur angemeldet bzw. über signierte Links."""

    url = f"/api/{DOMAIN}/snapshot/{{name}}"
    name = f"api:{DOMAIN}:snapshot"
    requires_auth = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request, name: str) -> web.StreamResponse:
        store: AmbiframeStore | None = self.hass.data.get(DOMAIN)
        # Nur eigene Dateinamen – kein Weg aus dem Ordner heraus
        if store is None or not _FILE.match(name):
            return web.Response(status=404)
        path = store.doorlog.dir / name
        if not await self.hass.async_add_executor_job(path.is_file):
            return web.Response(status=404)
        return web.FileResponse(path, headers={"Cache-Control": "private, max-age=3600"})
