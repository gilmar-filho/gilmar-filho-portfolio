/* ═══════════════════════════════════════════════════
   reveal.js — IntersectionObserver para mobile
   No desktop, as animações são disparadas pelo scroll.js
   quando o slide entra em cena.
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el));
});
