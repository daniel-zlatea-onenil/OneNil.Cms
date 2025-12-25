import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#dc2626',
        'brand-red-dark': '#7f1d1d',
        'brand-red-light': '#fecaca',
        'surface-dark': '#171717',
        'surface-darker': '#0a0a0a',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primaryDark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        accentBg: 'rgb(var(--color-accent-bg) / <alpha-value>)',
        slateText: 'rgb(var(--color-slate-text) / <alpha-value>)',
        slateMuted: 'rgb(var(--color-slate-muted) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
        'gradient-dark': 'linear-gradient(180deg, #171717 0%, #000000 100%)',
        'gradient-radial-dark':
          'radial-gradient(ellipse at center, #1f1f1f 0%, #000000 100%)',
        'gradient-hero-overlay':
          'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 12px 48px 0 rgba(0, 0, 0, 0.15)',
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'glow-red': '0 0 30px rgba(220, 38, 38, 0.4)',
        'glow-red-intense': '0 0 50px rgba(220, 38, 38, 0.6)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'countdown-tick': 'countdown-tick 1s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
        glass: '12px',
        heavy: '20px',
      },
      borderRadius: {
        card: '1rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontSize: {
        hero: [
          'var(--font-size-hero)',
          { lineHeight: '1.1', fontWeight: '800' },
        ],
        'section-title': [
          'var(--font-size-section-title)',
          { lineHeight: '1.2', fontWeight: '700' },
        ],
        'card-title': [
          'var(--font-size-card-title)',
          { lineHeight: '1.3', fontWeight: '600' },
        ],
      },
      spacing: {
        section: 'var(--section-padding-y)',
        container: 'var(--container-padding-x)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
