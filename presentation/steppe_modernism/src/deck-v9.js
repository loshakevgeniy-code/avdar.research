const root = document.getElementById('deck');
const countries = window.COUNTRY_DATA_V9;
if (!countries) throw new Error('country-data-v9.js не загружен');
const marketPresence = window.MARKET_PRESENCE_V14;
if (!marketPresence) throw new Error('market-presence-v14.js не загружен');
const channels = window.CHANNEL_DATA_V16;
if (!channels) throw new Error('channel-data-v16.js не загружен');

const sheet = 'https://docs.google.com/spreadsheets/d/1YmtIAePP6YoGmcc-30R37Vyej0Wt9YTMzaDNA_7Nm0Q/edit';
const searchData = `${sheet}#gid=2026091607`;
const polandSearchData = `${sheet}#gid=719697100&range=J226:N245`;
const polandTrends = 'https://trends.google.com/trends/explore?hl=pl&date=today%205-y&geo=PL&q=szalik%20kaszmirowy%2Cszalik%20we%C5%82niany%2Cskarpety%20we%C5%82niane%2Cr%C4%99kawiczki%20we%C5%82niane%2Ckoc%20we%C5%82niany';
const stockData = `${sheet}#gid=433698039`;
const comext = 'https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=DE&reporter=NL&reporter=PL&reporter=DK&reporter=BE&reporter=SE&reporter=FI&partner=WORLD&product=62142000&product=61159400&product=61169100&product=63012010&product=63012090&flow=1&flow=2&indicators=SUPPLEMENTARY_QUANTITY&indicators=VALUE_IN_EUROS&sinceTimePeriod=2025&untilTimePeriod=2025';
const spending = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nama_10_cp18?lang=EN&time=2024&coicop18=CP031&coicop18=CP052&unit=CP_MEUR&geo=DE&geo=NL&geo=PL&geo=DK&geo=BE&geo=SE&geo=FI';
const online = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ec_ibgs?lang=EN&time=2024&indic_is=I_BCLOT1&ind_type=IND_TOTAL&unit=PC_IND&geo=DE&geo=NL&geo=PL&geo=DK&geo=BE&geo=SE&geo=FI';
const euCodes = 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202402522';
const ecbRates = 'https://www.ecb.europa.eu/stats/shared/pdf/eurofxref.pdf?f129c4c3a91dc95430cdbdf4a3b86559=';
// Курс ЕЦБ на 16.09.2026: количество единиц валюты за €1.
const currencyPerEuro = { USD: 1.1537, PLN: 4.3473, DKK: 7.4755, SEK: 11.2875 };
const cite = (url, label) => `<a class="source" href="${url}">${label}</a>`;
const whole = (n) => n == null ? '—' : Number(n).toLocaleString('ru-RU');
const dec = (n, digits=2) => Number(n).toLocaleString('ru-RU',{minimumFractionDigits:digits,maximumFractionDigits:digits});
const billion = (million) => `€${dec(million/1000,2)} млрд`;
const pct = (n) => `${dec(n,2)}%`;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function convertedPrice(raw) {
  const match = String(raw ?? '').match(/^([\d][\d\s]*(?:[,.]\d{1,2})?)\s*(PLN|zł|DKK|SEK)(.*)$/i);
  if (!match) return null;
  const currency = match[2].toLowerCase() === 'zł' ? 'PLN' : match[2].toUpperCase();
  const amount = Number(match[1].replace(/\s/g, '').replace(',', '.'));
  return { euro: Math.round(amount / currencyPerEuro[currency]), original: `${match[1].trim()} ${match[2]}`, suffix: match[3].trim() };
}
function priceHtml(raw) {
  const price = convertedPrice(raw);
  if (!price) return esc(raw ?? '');
  return `≈€${whole(price.euro)}<small class="original-currency">(${esc(price.original)}${price.suffix ? ` ${esc(price.suffix)}` : ''})</small>`;
}
function priceText(raw) {
  const price = convertedPrice(raw);
  return price ? `≈€${whole(price.euro)} (${price.original})` : String(raw);
}
const priceEvidence = (code) => ['PL','DK','SE'].includes(code)
  ? ` Пересчёт в евро по ${cite(ecbRates,'курсу ЕЦБ 16.09.2026')}; суммы округлены до €1.`
  : '';
