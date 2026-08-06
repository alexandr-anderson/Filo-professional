import { products, formatPrice } from '../data/products.js';
import {
  getCart,
  getCartCount,
  getCartTotal,
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} from './cart.js';

const currentPage = document.body.dataset.page || 'home';

export function initApp() {
  renderHeader();
  renderFooter();
  initCart();
  initMobileMenu();

  if (currentPage === 'home') initHome();
  if (currentPage === 'catalog') initCatalog();
}

function renderHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const count = getCartCount();
  const navLinks = [
    { href: '/', label: 'Главная', page: 'home' },
    { href: '/catalog.html', label: 'Каталог', page: 'catalog' },
    { href: '/delivery.html', label: 'Доставка', page: 'delivery' },
    { href: '/about.html', label: 'О нас', page: 'about' },
  ];

  header.innerHTML = `
    <div class="container header__inner">
      <a href="/" class="logo">FIL<span>O</span></a>
      <nav class="nav" id="nav">
        ${navLinks
          .map(
            (l) =>
              `<a href="${l.href}" class="nav__link ${currentPage === l.page ? 'nav__link--active' : ''}">${l.label}</a>`
          )
          .join('')}
      </nav>
      <div class="header__actions">
        <button class="cart-btn" id="cartBtn" aria-label="Корзина">
          🛒 Корзина
          <span class="cart-btn__count" data-count="${count}">${count || ''}</span>
        </button>
        <button class="menu-toggle" id="menuToggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">FIL<span>O</span> Professional</div>
          <p class="footer__desc">
            Официальный дистрибьютор профессиональной косметики FILO в России.
            Санкт-Петербург · Доставка по всей России.
          </p>
        </div>
        <div>
          <div class="footer__title">Навигация</div>
          <ul class="footer__links">
            <li><a href="/">Главная</a></li>
            <li><a href="/catalog.html">Каталог</a></li>
            <li><a href="/delivery.html">Доставка</a></li>
            <li><a href="/about.html">О нас и контакты</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__title">Контакты</div>
          <ul class="footer__links">
            <li><a href="https://t.me/filo_russia" target="_blank" rel="noopener">Telegram</a></li>
            <li><a href="mailto:order@filo-russia.ru">order@filo-russia.ru</a></li>
            <li>Санкт-Петербург</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} FILO Russia. Официальный дистрибьютор.</span>
        <span>filoprofessional.com.br</span>
      </div>
    </div>
  `;
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('nav--open'));
  });
}

function initCart() {
  injectCartUI();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('checkoutBtn')?.addEventListener('click', showCheckout);
  document.getElementById('backToCart')?.addEventListener('click', hideCheckout);
  document.getElementById('checkoutForm')?.addEventListener('submit', handleOrderSubmit);

  updateCartUI();
}

