import { forwardRef } from "react";
import { heroText } from "@/data/hero";

function LedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="led-word" style={{ ["--i" as string]: i }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/** H1 (acende como letreiro de LED, uma vez) e H2, sobre o primeiro quadro do vídeo. */
export const IntroText = forwardRef<HTMLDivElement, { h1Ref: React.Ref<HTMLHeadingElement>; h2Ref: React.Ref<HTMLHeadingElement> }>(
  function IntroText({ h1Ref, h2Ref }, ref) {
    return (
      <div ref={ref} className="hero-intro pointer-events-none absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-[clamp(56px,9svh,88px)] md:pb-[clamp(28px,7svh,88px)]">
        <h1
          ref={h1Ref}
          className="font-sign led-on led-lit max-w-[min(900px,100%)] text-balance text-[clamp(2.75rem,7.4vw,6rem)] text-white"
        >
          <LedWords text={heroText.h1} />
        </h1>
        <h2
          ref={h2Ref}
          className="hero-h2 font-sign led-lit absolute bottom-[clamp(56px,9svh,88px)] left-[var(--gutter)] md:bottom-[clamp(28px,7svh,88px)] right-[var(--gutter)] max-w-[min(1040px,100%)] text-balance text-[clamp(2.25rem,4.7vw,4.4rem)] text-white"
        >
          {heroText.h2}
        </h2>
      </div>
    );
  },
);
