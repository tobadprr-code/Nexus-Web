"use client";

import { motion } from "framer-motion";
import { Target, ClipboardList, Cog, Rocket } from "lucide-react";
import SectionTag from "./SectionTag";
import TiltCard from "./TiltCard";

const STEPS = [
  {
    n: "01",
    icon: Target,
    title: "Diagnóstico digital",
    text: "Analizamos juntos tu negocio y definimos qué digitalizar o automatizar primero para generar el mayor impacto.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Propuesta concreta",
    text: "Te enviamos un presupuesto detallado: qué incluye, cuánto tarda y cuánto cuesta. Precio fijo, sin sorpresas al final.",
  },
  {
    n: "03",
    icon: Cog,
    title: "Construcción y automatización",
    text: "Desarrollamos el sistema y configuramos las automatizaciones. Vas viendo el avance en tiempo real y podés pedir cambios.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Entrega y soporte",
    text: "Publicamos el sistema, te capacitamos para usarlo y seguimos disponibles para ajustes. Tu negocio funciona solo.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <SectionTag>Cómo trabajamos</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            De la idea al sistema, en días, no en meses
          </h2>
          <p className="mt-4 font-body text-ink-muted">
            Un proceso claro, sin sorpresas. Sabés qué se hace, cuándo y a qué
            costo desde el primer mensaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                data-cursor-hover
                className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 pt-10 transition-colors hover:border-nexus-green/40"
              >
                <span
                  className="pointer-events-none absolute -left-1 -top-3 select-none font-display text-6xl font-bold text-nexus-green/[0.07]"
                  aria-hidden
                >
                  {step.n}
                </span>
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void text-nexus-green">
                  <step.icon size={19} strokeWidth={1.8} />
                </div>
                <h3 className="relative z-10 mt-4 font-display text-lg font-medium text-ink">
                  {step.title}
                </h3>
                <p className="relative z-10 mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
