/* ═══════════════════════════════════════════════════
   theme.js — tema dark/light compartilhado
   Seta data-theme (tokens do portfolio.css) e data-bs-theme
   (Bootstrap). Carregado no <head> para evitar flash de tema.
═══════════════════════════════════════════════════ */

(() => {
  const html = document.documentElement;
  const KEY  = 'theme';
  const dark = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(theme) {
    html.dataset.theme   = theme;
    html.dataset.bsTheme = theme;
  }

  apply(localStorage.getItem(KEY) || (dark.matches ? 'dark' : 'light'));

  dark.addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-btn')?.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem(KEY, next);
    });
  });
})();
