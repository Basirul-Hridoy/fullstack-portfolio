import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020711",
        foreground: "#FFFFFF",
        accent: "#168BFF",
        muted: "#94A3B8",
        secondary: "#071426",
        tertiary: "#0B1B31",
        glass: "rgba(255 255 255 / 4%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
