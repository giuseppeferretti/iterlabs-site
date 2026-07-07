import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/motion/ambient-background";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { NoiseOverlay } from "@/components/motion/noise-overlay";
import { fontClasses } from "@/lib/fonts";
import { getDictionary } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const dict = getDictionary("pt");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: dict.meta.title,
    template: dict.meta.titleTemplate
  },
  description: dict.meta.description
};

export default function PtRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={dict.htmlLang} suppressHydrationWarning className={fontClasses}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AmbientBackground />
          <NoiseOverlay opacity={0.05} />
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
