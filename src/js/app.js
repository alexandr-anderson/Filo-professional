import {
  products,
  features,
  productLines,
  trustItems,
  b2bBenefits,
  formatPrice,
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
  renderFooter();
  wireTelegramLinks();
  initCart();
  initMobileMenu();
  initCookieConsent();

  if (currentPage === 'home') initHome();
  if (currentPage === 'catalog') initCatalog();
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
        <button class="cart-btn" id="cartBtn" aria-label="Корзина">
          <svg class="cart-btn__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
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
          <div class="footer__brand">FILO <span>Professional</span></div>
          <p class="footer__desc">
            Официальный дистрибьютор профессиональной косметики ${BRAND_NAME} в России.
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
            <li><a href="/privacy.html">Политика конфиденциальности</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__title">Контакты</div>
          <ul class="footer__links">
            <li><a href="${getTelegramUrl()}" target="_blank" rel="noopener">Telegram</a></li>
            <li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
            <li>Санкт-Петербург</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${BRAND_NAME} Russia. Официальный дистрибьютор.</span>
        <a href="/privacy.html" class="footer__legal">Политика конфиденциальности</a>
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
            <textarea id="customerAddress" name="address" placeholder="Можете указать адрес сейчас или уточнить менеджеру в Telegram после консультации"></textarea>
          </div>
        </div>
        <div class="form-message" id="formMessage"></div>
        <button type="submit" class="btn btn--primary btn--full" id="submitOrder">Отправить заказ</button>
      </form>
      <div class="cart-sidebar__footer" id="cartFooter">
        <div class="cart-sidebar__total">
          <span>Итого:</span>
          <span class="cart-sidebar__total-value" id="cartTotal">${PRICE_LABEL}</span>
        </div>
        <p class="cart-sidebar__price-hint">${PRICE_HINT}</p>
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
    countEl.textContent = count || '';
    countEl.dataset.count = count;
  }

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = PRICE_LABEL;

  updateProductCardButtons();

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
          <div class="cart-item__image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="cart-item__info">
            <div class="cart-item__name">${product.name}</div>
            <div class="cart-item__price">${formatPrice()}</div>
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
    return `• ${product.name} × ${item.qty}`;
  });

  return [
    '🛍 Новый заказ FILO Professional',
    '',
    '📦 Товары:',
    ...lines,
    '',
    '💰 Стоимость: цена по запросу — прайс в Telegram',
    '',
    '👤 Клиент:',
    `Имя: ${formData.name}`,
    `Телефон: ${formData.phone}`,
    '',
    '🚚 Доставка:',
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

export function renderProductCard(product, { compact = false } = {}) {
  const qty = getItemQty(product.id);

  return `
    <article class="product-card ${compact ? 'product-card--compact' : 'product-card--expandable'}" data-category="${product.category}" data-id="${product.id}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-card__category">${product.categoryLabel}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${product.name}</h3>
        ${compact ? `<p class="product-card__tagline">${product.tagline}</p>` : `<p class="product-card__desc">${product.description}</p><span class="product-card__expand-hint">Нажмите, чтобы прочитать полностью</span>`}
        <div class="product-card__meta">
          <div class="product-card__pricing">
            <span class="product-card__price">${formatPrice()}</span>
            <span class="product-card__price-hint">${PRICE_HINT}</span>
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

function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const dots = document.getElementById('heroSliderDots');
  if (!track || !dots) return;

  track.innerHTML = products
    .map(
      (p, i) => `
    <div class="hero-slider__slide ${i === 0 ? 'hero-slider__slide--active' : ''}" data-index="${i}">
      <div class="hero-slider__frame">
        <img src="${p.image}" alt="${p.name}" loading="${i === 0 ? 'eager' : 'lazy'}">
      </div>
      <p class="hero-slider__caption">${p.name}</p>
    </div>`
    )
    .join('');

  dots.innerHTML = products
    .map(
      (_, i) =>
        `<button class="hero-slider__dot ${i === 0 ? 'hero-slider__dot--active' : ''}" data-index="${i}" aria-label="Слайд ${i + 1}"></button>`
    )
    .join('');

  let current = 0;
  let timer;

  function goTo(index) {
    current = index;
    track.querySelectorAll('.hero-slider__slide').forEach((slide, i) => {
      slide.classList.toggle('hero-slider__slide--active', i === current);
    });
    dots.querySelectorAll('.hero-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('hero-slider__dot--active', i === current);
    });
  }

  function next() {
    goTo((current + 1) % products.length);
  }

  dots.querySelectorAll('.hero-slider__dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      resetTimer();
    });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

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
  const heroFeatures = document.getElementById('heroFeatures');
  if (heroFeatures) {
    heroFeatures.innerHTML = features
      .slice(0, 4)
      .map(
        (f) => `
      <div class="hero__feature">
        <span class="hero__feature-icon">${f.icon}</span>
        <span>${f.title}</span>
      </div>`
      )
      .join('');
  }

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
      <div class="info-card">
        <div class="info-card__icon">${item.icon}</div>
        <h3 class="info-card__title">${item.title}</h3>
        <p class="info-card__text">${item.text}</p>
      </div>`
      )
      .join('');
  }

  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    categoryGrid.innerHTML = productLines
      .map(
        (line) => `
      <a href="${line.href}" class="category-card">
        <div class="category-card__image">
          <img src="${line.image}" alt="${line.title}" loading="lazy">
        </div>
        <div class="category-card__body">
          <h3 class="category-card__title">${line.title}</h3>
          ${line.subtitle ? `<p class="category-card__subtitle">${line.subtitle}</p>` : ''}
          <span class="category-card__link">Смотреть →</span>
        </div>
      </a>`
      )
      .join('');
  }

  initHeroSlider();
  initCarousel();
}

function initCatalog() {
  const grid = document.getElementById('catalogProducts');
  const tabs = document.getElementById('filterTabs');
  if (!grid) return;

  grid.innerHTML = products.map((p) => renderProductCard(p)).join('');
  bindAddToCart(grid);
  bindProductCardExpand(grid);

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
  let visible = 0;
  document.querySelectorAll('.product-card').forEach((card) => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
    if (show) visible += 1;
  });

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
