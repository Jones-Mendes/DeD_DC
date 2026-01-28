/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f4e8d0',
        'dark-wood': '#3e2723',
        'gold': '#d4af37',
        'blood-red': '#8b0000',
      },
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out'
      }
    },
  },
}
