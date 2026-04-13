/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./assets/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg-color) / <alpha-value>)',
        foreground: 'rgb(var(--text-color) / <alpha-value>)',
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        surface: 'rgb(var(--secondary-bg) / <alpha-value>)',
        borderColor: 'rgb(var(--border-color) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}