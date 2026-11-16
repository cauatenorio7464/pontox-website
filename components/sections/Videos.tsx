"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { videos, videosSection, VISIBLE_VIDEOS } from "@/data/videos";
import { WordReveal } from "@/components/effects/WordReveal";
import { ArrowRight, Play } from "@/components/icons";
import { Field, isPending } from "@/components/Field";

// Só um vídeo toca por vez: ao tocar um, os outros pausam.
const players = new Set<HTMLVideoElement>();

type Status = "idle" | "loading" | "error";

function VideoCard({ v, hidden }: { v: (typeof videos)[number]; hidden: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const loadingTimer = useRef(0);
  // Leitores de tela: sem os colchetes de "a preencher".
  const pending = isPending(v.cliente);
  const spoken = pending ? v.descricao.replace(/\.$/, "") : v.cliente;

  // "Carregando" só aparece se demorar mais que 0,3 s (evita piscar em internet rápida).
  const showLoading = () => {
    clearTimeout(loadingTimer.current);
    loadingTimer.current = window.setTimeout(() => setStatus("loading"), 300);
  };
  const settle = (s: Status) => {
    clearTimeout(loadingTimer.current);
    setStatus(s);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    players.add(el);
    const onPlay = () => players.forEach((p) => p !== el && !p.paused && p.pause());
    const onWaiting = () => showLoading();
    const onPlaying = () => settle("idle");
    // O navegador dispara "pause" logo depois de um erro: o aviso de erro continua na tela.
    const onPause = () => {
      clearTimeout(loadingTimer.current);
      setStatus((s) => (s === "error" ? s : "idle"));
    };
    const onError = () => settle("error");
    el.addEventListener("play", onPlay);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
      clearTimeout(loadingTimer.current);
      el.pause();
      players.delete(el);
    };
  }, []);

  useEffect(() => {
    if (hidden) ref.current?.pause();
  }, [hidden]);

  const play = (el: HTMLVideoElement) => {
    showLoading();
    el.play().catch((err: DOMException) => {
      // Bloqueado pelo navegador: os controles já estão visíveis para a pessoa apertar o play.
      if (err.name === "NotAllowedError") settle("idle");
      else if (err.name !== "AbortError") settle("error");
    });
  };

  const start = () => {
    const el = ref.current;
    if (!el) return;
    if (!started) {
      el.poster = `/videos/${v.slug}-poster.webp`;
      el.src = `/videos/${v.slug}.mp4`; // só baixa o vídeo depois do clique
      setStarted(true);
    }
    el.muted = false;
    play(el);
  };

  const retry = () => {
    const el = ref.current;
    if (!el) return;
    setStatus("idle");
    el.load();
    play(el);
  };

  return (
    <li hidden={hidden} className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
      <div className="cut-tr relative aspect-[9/16] overflow-hidden bg-ink">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full bg-ink object-cover"
          playsInline
          preload="none"
          controls={started}
          aria-label={pending ? `Vídeo: ${v.descricao}` : `Vídeo: ${v.cliente}. ${v.descricao}`}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Reproduzir vídeo: ${spoken}`}
          >
            <img
              src={`/videos/${v.slug}-poster.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              width={720}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[rgb(18_20_28/0.18)] transition-colors group-hover:bg-[rgba(19,13,14,0.05)]" />
            {/* Play no centro (pedido original), em tamanho menor para cobrir menos a capa */}
            <span className="cut-tr relative flex h-16 w-16 [--cut:14px] items-center justify-center bg-red pl-1 text-white transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
              <Play size={28} />
            </span>
          </button>
        )}
        {status === "loading" && (
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 bg-ink px-3 py-2 text-sm font-semibold text-white">
            <span className="block h-3.5 w-2 -skew-x-[36deg] bg-red" />
            Carregando vídeo…
          </span>
        )}
        {status === "error" && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[rgb(18_20_28/0.88)] p-6 text-center text-white">
            <p className="font-semibold">Não foi possível carregar o vídeo.</p>
            <button type="button" onClick={retry} className="btn btn-ghost btn-compact text-white">
              Tentar de novo
            </button>
          </div>
        )}
        <span className="sr-only" aria-live="polite">
          {status === "loading" ? "Carregando vídeo" : ""}
        </span>
      </div>
      {pending ? (
        <>
          {/* Sem o nome do cliente: o que o vídeo mostra vira o título; a falta do nome fica discreta embaixo */}
          <p className="t-name mt-4 wrap-break-word">{spoken}</p>
          <p className="t-small mt-1 text-mute">
            <Field value={v.cliente} />
          </p>
        </>
      ) : (
        <>
          <p className="t-name mt-4 wrap-break-word">{v.cliente}</p>
          <p className="t-small mt-1 text-mute">{v.descricao}</p>
        </>
      )}
    </li>
  );
}

/** Seção "Vídeos": capa + botão play, toca no próprio card com som. Sem reprodução automática. */
export function Videos() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = videos.length > VISIBLE_VIDEOS;
  const listRef = useRef<HTMLUListElement>(null);
  const firstRun = useRef(true);

  // "Ver mais vídeos": leva o foco ao 4º vídeo; no celular (lista de lado) também rola até ele.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const list = listRef.current;
    const card = list?.children[VISIBLE_VIDEOS] as HTMLElement | undefined;
    if (!expanded || !list || !card) return;
    card.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    if (list.scrollWidth > list.clientWidth) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const first = list.children[0] as HTMLElement;
      list.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
  }, [expanded]);

  return (
    <section
      id="videos"
      aria-labelledby="videos-titulo"
      className="glow glow-medium relative overflow-clip bg-ink py-[clamp(96px,12vw,180px)] text-white"
    >
      <span aria-hidden="true" className="band right-[16%] top-[-140px] hidden !h-[560px] lg:block" />
      <div className="relative px-[var(--gutter)]">
        <p className="eyebrow text-white">{videosSection.eyebrow}{/* taste-skill-ignore: sobretítulo pedido no briefing */}</p>
        <WordReveal id="videos-titulo" text={videosSection.title} className="t-title mt-5 max-w-[22ch]" />
      </div>

      <ul
        ref={listRef}
        id="lista-videos"
        className="hscroll relative mt-[clamp(48px,6vw,80px)] flex gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-14 md:overflow-visible"
      >
        {videos.map((v, i) => (
          <VideoCard key={v.slug} v={v} hidden={!expanded && i >= VISIBLE_VIDEOS} />
        ))}
      </ul>

      {hasMore && (
        <div className="relative mt-10 px-[var(--gutter)]">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="lista-videos"
            onClick={() => setExpanded((e) => !e)}
            className="btn btn-ghost"
          >
            {expanded ? videosSection.less : videosSection.more}
            <ArrowRight className={`arrow transition-transform ${expanded ? "-rotate-90" : ""}`} size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