const slides = [];
function slide(title, body, evidence='', className='') {
  const number = slides.length + 1;
  slides.push(`<section class="slide ${className}">
    <div class="top"><span>Исследование рынка шерстяных изделий</span><span></span></div>
    <div class="slide-body">${title ? `<h2>${title}</h2>` : ''}${body}</div>
    ${evidence ? `<div class="evidence-line">${evidence}</div>` : ''}
    <div class="page-no">${String(number).padStart(2,'0')}</div>
  </section>`);
}

slides.push(`<section class="slide cover photo">
  <img class="cover-bg" src="../assets/steppe-textile-cover.png" alt="Фактура шерстяной ткани">
  <div class="cover-shade"></div>
  <div class="top"><span>Исследование рынка шерстяных изделий</span></div>
  <div class="slide-body"><h1>Где начинать<br>продажи</h1><p class="sub">Семь рынков: спрос, поставки, цены и бренды в продаже</p></div>
</section>`);

slide('Как читать показатели', `
  <div class="measure-list">
    <div><strong>Поиск</strong><p>Среднее число запросов по локальной фразе и близким вариантам за месяц. CPC — ориентир стоимости клика, пересчитанный из долларов в евро по курсу ЕЦБ 16.09.2026.</p></div>
    <div><strong>Покупки онлайн</strong><p>Доля жителей 16–74 лет, покупавших одежду, обувь или аксессуары онлайн за последние три месяца. Данные за 2024 год.</p></div>
    <div><strong>Расходы домохозяйств</strong><p>Одежда и домашний текстиль в целом, в текущих ценах 2024 года. Это шире шерстяных изделий.</p></div>
    <div><strong>Ввоз и вывоз</strong><p>Товары, пересёкшие границу в 2025 году. Поставки нельзя приравнивать к розничным покупкам в стране.</p></div>
    <div><strong>Бренды и реклама</strong><p>Местная витрина и доставка подтверждают наличие предложения, но не продажи. Подписчики Instagram относятся ко всему аккаунту. Страна показа рекламы подтверждена только там, где это прямо указано на слайде. Цены в местной валюте показаны рядом с приблизительной ценой в евро.</p></div>
  </div>`, `${cite(searchData,'локальные запросы')} · ${cite(polandSearchData,'Польша: запросы')} · ${cite(spending,'Eurostat: расходы')} · ${cite(online,'Eurostat: онлайн-покупки')} · ${cite(comext,'Eurostat: торговля')} · ${cite(ecbRates,'курс ЕЦБ')} · ${cite('https://www.facebook.com/ads/library/api/','Meta: доступные данные')}`);

const tradeRows = [
  ['scarves','Шарфы и шали (невязаные), шт.'],
  ['socks','Носки, пар'],
  ['gloves','Перчатки, пар'],
  ['blankets','Пледы и одеяла, шт.'],
];

