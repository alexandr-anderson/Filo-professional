import {
  products,
  productLines,
  categories,
  formatPrice,
  formatRubles,
  formatCartTotal,
  getCartPricing,
  PRICE_HINT,
} from '../data/products.js';
import {
  TELEGRAM_USERNAME,
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  OPERATOR_NAME,
  OPERATOR_INN,
  OPERATOR_OGRNIP,
  getTelegramUrl,
  getTelegramPriceUrl,
} from '../data/config.js';
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

const STATEMENTS = [
  {
    title: 'Наличие и сроки',
    text: 'А также скидки и особые условия для салонов и мастеров — уточняйте в Telegram',
    tone: 'celadon',
  },
  {
    title: 'Минимальный заказ',
    text: 'Один флакон — достаточно для первой поставки и теста линейки.',
    tone: 'cobalt',
  },
  {
    title: 'Отгрузка из СПб',
    text: 'СДЭК, Почта России, Boxberry — по всей России.',
    tone: 'celadon',
  },
];

export function initApp() {
  renderSiteBar();
  renderFooter();
  wireTelegramLinks();
  initSiteBarScroll();
  initMobileMenu();
  initCookieConsent();
  injectToast();

  if (currentPage === 'home') initHome();
  if (currentPage === 'catalog') initCatalog();
  if (currentPage === 'order') initOrder();
}

function renderSiteBar() {
  const bar = document.getElementById('siteBar');
  if (!bar) return;

  const count = getCartCount();
  const navLinks = [
    { href: '/about.html', label: 'О бренде', page: 'about' },
    { href: '/delivery.html', label: 'Доставка', page: 'delivery' },
    { href: '/catalog.html', label: 'Каталог', page: 'catalog' },
    { href: '/order.html', label: `Заказ (${count})`, page: 'order' },
  ];

  bar.innerHTML = `
    <div class="site-bar__inner">
      <a href="/" class="site-bar__brand">FILO Professional</a>
      <p class="site-bar__claim">Дистрибьютор профессионального ухода для волос из Бразилии</p>
      <nav class="site-bar__nav" id="siteNav" aria-label="Основная навигация">
        ${navLinks
          .map(
            (l) =>
              `<a href="${l.href}" class="site-bar__link ${currentPage === l.page ? 'site-bar__link--active' : ''}">${l.label}</a>`
          )
          .join('')}
        <a href="${getTelegramUrl()}" class="site-bar__link site-bar__link--tg" target="_blank" rel="noopener">Telegram</a>
      </nav>
      <button class="menu-toggle" id="menuToggle" type="button" aria-label="Меню" aria-expanded="false" aria-controls="siteNav">
        <span></span><span></span>
      </button>
    </div>
  `;
}

function updateOrderLink() {
  const count = getCartCount();
  const link = document.querySelector('.site-bar__link[href="/order.html"]');
  if (link) link.textContent = `Заказ (${count})`;
  
  const topCartBadge = document.getElementById('cartCountBadge');
  if (topCartBadge) topCartBadge.textContent = String(count);
}

