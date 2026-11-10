/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bronze: {
          DEFAULT: '#8A7059',
          light: '#C5A88E',
          dark: '#6E5844',
        },
        slateMuted: {
          DEFAULT: '#384545',
          deep: '#182020',
          card: '#202A2A',
        },
        chalk: {
          DEFAULT: '#F5F2EB',
          card: '#EBE6DC',
        }
      }
    },
  },
  plugins: [],
}

