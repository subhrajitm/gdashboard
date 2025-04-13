/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette
        midnight: '#181C23',
        coral: '#FF4F59',
        sunset: '#FFAD28',
        
        // Secondary palette
        'first-light-1': '#282A27',
        'first-light-2': '#444744',
        'sunrise-white': '#FFFAF4',
        'sunrise-cream': '#FFF2DF',
      },
    },
  },
  plugins: [],
}