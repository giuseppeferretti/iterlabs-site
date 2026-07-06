import { CAL_URL, EMAIL, GITHUB_URL, type Locale } from "@/lib/site";

/**
 * All site copy lives here as typed constants — no CMS, no MDX.
 * Two flat dictionaries (EN default, PT at /pt) with identical shape.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface ApproachItem {
  body: string;
  link?: LinkItem;
}

export interface CaseStudy {
  slug: string;
  /** Short tag shown on the home card, e.g. "Client work · RPA". */
  tag: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  clientLine: string;
  metaTitle: string;
  metaDescription: string;
  problem: string[];
  approach: ApproachItem[];
  results: {
    stats: Stat[];
    note?: string;
  };
  links?: LinkItem[];
  authorizationNote?: string;
}

export interface Dictionary {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
  };
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    bookCall: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    theme: { toggle: string; light: string; dark: string; system: string };
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
  };
  metrics: Stat[];
  work: {
    eyebrow: string;
    heading: string;
    readCase: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    facts: string[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    emailLabel: string;
    github: LinkItem;
  };
  footer: {
    tagline: string;
    copyright: string;
    linksTitle: string;
    pagesTitle: string;
  };
  casePage: {
    back: string;
    problemHeading: string;
    approachHeading: string;
    resultsHeading: string;
    linksHeading: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
    ctaEmail: string;
  };
  cases: CaseStudy[];
}

/* ============================================================
   ENGLISH — default locale, no route prefix
   ============================================================ */

