# Avdar Market — карта кликабельных ссылок для презентации v2

Собрано по локальным реестрам и рабочим материалам на 15.09.2026. Номера слайдов ниже относятся к текущей версии из 37 слайдов; при сокращении колоды ориентироваться прежде всего на тему.

## Как оформлять ссылки в клиентском PDF

- Весь скриншот референса и строка `Открыть источник ↗` должны вести на один прямой URL.
- Подпись должна объяснять наблюдаемую механику, а не повторять `официальный сайт`, дату или имя файла.
- В основном повествовании достаточно 1–3 ссылок на слайд. Полные группы Google Trends и расширенный список конкурентов лучше вынести в индекс источников приложения.
- Не показывать сырые URL, локальные пути, ID реестра или названия внутренних таблиц.

## Слайды 6–10 и 29–30 — Google Trends

### Слайд 6 — Германия

- **Подпись:** `Открыть сравнение запросов по Германии ↗`
- **URL:** https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Kaschmirschal%2CWollschal%2CWollsocken%2CWollhandschuhe%2CWolldecke
- **Локальное подтверждение:** `build_avdar_report.py`, источник S35.

### Слайд 7 — Нидерланды

- **Подпись:** `Открыть сравнение запросов по Нидерландам ↗`
- **URL:** https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=kasjmier%20sjaal%2Cwollen%20sjaal%2Cwollen%20sokken%2Cwollen%20handschoenen%2Cwollen%20plaid%20%2B%20wollen%20deken
- **Локальное подтверждение:** `build_avdar_report.py`, источник S36.

### Слайд 8 — резервные рынки

- **Бельгия · открыть сравнение ↗**  
  https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=BE&q=kasjmier%20sjaal%20%2B%20%C3%A9charpe%20cachemire%2Cwollen%20sjaal%20%2B%20%C3%A9charpe%20en%20laine%2Cwollen%20sokken%20%2B%20chaussettes%20laine%2Cwollen%20handschoenen%20%2B%20gants%20en%20laine%2Cwollen%20plaid%20%2B%20couverture%20en%20laine
- **Дания · открыть сравнение ↗**  
  https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DK&q=cashmere%20halst%C3%B8rkl%C3%A6de%20%2B%20cashmere%20t%C3%B8rkl%C3%A6de%2Culd%20halst%C3%B8rkl%C3%A6de%20%2B%20uldt%C3%B8rkl%C3%A6de%2Culdsokker%2Culdhandsker%2Culdplaid%20%2B%20uldt%C3%A6ppe
- **Швеция · открыть сравнение ↗**  
  https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=SE&q=kashmir%20halsduk%20%2B%20halsduk%20kashmir%2Cull%20halsduk%20%2B%20halsduk%20ull%2Cullsockor%20%2B%20ullstrumpor%2Cullhandskar%2Cullpl%C3%A4d%20%2B%20ullfilt
- **Польша · открыть сравнение ↗**  
  https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=PL&q=szalik%20kaszmirowy%2Cszalik%20we%C5%82niany%2Cskarpety%20we%C5%82niane%2Cr%C4%99kawiczki%20we%C5%82niane%2Ckoc%20we%C5%82niany
- **Финляндия · открыть сравнение ↗**  
  https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=FI&q=kashmirhuivi%20%2B%20cashmere%20huivi%2Cvillahuivi%2Cvillasukat%2Cvillak%C3%A4sineet%2Cvillahuopa
- **Локальное подтверждение:** `build_avdar_report.py`, источники S37–S41.

### Слайд 9 и приложение 29 — матрица категорий

Для краткого основного слайда использовать ссылки DE и NL выше. Для полной матрицы в приложении дать семь компактных ссылок `DE · NL · BE · DK · SE · PL · FI`, ведущих на S35–S41.

Дополнительные сохранённые панели редких волокон и домашней категории находятся в `research_assets/google_trends_deep_dive.json`, раздел `raw_links`. Их имеет смысл оставить в финальном индексе источников, если позволит место:

