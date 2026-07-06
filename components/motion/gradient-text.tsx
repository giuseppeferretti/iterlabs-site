"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  variant?: "primary" | "monochrome" | "warm";
  /**
   * Animate background-position to give the text a constantly shifting hue effect.
   * Defaults to true.
   */
  animate?: boolean;
}

const VARIANT: Record<NonNullable<GradientTextProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(110deg,hsl(var(--foreground)),hsl(var(--primary)),hsl(var(--foreground)))]",
  monochrome:
    "bg-[linear-gradient(110deg,hsl(var(--foreground)/0.4),hsl(var(--foreground)),hsl(var(--foreground)/0.4))]",
  warm:
    "bg-[linear-gradient(110deg,hsl(var(--primary)),hsl(35_100%_60%),hsl(var(--primary)))]"
};

export function GradientText({
  children,
  as: Tag = "span",
  className,
  variant = "primary",
  animate = true
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-clip-text text-transparent [-webkit-background-clip:text]",
        "bg-[length:200%_100%] bg-[position:0%_50%]",
        VARIANT[variant],
        animate && "animate-[gradient-shift_8s_ease-in-out_infinite]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
