from __future__ import annotations

import json
import os
import sys
from io import BytesIO
from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


PROJECT = Path(__file__).resolve().parents[1]
SLIDES = Path(os.environ.get("AVDAR_SLIDES_DIR", str(PROJECT / "slides")))
DEFAULT_OUTPUT = PROJECT / "output" / "pdf" / "Avdar_Market_Research_Steppe_Modernism_v6_2026-09-16.pdf"
LINK_MAP = Path(os.environ.get("AVDAR_LINK_MAP_PATH", str(PROJECT / "output" / "links.json")))
PAGE_SIZE = (960, 540)
SLIDE_SIZE = (1920, 1080)


def main() -> None:
    output = Path(sys.argv[1]).expanduser().resolve() if len(sys.argv) > 1 else DEFAULT_OUTPUT
    images = sorted(SLIDES.glob("slide-*.png"))
    if not images:
        raise SystemExit("Нет отрендеренных слайдов")

    links_by_slide: dict[int, list[dict[str, object]]] = {}
    if LINK_MAP.exists():
        for item in json.loads(LINK_MAP.read_text(encoding="utf-8")):
            links_by_slide[int(item["slide"])] = item.get("links", [])

    output.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(output), pagesize=PAGE_SIZE, pageCompression=1)
    pdf.setTitle("Где начинать продажи — исследование европейских рынков")
    pdf.setAuthor("Исследовательская команда")
    pdf.setSubject("Рынки, ассортимент, примеры брендов и сценарий запуска")

    scale_x = PAGE_SIZE[0] / SLIDE_SIZE[0]
    scale_y = PAGE_SIZE[1] / SLIDE_SIZE[1]

    for page_index, image_path in enumerate(images, start=1):
        with Image.open(image_path) as source:
            rgb = source.convert("RGB")
            buffer = BytesIO()
            rgb.save(buffer, format="JPEG", quality=95, subsampling=0, optimize=True)
            buffer.seek(0)
            pdf.drawImage(ImageReader(buffer), 0, 0, width=PAGE_SIZE[0], height=PAGE_SIZE[1])
            for item in links_by_slide.get(page_index, []):
                left = float(item["left"])
                top = float(item["top"])
                width = float(item["width"])
                height = float(item["height"])
                x1 = left * scale_x
                x2 = (left + width) * scale_x
                y1 = PAGE_SIZE[1] - (top + height) * scale_y
                y2 = PAGE_SIZE[1] - top * scale_y
                pdf.linkURL(str(item["href"]), (x1, y1, x2, y2), relative=0, thickness=0)
            pdf.showPage()

    pdf.save()
    link_count = sum(len(items) for items in links_by_slide.values())
    print(f"{output}\npages={len(images)}\nlinks={link_count}")


if __name__ == "__main__":
    main()
