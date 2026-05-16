/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        display: ['Funnel Display', 'Geist', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0c',
          900: '#101014',
          800: '#16161c',
          700: '#1d1d26',
          600: '#262633',
          500: '#3a3a4a',
          400: '#5c5c70',
          300: '#8888a0',
          200: '#c8c8d8',
          100: '#eaeaf0',
        },
        accent: {
          cyan: '#00d9ff',
          amber: '#ffb547',
          sage: '#7dd3a0',
          rose: '#ff6b8b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 240ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
