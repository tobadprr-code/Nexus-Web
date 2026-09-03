"use client";

import { motion } from "framer-motion";
import { Globe, Dumbbell, Eye, HeartPulse, Wrench, Wallet, Package } from "lucide-react";

const BRANCHES = [
  { icon: Globe, name: "Nexus Webs", accent: "text-nexus-cyan", border: "border-nexus-cyan/30" },
  { icon: Dumbbell, name: "Nexus Gym", accent: "text-nexus-green", border: "border-nexus-green/30" },
  { icon: Eye, name: "Nexus Secure", accent: "text-nexus-purple", border: "border-nexus-purple/30" },
  { icon: HeartPulse, name: "Nexus Kine", accent: "text-nexus-blue", border: "border-nexus-blue/30" },
  { icon: Wrench, name: "Nexus Repair", accent: "text-nexus-amber", border: "border-nexus-amber/30" },
  { icon: Wallet, name: "Nexus Finance", accent: "text-nexus-cyan", border: "border-nexus-cyan/30" },
  { icon: Package, name: "Nexus Importados", accent: "text-nexus-rose", border: "border-nexus-rose/30" },
];

export default function BrandTree() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center">
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

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`flex flex-col items-center gap-2 rounded-xl border ${b.border} bg-surface px-3 py-4 text-center`}
          >
            <b.icon size={18} className={b.accent} strokeWidth={1.8} />
            <p className="font-display text-xs font-medium text-ink sm:text-sm">{b.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
