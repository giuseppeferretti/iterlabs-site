"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export function SplitTextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  once = true
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => {
          if (/^\s+$/.test(word)) return <span key={i}>{word}</span>;
          return (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once, margin: "-80px" }}
                transition={{
                  duration,
                  delay: delay + (i / 2) * stagger,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
