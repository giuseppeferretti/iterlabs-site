"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export interface NavPillLink {
  href: string;
  label: string;
}

export interface NavPillProps {
  logo: React.ReactNode;
  links: NavPillLink[];
  cta?: { href: string; label: string };
  phone?: string;
}

export function NavPill({ logo, links, cta, phone }: NavPillProps) {
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  return (
    <motion.header
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-5"
    >
      <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5 pl-5 backdrop-blur-md md:gap-4 md:p-2 md:pl-6">
        <Link href="/" className="text-sm font-semibold tracking-wide text-white">
          {logo}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              aria-label={`Ligar ${phone}`}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
            </a>
          )}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {cta && (
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="pointer-events-auto absolute inset-x-4 top-20 rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {phone && (
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {phone}
              </a>
            )}
          </nav>
        </div>
      )}
    </motion.header>
  );
}
