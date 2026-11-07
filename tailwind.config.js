/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0B0D14',
          800: '#101426',
          700: '#171D36',
          600: '#222A48',
        },
        brand: {
          50: '#EFF5FF',
          100: '#DCE9FF',
          200: '#B5D0FF',
          300: '#7AAEFF',
          400: '#4A8CFF',
          500: '#1E63FF',
          600: '#1450E6',
          700: '#0E3DB4',
        },
        accent: {
          300: '#8DF2FF',
          400: '#3EE4FF',
          500: '#00C6F5',
          600: '#00A3CC',
        },
        pop: {
          300: '#E2FF9A',
          400: '#D4FF5C',
          500: '#C4F82A',
        },
        success: { 400: '#4ADE80', 500: '#22C55E', 600: '#16A34A' },
        warning: { 400: '#FBBF24', 500: '#F59E0B' },
        error: { 400: '#F87171', 500: '#EF4444', 600: '#DC2626' },
        ink: {
          50: '#F8F9FC',
          100: '#EEF0F6',
          200: '#DDE1EC',
          300: '#C3C9D8',
          400: '#9AA1B5',
          500: '#6B7389',
          600: '#4B5268',
          700: '#343A4F',
          800: '#1F2436',
          900: '#0B0D14',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-line': {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-line': 'pulse-line 2.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
