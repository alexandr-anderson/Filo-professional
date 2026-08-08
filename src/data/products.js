export const products = [
  {
    id: 'cafe-brasil',
    name: 'Café Brasil',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    volume: '500 мл',
    description:
      'Профессиональный редуктор объёма с экстрактом бразильского кофе. Разглаживает и укрощает непослушные волосы, сохраняя естественный объём.',
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
      'Биотехнологичный редуктор объёма с наночастицами. Глубокое восстановление структуры волоса с эффектом ботокса.',
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
      'Премиальная нано-формула для интенсивного восстановления повреждённых волос. Платиновый комплекс для максимального блеска.',
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
      'Масло-финишер с натуральными маслами Амазонии. Придаёт блеск, защищает от УФ и термического воздействия.',
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
      'Домашний набор для глубокого увлажнения: шампунь, кондиционер и маска. Формула с экстрактами тропических растений.',
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
    href: '/catalog.html?cat=volume',
    image: '/images/categories/volume.png',
  },
  {
    id: 'treatment',
    title: 'Лечение',
    href: '/catalog.html?cat=treatment',
    image: '/images/categories/treatment.png',
  },
  {
    id: 'homecare',
    title: 'Home Care',
    href: '/catalog.html?cat=homecare',
    image: '/images/categories/homecare.png',
  },
  {
    id: 'finisher',
    title: 'Финиш',
    href: '/catalog.html?cat=finisher',
    image: '/images/categories/finisher.png',
  },
];

export const trustItems = [
  { icon: '🚚', title: 'Доставка по РФ', text: 'СДЭК, Почта, Boxberry' },
  { icon: '↩️', title: 'Консультация', text: 'Поможем с подбором' },
  { icon: '🔒', title: 'Безопасная оплата', text: 'После подтверждения заказа' },
];

export const PRICE_LABEL = 'уточняется';

export function formatPrice() {
  return PRICE_LABEL;
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
