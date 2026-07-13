"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionTag from "./SectionTag";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, GITHUB_URL } from "@/lib/constants";

const BUSINESS_TYPES = [
  { label: "gimnasio", emoji: "🏋️" },
  { label: "remisería", emoji: "🚕" },
  { label: "kiosco", emoji: "🏪" },
  { label: "lavadero", emoji: "🚿" },
  { label: "negocio", emoji: "🚀" },
];

function RotatingBusiness() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BUSINESS_TYPES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex min-w-[7ch] items-baseline justify-center gap-2 align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={BUSINESS_TYPES[i].label}
          initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-baseline gap-2 whitespace-nowrap"
        >
          <span>{BUSINESS_TYPES[i].emoji}</span>
          <span className="bg-gradient-to-r from-nexus-green to-nexus-cyan bg-clip-text text-transparent">
            {BUSINESS_TYPES[i].label}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Reemplazar por integración real (API route / servicio de email)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contacto" className="relative py-28 sm:py-36">
      <div
        className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-nexus-green/[0.06] blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex justify-center">
            <SectionTag>Hablemos de tu negocio</SectionTag>
          </div>
          <h2 className="mx-auto flex flex-wrap items-baseline justify-center gap-x-3 text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Contanos qué necesita tu
            <RotatingBusiness />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance font-body text-ink-muted">
            Respondemos por WhatsApp en el día. Sin compromiso, sin letra
            chica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group flex items-center gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-nexus-green/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-nexus-green/10 text-nexus-green">
                <FaWhatsapp size={26} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink-dim">WhatsApp directo</p>
                <p className="mt-1 font-display text-lg text-ink">{WHATSAPP_DISPLAY}</p>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              data-cursor-hover
              className="group flex items-center gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-nexus-green/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-nexus-cyan/10 text-nexus-cyan">
                <SiGmail size={22} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink-dim">Email</p>
                <p className="mt-1 font-display text-lg text-ink">{EMAIL}</p>
              </div>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group flex items-center gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-nexus-green/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-nexus-purple/10 text-nexus-purple">
                <FaGithub size={24} />
              </div>
              <div>
                <p className="font-mono text-xs text-ink-dim">GitHub</p>
                <p className="mt-1 font-display text-lg text-ink">github.com/tobadprr-code</p>
              </div>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface p-8"
          >
            {sent ? (
              <div className="relative flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2;
                  const dist = 60 + (i % 3) * 14;
                  const colors = ["#00ff9d", "#00d9ff", "#a855f7"];
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist,
                        scale: 0,
                      }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
                      style={{ background: colors[i % colors.length] }}
                    />
                  );
                })}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                >
                  <CheckCircle2 size={40} className="text-nexus-green" />
                </motion.div>
                <p className="font-display text-xl text-ink">
                  Mensaje enviado
                </p>
                <p className="max-w-xs font-body text-sm text-ink-muted">
                  Gracias por escribirnos. Te respondemos a la brevedad.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs text-ink-muted">
                      Nombre
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs text-ink-muted">
                      Negocio
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de tu negocio"
                      className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs text-ink-muted">
                    Email o WhatsApp
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Dónde te contactamos"
                    className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs text-ink-muted">
                    Contanos sobre tu negocio
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Qué tipo de negocio tenés y qué te gustaría automatizar"
                    className="w-full resize-none rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor-hover
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-nexus-green to-nexus-cyan px-6 py-3.5 font-mono text-sm font-medium text-void transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Enviar mensaje"}
                  {!loading && <Send size={15} />}
                </button>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
