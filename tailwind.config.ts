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
        locmaisTeal: "#127184",
        locmaisYellow: "#f7b718",
        locmaisGray: "#595959",
      },
      keyframes: {
        shakeX: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shakeX: "shakeX 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
