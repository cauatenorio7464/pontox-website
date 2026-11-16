"use client";
import { useEffect, useState, type RefObject } from "react";

/**
 * Observa quando um elemento entra na tela (uma vez só).
 * `armed` = true quando o elemento começou fora da tela e pode ser escondido para animar.
 * Sem JavaScript, nada fica escondido.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "0px 0px -12% 0px") {
  const [state, setState] = useState<{ armed: boolean; inView: boolean }>({ armed: false, inView: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    if (reduce || rect.top < window.innerHeight * 0.88) {
      setState({ armed: false, inView: true });
      return;
    }
    setState({ armed: true, inView: false });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState({ armed: false, inView: true });
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return state;
}
