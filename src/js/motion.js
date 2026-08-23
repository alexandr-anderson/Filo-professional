/** Concept B — Glass & Mullions Motion Experience */

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // 1. Интерактивное мерцание и световой отклик кобальтового стекла
  const cobaltPane = document.getElementById('cobaltPane');
  if (cobaltPane && !reduced) {
    cobaltPane.addEventListener('mousemove', (e) => {
      const rect = cobaltPane.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const shimmer = cobaltPane.querySelector('.cobalt-shimmer');
      if (shimmer) {
        shimmer.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)`;
      }
    }, { passive: true });

    cobaltPane.addEventListener('mouseleave', () => {
      const shimmer = cobaltPane.querySelector('.cobalt-shimmer');
      if (shimmer) shimmer.style.background = '';
    });
  }

  // 2. Parallax-глубина для силуэта флакона за рифленым стеклом
  const bottleWrap = document.querySelector('.glass-silhouetted-bottle');
  const heroWall = document.getElementById('heroWall');
  if (bottleWrap && heroWall && !reduced) {
    heroWall.addEventListener('mousemove', (e) => {
      const rect = heroWall.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      bottleWrap.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
    }, { passive: true });

    heroWall.addEventListener('mouseleave', () => {
      bottleWrap.style.transform = '';
    });
  }

  // 3. Scroll-reveal для стеклянных створок фасада
  if (!reduced) {
    initScrollReveal();
  }

  // 4. Cursor feedback для интерактивных элементов на стекле
  document.querySelectorAll('.shelf-cell[data-id], .mullion-pane').forEach((cell) => {
    cell.style.cursor = 'pointer';
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.mullion-pane, .assertion-pane, .shelf-cell, .info-card'
  );
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
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  );

  targets.forEach((el) => {
    el.classList.add('reveal-up');
    observer.observe(el);
  });
}
