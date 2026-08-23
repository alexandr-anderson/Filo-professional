/** Glaze atelier motion — hero sheen + shelf interactions */

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
        const product = hero.querySelector('.hero-kiln__product');
        if (product) {
          product.style.transform = `translateY(8%) translate(${x}px, ${y}px)`;
        }
      },
      { passive: true }
    );

    hero.addEventListener('mouseleave', () => {
      const product = hero.querySelector('.hero-kiln__product');
      if (product) product.style.transform = 'translateY(8%)';
    });
  }

  document.querySelectorAll('.shelf-cell[data-id]').forEach((cell) => {
    cell.style.cursor = 'default';
    const add = cell.querySelector('.add-to-cart, .shelf-qty__btn');
    if (add) add.style.cursor = 'pointer';
  });
}
