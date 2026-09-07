#!/usr/bin/env python3
"""Regenerate the raster brand assets (OG cards, touch icon, manifest icons).

Run manually when the brand changes — this is NOT part of `npm run build`:

    python3 scripts/generate-brand-assets.py

Requires Pillow and network access the first time (it caches the brand fonts
under .cache/fonts/). Colours are the sRGB values of the oklch tokens in
src/index.css; keep them in sync if the palette moves.
"""
from __future__ import annotations

import math
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONT_CACHE = ROOT / ".cache" / "fonts"

BG = (246, 239, 227)          # --bg        oklch(0.955 0.018 82)
BG_DEEP = (237, 227, 210)     # --bg-deep
INK = (26, 21, 17)            # --ink
INK_SOFT = (67, 59, 53)       # --ink-soft
INK_FAINT = (89, 81, 75)      # --ink-faint
RULE = (190, 182, 173)        # --rule
VERMILLION = (186, 45, 31)    # --vermillion
GILT = (189, 144, 51)         # --gilt

FONTS = {
    "garamond": ("EB+Garamond:ital,wght@0,500", "EBGaramond-Medium.ttf"),
    "garamond_semi": ("EB+Garamond:ital,wght@0,600", "EBGaramond-SemiBold.ttf"),
    "garamond_italic": ("EB+Garamond:ital,wght@1,500", "EBGaramond-MediumItalic.ttf"),
    "mono": ("JetBrains+Mono:wght@500", "JetBrainsMono-Medium.ttf"),
}


def fetch_font(spec: str, filename: str) -> Path:
    FONT_CACHE.mkdir(parents=True, exist_ok=True)
    dest = FONT_CACHE / filename
    if dest.exists():
        return dest
    css_url = f"https://fonts.googleapis.com/css2?family={spec}&display=swap"
    req = urllib.request.Request(css_url, headers={"User-Agent": "Mozilla/5.0"})
    css = urllib.request.urlopen(req, timeout=20).read().decode()
    ttf = css.split("src: url(")[1].split(")")[0]
    dest.write_bytes(urllib.request.urlopen(ttf, timeout=30).read())
    return dest


FACES = {k: fetch_font(*v) for k, v in FONTS.items()}


def font(face: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FACES[face]), size)


