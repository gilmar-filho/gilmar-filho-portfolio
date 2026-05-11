/* ═══════════════════════════════════════════════════
   theme-toggle-tailwind.js
   Controla tema via data-theme="dark|light" no <html>.
   Persiste em localStorage e respeita preferência do sistema.
   Usado pela versão principal (Tailwind + CSS puro).
   A versão Bootstrap continua usando theme-toggle.js.
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const btn  = document.getElementById('theme-btn');

  /* ── Lê preferência ── */
  function getPreferred() {
    const saved = localStorage.getItem('theme-v2');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* ── Aplica tema ── */
  function applyTheme(theme) {
    html.dataset.theme = theme;
    localStorage.setItem('theme-v2', theme);
  }

  /* ── Toggle ── */
  function toggle() {
    applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  /* ── Init ── */
  applyTheme(getPreferred());
  btn?.addEventListener('click', toggle);

  /* ── Escuta mudança de preferência do sistema ── */
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (!localStorage.getItem('theme-v2')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
});
