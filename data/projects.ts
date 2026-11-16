// Galeria "Projetos": UM card por cliente. Cada cliente tem uma lista de fotos (a primeira é a capa).
// Fotos do mesmo cliente foram juntadas só quando o mesmo nome aparece na placa, fachada ou veículo.
// cliente: nome lido na foto. Se não estiver legível: "[NOME DO CLIENTE]". Nunca adivinhar.
// segmento: deduzido do que a foto mostra. Se não estiver claro: "[SEGMENTO]".
// servicos: todos os serviços que aparecem nas fotos do cliente (o primeiro é o principal).
// ano e detalhes: opcionais. Só aparecem no site quando preenchidos. Nunca inventar.
import type { Service } from "./services";
import sizes from "./generated/image-sizes.json";

export const NO_CLIENT = "[NOME DO CLIENTE]";
export const NO_SEGMENT = "[SEGMENTO]";

export type ProjectPhoto = {
  slug: string; // nome do arquivo em /public/projects (sem -720.webp / -1440.webp)
  original: string; // nome da foto original na pasta do projeto
  alt: string; // descrição da foto (pt-BR)
};

export type Project = {
  id: string;
  cliente: string;
  segmento: string;
  servicos: Service[];
  images: ProjectPhoto[];
  ano?: string;
  detalhes?: string;
};

