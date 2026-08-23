/** Glaze atelier — editorial grid motion */

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.getElementById('heroVisual');

  if (hero && !reduced) {
    hero.addEventListener(
      'mousemove',
      (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
        const products = hero.querySelector('.hero-atelier__products');
        if (products) {
          products.style.transform = `translate(${x}px, ${y}px)`;
        }
      },
      { passive: true }
    );

    hero.addEventListener('mouseleave', () => {
      const products = hero.querySelector('.hero-atelier__products');
      if (products) products.style.transform = '';
    });
  }

  if (!reduced) {
    initScrollReveal();
  }

  document.querySelectorAll('.shelf-cell[data-id]').forEach((cell) => {
    cell.style.cursor = 'default';
    const add = cell.querySelector('.add-to-cart, .shelf-qty__btn');
    if (add) add.style.cursor = 'pointer';
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.line-grid__item, .assertion__cell');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => {
    el.classList.add('reveal-up');
    observer.observe(el);
  });
}
