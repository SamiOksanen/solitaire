/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        margin: {
            '15': '3.75rem',
            '17': '4.25rem',
            '22': '5.5rem',
            '26': '6.5rem',
        },
        height: {
            '17': '4.25rem',
            '54': '13.5rem',
            '73': '18.25rem',
            '76': '19rem',
        },
        maxWidth: {
            '9/10': '90%',
        },
    },
  },
  plugins: [],
  safelist: [
    'mt-10',
    'mt-15',
    'mt-16',
    'mt-17',
    'mt-22',
    'mt-24',
    '-mt-10',
    '-mt-15',
    '-mt-16',
    '-mt-17',
    '-mt-22',
    '-mt-24',
    '-mt-26',
    '-mt-40',
    'h-17',
    'h-24',
    'h-52',
    'h-54',
    'h-73',
    'h-76',
    'h-80',
    'h-96',
    'gap-x-1',
    'gap-x-2',
    'gap-x-4',
    'max-w-4xl',
    'max-w-6xl',
  ]
}
