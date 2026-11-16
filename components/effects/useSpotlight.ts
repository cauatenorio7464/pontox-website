"use client";
import { useEffect, type RefObject } from "react";

/**
 * Luz que segue o mouse (catálogo naocodei): atualiza --mx/--my nos elementos `.spotlight`
 * dentro do container. Só em computadores com mouse; no celular não faz nada.
 */
export function useSpotlight(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = container.current;
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target || !root.contains(target)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${e.clientX - r.left}px`);
        target.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
    };
  }, [container]);
}
