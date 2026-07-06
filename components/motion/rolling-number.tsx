"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface DigitColumnProps {
  digit: string;
  duration: number;
  delay: number;
  active: boolean;
}

function DigitColumn({ digit, duration, delay, active }: DigitColumnProps) {
  const reduced = useReducedMotion();
  const target = parseInt(digit, 10);

  if (Number.isNaN(target)) {
    return <span className="inline-block">{digit}</span>;
  }

  if (reduced) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
    >
      <motion.span
        className="flex flex-col"
        initial={{ y: "0%" }}
        animate={active ? { y: `${-target * 10}%` } : { y: "0%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ willChange: "transform" }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block tabular-nums">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export interface RollingNumberProps {
  value: string | number;
  className?: string;
  duration?: number;
  delay?: number;
}

export function RollingNumber({
  value,
  className,
  duration = 1.4,
  delay = 0
}: RollingNumberProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const chars = String(value).split("");

  return (
    <span ref={ref} className={cn("inline-flex items-end", className)}>
      {chars.map((c, i) => (
        <DigitColumn
          key={`${i}-${c}`}
          digit={c}
          duration={duration}
          delay={delay + i * 0.08}
          active={inView}
        />
      ))}
    </span>
  );
}
