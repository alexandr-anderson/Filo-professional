import {
  products,
  features,
  productLines,
  trustItems,
  b2bBenefits,
  categories,
  formatPrice,
  formatRubles,
  formatCartTotal,
  getCartPricing,
  PRICE_LABEL,
  PRICE_HINT,
} from '../data/products.js';
import { TELEGRAM_USERNAME, BRAND_NAME, CONTACT_EMAIL, getTelegramUrl, getTelegramPriceUrl } from '../data/config.js';
import {
  getCart,
  getCartCount,
  getItemQty,
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} from './cart.js';

const currentPage = document.body.dataset.page || 'home';
const COOKIE_CONSENT_KEY = 'filo_cookie_consent';

export function initApp() {
  renderTopBar();
  renderHeader();
  wrapSiteHeader();
  renderFooter();
  wireTelegramLinks();
  initHeaderScroll();
  initCart();
  initMobileMenu();
  initCookieConsent();

  if (currentPage === 'home') initHome();
  if (currentPage === 'catalog') initCatalog();
}

function wrapSiteHeader() {
  const topBar = document.getElementById('topBar');
  const header = document.querySelector('.header');
  if (!topBar || !header || document.getElementById('siteHeader')) return;

  const shell = document.createElement('div');
  shell.className = 'site-header';
  shell.id = 'siteHeader';

  const parent = topBar.parentNode;
  parent.insertBefore(shell, topBar);
  shell.append(topBar, header);
}

