import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Travel Smooth Brand Colors
        gold: {
          50: "#fefdf8",
          100: "#fef7e0",
          200: "#fdecc4",
          300: "#fbdc9c",
          400: "#f8c572",
          500: "#f4a853",
          600: "#e88c2d",
          700: "#c26d1f",
          800: "#9d5520",
          900: "#7f461e",
          950: "#44220c",
        },
        bronze: {
          50: "#faf8f5",
          100: "#f2ede4",
          200: "#e6d9c7",
          300: "#d4bfa1",
          400: "#c19f79",
          500: "#b3855e",
          600: "#a67152",
          700: "#8a5a46",
          800: "#704a3d",
          900: "#5c3e33",
          950: "#31201a",
        },
        cream: {
          50: "#fefefe",
          100: "#fefcf8",
          200: "#fdf8ed",
          300: "#fbf1dc",
          400: "#f7e6c4",
          500: "#f1d5a3",
          600: "#e8c082",
          700: "#dba560",
          800: "#c8904a",
          900: "#a6753e",
          950: "#5a3e20",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
