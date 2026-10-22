"""WebSocket-API: Konfiguration lesen, abonnieren, speichern; Bing-Bilder, Strompreise; Displays an- und abmelden."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError, TemplateError
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.event import TrackTemplate, TrackTemplateResult, async_track_template_result
from homeassistant.helpers.template import Template

from .const import DATA_WS_REGISTERED, DOMAIN, SIGNAL_CONFIG_UPDATED
from .daily import ARTICLE_LANGUAGES, QUOTE_SOURCES
from .defaults import build_default_config
from .lang import resolve_lang
from .news import PRESETS
from .summary import SIGNAL_SUMMARY_UPDATED
from .store import AmbiframeStore


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    if hass.data.get(DATA_WS_REGISTERED):
        return
    hass.data[DATA_WS_REGISTERED] = True
    for command in (
        ws_get_config,
        ws_subscribe_config,
        ws_save_config,
        ws_default_config,
        ws_bing_photos,
        ws_tibber_prices,
        ws_display_connect,
        ws_display_report,
        ws_display_pause,
        ws_displays_status,
        ws_news,
        ws_daily,
        ws_icloud_photos,
        ws_summary_subscribe,
        ws_summary_generate,
        ws_template_subscribe,
        ws_config_previous,
    ):
        websocket_api.async_register_command(hass, command)


def _store(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> AmbiframeStore | None:
    store: AmbiframeStore | None = hass.data.get(DOMAIN)
    if store is None:
        connection.send_error(msg["id"], "not_loaded", "Ambiframe ist nicht eingerichtet")
    return store


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/config"})
@callback
def ws_get_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (store := _store(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], store.config)


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/config/subscribe"})
@callback
def ws_subscribe_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Schickt die Konfiguration sofort und nach jeder Änderung – so aktualisieren sich Displays live."""
    if (store := _store(hass, connection, msg)) is None:
        return

    @callback
    def forward(config: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"config": config}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, forward)
    connection.send_result(msg["id"])
    forward(store.config)