function metricsSlide(data) {
  const searchRows = (data.searches || []).map((item) => `<tr>
    <td>${esc(item.product)}<span class="query">${esc(item.query)}</span></td>
    <td class="num">${whole(item.volume)}</td><td class="num">${item.cpc == null ? '—' : `€${dec(item.cpc / currencyPerEuro.USD,2)}`}</td>
  </tr>`).join('');
  const imports = tradeRows.map(([key,label]) => {
    const item = data.trade[key] || {};
    return `<tr><td>${label}</td><td class="num">${whole(item.importQty)}</td><td class="num">${whole(item.exportQty)}</td></tr>`;
  }).join('');
  const tradeNote = data.code === 'BE'
    ? 'Экспорт пледов не указан: дополнительная единица в источнике требует проверки.'
    : 'Шарфы: только невязаные изделия. Кашемир отдельно в этой статистике не выделен.';
  const searchCaveat = {
    DE: 'Wolldecke включает и одеяла; это не та же фраза, что нидерландская wollen plaid.',
    BE: 'Поиск измерен только по нидерландской фразе; франкоязычный спрос не учтён.',
    PL: 'Два запроса измерены 09.09.2026; для трёх категорий абсолютных оценок нет. Прочерк не означает нулевой спрос.',
    SE: 'Для точной фразы Google Trends не показывает достаточно данных. Оценку 590 нужно сверить в Keyword Planner.',
    FI: 'Для точной фразы Google Trends не показывает достаточно данных. Оценку 260 нужно сверить в Keyword Planner.',
  }[data.code];
  slide('', `
    <div class="country-title"><h2>${esc(data.name)}</h2><span>Поиск, покупки и поставки</span></div>
    <div class="metric-strip">
      <div class="metric-item"><strong>${billion(data.spend.clothingMEUR)}</strong><span>траты на одежду, 2024</span></div>
      <div class="metric-item"><strong>${billion(data.spend.homeTextileMEUR)}</strong><span>траты на домашний текстиль, 2024</span></div>
      <div class="metric-item"><strong>${pct(data.spend.onlinePct)}</strong><span>покупали одежду, обувь или аксессуары онлайн, 2024</span></div>
    </div>
    <div class="data-columns">
      <div><h3>Локальные запросы</h3><table class="country-table search-table"><thead><tr><th>Товар и фраза</th><th>Поисков/мес.</th><th>CPC, ≈€</th></tr></thead><tbody>${searchRows}</tbody></table></div>
      <div><h3>Ввоз и вывоз в 2025 году</h3><table class="country-table trade-table"><thead><tr><th>Группа товаров</th><th>Ввоз</th><th>Вывоз</th></tr></thead><tbody>${imports}</tbody></table></div>
    </div>
    <div class="country-notes"><p>Поиск: выбранные фразы, не вся категория. Среднее за сентябрь 2025 — август 2026.${searchCaveat ? ` ${searchCaveat}` : ''}</p><p>${tradeNote}</p></div>
  `, `${cite(data.code === 'PL' ? polandSearchData : searchData,'поиск и CPC')} · ${cite(ecbRates,'курс ЕЦБ 16.09.2026')} · ${data.code === 'PL' ? `${cite(polandTrends,'сезонность')} · ` : ''}${cite(spending,'траты')} · ${cite(online,'онлайн-покупки')} · ${cite(comext,'ввоз и вывоз')} · ${cite(euCodes,'коды товаров')}`);
}

function sitesSlide(data) {
  const cards = data.brands.filter((brand) => brand.image && brand.url).slice(0,2).map((brand) => `<div class="site-ref ${brand.name === 'Les Soeurs' ? 'les-soeurs-ref' : ''}">
    <a class="image-link" href="${brand.url}"><img src="${brand.image}" alt="Сайт ${esc(brand.name)}: ${esc(brand.product)}"></a>
    <div class="site-text"><strong>${esc(brand.name)}</strong><span class="price">${priceHtml(brand.price)}</span></div>
    <p>${esc(brand.product)}${brand.material ? `, ${esc(brand.material)}` : ''}</p>
    ${cite(brand.url,'Открыть товар ↗')}
  </div>`).join('');
  const item = data.marketplace;
  slide(`${esc(data.name)}: сайты и товары`, `
    <div class="site-pair">${cards}</div>
    <div class="marketplace-line"><b>${esc(item.platform)}</b><p>${esc(item.product)}${item.material ? `, ${esc(item.material)}` : ''} · ${priceHtml(item.price)}</p>${cite(item.url,'Карточка товара ↗')}</div>
  `, `Цены и наличие проверены ${data.code === 'PL' ? '17.09.2026' : '16.09.2026'}.${priceEvidence(data.code)}`);
}

function marketPresenceSlide(data) {
  const market = marketPresence[data.code];
  if (!market) throw new Error(`Нет примеров брендов на рынке ${data.code}`);
  const feature = market.feature;
  const others = market.others.map((brand) => `<div class="market-presence-item">
    <div class="market-presence-head"><strong>${esc(brand.brand)}</strong><span>${priceHtml(brand.price)}</span></div>
    <p>${esc(brand.product)}</p><small>${esc(brand.proof)}</small>
    ${cite(brand.url,'Открыть товар ↗')}
  </div>`).join('');
  slide(`${esc(data.name)}: бренды в продаже`, `
    <div class="market-presence-layout">
      <div class="market-presence-feature">
        <a class="image-link" href="${feature.url}"><img src="${feature.image}" alt="${esc(feature.brand)}: товар на витрине для покупателей страны"></a>
        <div class="market-presence-head"><strong>${esc(feature.brand)}</strong><span>${priceHtml(feature.price)}</span></div>
        <p>${esc(feature.product)}</p><small>${esc(feature.proof)}</small>
        ${cite(feature.url,'Открыть товар ↗')}
      </div>
      <div class="market-presence-list">${others}
        <p class="market-presence-note">Карточки показывают ассортимент и цены, но не объём продаж.</p>
      </div>
    </div>
  `, `Предложения проверены 17.09.2026. Цены и наличие могут измениться.${priceEvidence(data.code)}`);
}

