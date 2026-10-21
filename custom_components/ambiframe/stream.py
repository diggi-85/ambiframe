"""Videostream einer Ambiframe-Anzeige – z. B. für Apple TV (AirPlay), Fernseher ohne modernen Browser oder Apple Home.

Puppet (Add-on mit unsichtbarem Browser) rendert die Anzeige als Bild, ffmpeg macht daraus ein H.264-Video.
Alles nur auf Abruf: Ist der Stream im Display aus, gibt es keine Kamera. Ist er an, wird nur gerendert, solange
jemand ein Bild oder den Videostream abruft – ohne Zuschauer schließt Puppet seinen Browser nach 30 s von selbst.
"""

from __future__ import annotations

import asyncio
import contextlib
import logging
import secrets
import time
from typing import TYPE_CHECKING, Any
from urllib.parse import quote, urlparse

import aiohttp
from aiohttp import web

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.network import NoURLAvailableError, get_url

from .const import DOMAIN

if TYPE_CHECKING:
    from .store import AmbiframeStore

_LOGGER = logging.getLogger(__name__)

RESOLUTIONS = {"4k": (3840, 2160), "1080p": (1920, 1080)}
DEFAULT_RESOLUTION = "4k"
DEFAULT_INTERVAL = 0.2
# Puppet aus dem Add-on-Repository von balloob – der Hostname ist bei jeder Installation gleich
PUPPET_HOSTS = ("http://0f1cc410-puppet:10000",)
PUPPET_PORT = 10000
RENDER_TIMEOUT = 45
PUPPET_KEEPALIVE = 25
# Videostream: 5 aktuelle Bilder/s (Puppet braucht ~0,2 s für ein Full-HD-Bild); ffmpeg rechnet die Zwischenbilder
# als Überblendung und gibt 25 Bilder/s aus – Seitenwechsel und Einblendungen laufen so weich statt stufig
FEED_FPS = 5
STREAM_FPS = 25


def stream_config(display: dict[str, Any]) -> dict[str, Any]:
    return display.get("stream") or {}


def stream_resolutions(display: dict[str, Any]) -> list[str]:
    """Auflösungen mit eigener Kamera: „4k“, „1080p“ oder beide („both“). Leer, wenn der Stream aus ist."""
    cfg = stream_config(display)
    if not cfg.get("enabled"):
        return []
    res = cfg.get("resolution", DEFAULT_RESOLUTION)
    return list(RESOLUTIONS) if res == "both" else [res if res in RESOLUTIONS else DEFAULT_RESOLUTION]


