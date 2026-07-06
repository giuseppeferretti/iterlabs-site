"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Tag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li"
  | "ul"
  | "ol"
  | "span"
  | "figure"
  | "figcaption"
  | "blockquote";

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  as?: Tag;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Reveal({
  as = "div",
  delay = 0,
  duration = 0.8,
  y = 60,
  once = true,
  className,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduced) {
    const Static = as as keyof React.JSX.IntrinsicElements;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
