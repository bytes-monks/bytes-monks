#!/usr/bin/env python3
"""Re-encode the raster assets to the size they are actually rendered at.

Run manually after adding or replacing an image — not part of `npm run build`,
because the output is committed:

    python3 scripts/optimize-images.py

Targets 4x the largest CSS render box, which covers 2x DPR with headroom.

Note: converted sources are deleted once their .webp exists, so a second run is
a no-op. Originals stay recoverable from git history.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

# (source, destination, target edge, quality) — target edge is 4x the render box.
JOBS = [
    ("clients/iheb_lourimi.jfif", "clients/iheb_lourimi.webp", 176, 82),   # rendered 44px
    ("clients/mootaz_zemmel.jfif", "clients/mootaz_zemmel.webp", 176, 82),  # rendered 44px
    ("logos/cosmoeatsstars.webp", "logos/cosmoeatsstars.webp", 240, 80),    # rendered 60px
]

# Superseded by .webp siblings and referenced nowhere in src/ or index.html.
STALE = ["logos/dmnova.jfif", "logos/khotoua.png", "logos/rakam_ai.jfif", "clients/iheb_lourimi.jfif", "clients/mootaz_zemmel.jfif"]


def main() -> None:
    for src, dst, edge, q in JOBS:
        s, d = PUBLIC / src, PUBLIC / dst
        if not s.exists():
            print(f"[img] skip {src} (missing)")
            continue
        before = s.stat().st_size
        im = Image.open(s).convert("RGB")
        if max(im.size) > edge:
            im = im.resize((edge, edge) if im.width == im.height else
                           (edge, round(im.height * edge / im.width)), Image.LANCZOS)
        im.save(d, "WEBP", quality=q, method=6)
        after = d.stat().st_size
        print(f"[img] {src:34} {before:>7} -> {after:>7} B  ({100 - after * 100 // before}% smaller)  {im.size}")

    for rel in STALE:
        p = PUBLIC / rel
        if p.exists():
            size = p.stat().st_size
            p.unlink()
            print(f"[img] removed unreferenced {rel} ({size} B)")


if __name__ == "__main__":
    main()
