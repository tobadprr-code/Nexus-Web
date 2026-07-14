"use client";

import { motion } from "framer-motion";
import { Target, ClipboardList, Cog, Rocket } from "lucide-react";
import SectionTag from "./SectionTag";
import TiltCard from "./TiltCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS = [Target, ClipboardList, Cog, Rocket];

export default function Process() {
  const { t } = useLanguage();
  const p = t.process;

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
          <SectionTag>{p.tag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {p.heading}
          </h2>
          <p className="mt-4 font-body text-ink-muted">{p.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p?.steps?.map((step: any, i: number) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={step.title}
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
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void text-nexus-green">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                  <h3 className="relative z-10 mt-4 font-display text-lg font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="relative z-10 mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    {step.text}
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
