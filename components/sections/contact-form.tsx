"use client";

import * as React from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";

export interface ContactFormProps {
  id?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  email?: string;
  phone?: string;
  submitLabel?: string;
}

export function ContactForm({
  id,
  eyebrow,
  headline,
  subheadline,
  email,
  phone,
  submitLabel = "Enviar"
}: ContactFormProps) {
  const [submitted, setSubmitted] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id={id} className="section bg-muted/30 border-t border-border">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal as="div">
            {eyebrow && <div className="eyebrow mb-4 text-muted-foreground">{eyebrow}</div>}
            <h2 className="h2 text-balance">{headline}</h2>
            {subheadline && <p className="body-lg mt-6 text-muted-foreground text-balance">{subheadline}</p>}

            {(email || phone) && (
              <ul className="mt-10 space-y-4">
                {email && (
                  <li className="group flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" strokeWidth={1.75} />
                    <a
                      href={`mailto:${email}`}
                      className="relative inline-block py-0.5 transition-colors hover:text-primary"
                    >
                      {email}
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                )}
                {phone && (
                  <li className="group flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} />
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="relative inline-block py-0.5 transition-colors hover:text-primary"
                    >
                      {phone}
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                )}
              </ul>
            )}
          </Reveal>

          <Reveal as="div" delay={0.15}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="label">Nome</label>
                <Input id="name" name="name" required placeholder="Seu nome" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="label">E-mail</label>
                <Input id="email" name="email" type="email" required placeholder="voce@empresa.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="label">Mensagem</label>
                <Textarea id="message" name="message" required placeholder="Como podemos ajudar?" />
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-2 self-start transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
              >
                {submitted ? "Recebido" : submitLabel}
              </Button>
              {submitted && (
                <p className="text-sm text-muted-foreground">
                  Mensagem registrada localmente. Conecte um endpoint real em <code className="rounded bg-muted px-1 py-0.5">.env</code>.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
