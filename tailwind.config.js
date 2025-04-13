module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#181C23',      // Mid-night Black
        'first-light-1': '#282A27', // First light 01
        'first-light-2': '#444744', // First light 02
        'first-light-3': '#6D706B', // First light 03
        'coral': '#FF4F59',         // Genpact Coral
        'sunset': '#FFAD28',        // Sunset Orange
        'sunrise-white': '#FFFAF4', // Sunrise white
        'sunrise-cream': '#FFF2DF', // Sunrise cream
      },
    },
  },
  darkMode: 'class',
};