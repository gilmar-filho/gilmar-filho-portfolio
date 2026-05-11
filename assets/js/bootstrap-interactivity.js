/* ═══════════════════════════════════════════════════
   bootstrap-interactivity.js (Antigo theme-toggle.js)
   Controla Tema, Animações de Scroll, Navbar e Modais
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // ─── 1. LÓGICA DE TEMA (DARK/LIGHT) ────────────────────────
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-bs-theme', theme);
    // Gira o ícone para dar um feedback visual (Micro-interação)
    if(themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if(icon) {
        icon.style.transform = theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
        icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    }
  };

  if (savedTheme) applyTheme(savedTheme);
  else applyTheme(systemPrefersDark ? 'dark' : 'light');

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ─── 2. HEADER DINÂMICO AO FAZER SCROLL ────────────────────
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
      header.style.backgroundColor = 'var(--bs-body-bg)';
    } else {
      header.classList.remove('shadow-sm');
      // No topo, fica ligeiramente transparente
      header.style.backgroundColor = 'rgba(var(--bs-body-bg-rgb), 0.9)'; 
    }
  });

  // ─── 3. SCROLL REVEAL (INTERSECTION OBSERVER) ──────────────
  // Traz a mesma sensação de fluidez da sua versão Tailwind
  const revealElements = document.querySelectorAll('section, .custom-card, .terminal-box');
  
  // Adiciona a classe base a todos os elementos que queremos animar
  revealElements.forEach(el => el.classList.add('reveal-hidden'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Anima apenas uma vez para não pesar
      }
    });
  }, {
    root: null,
    threshold: 0.1, // Dispara quando 10% do elemento está visível
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── 4. BLUR NO MODAL (API NATIVA DO BOOTSTRAP) ────────────
  const contactModalEl = document.getElementById('contactModal');
  const mainContent = document.querySelector('main');
  const headerContent = document.querySelector('header');

  if (contactModalEl && mainContent && headerContent) {
    // Quando o modal começa a abrir
    contactModalEl.addEventListener('show.bs.modal', () => {
      mainContent.style.filter = 'blur(8px)';
      mainContent.style.transition = 'filter 0.3s ease';
      headerContent.style.filter = 'blur(8px)';
      headerContent.style.transition = 'filter 0.3s ease';
    });

    // Quando o modal termina de fechar
    contactModalEl.addEventListener('hidden.bs.modal', () => {
      mainContent.style.filter = 'none';
      headerContent.style.filter = 'none';
    });
  }

  // ─── 5. SMOOTH SCROLL PARA LINKS INTERNOS ──────────────────
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calcula a posição descontando a altura do header fixo
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ─── 6. LÓGICA DE TABS (FREELANCE) ─────────────────────────
  const tabs = document.querySelectorAll('.fl-tab');
  const panels = document.querySelectorAll('.fl-panel');
  let hoverTimer;

  function activateTab(index) {
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    panels.forEach((p, i) => p.classList.toggle('active', i === index));
  }

  tabs.forEach((tab, i) => {
    // Hover Intent (150ms de atraso para evitar pisca-pisca)
    tab.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => activateTab(i), 150);
    });
    
    tab.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    
    // Clique (Mobile/Acessibilidade)
    tab.addEventListener('click', () => {
      clearTimeout(hoverTimer);
      activateTab(i);
    });
  });

  // ─── 7. REDE ANIMADA (JANELA 4) ───────────────────────────
  const netCanvas = document.getElementById('net-canvas');
  if (netCanvas) {
    const ctx = netCanvas.getContext('2d');
    let nW, nH, nodes = [];
    const N = 14;
    const DIST = 88;

    function resizeNet() {
      nW = netCanvas.width = netCanvas.offsetWidth || 268;
      nH = netCanvas.height = netCanvas.offsetHeight || 190;
    }

    class Node {
      constructor() {
        this.x = Math.random() * nW;
        this.y = Math.random() * nH;
        this.vx = (Math.random() - .5) * .38;
        this.vy = (Math.random() - .5) * .38;
        this.r = 2.5 + Math.random() * 1.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > nW) this.vx *= -1;
        if (this.y < 0 || this.y > nH) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'rgba(95,232,154,0.7)' : 'rgba(26,122,64,0.7)';
        ctx.fill();
      }
    }

    function netLoop() {
      ctx.clearRect(0, 0, nW, nH);
      nodes.forEach(n => {
        n.update();
        n.draw();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.strokeStyle = htmlElement.getAttribute('data-bs-theme') === 'dark' ? `rgba(95,232,154,${(1 - d / DIST) * 0.32})` : `rgba(26,122,64,${(1 - d / DIST) * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(netLoop);
    }

    resizeNet();
    for (let i = 0; i < N; i++) nodes.push(new Node());
    netLoop();
    window.addEventListener('resize', resizeNet);
  }
});