/** @type {import('tailwindcss').Config} */
export default {
    // Mirrors the runtime config that previously lived in index.html
    // (darkMode: 'class', extra slate-850 color).
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                slate: { 850: '#151e2e' },
            },
        },
    },
    plugins: [],
};
