/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c8a84b',
          50: '#fcfaf4',
          100: '#f7f1db',
          200: '#efe3b8',
          300: '#e5d190',
          400: '#dbbe68',
          500: '#c8a84b',
          600: '#b08e37',
          700: '#8c6e26',
          800: '#684f18',
          900: '#4c390f',
        },
        dark: {
          DEFAULT: '#070707',
          50: '#101010',
          100: '#141414',
          200: '#232323',
          300: '#2e2e2e',
        },
        gold: {
          DEFAULT: '#c8a84b',
          light: '#e2c96a',
          dim: 'rgba(200, 168, 75, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
