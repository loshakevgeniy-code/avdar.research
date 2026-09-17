# Avdar Market — Google Trends deep dive

**Статус:** decision-grade read-only исследование  
**Дата доступа:** 14 сентября 2026 года, Europe/Moscow  
**Основной источник:** официальный Google Trends Explore  
**Ассортимент:** Google Sheet «Исследование Avdar Market», лист «01 Product Master»  
**Рынки:** DE, NL, BE, DK, SE, FI, PL; NO и ES как benchmarks  
**Изменения в master Sheet:** не вносились

## Executive conclusion

Google Trends поддерживает две главные acquisition families Avdar: **шерстяные носки** и **овечьи шерстяные пледы/одеяла**. Они дают наиболее повторяемый многолетний сигнал почти во всех целевых рынках. **Кашемировый шарф** — не общеевропейский универсальный драйвер: высокий приоритет у DE и PL, тестовый — у DK, условный — у NL и BE, а данные SE и FI не подтверждают заявленный HYPD volume.

Практическое решение:

1. Строить paid-search и SEO ядро вокруг wool socks и sheep-wool blanket/throw.
2. Масштабировать cashmere scarf прежде всего в DE и PL; в DK — ограниченный тест; в NL/BE — только локализованный эксперимент.
3. Gloves и wool shawls использовать как attach/cross-sell; camel, yak и cashmere blankets — как halo/PDP/remarketing, а не как самостоятельные search-acquisition families.
4. Не покупать трафик на exact gift/bundle terms: Google Trends почти везде не видит устойчивого ряда. Подарочность лучше выражать в мерчандайзинге вокруг уже существующего category demand.
5. Не запускать media для yak socks до подтверждения запаса: в Product Master их количество равно нулю, а Trends-сигнал ниже разрешения.

## 1. Ассортимент: 45 SKU без размножения цветов

Группировка выполнена по material × product family, а не по цвету. В Product Master найдено 45 SKU.

| Search-distinct family | SKU | Текущий qty | Комментарий |
|---|---:|---:|---|
| Cashmere scarf | 6 | 49 | 100% cashmere, 30×180 |
| Wool scarf | 3 | 28 | 100% wool, 30×180 |
| Wool socks | 15 | 234 | 7 short + 8 long; 113 + 121 ед. |
| Yak socks | 2 | 0 | Не готово к платному launch |
| Wool gloves | 4 | 13 | 100% wool, one size |
| Camel shawl | 1 | 7 | 100% camel wool, 70×180 |
| Wool shawl | 2 | 5 | 100% wool, 130×130 |
| Sheep-wool blanket/throw | 9 | 33 | 100% sheep wool, 150×200 |
| Yak blanket | 1 | 5 | 100% yak wool, 140×180 |
| Cashmere blanket | 2 | 6 | 100% cashmere, 120×180 |
| Gift/bundle concept | 0 dedicated SKU | — | Cross-cutting merchandising concept |

Отдельной yak scarf SKU в master нет. Запросы по yak scarf были проверены только как ассортиментный benchmark и не включены в план запуска.

## 2. Методика

### 2.1 Источники и доступ

