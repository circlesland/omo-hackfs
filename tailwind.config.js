const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: {
        enabled: false,
        content: [
            './src/**/*.html',
            './src/**/*.svelte',
            './src/**/*.ts'
        ]
    },
    theme: {
        // fontFamily: {
        //     'title': ['Oswald']
        // },
        extend: {
            colors: {
                primary: '#0F1758',
                secondary: '#2AD78B',
            },
        }
    },
    variants: {},
    // plugins: [
    //     plugin(function ({
    //         addComponents
    //     }) {
    //         const colors = {
    //             '.o-text-primary': {
    //                 color: '#0F1758'
    //             },
    //             '.o-bg-primary': {
    //                 backgroundColor: '#0F1758',
    //             },
    //             '.o-text-secondary': {
    //                 color: '#2AD78B'
    //             },
    //             '.o-bg-secondary': {
    //                 backgroundColor: '#2AD78B'
    //             },
    //         }
    //         addComponents(colors)
    //     })
    // ]
}