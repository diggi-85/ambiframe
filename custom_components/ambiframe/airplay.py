"""Ambiframe per AirPlay auf ein Apple TV schicken – über die Kopplung der Apple-TV-Einbindung von HA.

Seit tvOS 26 ignoriert das Apple TV den alten AirPlay-Befehl „/play“, den pyatv (und damit HA) verwendet: schwarzes
Bild mit Ladekreis. Neue Absender legen stattdessen einen Fernsteuer-Kanal an (SETUP mit Stream-Typ 130) und schicken
die Adresse als Eintrag für die Warteschlange („insertPlayQueueItem“) über „/command“ – nachgebaut nach
robkochman/pyatv@8144c77c. pyatv selbst bleibt unverändert; benutzt werden nur seine Bausteine (Kopplung,
verschlüsselte Kanäle, RTSP).

Die Verbindung muss während der ganzen Wiedergabe offen bleiben – beendet man sie, stoppt das Apple TV.
"""

from __future__ import annotations

import asyncio
import contextlib
import logging
import plistlib
from typing import Any
from uuid import uuid4

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.network import NoURLAvailableError, get_url

from .const import DOMAIN
from .stream import stream_resolutions

_LOGGER = logging.getLogger(__name__)

# Meldet Start und Ende einer AirPlay-Wiedergabe (Argument: Entität des Apple TV)
SIGNAL_AIRPLAY = f"{DOMAIN}_airplay"

AIRPLAY_PORT = 7000
AIRPLAY_PROTOCOL = "3"  # pyatv Protocol.AirPlay – Schlüssel der Kopplung im Eintrag der Apple-TV-Einbindung
FEEDBACK_INTERVAL = 2.0
COMMAND_USER_AGENT = "AirPlay/870.14.1"
REMOTE_CONTROL_CLIENT_TYPE = "A6B27562-B43A-4F2D-B75F-82391E250194"
EVENTS_SALT = "Events-Salt"
EVENTS_WRITE_INFO = "Events-Write-Encryption-Key"
EVENTS_READ_INFO = "Events-Read-Encryption-Key"
# So lange darf das Apple TV brauchen, bis es „spielt“ meldet
START_TIMEOUT = 45


def apple_tv_target(hass: HomeAssistant, entity_id: str) -> tuple[str, str]:
    """Adresse und AirPlay-Kopplung eines Apple TV aus dessen HA-Eintrag."""
    reg = er.async_get(hass).async_get(entity_id)
    entry = hass.config_entries.async_get_entry(reg.config_entry_id) if reg and reg.config_entry_id else None
    if entry is None or entry.domain != "apple_tv":
        raise HomeAssistantError(f"{entity_id} ist kein Apple TV")
    credentials = (entry.data.get("credentials") or {}).get(AIRPLAY_PROTOCOL)
    if not credentials:
        raise HomeAssistantError(
            "Das Apple TV ist für AirPlay nicht gekoppelt – Apple TV in HA löschen und neu hinzufügen (PIN am Fernseher)"
        )
    return entry.data["address"], credentials


def playback_state(payload: Any) -> str | None:
    """Wiedergabezustand aus einer Nachricht des Ereigniskanals („playing“, „paused“, „stopped“ …)."""
    from pyatv.protocols.airplay.utils import decode_plist_body  # noqa: PLC0415

    if isinstance(payload, (bytes, bytearray)):
        payload = decode_plist_body(payload)
    if not isinstance(payload, dict):
        return None
    params = payload.get("params")
    nested = params.get("data") if isinstance(params, dict) else None
    if nested is not None:
        payload = decode_plist_body(nested)
    if not isinstance(payload, dict) or payload.get("type") != "playbackState":
        return None
    params = payload.get("params")
    state = params.get("playbackState") if isinstance(params, dict) else payload.get("name")
    return state.lower() if isinstance(state, str) else None