@websocket_api.websocket_command(
    {vol.Required("type"): "ambiframe/config/save", vol.Required("config"): dict, vol.Optional("language", default="de"): vol.In(["de", "en"])}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (store := _store(hass, connection, msg)) is None:
        return
    try:
        config = await store.async_save(msg["config"], msg["language"])
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_config", str(err))
        return
    connection.send_result(msg["id"], config)


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/config/default"})
@websocket_api.require_admin
@callback
def ws_default_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], build_default_config(hass))


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/photos/bing"})
@websocket_api.async_response
async def ws_bing_photos(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (store := _store(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], await store.async_bing_photos())


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/tibber/prices"})
@websocket_api.async_response
async def ws_tibber_prices(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Preisverlauf für das Strompreis-Widget – serverseitig geholt, damit Displays keine Admin-Rechte brauchen."""
    if (store := _store(hass, connection, msg)) is None:
        return
    try:
        connection.send_result(msg["id"], {"homes": await store.async_tibber_prices()})
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "unavailable", str(err))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ambiframe/display/connect",
        vol.Required("display_id"): str,
        vol.Required("client_id"): str,
        vol.Optional("name", default=""): str,
        vol.Optional("version"): str,
        # Aus Fully: Geräte-ID und Adresse von HA – für den Bedienmodus „Bildschirmschoner“
        vol.Optional("fully"): vol.Any(str, None),
        vol.Optional("origin"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_display_connect(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Ein Display meldet sich an und bekommt über dieses Abo Befehle (Seite, weiter, Pause, neu laden)."""
    if (store := _store(hass, connection, msg)) is None:
        return
    display_id = msg["display_id"]

    @callback
    def send(data: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], data))

    connection.subscriptions[msg["id"]] = store.hub.connect(display_id, msg["client_id"], msg["name"], msg.get("version"), send)
    connection.send_result(msg["id"])
    send({**store.hub.hello(display_id), "version": await store.hub.async_frontend_version()})
    store.fully.seen(display_id, msg.get("fully"), msg.get("origin"))
    # Für ein Ereignis aus dem Dashboard geholt → das Ereignis gleich zeigen
    if event_id := store.fully.take_pending(display_id):
        send({"command": "event", "id": event_id})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ambiframe/display/report",
        vol.Required("display_id"): str,
        vol.Required("client_id"): str,
        vol.Optional("page"): vol.Any(str, None),
        vol.Optional("hidden", default=False): bool,
        vol.Optional("version"): str,
        vol.Optional("safe"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_display_report(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Herzschlag eines Displays: aktuelle Seite, Bildschirm an/aus; Antwort enthält die installierte Version."""
    if (store := _store(hass, connection, msg)) is None:
        return
    store.hub.report(msg["display_id"], msg["client_id"], msg.get("page"), msg["hidden"], msg.get("version"), msg.get("safe"))
    connection.send_result(msg["id"], {"version": await store.hub.async_frontend_version()})


@websocket_api.websocket_command(
    {vol.Required("type"): "ambiframe/display/pause", vol.Required("display_id"): str, vol.Required("paused"): bool}
)
@callback
def ws_display_pause(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Pause vom Display selbst (Antippen) – wie der Schalter in HA, damit beide denselben Stand haben."""
    if (store := _store(hass, connection, msg)) is None:
        return
    if msg["paused"]:
        store.hub.pause(msg["display_id"])
    else:
        store.hub.resume(msg["display_id"])
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/displays/status"})
@callback
def ws_displays_status(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Welche Geräte gerade welches Display zeigen – für den Editor."""
    if (store := _store(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], store.hub.status())


def _configured_feeds(config: dict[str, Any]) -> set[str]:
    """Feeds, die in News-Widgets eingetragen sind – nur diese (und die fertigen Quellen) werden abgerufen."""
    feeds: set[str] = set()
    for page in config.get("pages", []):
        for widget in page.get("widgets", []):
            if widget.get("type") == "news":
                for feed in (widget.get("options") or {}).get("feeds") or []:
                    # Text oder aus dem Editor-Listenfeld {"value": …}
                    value = feed.get("value") if isinstance(feed, dict) else feed
                    if isinstance(value, str):
                        feeds.add(value)
    return feeds


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ambiframe/news",
        vol.Required("feeds"): [str],
        vol.Optional("limit", default=30): vol.All(int, vol.Range(min=1, max=100)),
    }
)
@websocket_api.async_response
async def ws_news(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Meldungen der gewünschten Feeds, neueste zuerst."""
    if (store := _store(hass, connection, msg)) is None:
        return
    allowed = set(PRESETS) | _configured_feeds(store.config)
    feeds = [f for f in msg["feeds"] if f in allowed]
    connection.send_result(msg["id"], {"items": await store.news.async_items(feeds, msg["limit"])})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ambiframe/daily",
        vol.Required("kind"): vol.In(["article", "quote"]),
        # Optional aus dem Widget: Wikipedia-Sprache bzw. Zitat-Quelle (sonst nach der Sprache der Anzeige)
        vol.Optional("language"): vol.In(ARTICLE_LANGUAGES),
        vol.Optional("source"): vol.In(QUOTE_SOURCES),
    }
)
@websocket_api.async_response
async def ws_daily(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Wikipedia-Artikel des Tages oder Zitat (None, wenn nicht abrufbar)."""
    if (store := _store(hass, connection, msg)) is not None:
        lang = msg.get("language") or resolve_lang(hass, store.config)
        connection.send_result(msg["id"], await store.daily.async_get(msg["kind"], lang, msg.get("source")))


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/photos/icloud", vol.Optional("url"): str})
@websocket_api.async_response
async def ws_icloud_photos(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Fotos eines iCloud-Albums – nur Alben, die im Design oder bei einem Display eingetragen sind."""
    if (store := _store(hass, connection, msg)) is not None:
        config = store.config
        known = {(config.get("photos") or {}).get("icloud")} | {
            (d.get("photos") or {}).get("icloud") for d in config.get("displays", [])
        }
        known.discard(None)
        url = msg.get("url") or (config.get("photos") or {}).get("icloud", "")
        if url and url not in known:
            connection.send_error(msg["id"], "unknown_album", "Dieses Album ist nicht eingetragen")
            return
        connection.send_result(msg["id"], await store.icloud.async_photos(url) if url else [])


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/summary/subscribe"})
@callback
def ws_summary_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Aktuelle KI-Zusammenfassung und jede neue."""
    if (store := _store(hass, connection, msg)) is None:
        return

    @callback
    def forward(summary: dict[str, Any] | None) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"summary": summary}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_SUMMARY_UPDATED, forward)
    connection.send_result(msg["id"])
    forward(store.summarizer.summary)


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/summary/generate"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_summary_generate(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Jetzt neu erstellen (Editor-Knopf)."""
    if (store := _store(hass, connection, msg)) is None:
        return
    result = await store.summarizer.async_generate()
    if result is None:
        connection.send_error(msg["id"], "failed", "Zusammenfassung konnte nicht erstellt werden – Details im HA-Log")
    else:
        connection.send_result(msg["id"], result)


def _saved_templates(obj: Any, found: set[str]) -> set[str]:
    """Alle Jinja-Vorlagen der gespeicherten Konfiguration (Texte mit {{ … }} oder {% … %})."""
    if isinstance(obj, str):
        if "{{" in obj or "{%" in obj:
            found.add(obj)
    elif isinstance(obj, dict):
        for value in obj.values():
            _saved_templates(value, found)
    elif isinstance(obj, list):
        for value in obj:
            _saved_templates(value, found)
    return found


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/template/subscribe", vol.Required("template"): str})
@callback
def ws_template_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Jinja-Vorlage live auswerten – auch für Displays ohne Admin-Benutzer, dann aber nur gespeicherte Vorlagen.

    HAs eigenes render_template ist Admins vorbehalten. Ambiframe rechnet deshalb selbst; ein normaler Benutzer kann
    so nur Vorlagen auswerten, die ein Admin in die Konfiguration geschrieben hat – im Editor (Admin) geht alles.
    """
    if (store := _store(hass, connection, msg)) is None:
        return
    source: str = msg["template"]
    if not connection.user.is_admin and source not in _saved_templates(store.config, set()):
        connection.send_error(msg["id"], "unauthorized", "Nur gespeicherte Vorlagen")
        return

    @callback
    def listener(event: Any, updates: list[TrackTemplateResult]) -> None:
        result = updates.pop().result
        if isinstance(result, TemplateError):
            connection.send_message(websocket_api.event_message(msg["id"], {"error": str(result)}))
        else:
            connection.send_message(websocket_api.event_message(msg["id"], {"result": result}))

    try:
        info = async_track_template_result(hass, [TrackTemplate(Template(source, hass), None)], listener)
    except TemplateError as err:
        connection.send_error(msg["id"], "template_error", str(err))
        return
    connection.subscriptions[msg["id"]] = info.async_remove
    connection.send_result(msg["id"])
    hass.loop.call_soon_threadsafe(info.async_refresh)


@websocket_api.websocket_command({vol.Required("type"): "ambiframe/config/previous"})
@websocket_api.require_admin
@callback
def ws_config_previous(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Die Fassung vor dem letzten Speichern – zum Zurückholen im Editor."""
    if (store := _store(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], store.previous)
