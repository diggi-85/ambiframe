#!/usr/bin/env python3
"""Erzeugt alle Ambiframe-Markenbilder als SVG nach docs/brand/ (Zeichen, Wortmarke, Claim, Logo, Icon).

Alles besteht aus Strichen und Kreisen – keine Schriftdatei nötig, überall gleich scharf.
Aufruf: python3 scripts/make-brand.py   (danach für die PNGs: node scripts/render-brand.mjs)
"""
import math
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "docs" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

INK, PAPER, AMBER, AMBER_ON_LIGHT = "#0F1012", "#F4F1EA", "#F4B14A", "#EE9A1F"
MUTED_ON_DARK, MUTED_ON_LIGHT = "#8B877D", "#6F6B62"
CLAIMS = {"en": "CALM UNTIL IT MATTERS", "de": "RUHIG, BIS ES ZÄHLT."}
DOT = (104, 36)  # Lichtpunkt an der oberen rechten Ecke des Rahmens


def mark(fg, dot, mini=False):
    """Rahmen als offener Strich mit runden Enden; der Lichtpunkt sitzt in der Lücke an der Ecke."""
    sw, r = (11, 15) if mini else (8, 12)
    reach = r + 6 + sw / 2  # Abstand der Strichenden von der Punktmitte: Punktrand + Luft + Kappe
    dx = math.sqrt(reach**2 - (DOT[1] - 30) ** 2)  # Strichende auf der oberen und der rechten Kante
    top_x, right_y = DOT[0] - dx, DOT[1] + dx
    d = f"M110 {right_y:.2f}V80A18 18 0 0 1 92 98H36A18 18 0 0 1 18 80V48A18 18 0 0 1 36 30H{top_x:.2f}"
    return (f'<path d="{d}" fill="none" stroke="{fg}" stroke-width="{sw}" stroke-linecap="round"/>'
            f'<circle cx="{DOT[0]}" cy="{DOT[1]}" r="{r}" fill="{dot}"/>')


def wordmark(fg, dot):
    """Wortmarke „ambiframe“, Grundlinie y=60, Strichstärke 7 (Breite bis x≈421)."""
    return f"""<g fill="none" stroke="{fg}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="40" r="20"/><path d="M40 20V60"/>
      <path d="M54 20V60M54 42A12 22 0 0 1 78 42V60M78 42A12 22 0 0 1 102 42V60"/>
      <path d="M120 0V60"/><circle cx="140" cy="40" r="20"/>
      <path d="M176 20V60"/>
      <path d="M204 60V18A12 12 0 0 1 216 6H218M194 20H216"/>
      <path d="M232 60V20M232 44A18 20 0 0 1 250 20"/>
      <circle cx="282" cy="40" r="20"/><path d="M302 20V60"/>
      <path d="M316 20V60M316 42A12 22 0 0 1 340 42V60M340 42A12 22 0 0 1 364 42V60"/>
      <path d="M378 40H418A20 20 0 1 0 412.1 54.1"/>
    </g>
    <circle cx="176" cy="3" r="5.5" fill="{dot}"/>"""


# Großbuchstaben des Claims: (Breite, Strichpfad) bei Höhe 12
GLYPHS = {
    "A": (9, "M0 12L4.5 0L9 12M1.8 8H7.2"), "B": (8, "M0 0V12M0 0H4A3 3 0 0 1 4 6H0M0 6H5A3 3 0 0 1 5 12H0"),
    "C": (9, "M9 2.6A4.94 6 0 1 0 9 9.4"), "E": (8, "M8 0H0V12H8M0 6H6"),
    "G": (9, "M9 2.6A4.94 6 0 1 0 9 9.4V6H5"), "H": (8, "M0 0V12M8 0V12M0 6H8"),
    "I": (0, "M0 0V12"), "L": (7, "M0 0V12H7"), "M": (10, "M0 12V0L5 8L10 0V12"),
    "N": (9, "M0 12V0L9 12V0"), "R": (8.5, "M0 12V0H4.5A3.6 3.6 0 0 1 4.5 7.2H0M4.5 7.2L8.5 12"),
    "S": (8, "M8 2.2C7 .6 5.5 0 4.2 0C2 0 .6 1.3 .6 3.1C.6 7 8 5 8 9C8 10.7 6.4 12 4 12C2.2 12 .9 11.2 0 9.6"),
    "T": (9, "M0 0H9M4.5 0V12"), "U": (9, "M0 0V7A4.5 5 0 0 0 9 7V0"), "Z": (8, "M0 0H8L0 12H8"),
    "Ä": (9, "M0 12L4.5 0L9 12M1.8 8H7.2M2.6 -4.4v.01M6.4 -4.4v.01"),
    ",": (0, "M0 11.5L-1 14.5"), ".": (0, "M0 11.5v.01"),
}