class FrameSource:
    """Letztes Bild eines Displays; rendert neu, wenn es älter als das Intervall ist (nur auf Abruf)."""

    def __init__(self, hass: HomeAssistant, manager: StreamManager, display_id: str, resolution: str) -> None:
        self.hass = hass
        self.manager = manager
        self.display_id = display_id
        self.resolution = resolution
        self.frame: bytes | None = None
        self._at = 0.0
        self._lock = asyncio.Lock()
        self._warned = False

    @property
    def config(self) -> dict[str, Any]:
        return stream_config(self.manager.store.hub.display_config(self.display_id))

    @property
    def interval(self) -> float:
        return float(self.config.get("interval", DEFAULT_INTERVAL))

    async def async_frame(self) -> bytes | None:
        if self.frame and time.monotonic() - self._at < self.interval:
            return self.frame
        async with self._lock:
            if self.frame and time.monotonic() - self._at < self.interval:
                return self.frame
            frame = await self._from_bigger() or await self._render()
            if frame:
                self.frame, self._at = frame, time.monotonic()
            return self.frame

    async def _from_bigger(self) -> bytes | None:
        """Full HD aus einem frischen 4K-Bild verkleinern statt Puppet ein zweites Mal rendern zu lassen."""
        if self.resolution != "1080p":
            return None
        big = self.manager.sources.get((self.display_id, "4k"))
        if not big or not big.frame or time.monotonic() - big._at >= self.interval:
            return None
        return await self.hass.async_add_executor_job(_downscale, big.frame, RESOLUTIONS["1080p"])

    async def _render(self) -> bytes | None:
        width, height = RESOLUTIONS[self.resolution]
        # Puppet schließt seinen Browser nach 30 s ohne Abruf – dann erst die erste Seite einblenden lassen;
        # läuft die Seite schon, sofort abfotografieren
        wait = 0 if time.monotonic() - self._at < PUPPET_KEEPALIVE else 6000
        # Display und Stream-Modus im Pfad – Puppet behält Abfrageparameter für sich
        path = f"/ambiframe-display/{quote(self.display_id)}/stream?viewport={width}x{height}&format=jpeg&wait={wait}"
        session = async_get_clientsession(self.hass)
        for base in self.manager.renderers(self.config.get("renderer")):
            try:
                # Puppet hat einen Browser und macht ein Bild nach dem anderen („Browser is busy“ sonst)
                async with self.manager.puppet, session.get(base + path, timeout=aiohttp.ClientTimeout(total=RENDER_TIMEOUT)) as resp:
                    if resp.status == 200 and resp.content_type.startswith("image/"):
                        self.manager.working = base
                        self._warned = False
                        return await resp.read()
            except (aiohttp.ClientError, TimeoutError):
                continue
        if not self._warned:
            self._warned = True
            _LOGGER.warning(
                "Ambiframe: Videostream für „%s“ – kein Bild vom Puppet-Add-on (läuft es und hat es einen Zugriffstoken?)",
                self.display_id,
            )
        return None


class StreamManager:
    """Bildquellen pro Display und der Zugang für den Videostream."""

    def __init__(self, hass: HomeAssistant, store: AmbiframeStore) -> None:
        self.hass = hass
        self.store = store
        self.sources: dict[tuple[str, str], FrameSource] = {}
        self.tokens: dict[str, str] = {}
        self.working: str | None = None
        self.puppet = asyncio.Lock()

    def source(self, display_id: str, resolution: str) -> FrameSource:
        key = (display_id, resolution)
        if key not in self.sources:
            self.sources[key] = FrameSource(self.hass, self, display_id, resolution)
        return self.sources[key]

    def token(self, display_id: str) -> str:
        return self.tokens.setdefault(display_id, secrets.token_urlsafe(24))

    def enabled(self, display_id: str, resolution: str) -> bool:
        return resolution in stream_resolutions(self.store.hub.display_config(display_id))

    def renderers(self, configured: str | None) -> list[str]:
        """Eingetragene Puppet-Adresse, sonst die zuletzt funktionierende, das Add-on und HA-Host:10000."""
        if configured:
            return [configured.rstrip("/")]
        candidates = [self.working, *PUPPET_HOSTS]
        try:
            host = urlparse(get_url(self.hass, allow_external=False, allow_ip=True)).hostname
            if host:
                candidates.append(f"http://{host}:{PUPPET_PORT}")
        except NoURLAvailableError:
            pass
        return [c for i, c in enumerate(candidates) if c and c not in candidates[:i]]

    def stream_url(self, display_id: str, resolution: str) -> str:
        """Adresse, unter der HA selbst (Stream-Komponente) das Video abholt."""
        api = self.hass.config.api
        scheme = "https" if api and api.use_ssl else "http"
        port = api.port if api else 8123
        return f"{scheme}://127.0.0.1:{port}/api/{DOMAIN}/stream/{quote(display_id)}?res={resolution}&token={self.token(display_id)}"


