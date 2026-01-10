import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        body: ['General Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        crimson: ['Crimson Text', 'serif'],
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
        'accent-green': '#10b981',
      },
      maxWidth: {
        container: '87.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
