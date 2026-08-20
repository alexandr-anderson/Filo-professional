export const products = [
  {
    id: 'cafe-brasil',
    name: 'Café Verde',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '1 л',
    price: 7250,
    description:
      'Редуктор объёма с маслом зелёного кофе — убирает пушистость, укрощает густые непослушные волосы. Берут перед выпрямлением, когда нужно снять объём и полотно легло ровнее.',
    tagline: 'Редуктор на зелёном кофе — перед выпрямлением',
    line: 'Café Brasil Lisoriance',
    image: '/images/products/cafe-verde.png',
  },
  {
    id: 'ultra-fast',
    name: 'Ultra Fast Keratin',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '1 л',
    price: 6450,
    description:
      'Быстрый редуктор объёма с кератином, маслом бабасу и биотином — реструктурирует и выравнивает полотно. Когда нужен результат за один сеанс без лишней паузы в кресле.',
    tagline: 'Быстрое выпрямление и редуктор в одном флаконе',
    line: 'Ultra Fast Keratin',
    image: '/images/products/ultra-fast.png',
  },
  {
    id: 'apricot',
    name: 'Apricot',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '1 л',
    price: 6780,
    description:
      'Nanolisoriance на абрикосе — редуктор и восстановление с мягким воздействием на полотно. Хороший вариант, когда нужен баланс между выпрямлением и уходом.',
    tagline: 'Мягкий редуктор с абрикосовыми активами',
    line: 'Apricot Nanolisoriance',
    image: '/images/products/apricot.png',
  },
  {
    id: 'bio-tannin',
    name: 'Bio Tannin',
    category: 'volume',
    categoryLabel: 'Танинопластика',
    volume: '1 л',
    price: 6620,
    description:
      'Танинопластика на дубильных компонентах — альтернатива кератину для выпрямления и реконструкции. Берут, когда клиент хочет танин, а не классический кератин.',
    tagline: 'Танинопластика вместо кератина',
    line: 'Biotannin',
    image: '/images/products/bio-tannin.png',
  },
  {
    id: 'bamboo-therapy',
    name: 'Bamboo Thérapie',
    category: 'treatment',
    categoryLabel: 'Лечение',
    volume: '500 г',
    price: 3810,
    description:
      'Липидная маска на бамбуке — глубокое питание и восстановление массы волос после осветления, химии и редукторов. Часто идёт на финиш после кератина или между процедурами.',
    tagline: 'Липидка — восстановление массы волос',
    line: 'Bamboo Thérapie',
    image: '/images/products/bamboo-therapy.png',
  },
  {
    id: 'bio-btx-reducer',
    name: 'Bio BTX Reducer',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '500 мл',
    description:
      'Редуктор с наночастицами — и на объём, и на восстановление в одном флаконе. Часто берут к кератину и ботоксу, когда волосы ослаблены и их нужно подтянуть до утюжка.',
    tagline: 'К кератину и ботоксу, когда волосы слабые',
    line: 'Redutor de Volume',
    image: '/images/products/bio-btx-reducer.png',
  },
  {
    id: 'nano-btx-platinum',
    name: 'Nano BTX Platinum',
    category: 'treatment',
    categoryLabel: 'Лечение',
    volume: '500 мл',
    description:
      'Лечебная линия для ломких и химически уставших волос — даёт плотность и блеск. Когда нужен ботокс или восстановление, а не жёсткое выпрямление в ноль.',
    tagline: 'Восстановление без выпрямления в ноль',
    line: 'Tratamento',
    image: '/images/products/nano-btx-platinum.jpg',
  },
  {
    id: 'splendor-oil',
    name: 'Splendor Oil',
    category: 'finisher',
    categoryLabel: 'Финиш',
    volume: '60 мл',
    description:
      'Масло на финиш — после кератина или ботокса, на укладку и термозащиту. Блеск без липкости, масла из Амазонии.',
    tagline: 'Финиш после кератина и ботокса',
    line: 'Finalizadores',
    image: '/images/products/splendor-oil.png',
  },
  {
    id: 'kit-hydrat-therapy',
    name: 'Kit Hydrat Therapy',
    category: 'homecare',
    categoryLabel: 'Home Care',
    volume: '3 × 250 мл',
    description:
      'Home care на три продукта: шампунь, кондиционер, маска. Удобно отдавать клиенту после увлажняющей процедуры — продлить эффект дома.',
    tagline: 'Home care клиенту после процедуры',
    line: 'Home Care',
    image: '/images/products/kit-hydrat-therapy.png',
  },
];

