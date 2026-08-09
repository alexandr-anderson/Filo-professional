# FILO Professional Russia — Лендинг-магазин

Официальный дистрибьютор профессиональной косметики **FILO Professional** (Бразилия) в России.

## Возможности

- Каталог из 5 товаров с фильтрацией по линейкам
- Корзина с сохранением в localStorage
- Оформление заказа с данными доставки
- Отправка заказа в Telegram

## Локальный просмотр

Сайт — статические HTML/JS/CSS, сборка не требуется. Любой локальный сервер:

```bash
npx serve .
# или
python3 -m http.server 8080
```

Откройте `http://localhost:8080`

## Настройка Telegram

Username бота/аккаунта для заказов — в `src/data/config.js`:

```js
export const TELEGRAM_USERNAME = 'filo_russia';
```

При оформлении заказ откроется в Telegram с готовым текстом.

## Деплой на Timeweb (SSH)

На сервер нужно залить файлы сайта (не `node_modules`, не `.git`):

```
index.html
catalog.html
about.html
delivery.html
src/
public/
```

Пример обновления с GitHub (на сервере Timeweb):

```bash
bash /home/c/cm149295/filo-src/deploy.sh
```

Или вручную:

```bash
cd /home/c/cm149295/filo-src
git pull origin main
rsync -av --delete index.html catalog.html about.html delivery.html /home/c/cm149295/filo/public_html/
rsync -av --delete src /home/c/cm149295/filo/public_html/
rsync -av --delete public/images/ /home/c/cm149295/filo/public_html/images/
```

> Важно: `src` копируется **без слэша** — так создаётся папка `public_html/src/`.  
> `public/images/` копируется в `public_html/images/` — не `public/` в корень (иначе `--delete` сотрёт HTML и `src/`).

## Структура

```
├── index.html          — Главная
├── catalog.html        — Каталог
├── delivery.html       — Доставка
├── about.html          — О нас и контакты
├── public/images/      — Фото товаров и категорий
├── src/
│   ├── data/products.js
│   ├── data/config.js
│   ├── js/app.js
│   ├── js/cart.js
│   └── styles/main.css
```

## Что настроить

| Что | Где |
|-----|-----|
| Telegram username | `src/data/config.js` |
| Контакты (email, Telegram) | `src/js/app.js`, `about.html` |
| Товары и описания | `src/data/products.js` |
| Цены | Пока скрыты («уточняется»), см. `formatPrice()` в `products.js` |
