#!/usr/bin/env python3
"""Crops the official NCVEC figure pages (data-src/*-figures.pdf) into per-figure SVGs
in public/figures/. Run: python3 scripts/extract-figures.py  (needs poppler's pdftocairo)."""
import re, subprocess, tempfile, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "figures"
OUT.mkdir(parents=True, exist_ok=True)

# (pdf, page, figure id, crop as fractions of the page: x0, y0, x1, y1)
def frac(x, y, w, h, W, H): return (x / W, y / H, (x + w) / W, (y + h) / H)
A4 = (595, 842)
JOBS = [
    ("technician-figures.pdf", 1, "T-1", (0.08, 0.14, 0.92, 0.75)),
    ("technician-figures.pdf", 2, "T-2", (0.08, 0.14, 0.92, 0.75)),
    ("technician-figures.pdf", 3, "T-3", (0.08, 0.14, 0.92, 0.75)),
    ("general-figures.pdf", 1, "G7-1", (0.17, 0.17, 0.90, 0.72)),
    ("extra-figures.pdf", 1, "E5-1", frac(36, 128, 268, 322, *A4)),
    ("extra-figures.pdf", 1, "E6-1", frac(312, 128, 276, 322, *A4)),
    ("extra-figures.pdf", 1, "E6-2", frac(36, 462, 268, 318, *A4)),
    ("extra-figures.pdf", 1, "E6-3", frac(312, 462, 276, 318, *A4)),
    ("extra-figures.pdf", 2, "E7-1", frac(36, 128, 268, 322, *A4)),
    ("extra-figures.pdf", 2, "E7-2", frac(312, 128, 276, 322, *A4)),
    ("extra-figures.pdf", 2, "E7-3", frac(36, 462, 268, 318, *A4)),
    ("extra-figures.pdf", 3, "E9-1", frac(36, 128, 268, 322, *A4)),
    ("extra-figures.pdf", 3, "E9-2", frac(312, 128, 276, 322, *A4)),
    ("extra-figures.pdf", 3, "E9-3", frac(36, 462, 268, 330, *A4)),
]

with tempfile.TemporaryDirectory() as tmp:
    for pdf, page, fid, (x0, y0, x1, y1) in JOBS:
        src = ROOT / "data-src" / pdf
        out = pathlib.Path(tmp) / f"{fid}.svg"
        subprocess.run(["pdftocairo", "-svg", "-f", str(page), "-l", str(page), str(src), str(out)], check=True)
        svg = out.read_text()
        m = re.search(r"<svg[^>]*>", svg)
        root = m.group(0)
        vb = re.search(r'viewBox="([\d.\s-]+)"', root)
        W, H = (float(vb.group(1).split()[2]), float(vb.group(1).split()[3])) if vb else (
            float(re.search(r'width="([\d.]+)', root).group(1)), float(re.search(r'height="([\d.]+)', root).group(1)))
        cx, cy, cw, ch = x0 * W, y0 * H, (x1 - x0) * W, (y1 - y0) * H
        new_root = re.sub(r'\s(width|height|viewBox)="[^"]*"', "", root)
        new_root = new_root.replace("<svg", f'<svg width="{cw:.1f}" height="{ch:.1f}" viewBox="{cx:.1f} {cy:.1f} {cw:.1f} {ch:.1f}"', 1)
        (OUT / f"{fid}.svg").write_text(svg.replace(root, new_root, 1))
        print(f"{fid}: page {page} {W:.0f}x{H:.0f} -> crop {cw:.0f}x{ch:.0f}")
