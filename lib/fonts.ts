import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Design system fonts - Fraunces (display serif) + Inter (body) + JetBrains Mono.
 * globals.css consumes var(--font-display), var(--font-sans), var(--font-mono).
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const fontClasses = `${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`;
