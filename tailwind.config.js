/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: { ink: '#05060b', accent: '#7c9cff', mint: '#5eead4' },
      animation: { 'spin-slow': 'spin 16s linear infinite' },
    },
  },
  plugins: [],
}
