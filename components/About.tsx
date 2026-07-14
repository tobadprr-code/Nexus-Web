"use client";

import { motion } from "framer-motion";
import { Target, Zap, ShieldCheck } from "lucide-react";
import SectionTag from "./SectionTag";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS = [Target, Zap, ShieldCheck];

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

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
            <SectionTag>{a?.tag}</SectionTag>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {a?.heading}
            </h2>
            <p className="mt-6 max-w-xl font-body text-ink-muted">{a?.p1}</p>
            <p className="mt-4 max-w-xl font-body text-ink-muted">{a?.p2}</p>
          </motion.div>

          <div className="space-y-5">
            {a?.pillars?.map((pillar: any, i: number) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div
                  key={pillar?.title || i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-nexus-green/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-void text-nexus-green transition-colors group-hover:border-nexus-green/50">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink">
                      {pillar?.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm text-ink-muted">{pillar?.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-28 slash-divider" />
    </section>
  );
}