const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Giuseppe Ferretti — AI Automation Engineer",
    titleTemplate: "%s — Iter Labs",
    description:
      "I automate the systems that don't have APIs. Production RPA, AI agents, and offline private AI for businesses running on legacy software."
  },
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    contact: "Contact",
    bookCall: "Book a call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    theme: { toggle: "Toggle theme", light: "Light", dark: "Dark", system: "System" }
  },
  hero: {
    eyebrow: "Giuseppe Ferretti — AI Automation Engineer",
    headline: "I automate the systems that don't have APIs.",
    subheadline:
      "Production RPA, AI agents, and offline private AI for businesses running on legacy software.",
    primaryCta: { label: "Book a 20-minute intro call", href: CAL_URL },
    secondaryCta: { label: EMAIL, href: `mailto:${EMAIL}` }
  },
  metrics: [
    { value: "295/300", label: "records — one unattended batch" },
    { value: "~4s", label: "per record on bulk operations" },
    { value: "15,264", label: "chunks — 100% offline RAG" },
    { value: "~$0.01", label: "per natural-language operation" }
  ],
  work: {
    eyebrow: "Selected work",
    heading: "Systems shipped, numbers included.",
    readCase: "Read the case"
  },
  services: {
    eyebrow: "Services",
    heading: "Three ways I remove manual work.",
    items: [
      {
        title: "Legacy-system automation",
        body: "Browser agents via CDP — no API needed. Playwright attaches to a real, logged-in session, so SSO and 2FA stay with the human and the bot works the same screens your team does."
      },
      {
        title: "AI agent orchestration",
        body: "Production-grade agent fleets: slot leases, fencing tokens, and audit trails. Multiple bots share one constrained resource without conflicts — and every action is traceable."
      },
      {
        title: "Private offline AI",
        body: "RAG that never leaves the building. Local embeddings, hybrid vector and full-text search on SQLite, idempotent syncs — for data that can't touch the cloud."
      }
    ]
  },
  about: {
    eyebrow: "About",
    heading: "Direct, technical, accountable.",
    paragraphs: [
      "I'm Giuseppe Ferretti, founder of Iter Labs. Before this I was a Project Manager at Falconi, a Brazilian management consultancy (2023–2025), where I ran delivery for demanding clients.",
      "I ship through AI-assisted development (Claude Code) — I own architecture, verification, and operations. What leaves my desk has been run, measured, and rolled back at least once."
    ],
    facts: [
      "Founder, Iter Labs",
      "Ex-Project Manager, Falconi (2023–2025)",
      "Law degree in conclusion (Dec 2026)",
      "MIT xPRO — project management",
      "Languages: English, Portuguese, German, Spanish"
    ]
  },
  contact: {
    eyebrow: "Contact",
    heading: "Have a system nobody wants to key data into?",
    body: "Tell me what your team still does by hand. If it can be automated safely, I'll tell you how — and if it can't, I'll tell you that too.",
    emailLabel: "Write to",
    github: { label: "github.com/giuseppeferretti", href: GITHUB_URL }
  },
  footer: {
    tagline: "I automate the systems that don't have APIs.",
    copyright: "© 2026 Iter Labs — Giuseppe Ferretti.",
    linksTitle: "Elsewhere",
    pagesTitle: "Work"
  },
  casePage: {
    back: "All work",
    problemHeading: "Problem",
    approachHeading: "Approach",
    resultsHeading: "Results",
    linksHeading: "Links",
    ctaHeading: "Want results like these?",
    ctaBody: "A 20-minute call is enough to tell whether your process can be automated — and what it would take.",
    ctaButton: "Book a 20-minute intro call",
    ctaEmail: `or email ${EMAIL}`
  },
  cases: [
    {
      slug: "erp-automation",
      tag: "Client work · RPA",
      cardTitle: "ERP automation with no API",
      cardSummary:
        "Browser agents operate a construction-industry ERP through the user's own logged-in session — 295/300 records in one unattended batch.",
      title: "ERP automation with no API",
      clientLine:
        "Client: a mid-size engineering company in Brazil · System: a construction-industry ERP",
      metaTitle: "ERP automation with no API",
      metaDescription:
        "Browser agents via CDP automate a construction-industry ERP with no usable API: 295/300 records in one unattended batch, ~4s per record, zero session conflicts.",
      problem: [
        "The client's back office keyed hundreds of invoices by hand — twice per record — into a construction-industry ERP. The ERP has no usable API for this work.",
        "Three constraints ruled out standard tooling: the ERP sits behind SSO with 2FA; every bot has to share a single licensed session; and a wrong entry lands directly in the company's books."
      ],
      approach: [
        {
          body: "Playwright attaches to the user's already-logged-in browser via CDP. No stored credentials, no session cloning — SSO and 2FA stay with the human.",
          link: {
            label: "github.com/giuseppeferretti/cdp-attach-kit",
            href: "https://github.com/giuseppeferretti/cdp-attach-kit"
          }
        },
        {
          body: "A schema-driven CRUD engine describes each screen as data: 88 screen schemas across 12 ERP modules and 5 distinct UI paradigms, with atomic create → validate → delete rollback on every write."
        },
        {
          body: "The bot fleet is serialized by an orchestrator using slot leases and fencing tokens, so concurrent jobs never fight over the single licensed session.",
          link: {
            label: "github.com/giuseppeferretti/rpa-maestro",
            href: "https://github.com/giuseppeferretti/rpa-maestro"
          }
        },
        {
          body: "A natural-language command bridge lets operators trigger and steer batches in plain language, at ~$0.01 per operation."
        }
      ],
      results: {
        stats: [
          { value: "295/300", label: "records completed in one unattended batch" },
          { value: "312", label: "receivable titles created" },
          { value: "347", label: "bulk deletions at ~4s per record" },
          { value: "0", label: "session conflicts" }
        ]
      },
      authorizationNote:
        "Published with the client's written authorization; identifying details withheld."
    },
    {
      slug: "app-iter",
      tag: "Product · Desktop",
      cardTitle: "App Iter — bulk flight logging",
      cardSummary:
        "Pilots import an entire Excel logbook into Brazil's civil-aviation portal in one run — idempotent, inside their own browser.",
      title: "App Iter — bulk flight logging for pilots",
      clientLine: "Own product · Paid desktop app for pilots in Brazil",
      metaTitle: "App Iter — bulk flight logging for pilots",
      metaDescription:
        "A paid desktop product that bulk-imports Excel flight logbooks into Brazil's civil-aviation portal via CDP — idempotent by spreadsheet hashing, serverless licensing.",
      problem: [
        "Pilots in Brazil lose 30–90 minutes per week logging flights field-by-field in the civil-aviation authority's web portal. The portal has no import feature and no public API."
      ],
      approach: [
        {
          body: "A paid desktop product bulk-imports the pilot's Excel logbook via CDP, operating the portal inside the pilot's own logged-in browser — credentials never leave the machine."
        },
        {
          body: "Idempotency by spreadsheet hashing: every row is fingerprinted before submission, so re-running an import never duplicates records in a government system."
        },
        {
          body: "Serverless licensing: Supabase OTP sign-in plus a payment webhook that activates licenses — no backend servers to operate."
        }
      ],
      results: {
        stats: [
          { value: "30–90 min", label: "recovered per pilot, per week" },
          { value: "1 run", label: "imports an entire Excel logbook" },
          { value: "0", label: "duplicate government records — re-runs are safe by design" }
        ]
      },
      links: [
        {
          label: "github.com/giuseppeferretti/iter-anac",
          href: "https://github.com/giuseppeferretti/iter-anac"
        },
        { label: "app-anac.vercel.app", href: "https://app-anac.vercel.app" }
      ]
    },
    {
      slug: "offline-rag",
      tag: "Client work · Private AI",
      cardTitle: "100% offline RAG",
      cardSummary:
        "Years of institutional memory made searchable — 15,264 chunks indexed locally, zero cloud exposure.",
      title: "100% offline RAG over institutional memory",
      clientLine: "Client: a mid-size engineering firm · Constraint: no cloud AI",
      metaTitle: "100% offline RAG over institutional memory",
      metaDescription:
        "A fully local RAG stack — Ollama embeddings, SQLite with sqlite-vec and FTS5, RRF hybrid search — made 3,047 emails and 34 documents searchable with zero cloud exposure.",
      problem: [
        "Leadership couldn't query years of institutional memory scattered across mailboxes and documents — and cloud AI was off the table for confidentiality reasons."
      ],
      approach: [
        {
          body: "A 100% local RAG stack: Ollama embeddings, SQLite with sqlite-vec and FTS5, and RRF hybrid search combining vector and full-text retrieval."
        },
        {
          body: "An idempotent daily sync keeps the index current without re-processing anything that hasn't changed."
        },
        {
          body: "The search core is open source.",
          link: {
            label: "github.com/giuseppeferretti/sqlite-rag-mcp",
            href: "https://github.com/giuseppeferretti/sqlite-rag-mcp"
          }
        }
      ],
      results: {
        stats: [
          { value: "3,047", label: "emails ingested, plus 34 documents" },
          { value: "15,264", label: "chunks indexed" },
          { value: "4,498", label: "structured memories extracted" },
          { value: "0", label: "cloud exposure — everything runs on-premises" }
        ]
      },
      authorizationNote:
        "Published with the client's written authorization; identifying details withheld."
    },
    {
      slug: "iter-studio",
      tag: "Product · Pipeline",
      cardTitle: "Iter Studio — payment-to-delivery pipeline",
      cardSummary:
        "A payment webhook kicks off brand identity, a complete Next.js site, a human QA gate, and automated delivery — ~15 sites shipped.",
      title: "Iter Studio — payment-to-delivery website pipeline",
      clientLine: "Own product · Automated web-studio pipeline",
      metaTitle: "Iter Studio — payment-to-delivery website pipeline",
      metaDescription:
        "Payment webhook to delivered website: Claude subagents generate brand identity and a complete Next.js site on a proprietary design system, gated by human QA. ~15 sites shipped.",
      problem: [
        "Delivering a branded website per client traditionally means weeks of handoffs: briefing, identity, design, build, review. Iter Studio compresses that into a pipeline that starts the moment payment clears."
      ],
      approach: [
        {
          body: "An Asaas payment webhook issues a delivery token; the client submits a structured brief against it."
        },
        {
          body: "Claude subagents generate the brand identity and a complete Next.js site on a proprietary design system."
        },
        {
          body: "A human QA gate reviews every site before automated delivery — no unreviewed output reaches a client."
        }
      ],
      results: {
        stats: [
          { value: "~15", label: "sites shipped on the system" },
          { value: "1", label: "payment webhook kicks off the entire pipeline" },
          { value: "100%", label: "of deliveries pass a human QA gate" }
        ]
      }
    }
  ]
};

