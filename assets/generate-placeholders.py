"""
Run once to generate placeholder images:
  python3 assets/generate-placeholders.py
Replace with real photos before deploying.
"""
from PIL import Image, ImageDraw, ImageFont
import os

assets = os.path.dirname(__file__)

specs = [
    ("hero-bg.jpg",        (1600, 900),  (60, 72, 60),   "Prairie — Bourgogne"),
    ("apropos-bg.jpg",     (1600, 900),  (40, 52, 40),   "Forêt / Prairie"),
    ("creations-bg.jpg",   (1600, 700),  (80, 60, 80),   "Danse / Mains"),
    ("prelude-bg.jpg",     (1200, 900),  (20, 20, 28),   "Prélude — scène"),
    ("prelude-media.jpg",  (600,  750),  (30, 30, 40),   "Prélude — photo"),
    ("conflit-bg.jpg",     (1200, 900),  (28, 20, 16),   "Le Conflit — argile"),
    ("conflit-media.jpg",  (600,  750),  (35, 25, 18),   "Le Conflit — photo"),
    ("carre-blanc-bg.jpg", (1600, 800),  (55, 68, 55),   "Carré Blanc — prairie"),
    ("marie-portrait.jpg", (400,  530),  (45, 50, 48),   "Portrait Marie"),
]

for filename, size, color, label in specs:
    path = os.path.join(assets, filename)
    img = Image.new("RGB", size, color)
    draw = ImageDraw.Draw(img)
    draw.text((size[0]//2, size[1]//2), label, fill=(200,200,200), anchor="mm")
    img.save(path, quality=85)
    print(f"  {filename}")

print("Done.")
