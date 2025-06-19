module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"],
        playfair: ['"Playfair Display"', "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'spin-slow': 'spin 8s linear infinite',
        sparkle: "sparkle 2s linear infinite",
        "fade-in": "fadeIn 2s ease-in forwards",
        typing: "typing 3.5s steps(40, end)",
        "blink-caret": "blink-caret .75s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        // ✅ Add spin here
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
