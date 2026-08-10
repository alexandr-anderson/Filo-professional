export const products = [
  {
    id: 'cafe-brasil',
    name: 'Café Brasil',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '500 мл',
    description:
      'Профессиональный редуктор объёма с экстрактом бразильского кофе. Разглаживает и укрощает непослушные волосы. Для процедур с редуктором объёма и подготовки к выпрямлению.',
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
      'Биотехнологичный редуктор объёма с наночастицами. Глубокое восстановление структуры волоса. Для кератинирования и ботокса — этап восстановления в протоколе редуктора.',
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
      'Премиальная нано-формула для интенсивного восстановления повреждённых волос. Для салонных процедур после химического воздействия — максимальный блеск и плотность.',
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
      'Масло-финишер с натуральными маслами Амазонии. Финиш после кератинирования и ботокса — блеск, термозащита и защита от УФ.',
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
      'Набор для домашнего ухода: шампунь, кондиционер и маска. Home Care для продажи клиентам салона после процедуры увлажнения.',
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
  { icon: '🐰', title: 'Cruelty-Free' },
  { icon: '🌿', title: 'Органика' },
  { icon: '🇧🇷', title: '100% Бразилия' },
  { icon: '🔬', title: 'Нанотехнологии' },
  { icon: '💇', title: 'Консультации' },
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
    subtitle: 'Завершение протокола в кресле',
    href: '/catalog.html?cat=finisher',
    image: '/images/categories/finisher.png',
  },
];

export const b2bBenefits = [
  {
    icon: '💬',
    title: 'Подбор линейки',
    text: 'Консультация по протоколам кератинирования, редуктора объёма и восстановления под ваши процедуры.',
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
  { icon: '↩️', title: 'Консультация', text: 'Поможем с подбором линейки' },
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
