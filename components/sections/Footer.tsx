/* eslint-disable @next/next/no-img-element */
import { company, whatsappUrl } from "@/data/company";
import { CurrentYear } from "@/components/CurrentYear";

// Endereço e horário já estão em Contato, logo acima: aqui só o essencial, numa linha, e o logotipo fecha a página.
const linkClass = "inline-block py-3 text-white underline decoration-red decoration-2 underline-offset-4 hover:decoration-white";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-clip bg-ink-2 pt-[clamp(56px,7vw,96px)] text-white">
      <div className="px-[var(--gutter)]">
        <p className="t-statement max-w-[30ch] font-semibold">{company.slogan}</p>
        <ul className="mt-6 flex flex-col gap-3 text-mute sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          <li>
            WhatsApp{" "}
            <a className={linkClass} href={whatsappUrl(company.messages.quote)} target="_blank" rel="noopener noreferrer">
              {company.whatsapp.display}
            </a>
          </li>
          <li>
            Telefone{" "}
            <a className={linkClass} href={company.phone.href}>
              {company.phone.display}
            </a>
          </li>
          <li>
            <a className={`break-all ${linkClass}`} href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </li>
          <li>
            Instagram{" "}
            <a className={linkClass} href={company.instagram.url} target="_blank" rel="noopener noreferrer">
              {company.instagram.handle}
            </a>
          </li>
        </ul>
        <img
          src="/brand/logo-pontox-grande.webp"
          srcSet="/brand/logo-pontox-grande-800.webp 800w, /brand/logo-pontox-grande.webp 1600w"
          sizes="100vw"
          alt="Ponto X Comunicação Visual"
          width={1600}
          height={498}
          loading="lazy"
          decoding="async"
          className="mt-[clamp(48px,6vw,88px)] block h-auto w-full"
        />
      </div>
      <p className="t-small mt-8 bg-ink px-[var(--gutter)] py-5 text-mute">
        © <CurrentYear built={year} /> {company.name}. Maceió – AL.
      </p>
    </footer>
  );
}
