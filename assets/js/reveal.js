/* ═══════════════════════════════════════════════════
   reveal.js — elementos aparecem conforme a rolagem
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => io.observe(el));
});
