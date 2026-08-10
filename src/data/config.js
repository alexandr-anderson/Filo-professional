export const TELEGRAM_USERNAME = 'filo_russia';

export const BRAND_NAME = 'FILO Professional';

export const TELEGRAM_PRICE_MESSAGE = `Здравствуйте! Интересует прайс FILO Professional для [салона/мастера].
Город: ___.
Интересуют линейки: ___.`;

export function getTelegramPriceUrl() {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(TELEGRAM_PRICE_MESSAGE)}`;
}
