"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters, heroMedia } from "@/data/hero";
import { IntroText } from "./IntroText";
import { FinalCTA } from "./FinalCTA";
import { ArrowRight } from "@/components/icons";

// Trechos da rolagem do início (0 = topo da seção, 1 = fim da seção).
const VIDEO_START = 0.13; // H1 e H2 já passaram: o vídeo começa
const VIDEO_END = 0.84; // último quadro: a loja pronta fica um instante na tela, limpa
const CTA_AT = VIDEO_END + 0.035; // depois entra a chamada final
const EASE = 0.14; // suavização leve entre rolagem e vídeo
const LOADING_LABEL = "Carregando o vídeo…";
const ERROR_LABEL = "Não foi possível carregar o vídeo.";
const GIVE_UP_MS = 20000; // sem nenhum quadro depois disso, mostra o plano B (se o vídeo chegar depois, volta ao normal)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const section = sectionRef.current!;
    const video = videoRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    video.muted = true;
    let duration = heroMedia.duration;
    let target = 0;
    let current = 0;
    let raf = 0;
    let chapterIndex = -1;
    let hasFrames = video.readyState >= 2; // já chegou o primeiro pedaço do vídeo?

    const setLabel = (text: string) => {
      if (labelRef.current && labelRef.current.textContent !== text) labelRef.current.textContent = text;
    };
    const setChapter = (t: number) => {
      let i = 0;
      for (let k = 0; k < chapters.length; k++) if (t >= chapters[k].at) i = k;
      if (i !== chapterIndex) {
        chapterIndex = i;
        setLabel(chapters[i].label);
        // Lista do celular em pé: peças já instaladas ficam marcadas; a atual, em destaque.
        const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("li") ?? []);
        // "Entrando na loja" não está na lista: enquanto isso, a última peça instalada continua em destaque.
        const now = Math.max(-1, ...items.map((li) => Number(li.dataset.i)).filter((k) => k <= i));
        items.forEach((li) => {
          const k = Number(li.dataset.i);
          li.classList.toggle("is-on", k <= i);
          li.classList.toggle("is-now", k === now);
        });
      }
    };

    // Estado do vídeo na seção (o CSS mostra o aviso no lugar da lista e esconde a barra quando falha).
    const setState = (state: "carregando" | "ok" | "erro") => {
      if (section.dataset.video !== state) section.dataset.video = state;
    };
    let failed = false;
    // Plano B: a foto da loja fica, todas as peças aparecem marcadas e a etiqueta avisa.
    const fail = () => {
      if (hasFrames) return;
      failed = true;
      setState("erro");
      setLabel(ERROR_LABEL);
      listRef.current?.querySelectorAll<HTMLElement>("li").forEach((li) => li.classList.add("is-on"));
    };
    const giveUp = window.setTimeout(fail, GIVE_UP_MS);

    const tick = () => {
      raf = 0;
      // Internet lenta: enquanto o vídeo não tem quadros, a etiqueta avisa em vez de parecer travada.
      if (!hasFrames && !failed && target > 0) {
        chapterIndex = -1;
        setState("carregando");
        setLabel(LOADING_LABEL);
      }
      if (video.readyState < 1) return; // ainda sem metadados: volta no evento "loadedmetadata"
      current = reduce ? target : current + (target - current) * EASE;
      if (Math.abs(target - current) < 0.003) current = target;
      if (!video.seeking && Math.abs(video.currentTime - current) > 0.01) {
        video.currentTime = Math.min(current, duration - 0.04);
      }
      if (hasFrames) setChapter(video.currentTime);
      if (current !== target || video.seeking) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
      // iOS/Safari só desenha quadros após um play(); toca e pausa na hora (vídeo sem som).
      const p = video.play();
      if (p) p.then(() => { video.pause(); kick(); }).catch(() => kick());
      else kick();
    };
    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    const onSeeked = () => { if (hasFrames) setChapter(video.currentTime); kick(); };
    const onData = () => {
      hasFrames = true;
      failed = false;
      window.clearTimeout(giveUp);
      setState("ok");
      chapterIndex = -1;
      kick();
    };
    // Erro do vídeo ou das fontes (<source>): o evento das fontes não sobe, então escuta na fase de captura.
    const onError = () => fail();
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onData);
    video.addEventListener("error", onError, true);
    // Se o vídeo já falhou antes deste código começar (internet ruim, arquivo fora do ar), mostra o plano B na hora.
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();

    const ctx = gsap.context(() => {
      gsap.set(h2Ref.current, { autoAlpha: 0, y: 50 });
      gsap.set([ctaBgRef.current], { clipPath: "polygon(0% 0%, 0% 0%, -45% 100%, -45% 100%)" });
      gsap.set(ctaRef.current, { autoAlpha: 0 });
      gsap.set(ctaRef.current!.querySelectorAll("[data-cta-item]"), { autoAlpha: 0, y: 36 });
      gsap.set(hudRef.current, { autoAlpha: 0 });
      // Largura da faixa já girada (não muda com o deslocamento x).
      const bandSpan = () => bandRef.current!.getBoundingClientRect().width + 40;
      gsap.set(bandRef.current, { autoAlpha: 0, rotation: 36 });
      gsap.set(bandRef.current, { x: -bandSpan() });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.35,
          invalidateOnRefresh: true,
          onUpdate(self) {
            target = clamp01((self.progress - VIDEO_START) / (VIDEO_END - VIDEO_START)) * duration;
            kick();
          },
        },
      });

      // Celular (rolagem curta): o H2 fica na tela por mais tempo; no computador, o ritmo original.
      const phone = window.matchMedia("(max-width: 767px)").matches;
      const H2_IN = phone ? 0.055 : 0.065;
      const H2_OUT = phone ? 0.25 : 0.175;
      const HUD_IN = H2_OUT + 0.05;

      tl.to(cueRef.current, { autoAlpha: 0, duration: 0.03 }, 0.01)
        .to(h1Ref.current, { autoAlpha: 0, y: -70, duration: 0.05, ease: "power1.in" }, 0.03)
        .to(h2Ref.current, { autoAlpha: 1, y: 0, duration: 0.05, ease: "power2.out" }, H2_IN)
        .to(h2Ref.current, { autoAlpha: 0, y: -50, duration: 0.05, ease: "power1.in" }, H2_OUT)
        // A etiqueta só entra depois que o H2 saiu (os dois ocupam o mesmo lugar).
        .to(hudRef.current, { autoAlpha: 1, duration: 0.03 }, HUD_IN)
        .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: VIDEO_END - VIDEO_START }, VIDEO_START)
        // A etiqueta continua no último quadro ("Balcão…") enquanto a loja pronta aparece limpa.
        .to(hudRef.current, { autoAlpha: 0, duration: 0.02 }, CTA_AT)
        .to(barRef.current, { autoAlpha: 0, duration: 0.02 }, CTA_AT)
        // Transição diagonal (o corte do X) para a chamada final
        // A faixa atravessa a tela inteira: começa e termina fora dela (largura medida depois de girada).
        .fromTo(
          bandRef.current,
          { x: () => -bandSpan(), autoAlpha: 1 },
          { x: () => window.innerWidth + bandSpan(), autoAlpha: 1, duration: 0.06, ease: "power1.inOut", immediateRender: false },
          CTA_AT,
        )
        .set(bandRef.current, { autoAlpha: 0 }, CTA_AT + 0.07)
        .to(ctaBgRef.current, { clipPath: "polygon(0% 0%, 145% 0%, 100% 100%, -45% 100%)", duration: 0.06, ease: "power1.inOut" }, CTA_AT)
        .to(ctaRef.current, { autoAlpha: 1, duration: 0.01 }, CTA_AT + 0.035)
        .to(ctaRef.current!.querySelectorAll("[data-cta-item]"), { autoAlpha: 1, y: 0, duration: 0.035, stagger: 0.01, ease: "power2.out" }, CTA_AT + 0.04)
        .to({}, { duration: 0.001 }, 1);
    }, section);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onData);
      video.removeEventListener("error", onError, true);
      window.clearTimeout(giveUp);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Início"
      className="relative h-[320vh] md:h-[440vh]"
    >
      <div className="sticky top-0 h-[100lvh] overflow-hidden bg-ink">
        {/* A loja inteira: tela cheia no computador; no celular em pé, o quadro 16:9 inteiro com os textos embaixo */}
        <div className="hero-media absolute inset-0">
          {/* Primeiro quadro: aparece na hora, antes do vídeo carregar */}
          <picture>
            <source media="(max-width: 960px)" srcSet={heroMedia.posterMobile} />
            <img
              src={heroMedia.posterDesktop}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={heroMedia.mobile} type="video/mp4" media="(max-width: 960px)" />
            <source src={heroMedia.desktop} type="video/mp4" />
          </video>
        </div>
        <p className="sr-only">
          Vídeo: uma loja toda branca recebe, peça por peça, a identidade visual da Ponto X: fachada,
          letreiro, banner, wind banner, totem iluminado, plotagem do carro, adesivos, piso e sinalização
          interna, displays, acrílicos e, no balcão, crachás, cartões de visita e panfletos.
        </p>

        {/* Véus bem sutis só para o texto ficar legível, sem esconder a loja */}
        <div
          aria-hidden="true"
          className="hero-scrim pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(to bottom, rgba(18,20,28,0.62), rgba(18,20,28,0))" /* taste-skill-ignore: véu neutro para legibilidade sobre o vídeo */ }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
          style={{ background: "linear-gradient(to top, rgba(18,20,28,0.82) 0%, rgba(18,20,28,0.5) 38%, rgba(18,20,28,0) 100%)" /* taste-skill-ignore: véu neutro para legibilidade sobre o vídeo */ }}
        />

        {/* Área segura (fora da barra do navegador no celular) */}
        <div className="absolute inset-x-0 top-0 h-[100svh]">
          <IntroText ref={introRef} h1Ref={h1Ref} h2Ref={h2Ref} />

          <div
            ref={cueRef}
            aria-hidden="true"
            className="hero-cue absolute bottom-[clamp(14px,2.6svh,22px)] left-[var(--gutter)] flex items-center gap-2 text-sm font-semibold text-white md:bottom-[clamp(28px,7svh,88px)] md:left-auto md:right-[var(--gutter)] md:gap-3"
          >
            Role para montar a loja
            <ArrowRight className="rotate-90 text-red-hot md:hidden" size={16} />
            <span className="hidden h-10 w-[3px] origin-top bg-red md:block" />
          </div>

          {/* Interface mínima: o que está sendo instalado agora */}
          <div
            ref={hudRef}
            aria-hidden="true"
            className="hero-hud absolute bottom-[clamp(20px,5svh,48px)] left-[var(--gutter)] right-[var(--gutter)] flex items-end justify-between gap-6"
          >
            <span className="hero-hud-label flex items-center gap-3 text-base font-semibold text-white sm:text-[1.0625rem]">
              <span className="block h-4 w-2.5 -skew-x-[36deg] bg-red" />
              <span ref={labelRef}>{chapters[0].label}</span>
            </span>
            {/* Celular em pé (tela alta): as peças instaladas, uma por linha, abaixo do vídeo */}
            <ol ref={listRef} className="hero-list">
              {chapters.map((c, i) =>
                i === 0 || c.label === "Entrando na loja" ? null : (
                  <li key={c.label} data-i={i}>
                    <span aria-hidden="true" />
                    {c.label}
                  </li>
                ),
              )}
            </ol>
          </div>
          <div ref={barRef} aria-hidden="true" className="hero-bar absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-red" />
        </div>

        <FinalCTA ref={ctaRef} bgRef={ctaBgRef} bandRef={bandRef} />
      </div>
    </section>
  );
}
