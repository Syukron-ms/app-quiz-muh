/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        popIn: "popIn 0.3s ease-in-out",
        float: "float 2.5s ease-in-out infinite",
        softBounce: "softBounce 1.3s ease-in-out infinite",
        bgMove: "bgMove 6s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        popIn: {
          "0%": { transform: "scale(0.7)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        softBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        bgMove: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
      },
      backgroundSize: {
        "200": "200% 200%",
      },
      colors: {
        neonBlue: '#0ea5e9',
        neonPurple: '#7c3aed',
        neonPink: '#ff2d95',
        neonCyan: '#06b6d4'
      },
      boxShadow: {
        'neon': '0 8px 30px rgba(124,58,237,0.18), inset 0 0 18px rgba(14,165,233,0.08)',
        'glow-blue': '0 6px 30px rgba(14,165,233,0.18), 0 0 18px rgba(14,165,233,0.28)'
      }
    },
  },
  plugins: [],
};