/* ============================================================
   PORTUGUÊS — em /pt
   ============================================================ */

const pt: Dictionary = {
  locale: "pt",
  htmlLang: "pt-BR",
  ogLocale: "pt_BR",
  meta: {
    title: "Giuseppe Ferretti — Engenheiro de Automação com IA",
    titleTemplate: "%s — Iter Labs",
    description:
      "Eu automatizo os sistemas que não têm API. RPA em produção, agentes de IA e IA privada offline para empresas que rodam em software legado."
  },
  nav: {
    work: "Projetos",
    services: "Serviços",
    about: "Sobre",
    contact: "Contato",
    bookCall: "Agendar conversa",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    switchLanguage: "Trocar idioma",
    theme: { toggle: "Alternar tema", light: "Claro", dark: "Escuro", system: "Sistema" }
  },
  hero: {
    eyebrow: "Giuseppe Ferretti — Engenheiro de Automação com IA",
    headline: "Eu automatizo os sistemas que não têm API.",
    subheadline:
      "RPA em produção, agentes de IA e IA privada offline para empresas que rodam em software legado.",
    primaryCta: { label: "Agende uma conversa de 20 minutos", href: CAL_URL },
    secondaryCta: { label: EMAIL, href: `mailto:${EMAIL}` }
  },
  metrics: [
    { value: "295/300", label: "registros — um lote sem supervisão" },
    { value: "~4s", label: "por registro em operações em massa" },
    { value: "15.264", label: "chunks — RAG 100% offline" },
    { value: "~US$ 0,01", label: "por operação em linguagem natural" }
  ],
  work: {
    eyebrow: "Projetos selecionados",
    heading: "Sistemas entregues, com números.",
    readCase: "Ler o case"
  },
  services: {
    eyebrow: "Serviços",
    heading: "Três formas de eliminar trabalho manual.",
    items: [
      {
        title: "Automação de sistemas legados",
        body: "Agentes de navegador via CDP — sem precisar de API. O Playwright se conecta a uma sessão real, já logada: SSO e 2FA ficam com o humano e o bot opera as mesmas telas que o seu time."
      },
      {
        title: "Orquestração de agentes de IA",
        body: "Frotas de agentes prontas para produção: slot leases, fencing tokens e trilhas de auditoria. Vários bots dividem um recurso restrito sem conflitos — e cada ação fica rastreável."
      },
      {
        title: "IA privada offline",
        body: "RAG que nunca sai do prédio. Embeddings locais, busca híbrida vetorial e full-text em SQLite, sincronização idempotente — para dados que não podem tocar a nuvem."
      }
    ]
  },
  about: {
    eyebrow: "Sobre",
    heading: "Direto, técnico, responsável.",
    paragraphs: [
      "Sou Giuseppe Ferretti, fundador da Iter Labs. Antes disso, fui Project Manager na Falconi, consultoria de gestão brasileira (2023–2025), conduzindo entregas para clientes exigentes.",
      "Eu entrego com desenvolvimento assistido por IA (Claude Code) — arquitetura, verificação e operação são responsabilidade minha. O que sai da minha mesa já foi executado, medido e revertido pelo menos uma vez."
    ],
    facts: [
      "Fundador, Iter Labs",
      "Ex-Project Manager, Falconi (2023–2025)",
      "Direito em conclusão (dez. 2026)",
      "MIT xPRO — gestão de projetos",
      "Idiomas: inglês, português, alemão, espanhol"
    ]
  },
  contact: {
    eyebrow: "Contato",
    heading: "Tem um sistema em que ninguém quer digitar dados?",
    body: "Me conte o que o seu time ainda faz à mão. Se der para automatizar com segurança, eu explico como — e se não der, eu digo isso também.",
    emailLabel: "Escreva para",
    github: { label: "github.com/giuseppeferretti", href: GITHUB_URL }
  },
  footer: {
    tagline: "Eu automatizo os sistemas que não têm API.",
    copyright: "© 2026 Iter Labs — Giuseppe Ferretti.",
    linksTitle: "Links",
    pagesTitle: "Projetos"
  },
  casePage: {
    back: "Todos os projetos",
    problemHeading: "Problema",
    approachHeading: "Abordagem",
    resultsHeading: "Resultados",
    linksHeading: "Links",
    ctaHeading: "Quer resultados assim?",
    ctaBody: "Uma conversa de 20 minutos basta para dizer se o seu processo pode ser automatizado — e o que seria necessário.",
    ctaButton: "Agende uma conversa de 20 minutos",
    ctaEmail: `ou escreva para ${EMAIL}`
  },
  cases: [
    {
      slug: "erp-automation",
      tag: "Projeto para cliente · RPA",
      cardTitle: "Automação de ERP sem API",
      cardSummary:
        "Agentes de navegador operam um ERP do setor de construção pela própria sessão logada do usuário — 295/300 registros em um lote sem supervisão.",
      title: "Automação de ERP sem API",
      clientLine:
        "Cliente: empresa de engenharia de médio porte no Brasil · Sistema: um ERP do setor de construção",
      metaTitle: "Automação de ERP sem API",
      metaDescription:
        "Agentes de navegador via CDP automatizam um ERP do setor de construção sem API utilizável: 295/300 registros em um lote sem supervisão, ~4s por registro, zero conflitos de sessão.",
      problem: [
        "O back-office do cliente digitava centenas de notas fiscais à mão — duas vezes por registro — em um ERP do setor de construção. O ERP não tem API utilizável para esse trabalho.",
        "Três restrições eliminavam as ferramentas usuais: o ERP fica atrás de SSO com 2FA; todos os bots precisam dividir uma única sessão licenciada; e um lançamento errado entra direto na contabilidade da empresa."
      ],
      approach: [
        {
          body: "O Playwright se conecta ao navegador já logado do usuário via CDP. Sem credenciais armazenadas, sem clonagem de sessão — SSO e 2FA continuam com o humano.",
          link: {
            label: "github.com/giuseppeferretti/cdp-attach-kit",
            href: "https://github.com/giuseppeferretti/cdp-attach-kit"
          }
        },
        {
          body: "Um motor de CRUD orientado a schemas descreve cada tela como dados: 88 schemas de tela em 12 módulos do ERP e 5 paradigmas de UI distintos, com rollback atômico criar → validar → excluir em toda escrita."
        },
        {
          body: "A frota de bots é serializada por um orquestrador com slot leases e fencing tokens — jobs concorrentes nunca disputam a única sessão licenciada.",
          link: {
            label: "github.com/giuseppeferretti/rpa-maestro",
            href: "https://github.com/giuseppeferretti/rpa-maestro"
          }
        },
        {
          body: "Uma ponte de comandos em linguagem natural permite disparar e conduzir lotes em texto simples, a ~US$ 0,01 por operação."
        }
      ],
      results: {
        stats: [
          { value: "295/300", label: "registros concluídos em um lote sem supervisão" },
          { value: "312", label: "títulos a receber criados" },
          { value: "347", label: "exclusões em massa a ~4s por registro" },
          { value: "0", label: "conflitos de sessão" }
        ]
      },
      authorizationNote:
        "Publicado com autorização por escrito do cliente; detalhes identificadores omitidos."
    },
    {
      slug: "app-iter",
      tag: "Produto · Desktop",
      cardTitle: "App Iter — registro de voos em massa",
      cardSummary:
        "Pilotos importam a caderneta inteira em Excel para o portal da aviação civil em uma execução — idempotente, no próprio navegador.",
      title: "App Iter — registro de voos em massa para pilotos",
      clientLine: "Produto próprio · App desktop pago para pilotos no Brasil",
      metaTitle: "App Iter — registro de voos em massa para pilotos",
      metaDescription:
        "Produto desktop pago que importa cadernetas de voo em Excel para o portal da aviação civil brasileira via CDP — idempotente por hashing de planilha, licenciamento serverless.",
      problem: [
        "Pilotos no Brasil perdem de 30 a 90 minutos por semana registrando voos campo a campo no portal da autoridade de aviação civil. O portal não tem importação nem API pública."
      ],
      approach: [
        {
          body: "Um produto desktop pago importa em massa a caderneta em Excel do piloto via CDP, operando o portal dentro do próprio navegador logado — as credenciais nunca saem da máquina."
        },
        {
          body: "Idempotência por hashing de planilha: cada linha recebe uma impressão digital antes do envio, então reexecutar uma importação nunca duplica registros em um sistema do governo."
        },
        {
          body: "Licenciamento serverless: login por OTP no Supabase e um webhook de pagamento que ativa licenças — sem servidores de backend para operar."
        }
      ],
      results: {
        stats: [
          { value: "30–90 min", label: "recuperados por piloto, por semana" },
          { value: "1 execução", label: "importa a caderneta inteira em Excel" },
          { value: "0", label: "registros duplicados no governo — reexecuções são seguras por design" }
        ]
      },
      links: [
        {
          label: "github.com/giuseppeferretti/iter-anac",
          href: "https://github.com/giuseppeferretti/iter-anac"
        },
        { label: "app-anac.vercel.app", href: "https://app-anac.vercel.app" }
      ]
    },
    {
      slug: "offline-rag",
      tag: "Projeto para cliente · IA privada",
      cardTitle: "RAG 100% offline",
      cardSummary:
        "Anos de memória institucional pesquisáveis — 15.264 chunks indexados localmente, zero exposição à nuvem.",
      title: "RAG 100% offline sobre memória institucional",
      clientLine: "Cliente: empresa de engenharia de médio porte · Restrição: nada de IA em nuvem",
      metaTitle: "RAG 100% offline sobre memória institucional",
      metaDescription:
        "Stack de RAG totalmente local — embeddings via Ollama, SQLite com sqlite-vec e FTS5, busca híbrida com RRF — tornou 3.047 e-mails e 34 documentos pesquisáveis com zero exposição à nuvem.",
      problem: [
        "A liderança não conseguia consultar anos de memória institucional espalhada por caixas de e-mail e documentos — e IA em nuvem estava fora de cogitação por confidencialidade."
      ],
      approach: [
        {
          body: "Um stack de RAG 100% local: embeddings via Ollama, SQLite com sqlite-vec e FTS5, e busca híbrida com RRF combinando recuperação vetorial e full-text."
        },
        {
          body: "Uma sincronização diária idempotente mantém o índice atualizado sem reprocessar o que não mudou."
        },
        {
          body: "O núcleo de busca é open source.",
          link: {
            label: "github.com/giuseppeferretti/sqlite-rag-mcp",
            href: "https://github.com/giuseppeferretti/sqlite-rag-mcp"
          }
        }
      ],
      results: {
        stats: [
          { value: "3.047", label: "e-mails ingeridos, mais 34 documentos" },
          { value: "15.264", label: "chunks indexados" },
          { value: "4.498", label: "memórias estruturadas extraídas" },
          { value: "0", label: "exposição à nuvem — tudo roda no local" }
        ]
      },
      authorizationNote:
        "Publicado com autorização por escrito do cliente; detalhes identificadores omitidos."
    },
    {
      slug: "iter-studio",
      tag: "Produto · Pipeline",
      cardTitle: "Iter Studio — pipeline pagamento-entrega",
      cardSummary:
        "Um webhook de pagamento dispara identidade de marca, um site Next.js completo, QA humano e entrega automatizada — ~15 sites entregues.",
      title: "Iter Studio — pipeline do pagamento à entrega de sites",
      clientLine: "Produto próprio · Pipeline automatizado de estúdio web",
      metaTitle: "Iter Studio — pipeline do pagamento à entrega de sites",
      metaDescription:
        "Do webhook de pagamento ao site entregue: subagentes Claude geram identidade de marca e um site Next.js completo em um design system proprietário, com QA humano. ~15 sites entregues.",
      problem: [
        "Entregar um site com marca para cada cliente costuma levar semanas de repasses: briefing, identidade, design, build, revisão. O Iter Studio comprime isso em um pipeline que começa no instante em que o pagamento é confirmado."
      ],
      approach: [
        {
          body: "Um webhook de pagamento do Asaas emite um token de entrega; o cliente envia um briefing estruturado vinculado a ele."
        },
        {
          body: "Subagentes Claude geram a identidade de marca e um site Next.js completo em um design system proprietário."
        },
        {
          body: "Um portão de QA humano revisa cada site antes da entrega automatizada — nenhuma saída sem revisão chega a um cliente."
        }
      ],
      results: {
        stats: [
          { value: "~15", label: "sites entregues no sistema" },
          { value: "1", label: "webhook de pagamento dispara o pipeline inteiro" },
          { value: "100%", label: "das entregas passam por QA humano" }
        ]
      }
    }
  ]
};

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const caseSlugs = en.cases.map((c) => c.slug);

export function getCase(locale: Locale, slug: string): CaseStudy | undefined {
  return dictionaries[locale].cases.find((c) => c.slug === slug);
}
