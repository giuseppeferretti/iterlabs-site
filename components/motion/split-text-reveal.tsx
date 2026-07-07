"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  /** Trecho de `text` renderizado com classe de acento (gradiente da marca). */
  accent?: string;
  accentClassName?: string;
}

interface Token {
  value: string;
  space: boolean;
  accented: boolean;
}

function tokenize(text: string, accent?: string): Token[] {
  const start = accent ? text.indexOf(accent) : -1;
  const end = start >= 0 && accent ? start + accent.length : -1;
  const tokens: Token[] = [];
  let offset = 0;
  for (const part of text.split(/(\s+)/)) {
    const isSpace = /^\s+$/.test(part);
    tokens.push({
      value: part,
      space: isSpace,
      accented: !isSpace && start >= 0 && offset >= start && offset < end
    });
    offset += part.length;
  }
  return tokens;
}

/**
 * Headline cinética: cada palavra sobe de trás de uma máscara overflow-hidden.
 * O gatilho observa o CONTAINER (useInView no Tag) - observar a própria palavra
 * clipada nunca dispara o IntersectionObserver (área de interseção vazia).
 */
export function SplitTextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  once = true,
  accent,
  accentClassName = "text-accent-grad"
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once, margin: "-80px" });
  const tokens = React.useMemo(() => tokenize(text, accent), [text, accent]);

  if (reduced) {
    return (
      <Tag className={className}>
        {tokens.map((t, i) =>
          t.accented ? (
            <span key={i} className={accentClassName}>
              {t.value}
            </span>
          ) : (
            <React.Fragment key={i}>{t.value}</React.Fragment>
          )
        )}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {tokens.map((t, i) => {
          if (t.space) return <span key={i}>{t.value}</span>;
          return (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={cn("inline-block will-change-transform", t.accented && accentClassName)}
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : { y: "110%" }}
                transition={{
                  duration,
                  delay: delay + (i / 2) * stagger,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {t.value}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
