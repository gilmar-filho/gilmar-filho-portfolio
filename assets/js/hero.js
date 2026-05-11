/* ═══════════════════════════════════════════════════
   hero.js — efeitos visuais e interatividade
═══════════════════════════════════════════════════ */

/* ─── UTILITÁRIO: dimensiona canvas corretamente ────
   O canvas HTML tem atributos width/height separados
   das dimensões CSS. Sem setar via JS, o browser usa
   300×150 padrão esticado — a fumaça some.
─────────────────────────────────────────────────── */
function sizeCanvas(canvas) {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  return { w: canvas.width, h: canvas.height };
}

/* ─── FÁBRICA DE FUMAÇA ──────────────────────────
   Usada tanto pelo hero quanto pelas seções.
   Recebe o canvas e a opacidade máxima das partículas.
─────────────────────────────────────────────────── */
function createSpace(canvas, maxAlpha) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    const d = sizeCanvas(canvas);
    W = d.w; H = d.h;
  }

  function themeVars() {
    const light = document.documentElement.dataset.theme === 'light';
    return {
      h:     light ? 135   : 145,
      l1:    light ? '30%' : '38%',
      l2:    light ? '22%' : '28%',
      s1:    light ? '60%' : '55%',
      s2:    light ? '45%' : '40%',
      alpha: light ? maxAlpha * 1.8 : maxAlpha,
    };
  }

  class Particle {
    reset(init = false) {
      this.x    = Math.random() * (W || window.innerWidth);
      this.y    = init
        ? Math.random() * (H || window.innerHeight)
        : (H || window.innerHeight) + 60;
      this.r    = 70 + Math.random() * 110;
      this.vx   = (Math.random() - .5) * .28;
      this.vy   = -(0.12 + Math.random() * .2);
      this.life = 0;
      this.maxL = 200 + Math.random() * 160;
    }

    constructor(init = false) { this.reset(init); }

    update() {
      this.x    += this.vx;
      this.y    += this.vy;
      this.life += 1;
      this.r    += .09;
      if (this.y < -(this.r * 2)) this.reset();
    }

    draw() {
      const t   = this.life / this.maxL;
      const tv  = themeVars();
      const a   = Math.sin(Math.PI * t) * tv.alpha;
      const grd = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.r
      );
      grd.addColorStop(0,  `hsla(${tv.h},${tv.s1},${tv.l1},${a})`);
      grd.addColorStop(.5, `hsla(${tv.h},${tv.s2},${tv.l2},${a * .4})`);
      grd.addColorStop(1,  `hsla(${tv.h},30%,15%,0)`);
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

  resize();
  spawn();
  loop();

  window.addEventListener('resize', () => { resize(); spawn(); });
}

