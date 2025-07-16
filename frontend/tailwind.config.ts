import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-bebas-neue)", "sans-serif"],
        sans: ["var(--font-lato)", "sans-serif"],
        jost: ["var(--font-jost)", "sans-serif"],
      },
      backgroundImage: {
        banner1: "url('/images/banner1.jpg')",
        banner2: "url('/images/banner2.jpg')",
        vban1: "url('/images/vban1.jpg')",
        vban2: "url('/images/vban2.jpg')",
        patternBg: "url('/images/pattern.png')",
      },
      colors: {
        customBlue: "#071F68",
        customeRed: "#EE0D09",
        customeHover: "#D70C08",
      },
      boxShadow: {
        full: "0 0 13px 0 rgba(0, 0, 0, 0.1)", // Custom shadow for all four sides
      },
      backgroundSize: {
        overscan: "110%",
      },
      keyframes: {
        bgSlide: {
          "0%, 100%": { backgroundPosition: "50% 50%" },
          "25%": { backgroundPosition: "calc(50% - 10px) 50%" },
          "75%": { backgroundPosition: "calc(50% + 10px) 50%" },
        },
      },
      animation: {
        bgSlide: "bgSlide 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
