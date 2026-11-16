// Seção "Vídeos". Os 3 primeiros aparecem direto; os outros ficam em "Ver mais vídeos".
// O único texto com humor do site é o título desta seção.
// `servico`: o vídeo também aparece na galeria de Projetos quando alguém filtra por esse serviço.
// O vídeo da própria Ponto X não tem serviço (não é trabalho de cliente).

import type { Service } from "./services";

export type Video = {
  slug: string;
  original: string;
  cliente: string;
  descricao: string;
  servico?: Service;
};

export const videosSection = {
  eyebrow: "Vídeos",
  title: "Aqui o letreiro acende, e o cliente também.",
  more: "Ver mais vídeos",
  less: "Ver menos",
};

export const videos: Video[] = [
  {
    slug: "milklandia-letreiros",
    servico: "Letreiros",
    original: "snapinsta-1794601854383.mp4",
    cliente: "Milklandia Chocolates & Café",
    descricao: "Letreiros da fachada e do interior da loja.",
  },
  {
    slug: "american-crime-letreiro",
    servico: "Letreiros",
    original: "snapinsta-1794601942987.mp4",
    cliente: "American Crime",
    descricao: "Letreiro em letra caixa iluminada na fachada da loja.",
  },
  {
    slug: "san-paolo-letreiros",
    servico: "Letreiros",
    original: "snapinsta-1794601922047.mp4",
    cliente: "San Paolo",
    descricao: "Letreiros iluminados da loja e do quiosque.",
  },
  {
    slug: "maikai-copa",
    servico: "Lonas convencionais e lonas em estrutura",
    original: "snapinsta-1794601801134.mp4",
    cliente: "Maikai",
    descricao: "Ambientação temática da Copa com lonas e painéis.",
  },
  {
    slug: "placas-acrilico",
    servico: "Acrílicos",
    original: "snapinsta-1794602010772.mp4",
    cliente: "[NOME DO CLIENTE]",
    descricao: "Placas de acrílico na fachada de consultórios e escritórios.",
  },
  {
    slug: "ponto-x-loja",
    original: "..mp4",
    cliente: "Ponto X",
    descricao: "Fachada, wind banner e tapete personalizado da própria loja.",
  },
];

export const VISIBLE_VIDEOS = 3;
