/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        dark: '#0a0a0f',
        'dark-card': '#111118',
        'dark-border': '#1e1e2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 1.6s infinite',
        'skeleton': 'skeleton 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        skeleton: {
          '0%, 100%': { backgroundColor: '#f3f4f6' },   /* gray-100 */
          '50%':       { backgroundColor: '#d1d5db' },   /* gray-300 */
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(27, 181, 162, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27, 181, 162, 0.05) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(27, 181, 162, 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};
