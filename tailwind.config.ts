import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Masculine Warm Earthy Palette
        sand: "#F2E9D8",
        clay: "#D9A566",
        denim: "#3E5C76",
        olive: "#6B7443",
        rust: "#C06E52",
        taupe: "#A68A64",
        slate: "#4A4E69",
        // Compatibility aliases
        cream: "#F2E9D8",
        creamWhite: "#F2E9D8",
        blushPink: "#D9A566",
        roseGold: "#C9A87C",
        deepRose: "#C06E52",
        champagne: "#E8DCC4",
        softLavender: "#7A8599",
        burgundy: "#4A4E69",
        peach: "#D9A566",
        coral: "#C06E52",
        butter: "#E8DCC4",
        mint: "#8B9A6B",
        lavender: "#7A8599",
        blush: "#C9A87C",
      },
      fontFamily: {
        handwriting: ["Caveat", "cursive"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        glitter: "glitter 1.5s ease-in-out infinite",
        "pulse-slow": "pulse 2s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glitter: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
