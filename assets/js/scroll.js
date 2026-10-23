/* ═══════════════════════════════════════════════════
   scroll.js — cabeçalho e link ativo conforme a rolagem
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const links  = Array.from(document.querySelectorAll('.site-nav-link'));

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
});
