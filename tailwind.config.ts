import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#07080a",
        surface: "#0c0e11",
        "surface-2": "#12151a",
        line: "#1d222b",
        nexus: {
          green: "#00ff9d",
          "green-dim": "#0a8f5c",
          cyan: "#00d9ff",
          purple: "#a855f7",
        },
        ink: {
          DEFAULT: "#f2f4f2",
          muted: "#a3abb6",
          dim: "#767f8c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(0,255,157,0.45)",
        "glow-sm": "0 0 20px -6px rgba(0,255,157,0.5)",
        "glow-cyan": "0 0 40px -10px rgba(0,217,255,0.4)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
