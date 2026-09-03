"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useProductFilter } from "@/lib/ProductFilterContext";
import { INDUSTRY_ICON, INDUSTRY_ACCENT, ACCENT_STYLES, type IndustryKey } from "@/lib/industries";

export default function BusinessSelector() {
  const { t } = useLanguage();
  const { filter, setFilter } = useProductFilter();

  // t.products.filters[0] es "all" (Todos) — acá solo mostramos rubros reales.
  const industries = t.products.filters.filter((f) => f.key !== "all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mt-11 rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-nexus-green" />
        <p className="font-mono text-xs text-ink">{t.hero.bizSelectorLabel}</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {industries.map((f, i) => {
          const key = f.key as IndustryKey;
          const Icon = INDUSTRY_ICON[key];
          const accent = ACCENT_STYLES[INDUSTRY_ACCENT[key]];
          const isActive = filter === key;

          return (
            <motion.a
              key={f.key}
              href="#proyectos"
              data-cursor-hover
              onClick={() => setFilter(key)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs transition-colors ${
                isActive
                  ? accent.ring
                  : `border-line bg-void text-ink-muted hover:text-ink ${accent.border}`
              }`}
            >
              <Icon size={13} strokeWidth={2} className={isActive ? "" : accent.text} />
              {f.label}
            </motion.a>
          );
        })}
      </div>

      <p className="mt-4 font-body text-xs text-ink-dim">{t.hero.bizSelectorHint}</p>
    </motion.div>
  );
}
