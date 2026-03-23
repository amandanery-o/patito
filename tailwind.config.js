/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        patito: {
          yellow:  '#F5C518',
          gold:    '#E5A800',
          navy:    '#1B3A5C',
          green:   '#4CAF50',
          'green-dark': '#388E3C',
          coral:   '#FF6B6B',
          'coral-dark': '#D94F4F',
          blue:    '#3B82F6',
          'blue-dark': '#1D6FB8',
          purple:  '#8B5CF6',
          'purple-dark': '#6D28D9',
          teal:    '#0D9488',
          'teal-dark': '#0F766E',
          orange:  '#F97316',
          'orange-dark': '#C2410C',
        },
      },
      keyframes: {
        'float-up': {
          '0%':   { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-48px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'star-pop': {
          '0%':   { opacity: '0', transform: 'scale(0.3) rotate(-20deg)' },
          '60%':  { opacity: '1', transform: 'scale(1.3) rotate(5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        confetti: {
          '0%':   { transform: 'translateY(-10px) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        'float-up':  'float-up 1s ease-out forwards',
        shimmer:     'shimmer 2s linear infinite',
        'star-pop':  'star-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-up':  'slide-up 0.3s ease-out forwards',
        confetti:    'confetti 2.5s ease-in forwards',
      },
    },
  },
  plugins: [],
}
