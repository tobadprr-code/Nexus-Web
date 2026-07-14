"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionTag from "./SectionTag";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, GITHUB_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function RotatingBusiness() {
  const { t } = useLanguage();
  const words = t.contact.businessWords;
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
    const interval = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(interval);
  }, [words]);

  const current = words[i] ?? words[0];

  return (
    <span className="relative inline-flex min-w-[7ch] items-baseline justify-center gap-2 align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.label}
          initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-baseline gap-2 whitespace-nowrap"
        >
          <span>{current.emoji}</span>
          <span className="bg-gradient-to-r from-nexus-green to-nexus-cyan bg-clip-text text-transparent">
            {current.label}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          business: data.get("business"),
          contact: data.get("contact"),
          message: data.get("message"),
          company_website: data.get("company_website"),
          formRenderedAt: renderedAt.current,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || c.errorText);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMsg(c.errorText);
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="relative py-28 sm:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-nexus-green/[0.06] blur-[140px]"
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
            <SectionTag>{c.tag}</SectionTag>
          </div>
          <h2 className="mx-auto flex flex-wrap items-baseline justify-center gap-x-3 text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {c.headingPrefix}
            <RotatingBusiness />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance font-body text-ink-muted">
            {c.subtitle}
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
                <p className="font-mono text-xs text-ink-dim">{c.whatsappLabel}</p>
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
                <p className="font-mono text-xs text-ink-dim">{c.emailLabel}</p>
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
                <p className="font-mono text-xs text-ink-dim">{c.githubLabel}</p>
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
            {status === "sent" ? (
              <div
                role="status"
                aria-live="polite"
                className="relative flex h-full flex-col items-center justify-center gap-4 py-16 text-center"
              >
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
                <p className="font-display text-xl text-ink">{c.successTitle}</p>
                <p className="max-w-xs font-body text-sm text-ink-muted">{c.successText}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Honeypot field: hidden from real users, bots often fill it */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs text-ink-muted">
                      {c.formName}
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder={c.formNamePlaceholder}
                      className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs text-ink-muted">
                      {c.formBusiness}
                    </label>
                    <input
                      name="business"
                      type="text"
                      placeholder={c.formBusinessPlaceholder}
                      className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs text-ink-muted">
                    {c.formContact}
                  </label>
                  <input
                    required
                    name="contact"
                    type="text"
                    placeholder={c.formContactPlaceholder}
                    className="w-full rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs text-ink-muted">
                    {c.formMessage}
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder={c.formMessagePlaceholder}
                    className="w-full resize-none rounded-xl border border-line bg-void px-4 py-3 font-body text-sm text-ink placeholder:text-ink-dim focus:border-nexus-green"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-cursor-hover
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-nexus-green to-nexus-cyan px-6 py-3.5 font-mono text-sm font-medium text-void transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "loading" ? c.formSending : c.formSubmit}
                  {status !== "loading" && <Send size={15} />}
                </button>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
