/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',],
  theme: {
    extend: {
      fontFamily: {
        // 'customName': ['FontName', 'fallback']
        spaceMono: ['Space Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

