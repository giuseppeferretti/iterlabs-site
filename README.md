# iterlabs-site

> Source of [portfolio.iterlabs.com.br](https://portfolio.iterlabs.com.br) — the bilingual (EN/PT) portfolio of **Giuseppe Ferretti**, AI Automation Engineer: production case studies with cinematic motion design.

**Live:** https://portfolio.iterlabs.com.br

---

## 🇺🇸 English

### What it is

The portfolio site behind portfolio.iterlabs.com.br. English-first with a full Portuguese mirror under `/pt`, four production case studies rendered as individual work pages, and a motion system built on scroll-driven pinning and staged reveals.

### Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS · shadcn/ui · `next-themes` (dark mode)
- GSAP 3 + ScrollTrigger (pin/scrub) · Framer Motion (reveals/stagger) · Lenis (smooth scroll)

### Structure

```
app/
  (en)/               # English routes (default): home + work/[slug]
  pt/                 # Portuguese mirror: home + work/[slug]
  sitemap.ts
components/
  home-page.tsx       # scene composition
  case-page.tsx       # case-study template
  motion/             # canonical motion primitives (reveal, split-text, mesh gradient, ...)
  sections/           # page sections
lib/                  # content and helpers
```

### Local development

```bash
npm install
cp .env.example .env.local   # optional: site URL / contact endpoint
npm run dev                  # http://localhost:3000
```

Motion rules for contributors live in [CLAUDE.md](CLAUDE.md) (ownership per library, timing/easing canon, pre-deploy audit scripts).

---

## 🇧🇷 Português

Código-fonte do [portfolio.iterlabs.com.br](https://portfolio.iterlabs.com.br) — portfólio bilíngue de Giuseppe Ferretti (inglês padrão, espelho completo em `/pt`), com estudos de caso de automação em produção e motion design cinematográfico (GSAP + Framer Motion + Lenis sobre Next.js 15).

```bash
npm install && npm run dev   # http://localhost:3000
```

Regras de motion para quem for editar: [CLAUDE.md](CLAUDE.md).

---

*Built with AI-assisted development; designed, verified, and operated by [Giuseppe Ferretti](https://github.com/giuseppeferretti).*
