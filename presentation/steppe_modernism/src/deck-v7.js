const root = document.getElementById('deck');
const sheet = 'https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit';
const paid = `${sheet}#gid=2026091607`;
const products = `${sheet}#gid=433698039`;
const results = `${sheet}#gid=20260909`;
const kw = `${sheet}#gid=719697100`;
const source = (href, label) => `<a class="source" href="${href}">${label}</a>`;
const slide = (_n, title, body, evidence, opts={}) => { const n = slides.length + 1; return `<section class="slide ${opts.className||''}">
  ${opts.coverImage ? `<img class="cover-bg" src="${opts.coverImage}" alt="Фактура ткани"><div class="cover-shade"></div>` : ''}
  <div class="top"><span>Исследование рынка шерстяных изделий</span><span>${opts.topRight||''}</span></div>
  <div class="slide-body">${title ? `<h2>${title}</h2>` : ''}${body}</div>
  ${evidence ? `<div class="evidence-line">${evidence}</div>` : ''}<div class="page-no">${String(n).padStart(2,'0')}</div>
</section>`; };

const slides = [];
slides.push(slide(1, '', `<h1>Где начинать<br>продажи</h1><p class="sub">Выбор рынков через спрос, локальные цены и конкретные примеры того, как похожие изделия продают другие бренды.</p>`, '', {className:'cover photo',coverImage:'../assets/steppe-textile-cover.png'}));

