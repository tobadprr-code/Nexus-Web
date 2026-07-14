"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Car, Eye, type LucideIcon } from "lucide-react";
import SectionTag from "./SectionTag";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";
import BrandTree from "./BrandTree";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export type Project = {
  icon: LucideIcon;
  name: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  longDescription: string;
  highlights: readonly string[];
  process: readonly string[];
  tech: string[];
  accent: "green" | "cyan" | "purple";
  badge: string;
  images: string[];
  link?: string;
};

const PRODUCTS_META = [
  {
    icon: Dumbbell,
    statusColor: "text-nexus-green bg-nexus-green/10 border-nexus-green/20",
    tech: ["PHP", "MySQL", "JavaScript", "n8n", "Evolution API"],
    accent: "green" as const,
    images: ["/screenshots/nexus-gym-login.png", "/screenshots/nexus-gym-dashboard.png"],
  },
  {
    icon: Eye,
    statusColor: "text-nexus-purple bg-nexus-purple/10 border-nexus-purple/20",
    tech: ["YOLOv11n", "Visión por Computadora", "Telegram API", "CPU (sin GPU)"],
    accent: "purple" as const,
    images: ["/screenshots/nexus-secure-detection.png"],
  },
];

const WEBS_META = [
  {
    icon: Car,
    statusColor: "text-nexus-cyan bg-nexus-cyan/10 border-nexus-cyan/20",
    tech: ["HTML/CSS", "JavaScript", "WhatsApp API", "Trilingüe"],
    accent: "cyan" as const,
    images: ["/screenshots/yasi-travel-hero.png"],
    link: "https://sistema-remiseria-yasi-travel.vercel.app/",
  },
];

const ACCENT_MAP = {
  green: { text: "text-nexus-green", border: "hover:border-nexus-green/50", glow: "hover:shadow-glow" },
  cyan: { text: "text-nexus-cyan", border: "hover:border-nexus-cyan/50", glow: "hover:shadow-glow-cyan" },
  purple: { text: "text-nexus-purple", border: "hover:border-nexus-purple/50", glow: "hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]" },
};

function ProjectGrid({
  projects,
  onSelect,
  viewCase,
  columns = "lg:grid-cols-2",
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
  viewCase: string;
  columns?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${columns}`}>
      {projects.map((project, i) => {
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
              onClick={() => onSelect(project)}
              className={`group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-2 ${accent.border} ${accent.glow}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-void ${accent.text}`}
                >
                  <project.icon size={22} strokeWidth={1.8} />
                </div>
                <span className="rounded-full border border-line bg-void px-2.5 py-1 font-mono text-[10px] text-ink-dim">
                  {project.badge}
                </span>
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
                {project.tech.map((tItem) => (
                  <span
                    key={tItem}
                    className="rounded-full border border-line bg-void px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {tItem}
                  </span>
                ))}
              </div>

              <span className="mt-7 flex items-center gap-2 font-mono text-sm text-ink transition-colors group-hover:text-nexus-green">
                {viewCase}
                <ArrowUpRight size={14} />
              </span>
            </TiltCard>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);

  const PRODUCTS: Project[] = t.products.items.map((item, i) => ({
    ...item,
    ...PRODUCTS_META[i],
    badge: t.products.badge,
  }));

  const WEBS: Project[] = t.nexusWebs.items.map((item, i) => ({
    ...item,
    ...WEBS_META[i],
    badge: t.nexusWebs.badge,
  }));

  return (
    <section id="proyectos" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <BrandTree />
        </motion.div>

        {/* Nuestros productos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <SectionTag>{t.products.sectionTag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {t.products.heading}
          </h2>
          <p className="mt-4 font-body text-ink-muted">{t.products.subtitle}</p>
        </motion.div>

        <ProjectGrid projects={PRODUCTS} onSelect={setSelected} viewCase={t.products.viewCase} />

        <div className="my-20 slash-divider" />

        {/* Nexus Webs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <SectionTag>{t.nexusWebs.tag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {t.nexusWebs.heading}
          </h2>
          <p className="mt-4 font-body text-ink-muted">{t.nexusWebs.subtitle}</p>
        </motion.div>

        <ProjectGrid
          projects={WEBS}
          onSelect={setSelected}
          viewCase={t.nexusWebs.viewCase}
          columns="sm:grid-cols-2 lg:grid-cols-2"
        />
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
