"use client";
import { useRef, type ReactNode } from "react";
import { useInView } from "./useInView";

/** Bloco que sobe suavemente ao entrar na tela. `delay` em ms para escalonar elementos. */
export function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { armed, inView } = useInView(ref);
  return (
    <div
      ref={ref}
      className={`${className} ${armed ? "rise-armed" : inView ? "rise-in" : ""}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
