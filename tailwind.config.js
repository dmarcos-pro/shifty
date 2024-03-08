const { fontFamily } = require("tailwindcss/defaultTheme")

const colors = require("tailwindcss/colors")
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "32px",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: "var(--color-blue)",
          light: "var(--color-bluelight)",
        },
        deepblue: {
          DEFAULT: "var(--color-deepblue)",
          light: "var(--color-deepbluelight)",
        },
        green: {
          DEFAULT: "var(--color-green)",
          mint: "var(--color-mint)",
        },
        primary: {
          DEFAULT: "var(--color-blue)",
        },
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "30px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        title: ["Sora", "sans-serif"],
      },
      fontSize: {
        h1: ["6rem", "7rem"],
        h2: ["1.6rem", "2rem"],
        h3: ["1.2rem", "1.5rem"],
        base: ["1rem", "1.2rem"],
        xs: [".6rem", ".8rem"],
        sm: [".8rem", "1rem"],
        md: ["1.2rem", "1.5rem"],
        lg: ["1.5rem", "2rem"],
        xl: ["2rem", "2.5rem"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius)/2)",
        lg: "calc(var(--radius)*2)",
        50: "50px",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      transitionDelay: {
        2: ".2s",
        3: ".3s",
        4: ".4s",
        5: ".5s",
        6: ".6s",
        7: ".7s",
        8: ".8s",
        9: ".9s",
        10: "1s",
        12: "1.2s",
        15: "1.5s",
        20: "2s",
        25: "2.5s",
        30: "3s",
        35: "3.5s",
        40: "4s",
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
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
