"use client";
import { createElement, useRef, type ElementType } from "react";
import { useInView } from "./useInView";

/**
 * Título que entra com um corte diagonal no ângulo do X do logotipo (o mesmo gesto da chamada final do início).
 * Sem JavaScript ou com movimento reduzido, o título aparece direto.
 */
export function WordReveal({
  text,
  as = "h2",
  className = "",
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { armed, inView } = useInView(ref);
  const state = armed ? "wr-armed" : inView ? "wr-in" : "";
  // O corte fica numa camada interna: o título em si continua "visível" para o observador de entrada na tela.
  return createElement(as, { ref, id, className: `${className} ${state}` }, <span className="wr-clip">{text}</span>);
}
