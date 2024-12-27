/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { opacity: 0.05 },
          '50%': { opacity: 0.15 }
        }
      },
      animation: {
        gradient: 'gradient 8s ease-in-out infinite'
      }
    },
  },
  plugins: []
};
