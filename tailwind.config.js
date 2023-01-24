/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        margin: {
            '22': '5.5rem',
        },
        height: {
            '54': '13.5rem',
            '76': '19rem',
        },
        maxWidth: {
            '9/10': '90%',
        },
    },
  },
  plugins: [],
  safelist: [
    'mt-16',
    'mt-22',
    'mt-24',
    '-mt-16',
    '-mt-22',
    '-mt-24',
    'h-54',
    'h-76',
    'gap-x-1',
    'gap-x-2',
    'gap-x-4',
  ]
}