- **Германия · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=DE&q=Wollsocken,Wolldecke%20%2B%20Wollplaid,Yakdecke%20%2B%20Yakhaardecke
- **Нидерланды · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=NL&q=wollen%20sokken,wollen%20deken%20%2B%20wollen%20plaid,jakwollen%20deken%20%2B%20jakwollen%20plaid
- **Бельгия · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=BE&q=wollen%20sokken%20%2B%20chaussettes%20en%20laine,wollen%20deken%20%2B%20couverture%20en%20laine,jakwollen%20deken%20%2B%20plaid%20en%20laine%20de%20yak
- **Дания · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=DK&q=uldsokker,uldplaid%20%2B%20uldt%C3%A6ppe,yakuld%20plaid%20%2B%20yakuld%20t%C3%A6ppe
- **Швеция · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=SE&q=ullsockor%20%2B%20ullstrumpor,ullpl%C3%A4d%20%2B%20ullfilt,jakull%20pl%C3%A4d%20%2B%20jakull%20filt
- **Польша · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=PL&q=skarpety%20we%C5%82niane,koc%20we%C5%82niany%20%2B%20pled%20we%C5%82niany,koc%20z%20we%C5%82ny%20jaka%20%2B%20pled%20z%20we%C5%82ny%20jaka
- **Финляндия · носки / пледы / як:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=FI&q=villasukat,villahuopa,jakkivillahuopa%20%2B%20jakinvillahuopa

### Слайд 10 — сезонность

- **Германия · шарфы и носки:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=DE&q=Kaschmirschal,Wollschal,Wollsocken
- **Нидерланды · пледы:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=NL&q=wollen%20sokken,wollen%20deken%20%2B%20wollen%20plaid,jakwollen%20deken%20%2B%20jakwollen%20plaid
- **Польша · шарфы и носки:** https://trends.google.com/trends/explore?hl=en-US&date=today%205-y&geo=PL&q=szalik%20kaszmirowy,szalik%20we%C5%82niany,skarpety%20we%C5%82niane
- **Локальное подтверждение:** `research_assets/google_trends_deep_dive.json`, сохранённые панели пяти лет.

### Слайд 23 — точный запрос hero-SKU

- **Кашемировый шарф · Германия:** https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=DE&q=Kaschmirschal
- **Кашемировый шарф · Нидерланды:** https://trends.google.com/trends/explore?hl=en&date=today%205-y&geo=NL&q=kasjmier%20sjaal
- **Локальное подтверждение:** `presentation/work/product_slides.md`, слайд 23.

### Слайд 30 — как читать Google Trends

- **Как Google Trends нормирует данные:** https://support.google.com/trends/answer/4365533?hl=en
- **Связанные и растущие запросы:** https://support.google.com/trends/answer/4355000?hl=en
- **Интерес по регионам:** https://support.google.com/trends/answer/4355212?hl=en
- **Расширенные функции:** https://support.google.com/trends/answer/6248105?hl=en
- **Локальное подтверждение:** `research_assets/google_trends_deep_dive.json`, блок официальных источников.

## Слайды 12–14 и 32 — сайты и ценовые референсы

### Слайд 12 — конкурентный ландшафт

На основном слайде достаточно одной кликабельной ссылки на каждый тип конкурентного кода. Если названия остаются текстом, все указанные бренды должны вести на прямые страницы ниже.

**Материал и происхождение**

- **GOBI Cashmere · кашемировый шарф:** https://www.gobicashmere.com/products/cashmere-woven-scarf-dim-gray
- **MATKA · плед из 100% шерсти яка:** https://www.matka.es/collection/100-yak-wool-blanket
- **Norlha · плед из яка:** https://www.norlha.com/products/luxury-hand-spun-yak-wool-throw

**Доступность и понятность покупки**

- **ARKET · кашемировый шарф:** https://www.arket.com/en-eu/product/cashmere-scarf-grey-1297089007/
- **COS · кашемировый шарф:** https://www.cos.com/en-de/women/accessories/hatsscarvesgloves/scarves/product/pure-cashmere-scarf-black-1032425001
- **IKEA · шерстяной плед:** https://www.ikea.com/de/de/p/ulltistel-plaid-grau-weiss-50506974/

**Дом и подарок**

- **Balmuir · интерьерный плед:** https://balmuir.com/p/balmuir-b-logo-throw-130x180cm-90013100p-990-basic-black
- **Nordic Socks · подарочная механика:** https://www.instagram.com/nordicsocks/p/Dc0cfPxAIiR/

**Наследие**

