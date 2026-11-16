"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { brands, brandsTitle, type Brand } from "@/data/brands";

// Equilíbrio visual: logos muito largos ficam um pouco mais baixos (mesma "área"), sempre entre 72% e 100% da altura.
const heightFactor = (b: Brand) => (b.logo ? Math.min(1, Math.max(0.72, Math.sqrt(4.5 / (b.logo.w / b.logo.h)))) : 1);

// Uma volta completa (uma cópia da lista) em cada linha: velocidades um pouco diferentes.
const ROWS = [
  { dir: "esquerda", seconds: 35 },
  { dir: "direita", seconds: 45 },
] as const;

function BrandList({ items, reps, copy = false }: { items: Brand[]; reps: number; copy?: boolean }) {
  // reps > 1 só em telas muito largas: a lista se repete para a linha nunca ficar com buraco.
  const all = Array.from({ length: reps }, (_, r) => items.map((b) => ({ b, key: `${r}-${b.name}`, dup: copy || r > 0 }))).flat();
  return (
    <ul className="logo-list" aria-hidden={copy || undefined}>
      {all.map(({ b, key, dup }) => (
        <li key={key} className="logo-item" data-tone={b.logo?.tone} aria-hidden={!copy && dup ? true : undefined}>
          {b.logo ? (
            <span className="logo-plate">
              <img
                src={b.logo.src}
                width={b.logo.w}
                height={b.logo.h}
                alt={dup ? "" : `Logo de ${b.name}`}
                loading="eager"
                decoding="async"
                style={{ ["--k" as string]: heightFactor(b).toFixed(3) }}
              />
            </span>
          ) : (
            <span className="logo-name">{b.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * "Algumas marcas que atendemos": duas linhas de logos sempre andando, em sentidos opostos (só CSS).
 * Logos nas cores originais; os escuros ganham uma plaquinha clara. Sem efeito ao passar o mouse.
 * Movimento reduzido no aparelho: continua andando, 3 vezes mais devagar (regra no CSS).
 */
export function Brands() {
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reps, setReps] = useState(1);
  const ref = useRef<HTMLElement>(null);

  // Fora da tela a animação descansa; volta sozinha quando a seção aparece de novo.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A cópia da lista precisa ser mais larga que a tela; em telas enormes, repete a lista dentro da cópia.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const lists = Array.from(el.querySelectorAll<HTMLElement>(".logo-row .logo-list:first-child"));
      const narrowest = Math.min(...lists.map((l) => l.getBoundingClientRect().width / reps));
      if (!Number.isFinite(narrowest) || narrowest <= 0) return;
      const need = Math.max(1, Math.ceil((window.innerWidth + 1) / narrowest));
      if (need !== reps) setReps(need);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reps]);

  const half = Math.ceil(brands.length / 2);
  const rows = [brands.slice(0, half), brands.slice(half)];

  return (
    <section ref={ref} id="marcas" aria-labelledby="marcas-titulo" className="relative overflow-clip bg-ink-2 py-[clamp(64px,8vw,112px)] text-white">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 px-[var(--gutter)]">
        <h2 id="marcas-titulo" className="t-title max-w-[16ch]">
          {brandsTitle}
        </h2>
        {/* Acessibilidade (WCAG 2.2.2): quem precisar pode parar o movimento */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="min-h-[44px] shrink-0 px-1 text-sm font-semibold text-mute underline decoration-red decoration-2 underline-offset-4 hover:text-white"
        >
          {paused ? "Continuar" : "Pausar"}
        </button>
      </div>
      <div className={`logo-marquee mt-[clamp(40px,5vw,72px)] ${paused || !onScreen ? "is-paused" : ""}`}>
        {rows.map((row, r) => (
          <div
            key={ROWS[r].dir}
            className={`logo-row ${ROWS[r].dir === "direita" ? "logo-row-rev" : ""}`}
            style={{ ["--dur" as string]: `${ROWS[r].seconds * reps}s` }}
          >
            <div className="logo-track">
              <BrandList items={row} reps={reps} />
              <BrandList items={row} reps={reps} copy />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
