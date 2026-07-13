"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/constants";
import ParticleField from "./ParticleField";
import InteractiveDemo from "./InteractiveDemo";
import MagneticButton from "./MagneticButton";
import Counter from "./Counter";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
    >
      <div className="absolute inset-0 grid-fade" aria-hidden />
      <ParticleField />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-nexus-green/[0.08] blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[5%] top-[30%] h-[320px] w-[320px] rounded-full bg-nexus-purple/[0.10] blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-nexus-green"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-nexus-green shadow-glow-sm" />
            Desarrollo de sistemas · Argentina
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance font-display text-[13vw] font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            Sistemas que{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-nexus-green to-nexus-cyan bg-clip-text text-transparent">
                automatizan
              </span>
            </span>{" "}
            tu negocio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance font-body text-lg text-ink-muted"
          >
            Páginas web, sistemas de gestión a medida y automatizaciones con
            WhatsApp e IA para gimnasios, remiserías, kioscos y lavaderos.
            Menos planillas, menos mensajes manuales, más tiempo para tu
            negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#proyectos"
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nexus-green to-nexus-cyan px-6 py-3.5 font-mono text-sm font-medium text-void"
            >
              Ver proyectos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-mono text-sm text-ink transition-colors hover:border-nexus-green hover:text-nexus-green"
            >
              <FaWhatsapp size={16} />
              Contactar
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs text-ink-dim"
          >
            <div>
              <span className="text-2xl font-display font-semibold text-ink">
                <Counter to={3} prefix="+" />
              </span>
              <p className="mt-1">sistemas en producción</p>
            </div>
            <div>
              <span className="text-2xl font-display font-semibold text-ink">24/7</span>
              <p className="mt-1">atención automatizada</p>
            </div>
            <div>
              <span className="text-2xl font-display font-semibold text-ink">
                <Counter to={100} suffix="%" />
              </span>
              <p className="mt-1">a medida del negocio</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex justify-center lg:justify-end"
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
}
