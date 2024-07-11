/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-sm': '450px',
      },
      colors: {
        // Light Theme Colors
        'light-primary-bg': '#FFFFFF',
        'light-secondary-bg': '#F7F7F7',
        'light-card-bg': '#FFFFFF',
        'dark-teal': '#008080',
        'light-text-white': "#FFFFFF",
        'light-teal': '#20B2AA',
        'darker-teal': '#1A9988',
        'dark-gray': '#333333',
        'light-gray-border': '#E0E0E0',
        'light-input-border': '#DADADA',

        // Dark Theme Colors
        'dark-primary-bg': '#121212',
        'dark-secondary-bg': '#181818',
        'dark-card-bg': '#1F1F1F',
        'dark-dark-gray': '#1A1A1A',
        'dark-input-border': '#333333',
        'dark-light-text': '#E0E0E0',

        // Dashboard Colors (Light Theme)
        'dashboard-light-primary-bg': '#FFFFFF',
        'dashboard-light-secondary-bg': '#F7F7F7',
        'dashboard-light-card-bg': '#FFFFFF',
        'dashboard-dark-teal': '#008080',
        'dashboard-light-teal': '#20B2AA',
        'dashboard-darker-teal': '#1A9988',
        'dashboard-dark-gray': '#333333',
        'dashboard-gray-border': '#E0E0E0',
        'dashboard-light-input-border': '#DADADA',

        // Dashboard Colors (Dark Theme)
        'dashboard-dark-primary-bg': '#121212',
        'dashboard-dark-secondary-bg': '#181818',
        'dashboard-dark-card-bg': '#1F1F1F',
        'dashboard-dark-gray': '#1A1A1A',
        'dashboard-dark-input-border': '#333333',
        'dashboard-light-text': '#E0E0E0',

        // Shared Colors
        'white': '#FFFFFF',
        'light-gray': '#F7F7F7',
        'darker-gray': '#181818',
        'almost-black': '#121212',
        'card-dark': '#1F1F1F',
        'dark-gray': '#1A1A1A',
        'input-border-dark': '#333333',
        'light-text': '#E0E0E0',
        'gray-border': '#E0E0E0',
      },
    },
  },
  plugins: [],
}
