<p align="center"><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/logo.png" alt="Ambiframe – Home Assistant Integration" width="640"></p>

<p align="center"><b>English</b> · <a href="README.de.md">Deutsch</a></p>

# Ambiframe

**Calm ambient displays for Home Assistant.** Ambiframe turns tablets and TVs into a photo frame with a brain:
day to day it shows photos, the time, the weather and only what matters right now. When someone rings, the front door
appears. When the laundry is done, it says so briefly and then stays as a small reminder.

![Photo frame: clock, date and info line over a photo](https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/en/photo-frame.jpg)

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/en/day-preview.png" alt="Day preview with appointments, weather and waste collection"></td>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/en/now-playing.jpg" alt="Now playing: cover and progress"></td>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/en/editor.jpg" alt="Editor inside Home Assistant"></td>
  </tr>
  <tr>
    <td align="center"><sub>Day preview</sub></td>
    <td align="center"><sub>Now playing</sub></td>
    <td align="center"><sub>Editor inside Home Assistant</sub></td>
  </tr>
</table>

<sub>Screenshots with sample data. Ambiframe follows the language of the Home Assistant user (English, German,
Dutch and French).</sub>

## Features

- **Pages built from 44 widgets** on a 12×8 grid with half-cell steps: clock, date, text, weather (current, card,
  hourly, daily, rain preview, line), value, rooms, status ("right now"), calendar/waste, info line, camera and **any
  Lovelace card** – the full list is under [Widgets](#widgets).
- **Everyday widgets:** kitchen timer (HA timers with quick-start buttons), notice board (text helpers, e.g. set from
  your phone), countdown (date, date helper or calendar), departures (public transport sensors, line filter, walking
  time), animated rain radar (RainViewer), sun & moon (sunrise/sunset, day length, moon phase) and pollen & air quality
  (traffic-light levels, sensors found automatically).
- **A playlist per display.** Pages with a condition (`show_if`) only appear when they are relevant, e.g. waste
  collection only the evening before.
- **Events** interrupt the display:
  - `alarm`: full screen with live camera, e.g. for the doorbell
  - `live`: picture-in-picture with a cooldown, e.g. for motion
  - `info`: a notice card, then a small reminder in the top right, e.g. for the washing machine
  - `page`: shows a specific page, e.g. while a motion sensor is on – at least `duration` s, then `hold_after` s,
    at most `max` s, with `cooldown` after it ends
  - `media`: album cover when the track changes (`entities`: players, `style`: `card`/`fullscreen`,
    `interval`: repeat every n minutes); groups show each track only once
- **Events with sound and rules:** bundled sounds (gong, ding-dong, bell, alarm – repeats until someone taps) or
  your own link, played on the tablet via Fully; quiet hours (muted or not at all), "only when someone is home", any
  conditions, and the trigger `to: "*"` = every change – e.g. for buttons and `event.*` entities (fresh events only,
  optionally only certain `event_types`).
- **Your own sounds:** a sound library in the editor – files from HA media (`media-source://`), `/local/…` or any link,
  with ▶ preview. Per event: repeat once, 2–10 times or until tapped/closed, with an adjustable interval.
- **Reminders and notification centre:** after a notice a small reminder stays in the top right – until tapped, for
  15 min to 1 day, or not at all. From several reminders on they stack like iOS notifications with a count; tap to
  expand or clear all. A notification centre (quick menu → *Notifications*) lists what happened, grouped by day.
- **Now playing mini card:** permanent or per track for a while, how long after pausing, conditions and quiet hours,
  corner, size, cover, progress and background.
- **Night mode** (dimmed clock that drifts to prevent burn-in) and **evening mood**.
- **Seven styles, each light and dark:** Calm, Clear, Gold, Liquid Glass, Aurora, Editorial, Minimal.
  Light/dark automatically by the sun (with a soft fade) or fixed, adjustable per display.
- **Twelve fonts** bundled locally (including Fraunces, Instrument Serif, Playfair, Inter, Geist, Outfit), separately
  for clock/titles and text, and per widget.
- **Calm background animations:** floating particles, flowing gradient, light shimmer, fog – strength and speed
  adjustable, per page, off at night and with "reduce motion".
- **Page transitions:** fade, blur, slide or zoom with any duration – globally, per display, per page.
- **Control mode:** a tap brings up the HA dashboard; after a minute without touch Ambiframe returns.
- **Native camera** via Home Assistant's own stream (WebRTC/HLS) – all displays share one connection to the camera,
  which matters for cameras that allow only a few (e.g. Tapo); MJPEG only as a fallback.
- **Photos** from the HA media folder `ambiframe` or a **shared iCloud album** (public link), optionally mixed with
  Bing's pictures of the day (region selectable).
- **News** from any RSS, Atom or RDF feed; suggestions in English (BBC, Guardian, Sky News, NPR, New York Times, ABC,
  CBC, Al Jazeera, DW), German (tagesschau, n-tv, SPIEGEL, ZDFheute, Deutschlandfunk, ZEIT, FAZ, SZ, heise, ORF,
  SRF), Dutch (NOS, NU.nl, VRT NWS) and French (Le Monde, franceinfo, RFI, Le Figaro). Without a choice, sources match the display language. Large image with headline, list or ticker; the server
  fetches the feeds (cached for 10 min) and swaps small thumbnails for large images. The ticker can be switched per
  display and is off on TVs and in the video stream (it would freeze or stutter there).
- **Webcams and cameras as background:** pages can use an HA camera or a webcam link (image, MJPEG, `.m3u8`, YouTube
  live) as their background; the editor suggests public webcams. The darkening behind clock and text is adjustable per
  page (normal, light, strong or off).
- **Info line** with weather, appointments, all waste bins in rotation, running appliances with remaining time,
  "window open and it's raining", what's playing, the robot vacuum and the car charging.
- **Daily content and day preview:** Wikipedia article of the day (English, German or Swedish) and a quote (ZenQuotes:
  quote of the day, or Wikiquote: German quote of the week); in the morning appointments, weather and waste collection
  at a glance.
- **AI summary** (via `ai_task`, e.g. Gemini) at set times: a headline and 3–5 points from weather, appointments,
  waste, electricity price/PV, car and home – exactly the data Ambiframe already shows. Widget, "Good morning" page,
  sensor *Ambiframe summary* (for announcements), button and action `ambiframe.generate_summary`.
- **On the TV:** a display can be sent as a video stream (up to 25 fps) to an Apple TV (AirPlay) or an LG webOS TV –
  with the switch *On the TV* or the actions `ambiframe.show_on_tv` / `ambiframe.stop_on_tv`. Requires the Puppet
  add-on. Step-by-step guide (German, also to paste into Claude): [`docs/airplay-apple-tv.md`](docs/airplay-apple-tv.md).
- **Languages:** English, German, Dutch and French – the interface, editor, starter configuration and AI summary.
- **iPad and iPhone via the HA app:** the dashboard card `custom:ambiframe-card` (`display: <id>`) in kiosk mode
  shows Ambiframe full screen, also for users without admin rights.
- **Landscape and portrait:** displays detect their orientation (also when rotated) or use a fixed one. In portrait,
  Ambiframe rearranges every page automatically (side by side → stacked); the editor ("Landscape | Portrait") lets you
  fine-tune the portrait layout (`widget.portrait`). The stage adapts to the aspect ratio (16:9, 4:3, phone) – no bars
  and no squashed widgets.
- **More building blocks:** pet (counter, times, weekly history), daily balance from long-term statistics, guest
  Wi-Fi QR code, job/3D print (progress, remaining time, layer, temperatures), robot vacuum with map, image entities.
- **Free building blocks:** *Text & template* – any text with Jinja (`{{ states('sensor.x') }}`, live) and optional
  Markdown; *History* – line, area or bars for one or more entities; *Gauge* – ring or half circle with colour
  steps; *Image* – link, `/local/…`, `media-source://…`, template or entity picture. Ambiframe renders templates on
  the server: displays without an admin user may only render templates that are part of the saved configuration.
- **Your own look:** custom colours for light and dark (background, text, accent, cards, good/warning/cool) on any
  style, corner radius, custom CSS globally and per page; save styles, export and import them as YAML. Per widget:
  as a card, accent and text colour, size, opacity, padding (`look`).
- **Comfortable editing:** half-cell grid (drag, resize, arrow keys), multi-select (⇧/⌘-click), drag groups together,
  guides for aligned edges, copy/paste with
  ⌘C/⌘V (as YAML – also between pages, tabs and devices), your own templates for widget groups and whole pages,
  pages as YAML export/import. The editor also works on a phone.
- **Tap actions:** every widget can do something on tap or long press – toggle, open HA details, run a script/action,
  show a page, open a pop-up with any Lovelace card, pause the playlist or bring up the HA dashboard; optionally with
  a confirmation ("Open the gate – really?").
- **Controllable from Home Assistant:** every display is a device with the entities *Page* (select, jumps there),
  *Pause* (ends after `pause_minutes`, default 60), *Next page*, *Reload*, *Connected* and *Last active* – ideal for
  automations ("car comes home → energy page").
- **Keeps itself running:** displays report every 30 s. If one hangs, Ambiframe presses the configured restart button
  (`watchdog.button`, e.g. Fully "Load start URL"). If you like, Home Assistant notifies you when a display has been
  offline for `watchdog.notify` minutes – the notification disappears by itself once it is back. After an Ambiframe
  update all displays reload by themselves – never in the middle of a doorbell or camera event.
- **Several devices:** without `?display=`, a device asks once which display it is and remembers it. The editor shows
  under *Playback → Devices* who is showing what.
- Everything is **stored in Home Assistant** (`.storage/ambiframe`) and is therefore part of every backup.

## Installation

### HACS (custom repository)

1. HACS → ⋮ → *Custom repositories* → `https://github.com/diggi-85/ambiframe`, type *Integration*.
2. Install "Ambiframe" and restart Home Assistant.
3. *Settings → Devices & services → Add integration → Ambiframe*.

### With Claude

Download (or clone) the repository, start Claude Code in the folder and write: *"Install and set up Ambiframe in my
Home Assistant."* Claude then follows the guide in [`CLAUDE.md`](CLAUDE.md).

### Manually

Copy `custom_components/ambiframe` to `/config/custom_components/`, restart, add the integration.

## Setup

1. Open **Ambiframe** in the sidebar. On first start, Ambiframe creates a starter configuration from your entities
   (weather, rooms by area, waste calendar) and a wizard sets up your first display.
2. Under **Displays**, copy the display's address, e.g.
   `http://homeassistant.local:8123/ambiframe-display?display=ambiframe`.
3. On the tablet (recommended: [Fully Kiosk Browser](https://www.fully-kiosk.com)) set it as the start URL and log in
   once – ideally with a separate HA user without admin rights.
4. Optionally enable the *JavaScript interface* in Fully. Ambiframe then wakes the screen for events.

On an iPad or iPhone, create a dashboard with only the `custom:ambiframe-card` card and open it in the HA app's kiosk
mode.

## Configuration

In the editor under **YAML** (or with the action `ambiframe.import_config`). Ambiframe creates a matching starter
configuration on first start; you can view and adjust it there as YAML. A complete example is in
[`examples/beispiel.yaml`](examples/beispiel.yaml).

```yaml
displays:
  - id: living_room
    name: Living room
    playlist: [{ page: photo }, { page: weather, duration: 20 }]
    watchdog: { notify: 30 }    # HA notification after 30 min offline
    night: { entity: input_boolean.night, page: night }
    control: { enabled: true, dashboard: /lovelace/0, idle: 60 }

pages:
  - id: photo
    name: Photo frame
    duration: 90
    background: { type: photo, shade: light }   # shade: none | light | strong
    widgets:
      - { id: clock, type: clock, x: 0, y: 4, w: 6, h: 2, options: { valign: end } }
      - { id: date, type: date, x: 0, y: 6, w: 7, h: 1 }

events:
  - id: doorbell
    entity: binary_sensor.front_door_ring
    to: "on"
    kind: alarm                 # alarm | live | info
    camera: camera.front_door
    title: Someone is at the door
    where: Front door
    hold_after: 30              # keep it on screen for 30 s after the ring

  - id: dining_table
    kind: page                  # show a page instead of an overlay
    entity: binary_sensor.dining_table_presence
    entities: [binary_sensor.kitchen_motion]   # more triggers – any one is enough
    to: "on"
    page: today
    duration: 60
    hold_after: 30
    cooldown: 300

  - id: music
    kind: media
    entities: [media_player.kitchen, media_player.living_room]
    style: card                 # card | fullscreen
```

### Widgets

| Type | Main options |
|---|---|
| `clock` | `size` (auto/small), `seconds`, `font`, `color` |
| `date` | `format` (long/short), `size`, `color`, `style: card` |
| `text` | `text` (may contain Jinja), `markdown`, `style` (label/title/body/big), `size`, `color`, `icon` |
| `chart` | `entities: [{entity, name, color}]`, `kind` (line/area/bar), `hours`, `period` (hour/day), `value`, `min`, `max`, `unit`, `decimals`, `label`, `style: card` |
| `gauge` | `entity`, `attribute`, `kind` (ring/half), `min`, `max`, `unit`, `decimals`, `color`, `severity: [{from, color}]`, `name`, `icon` |
| `image` | `url` (link, `/local/…`, `media-source://…`, template) or `entity`, `fit` (cover/contain), `refresh`, `caption`, `radius` |
| `weather` | `entity`, `variant` (now/card/hourly/daily/rain/line), `hours`, `days`, `name`, `rain_sensor`, `threshold` |
| `value` | `entity`, `attribute`, `name`, `unit`, `decimals`, `style: card`, `label`, `icon`, `sub`, `secondary`, `cold` |
| `rooms` | `rooms: [{name, temperature, humidity, climate, windows}]`, `cold`, `warm`, `columns` |
| `status` | `windows` (auto/list), `appliances`, `lights: auto`, `waste`, `waste_days`, `extra`, `max` |
| `calendar` | `entity`, `variant` (card/line), `waste`, `days`, `label` |
| `infoline` | `items: [{type: weather/calendar/entity/text/…, …}]` |
| `camera` | `entity` or `url` (webcam), `mode` (live/snapshot), `refresh`, `title`, `text`, `radius` |
| `agenda` | `calendars`, `days`, `max`, `location` |
| `today` | `calendars`, `weather` – appointments, weather and waste for the day |
| `waste` | `bins: [{name, entity, color, out}]`, `max`, `highlight` (days) |
| `activity` | `variant: list` (default: one line), `entities`, `exclude`, `max`, `within` (minutes) |
| `warnings` | `entities`, `calm_text` |
| `list` | `rows: [{name, entity, attribute, icon, format, unit, decimals}]` |
| `persons` | `persons: [{entity, name, location}]` |
| `media` | `entities`, `variant: full` (default: compact), `show_paused` |
| `appliances` | `items: [{name, running, icon, power, progress, end, cost}]`, `empty_text` |
| `price` | `entity`, `home` (Tibber), `window` (cheapest hours), `tomorrow`, `note` |
| `power` | `production: [{name, entity}]`, `consumption`, `forecast`, `forecast_remaining`, `extra`, `extra_name` |
| `consumers` | `count`, `devices`, `exclude` |
| `balance` | `switch_hour`, `groups` (YAML) |
| `batteries` | `part`, `devices`, `threshold`, `max`, `exclude` |
| `car` | `name`, `battery`, `range`, `location`, `charging`, `plugged`, `charger_power`, `time_full`, `lock`, `limit`, `inside_temp` |
| `vacuum` | `vacuums: [{entity, name, battery, room, map}]` |
| `covers` | `covers: [{entity, name, invert}]`, `only_open` |
| `pet` | `name`, `visits`, `unit`, `days`, `icon` |
| `job` | `title`, `progress`, `remaining`, `end`, `layer`, `layers`, `status`, `temps` (e.g. 3D printer) |
| `qr` | `ssid`, `password`, `encryption`, `hidden`, `show_password`, `hint` or `image` |
| `news` | `variant` (`list`/`ticker`, default: large image), `feeds`, `interval`, `max`, `speed` |
| `daily` | `kind: quote` (default: Wikipedia article), `language`, `source`, `image` |
| `summary` | `style: card` (default: no frame), `size` |
| `timer` | `entities` (timer.*, empty = all), `presets` ("5, 10, 15" minutes), `target`, `show_idle` |
| `board` | `entities` (input_text/text, empty = names with "board", "message", "note"), `expire_hours`, `size`, `empty_text` |
| `countdown` | `items: [{name, date \| entity, icon}]` (input_datetime, timestamp sensor, calendar), `max`, `show_past` |
| `departures` | `entities` (public transport sensors, empty = automatic), `lines`, `walk` (minutes), `max`, `show_platform`, `attribute` |
| `radar` | `zoom` (4–7), `map` (auto/light/dark/osm), `map_url`, `frames` (6 = last hour), `speed`, `latitude`/`longitude` |
| `sky` | `show` (sun/moon, empty = both), `latitude`/`longitude` (default: home) |
| `air` | `entities: [{entity, name, kind, scale}]` (pollen, aqi, pm25, pm10, ozone, no2; empty = automatic), `only_elevated`, `max` |
| `card` | `card:` any Lovelace card configuration |

All widgets support `align`/`valign` (start/center/end), `show_if` (conditions) as well as `tap_action` and
`hold_action`:

```yaml
tap_action: { action: toggle, entity: light.kitchen }
tap_action: { action: perform, perform: script.turn_on, entity: script.good_night, confirm: true }
tap_action: { action: page, page: energy }
tap_action: { action: popup, title: Light, card: { type: entities, entities: [light.kitchen] }, timeout: 30 }
hold_action: { action: pause }          # also: more_info (entity), dashboard
look: { card: true, accent: "#4fa3e0", ink: "#fff", size: 120, opacity: 80, padding: 12 }
```

### Conditions

```yaml
show_if:
  - { condition: state, entity: binary_sensor.window, state: "on" }
  - { condition: numeric, entity: sensor.co2, above: 1000 }
  - { condition: within_days, entity: calendar.waste, days: 1 }
  - { condition: time, after: "05:00", before: "11:00" }
  - { condition: changed, entity: binary_sensor.door, minutes: 10 }      # changed recently (optional state)
  - { condition: template, value_template: "{{ is_state('person.alex', 'home') }}" }
  - { condition: display, displays: [living_room] }                    # only on these displays
  - { condition: orientation, orientation: portrait }                    # portrait only
  - condition: or                                                        # also and / not, nested at will
    conditions:
      - { condition: state, entity: person.kim, state: home }
      - { condition: state, entity: person.alex, state: home }
```

Conditions apply to pages, widgets and **individual playlist entries** (`playlist[].show_if`) – so a display can show
different pages in the morning than in the evening (editor: *Playback → When?*).

## Development

```bash
cd frontend && npm install && npm run build      # bundle into custom_components/ambiframe/frontend/
```

Tests: `cd frontend && npm test` (frontend) and `python -m pytest` (integration, dependencies in
`requirements_test.txt`).

## License

MIT. The bundled fonts are licensed under the SIL Open Font License 1.1.
