const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './util/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        minHeight: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        colors: {
            orange: colors.orange,
            gray: colors.gray,
            blue: colors.blueGray,
            white: colors.white,
            red: colors.red
        },
        screens: {
            'sm': '300px',
            'lg': '700px'
        },
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                'hero': "url('~/assets/brown.jpeg')"
            }),
        },
    },
    variants: {
        extend: {
            translate: ['hover'],
        },
      extend: {
        fontFamily: {
          'inter': "'Inter', sans-serif"
        },
        backgroundImage: theme => ({
         'hero': "url('~/assets/brown.jpeg')"
        }),
      },
      
  },
  variants: {
    extend: {
      translate: ['hover'],
    },
    plugins: [require('@tailwindcss/aspect-ratio'),],
}
}