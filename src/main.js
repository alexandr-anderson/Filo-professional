import { initApp } from './js/app.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  import('./js/motion.js')
    .then(({ initMotion }) => initMotion())
    .catch((err) => console.warn('[motion] module failed', err));
});
