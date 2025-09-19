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
        // Cores PRO.IA Oficiais
        proia: {
          // Primárias
          roxao: "#1b1330",
          roxo: "#381f57",
          "ios-blue": "#007AFF",
          "ios-white": "#F2F2F7",
          "ios-dark": "#1C1C1E",
          
          // Secundárias (Cyberpunk)
          "neon-pink": "#ff2dac",
          "neon-blue": "#00d4ff",
          "neon-purple": "#b026ff",
          "neon-cyan": "#00ffff",
          "neon-magenta": "#ff00ff",
          
          // Status
          success: "#34C759",
          warning: "#FF9500",
          error: "#FF3B30",
          info: "#007AFF"
        },
        
        // Cores iOS (mantidas para compatibilidade)
        ios: {
          blue: "#007AFF",
          blueDark: "#0051a8",
          grayLight: "#F2F2F7",
          grayDark: "#1C1C1E",
          border: "rgba(60,60,67,0.36)",
          text: {
            primary: "#000000",
            secondary: "rgba(60,60,67,0.6)",
            tertiary: "rgba(60,60,67,0.3)"
          }
        }
      },
      
      borderRadius: {
        ios: "20px",
        "proia-sm": "8px",
        "proia-md": "12px",
        "proia-lg": "16px",
        "proia-xl": "24px"
      },
      
      boxShadow: {
        ios: "0 8px 32px rgba(0,0,0,0.08)",
        "proia-glow": "0 0 20px rgba(183, 38, 255, 0.3)",
        "proia-glow-pink": "0 0 20px rgba(255, 45, 172, 0.3)",
        "proia-glow-blue": "0 0 20px rgba(0, 212, 255, 0.3)",
        "proia-glow-strong": "0 0 40px rgba(183, 38, 255, 0.5)"
      },
      
      backdropBlur: {
        ios: "16px",
        "proia-sm": "8px",
        "proia-md": "16px",
        "proia-lg": "20px",
        "proia-xl": "24px"
      },
      
      fontFamily: {
        sans: [
          "Avenir Next",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        "proia": [
          "Avenir Next",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif"
        ]
      },
      
      fontSize: {
        "proia-hero": ["48px", { lineHeight: "60px", fontWeight: "700" }],
        "proia-h1": ["36px", { lineHeight: "48px", fontWeight: "700" }],
        "proia-h2": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "proia-h3": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "proia-body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "proia-body": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "proia-body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "proia-caption": ["12px", { lineHeight: "16px", fontWeight: "500" }]
      },
      
      spacing: {
        "proia-xs": "4px",
        "proia-sm": "8px",
        "proia-md": "16px",
        "proia-lg": "24px",
        "proia-xl": "32px",
        "proia-2xl": "48px",
        "proia-3xl": "64px"
      },
      
      animation: {
        "proia-glow": "proia-glow 2s ease-in-out infinite alternate",
        "proia-pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "proia-bounce-gentle": "bounce 2s infinite"
      },
      
      keyframes: {
        "proia-glow": {
          "0%": { boxShadow: "0 0 20px rgba(183, 38, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(183, 38, 255, 0.6)" }
        },
        "proia-glow-strong": {
          "0%": { boxShadow: "0 0 30px rgba(183, 38, 255, 0.5)" },
          "100%": { boxShadow: "0 0 60px rgba(183, 38, 255, 0.8)" }
        }
      }
    }
  },
  plugins: []
}
