/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: [],
    darkMode: false,
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            ...colors,
        },
        extend: {
            fontFamily: {
                "primary": ["Manrope"],
            },
        },
    },
    plugins: [],
};

