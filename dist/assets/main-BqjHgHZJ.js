(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const d=[{id:"cafe-brasil",name:"Café Brasil",category:"volume",categoryLabel:"Редуктор объёма",price:3200,volume:"500 мл",description:"Профессиональный редуктор объёма с экстрактом бразильского кофе. Разглаживает и укрощает непослушные волосы, сохраняя естественный объём.",line:"Redutor de Volume",image:"/images/products/cafe-brasil.png"},{id:"bio-btx-reducer",name:"Bio BTX Reducer",category:"volume",categoryLabel:"Редуктор объёма",price:3800,volume:"500 мл",description:"Биотехнологичный редуктор объёма с наночастицами. Глубокое восстановление структуры волоса с эффектом ботокса.",line:"Redutor de Volume",image:"/images/products/bio-btx-reducer.png"},{id:"nano-btx-platinum",name:"Nano BTX Platinum",category:"treatment",categoryLabel:"Лечение",price:4500,volume:"500 мл",description:"Премиальная нано-формула для интенсивного восстановления повреждённых волос. Платиновый комплекс для максимального блеска.",line:"Tratamento",image:"/images/products/nano-btx-platinum.jpg"},{id:"splendor-oil",name:"Splendor Oil",category:"finisher",categoryLabel:"Финиш",price:1800,volume:"60 мл",description:"Масло-финишер с натуральными маслами Амазонии. Придаёт блеск, защищает от УФ и термического воздействия.",line:"Finalizadores",image:"/images/products/splendor-oil.png"},{id:"kit-hydrat-therapy",name:"Kit Hydrat Therapy",category:"homecare",categoryLabel:"Home Care",price:5200,volume:"3 × 250 мл",description:"Домашний набор для глубокого увлажнения: шампунь, кондиционер и маска. Формула с экстрактами тропических растений.",line:"Home Care",image:"/images/products/kit-hydrat-therapy.png"}],E=[{icon:"🐰",title:"Cruelty-Free"},{icon:"🌿",title:"Органика"},{icon:"🇧🇷",title:"100% Бразилия"},{icon:"🔬",title:"Нанотехнологии"},{icon:"💇",title:"Консультации"}],k=[{id:"volume",title:"Редуктор объёма",href:"/catalog.html?cat=volume",image:"/images/categories/volume.png"},{id:"treatment",title:"Лечение",href:"/catalog.html?cat=treatment",image:"/images/categories/treatment.png"},{id:"homecare",title:"Home Care",href:"/catalog.html?cat=homecare",image:"/images/categories/homecare.png"},{id:"finisher",title:"Финиш",href:"/catalog.html?cat=finisher",image:"/images/categories/finisher.png"}],x=[{icon:"🚚",title:"Доставка по РФ",text:"СДЭК, Почта, Boxberry"},{icon:"↩️",title:"Консультация",text:"Поможем с подбором"},{icon:"🔒",title:"Безопасная оплата",text:"После подтверждения заказа"}];function u(e){return new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}).format(e)}const g="filo_cart";function m(){try{return JSON.parse(localStorage.getItem(g))||[]}catch{return[]}}function y(e){localStorage.setItem(g,JSON.stringify(e))}function L(){return m().reduce((e,t)=>e+t.qty,0)}function $(e){return m().reduce((r,a)=>{const o=e.find(n=>n.id===a.id);return r+(o?o.price*a.qty:0)},0)}function q(e){const t=m(),r=t.find(a=>a.id===e);return r?r.qty+=1:t.push({id:e,qty:1}),y(t),t}function S(e){const t=m().filter(r=>r.id!==e);return y(t),t}function _(e,t){let r=m();if(t<=0)r=r.filter(a=>a.id!==e);else{const a=r.find(o=>o.id===e);a&&(a.qty=t)}return y(r),r}function M(){localStorage.removeItem(g)}const f=document.body.dataset.page||"home";function O(){w(),F(),H(),A(),P(),f==="home"&&V(),f==="catalog"&&G()}function w(){const e=document.getElementById("topBar");e&&(e.innerHTML=`
    <div class="container top-bar__inner">
      ${E.map(t=>`
        <div class="top-bar__item">
          <span class="top-bar__icon">${t.icon}</span>
          <span>${t.title}</span>
        </div>`).join("")}
    </div>
  `)}function F(){const e=document.querySelector(".header");if(!e)return;const t=L(),r=[{href:"/",label:"Главная",page:"home"},{href:"/catalog.html",label:"Каталог",page:"catalog"},{href:"/delivery.html",label:"Доставка",page:"delivery"},{href:"/about.html",label:"О нас",page:"about"}];e.innerHTML=`
    <div class="container header__inner">
      <a href="/" class="logo">FIL<span>O</span></a>
      <nav class="nav" id="nav">
        ${r.map(a=>`<a href="${a.href}" class="nav__link ${f===a.page?"nav__link--active":""}">${a.label}</a>`).join("")}
      </nav>
      <div class="header__actions">
        <button class="cart-btn" id="cartBtn" aria-label="Корзина">
          <svg class="cart-btn__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span class="cart-btn__count" data-count="${t}">${t||""}</span>
        </button>
        <button class="menu-toggle" id="menuToggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `}function H(){const e=document.querySelector(".footer");e&&(e.innerHTML=`
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
  `)}function P(){const e=document.getElementById("menuToggle"),t=document.getElementById("nav");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("nav--open")}),t.querySelectorAll(".nav__link").forEach(r=>{r.addEventListener("click",()=>t.classList.remove("nav--open"))}))}function A(){var e,t,r,a,o,n;N(),(e=document.getElementById("cartBtn"))==null||e.addEventListener("click",j),(t=document.getElementById("cartOverlay"))==null||t.addEventListener("click",v),(r=document.getElementById("cartClose"))==null||r.addEventListener("click",v),(a=document.getElementById("checkoutBtn"))==null||a.addEventListener("click",z),(o=document.getElementById("backToCart"))==null||o.addEventListener("click",B),(n=document.getElementById("checkoutForm"))==null||n.addEventListener("submit",U),p()}function N(){if(document.getElementById("cartSidebar"))return;document.body.insertAdjacentHTML("beforeend",`
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
  `)}function j(){var e,t;p(),(e=document.getElementById("cartOverlay"))==null||e.classList.add("cart-overlay--open"),(t=document.getElementById("cartSidebar"))==null||t.classList.add("cart-sidebar--open"),document.body.style.overflow="hidden",B()}function v(){var e,t;(e=document.getElementById("cartOverlay"))==null||e.classList.remove("cart-overlay--open"),(t=document.getElementById("cartSidebar"))==null||t.classList.remove("cart-sidebar--open"),document.body.style.overflow=""}function z(){var t,r;if(m().length===0){h("Корзина пуста");return}(t=document.getElementById("cartItems"))==null||t.classList.add("cart-items-view--hidden"),(r=document.getElementById("checkoutForm"))==null||r.classList.add("checkout-form--active"),document.getElementById("cartFooter").style.display="none"}function B(){var t,r;(t=document.getElementById("cartItems"))==null||t.classList.remove("cart-items-view--hidden"),(r=document.getElementById("checkoutForm"))==null||r.classList.remove("checkout-form--active"),document.getElementById("cartFooter").style.display="";const e=document.getElementById("formMessage");e&&(e.className="form-message",e.textContent="")}function p(){const e=m(),t=L(),r=$(d),a=document.querySelector(".cart-btn__count");a&&(a.textContent=t||"",a.dataset.count=t);const o=document.getElementById("cartTotal");o&&(o.textContent=u(r));const n=document.getElementById("cartItems");if(n){if(e.length===0){n.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <p>Корзина пуста</p>
        <a href="/catalog.html" class="btn btn--secondary btn--sm" style="margin-top:16px">Перейти в каталог</a>
      </div>
    `;return}n.innerHTML=e.map(i=>{const c=d.find(s=>s.id===i.id);return c?`
        <div class="cart-item" data-id="${i.id}">
          <div class="cart-item__image">
            <img src="${c.image}" alt="${c.name}" loading="lazy">
          </div>
          <div class="cart-item__info">
            <div class="cart-item__name">${c.name}</div>
            <div class="cart-item__price">${u(c.price)}</div>
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-action="decrease" data-id="${i.id}">−</button>
              <span class="cart-item__qty-value">${i.qty}</span>
              <button class="cart-item__qty-btn" data-action="increase" data-id="${i.id}">+</button>
            </div>
            <button class="cart-item__remove" data-action="remove" data-id="${i.id}">Удалить</button>
          </div>
        </div>
      `:""}).join(""),n.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.id,s=i.dataset.action,l=e.find(T=>T.id===c);s==="increase"&&_(c,((l==null?void 0:l.qty)||0)+1),s==="decrease"&&_(c,((l==null?void 0:l.qty)||0)-1),s==="remove"&&S(c),p()})})}}function R(e){const r=m().map(o=>{const n=d.find(i=>i.id===o.id);return`• ${n.name} × ${o.qty} — ${u(n.price*o.qty)}`}),a=$(d);return["🛍 Новый заказ FILO","","📦 Товары:",...r,"",`💰 Итого: ${u(a)}`,"","👤 Клиент:",`Имя: ${e.name}`,`Телефон: ${e.phone}`,"","🚚 Доставка:",`Город: ${e.city}`,e.zip?`Индекс: ${e.zip}`:null,`Адрес: ${e.address}`,`Способ: ${e.delivery}`,e.comment?`
💬 Комментарий: ${e.comment}`:null].filter(Boolean).join(`
`)}async function U(e){e.preventDefault();const t=e.target,r=document.getElementById("submitOrder"),a=document.getElementById("formMessage"),o={name:t.name.value.trim(),phone:t.phone.value.trim(),city:t.city.value.trim(),zip:t.zip.value.trim(),address:t.address.value.trim(),delivery:t.delivery.value,comment:t.comment.value.trim()};r.disabled=!0,r.textContent="Отправка...",a.className="form-message",a.textContent="";const n=R(o);try{if((await fetch("/api/send-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:n,formData:o})})).ok)M(),p(),a.className="form-message form-message--success",a.textContent="Заказ отправлен! Мы свяжемся с вами в Telegram.",t.reset(),h("Заказ успешно отправлен!"),setTimeout(v,2500);else throw new Error("API error")}catch{a.className="form-message form-message--error",a.textContent="Не удалось отправить заказ автоматически. Напишите нам в Telegram вручную."}r.disabled=!1,r.textContent="Отправить заказ"}function h(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("toast--show"),setTimeout(()=>t.classList.remove("toast--show"),3e3))}function I(e,{compact:t=!1}={}){return`
    <article class="product-card ${t?"product-card--compact":""}" data-category="${e.category}">
      <div class="product-card__image">
        <img src="${e.image}" alt="${e.name}" loading="lazy">
        <span class="product-card__category">${e.categoryLabel}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${e.name}</h3>
        ${t?"":`<p class="product-card__desc">${e.description}</p>`}
        <div class="product-card__meta">
          <span class="product-card__price">${u(e.price)}</span>
          <span class="product-card__volume">${e.volume}</span>
        </div>
      </div>
      <button class="product-card__add add-to-cart" data-id="${e.id}" type="button">
        <span>В корзину</span>
        <span class="product-card__add-arrow">→</span>
      </button>
    </article>
  `}function C(e){e.querySelectorAll(".add-to-cart").forEach(t=>{t.addEventListener("click",()=>{q(t.dataset.id),p(),h("Товар добавлен в корзину")})})}function J(){const e=document.getElementById("heroSliderTrack"),t=document.getElementById("heroSliderDots");if(!e||!t)return;e.innerHTML=d.map((c,s)=>`
    <div class="hero-slider__slide ${s===0?"hero-slider__slide--active":""}" data-index="${s}">
      <div class="hero-slider__frame">
        <img src="${c.image}" alt="${c.name}" loading="${s===0?"eager":"lazy"}">
      </div>
      <p class="hero-slider__caption">${c.name}</p>
    </div>`).join(""),t.innerHTML=d.map((c,s)=>`<button class="hero-slider__dot ${s===0?"hero-slider__dot--active":""}" data-index="${s}" aria-label="Слайд ${s+1}"></button>`).join("");let r=0,a;function o(c){r=c,e.querySelectorAll(".hero-slider__slide").forEach((s,l)=>{s.classList.toggle("hero-slider__slide--active",l===r)}),t.querySelectorAll(".hero-slider__dot").forEach((s,l)=>{s.classList.toggle("hero-slider__dot--active",l===r)})}function n(){o((r+1)%d.length)}t.querySelectorAll(".hero-slider__dot").forEach(c=>{c.addEventListener("click",()=>{o(Number(c.dataset.index)),i()})});function i(){clearInterval(a),a=setInterval(n,5e3)}i()}function K(){const e=document.getElementById("featuredProducts"),t=document.getElementById("carouselPrev"),r=document.getElementById("carouselNext");if(!e)return;e.innerHTML=d.map(o=>I(o,{compact:!0})).join(""),C(e);const a=o=>{var i;const n=((i=e.querySelector(".product-card"))==null?void 0:i.offsetWidth)||300;e.parentElement.scrollBy({left:o*(n+24),behavior:"smooth"})};t==null||t.addEventListener("click",()=>a(-1)),r==null||r.addEventListener("click",()=>a(1))}function V(){const e=document.getElementById("heroFeatures");e&&(e.innerHTML=E.slice(0,4).map(a=>`
      <div class="hero__feature">
        <span class="hero__feature-icon">${a.icon}</span>
        <span>${a.title}</span>
      </div>`).join(""));const t=document.getElementById("trustBar");t&&(t.innerHTML=x.map(a=>`
      <div class="trust-bar__item">
        <span class="trust-bar__icon">${a.icon}</span>
        <div>
          <div class="trust-bar__title">${a.title}</div>
          <div class="trust-bar__text">${a.text}</div>
        </div>
      </div>`).join(""));const r=document.getElementById("categoryGrid");r&&(r.innerHTML=k.map(a=>`
      <a href="${a.href}" class="category-card">
        <div class="category-card__image">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
        </div>
        <div class="category-card__body">
          <h3 class="category-card__title">${a.title}</h3>
          <span class="category-card__link">Смотреть →</span>
        </div>
      </a>`).join("")),J(),K()}function G(){const e=document.getElementById("catalogProducts"),t=document.getElementById("filterTabs");if(!e)return;e.innerHTML=d.map(o=>I(o)).join(""),C(e);const a=new URLSearchParams(window.location.search).get("cat")||"all";b(a),t&&t.querySelectorAll(".filter-tab").forEach(o=>{o.dataset.cat===a&&o.classList.add("filter-tab--active"),o.addEventListener("click",()=>{t.querySelectorAll(".filter-tab").forEach(n=>n.classList.remove("filter-tab--active")),o.classList.add("filter-tab--active"),b(o.dataset.cat)})})}function b(e){let t=0;document.querySelectorAll(".product-card").forEach(a=>{const o=e==="all"||a.dataset.category===e;a.style.display=o?"":"none",o&&(t+=1)});const r=document.getElementById("catalogCount");r&&(r.textContent=`${t} ${X(t)}`)}function X(e){const t=e%10,r=e%100;return r>=11&&r<=19?"товаров":t===1?"товар":t>=2&&t<=4?"товара":"товаров"}document.addEventListener("DOMContentLoaded",O);
