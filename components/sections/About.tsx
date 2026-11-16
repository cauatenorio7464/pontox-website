import { company } from "@/data/company";
import { WordReveal } from "@/components/effects/WordReveal";
import { Rise } from "@/components/effects/Rise";
import { ProjectImage } from "@/components/ProjectImage";

const facts = [`${company.address.district}, ${company.address.city} – ${company.address.state}`, company.hoursShort];

export function About() {
  return (
    <section
      id="quem-somos"
      aria-labelledby="quem-somos-titulo"
      className="relative overflow-clip bg-ink-2 py-[clamp(72px,13vw,200px)] text-white"
    >
      <span aria-hidden="true" className="band right-[8%] top-[-70%] hidden md:block" />
      <div className="relative grid gap-y-14 px-[var(--gutter)] md:grid-cols-12 md:gap-x-8">
        <Rise className="md:col-span-5 lg:col-span-4">
          <div className="cut-tr relative aspect-[4/5] overflow-hidden bg-ink-3">
            <ProjectImage
              slug="producao-impressao"
              alt="Impressora de grande formato imprimindo material gráfico em papel kraft."
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 92vw"
              className="h-full w-full object-cover"
            />
          </div>
        </Rise>

        <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6 md:self-center">
          <p className="eyebrow text-white">{company.slogan}{/* taste-skill-ignore: sobretítulo pedido no briefing */}</p>
          <WordReveal id="quem-somos-titulo" text="Quem somos" className="t-title mt-5" />
          <Rise delay={120}>
            <p className="t-statement mt-8 max-w-[40ch]">{company.about}</p>
          </Rise>
          <Rise delay={220}>
            <p className="t-small mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold text-mute">
              {facts.map((f, i) => (
                <span key={f} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="inline-block h-3 w-1.5 -skew-x-[36deg] bg-red" />}
                  {f}
                </span>
              ))}
            </p>
          </Rise>
        </div>
      </div>
    </section>
  );
}
