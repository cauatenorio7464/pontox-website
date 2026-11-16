"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps, processTitle } from "@/data/process";
import { WordReveal } from "@/components/effects/WordReveal";

/** "Como trabalhamos": linha do tempo que se desenha com a rolagem (catálogo naocodei). */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current!;
    const steps = Array.from(section.querySelectorAll<HTMLElement>("[data-step]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      steps.forEach((s) => s.classList.add("is-on"));
      gsap.set(lineRef.current, { scaleX: 1, scaleY: 1 });
      return;
    }
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
      const desktop = c.conditions?.desktop;
      gsap.set(lineRef.current, desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 });
      gsap.to(lineRef.current, {
        [desktop ? "scaleX" : "scaleY"]: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.querySelector("ol"),
          start: "top 78%",
          end: desktop ? "bottom 62%" : "bottom 70%",
          scrub: 0.4,
          onUpdate(self) {
            steps.forEach((s, i) => s.classList.toggle("is-on", self.progress >= (i / steps.length) * 0.92));
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-trabalhamos"
      aria-labelledby="processo-titulo"
      className="slant-top relative overflow-clip bg-red pb-[clamp(56px,7vw,104px)] pt-[clamp(80px,12vw,180px)] text-white [&_:focus-visible]:outline-white"
    >
      <span aria-hidden="true" className="band left-[-60px] top-[-80%] hidden !bg-ink opacity-90 md:block" />
      <div className="relative px-[var(--gutter)]">
        <WordReveal id="processo-titulo" text={processTitle} className="t-title md:ml-[34%]" />

        <div className="relative mt-[clamp(56px,7vw,96px)]">
          {/* Trilho da linha do tempo */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-1 bg-[rgb(18_20_28/0.3)] md:left-0 md:top-[19px] md:h-1 md:w-full"
          />
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-1 origin-top bg-white md:left-0 md:top-[19px] md:h-1 md:w-full md:origin-left"
          />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {processSteps.map((s, i) => (
              <li key={s.title} data-step className="group grid grid-cols-[40px_1fr] gap-x-6 md:block">
                <span
                  aria-hidden="true"
                  className="cut-tr flex h-10 w-10 [--cut:10px] items-center justify-center bg-ink text-lg font-extrabold text-white transition-colors duration-500 group-[.is-on]:bg-white group-[.is-on]:text-red"
                >
                  {i + 1}
                </span>
                <div className="glass p-5 md:mt-8 md:p-6">
                  <h3 className="t-name text-[1.75rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-[1.0625rem] text-white">{s.text}</p>
                  {s.confirmar && <span className="tag-pendente mt-4 block opacity-100">[CONFIRMAR]</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
