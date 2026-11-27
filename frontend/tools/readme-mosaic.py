"""Stil-Mosaik für die README: python readme-mosaic.py <ausgabe.jpg> <bild1> … <bild9> – 3×3, mit schmalen Fugen."""
import sys

from PIL import Image

out, *files = sys.argv[1:]
cols, gap, w = 3, 12, 1600
cell = (w - gap * (cols + 1)) // cols
h_cell = cell * 9 // 16
rows = (len(files) + cols - 1) // cols
canvas = Image.new("RGB", (w, rows * h_cell + gap * (rows + 1)), (18, 18, 18))
for i, f in enumerate(files):
    img = Image.open(f).convert("RGB").resize((cell, h_cell), Image.LANCZOS)
    canvas.paste(img, (gap + (i % cols) * (cell + gap), gap + (i // cols) * (h_cell + gap)))
canvas.save(out, quality=88)
print("ok", out)
