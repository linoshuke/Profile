/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B263B',
        'navy-light': '#2c3e50',
        'navy-dark': '#0d1321',
        softblue: '#60A5FA',
        'softblue-light': '#93c5fd',
        'softblue-dark': '#3b82f6',
        offwhite: '#F8FAFC',
      },
      animation: {
        'floating': 'floating 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out 0.2s both',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#1B263B' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.glass-card': {
          '@apply bg-white/70 backdrop-blur-md border border-navy/10 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(27,38,59,0.05)]': {},
          '&:hover': {
            '@apply border-softblue -translate-y-1 shadow-[0_20px_40px_rgba(27,38,59,0.1)]': {},
          },
        },
        '.gradient-text': {
          '@apply bg-gradient-to-r from-navy to-softblue bg-clip-text text-transparent': {},
        },
      })
    }
  ],
}
