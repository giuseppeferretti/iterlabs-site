"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollIndicator - indicador minimal no fim do hero. Linha vertical
 * pulsando + "ROLE" mono uppercase. Some opacity 1→0 conforme o user
 * faz os primeiros 10% do scroll. Hidden no mobile.
 *
 * Uso: dentro do hero, posicionado absolute bottom-6 left-1/2.
 *   <ScrollIndicator />
 *
 * Customização rara: label, mas o default "Role" é convenção da skill.
 */
export function ScrollIndicator({
  label = "Role",
  className
}: {
  label?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Some nos primeiros 10% do scroll (típico = uma fração do hero pin)
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 0.6, 0]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/40 md:flex",
          className
        )}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.32em]">{label}</span>
        <div className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className={cn(
        "pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/40 md:flex",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[10px] uppercase tracking-[0.32em]"
      >
        {label}
      </motion.span>
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent"
        animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}
