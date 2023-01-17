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
            '62': '15.5rem',
        }
    },
  },
  plugins: [],
  safelist: [
    'mt-12',
    'mt-22',
    'mt-24',
    '-mt-12',
    '-mt-22',
    '-mt-24',
    'h-60',
    'h-62',
    'h-72',
    'gap-1',
    'gap-2',
    'gap-4',
  ]
}
