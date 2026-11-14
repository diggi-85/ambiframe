#!/bin/bash
# Alle README-Bilder: tools/readme-shots.sh <de|en> <Zielordner> – braucht den Dev-Server auf 8765 und Chrome mit --headless=new --remote-debugging-port=9333
L=$1; O=$2; S=$(dirname "$0"); mkdir -p $O
q() { [ "$L" = en ] && echo "$1&lang=en" || echo "$1"; }
n() { [ "$L" = en ] && echo "$2" || echo "$1"; }
title=$( [ "$L" = en ] && echo "Happy birthday, Mia!" || echo "Alles Gute, Mia!" )
sub=$( [ "$L" = en ] && echo "It’s Mia’s birthday today" || echo "Heute ist Mias Geburtstag" )
node $S/readme-snap.mjs $O/$(n bilderrahmen photo-frame).jpg "$(q '&page=foto')"
node $S/readme-snap.mjs $O/$(n klingel doorbell).jpg "$(q '&page=foto&mode=dark')" "const el=window.ambiframeDev.el; await el.updateComplete; el.testEvent('klingel');"
node $S/readme-snap.mjs $O/$(n geburtstag birthday).jpg "$(q '&page=foto&mode=dark')" "const el=window.ambiframeDev.el; await el.updateComplete; el.config={...el.config, events:[...el.config.events, {id:'fest',kind:'effect',effect:'confetti',title:'$title',where:'$sub',enabled:true}]}; await el.updateComplete; el.testEvent('fest');" 1600 900 motion
node $S/readme-snap.mjs $O/$(n musik-cover music-cover).jpg "$(q '&page=musik&cover&mode=dark')"
node $S/readme-snap.mjs $O/$(n wetter-polarlicht weather-aurora).jpg "$(q '&page=wetter&ambient=aurora&strength=3&mode=dark')" "" 1600 900 motion
node $S/readme-snap.mjs $O/$(n wortuhr word-clock).jpg "$(q '&page=wortuhr&face=brass&mode=dark')"
node $S/readme-snap.mjs $O/$(n stil-galerie style-gallery).jpg "$(q '&page=foto&theme=galerie&mode=light')"
node $S/readme-snap.mjs $O/$(n uhren-fallblatt clocks-split-flap).jpg "$(q '&page=uhren&theme=fallblatt&mode=dark')"
node $S/readme-snap.mjs $O/$(n alltag everyday).jpg "$(q '&page=extras&mode=light')"
node $S/readme-snap.mjs $O/studio-display.jpg "$(q '&view=studio&studio=wohnzimmer&step=aussehen')" "window.ambiframeDev.el.setAdvanced(false);" 1600 1000
node $S/readme-snap.mjs $O/$(n studio-momente studio-moments).jpg "$(q '&view=studio&studio=wohnzimmer&step=momente')" "window.ambiframeDev.el.setAdvanced(false);" 1600 1000
node $S/readme-snap.mjs $O/$(n seiteneditor page-editor).jpg "$(q '&view=studio')" "const st=window.ambiframeDev.el; st.setAdvanced(false); st.openDisplay('wohnzimmer'); st.step='inhalte'; st.openPage('foto');" 1600 1000