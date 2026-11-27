"""Bildschirmfoto im Tablet-Rahmen für den README-Kopf: python readme-frame.py <bild.jpg> <ausgabe.jpg>"""
import sys

from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1:3]
shot = Image.open(src).convert("RGB")
W, H = 2000, 1240
sw, sh = 1600, 900
bez, rad = 34, 46
dw, dh = sw + 2 * bez, sh + 2 * bez
x0, y0 = (W - dw) // 2, (H - dh) // 2 - 10

# Hintergrund: warmer, ruhiger Verlauf
bg = Image.new("RGB", (W, H))
top, bottom = (238, 233, 225), (214, 206, 194)
for y in range(H):
    t = y / (H - 1)
    ImageDraw.Draw(bg).line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(top, bottom)))

# weicher Schatten unter dem Gerät
shadow = Image.new("L", (W, H), 0)
ImageDraw.Draw(shadow).rounded_rectangle((x0 + 20, y0 + 50, x0 + dw - 20, y0 + dh + 40), rad, fill=150)
bg.paste((60, 50, 40), mask=shadow.filter(ImageFilter.GaussianBlur(45)))

# Gerät: dunkler Rahmen mit feiner Kante, darin der Bildschirm
dev = Image.new("RGBA", (dw, dh), (0, 0, 0, 0))
d = ImageDraw.Draw(dev)
d.rounded_rectangle((0, 0, dw - 1, dh - 1), rad, fill=(28, 28, 30), outline=(72, 72, 76), width=3)
mask = Image.new("L", (sw, sh), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, sw - 1, sh - 1), 12, fill=255)
dev.paste(shot.resize((sw, sh), Image.LANCZOS), (bez, bez), mask)
d.ellipse((dw // 2 - 5, bez // 2 - 5, dw // 2 + 5, bez // 2 + 5), fill=(50, 50, 54))  # Kamera
bg.paste(dev, (x0, y0), dev)
bg.save(out, quality=90)
print("ok", out)
