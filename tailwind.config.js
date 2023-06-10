/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-articulat)'],
      },
      colors: {
        'primary': '#2667FF',
        'primary-dark': '#3B28CC',
        'secondary': '#FFC700',
        'secondary-dark': '#F2A000',
        'tertiary': '#4CC700',
        'tertiary-dark': '#0C9B00',
        'error': '#9F0000',
        'dark': '#050505',
        'gray': '#888888'
      },
      keyframes: {
        firstTitle: {
          '0%': {
            backgroundImage: 'linear-gradient(90deg, #2667FF, #3B28CC)',
          },
          '33%': {
            backgroundImage: 'linear-gradient(90deg, #2667FF, #3B28CC)',
          },
          '34%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '100%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          }
        },
        secondTitle: {
          '0%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '33%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '34%, ': {
            backgroundImage: 'linear-gradient(90deg, #4CC700, #0C9B00)',
          },
          '66%': {
            backgroundImage: 'linear-gradient(90deg, #4CC700, #0C9B00)',
          },
          '67%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '100%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          }
        },
        thirdTitle: {
          '0%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '66%': {
            backgroundImage: 'linear-gradient(90deg, #FFF, #FFF)',
          },
          '67%': {
            backgroundImage: 'linear-gradient(90deg, #FFC700, #F2A000)',
          },
          '100%': {
            backgroundImage: 'linear-gradient(90deg, #FFC700, #F2A000)',
          }
        },
        ctaButtonBlur: {
          '0%': {
            backgroundImage: 'linear-gradient(90deg, #2667FF, #3B28CC)',
          },
          '33%': {
            backgroundImage: 'linear-gradient(90deg, #2667FF, #3B28CC)',
          },
          '34%': {
            backgroundImage: 'linear-gradient(90deg, #4CC700, #0C9B00)',
          },
          '66%': {
            backgroundImage: 'linear-gradient(90deg, #4CC700, #0C9B00)',
          },
          '67%': {
            backgroundImage: 'linear-gradient(90deg, #FFC700, #F2A000)',
          },
          '100%': {
            backgroundImage: 'linear-gradient(90deg, #FFC700, #F2A000)',
          }
        },
        ctaButtonBorder: {
          '0%': {
            borderColor: '#2667FF',
          },
          '33%': {
            borderColor: '#2667FF',
          },
          '34%': {
            borderColor: '#4CC700',
          },
          '66%': {
            borderColor: '#4CC700',
          },
          '67%': {
            borderColor: '#FFC700',
          },
          '100%': {
            borderColor: '#FFC700',
          }
        }
      },
      animation: {
        firstTitle: 'firstTitle 6s linear infinite',
        secondTitle: 'secondTitle 6s linear infinite',
        thirdTitle: 'thirdTitle 6s linear infinite',
        ctaButtonBlur: 'ctaButtonBlur 6s linear infinite',
        ctaButtonBorder: 'ctaButtonBorder 6s linear infinite'
      }
    },
  },
  plugins: [],
}
