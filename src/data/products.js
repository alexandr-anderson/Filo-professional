export const products = [
  {
    id: 'cafe-brasil',
    name: 'Café Brasil',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    price: 3200,
    volume: '500 мл',
    description:
      'Профессиональный редуктор объёма с экстрактом бразильского кофе. Разглаживает и укрощает непослушные волосы, сохраняя естественный объём.',
    line: 'Redutor de Volume',
  },
  {
    id: 'bio-btx-reducer',
    name: 'Bio BTX Reducer',
    category: 'volume',
    categoryLabel: 'Редуктор объёма',
    price: 3800,
    volume: '500 мл',
    description:
      'Биотехнологичный редуктор объёма с наночастицами. Глубокое восстановление структуры волоса с эффектом ботокса.',
    line: 'Redutor de Volume',
  },
  {
    id: 'nano-btx-platinum',
    name: 'Nano BTX Platinum',
    category: 'treatment',
    categoryLabel: 'Лечение',
    price: 4500,
    volume: '500 мл',
    description:
      'Премиальная нано-формула для интенсивного восстановления повреждённых волос. Платиновый комплекс для максимального блеска.',
    line: 'Tratamento',
  },
  {
    id: 'splendor-oil',
    name: 'Splendor Oil',
    category: 'finisher',
    categoryLabel: 'Финиш',
    price: 1800,
    volume: '60 мл',
    description:
      'Масло-финишер с натуральными маслами Амазонии. Придаёт блеск, защищает от УФ и термического воздействия.',
    line: 'Finalizadores',
  },
  {
    id: 'kit-hydrat-therapy',
    name: 'Kit Hydrat Therapy',
    category: 'homecare',
    categoryLabel: 'Home Care',
    price: 5200,
    volume: '3 × 250 мл',
    description:
      'Домашний набор для глубокого увлажнения: шампунь, кондиционер и маска. Формула с экстрактами тропических растений.',
    line: 'Home Care',
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
  { id: 'volume', title: 'Редуктор объёма', href: '/catalog.html?cat=volume' },
  { id: 'treatment', title: 'Лечение', href: '/catalog.html?cat=treatment' },
  { id: 'homecare', title: 'Home Care', href: '/catalog.html?cat=homecare' },
  { id: 'finisher', title: 'Финиш', href: '/catalog.html?cat=finisher' },
];

export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