function socialSlide(data) {
  const photo = data.socialImage;
  const photoBrand = data.brands.find((brand) => brand.socialImage === photo);
  const socialBrands = [photoBrand, ...data.brands.filter((brand) => brand.instagram && brand.post)]
    .filter((brand, index, list) => brand && list.indexOf(brand) === index && brand.instagram && brand.post)
    .slice(0,2);
  const social = socialBrands.map((brand) => `<div class="social-case">
    <strong>${esc(brand.name)}</strong><span class="follow">${esc(brand.followersLabel || `${whole(brand.followers)} подписчиков`)}</span>
    <p>${esc(brand.postNote || brand.product)}</p>
    ${cite(brand.instagram,'Instagram ↗')}${cite(brand.post,brand.post.includes('tiktok.com') ? 'Видео в TikTok ↗' : 'Публикация ↗')}
    ${brand.engagement ? `<div class="engagement">${esc(brand.engagement)}</div>` : ''}
  </div>`).join('');
  const ads = (data.metaAds || []).map((item) => `<div class="meta-ad-item">
    <div class="meta-ad-head"><strong>${esc(item.brand)}</strong><span>${item.period ? esc(item.period) : `с ${esc(item.since)}`}</span></div>
    <p>${esc(item.product)}</p>
    ${item.geo ? `<small class="ad-geo">${esc(item.geo)}</small>` : ''}
    ${cite(item.url,'Объявление ↗')}${item.site ? cite(item.site,'Сайт бренда ↗') : ''}
  </div>`).join('');
  const ad = ads ? `<div class="social-ad"><h3>Примеры объявлений в Meta</h3>${ads}</div>` : '';
  const photoLink = data.socialImageLink || photoBrand?.post || socialBrands[0]?.post;
  slide(`${esc(data.name)}: соцсети брендов`, `
    <div class="social-layout">
      <div><a class="image-link social-frame ${data.code.toLowerCase()}-social" href="${photoLink}"><img class="social-image ${data.code.toLowerCase()}-social" src="${photo}" alt="Публикация бренда: ${esc(data.name)}"></a></div>
      <div>${social}${ad}</div>
    </div>
  `, `Подписчики и реакции: ${data.code === 'PL' ? '17.09.2026' : '16.09.2026'}. География показов подтверждена только у объявлений с пометкой.`);
}

function channelsSlide(data) {
  const item = channels[data.code];
  if (!item || item.rows.length !== 4) throw new Error(`Неполная карта каналов для ${data.code}`);
  const rows = item.rows.map((row) => `<div class="channel-row">
    <strong>${esc(row.category)}</strong>
    <div><a class="channel-retailer" href="${esc(row.url)}">${esc(row.seller)} ↗</a><span>${esc(row.type)}</span><p>${esc(row.detail)}</p></div>
  </div>`).join('');
  slide(`${esc(data.name)}: другие места покупки`, `
    <div class="channel-layout">
      <figure class="channel-visual"><a class="image-link" href="${esc(item.imageUrl)}"><img src="${esc(item.image)}" alt="Витрина ${esc(item.imageCaption)}"></a>
        <figcaption>${esc(item.imageCaption)} ${cite(item.imageUrl,'Открыть витрину ↗')}</figcaption></figure>
      <div class="channel-list">${rows}</div>
    </div>
    <div class="channel-bottom">
      <div><strong>Как получить заказ</strong><p>${esc(item.purchase)}</p>${cite(item.purchaseUrl,'Условия покупки ↗')}${item.purchaseExtraUrl ? cite(item.purchaseExtraUrl,'Доставка в стране ↗') : ''}</div>
      <div><strong>Для запуска</strong><p>${esc(item.conclusion)}</p>${item.conclusionUrl ? cite(item.conclusionUrl,'Пример канала ↗') : ''}</div>
    </div>
  `, `Примеры показывают наличие товаров и способ покупки, но не объём продаж и не условия размещения новой марки.${['DK','SE'].includes(data.code) ? ` ${cite(ecbRates,'пересчёт в евро по курсу ЕЦБ')}` : ''}`);
}

