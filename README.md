# FILO Professional Russia — Лендинг-магазин

Официальный дистрибьютор профессиональной косметики **FILO Professional** (Бразилия) в России.

## Быстрый деплой на Timeweb

На сервере выполните **одну команду**:

```bash
bash /home/c/cm149295/filo-src/deploy.sh
```

Скрипт сам сделает `git pull origin main` и зальёт файлы в `public_html/`.

Чтобы было ещё короче — один раз добавьте alias в `~/.bashrc`:

```bash
echo 'alias deploy="bash /home/c/cm149295/filo-src/deploy.sh"' >> ~/.bashrc
```

После этого достаточно написать:

```bash
deploy
```

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
export const CONTACT_EMAIL = 'Filoprofessional2026@mail.ru';
export const CONTACT_PHONE = '+79111789030';
```

При оформлении заказ откроется в Telegram с готовым текстом.

## Деплой на Timeweb (SSH)

На сервер нужно залить файлы сайта (не `node_modules`, не `.git`):

```
index.html
catalog.html
about.html
delivery.html
privacy.html
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
| Telegram, email, телефон | `src/data/config.js` |
| Контакты в футере | `src/js/app.js` (из config) |
| Телефон на сайте | `about.html` |
| Товары и описания | `src/data/products.js` |
| Цены | Пока скрыты («уточняется»), см. `formatPrice()` в `products.js` |
