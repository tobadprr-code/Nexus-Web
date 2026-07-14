"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.about, href: "#sobre-nosotros" },
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.projects, href: "#proyectos" },
    { label: t.nav.process, href: "#proceso" },
    { label: t.nav.team, href: "#equipo" },
    { label: t.nav.tech, href: "#tecnologias" },
    { label: t.nav.faq, href: "#preguntas" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass-panel shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center" data-cursor-hover>
            <Image
              src="/logo-full-dark.png"
              alt="NEXUS Dev"
              width={934}
              height={191}
              className="h-6 w-auto"
              priority
            />
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="font-mono text-[13px] text-ink-muted transition-colors hover:text-nexus-green"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:block" />
            <button
              onClick={() => setOpen(true)}
              data-cursor-hover
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink xl:hidden"
              aria-label="Abrir menú"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-void/97 backdrop-blur-xl xl:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Image src="/logo-full-dark.png" alt="NEXUS" width={934} height={191} className="h-5 w-auto" />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pt-2 sm:hidden">
              <LanguageSwitcher />
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-line py-3.5 font-display text-2xl text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
