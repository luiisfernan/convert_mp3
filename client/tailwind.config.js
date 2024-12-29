/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Asegúrate de incluir todos los archivos JS, JSX, TS y TSX
  ],
  theme: {
    extend: {
      colors: {
        customGit: '#24292e',
      }
    },
  },
  plugins: [],
}
