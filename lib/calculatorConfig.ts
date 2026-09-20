import type { IndustryKey } from "./industries";

export type CalculatorParams = {
  min: number;
  max: number;
  default: number;
  step: number;
  // minutos de trabajo manual que Nexus ahorra por cada "evento" (aviso, recordatorio, revisión)
  minutesEach: number;
  // cuántos de esos eventos genera cada unidad (socio/paciente/cámara/etc) por mes
  eventsPerMonth: number;
};

// Números estimativos usados solo para dar una referencia visual en la calculadora
// del Hero — no son datos reales medidos, por eso siempre se muestran con el
// disclaimer "estimación aproximada" en la UI.
export const CALCULATOR_CONFIG: Record<IndustryKey, CalculatorParams> = {
  fitness: { min: 20, max: 500, default: 120, step: 10, minutesEach: 3, eventsPerMonth: 1 },
  salud: { min: 10, max: 300, default: 60, step: 5, minutesEach: 4, eventsPerMonth: 2 },
  seguridad: { min: 1, max: 20, default: 4, step: 1, minutesEach: 5, eventsPerMonth: 30 },
  servicios: { min: 10, max: 200, default: 40, step: 5, minutesEach: 5, eventsPerMonth: 2 },
  finanzas: { min: 5, max: 100, default: 20, step: 5, minutesEach: 6, eventsPerMonth: 1 },
};