function initSiteBarScroll() {
  const bar = document.getElementById('siteBar');
  if (!bar) return;

  const onScroll = () => {
    bar.classList.toggle('site-bar--oxide', window.scrollY > 48);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('site-bar__nav--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('site-bar__nav--open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function renderFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__grid">
      <div class="footer__cell">
        <a href="/" class="footer__brand">FILO Professional</a>
        <p class="footer__desc">Официальный дистрибьютор ${BRAND_NAME} в России. Санкт-Петербург · поставки по всей стране.</p>
        <a href="#" data-telegram="price" class="btn btn--on-dark btn--sm">Прайс в Telegram</a>
      </div>
      <div class="footer__cell">
        <p class="footer__title">Навигация</p>
        <ul class="footer__links">
          <li><a href="/">Главная</a></li>
          <li><a href="/catalog.html">Каталог</a></li>
          <li><a href="/order.html">Заказ</a></li>
          <li><a href="/delivery.html">Доставка</a></li>
          <li><a href="/about.html">О нас</a></li>
        </ul>
      </div>
      <div class="footer__cell">
        <p class="footer__title">Контакты</p>
        <ul class="footer__links">
          <li><a href="${getTelegramUrl()}" target="_blank" rel="noopener">Telegram</a></li>
          <li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
          <li><a href="tel:${CONTACT_PHONE}">${CONTACT_PHONE_DISPLAY}</a></li>
          <li>Пн–Пт 10:00–19:00</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom container">
      <span>© ${new Date().getFullYear()} ${BRAND_NAME} · ${OPERATOR_NAME} · ИНН ${OPERATOR_INN} · ОГРНИП ${OPERATOR_OGRNIP}</span>
      <a href="/privacy.html">Политика конфиденциальности</a>
    </div>
  `;
}

function wireTelegramLinks() {
  document.querySelectorAll('[data-telegram="price"]').forEach((el) => {
    el.href = getTelegramPriceUrl();
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function injectToast() {
  if (document.getElementById('toast')) return;
  document.body.insertAdjacentHTML('beforeend', '<div class="toast" id="toast" role="status" aria-live="polite"></div>');
}

export function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('toast--show');
  window.setTimeout(() => toast.classList.remove('toast--show'), 2800);
}

function initCookieConsent() {
  if (localStorage.getItem(COOKIE_CONSENT_KEY) || document.getElementById('cookieConsent')) return;

  const show = () => {
    if (document.getElementById('cookieConsent')) return;
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="cookie-consent" id="cookieConsent" role="dialog" aria-label="Cookie">
        <div class="container cookie-consent__inner">
          <p class="cookie-consent__text">Cookie для корзины и работы сайта. <a href="/privacy.html">Политика</a></p>
          <button type="button" class="btn btn--oxide btn--sm" id="cookieAccept">Принять</button>
        </div>
      </div>`
    );
    document.body.classList.add('cookie-visible');
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, '1');
      document.getElementById('cookieConsent')?.remove();
      document.body.classList.remove('cookie-visible');
    });
  };

  window.setTimeout(show, 2400);
}

function initHome() {
  const grid = document.getElementById('lineGrid');
  if (grid) {
    grid.innerHTML = productLines
      .map(
        (line, idx) => `
      <a href="${line.href}" class="mullion-pane mullion-pane--${line.id}">
        <div class="mullion-pane__glow" aria-hidden="true"></div>
        <div class="mullion-pane__media">
          <img src="${line.image}" alt="Линейка FILO Professional — ${line.title}" loading="lazy" decoding="async">
        </div>
        <div class="mullion-pane__body">
          <span class="mullion-pane__index">0${idx + 1}</span>
          <h3 class="mullion-pane__title">${line.title}</h3>
          <p class="mullion-pane__sub">${line.subtitle}</p>
          <span class="mullion-pane__link">Смотреть в каталоге →</span>
        </div>
      </a>`
      )
      .join('');
  }

  updateOrderLink();
}

function renderShelfCell(product) {
  const qty = getItemQty(product.id);
  const inCart = qty > 0;
  const actions = inCart
    ? `<div class="shelf-qty" data-id="${product.id}">
        <button type="button" class="shelf-qty__btn" data-action="decrease" aria-label="Меньше">−</button>
        <span class="shelf-qty__val">${qty}</span>
        <button type="button" class="shelf-qty__btn" data-action="increase" aria-label="Больше">+</button>
      </div>`
    : `<button type="button" class="shelf-add add-to-cart" data-id="${product.id}">В заказ</button>`;

  return `
    <article class="shelf-cell ${inCart ? 'shelf-cell--in-cart' : ''}" data-category="${product.category}" data-id="${product.id}" data-name="${product.name.toLowerCase()}">
      <span class="shelf-cell__cat">${product.categoryLabel}</span>
      <div class="shelf-cell__media">
        <img src="${product.image}" alt="FILO Professional — ${product.name} (${product.categoryLabel})" loading="lazy" decoding="async">
      </div>
      <div class="shelf-cell__foot">
        <h3 class="shelf-cell__name">${product.name}</h3>
        <p class="shelf-cell__meta">${product.volume} · ${product.line}</p>
        <p class="shelf-cell__price">${formatPrice(product)}</p>
        <div class="shelf-cell__actions">${actions}</div>
      </div>
    </article>`;
}