function injectCartUI() {
  const existing = document.getElementById('cartSidebar');
  if (existing) return;

  const html = `
    <div class="cart-overlay" id="cartOverlay"></div>
    <div class="cart-sidebar" id="cartSidebar">
      <div class="cart-sidebar__header">
        <h2 class="cart-sidebar__title">Корзина</h2>
        <button class="cart-sidebar__close" id="cartClose" aria-label="Закрыть">×</button>
      </div>
      <div class="cart-sidebar__items cart-items-view" id="cartItems"></div>
      <form class="checkout-form" id="checkoutForm">
        <button type="button" class="form-back" id="backToCart">← Назад к корзине</button>
        <div class="form-group">
          <label for="customerName">Имя *</label>
          <input type="text" id="customerName" name="name" required placeholder="Ваше имя">
        </div>
        <div class="form-group">
          <label for="customerPhone">Телефон *</label>
          <input type="tel" id="customerPhone" name="phone" required placeholder="+7 (___) ___-__-__">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="customerCity">Город *</label>
            <input type="text" id="customerCity" name="city" required placeholder="Москва">
          </div>
          <div class="form-group">
            <label for="customerZip">Индекс</label>
            <input type="text" id="customerZip" name="zip" placeholder="123456">
          </div>
        </div>
        <div class="form-group">
          <label for="customerAddress">Адрес доставки *</label>
          <textarea id="customerAddress" name="address" required placeholder="Улица, дом, квартира, пункт выдачи"></textarea>
        </div>
        <div class="form-group">
          <label for="deliveryMethod">Способ доставки *</label>
          <select id="deliveryMethod" name="delivery" required>
            <option value="">Выберите способ</option>
            <option value="СДЭК">СДЭК</option>
            <option value="Почта России">Почта России</option>
            <option value="Boxberry">Boxberry</option>
            <option value="Самовывоз (СПб)">Самовывоз (СПб)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="customerComment">Комментарий</label>
          <textarea id="customerComment" name="comment" placeholder="Пожелания к заказу"></textarea>
        </div>
        <div class="form-message" id="formMessage"></div>
        <button type="submit" class="btn btn--primary btn--full" id="submitOrder">Отправить заказ</button>
      </form>
      <div class="cart-sidebar__footer" id="cartFooter">
        <div class="cart-sidebar__total">
          <span>Итого:</span>
          <span class="cart-sidebar__total-value" id="cartTotal">0 ₽</span>
        </div>
        <button class="btn btn--primary btn--full" id="checkoutBtn">Оформить заказ</button>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function openCart() {
  updateCartUI();
  document.getElementById('cartOverlay')?.classList.add('cart-overlay--open');
  document.getElementById('cartSidebar')?.classList.add('cart-sidebar--open');
  document.body.style.overflow = 'hidden';
  hideCheckout();
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('cart-overlay--open');
  document.getElementById('cartSidebar')?.classList.remove('cart-sidebar--open');
  document.body.style.overflow = '';
}

function showCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Корзина пуста');
    return;
  }

  document.getElementById('cartItems')?.classList.add('cart-items-view--hidden');
  document.getElementById('checkoutForm')?.classList.add('checkout-form--active');
  document.getElementById('cartFooter').style.display = 'none';
}

function hideCheckout() {
  document.getElementById('cartItems')?.classList.remove('cart-items-view--hidden');
  document.getElementById('checkoutForm')?.classList.remove('checkout-form--active');
  document.getElementById('cartFooter').style.display = '';
  document.getElementById('formMessage').className = 'form-message';
  document.getElementById('formMessage').textContent = '';
}

function updateCartUI() {
  const cart = getCart();
  const count = getCartCount();
  const total = getCartTotal(products);

  const countEl = document.querySelector('.cart-btn__count');
  if (countEl) {
    countEl.textContent = count || '';
    countEl.dataset.count = count;
  }

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = formatPrice(total);

  const itemsEl = document.getElementById('cartItems');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <p>Корзина пуста</p>
        <a href="/catalog.html" class="btn btn--secondary btn--sm" style="margin-top:16px">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  itemsEl.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item__info">
            <div class="cart-item__name">${product.name}</div>
            <div class="cart-item__price">${formatPrice(product.price)}</div>
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-action="decrease" data-id="${item.id}">−</button>
              <span class="cart-item__qty-value">${item.qty}</span>
              <button class="cart-item__qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item__remove" data-action="remove" data-id="${item.id}">Удалить</button>
          </div>
        </div>
      `;
    })
    .join('');

  itemsEl.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = cart.find((i) => i.id === id);

      if (action === 'increase') updateQty(id, (item?.qty || 0) + 1);
      if (action === 'decrease') updateQty(id, (item?.qty || 0) - 1);
      if (action === 'remove') removeFromCart(id);

      updateCartUI();
    });
  });
}

