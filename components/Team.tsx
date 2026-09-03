"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionTag from "./SectionTag";
import { WHATSAPP_URL, GITHUB_URL, LOCATION, EMAIL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Team() {
  const { t } = useLanguage();
  const team = t.team;

  return (
    <section id="equipo" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <SectionTag>{team.tag}</SectionTag>
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {team.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[280px_1fr]"
        >
          <div className="relative mx-auto aspect-square w-56 lg:w-full">
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nexus-green/25 via-transparent to-nexus-cyan/20 blur-2xl"
              aria-hidden
            />
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-void">
              <span className="font-display text-6xl font-semibold text-nexus-green">
                TB
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-nexus-green via-nexus-cyan to-nexus-purple" />
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-nexus-green">{team.role}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
              Tobias Britez
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-ink-dim">
              <MapPin size={13} />
              {LOCATION}
            </p>
            <p className="mt-4 max-w-xl font-body text-ink-muted">{team.bio1}</p>
            <p className="mt-4 max-w-xl font-body text-ink-muted">{team.bio2}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-nexus-green hover:text-nexus-green"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={17} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-nexus-green hover:text-nexus-green"
                aria-label="Email"
              >
                <SiGmail size={15} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-nexus-green hover:text-nexus-green"
                aria-label="GitHub"
              >
                <FaGithub size={17} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
