/*
 * Иностранные бренды, предлагающие шерстяные изделия покупателям семи рынков.
 * Локальная витрина и условия доставки подтверждают предложение, не объём продаж.
 * Цены и доступность проверены 17.09.2026; они могут измениться.
 */
(function () {
  const images = '../../../research_assets/reference_screenshots/sites_crossborder/';
  window.MARKET_PRESENCE_V14 = {
    DE: {
      feature: { brand: 'Falconeri', product: 'Кашемировый шарф, 100% кашемир', price: '€118', url: 'https://www.falconeri.com/de/product/kaschmirschal-UZ00056.html', image: images + 'DE_falconeri_cashmere_scarf.png', proof: 'Немецкая карточка товара с добавлением в корзину.' },
      others: [
        { brand: 'GOBI', product: 'Тканый кашемировый шарф', price: '€79', url: 'https://de.gobicashmere.com/products/gewebte-kaschmirschal-coconut-milk/?variant=55666639831419', proof: 'Немецкая витрина; доставка по Германии.' },
        { brand: 'DILLING', product: 'Носки из мериносовой шерсти', price: '€13,99', url: 'https://www.dilling.de/produkt/herren-socken-merinowolle-single-jersey-pg-1700-0300-053', proof: 'Немецкая карточка; доставка 2–4 рабочих дня.' },
      ],
    },
    NL: {
      feature: { brand: 'Falconeri', product: 'Кашемировый шарф, 100% кашемир', price: '€118', url: 'https://www.falconeri.com/nl/product/cashmere_scarf-UZ00056.html', image: images + 'NL_falconeri_cashmere_scarf.png', proof: 'Нидерландская карточка с корзиной и условиями возврата.' },
      others: [
        { brand: 'COS', product: 'Кашемировые шарфы', price: 'от €69', url: 'https://www.cos.com/en-nl/women/hats-scarves-and-gloves/cashmere-accessories/scarves', proof: 'Ассортимент и цены на нидерландской витрине.' },
        { brand: 'DILLING', product: 'Носки из мериносовой шерсти', price: '€15,99', url: 'https://www.dilling.nl/product/sokken-van-merinowol-voor-heren-pg-1730-0330-080', proof: 'Нидерландская карточка; доставка из Дании.' },
      ],
    },
    PL: {
      feature: { brand: 'Falconeri', product: 'Кашемировый шарф, 100% кашемир', price: '489 zł', url: 'https://www.falconeri.com/pl/product/kaszmirowy_szalik-UZ00056.html', image: images + 'PL_falconeri_cashmere_scarves.png', proof: 'Польская карточка с добавлением в корзину.' },
      others: [
        { brand: 'DILLING', product: 'Носки из мериносовой шерсти', price: '59,99 zł', url: 'https://www.dilling.pl/produkt/mezczyzni-skarpetki-welna-merynosow-single-jersey-pg-1700-0300-869', proof: 'Польский заказ: BLIK/Przelewy, доставка 3–5 дней.' },
        { brand: 'UNIQLO', product: 'Кашемировый шарф', price: '€59,90', url: 'https://www.uniqlo.com/eu-pl/en/women/accessories/scarves', proof: 'Витрина для Польши; доставка 2–5 рабочих дней.' },
      ],
    },
    DK: {
      feature: { brand: 'UNIQLO', product: 'Кашемировый шарф, 100% кашемир', price: '499 DKK', url: 'https://www.uniqlo.com/dk/en/products/E486760-000/00?colorDisplayCode=62', image: images + 'DK_uniqlo_cashmere_scarf.png', proof: 'Датская карточка: товар в наличии, доступна доставка.' },
      others: [
        { brand: 'COS', product: 'Кашемировый шарф', price: '900 DKK', url: 'https://www.cos.com/en-dk/women/accessories/hatsscarvesgloves/scarves/product/pure-cashmere-scarf-dark-grey-1032425002', proof: 'Датская карточка с добавлением в корзину.' },
        { brand: 'ASKET', product: 'Шарф: 55% шерсть, 45% кашемир', price: '700 DKK', url: 'https://www.asket.com/en-dk/cashmere-wool-scarf-grey-melange', proof: 'Датская карточка этого шарфа; реклама показывалась в Дании.' },
      ],
    },
    BE: {
      feature: { brand: 'ASKET', product: 'Шарф: 55% шерсть, 45% кашемир', price: '€100', url: 'https://www.asket.com/en-be/cashmere-wool-scarf-grey-melange', image: images + 'BE_asket_cashmere_wool_scarf.png', proof: 'Бельгийская карточка этого шарфа; реклама показывалась в Бельгии.' },
      others: [
        { brand: 'UNIQLO', product: 'Кашемировый шарф, 100% кашемир', price: '€59,90', url: 'https://www.uniqlo.com/be/en/products/E486760-000/00?colorDisplayCode=62', proof: 'Бельгийская карточка: товар в наличии и доступна доставка.' },
        { brand: 'FALKE', product: 'Носки Softmerino, 57% шерсти', price: 'от €17,95', url: 'https://www.zalando.be/falke-softmerino-sokken-fa151j000-c11.html', proof: 'Карточка Zalando.be с местной доставкой.' },
      ],
    },
    SE: {
      feature: { brand: 'UNIQLO', product: 'Кашемировый шарф, 100% кашемир', price: '749 SEK', url: 'https://www.uniqlo.com/se/en/products/E486760-000/00?colorDisplayCode=62', image: images + 'SE_uniqlo_cashmere_scarf.png', proof: 'Шведская карточка: товар в наличии, доступна доставка.' },
      others: [
        { brand: 'Falconeri', product: 'Кашемировый шарф, 100% кашемир', price: '1 439 SEK', url: 'https://www.falconeri.com/se/product/cashmere_scarf-UZ00056.html', proof: 'Шведская карточка с добавлением в корзину.' },
        { brand: 'FALKE', product: 'Носки Softmerino', price: '259 SEK', url: 'https://www.zalando.se/falke-soft-warm-strumpor-dark-blue-mel-fa151j000-k16.html', proof: 'Карточка Zalando.se с местной доставкой.' },
      ],
    },
    FI: {
      feature: { brand: 'UNIQLO', product: 'Кашемировый шарф, 100% кашемир', price: '€59,90', url: 'https://www.uniqlo.com/eu-fi/en/products/E486760-000/00?colorDisplayCode=62', image: images + 'FI_uniqlo_cashmere_scarf.png', proof: 'Витрина для Финляндии; доставка 3–5 рабочих дней.' },
      others: [
        { brand: 'Johnstons of Elgin', product: 'Шарф Tartan из кашемира', price: '€87,95 · акция', url: 'https://www.zalando.fi/johnstons-of-elgin-tartan-scarf-huivi-buchanan-j2351g01j-t11.html', proof: 'Карточка Zalando.fi с доставкой по Финляндии.' },
        { brand: 'FALKE', product: 'Носки Softmerino', price: '€15,30', url: 'https://www.zalando.fi/falke-sukat-musta-fa151j000-q01.html', proof: 'Карточка Zalando.fi с доставкой в Финляндию.' },
      ],
    },
  };
})();
