"use client";

import { motion } from "framer-motion";
import { Target, Zap, ShieldCheck } from "lucide-react";
import SectionTag from "./SectionTag";

const PILLARS = [
  {
    icon: Target,
    title: "A medida, no genérico",
    text: "Cada sistema se construye alrededor de cómo trabaja realmente tu negocio, no al revés.",
  },
  {
    icon: Zap,
    title: "Automatización real",
    text: "WhatsApp e IA conectados a tu operación diaria: reservas, cobros, avisos y reportes sin intervención manual.",
  },
  {
    icon: ShieldCheck,
    title: "Soporte cercano",
    text: "Trato directo con quien desarrolla el sistema. Sin tickets perdidos ni intermediarios.",
  },
];

export default function About() {
  return (
    <section id="sobre-nosotros" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Sobre NEXUS Dev</SectionTag>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Construimos la infraestructura digital que tu negocio necesitaba
              hace tiempo
            </h2>
            <p className="mt-6 max-w-xl font-body text-ink-muted">
              NEXUS Dev nace para cerrar una brecha muy concreta: las PyMEs y
              negocios locales argentinos siguen gestionándose con planillas,
              cuadernos y mensajes manuales de WhatsApp. Diseñamos sistemas de
              gestión propios y automatizaciones inteligentes que ordenan esa
              operación desde el primer día, sin depender de software
              genérico que no entiende tu rubro.
            </p>
            <p className="mt-4 max-w-xl font-body text-ink-muted">
              Nuestra misión es simple: que cada negocio local tenga acceso a
              la misma tecnología que usan las grandes cadenas, pero pensada
              a su escala y a su presupuesto.
            </p>
          </motion.div>

          <div className="space-y-5">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-nexus-green/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-void text-nexus-green transition-colors group-hover:border-nexus-green/50">
                  <pillar.icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 font-body text-sm text-ink-muted">
                    {pillar.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-28 slash-divider" />
    </section>
  );
}
