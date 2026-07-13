"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

const ROW_1 = [
  { emoji: "🌐", label: "HTML5" },
  { emoji: "🎨", label: "CSS3" },
  { emoji: "⚡", label: "JavaScript" },
  { emoji: "🐘", label: "PHP" },
  { emoji: "🗄️", label: "MySQL" },
  { emoji: "🤖", label: "n8n" },
  { emoji: "📱", label: "Evolution API" },
  { emoji: "🧠", label: "IA / LLMs" },
  { emoji: "⚛️", label: "Next.js" },
  { emoji: "📐", label: "Tailwind CSS" },
];

const ROW_2 = [
  { emoji: "🔧", label: "Git & GitHub" },
  { emoji: "🎯", label: "UI/UX Design" },
  { emoji: "🔄", label: "Automatizaciones" },
  { emoji: "💬", label: "WhatsApp API" },
  { emoji: "📊", label: "Bases de datos" },
  { emoji: "🚀", label: "Despliegue VPS" },
  { emoji: "✨", label: "Claude AI" },
  { emoji: "🛠️", label: "APIs REST" },
  { emoji: "🔷", label: "TypeScript" },
  { emoji: "⚛️", label: "React" },
];

function MarqueeRow({
  items,
  reverse = false,
  duration = 28,
}: {
  items: { emoji: string; label: string }[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-4 py-2 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-5 py-3 font-mono text-sm text-ink-muted transition-colors hover:border-nexus-green/40 hover:text-ink"
          >
            <span className="text-base">{tech.emoji}</span>
            {tech.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tecnologias" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionTag>Stack tecnológico</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Herramientas elegidas por confiabilidad, no por moda
          </h2>
        </motion.div>
      </div>

      <div className="relative space-y-4 border-y border-line py-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
        <MarqueeRow items={ROW_1} duration={30} />
        <MarqueeRow items={ROW_2} reverse duration={24} />
      </div>
    </section>
  );
}
