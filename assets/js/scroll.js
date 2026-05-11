/* ═══════════════════════════════════════════════════
   scroll.js — fullpage scroll engine
═══════════════════════════════════════════════════ */

const FP = (() => {
  const SLIDES     = Array.from(document.querySelectorAll('.fp-slide'));
  const SN_ITEMS   = Array.from(document.querySelectorAll('.sn-item'));
  const PROG_BAR   = document.getElementById('progress-bar');
  const DURATION   = 950;

  let current   = 0;
  let animating = false;

  const isMobile = () => window.innerWidth <= 768;

  /* ── Activates a slide by index ── */
  function goTo(idx) {
    if (idx < 0 || idx >= SLIDES.length) return;
    if (idx === current && SLIDES[current].classList.contains('active')) return;
    if (animating && !isMobile()) return;

    animating    = true;
    const prev   = current;
    current      = idx;

    SLIDES.forEach((s, i) => {
      s.classList.remove('active', 'above', 'below');
      if      (i < current) s.classList.add('above');
      else if (i > current) s.classList.add('below');
    });

    SLIDES[current].classList.add('active');
    triggerReveals(SLIDES[current]);

    SN_ITEMS.forEach((item, i) => item.classList.toggle('active', i === current));

    if (PROG_BAR) {
      PROG_BAR.style.width = (current / (SLIDES.length - 1) * 100) + '%';
    }

    setTimeout(() => { animating = false; }, DURATION);
  }

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  /* ── Triggers reveal animations in a slide ── */
  function triggerReveals(slide) {
    const els = slide.querySelectorAll('.rv, .rv-l, .rv-r');
    els.forEach(el => el.classList.remove('in'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      els.forEach(el => el.classList.add('in'));
    }));
  }

  /* ── Wheel ── */
  let wheelAcc   = 0;
  let wheelTimer = null;

  function onWheel(e) {
    if (isMobile()) return;
    e.preventDefault();

    wheelAcc += Math.abs(e.deltaY);
    clearTimeout(wheelTimer);

    if (wheelAcc > 60) {
      e.deltaY > 0 ? next() : prev();
      wheelAcc = 0;
    }

    wheelTimer = setTimeout(() => { wheelAcc = 0; }, 150);
  }

  /* ── Touch ── */
  let touchY = null;

  function onTouchStart(e) { touchY = e.touches[0].clientY; }

  function onTouchEnd(e) {
    if (touchY === null || isMobile()) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) { dy > 0 ? next() : prev(); }
    touchY = null;
  }

  /* ── Keyboard ── */
  function onKey(e) {
    if (isMobile()) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowUp'   || e.key === 'PageUp'  ) { e.preventDefault(); prev(); }
  }

  /* ── Side nav clicks ── */
  SN_ITEMS.forEach((item, i) => item.addEventListener('click', () => goTo(i)));

  /* ── Init ── */
  function init() {
    document.documentElement.classList.add('fp-ready');

    if (!isMobile()) {
      SLIDES.forEach((s, i) => {
        s.classList.add(i === 0 ? 'active' : 'below');
      });
      triggerReveals(SLIDES[0]);
      SN_ITEMS[0]?.classList.add('active');

      document.addEventListener('wheel',      onWheel,      { passive: false });
      document.addEventListener('touchstart', onTouchStart, { passive: true  });
      document.addEventListener('touchend',   onTouchEnd,   { passive: true  });
      document.addEventListener('keydown',    onKey);
    } else {
      /* mobile — todos visíveis, scroll nativo */
      SLIDES.forEach(s => { s.classList.add('active'); triggerReveals(s); });

      if (PROG_BAR) {
        window.addEventListener('scroll', () => {
          const h   = document.documentElement.scrollHeight - window.innerHeight;
          const pct = h > 0 ? (window.scrollY / h * 100) : 0;
          PROG_BAR.style.width = pct + '%';
        }, { passive: true });
      }
    }
  }

  return { init, goTo, next, prev };
})();

document.addEventListener('DOMContentLoaded', FP.init);
