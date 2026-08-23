/** Glaze atelier — minimal motion (hero kiln only; shelf uses CSS) */

export function initMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.shelf-cell--in-cart').forEach((cell) => {
    cell.classList.add('shelf-cell--in-cart');
  });
}
