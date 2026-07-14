"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGS } from "@/lib/i18n/translations";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5 font-mono text-[11px] ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          data-cursor-hover
          aria-label={`Language: ${l.label}`}
          aria-pressed={lang === l.code}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l.code
              ? "bg-nexus-green text-void"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}
