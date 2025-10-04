import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7CB342',
          dark: '#558B2F',
          light: '#AED581',
          50: '#F1F8E9',
          100: '#DCEDC8',
        },
        blue: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#60A5FA',
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#F87171',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        purple: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        finance: {
          bg: '#F8FAF9',
          surface: '#FFFFFF',
          card: '#FEFFFE',
          hover: '#F5F7F6',
          border: '#E8EBE9',
          divider: '#EAEDEB',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#64748B',
          muted: '#94A3B8',
          inverse: '#FFFFFF',
        },
        chart: {
          green: '#10B981',
          red: '#EF4444',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          orange: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'lg': '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
        'xl': '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: []
} satisfies Config
