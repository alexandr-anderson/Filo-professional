import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger/+esm';
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFinePointer() {
  return window.matchMedia('(pointer: fine)').matches;
}

function initLenis() {
  if (prefersReducedMotion() || !isFinePointer()) return null;

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
  if (!hero || prefersReducedMotion() || !isFinePointer()) return;

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

export function initReveal() {
  if (prefersReducedMotion()) return;

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

export function initMotion() {
  initLenis();
  initHeroParallax();
  initReveal();
}

export function getLenis() {
  return lenisInstance;
}