function initHeaderScroll() {
  const shell = document.getElementById('siteHeader');
  if (!shell) return;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const delta = y - lastY;

    shell.classList.toggle('site-header--scrolled', y > 24);
    shell.classList.toggle('site-header--compact', y > 80);

    if (y < 48 || document.body.classList.contains('nav-open')) {
      shell.classList.remove('site-header--hidden');
    } else if (delta > 8) {
      shell.classList.add('site-header--hidden');
    } else if (delta < -8) {
      shell.classList.remove('site-header--hidden');
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function wireTelegramLinks() {
  document.querySelectorAll('[data-telegram="price"]').forEach((el) => {
    el.href = getTelegramPriceUrl();
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function renderTopBar() {
  const topBar = document.getElementById('topBar');
  if (!topBar) return;

  topBar.innerHTML = `
    <div class="container top-bar__inner">
      ${features
        .map(
          (f) => `
        <div class="top-bar__item">
          <span class="top-bar__icon">${f.icon}</span>
          <span>${f.title}</span>
        </div>`
        )
        .join('')}
    </div>
  `;
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
      <a href="/" class="logo">FILO <span>Professional</span></a>
      <nav class="nav" id="nav">
        ${navLinks
          .map(
            (l) =>
              `<a href="${l.href}" class="nav__link ${currentPage === l.page ? 'nav__link--active' : ''}">${l.label}</a>`
          )
          .join('')}
      </nav>
      <div class="header__actions">
        <a href="#" data-telegram="price" class="btn btn--sm btn--secondary header__telegram">Telegram</a>
        <button class="cart-btn" id="cartBtn" type="button" aria-label="Корзина, товаров: ${count}">
          <span class="cart-btn__label">Корзина</span>
          <span class="cart-btn__count" data-count="${count}">(${count})</span>
        </button>
        <button class="menu-toggle" id="menuToggle" type="button" aria-label="Меню" aria-expanded="false" aria-controls="nav">
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
      <div class="footer__top">
        <div class="footer__brand-block">
          <a href="/" class="footer__brand">FILO <span>Professional</span></a>
          <p class="footer__desc">
            Официальный дистрибьютор ${BRAND_NAME} в России.
            Санкт-Петербург · поставки по всей стране.
          </p>
          <a href="#" data-telegram="price" class="btn btn--ghost-on-dark btn--sm footer__cta">Прайс в Telegram</a>
        </div>
        <div class="footer__cols">
          <div class="footer__col">
            <div class="footer__title">Навигация</div>
            <ul class="footer__links">
              <li><a href="/">Главная</a></li>
              <li><a href="/catalog.html">Каталог</a></li>
              <li><a href="/delivery.html">Доставка</a></li>
              <li><a href="/about.html">О нас</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <div class="footer__title">Контакты</div>
            <ul class="footer__links">
              <li><a href="${getTelegramUrl()}" target="_blank" rel="noopener">Telegram</a></li>
              <li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
              <li>Санкт-Петербург</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${BRAND_NAME} Russia</span>
        <a href="/privacy.html" class="footer__legal">Политика конфиденциальности</a>
        <a href="https://filoprofessional.com.br" class="footer__legal" target="_blank" rel="noopener">filoprofessional.com.br</a>
      </div>
    </div>
  `;
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const shell = document.getElementById('siteHeader');
  if (!toggle || !nav) return;

  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;

  const syncNavAria = (open = nav.classList.contains('nav--open')) => {
    if (!isMobileNav()) {
      nav.setAttribute('aria-hidden', 'false');
      return;
    }
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  syncNavAria(false);

  const setOpen = (open) => {
    nav.classList.toggle('nav--open', open);
    toggle.classList.toggle('menu-toggle--active', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    shell?.classList.toggle('site-header--nav-open', open);
    syncNavAria(open);

    if (open) {
      shell?.classList.remove('site-header--hidden');
      const first = nav.querySelector(focusableSelector);
      if (first) first.focus();
    } else if (isMobileNav()) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('nav--open'));
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      setOpen(false);
      syncNavAria(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      setOpen(false);
      return;
    }

    if (e.key !== 'Tab' || !nav.classList.contains('nav--open')) return;

    const focusable = [toggle, ...nav.querySelectorAll(focusableSelector)].filter(
      (el, i, arr) => arr.indexOf(el) === i
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

function initCookieConsent() {
  if (localStorage.getItem(COOKIE_CONSENT_KEY) || document.getElementById('cookieConsent')) return;

  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="cookie-consent" id="cookieConsent" role="dialog" aria-live="polite" aria-label="Согласие на использование cookie">
      <div class="container cookie-consent__inner">
        <p class="cookie-consent__text">
          Мы используем cookie для работы сайта и сохранения корзины.
          <a href="/privacy.html">Политика конфиденциальности</a>.
          Нажимая «Принять», вы соглашаетесь с их использованием.
        </p>
        <button type="button" class="btn btn--primary btn--sm cookie-consent__btn" id="cookieConsentAccept">
          Принять
        </button>
      </div>
    </div>`
  );

  document.getElementById('cookieConsentAccept')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    document.getElementById('cookieConsent')?.remove();
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
  document.getElementById('needsDelivery')?.addEventListener('change', toggleDeliveryFields);
  toggleDeliveryFields();
  updateCartUI();

  document.addEventListener('keydown', (event) => {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar?.classList.contains('cart-sidebar--open')) return;

    if (event.key === 'Escape') {
      closeCart();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = getCartFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function toggleDeliveryFields() {
  const needsDelivery = document.getElementById('needsDelivery');
  const deliveryFields = document.getElementById('deliveryFields');
  if (!needsDelivery || !deliveryFields) return;
  deliveryFields.hidden = !needsDelivery.checked;
}

function injectCartUI() {
  if (document.getElementById('cartSidebar')) return;

  const html = `
    <div class="cart-overlay" id="cartOverlay"></div>
    <aside class="cart-sidebar" id="cartSidebar" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">
      <div class="cart-sidebar__header">
        <div>
          <p class="cart-sidebar__kicker">Заказ</p>
          <h2 class="cart-sidebar__title" id="cartTitle">Корзина</h2>
        </div>
        <button class="cart-sidebar__close" id="cartClose" type="button" aria-label="Закрыть корзину">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="cart-sidebar__items cart-items-view" id="cartItems"></div>
      <form class="checkout-form" id="checkoutForm">
        <button type="button" class="form-back" id="backToCart">← Назад к корзине</button>
        <p class="checkout-form__lead">Оставим контакты — заказ уйдёт в Telegram.</p>
        <div class="form-group">
          <label for="customerName">Имя *</label>
          <input type="text" id="customerName" name="name" required autocomplete="name" placeholder="Как к вам обращаться">
        </div>
        <div class="form-group">
          <label for="customerPhone">Телефон *</label>
          <input type="tel" id="customerPhone" name="phone" required autocomplete="tel" placeholder="+7 (___) ___-__-__">
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" id="needsDelivery" name="needsDelivery">
            <span>Нужна доставка</span>
          </label>
          <p class="form-hint">Если не отмечено — самовывоз в Санкт-Петербурге</p>
        </div>
        <div class="checkout-form__delivery" id="deliveryFields" hidden>
          <div class="form-group">
            <label for="deliveryMethod">Способ доставки</label>
            <select id="deliveryMethod" name="delivery">
              <option value="">Выберите способ</option>
              <option value="СДЭК">СДЭК</option>
              <option value="Почта России">Почта России</option>
              <option value="Boxberry">Boxberry</option>
            </select>
          </div>
          <div class="form-group">
            <label for="customerAddress">Адрес доставки</label>
            <textarea id="customerAddress" name="address" placeholder="Адрес сейчас или уточните менеджеру в Telegram"></textarea>
          </div>
        </div>
        <div class="form-message" id="formMessage"></div>
        <button type="submit" class="btn btn--accent btn--full" id="submitOrder">Отправить в Telegram</button>
      </form>
      <div class="cart-sidebar__footer" id="cartFooter">
        <div class="cart-sidebar__total">
          <span class="cart-sidebar__total-label">Итого</span>
          <span class="cart-sidebar__total-value" id="cartTotal">${PRICE_LABEL}</span>
        </div>
        <p class="cart-sidebar__price-hint" id="cartPriceHint">${PRICE_HINT}</p>
        <button class="btn btn--accent btn--full" id="checkoutBtn" type="button">Оформить заказ</button>
      </div>
    </aside>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function getCartFocusable() {
  const sidebar = document.getElementById('cartSidebar');
  if (!sidebar) return [];
  return [...sidebar.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

function openCart() {
  updateCartUI();
  const sidebar = document.getElementById('cartSidebar');
  document.getElementById('cartOverlay')?.classList.add('cart-overlay--open');
  sidebar?.classList.add('cart-sidebar--open');
  sidebar?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
  document.body.style.overflow = 'hidden';
  hideCheckout();
  window.requestAnimationFrame(() => {
    document.getElementById('cartClose')?.focus();
  });
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  document.getElementById('cartOverlay')?.classList.remove('cart-overlay--open');
  sidebar?.classList.remove('cart-sidebar--open');
  sidebar?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
  document.body.style.overflow = '';
  document.getElementById('cartBtn')?.focus();
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
  const needsDelivery = document.getElementById('needsDelivery');
  const deliveryFields = document.getElementById('deliveryFields');
  if (needsDelivery) needsDelivery.checked = false;
  if (deliveryFields) deliveryFields.hidden = true;
  const msg = document.getElementById('formMessage');
  if (msg) {
    msg.className = 'form-message';
    msg.textContent = '';
  }
}

function updateCartUI() {
  const cart = getCart();
  const count = getCartCount();

  const countEl = document.querySelector('.cart-btn__count');
  if (countEl) {
    countEl.textContent = `(${count})`;
    countEl.dataset.count = count;
  }

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.setAttribute('aria-label', `Корзина, товаров: ${count}`);
  }

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = formatCartTotal(cart);

  const hintEl = document.getElementById('cartPriceHint');
  if (hintEl) {
    const { hasPriced, hasUnpriced } = getCartPricing(cart);
    if (hasPriced && !hasUnpriced) {
      hintEl.textContent = '';
      hintEl.hidden = true;
    } else if (hasPriced && hasUnpriced) {
      hintEl.hidden = false;
      hintEl.textContent = 'Позиции без цены в каталоге — уточним в Telegram';
    } else {
      hintEl.hidden = false;
      hintEl.textContent = PRICE_HINT;
    }
  }

  updateProductCardButtons();

  const itemsEl = document.getElementById('cartItems');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty__title">Пока пусто</p>
        <p class="cart-empty__text">Добавьте линейки из каталога — оформим заказ в Telegram.</p>
        <a href="/catalog.html" class="btn btn--primary btn--sm cart-empty__cta">Смотреть каталог</a>
      </div>
    `;
    return;
  }

  itemsEl.innerHTML = cart
    .map((item, i) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item__media">
            <span class="cart-item__blush" aria-hidden="true"></span>
            <div class="cart-item__image">
              <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
            </div>
          </div>
          <div class="cart-item__info">
            <div class="cart-item__top">
              <span class="cart-item__index">${padSlideIndex(i + 1)}</span>
              <button class="cart-item__remove" data-action="remove" data-id="${item.id}" type="button">Удалить</button>
            </div>
            <div class="cart-item__name">${product.name}</div>
            <div class="cart-item__price">${formatPrice(product)}${item.qty > 1 ? ` × ${item.qty}` : ''}</div>
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-action="decrease" data-id="${item.id}" type="button" aria-label="Уменьшить">−</button>
              <span class="cart-item__qty-value">${item.qty}</span>
              <button class="cart-item__qty-btn" data-action="increase" data-id="${item.id}" type="button" aria-label="Увеличить">+</button>
            </div>
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
    const pricePart =
      product?.price != null
        ? ` — ${formatRubles(product.price * item.qty)}`
        : ' — цена по запросу';
    return `• ${product.name} × ${item.qty}${pricePart}`;
  });

  const { total, hasPriced, hasUnpriced } = getCartPricing(cart);
  let costLine = 'Стоимость: цена по запросу — прайс в Telegram';
  if (hasPriced) {
    costLine = hasUnpriced
      ? `Итого по позициям с ценой: ${formatRubles(total)} (остальное — уточним в Telegram)`
      : `Итого: ${formatRubles(total)}`;
  }

  return [
    'Новый заказ FILO Professional',
    '',
    'Товары:',
    ...lines,
    '',
    costLine,
    '',
    'Клиент:',
    `Имя: ${formData.name}`,
    `Телефон: ${formData.phone}`,
    '',
    'Доставка:',
    formData.needsDelivery
      ? [
          formData.delivery ? `Способ: ${formData.delivery}` : 'Способ: уточнить в Telegram',
          formData.address ? `Адрес: ${formData.address}` : 'Адрес: уточнить в Telegram',
        ].join('\n')
      : 'Самовывоз (СПб)',
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
    needsDelivery: form.needsDelivery.checked,
    delivery: form.delivery.value,
    address: form.address.value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  messageEl.className = 'form-message';
  messageEl.textContent = '';

  const orderMessage = buildOrderMessage(formData);

  if (TELEGRAM_USERNAME) {
    const url = `${getTelegramUrl()}?text=${encodeURIComponent(orderMessage)}`;
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
    messageEl.textContent = 'Telegram не настроен. Напишите нам вручную.';
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

function renderAddControl(productId, qty) {
  if (qty === 0) {
    return `
      <button class="product-card__add add-to-cart" data-id="${productId}" type="button">
        <span>В корзину</span>
        <span class="product-card__add-arrow">→</span>
      </button>`;
  }

  return `
    <div class="product-card__add product-card__add--in-cart" data-id="${productId}">
      <button type="button" class="product-card__add-step" data-action="decrease" aria-label="Уменьшить количество">−</button>
      <span class="product-card__add-count" aria-live="polite">${qty}</span>
      <button type="button" class="product-card__add-step" data-action="increase" aria-label="Увеличить количество">+</button>
    </div>`;
}

function updateProductCardButtons() {
  document.querySelectorAll('.product-card[data-id]').forEach((card) => {
    const productId = card.dataset.id;
    const qty = getItemQty(productId);
    const control = card.querySelector('.add-to-cart, .product-card__add--in-cart');
    if (!control) return;

    const inCart = control.classList.contains('product-card__add--in-cart');

    if (qty > 0 && inCart) {
      const countEl = control.querySelector('.product-card__add-count');
      if (countEl) countEl.textContent = qty;
      return;
    }

    if (qty === 0 && !inCart) return;

    control.outerHTML = renderAddControl(productId, qty);
  });
}

export function renderProductCard(product, { compact = false, editorial = false, index = null } = {}) {
  const qty = getItemQty(product.id);
  const classes = [
    'product-card',
    compact ? 'product-card--compact' : '',
    !compact ? 'product-card--expandable' : '',
    editorial ? 'product-card--editorial' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const indexHtml =
    editorial && index != null
      ? `<span class="product-card__index">${padSlideIndex(index)}</span>`
      : '';

  return `
    <article class="${classes}" data-category="${product.category}" data-id="${product.id}">
      <div class="product-card__media">
        ${editorial ? '<span class="product-card__blush" aria-hidden="true"></span>' : ''}
        <div class="product-card__image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
          <span class="product-card__category">${product.categoryLabel}</span>
          ${indexHtml}
        </div>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${product.name}</h3>
        ${
          compact
            ? `<p class="product-card__tagline">${product.tagline}</p>`
            : `<p class="product-card__desc">${product.description}</p><span class="product-card__expand-hint">Подробнее</span>`
        }
        <div class="product-card__meta">
          <div class="product-card__pricing">
            <span class="product-card__price">${formatPrice(product)}</span>
            ${product.price == null ? `<span class="product-card__price-hint">${PRICE_HINT}</span>` : ''}
          </div>
          <span class="product-card__volume">${product.volume}</span>
        </div>
      </div>
      ${renderAddControl(product.id, qty)}
    </article>
  `;
}

function bindAddToCart(container) {
  if (container.dataset.cartBound) return;
  container.dataset.cartBound = '1';

  container.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      e.stopPropagation();
      addToCart(addBtn.dataset.id);
      updateCartUI();
      return;
    }

    const stepBtn = e.target.closest('.product-card__add-step');
    if (!stepBtn) return;

    e.stopPropagation();
    const control = stepBtn.closest('.product-card__add--in-cart');
    const productId = control?.dataset.id;
    if (!productId) return;

    const qty = getItemQty(productId);
    if (stepBtn.dataset.action === 'increase') {
      updateQty(productId, qty + 1);
    } else {
      updateQty(productId, qty - 1);
    }
    updateCartUI();
  });
}

function bindProductCardExpand(container) {
  container.querySelectorAll('.product-card--expandable').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');

    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart, .product-card__add--in-cart')) return;

      const grid = card.closest('.products-grid');
      const isExpanded = card.classList.contains('product-card--expanded');

      grid?.querySelectorAll('.product-card--expanded').forEach((expandedCard) => {
        expandedCard.classList.remove('product-card--expanded');
        expandedCard.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        card.classList.add('product-card--expanded');
        card.setAttribute('aria-expanded', 'true');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target.closest('.add-to-cart, .product-card__add--in-cart')) return;
      e.preventDefault();
      card.click();
    });
  });
}

function padSlideIndex(n) {
  return String(n).padStart(2, '0');
}

function initHeroSlider() {
  const root = document.getElementById('heroSlider');
  const track = document.getElementById('heroSliderTrack');
  const currentEl = document.getElementById('heroSliderCurrent');
  const totalEl = document.getElementById('heroSliderTotal');
  const captionEl = document.getElementById('heroSliderCaption');
  if (!track) return;

  const slides = products.slice(0, 4);
  if (!slides.length) return;

  if (totalEl) totalEl.textContent = padSlideIndex(slides.length);
  if (captionEl) captionEl.setAttribute('aria-live', 'polite');
  if (root) {
    root.setAttribute('tabindex', '0');
    root.setAttribute('aria-roledescription', 'carousel');
  }

  track.innerHTML = slides
    .map(
      (p, i) => `
    <div class="hero-slider__slide ${i === 0 ? 'hero-slider__slide--active' : ''}" data-index="${i}" ${i === 0 ? '' : 'aria-hidden="true"'}>
      <div class="hero-slider__frame">
        <img src="${p.image}" alt="${p.name}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"${i === 0 ? ' fetchpriority="high"' : ''}>
      </div>
    </div>`
    )
    .join('');

  let current = 0;
  let timer;
  let paused = false;

  function goTo(index) {
    current = index;
    track.querySelectorAll('.hero-slider__slide').forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('hero-slider__slide--active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (currentEl) currentEl.textContent = padSlideIndex(current + 1);
    if (captionEl) captionEl.textContent = slides[current].name;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function resetTimer() {
    clearInterval(timer);
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(next, 4800);
  }

  function pause() {
    paused = true;
    clearInterval(timer);
  }

  function resume() {
    paused = false;
    resetTimer();
  }

  track.addEventListener('click', () => {
    next();
    resetTimer();
  });

  if (root) {
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        resetTimer();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        resetTimer();
      }
    });
    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    root.addEventListener('focusin', pause);
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) resume();
    });
  }

  goTo(0);
  resetTimer();
}

