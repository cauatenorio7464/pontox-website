"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NO_CLIENT, NO_SEGMENT, projects, type Project } from "@/data/projects";
import { serviceGroups, serviceToGroup, type Service, type ServiceGroupId } from "@/data/services";
import { videos, type Video } from "@/data/videos";
import { company, whatsappUrl } from "@/data/company";
import { WordReveal } from "@/components/effects/WordReveal";
import { PhotoSlider } from "@/components/PhotoSlider";
import { Field } from "@/components/Field";
import { useSpotlight } from "@/components/effects/useSpotlight";
import { ArrowRight, ChevronLeft, ChevronRight, Close, Play } from "@/components/icons";
import { FILTER_EVENT } from "./Services";

type Filter = "todos" | ServiceGroupId;

// Um item da galeria: um cliente (com uma ou mais fotos) ou um vídeo de cliente.
// Os vídeos entram só quando há filtro por serviço (em "Todos" eles já têm a seção Vídeos logo abaixo).
type Item =
  | { kind: "foto"; key: string; servicos: Service[]; p: Project }
  | { kind: "video"; key: string; servicos: Service[]; v: Video & { servico: Service } };

const photoItems: Item[] = projects.map((p) => ({ kind: "foto", key: p.id, servicos: p.servicos, p }));
const videoItems: Item[] = videos.flatMap((v) =>
  v.servico ? [{ kind: "video" as const, key: `video-${v.slug}`, servicos: [v.servico], v: { ...v, servico: v.servico } }] : [],
);

const mainService = (it: Item) => it.servicos[0];
const clientOf = (it: Item) => (it.kind === "foto" ? it.p.cliente : it.v.cliente);
const hasClient = (it: Item) => clientOf(it) !== NO_CLIENT;
const segmentOf = (it: Item) => (it.kind === "foto" && it.p.segmento !== NO_SEGMENT ? it.p.segmento : undefined);

// Título do card: o cliente; se ainda falta, o segmento (ou o que o vídeo mostra), nunca o "[NOME DO CLIENTE]".
const titleOf = (it: Item) =>
  hasClient(it) ? clientOf(it) : segmentOf(it) ?? (it.kind === "video" ? it.v.descricao.replace(/\.$/, "") : mainService(it));

const waLink = (it: Item) =>
  whatsappUrl(hasClient(it) ? company.messages.project(clientOf(it)) : company.messages.projectNoName(mainService(it), segmentOf(it)));

// Nome lido por leitores de tela: sem os colchetes de "a preencher".
const spokenName = (it: Item) => `${titleOf(it)}, ${it.kind === "video" ? "vídeo de " : ""}${mainService(it).toLowerCase()}`;