for (const code of ['DE','NL','PL','DK','BE','SE','FI']) {
  const data = countries[code];
  if (!data) throw new Error(`Нет данных по ${code}`);
  metricsSlide(data);
  sitesSlide(data);
  marketPresenceSlide(data);
  socialSlide(data);
  channelsSlide(data);
}

const quinceStatement = 'https://www.prnewswire.com/news-releases/quince-raises-500m-series-e-resulting-in-10-1b-valuation-to-accelerate-the-manufacturer-to-consumer-platform-302710298.html';
const quinceSales = 'https://www.linkedin.com/posts/onequince_quince-retail-innovation-activity-7488276080395464704-k9yB';
const quinceProduct = 'https://www.quince.com/women/cashmere/cashmere-crewneck-sweater?color=heather-grey';
const soxsOrders = 'https://nl.linkedin.com/posts/soxsco_500000-momenten-van-warmte-in-10-jaar-tijd-activity-7373615426347503617-Pjlq';
const soxsInterview = 'https://www.snn.nl/raak-geinspireerd/wij-verkopen-geen-sokken-maar-warmte';
const soxsStore = 'https://soxs.co/de/';

slide('', `
  <div class="d2c-heading"><span>УСПЕШНЫЕ D2C БРЕНДЫ</span><h2>Quince <small>США</small></h2></div>
  <div class="d2c-layout">
    <div class="d2c-story">
      <div class="d2c-main-number"><strong>более $2 млрд</strong><p>продажи за последние 12 месяцев к июлю 2026 года</p></div>
      <div class="d2c-two-numbers"><p><strong>более $1 млрд</strong><span>выручка за 2025 год</span></p><p><strong>$50</strong><span>цена первого товара: кашемирового свитера</span></p></div>
      <p class="d2c-explanation">Quince начал с кашемирового свитера и вырос до более чем 100 категорий. На карточке товара видны материал, отзывы, доставка и возврат.</p>
      <p class="d2c-caution">$10,1 млрд — оценка компании после привлечения инвестиций, не продажи. Эти цифры относятся ко всему бизнесу, а не только к кашемиру или европейским рынкам.</p>
    </div>
    <figure class="d2c-figure"><a class="image-link" href="${quinceProduct}"><img src="../../../research_assets/reference_screenshots/d2c_cases/quince_cashmere_site.png" alt="Quince: карточка кашемирового свитера за 50 долларов"></a><figcaption>Карточка товара на сайте Quince ${cite(quinceProduct,'Открыть сайт ↗')}</figcaption></figure>
  </div>
`, `${cite(quinceStatement,'Quince: выручка и оценка')} · ${cite(quinceSales,'Quince: продажи за 12 месяцев')} · ${cite(quinceProduct,'сайт бренда')} · Числа сообщены компанией, не подтверждены аудитом.`, 'd2c-slide');

slide('', `
  <div class="d2c-heading"><span>УСПЕШНЫЕ D2C БРЕНДЫ</span><h2>SOXS <small>Нидерланды</small></h2></div>
  <div class="d2c-layout d2c-reverse">
    <figure class="d2c-figure"><a class="image-link" href="${soxsStore}"><img src="../../../research_assets/reference_screenshots/d2c_cases/soxs_wool_socks_site.png" alt="SOXS: главная страница немецкого интернет-магазина"></a><figcaption>Немецкая версия сайта SOXS ${cite(soxsStore,'Открыть сайт ↗')}</figcaption></figure>
    <div class="d2c-story">
      <div class="d2c-main-number"><strong>500 000 заказов</strong><p>за 10 лет, по заявлению SOXS</p></div>
      <div class="d2c-two-numbers"><p><strong>100 000 пар</strong><span>шерстяных носков продано в 2022 году</span></p><p><strong>14 стран</strong><span>магазины с товарами SOXS в 2023 году</span></p></div>
      <p class="d2c-explanation">Собственный сайт продаёт носки и персонализацию. Сооснователь также называет магазины и корпоративные подарки.</p>
      <p class="d2c-caution">SOXS сочетает D2C, розницу и корпоративные продажи. Все 500 000 заказов нельзя приписать сайту; публичной выручки бренд не раскрыл.</p>
    </div>
  </div>
`, `${cite(soxsOrders,'SOXS: 500 000 заказов')} · ${cite(soxsInterview,'интервью сооснователя')} · ${cite(soxsStore,'сайт бренда')} · Числа заказов и пар сообщены брендом.`, 'd2c-slide');

