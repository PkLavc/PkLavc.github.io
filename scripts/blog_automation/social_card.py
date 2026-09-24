from __future__ import annotations

import io
import os
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts" / "arialbd.ttf",
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
        Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def create_card(title: str, company: str, category: str, published: str) -> bytes:
    width, height = 1200, 630
    image = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(image)
    for y in range(height):
        t = y / (height - 1)
        color = tuple(round(a * (1 - t) + b * t) for a, b in zip((7, 11, 18), (23, 16, 28)))
        draw.line((0, y, width, y), fill=color)
    draw = ImageDraw.Draw(image, "RGBA")
    draw.ellipse((820, -270, 1320, 230), fill=(0, 209, 255, 32))
    draw.line((0, 540, width, 300), fill=(0, 209, 255, 36), width=2)
    draw.text((82, 58), "PKLAVC.COM  /  ENGINEERING", font=_font(25), fill="#00d1ff", spacing=8)
    draw.rounded_rectangle((82, 124, 570, 184), radius=30, fill="#092a36", outline=(0, 209, 255, 150), width=2)
    draw.text((108, 140), company[:32], font=_font(21), fill="#8beaff")
    draw.text((82, 215), category.upper()[:48], font=_font(23), fill="#d9e4ec")

    title_font = _font(49)
    lines, current = [], ""
    for word in title.split():
        proposed = f"{current} {word}".strip()
        if current and draw.textlength(proposed, font=title_font) > 1030:
            lines.append(current)
            current = word
        else:
            current = proposed
    if current:
        lines.append(current)
    while len(lines) > 3 and title_font.size > 37:
        title_font = _font(title_font.size - 2)
        lines, current = [], ""
        for word in title.split():
            proposed = f"{current} {word}".strip()
            if current and draw.textlength(proposed, font=title_font) > 1030:
                lines.append(current)
                current = word
            else:
                current = proposed
        if current:
            lines.append(current)
    draw.multiline_text((82, 270), "\n".join(lines[:3]), font=title_font, fill="#ffffff", spacing=9)
    draw.text((82, 553), f"Technical analysis  ·  {published}", font=_font(23), fill="#b8c6d0")
    for index, color in enumerate(("#ff2aaa", "#00d1ff", "#ffffff")):
        draw.ellipse((1078 + index * 30, 542, 1092 + index * 30, 556), fill=color)
    stream = io.BytesIO()
    image.save(stream, format="PNG", optimize=True)
    return stream.getvalue()
