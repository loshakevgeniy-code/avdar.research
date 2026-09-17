import fs from 'node:fs/promises';
import path from 'node:path';

const checkedAt = '2026-09-15';
const outputDir = '/Users/evgeniyloshak/Documents/ECOM/research_assets';

const sources = {
  hmDeWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'DE', aggregate: 4.7, count: 193,
    url: 'https://www2.hm.com/de_de/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине H&M Group могут быть синдицированы; статус покупки не показан.'
  },
  tchiboDeCashmere: {
    product: 'Tchibo Cashmere-Strickschal', market: 'DE', aggregate: 4.5, count: null,
    url: 'https://www.tchibo.de/products/147594165877/cashmere-strickschal?article_id=114328486258',
    type: 'официальная карточка ритейлера',
    limitation: 'Индивидуальная оценка в доступном фрагменте не показана; опираемся на текст и рейтинг карточки.'
  },
  ottoDeCashmere: {
    product: 'Bovari 100% Kaschmir Schal', market: 'DE', aggregate: 4.6, count: 19,
    url: 'https://www.otto.de/p/bovari-kaschmirschal-100-kaschmir-schal-damen-und-herren-strick-schal-premium-qualitaet-S0U5I039/?variationId=S0U5I0394TCT',
    type: 'крупный маркетплейс, карточка товара',
    limitation: 'Покупка помечена подтверждённой, но индивидуальная звезда в текстовом фрагменте не видна.'
  },
  ottoDeYak: {
    product: 'Ritter Yakdecke Himalaya', market: 'DE', aggregate: 5.0, count: 2,
    url: 'https://www.otto.de/p/wohndecke-flauschige-yakdecke-himalaya-aus-100-yakwolle-dunkelbraun-ritter-decken-wolldecke-tagesdecke-100-yak-auf-schurwollkette-weitere-groessen-S0U2P0QS/',
    type: 'крупный маркетплейс, карточка товара',
    limitation: 'Подтверждённая покупка; у карточки только две оценки, поэтому сигнал нельзя обобщать.'
  },
  varDeSocks: {
    product: 'Varusteleka Merinowollsocken', market: 'DE', aggregate: 4.75, count: 61,
    url: 'https://varusteleka.com/de-de/products/varusteleka-merinowollsocken-de',
    type: 'официальная локальная карточка бренда',
    limitation: 'DE-витрина использует общий пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varDeGloves: {
    product: 'Varusteleka Merino Handschuhe', market: 'DE', aggregate: 4.62, count: 45,
    url: 'https://varusteleka.com/de-de/products/varusteleka-merino-handschuhe-de',
    type: 'официальная локальная карточка бренда',
    limitation: 'DE-витрина использует общий пул отзывов; дата показана относительно, страна автора не указана.'
  },
  bfDeSmartGlove: {
    product: 'Smartwool Merino Glove', market: 'DE', aggregate: 4.1, count: 9,
    url: 'https://www.bergfreunde.de/smartwool-merino-glove-handschuhe-bewertung/',
    type: 'крупный специализированный ритейлер, страница отзывов',
    limitation: 'Индивидуальная звезда в доступном фрагменте не показана; самоотчёт не доказывает объём продаж.'
  },
  bfDeJohaSocks: {
    product: 'Joha Wool Socks 5007', market: 'DE', aggregate: null, count: null,
    url: 'https://www.bergfreunde.de/joha-wool-socks-5007-merinosocken-bewertung/',
    type: 'крупный специализированный ритейлер, страница отзывов',
    limitation: 'Индивидуальная звезда и сводный рейтинг в доступном фрагменте не показаны.'
  },
  bfDeStoicSocks: {
    product: 'Stoic Merino Wool Cushion Extreme Long', market: 'DE', aggregate: 4.7, count: 28,
    url: 'https://www.bergfreunde.de/stoic-merino-wool-cushion-extreme-long-socks-merinosocken-bewertung/',
    type: 'крупный специализированный ритейлер, страница отзывов',
    limitation: 'Индивидуальная звезда в доступном фрагменте не показана; условия носки различаются.'
  },
  hmNlWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'NL', aggregate: 4.7, count: 19,
    url: 'https://www2.hm.com/nl_nl/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине H&M Group могут быть синдицированы; статус покупки не показан.'
  },
  hmNlCosCashmere: {
    product: 'COS Cashmere Scarf', market: 'NL', aggregate: 4.7, count: 6,
    url: 'https://www2.hm.com/nl_nl/productpage.1032425001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Малая база отзывов; локальная витрина может показывать синдицированный пул.'
  },
  hmNlCashmere: {
    product: 'H&M Cashmere Scarf', market: 'NL', aggregate: 4.4, count: 33,
    url: 'https://www2.hm.com/nl_nl/productpage.1021270001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине могут быть синдицированы; статус покупки не показан.'
  },
  yumekoNlYak: {
    product: 'Yumeko Deken Yak Wol Dark Brown', market: 'NL', aggregate: 4.9, count: 10,
    url: 'https://www.yumeko.nl/deken-yak-wol-dark-brown',
    type: 'официальная карточка бренда',
    limitation: 'Проверенность покупки не указана; выборка одной карточки и не содержит данных о продажах.'
  },
  ikeaNlMoalie: {
    product: 'IKEA MOALIE 100% wool throw', market: 'NL', aggregate: 4.6, count: 7,
    url: 'https://www.ikea.com/nl/nl/p/moalie-plaid-grijs-50354107/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; часть отзывов может быть синдицирована между рынками.'
  },
  hmBeCashmere: {
    product: 'H&M Cashmere Scarf', market: 'BE', aggregate: 4.7, count: 7,
    url: 'https://www2.hm.com/fr_be/productpage.1021270007.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Малая база отзывов; локальная витрина может показывать синдицированный пул.'
  },
  allnaturaBeYak: {
    product: 'Allnatura Cordelia Yak Blanket', market: 'BE', aggregate: 5.0, count: 5,
    url: 'https://www.allnatura.be/fr/p/couverture-en-poils-naturels-de-yack-cordelia-1090',
    type: 'официальная BE-карточка ритейлера',
    limitation: 'Trusted Shops подтверждает покупку, но отзывы на BE-витрине могут быть переведены или синдицированы.'
  },
  ikeaBeStockholm: {
    product: 'IKEA STOCKHOLM 2025 wool/merino throw', market: 'BE', aggregate: 4.3, count: 31,
    url: 'https://www.ikea.com/be/nl/p/stockholm-2025-plaid-helderblauw-20592195/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; часть отзывов может быть синдицирована между рынками.'
  },
  hmDkWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'DK', aggregate: 4.8, count: 6,
    url: 'https://www2.hm.com/da_dk/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Малая база отзывов; локальная витрина может показывать синдицированный пул.'
  },
  ikeaDkStockholm: {
    product: 'IKEA STOCKHOLM 2025 wool/merino throw', market: 'DK', aggregate: 4.2, count: 39,
    url: 'https://www.ikea.com/dk/da/p/stockholm-2025-plaid-gron-50592194/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; часть отзывов может быть синдицирована между рынками.'
  },
  hmSeWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'SE', aggregate: 4.8, count: 49,
    url: 'https://www2.hm.com/sv_se/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине H&M Group могут быть синдицированы; статус покупки не показан.'
  },
  ikeaSeMoalie: {
    product: 'IKEA MOALIE wool throw', market: 'SE', aggregate: 4.4, count: 56,
    url: 'https://www.ikea.com/se/en/p/moalie-throw-dark-red-brown-20651646/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; часть отзывов может быть синдицирована между рынками.'
  },
  hmPlWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'PL', aggregate: 4.8, count: 31,
    url: 'https://www2.hm.com/pl_pl/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине H&M Group могут быть синдицированы; статус покупки не показан.'
  },
  hmPlCashmere: {
    product: 'H&M Cashmere Scarf', market: 'PL', aggregate: 4.7, count: 119,
    url: 'https://www2.hm.com/pl_pl/productpage.1021270004.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Отзывы на локальной витрине могут быть синдицированы; статус покупки не показан.'
  },
  ikeaPlStockholm: {
    product: 'IKEA STOCKHOLM 2025 wool/merino throw', market: 'PL', aggregate: 4.5, count: 8,
    url: 'https://www.ikea.com/pl/pl/p/stockholm-2025-pled-zielony-50592194/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; база из восьми оценок ограничивает обобщение.'
  },
  hmFiWool: {
    product: '& Other Stories Wool Fringe Scarf', market: 'FI', aggregate: 4.7, count: 9,
    url: 'https://www2.hm.com/fi_fi/productpage.1095302001.html',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Малая база отзывов; локальная витрина может показывать синдицированный пул.'
  },
  ikeaFiStockholm: {
    product: 'IKEA STOCKHOLM 2025 wool/merino throw', market: 'FI', aggregate: 4.2, count: 39,
    url: 'https://www.ikea.com/fi/fi/p/stockholm-2025-huopa-kirkkaanoranssi-80592201/',
    type: 'крупный ритейлер, локальная карточка товара',
    limitation: 'Дата публикации не показана; часть отзывов может быть синдицирована между рынками.'
  },
  varFiThinSocks: {
    product: 'Varusteleka ohuet merinovillasukat', market: 'FI', aggregate: 4.45, count: 33,
    url: 'https://varusteleka.com/products/varusteleka-ohuet-merinovillasukat-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiHikingSocks: {
    product: 'Varusteleka retkeilysukat, merinovillaa', market: 'FI', aggregate: 4.93, count: 76,
    url: 'https://varusteleka.com/products/varusteleka-retkeilysukat-merinovillaa-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiLinerSocks: {
    product: 'Varusteleka L1 alussukat, merinovillaa', market: 'FI', aggregate: 4.75, count: 16,
    url: 'https://varusteleka.com/products/varusteleka-l1-alussukat-merinovillaa-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiLinerGloves: {
    product: 'Varusteleka L1 aluskäsineet, merinovillaa', market: 'FI', aggregate: 4.78, count: 40,
    url: 'https://varusteleka.com/products/varusteleka-l1-aluskasineet-merinovillaa-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiFingerlessGloves: {
    product: 'Varusteleka merinokynsikkäät', market: 'FI', aggregate: 4.84, count: 44,
    url: 'https://varusteleka.com/products/varusteleka-merinokynsikkaat-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiSquareScarf: {
    product: 'Varusteleka iso neliöhuivi, merinovillaa', market: 'FI', aggregate: 4.82, count: 34,
    url: 'https://varusteleka.com/products/varusteleka-iso-neliohuivi-merinovillaa-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана.'
  },
  varFiNeckScarf: {
    product: 'Varusteleka merinokaulahuivi', market: 'FI', aggregate: 4.83, count: 6,
    url: 'https://varusteleka.com/products/varusteleka-merinokaulahuivi-fi',
    type: 'официальная локальная карточка бренда',
    limitation: 'FI-витрина использует общий международный пул отзывов; дата показана относительно, страна автора не указана; база карточки мала.'
  },
  etsyDkYak: {
    product: 'MongulaiCOM 100% Yak Wool Blanket', market: 'DK', aggregate: 3.0, count: 2,
    url: 'https://www.etsy.com/uk/listing/1874285447/100-yak-wool-blanket',
    type: 'крупный маркетплейс, карточка с доставкой в Данию',
    limitation: 'Рынок назначен по локализации доставки, а не по стране автора; всего два отзыва, явной отметки verified purchase нет.'
  },
  etsyFiYak: {
    product: 'HeritageWeaversINDIA Himalayan Yak Wool Meditation Blanket', market: 'FI', aggregate: 5.0, count: 2,
    url: 'https://www.etsy.com/listing/1376954397/large-handwoven-handspun-thick-offwhite',
    type: 'крупный маркетплейс, карточка с доставкой в Финляндию',
    limitation: 'Рынок назначен по локализации доставки, а не по стране автора; всего два отзыва, явной отметки verified purchase нет.'
  }
};

