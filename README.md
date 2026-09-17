# Исследование рынков шерстяных изделий

Рабочие материалы исследования семи европейских рынков и кодовая презентация. В репозитории сохранены исходники, таблицы и заметки исследования, собранные визуальные референсы, а также итоговый PDF. Временные рендеры и предыдущие версии PDF не включены; их можно восстановить из исходников.

## Где что лежит

- `presentation/steppe_modernism/src/` — HTML, CSS и данные презентации. Текущая версия собирается из `index-v9.html`, `deck-v9.js`, `country-data-v9.js`, `market-presence-v14.js` и `channel-data-v16.js`.
- `presentation/steppe_modernism/scripts/` — рендер слайдов и сборка PDF.
- `presentation/steppe_modernism/output/pdf/Market_Launch_Research_v17_2026-09-17.pdf` — итоговая клиентская презентация с кликабельными ссылками, включая кейсы Quince и SOXS.
- `presentation/work/` — рабочие проверки, выборки и заметки по презентации.
- `research_assets/` — источники, таблицы наблюдений и скриншоты референсов.
- `Avdar_Market_Deep_Research_2026-09-14.docx` — более ранний исследовательский отчёт, сохранённый как архив.

Основная рабочая таблица и шпаргалка к звонку находятся в Google Drive и не хранятся в этом репозитории. Ссылки на них приведены в материалах проекта.

## Сборка презентации

Нужны Python с `Pillow` и `reportlab`, Node.js с `playwright`, а также Google Chrome. Команды выполняются из `presentation/steppe_modernism`:

```bash
AVDAR_HTML_PATH="$PWD/src/index-v9.html" \
AVDAR_SLIDES_DIR="$PWD/output/v17_slides" \
AVDAR_LINK_MAP_PATH="$PWD/output/v17_links.json" \
node scripts/render.mjs

AVDAR_SLIDES_DIR="$PWD/output/v17_slides" \
AVDAR_LINK_MAP_PATH="$PWD/output/v17_links.json" \
python3 scripts/assemble_pdf.py "$PWD/output/pdf/Market_Launch_Research_v17_2026-09-17.pdf"
```

PDF фиксирует состояние исследования на момент подготовки. Цены, объявления, счётчики соцсетей и наличие товаров требуют повторной проверки перед запуском продаж.