- **Loro Piana · шарф:** https://de.loropiana.com/de/herren/accessoires/schals/schal-grande-unita-FAO3774_D983.html
- **Johnstons of Elgin · кашемировый палантин:** https://johnstonsofelgin.com/de-de/products/black-cashmere-stole?variant=47507695501590

Локальное подтверждение: `research_assets/avdar_competitor_price_references_2026-09-15.json`, `research_assets/site_reference_manifest.json`, `research_assets/social_evidence_manifest.json`.

### Слайд 13 и переработанное приложение 32 — семь понятных ценовых якорей

- **Кашемировый шарф · PURSCHOEN:** https://purschoen.de/collections/slim/products/kaschmirschal-slim-natural-einfarbig-100-cashmere-purschoen
- **Шерстяной шарф · Living Crafts / Natur-el:** https://natur-el.nl/products/living-crafts-wollen-sjaal-100-wol-multi-ruiten
- **Мериносовые носки · Wólczanka:** https://wolczanka.pl/bezowe-skarpety-wolczanka-62392-1
- **Шерстяные перчатки · Hestra:** https://www.hestragloves.eu/products/raggwool-glove-black
- **Кашемировый палантин · Falconeri:** https://www.falconeri.com/be/product/cashmere_stole-DZ00195.html?dwvar_DZ00195_Z_COL_FALCD=9215
- **Плед из яка · Ritter Decken:** https://ritter-decken.de/en/collections/marke-ritter-decken/products/himalaya-yakdecke?variant=47466449469757
- **Шерстяной плед · Balmuir:** https://balmuir.com/p/balmuir-b-logo-throw-130x180cm-90013100p-990-basic-black

Локальное подтверждение: `research_assets/reference_screenshots/sites_priority/capture_results.json` и `research_assets/site_reference_manifest.json`.

### Слайд 14 — сильная карточка товара

- **Подпись:** `Ritter Decken · посмотреть карточку товара ↗`
- **URL:** https://ritter-decken.de/en/collections/marke-ritter-decken/products/himalaya-yakdecke?variant=47466449469757
- Сделать кликабельными и скриншот, и подпись.

## Слайды 15–16 — отзывы и возражения

### Слайд 15 — три коротких голоса покупателей

- **VOC-033 · «Большой и мягкий…» · H&M NL:** https://www2.hm.com/nl_nl/productpage.1095302001.html
- **VOC-042 · «Мягкий, плотный…» · H&M NL:** https://www2.hm.com/nl_nl/productpage.1021270001.html
- **VOC-092 · «После тысячи километров…» · Varusteleka FI:** https://varusteleka.com/products/varusteleka-retkeilysukat-merinovillaa-fi
- **Визуальный референс масштаба шарфа · Living Crafts:** https://natur-el.nl/products/living-crafts-wollen-sjaal-100-wol-multi-ruiten

### Слайд 16 — три конкретных возражения

- **VOC-007 · тонкость и возврат · Tchibo DE:** https://www.tchibo.de/products/147594165877/cashmere-strickschal?article_id=114328486258
- **VOC-032 · несовпадение оттенка · H&M NL:** https://www2.hm.com/nl_nl/productpage.1095302001.html
- **VOC-051 · ограничения ухода · IKEA NL:** https://www.ikea.com/nl/nl/p/moalie-plaid-grijs-50354107/
- **Референс карточки · Uldplaiden:** https://uldplaiden.dk/products/halstorklaede-i-100-cashmere-sort-30-x-180-cm
- **Объяснение ценности · Anna Rani Specht:** https://www.tiktok.com/@annaranispecht/video/7557831113612315926

Локальное подтверждение: `presentation/work/brand_slides.md`, слайды 15–16, и реестр VOC.

## Слайды 17–20 и 34 — Instagram / TikTok

### Слайд 17 — публичные сигналы

- **Kyana Sue Powers · уход за шерстяным пледом · 12,8 млн просмотров:** https://www.tiktok.com/@kyanasue/video/7611997731170700566
- **Miranda’s World · макро-фактура и прикосновение · 693,8 тыс. просмотров:** https://www.tiktok.com/@mirandasdreamworld/video/7560659434997959958
- **useless_dk · три способа носить большой шарф · 3 062 отметки:** https://www.instagram.com/useless_dk/reel/CViXWPqo1gW/
- **OFT Stuttgart · цена и материал в первых секундах:** https://www.tiktok.com/@oft.st/video/7674187190888418592
- **GOBI × The HU · происхождение через людей:** https://www.instagram.com/thehuofficial/reel/Dc7oP40hALi/

