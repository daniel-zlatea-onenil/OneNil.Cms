import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                primaryDark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
                accentBg: 'rgb(var(--color-accent-bg) / <alpha-value>)',
                slateText: 'rgb(var(--color-slate-text) / <alpha-value>)',
                slateMuted: 'rgb(var(--color-slate-muted) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};

export default config;
