import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)",
        DEFAULT: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)"
      },
      transitionTimingFunction: {
        "out-smooth": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "underline-reveal": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left center" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left center" }
        },
        "mask-reveal-up": {
          "0%": { clipPath: "inset(100% 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" }
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.5)" },
          "50%": { boxShadow: "0 0 32px 6px hsl(var(--primary) / 0.35)" }
        }
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        "marquee-x-slow": "marquee-x 60s linear infinite",
        "marquee-x-fast": "marquee-x 24s linear infinite",
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "underline-reveal": "underline-reveal 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "mask-reveal-up": "mask-reveal-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gradient-shift": "gradient-shift 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
