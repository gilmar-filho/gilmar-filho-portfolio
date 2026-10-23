/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/js/**/*.js",
  ],

  // Tema controlado via data-theme no HTML, não por classe
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    // Mesmos breakpoints do Bootstrap 5 para as duas versões quebrarem juntas
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },

    extend: {
      /* ── Cores mapeadas nos tokens CSS ── */
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          2:       'rgb(var(--ink-2) / <alpha-value>)',
          3:       'rgb(var(--ink-3) / <alpha-value>)',
          4:       'rgb(var(--ink-4) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
          2:       'rgb(var(--cream-2) / <alpha-value>)',
          3:       'rgb(var(--cream-3) / <alpha-value>)',
        },
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },

      /* ── Fontes ── */
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Mono', 'monospace'],
      },

      /* ── Escala tipográfica (valores em portfolio.css) ── */
      fontSize: {
        display:      'var(--fs-display)',
        h2:           'var(--fs-h2)',
        'h2-lg':      'var(--fs-h2-lg)',
        h3:           'var(--fs-h3)',
        lede:         'var(--fs-lede)',
        copy:         'var(--fs-copy)',
        'card-title': 'var(--fs-card-title)',
        card:         'var(--fs-card)',
        meta:         'var(--fs-meta)',
        micro:        'var(--fs-micro)',
      },

      /* ── Border radius extras ── */
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },

  plugins: [],
}
