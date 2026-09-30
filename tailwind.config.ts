import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores Canónicos de Luma Protect
        lumaBlue: "#1565D8",
        lumaBlueSoft: "#EAF4FF",
        lumaText: "#102A43",
        lumaSubtext: "#5C6B7A",
        lumaGreen: "#35B86B",
        lumaRed: "#FF5B5B",
        lumaOrange: "#FFA726",
        lumaBgTop: "#F7F9FC",
        lumaBgBottom: "#EEF5FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
