#!/usr/bin/env bash
# Frontend bauen und Ambiframe auf den Home-Assistant-Server kopieren (Samba-Freigabe „config“ muss gemountet sein).
# Danach: nur Frontend geändert → Browser neu laden; Python geändert → HA neu starten.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${AMBIFRAME_TARGET:-/Volumes/config/custom_components/ambiframe}"

# Freigabe „config“ (Samba-Add-on) bei Bedarf selbst verbinden – macOS nutzt dafür die im Schlüsselbund gespeicherte
# Anmeldung. Adresse anpassbar: AMBIFRAME_SMB=smb://mein-ha.local/config ./scripts/deploy.sh
# Eigene Adresse dauerhaft in scripts/deploy.local (wird nicht eingecheckt), z. B. AMBIFRAME_SMB=smb://mein-ha.local/config
[ -f "$ROOT/scripts/deploy.local" ] && . "$ROOT/scripts/deploy.local"
SMB="${AMBIFRAME_SMB:-smb://homeassistant.local/config}"
if [ ! -d "$(dirname "$TARGET")" ] && [ "$(uname)" = "Darwin" ] && [ -z "${AMBIFRAME_TARGET:-}" ]; then
  echo "Verbinde $SMB …"
  open "$SMB"
  # macOS braucht für das Verbinden gern über 30 s
  for _ in $(seq 1 90); do
    [ -d "$(dirname "$TARGET")" ] && break
    sleep 1
  done
fi
if [ ! -d "$(dirname "$TARGET")" ]; then
  echo "Freigabe nicht gefunden: $(dirname "$TARGET") – im Finder mit $SMB verbinden (Anmeldung einmal im Schlüsselbund sichern)." >&2
  exit 1
fi

# Erst prüfen, dann bauen: Typen, Frontend-Tests, Python-Tests (falls die Testumgebung .venv existiert)
(cd "$ROOT/frontend" && npx tsc --noEmit && npx vitest run --silent >/dev/null && node build.mjs)
# Die Testumgebung (.venv) hat das passende Python – das System-python3 (macOS: 3.9) kennt die Syntax von HA nicht
PY="$ROOT/.venv/bin/python"; [ -x "$PY" ] || PY=python3
"$PY" -m py_compile "$ROOT"/custom_components/ambiframe/*.py
if [ -x "$ROOT/.venv/bin/python" ]; then
  (cd "$ROOT" && .venv/bin/python -m pytest -q -p no:logging >/dev/null) || { echo "Python-Tests fehlgeschlagen – nicht ausgerollt." >&2; exit 1; }
fi

# --inplace: Samba lehnt die temporären Dateinamen von rsync ab
rsync -a --inplace --delete --exclude '__pycache__' --exclude '.DS_Store' \
  "$ROOT/custom_components/ambiframe/" "$TARGET/"
echo "Ambiframe nach $TARGET kopiert."
