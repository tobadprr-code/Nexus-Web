"use client";

import { createContext, useContext, useState } from "react";

type ProductFilterContextValue = {
  filter: string;
  setFilter: (key: string) => void;
};

const ProductFilterContext = createContext<ProductFilterContextValue | null>(null);

export function ProductFilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("all");

  return (
    <ProductFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </ProductFilterContext.Provider>
  );
}

// Fuente única de verdad para el filtro de rubro de "Nuestros productos":
// el selector del Hero y los chips de Projects leen/escriben el mismo estado,
// así elegir un rubro arriba filtra la grilla de abajo.
export function useProductFilter() {
  const ctx = useContext(ProductFilterContext);
  if (!ctx) {
    throw new Error("useProductFilter must be used within a ProductFilterProvider");
  }
  return ctx;
}
