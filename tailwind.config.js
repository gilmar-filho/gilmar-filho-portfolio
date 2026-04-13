/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./assets/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--text-color)',
        primary: 'var(--primary-color)',
        surface: 'var(--secondary-bg)',
        borderColor: 'var(--border-color)',
      }
    },
  },
  plugins: [],
}