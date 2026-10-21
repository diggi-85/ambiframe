<p align="center"><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/logo.png" alt="Ambiframe – Home Assistant Integration" width="640"></p>

<p align="center"><b>English</b> · <a href="README.de.md">Deutsch</a></p>

# Ambiframe

**Calm ambient displays for Home Assistant.** Ambiframe turns tablets and TVs into a photo frame with a brain:
day to day it shows photos, the time, the weather and only what matters right now. When someone rings, the front door
appears. When the laundry is done, it says so briefly and then stays as a small reminder.

![Photo frame: clock, date and info line over a photo](https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/bilderrahmen.jpg)

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/tagesvorschau.png" alt="Day preview with appointments, weather and waste collection"></td>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/laeuft-gerade.jpg" alt="Now playing: cover and progress"></td>
    <td><img src="https://raw.githubusercontent.com/diggi-85/ambiframe/main/docs/screenshots/editor.jpg" alt="Editor inside Home Assistant"></td>
  </tr>
  <tr>
    <td align="center"><sub>Day preview</sub></td>
    <td align="center"><sub>Now playing</sub></td>
    <td align="center"><sub>Editor inside Home Assistant</sub></td>
  </tr>
</table>

<sub>Screenshots with sample data, German interface. Ambiframe follows the language of the Home Assistant user
(English and German).</sub>

## Features

- **Pages built from widgets** on a 12×8 grid: clock, date, text, weather (current, card, hourly, daily, line),
  value, rooms, status ("right now"), calendar/waste, info line, camera and **any Lovelace card**.
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
- **Night mode** (dimmed clock that drifts to prevent burn-in) and **evening mood**.
- **Seven styles, each light and dark:** Calm, Clear, Gold, Liquid Glass, Aurora, Editorial, Minimal.
  Light/dark automatically by the sun (with a soft fade) or fixed, adjustable per display.
- **Twelve fonts** bundled locally (including Fraunces, Instrument Serif, Playfair, Inter, Geist, Outfit), separately
  for clock/titles and text, and per widget.
- **Calm background animations:** floating particles, flowing gradient, light shimmer, fog – strength and speed
  adjustable, per page, off at night and with "reduce motion".
- **Page transitions:** fade, blur, slide or zoom with any duration – globally, per display, per page.
- **Control mode:** a tap brings up the HA dashboard; after a minute without touch Ambiframe returns.
- **Native camera** via Home Assistant's own stream (WebRTC/HLS), with MJPEG as a fallback.
- **Photos** from the HA media folder `ambiframe` or a **shared iCloud album** (public link), optionally mixed with
  Bing's pictures of the day.
- **News** from tagesschau, n-tv, SPIEGEL or any RSS feed: large image with headline, list or ticker; the server
  fetches the feeds (cached for 10 min) and swaps small thumbnails for large images.
- **Webcams and cameras as background:** pages can use an HA camera or a webcam link (image, MJPEG, `.m3u8`, YouTube
  live) as their background; the editor suggests public webcams.
- **Info line** with weather, appointments, all waste bins in rotation, running appliances with remaining time,
  "window open and it's raining", what's playing, the robot vacuum and the car charging.
- **Daily content and day preview:** Wikipedia article and quote of the day; in the morning appointments, weather
  and waste collection at a glance.
- **AI summary** (via `ai_task`, e.g. Gemini) at set times: a headline and 3–5 points from weather, appointments,
  waste, electricity price/PV, car and home – exactly the data Ambiframe already shows. Widget, "Good morning" page,
  sensor *Ambiframe summary* (for announcements), button and action `ambiframe.generate_summary`.
- **On the TV:** a display can be sent as a video stream (up to 25 fps) to an Apple TV (AirPlay) or an LG webOS TV –
  with the switch *On the TV* or the actions `ambiframe.show_on_tv` / `ambiframe.stop_on_tv`. Requires the Puppet
  add-on.
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
- **Comfortable editing:** multi-select (⇧/⌘-click), drag groups together, guides for aligned edges, copy/paste with
  ⌘C/⌘V (as YAML – also between pages, tabs and devices), your own templates for widget groups and whole pages,
  pages as YAML export/import. The editor also works on a phone.
- **Tap actions:** every widget can do something on tap or long press – toggle, open HA details, run a script/action,
  show a page, open a pop-up with any Lovelace card, pause the playlist or bring up the HA dashboard; optionally with
  a confirmation ("Open the gate – really?").
- **Controllable from Home Assistant:** every display is a device with the entities *Page* (select, jumps there),
  *Pause* (ends after `pause_minutes`, default 60), *Next page*, *Reload*, *Connected* and *Last active* – ideal for
  automations ("car comes home → energy page").
- **Keeps itself running:** displays report every 30 s. If one hangs, Ambiframe presses the configured restart button
  (`watchdog.button`, e.g. Fully "Load start URL"). After an Ambiframe update all displays reload by themselves –
  never in the middle of a doorbell or camera event.
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
    night: { entity: input_boolean.night, page: night }
    control: { enabled: true, dashboard: /lovelace/0, idle: 60 }

pages:
  - id: photo
    name: Photo frame
    duration: 90
    background: { type: photo }
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
| `weather` | `entity`, `variant` (now/card/hourly/daily/line), `hours`, `days`, `name` |
| `value` | `entity`, `attribute`, `name`, `unit`, `decimals`, `style: card`, `label`, `icon`, `sub`, `secondary`, `cold` |
| `rooms` | `rooms: [{name, temperature, humidity, climate, windows}]`, `cold`, `warm`, `columns` |
| `status` | `windows` (auto/list), `appliances`, `lights: auto`, `waste`, `waste_days`, `extra`, `max` |
| `calendar` | `entity`, `variant` (card/line), `waste`, `days`, `label` |
| `infoline` | `items: [{type: weather/calendar/entity/text/…, …}]` |
| `camera` | `entity`, `mode` (live/snapshot), `radius` |
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
