import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        cardForeground: "var(--card-foreground)",
        cardSecondaryForeground: "var(--card-secondary-foreground)",
        borderCard: "var(--card-border)",
        inProgress: "var(--in-progress)",
        todo: "var(--todo)",
        completed: "var(--completed)",
        priorityLow: "var(--priority-low)",
        priorityMedium: "var(--priority-medium)",
        priorityHigh: "var(--priority-high)",
      },
      keyframes: {
        fadeIn: {
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
