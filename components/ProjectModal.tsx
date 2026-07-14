"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Project } from "./Projects";

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl border-b border-line bg-void sm:-mx-8 sm:-mt-8">
      <div className="relative aspect-video w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${name} — captura ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              data-cursor-hover
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 text-ink backdrop-blur transition-colors hover:bg-nexus-green hover:text-void"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              data-cursor-hover
              aria-label="Siguiente imagen"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 text-ink backdrop-blur transition-colors hover:bg-nexus-green hover:text-void"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-nexus-green" : "w-1.5 bg-ink-dim/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const m = t.projectModal;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void/80 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-glow sm:p-8"
          >
            <ImageCarousel images={project.images} name={project.name} />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-void text-nexus-green">
                  <project.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-mono text-xs text-nexus-green">{project.category}</p>
                  <h3 className="font-display text-2xl font-medium text-ink">{project.name}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                data-cursor-hover
                aria-label="Cerrar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-nexus-green hover:text-nexus-green"
              >
                <X size={16} />
              </button>
            </div>

            <span
              className={`mt-5 inline-block rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${project.statusColor}`}
            >
              {project.status}
            </span>

            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-muted">
              {project.longDescription}
            </p>

            <div className="mt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-dim">
                {m.includes}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 rounded-lg border border-line bg-void px-3 py-2 font-body text-sm text-ink-muted"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-nexus-green" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-dim">
                {m.howWeBuilt}
              </p>
              <div className="space-y-3">
                {project.process.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-nexus-green/30 bg-nexus-green/10 font-mono text-[11px] text-nexus-green">
                      {i + 1}
                    </span>
                    <p className="font-body text-sm text-ink-muted">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tItem) => (
                <span
                  key={tItem}
                  className="rounded-full border border-line bg-void px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                >
                  {tItem}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nexus-green to-nexus-cyan px-5 py-3 font-mono text-sm font-medium text-void transition-transform hover:scale-105"
                >
                  {m.viewLive}
                  <ExternalLink size={15} />
                </a>
              )}
              <a
                href={buildWhatsAppUrl(m.whatsappMessage(project.name))}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-sm transition-colors ${
                  project.link
                    ? "border-line text-ink hover:border-nexus-green hover:text-nexus-green"
                    : "border-transparent bg-gradient-to-r from-nexus-green to-nexus-cyan text-void hover:scale-105"
                }`}
              >
                <FaWhatsapp size={16} />
                {m.wantOne}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
