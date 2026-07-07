import * as React from "react";
import { Marquee } from "@/components/motion/marquee";

/**
 * Faixa de stack/keywords - "respiro" entre o hero e o conteúdo
 * (gramática /osite: marquee CSS puro, mono uppercase, dot de acento).
 */
export function StackMarquee({ items }: { items: string[] }) {
  return (
    <section aria-label="Stack" className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-5">
      <Marquee speed="slow">
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground"
          >
            {item}
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-warmth/70" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