def tracked(draw: ImageDraw.ImageDraw, xy, text, f, fill, tracking: float):
    """Pillow has no letter-spacing; draw glyph by glyph."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking
    return x


def draw_mark(draw: ImageDraw.ImageDraw, cx: float, cy: float, s: float, ink=INK, detail: bool = True):
    """The Bytes Monks sigil from src/components/Logo.tsx, drawn as raster.

    `detail=False` drops the dashed ring and cardinal ticks, which turn to mush
    below roughly 128px and just add noise at favicon and app-icon sizes.
    """
    ring_r, inner_r = s * 0.47, s * 0.38
    w = max(2, int(s * 0.034))

    draw.ellipse([cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r], outline=ink, width=w)

    if detail:
        # Inner dashed ring
        seg = 5
        steps = 96
        for i in range(steps):
            if (i // seg) % 2:
                continue
            a0, a1 = (i / steps) * 360, ((i + 1) / steps) * 360
            draw.arc([cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r], a0, a1,
                     fill=RULE, width=max(1, w // 2))

        # Cardinal ticks
        for a in (0, 90, 180, 270):
            r = math.radians(a)
            draw.line([cx + math.cos(r) * (ring_r - s * 0.03), cy + math.sin(r) * (ring_r - s * 0.03),
                       cx + math.cos(r) * (ring_r + s * 0.03), cy + math.sin(r) * (ring_r + s * 0.03)],
                      fill=ink, width=w)

    # Brackets [ ]
    bw, bh, bt = s * 0.21, s * 0.14, s * 0.04
    for sign in (-1, 1):
        x_out, x_in = cx + sign * bw, cx + sign * (bw - bt)
        draw.line([x_in, cy - bh, x_out, cy - bh], fill=ink, width=w)
        draw.line([x_out, cy - bh, x_out, cy + bh], fill=ink, width=w)
        draw.line([x_out, cy + bh, x_in, cy + bh], fill=ink, width=w)

    # Central arch (the M)
    aw, top, bot = s * 0.13, cy - s * 0.12, cy + s * 0.12
    aw2 = s * 0.065
    draw.line([cx - aw, bot, cx - aw, cy - s * 0.02], fill=ink, width=int(w * 1.2))
    draw.line([cx + aw, bot, cx + aw, cy - s * 0.02], fill=ink, width=int(w * 1.2))
    draw.arc([cx - aw, top, cx - aw + 2 * aw2, top + 2 * (cy - s * 0.02 - top)], 180, 360,
             fill=ink, width=int(w * 1.2))
    draw.arc([cx + aw - 2 * aw2, top, cx + aw, top + 2 * (cy - s * 0.02 - top)], 180, 360,
             fill=ink, width=int(w * 1.2))

    # Vermillion illumination + baseline tick
    dot = s * 0.032
    draw.ellipse([cx - dot, cy - s * 0.18 - dot, cx + dot, cy - s * 0.18 + dot], fill=VERMILLION)
    draw.line([cx - aw, cy + s * 0.18, cx + aw, cy + s * 0.18], fill=VERMILLION, width=w)


def parchment(w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img, "RGBA")
    # Soft speckled wash, mirroring the radial gradients in index.css
    for (rx, ry, rad, alpha) in ((0.2, 0.1, 0.55, 34), (0.8, 0.6, 0.6, 26), (0.5, 0.95, 0.5, 20)):
        cx, cy, r = rx * w, ry * h, rad * max(w, h)
        for i in range(18):
            k = 1 - i / 18
            d.ellipse([cx - r * k, cy - r * k * 0.7, cx + r * k, cy + r * k * 0.7],
                      fill=(*BG_DEEP, int(alpha / 18)))
    return img


def card(w: int, h: int, eyebrow: str, line1: str, line1_accent: str, sub: str,
         footer_left: str, footer_right: str) -> Image.Image:
    img = parchment(w, h)
    d = ImageDraw.Draw(img, "RGBA")

    pad = int(w * 0.055)
    d.rectangle([pad, pad, w - pad, h - pad], outline=RULE, width=2)
    for (ox, oy, dx, dy) in ((0, 0, 1, 1), (1, 0, -1, 1), (0, 1, 1, -1), (1, 1, -1, -1)):
        x = pad + ox * (w - 2 * pad)
        y = pad + oy * (h - 2 * pad)
        arm = int(w * 0.022)
        d.line([x, y, x + dx * arm, y], fill=VERMILLION, width=3)
        d.line([x, y, x, y + dy * arm], fill=VERMILLION, width=3)

    inner = pad + int(w * 0.045)
    mark_s = int(h * 0.40)
    mark_cx = w - inner - mark_s * 0.52
    draw_mark(d, mark_cx, h * 0.46, mark_s)

    text_w = mark_cx - mark_s * 0.62 - inner

    y = int(h * 0.20)
    f_eyebrow = font("mono", int(h * 0.028))
    d.line([inner, y + int(h * 0.014), inner + int(w * 0.028), y + int(h * 0.014)],
           fill=VERMILLION, width=2)
    tracked(d, (inner + int(w * 0.038), y), eyebrow.upper(), f_eyebrow, INK_FAINT, h * 0.010)

    y += int(h * 0.075)
    size = int(h * 0.155)
    f_h1 = font("garamond_semi", size)
    f_h1i = font("garamond_italic", size)
    while (d.textlength(line1, font=f_h1) + d.textlength(" " + line1_accent, font=f_h1i)) > text_w and size > 40:
        size -= 4
        f_h1, f_h1i = font("garamond_semi", size), font("garamond_italic", size)
    x = inner
    d.text((x, y), line1, font=f_h1, fill=INK)
    x += d.textlength(line1 + " ", font=f_h1)
    d.text((x, y), line1_accent, font=f_h1i, fill=VERMILLION)

    y += int(size * 1.30)
    f_sub = font("garamond_italic", int(h * 0.052))
    words, line, lines = sub.split(), "", []
    for word in words:
        trial = f"{line} {word}".strip()
        if d.textlength(trial, font=f_sub) > text_w and line:
            lines.append(line)
            line = word
        else:
            line = trial
    lines.append(line)
    for ln in lines[:3]:
        d.text((inner, y), ln, font=f_sub, fill=INK_SOFT)
        y += int(h * 0.070)

    fy = h - pad - int(h * 0.075)
    d.line([inner, fy, w - inner, fy], fill=RULE, width=1)
    f_foot = font("mono", int(h * 0.026))
    tracked(d, (inner, fy + int(h * 0.020)), footer_left.upper(), f_foot, INK_FAINT, h * 0.008)
    fr = footer_right.upper()
    fr_w = sum(d.textlength(c, font=f_foot) + h * 0.008 for c in fr)
    tracked(d, (w - inner - fr_w, fy + int(h * 0.020)), fr, f_foot, VERMILLION, h * 0.008)
    return img


def icon(size: int, scale: float = 0.72) -> Image.Image:
    """`scale` is the mark's share of the canvas. Android masks an icon down to
    a circle inscribed in the central 80%, so the maskable variant needs more
    room than the plain one."""
    img = parchment(size, size)
    d = ImageDraw.Draw(img, "RGBA")
    draw_mark(d, size / 2, size / 2, size * scale, detail=size >= 256)
    return img


def main() -> None:
    card(1200, 630,
         "Ordo Bytorum · Est. MMXXI",
         "Bytes", "Monks",
         "Scalable software, intelligent AI systems, and the vetted engineers who build them.",
         "bytesmonks.com", "Ora et codica").save(PUBLIC / "og-image.png", optimize=True)

    card(1200, 630,
         "Ars Vocandi · Talent Sourcing",
         "We find the", "hands.",
         "Vetted AI, software, data and DevOps engineers — shortlisted by engineers, not keyword matchers.",
         "bytesmonks.com/talent-sourcing", "Quaere et invenies").save(PUBLIC / "og-talent-sourcing.png", optimize=True)

    card(1200, 630,
         "Ars Mercatoria · Product Sourcing",
         "From the factory", "to your door.",
         "We find the supplier, check the goods, and handle the freight out of China.",
         "bytesmonks.com/product-sourcing", "Quaere et proba").save(PUBLIC / "og-product-sourcing.png", optimize=True)

    icon(180).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    icon(192).save(PUBLIC / "icon-192.png", optimize=True)
    icon(512).save(PUBLIC / "icon-512.png", optimize=True)
    icon(512, scale=0.52).save(PUBLIC / "icon-maskable-512.png", optimize=True)

    for name in ("og-image.png", "og-talent-sourcing.png", "og-product-sourcing.png", "apple-touch-icon.png", "icon-192.png",
                 "icon-512.png", "icon-maskable-512.png"):
        p = PUBLIC / name
        print(f"[brand] {name:24} {Image.open(p).size} {p.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