function renderStatementCell(statement) {
  const cls = statement.tone === 'cobalt' ? ' shelf-cell--statement-cobalt' : '';
  return `
    <div class="shelf-cell shelf-cell--statement${cls}" aria-hidden="false">
      <h3 class="shelf-cell__statement-title">${statement.title}</h3>
      <p class="shelf-cell__statement-text">${statement.text}</p>
    </div>`;
}

function bindShelfCart(container) {
  if (container.dataset.bound) return;
  container.dataset.bound = '1';

  container.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      addToCart(addBtn.dataset.id);
      refreshShelfCells(container);
      updateOrderLink();
      return;
    }

    const step = e.target.closest('[data-action]');
    if (!step) return;
    const wrap = step.closest('.shelf-qty');
    if (!wrap) return;
    const id = wrap.dataset.id;
    const qty = getItemQty(id);
    if (step.dataset.action === 'increase') updateQty(id, qty + 1);
    if (step.dataset.action === 'decrease') updateQty(id, qty - 1);
    refreshShelfCells(container);
    updateOrderLink();
  });
}

function refreshShelfCells(container) {
  container.querySelectorAll('.shelf-cell[data-id]').forEach((cell) => {
    const id = cell.dataset.id;
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const next = document.createElement('div');
    next.innerHTML = renderShelfCell(product);
    cell.replaceWith(next.firstElementChild);
  });
}

function buildCatalogGrid(activeCat, searchQuery = '') {
  const q = searchQuery.trim().toLowerCase();
  let filtered = products.filter((p) => {
    const catOk = activeCat === 'all' || p.category === activeCat;
    const searchOk =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.line && p.line.toLowerCase().includes(q));
    return catOk && searchOk;
  });

  const parts = [];
  let stmtIndex = 0;
  filtered.forEach((p, i) => {
    if (i > 0 && i % 6 === 0) {
      parts.push(renderStatementCell(STATEMENTS[stmtIndex % STATEMENTS.length]));
      stmtIndex += 1;
    }
    parts.push(renderShelfCell(p));
  });

  return { html: parts.join(''), count: filtered.length };
}

function initCatalog() {
  const grid = document.getElementById('shelfGrid');
  const registry = document.getElementById('registryList');
  const mobile = document.getElementById('mobileFilter');
  const search = document.getElementById('catalogSearch');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get('cat') || 'all';

  const renderFilters = () => {
    const mkBtn = (cat, mobileMode = false) => {
      const active = cat.id === activeCat;
      if (mobileMode) {
        return `<button type="button" class="${active ? 'active' : ''}" data-cat="${cat.id}" role="tab" aria-selected="${active}">${cat.label}</button>`;
      }
      return `<li class="registry-list__item" role="presentation">
        <button type="button" class="registry-list__btn ${active ? 'registry-list__btn--active' : ''}" data-cat="${cat.id}" role="tab" aria-selected="${active}">${cat.label}</button>
      </li>`;
    };

    if (registry) {
      registry.innerHTML = categories.map((c) => mkBtn(c)).join('');
    }
    if (mobile) {
      mobile.innerHTML = categories.map((c) => mkBtn(c, true)).join('');
    }
  };

  const applyFilter = (cat) => {
    activeCat = cat;
    renderFilters();
    const { html, count } = buildCatalogGrid(activeCat, search?.value || '');
    grid.innerHTML = html;
    bindShelfCart(grid);
    const countEl = document.getElementById('catalogCount');
    if (countEl) countEl.textContent = `показано ${count} из ${products.length}`;

    const url = new URL(window.location.href);
    if (cat === 'all') url.searchParams.delete('cat');
    else url.searchParams.set('cat', cat);
    window.history.replaceState({}, '', url);
  };

  renderFilters();
  applyFilter(activeCat);

  const onFilterClick = (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    applyFilter(btn.dataset.cat);
  };

  registry?.addEventListener('click', onFilterClick);
  mobile?.addEventListener('click', onFilterClick);
  search?.addEventListener('input', () => applyFilter(activeCat));
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
      ? `Итого по позициям с ценой: ${formatRubles(total)} (остальное — уточним)`
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
          formData.delivery ? `Способ: ${formData.delivery}` : 'Способ: уточнить',
          formData.address ? `Адрес: ${formData.address}` : 'Адрес: уточнить',
        ].join('\n')
      : 'Самовывоз (СПб)',
  ].join('\n');
}