export const categories = [
  { id: 'all', label: 'Все товары' },
  { id: 'volume', label: 'Редуктор объёма' },
  { id: 'treatment', label: 'Лечение' },
  { id: 'homecare', label: 'Home Care' },
  { id: 'finisher', label: 'Финиш' },
];

export const features = [
  { icon: '01', title: 'Подбор линейки' },
  { icon: '02', title: 'Доставка по РФ' },
  { icon: '03', title: '100% Бразилия' },
  { icon: '04', title: 'Нанотехнологии' },
  { icon: '05', title: 'Официальный дистрибьютор' },
];

export const productLines = [
  {
    id: 'volume',
    title: 'Редуктор объёма',
    subtitle: 'Кератин, ботокс, выпрямление',
    href: '/catalog.html?cat=volume',
    image: '/images/categories/volume.png',
  },
  {
    id: 'treatment',
    title: 'Лечение',
    subtitle: 'Восстановление и реконструкция',
    href: '/catalog.html?cat=treatment',
    image: '/images/categories/treatment.png',
  },
  {
    id: 'homecare',
    title: 'Home Care',
    subtitle: 'Для продажи клиентам после процедуры',
    href: '/catalog.html?cat=homecare',
    image: '/images/categories/homecare.png',
  },
  {
    id: 'finisher',
    title: 'Финиш',
    subtitle: 'На финиш и укладку',
    href: '/catalog.html?cat=finisher',
    image: '/images/categories/finisher.png',
  },
];

export const b2bBenefits = [
  {
    icon: '01',
    title: 'Подбор линейки',
    text: 'Кератин, ботокс, редуктор — напишите, чем работаете в кресле, подскажем, какие позиции FILO реально нужны в наборе.',
  },
  {
    icon: '02',
    title: 'Поставки по РФ',
    text: 'Отправка из Санкт-Петербурга — СДЭК, Почта, Boxberry. Удобно для повторных заказов салона или мастера.',
  },
  {
    icon: '03',
    title: 'Официальный дистрибьютор',
    text: 'Прямые поставки FILO Professional. Актуальные цены на ключевые позиции — в каталоге, остальной прайс в Telegram.',
  },
];

export const trustItems = [
  { icon: '01', title: 'Доставка по РФ', text: 'СДЭК, Почта, Boxberry' },
  { icon: '02', title: 'Консультация', text: 'Подскажем по кератину, ботоксу и редуктору' },
  { icon: '03', title: 'Оплата', text: 'После согласования заказа' },
];

export const PRICE_LABEL = 'Цена по запросу';
export const PRICE_HINT = 'Прайс для салонов и мастеров — в Telegram';

export function formatRubles(amount) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(product) {
  if (product?.price != null) {
    return formatRubles(product.price);
  }
  return PRICE_LABEL;
}

export function getCartPricing(cart) {
  let total = 0;
  let hasPriced = false;
  let hasUnpriced = false;

  for (const item of cart) {
    const product = getProductById(item.id);
    if (!product) continue;
    if (product.price != null) {
      total += product.price * item.qty;
      hasPriced = true;
    } else {
      hasUnpriced = true;
    }
  }

  return { total, hasPriced, hasUnpriced };
}

export function formatCartTotal(cart) {
  const { total, hasPriced, hasUnpriced } = getCartPricing(cart);
  if (!hasPriced) return PRICE_LABEL;
  const formatted = formatRubles(total);
  if (hasUnpriced) return `${formatted} + уточнение`;
  return formatted;
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
