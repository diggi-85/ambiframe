"""Tageszusammenfassung von einer KI (ai_task, z. B. Gemini): kurz, faktisch, aus den Daten, die Ambiframe ohnehin zeigt."""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta
import json
import logging
import re
from typing import TYPE_CHECKING, Any

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import DOMAIN, SIGNAL_CONFIG_UPDATED
from .lang import resolve_lang

if TYPE_CHECKING:
    from .store import AmbiframeStore

_LOGGER = logging.getLogger(__name__)

SIGNAL_SUMMARY_UPDATED = f"{DOMAIN}_summary_updated"
DEFAULT_TIMES = ["05:30", "12:00", "17:30"]
# Bei Fehlern (z. B. „503 high demand“ bei Gemini) nach 5 und 15 Minuten erneut versuchen
RETRY_MINUTES = (5, 15)
PERIODS = {"morning": "Morgen", "midday": "Mittag", "evening": "Abend"}
_BAD = {"unknown", "unavailable", "", None}

STYLES = {
    "facts": (
        "Stil: knapp, nur Fakten. Erste Zeile: Überschrift mit höchstens 6 Wörtern, ohne Satzzeichen am Ende. "
        "Danach 3 bis 5 Zeilen, jede beginnt mit '- ' und hat höchstens 12 Wörter."
    ),
    "friendly": (
        "Stil: freundlich und ruhig, ohne Namen. Erste Zeile: kurze Überschrift (höchstens 6 Wörter). "
        "Danach 3 bis 5 Zeilen, jede beginnt mit '- ' und hat höchstens 14 Wörter."
    ),
}


_WEEKDAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]


def _when(value: datetime | str | None, now: datetime) -> str | None:
    """Zeitpunkt so, wie ein Mensch ihn sagt: „heute 18:00“, „morgen 12:45“, „Freitag ganztägig“."""
    if value is None:
        return None
    if isinstance(value, str):
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):  # ganztägiger Termin
            day = datetime.fromisoformat(value).date()
            return f"{_day_word(day, now)} ganztägig"
        parsed = dt_util.parse_datetime(value)
        if parsed is None:
            return value
        value = parsed
    local = dt_util.as_local(value)
    return f"{_day_word(local.date(), now)} {local:%H:%M}"


def _day_word(day: Any, now: datetime) -> str:
    diff = (day - now.date()).days
    return {0: "heute", 1: "morgen", 2: "übermorgen", -1: "gestern"}.get(diff, _WEEKDAYS[day.weekday()])


def _period(now: datetime) -> str:
    minutes = now.hour * 60 + now.minute
    return "morning" if minutes < 10 * 60 + 30 else "midday" if minutes < 16 * 60 else "evening"


def _clean(value: str) -> str:
    return re.sub(r"[*_#`]+", "", value).strip()


def parse_answer(text: str) -> tuple[str, list[str]]:
    """Überschrift + Punkte aus der KI-Antwort; Markdown-Reste werden entfernt."""
    headline = ""
    points: list[str] = []
    bullet = re.compile(r"^([-•*]|\d+[.)])\s+")
    for raw in (text or "").splitlines():
        line = raw.strip()
        if not line:
            continue
        if bullet.match(line):
            points.append(_clean(bullet.sub("", line)))
        elif not headline:
            headline = _clean(line).rstrip(".:")
        elif not points:
            points.append(_clean(line))
    return headline, [p for p in points if p][:5]


