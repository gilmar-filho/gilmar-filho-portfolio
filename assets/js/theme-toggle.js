document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Lógica de Tema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.setAttribute('data-bs-theme', 'light');
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark' || htmlElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Lógica do Modal de Contato
  const contactModal = document.getElementById('contact-modal');
  const openModalBtns = document.querySelectorAll('.open-contact-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const mainContent = document.querySelector('main');
  const headerContent = document.querySelector('header');

  const toggleModal = (show) => {
    if (show) {
      contactModal.classList.remove('hidden');
      contactModal.classList.add('flex');
      // Adiciona blur ao fundo
      mainContent.classList.add('blur-sm');
      headerContent.classList.add('blur-sm');
    } else {
      contactModal.classList.add('hidden');
      contactModal.classList.remove('flex');
      // Remove blur do fundo
      mainContent.classList.remove('blur-sm');
      headerContent.classList.remove('blur-sm');
    }
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal(true);
  }));

  closeModalBtn?.addEventListener('click', () => toggleModal(false));
  
  // Fecha ao clicar fora do card
  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) toggleModal(false);
  });
});