- Product Master и HYPD слой прочитаны read-only из [Google Sheet](https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit): листы «01 Product Master» и «06 Keywords»; для HYPD использован блок A35:P100.
- Прямой программный запрос к Google Trends вернул HTTP 429. После этого сбор выполнялся через официальный интерфейс [Google Trends Explore](https://trends.google.com/trends/explore) в Chrome/CUA. Это не сторонний Trends provider.
- Проверены окна today 5-y, today 12-m и today 3-m; Web Search, all categories, country geography. Пятилетний и годовой ряды представлены неделями, 90-дневный — днями.
- Для сравнений использовались локальные search terms. Внутри одного comparison item оператор + объединял близкие варианты как OR; панели ограничены пятью comparison items. Один anchor повторялся между панелями, где это было возможно.
- Google Shopping и YouTube Search проверялись только для core/high-signal families. Массовые нулевые exact-комбинации не добивались механически.
- Для BE объединялись NL/FR варианты. Из-за двуязычной фрагментации выводы BE имеют более низкую точность.

### 2.2 Как читать индекс

Google Trends не показывает абсолютный search volume. По официальной методике Google выборка реальных запросов нормализуется отдельно по географии и времени, а максимальная точка панели получает 100. Низкочастотный запрос может отображаться как 0, хотя единичный спрос существует. Одинаковый индекс в двух странах не означает одинаковое число запросов. Источники: [FAQ about Google Trends data](https://support.google.com/trends/answer/4365533?hl=en), [Interest by region](https://support.google.com/trends/answer/4355212?hl=en), [Search terms and topics](https://support.google.com/trends/answer/17309543).

Поэтому:

- индексы из разных панелей и периодов не складываются и не переводятся в searches/month;
- 0 означает «ниже разрешения выбранной выборки», а не доказанный нулевой рынок;
- редкий единичный пик без повторения считается sampling noise;
- последний день/неделя 90d может быть неполным и не используется как самостоятельный сигнал;
- повторный запуск может немного изменить значения из-за sampling.

Дополнительная аналитическая метрика — доля временных точек с index > 0. Это не официальный показатель Google, а диагностический способ отличить recurring series от одиночных всплесков.

### 2.3 Легенда decision matrix

- **H** — устойчивый recurring ряд: обычно ≥50% недель non-zero либо непрерывный сильный 12m ряд.
- **M** — 20–49% недель non-zero.
- **L** — 2–19% недель non-zero.
- **0** — <2%, isolated noise или ниже разрешения.
- **↑** — устойчивое предсезонное восстановление в 90d.
- **·** — flat/noisy; устойчивого движения нет.

Тройка в ячейке означает **5y / 12m / 90d**. Это ordinal signal tier, не абсолютный размер рынка.

## 3. Core matrix: 11 families × 7 markets

| Family | DE | NL | BE | DK | SE | FI | PL |
|---|---|---|---|---|---|---|---|
| Cashmere scarf | M / M / ↑ | L / L / · | 0 / L / · | M / M / · | L / L / 0¹ | 0 / 0 / 0 | M / M / ↑ |
| Wool scarf | H / H / ↑ | M / M / · | L / L / · | L / L / · | L / L / 0¹ | L / L / · | M / M / ↑ |
| Wool socks | H / H / ↑ | H / H / ↑² | M / M / · | M / H / ↑ | H / H / ↑ | H / H / ↑² | M / M / ↑ |
| Yak socks | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / L / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / L / 0 |
| Wool gloves | M / M / 0 | L / L / · | 0 / 0 / · | 0 / 0 / 0 | 0 / 0 / · | 0 / 0 / 0 | M / M / · |
| Camel shawl | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Wool shawl | L / M / · | 0 / L / · | 0 / 0 / · | 0 / 0 / · | 0 / 0 / · | 0 / 0 / · | L / M / · |
| Sheep-wool blanket/throw | H / H / ↑² | H / H / ↑ | L / L / ·³ | H / H / ↑ | H / H / ↑ | L / L / ↑ | H / H / ↑ |
| Yak blanket | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Cashmere blanket | 0 / L / · | 0 / L / 0 | 0 / 0 / · | 0 / L / · | 0 / 0 / 0 | 0 / 0 / · | 0 / 0 / · |
| Gift/bundle exact | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |

¹ Шведские составные слова чувствительны к написанию. Для cashmere exact kashmirhalsduk был non-zero только в 0.8% пятилетних недель; order/spacing variants дали 8–10%. Для wool exact ullhalsduk — 1.5%, варианты halsduk ull / ull halsduk — 16–17%. Это повышает оценку с 0 до L, но не делает категорию массовой.

² У отдельных dynamic panels Google UI не загрузил устойчивую таблицу при повторном обращении. Tier сохранён только там, где он подтверждается соседним периодом, последним сегментом 5y и HYPD; такие клетки имеют более низкую measurement confidence, чем полностью считанные панели.

³ BE blanket panel консервативен: related queries показывают более естественные формы couverture laine, couverture en laine и plaid wol вместо только plaid laine.

### 3.1 Измеренная опора для tiering

Проценты ниже — доля недель с index > 0. Они нужны для проверки устойчивости ряда, а не для сравнения market size.

| Market | Основные 5y показатели | Основные 12m показатели | Confidence |
|---|---|---|---|
| DE | wool scarf 56.9%; cashmere scarf 37.8%; wool socks 92.4%; gloves 22.5%; yak socks 1.1% | wool scarf 56.6%; cashmere 47.2%; socks 96.2%; gloves 26.4%; wool blanket 100%; cashmere blanket 5.7% | High по core; medium по blanket 5y |
| NL | wool scarf 38.5%; cashmere 8.8%; wool blanket 97.7%; cashmere blanket 1.5% | scarf 45.3%; cashmere 17.0%; socks 75.5%; gloves 13.2%; blanket 100% | High blanket; medium остальное |
| BE | wool scarf 5.0%; cashmere 1.9%; wool socks 20.2%; blanket phrase 2.7% | scarf 7.5%; cashmere 3.8%; socks 24.5%; blanket phrase 3.8% | Medium socks; low phrase-fragmented families |
| DK | wool scarf 7.6%; cashmere 21.0%; socks 42.0%; blanket 77.1% | scarf 11.3%; cashmere 30.2%; socks 56.6%; blanket 88.7%; cashmere blanket 5.7% | High core; medium cashmere scarf |
| SE | scarf variants 16–17%; cashmere variants 8–10%; socks 63.7%; blanket 93.5% | exact cashmere 1.9%; socks 66.0%; blanket 100% | High core; low exact premium wording |
| FI | wool scarf 6.9%; exact cashmere 0%; socks 100%; blanket 12.6% | wool scarf 7.5%; exact cashmere 0%; blanket 17.0% | High socks; medium blanket; high confidence cashmere is below Trends resolution |
| PL | wool scarf 26.7%; cashmere 29.8%; socks 44.7%; gloves 21.4%; blanket 73.7% | scarf 43.4%; cashmere 37.7%; socks 49.1%; gloves 28.3% | High |

## 4. Пять лет, 12 месяцев и 90 дней

### 5y: структурный спрос

- Wool socks и sheep-wool blanket/throw — единственные truly cross-market recurring families.
- Cashmere scarf устойчив в DE и PL; DK подходит для ограниченного теста. NL слабее, BE раздроблен по языкам, SE/FI ниже разрешения exact series.
- Wool scarf заметен в DE, NL и PL, но не равен cashmere opportunity во всех рынках.
- Gloves — attach family, прежде всего DE и PL.
- Yak socks, yak blankets, camel shawls и exact gift modifiers не формируют устойчивый самостоятельный ряд.

### 12m: подтверждение текущего цикла

Последний год сохраняет порядок категорий: wool socks/blankets лидируют, DE и PL поддерживают cashmere scarf, DK остаётся тестовым. Структурного прорыва редких premium-material terms не обнаружено. Улучшение cashmere в NL и DK относительно 5y не следует трактовать как market-size growth: каждый период нормализован отдельно.

### 90d: timing, а не sizing

К 14 сентября 2026 года видна предсезонная реактивация wool socks/blankets и шарфов в DE/PL, а также core wool в NL/DK/SE/FI. У low-volume terms встречались отдельные дневные пики, но без серийности; они исключены из решений. Лучшее operating window:

- август: indexation, landing pages, feed QA, creative production;
- конец сентября — октябрь: paid-search ramp;
- середина ноября — начало декабря: основной пик;
- декабрь — январь: tail для socks/blankets, с оглядкой на cut-off доставки.

Примеры повторяемости: DE wool scarf достигал 100 в неделю 4 декабря 2022, DE wool socks — 11 декабря 2022, NL wool blanket — 11 декабря 2022, FI wool socks — 5 декабря 2021, PL cashmere scarf и wool blanket — 23 ноября 2025. Устойчивые категории дают Q4/off-season lift примерно 3–8×; экстремальные ratios cashmere возникают из-за почти нулевого off-season denominator и не должны использоваться как forecast.

## 5. Rising и related queries

По официальному определению Google, Breakout означает рост более 5000%; это не абсолютный объём. Источник: [Related and rising searches](https://support.google.com/trends/answer/4355000?hl=en).

| Market | Family | Полезные rising/related terms |
|---|---|---|
| DE | Cashmere scarf | zwillingsherz +400%; kaschmirschal damen +60%; kaschmirschal schwarz +40% |
| DE | Wool scarf | wollschal kinder +100%; wollschal bunt +70% |
| DE | Wool socks | snocks +800%; merino socken damen +200%; alpaka socken +50%; merinowolle +40% |
| DE | Wool blanket | JYSK — Breakout; Klekks — Breakout; Arket +750%; wolldecke warm +450%; warme decke +120% |
| NL | Wool scarf | beige sjaal +160%; wollen trui +150% |
| NL | Wool socks | wollen trui +250%; alpaca wollen sokken +190%; alpaca sokken +170%; merino wollen sokken dames +90% |
| NL | Wool blanket | Hvid +1700%; Alwero +1350%; Wollies +750%; hvid deken +450% |
| NL | Gloves | schapenwollen handschoenen dames — Breakout |
| BE | Cashmere scarf | écharpe en cachemire homme — Breakout; C&A — Breakout; écharpe cachemire femme +80%; écharpe 100 cachemire +80% |
| BE | Wool scarf | wollen sjaal dames +90%; sjaal dames +70%; écharpe en laine femme +60% |
| BE | Wool socks | Calzedonia / falke wollen sokken dames / chaussettes thermiques — Breakout; HEMA women +250%; alpaca +190% |
| BE | Blanket wording | couverture laine +150%; couverture en laine +90%; plaid wol +40% |
| PL | Cashmere scarf | Ochnik — Breakout; Lidl-related term — Breakout; kaszmirowy komplet czapka i szalik +350%; male modifiers +70–100% |
| PL | Wool scarf | merino +250%; unaccented variant +170%; men +130%; women +60% |
| PL | Wool socks | merino phrasing +150–300%; kids +70% |
| PL | Wool blanket | merino +150%; 160×200 +120%; 200×220 +100%; ciepły/warm +100% |
| PL | Gloves | merino +170% |

Для DK, SE и FI выбранные exact panels не дали стабильного блока related queries. Это означает «not enough data в выбранной панели», а не отсутствие потребительского языка. Brand names из rising lists — конкурентный/исследовательский контекст, а не рекомендация использовать чужие trademarks в ads.

## 6. География внутри рынков

Региональный индекс — доля интереса внутри региона, а не число searches. Он полезен для test sequencing, но не для пропорционального распределения бюджета.

| Family | Market | Top relative-interest areas |
|---|---|---|
| Cashmere scarf | DE | Hamburg 100; Bremen 91; Berlin 75; Schleswig-Holstein 66; Rheinland-Pfalz 58 |
| Cashmere scarf | NL | Noord-Holland 100; Utrecht 100; Zeeland 87; Zuid-Holland 87; Drenthe 75 |
| Cashmere scarf | BE | Brussels 100; Flanders 83; Wallonia 83 |
| Cashmere scarf | DK | Capital Region 100; North Denmark 62; Central Denmark 61; Zealand 55; Southern Denmark 48 |
| Cashmere scarf | PL | Mazowieckie 100; Małopolskie 70; Pomorskie 70; Dolnośląskie 70; Podlaskie 64 |
| Wool socks | DE | Schleswig-Holstein 100; Hamburg 100; Bremen 85; Berlin 75; Baden-Württemberg 71 |
| Wool socks | NL | Utrecht 100; Groningen 97; Friesland 95; Drenthe 90; Gelderland 90 |
| Wool socks | BE | Flanders 100; Wallonia 84; Brussels 69 |
| Wool socks | FI | Kainuu 100; Central Ostrobothnia 96; Northern Ostrobothnia 90; Satakunta 88; Southern Ostrobothnia 88 |
| Wool socks | PL | Podlaskie 100; Pomorskie 96; Warmińsko-Mazurskie 93; Małopolskie 80; Mazowieckie 76 |

Вывод: cashmere чаще смещён к capital/urban regions; wool socks — к более холодным северным/периферийным регионам. SE и часть DK не дали устойчивой subregion table. FI cashmere subregion output был основан на единичных значениях и исключён как noise.

## 7. Google Shopping и YouTube Search

Проверка 5y high-signal panels не дала decision-grade второго слоя:

- Google Shopping: почти все terms были non-zero менее чем в 2% недель. Наиболее устойчивый наблюдавшийся ряд — DE Wolldecke, около 11.8% недель, с Q4 bias, но всё ещё слишком sparse для budget sizing.
- YouTube Search: все проверенные families ≤4.2% недель non-zero; DE Wolldecke около 4.2%, FI villasukat около 2.7%, остальные в основном 0–1.5%.

Это **не** означает отсутствия покупок или видеоинтереса. Trends sampling для меньших verticals слишком груб. Shopping decisions следует валидировать через Merchant Center/Search Ads query data; YouTube использовать для education/origin/care creative, а не потому, что Trends доказал высокий query demand.

Репрезентативные official links:

- [DE Wolldecke — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Wolldecke&gprop=froogle)
- [DE Wolldecke — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Wolldecke&gprop=youtube)
- [NL wollen sokken — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=wollen%20sokken&gprop=froogle)
- [NL wollen sokken — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=wollen%20sokken&gprop=youtube)
- [BE wool socks bilingual — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=wollen%20sokken%20%2B%20chaussettes%20laine&gprop=froogle)
- [BE wool socks bilingual — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=wollen%20sokken%20%2B%20chaussettes%20laine&gprop=youtube)
- [DK uldplaid — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=uldplaid&gprop=froogle)
- [DK uldplaid — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=uldplaid&gprop=youtube)
- [SE ullsockor — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=ullsockor&gprop=froogle)
- [SE ullsockor — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=ullsockor&gprop=youtube)
- [FI villasukat — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=villasukat&gprop=froogle)
- [FI villasukat — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=villasukat&gprop=youtube)
- [PL koc wełniany — Shopping 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=koc%20we%C5%82niany&gprop=froogle)
- [PL koc wełniany — YouTube 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=koc%20we%C5%82niany&gprop=youtube)

## 8. Сверка с HYPD absolute-volume layer

HYPD и Trends отвечают на разные вопросы. HYPD выглядит как Planner-like average monthly volume и может включать broad/close variants; Trends здесь — sampled, exact/local terms и relative normalization. Прямая конверсия индекса в volume методологически недопустима.

### 8.1 Где слои согласуются

| Market / family | HYPD | Trends interpretation |
|---|---:|---|
| DE cashmere scarf | 1,000/mo | Recurring Q4, medium/high-confidence premium opportunity |
| PL cashmere scarf | 1,300/mo | Recurring Q4; один из двух лучших cashmere markets |
| DK cashmere scarf | 260/mo | 21% 5y и 30% 12m недель non-zero; plausible test |
| DE wool socks / blanket | 4,400 / 14,800 | Оба core; устойчивый многолетний Q4 |
| NL wool socks / wool plaid | 4,400 / 1,300 | Core direction подтверждён |
| DK wool socks / wool plaid | 1,600 / 1,000 | Core direction подтверждён |
| SE wool blanket | 1,600 | 93.5% 5y и 100% 12m недель non-zero |
| FI wool socks | 5,400 | 100% пятилетних недель non-zero |
| PL wool socks / blanket | 2,900 / 5,400 | Повторяемый Q4, high-confidence |

### 8.2 Contradictions и частичные расхождения

| Severity | Market / exact term | HYPD | Google Trends | Decision |
|---|---|---:|---|---|
| Strong | SE kashmirhalsduk | 590/mo | exact non-zero только 0.8% 5y недель; variants 8–10% | Не масштабировать до raw Keyword Planner QA |
| Strongest | FI kashmirhuivi | 260/mo | exact 0 на всём 5y; spacing/English variants лишь 0.4–0.8% | Считать HYPD неподтверждённым |
| Strong | DE Yak Socken | 210/mo | 1.1% недель 5y; 0 в 12m | Не закладывать acquisition budget |
| Partial/strong | BE cashmere NL + FR | 170 + 260/mo | около 1.9% 5y и 3.8% 12m недель | Отдельные NL/FR tests; не суммировать как единый рынок |
| Partial | NL kasjmier sjaal | 880/mo | 8.8% 5y и 17.0% 12m недель | Seasonality подтверждена, scale — нет |
| Moderate | FI villahuopa | 1,000/mo | 12.6% недель 5y; 17.0% 12m | Небольшой test, не core forecast |

Cashmere HYPD seasonality сама по себе согласуется с Trends: например, DE и PL заметно растут в Q4. Расхождение относится к уровню и устойчивости exact query, а не к зимней направленности.

Перед расходованием бюджета нужен исходный Google Ads Keyword Planner export с полями match type, language, geo, network и monthly history. Особенно важно проверить, не смешаны ли broad match, close variants, singular/plural и англоязычные формы.

## 9. Benchmarks: Norway и Spain

| Market | 5y directional evidence | 12m | Interpretation |
|---|---|---|---|
| NO | wool socks 88.2% недель non-zero; wool blanket 83.2%; wool scarf 14.5%; cashmere scarf 1.1%; cashmere blanket 0.4% | socks 90.6%; blanket 94.3% | Сильный cold-market benchmark для core wool; не подтверждает cashmere exact |
| ES | wool socks 37.8%; wool blanket 64.9%; wool scarf 30.9%; cashmere scarf/blanket около 0.4% | socks 45.3%; blanket 67.9%; scarf 32.1%; cashmere 0 | Generic wool имеет сезонный рынок, но испанская логистика/происхождение не равна premium-material demand |

- [NO benchmark — 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NO&q=ullskjerf%2Ckashmirskjerf%2Cullsokker%2Cullpledd%2Ckashmirpledd)
- [NO benchmark — 12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=NO&q=ullskjerf%2Ckashmirskjerf%2Cullsokker%2Cullpledd%2Ckashmirpledd)
- [ES benchmark — 5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=ES&q=bufanda%20de%20lana%2Cbufanda%20de%20cachemira%2Ccalcetines%20de%20lana%2Cmanta%20de%20lana%2Cmanta%20de%20cachemira)
- [ES benchmark — 12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=ES&q=bufanda%20de%20lana%2Cbufanda%20de%20cachemira%2Ccalcetines%20de%20lana%2Cmanta%20de%20lana%2Cmanta%20de%20cachemira)

## 10. Рекомендации

### Budget and market sequencing

1. **Tier 1:** DE/PL cashmere scarf; DE/NL/DK/SE/FI/PL wool socks and sheep-wool blankets. В BE начинать с language-split test, а не с масштабирования.
2. **Tier 2:** wool scarf DE/NL/PL; cashmere scarf DK и осторожно NL; gloves DE/PL.
3. **Attach/halo:** wool shawls, camel shawl, cashmere/yak blankets. Использовать PDP, editorial storytelling, bundles, email и remarketing.
4. **Hold:** yak socks до поступления товара и yak-related acquisition во всех рынках до появления реального impression data.

### Query and localization

- BE: разделить NL и FR campaigns/landing pages. Для blanket проверить couverture en laine / couverture laine и plaid wol, а не только plaid laine.
- SE: включить order/spacing variants — kashmir halsduk, halsduk kashmir, cashmere halsduk, halsduk ull, ull halsduk.
- FI: не доверять exact kashmirhuivi volume до Keyword Planner export.
- Использовать modifiers с наблюдаемым спросом: women/men, 100%, warmth, size, kids; merino и alpaca — comparison/benchmark language, только если product claim корректен.
- Exact gift queries не использовать для прогноза. Создать merchandising вокруг category demand: 3-pair socks, scarf + gloves, а в PL протестировать hat + scarf concept, если ассортимент позволяет.

### Measurement

- До scale: Google Ads Keyword Planner QA по country × language × exact/broad; затем small-budget search test.
- Основные KPI теста: eligible impressions, search-term mix, CTR, CVR, gross-margin contribution и stock cover по family/language.
- Trends использовать для seasonality, term choice и directional prioritization; HYPD/Keyword Planner — для absolute sizing; margin/shipping/stock — для конечного budget allocation.

## 11. Official Web Search URL appendix

Все ссылки ниже — официальный Google Trends Explore; дата доступа 2026-09-14. Panel A = scarf/shawl, B = socks/gloves/gift, C = blanket/gift. Параметр hl меняет только язык интерфейса, не географию и не query language.

| Panel | 5 years | 12 months | 90 days |
|---|---|---|---|
| DE-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Wollschal%2CKaschmirschal%2CYak%20Schal%2CKamelwollschal%2CWolltuch) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DE&q=Wollschal%2CKaschmirschal%2CYak%20Schal%2CKamelwollschal%2CWolltuch) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DE&q=Wollschal%2CKaschmirschal%2CYak%20Schal%2CKamelwollschal%2CWolltuch) |
| DE-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Wollschal%2CWollsocken%2CYak%20Socken%2CWollhandschuhe%2CWollsocken%20Geschenkset) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DE&q=Wollschal%2CWollsocken%2CYak%20Socken%2CWollhandschuhe%2CWollsocken%20Geschenkset) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DE&q=Wollschal%2CWollsocken%2CYak%20Socken%2CWollhandschuhe%2CWollsocken%20Geschenkset) |
| DE-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Wollschal%2CWolldecke%20%2B%20Wollplaid%2CKaschmirdecke%2CYakhaardecke%2CWolldecke%20Geschenk) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DE&q=Wollschal%2CWolldecke%20%2B%20Wollplaid%2CKaschmirdecke%2CYakhaardecke%2CWolldecke%20Geschenk) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DE&q=Wollschal%2CWolldecke%20%2B%20Wollplaid%2CKaschmirdecke%2CYakhaardecke%2CWolldecke%20Geschenk) |
| NL-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=wollen%20sjaal%2Ckasjmier%20sjaal%2Cjakwollen%20sjaal%2Ckameelwollen%20sjaal%2Cwollen%20omslagdoek) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=NL&q=wollen%20sjaal%2Ckasjmier%20sjaal%2Cjakwollen%20sjaal%2Ckameelwollen%20sjaal%2Cwollen%20omslagdoek) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=NL&q=wollen%20sjaal%2Ckasjmier%20sjaal%2Cjakwollen%20sjaal%2Ckameelwollen%20sjaal%2Cwollen%20omslagdoek) |
| NL-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=wollen%20sjaal%2Cwollen%20sokken%2Cjakwollen%20sokken%2Cwollen%20handschoenen%2Cwollen%20sokken%20cadeauset) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=NL&q=wollen%20sjaal%2Cwollen%20sokken%2Cjakwollen%20sokken%2Cwollen%20handschoenen%2Cwollen%20sokken%20cadeauset) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=NL&q=wollen%20sjaal%2Cwollen%20sokken%2Cjakwollen%20sokken%2Cwollen%20handschoenen%2Cwollen%20sokken%20cadeauset) |
| NL-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=wollen%20sjaal%2Cwollen%20plaid%20%2B%20wollen%20deken%2Ckasjmier%20plaid%20%2B%20kasjmier%20deken%2Cjakwollen%20plaid%20%2B%20jakwollen%20deken%2Cwollen%20plaid%20cadeau) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=NL&q=wollen%20sjaal%2Cwollen%20plaid%20%2B%20wollen%20deken%2Ckasjmier%20plaid%20%2B%20kasjmier%20deken%2Cjakwollen%20plaid%20%2B%20jakwollen%20deken%2Cwollen%20plaid%20cadeau) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=NL&q=wollen%20sjaal%2Cwollen%20plaid%20%2B%20wollen%20deken%2Ckasjmier%20plaid%20%2B%20kasjmier%20deken%2Cjakwollen%20plaid%20%2B%20jakwollen%20deken%2Cwollen%20plaid%20cadeau) |
| BE-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Ckasjmier%20sjaal%20%2B%20%C3%A9charpe%20cachemire%2Cjakwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20yak%2Ckameelwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20chameau%2Cwollen%20omslagdoek%20%2B%20ch%C3%A2le%20en%20laine) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Ckasjmier%20sjaal%20%2B%20%C3%A9charpe%20cachemire%2Cjakwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20yak%2Ckameelwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20chameau%2Cwollen%20omslagdoek%20%2B%20ch%C3%A2le%20en%20laine) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Ckasjmier%20sjaal%20%2B%20%C3%A9charpe%20cachemire%2Cjakwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20yak%2Ckameelwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%20de%20chameau%2Cwollen%20omslagdoek%20%2B%20ch%C3%A2le%20en%20laine) |
| BE-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20sokken%20%2B%20chaussettes%20laine%2Cjakwollen%20sokken%20%2B%20chaussettes%20en%20laine%20de%20yak%2Cwollen%20handschoenen%20%2B%20gants%20en%20laine%2Cwollen%20sokken%20cadeauset%20%2B%20coffret%20chaussettes%20laine) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20sokken%20%2B%20chaussettes%20laine%2Cjakwollen%20sokken%20%2B%20chaussettes%20en%20laine%20de%20yak%2Cwollen%20handschoenen%20%2B%20gants%20en%20laine%2Cwollen%20sokken%20cadeauset%20%2B%20coffret%20chaussettes%20laine) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20sokken%20%2B%20chaussettes%20laine%2Cjakwollen%20sokken%20%2B%20chaussettes%20en%20laine%20de%20yak%2Cwollen%20handschoenen%20%2B%20gants%20en%20laine%2Cwollen%20sokken%20cadeauset%20%2B%20coffret%20chaussettes%20laine) |
| BE-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20plaid%20%2B%20plaid%20laine%2Ckasjmier%20plaid%20%2B%20plaid%20cachemire%2Cjakwollen%20plaid%20%2B%20plaid%20laine%20de%20yak%2Cwollen%20plaid%20cadeau%20%2B%20plaid%20laine%20cadeau) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20plaid%20%2B%20plaid%20laine%2Ckasjmier%20plaid%20%2B%20plaid%20cachemire%2Cjakwollen%20plaid%20%2B%20plaid%20laine%20de%20yak%2Cwollen%20plaid%20cadeau%20%2B%20plaid%20laine%20cadeau) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=BE&q=wollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20plaid%20%2B%20plaid%20laine%2Ckasjmier%20plaid%20%2B%20plaid%20cachemire%2Cjakwollen%20plaid%20%2B%20plaid%20laine%20de%20yak%2Cwollen%20plaid%20cadeau%20%2B%20plaid%20laine%20cadeau) |
| DK-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Ccashmere%20halst%C3%B8rkl%C3%A6de%20%2B%20cashmere%20t%C3%B8rkl%C3%A6de%2Cyak%20halst%C3%B8rkl%C3%A6de%20%2B%20yakuld%20t%C3%B8rkl%C3%A6de%2Ckameluld%20halst%C3%B8rkl%C3%A6de%2Culdsjal) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Ccashmere%20halst%C3%B8rkl%C3%A6de%20%2B%20cashmere%20t%C3%B8rkl%C3%A6de%2Cyak%20halst%C3%B8rkl%C3%A6de%20%2B%20yakuld%20t%C3%B8rkl%C3%A6de%2Ckameluld%20halst%C3%B8rkl%C3%A6de%2Culdsjal) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Ccashmere%20halst%C3%B8rkl%C3%A6de%20%2B%20cashmere%20t%C3%B8rkl%C3%A6de%2Cyak%20halst%C3%B8rkl%C3%A6de%20%2B%20yakuld%20t%C3%B8rkl%C3%A6de%2Ckameluld%20halst%C3%B8rkl%C3%A6de%2Culdsjal) |
| DK-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdsokker%2Cyakuld%20sokker%2Culdhandsker%2Culdsokker%20gave%C3%A6ske) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdsokker%2Cyakuld%20sokker%2Culdhandsker%2Culdsokker%20gave%C3%A6ske) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdsokker%2Cyakuld%20sokker%2Culdhandsker%2Culdsokker%20gave%C3%A6ske) |
| DK-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdplaid%20%2B%20uldt%C3%A6ppe%2Ccashmere%20plaid%20%2B%20kashmir%20plaid%2Cyakuld%20plaid%20%2B%20yakuld%20t%C3%A6ppe%2Culdplaid%20gave) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdplaid%20%2B%20uldt%C3%A6ppe%2Ccashmere%20plaid%20%2B%20kashmir%20plaid%2Cyakuld%20plaid%20%2B%20yakuld%20t%C3%A6ppe%2Culdplaid%20gave) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=DK&q=uld%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdplaid%20%2B%20uldt%C3%A6ppe%2Ccashmere%20plaid%20%2B%20kashmir%20plaid%2Cyakuld%20plaid%20%2B%20yakuld%20t%C3%A6ppe%2Culdplaid%20gave) |
| SE-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=ullhalsduk%2Ckashmirhalsduk%2Cjakull%20halsduk%2Ckamelull%20halsduk%2Cullsjal) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=SE&q=ullhalsduk%2Ckashmirhalsduk%2Cjakull%20halsduk%2Ckamelull%20halsduk%2Cullsjal) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=SE&q=ullhalsduk%2Ckashmirhalsduk%2Cjakull%20halsduk%2Ckamelull%20halsduk%2Cullsjal) |
| SE-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=ullhalsduk%2Cullsockor%20%2B%20ullstrumpor%2Cjakull%20strumpor%2Cullhandskar%2Cullsockor%20presentset) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=SE&q=ullhalsduk%2Cullsockor%20%2B%20ullstrumpor%2Cjakull%20strumpor%2Cullhandskar%2Cullsockor%20presentset) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=SE&q=ullhalsduk%2Cullsockor%20%2B%20ullstrumpor%2Cjakull%20strumpor%2Cullhandskar%2Cullsockor%20presentset) |
| SE-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=ullhalsduk%2Cullpl%C3%A4d%20%2B%20ullfilt%2Ckashmirpl%C3%A4d%2Cjakull%20pl%C3%A4d%20%2B%20jakull%20filt%2Cullpl%C3%A4d%20present) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=SE&q=ullhalsduk%2Cullpl%C3%A4d%20%2B%20ullfilt%2Ckashmirpl%C3%A4d%2Cjakull%20pl%C3%A4d%20%2B%20jakull%20filt%2Cullpl%C3%A4d%20present) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=SE&q=ullhalsduk%2Cullpl%C3%A4d%20%2B%20ullfilt%2Ckashmirpl%C3%A4d%2Cjakull%20pl%C3%A4d%20%2B%20jakull%20filt%2Cullpl%C3%A4d%20present) |
| FI-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=villahuivi%2Ckashmirhuivi%2Cjakkivillahuivi%2Ckamelinvillahuivi%2Cvillashaali) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=FI&q=villahuivi%2Ckashmirhuivi%2Cjakkivillahuivi%2Ckamelinvillahuivi%2Cvillashaali) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=FI&q=villahuivi%2Ckashmirhuivi%2Cjakkivillahuivi%2Ckamelinvillahuivi%2Cvillashaali) |
| FI-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=villahuivi%2Cvillasukat%2Cjakkivillasukat%2Cvillak%C3%A4sineet%2Cvillasukat%20lahjapakkaus) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=FI&q=villahuivi%2Cvillasukat%2Cjakkivillasukat%2Cvillak%C3%A4sineet%2Cvillasukat%20lahjapakkaus) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=FI&q=villahuivi%2Cvillasukat%2Cjakkivillasukat%2Cvillak%C3%A4sineet%2Cvillasukat%20lahjapakkaus) |
| FI-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=villahuivi%2Cvillahuopa%2Ckashmirhuopa%2Cjakkivillahuopa%2Cvillahuopa%20lahjaksi) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=FI&q=villahuivi%2Cvillahuopa%2Ckashmirhuopa%2Cjakkivillahuopa%2Cvillahuopa%20lahjaksi) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=FI&q=villahuivi%2Cvillahuopa%2Ckashmirhuopa%2Cjakkivillahuopa%2Cvillahuopa%20lahjaksi) |
| PL-A | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=szalik%20we%C5%82niany%2Cszalik%20kaszmirowy%2Cszalik%20z%20we%C5%82ny%20jaka%2Cszalik%20z%20we%C5%82ny%20wielb%C5%82%C4%85dziej%2Cszal%20we%C5%82niany) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=PL&q=szalik%20we%C5%82niany%2Cszalik%20kaszmirowy%2Cszalik%20z%20we%C5%82ny%20jaka%2Cszalik%20z%20we%C5%82ny%20wielb%C5%82%C4%85dziej%2Cszal%20we%C5%82niany) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=PL&q=szalik%20we%C5%82niany%2Cszalik%20kaszmirowy%2Cszalik%20z%20we%C5%82ny%20jaka%2Cszalik%20z%20we%C5%82ny%20wielb%C5%82%C4%85dziej%2Cszal%20we%C5%82niany) |
| PL-B | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=szalik%20we%C5%82niany%2Cskarpety%20we%C5%82niane%2Cskarpety%20z%20we%C5%82ny%20jaka%2Cr%C4%99kawiczki%20we%C5%82niane%2Czestaw%20prezentowy%20skarpet) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=PL&q=szalik%20we%C5%82niany%2Cskarpety%20we%C5%82niane%2Cskarpety%20z%20we%C5%82ny%20jaka%2Cr%C4%99kawiczki%20we%C5%82niane%2Czestaw%20prezentowy%20skarpet) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=PL&q=szalik%20we%C5%82niany%2Cskarpety%20we%C5%82niane%2Cskarpety%20z%20we%C5%82ny%20jaka%2Cr%C4%99kawiczki%20we%C5%82niane%2Czestaw%20prezentowy%20skarpet) |
| PL-C | [5y](https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=szalik%20we%C5%82niany%2Ckoc%20we%C5%82niany%2Ckoc%20kaszmirowy%2Ckoc%20z%20we%C5%82ny%20jaka%2Ckoc%20we%C5%82niany%20prezent) | [12m](https://trends.google.com/trends/explore?hl=en&date=today%2012-m&geo=PL&q=szalik%20we%C5%82niany%2Ckoc%20we%C5%82niany%2Ckoc%20kaszmirowy%2Ckoc%20z%20we%C5%82ny%20jaka%2Ckoc%20we%C5%82niany%20prezent) | [90d](https://trends.google.com/trends/explore?hl=en&date=today%203-m&geo=PL&q=szalik%20we%C5%82niany%2Ckoc%20we%C5%82niany%2Ckoc%20kaszmirowy%2Ckoc%20z%20we%C5%82ny%20jaka%2Ckoc%20we%C5%82niany%20prezent) |

## 12. Source register and limitations

Official sources, accessed 2026-09-14:

- [Google Trends Explore](https://trends.google.com/trends/explore)
- [FAQ about Google Trends data](https://support.google.com/trends/answer/4365533?hl=en)
- [Search terms and topics](https://support.google.com/trends/answer/17309543)
- [Related and rising searches](https://support.google.com/trends/answer/4355000?hl=en)
- [Interest by region](https://support.google.com/trends/answer/4355212?hl=en)
- [Compare Trends search terms](https://support.google.com/trends/answer/4359550?hl=en-AU)
- [Explore features and export](https://support.google.com/trends/answer/6248105?hl=en)
- [Quick comparisons](https://support.google.com/trends/answer/17261722?hl=en)
- [Avdar research workbook](https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit)

Honest limitations:

1. Trends is sampled and relative; it cannot validate HYPD absolute volume mathematically.
2. Low-volume countries/phrases, bilingual BE and material-specific yak/camel terms are especially prone to zeros and isolated spikes.
3. Zero/non-zero coverage зависит и от comparison set: рядом с доминирующим term малый ряд чаще округляется к нулю. Для чувствительных SE/FI cashmere и scarf wording сделаны отдельные variant checks, но исчерпывающего словаря нет.
4. Some official UI dynamic tables timed out or failed to render on retry. Такие случаи не записывались как истинный zero; использовались соседние периоды и помечалась более низкая confidence.
5. Query panels use literal local terms and hand-selected variants, not exhaustive topics. A topic may aggregate languages, but product/material-specific topics were not consistently available.
6. The 90d window is seasonally positioned before Q4 peak and includes a partial current endpoint. It is appropriate for launch timing, not annual sizing.
7. Related/rising percentages can come from a small base; Breakout is not necessarily commercially large.
8. No master Sheet cells, formulas, filters or metadata were modified.

## Bottom line

The safest inventory-to-demand match is **wool socks + sheep-wool blankets**, with **cashmere scarves in DE/PL** as the premium growth bet. The HYPD layer is useful for rough sizing where it agrees with recurring Trends, but SE/FI cashmere and DE yak socks require Keyword Planner evidence before spend. Gift positioning should be layered onto strong categories rather than treated as its own keyword market.
