"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionTag from "./SectionTag";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionTag>{f.tag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {f.heading}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {f?.items?.map((item: any, i: number) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor-hover
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-ink sm:text-lg">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-nexus-green"
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-body text-sm leading-relaxed text-ink-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
