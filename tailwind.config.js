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
                primary: '#233D81',
                secondary: '#1C8FC0',
                tertiary: '#2AD78B',
                dark: '#03174B',
                leap1: '#233d81',
                leap2: '#0F81C0',
                leap3: '#42AFED',
                leap4: '#3BD2DC',
                leap5: '#3BDCA2',
                leap6: '#3BDC7B',
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