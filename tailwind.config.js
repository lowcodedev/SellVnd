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
          50: '#EEF2FF',
          100: '#DDE4FF',
          200: '#BCC8FF',
          300: '#8FA5FF',
          400: '#7089FE',
          500: '#536DFE',
          600: '#3F56E0',
          700: '#3146BA',
        },
        accent: {
          300: '#B3A3FF',
          400: '#9C88FF',
          500: '#8067FF',
          600: '#6A52E6',
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
