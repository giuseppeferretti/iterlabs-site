"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccentWordsProps {
  text: string;
  highlights: string[];
  className?: string;
  highlightClassName?: string;
}

/**
 * Render a paragraph/headline where specific words are wrapped with an animated
 * primary-colored emphasis (color cycle + glow). Word matching is case-insensitive.
 */
export function AccentWords({
  text,
  highlights,
  className,
  highlightClassName
}: AccentWordsProps) {
  const tokens = React.useMemo(() => splitHighlight(text, highlights), [text, highlights]);

  return (
    <span className={className}>
      {tokens.map((t, i) =>
        t.highlight ? (
          <span
            key={i}
            className={cn(
              "relative inline-block bg-clip-text text-transparent [-webkit-background-clip:text]",
              "bg-[linear-gradient(110deg,hsl(var(--primary)),hsl(220_90%_70%),hsl(var(--primary)))]",
              "bg-[length:200%_100%] bg-[position:0%_50%]",
              "animate-[gradient-shift_5s_ease-in-out_infinite]",
              highlightClassName
            )}
          >
            {t.value}
          </span>
        ) : (
          <React.Fragment key={i}>{t.value}</React.Fragment>
        )
      )}
    </span>
  );
}

function splitHighlight(text: string, highlights: string[]) {
  if (!highlights.length) return [{ value: text, highlight: false }];
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  return text.split(re).map((value) => ({
    value,
    highlight: highlights.some((h) => h.toLowerCase() === value.toLowerCase())
  }));
}
