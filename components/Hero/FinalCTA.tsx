import { forwardRef } from "react";
import { finalCta } from "@/data/hero";
import { company, whatsappUrl } from "@/data/company";
import { ArrowRight } from "@/components/icons";

/** Chamada final: aparece quando o vídeo chega ao último quadro (balcão da loja). */
export const FinalCTA = forwardRef<HTMLDivElement, { bgRef: React.Ref<HTMLDivElement>; bandRef: React.Ref<HTMLDivElement> }>(
  function FinalCTA({ bgRef, bandRef }, ref) {
    return (
      <>
        <div
          ref={bgRef}
          aria-hidden="true"
          className="hero-cta-bg absolute inset-0"
        />
        <div
          ref={bandRef}
          aria-hidden="true"
          className="hero-cta-band band left-0 top-[-20%] !h-[140%] opacity-0"
        />
        <div
          ref={ref}
          className="hero-cta absolute inset-x-0 top-0 flex h-[100svh] flex-col justify-end px-[var(--gutter)] pb-[clamp(28px,8svh,104px)]"
        >
          <div className="glass w-full max-w-[min(760px,100%)] p-5 sm:p-8 lg:p-10">
          <h2 className="t-title text-white" data-cta-item>
            {finalCta.headline}
          </h2>
          <p className="t-statement mt-5 max-w-[38ch] text-white" data-cta-item>
            {finalCta.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-cta-item>
            <a className="btn btn-primary" href={whatsappUrl(company.messages.quote)} target="_blank" rel="noopener noreferrer">
              {finalCta.primary}
              <ArrowRight className="arrow" />
            </a>
            <a className="btn btn-ghost text-white" href="#projetos">
              {finalCta.secondary}
            </a>
          </div>
          <p className="t-small mt-4 text-mute" data-cta-item>
            {company.whatsappNote}
          </p>
          </div>
        </div>
      </>
    );
  },
);
