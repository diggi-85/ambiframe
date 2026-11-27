#!/bin/bash
# Alle README-Bilder: tools/readme-shots.sh <de|en> <Zielordner> – braucht den Dev-Server auf 8765 und Chrome mit --headless=new --remote-debugging-port=9333
L=$1; O=$2; S=$(dirname "$0"); mkdir -p $O
q() { [ "$L" = en ] && echo "$1&lang=en" || echo "$1"; }
n() { [ "$L" = en ] && echo "$2" || echo "$1"; }
snap() { node $S/readme-snap.mjs "$@"; }
title=$( [ "$L" = en ] && echo "Happy birthday, Mia!" || echo "Alles Gute, Mia!" )
sub=$( [ "$L" = en ] && echo "It’s Mia’s birthday today" || echo "Heute ist Mias Geburtstag" )
# Python mit Pillow (Projekt-venv, sonst das System)
PY=$S/../../.venv/bin/python; [ -x "$PY" ] || PY=python3

# Titelbild im Tablet-Rahmen (Treppenhaus), in der Galerie ein anderes Foto
H=$(mktemp -d)/hero.jpg; snap $H "$(q '&page=foto&photo=3&mode=dark')" >/dev/null && $PY $S/readme-frame.py $H $O/hero.jpg
snap $O/$(n bilderrahmen photo-frame).jpg "$(q '&page=foto&photo=2&mode=light')"
snap $O/$(n klingel doorbell).jpg "$(q '&page=foto&photo=1&mode=dark')" "const el=window.ambiframeDev.el; await el.updateComplete; el.testEvent('klingel');"
snap $O/$(n geburtstag birthday).jpg "$(q '&page=foto&photo=6&mode=dark')" "const el=window.ambiframeDev.el; await el.updateComplete; el.config={...el.config, events:[...el.config.events, {id:'fest',kind:'effect',effect:'confetti',title:'$title',where:'$sub',enabled:true}]}; await el.updateComplete; el.testEvent('fest');" 1600 900 motion
snap $O/$(n musik-cover music-cover).jpg "$(q '&page=musik&cover&mode=dark')"
snap $O/$(n wetter-polarlicht weather-aurora).jpg "$(q '&page=wetter&ambient=aurora&strength=3&mode=dark')" "" 1600 900 motion
snap $O/$(n wortuhr word-clock).jpg "$(q '&page=wortuhr&face=brass&mode=dark')"
snap $O/$(n uhren-fallblatt clocks-split-flap).jpg "$(q '&page=uhren&theme=fallblatt&mode=dark')"
snap $O/$(n alltag everyday).jpg "$(q '&page=extras&mode=light')"
snap $O/$(n waesche laundry).jpg "$(q '&page=waesche&mode=light')"
snap $O/$(n energie energy).jpg "$(q '&page=energie_bilanz&mode=dark')"
snap $O/$(n smart-home smart-home).jpg "$(q '&page=daheim&theme=daheim&mode=light')"
snap $O/$(n nachrichten news).jpg "$(q '&page=nachrichten&mode=dark')"

# Stil-Mosaik: die Wetterseite in neun Stilen
T=$(mktemp -d); files=()
for s in signature:dark glass:dark daheim:light editorial:light pixel:dark bauhaus:light lobby:dark swiss:light bilderbuch:light; do
  snap $T/${s%%:*}.jpg "$(q "&page=wetter&theme=${s%%:*}&mode=${s##*:}")" >/dev/null && files+=("$T/${s%%:*}.jpg")
done
$PY $S/readme-mosaic.py $O/$(n stile styles).jpg "${files[@]}"
rm -rf "$T"

snap $O/studio-display.jpg "$(q '&view=studio&studio=wohnzimmer&step=aussehen')" "window.ambiframeDev.el.setAdvanced(false);" 1600 1000
snap $O/$(n studio-momente studio-moments).jpg "$(q '&view=studio&studio=wohnzimmer&step=momente')" "window.ambiframeDev.el.setAdvanced(false);" 1600 1000
snap $O/$(n seiteneditor page-editor).jpg "$(q '&view=studio')" "const st=window.ambiframeDev.el; st.setAdvanced(false); st.openDisplay('wohnzimmer'); st.step='inhalte'; st.openPage('foto');" 1600 1000
