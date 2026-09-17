/*
 * Проверенные исходные данные для страновых глав презентации.
 * Торговля: Eurostat Comext, 2025, WORLD partner, flow 1/2, обновление API 15.09.2026.
 * Пледы = сумма CN 63012010 и 63012090. Шарфы CN 62142000 не включают вязаные изделия.
 * Все товарные коды охватывают шерсть и тонкий волос животных, а не только кашемир.
 * Ввоз и вывоз не равны продажам конечным покупателям; Нидерланды и Бельгия могут
 * выступать транзитными рынками. Поисковые фразы не суммируются в объём категории.
 * Бельгия: экспорт пледов по двум CN равен 2 406 008 шт. при ввозе 37 777 шт.;
 * величину требуется отдельно сверить, поэтому в клиентском наборе она null.
 */
(function () {
  const assets = '../../../research_assets/reference_screenshots/';
  const sheet = 'https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit';
  const tradeSource = 'https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=DE&reporter=NL&reporter=PL&reporter=DK&reporter=BE&reporter=SE&reporter=FI&partner=WORLD&product=62142000&product=61159400&product=61169100&product=63012010&product=63012090&flow=1&flow=2&indicators=SUPPLEMENTARY_QUANTITY&indicators=VALUE_IN_EUROS&sinceTimePeriod=2025&untilTimePeriod=2025';
  const spendSource = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nama_10_cp18?lang=EN&geo=DE&geo=NL&geo=PL&geo=DK&geo=BE&geo=SE&geo=FI&coicop18=CP031&coicop18=CP052&unit=CP_MEUR&time=2024';
  const onlineSource = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ec_ibgs?lang=EN&time=2024&indic_is=I_BCLOT1&ind_type=IND_TOTAL&unit=PC_IND&geo=DE&geo=NL&geo=PL&geo=DK&geo=BE&geo=SE&geo=FI';
  const searchSource = `${sheet}#gid=2026091607`;
  const polandSearchSource = `${sheet}#gid=719697100&range=J226:N245`;
  const trade = (scarves, socks, gloves, blankets, qualityNote) => ({
    year: 2025,
    scarves, socks, gloves, blankets,
    ...(qualityNote ? { qualityNote } : {}),
    source: tradeSource,
  });
  const spend = (clothingMEUR, homeTextileMEUR, onlinePct) => ({
    year: 2024,
    clothingMEUR, homeTextileMEUR, onlinePct,
    source: spendSource,
    onlineSource,
    note: 'CP031 — вся одежда; CP052 — бытовой текстиль. Ни одна группа не выделяет шерсть отдельно. OnlinePct — доля людей 16–74 лет, купивших одежду, обувь или аксессуары онлайн за последние три месяца.',
  });
  const search = (product, query, volume, cpc, note, overrides = {}) => ({
    product, query, volume, cpc, currency: 'USD',
    period: '09.2025–08.2026', sourceDate: '2026-09-16', source: searchSource,
    ...(note ? { note } : {}),
    ...overrides,
  });
  const metaPage = (country, pageId) => `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${country}&search_type=page&view_all_page_id=${pageId}`;

  window.COUNTRY_DATA_V9 = {
    DE: {
      code: 'DE', name: 'Германия',
      searches: [
        search('Кашемировый шарф', 'Kaschmirschal', 1000, 0.86),
        search('Шерстяной шарф', 'Wollschal', 1300, 0.39),
        search('Шерстяные носки', 'Wollsocken', 4400, 0.84),
        search('Шерстяные перчатки', 'Wollhandschuhe', 590, 0.73),
        search('Шерстяной плед/одеяло', 'Wolldecke', 14800, 0.87, 'Фраза шире нидерландского «wollen plaid»; их объёмы нельзя трактовать как прямое отношение размеров рынков.'),
      ],
      spend: spend(69262, 6933, 48.47),
      trade: trade(
        { importQty: 1250991, exportQty: 395382, importEUR: 48718593, exportEUR: 18315582 },
        { importQty: 17024035, exportQty: 8232420, importEUR: 52060292, exportEUR: 43816028 },
        { importQty: 791420, exportQty: 207668, importEUR: 6845372, exportEUR: 3597389 },
        { importQty: 466601, exportQty: 159572, importEUR: 15217809, exportEUR: 6536838 },
      ),
      brands: [
        { name: 'PURSCHOEN', product: 'Кашемировый шарф Slim Natural, 180 × 30 см', material: '100% кашемир', price: '€109', url: 'https://purschoen.de/collections/slim/products/kaschmirschal-slim-natural-einfarbig-100-cashmere-purschoen', image: assets + 'sites_priority/WEB-001_purschoen_cashmere_scarf_desktop_top.png', instagram: 'https://www.instagram.com/purschoen/', followers: 18300, post: 'https://www.instagram.com/purschoen/reel/DdHKxhPlfGU/', engagement: '2 073 просмотра; 1 комментарий и 1 ответ; лайки скрыты', postNote: 'Ролик показывает другой шарф бренда в образе.', socialImage: assets + 'social_priority/IG-003_purschoen_cashmere_scarf_post_crop.png' },
        { name: 'ROECKL', product: 'Кашемировый шарф Business, 180 × 30 см', material: '100% кашемир', price: '€169', url: 'https://roeckl.com/de/business-cashmere-schal-30x180-black', image: assets + 'sites_priority/WEB-031_roeckl_cashmere_de_2026-09-16.png', instagram: 'https://www.instagram.com/roeckl_official/', followers: 17200, post: 'https://www.instagram.com/roeckl_official/reel/DdPFHFcgCrk/', engagement: '773 просмотра', postNote: 'Ролик о шерстяных аксессуарах; шарф Business в нём не показан.' },
      ],
      marketplace: { platform: 'OTTO', product: 'BOVARI, кашемировый шарф 180 × 31 см', material: '100% кашемир', price: '€69,90', url: 'https://www.otto.de/p/bovari-kaschmirschal-100-kaschmir-schal-damen-und-herren-strick-schal-premium-qualitaet-S0U5I039/?variationId=S0U5I0394TCT', note: 'Цена акции на карточке; обычная €79,90.' },
      socialImage: assets + 'social_priority/IG-003_purschoen_cashmere_scarf_post_crop.png',
      metaAds: [
        { brand: 'PURSCHOEN', product: 'Кашемировый шарф в объявлении', since: '11.09.2026', reachEU: 18847, activeAds: 1, pageUrl: metaPage('DE','323502018260307'), url: 'https://www.facebook.com/ads/library/?id=854254737678153' },
        { brand: 'GOBI', product: 'Кашемировые изделия; немецкий рекламный текст', since: '14.09.2026', url: 'https://www.facebook.com/ads/library/?id=1073776062306934', site: 'https://de.gobicashmere.com/collections/sale/', geo: 'Показы в Германии подтверждены Meta.' },
      ],
      conclusion: 'Ввоз невязаных шарфов и шалей — 1 250 991 шт. в 2025 году. Начать тест после проверки остатка и экономики заказа.',
    },
    NL: {
      code: 'NL', name: 'Нидерланды',
      searches: [
        search('Кашемировый шарф', 'kasjmier sjaal', 880, 0.57),
        search('Шерстяной шарф', 'wollen sjaal', 1000, 0.42),
        search('Шерстяные носки', 'wollen sokken', 4400, 0.62),
        search('Шерстяные перчатки', 'wollen handschoenen', 720, 0.76),
        search('Шерстяной плед', 'wollen plaid', 1300, 0.54),
      ],
      spend: spend(20082, 3174, 64.12),
      trade: trade(
        { importQty: 708353, exportQty: 587993, importEUR: 16652042, exportEUR: 11678169 },
        { importQty: 4894150, exportQty: 4366015, importEUR: 18339771, exportEUR: 20316595 },
        { importQty: 534467, exportQty: 428405, importEUR: 4178142, exportEUR: 4515495 },
        { importQty: 152569, exportQty: 73917, importEUR: 5615920, exportEUR: 2407575 },
      ),
      brands: [
        { name: 'Profuomo', product: 'Кашемировый шарф', material: '100% кашемир', price: '€159,95', url: 'https://profuomo.com/nl-nl/products/ppxs30017e-sand-cashmere-scarf', image: assets + 'sites_priority/WEB-022_profuomo_cashmere_scarf_nl_clean_2026-09-16.png', instagram: 'https://www.instagram.com/profuomo/', followers: 40300, post: 'https://www.instagram.com/profuomo/reel/DdHU08zjnpi/', engagement: '1 комментарий; лайки скрыты', postNote: 'Ролик о мужском образе, не конкретном шарфе.' },
        { name: 'Maison Deux', product: 'Lines Blanket', material: 'Шерсть', price: '€169', url: 'https://maisondeux.com/products/lines-blanket-lilac-orange', image: assets + 'sites_priority/WEB-023_maison_deux_lines_blanket_clean_2026-09-16.png' },
        { name: 'extreme cashmere', product: 'Кашемировая бандана', material: 'Кашемир', price: '€150', url: 'https://extreme-cashmere.com/collections/cashmere-scarfs', instagram: 'https://www.instagram.com/extreme.cashmere/', followers: 93500, post: 'https://www.instagram.com/extreme.cashmere/p/Dc3K195jcKP/', engagement: '12 комментариев, 2 репоста; лайки скрыты', postNote: 'Редакционная съёмка трикотажа; бандана в кадре не показана.', socialImage: assets + 'social_priority/extreme_cashmere_nl_ig_2026-09-16.png' },
      ],
      marketplace: { platform: 'bol', product: 'Athemyll, кашемировый шарф 190 × 30 см', material: '100% кашемир', price: '€59,90', url: 'https://www.bol.com/nl/nl/p/athemyll-kasjmier-sjaal-100-kasjmier-bruin-190-30-cm/9200000098299354/' },
      socialImage: assets + 'social_priority/extreme_cashmere_nl_ig_2026-09-16.png',
      metaAds: [
        { brand: 'Knit Factory', product: 'Вязаный шарф Sana с шерстью в составе', since: '09.09.2026', activeAds: 12, pageUrl: metaPage('NL','389101894482085'), url: 'https://www.facebook.com/ads/library/?id=1548439539884850', site: 'https://www.knitfactory.com/nl/' },
        { brand: 'DILLING', product: 'Мериновое детское бельё, не носки', since: '20.03.2026', url: 'https://www.facebook.com/ads/library/?id=1494816818887798', site: 'https://www.dilling.nl/', geo: 'Показы в Нидерландах подтверждены Meta.' },
      ],
      conclusion: '64,12% жителей покупали одежду онлайн. Ввоз невязаных шарфов и шалей — 708 353 шт., вывоз — 587 993 шт.; это не объём розничных продаж.',
    },
    PL: {
      code: 'PL', name: 'Польша',
      searches: [
        search('Кашемировый шарф', 'szalik kaszmirowy', 1300, 0.27, 'Срез 09.09.2026; более свежая оценка пока не получена.', { sourceDate: '2026-09-09', source: polandSearchSource }),
        search('Шерстяной шарф', 'szalik wełniany', null, null, 'Абсолютный объём не измерен.', { source: polandSearchSource }),
        search('Шерстяные носки', 'skarpety wełniane', null, null, 'Абсолютный объём не измерен.', { source: polandSearchSource }),
        search('Шерстяные перчатки', 'rękawiczki wełniane', null, null, 'Абсолютный объём не измерен.', { source: polandSearchSource }),
        search('Шерстяной плед/одеяло', 'koc wełniany', 5400, 0.32, 'Срез 09.09.2026; более свежая оценка пока не получена.', { sourceDate: '2026-09-09', source: polandSearchSource }),
      ],
      spend: spend(14796, 2125.6, 41.69),
      trade: trade(
        { importQty: 314947, exportQty: 143986, importEUR: 6819339, exportEUR: 4906933 },
        { importQty: 1498054, exportQty: 1586775, importEUR: 4254780, exportEUR: 7308645 },
        { importQty: 347488, exportQty: 186362, importEUR: 1808644, exportEUR: 1950851 },
        { importQty: 131767, exportQty: 95675, importEUR: 2676116, exportEUR: 2128380 },
      ),
      brands: [
        { name: 'Mongolian.pl', product: 'Кашемировый шарф, 170 × 30 см', material: '100% кашемир', price: '449 PLN', url: 'https://mongolian.pl/mezczyzna/dodatki-zimowe/szalik-z-kaszmiru-100-468', image: assets + 'sites_priority/WEB-041_mongolian_cashmere_pl_2026-09-17.png', instagram: 'https://www.instagram.com/mongolian.sklep/', followers: 6234, post: 'https://www.instagram.com/mongolian.sklep/reel/Db70tGAgRxE/', engagement: '1 216 просмотров, 1 комментарий; лайки скрыты', postNote: 'Ролик о съёмке коллекции, не о конкретном шарфе.', socialImage: assets + 'social_priority/IG-008_mongolian_bts_reel_post_crop.png' },
        { name: 'Patrizia Aryton', product: 'Кашемировый шарф, 165 × 25 см', material: '100% кашемир', price: '449 PLN · акция', url: 'https://patrizia.aryton.pl/p/26186-szal-z-kaszmiru.html', image: assets + 'sites_priority/WEB-039_patrizia_cashmere_pl_2026-09-17.png', instagram: 'https://www.instagram.com/patriziaaryton/' },
        { name: 'Wólczanka', product: 'Кашемировый шарф, 170 × 25 см', material: '100% кашемир', price: '249,99 PLN · акция', url: 'https://wolczanka.pl/kremowy-szal-w%C3%B3lczanka-57540-1', instagram: 'https://www.instagram.com/wolczanka/', followers: 35600 },
        { name: 'HOP Design', product: 'ALPAK, шерстяной плед', material: '100% шерсть', price: '449 PLN', url: 'https://hopsklep.pl/produkt/koc-welniany-alpak-zielony-prazek/', instagram: 'https://www.instagram.com/hopdesign_eu/', followersLabel: '≈12,8 тыс. подписчиков', post: 'https://www.instagram.com/hopdesign_eu/reel/Dc1Ws2gIKQg/', engagement: '44,2 тыс. просмотров', postNote: 'Ролик о производстве, не о конкретном пледе.' },
      ],
      marketplace: { platform: 'Allegro', product: 'eSilk, кашемировый шарф, 197 × 67 см', material: 'заявлено 100% кашемир', price: '199,99 PLN', url: 'https://allegro.pl/oferta/szal-szalik-kaszmirowy-100-kaszmir-duzy-cieply-12385675814' },
      socialImage: assets + 'social_priority/IG-008_mongolian_bts_reel_post_crop.png',
      metaAds: [
        { brand: 'Mongolian.pl', product: 'Креатив об осенне-зимней коллекции шерсти и кашемира; указана Польша', since: '07.09.2026', reachEU: 9812, activeAds: 27, pageUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=PL&is_targeted_country=false&media_type=all&search_type=page&sort_data[mode]=total_impressions&sort_data[direction]=desc&view_all_page_id=323006920901093', url: 'https://www.facebook.com/ads/library/?id=1730829571823494', site: 'https://mongolian.pl/' },
        { brand: 'DILLING', product: 'Мериновое детское бельё, не носки', since: '12.03.2026', url: 'https://www.facebook.com/ads/library/?id=901712392738001', site: 'https://www.dilling.pl/', geo: 'Показы в Польше подтверждены Meta.' },
      ],
      conclusion: 'По выбранному запросу на кашемировый шарф — 1 300 поисков в месяц. Проверить цену в PLN, доставку и стоимость заказа до решения о запуске.',
    },
    DK: {
      code: 'DK', name: 'Дания',
      searches: [
        search('Кашемировый шарф', 'cashmere halstørklæde', 260, 0.53),
        search('Шерстяной шарф', 'uldhalstørklæde', 10, 0.20, 'Это узкая точная фраза, не объём всей категории.'),
        search('Шерстяные носки', 'uldsokker', 1600, 1.08),
        search('Шерстяные перчатки', 'uldhandsker', 210, 0.48),
        search('Шерстяной плед', 'uldplaid', 1000, 0.81),
      ],
      spend: spend(5194.8, 861.2, 59.43),
      trade: trade(
        { importQty: 191338, exportQty: 147966, importEUR: 5305184, exportEUR: 3311332 },
        { importQty: 2477342, exportQty: 1435861, importEUR: 9370408, exportEUR: 6911208 },
        { importQty: 206576, exportQty: 91709, importEUR: 1283499, exportEUR: 760953 },
        { importQty: 149117, exportQty: 50939, importEUR: 3924247, exportEUR: 2329315 },
      ),
      brands: [
        { name: 'Uldplaiden', product: 'Кашемировый шарф 180 × 30 см', material: '100% кашемир', price: '849 DKK', url: 'https://uldplaiden.dk/products/halstorklaede-i-100-cashmere-sort-30-x-180-cm', instagram: 'https://www.instagram.com/uldplaiden/', followers: 2050, post: 'https://www.instagram.com/uldplaiden/reel/DdO5I9TDNSC/', engagement: '178 просмотров, 2 лайка', socialImage: assets + 'social_priority/IG-007_uldplaiden_education_reel_post_crop.png' },
        { name: 'Wuth Copenhagen', product: 'Classic Knitted Cashmere Scarf', material: 'Кашемир', price: '€227 на EU-витрине', url: 'https://www.wuthcopenhagen.com/en/products/classic-knitted-cashmere-scarf', image: assets + 'sites_priority/WEB-036_wuth_cashmere_dk_2026-09-16.png', instagram: 'https://www.instagram.com/wuthcopenhagen/', followers: 7935, post: 'https://www.instagram.com/wuthcopenhagen/reel/DdGyIg-KFW6/', engagement: '1 комментарий, 1 репост', postNote: 'Ролик о коллекции; конкретный шарф не показан.', socialImage: assets + 'social_priority/wuth_dk_cashmere_reel_2026-09-16.png' },
        { name: 'Care By Me', product: 'Susan Plaid, 130 × 180 см', material: '100% шерсть из Непала', price: '2 200 DKK', url: 'https://carebyme.dk/products/susan-throw', image: assets + 'sites_priority/WEB-032_carebyme_throw_dk_2026-09-16.png' },
      ],
      marketplace: { platform: 'Miinto', product: 'Ganni, шерстяной шарф', material: 'Шерсть', price: '1 075 DKK', url: 'https://www.miinto.dk/p-multifarvet-kompakt-uldtorklaede-d25858f2-fbfe-498d-aba4-7aba44d0572e' },
      socialImage: assets + 'social_priority/wuth_dk_cashmere_reel_2026-09-16.png',
      metaAds: [
        { brand: 'Silkeborg Uldspinderi', product: 'Шерстяные и альпаковые пледы, шарфы', since: '17.08.2026', activeAds: 6, pageUrl: metaPage('DK','421283828470082'), url: 'https://www.facebook.com/ads/library/?id=4288102548168391', site: 'https://silkeborg-uld.dk/' },
        { brand: 'ASKET', product: 'The Cashmere Wool Scarf: шерсть и кашемир', since: '12.08.2026', url: 'https://www.facebook.com/ads/library/?id=1078791714978774', site: 'https://www.asket.com/en-dk/cashmere-wool-scarf-grey-melange', geo: 'Показы в Дании подтверждены Meta.' },
      ],
      conclusion: 'В 2025 году ввезено 191 338 невязаных шарфов и шалей. Тестировать Данию после первых продаж на основном рынке.',
    },
    BE: {
      code: 'BE', name: 'Бельгия',
      searches: [
        search('Кашемировый шарф, нидерландский язык', 'kasjmier sjaal', 170, 0.47, 'Охват только нидерландскоязычных запросов; французские запросы не добавлены. Срез 16.09.2026 отличается от прежней проверки 09.09.2026 (CPC $0,33).'),
      ],
      spend: spend(10815, 899.4, 46.39),
      trade: trade(
        { importQty: 353010, exportQty: 61753, importEUR: 5496504, exportEUR: 2348193 },
        { importQty: 961643, exportQty: 483439, importEUR: 4121873, exportEUR: 1104075 },
        { importQty: 105470, exportQty: 23157, importEUR: 793567, exportEUR: 244851 },
        { importQty: 37777, exportQty: null, importEUR: 1309566, exportEUR: 7001754 },
        'Экспорт пледов требует проверки единиц и структуры товарного потока в источнике; не использовать показатель для сравнения.',
      ),
      brands: [
        { name: 'Wolvis', product: 'Шарф Myosotis 02', material: 'Мериносовая шерсть', price: '€160 · нет в наличии', url: 'https://www.wolvis.be/en/products/myosotis-02', image: assets + 'sites_priority/be_se/WEB-032_wolvis_myosotis_02_be_desktop_top.png', instagram: 'https://www.instagram.com/wolvis.be/', followers: 17300, post: 'https://www.instagram.com/wolvis.be/p/DdUJHRvjZKR/', engagement: '22 комментария, 2 репоста; лайки скрыты', socialImage: assets + 'social_priority/wolvis_be_ig_2026-09-16.png', postNote: 'Публикация показывает команду и шарфы.' },
        { name: 'Les Soeurs', product: 'Кашемировая шаль Nori, 175 × 90 см', material: 'Кашемир', price: '€129,99', url: 'https://www.lessoeurs.be/en/les-soeurs-cashmere-scarf-nori-midnight-navy.html', image: assets + 'sites_priority/be_se/WEB-033_les_soeurs_nori_cashmere_be_mobile_top.png' },
        { name: 'La Femme Garniture', product: 'Шарф в образе', url: 'https://lafemmegarniture.be/', instagram: 'https://www.instagram.com/lafemmegarniture/', followers: 6763, post: 'https://www.instagram.com/lafemmegarniture/p/DcaXxVRCp3V/', postNote: 'Публикация показывает шарф как часть готового образа.' },
      ],
      marketplace: { platform: 'bol.be', product: 'Шерстяной плед 140 × 200 см', material: '100% шерсть', price: '€89,95', url: 'https://www.bol.com/be/nl/p/deken-100-wol-140x200cm-kleed-woldeken-plaid-1-persoons/9300000239354027/' },
      socialImage: assets + 'social_priority/wolvis_be_ig_2026-09-16.png',
      metaAds: [
        { brand: 'Wolvis', product: 'В одной версии объявления — мериносовый шарф Apostrophe', since: '11.09.2026', reachEU: 4092, activeAds: 27, pageUrl: metaPage('BE','581479478595092'), url: 'https://www.facebook.com/ads/library/?id=2280172222767865' },
        { brand: 'ASKET', product: 'The Cashmere Wool Scarf: шерсть и кашемир', since: '12.08.2026', url: 'https://www.facebook.com/ads/library/?id=1078791714978774', site: 'https://www.asket.com/en-be/cashmere-wool-scarf-grey-melange', geo: 'Показы в Бельгии подтверждены Meta.' },
      ],
      conclusion: 'Поиск пока измерен только по нидерландской фразе. До решения о рекламном бюджете нужно проверить франкоязычные запросы.',
    },
    SE: {
      code: 'SE', name: 'Швеция',
      searches: [
        search('Кашемировый шарф', 'kashmirhalsduk', 590, 0.44, 'Google Trends почти не показывает точную фразу; объём следует подтвердить в Keyword Planner.'),
        search('Шерстяной шарф', 'ullhalsduk', 110, 0.48),
        search('Шерстяные носки', 'ullstrumpor', 3600, 0.75),
        search('Шерстяные перчатки', 'ullhandskar', 140, 0.88),
        search('Шерстяной плед', 'ullpläd', 1600, 0.46),
      ],
      spend: spend(8352.4, 838.9, 53.58),
      trade: trade(
        { importQty: 330440, exportQty: 202480, importEUR: 9947872, exportEUR: 14649771 },
        { importQty: 2784382, exportQty: 1370604, importEUR: 7035245, exportEUR: 8797367 },
        { importQty: 551547, exportQty: 209919, importEUR: 2703385, exportEUR: 2411867 },
        { importQty: 470634, exportQty: 400541, importEUR: 9035583, exportEUR: 7192110 },
      ),
      brands: [
        { name: 'Klippan Yllefabrik', product: 'Knut, плед 130 × 200 см', material: '100% ягнячья шерсть', price: '999 SEK', url: 'https://klippanyllefabrik.se/products/knut?variant=40444757278890', image: assets + 'sites_priority/be_se/WEB-034_klippan_knut_throw_se_desktop_top.png', instagram: 'https://www.instagram.com/klippanyllefabrik/', followers: 24000, post: 'https://www.instagram.com/klippanyllefabrik/p/Dck_9AUDTIp/', engagement: '3 комментария; лайки скрыты', postNote: 'Плед в интерьерном кадре; это не карточка модели Knut.', socialImage: assets + 'social_priority/klippan_se_ig_2026-09-16.png' },
        { name: 'Sätila', product: 'Elis Scarf', material: 'Мериносовая шерсть', price: '899 SEK', url: 'https://satila.com/se/dam/elis-scarf-soft-yellow', image: assets + 'sites_priority/be_se/WEB-035_satila_elis_scarf_se_desktop_top.png', instagram: 'https://www.instagram.com/satila1896/', followers: 7927, post: 'https://www.instagram.com/satila1896/p/DdEbNN8lbWW/', postNote: 'Пост показывает шарф как часть повседневного образа.' },
      ],
      marketplace: { platform: 'CDON', product: 'Шерстяной плед Maori 140 × 200 см', material: '100% шерсть', price: '1 214 SEK', url: 'https://cdon.se/produkt/maori-ullfilt-med-fransar-stl-140x200-cm-f4d576e3c4c6531e/' },
      socialImage: assets + 'social_priority/klippan_se_ig_2026-09-16.png',
      metaAds: [
        { brand: 'Sätila', product: 'Шарф Shea Stripe из мохера и альпаки', since: '24.08.2026', reachEU: 4942, activeAds: 62, pageUrl: metaPage('SE','161450277269321'), url: 'https://www.facebook.com/ads/library/?id=898502199686680' },
        { brand: 'UNIQLO Europe', product: 'HEATTECH с кашемиром, не шарф', since: '27.08.2026', url: 'https://www.facebook.com/ads/library/?id=1018083084615248', site: 'https://www.uniqlo.com/se/en/', geo: 'Показы в Швеции подтверждены Meta.' },
      ],
      conclusion: 'Ввоз пледов — 470 634 шт. в 2025 году. Для точной фразы «кашемировый шарф» Google Trends не показывает достаточно данных; оценку 590 нужно сверить.',
    },
    FI: {
      code: 'FI', name: 'Финляндия',
      searches: [
        search('Кашемировый шарф', 'kashmirhuivi', 260, 0.95, 'Точная фраза не дала устойчивого сигнала Google Trends; объём следует подтвердить в Keyword Planner.'),
        search('Шерстяной шарф', 'villahuivi', 480, 0.42),
        search('Шерстяные носки', 'villasukat', 5400, 0.61),
        search('Шерстяные перчатки', 'villakäsineet', 40, 0.60),
        search('Шерстяной плед', 'villahuopa', 1000, 0.35),
      ],
      spend: spend(4137, 504, 40.16),
      trade: trade(
        { importQty: 101850, exportQty: 36750, importEUR: 2908863, exportEUR: 1440382 },
        { importQty: 1379797, exportQty: 339819, importEUR: 3207428, exportEUR: 1505879 },
        { importQty: 142823, exportQty: 11247, importEUR: 695144, exportEUR: 106964 },
        { importQty: 85418, exportQty: 19631, importEUR: 2488900, exportEUR: 1190826 },
      ),
      brands: [
        { name: 'Lapuan Kankurit', product: 'CAMP, шерстяной плед 150 × 200 см', material: 'Шерсть', price: '€169', url: 'https://lapuankankurit.fi/shop/wool-blankets-cushion-covers/camp-wool-blanket-black-light-grey-150-x-200-cm/', image: assets + 'sites_priority/WEB-033_lapuan_blanket_fi_2026-09-16.png', instagram: 'https://www.instagram.com/lapuankankurit/', followers: 54200, post: 'https://www.instagram.com/lapuankankurit/reel/DdMhLF7C5lg/', engagement: '34 комментария, 10 репостов; лайки скрыты', postNote: 'Ролик о производстве пледа LAKEUS, не модели CAMP.', socialImage: assets + 'social_priority/lapuan_fi_wool_blanket_ig_2026-09-16.png' },
        { name: 'Balmuir', product: 'B-Logo Throw, 130 × 180 см', material: '90% шерсть, 10% кашемир', price: '€500', url: 'https://balmuir.com/p/balmuir-b-logo-throw-130x180cm-90013100p-990-basic-black', image: assets + 'sites_priority/WEB-015_balmuir_b_logo_throw_desktop_top.png' },
        { name: 'Sukkamestarit', product: 'Мериносовые носки', material: 'Мериносовая шерсть', url: 'https://sukkamestarit.com/en-eu/collections/merino-wool-socks', instagram: 'https://www.instagram.com/sukkamestarit/', followers: 4485, tiktok: 'https://www.tiktok.com/@sukkamestarit', tiktokFollowers: 1991, post: 'https://www.tiktok.com/@sukkamestarit/video/7682764719127579926', engagement: '1 116 просмотров в TikTok' },
      ],
      marketplace: { platform: 'Zalando.fi', product: 'CASH-MERE, кашемировый шарф', material: 'Кашемир', price: '€139', url: 'https://www.zalando.fi/cash-mere-huivi-schwarz-c3i54g001-q11.html' },
      socialImage: assets + 'social_priority/lapuan_fi_wool_blanket_ig_2026-09-16.png',
      metaAds: [
        { brand: 'Ruskovilla', product: 'Снуды из мериносовой шерсти', since: '31.08.2026', reachEU: 2005, activeAds: 22, pageUrl: metaPage('FI','316924105092909'), url: 'https://www.facebook.com/ads/library/?id=1644896997300952' },
        { brand: 'FALKE', product: 'Финское видео о домашней одежде с кашемиром и мериносом, не носках', since: '15.09.2026', url: 'https://www.facebook.com/ads/library/?id=2556936144822719', site: 'https://www.falke.com/fi_en/ts/falke-loungewear/', geo: 'Показы в Финляндии подтверждены Meta.' },
      ],
      conclusion: 'По шерстяным носкам 5 400 запросов в месяц, по кашемировому шарфу — 260. Вернуться к рынку при расширении ассортимента.',
    },
  };

  window.COUNTRY_DATA_V9_SOURCES = { tradeSource, spendSource, onlineSource, searchSource };
})();
