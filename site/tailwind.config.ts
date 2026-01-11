import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        dashboard: ['JetBrains Mono', 'monospace'],
        crimson: ['Crimson Text', 'serif'],
      },
      fontSize: {
        'display-xl': '7rem',
        'display-lg': '4rem',
        'display-md': '3rem',
        'mono-xl': '3.5rem',
        'mono-lg': '1.75rem',
        'metric-hero': ['5rem', { lineHeight: '1', fontWeight: '200', letterSpacing: '-0.03em' }],
        'metric': ['3rem', { lineHeight: '1', fontWeight: '200', letterSpacing: '-0.03em' }],
        'metric-label': ['0.8125rem', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.01em' }],
        'metric-tag': ['0.625rem', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.15em' }],
      },
      colors: {
        'aw-red': {
          DEFAULT: '#ec140c',
          dark: '#c7130c',
        },
        'aw-blue': {
          DEFAULT: '#323b97',
          dark: '#252e6e',
        },
        'accent-cyan': '#00d4ff',
        'accent-violet': '#a855f7',
        'accent-green': '#10b981',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 16px 48px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
      },
      maxWidth: {
        container: '87.5rem',
        reading: '43.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config
