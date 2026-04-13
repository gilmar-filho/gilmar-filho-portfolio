document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark'); // Para o Tailwind
      htmlElement.setAttribute('data-bs-theme', 'dark'); // Para o Bootstrap
    } else {
      htmlElement.classList.remove('dark'); // Para o Tailwind
      htmlElement.setAttribute('data-bs-theme', 'light'); // Para o Bootstrap
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
});