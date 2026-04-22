#!/usr/bin/env python3
from pathlib import Path
import argparse
import json
import re
import subprocess


def slug(name: str) -> str:
    s = name.lower()
    s = re.sub(r"\.[a-z0-9]+$", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "image"


def run() -> None:
    parser = argparse.ArgumentParser(description="Generate responsive optimized gallery images.")
    parser.add_argument("--source", required=True, help="Source directory containing photos")
    parser.add_argument(
        "--out",
        default="/Users/shayamsundar/Projects/zareqia.com/zareqia.com/gallery-optimized",
        help="Output directory",
    )
    parser.add_argument(
        "--widths",
        default="800,1200,1600",
        help="Comma-separated widths, e.g. 800,1200,1600",
    )
    parser.add_argument("--quality", default="82", help="JPEG quality (0-100)")
    args = parser.parse_args()

    src = Path(args.source)
    out = Path(args.out)
    widths = [int(w.strip()) for w in args.widths.split(",") if w.strip()]
    quality = str(args.quality)

    if not src.exists() or not src.is_dir():
        raise SystemExit(f"Source directory not found: {src}")

    out.mkdir(parents=True, exist_ok=True)
    for p in out.glob("*.jpg"):
        p.unlink()
    manifest_path = out / "manifest.json"
    if manifest_path.exists():
        manifest_path.unlink()

    allowed = {".jpg", ".jpeg", ".png", ".heic", ".JPG", ".JPEG", ".PNG", ".HEIC"}
    files = sorted([p for p in src.iterdir() if p.is_file() and p.suffix in allowed])

    manifest = []
    for idx, f in enumerate(files, 1):
        base = f"{idx:02d}-{slug(f.name)}"
        variants = []
        for w in widths:
            out_file = out / f"{base}-{w}.jpg"
            cmd = [
                "sips",
                "-s",
                "format",
                "jpeg",
                "-s",
                "formatOptions",
                quality,
                "-Z",
                str(w),
                str(f),
                "--out",
                str(out_file),
            ]
            subprocess.run(cmd, check=True, capture_output=True)
            variants.append({"width": w, "path": f"/gallery-optimized/{out_file.name}"})
        manifest.append(
            {
                "id": base,
                "original": str(f),
                "variants": variants,
                "default": variants[min(1, len(variants) - 1)]["path"],
            }
        )

    manifest_path.write_text(
        json.dumps(
            {
                "source": str(src),
                "count": len(manifest),
                "recommended_for_slider": [m["default"] for m in manifest],
                "images": manifest,
            },
            indent=2,
        )
    )
    print(f"Processed {len(manifest)} images into {out}")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    run()
