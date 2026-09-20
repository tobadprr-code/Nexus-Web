import { Dumbbell, HeartPulse, Eye, Wrench, Wallet, type LucideIcon } from "lucide-react";

export type IndustryKey = "fitness" | "salud" | "seguridad" | "servicios" | "finanzas";

export type Accent = "green" | "cyan" | "purple" | "blue" | "amber" | "rose";

// Single source of truth para el mapeo rubro -> ícono/color.
// Usado tanto por los filtros de Projects.tsx como por el selector del Hero,
// para que el color/ícono de un rubro sea siempre el mismo en toda la página.
export const INDUSTRY_ICON: Record<IndustryKey, LucideIcon> = {
  fitness: Dumbbell,
  salud: HeartPulse,
  seguridad: Eye,
  servicios: Wrench,
  finanzas: Wallet,
};

export const INDUSTRY_ACCENT: Record<IndustryKey, Accent> = {
  fitness: "green",
  salud: "blue",
  seguridad: "purple",
  servicios: "amber",
  finanzas: "cyan",
};

export const ACCENT_STYLES: Record<Accent, { text: string; border: string; bg: string; ring: string }> = {
  green: {
    text: "text-nexus-green",
    border: "hover:border-nexus-green/60",
    bg: "bg-nexus-green/10",
    ring: "border-nexus-green bg-nexus-green/10 text-nexus-green",
  },
  cyan: {
    text: "text-nexus-cyan",
    border: "hover:border-nexus-cyan/60",
    bg: "bg-nexus-cyan/10",
    ring: "border-nexus-cyan bg-nexus-cyan/10 text-nexus-cyan",
  },
  purple: {
    text: "text-nexus-purple",
    border: "hover:border-nexus-purple/60",
    bg: "bg-nexus-purple/10",
    ring: "border-nexus-purple bg-nexus-purple/10 text-nexus-purple",
  },
  blue: {
    text: "text-nexus-blue",
    border: "hover:border-nexus-blue/60",
    bg: "bg-nexus-blue/10",
    ring: "border-nexus-blue bg-nexus-blue/10 text-nexus-blue",
  },
  amber: {
    text: "text-nexus-amber",
    border: "hover:border-nexus-amber/60",
    bg: "bg-nexus-amber/10",
    ring: "border-nexus-amber bg-nexus-amber/10 text-nexus-amber",
  },
  rose: {
    text: "text-nexus-rose",
    border: "hover:border-nexus-rose/60",
    bg: "bg-nexus-rose/10",
    ring: "border-nexus-rose bg-nexus-rose/10 text-nexus-rose",
  },
};
