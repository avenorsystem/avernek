import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Avernek — "Kathmandu Editorial" system. Source of truth in
        // globals.css :root; these map utility names onto it.
        paper: {
          DEFAULT: "rgb(var(--paper-rgb) / <alpha-value>)", // dark page background
          deep: "#131317", // alternating dark section
        },
        card: "#1A1B20",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)", // platinum headings / strong text
        graphite: "#C3C2BC", // body text
        muted: "#8B8B91", // secondary text
        line: "rgb(243 242 238 / 0.10)", // hairlines on dark

        // Violet brand accent. Legacy aliases remain to avoid noisy component churn.
        sky: {
          DEFAULT: "rgb(var(--sky-rgb) / <alpha-value>)",
          bright: "rgb(var(--sky-bright-rgb) / <alpha-value>)",
          wash: "#211436",
        },
        brass: {
          DEFAULT: "rgb(var(--sky-rgb) / <alpha-value>)",
          bright: "rgb(var(--sky-bright-rgb) / <alpha-value>)",
          wash: "#211436",
          deep: "#6D28D9",
        },

        // Light porcelain surfaces (a few sections + emphasis cards).
        char: {
          DEFAULT: "rgb(var(--char-rgb) / <alpha-value>)",
          card: "#F7F6F2",
          text: "#16161A",
          muted: "#5C5C63",
        },

        // Legacy aliases — keep unrendered components (Team, Services,
        // Technology, CaseStudies, Preloader) compiling until they return.
        obsidian: "#161615",
        navy: { DEFAULT: "#161615", deep: "#161615" },
        panel: { DEFAULT: "#1F1F1D", light: "#1F1F1D" },
        ivory: "#F4F3EE",
        silver: "#C9C8C0",
        slate: { DEFAULT: "#8B8A82" },
        accent: { DEFAULT: "rgb(var(--sky-rgb) / <alpha-value>)", glow: "#C4A1FF" },
        iris: { DEFAULT: "#1F1F1D", glow: "#C4A1FF" },
        gold: { DEFAULT: "#8B41FB", glow: "#C4A1FF" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1152px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 20px 50px -30px rgba(0,0,0,0.8)",
        "card-hover": "0 2px 6px rgba(0,0,0,0.5), 0 30px 60px -28px rgba(0,0,0,0.9)",
        "btn-ink": "0 12px 28px -12px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0.3", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseNode: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.2)" },
        },
        // Travelling gradient for the ShineBorder card stroke.
        shine: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        node: "pulseNode 2.8s ease-in-out infinite",
        shine: "shine var(--duration) infinite linear",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
