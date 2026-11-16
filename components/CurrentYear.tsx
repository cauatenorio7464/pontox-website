"use client";
import { useEffect, useState } from "react";

/** Ano do © no rodapé. O site é gerado uma vez (ano da geração) e se atualiza sozinho no navegador. */
export function CurrentYear({ built }: { built: number }) {
  const [year, setYear] = useState(built);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