function prioritySlide(data, title, lead, reason, condition) {
  slide(title, `
    <p class="priority-lead">${lead}</p>
    <div class="priority-metrics">
      <div><strong>${billion(data.spend.clothingMEUR)}</strong><span>расходы на одежду, 2024</span></div>
      <div><strong>${whole(data.trade.scarves.importQty)}</strong><span>ввезено невязаных шарфов и шалей, шт., 2025</span></div>
      <div><strong>${whole(data.searches[0].volume)}</strong><span>запросов в месяц по «${esc(data.searches[0].query)}»</span></div>
      <div><strong>${pct(data.spend.onlinePct)}</strong><span>покупали одежду и аксессуары онлайн, 2024</span></div>
    </div>
    <div class="priority-reasons"><div><h3>Почему этот рынок</h3><p>${reason}</p></div><div><h3>Условие для теста</h3><p>${condition}</p></div></div>
  `, `${cite(spending,'расходы на одежду')} · ${cite(online,'онлайн-покупки')} · ${cite(comext,'поставки')} · ${cite(data.code === 'PL' ? polandSearchData : searchData,'локальные запросы')}${data.code === 'PL' ? ` · ${cite(ecbRates,'курс ЕЦБ 16.09.2026')}` : ''}`);
}

prioritySlide(countries.DE, 'Первый тест — Германия',
  'Рекомендуем сначала проверить продажи кашемирового шарфа небольшой партией.',
  'Германия ввезла больше всего невязаных шарфов среди семи рынков. На рынке есть и местный PURSCHOEN (€109), и зарубежные GOBI (€79) и Falconeri (€118).',
  'Подтвердить физический остаток в Испании, стоимость доставки и возврата. До рекламного запуска посчитать экономику одного заказа.');

prioritySlide(countries.NL, 'Нидерланды: кандидат после Германии',
  'После немецкого теста сравнить Нидерланды и Польшу по цене и стоимости оплаченного заказа.',
  'Доля онлайн-покупателей одежды здесь 64,12%. На рынке продаются Profuomo (€159,95) и зарубежный Falconeri (€118); цена шарфа на bol ещё ниже.',
  'Не считать объём ввоза местным спросом: часть товаров идёт на реэкспорт. Проверить локальную доставку и рекламную экономику отдельно.');

prioritySlide(countries.PL, 'Польша: проверка цены и доставки',
  'Польша — кандидат для отдельного теста кашемирового шарфа.',
  `Mongolian.pl предлагает кашемировый шарф за ${priceText('449 zł')}. Falconeri продаёт аналогичный шарф за ${priceText('489 zł')}.`,
  'Рассчитать конечную цену для покупателя с учётом НДС и доставки из Испании. Затем проверить её небольшим рекламным тестом и измерить стоимость оплаченного заказа.');

