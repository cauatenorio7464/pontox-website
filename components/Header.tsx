"use client";
import { useEffect, useRef, useState } from "react";
import { company, nav, whatsappUrl } from "@/data/company";
import { Close, Menu } from "@/components/icons";

/** Cabeçalho: transparente sobre o vídeo; depois do início, barra de vidro flutuante. Menu sanduíche no celular. */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    let frame = 0;
    const update = () => {
      frame = 0;
      const end = hero ? hero.getBoundingClientRect().bottom : 0;
      setSolid(end <= 72);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const quote = whatsappUrl(company.messages.quote);

  return (
    <header
      // Depois do início: barra de vidro flutuante (afastada do topo e das laterais). Menu aberto: barra sólida.
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color] duration-300 ${
        open ? "bg-ink" : solid ? "px-[calc(var(--gutter)/2)] pt-2.5" : "bg-transparent"
      }`}
    >
      <div className={`flex h-[var(--header-h)] items-center justify-between gap-3 md:gap-6 ${solid && !open ? "nav-glass px-[calc(var(--gutter)/2)]" : "px-[var(--gutter)]"}`}>
        <a href="#inicio" className="relative z-10 block shrink-0 py-1.5" aria-label="Ponto X Comunicação Visual, voltar ao início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-pontox-400.webp" alt="Ponto X Comunicação Visual" width={400} height={124} className="h-[30px] w-auto min-[360px]:h-[34px] sm:h-[38px]" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-base font-semibold text-white decoration-red decoration-2 underline-offset-[0.45em] hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Sobre o vídeo: contorno; com o cabeçalho escuro, botão cheio (é a ação principal do site) */}
          <a className={`btn ${solid ? "btn-primary" : "btn-outline"} min-h-[42px] py-2 text-white`} href={quote} target="_blank" rel="noopener noreferrer">
            Orçamento
          </a>
        </nav>

        {/* Celular: o orçamento fica sempre à mão no topo, ao lado do menu (não é botão flutuante) */}
        <div className="relative z-10 flex items-center gap-2 md:hidden">
          <a
            className={`btn ${solid ? "btn-primary" : "btn-outline"} btn-compact text-white ${open ? "invisible" : ""}`}
            href={quote}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? -1 : undefined}
          >
            Orçamento
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="-mr-2 flex h-12 w-12 items-center justify-center text-white"
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        id="menu-celular"
        ref={panel}
        hidden={!open}
        className="fixed inset-0 top-[var(--header-h)] overflow-y-auto bg-ink px-[var(--gutter)] pb-10 pt-6 md:hidden"
      >
        <span aria-hidden="true" className="band right-[-40px] top-[-40%] opacity-90" />
        <nav aria-label="Menu do celular" className="relative">
          <ul className="flex flex-col">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[2.25rem] font-extrabold leading-tight tracking-tight text-white [font-variation-settings:'wdth'_118]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary mt-8 w-full" href={quote} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Solicitar orçamento
          </a>
          <p className="mt-8 text-mute">
            WhatsApp{" "}
            <a className="inline-block py-2 text-white underline decoration-red decoration-2 underline-offset-4" href={quote} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              {company.whatsapp.display}
            </a>
            <br />
            Telefone{" "}
            <a className="inline-block py-2 text-white underline decoration-red decoration-2 underline-offset-4" href={company.phone.href}>
              {company.phone.display}
            </a>
            <br />
            {company.hoursShort}
          </p>
        </nav>
      </div>
    </header>
  );
}
