import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/template/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({ ".debug": { border: "1px solid red" } });
      addUtilities({ ".selected": { border: "3px solid green" } });
      addUtilities({ ".blackList": { border: "3px solid red" } });
    }),
  ],
} satisfies Config;
