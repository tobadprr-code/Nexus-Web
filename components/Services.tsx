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
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS = [LayoutDashboard, Globe, MessageSquareCode, BrainCircuit, BarChart3, Smartphone];
const ACCENTS = ["green", "cyan", "purple", "purple", "green", "cyan"] as const;

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
  const { t } = useLanguage();
  const s = t.services;

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
          <SectionTag>{s.tag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {s.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENT_MAP[ACCENTS[i % ACCENTS.length]];
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
                    <Icon size={22} strokeWidth={1.8} />
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
