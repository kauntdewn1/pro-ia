/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  safelist: [
    'ios-card', 'ios-btn', 'ios-navbar', 'ios-bg', 'ios-bg-dark',
    'cyber-card', 'cyber-btn', 'ios-heading', 'ios-text'
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: "#007aff",
          blueDark: "#0051a8",
          grayLight: "#f2f2f7", // background típico iOS
          grayDark: "#1c1c1e", // dark mode background
          border: "rgba(60,60,67,0.36)"
        }
      },
      borderRadius: {
        ios: "20px"
      },
      boxShadow: {
        ios: "0 8px 32px rgba(0,0,0,0.08)"
      },
      backdropBlur: {
        ios: "16px"
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
}
