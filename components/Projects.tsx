"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Car, Eye, type LucideIcon } from "lucide-react";
import SectionTag from "./SectionTag";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";

export type Project = {
  icon: LucideIcon;
  name: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  longDescription: string;
  highlights: string[];
  process: string[];
  tech: string[];
  accent: "green" | "cyan" | "purple";
  link?: string;
};

const PROJECTS: Project[] = [
  {
    icon: Dumbbell,
    name: "Sistema de gestión multi-gimnasio",
    category: "SaaS · Fitness & Wellness",
    status: "Completado",
    statusColor: "text-nexus-green bg-nexus-green/10 border-nexus-green/20",
    description:
      "Sistema inteligente para gimnasios: socios, membresías, vencimientos automáticos y recordatorios por WhatsApp vía n8n + Evolution API. Arquitectura multi-tenant con roles de super admin, dueño de gimnasio y personal.",
    longDescription:
      "Nace de un sistema real ya en uso en un gimnasio y lo evolucionamos a una arquitectura multi-tenant para poder venderlo como un único sistema que atiende a varios gimnasios a la vez, cada uno con sus propios datos, socios y personal.",
    highlights: [
      "Roles: super admin, dueño y personal",
      "Check-in y caja diaria",
      "Vencimientos automáticos",
      "Avisos por WhatsApp",
    ],
    process: [
      "Relevamos el flujo real del gimnasio: check-in, caja, vencimientos y avisos manuales por WhatsApp.",
      "Diseñamos una base de datos multi-tenant que separa los datos de cada gimnasio manteniendo un solo sistema.",
      "Construimos dashboards livianos, pensados primero para celular, ya que el dueño lo revisa desde ahí.",
      "Automatizamos vencimientos y solicitudes de pago en tiempo real vía n8n + WhatsApp.",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "n8n", "Evolution API"],
    accent: "green",
  },
  {
    icon: Car,
    name: "Yasí Travel",
    category: "Remisería · Triple Frontera",
    status: "Completado",
    statusColor: "text-nexus-cyan bg-nexus-cyan/10 border-nexus-cyan/20",
    description:
      "Landing page para remisería con calculadora inteligente de viajes, gestión de pedidos, WhatsApp integrado y soporte trilingüe (ES / PT / EN) pensado para el movimiento diario de la Triple Frontera.",
    longDescription:
      "Sitio para una remisería de la Triple Frontera, donde conviven pasajeros de Argentina, Brasil y Paraguay. El eje del proyecto fue una calculadora de viajes que estima precio y tiempo al instante, y un pedido que termina directo en WhatsApp, sin pasos intermedios.",
    highlights: [
      "Calculadora de tarifas al instante",
      "Pedido directo por WhatsApp",
      "Contenido en ES / PT / EN",
      "100% optimizado para mobile",
    ],
    process: [
      "Relevamos los recorridos y tarifas más frecuentes, como Wanda → Puerto Iguazú.",
      "Armamos una calculadora que estima precio y duración según origen y destino.",
      "Integramos el pedido final directo a WhatsApp, sin formularios largos.",
      "Tradujimos y adaptamos todo el contenido a español, portugués e inglés.",
    ],
    tech: ["HTML/CSS", "JavaScript", "WhatsApp API", "Trilingüe"],
    accent: "cyan",
    link: "https://sistema-remiseria-yasi-travel.vercel.app/",
  },
  {
    icon: Eye,
    name: "Securevision AI",
    category: "Videovigilancia · IA en tiempo real",
    status: "En desarrollo",
    statusColor: "text-nexus-purple bg-nexus-purple/10 border-nexus-purple/20",
    description:
      "🔒 Sistema de videovigilancia inteligente con IA. Detecta intrusiones, merodeadores y peleas en tiempo real usando YOLOv11n. Envía alertas instantáneas por Telegram con foto de evidencia. Corre en CPU, sin necesidad de GPU.",
    longDescription:
      "Proyecto propio de videovigilancia inteligente pensado para negocios locales: corre modelos de visión por computadora en tiempo real sobre cámaras ya existentes, sin depender de GPU ni de servicios en la nube costosos.",
    highlights: [
      "Detección de intrusos y merodeo",
      "Detección de peleas",
      "Alertas por Telegram con foto",
      "Corre en CPU, sin GPU",
    ],
    process: [
      "Ajustamos YOLOv11n para detectar personas y comportamientos de riesgo específicos.",
      "Optimizamos el modelo para que corra fluido en CPU, sin hardware costoso.",
      "Integramos alertas instantáneas por Telegram con foto de evidencia del momento exacto.",
      "En etapa de pruebas de campo en negocios locales antes del lanzamiento.",
    ],
    tech: ["YOLOv11n", "Visión por Computadora", "Telegram API", "CPU (sin GPU)"],
    accent: "purple",
  },
];

const ACCENT_MAP = {
  green: { text: "text-nexus-green", border: "hover:border-nexus-green/50", glow: "hover:shadow-glow" },
  cyan: { text: "text-nexus-cyan", border: "hover:border-nexus-cyan/50", glow: "hover:shadow-glow-cyan" },
  purple: { text: "text-nexus-purple", border: "hover:border-nexus-purple/50", glow: "hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]" },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="proyectos" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <SectionTag>Proyectos destacados</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Sistemas reales, en distintas etapas
          </h2>
          <p className="mt-4 font-body text-ink-muted">
            Hacé click en cualquier proyecto para ver cómo se construyó.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const accent = ACCENT_MAP[project.accent];
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
              >
                <TiltCard
                  data-cursor-hover
                  onClick={() => setSelected(project)}
                  className={`group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-2 ${accent.border} ${accent.glow}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-void ${accent.text}`}
                    >
                      <project.icon size={22} strokeWidth={1.8} />
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-ink-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2">
                    <p className={`font-mono text-xs ${accent.text}`}>{project.category}</p>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${project.statusColor}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-medium text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-void px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="mt-7 flex items-center gap-2 font-mono text-sm text-ink transition-colors group-hover:text-nexus-green">
                    Ver cómo se hizo
                    <ArrowUpRight size={14} />
                  </span>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
