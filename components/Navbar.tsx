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
<<<<<<< HEAD
=======
  const [active, setActive] = useState("top");
>>>>>>> origin/main

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

<<<<<<< HEAD
=======
  // Resalta en el nav la sección que está en el centro de la pantalla mientras se scrollea.
  useEffect(() => {
    const ids = ["top", ...NAV_LINKS.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className={`relative pb-1 font-mono text-[13px] transition-colors ${
                    isActive ? "text-nexus-green" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-nexus-green shadow-glow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
>>>>>>> origin/main
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
<<<<<<< HEAD
                  className="border-b border-line py-3.5 font-display text-2xl text-ink"
=======
                  className={`border-b border-line py-3.5 font-display text-2xl transition-colors ${
                    active === link.href.slice(1) ? "text-nexus-green" : "text-ink"
                  }`}
>>>>>>> origin/main
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
