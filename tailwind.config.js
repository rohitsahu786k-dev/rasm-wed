/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E6C8',
          DEFAULT: '#C5A059',
          rich: '#D4AF37',
          dark: '#997316',
          deep: '#78550E',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFCFA',
          200: '#FAF8F5',
          300: '#F4EFEA',
          400: '#EBE4DC',
        },
        charcoal: {
          950: '#090A0C',
          900: '#0F1012',
          800: '#18191D',
          700: '#272930',
          600: '#4A4C56',
        }
      },
      fontFamily: {
        serif: ['"Manrope"', 'system-ui', 'sans-serif'],
        cinzel: ['"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        manrope: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer-slide': 'shimmerSlide 3s infinite linear',
        'border-spin': 'borderSpin 4s linear infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        shimmerSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