function initCarousel() {
  const track = document.getElementById('featuredProducts');
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  if (!track) return;

  track.innerHTML = products.map((p) => renderProductCard(p, { compact: true })).join('');
  bindAddToCart(track);

  const scroll = (dir) => {
    const amount = track.querySelector('.product-card')?.offsetWidth || 300;
    track.parentElement.scrollBy({ left: dir * (amount + 24), behavior: 'smooth' });
  };

  prev?.addEventListener('click', () => scroll(-1));
  next?.addEventListener('click', () => scroll(1));
}

function initHome() {
  const trustBar = document.getElementById('trustBar');
  if (trustBar) {
    trustBar.innerHTML = trustItems
      .map(
        (item) => `
      <div class="trust-bar__item">
        <span class="trust-bar__icon">${item.icon}</span>
        <div>
          <div class="trust-bar__title">${item.title}</div>
          <div class="trust-bar__text">${item.text}</div>
        </div>
      </div>`
      )
      .join('');
  }

  const b2bEl = document.getElementById('b2bBenefits');
  if (b2bEl) {
    b2bEl.innerHTML = b2bBenefits
      .map(
        (item) => `
      <article class="benefit-row">
        <span class="benefit-row__index" aria-hidden="true">${item.icon}</span>
        <div class="benefit-row__body">
          <h3 class="benefit-row__title">${item.title}</h3>
          <p class="benefit-row__text">${item.text}</p>
        </div>
      </article>`
      )
      .join('');
  }

  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    categoryGrid.innerHTML = productLines
      .map(
        (line, i) => `
      <a href="${line.href}" class="category-tile">
        <div class="category-tile__media">
          <span class="category-tile__blush" aria-hidden="true"></span>
          <div class="category-tile__frame">
            <img src="${line.image}" alt="${line.title}" loading="lazy" decoding="async">
          </div>
          <span class="category-tile__index">${padSlideIndex(i + 1)}</span>
        </div>
        <div class="category-tile__body">
          <h3 class="category-tile__title">${line.title}</h3>
          ${line.subtitle ? `<p class="category-tile__subtitle">${line.subtitle}</p>` : ''}
          <span class="category-tile__link">Смотреть</span>
        </div>
      </a>`
      )
      .join('');
  }

  initHeroSlider();
  initCarousel();
}

