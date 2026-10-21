#!/usr/bin/env bash
# Frontend bauen und Ambiframe auf den Home-Assistant-Server kopieren (Samba-Freigabe „config“ muss gemountet sein).
# Danach: nur Frontend geändert → Browser neu laden; Python geändert → HA neu starten.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${AMBIFRAME_TARGET:-/Volumes/config/custom_components/ambiframe}"

if [ ! -d "$(dirname "$TARGET")" ]; then
  echo "Freigabe nicht gefunden: $(dirname "$TARGET") – im Finder mit smb://<ha-ip>/config verbinden." >&2
  exit 1
fi

# Erst prüfen, dann bauen: Typen, Frontend-Tests, Python-Tests (falls die Testumgebung .venv existiert)
(cd "$ROOT/frontend" && npx tsc --noEmit && npx vitest run --silent >/dev/null && node build.mjs)
python3 -m py_compile "$ROOT"/custom_components/ambiframe/*.py
if [ -x "$ROOT/.venv/bin/python" ]; then
  (cd "$ROOT" && .venv/bin/python -m pytest -q -p no:logging >/dev/null) || { echo "Python-Tests fehlgeschlagen – nicht ausgerollt." >&2; exit 1; }
fi

# --inplace: Samba lehnt die temporären Dateinamen von rsync ab
rsync -a --inplace --delete --exclude '__pycache__' --exclude '.DS_Store' \
  "$ROOT/custom_components/ambiframe/" "$TARGET/"
echo "Ambiframe nach $TARGET kopiert."
