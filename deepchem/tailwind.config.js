/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dc-gray': '#252422',
      'dc-blue': '#004E98',
      'dc-light-blue': '#3A6EA5',
      'dc-light-gray': '#C0C0C0',
      'dc-orange': '#FF6700',
      'dc-white': '#EBEBEB',
      'terminal-red': '#FF5250',
      'terminal-green': '#10CF33',
      'terminal-yellow': '#FEC512',
      'terminal-header': '#EEEFEF',
      'white': '#FFFFFF'
      
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'inconsolata': ['Inconsolata', 'monospace'],
      'lato': ['Lato', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
};