### Слайд 18 — формулы первых секунд

- **PURSCHOEN · трансформация шарфа на человеке:** https://www.instagram.com/purschoen/reel/DdHKxhPlfGU/
- **Anna Rani Specht · конструкция, материал и цена:** https://www.tiktok.com/@annaranispecht/video/7557831113612315926
- **Eva / gladdelepel · процесс вязания перчаток:** https://www.tiktok.com/@gladdelepel/video/7574432938318679328
- **Miranda’s World · тактильный hook:** https://www.tiktok.com/@mirandasdreamworld/video/7560659434997959958
- **OFT Stuttgart · локальный DE-hook:** https://www.tiktok.com/@oft.st/video/7674187190888418592

### Слайд 19 — происхождение

- **GOBI × The HU · культура, люди, происхождение:** https://www.instagram.com/thehuofficial/reel/Dc7oP40hALi/
- **Mongolian.pl · закулисье и этапы:** https://www.instagram.com/mongolian.sklep/reel/Db70tGAgRxE/
- **MÄRZ München · материальный крупный план:** https://www.instagram.com/maerzmuenchen/p/DQoxT5TDMnQ/
- **Norlha · ручной процесс и редкое волокно:** https://www.norlha.com/products/luxury-hand-spun-yak-wool-throw

Важно: для упомянутого в текущем футере `Dinadi` прямой URL в локальных реестрах не найден. В v2 либо убрать это имя, либо сначала добавить проверенный источник; не оставлять некликабельным рядом с кликабельными брендами.

### Слайд 20 — территории позиционирования

- **Повседневный сценарий · Robyn:** https://www.tiktok.com/@robyn_nagioff/video/7591823784114523414
- **Подарок · Nordic Socks:** https://www.instagram.com/nordicsocks/p/Dc0cfPxAIiR/
- **Дом и интерьер · Balmuir:** https://www.instagram.com/balmuir/p/Dc5X_IBjSlL/

### Слайд 21 — визуальный ориентир платформы бренда

- **Falconeri · fashion-подача кашемира:** https://www.falconeri.com/be/product/cashmere_stole-DZ00195.html?dwvar_DZ00195_Z_COL_FALCD=9215

### Слайд 23 — hero-SKU

- **PURSCHOEN · несколько способов ношения:** https://www.instagram.com/purschoen/reel/DdHKxhPlfGU/
- Дополнительно оставить две ссылки Google Trends для точного запроса из раздела выше.

### Слайд 24 — наборы и носки

- **Wólczanka · носки как функциональный add-on:** https://wolczanka.pl/bezowe-skarpety-wolczanka-62392-1
- **ROECKL · сочетание аксессуаров:** https://www.instagram.com/roeckl_official/reel/DdPFHFcgCrk/
- **Nordic Socks · подарочная упаковка и тип получателя:** https://www.instagram.com/nordicsocks/p/Dc0cfPxAIiR/

### Слайд 25 — пледы

- **Norlha · верхняя планка истории и цены:** https://www.norlha.com/products/luxury-hand-spun-yak-wool-throw
- **Ritter Decken · характеристики и доказательства:** https://ritter-decken.de/en/collections/marke-ritter-decken/products/himalaya-yakdecke?variant=47466449469757
- **Balmuir · интерьерная подача:** https://balmuir.com/p/balmuir-b-logo-throw-130x180cm-90013100p-990-basic-black

### Слайд 34 — галерея креативов

- **Imtizaaj · ассортиментный reveal:** https://www.tiktok.com/@imtizaaj/video/7560984243199921415
- **Eva / gladdelepel · от нити к изделию:** https://www.tiktok.com/@gladdelepel/video/7574432938318679328
- **OFT Stuttgart · материал и цена сразу:** https://www.tiktok.com/@oft.st/video/7674187190888418592
- **GOBI × The HU · люди и происхождение:** https://www.instagram.com/thehuofficial/reel/Dc7oP40hALi/
- **Balmuir · плед как слой интерьера:** https://www.instagram.com/balmuir/p/Dc5X_IBjSlL/
- **ROECKL · сочетание аксессуаров в подарок:** https://www.instagram.com/roeckl_official/reel/DdPFHFcgCrk/

