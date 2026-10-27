/* ═══════════════════════════════════════════════════
   scroll.js — cabeçalho, menu mobile e link ativo conforme a rolagem
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

  const menuBtn = header.querySelector('.menu-btn');
  const setMenu = open => {
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
  };

  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  links.forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', e => { if (!header.contains(e.target)) setMenu(false); });
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => setMenu(false));
});
