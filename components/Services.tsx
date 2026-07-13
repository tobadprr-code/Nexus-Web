"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  MessageSquareCode,
  BrainCircuit,
  BarChart3,
  Smartphone,
} from "lucide-react";
import SectionTag from "./SectionTag";
import TiltCard from "./TiltCard";

const SERVICES = [
  {
    icon: LayoutDashboard,
    title: "Sistemas de gestión personalizados",
    text: "Software a medida para administrar socios, turnos, stock, cobros y operación diaria, adaptado 100% a tu rubro.",
    accent: "green" as const,
  },
  {
    icon: Globe,
    title: "Diseño y desarrollo de páginas web",
    text: "Sitios institucionales, landing pages y portales de clientes con diseño moderno, rápidos y optimizados para convertir visitas en clientes.",
    accent: "cyan" as const,
  },
  {
    icon: MessageSquareCode,
    title: "Automatizaciones con WhatsApp",
    text: "Bots conversacionales que reservan turnos, cobran, responden consultas frecuentes y avisan vencimientos, sin que nadie lo escriba a mano.",
    accent: "purple" as const,
  },
  {
    icon: BrainCircuit,
    title: "Soluciones con IA",
    text: "Modelos de lenguaje y visión aplicados a tu negocio: clasificación de mensajes, respuestas inteligentes y detección automática de eventos.",
    accent: "purple" as const,
  },
  {
    icon: BarChart3,
    title: "Dashboards y reportes",
    text: "Paneles claros con la información que importa: ingresos, asistencia, stock crítico y métricas del negocio en tiempo real.",
    accent: "green" as const,
  },
  {
    icon: Smartphone,
    title: "Apps móviles a medida",
    text: "Aplicaciones para Android e iOS que conectan con tu sistema de gestión y con tus canales de venta.",
    accent: "cyan" as const,
  },
];

const ACCENT_MAP = {
  green: {
    text: "text-nexus-green",
    border: "hover:border-nexus-green/50",
    glow: "hover:shadow-glow",
    blob: "group-hover:bg-nexus-green/10",
  },
  cyan: {
    text: "text-nexus-cyan",
    border: "hover:border-nexus-cyan/50",
    glow: "hover:shadow-glow-cyan",
    blob: "group-hover:bg-nexus-cyan/10",
  },
  purple: {
    text: "text-nexus-purple",
    border: "hover:border-nexus-purple/50",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]",
    blob: "group-hover:bg-nexus-purple/10",
  },
};

export default function Services() {
  return (
    <section id="servicios" className="relative py-28 sm:py-36">
      <div
        className="pointer-events-none absolute right-[8%] top-10 h-[280px] w-[280px] rounded-full bg-nexus-cyan/[0.05] blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <SectionTag>Qué hacemos</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            De tu página web al sistema que la mueve por dentro
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const accent = ACCENT_MAP[service.accent];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <TiltCard
                  className={`group h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all hover:-translate-y-1.5 ${accent.border} ${accent.glow}`}
                  data-cursor-hover
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-transparent blur-2xl transition-colors duration-500 ${accent.blob}`}
                    aria-hidden
                  />
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-void ${accent.text}`}
                  >
                    <service.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-ink-muted">
                    {service.text}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
