/* ═══════════════════════════════════════════════════
   hero.js — efeitos visuais e interatividade
═══════════════════════════════════════════════════ */

/* ─── REDE ANIMADA (janela 4) ────────────────────── */
function initNetwork() {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const N    = 14;
  const DIST = 88;

  let running = false;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth  || 268;
    H = canvas.offsetHeight || 190;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function accentColor(a) {
    return document.documentElement.dataset.theme === 'light'
      ? `rgba(26,122,64,${a})`
      : `rgba(95,232,154,${a})`;
  }

  class Node {
    constructor() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .38;
      this.vy = (Math.random() - .5) * .38;
      this.r  = 2.5 + Math.random() * 1.5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = accentColor(.7);
      ctx.fill();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => n.update());
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.strokeStyle = accentColor((1 - d / DIST) * .32);
          ctx.lineWidth   = .8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => n.draw());
    if (running) requestAnimationFrame(loop);
  }

  function seed() {
    resize();
    nodes = [];
    for (let i = 0; i < N; i++) nodes.push(new Node());
  }

  window.addEventListener('resize', seed);

  /* Só anima enquanto a janela está visível na tela */
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) {
      if (!nodes.length) seed();
      running = true;
      loop();
    } else if (!e.isIntersecting) {
      running = false;
    }
  }).observe(canvas);
}

/* ─── CURSOR ─────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  if (!window.matchMedia('(pointer: fine)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  // transform em vez de left/top: só recompõe, não recalcula layout
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .win, .fl-tab, .sn-item, .card-glow')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

/* ─── CARD GLOW ──────────────────────────────────── */
function initCardGlow() {
  document.querySelectorAll('.card-glow').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });
}

/* ─── DASH BARS ──────────────────────────────────── */
function initDashBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('animated'), 300);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.dash-bar').forEach(b => io.observe(b));
}

/* ─── FREELANCE TABS ─────────────────────────────── */
function initTabs() {
  const tabs   = document.querySelectorAll('.fl-tab');
  const panels = document.querySelectorAll('.fl-panel');
  let hoverTimer; // Guarda a referência do timer

  function activate(i) {
    tabs.forEach((t, j)   => t.classList.toggle('active', j === i));
    panels.forEach((p, j) => p.classList.toggle('active', j === i));
  }

  tabs.forEach((tab, i) => {
    // Inicia um timer ao entrar na aba
    tab.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        activate(i);
      }, 150); // 150ms: tempo suficiente para ignorar passagens rápidas
    });

    // Cancela a troca se o mouse sair antes dos 150ms
    tab.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
    });
    
    // Mantém o clique instantâneo (ignora o timer) para mobile
    tab.addEventListener('click', () => {
      clearTimeout(hoverTimer);
      activate(i);
    });
  });
  
  activate(0);
}

/* ─── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNetwork();
  initCursor();
  initCardGlow();
  initDashBars();
  initTabs();
});
