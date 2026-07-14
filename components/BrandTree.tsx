"use client";

import { motion } from "framer-motion";
import { Globe, Dumbbell, Eye } from "lucide-react";

const BRANCHES = [
  { icon: Globe, name: "Nexus Webs", text: "Páginas web para empresas", accent: "text-nexus-cyan", border: "border-nexus-cyan/30" },
  { icon: Dumbbell, name: "Nexus Gym", text: "SaaS para gimnasios", accent: "text-nexus-green", border: "border-nexus-green/30" },
  { icon: Eye, name: "Nexus Secure", text: "IA + seguridad", accent: "text-nexus-purple", border: "border-nexus-purple/30" },
];

export default function BrandTree() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-nexus-green/40 bg-surface px-5 py-2.5 font-display text-lg font-semibold text-ink shadow-glow-sm"
      >
        NEXUS
      </motion.div>

      <div className="relative h-8 w-px bg-line" />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`flex flex-col items-center gap-2 rounded-xl border ${b.border} bg-surface px-4 py-4 text-center`}
          >
            <b.icon size={20} className={b.accent} strokeWidth={1.8} />
            <p className="font-display text-sm font-medium text-ink">{b.name}</p>
            <p className="font-mono text-[10px] text-ink-dim">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