slide('Шарф и носки: экономика заказа', `
  <p class="basket-intro">Германия. Носки ищут чаще: 4 400 запросов в месяц по «Wollsocken» против 1 000 по «Kaschmirschal». Это выбранные фразы, а не все поиски в категориях.</p>
  <table class="basket-compare">
    <thead><tr><th>Один самостоятельный заказ</th><th>Кашемировый шарф</th><th>Три пары коротких носков<span class="basket-subhead">По цене конкурента</span></th></tr></thead>
    <tbody>
      <tr><td>Цена покупателю с НДС</td><td>€129</td><td>€44,85 <span>3 × €14,95</span></td></tr>
      <tr><td>Выручка после НДС 19%</td><td>€108,40</td><td>€37,69</td></tr>
      <tr><td>Вычитаем стоимость товара</td><td>€16,06</td><td>€13,50</td></tr>
      <tr><td>Вычитаем доставку из Испании</td><td>€19</td><td>€19</td></tr>
      <tr class="basket-result"><td>Остаётся до остальных затрат</td><td>€73,34</td><td>€5,19</td></tr>
    </tbody>
  </table>
  <div class="basket-bottom"><p><strong>Разница €68,15 с заказа.</strong> При этих допущениях шарф оставляет больше средств на рекламу. Носки стоит проверить как дополнение к заказу, если тариф посылки не вырастет.</p>
    <p>€129 — рабочая цена шарфа. €14,95 — цена пары у конкурента на 08.09.2026, не наша цена. €19 — предварительная доставка, вычтена целиком. Тариф для трёх пар ещё не подтверждён. Комиссии, упаковка, возвраты и реклама не вычтены. 49 шарфов и 234 пары носков (113 коротких) — план, не подтверждённый склад.</p></div>
`, `${cite(searchData,'локальные запросы')} · ${cite(`${sheet}#gid=2026091702&range=A5:L20`,'расчёт шарфа')} · ${cite(`${sheet}#gid=987654321&range=A238:J247`,'расчёт носков')} · ${cite(`${sheet}#gid=1328578076&range=A1:H4`,'доставка')} · ${cite('https://europa.eu/youreurope/business/finance-and-tax/vat/vat-rules-rates/index_de.htm','НДС')} · ${cite(stockData,'товары')}`);

slide('После выбора рынка', `
  <div class="launch-grid"><div><h3>Подготовка к продажам</h3><p>Разработать название, визуальный стиль и упаковку. Подготовить подтверждения качества изделия.</p><p>Сделать сайт с локальным языком, оплатой, условиями доставки и возврата.</p><p>Запустить соцсети с товарными фото, видео и рассказом о производстве.</p></div>
    <div><h3>Проверка и рост</h3><p>Настроить аналитику и рекламные площадки, затем провести тест одного товара на одном рынке.</p><p>Оценивать выполненные заказы, стоимость возвратов и маржу после рекламы.</p><p>После пилота проверить условия площадок, мультибрендов и магазинов подарков. При расширении ассортимента оценить работу с инфлюенсерами.</p></div></div>
`, `${cite(`${sheet}#gid=2026091403`,'план запуска')} · ${cite(`${sheet}#gid=2026091702`,'экономика')}`);

slide('Источники данных', `
  <div class="source-list">
    <div><a href="${comext}">Eurostat Comext: ввоз и вывоз по товарным кодам</a><p>2025 год, стоимость и количество; импорт не равен местным продажам.</p></div>
    <div><a href="${spending}">Eurostat: расходы на одежду и домашний текстиль</a><p>2024 год, широкие категории, текущие цены.</p></div>
    <div><a href="${online}">Eurostat: покупки одежды онлайн</a><p>2024 год, жители 16–74 лет, последние три месяца.</p></div>
    <div><a href="${euCodes}">Товарная номенклатура ЕС</a><p>Состав групп и дополнительные единицы учёта.</p></div>
    <div><a href="${searchData}">Локальные фразы и стоимость клика</a><p>Данные HYPD/Google Ads по конкретным формулировкам. <a href="${polandSearchData}">Польша: срез 09.09.2026</a></p></div>
    <div><a href="https://www.facebook.com/ads/library/">Meta Ads Library: креативы брендов</a><p>Страна показа проверена в «Видимости местоположения» только у отмеченных объявлений. Расходы на рекламу и продажи не раскрываются.</p></div>
  </div>
`, `${cite(sheet,'открыть полную таблицу исследования')} · ${cite(`${sheet}#gid=1274505139`,'бренды по рынкам')}`);

root.innerHTML = slides.join('');

// Неразрывные пробелы после коротких русских слов убирают висячие предлоги.
const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  if (!node.parentElement?.closest('.slide')) continue;
  node.nodeValue = node.nodeValue.replace(/(?<![\p{L}\p{N}])(в|с|к|у|о|и|а|не|на|по|от|из|до|за|для|без|при) +(?=\S)/giu, '$1\u00a0');
}
window.__AVDAR_DECK_READY__ = true;
