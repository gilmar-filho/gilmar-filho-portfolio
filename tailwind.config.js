/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./assets/js/**/*.js",
  ],

  // Tema controlado via data-theme no HTML, não por classe
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
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

        /* compat — versão Bootstrap usa essas */
        background: 'rgb(var(--ink) / <alpha-value>)',
        foreground: 'rgb(var(--cream) / <alpha-value>)',
        surface:    'rgb(var(--ink-3) / <alpha-value>)',
        borderColor:'rgb(var(--ink-4) / <alpha-value>)',
      },

      /* ── Fontes ── */
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Mono', 'monospace'],
      },

      /* ── Border radius extras ── */
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ── Animações ── */
      keyframes: {
        ping: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(var(--accent-rgb), .5)' },
          '50%':       { boxShadow: '0 0 0 6px rgba(var(--accent-rgb), 0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'bounce-y': {
          from: { transform: 'rotate(45deg) translateY(-3px)' },
          to:   { transform: 'rotate(45deg) translateY(3px)' },
        },
        'spin-ring': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        ping:        'ping 2s ease-in-out infinite',
        blink:       'blink 1s step-end infinite',
        'bounce-y':  'bounce-y .8s ease-in-out infinite alternate',
        'spin-ring': 'spin-ring 9s linear infinite',
      },

      /* ── Transições ── */
      transitionTimingFunction: {
        spring: 'cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },

  plugins: [],
}