function buildOrderMessage(formData) {
  const cart = getCart();
  const lines = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return `• ${product.name} × ${item.qty} — ${formatPrice(product.price * item.qty)}`;
  });

  const total = getCartTotal(products);

  return [
    '🛍 Новый заказ FILO',
    '',
    '📦 Товары:',
    ...lines,
    '',
    `💰 Итого: ${formatPrice(total)}`,
    '',
    '👤 Клиент:',
    `Имя: ${formData.name}`,
    `Телефон: ${formData.phone}`,
    '',
    '🚚 Доставка:',
    `Город: ${formData.city}`,
    formData.zip ? `Индекс: ${formData.zip}` : null,
    `Адрес: ${formData.address}`,
    `Способ: ${formData.delivery}`,
    formData.comment ? `\n💬 Комментарий: ${formData.comment}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function handleOrderSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitOrder');
  const messageEl = document.getElementById('formMessage');

  const formData = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    city: form.city.value.trim(),
    zip: form.zip.value.trim(),
    address: form.address.value.trim(),
    delivery: form.delivery.value,
    comment: form.comment.value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  messageEl.className = 'form-message';
  messageEl.textContent = '';

  const orderMessage = buildOrderMessage(formData);

  try {
    const response = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: orderMessage, formData }),
    });

    if (response.ok) {
      clearCart();
      updateCartUI();
      messageEl.className = 'form-message form-message--success';
      messageEl.textContent = 'Заказ отправлен! Мы свяжемся с вами в Telegram.';
      form.reset();
      showToast('Заказ успешно отправлен!');
      setTimeout(closeCart, 2500);
    } else {
      throw new Error('API error');
    }
  } catch {
    // Fallback: открыть Telegram с готовым сообщением
    const telegramUsername = import.meta.env.VITE_TELEGRAM_USERNAME || '';
    if (telegramUsername) {
      const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(orderMessage)}`;
      window.open(url, '_blank');
      clearCart();
      updateCartUI();
      messageEl.className = 'form-message form-message--success';
      messageEl.textContent = 'Откроется Telegram — нажмите «Отправить» для завершения заказа.';
      form.reset();
      showToast('Переход в Telegram...');
      setTimeout(closeCart, 2500);
    } else {
      messageEl.className = 'form-message form-message--error';
      messageEl.textContent =
        'Не удалось отправить заказ автоматически. Напишите нам в Telegram вручную.';
    }
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Отправить заказ';
}

export function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('toast--show');
  setTimeout(() => toast.classList.remove('toast--show'), 3000);
}

export function renderProductCard(product) {
  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-card__image">
        <span class="product-card__category">${product.categoryLabel}</span>
        <div class="product-card__image-inner">${product.name}</div>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        <div class="product-card__footer">
          <div class="product-card__price">
            ${formatPrice(product.price)}
            <br><small>${product.volume}</small>
          </div>
          <button class="btn btn--primary btn--sm add-to-cart" data-id="${product.id}">
            В корзину
          </button>
        </div>
      </div>
    </article>
  `;
}

function bindAddToCart(container) {
  container.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id);
      updateCartUI();
      showToast('Товар добавлен в корзину');
    });
  });
}

function initHome() {
  const grid = document.getElementById('featuredProducts');
  if (grid) {
    grid.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
    bindAddToCart(grid);
  }

  document.querySelectorAll('.line-card').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });
}

function initCatalog() {
  const grid = document.getElementById('catalogProducts');
  const tabs = document.getElementById('filterTabs');
  if (!grid) return;

  grid.innerHTML = products.map(renderProductCard).join('');
  bindAddToCart(grid);

  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get('cat') || 'all';
  filterProducts(initialCat);

  if (tabs) {
    tabs.querySelectorAll('.filter-tab').forEach((tab) => {
      if (tab.dataset.cat === initialCat) tab.classList.add('filter-tab--active');

      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('filter-tab--active'));
        tab.classList.add('filter-tab--active');
        filterProducts(tab.dataset.cat);
      });
    });
  }
}

function filterProducts(category) {
  document.querySelectorAll('.product-card').forEach((card) => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });
}