class _UrlStream:
    """Eine AirPlay-2-Sitzung, die eine Adresse abspielt (Video, HLS)."""

    def __init__(self, address: str, credentials: str) -> None:
        self.address = address
        self.credentials = credentials
        self.state: str | None = None
        self.changed = asyncio.Event()
        self.lost = False
        self._session_id = str(uuid4()).upper()
        sender = bytearray(uuid4().bytes[:6])
        sender[0] = (sender[0] & 0xFC) | 0x02
        self._device_id = ":".join(f"{b:02X}" for b in sender)
        self._stream_id: int | None = None
        self._connection: Any = None
        self._rtsp: Any = None
        self._events: Any = None
        self._timing: Any = None
        self._feedback: asyncio.Task | None = None

    def _on_event(self, request: Any) -> None:
        state = playback_state(request.body)
        if state and state != self.state:
            self.state = state
            self.changed.set()

    async def start(self, url: str) -> None:
        # pyatv kommt mit der Apple-TV-Einbindung von HA
        from pyatv.auth.hap_channel import setup_channel  # noqa: PLC0415
        from pyatv.auth.hap_pairing import parse_credentials  # noqa: PLC0415
        from pyatv.protocols.airplay.auth import verify_connection  # noqa: PLC0415
        from pyatv.protocols.airplay.channels import EventChannel  # noqa: PLC0415
        from pyatv.protocols.raop.protocols import TimingServer  # noqa: PLC0415
        from pyatv.support.http import decode_bplist_from_body, http_connect  # noqa: PLC0415
        from pyatv.support.rtsp import RtspSession  # noqa: PLC0415

        on_event = self._on_event

        class Events(EventChannel):
            """Ereigniskanal, der zusätzlich den Wiedergabezustand meldet."""

            def parse_request(self, data: bytes):  # type: ignore[override]
                result = EventChannel.parse_request(data)
                if result[0] is not None:
                    with contextlib.suppress(Exception):
                        on_event(result[0])
                return result

        self._connection = await http_connect(self.address, AIRPLAY_PORT)
        self._rtsp = rtsp = RtspSession(self._connection)
        loop = asyncio.get_running_loop()
        self._timing, _ = await loop.create_datagram_endpoint(TimingServer, local_addr=(self._connection.local_ip, 0))
        timing_port = self._timing.get_extra_info("socket").getsockname()[1]

        verifier = await verify_connection(parse_credentials(self.credentials), self._connection)
        setup = decode_bplist_from_body(
            await rtsp.setup(
                body={
                    "deviceID": self._device_id,
                    "sessionUUID": self._session_id,
                    "sessionCorrelationUUID": str(uuid4()).upper(),
                    "timingPort": timing_port,
                    "timingProtocol": "NTP",
                    "isMultiSelectAirPlay": True,
                    "groupContainsGroupLeader": False,
                    "macAddress": self._device_id,
                    "model": "iPhone14,3",
                    "name": "Ambiframe",
                    "osBuildVersion": "20F66",
                    "osName": "iPhone OS",
                    "osVersion": "16.5",
                    "senderSupportsRelay": False,
                    "sourceVersion": "690.7.1",
                    "statsCollectionEnabled": False,
                }
            )
        )
        for attempt in range(5):
            try:
                self._events, _ = await setup_channel(
                    Events,
                    verifier,
                    self._connection.remote_ip,
                    setup.get("eventPort", 0),
                    EVENTS_SALT,
                    EVENTS_READ_INFO,
                    EVENTS_WRITE_INFO,
                )
                break
            except OSError:
                if attempt == 4:
                    raise
                await asyncio.sleep(1)
        self._feedback = asyncio.create_task(self._keep_alive())

        await rtsp.info()
        await rtsp.record()
        streams = decode_bplist_from_body(
            await rtsp.setup(
                body={
                    "streams": [
                        {
                            "clientUUID": str(uuid4()).upper(),
                            "clientTypeUUID": REMOTE_CONTROL_CLIENT_TYPE,
                            "channelID": f"{self._device_id}-RCS-1",
                            "controlType": 1,
                            "type": 130,
                        }
                    ]
                }
            )
        ).get("streams", [])
        if not streams or "streamID" not in streams[0]:
            raise HomeAssistantError("Apple TV hat keinen Steuerkanal angeboten")
        self._stream_id = int(streams[0]["streamID"])

        item = {"uuid": str(uuid4()).upper(), "mediaType": "file", "Content-Location": url, "Start-Position-Seconds": 0.0}
        for command in (
            {"type": "insertPlayQueueItem", "item": item},
            {"type": "setProperty", "value": True, "property": "isInterestedInDateRange", "item": {"uuid": item["uuid"]}},
            {"type": "setProperty", "value": 1, "property": "actionAtItemEnd"},
            {"type": "setRate", "rate": 1.0},
        ):
            resp = await self._command(command)
            if not 200 <= resp.code < 300:
                raise HomeAssistantError(f"Apple TV lehnt die Wiedergabe ab (Status {resp.code})")

    async def _command(self, command: dict[str, Any]) -> Any:
        return await self._rtsp.exchange(
            "POST",
            uri="/command",
            protocol="HTTP/1.1",
            headers={
                "User-Agent": COMMAND_USER_AGENT,
                "X-Apple-ProtocolVersion": "1",
                "X-Apple-Session-ID": self._session_id,
                "X-Apple-StreamID": self._stream_id,
            },
            body={"params": {"data": plistlib.dumps(command, fmt=plistlib.FMT_BINARY, sort_keys=False)}},
            allow_error=True,
        )

    async def _keep_alive(self) -> None:
        """Lebenszeichen an das Apple TV – reißt die Verbindung ab, ist die Sitzung vorbei."""
        failures = 0
        while True:
            try:
                await self._rtsp.feedback()
                failures = 0
            except Exception:  # noqa: BLE001
                failures += 1
                if failures >= 3:
                    self.lost = True
                    self.changed.set()
                    return
            await asyncio.sleep(FEEDBACK_INTERVAL)

    def close(self) -> None:
        if self._feedback:
            self._feedback.cancel()
        for part in (self._events, self._timing):
            if part is not None:
                with contextlib.suppress(Exception):
                    part.close()
        if self._connection is not None:
            with contextlib.suppress(Exception):
                self._connection.close()
        self._connection = None


