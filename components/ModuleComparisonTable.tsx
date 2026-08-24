"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ChevronDown, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Project } from "./Projects";
import { MODULE_MATRIX, MODULE_MATRIX_ORDER } from "@/lib/moduleMatrix";

export default function ModuleComparisonTable({ products }: { products: Project[] }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  // products viene en el mismo orden que MODULE_MATRIX_ORDER (ver PRODUCTS_META en Projects.tsx)
  const columns = MODULE_MATRIX_ORDER.map((key, i) => ({
    key,
    product: products[i],
    values: MODULE_MATRIX[key],
  })).filter((c) => c.product);

  return (
    <div className="mb-10">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor-hover
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-nexus-green"
      >
        <LayoutGrid size={14} />
        {open ? t.products.comparisonHide : t.products.comparisonShow}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface/60">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="w-56 px-4 py-3 font-mono text-[11px] font-normal text-ink-dim">
                      {" "}
                    </th>
                    {columns.map(({ product }) => (
                      <th key={product.name} className="px-3 py-3 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <product.icon size={16} strokeWidth={1.8} className="text-ink-muted" />
                          <span className="font-mono text-[11px] text-ink-muted">
                            {product.name.replace("Nexus ", "")}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.products.comparisonRows.map((row, rowIdx) => (
                    <tr key={row} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3 font-body text-xs text-ink-muted">{row}</td>
                      {columns.map(({ product, values }) => (
                        <td key={product.name} className="px-3 py-3 text-center">
                          {values[rowIdx] ? (
                            <Check size={15} className="mx-auto text-nexus-green" strokeWidth={2.5} />
                          ) : (
                            <Minus size={13} className="mx-auto text-ink-dim/50" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
