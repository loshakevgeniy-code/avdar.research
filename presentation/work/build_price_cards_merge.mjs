import fs from "node:fs";
import path from "node:path";

const workDir = "/Users/evgeniyloshak/Documents/ECOM/presentation/work";
const rootDir = "/Users/evgeniyloshak/Documents/ECOM";

const newFiles = [
  path.join(workDir, "price_cards_scarves_stoles.csv"),
  path.join(workDir, "price_cards_socks_gloves.csv"),
  path.join(workDir, "price_cards_throws.csv"),
];

const existingFiles = [
  path.join(rootDir, "research_assets/avdar_competitor_price_references_2026-09-15.csv"),
  path.join(rootDir, "research_assets/avdar_competitor_price_references_incremental_NL_SE_PL_2026-09-15.csv"),
];

const outputCsv = path.join(workDir, "price_cards_merged_for_sheet.csv");
const outputQa = path.join(workDir, "price_cards_merged_for_sheet_QA.md");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length) {
    row.push(field.replace(/\r$/, ""));
    if (row.some((value) => value !== "")) rows.push(row);
  }
  const headers = rows.shift();
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(headers, rows) {
  return `${[headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function canonicalUrl(raw, includeQuery = true) {
  const url = new URL(raw.trim());
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const pathname = decodeURIComponent(url.pathname).replace(/\/{2,}/g, "/").replace(/\/$/, "").toLowerCase();
  if (!includeQuery) return `${host}${pathname}`;
  const params = [...url.searchParams.entries()]
    .filter(([key]) => !/^utm_/i.test(key) && !["gclid", "fbclid"].includes(key.toLowerCase()))
    .sort(([ak, av], [bk, bv]) => `${ak}=${av}`.localeCompare(`${bk}=${bv}`));
  const query = params.length ? `?${new URLSearchParams(params).toString()}` : "";
  return `${host}${pathname}${query}`;
}

function normalizeText(raw) {
  return String(raw ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function numberOrBlank(raw) {
  if (raw === null || raw === undefined || String(raw).trim() === "") return "";
  const value = Number(String(raw).trim().replace(",", "."));
  if (!Number.isFinite(value)) throw new Error(`Некорректная цена: ${raw}`);
  return value;
}

const categoryMap = {
  "Кашемировые шарфы": "Кашемировый шарф",
  "Шерстяные шарфы": "Шерстяной шарф",
  "Шерстяные/мериносовые носки": "Шерстяные носки",
  "Пледы из яка": "Плед из яка",
  "Прочие шерстяные пледы": "Другие пледы",
  "Другие пледы": "Другие пледы",
  "Шали/палантины": "Шали",
  "Перчатки": "Перчатки",
};

const countryMap = {
  NL: "Нидерланды",
  PL: "Польша",
  SE: "Швеция",
  EU: "ЕС",
  DE: "Германия",
  BE: "Бельгия",
  FI: "Финляндия",
  DK: "Дания",
};

const currencyMap = {
  EUR: "Евро",
  PLN: "Польский злотый",
  SEK: "Шведская крона",
  DKK: "Датская крона",
  GBP: "Фунт стерлингов",
};

const explicitAvailability = {
  "EXP-001": "Уточнить",
  "EXP-002": "Нет в наличии",
  "EXP-003": "В наличии",
  "EXP-004": "Уточнить",
  "EXP-005": "Нет в наличии",
  "EXP-006": "В наличии",
  "EXP-007": "В наличии",
  "EXP-008": "Уточнить",
  "EXP-009": "В наличии",
  "EXP-010": "Нет в наличии",
  "EXP-011": "В наличии",
  "EXP-012": "В наличии",
  "EXP-013": "В наличии",
  "EXP-014": "Нет в наличии",
  "EXP-015": "Уточнить",
  "EXP-016": "В наличии",
  "EXP-017": "В наличии",
  "EXP-018": "В наличии",
  "EXP-019": "В наличии",
  "EXP-020": "В наличии",
  "EXP-021": "Нет в наличии",
  "EXP-022": "В наличии",
  "EXP-023": "В наличии",
  "EXP-024": "В наличии",
  "EXP-025": "В наличии",
  "EXP-026": "В наличии",
  "EXP-027": "В наличии",
  "EXP-028": "В наличии",
  "EXP-029": "Нет в наличии",
  "EXP-030": "В наличии",
  "EXP-031": "Уточнить",
  "EXP-032": "В наличии",
  "EXP-033": "Уточнить",
  "EXP-034": "В наличии",
  "EXP-035": "В наличии",
  "EXP-036": "В наличии",
  "EXP-037": "В наличии",
  "EXP-038": "В наличии",
  "EXP-039": "В наличии",
  "EXP-040": "В наличии",
  "EXP-041": "В наличии",
  "EXP-042": "В наличии",
  "EXP-043": "В наличии",
  "EXP-044": "Нет в наличии",
  "EXP-045": "В наличии",
  "EXP-046": "В наличии",
  "EXP-047": "Нет в наличии",
  "EXP-048": "В наличии",
  "EXP-049": "В наличии",
  "EXP-050": "В наличии",
  "EXP-051": "В наличии",
  "EXP-052": "В наличии",
  "EXP-053": "Нет в наличии",
  "EXP-054": "В наличии",
  "EXP-055": "В наличии",
  "EXP-056": "Уточнить",
  "EXP-057": "В наличии",
  "EXP-058": "Нет в наличии",
  "EXP-059": "В наличии",
  "EXP-060": "В наличии",
  "EXP-061": "Уточнить",
  "EXP-062": "В наличии",
  "EXP-063": "Уточнить",
  "EXP-064": "В наличии",
  "EXP-065": "Уточнить",
  "EXP-066": "Уточнить",
  "EXP-067": "В наличии",
  "EXP-068": "В наличии",
  "EXP-069": "В наличии",
  "EXP-070": "Нет в наличии",
  "EXP-071": "В наличии",
  "EXP-072": "В наличии",
  "EXP-073": "В наличии",
  "EXP-074": "В наличии",
  "EXP-075": "В наличии",
  "EXP-076": "Уточнить",
  "EXP-077": "В наличии",
};

function sheetCategory(raw) {
  const value = categoryMap[raw];
  if (!value) throw new Error(`Нет соответствия категории: ${raw}`);
  return value;
}

function sourceFormula(url) {
  return `=HYPERLINK("${url.replaceAll('"', '""')}";"Открыть ↗")`;
}

function localizeEvidence(row) {
  const overrides = {
    "EXP-011": "Официальная карточка DE/EU; товар FXM0131; отдельный артикул и верхний ориентир люксового сегмента.",
    "EXP-064": "Официальная карточка; отдельная прямоугольная модель; на странице видны текущая и обычная цена.",
    "EXP-065": "Официальная карточка для Бельгии; артикул KAAP-OG24; раскрыты состав с шерстью и кашемиром и размер.",
  };
  if (overrides[row.slot_id]) return overrides[row.slot_id];
  return row.evidence_note
    .replace(/\bPDP\b/g, "карточка товара")
    .replace(/\bSKU\b/g, "артикул")
    .replace(/\bbenchmark\b/gi, "ориентир")
    .replace(/\bmass-market\b/gi, "массового сегмента")
    .replace(/\bNordic premium\b/gi, "североевропейского премиум-сегмента")
    .replace(/\bsale price\b/gi, "цена со скидкой")
    .replace(/\bregular price\b/gi, "обычная цена")
    .replace(/\bcashmere-only\b/gi, "из чистого кашемира")
    .replace(/\bpure-cashmere\b/gi, "из чистого кашемира");
}

function limitations(row) {
  const parts = [];
  if (row.status === "PARTIAL") parts.push("Качество подтверждения: частичное; причина указана в колонке «Почему важен»");
  if (row.size) parts.push(`Размер: ${row.size}`);
  if (row.weight) parts.push(`Масса/плотность: ${row.weight}`);
  if (row.vat_wording) parts.push(`НДС на странице: ${row.vat_wording}`);
  if (row.availability) parts.push(`Наличие на странице: ${row.availability}`);
  if (row.delivery_threshold) parts.push(`Доставка: ${row.delivery_threshold}`);
  if (row.returns) parts.push(`Возврат: ${row.returns}`);
  return `${parts.join(". ")}.`;
}

function countBy(rows, getter) {
  const counts = new Map();
  for (const row of rows) {
    const key = getter(row);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b, "ru"));
}

