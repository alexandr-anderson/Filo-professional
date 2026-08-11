export const TELEGRAM_USERNAME = 'filo_russia';

export const BRAND_NAME = 'FILO Professional';

export const CONTACT_EMAIL = 'Filoprofessional2026@mail.ru';
export const CONTACT_PHONE = '+79111789030';
export const CONTACT_PHONE_DISPLAY = '+7 (911) 178-90-30';

export const OPERATOR_NAME = 'ИП Шадрин Дмитрий Викторович';
export const OPERATOR_INN = '380123860703';
export const OPERATOR_OGRNIP = '320784700181801';

export const TELEGRAM_PRICE_MESSAGE = `Здравствуйте! Интересует прайс FILO Professional для [салона/мастера].
Город: ___.
Интересуют линейки: ___.`;

export function getTelegramUrl() {
  return `https://t.me/${TELEGRAM_USERNAME}`;
}

export function getTelegramPriceUrl() {
  return `${getTelegramUrl()}?text=${encodeURIComponent(TELEGRAM_PRICE_MESSAGE)}`;
}
