"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: any; // 👈 Cambiado de (typeof translations)["es"] a any para evitar el error de tipado estricto
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nexus-dev-lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && stored in translations) return stored;
  const nav = window.navigator.language.slice(0, 2);
  if (nav === "pt") return "pt";
  if (nav === "en") return "en";
  return "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "es" ? "es-AR" : next === "pt" ? "pt-BR" : "en";
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "es" ? "es-AR" : lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}