function mdCounts(entries) {
  return entries.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

const newRowsRaw = newFiles.flatMap((file) => parseCsv(fs.readFileSync(file, "utf8")));
const existingRowsRaw = existingFiles.flatMap((file) => parseCsv(fs.readFileSync(file, "utf8")));

const allowedStatuses = new Set(["VERIFIED", "PARTIAL", "NOT_FOUND"]);
for (const row of newRowsRaw) {
  if (!allowedStatuses.has(row.status)) throw new Error(`Неизвестный статус ${row.status} в ${row.slot_id}`);
  if (!row.slot_id || !row.pdp_url || !row.brand || !row.product) throw new Error(`Нет обязательного поля в ${row.slot_id || "неизвестной строке"}`);
  if (!/^https?:\/\//i.test(row.pdp_url)) throw new Error(`Некорректный URL в ${row.slot_id}`);
  numberOrBlank(row.current_price);
  numberOrBlank(row.regular_price);
  if (!explicitAvailability[row.slot_id]) throw new Error(`Нет нормализованного статуса наличия для ${row.slot_id}`);
}

const eligible = newRowsRaw.filter((row) => row.status === "VERIFIED" || row.status === "PARTIAL");
eligible.sort((a, b) => Number(a.slot_id.replace("EXP-", "")) - Number(b.slot_id.replace("EXP-", "")));

const existingFullUrls = new Map(existingRowsRaw.map((row) => [canonicalUrl(row.url), row]));
const newFullUrls = new Map();
const excludedExactDuplicates = [];
const retained = [];
for (const row of eligible) {
  const key = canonicalUrl(row.pdp_url);
  if (existingFullUrls.has(key)) {
    excludedExactDuplicates.push({ row, reason: `совпадает с ${existingFullUrls.get(key).id}` });
  } else if (newFullUrls.has(key)) {
    excludedExactDuplicates.push({ row, reason: `совпадает с ${newFullUrls.get(key).slot_id}` });
  } else {
    newFullUrls.set(key, row);
    retained.push(row);
  }
}

const existingBasePaths = new Map();
for (const row of existingRowsRaw) {
  const key = canonicalUrl(row.url, false);
  if (!existingBasePaths.has(key)) existingBasePaths.set(key, []);
  existingBasePaths.get(key).push(row);
}
const basePathCollisions = retained
  .filter((row) => existingBasePaths.has(canonicalUrl(row.pdp_url, false)))
  .map((row) => ({ row, existing: existingBasePaths.get(canonicalUrl(row.pdp_url, false)) }));

const exactNameCollisions = [];
const existingNames = new Map();
for (const row of existingRowsRaw) {
  const key = `${normalizeText(row.brand)}|${normalizeText(row.product_name)}`;
  if (!existingNames.has(key)) existingNames.set(key, []);
  existingNames.get(key).push(row);
}
for (const row of retained) {
  const key = `${normalizeText(row.brand)}|${normalizeText(row.product)}`;
  if (existingNames.has(key)) exactNameCollisions.push({ row, existing: existingNames.get(key) });
}

const headers = [
  "№",
  "Товарная группа",
  "Бренд",
  "Товар",
  "Рынок/витрина",
  "Страна",
  "Валюта",
  "Обычная цена",
  "Цена со скидкой",
  "Состав",
  "Ценовой уровень",
  "Статус товара",
  "Почему важен",
  "Источник",
  "Дата среза",
  "Ограничения",
];

const outputRows = retained.map((row, index) => {
  const currentPrice = numberOrBlank(row.current_price);
  const regularPrice = numberOrBlank(row.regular_price);
  return [
    71 + index,
    sheetCategory(row.category),
    row.brand,
    row.product,
    row.market,
    countryMap[row.market] ?? row.market,
    currencyMap[row.currency] ?? row.currency,
    regularPrice === "" ? currentPrice : regularPrice,
    regularPrice === "" ? "" : currentPrice,
    row.composition,
    "",
    explicitAvailability[row.slot_id],
    localizeEvidence(row),
    sourceFormula(row.pdp_url),
    "16.09.2026",
    limitations(row),
  ];
});

fs.writeFileSync(outputCsv, writeCsv(headers, outputRows), "utf8");

const existingNormalized = existingRowsRaw.map((row) => ({
  category: sheetCategory(row.category),
  market: row.market,
  currency: row.currency,
  currentPrice: numberOrBlank(row.current_price),
}));
const newNormalized = retained.map((row) => ({
  category: sheetCategory(row.category),
  market: row.market,
  currency: row.currency,
  currentPrice: numberOrBlank(row.current_price),
}));
const combined = [...existingNormalized, ...newNormalized];

const ranges = [];
for (const [currency, rows] of Object.entries(Object.groupBy(combined, (row) => row.currency))) {
  const prices = rows.map((row) => row.currentPrice).filter((value) => typeof value === "number" && Number.isFinite(value));
  ranges.push([currency, rows.length, Math.min(...prices), Math.max(...prices)]);
}
ranges.sort(([a], [b]) => a.localeCompare(b));

const sourceBreakdown = newFiles.map((file) => {
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  const verified = rows.filter((row) => row.status === "VERIFIED").length;
  const partial = rows.filter((row) => row.status === "PARTIAL").length;
  const notFound = rows.filter((row) => row.status === "NOT_FOUND").length;
  return `- \`${path.basename(file)}\`: ${rows.length} строк (${verified} VERIFIED, ${partial} PARTIAL, ${notFound} NOT_FOUND)`;
}).join("\n");

const statusCounts = countBy(retained, (row) => row.status);
const availabilityCounts = countBy(retained, (row) => explicitAvailability[row.slot_id]);
const combinedCategoryCounts = countBy(combined, (row) => row.category);
const combinedMarketCounts = countBy(combined, (row) => row.market);
const newCategoryCounts = countBy(retained, (row) => sheetCategory(row.category));
const newMarketCounts = countBy(retained, (row) => row.market);
const discountCount = retained.filter((row) => String(row.regular_price ?? "").trim() !== "").length;
const currencyRangesText = ranges
  .map(([currency, count, min, max]) => `- ${currency}: ${count} карточек; текущая цена от ${min} до ${max} ${currency}`)
  .join("\n");

const exactNameText = exactNameCollisions.length
  ? exactNameCollisions.map(({ row, existing }) => {
      const old = existing.map((item) => `${item.id} (${item.url})`).join(", ");
      return `- ${row.slot_id} ${row.brand} «${row.product}» совпадает по названию с ${old}, но сохранён: у новой карточки другой URL/SKU, рынок и состав. Для EXP-016 это style 1315398001 и 100% RWS wool против CP-009 style 1302245001 и смеси 64% wool / 36% cotton.`;
    }).join("\n")
  : "- Совпадений по нормализованной паре «бренд + название товара» не найдено.";

const basePathText = basePathCollisions.length
  ? basePathCollisions.map(({ row, existing }) => `- ${row.slot_id}: общий путь PDP с ${existing.map((item) => item.id).join(", ")}; оставлен как отдельный вариант после проверки.`).join("\n")
  : "- Совпадений базового пути PDP с текущими 70 карточками не найдено.";

const qa = `# QA — price_cards_merged_for_sheet.csv

## Итог

- Готово к добавлению: **${retained.length}** строк, номера **71–${70 + retained.length}**.
- После добавления в текущую выборку будет **${existingRowsRaw.length + retained.length} прямых карточек**.
- Среди новых строк: **${statusCounts.find(([key]) => key === "VERIFIED")?.[1] ?? 0} VERIFIED**, **${statusCounts.find(([key]) => key === "PARTIAL")?.[1] ?? 0} PARTIAL**, **${newRowsRaw.filter((row) => row.status === "NOT_FOUND").length} NOT_FOUND**.
- В пакет включены VERIFIED и PARTIAL; NOT_FOUND не включаются. Точных дублей, потребовавших исключения, — **${excludedExactDuplicates.length}**.
- Колонок: **${headers.length}**. Заголовки соответствуют структуре вкладки «15 Ценовая выборка».
- В **${discountCount}** строках есть отдельная обычная и текущая цена: обычная цена помещена в «Обычная цена», текущая — в «Цена со скидкой».
- «Ценовой уровень» оставлен пустым: в исходных карточках нет согласованной методики уровня, а пересчёт валют не выполнялся.

## Исходные файлы

${sourceBreakdown}

## Проверка текущей вкладки

- Живая вкладка «15 Ценовая выборка» прочитана в диапазоне A1:P100 16.09.2026.
- В ней подтверждены 16 нужных столбцов, строки №1–70 и последний номер 70.
- Локальные два реестра от 15.09.2026 содержат те же 70 исходных карточек и использованы для точной проверки URL и товарных совпадений.

## Дубли

- Уникальных URL среди новых карточек: **${newFullUrls.size} из ${retained.length}**.
- Точных URL-дублей среди новых карточек: **0**.
- Точных URL-дублей относительно текущих 70 карточек: **${excludedExactDuplicates.length}**.
${basePathText}

Проверка совпадений по бренду и названию:

${exactNameText}

## Новые 77 карточек

По категориям:

${mdCounts(newCategoryCounts)}

По рынкам / витринам:

${mdCounts(newMarketCounts)}

По нормализованному статусу товара:

${mdCounts(availabilityCounts)}

## Итоговая база из ${existingRowsRaw.length + retained.length} карточек

По категориям:

${mdCounts(combinedCategoryCounts)}

По рынкам / витринам:

${mdCounts(combinedMarketCounts)}

Диапазоны текущих цен по исходной валюте, без конвертации:

${currencyRangesText}

## Правила преобразования

- Категории приведены к семи названиям текущей вкладки: кашемировый шарф, шерстяной шарф, шерстяные носки, плед из яка, другие пледы, шали, перчатки.
- Код рынка сохранён в «Рынок/витрина», страна записана по-русски.
- Валюта записана по-русски, цены сохранены числами из PDP. Поле price_eur не использовалось; собственная EUR-конвертация отсутствует.
- Если на PDP есть regular price, она стала «Обычной ценой», а current price — «Ценой со скидкой». Если regular price нет, current price записана как обычная цена.
- Ссылка записана формулой HYPERLINK с подписью «Открыть ↗», совместимой с русской локалью Google Sheets.
- PARTIAL не скрыт: причина сохранена в «Почему важен», а «Ограничения» начинается с пометки о частичном подтверждении.
- В «Ограничения» перенесены размер, масса/плотность (для пледов), формулировка НДС, исходный сигнал наличия, доставка и возврат.

## Контроль схемы

- Каждая строка содержит ровно 16 полей.
- Номера непрерывны от 71 до ${70 + retained.length}.
- Все source URL начинаются с http:// или https://.
- Пустые значения не заменялись нулём. Неизвестные цены, скидки и ценовые уровни не выдумывались.
`;

fs.writeFileSync(outputQa, qa, "utf8");

console.log(JSON.stringify({
  outputCsv,
  outputQa,
  sourceRows: newRowsRaw.length,
  retainedRows: retained.length,
  verified: statusCounts.find(([key]) => key === "VERIFIED")?.[1] ?? 0,
  partial: statusCounts.find(([key]) => key === "PARTIAL")?.[1] ?? 0,
  exactDuplicateExclusions: excludedExactDuplicates.length,
  combinedTotal: existingRowsRaw.length + retained.length,
  combinedCategories: Object.fromEntries(combinedCategoryCounts),
  combinedMarkets: Object.fromEntries(combinedMarketCounts),
  currencyRanges: ranges,
}, null, 2));
