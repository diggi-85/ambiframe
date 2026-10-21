"""Erzeugt die Töne für Ereignisse (custom_components/ambiframe/frontend/sounds/*.wav) – ruhig, ohne fremde Dateien.

Jeder Klang besteht aus Teiltönen mit eigenem Ausklingen (wie bei echten Glocken, Hölzern und Schalen: hohe Teiltöne
verklingen schneller), weichem Einschwingen und etwas Raumhall. Aufruf: python3 frontend/tools/sounds.py
"""

import math
import struct
import wave
from pathlib import Path

RATE = 32000
OUT = Path(__file__).resolve().parents[2] / "custom_components" / "ambiframe" / "frontend" / "sounds"

Partial = tuple[float, float, float]  # Frequenzverhältnis, Lautstärke, Abklingzeit in s


def note(freq: float, partials: list[Partial], seconds: float, start: float = 0.0, attack: float = 0.006, beat: float = 0.0) -> list[float]:
    """Ein Anschlag: Teiltöne mit eigenem Ausklingen; `beat` lässt den Grundton leicht schweben (Klangschale)."""
    n = int(RATE * seconds)
    off = int(RATE * start)
    out = [0.0] * (off + n)
    for k, (ratio, amp, decay) in enumerate(partials):
        f = freq * ratio
        w = 2 * math.pi * f / RATE
        wb = 2 * math.pi * (f + beat) / RATE if beat and k == 0 else 0.0
        for i in range(n):
            t = i / RATE
            env = min(1.0, t / attack) * math.exp(-t / decay)
            s = math.sin(w * i)
            if wb:
                s = 0.5 * (s + math.sin(wb * i))
            out[off + i] += amp * env * s
    return out


def mix(*parts: list[float]) -> list[float]:
    out = [0.0] * max(len(p) for p in parts)
    for p in parts:
        for i, s in enumerate(p):
            out[i] += s
    return out


def reverb(x: list[float], wet: float = 0.18, size: float = 1.0, tail: float = 1.2) -> list[float]:
    """Kleiner Schroeder-Hall (4 Kammfilter, 2 Allpässe) – macht synthetische Töne weicher und räumlicher."""
    x = x + [0.0] * int(RATE * tail)
    acc = [0.0] * len(x)
    for d in (int(RATE * s * size) for s in (0.0297, 0.0371, 0.0411, 0.0437)):
        buf = [0.0] * d
        for i, s in enumerate(x):
            y = buf[i % d]
            buf[i % d] = s + y * 0.82
            acc[i] += y
    for d in (int(RATE * 0.005), int(RATE * 0.0017)):
        buf = [0.0] * d
        for i, s in enumerate(acc):
            y = -0.7 * s + buf[i % d]
            buf[i % d] = s + 0.7 * y
            acc[i] = y
    return [d + wet * 0.25 * r for d, r in zip(x, acc)]


def save(name: str, samples: list[float], gain: float = 0.8) -> None:
    n = int(RATE * 0.3)
    for i in range(n):  # weich auslaufen
        samples[-n + i] *= 1 - i / n
    peak = max(abs(s) for s in samples) or 1.0
    OUT.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT / f"{name}.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(b"".join(struct.pack("<h", int(32767 * gain * s / peak)) for s in samples))
    print(f"  {name}.wav  {len(samples) / RATE:.1f} s")


# Klangfarben: (Verhältnis, Lautstärke, Abklingzeit)
BOWL: list[Partial] = [(1.0, 1.0, 3.2), (2.71, 0.42, 2.2), (5.15, 0.18, 1.2), (8.43, 0.06, 0.7)]
MARIMBA: list[Partial] = [(1.0, 1.0, 0.75), (3.93, 0.28, 0.18), (9.8, 0.06, 0.06)]
GLASS: list[Partial] = [(1.0, 1.0, 1.4), (2.76, 0.32, 0.6), (5.4, 0.1, 0.25), (8.93, 0.03, 0.12)]
KALIMBA: list[Partial] = [(1.0, 1.0, 0.9), (5.95, 0.12, 0.08), (2.0, 0.08, 0.4)]
CHIME: list[Partial] = [(1.0, 1.0, 1.8), (2.76, 0.22, 0.7), (5.4, 0.06, 0.3)]
BELL: list[Partial] = [(1.0, 1.0, 0.9), (2.01, 0.3, 0.5), (3.02, 0.1, 0.3)]

print("Töne nach", OUT)

# Klangschale: ein tiefer, schwebender Ton – warm, passt zum Bambus-Design
save("klangschale", reverb(note(220.0, BOWL, 4.2, attack=0.02, beat=1.3), wet=0.22, tail=0.8), 0.72)
# Marimba: zwei weiche Holztöne abwärts (G4 → D4), freundlich und kurz
save("marimba", reverb(mix(note(392.0, MARIMBA, 1.3), note(293.7, MARIMBA, 1.6, start=0.32)), wet=0.25), 0.75)
# Glas: klares Ding-Dong (A5 → F5), leise und hell
save("glas", reverb(mix(note(880.0, GLASS, 1.6), note(698.5, GLASS, 2.0, start=0.45)), wet=0.28), 0.6)
# Kalimba: drei gezupfte Töne aufwärts (C5 E5 G5), verspielt
save(
    "kalimba",
    reverb(mix(note(523.3, KALIMBA, 1.2), note(659.3, KALIMBA, 1.2, start=0.17), note(784.0, KALIMBA, 1.6, start=0.34)), wet=0.25),
    0.7,
)
# Windspiel: vier zarte Glöckchen, leicht unregelmäßig
save(
    "windspiel",
    reverb(
        mix(
            note(1318.5, CHIME, 2.0),
            note(1568.0, CHIME, 2.0, start=0.21),
            note(1174.7, CHIME, 2.0, start=0.47),
            note(1760.0, CHIME, 2.2, start=0.66),
        ),
        wet=0.35,
        tail=1.0,
    ),
    0.5,
)
# Hinweis: ein einzelner, sehr leiser, kurzer Ton – für Bewegung an der Tür
save("hinweis", reverb(note(987.8, GLASS, 0.9, attack=0.012), wet=0.2, tail=0.5), 0.32)

# Bisherige Töne, mit gleicher Technik etwas weicher
save("gong", reverb(note(196.0, [(1.0, 1.0, 2.6), (2.0, 0.45, 1.6), (3.0, 0.22, 0.9), (4.05, 0.12, 0.6), (6.02, 0.05, 0.3)], 3.4, attack=0.012), wet=0.2), 0.72)
save("dingdong", reverb(mix(note(659.3, BELL, 1.3), note(523.3, BELL, 1.7, start=0.55)), wet=0.2), 0.72)
save("glocke", reverb(note(880.0, [(1.0, 1.0, 0.5), (2.0, 0.3, 0.3), (3.0, 0.12, 0.15), (1.5, 0.2, 0.4)], 1.4), wet=0.2), 0.68)
# Alarm: eindringlich, aber nicht schrill – wechselnde Töne, wird während des Alarms wiederholt
beeps = [note(f, [(1.0, 1.0, 0.5), (2.0, 0.25, 0.3)], 0.26, start=k * 0.32, attack=0.01) for k, f in enumerate([880, 660, 880, 660, 880, 660])]
save("alarm", mix(*beeps), 0.85)
