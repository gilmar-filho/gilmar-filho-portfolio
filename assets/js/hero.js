/* ═══════════════════════════════════════════════════
   hero.js — efeitos visuais e interatividade
═══════════════════════════════════════════════════ */

/* ─── FUMAÇA ─────────────────────────────────────── */
function initSmoke() {
  const canvas = document.getElementById('smoke-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* Lê o acento do tema atual */
  function accentHue() {
    return document.documentElement.dataset.theme === 'light' ? 130 : 145;
  }

  class Particle {
    constructor(init = false) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 60;
      this.r    = 80 + Math.random() * 120;
      this.vx   = (Math.random() - .5) * .28;
      this.vy   = -(0.14 + Math.random() * .22);
      this.life = 0;
      this.maxL = 220 + Math.random() * 160;
    }

    update() {
      this.x += this.vx; this.y += this.vy;
      this.life += 1; this.r += .1;
      if (this.y < -this.r * 2) Object.assign(this, new Particle());
    }

    draw() {
      const t   = this.life / this.maxL;
      const a   = Math.sin(Math.PI * t) * .055;
      const h   = accentHue();
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      grd.addColorStop(0,  `hsla(${h},55%,38%,${a})`);
      grd.addColorStop(.5, `hsla(${h},40%,28%,${a*.4})`);
      grd.addColorStop(1,  `hsla(${h},30%,18%,0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function spawn() {
    particles = [];
    for (let i = 0; i < 22; i++) particles.push(new Particle(true));
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  resize(); spawn(); loop();
  window.addEventListener('resize', () => { resize(); spawn(); });
}

/* ─── REDE ANIMADA ───────────────────────────────── */
function initNetwork() {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const N    = 14;
  const DIST = 88;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function accentColor(a) {
    return document.documentElement.dataset.theme === 'light'
      ? `rgba(26,122,64,${a})`
      : `rgba(95,232,154,${a})`;
  }

  class Node {
    constructor() {
      this.x  = Math.random() * W;  this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38;
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
        const d  = Math.sqrt(dx*dx + dy*dy);
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
    requestAnimationFrame(loop);
  }

  resize();
  for (let i = 0; i < N; i++) nodes.push(new Node());
  loop();
  window.addEventListener('resize', () => {
    resize(); nodes = [];
    for (let i = 0; i < N; i++) nodes.push(new Node());
  });
}

/* ─── CURSOR ─────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .win, .fl-tab, .sn-item, .card-glow').forEach(el => {
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

  function activate(i) {
    tabs.forEach((t, j)   => t.classList.toggle('active', j === i));
    panels.forEach((p, j) => p.classList.toggle('active', j === i));
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i)));
  activate(0);
}

/* ─── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSmoke();
  initNetwork();
  initCursor();
  initCardGlow();
  initDashBars();
  initTabs();
});