function createSmoke(canvas, maxAlpha) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    const d = sizeCanvas(canvas);
    W = d.w; H = d.h;
  }

  // Pegamos a cor exata do seu CSS (verde) em RGB para o gradiente
  function themeVars() {
    const light = document.documentElement.dataset.theme === 'light';
    return {
      r: light ? 26 : 95,
      g: light ? 122 : 232,
      b: light ? 64 : 154,
      alpha: light ? maxAlpha * 1.5 : maxAlpha,
    };
  }

  class SmokeParticle {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial) {
      this.x = Math.random() * W;
      // Se for a carga inicial, espalha na tela. Senão, nasce na base.
      this.y = isInitial ? Math.random() * H : H + 100;
      
      // Raio MASSIVO (200px a 500px) para criar o volume embaçado
      this.r = 200 + Math.random() * 300; 
      
      // Sobe lentamente
      this.vy = -(0.3 + Math.random() * 0.8);
      
      // Movimento lateral base
      this.vx = (Math.random() - 0.5) * 0.5;
      
      // Dados para o zigue-zague do vento
      this.angle = Math.random() * Math.PI * 2;
      this.windSpeed = 0.005 + Math.random() * 0.01;
      
      // Vida da partícula (0 a 1) controla a opacidade
      this.life = isInitial ? Math.random() : 0;
      this.lifeSpeed = 0.0015 + Math.random() * 0.001; 
    }

    update() {
      // Vento oscilante
      this.angle += this.windSpeed;
      this.x += this.vx + Math.sin(this.angle) * 0.3; 
      
      this.y += this.vy;
      this.r += 0.3; // Expande enquanto sobe (dissipação)
      this.life += this.lifeSpeed;
      
      // Se morreu ou saiu muito pra cima da tela, reseta lá embaixo
      if (this.life >= 1 || this.y < -this.r) {
        this.reset(false);
      }
    }

    draw(tv) {
      // Curva de opacidade: Fade in (0-20%), Mantém (20-80%), Fade out (80-100%)
      let currentAlpha = 0;
      if (this.life < 0.2) {
         currentAlpha = (this.life / 0.2) * tv.alpha; 
      } else if (this.life < 0.8) {
         currentAlpha = tv.alpha; 
      } else {
         currentAlpha = (1 - (this.life - 0.8) / 0.2) * tv.alpha; 
      }

      // Previne erros bizarros de renderização no Canvas
      if (currentAlpha < 0) currentAlpha = 0;

      // Cria a névoa usando Radial Gradient
      const grd = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.r
      );
      
      grd.addColorStop(0, `rgba(${tv.r}, ${tv.g}, ${tv.b}, ${currentAlpha})`);
      grd.addColorStop(1, `rgba(${tv.r}, ${tv.g}, ${tv.b}, 0)`);
      
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function spawn() {
    particles = [];
    // 35 partículas gigantes são ideais para preencher a tela sem pesar a CPU
    for (let i = 0; i < 35; i++) particles.push(new SmokeParticle(true));
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    
    // globalCompositeOperation opcional: 'lighter' pode criar um aspecto mágico, 
    // mas 'source-over' (padrão) dá o aspecto de névoa densa.
    const tv = themeVars();
    particles.forEach(p => { p.update(); p.draw(tv); });
    requestAnimationFrame(loop);
  }

  resize();
  spawn();
  loop();

  window.addEventListener('resize', () => { resize(); spawn(); });
}

/* ─── FUMAÇA HERO ────────────────────────────────── */
function initSmoke() {
  createSmoke(document.getElementById('smoke-canvas'), .055);
}

/* ─── FUMAÇA NAS SEÇÕES ──────────────────────────── */
function initSectionSmoke() {
  document.querySelectorAll('.smoke-canvas-section').forEach(canvas => {
    createSmoke(canvas, .038);
  });
}

/* ─── REDE ANIMADA (janela 4) ────────────────────── */
function initNetwork() {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const N    = 14;
  const DIST = 88;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || 268;
    H = canvas.height = canvas.offsetHeight || 190;
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
    requestAnimationFrame(loop);
  }

  function start() {
    resize();
    nodes = [];
    for (let i = 0; i < N; i++) nodes.push(new Node());
    loop();
  }

  window.addEventListener('resize', () => {
    resize(); nodes = [];
    for (let i = 0; i < N; i++) nodes.push(new Node());
  });

  /* Aguarda o elemento estar visível para ler offsetWidth correto */
  setTimeout(start, 100);
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
// document.addEventListener('DOMContentLoaded', () => {
//   initSmoke();
//   initSectionSmoke();
//   initNetwork();
//   initCursor();
//   initCardGlow();
//   initDashBars();
//   initTabs();
// });

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa apenas o canvas global
  const mainCanvas = document.getElementById('smoke-canvas');
  if (mainCanvas) {
    // createSmoke(mainCanvas, 0.12);
    createSpace(mainCanvas, 0.5);
  }

  // Mantém os outros efeitos
  initNetwork();
  initCursor();
  initCardGlow();
  initDashBars();
  initTabs();
  
  // OPCIONAL: Remova a função initSectionSmoke() e initSmoke(), 
  // pois o createSmoke direto no mainCanvas já resolve tudo.
});