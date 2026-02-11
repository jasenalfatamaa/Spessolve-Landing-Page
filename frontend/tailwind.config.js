/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Quicksand"', 'sans-serif'],
                display: ['"Merriweather"', 'serif'],
                serif: ['"Merriweather"', 'serif'],
                mono: ['"Quicksand"', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#f4f7f2',
                    100: '#eef3e8',
                    300: '#3E7B27',
                    500: '#85A947',
                    600: '#3E7B27',
                    700: '#123524',
                    900: '#0a2016',
                },
                void: '#123524',
                surface: '#0f2e1f',
                cream: '#EFE3C2',
                subtle: '#3E7B27',
                muted: '#AABBAA',
            },
        },
    },
    plugins: [],
}
