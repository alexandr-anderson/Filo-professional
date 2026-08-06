# FILO Russia — Лендинг-магазин

Официальный дистрибьютор профессиональной косметики **FILO Professional** (Бразилия) в России.

## Возможности

- Каталог из 5 товаров с фильтрацией по линейкам
- Корзина с сохранением в localStorage
- Оформление заказа с данными доставки
- Отправка заказа в Telegram (бот или fallback-ссылка)

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`

## Настройка Telegram

### Вариант 1: Автоматическая отправка (рекомендуется)

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Получите **Bot Token**
3. Узнайте свой **Chat ID**:
   - Напишите боту любое сообщение
   - Откройте: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Найдите `"chat":{"id":123456789}`
4. При деплое на Vercel добавьте переменные окружения:
   - `TELEGRAM_BOT_TOKEN` — токен бота
   - `TELEGRAM_CHAT_ID` — ваш chat ID

### Вариант 2: Fallback через ссылку

Если API недоступен, заказ откроется в Telegram с готовым текстом.

Создайте файл `.env` в корне проекта:

```
VITE_TELEGRAM_USERNAME=ваш_username_без_@
```

## Деплой на Vercel

```bash
npm run build
npx vercel
```

Или подключите репозиторий на [vercel.com](https://vercel.com) — деплой произойдёт автоматически.

## Структура

```
├── index.html          — Главная
├── catalog.html        — Кatalog
├── delivery.html       — Доставка
├── about.html          — О нас и контакты
├── api/send-order.js   — Serverless-функция для Telegram
├── src/
│   ├── data/products.js
│   ├── js/app.js       — Логика сайта и корзины
│   ├── js/cart.js      — Работа с корзиной
│   └── styles/main.css
```

## Что настроить перед запуском

| Что | Где |
|-----|-----|
| Цены на товары | `src/data/products.js` |
| Telegram username | `.env` → `VITE_TELEGRAM_USERNAME` |
| Контакты (email, Telegram) | `src/js/app.js` (footer), `about.html` |
| Фото товаров | Замените placeholder-блоки на `<img>` в карточках |

## Добавление фото товаров

Положите изображения в `public/products/` и обновите `renderProductCard` в `src/js/app.js`:

```html
<img src="/products/cafe-brasil.jpg" alt="Café Brasil">
```