slides.push(slide(2,'Германия — первый кандидат на тест',`<p class="sub">Здесь больше поисков по нескольким товарным фразам и есть прямые аналоги шарфа. В рабочей модели доставка из Испании ниже, чем в Нидерланды. При этом немецкий поисковый клик по кашемировому шарфу дороже.</p>
  <div class="two"><div class="decision"><h3>Германия</h3><p class="large">«Kaschmirschal»: 1 000 поисков в месяц, CPC $0,86. Примеры цен: PURSCHOEN €109, ROECKL €169.</p></div>
  <div class="decision"><h3>Нидерланды</h3><p class="large">«kasjmier sjaal»: 880 поисков в месяц, CPC $0,57. Примеры: Profuomo €159,95, bol от €59,90.</p></div></div><p class="note">Сначала сверяем физический остаток, тарифы доставки и полную маржу. Если экономика Германии не сойдётся, проверяем Нидерланды.</p>`,
  `Данные: ${source(paid,'поиск и стоимость клика')} · ${source(`${sheet}#gid=1328578076`,'доставка')} · ${source(results,'выводы')}`));

const markets = [
  ['Германия','Kaschmirschal','1 000','$0,86'],
  ['Нидерланды','kasjmier sjaal','880','$0,57'],
  ['Швеция','kashmirhalsduk','590','$0,44'],
  ['Дания','cashmere halstørklæde','260','$0,53'],
  ['Финляндия','kashmirhuivi','260','$0,95'],
  ['Бельгия (nl)','kasjmier sjaal','170','$0,47'],
];
slides.push(slide(3,'Поиск кашемирового шарфа в шести странах',`<table class="market-table"><thead><tr><th>Страна</th><th>Локальная фраза</th><th>Поисков / мес.</th><th>CPC, USD</th></tr></thead><tbody>
  ${markets.map(([c,q,v,cpc])=>`<tr${c==='Германия'?' class="top-country"':''}><td>${c}</td><td>${q}</td><td class="num">${v}</td><td class="num">${cpc}</td></tr>`).join('')}
  </tbody></table><p class="note">Среднее за сентябрь 2025 — август 2026. Это частоты конкретных поисковых фраз, а не все покупатели шарфов. Ставка за клик справочная.</p>`,
  `Источник: ${source(kw,'локальные запросы и метод')} · ${source('https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/','определение CPC и объёма')}`,{kicker:'Прямые данные'}));

slides.push(slide(4,'Германия и Нидерланды: условия первого теста',`<table class="market-table compare-two"><thead><tr><th>Показатель</th><th>Германия</th><th>Нидерланды</th></tr></thead><tbody>
  <tr><td>Кашемировый шарф</td><td>1 000 / мес. · CPC $0,86</td><td>880 / мес. · CPC $0,57</td></tr>
  <tr><td>Шерстяной шарф</td><td>1 300 / мес. · CPC $0,39</td><td>1 000 / мес. · CPC $0,42</td></tr>
  <tr><td>Шерстяные носки</td><td>4 400 / мес. · CPC $0,84</td><td>4 400 / мес. · CPC $0,62</td></tr>
  <tr><td>Доставка из Испании*</td><td>€19 за заказ</td><td>€24 за заказ</td></tr>
  <tr><td>Товарные аналоги</td><td>PURSCHOEN, ROECKL, OTTO</td><td>Profuomo, Maison Deux, bol</td></tr>
  </tbody></table><p class="note">*Пока это тарифы рабочей модели, не согласованные цены перевозчика. Германия сильнее по поиску шарфов; Нидерланды дают более дешёвый клик по кашемиру. Решение о расходах требует фактической доставки и товара.</p>`,
  `Запросы: ${source(paid,'сравнение категорий')} · тарифы: ${source(`${sheet}#gid=1328578076`,'рабочая модель')}`));

slides.push(slide(5,'Как продают в Нидерландах',`<div class="visual-split"><div><a href="https://profuomo.com/nl-nl/products/ppxs30017e-sand-cashmere-scarf" aria-label="Profuomo, кашемировый шарф"><img class="webshot" src="../../../research_assets/reference_screenshots/sites_priority/WEB-022_profuomo_cashmere_scarf_nl_clean_2026-09-16.png" alt="Скриншот кашемирового шарфа Profuomo на нидерландской версии сайта"></a><div class="caption">Карточка Profuomo: 100% кашемир, 35 × 200 см, цена и условия доставки.</div></div><div>
  <div class="refrow"><strong>Profuomo · €159,95</strong><p>Кашемировый шарф в собственном магазине; название, материал, фотографии и условия покупки собраны на одной странице. ${source('https://profuomo.com/nl-nl/products/ppxs30017e-sand-cashmere-scarf','Карточка ↗')}</p></div>
  <div class="refrow"><strong>Athemyll · €59,90</strong><p>100% кашемир на bol.com, 190 × 30 см. Маркетплейс даёт другой ценовой ориентир, но четыре старых отзыва не раскрывают продажи. ${source('https://www.bol.com/nl/nl/p/athemyll-kasjmier-sjaal-100-kasjmier-bruin-190-30-cm/9200000098299354/','Карточка ↗')}</p></div>
  <div class="refrow"><strong>Что перенять</strong><p>Честный масштаб на человеке, фактура крупно, понятный состав и обещание доставки — прежде рекламных формулировок.</p></div>
  </div></div>`,`Источники и дополнительные скриншоты: ${source(`${sheet}#gid=2026091501`,'референсы сайтов')}`,{kicker:'Местные референсы'}));

slides.push(slide(6,'Германия: ценовой ориентир для сравнения',`<div class="visual-split"><div><a href="https://purschoen.de/collections/slim/products/kaschmirschal-slim-natural-einfarbig-100-cashmere-purschoen"><img class="webshot" src="../../../research_assets/reference_screenshots/sites_priority/WEB-001_purschoen_cashmere_scarf_desktop_top.png" alt="Скриншот сайта PURSCHOEN, кашемировый шарф"></a><div class="caption">Скриншот карточки PURSCHOEN: изделие и путь к покупке.</div></div><div>
  <div class="refrow"><strong>PURSCHOEN · €109</strong><p>100% кашемир, 180 × 30 см. По размеру это близкий прямой референс. ${source('https://purschoen.de/collections/slim/products/kaschmirschal-slim-natural-einfarbig-100-cashmere-purschoen','Открыть товар ↗')}</p></div>
  <div class="refrow"><strong>ROECKL · €169</strong><p>100% кашемир, 180 × 30 см. Более высокая полка цены и действующее объявление шарфа в Meta. ${source('https://roeckl.com/de/business-cashmere-schal-30x180-black','Открыть товар ↗')}</p></div>
  <div class="refrow"><strong>Что проверить на своём товаре</strong><p>Качество края, объём ткани и ощущения на шее. Номинального состава недостаточно, чтобы обосновать цену.</p></div>
  </div></div>`,`Локальные карточки и скриншоты: ${source(`${sheet}#gid=2026091501`,'база референсов')}`,{kicker:'Местные референсы'}));

slides.push(slide(7,'Плед Maison Deux и подарочные наборы SOXS',`<div class="site-cases">
  <div class="site-case"><a href="https://maisondeux.com/products/lines-blanket-lilac-orange"><img src="../../../research_assets/reference_screenshots/sites_priority/WEB-023_maison_deux_lines_blanket_clean_2026-09-16.png" alt="Карточка пледа Maison Deux"></a><div class="site-case-copy"><strong>Maison Deux · Нидерланды · €169</strong><p>Плед 100% шерсть, 130 × 200 см. Фактура, интерьер, видео и подтверждения материала стоят рядом с кнопкой покупки.</p></div></div>
  <div class="site-case"><a href="https://soxs.co/en/giftbox/"><img src="../../../research_assets/reference_screenshots/sites_priority/WEB-024_soxs_giftbox_clean_2026-09-16.png" alt="Раздел подарочных наборов SOXS"></a><div class="site-case-copy"><strong>SOXS · Нидерланды · от €54,95</strong><p>Две пары шерстяных носков упакованы как подарок к разным поводам. Есть персонализация; наличие зависит от варианта.</p></div></div>
  </div><p class="mini-refs">Ещё товары первой волны: ${source('https://carebyme.dk/products/susan-throw','CareByMe · плед 2 200 DKK')} · ${source('https://uldplaiden.dk/products/halstorklaede-i-100-cashmere-sort-30-x-180-cm','Uldplaiden · шарф 849 DKK')} · ${source('https://www.wolvis.be/en/collections/scarves','Wolvis · шарфы €75–160')}</p>`,
  `Скриншоты сайтов сняты 16.09.2026; цены и наличие меняются. Подробнее: ${source(`${sheet}#gid=2026091501`,'референсы')}`,{kicker:'Сайты брендов'}));

slides.push(slide(8,'Шерстяные изделия на торговых площадках',`<p class="sub">По одной проверенной карточке в каждом рынке первой волны. Площадки различаются: bol, Miinto и CDON — маркетплейсы; Zalando — мультибрендовая витрина.</p>
  <table class="marketplace-table"><thead><tr><th>Рынок</th><th>Площадка и товар</th><th>Цена</th><th>Что видно</th></tr></thead><tbody>
    <tr><td>Нидерланды</td><td><a href="https://www.bol.com/nl/nl/p/athemyll-kasjmier-sjaal-100-kasjmier-bruin-190-30-cm/9200000098299354/">bol · шарф Athemyll ↗</a><span>Кашемир 190 × 30 см</span></td><td>€59,90</td><td>4 старых отзыва по цветовым вариантам</td></tr>
    <tr><td>Бельгия</td><td><a href="https://www.bol.com/be/nl/p/deken-100-wol-140x200cm-kleed-woldeken-plaid-1-persoons/9300000239354027/">bol.be · шерстяной плед ↗</a><span>100% шерсть, 140 × 200 см</span></td><td>€89,95</td><td>0 отзывов на карточке</td></tr>
    <tr><td>Дания</td><td><a href="https://www.miinto.dk/p-multifarvet-kompakt-uldtorklaede-d25858f2-fbfe-498d-aba4-7aba44d0572e">Miinto · шарф Ganni ↗</a><span>100% шерсть, 200 × 30 см</span></td><td>1 075 DKK</td><td>Скидка; отзывы не показаны</td></tr>
    <tr><td>Швеция</td><td><a href="https://cdon.se/produkt/maori-ullfilt-med-fransar-stl-140x200-cm-f4d576e3c4c6531e/">CDON · плед MAORI ↗</a><span>100% шерсть, 140 × 200 см</span></td><td>1 214 SEK</td><td>Продавец виден; отзывов нет</td></tr>
    <tr><td>Финляндия</td><td><a href="https://www.zalando.fi/cash-mere-huivi-schwarz-c3i54g001-q11.html">Zalando · шарф CASH-MERE ↗</a><span>Кашемир, 35 × 170 см</span></td><td>€139</td><td>Доставка и возврат; отзывов не видно</td></tr>
  </tbody></table><p class="note">Карточка и отзывы показывают наличие предложения, но не объём продаж. Цены и доступность — срез 16.09.2026.</p>`,
  `Прямые ссылки открывают товарные карточки. ${source(`${sheet}#gid=2026091502`,'ценовая выборка')}`,{kicker:'Маркетплейсы'}));

const brandRow = ([country,brand,product,site,followers,profile,format,post,engagement]) => `<tr><td>${country}</td><td><a href="${site}">${brand} ↗</a><span>${product}</span></td><td><a href="${profile}">${followers} ↗</a></td><td><a href="${post}">${format} ↗</a><span>${engagement}</span></td></tr>`;
const brandTable = (rows) => `<table class="brand-table"><thead><tr><th>Рынок</th><th>Бренд / изделие</th><th>Instagram</th><th>Публикация / видимая реакция</th></tr></thead><tbody>${rows.map(brandRow).join('')}</tbody></table>`;
const beneluxNordicBrands = [
  ['NL','Profuomo','Шарф €159,95','https://profuomo.com/nl-nl/products/ppxs30017e-sand-cashmere-scarf','40,3 тыс.','https://www.instagram.com/profuomo/','Городской образ','https://www.instagram.com/profuomo/reel/DdHU08zjnpi/','Счётчик реакций скрыт; ролик не о шарфе'],
  ['NL','extreme cashmere','Кашемировые изделия','https://extreme-cashmere.com/','93,5 тыс.','https://www.instagram.com/extreme.cashmere/','Люди и места','https://www.instagram.com/extreme.cashmere/p/Dc0yX2JjaR4/','Счётчик реакций скрыт'],
  ['BE','Wolvis','Мериновые шарфы €75–160','https://www.wolvis.be/en/collections/scarves','17,3 тыс.','https://www.instagram.com/wolvis.be/','Редакционная карусель','https://www.instagram.com/wolvis.be/p/DdUJHRvjZKR/','22 комментария · 2 репоста'],
  ['BE','La Femme Garniture','Мериновые шарфы','https://lafemmegarniture.be/','6 763','https://www.instagram.com/lafemmegarniture/','Образ с шарфом','https://www.instagram.com/lafemmegarniture/p/DcaXxVRCp3V/','Счётчик реакций скрыт'],
  ['DK','Wuth Copenhagen','Кашемировый шарф 1 700 DKK','https://www.wuthcopenhagen.com/en/products/classic-knitted-cashmere-scarf','7 935','https://www.instagram.com/wuthcopenhagen/','Reel коллекции','https://www.instagram.com/wuthcopenhagen/reel/DdGyIg-KFW6/','1 комментарий · 1 репост'],
  ['DK','Uldplaiden','Шарф 849 DKK','https://uldplaiden.dk/products/halstorklaede-i-100-cashmere-sort-30-x-180-cm','2 050','https://www.instagram.com/uldplaiden/','Reel о товаре','https://www.instagram.com/uldplaiden/reel/DdO5I9TDNSC/','178 просмотров · 2 лайка (15.09)']
];
slides.push(slide(8,'Бренды в соцсетях: NL, BE, DK',`<p class="sub">По два локальных бренда на страну. Подписчики — срез 16.09.2026; реакция указана только там, где она видна публично.</p>${brandTable(beneluxNordicBrands)}`,
  `Проверены официальные аккаунты и публикации. Подписчики/реакции не равны продажам.`,{kicker:'Соцсети по рынкам'}));

const northBrands = [
  ['SE','Klippan Yllefabrik','Шерстяные пледы','https://klippanyllefabrik.com/','24 тыс.','https://www.instagram.com/klippanyllefabrik/','Плед в интерьере','https://www.instagram.com/klippanyllefabrik/p/Dck_9AUDTIp/','Счётчик реакций скрыт'],
  ['SE','Sätila','Мериновый шарф 899 SEK','https://satila.com/se/','7 927','https://www.instagram.com/satila1896/','Шарф в образе','https://www.instagram.com/satila1896/p/DdEbNN8lbWW/','0 комментариев; лайки скрыты'],
  ['FI','Lapuan Kankurit','Шерстяной плед €169','https://lapuankankurit.fi/shop/wool-blankets-cushion-covers/camp-wool-blanket-black-light-grey-150-x-200-cm/','54,2 тыс.','https://www.instagram.com/lapuankankurit/','Производство','https://www.instagram.com/lapuankankurit/reel/DdMhLF7C5lg/','34 комментария · 10 репостов'],
  ['FI','Sukkamestarit','Мериновые носки','https://sukkamestarit.com/en/pages/meista','4 485','https://www.instagram.com/sukkamestarit/','TikTok о носках','https://www.tiktok.com/@sukkamestarit/video/7682764719127579926','1 116 просмотров; TikTok 1 991 подписчик']
];
slides.push(slide(9,'Бренды в соцсетях: Швеция и Финляндия',`<p class="sub">Здесь тоже есть действующие товарные бренды. Сравниваем их контент и видимый отклик, но не выдаём число подписчиков за объём рынка.</p>${brandTable(northBrands)}`,
  `Аккаунты проверены 16.09.2026. У Sukkamestarit подтверждён официальный TikTok; у остальных TikTok не установлен.`,{kicker:'Соцсети по рынкам'}));

const laterBrands = [
  ['DE','PURSCHOEN','Кашемировый шарф €109','https://purschoen.de/collections/slim/products/kaschmirschal-slim-natural-einfarbig-100-cashmere-purschoen','18,3 тыс.','https://www.instagram.com/purschoen/','Reel шарфа','https://www.instagram.com/purschoen/reel/DdHKxhPlfGU/','1 898 просмотров (15.09)'],
  ['DE','ROECKL','Кашемировый шарф от €169','https://roeckl.com/de/business-cashmere-schal-30x180-black','17,2 тыс.','https://www.instagram.com/roeckl_official/','Сочетание фактур','https://www.instagram.com/roeckl_official/reel/DdPFHFcgCrk/','418 просмотров (15.09)'],
  ['PL','KaszmirLove','Кашемир / аксессуары','https://www.kaszmirlove.pl/o-nas/','28,8 тыс.','https://www.instagram.com/kaszmirlove/','Reel с изделиями','https://www.instagram.com/kaszmirlove/reel/DdWn2ZGtqPs/','16 комментариев · 4 репоста'],
  ['PL','Eurowolle','Мериновые пледы 299–349 PLN','https://eurowolle.pl/','2 242','https://www.instagram.com/eurowolle/','Уход за изделием','https://www.instagram.com/eurowolle/reel/C_-RRDLIhMo/','Счётчик реакций скрыт']
];
slides.push(slide(10,'Германия и Польша: бренды для сравнения',`<p class="sub">Германия относится к другому брендовому направлению; Польша названа рынком после первых тестов. Их контент полезен как ориентир, но не меняет географию первого запуска.</p>${brandTable(laterBrands)}`,
  `Официальные аккаунты, срез 16.09.2026. Отдельные просмотры — срез 15.09.2026, не продажи.`,{kicker:'За пределами первой волны'}));

slides.push(slide(12,'Контент брендов в Бельгии, Дании и Финляндии',`<div class="creative-grid">
  <div class="creative"><a href="https://www.instagram.com/wolvis.be/p/DdUJHRvjZKR/"><img src="../../../research_assets/reference_screenshots/social_priority/wolvis_be_ig_2026-09-16.png" alt="Wolvis, бельгийский пост с шарфами"></a><strong>Wolvis · Бельгия</strong><p>Команда и стопка шарфов в одном кадре. Видны 22 комментария и 2 репоста.</p></div>
  <div class="creative"><a href="https://www.instagram.com/wuthcopenhagen/reel/DdGyIg-KFW6/"><img src="../../../research_assets/reference_screenshots/social_priority/wuth_dk_cashmere_reel_2026-09-16.png" alt="Wuth Copenhagen, кашемировый трикотаж"></a><strong>Wuth · Дания</strong><p>Кашемировый трикотаж на человеке; этот ролик о коллекции, не о шарфе. Видны 1 комментарий и 1 репост.</p></div>
  <div class="creative"><a href="https://www.instagram.com/lapuankankurit/p/DdTcbpIDYs5/"><img src="../../../research_assets/reference_screenshots/social_priority/lapuan_fi_wool_blanket_ig_2026-09-16.png" alt="Lapuan Kankurit, финский плед"></a><strong>Lapuan Kankurit · Финляндия</strong><p>Плед в руках, крупно видны рисунок и фактура; описание называет материал и место производства.</p></div>
  </div>`,
  `Скриншоты Instagram сняты 16.09.2026 без ретуши. Контент принадлежит брендам; реакции не доказывают продажи.`,{kicker:'Примеры публикаций'}));

slides.push(slide(7,'Реклама аналогов в NL, DK и Германии',`<p class="sub">Публичная библиотека показывает конкретные объявления и географию, но не расходы, заказы или прибыль обычных коммерческих кампаний.</p>
  <div style="margin-top:62px"><div class="ad-row"><b>Profuomo · NL</b><p>Активное объявление коллекции. Это присутствие бренда в рекламе, не доказательство продаж именно шарфа.</p>${source('https://www.facebook.com/ads/library/?id=1542690731208051','Объявление ↗')}</div>
  <div class="ad-row"><b>Uldplaiden · DK</b><p>В проверенной выборке есть одно активное объявление. Библиотека не показывает его коммерческий результат.</p>${source('https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=DK&q=Uldplaiden&search_type=keyword_unordered','Библиотека ↗')}</div>
  <div class="ad-row"><b>ROECKL · DE</b><p>Активная реклама кашемирового шарфа. Германия здесь — ценовой и креативный ориентир, не первая волна запуска.</p>${source('https://www.facebook.com/ads/library/?id=1594000718947030','Объявление ↗')}</div></div>`,
  `Метод: ${source('https://www.facebook.com/ads/library/','Meta Ad Library')} · ${source(paid,'проверенные ссылки')}`,{className:'dark',kicker:'Платное присутствие'}));

const nlCategoryBudgets = [
  ['Кашемировый шарф','880','$0,57','$57–171'],
  ['Шерстяной шарф','1 000','$0,42','$42–126'],
  ['Шерстяные носки','4 400','$0,62','$62–186'],
  ['Шерстяные перчатки','720','$0,76','$76–228'],
  ['Шерстяной плед','1 300','$0,54','$54–162']
];
slides.push(slide(11,'Нидерланды: цена клика по пяти товарам',`<p class="sub">Для каждой категории — одна локальная фраза. Диапазон справа = 100–300 кликов × справочный CPC в долларах; это расчёт размещения в Google Search.</p>
  <table class="budget-table"><thead><tr><th>Товар</th><th>Поисков/мес. · CPC</th><th>100–300 кликов</th></tr></thead><tbody>
  ${nlCategoryBudgets.map(([name,volume,cpc,cost])=>`<tr><td>${name}</td><td><b>${volume}</b><span>CPC ${cpc}</span></td><td><b>${cost}</b></td></tr>`).join('')}
  </tbody></table><p class="note">Один запрос не охватывает всю категорию; 300 кликов по узкой фразе могут быть недоступны. Meta, Shopping, сайт и производство креативов сюда не входят.</p>`,
  `Запросы и CPC: ${source(paid,'реклама и бюджет')} · ${source('https://support.google.com/google-ads/answer/3022575?hl=en-uk','метод Google Ads')}`,{kicker:'Закупка рекламы'}));

const scarfMarketBudgets = [
  ['Нидерланды','880','$0,57','$57–171'],
  ['Дания','260','$0,53','$53–159'],
  ['Швеция','590','$0,44','$44–132'],
  ['Финляндия','260','$0,95','$95–285'],
  ['Бельгия · nl','170','$0,47','$47–141']
];
slides.push(slide(12,'Кашемировый шарф: клик по пяти рынкам',`<p class="sub">Сравним одну локальную формулировку в каждой стране. Диапазон — расчёт закупки 100–300 кликов по справочному CPC, если такой трафик доступен.</p>
  <table class="budget-table"><thead><tr><th>Рынок</th><th>Поисков/мес. · CPC</th><th>100–300 кликов</th></tr></thead><tbody>
  ${scarfMarketBudgets.map(([name,volume,cpc,cost])=>`<tr><td>${name}</td><td><b>${volume}</b><span>CPC ${cpc}</span></td><td><b>${cost}</b></td></tr>`).join('')}
  </tbody></table><p class="note">Это не расходы конкурентов и не прогноз продаж. Для некоторых рынков 300 кликов по одной фразе не поместятся в её месячный спрос.</p>`,
  `HYPD/Google Ads, 16.09.2026 · ${source(paid,'исходные фразы и расчёты')} · ${source('https://support.google.com/google-ads/answer/3022575?hl=en-uk','метод прогноза')}`,{kicker:'Сравнение рынков'}));

slides.push(slide(8,'Остаток для запуска пока не подтверждён',`<div class="stock-grid"><div><p class="stock-lead">Кашемировый шарф — <span>первая гипотеза</span>, а не готовый запуск.</p><p class="sub">В исходной матрице два главных цвета BS-CS-011 и BS-CS-015: по 9 плановых единиц. Нужна физическая сверка партии в Испании.</p></div>
  <div class="stock-side"><h3>Два допустимых пути</h3><p>Продать проверенный остаток после контроля качества, упаковки и доставки.</p><p>Либо уточнить цикл производства и честно запустить предзаказ с реальным сроком.</p><p class="quiet">Не обещать наличие по одной плановой таблице.</p></div></div>`,
  `Источник: ${source(products,'артикулы и плановая матрица')} · ${source(`${sheet}#gid=2026091503`,'отзывы и риски товара')}`,{kicker:'Реальность товара'}));

slides.push(slide(9,'Очередность рынков после первого теста',`<div class="route">
  <div class="route-row"><b>Следующие кандидаты</b><strong>Дания и Бельгия · nl</strong><p>Данию проверяем при подтверждённой доставке и полной марже. Фламандская Бельгия подходит для малого теста с Bancontact, но объём одной фразы невелик.</p></div>
  <div class="route-row"><b>После проверки логистики</b><strong>Швеция и Финляндия</strong><p>Есть местные продавцы, маркетплейсы и сезонный поиск. Для запуска надо проверить цену, доставку и перевод товарных обещаний.</p></div>
  <div class="route-row"><b>После первых тестов</b><strong>Польша</strong><p>Следующий возможный рынок после проверки первой волны и операционной модели.</p></div>
  </div><p class="note">Германия не входит в эту последовательность: она рассматривается для другого бренда. Переход между странами текущего направления зависит от заказов, возвратов и экономики.</p>`,
  `Клиентский фокус: ${source('https://docs.google.com/document/d/12xWKM0fQ4puF7RSBhslq64eez2CkR_Pc/edit','исходный документ')} · ${source(`${sheet}#gid=1326964440`,'сравнение рынков')}`,{kicker:'Очередность'}));

slides.push(slide(10,'Предел расходов на заказ шарфа в Нидерландах',`<p class="sub">Рабочая цена €129 с НДС. Из неё сначала вычитаем налог, товар, модельную доставку и €20 целевого остатка.</p>
  <div class="single-formula"><div class="f-number">€46,55</div><div><h3>Верхняя граница до открытых затрат</h3><p>€129 / 1,21 − €16,06 товар − €24 доставка − €20 резерв.</p><p>Это ещё не допустимая стоимость привлечения: оплату, упаковку, склад и возвраты также надо вычесть.</p></div></div>
  <p class="budget-text">Пока эти затраты и фактический тариф доставки не подтверждены, назначать рекламный бюджет как «окупаемый» нельзя.</p>`,
  `Расчёт и допущения: ${source(paid,'открытая модель')} · НДС и доставка — рабочие входы, не договорные тарифы.`,{kicker:'Экономика теста'}));

slides.push(slide(11,'Этапы запуска после выбора рынка',`<div class="steps"><div class="step"><h3>Сначала создаём основу</h3><p>Утверждаем название и позиционирование будущего бренда.</p><p>Проверяем товар, цену, доказательства состава и логистику.</p><p>Создаём сайт, карточки, фотографии, условия покупки и социальные каналы для доверия.</p></div>
  <div class="step"><h3>Затем проверяем продажи</h3><p>Настраиваем аналитику, рекламные кабинеты и ограниченный тест на одном рынке.</p><p>Сравниваем оплаченные клики, выполненные заказы, возвраты и вклад после рекламы.</p><p class="muted">Инфлюенсеров и расширение каналов считаем, когда есть достаточный ассортимент и повторяемая экономика.</p></div></div>`,
  `Роли, зависимости и этапы: ${source(`${sheet}#gid=2026091403`,'план запуска')}`,{kicker:'План запуска'}));

slides.push(slide(12,'На чём основано решение',`<p class="sub">Все цифры привязаны к конкретному показателю и источнику. Поисковый спрос не равен продажам, а открытая реклама конкурента не раскрывает его бюджет.</p>
  <div class="sources">
    <a href="${results}">Клиентская сводка и решение по рынку</a>
    <a href="${paid}">Запросы и CPC по категориям NL, DK, SE, FI</a>
    <a href="${products}">Товарная матрица и статус остатка</a>
    <a href="${sheet}#gid=2026091501">Скриншоты сайтов и референсы креативов</a>
    <a href="https://support.google.com/google-ads/answer/3022575?hl=en-uk">Как устроен Keyword Planner</a>
    <a href="https://support.google.com/trends/answer/4365533?hl=ru">Почему Google Trends — относительный индекс</a>
    <a href="https://www.facebook.com/ads/library/">Проверка объявлений Meta</a>
    <a href="${sheet}#gid=2026091702">Редактируемая финансовая модель</a>
  </div><p class="endline">Решение сегодня — рынок и продуктовая концепция. Медиаплан появится после этого выбора и проверки исходных затрат.</p>`,
  `Полное исследование: ${source(sheet,'открыть таблицу')}`,{kicker:'Источники'}));

root.innerHTML = slides.join('');

// Не оставлять короткие русские предлоги в конце перенесённой строки.
const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  if (!node.parentElement?.closest('.slide')) continue;
  node.nodeValue = node.nodeValue.replace(/(?<![\p{L}\p{N}])(в|с|к|у|о|и|а|на|по|от|из|до|за|для|без|при) +(?=\S)/giu, '$1\u00a0');
}
window.__AVDAR_DECK_READY__ = true;
