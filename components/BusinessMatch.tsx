"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionTag from "./SectionTag";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useProductFilter } from "@/lib/ProductFilterContext";
import { buildWhatsAppUrl } from "@/lib/constants";
import { INDUSTRY_ICON, INDUSTRY_ACCENT, ACCENT_STYLES, type IndustryKey } from "@/lib/industries";
import { CALCULATOR_CONFIG } from "@/lib/calculatorConfig";

export default function BusinessMatch() {
  const { t } = useLanguage();
  const { setFilter } = useProductFilter();
  const bm = t.businessMatch;

  const [open, setOpen] = useState<IndustryKey | null>(null);
  const [values, setValues] = useState<Partial<Record<IndustryKey, number>>>({});

  // t.products.filters[0] es "all" — acá solo mostramos rubros reales.
  const industries = t.products.filters.filter((f) => f.key !== "all");

  const activeKey = open;
  const activeConfig = activeKey ? CALCULATOR_CONFIG[activeKey] : null;
  const activeValue = activeKey ? values[activeKey] ?? activeConfig!.default : 0;

  const hoursSaved = useMemo(() => {
    if (!activeKey || !activeConfig) return 0;
    return Math.round((activeValue * activeConfig.eventsPerMonth * activeConfig.minutesEach) / 60);
  }, [activeKey, activeConfig, activeValue]);

  const eventsCount = useMemo(() => {
    if (!activeKey || !activeConfig) return 0;
    return activeValue * activeConfig.eventsPerMonth;
  }, [activeKey, activeConfig, activeValue]);

  const scrollToProjects = (key: IndustryKey) => {
    setFilter(key);
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm sm:p-6"
        >
          <SectionTag>{bm.tag}</SectionTag>
          <h2 className="mt-2 text-balance font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {bm.heading}
          </h2>
          <p className="mt-2 font-body text-sm text-ink-muted">{bm.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {industries.map((f) => {
              const key = f.key as IndustryKey;
              const Icon = INDUSTRY_ICON[key];
              const accent = ACCENT_STYLES[INDUSTRY_ACCENT[key]];
              const isOpen = open === key;

              return (
                <button
                  key={f.key}
                  data-cursor-hover
                  onClick={() => setOpen(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs transition-colors ${
                    isOpen
                      ? accent.ring
                      : `border-line bg-void text-ink-muted hover:text-ink ${accent.border}`
                  }`}
                >
                  <Icon size={13} strokeWidth={2} className={isOpen ? "" : accent.text} />
                  {f.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {activeKey && activeConfig && (
              <motion.div
                key={activeKey}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-xl border border-line bg-void p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-nexus-green" />
                    <p className="font-mono text-xs text-ink">{bm.calcHeading}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <label htmlFor="calc-slider" className="font-body text-sm text-ink-muted">
                      {activeValue} {bm.units[activeKey]}
                    </label>
                    <span className="font-mono text-[11px] text-ink-dim">
                      {activeConfig.min}–{activeConfig.max}
                    </span>
                  </div>
                  <input
                    id="calc-slider"
                    type="range"
                    min={activeConfig.min}
                    max={activeConfig.max}
                    step={activeConfig.step}
                    value={activeValue}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [activeKey]: Number(e.target.value) }))
                    }
                    className="mt-2 w-full accent-[#00ff9d]"
                  />

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-line bg-surface px-3.5 py-3">
                      <p className="font-display text-2xl font-semibold text-nexus-green">
                        {hoursSaved}
                      </p>
                      <p className="mt-0.5 font-body text-xs leading-snug text-ink-muted">
                        {bm.hoursLabel}
                      </p>
                    </div>
                    <div className="rounded-lg border border-line bg-surface px-3.5 py-3">
                      <p className="font-display text-2xl font-semibold text-ink">{eventsCount}</p>
                      <p className="mt-0.5 font-body text-xs leading-snug text-ink-muted">
                        {bm.events[activeKey]} · {bm.eventsLabel}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 font-body text-[11px] leading-snug text-ink-dim">
                    {bm.disclaimer}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => scrollToProjects(activeKey)}
                      data-cursor-hover
                      className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-nexus-green to-nexus-cyan px-4 py-2 font-mono text-xs font-medium text-void transition-transform hover:scale-105"
                    >
                      {bm.ctaViewSystems}
                      <ArrowRight size={13} />
                    </button>
                    <a
                      href={buildWhatsAppUrl(bm.whatsappMessage(bm.units[activeKey], hoursSaved))}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-nexus-green hover:text-nexus-green"
                    >
                      <FaWhatsapp size={13} />
                      {bm.ctaWhatsapp}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
