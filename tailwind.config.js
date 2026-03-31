/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#34C759',
          dark: '#248a3d',
          light: '#e8f8ed',
          glow: 'rgba(52,199,89,0.22)'
        },
        red: '#FF3B30',
        orange: '#FF9500',
        blue: '#007AFF',
        text: {
          1: '#1C1C1E',
          2: '#3a3a3c',
          3: '#6e6e73',
          4: '#aeaeb2'
        },
        bg: {
          DEFAULT: '#ffffff',
          grouped: '#F2F2F7',
        },
        fill: {
          1: '#f2f2f7',
          2: '#e5e5ea',
          3: '#d1d1d6'
        },
        border: {
          DEFAULT: 'rgba(60,60,67,0.1)',
          mid: 'rgba(60,60,67,0.18)'
        }
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '18px',
        xl: '22px',
        pill: '999px'
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        sm: '0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
        md: '0 4px 20px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)',
        lg: '0 12px 40px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.06)',
        xl: '0 24px 64px rgba(0,0,0,0.16), 0 8px 20px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}