def claim(text, fg, gap=8, word_gap=17, stroke=2.4):
    x, parts = 0.0, []
    for ch in text:
        if ch == " ":
            x += word_gap - gap
            continue
        w, path = GLYPHS[ch]
        parts.append(f'<path transform="translate({x:.1f} 0)" d="{path}"/>')
        x += w + gap
    return (f'<g fill="none" stroke="{fg}" stroke-width="{stroke}" stroke-linecap="round" '
            f'stroke-linejoin="round">{"".join(parts)}</g>')


def svg(w, h, body, bg=None, title="Ambiframe"):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-label="{title}">\n  <title>{title}</title>\n  {rect}\n  {body}\n</svg>\n')


def lockup(fg, dot, muted=None, lang=None):
    """Zeichen links, Wortmarke rechts; mit Claim rückt die Wortmarke nach oben (Block bleibt mittig)."""
    wy = 20 if lang else 34
    body = f'<g>{mark(fg, dot)}</g><g transform="translate(152 {wy})">{wordmark(fg, dot)}</g>'
    if lang:
        body += f'<g transform="translate(152 98)">{claim(CLAIMS[lang], muted)}</g>'
    return 580, 128, body


def write(name, content):
    (OUT / name).write_text(content)


write("mark.svg", svg(128, 128, mark(INK, AMBER_ON_LIGHT)))
write("mark-light.svg", svg(128, 128, mark(PAPER, AMBER)))
write("mark-mini.svg", svg(128, 128, mark(INK, AMBER_ON_LIGHT, mini=True)))
write("mark-mini-light.svg", svg(128, 128, mark(PAPER, AMBER, mini=True)))

for suffix, fg, dot, muted in (("", INK, AMBER_ON_LIGHT, MUTED_ON_LIGHT), ("-light", PAPER, AMBER, MUTED_ON_DARK)):
    w, h, b = lockup(fg, dot)
    write(f"logo{suffix}.svg", svg(w, h, b))
    for lang in CLAIMS:
        w, h, b = lockup(fg, dot, muted, lang)
        write(f"logo-claim-{lang}{suffix}.svg", svg(w, h, b))

# Bilder auf dunklem Grund: Titelbild und GitHub-Vorschau 1280×640
for name, (W, H, k) in {"banner": (1376, 768, 1.6), "social": (1280, 640, 1.7)}.items():
    w, h, b = lockup(PAPER, AMBER, MUTED_ON_DARK, "en")
    g = f'<g transform="translate({(W - w * k) / 2:.1f} {(H - h * k) / 2:.1f}) scale({k})">{b}</g>'
    write(f"{name}.svg", svg(W, H, g, bg=INK))

# App-Icon: dunkle Kachel mit Zeichen (kleine Größen nehmen das kräftigere Mini-Zeichen)
for name, mini in (("icon.svg", False), ("icon-mini.svg", True)):
    tile = (f'<rect width="512" height="512" rx="112" fill="{INK}"/>'
            f'<g transform="translate(96 96) scale(2.5)">{mark(PAPER, AMBER, mini)}</g>')
    write(name, svg(512, 512, tile))

print("ok:", ", ".join(sorted(p.name for p in OUT.glob("*.svg"))))
