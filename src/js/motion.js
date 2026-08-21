let gsap = null;
let ScrollTrigger = null;
let Lenis = null;

let lenisInstance = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFinePointer() {
  return window.matchMedia('(pointer: fine)').matches;
}

async function loadMotionLibs() {
  if (gsap && ScrollTrigger && Lenis) return true;

  try {
    const [gsapMod, stMod, lenisMod] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm'),
      import('https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger/+esm'),
      import('https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm'),
    ]);

    gsap = gsapMod.default || gsapMod.gsap || gsapMod;
    ScrollTrigger = stMod.ScrollTrigger || stMod.default;
    Lenis = lenisMod.default || lenisMod.Lenis || lenisMod;
    gsap.registerPlugin(ScrollTrigger);
    return true;
  } catch (err) {
    console.warn('[motion] libs unavailable', err);
    return false;
  }
}

function initLenis() {
  if (!Lenis || prefersReducedMotion() || !isFinePointer()) return null;

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.documentElement.classList.add('lenis');
  lenisInstance = lenis;
  return lenis;
}

function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero || !gsap || prefersReducedMotion() || !isFinePointer()) return;

  const copy = hero.querySelector('[data-hero-layer="copy"]');
  const visual = hero.querySelector('[data-hero-layer="visual"]');
  const blush = hero.querySelector('[data-hero-layer="blush"]');

  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
    if (copy) {
      gsap.to(copy, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (visual) {
      gsap.to(visual, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (blush) {
      gsap.fromTo(
        blush,
        { scale: 1 },
        {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  });
}

function initReveal() {
  if (!gsap || prefersReducedMotion()) return;

  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  items.forEach((el) => {
    el.classList.add('reveal');
  });

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });
  });
}

export async function initMotion() {
  const ok = await loadMotionLibs();
  if (!ok) return;

  initLenis();
  initHeroParallax();
  initReveal();
}

export function getLenis() {
  return lenisInstance;
}