class SummaryService:
    """Plant die Erstellung, sammelt die Daten, fragt die KI und verteilt das Ergebnis."""

    def __init__(self, hass: HomeAssistant, store: AmbiframeStore) -> None:
        self.hass = hass
        self.store = store
        self.summary: dict[str, Any] | None = None
        self._persist: Store[dict[str, Any]] = Store(hass, 1, f"{DOMAIN}.summary")
        self._unsub_times: list[CALLBACK_TYPE] = []
        self._unsub_config: CALLBACK_TYPE | None = None
        self._lock = asyncio.Lock()
        self._times_key = ""

    @property
    def settings(self) -> dict[str, Any]:
        return self.store.config.get("summary") or {}

    # ───────── Lebenszyklus ─────────

    async def async_start(self) -> None:
        self.summary = await self._persist.async_load()
        self._schedule(self.store.config)

        @callback
        def _config_changed(config: dict[str, Any]) -> None:
            first = bool((config.get("summary") or {}).get("enabled")) and not self.summary
            self._schedule(config)
            if first:  # gerade eingeschaltet – nicht bis zum nächsten Termin warten
                self.hass.async_create_task(self.async_generate_with_retry())

        self._unsub_config = async_dispatcher_connect(self.hass, SIGNAL_CONFIG_UPDATED, _config_changed)

    @callback
    def async_stop(self) -> None:
        for unsub in self._unsub_times:
            unsub()
        self._unsub_times = []
        if self._unsub_config:
            self._unsub_config()
            self._unsub_config = None

    @callback
    def _schedule(self, config: dict[str, Any]) -> None:
        settings = config.get("summary") or {}
        times = (settings.get("times") or DEFAULT_TIMES) if settings.get("enabled") else []
        key = ",".join(times)
        if key == self._times_key:
            return
        self._times_key = key
        for unsub in self._unsub_times:
            unsub()
        self._unsub_times = []
        for value in times:
            hour, minute = (int(x) for x in value.split(":"))

            async def _run(_now: datetime) -> None:
                await self.async_generate_with_retry()

            self._unsub_times.append(async_track_time_change(self.hass, _run, hour=hour, minute=minute, second=0))

    # ───────── Daten sammeln (nur, was Ambiframe ohnehin zeigt) ─────────

    def _widgets(self, kind: str) -> list[dict[str, Any]]:
        return [
            widget.get("options") or {}
            for page in self.store.config.get("pages", [])
            for widget in page.get("widgets", [])
            if widget.get("type") == kind
        ]

    def _state(self, entity_id: str | None) -> str | None:
        state = self.hass.states.get(entity_id) if entity_id else None
        return None if state is None or state.state in _BAD else state.state

    def _name(self, entity_id: str) -> str:
        state = self.hass.states.get(entity_id)
        return str(state.attributes.get("friendly_name", entity_id)) if state else entity_id

    async def _weather(self, now: datetime) -> dict[str, Any] | None:
        entity = next((o.get("entity") for o in self._widgets("weather") if o.get("entity")), None)
        entity = entity or next((s.entity_id for s in self.hass.states.async_all("weather")), None)
        if not entity:
            return None
        current = self.hass.states.get(entity)
        result: dict[str, Any] = {}
        if current:
            result["jetzt"] = {"zustand": current.state, "temperatur": current.attributes.get("temperature")}
        for kind, count in (("hourly", 14), ("daily", 2)):
            try:
                response = await self.hass.services.async_call(
                    "weather", "get_forecasts", {"entity_id": entity, "type": kind}, blocking=True, return_response=True
                )
            except HomeAssistantError:
                continue
            forecast = ((response or {}).get(entity) or {}).get("forecast") or []
            rows = []
            for f in forecast[:count]:
                when = dt_util.parse_datetime(f.get("datetime", ""))
                label = (_when(when, now) if kind == "hourly" else _day_word(dt_util.as_local(when).date(), now)) if when else None
                rows.append(
                    {
                        "zeit": label,
                        "zustand": f.get("condition"),
                        "temp": f.get("temperature"),
                        "tief": f.get("templow"),
                        "regen_prozent": f.get("precipitation_probability"),
                        "regen_mm": f.get("precipitation"),
                    }
                )
            result["stunden" if kind == "hourly" else "tage"] = rows
        return result or None

    async def _calendar(self, now: datetime, period: str) -> list[dict[str, Any]]:
        calendars: list[str] = []
        for options in self._widgets("agenda"):
            calendars += options.get("calendars") or []
        calendars = list(dict.fromkeys(calendars)) or [
            s.entity_id for s in self.hass.states.async_all("calendar") if "waste" not in s.entity_id
        ]
        if not calendars:
            return []
        end = dt_util.start_of_local_day(now) + (timedelta(days=2, hours=6) if period == "evening" else timedelta(days=1))
        try:
            response = await self.hass.services.async_call(
                "calendar",
                "get_events",
                {"entity_id": calendars, "start_date_time": now.isoformat(), "end_date_time": end.isoformat()},
                blocking=True,
                return_response=True,
            )
        except HomeAssistantError:
            return []
        events = [e for value in (response or {}).values() for e in value.get("events", [])]
        events.sort(key=lambda e: e.get("start", ""))
        return [
            {k: v for k, v in {"wann": _when(e.get("start"), now), "bis": _when(e.get("end"), now), "titel": e.get("summary"), "ort": e.get("location")}.items() if v}
            for e in events[:8]
        ]

    def _waste(self) -> list[dict[str, Any]]:
        bins: dict[str, str] = {}
        sources = [o.get("bins") or [] for o in self._widgets("waste")]
        sources += [i.get("bins") or [] for o in self._widgets("infoline") for i in o.get("items") or [] if i.get("type") == "waste"]
        for source in sources:
            for b in source:
                if b.get("entity"):
                    bins.setdefault(b["entity"], b.get("name") or self._name(b["entity"]))
        result = []
        for entity, name in bins.items():
            try:
                days = int(float(self._state(entity) or ""))
            except ValueError:
                continue
            if 0 <= days <= 2:
                result.append({"tonne": name, "in_tagen": days})
        return result

    async def _energy(self, now: datetime) -> dict[str, Any] | None:
        result: dict[str, Any] = {}
        prices = self._widgets("price")
        tibber: dict[str, Any] = {}
        if prices and prices[0].get("note"):
            tibber["gilt_fuer"] = prices[0]["note"]  # z. B. „Dynamisch für die Wallbox“
        if prices:
            try:
                homes = await self.store.async_tibber_prices()
            except HomeAssistantError:
                homes = {}
            future = []
            for p in next(iter(homes.values()), []):
                start = dt_util.parse_datetime(p["start"])
                if start and start + timedelta(minutes=15) > now:
                    future.append((start, float(p["price"])))
            if future:
                tibber["jetzt_ct"] = round(future[0][1] * 100, 1)
                # günstigstes 2-Stunden-Fenster (8 Viertelstunden) der nächsten 24 h
                horizon = [f for f in future if f[0] < now + timedelta(hours=24)]
                window = 8
                if len(horizon) >= window:
                    best = min(range(len(horizon) - window + 1), key=lambda i: sum(p for _, p in horizon[i : i + window]))
                    avg = sum(p for _, p in horizon[best : best + window]) / window
                    tibber["guenstigstes_2h_fenster"] = {
                        "ab": _when(horizon[best][0], now),
                        "mittel_ct": round(avg * 100, 1),
                    }
                if horizon:
                    tibber["mittel_24h_ct"] = round(sum(p for _, p in horizon) / len(horizon) * 100, 1)
        if len(tibber) > ("gilt_fuer" in tibber):
            result["dynamischer_strompreis"] = tibber
        for options in self._widgets("power"):
            if (value := self._state(options.get("forecast_remaining"))) is not None:
                result["pv_rest_heute_kwh"] = value
            if (value := self._state(options.get("forecast"))) is not None:
                result["pv_prognose_heute_kwh"] = value
        return {k: v for k, v in result.items() if v is not None} or None

    def _car(self) -> list[dict[str, Any]]:
        cars = []
        for options in self._widgets("car"):
            car = {
                "name": options.get("name"),
                "akku_prozent": self._state(options.get("battery")),
                "reichweite_km": self._state(options.get("range")),
                "laedt": self._state(options.get("charging")),
                "eingesteckt": self._state(options.get("plugged")),
                "ort": self._state(options.get("location")),
                "voll_um": self._state(options.get("time_full")),
            }
            cars.append({k: v for k, v in car.items() if v is not None})
        return [c for c in cars if len(c) > 1]

    def _home(self) -> dict[str, Any]:
        windows, appliances, vacuums, warnings = set(), set(), [], set()
        for options in self._widgets("status"):
            for w in options.get("windows") if isinstance(options.get("windows"), list) else []:
                if w.get("entity") and self._state(w["entity"]) == "on":
                    room = f" ({w['room']})" if w.get("room") else ""
                    windows.add(f"{w.get('name') or self._name(w['entity'])}{room}")
            for a in options.get("appliances") or []:
                if a.get("entity") and self._state(a["entity"]) == "on":
                    appliances.add(a.get("name") or self._name(a["entity"]))
        for options in self._widgets("vacuum"):
            for v in options.get("vacuums") or []:
                state = self._state(v.get("entity"))
                if state in ("cleaning", "error", "returning"):
                    vacuums.append({"name": v.get("name") or self._name(v["entity"]), "zustand": state})
        for options in self._widgets("warnings"):
            for entity in options.get("entities") or []:
                state = self.hass.states.get(entity)
                if state and state.state == "on":
                    warnings.add(str(state.attributes.get("headline") or self._name(entity)))
        result = {
            "offene_fenster_tueren": sorted(windows),
            "laufende_geraete": sorted(appliances),
            "saugroboter": vacuums,
            "warnungen": sorted(warnings),
        }
        return {k: v for k, v in result.items() if v}

    async def async_collect(self, now: datetime, period: str) -> dict[str, Any]:
        weather, calendar, energy = await asyncio.gather(self._weather(now), self._calendar(now, period), self._energy(now))
        data = {
            "jetzt": f"{_WEEKDAYS[now.weekday()]}, {now:%d.%m.%Y %H:%M}",
            "tageszeit": PERIODS[period],
            "wetter": weather,
            "termine": calendar,
            "muell_raus": self._waste(),
            "energie": energy,
            "auto": self._car(),
            "haus": self._home(),
        }
        return {k: v for k, v in data.items() if v}

    # ───────── KI fragen ─────────

    def _ai_task(self) -> str | None:
        configured = self.settings.get("ai_task")
        if configured and self.hass.states.get(configured):
            return configured
        # Gemini bevorzugen – nie stillschweigend auf eine teurere KI ausweichen
        tasks = [s.entity_id for s in self.hass.states.async_all("ai_task")]
        return next((t for t in tasks if "google" in t or "gemini" in t), None)

    async def async_generate_with_retry(self) -> dict[str, Any] | None:
        """Geplante Läufe: bei Fehlern später erneut versuchen statt auszufallen."""
        result = await self.async_generate()
        for minutes in RETRY_MINUTES:
            if result is not None or not self.settings.get("enabled"):
                break
            _LOGGER.info("Ambiframe: neuer Versuch der Zusammenfassung in %d min", minutes)
            await asyncio.sleep(minutes * 60)
            result = await self.async_generate()
        return result

    async def async_generate(self) -> dict[str, Any] | None:
        entity = self._ai_task()
        if not entity:
            _LOGGER.warning("Ambiframe: keine KI für die Zusammenfassung gefunden (ai_task mit Gemini einrichten)")
            return None
        async with self._lock:
            now = dt_util.now()
            period = _period(now)
            data = await self.async_collect(now, period)
            style = STYLES.get(self.settings.get("style", "facts"), STYLES["facts"])
            answer_in = (
                "Antworte auf Deutsch."
                if resolve_lang(self.hass, self.store.config) == "de"
                else "Antworte auf Englisch (britisches Englisch) und übersetze auch Zeitangaben und Namen aus den "
                "Daten (heute → today, morgen → tomorrow, Wochentage, Mülltonnen)."
            )
            focus = {
                "morning": "Schwerpunkt: der heutige Tag.",
                "midday": "Schwerpunkt: Nachmittag und Abend.",
                "evening": "Schwerpunkt: der Abend und der morgige Tag.",
            }[period]
            instructions = (
                f"Du schreibst die {PERIODS[period]}-Übersicht für ein ruhiges Küchen-Display einer Familie. {focus} {style} "
                "Die Überschrift nennt das Wichtigste konkret (z. B. „Regen ab 18 Uhr, Tonnen raus“), nie allgemeine Wörter "
                "wie „Übersicht“ oder „Zusammenfassung“. Zeitangaben wie in den Daten (heute/morgen + 14:30). "
                "Nur Wichtiges und Konkretes. Erfinde nichts, nutze nur die Daten. Beachte Hinweise in den Daten "
                "(beim Strompreis kurz sagen, wofür er gilt, z. B. „Wallbox“). "
                "Lass Unwichtiges weg (normales Wetter ohne Regen nur kurz). Keine Begrüßung, keine Emojis, kein Markdown. "
                "Strompreise in Cent, Temperaturen gerundet. "
                + answer_in
                + "\n\nDaten:\n"
                + json.dumps(data, ensure_ascii=False, default=str)
            )
            try:
                response = await self.hass.services.async_call(
                    "ai_task",
                    "generate_data",
                    {"task_name": "Ambiframe Zusammenfassung", "instructions": instructions, "entity_id": entity},
                    blocking=True,
                    return_response=True,
                )
            except HomeAssistantError as err:
                _LOGGER.warning("Ambiframe: Zusammenfassung fehlgeschlagen: %s", err)
                return None
            text = str((response or {}).get("data") or "").strip()
            headline, points = parse_answer(text)
            if not headline and not points:
                _LOGGER.warning("Ambiframe: KI-Antwort ohne verwertbaren Inhalt: %s", text[:200])
                return None
            self.summary = {
                "headline": headline,
                "points": points,
                "text": text,
                "period": period,
                "generated_at": now.isoformat(),
                "model": entity,
            }
            await self._persist.async_save(self.summary)
            async_dispatcher_send(self.hass, SIGNAL_SUMMARY_UPDATED, self.summary)
            _LOGGER.debug("Ambiframe: Zusammenfassung (%s): %s", period, headline)
            return self.summary
