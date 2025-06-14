/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors - Enhanced emerald-teal theme
        'primary': {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#06d6a0',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        'secondary': {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'accent': {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Background Colors - Modern dark theme
        'background': {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
        },
        'surface': {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
        },

        // Text Colors - WCAG compliant
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',

        // Status Colors - Enhanced visibility
        'success': {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
          bg: 'var(--color-success-bg)',
        },
        'warning': {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
          bg: 'var(--color-warning-bg)',
        },
        'error': {
          DEFAULT: 'var(--color-error)',
          light: 'var(--color-error-light)',
          bg: 'var(--color-error-bg)',
        },
        'info': {
          DEFAULT: 'var(--color-info)',
          light: 'var(--color-info-light)',
          bg: 'var(--color-info-bg)',
        },

        // Border Colors - Refined separation
        'border': {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
          dark: 'var(--color-border-dark)',
          focus: 'var(--color-border-focus)',
        },

        // Additional semantic colors for better theming
        'slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      borderRadius: {
        'interactive': '6px',
        'container': '4px',
        'card': '8px',
        'button': '6px',
        'input': '4px',
      },
      spacing: {
        'nav': '16px',
        'header': '64px',
        'breadcrumb': '40px',
        'content-offset': '104px',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px var(--shadow-color-light), 0 1px 2px var(--shadow-color)',
        'elevation-2': '0 4px 8px var(--shadow-color), 0 2px 4px var(--shadow-color-light)',
        'elevation-3': '0 8px 16px var(--shadow-color-medium), 0 4px 8px var(--shadow-color)',
        'elevation-4': '0 12px 24px var(--shadow-color-heavy), 0 8px 16px var(--shadow-color-medium)',
        'glow': '0 0 20px var(--color-primary), 0 0 40px var(--color-primary)',
        'glow-accent': '0 0 20px var(--color-accent), 0 0 40px var(--color-accent)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '50': '50ms',
        'quick': '150ms',
        'medium': '200ms',
        'smooth': '300ms',
        'data': '400ms',
        'slow': '500ms',
        'slower': '750ms',
        'slowest': '1000ms',
      },
      animation: {
        // Enhanced existing animations
        'pulse-gentle': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-press': 'scale 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',

        // New advanced animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-up': 'slideInUp 0.5s ease-out forwards',
        'slide-in-down': 'slideInDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'scale-out': 'scaleOut 0.3s ease-out forwards',
        'bounce-in': 'bounceIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
        'rubber-band': 'rubberBand 1s ease-in-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'zoom-out': 'zoomOut 0.5s ease-out',

        // Chart animations
        'draw-line': 'drawLine 2s ease-out forwards',
        'fill-bar': 'fillBar 1s ease-out forwards',
        'grow-circle': 'growCircle 1s ease-out forwards',
        'pulse-data': 'pulseData 2s ease-in-out infinite',

        // Loading animations
        'skeleton-loading': 'skeletonLoading 1.5s ease-in-out infinite',
        'dot-bounce': 'dotBounce 1.4s ease-in-out infinite both',

        // Utility animations
        'dark-mode-transition': 'darkModeTransition 0.3s ease-in-out',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-100%)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(100%)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          'from': { opacity: '0', transform: 'translateY(100%)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          'from': { opacity: '0', transform: 'translateY(-100%)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          'from': { opacity: '1', transform: 'scale(1)' },
          'to': { opacity: '0', transform: 'scale(0.8)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 5px var(--color-primary), 0 0 10px var(--color-primary), 0 0 15px var(--color-primary)' },
          'to': { boxShadow: '0 0 10px var(--color-primary), 0 0 20px var(--color-primary), 0 0 30px var(--color-primary)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        wiggle: {
          '0%, 7%': { transform: 'rotateZ(0)' },
          '15%': { transform: 'rotateZ(-15deg)' },
          '20%': { transform: 'rotateZ(10deg)' },
          '25%': { transform: 'rotateZ(-10deg)' },
          '30%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '40%, 100%': { transform: 'rotateZ(0)' },
        },
        flip: {
          'from': { transform: 'perspective(400px) rotateY(0)' },
          '40%': { transform: 'perspective(400px) translateZ(150px) rotateY(170deg)' },
          'to': { transform: 'perspective(400px) rotateY(360deg)' },
        },
        rubberBand: {
          'from': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          'to': { transform: 'scale3d(1, 1, 1)' },
        },
        zoomIn: {
          'from': { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          '50%': { opacity: '1' },
        },
        zoomOut: {
          'from': { opacity: '1' },
          '50%': { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          'to': { opacity: '0' },
        },
        drawLine: {
          'from': { strokeDashoffset: '1000' },
          'to': { strokeDashoffset: '0' },
        },
        fillBar: {
          'from': { transform: 'scaleY(0)' },
          'to': { transform: 'scaleY(1)' },
        },
        growCircle: {
          'from': { r: '0' },
          'to': { r: 'var(--final-radius, 5)' },
        },
        pulseData: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        skeletonLoading: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        dotBounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        darkModeTransition: {
          'from': { filter: 'invert(0)' },
          'to': { filter: 'invert(1)' },
        },
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1100',
        'modal': '1200',
        'tooltip': '1300',
        'overlay': '1400',
        'max': '9999',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
        '103': '1.03',
        '115': '1.15',
        '125': '1.25',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    require('tailwindcss-elevation'),
    require('tailwindcss-fluid-type'),
  ],
}