async def async_cast_display(
    hass: HomeAssistant, caster: AirPlayCaster, display: dict[str, Any], entity_id: str, wanted: str | None = None
) -> None:
    """Videostream eines Displays als HLS per AirPlay ans Apple TV – braucht den eingeschalteten Videostream."""
    from homeassistant.components.camera import async_request_stream  # noqa: PLC0415

    available = stream_resolutions(display)
    if not available:
        raise ServiceValidationError(f"Beim Display „{display['name']}“ zuerst den Videostream einschalten")
    resolution = wanted if wanted in available else ("1080p" if "1080p" in available else available[0])
    unique_id = f"{display['id']}_stream" + ("" if resolution == "4k" else "_1080p")
    camera = er.async_get(hass).async_get_entity_id("camera", DOMAIN, unique_id)
    if camera is None:
        raise ServiceValidationError("Kamera für den Videostream fehlt – Ambiframe neu laden")
    try:
        base = get_url(hass, allow_external=False, allow_ip=True)
    except NoURLAvailableError as err:
        raise ServiceValidationError("Interne Adresse von HA unbekannt (Einstellungen → Netzwerk)") from err
    path = await async_request_stream(hass, camera, "hls")
    await caster.async_start(entity_id, f"{base}{path}")


class AirPlayCaster:
    """Laufende AirPlay-Sitzungen pro Apple TV (eine je Gerät)."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._tasks: dict[str, asyncio.Task] = {}

    def playing(self, entity_id: str) -> bool:
        task = self._tasks.get(entity_id)
        return task is not None and not task.done()

    async def async_start(self, entity_id: str, url: str) -> None:
        """Wiedergabe starten und warten, bis das Apple TV „spielt“ meldet."""
        await self.async_stop(entity_id)
        address, credentials = apple_tv_target(self.hass, entity_id)
        stream = _UrlStream(address, credentials)
        started: asyncio.Future[None] = self.hass.loop.create_future()
        self._tasks[entity_id] = self.hass.async_create_background_task(
            self._run(entity_id, stream, url, started), f"ambiframe_airplay_{entity_id}"
        )
        await started

    async def _run(self, entity_id: str, stream: _UrlStream, url: str, started: asyncio.Future[None]) -> None:
        try:
            await stream.start(url)
            async with asyncio.timeout(START_TIMEOUT):
                while stream.state != "playing":
                    stream.changed.clear()
                    await stream.changed.wait()
            _LOGGER.info("Ambiframe: AirPlay auf %s läuft", entity_id)
            started.set_result(None)
            async_dispatcher_send(self.hass, SIGNAL_AIRPLAY, entity_id)
            # Bis jemand am Apple TV beendet (Zurück/Home) oder die Verbindung abreißt
            while not stream.lost and stream.state not in ("stopped", "idle"):
                stream.changed.clear()
                await stream.changed.wait()
            _LOGGER.info("Ambiframe: AirPlay auf %s beendet (%s)", entity_id, "Verbindung weg" if stream.lost else stream.state)
        except Exception as err:  # noqa: BLE001 – Fehler an den Aufrufer weitergeben
            if not started.done():
                started.set_exception(
                    err if isinstance(err, HomeAssistantError) else HomeAssistantError(f"AirPlay fehlgeschlagen: {err}")
                )
            else:
                _LOGGER.warning("Ambiframe: AirPlay auf %s abgebrochen: %s", entity_id, err)
        finally:
            stream.close()
            if not started.done():
                started.set_exception(HomeAssistantError("AirPlay wurde beendet, bevor das Bild kam"))
            if self._tasks.get(entity_id) is asyncio.current_task():
                self._tasks.pop(entity_id, None)
            async_dispatcher_send(self.hass, SIGNAL_AIRPLAY, entity_id)

    async def async_stop(self, entity_id: str) -> None:
        task = self._tasks.pop(entity_id, None)
        if task and not task.done():
            task.cancel()
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await task

    async def async_stop_all(self) -> None:
        for entity_id in list(self._tasks):
            await self.async_stop(entity_id)
