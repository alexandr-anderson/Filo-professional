export const products = [
  {
    id: 'cafe-brasil',
    name: 'Café Brasil',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '500 мл',
    description:
      'Редуктор объёма с экстрактом бразильского кофе — убирает пушистость, укрощает густые непослушные волосы. Берут перед выпрямлением, когда нужно снять объём и полотно легло ровнее.',
    tagline: 'Редуктор на кофе — перед выпрямлением',
    line: 'Redutor de Volume',
    image: '/images/products/cafe-brasil.png',
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
  { icon: '💬', title: 'Подбор линейки' },
  { icon: '🚚', title: 'Доставка по РФ' },
  { icon: '🇧🇷', title: '100% Бразилия' },
  { icon: '🔬', title: 'Нанотехнологии' },
  { icon: '✓', title: 'Официальный дистрибьютор' },
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
    icon: '💬',
    title: 'Подбор линейки',
    text: 'Кератин, ботокс, редуктор — напишите, чем работаете в кресле, подскажем, какие позиции FILO реально нужны в наборе.',
  },
  {
    icon: '🚚',
    title: 'Поставки по РФ',
    text: 'Отправка из Санкт-Петербурга — СДЭК, Почта, Boxberry. Удобно для повторных заказов салона или мастера.',
  },
  {
    icon: '✓',
    title: 'Официальный дистрибьютор',
    text: 'Прямые поставки FILO Professional. Прайс для салонов и мастеров — в Telegram.',
  },
];

export const trustItems = [
  { icon: '🚚', title: 'Доставка по РФ', text: 'СДЭК, Почта, Boxberry' },
  { icon: '↩️', title: 'Консультация', text: 'Подскажем по кератину, ботоксу и редуктору' },
  { icon: '🔒', title: 'Оплата', text: 'После согласования заказа' },
];

export const PRICE_LABEL = 'Цена по запросу';
export const PRICE_HINT = 'Прайс для салонов и мастеров — в Telegram';

export function formatPrice() {
  return PRICE_LABEL;
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