class StreamView(HomeAssistantView):
    """MPEG-TS-Video aus den gerenderten Bildern. Läuft nur, solange jemand abruft; danach endet ffmpeg."""

    url = f"/api/{DOMAIN}/stream/{{display_id}}"
    name = f"api:{DOMAIN}:stream"
    requires_auth = False  # HA ruft es intern ab – geschützt über einen zufälligen Schlüssel pro Display

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request, display_id: str) -> web.StreamResponse:
        store: AmbiframeStore | None = self.hass.data.get(DOMAIN)
        resolution = request.query.get("res", DEFAULT_RESOLUTION)
        if store is None or not store.streams.enabled(display_id, resolution):
            return web.Response(status=404)
        if not secrets.compare_digest(request.query.get("token", ""), store.streams.token(display_id)):
            return web.Response(status=401)
        source = store.streams.source(display_id, resolution)
        try:
            from homeassistant.components.ffmpeg import get_ffmpeg_manager  # noqa: PLC0415

            binary = get_ffmpeg_manager(self.hass).binary
        except (ImportError, ValueError):
            binary = "ffmpeg"
        proc = await asyncio.create_subprocess_exec(
            binary,
            "-loglevel", "error",
            # Ohne Vorab-Analyse sofort loslegen; 5 Bilder/s rein, 25 Bilder/s raus (Zwischenbilder überblendet),
            # Schlüsselbild alle 2 s
            "-probesize", "32", "-analyzeduration", "0",
            "-f", "image2pipe", "-framerate", str(FEED_FPS), "-c:v", "mjpeg", "-i", "pipe:0",
            "-vf", f"framerate=fps={STREAM_FPS}:interp_start=0:interp_end=255:scene=100",
            "-c:v", "libx264", "-preset", "ultrafast", "-tune", "zerolatency", "-crf", "24",
            "-pix_fmt", "yuv420p", "-r", str(STREAM_FPS), "-g", str(STREAM_FPS * 2),
            "-flush_packets", "1", "-f", "mpegts", "pipe:1",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )  # fmt: skip
        assert proc.stdin and proc.stdout and proc.stderr

        placeholder = await self.hass.async_add_executor_job(_blank, RESOLUTIONS[resolution])
        refresh: asyncio.Task | None = None

        async def feed() -> None:
            # Fünfmal pro Sekunde das letzte Bild – sofort, auch wenn Puppet noch rendert (erst ein dunkler Platzhalter);
            # neu gerendert wird im Hintergrund im eingestellten Intervall
            nonlocal refresh
            while True:
                if refresh is None or refresh.done():
                    refresh = asyncio.create_task(source.async_frame())
                proc.stdin.write(source.frame or placeholder)
                await proc.stdin.drain()
                await asyncio.sleep(1 / FEED_FPS)

        response = web.StreamResponse(headers={"Content-Type": "video/mp2t", "Cache-Control": "no-store"})
        await response.prepare(request)
        feeder = asyncio.create_task(feed())
        _LOGGER.debug("Ambiframe: Videostream für „%s“ gestartet", display_id)
        try:
            while chunk := await proc.stdout.read(65536):
                await response.write(chunk)
        except (ConnectionResetError, asyncio.CancelledError, BrokenPipeError):
            pass
        finally:
            feeder.cancel()
            if refresh and not refresh.done():
                refresh.cancel()
            with contextlib.suppress(ProcessLookupError):
                proc.kill()
            err = (await proc.stderr.read()).decode(errors="replace").strip()
            await proc.wait()
            if err:
                _LOGGER.warning("Ambiframe: ffmpeg meldet für „%s“: %s", display_id, err[-500:])
            _LOGGER.debug("Ambiframe: Videostream für „%s“ beendet", display_id)
        return response


def _downscale(jpeg: bytes, size: tuple[int, int]) -> bytes:
    """JPEG verkleinern (Pillow gehört zu Home Assistant)."""
    from io import BytesIO  # noqa: PLC0415

    from PIL import Image  # noqa: PLC0415

    with Image.open(BytesIO(jpeg)) as img:
        out = BytesIO()
        img.convert("RGB").resize(size, Image.Resampling.LANCZOS).save(out, "JPEG", quality=88)
        return out.getvalue()


def _blank(size: tuple[int, int]) -> bytes:
    """Dunkles Platzhalterbild, bis das erste echte Bild gerendert ist."""
    from io import BytesIO  # noqa: PLC0415

    from PIL import Image  # noqa: PLC0415

    out = BytesIO()
    Image.new("RGB", size, (10, 13, 11)).save(out, "JPEG", quality=80)
    return out.getvalue()