const jobs = {
  'Кашемировый шарф': 'Получить мягкое тепло у лица без зуда и лишнего веса.',
  'Шерстяной шарф': 'Согреть шею и дополнить верхнюю одежду без лишнего объёма.',
  'Шаль / палантин': 'Укутать плечи в прохладу и носить аксессуар несколькими способами.',
  'Шерстяные / мериносовые носки': 'Сохранять тепло и комфорт ног при ходьбе, работе или поездках.',
  'Перчатки из мериносовой шерсти': 'Согреть руки отдельно или тонким утепляющим слоем.',
  'Плед из шерсти яка': 'Получить лёгкое и очень тёплое укрытие для дивана или кровати.',
  'Шерстяной / мериносовый плед': 'Утеплиться дома и добавить натуральную фактуру интерьеру.'
};

const themeDictionary = {
  SOFTNESS: 'мягкость и тактильность', WARMTH: 'тепло', LOW_ITCH: 'не колется / комфорт у кожи',
  THICKNESS: 'толщина и плотность', TOO_THIN: 'слишком тонкий товар', SIZE_FIT: 'размер и посадка',
  SIZE_SHORT: 'недостаточная длина или размер', COLOR_MATCH: 'точное совпадение цвета',
  COLOR_MISMATCH: 'цвет отличается от фото или не подходит', VERSATILITY: 'несколько сценариев использования',
  GIFT: 'покупка в подарок', PRICE_VALUE: 'соотношение цены и ценности', PREMIUM_PRICE: 'барьер высокой цены',
  CARE_LIMIT: 'сложный уход', SHAPE_LOSS: 'потеря формы или усадка', DURABILITY: 'износостойкость',
  PILLING: 'катышки', SHEDDING: 'линька и ворс', ODOR: 'неприятный запах',
  NO_ODOR: 'не накапливает запах', QUICK_DRY: 'быстро сохнет', ACTIVE_USE: 'спорт и активная ходьба',
  LAYERING: 'использование как внутренний слой', REPEAT_BUY: 'повторная покупка',
  NATURAL_FIBER: 'ценность натурального состава', ETHICS: 'этичность и происхождение',
  INTERIOR: 'цвет и фактура в интерьере', QUALITY_CONSISTENCY: 'стабильность качества',
  PHOTO_ACCURACY: 'соответствие фотографии', COMPLAINT_SERVICE: 'опыт решения претензии'
};

const records = [];
function add(sourceKey, row) {
  const source = sources[sourceKey];
  const id = 'VOC-' + String(records.length + 1).padStart(3, '0');
  records.push({
    id,
    'категория': row.category,
    'товар_бренд': source.product,
    'рынок': source.market,
    'рейтинг': row.rating ?? null,
    'средний_рейтинг_карточки': source.aggregate,
    'число_оценок_карточки': source.count,
    'дата_отзыва': row.date ?? null,
    'точность_даты': row.date ? (row.date.startsWith('20') || row.date.startsWith('19') ? 'точная' : 'относительная') : 'не показана',
    'job_to_be_done': row.job || jobs[row.category],
    'драйвер_покупки': row.driver,
    'позитив': row.positive || '',
    'барьер_возражение': row.barrier || '',
    'тональность': row.sentiment,
    'код_темы': row.themes,
    'фрагмент_или_пересказ': row.excerpt,
    'режим_фиксации': 'точный пересказ на русском; исходный длинный текст не сохранён',
    'статус_покупки': row.verified === true ? 'подтверждённая' : row.verified === false ? 'не указан' : 'не указан',
    'группа_зависимости': sourceKey,
    'риск_зависимой_выборки': '',
    'источник_url': source.url,
    'тип_источника': source.type,
    'дата_проверки': checkedAt,
    'ограничение': source.limitation
  });
}

