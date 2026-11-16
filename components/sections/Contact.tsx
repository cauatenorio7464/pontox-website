/* eslint-disable @next/next/no-img-element */
import { company, fullAddress, whatsappUrl } from "@/data/company";
import { WordReveal } from "@/components/effects/WordReveal";
import { Rise } from "@/components/effects/Rise";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass grid gap-1 px-5 py-4 sm:grid-cols-[120px_1fr] sm:gap-6">
      <dt className="t-small font-semibold text-mute">{label}</dt>
      <dd className="text-[1.0625rem] font-semibold text-white">{children}</dd>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="glow glow-soft slant-top-r relative overflow-clip bg-ink py-[clamp(96px,12vw,180px)]">
      {/* Celular: título, contatos (WhatsApp primeiro) e a foto por último. Computador: título e foto à esquerda, contatos à direita. */}
      <div className="relative grid gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-10">
        <div className="lg:col-span-5">
          <WordReveal id="contato-titulo" text="Contato" className="t-title text-white" />
          <p className="t-statement mt-6 max-w-[30ch] text-white">
            Fale com a Ponto X pelo WhatsApp, telefone ou e-mail, ou visite a loja na Jatiúca.
          </p>
        </div>

        <Rise className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" delay={80}>
          <dl className="grid gap-2">
            <Row label="WhatsApp">
              <span className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {company.whatsapp.display}
                <a className="btn btn-primary" href={whatsappUrl(company.messages.quote)} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                  <ArrowRight className="arrow" />
                </a>
              </span>
              <span className="t-small mt-3 block font-normal text-mute">{company.whatsappNote}</span>
            </Row>
            <Row label="Endereço">
              <span className="block">{fullAddress}</span>
              <span className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a className="btn btn-ghost self-start text-white" href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Como chegar
                  <ArrowUpRight className="arrow" size={18} />
                </a>
                <span className="t-small font-medium text-mute">{company.hours}</span>
              </span>
            </Row>
            <Row label="Telefone">
              <a className="inline-block py-3 underline decoration-red decoration-2 underline-offset-4 hover:decoration-white" href={company.phone.href}>
                {company.phone.display}
              </a>
            </Row>
            <Row label="E-mail">
              <a className="inline-block break-all py-3 underline decoration-red decoration-2 underline-offset-4 hover:decoration-white" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </Row>
            <Row label="Instagram">
              <a className="inline-block py-3 underline decoration-red decoration-2 underline-offset-4 hover:decoration-white" href={company.instagram.url} target="_blank" rel="noopener noreferrer">
                {company.instagram.handle}
              </a>
            </Row>
          </dl>
        </Rise>

        <Rise delay={120} className="w-full max-w-[420px] lg:col-span-5 lg:row-start-2">
          <div className="cut-tr aspect-[5/4] overflow-hidden bg-ink-2">
            <img
              src="/brand/loja-pontox.webp"
              alt="Wind banner da Ponto X na calçada da loja, com a lista de serviços, o telefone e o Instagram."
              width={720}
              height={588}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </Rise>
      </div>
    </section>
  );
}