export const projects: Project[] = [
  {
    id: "bonina-acessorios-fachada",
    cliente: "Bonina Acessórios",
    segmento: "Acessórios",
    servicos: ["Letreiros"],
    images: [
      { slug: "bonina-acessorios-fachada", original: "bonina.PNG", alt: "Fachada da loja Bonina Acessórios em shopping, com letreiro iluminado sobre parede rosada." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "plasticos-maceio-caminhao",
    cliente: "Plásticos Maceió",
    segmento: "Indústria e comércio de plásticos",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "plasticos-maceio-caminhao", original: "caminhao.WEBP", alt: "Baú de caminhão plotado com a marca Plásticos Maceió, com detalhes da plotagem em close." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "maple-bear",
    cliente: "Maple Bear",
    segmento: "Escola",
    servicos: ["Fachadas", "Letreiros"],
    images: [
      { slug: "maple-bear-fachada-frontal", original: "maple bear 2.jpeg", alt: "Fachada da Maple Bear Canadian School com escudos, letreiro e painel vermelho vazado." },
      { slug: "maple-bear-logotipo-relevo", original: "maple bear 3.jpeg", alt: "Fachada da escola Maple Bear com folha de bordo vermelha em relevo e letreiro na parede de madeira." },
      { slug: "maple-bear-escudos", original: "maple bear 4.jpeg", alt: "Escudos da Maple Bear em relevo na lateral cinza do prédio da escola." },
      { slug: "maple-bear-vista-aerea", original: "maple bear.jpeg", alt: "Vista aérea da fachada da escola Maple Bear, com folha de bordo e escudos da marca." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "conversa-botequim",
    cliente: "Conversa Botequim",
    segmento: "Bar",
    servicos: ["Fachadas", "Lonas convencionais e lonas em estrutura"],
    images: [
      { slug: "conversa-botequim-fachada", original: "conversa 2.jpeg", alt: "Fachada do Conversa Botequim com placas azuis e parede de cobogó branco." },
      { slug: "conversa-botequim-esquina", original: "conversa 3.jpeg", alt: "Esquina do Conversa Botequim com placas da marca na fachada azul e no alto do prédio." },
      { slug: "conversa-botequim-lonas", original: "conversa.jpeg", alt: "Lonas impressas presas em estrutura metálica na fachada do Conversa Botequim." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "ciocco",
    cliente: "Ciocco Cookies & Biscoitos",
    segmento: "Cookies e biscoitos",
    servicos: ["Letreiros", "Fachadas"],
    images: [
      { slug: "ciocco-fachada-noite", original: "ciocco 2.jpeg", alt: "Fachada da Ciocco à noite, com letreiro iluminado por trás das letras e mesas na varanda." },
      { slug: "ciocco-fachada-dia", original: "ciocco.jpeg", alt: "Fachada branca da Ciocco durante o dia, com letreiro em relevo e porta amarela." },
      { slug: "ciocco-luminoso", original: "ciocco 3.jpeg", alt: "Luminoso redondo da Ciocco preso à fachada, contra o céu azul." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "coralia-pousada-carro",
    cliente: "Corália Pousada",
    segmento: "Pousada",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "coralia-pousada-carro", original: "carro byad.WEBP", alt: "Carro branco plotado com faixas azuis e a marca Corália Pousada." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "expresso-decora-placas",
    cliente: "Expresso Decora",
    segmento: NO_SEGMENT,
    servicos: ["Displays"],
    images: [
      { slug: "expresso-decora-placas", original: "IMG_6540.JPG.jpeg", alt: "Duas placas de homenagem da Expresso Decora em suportes pretos sobre um balcão de madeira." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "casa-bauducco-fachada",
    cliente: "Casa Bauducco",
    segmento: "Cafeteria e loja",
    servicos: ["Letreiros"],
    images: [
      { slug: "casa-bauducco-fachada", original: "casa bauducco.WEBP", alt: "Fachada da Casa Bauducco em shopping, com letreiro iluminado sobre revestimento de tijolos." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "maceio-hospedagens-avisos-de-porta",
    cliente: "Maceió Hospedagens",
    segmento: "Hospedagem",
    servicos: ["Material Gráfico"],
    images: [
      { slug: "maceio-hospedagens-avisos-de-porta", original: "905240455_1672261067934315_4208987572472246042_n.WEBP", alt: "Avisos de porta impressos com a frase Quero limpeza e a marca Maceió Hospedagens." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "hustle-fight-letreiro",
    cliente: "Hustle Fight",
    segmento: "Academia de lutas",
    servicos: ["Letreiros"],
    images: [
      { slug: "hustle-fight-letreiro", original: "hustle.WEBP", alt: "Letreiro iluminado Hustle Fight na fachada de um prédio, à noite." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "trakto-show",
    cliente: "Trakto Show",
    segmento: "Evento",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "trakto-show-fusca-frente", original: "fusca 2.WEBP", alt: "Fusca preto plotado com a marca Trakto Show e desenhos de coqueiros no capô." },
      { slug: "trakto-show-fusca-lateral", original: "fusca.WEBP", alt: "Lateral e vidro traseiro de um Fusca preto plotado com arte colorida da Trakto." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "adidas-fachada",
    cliente: "Adidas",
    segmento: "Moda esportiva",
    servicos: ["Letreiros"],
    images: [
      { slug: "adidas-fachada", original: "adidas.PNG", alt: "Fachada da loja Adidas Originals em shopping, com logotipo iluminado na fachada e na vitrine." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "boteco-da-bola",
    cliente: "Boteco da Bola",
    segmento: "Bar",
    servicos: ["Letreiros"],
    images: [
      { slug: "boteco-da-bola-totem-noite", original: "boteco da bola.WEBP", alt: "Totem luminoso do Boteco da Bola aceso à noite, ao lado de uma palmeira iluminada." },
      { slug: "boteco-da-bola-totem-dia", original: "boteco da bola 2.WEBP", alt: "Totem verde do Boteco da Bola durante o dia, em frente a um comércio." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "new-era-tapume",
    cliente: "New Era",
    segmento: "Moda",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "new-era-tapume", original: "newera.WEBP", alt: "Tapume de loja em shopping coberto com arte da New Era e o aviso Em breve, uma nova loja aqui." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "maikai-letreiros-luminosos",
    cliente: "Maikai",
    segmento: "Bar",
    servicos: ["Letreiros"],
    images: [
      { slug: "maikai-letreiros-luminosos", original: "905485936_1703885778044311_1850630863874618709_n.WEBP", alt: "Letreiros luminosos empilhados com as marcas Maikai, Goold, Shark, Budweiser e Negroni." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "sal-e-brasa-totem",
    cliente: "Sal e Brasa",
    segmento: "Churrascaria",
    servicos: ["Letreiros"],
    images: [
      { slug: "sal-e-brasa-totem", original: "sal e brasa.WEBP", alt: "Totem luminoso da churrascaria Sal e Brasa à beira de uma avenida." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "pet-shop-veiculo",
    cliente: NO_CLIENT,
    segmento: "Pet shop e clínica veterinária",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "pet-shop-veiculo", original: "carro combe.jpeg", alt: "Picape plotada em azul e laranja com fotos de cães e gato e a lista de serviços de pet shop." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "le-frutan",
    cliente: "Le Frutan",
    segmento: "Sucos e lanches",
    servicos: ["Letreiros"],
    images: [
      { slug: "le-frutan-quiosque", original: "lefrutan.jpeg", alt: "Quiosque Le Frutan à noite, com letreiro luminoso e logotipo em forma de copo de suco." },
      { slug: "le-frutan-quiosque-letreiro", original: "IMG_6551.JPG.jpeg", alt: "Logotipo luminoso em forma de copo de suco no quiosque Le Frutan, ao entardecer." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "kascao-letreiro",
    cliente: "Kascão",
    segmento: NO_SEGMENT,
    servicos: ["Letreiros"],
    images: [
      { slug: "kascao-letreiro", original: "kaskao.jpeg", alt: "Letreiro vermelho Kascão em letras caixa, fixado em fachada de tijolos." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "materiais-construcao-veiculo",
    cliente: NO_CLIENT,
    segmento: "Materiais de construção",
    servicos: ["Plotagem de veículos e paredes"],
    images: [
      { slug: "materiais-construcao-veiculo", original: "carro.WEBP", alt: "Carro plotado em amarelo com marcas de impermeabilizantes e produtos de construção." },
    ],
    ano: "",
    detalhes: "",
  },
  {
    id: "noma-dila-fachada",
    cliente: "Noma Flor e Arte e Dila",
    segmento: NO_SEGMENT,
    servicos: ["Letreiros"],
    images: [
      { slug: "noma-dila-fachada", original: "906103415_1152521057718070_8092168104621255314_n.WEBP", alt: "Prédio comercial branco com letreiros das marcas Noma flor e arte e Dila." },
    ],
    ano: "",
    detalhes: "",
  },
];

export function imageSize(slug: string) {
  return (sizes as Record<string, { w: number; h: number }>)[slug] ?? { w: 1440, h: 1800 };
}

export function projectImage(slug: string, w: 720 | 1440) {
  return `/projects/${slug}-${w}.webp`;
}