// DE — scarves, blankets, socks and gloves.
add('hmDeWool', {category:'Шаль / палантин',rating:5,date:'2023-12-09',excerpt:'Мягкий, тёплый и достаточно большой, чтобы накинуть на плечи.',driver:'мягкость, тепло и большой формат',positive:'приятен у кожи и закрывает плечи',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH','VERSATILITY','SIZE_FIT']});
add('hmDeWool', {category:'Шерстяной шарф',rating:5,date:'2023-02-17',excerpt:'Более дорогой вариант заметно мягче и меньше колется.',driver:'комфорт шерсти у чувствительной кожи',positive:'меньше колется, чем похожая модель',barrier:'более высокая цена',sentiment:'смешанный',themes:['LOW_ITCH','PRICE_VALUE']});
add('hmDeWool', {category:'Шерстяной шарф',rating:4,date:'2022-12-31',excerpt:'Материал и цвет хороши, но после стирки шарф теряет форму.',driver:'качество материала и цвет',positive:'материал, обработка и оттенок понравились',barrier:'после стирки нужна коррекция формы',sentiment:'смешанный',themes:['CARE_LIMIT','SHAPE_LOSS','COLOR_MATCH']});
add('hmDeWool', {category:'Шаль / палантин',rating:5,date:'2023-03-02',excerpt:'Тёплый шарф из чистой шерсти иногда заменяет плед.',driver:'100% шерсть и большой формат',positive:'греет и работает как мини-плед',barrier:'',sentiment:'позитив',themes:['WARMTH','VERSATILITY','NATURAL_FIBER']});
add('hmDeWool', {category:'Шерстяной шарф',rating:3,date:'2026-01-12',excerpt:'Новая версия тоньше старой, качество и цвет стали слабее.',driver:'ожидание прежней плотности и цвета',positive:'',barrier:'ощущение снижения качества относительно старой версии',sentiment:'негатив',themes:['TOO_THIN','QUALITY_CONSISTENCY','COLOR_MISMATCH']});
add('tchiboDeCashmere', {category:'Кашемировый шарф',rating:null,date:'2026-03-21',excerpt:'Даже со скидкой дорого, но ощущение от шарфа прекрасное.',driver:'кашемировая мягкость и премиальное ощущение',positive:'высокая тактильная ценность',barrier:'цена остаётся высокой даже по акции',sentiment:'смешанный',themes:['SOFTNESS','PREMIUM_PRICE','PRICE_VALUE']});
add('tchiboDeCashmere', {category:'Кашемировый шарф',rating:null,date:'2026-03-05',excerpt:'Слишком тонкий для своей цены, поэтому покупку вернули.',driver:'ожидание плотного премиального кашемира',positive:'',barrier:'толщина не соответствует цене',sentiment:'негатив',themes:['TOO_THIN','PREMIUM_PRICE','PRICE_VALUE']});
add('tchiboDeCashmere', {category:'Кашемировый шарф',rating:null,date:'2026-03-02',excerpt:'Второй заказ: первый подарили, этот тоже берут в подарок.',driver:'проверенное качество для подарка',positive:'повторная покупка подтверждает доверие',barrier:'',sentiment:'позитив',themes:['GIFT','REPEAT_BUY']});
add('ottoDeCashmere', {category:'Кашемировый шарф',rating:null,date:'2026-02-17',excerpt:'Материал приятный, носить комфортно; заказала бы снова.',driver:'приятный материал и комфорт',positive:'готовность к повторной покупке',barrier:'',sentiment:'позитив',themes:['SOFTNESS','REPEAT_BUY'] ,verified:true});
add('ottoDeCashmere', {category:'Кашемировый шарф',rating:null,date:'2024-09-24',excerpt:'Вживую оттенок светлее фотографии, но покупкой довольны.',driver:'цвет и кашемировое качество',positive:'общее удовлетворение и рекомендация',barrier:'цвет светлее карточки',sentiment:'смешанный',themes:['COLOR_MISMATCH','PHOTO_ACCURACY'],verified:true});
add('ottoDeYak', {category:'Плед из шерсти яка',rating:5,date:'2026-03-02',excerpt:'Красивый плед из яка хорошо согревает в холод.',driver:'редкое волокно, тепло и внешний вид',positive:'уют и тепло в холодную погоду',barrier:'',sentiment:'позитив',themes:['WARMTH','INTERIOR'],verified:true});
add('varDeSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'4 месяца назад',excerpt:'Носки прочные и хорошо ощущаются в носке.',driver:'прочность для регулярного использования',positive:'ощущаются добротно',barrier:'',sentiment:'позитив',themes:['DURABILITY'],verified:true});
add('varDeSocks', {category:'Шерстяные / мериносовые носки',rating:3,date:'5 месяцев назад',excerpt:'В несшнурованных ботинках сидят слишком свободно для долгой ходьбы.',driver:'посадка для ежедневных десятикилометровых маршрутов',positive:'первичная примерка приемлема',barrier:'слишком свободная посадка и сомнение в ресурсе',sentiment:'негатив',themes:['SIZE_FIT','ACTIVE_USE','DURABILITY'],verified:true});
add('varDeSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'7 месяцев назад',excerpt:'Идеальные носки без заметных недостатков.',driver:'универсальная повседневная пара',positive:'полностью соответствуют ожиданиям',barrier:'',sentiment:'позитив',themes:['SIZE_FIT'],verified:true});
add('varDeSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'7 месяцев назад',excerpt:'Лучшие носки; хочется купить ещё пары.',driver:'проверенный комфорт на каждый день',positive:'сильное намерение повторной покупки',barrier:'',sentiment:'позитив',themes:['REPEAT_BUY'],verified:true});
add('varDeSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'7 месяцев назад',excerpt:'Отличное соотношение цены и качества, ношу только их.',driver:'цена, качество и надёжная повседневность',positive:'заменили остальные носки',barrier:'',sentiment:'позитив',themes:['PRICE_VALUE','REPEAT_BUY'],verified:true});
add('varDeGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'7 месяцев назад',excerpt:'Перчатки действительно тёплые и выглядят добротно.',driver:'тепло и качество исполнения',positive:'тёплые и качественные',barrier:'',sentiment:'позитив',themes:['WARMTH','DURABILITY'],verified:true});
add('varDeGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'7 месяцев назад',excerpt:'Качество полностью устраивает.',driver:'простая надёжная мериносовая базовая вещь',positive:'ожидания выполнены',barrier:'',sentiment:'позитив',themes:['QUALITY_CONSISTENCY'],verified:true});
add('varDeGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'3 дня назад',excerpt:'Партнёрша перестала забирать мои перчатки после собственной пары.',driver:'проверенное семейное тепло',positive:'товар нравится нескольким членам семьи',barrier:'',sentiment:'позитив',themes:['WARMTH','GIFT','REPEAT_BUY'],verified:true});
add('varDeGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'6 дней назад',excerpt:'Работают отдельно в прохладу и как подкладка в сильный мороз.',driver:'универсальность по температуре',positive:'эффективны в двух режимах носки',barrier:'',sentiment:'позитив',themes:['LAYERING','WARMTH','VERSATILITY'],verified:true});
add('varDeGloves', {category:'Перчатки из мериносовой шерсти',rating:4,date:'11 дней назад',excerpt:'Тёплые и особенно хороши как внутренние перчатки.',driver:'дополнительное утепление рук',positive:'хорошо работают под верхней парой',barrier:'',sentiment:'позитив',themes:['LAYERING','WARMTH'],verified:false});
add('bfDeSmartGlove', {category:'Перчатки из мериносовой шерсти',rating:null,date:'2025-01-27',excerpt:'Удобны в межсезонье, но не рассчитаны на сильный мороз.',driver:'компактная защита в переходную погоду',positive:'легко носить в кармане',barrier:'недостаточно тепла для глубокого холода',sentiment:'смешанный',themes:['WARMTH','LAYERING','SIZE_FIT']});
add('bfDeSmartGlove', {category:'Перчатки из мериносовой шерсти',rating:null,date:'2025-01-28',excerpt:'Ткань слишком тонкая и просвечивает; в тепло не верится.',driver:'ожидание плотной мериносовой защиты',positive:'',barrier:'тонкость вызывает недоверие и возврат',sentiment:'негатив',themes:['TOO_THIN','WARMTH']});
add('bfDeSmartGlove', {category:'Перчатки из мериносовой шерсти',rating:null,date:'2026-01-31',excerpt:'Подходят слоем для велосипеда или отдельно для бега.',driver:'активность на холоде и управление слоями',positive:'работают для велосипеда и бега',barrier:'',sentiment:'позитив',themes:['ACTIVE_USE','LAYERING','VERSATILITY']});
add('bfDeSmartGlove', {category:'Перчатки из мериносовой шерсти',rating:null,date:'2026-01-05',excerpt:'Лёгкие, но достаточно тёплые под лыжными перчатками.',driver:'тонкий дополнительный слой для сильного холода',positive:'утепляют без объёма',barrier:'',sentiment:'позитив',themes:['LAYERING','WARMTH']});
add('bfDeJohaSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2024-02-02',excerpt:'Для зимы тонковаты, зато удобны в поездках весной и осенью.',driver:'лёгкая пара для путешествий и межсезонья',positive:'компактны и подходят для мягкой погоды',barrier:'недостаточно плотные для зимы',sentiment:'смешанный',themes:['TOO_THIN','VERSATILITY','ACTIVE_USE']});
add('bfDeJohaSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2023-12-15',excerpt:'Детям удобно, запах не накапливается даже при ежедневной носке.',driver:'детская ежедневная носка без запаха',positive:'комфорт и контроль запаха',barrier:'',sentiment:'позитив',themes:['NO_ODOR','SIZE_FIT']});
add('bfDeJohaSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2022-10-17',excerpt:'Хорошо сидят, быстро сохнут и поддерживают комфортный микроклимат.',driver:'универсальная повседневная пара для партнёра',positive:'посадка, быстрое высыхание и терморегуляция',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','QUICK_DRY','NO_ODOR']});
add('bfDeJohaSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2023-10-31',excerpt:'Не скользят, но протёрлись до дыр примерно за месяц.',driver:'надёжная посадка в обуви',positive:'не сползают',barrier:'очень быстрый износ',sentiment:'негатив',themes:['SIZE_FIT','DURABILITY']});
add('bfDeStoicSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2025-02-15',excerpt:'Узкой длинной стопе подходят; амортизация спасает в жёстких ботинках.',driver:'защита стопы в жёсткой походной обуви',positive:'точная посадка, нет скольжения и мозолей',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','ACTIVE_USE','PRICE_VALUE']});
add('bfDeStoicSocks', {category:'Шерстяные / мериносовые носки',rating:null,date:'2025-10-06',excerpt:'После первой стирки посадка ухудшилась, носки сползают.',driver:'тёплая пара для активной носки',positive:'до стирки были тёплыми и удобными',barrier:'нестабильная посадка после ухода',sentiment:'негатив',themes:['CARE_LIMIT','SHAPE_LOSS','SIZE_FIT']});

// NL — scarves and blankets.
add('hmNlWool', {category:'Шерстяной шарф',rating:4,date:'2023-10-31',excerpt:'Качество хорошее, но белый оттенок оказался желтее фото.',driver:'светлый цвет и качество шерсти',positive:'качество понравилось',barrier:'жёлтый подтон привёл к возврату',sentiment:'смешанный',themes:['COLOR_MISMATCH','PHOTO_ACCURACY']});
add('hmNlWool', {category:'Шаль / палантин',rating:5,date:'2024-01-21',excerpt:'Большой и мягкий, греет без лишнего объёма.',driver:'размер, мягкость и умеренная толщина',positive:'гибко укутывается и не выглядит громоздко',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH','SIZE_FIT','VERSATILITY']});
add('hmNlWool', {category:'Шерстяной шарф',rating:5,date:'2023-11-10',excerpt:'Длинный и качественный, но светлый цвет боится косметики.',driver:'длина и качество',positive:'хорошая длина и исполнение',barrier:'непрактичный светлый оттенок для макияжа',sentiment:'смешанный',themes:['SIZE_FIT','COLOR_MISMATCH']});
add('hmNlWool', {category:'Шерстяной шарф',rating:4,date:'2023-11-10',excerpt:'Цвет и качество хорошие, однако оттенок не подошёл.',driver:'качество и сочетание с гардеробом',positive:'качество и цвет сами по себе хороши',barrier:'оттенок не подходит человеку',sentiment:'смешанный',themes:['COLOR_MATCH','COLOR_MISMATCH']});
add('hmNlCosCashmere', {category:'Кашемировый шарф',rating:3,date:'2023-12-03',excerpt:'Кашемир качественный, но заметно тоньше, чем выглядит на фото.',driver:'визуально плотный премиальный шарф',positive:'материал приемлемого качества',barrier:'фото завышает ощущение плотности',sentiment:'негатив',themes:['TOO_THIN','PHOTO_ACCURACY']});
add('hmNlCosCashmere', {category:'Кашемировый шарф',rating:5,date:'2023-11-20',excerpt:'Мягкий, тёплый и аккуратный по размеру.',driver:'мягкое тепло в сдержанном формате',positive:'мягкость, тепло и компактность',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH','SIZE_FIT']});
add('hmNlCosCashmere', {category:'Кашемировый шарф',rating:5,date:'2024-02-14',excerpt:'Очень мягкий и хорошо сохраняет тепло.',driver:'тактильность и тепло кашемира',positive:'мягкость и тепло',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH']});
add('hmNlCashmere', {category:'Кашемировый шарф',rating:5,date:'2023-08-07',excerpt:'Не колется: тонкий, но тёплый; хочется ярче цветов.',driver:'кашемир без раздражения кожи',positive:'тонкий материал остаётся тёплым и не колется',barrier:'не хватает ярких оттенков',sentiment:'смешанный',themes:['LOW_ITCH','WARMTH','COLOR_MISMATCH']});
add('hmNlCashmere', {category:'Кашемировый шарф',rating:3,date:'2023-10-24',excerpt:'Слишком тонкий, а оттенок темнее и серее фотографии.',driver:'плотность и точный цвет с карточки',positive:'',barrier:'не совпали толщина и оттенок',sentiment:'негатив',themes:['TOO_THIN','COLOR_MISMATCH','PHOTO_ACCURACY']});
add('hmNlCashmere', {category:'Кашемировый шарф',rating:4,date:'2022-02-16',excerpt:'Качество и цвет хороши, но ожидалась большая плотность.',driver:'кашемировое качество и цвет',positive:'материал и оттенок понравились',barrier:'товар тоньше ожиданий',sentiment:'смешанный',themes:['TOO_THIN','COLOR_MATCH']});
add('hmNlCashmere', {category:'Кашемировый шарф',rating:5,date:'2021-12-10',excerpt:'Мягкий, плотный, широкий и длинный; выглядит долговечным.',driver:'полный формат и ощущение ресурса',positive:'мягкость, плотность и хороший размер',barrier:'',sentiment:'позитив',themes:['SOFTNESS','THICKNESS','SIZE_FIT','DURABILITY']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2026-08-09',excerpt:'Очень мягкий, лёгкий и тёплый; красиво лежит на диване.',driver:'роскошная тактильность, тепло и вид в интерьере',positive:'сочетает лёгкость, тепло и декоративность',barrier:'высокая цена',sentiment:'смешанный',themes:['SOFTNESS','WARMTH','INTERIOR','PREMIUM_PRICE']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2026-05-06',excerpt:'Не колется и мало весит; высокая цена оправдана этичностью.',driver:'комфорт кожи, этичность и долгий срок службы',positive:'лёгкость и отсутствие зуда',barrier:'высокая цена',sentiment:'смешанный',themes:['LOW_ITCH','ETHICS','DURABILITY','PREMIUM_PRICE']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2025-01-11',excerpt:'Качество отличное, но размер маловат, а цена высокая.',driver:'редкое волокно и качество',positive:'материал понравился',barrier:'недостаточный размер и высокая цена',sentiment:'смешанный',themes:['SIZE_SHORT','PREMIUM_PRICE','QUALITY_CONSISTENCY']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2023-12-02',excerpt:'Лёгкий и очень тёплый плед с мягким касанием.',driver:'максимум тепла без тяжести',positive:'мягкий, лёгкий и тёплый',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2023-01-06',excerpt:'Долго сохраняет тепло и внешний вид.',driver:'долговечное домашнее тепло',positive:'греет и остаётся красивым',barrier:'',sentiment:'позитив',themes:['WARMTH','DURABILITY']});
add('yumekoNlYak', {category:'Плед из шерсти яка',rating:null,date:'2015-11-26',excerpt:'Размер удобен для укутывания, но сложенный плед объёмный.',driver:'размер для отдыха на диване',positive:'удобно полностью укутаться',barrier:'занимает много места в сложенном виде',sentiment:'смешанный',themes:['SIZE_FIT','INTERIOR']});
add('ikeaNlMoalie', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Очень мягкий плед хорошего качества.',driver:'мягкость натуральной шерсти',positive:'приятная тактильность и качество',barrier:'',sentiment:'позитив',themes:['SOFTNESS','NATURAL_FIBER']});
add('ikeaNlMoalie', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Натуральная шерсть помогает пережить холодные дни.',driver:'домашнее тепло из натурального материала',positive:'греет в холодную погоду',barrier:'',sentiment:'позитив',themes:['WARMTH','NATURAL_FIBER']});
add('ikeaNlMoalie', {category:'Шерстяной / мериносовый плед',rating:3,date:null,excerpt:'Главный минус: плед нельзя постирать дома.',driver:'натуральная шерсть для регулярного домашнего использования',positive:'',barrier:'домашняя стирка запрещена',sentiment:'негатив',themes:['CARE_LIMIT']});
add('ikeaNlMoalie', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Тёплый и качественный, соответствует ожиданиям по цене.',driver:'тепло и понятная ценность',positive:'качество соответствует стоимости',barrier:'',sentiment:'позитив',themes:['WARMTH','PRICE_VALUE']});

// BE — cashmere and blankets.
add('hmBeCashmere', {category:'Кашемировый шарф',rating:3,date:'2022-12-04',excerpt:'На фото шарф кажется намного толще, поэтому покупка разочаровала.',driver:'плотный кашемировый шарф',positive:'',barrier:'визуальная карточка завысила ожидание толщины',sentiment:'негатив',themes:['TOO_THIN','PHOTO_ACCURACY']});
add('hmBeCashmere', {category:'Кашемировый шарф',rating:5,date:'2021-12-05',excerpt:'Слишком короткий, хотя мягкость и тепло почти идеальны.',driver:'мягкое кашемировое тепло',positive:'приятный материал и тепло',barrier:'недостаточная длина',sentiment:'смешанный',themes:['SIZE_SHORT','SOFTNESS','WARMTH']});
add('hmBeCashmere', {category:'Кашемировый шарф',rating:5,date:'2022-02-06',excerpt:'Очень мягкий и тёплый шарф.',driver:'мягкость и тепло кашемира',positive:'приятен у кожи и греет',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH']});
add('allnaturaBeYak', {category:'Плед из шерсти яка',rating:null,date:'2026-04-29',excerpt:'Плед полностью оправдал ожидания.',driver:'ожидание премиального натурального пледа',positive:'полное соответствие ожиданиям',barrier:'',sentiment:'позитив',themes:['QUALITY_CONSISTENCY'],verified:true});
add('allnaturaBeYak', {category:'Плед из шерсти яка',rating:null,date:'2024-12-02',excerpt:'Среди тонкорунных пледов вариант из яка оказался лучшим.',driver:'сравнение натуральных премиальных волокон',positive:'як превзошёл альтернативные тонкорунные пледы',barrier:'цена требует сравнения, но признана приемлемой',sentiment:'позитив',themes:['PRICE_VALUE','NATURAL_FIBER'],verified:true});
add('allnaturaBeYak', {category:'Плед из шерсти яка',rating:null,date:'2018-04-24',excerpt:'Пожилому высокому человеку плед подошёл: тёплый и красивый.',driver:'подарок старшему человеку большого роста',positive:'подошёл по размеру, теплу и виду',barrier:'',sentiment:'позитив',themes:['GIFT','WARMTH','SIZE_FIT','INTERIOR'],verified:true});
add('ikeaBeStockholm', {category:'Шерстяной / мериносовый плед',rating:3,date:null,excerpt:'Тёплый плед сильно линяет.',driver:'шерстяное тепло для дома',positive:'хорошо греет',barrier:'оставляет слишком много ворса',sentiment:'смешанный',themes:['WARMTH','SHEDDING']});
add('ikeaBeStockholm', {category:'Шерстяной / мериносовый плед',rating:4,date:null,excerpt:'Добавляет цвет интерьеру и уютен для заболевших внуков.',driver:'яркий интерьерный акцент и семейный уют',positive:'работает как декор и тёплое укрытие',barrier:'высокая цена',sentiment:'смешанный',themes:['INTERIOR','WARMTH','GIFT','PREMIUM_PRICE']});

// DK.
add('hmDkWool', {category:'Шерстяной шарф',rating:5,date:'2023-10-08',excerpt:'Очень приятный шарф из самой мягкой шерсти.',driver:'максимальная мягкость натуральной шерсти',positive:'очень мягкое касание',barrier:'',sentiment:'позитив',themes:['SOFTNESS','NATURAL_FIBER']});
add('hmDkWool', {category:'Шерстяной шарф',rating:5,date:'2024-01-07',excerpt:'Прекрасный шарф с привлекательным оттенком.',driver:'цвет как часть зимнего образа',positive:'оттенок и общий вид понравились',barrier:'',sentiment:'позитив',themes:['COLOR_MATCH']});
add('ikeaDkStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Воздушный, лёгкий и не колется; дорогой, но достойный подарок.',driver:'натуральный подарок для нового дома',positive:'лёгкий, мягкий и не раздражает кожу',barrier:'высокая цена',sentiment:'смешанный',themes:['LOW_ITCH','GIFT','PREMIUM_PRICE','SOFTNESS']});

// SE.
add('hmSeWool', {category:'Шерстяной шарф',rating:4,date:'2023-10-15',excerpt:'Шарф мягкий и тёплый, но ярлык пришит слишком туго.',driver:'мягкость и тепло',positive:'приятен и хорошо греет',barrier:'снятие ярлыка может повредить ткань',sentiment:'смешанный',themes:['SOFTNESS','WARMTH','DURABILITY']});
add('hmSeWool', {category:'Шаль / палантин',rating:5,date:'2023-12-08',excerpt:'Щедрый размер удобен для укутывания; хочется второй цвет.',driver:'большой формат и выбор цветов',positive:'удобно укутываться, есть намерение повторить покупку',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','VERSATILITY','REPEAT_BUY','COLOR_MATCH']});
add('hmSeWool', {category:'Шаль / палантин',rating:5,date:'2024-01-31',excerpt:'Плотный двухцветный шарф отлично работает как шаль на плечи.',driver:'плотность и двухцветный дизайн',positive:'подходит как плечевое укрытие',barrier:'',sentiment:'позитив',themes:['THICKNESS','VERSATILITY','COLOR_MATCH']});
add('hmSeWool', {category:'Шерстяной шарф',rating:5,date:'2023-10-20',excerpt:'Очень мягкий, тёплый и уютный; цена кажется оправданной.',driver:'комфорт и тепло',positive:'мягкость, уют и тепло',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH','PRICE_VALUE']});
add('hmSeWool', {category:'Шерстяной шарф',rating:5,date:'2024-10-25',excerpt:'Уютный шарф почти не оставляет ворса.',driver:'чистая носка без линьки',positive:'мало ворса и приятное ощущение',barrier:'',sentiment:'позитив',themes:['SHEDDING','SOFTNESS']});
add('hmSeWool', {category:'Шерстяной шарф',rating:5,date:'2024-09-17',excerpt:'Мягкость и цвет совпали с ожиданиями по фото.',driver:'точное соответствие карточке',positive:'цвет и мягкость ожидаемые',barrier:'',sentiment:'позитив',themes:['SOFTNESS','COLOR_MATCH','PHOTO_ACCURACY']});
add('hmSeWool', {category:'Шаль / палантин',rating:4,date:'2024-12-02',excerpt:'Большой и приятный, при этом не слишком толстый.',driver:'большой размер без тяжёлого объёма',positive:'удачный баланс размера и толщины',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','THICKNESS','VERSATILITY']});
add('ikeaSeMoalie', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Мягкая шерсть удивляет качеством за эту цену.',driver:'100% шерсть по доступной цене',positive:'мягкость и качество выше ожиданий',barrier:'',sentiment:'позитив',themes:['SOFTNESS','PRICE_VALUE','NATURAL_FIBER']});

// PL.
add('hmPlWool', {category:'Шерстяной шарф',rating:4,date:'2026-01-26',excerpt:'Мягкий, толстый и тёплый, но цвет скорее сливовый.',driver:'тепло, мягкость и красный оттенок',positive:'мягкий, плотный и тёплый',barrier:'цвет холоднее и фиолетовее ожидаемого',sentiment:'смешанный',themes:['SOFTNESS','WARMTH','COLOR_MISMATCH','THICKNESS']});
add('hmPlWool', {category:'Шаль / палантин',rating:4,date:'2025-12-15',excerpt:'Не колется и хорошо складывается, однако тонковат и дорог.',driver:'большой размер и комфорт у кожи',positive:'не колется, размер позволяет сложить',barrier:'тонкость и высокая цена',sentiment:'смешанный',themes:['LOW_ITCH','SIZE_FIT','TOO_THIN','PREMIUM_PRICE']});
add('hmPlWool', {category:'Шаль / палантин',rating:5,date:'2025-11-11',excerpt:'Очень большой, мягкий и тёплый; состав считают идеальным.',driver:'натуральный состав и большой формат',positive:'мягкость, тепло и размер',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH','SIZE_FIT','NATURAL_FIBER']});
add('hmPlWool', {category:'Шерстяной шарф',rating:5,date:'2024-11-20',excerpt:'Чёрный шарф не колется, тёплый и удачной толщины.',driver:'универсальный чёрный цвет и комфорт',positive:'не колется, греет и не громоздкий',barrier:'',sentiment:'позитив',themes:['LOW_ITCH','WARMTH','THICKNESS','COLOR_MATCH']});
add('hmPlWool', {category:'Шаль / палантин',rating:5,date:'2026-03-20',excerpt:'Удобно оборачивается благодаря правильной толщине и размеру.',driver:'удобное укутывание',positive:'толщина и размер работают вместе',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','THICKNESS','VERSATILITY']});
add('hmPlCashmere', {category:'Кашемировый шарф',rating:5,date:'2022-11-11',excerpt:'Кашемир воспринимают как долгую инвестицию вместо акрила.',driver:'долговечность натурального материала',positive:'ожидается меньший быстрый пилинг, чем у акрила',barrier:'более высокая первоначальная цена',sentiment:'смешанный',themes:['NATURAL_FIBER','DURABILITY','PILLING','PRICE_VALUE']});
add('hmPlCashmere', {category:'Кашемировый шарф',rating:5,date:'2026-01-05',excerpt:'Хорошо драпируется; коричневатый тон и толщина сбалансированы.',driver:'драпировка, нейтральный цвет и средняя плотность',positive:'удачно лежит и имеет сбалансированную толщину',barrier:'лёгкий коричневый подтон',sentiment:'позитив',themes:['COLOR_MATCH','THICKNESS','VERSATILITY']});
add('ikeaPlStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Тёплый, практичный плед с натуральным составом.',driver:'натуральный материал для ежедневного дома',positive:'греет и ощущается практичным',barrier:'',sentiment:'позитив',themes:['WARMTH','NATURAL_FIBER']});
add('ikeaPlStockholm', {category:'Шерстяной / мериносовый плед',rating:1,date:null,excerpt:'Через месяц плед покрылся катышками; жалобу решили плохо.',driver:'долговечный плед для вечернего использования',positive:'',barrier:'сильный пилинг и неудовлетворительное решение претензии',sentiment:'негатив',themes:['PILLING','DURABILITY','COMPLAINT_SERVICE']});
add('ikeaPlStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Согревает холодными вечерами, а цвет напоминает лето.',driver:'тепло и эмоционально приятный цвет',positive:'греет и создаёт сезонное настроение',barrier:'',sentiment:'позитив',themes:['WARMTH','COLOR_MATCH','INTERIOR']});
add('ikeaPlStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Красив вживую, но требует проветривания из-за фабричного запаха.',driver:'цвет и фактура в интерьере',positive:'выглядит лучше вживую',barrier:'первичный фабричный запах',sentiment:'смешанный',themes:['INTERIOR','ODOR']});
add('ikeaPlStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Хороший состав, мягкость и конкурентная цена.',driver:'натуральный состав по доступной цене',positive:'мягкость и соотношение цены и состава',barrier:'',sentiment:'позитив',themes:['SOFTNESS','PRICE_VALUE','NATURAL_FIBER']});

// FI.
add('hmFiWool', {category:'Шерстяной шарф',rating:3,date:'2023-01-06',excerpt:'Материал приятный, но оранжевый оттенок оказался слишком ярким.',driver:'мягкая шерсть и носимый оранжевый цвет',positive:'материал понравился',barrier:'слишком кричащий цвет привёл к возврату',sentiment:'смешанный',themes:['SOFTNESS','COLOR_MISMATCH']});
add('hmFiWool', {category:'Шерстяной шарф',rating:5,date:'2023-12-29',excerpt:'Лучший шарф из всех прежних покупок.',driver:'поиск надёжного любимого зимнего аксессуара',positive:'максимальное общее удовлетворение',barrier:'',sentiment:'позитив',themes:['REPEAT_BUY','QUALITY_CONSISTENCY']});
add('ikeaFiStockholm', {category:'Шерстяной / мериносовый плед',rating:5,date:null,excerpt:'Натуральный шерстяной плед хорошо сочетается с диваном.',driver:'натуральный состав и совпадение с интерьером',positive:'без синтетики, подходит по цвету',barrier:'',sentiment:'позитив',themes:['NATURAL_FIBER','INTERIOR','COLOR_MATCH']});

// FI — новые независимые карточки носков, перчаток и шарфов.
add('varFiThinSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'8 месяцев назад',excerpt:'Подходят для офиса и как тонкий слой под более тёплые носки.',driver:'универсальность для офиса и многослойной носки',positive:'работают отдельно и под более тёплой парой',barrier:'',sentiment:'позитив',themes:['LAYERING','VERSATILITY'],verified:true});
add('varFiThinSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'4 дня назад',excerpt:'Тонкие, не пахнут и достаточно хорошо выдерживают носку.',driver:'контроль запаха при регулярной носке',positive:'не накапливают запах и ощущаются достаточно прочными',barrier:'',sentiment:'позитив',themes:['NO_ODOR','DURABILITY'],verified:true});
add('varFiThinSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'21 день назад',excerpt:'Называет их лучшими носками без дополнительных пояснений.',driver:'не раскрыт',positive:'максимальная общая оценка',barrier:'',sentiment:'позитив',themes:[],verified:true});
add('varFiThinSocks', {category:'Шерстяные / мериносовые носки',rating:4,date:'1 месяц назад',excerpt:'Коротковаты для маршей, но под второй парой не скатываются.',driver:'длинная ходьба и многослойная носка',positive:'не скатываются и не сползают под второй парой',barrier:'слишком короткие для маршей',sentiment:'смешанный',themes:['SIZE_SHORT','LAYERING','ACTIVE_USE','SIZE_FIT'],verified:true});
add('varFiThinSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'2 месяца назад',excerpt:'Пять звёзд без содержательного комментария.',driver:'не раскрыт',positive:'высокая оценка без пояснения',barrier:'',sentiment:'позитив',themes:[],verified:true});

add('varFiHikingSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'1 месяц назад',excerpt:'После тысячи километров выглядят новыми и не вызывают мозолей.',driver:'долгие походы без мозолей и быстрого износа',positive:'ресурс свыше тысячи километров и отсутствие мозолей',barrier:'',sentiment:'позитив',themes:['DURABILITY','ACTIVE_USE','SIZE_FIT'],verified:true});
add('varFiHikingSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'5 месяцев назад',excerpt:'Коротко оценивает носки как превосходные.',driver:'походный комфорт',positive:'максимальная общая оценка',barrier:'',sentiment:'позитив',themes:[],verified:true});
add('varFiHikingSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'10 месяцев назад',excerpt:'Лучшие походные носки; точно купит их снова.',driver:'надёжная пара для походов',positive:'сильное намерение повторной покупки',barrier:'',sentiment:'позитив',themes:['ACTIVE_USE','REPEAT_BUY'],verified:true});
add('varFiHikingSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'3 дня назад',excerpt:'Считает их лучшими без дополнительных деталей.',driver:'не раскрыт',positive:'максимальная общая оценка',barrier:'',sentiment:'позитив',themes:[],verified:true});
add('varFiHikingSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'8 дней назад',excerpt:'Очень уютные; летом жарко, зато идеальны для остальных сезонов.',driver:'уют и тепло большую часть года',positive:'подходят для трёх сезонов',barrier:'слишком жаркие и толстые летом',sentiment:'смешанный',themes:['WARMTH','THICKNESS','VERSATILITY'],verified:true});

add('varFiLinerSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'6 месяцев назад',excerpt:'Посадка и форма полностью подходят.',driver:'точная посадка тонкой пары',positive:'размер и форма соответствуют ожиданиям',barrier:'',sentiment:'позитив',themes:['SIZE_FIT'],verified:true});
add('varFiLinerSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'4 дня назад',excerpt:'Отлично ощущаются и не выглядят готовыми быстро развалиться.',driver:'тонкая пара без раннего износа',positive:'первичное ощущение качества и прочности',barrier:'долговечность пока не подтверждена длительной ноской',sentiment:'смешанный',themes:['DURABILITY'],verified:true});
add('varFiLinerSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'6 дней назад',excerpt:'Работают вторым слоем и отдельно в жару, выдерживают активную носку.',driver:'универсальный слой для жары и двойной пары',positive:'универсальность, износостойкость и намерение купить снова',barrier:'',sentiment:'позитив',themes:['LAYERING','ACTIVE_USE','DURABILITY','REPEAT_BUY'],verified:true});
add('varFiLinerSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'1 месяц назад',excerpt:'Удобные и достаточно прохладные для тёплой погоды.',driver:'комфорт ног в тёплую погоду',positive:'комфортная прохлада',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','ACTIVE_USE'],verified:true});
add('varFiLinerSocks', {category:'Шерстяные / мериносовые носки',rating:5,date:'1 месяц назад',excerpt:'Отводят влагу, работают слоями и помогают избегать мозолей.',driver:'сухость и защита от мозолей в разную погоду',positive:'влагоотвод и комфорт при двойной носке',barrier:'',sentiment:'позитив',themes:['LAYERING','ACTIVE_USE','SIZE_FIT'],verified:true});

add('varFiLinerGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'2 месяца назад',excerpt:'Хорошо сидят на руке и кажутся тёплыми.',driver:'посадка и дополнительное тепло',positive:'хорошая посадка и ощущение тепла',barrier:'зимняя эффективность ещё не проверена',sentiment:'смешанный',themes:['SIZE_FIT','WARMTH'],verified:true});
add('varFiLinerGloves', {category:'Перчатки из мериносовой шерсти',rating:4,date:'3 месяца назад',excerpt:'Тонкие и удобные под перчатками, но скользкие и быстро изнашиваются.',driver:'незаметный утепляющий слой под тесные перчатки',positive:'тонкость и удобство многослойной носки',barrier:'скользят и быстро протираются',sentiment:'смешанный',themes:['LAYERING','DURABILITY'],verified:true});
add('varFiLinerGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'3 месяца назад',excerpt:'Практичные и тёплые.',driver:'простое дополнительное утепление рук',positive:'работают и сохраняют тепло',barrier:'',sentiment:'позитив',themes:['WARMTH'],verified:true});
add('varFiLinerGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'6 месяцев назад',excerpt:'Добавляют тепло под перчатками Mechanix FastFit.',driver:'усилить тепло рабочих перчаток',positive:'совместимы с внешними перчатками и добавляют утепление',barrier:'',sentiment:'позитив',themes:['LAYERING','WARMTH'],verified:true});
add('varFiLinerGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'6 месяцев назад',excerpt:'Очень хорошие; покупку уверенно рекомендует.',driver:'не раскрыт',positive:'сильная рекомендация',barrier:'',sentiment:'позитив',themes:[],verified:true});

add('varFiFingerlessGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'4 месяца назад',excerpt:'Очень удобные и тёплые.',driver:'свобода пальцев без потери тепла ладоней',positive:'удобство и тепло',barrier:'',sentiment:'позитив',themes:['WARMTH','SIZE_FIT'],verified:true});
add('varFiFingerlessGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'5 месяцев назад',excerpt:'Удобны для охоты, походов и обычных прогулок.',driver:'одна пара для разных занятий на улице',positive:'универсальность и ощущение качества',barrier:'',sentiment:'позитив',themes:['VERSATILITY','ACTIVE_USE','QUALITY_CONSISTENCY'],verified:true});
add('varFiFingerlessGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'5 месяцев назад',excerpt:'Хорошие и удобные в носке.',driver:'повседневный комфорт рук',positive:'удобны при носке',barrier:'',sentiment:'позитив',themes:['SIZE_FIT'],verified:true});
add('varFiFingerlessGloves', {category:'Перчатки из мериносовой шерсти',rating:5,date:'5 месяцев назад',excerpt:'Купил снова после износа любимой старой пары.',driver:'замена проверенной любимой пары',positive:'повторная покупка подтверждает полезность',barrier:'предыдущая пара со временем развалилась',sentiment:'смешанный',themes:['REPEAT_BUY','DURABILITY'],verified:true});
add('varFiFingerlessGloves', {category:'Перчатки из мериносовой шерсти',rating:4,date:'6 месяцев назад',excerpt:'Считает их очень удачными, без конкретных деталей.',driver:'не раскрыт',positive:'высокая общая оценка',barrier:'',sentiment:'позитив',themes:[],verified:true});

add('varFiSquareScarf', {category:'Шаль / палантин',rating:5,date:'4 дня назад',excerpt:'Считает платок исключительно хорошим.',driver:'универсальный большой платок',positive:'максимальная общая оценка',barrier:'',sentiment:'позитив',themes:[],verified:true});
add('varFiSquareScarf', {category:'Шаль / палантин',rating:3,date:'1 месяц назад',excerpt:'Размер и цвет хороши, но ткань неприятно тянется.',driver:'редкий большой формат и подходящий цвет',positive:'размер и цвет соответствуют ожиданиям',barrier:'эластичная фактура неприятна',sentiment:'смешанный',themes:['SIZE_FIT','COLOR_MATCH'],verified:true});
add('varFiSquareScarf', {category:'Шаль / палантин',rating:4,date:'2 месяца назад',excerpt:'Большой и качественно соткан, но эластичность ограничивает использование.',driver:'многофункциональный платок для походов',positive:'большая площадь и качество вязки',barrier:'не держит груз как хлопковый платок',sentiment:'смешанный',themes:['SIZE_FIT','VERSATILITY','QUALITY_CONSISTENCY'],verified:true});
add('varFiSquareScarf', {category:'Шаль / палантин',rating:5,date:'5 месяцев назад',excerpt:'Качественный и действительно большой.',driver:'качество и большой формат',positive:'размер и качество исполнения',barrier:'',sentiment:'позитив',themes:['SIZE_FIT','QUALITY_CONSISTENCY'],verified:true});
add('varFiSquareScarf', {category:'Шаль / палантин',rating:5,date:'6 месяцев назад',excerpt:'Подходит для трёх сезонов, города и походов; активно используется.',driver:'универсальная экипировка для города и природы',positive:'долгая частая эксплуатация и сильная рекомендация',barrier:'',sentiment:'позитив',themes:['VERSATILITY','ACTIVE_USE','DURABILITY'],verified:false});

add('varFiNeckScarf', {category:'Шерстяной шарф',rating:5,date:'2 месяца назад',excerpt:'Летом кажется жарким, поэтому ждёт зимнего теста.',driver:'плотное тепло для зимы',positive:'ощущается достаточно тёплым',barrier:'летом слишком жаркий, зимний опыт пока отсутствует',sentiment:'смешанный',themes:['WARMTH','THICKNESS'],verified:true});
add('varFiNeckScarf', {category:'Шерстяной шарф',rating:5,date:'8 месяцев назад',excerpt:'Просто работает по назначению.',driver:'базовый зимний шарф',positive:'соответствует функциональному ожиданию',barrier:'',sentiment:'позитив',themes:[],verified:true});
add('varFiNeckScarf', {category:'Шерстяной шарф',rating:4,date:'8 месяцев назад',excerpt:'Сначала немного грубый, но должен смягчиться в носке.',driver:'мягкий шарф для контакта с кожей',positive:'ожидается смягчение со временем',barrier:'первичная шероховатость',sentiment:'смешанный',themes:['SOFTNESS'],verified:true});
add('varFiNeckScarf', {category:'Шерстяной шарф',rating:5,date:'6 месяцев назад',excerpt:'Очень мягкий шарф заметно помогает в холод.',driver:'тактильный комфорт и защита от холода',positive:'мягкость и тепло',barrier:'',sentiment:'позитив',themes:['SOFTNESS','WARMTH'],verified:true});
add('varFiNeckScarf', {category:'Шерстяной шарф',rating:5,date:'7 месяцев назад',excerpt:'Приятный, тёплый и прочный; хотелось бы немного длиннее.',driver:'комфорт, тепло и долговечность',positive:'приятный материал, тепло и прочность',barrier:'можно было сделать немного длиннее',sentiment:'смешанный',themes:['SOFTNESS','WARMTH','DURABILITY','SIZE_SHORT'],verified:true});

// Новые карточки yak-пледов для DK и FI; география авторов не установлена.
add('etsyDkYak', {category:'Плед из шерсти яка',rating:5,date:'2025-04-15',excerpt:'Почти мягкость кашемира, меньше катышков и ощущение большей прочности.',driver:'редкое мягкое волокно с лучшей износостойкостью',positive:'мягкость близка к кашемиру, меньше пилинга',barrier:'',sentiment:'позитив',themes:['SOFTNESS','PILLING','DURABILITY'],verified:false});
add('etsyDkYak', {category:'Плед из шерсти яка',rating:1,date:'2025-05-01',excerpt:'Оказался меньше заявленного и вдвое дороже сопоставимого пледа.',driver:'полноразмерное покрывало по премиальной цене',positive:'качество сопоставимо с альтернативой',barrier:'размер меньше описания и цена вдвое выше аналога',sentiment:'негатив',themes:['SIZE_SHORT','PREMIUM_PRICE','PRICE_VALUE','PHOTO_ACCURACY'],verified:false});
add('etsyFiYak', {category:'Плед из шерсти яка',rating:5,date:'2024-09-14',excerpt:'Настоящая шерсть пахнет и колется, но як снижает раздражение.',driver:'натуральное шерстяное укрытие для медитации',positive:'як делает натуральную шерсть терпимой у кожи',barrier:'шерстяной запах и лёгкая колкость',sentiment:'смешанный',themes:['NATURAL_FIBER','ODOR','LOW_ITCH'],verified:false});
add('etsyFiYak', {category:'Плед из шерсти яка',rating:5,date:'2024-02-20',excerpt:'Красивый и удобный платок для медитации.',driver:'комфортное укрытие для практики медитации',positive:'внешний вид и комфорт',barrier:'',sentiment:'позитив',themes:['INTERIOR','VERSATILITY'],verified:false});

const requiredMarkets = ['DE','NL','BE','DK','SE','PL','FI'];
const requiredCategories = Object.keys(jobs);
const sourceSampleCounts = records.reduce((acc, row) => {
  const key = row['группа_зависимости'];
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
for (const row of records) {
  const clusterSize = sourceSampleCounts[row['группа_зависимости']];
  row['риск_зависимой_выборки'] = clusterSize > 1
    ? 'Повышенный: ' + clusterSize + ' отзывов взяты с одной карточки; это голоса, а не независимые рыночные замеры.'
    : 'Один отзыв с карточки; остаётся риск самоотбора автора и нерепрезентативности.';
}
const excerptWordCount = (text) => text.trim().split(/\s+/u).filter(Boolean).length;
if (records.length < 120) throw new Error('Нужно не менее 120 отзывов.');
for (const market of requiredMarkets) if (!records.some(r => r['рынок'] === market)) throw new Error('Нет рынка ' + market);
for (const category of requiredCategories) if (!records.some(r => r['категория'] === category)) throw new Error('Нет категории ' + category);
for (const category of requiredCategories) if (records.filter(r => r['категория'] === category).length < 5) throw new Error('Менее 5 отзывов в категории ' + category);
for (const row of records) if (excerptWordCount(row['фрагмент_или_пересказ']) > 15) throw new Error(row.id + ': пересказ длиннее 15 слов');
const duplicateKeys = records.map(r => [r['источник_url'], r['дата_отзыва'], r['фрагмент_или_пересказ']].join('||'));
if (new Set(duplicateKeys).size !== duplicateKeys.length) throw new Error('Найдены дубли отзывов.');

function countsBy(field, array = records) {
  return Object.fromEntries([...new Set(array.map(r => r[field]))].sort().map(value => [value, array.filter(r => r[field] === value).length]));
}
function themeCounts() {
  const counts = {};
  for (const row of records) for (const code of row['код_темы']) counts[code] = (counts[code] || 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}
function themeCountsFor(rows) {
  const counts = {};
  for (const row of rows) for (const code of row['код_темы']) counts[code] = (counts[code] || 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}
const visibleRatings = records.map(r => r['рейтинг']).filter(v => typeof v === 'number');
const clusterSizes = Object.values(sourceSampleCounts).sort((a,b) => a - b);
const summary = {
  'всего_отзывов': records.length,
  'уникальных_источников': new Set(records.map(r => r['источник_url'])).size,
  'рынки': countsBy('рынок'),
  'категории': countsBy('категория'),
  'тональность': countsBy('тональность'),
  'отзывов_с_индивидуальным_рейтингом': visibleRatings.length,
  'средний_видимый_индивидуальный_рейтинг': Number((visibleRatings.reduce((a,b) => a + b, 0) / visibleRatings.length).toFixed(2)),
  'частота_кодов_тем': themeCounts(),
  'темы_в_отзывах_с_явным_барьером': themeCountsFor(records.filter(r => r['барьер_возражение'])),
  'темы_в_отзывах_с_явным_позитивом': themeCountsFor(records.filter(r => r['позитив'])),
  'среднее_наблюдений_на_источник': Number((records.length / clusterSizes.length).toFixed(2)),
  'максимум_наблюдений_с_одной_карточки': Math.max(...clusterSizes),
  'источников_с_несколькими_отзывами': clusterSizes.filter(n => n > 1).length
};

const payload = {
  metadata: {
    project: 'Avdar Market',
    dataset: 'Voice of Customer: шерстяные и кашемировые аксессуары и пледы',
    checked_at: checkedAt,
    markets: requiredMarkets,
    method: 'Ручная read-only фиксация публичных отзывов с официальных карточек и крупных ритейлеров; один ряд — один отзыв.',
    quote_policy: 'Длинные оригиналы не хранятся. Использован точный русский пересказ до 15 слов.',
    interpretation_limit: 'Удобная целевая выборка не репрезентативна. Отзывы подтверждают потребительские мотивы, но не продажи, ROAS или успех креатива.',
    dependency_warning: records.length + ' отзывов взяты с ' + new Set(records.map(r => r['источник_url'])).size + ' карточек. Наблюдения одной карточки зависимы; используйте группировку по полю группа_зависимости.',
    google_sheet_modified: false
  },
  summary,
  theme_dictionary: themeDictionary,
  sources: Object.values(sources).map(source => ({
    'товар_бренд': source.product,
    'рынок': source.market,
    'средний_рейтинг_карточки': source.aggregate,
    'число_оценок_карточки': source.count,
    'источник_url': source.url,
    'тип_источника': source.type,
    'ограничение': source.limitation,
    'дата_проверки': checkedAt
  })),
  records
};

const headers = Object.keys(records[0]);
const csvValue = (value) => {
  const normalized = Array.isArray(value) ? value.join('|') : value == null ? '' : String(value);
  return '"' + normalized.replaceAll('"', '""') + '"';
};
const csv = [headers.map(csvValue).join(','), ...records.map(row => headers.map(h => csvValue(row[h])).join(','))].join('\n') + '\n';

await fs.mkdir(outputDir, {recursive:true});
const jsonPath = path.join(outputDir, 'avdar_voice_of_customer_reviews_v2_2026-09-15.json');
const csvPath = path.join(outputDir, 'avdar_voice_of_customer_reviews_v2_2026-09-15.csv');
const jsonTmpPath = jsonPath + '.tmp';
const csvTmpPath = csvPath + '.tmp';
await fs.writeFile(jsonTmpPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
await fs.writeFile(csvTmpPath, csv, 'utf8');
await fs.rename(jsonTmpPath, jsonPath);
await fs.rename(csvTmpPath, csvPath);
console.log(JSON.stringify({jsonPath, csvPath, summary}, null, 2));
