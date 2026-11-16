"use client";
import { useEffect, useRef, useState } from "react";
import { serviceGroups, type ServiceGroupId } from "@/data/services";
import { WordReveal } from "@/components/effects/WordReveal";
import { ProjectImage } from "@/components/ProjectImage";
import { ArrowRight } from "@/components/icons";
import { useSpotlight } from "@/components/effects/useSpotlight";

export const FILTER_EVENT = "pontox:filtrar-projetos";

export function showProjects(group: ServiceGroupId) {
  window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: group }));
}

/**
 * "Nossos serviços": à esquerda, a foto grande do serviço aberto; à direita, os 5 serviços.
 * O serviço aberto vira um bloco vermelho que ocupa o espaço que sobra, com os itens em tamanho grande
 * e as peças desse serviço que aparecem no vídeo do início. Os outros mostram só o título.
 */
export function Services() {
  const [active, setActive] = useState(0);
  // Mouse: o painel só abre se o cursor parar um instante nele (não troca a foto no caminho até outro painel).
  const hoverTimer = useRef(0);
  const hoverOpen = (i: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActive(i), 140);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  // Celular: ao abrir outro serviço, o painel aberto acima fecha e puxaria o título tocado para fora da tela.
  // Durante a animação a página acompanha o título, que fica parado embaixo do dedo.
  const keepInPlace = (el: HTMLElement) => {
    const start = el.getBoundingClientRect().top;
    const until = performance.now() + 650;
    const follow = () => {
      const d = el.getBoundingClientRect().top - start;
      if (Math.abs(d) > 0.5) window.scrollBy({ top: d, behavior: "instant" });
      if (performance.now() < until) requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);
  };
  const openGroup = (i: number, el: HTMLElement) => {
    if (i === active) return;
    keepInPlace(el);
    setActive(i);
  };
  const listRef = useRef<HTMLOListElement>(null);
  useSpotlight(listRef);

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="grid md:grid-cols-2">
      {/* Célula clara: título + foto grande do serviço aberto (ocupa toda a altura que sobra) */}
      <div className="relative flex flex-col gap-10 bg-ink-2 px-[var(--gutter)] py-[clamp(48px,7vw,104px)] text-white">
        <WordReveal id="servicos-titulo" text="Nossos serviços" className="t-title max-w-[9ch]" />
        <div className="relative hidden min-h-[440px] w-full flex-1 md:block">
          {serviceGroups.map((g, i) => (
            <div
              key={g.id}
              aria-hidden={i !== active}
              className="cut-tr absolute inset-0 overflow-hidden bg-ink transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: i === active ? 1 : 0,
                clipPath:
                  i === active
                    ? "polygon(0 0, calc(100% - var(--cut)) 0, 100% calc(var(--cut) * 0.72), 100% 100%, 0 100%)"
                    : "polygon(0 0, 0 0, 0 100%, 0 100%)",
              }}
            >
              <ProjectImage slug={g.photo} alt={g.alt} sizes="(min-width: 768px) 50vw, 1px" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Célula escura: um painel por grupo; o aberto cresce e vira o bloco vermelho */}
      {/* Espaço embaixo: a borda inclinada da seção seguinte cobre essa faixa, não o último serviço */}
      <ol ref={listRef} className="flex flex-col bg-ink pb-[clamp(24px,4vw,56px)]">
        {serviceGroups.map((g, i) => {
          const open = i === active;
          return (
            <li
              key={g.id}
              className={`spotlight relative flex shrink-0 basis-auto flex-col transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "grow bg-red [&_:focus-visible]:outline-white" : `grow-0 ${i % 2 ? "bg-ink-2" : "bg-ink"}`
              }`}
              onMouseEnter={() => hoverOpen(i)}
              onMouseLeave={() => clearTimeout(hoverTimer.current)}
            >
              <h3 className="relative z-[2] m-0 px-[var(--gutter)]">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`painel-${g.id}`}
                  onClick={(e) => openGroup(i, e.currentTarget)}
                  onFocus={(e) => openGroup(i, e.currentTarget)}
                  className={`t-name flex min-h-[76px] w-full items-center justify-between gap-4 py-5 text-left text-[1.75rem] transition-colors duration-300 ${
                    open ? "text-white" : "text-mute hover:text-white"
                  }`}
                >
                  {g.title}
                  {/* "+" mostra que o painel abre; vira "−" no painel aberto */}
                  <span aria-hidden="true" className={`relative h-5 w-5 shrink-0 ${open ? "text-white" : "text-red-hot"}`}>
                    <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-current" />
                    <span
                      className={`absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-current transition-transform duration-300 ${open ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={`painel-${g.id}`}
                className="relative z-[2] grid flex-1 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="flex h-full flex-col gap-8 px-[var(--gutter)] pb-9">
                    <div className="cut-tr aspect-[4/3] overflow-hidden bg-ink-3 md:hidden">
                      <ProjectImage slug={g.photo} alt={g.alt} sizes="(max-width: 767px) 92vw, 1px" className="h-full w-full object-cover" />
                    </div>
                    <ul className="t-statement flex flex-col gap-2 font-semibold text-white">
                      {g.items.map((it) => (
                        <li key={it} className="flex items-baseline gap-4">
                          <span aria-hidden="true" className="inline-block h-[0.7em] w-[0.4em] shrink-0 -skew-x-[36deg] bg-white" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    {/* Liga com a loja montada no início */}
                    <div>
                      <p className="t-small font-semibold text-white">No vídeo do início</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {g.noInicio.map((peca) => (
                          <li key={peca} className="t-small bg-red-deep px-3 py-1.5 text-white">
                            {peca}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#projetos"
                      tabIndex={open ? 0 : -1}
                      onClick={() => showProjects(g.id)}
                      className="link-arrow mt-auto min-h-[44px] self-start text-white"
                    >
                      Ver projetos de {g.title.toLowerCase()}
                      <ArrowRight className="arrow" size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
