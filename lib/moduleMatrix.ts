import type { IndustryKey } from "./industries";

// Grilla capacidad x producto, basada estrictamente en los highlights reales
// publicados de cada producto (ver lib/i18n/translations.ts → products.items).
// Filas, en el mismo orden que products.comparisonRows:
// 0: Notificaciones automáticas al cliente
// 1: Panel de gestión propio
// 2: Control de pagos o cobros
// 3: Reportes e indicadores
// 4: Roles y permisos de usuario
export const MODULE_MATRIX: Record<IndustryKey, boolean[]> = {
  fitness: [true, true, true, false, true],
  seguridad: [true, true, false, false, false],
  salud: [true, true, true, true, false],
  servicios: [true, true, true, false, false],
  finanzas: [false, true, true, true, false],
};

// Mismo orden que PRODUCTS_META en components/Projects.tsx
export const MODULE_MATRIX_ORDER: IndustryKey[] = [
  "fitness",
  "seguridad",
  "salud",
  "servicios",
  "finanzas",
];