function renderCatalogFilters(activeCat) {
  const tabs = document.getElementById('filterTabs');
  if (!tabs) return;

  tabs.innerHTML = categories
    .map((cat, i) => {
      const index = cat.id === 'all' ? '' : `<span class="filter-tab__index">${padSlideIndex(i)}</span>`;
      return `
        <button
          type="button"
          class="filter-tab ${cat.id === activeCat ? 'filter-tab--active' : ''}"
          data-cat="${cat.id}"
          role="tab"
          aria-selected="${cat.id === activeCat ? 'true' : 'false'}"
        >
          ${index}
          <span class="filter-tab__label">${cat.label}</span>
        </button>`;
    })
    .join('');
}

function updateCatalogRhythm(grid) {
  if (!grid) return;

  const visible = [...grid.querySelectorAll('.product-card')].filter(
    (card) => card.style.display !== 'none'
  );

  visible.forEach((card, i) => {
    card.classList.toggle('product-card--offset', i % 2 === 1);
    card.classList.toggle('product-card--chapter', (i + 1) % 5 === 0);
    const indexEl = card.querySelector('.product-card__index');
    if (indexEl) indexEl.textContent = padSlideIndex(i + 1);
  });
}

function initCatalog() {
  const grid = document.getElementById('catalogProducts');
  const tabs = document.getElementById('filterTabs');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get('cat') || 'all';

  renderCatalogFilters(initialCat);

  grid.innerHTML = products
    .map((p, i) => renderProductCard(p, { editorial: true, index: i + 1 }))
    .join('');
  bindAddToCart(grid);
  bindProductCardExpand(grid);
  filterProducts(initialCat);

  if (tabs) {
    const syncTablist = (activeBtn) => {
      tabs.querySelectorAll('.filter-tab').forEach((t) => {
        const active = t === activeBtn;
        t.classList.toggle('filter-tab--active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.tabIndex = active ? 0 : -1;
      });
    };

    tabs.querySelectorAll('.filter-tab').forEach((t) => {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
    });

    tabs.addEventListener('click', (event) => {
      const tab = event.target.closest('.filter-tab');
      if (!tab) return;

      const cat = tab.dataset.cat;
      syncTablist(tab);
      filterProducts(cat);

      const url = new URL(window.location.href);
      if (cat === 'all') url.searchParams.delete('cat');
      else url.searchParams.set('cat', cat);
      window.history.replaceState({}, '', url);
    });

    tabs.addEventListener('keydown', (event) => {
      const list = [...tabs.querySelectorAll('.filter-tab')];
      const i = list.indexOf(document.activeElement);
      if (i < 0) return;

      let next = -1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % list.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i - 1 + list.length) % list.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = list.length - 1;
      else return;

      event.preventDefault();
      list[next].focus();
      list[next].click();
    });
  }
}

function filterProducts(category) {
  const grid = document.getElementById('catalogProducts');
  let visible = 0;

  document.querySelectorAll('#catalogProducts .product-card').forEach((card) => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
    if (show) visible += 1;
  });

  updateCatalogRhythm(grid);

  const countEl = document.getElementById('catalogCount');
  if (countEl) {
    countEl.textContent = `${visible} ${pluralProducts(visible)}`;
  }
}

function pluralProducts(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return 'товаров';
  if (mod10 === 1) return 'товар';
  if (mod10 >= 2 && mod10 <= 4) return 'товара';
  return 'товаров';
}