Локальное подтверждение для всех социальных ссылок: `research_assets/social_evidence_manifest.json`, `research_assets/social_coverage_incremental_manifest.json`, `presentation/work/slide_asset_map.md`.

## Слайды 35–36 — подарочные и surprise-боксы

### Слайд 35 — сезонная платформа подарков

- **The British Blanket Company · ближайший аналог с пледом:** https://thebritishblanketcompany.com/products/random-recycled-blanket-gift-box
- **Corgi · известны размер, материал и количество, скрыт дизайн:** https://eu.corgisocks.com/products/mens-merino-wool-socks-mystery-pack-2-pairs
- **Johnstons of Elgin · раскрытые премиальные наборы:** https://johnstonsofelgin.com/collections/luxe-cashmere-gift-sets?___store=us
- **The White Company · раскрытые подарочные наборы:** https://www.thewhitecompany.com/uk/Gifts/All-Gifts-and-Sets/c/gift-boxes

### Слайд 36 — рыночные сигналы и пилот

- **The British Blanket Company · £72 и случайный цвет пледа:** https://thebritishblanketcompany.com/products/random-recycled-blanket-gift-box
- **Corgi · контролируемый сюрприз в шерстяных носках:** https://eu.corgisocks.com/products/mens-merino-wool-socks-mystery-pack-2-pairs
- **Happy Socks · скрытый принт, известны категория и количество:** https://www.happysocks.com/eu/product/E000580
- **Eintracht Frankfurt · гарантированный предмет и выбор размера:** https://stores.eintracht.de/fanshop/eintracht-ueberraschungsboxen/
- **Matimade · известен основной комплект, скрыт дополнительный предмет:** https://matimade.pl/pl/p/Mystery-box-/3668
- **KVK · почти 60% компаний и средний бюджет €102:** https://www.kvk.nl/en/managing-and-growing/end-of-year-gift-for-your-staff/
- **Права на дистанционный возврат в ЕС:** https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm

### Если останется место для трёх прямых Google Trends по боксам

- **Германия:** https://trends.google.com/trends/explore?date=today%205-y&geo=DE&q=Geschenkbox,Mystery%20Box,%C3%9Cberraschungsbox
- **Нидерланды:** https://trends.google.com/trends/explore?date=today%205-y&geo=NL&q=cadeaubox,verrassingsbox,mystery%20box
- **Польша:** https://trends.google.com/trends/explore?date=today%205-y&geo=PL&q=box%20prezentowy,mystery%20box

Локальное подтверждение: `research_assets/avdar_gift_box_market_recommendation_2026-09-15.md`, `research_assets/mystery_gift_boxes_europe_market_2026-09-15.md`.

## Финальный индекс источников — рекомендуемое наполнение

Если слайд 37 превращается из общего повторения ограничений в полезный индекс, вывести четыре группы:

1. **Поиск:** семь ссылок Google Trends S35–S41 + официальная справка.
2. **Карточки товаров:** PURSCHOEN, Ritter Decken, Norlha, Balmuir, Wólczanka, Hestra, Falconeri.
3. **Социальные механики:** TT12, TT01, TT03, TT17, TT19, TT20, IG-001, IG-003, IG-010, IG-012, IG-017.
4. **Подарочные боксы:** British Blanket Company, Corgi, Happy Socks, KVK и правила возврата ЕС.

Дополнительная ссылка на рабочую базу, только как резервный источник, а не как обязательный путь чтения презентации:

- **Исследовательская база Avdar Market:** https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit?usp=sharing

## Неподтверждённые или проблемные ссылки

- `Dinadi` упомянут в текущем тексте слайда 19, но прямого URL нет в локальных реестрах. Убрать из v2 либо подтвердить отдельно.
- `IG-005`, `IG-007` и `IG-015` ранее отмечались как проблемные по визуальному захвату. Прямые URL подтверждены, но использовать только пригодные локальные версии кадров, указанные в `presentation/work/brand_slides.md`; не показывать пустые или сломанные захваты.
- `WEB-017 Lisa Yang` при захвате перенаправлялся на главную страницу. Не использовать как доказательный скриншот конкретного товара без повторной проверки.