function initOrder() {
  renderOrderBody();
  renderOrderForm();
}

function renderOrderTotal(cart) {
  const { hasPriced, hasUnpriced } = getCartPricing(cart);
  const hint = !hasPriced
    ? PRICE_HINT
    : hasUnpriced
      ? 'Позиции без цены в каталоге уточним в Telegram'
      : '';

  return `
    <div class="order-total">
      <div>
        <p class="order-total__label">Итого</p>
        ${hint ? `<p class="order-total__hint">${hint}</p>` : ''}
      </div>
      <p class="order-total__value">${formatCartTotal(cart)}</p>
    </div>`;
}

function renderOrderBody() {
  const body = document.getElementById('orderBody');
  const header = document.getElementById('orderHeader');
  const aside = document.getElementById('orderAside');
  const cart = getCart();

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="order-empty">
        <p class="order-empty__title">В заказе пусто</p>
        <p>Добавьте линейки из каталога — оформим наряд-заказ.</p>
        <p style="margin-top:24px"><a href="/catalog.html" class="btn btn--on-dark">Открыть каталог</a></p>
      </div>`;
    if (aside) aside.hidden = true;
    return;
  }

  if (aside) aside.hidden = false;

  const now = new Date();
  const dateStr = now.toLocaleDateString('ru-RU');
  if (header) {
    header.textContent = `FILO Professional · заказ · ${dateStr}`;
  }

  body.innerHTML = `
    <table class="order-table">
      <thead>
        <tr>
          <th>Позиция</th>
          <th>Линейка</th>
          <th>Объём</th>
          <th>Кол-во</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cart
          .map((item, i) => {
            const p = products.find((x) => x.id === item.id);
            if (!p) return '';
            return `<tr data-id="${item.id}">
              <td class="mono">${String(i + 1).padStart(2, '0')} · ${p.name}</td>
              <td>${p.categoryLabel}</td>
              <td class="mono">${p.volume}</td>
              <td>
                <div class="order-qty">
                  <button type="button" data-action="decrease" aria-label="Меньше">−</button>
                  <span class="mono">${item.qty}</span>
                  <button type="button" data-action="increase" aria-label="Больше">+</button>
                </div>
              </td>
              <td><button type="button" class="order-remove" data-action="remove" aria-label="Удалить">×</button></td>
            </tr>`;
          })
          .join('')}
      </tbody>
    </table>
    ${renderOrderTotal(cart)}`;

  body.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('[data-id]');
      const id = row?.dataset.id;
      if (!id) return;
      const item = cart.find((c) => c.id === id);
      const action = btn.dataset.action;
      if (action === 'increase') updateQty(id, (item?.qty || 0) + 1);
      if (action === 'decrease') updateQty(id, (item?.qty || 0) - 1);
      if (action === 'remove') removeFromCart(id);
      updateOrderLink();
      renderOrderBody();
      updateOrderPreview();
    });
  });

  updateOrderPreview();
}

function renderOrderForm() {
  const wrap = document.getElementById('orderFormWrap');
  if (!wrap || wrap.dataset.bound) return;
  wrap.dataset.bound = '1';

  wrap.innerHTML = `
    <form class="order-form" id="orderForm" novalidate>
      <p class="order-preview-label">Что уйдёт оператору</p>
      <pre class="order-preview" id="orderPreview"></pre>
      <div class="form-group">
        <label for="customerName">Имя</label>
        <input type="text" id="customerName" name="name" required autocomplete="name">
      </div>
      <div class="form-group">
        <label for="customerPhone">Телефон</label>
        <input type="tel" id="customerPhone" name="phone" required autocomplete="tel">
      </div>
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox" id="needsDelivery" name="needsDelivery">
          <span>Нужна доставка</span>
        </label>
        <p class="form-hint">Вы можете указать адрес доставки сразу или после беседы с менеджером</p>
      </div>
      <div id="deliveryFields" hidden>
        <div class="form-group">
          <label for="deliveryMethod">Способ</label>
          <select id="deliveryMethod" name="delivery">
            <option value="">Выберите</option>
            <option value="СДЭК">СДЭК</option>
            <option value="Почта России">Почта России</option>
            <option value="Boxberry">Boxberry</option>
          </select>
        </div>
        <div class="form-group">
          <label for="customerAddress">Адрес</label>
          <textarea id="customerAddress" name="address" rows="2"></textarea>
        </div>
      </div>
      <div class="form-message" id="formMessage"></div>
      <button type="submit" class="btn btn--oxide btn--full" id="submitOrder">Отправить в Telegram</button>
      <p class="form-hint" style="margin-top:12px">Откроется Telegram. Ничего не спишется.</p>
    </form>`;

  document.getElementById('needsDelivery')?.addEventListener('change', (e) => {
    const fields = document.getElementById('deliveryFields');
    if (fields) fields.hidden = !e.target.checked;
    updateOrderPreview();
  });

  ['customerName', 'customerPhone', 'deliveryMethod', 'customerAddress'].forEach(
    (id) => {
      document.getElementById(id)?.addEventListener('input', updateOrderPreview);
      document.getElementById(id)?.addEventListener('change', updateOrderPreview);
    }
  );

  document.getElementById('orderForm')?.addEventListener('submit', handleOrderSubmit);
  updateOrderPreview();
}

function getFormData() {
  const form = document.getElementById('orderForm');
  if (!form) return null;
  return {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    needsDelivery: form.needsDelivery.checked,
    delivery: form.delivery.value,
    address: form.address.value.trim(),
  };
}

function updateOrderPreview() {
  const preview = document.getElementById('orderPreview');
  const cart = getCart();
  if (!preview || cart.length === 0) return;

  const fd = getFormData();
  if (!fd || !fd.name) {
    preview.textContent = buildOrderMessage({
      name: '…',
      phone: '…',
      needsDelivery: fd?.needsDelivery || false,
      delivery: fd?.delivery || '',
      address: fd?.address || '',
    });
    return;
  }
  preview.textContent = buildOrderMessage(fd);
}

async function handleOrderSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('submitOrder');
  const messageEl = document.getElementById('formMessage');
  const cart = getCart();

  if (cart.length === 0) {
    showToast('Корзина пуста');
    return;
  }

  const formData = getFormData();
  const errors = [];
  if (!formData.name) errors.push('name');
  if (!formData.phone) errors.push('phone');

  if (errors.length) {
    messageEl.className = 'form-message';
    messageEl.textContent = 'Заполните обязательные поля';
    errors.forEach((f) => form.elements.namedItem(f)?.setAttribute('aria-invalid', 'true'));
    return;
  }

  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

  const orderMessage = buildOrderMessage(formData);
  submitBtn.disabled = true;

  if (TELEGRAM_USERNAME) {
    window.open(`${getTelegramUrl()}?text=${encodeURIComponent(orderMessage)}`, '_blank');
    try {
      await navigator.clipboard.writeText(orderMessage);
    } catch (_) {
      /* ignore */
    }

    const header = document.getElementById('orderHeader');
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    if (header) {
      header.classList.add('order-header--sent');
      header.textContent = `Отправлено в Telegram · ${time}`;
    }

    messageEl.className = 'form-message form-message--success';
    messageEl.replaceChildren();
    const lead = document.createElement('p');
    lead.textContent = 'Нажмите «Отправить» в Telegram. Если чат не открылся — скопируйте текст ниже.';
    const area = document.createElement('textarea');
    area.className = 'form-order-copy';
    area.readOnly = true;
    area.rows = 8;
    area.value = orderMessage;
    const actions = document.createElement('div');
    actions.className = 'form-order-actions';
    actions.innerHTML = `
      <button type="button" class="btn btn--ghost btn--on-dark btn--sm" id="copyOrder">Скопировать</button>
      <button type="button" class="btn btn--oxide btn--sm" id="confirmSent">Я отправил</button>`;
    messageEl.append(lead, area, actions);

    document.getElementById('copyOrder')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(orderMessage);
        showToast('Скопировано');
      } catch (_) {
        document.querySelector('.form-order-copy')?.select();
      }
    });

    document.getElementById('confirmSent')?.addEventListener('click', () => {
      clearCart();
      updateOrderLink();
      renderOrderBody();
      showToast('Спасибо!');
    });

    showToast('Переход в Telegram…');
  } else {
    messageEl.textContent = 'Telegram не настроен';
  }

  submitBtn.disabled = false;
}
