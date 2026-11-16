"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode, type Ref } from "react";
import { imageSize, projectImage, type ProjectPhoto } from "@/data/projects";
import { ProjectImage } from "@/components/ProjectImage";
import { ChevronLeft, ChevronRight } from "@/components/icons";

const SWIPE = 40; // px na horizontal para contar como "deslizar"

/**
 * Fotos de um cliente, uma de cada vez, com setas, pontinhos, deslizar (celular) e setas do teclado.
 * "card": dentro do card da galeria (clicar na foto abre a janela). "big": dentro da janela ampliada.
 * As fotos extras só carregam quando a pessoa chega perto delas (a atual e a próxima).
 */
export function PhotoSlider({
  images,
  index,
  onIndex,
  variant,
  sizes,
  onOpen,
  openLabel,
  mediaRef,
  frameClassName = "",
  children,
}: {
  images: ProjectPhoto[];
  index: number;
  onIndex: (i: number) => void;
  variant: "card" | "big";
  sizes?: string;
  onOpen?: () => void;
  openLabel?: string;
  mediaRef?: Ref<HTMLImageElement>; // foto atual (para a janela "crescer" a partir dela)
  frameClassName?: string;
  children?: ReactNode;
}) {
  const n = images.length;
  const multi = n > 1;
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([index, (index + 1) % n]));
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  // A atual e a próxima ficam carregadas (a próxima já vem antes do clique).
  useEffect(() => {
    setLoaded((s) => (s.has(index) && s.has((index + 1) % n) ? s : new Set([...s, index, (index + 1) % n])));
  }, [index, n]);

  const go = (i: number) => onIndex((i + n) % n);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!multi || variant === "big") return; // na janela, as setas do teclado são tratadas pela própria janela
    if (e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); next(); }
  };
  const onPointerDown = (e: PointerEvent) => {
    if (!multi || e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };
  const onPointerUp = (e: PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped.current = true; // não abrir a janela por causa do toque que terminou o deslize
      if (dx < 0) next();
      else prev();
    }
  };
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

  const imgClass =
    variant === "card"
      ? "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none group-hover/card:scale-[1.04] [transition-duration:300ms,700ms]"
      : "cut-tr absolute inset-0 m-auto max-h-full max-w-full object-contain transition-opacity duration-300 ease-out motion-reduce:transition-none";

  return (
    <div
      // Posição: a do card (absolute, preenchendo a moldura) ou relativa na janela. Nunca as duas juntas.
      className={`slider ${frameClassName || "relative"} ${variant === "card" ? "slider-card" : "slider-big h-full w-full"} ${multi ? "touch-pan-y" : ""}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (start.current = null)}
    >
      {images.map((img, i) => {
        if (!loaded.has(i)) return null;
        const on = i === index;
        const common = {
          alt: img.alt,
          "aria-hidden": on ? undefined : true,
          className: `${imgClass} ${on ? "opacity-100" : "pointer-events-none opacity-0"}`,
        };
        return variant === "card" ? (
          <ProjectImage key={img.slug} slug={img.slug} sizes={sizes ?? "100vw"} alt={img.alt} className={common.className} ariaHidden={!on} />
        ) : (
          <img
            key={img.slug}
            ref={on ? mediaRef : undefined}
            src={projectImage(img.slug, 1440)}
            width={imageSize(img.slug).w}
            height={imageSize(img.slug).h}
            decoding="async"
            {...common}
          />
        );
      })}

      {variant === "card" && onOpen && (
        <button
          type="button"
          onClick={() => {
            if (swiped.current) { swiped.current = false; return; }
            onOpen();
          }}
          className="absolute inset-0 z-[1] block"
          aria-label={openLabel}
          aria-haspopup="dialog"
        />
      )}
      {children}

      {multi && (
        <>
          <button type="button" className="slider-arrow left-1" aria-label="Foto anterior" onClick={(e) => { stop(e); prev(); }} onPointerDown={stop}>
            <span><ChevronLeft size={variant === "big" ? 22 : 18} stroke={1.6} /></span>
          </button>
          <button type="button" className="slider-arrow right-1" aria-label="Próxima foto" onClick={(e) => { stop(e); next(); }} onPointerDown={stop}>
            <span><ChevronRight size={variant === "big" ? 22 : 18} stroke={1.6} /></span>
          </button>
          <div className="slider-dots" onClick={stop} onPointerDown={stop}>
            {images.map((img, i) => (
              <button
                key={img.slug}
                type="button"
                aria-label={`Ver foto ${i + 1} de ${n}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            Foto {index + 1} de {n}
          </span>
        </>
      )}
    </div>
  );
}
