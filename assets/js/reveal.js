/* ═══════════════════════════════════════════════════
   reveal.js — opacidade ligada à posição na tela
   O conteúdo surge esmaecido pela borda inferior e esmaece
   de novo ao se aproximar da borda superior (abaixo do cabeçalho).
   Funciona nos dois sentidos da rolagem.
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const header = document.getElementById('site-header');
  const clamp  = v => Math.min(1, Math.max(0, v));
  const ease   = p => 1 - (1 - p) * (1 - p);

  const items = Array.from(document.querySelectorAll('.rv, .rv-l, .rv-r')).map(el => ({
    el,
    dx:  el.classList.contains('rv-l') ? -1 : el.classList.contains('rv-r') ? 1 : 0,
    // d1..d4 atrasam a entrada de itens lado a lado (ex.: cards)
    lag: Number(el.className.match(/\bd(\d)\b/)?.[1] || 0) * .04,
  }));

  let queued = false;

  function update() {
    queued = false;
    const H    = window.innerHeight;
    const top  = header.offsetHeight;
    const zone = H * .22;
    // no topo da página nada esmaece; a zona de saída "liga" nos primeiros pixels rolados
    const slack = 1 - Math.min(window.scrollY, zone) / zone;

    const rects = items.map(i => i.el.getBoundingClientRect());

    items.forEach((i, k) => {
      const r     = rects[k];
      const enter = ease(clamp((H * (1 - i.lag) - r.top) / zone));
      const exit  = ease(clamp(((r.top + r.bottom) / 2 - top) / zone + slack));

      i.el.style.opacity   = Math.min(enter, exit).toFixed(3);
      i.el.style.translate = `${i.dx * (1 - enter) * 28}px ${(i.dx ? 0 : (1 - enter) * 28) - (1 - exit) * 16}px`;
    });
  }

  function request() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }

  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
});