function Meta({ it, light = false }: { it: Item; light?: boolean }) {
  const tone = light ? "text-white" : "text-mute";
  // Com cliente: "Segmento · Serviços". Sem cliente: o segmento já está no título; a falta do nome vai aqui, discreta.
  const lead = hasClient(it) ? (it.kind === "foto" ? it.p.segmento : "Vídeo") : NO_CLIENT;
  return (
    <>
      <p className={`t-small mt-1.5 ${tone}`}>
        <Field value={lead} pendingClassName="text-mute" /> · {!hasClient(it) && it.kind === "video" ? "Vídeo · " : ""}
        {it.servicos.join(", ")}
      </p>
      {it.kind === "video" && hasClient(it) ? <p className="t-small mt-1 text-mute">{it.v.descricao}</p> : null}
      {it.kind === "foto" && it.p.ano ? <p className="t-small mt-1 text-mute">Ano: {it.p.ano}</p> : null}
      {it.kind === "foto" && it.p.detalhes ? <p className="t-small mt-1 text-mute">{it.p.detalhes}</p> : null}
    </>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("todos");
  const chipsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Foto que cada card está mostrando (a janela abre nela e, ao fechar, o card fica na última vista).
  const [photoIdx, setPhotoIdx] = useState<Record<string, number>>({});
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bigMediaRef = useRef<HTMLElement | null>(null);
  const thumbs = useRef<Map<string, HTMLElement>>(new Map());
  useSpotlight(trackRef);

  const photoOf = (key: string) => photoIdx[key] ?? 0;
  const setPhoto = useCallback((key: string, i: number) => setPhotoIdx((m) => (m[key] === i ? m : { ...m, [key]: i })), []);

  const list = useMemo<Item[]>(
    () =>
      filter === "todos"
        ? photoItems
        : [...photoItems, ...videoItems].filter((it) => it.servicos.some((s) => serviceToGroup[s] === filter)),
    [filter],
  );
  const group = serviceGroups.find((g) => g.id === filter);
  // Poucos trabalhos no filtro: cards maiores dividindo a linha, em vez de uma fileira encostada à esquerda.
  const small = list.length <= 2;

  // Posição na galeria ("1–4 de 21"): quais cards estão inteiros na tela.
  const [range, setRange] = useState<[number, number]>([1, 1]);
  const [overflows, setOverflows] = useState(true); // há cards fora da tela?
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = track.getBoundingClientRect();
      const cards = Array.from(track.querySelectorAll<HTMLElement>(":scope > li[data-projeto]"));
      let first = 0;
      let last = 0;
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        if (b.left >= box.left - 2 && b.right <= box.right + 2) {
          if (!first) first = i + 1;
          last = i + 1;
        }
      });
      if (!first) {
        // Nenhum card inteiro (tela muito estreita): conta o que ocupa mais espaço.
        let best = 0;
        cards.forEach((c, i) => {
          const b = c.getBoundingClientRect();
          const seen = Math.min(b.right, box.right) - Math.max(b.left, box.left);
          if (seen > best) [best, first, last] = [seen, i + 1, i + 1];
        });
      }
      setRange(([a, b]) => (a === first && b === last ? [a, b] : [first || 1, last || 1]));
      setOverflows(track.scrollWidth > track.clientWidth + 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [list]);

  // Botão "Ver projetos de ..." na seção Serviços já chega com o filtro aplicado.
  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<ServiceGroupId>).detail);
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    // Celular: a fileira de filtros rola para o lado; a ficha escolhida (também vinda de Serviços) fica à vista.
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && chip && row.scrollWidth > row.clientWidth) {
      const r = row.getBoundingClientRect();
      const c = chip.getBoundingClientRect();
      row.scrollTo({ left: row.scrollLeft + c.left - r.left - (r.width - c.width) / 2 });
    }
  }, [filter]);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Janela que "cresce" a partir do card (técnica FLIP).
  const grow = useCallback((from: HTMLElement | undefined, reverse = false) => {
    const media = bigMediaRef.current;
    if (!media || !from || reduce()) return Promise.resolve();
    const a = from.getBoundingClientRect();
    const b = media.getBoundingClientRect();
    if (!b.width || !a.width) return Promise.resolve();
    const s = a.width / b.width;
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    const start = { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0.6 };
    const end = { transform: "none", opacity: 1 };
    const anim = media.animate(reverse ? [end, start] : [start, end], {
      duration: reverse ? 320 : 560,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    return anim.finished.then(() => undefined).catch(() => undefined);
  }, []);

  // O trabalho aberto ganha uma entrada no histórico: o "voltar" do celular fecha a janela em vez de sair do site.
  const inHistory = useRef(false);
  const closing = useRef(false);

  const open = (i: number) => {
    setOpenIndex(i);
    const d = dialogRef.current;
    if (!d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
    // Um som por vez: pausa os vídeos da seção Vídeos.
    document.querySelectorAll<HTMLVideoElement>("#videos video").forEach((v) => v.pause());
    history.pushState({ pontoxFoto: true }, "");
    inHistory.current = true;
    requestAnimationFrame(() => grow(thumbs.current.get(list[i].key)));
  };

  const close = useCallback(async () => {
    const d = dialogRef.current;
    if (!d || !d.open || closing.current) return;
    closing.current = true;
    const current = openIndex !== null ? list[openIndex] : undefined;
    const thumb = current ? thumbs.current.get(current.key) : undefined;
    // Depois de passar trabalhos na janela, a galeria vai até o último visto (sem animação, por baixo da janela).
    const card = thumb?.closest("li");
    const track = trackRef.current;
    if (card && track?.firstElementChild) {
      const left = card.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft;
      if (Math.abs(track.scrollLeft - left) > 2) track.scrollTo({ left, behavior: "instant" });
    }
    const r = thumb?.getBoundingClientRect();
    if (r && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth) await grow(thumb, true);
    d.close();
    // O foco volta para o card do último trabalho visto (não para o primeiro que foi aberto).
    card?.querySelector<HTMLElement>("[aria-haspopup='dialog']")?.focus({ preventScroll: true });
    closing.current = false;
  }, [grow, list, openIndex]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      setOpenIndex(null);
      // Fechou pelo botão, Esc ou clique fora: tira a entrada que a janela criou no histórico.
      if (inHistory.current) {
        inHistory.current = false;
        history.back();
      }
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    const onPop = () => {
      if (!inHistory.current) return;
      inHistory.current = false;
      close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    window.addEventListener("popstate", onPop);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
      window.removeEventListener("popstate", onPop);
    };
  }, [close]);

  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + list.length) % list.length)),
    [list.length],
  );

  const current = openIndex !== null ? list[openIndex] : null;

  // Setas do teclado na janela: trocam a foto do cliente (quando há mais de uma); senão, o trabalho.
  // Com o vídeo em foco, as setas ficam para o próprio vídeo (avançar/voltar).
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if ((e.target as HTMLElement)?.tagName === "VIDEO") return;
      const dir = e.key === "ArrowRight" ? 1 : -1;
      if (current.kind === "foto" && current.p.images.length > 1) {
        const n = current.p.images.length;
        setPhoto(current.key, (photoOf(current.key) + dir + n) % n);
      } else step(dir);
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, photoIdx, step, setPhoto]);

  const scrollTrack = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: reduce() ? "auto" : "smooth" });
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "todos", label: "Todos" },
    ...serviceGroups.map((g) => ({ id: g.id, label: g.title })),
  ];
  // Larguras: celular mostra um card e a ponta do próximo; com poucos trabalhos, os cards dividem a linha no computador.
  const cardWidth = small
    ? "w-[72vw] sm:w-[46vw] lg:w-auto lg:flex-1"
    : "w-[72vw] sm:w-[46vw] lg:w-[30vw] xl:w-[23vw] xl:max-w-[400px]";
  const cardSizes = small
    ? "(min-width: 1024px) 50vw, (min-width: 640px) 46vw, 72vw"
    : "(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 72vw";

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="glow glow-soft slant-top relative overflow-clip bg-ink pb-[clamp(72px,9vw,128px)] pt-[clamp(96px,12vw,180px)]">
      <div className="relative flex flex-col gap-8 px-[var(--gutter)]">
        <WordReveal id="projetos-titulo" text="Projetos" className="t-title text-white" />
        <div ref={chipsRef} role="group" aria-label="Filtrar projetos por serviço" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {filters.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-[var(--radius-sm)] border px-4 py-2 text-base font-semibold transition-colors ${
                  on ? "border-red bg-red text-white" : "border-line bg-ink-2 text-white hover:border-red"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? "trabalho" : "trabalhos"} na lista.
      </p>

      <div className="relative mt-12">
        <ul ref={trackRef} className="hscroll flex gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-6" aria-label="Galeria de projetos (role para o lado)">
          {list.map((it, i) => (
            <li key={it.key} data-projeto className={`group/card glass spotlight cut-tr flex shrink-0 flex-col ${cardWidth}`}>
              <div
                ref={(el) => { if (el) thumbs.current.set(it.key, el); }}
                className={`relative z-[2] block aspect-[4/5] overflow-hidden bg-ink-3 ${small ? "lg:aspect-[4/3]" : ""}`}
              >
                {it.kind === "foto" ? (
                  <PhotoSlider
                    images={it.p.images}
                    index={photoOf(it.key)}
                    onIndex={(n) => setPhoto(it.key, n)}
                    variant="card"
                    sizes={cardSizes}
                    onOpen={() => open(i)}
                    openLabel={`Ampliar ${it.p.images.length > 1 ? `fotos (${it.p.images.length})` : "foto"}: ${spokenName(it)}`}
                    frameClassName="absolute inset-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => open(i)}
                    className="group absolute inset-0 block overflow-hidden text-left"
                    aria-label={`Assistir: ${spokenName(it)}`}
                    aria-haspopup="dialog"
                  >
                    <img
                      src={`/videos/${it.v.slug}-poster.webp`}
                      alt={`Capa do vídeo: ${it.v.descricao}`}
                      width={720}
                      height={1280}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span aria-hidden="true" className="cut-tr absolute left-1/2 top-1/2 flex h-14 w-14 [--cut:12px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-red pl-0.5 text-white">
                      <Play size={24} />
                    </span>
                  </button>
                )}
              </div>
              <div className="relative z-[2] flex flex-1 flex-col p-4 sm:p-5">
                <p className="t-name wrap-break-word text-white">{titleOf(it)}</p>
                <Meta it={it} />
                <span className="flex-1" aria-hidden="true" />
                <a
                  className="btn btn-ghost mt-5 min-h-[44px] self-start whitespace-normal px-4 py-2 text-left text-sm text-white"
                  href={waLink(it)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero um projeto como este
                </a>
              </div>
            </li>
          ))}
          {/* Fim de um serviço filtrado: em vez de um trilho vazio, um pedido direto de mais exemplos */}
          {group && (
            <li className={`cut-tr relative flex shrink-0 flex-col justify-end gap-5 overflow-hidden bg-ink-3 p-6 ${cardWidth}`}>
              <span aria-hidden="true" className="band left-[60%] top-[-140%] opacity-90" />
              <p className="t-name relative wrap-break-word text-white">Quer ver mais trabalhos de {group.title.toLowerCase()}?</p>
              <a
                className="btn btn-primary relative self-start"
                href={whatsappUrl(company.messages.moreWork(group.title))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir mais exemplos
                <ArrowRight className="arrow" />
              </a>
            </li>
          )}
        </ul>
        {/* Posição e setas só quando há mais cards do que cabem na tela (e mais de dois trabalhos) */}
        <div className={`mt-4 items-center justify-between gap-4 px-[var(--gutter)] ${overflows && !small ? "flex" : "hidden"}`}>
          <p className="t-small tabular-nums text-mute">
            {filter !== "todos" && `${filters.find((f) => f.id === filter)?.label} · `}
            {range[0] === range[1] ? range[0] : `${range[0]}–${range[1]}`} de {list.length}
          </p>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scrollTrack(-1)} className="cut-tr flex h-12 w-12 [--cut:12px] items-center justify-center bg-ink-2 text-white hover:bg-red" aria-label="Projetos anteriores">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => scrollTrack(1)} className="cut-tr flex h-12 w-12 [--cut:12px] items-center justify-center bg-ink-2 text-white hover:bg-red" aria-label="Mais projetos">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="projeto-aberto"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-[rgb(18_20_28/0.96)] p-0 text-white backdrop:bg-transparent"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <div className="grid h-full grid-rows-[1fr_auto] gap-0 lg:grid-cols-[1fr_400px] lg:grid-rows-1">
            <div
              className="relative flex min-h-0 items-center justify-center p-3 pt-14 sm:p-4 sm:pt-16 lg:p-10"
              onClick={(e) => {
                const t = e.target as HTMLElement;
                if (t === e.currentTarget || t.classList.contains("slider-big")) close();
              }}
            >
              {current.kind === "foto" ? (
                <PhotoSlider
                  key={current.key}
                  images={current.p.images}
                  index={photoOf(current.key)}
                  onIndex={(n) => setPhoto(current.key, n)}
                  variant="big"
                  mediaRef={(el) => { bigMediaRef.current = el; }}
                />
              ) : (
                <video
                  ref={(el) => { bigMediaRef.current = el; }}
                  key={current.key}
                  src={`/videos/${current.v.slug}.mp4`}
                  poster={`/videos/${current.v.slug}-poster.webp`}
                  width={720}
                  height={1280}
                  controls
                  autoPlay
                  playsInline
                  aria-label={`Vídeo: ${current.v.descricao}`}
                  className="cut-tr max-h-full w-auto max-w-full bg-ink object-contain"
                />
              )}
            </div>
            {/* Celular: painel compacto (título, botão e setas numa linha) para a foto ou o vídeo ocuparem a tela */}
            <div className="flex flex-col gap-3 bg-ink-2 p-4 sm:p-6 lg:justify-end lg:gap-4 lg:p-8">
              <div>
                <h3 id="projeto-aberto" className="t-name wrap-break-word text-[1.25rem] lg:text-[1.75rem]">{titleOf(current)}</h3>
                <Meta it={current} light />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a className="btn btn-primary min-w-0 flex-1 px-4 text-sm sm:text-base lg:basis-full" href={waLink(current)} target="_blank" rel="noopener noreferrer">
                  Quero um projeto como este
                  <ArrowRight className="arrow" />
                </a>
                <p className="t-small order-last basis-full text-mute sm:order-none">{company.whatsappNote}</p>
                <button type="button" onClick={() => step(-1)} className="cut-tr flex h-12 w-12 [--cut:12px] items-center justify-center bg-ink-3 hover:bg-red lg:mt-2" aria-label="Trabalho anterior">
                  <ChevronLeft />
                </button>
                <button type="button" onClick={() => step(1)} className="cut-tr flex h-12 w-12 [--cut:12px] items-center justify-center bg-ink-3 hover:bg-red lg:mt-2" aria-label="Próximo trabalho">
                  <ChevronRight />
                </button>
                <span className="t-small ml-2 hidden text-mute sm:inline lg:mt-2" aria-live="polite">
                  {(openIndex ?? 0) + 1} de {list.length}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="absolute right-3 top-3 z-[3] flex h-12 w-12 items-center justify-center bg-red text-white hover:bg-red-deep"
              aria-label="Fechar"
            >
              <Close size={24} />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
