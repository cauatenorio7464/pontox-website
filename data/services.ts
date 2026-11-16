// Serviços da Ponto X. Use SOMENTE estes serviços no site.
// noInicio: peças deste serviço que aparecem no vídeo do início (mesmos nomes da lista do vídeo, em data/hero.ts).

export const serviceGroups = [
  {
    id: "fachadas-letreiros",
    noInicio: ["Fachada","Letreiro PONTO X","Totem iluminado"],
    title: "Fachadas e Letreiros",
    items: ["Fachadas", "Letreiros"],
    photo: "ciocco-fachada-noite",
    alt: "Fachada da Ciocco à noite, com letreiro iluminado por trás das letras.",
  },
  {
    id: "lonas-banners",
    noInicio: ["Banner na entrada","Wind banner na calçada"],
    title: "Lonas e Banners",
    items: ["Lonas convencionais e lonas em estrutura", "Wind banner"],
    photo: "conversa-botequim-lonas",
    alt: "Lonas impressas instaladas em estrutura metálica na fachada do Conversa Botequim.",
  },
  {
    id: "plotagens-adesivos",
    noInicio: ["Plotagem do veículo","Adesivos em vidros e paredes"],
    title: "Plotagens e Adesivos",
    items: ["Plotagem de veículos e paredes", "Adesivos personalizados"],
    photo: "plasticos-maceio-caminhao",
    alt: "Baú de caminhão plotado com a marca Plásticos Maceió.",
  },
  {
    id: "acrilicos-displays",
    noInicio: ["Displays e acrílicos"],
    title: "Acrílicos e Displays",
    items: ["Acrílicos", "Displays"],
    photo: "expresso-decora-placas",
    alt: "Placas de homenagem da Expresso Decora expostas em suportes sobre um balcão.",
  },
  {
    id: "material-grafico",
    noInicio: ["Balcão: crachás, cartões e panfletos"],
    title: "Material Gráfico",
    items: ["Crachás", "Cartões de visita", "Panfletos"],
    photo: "maceio-hospedagens-avisos-de-porta",
    alt: "Avisos de porta impressos com a marca Maceió Hospedagens sobre uma mesa.",
  },
] as const;

export type ServiceGroupId = (typeof serviceGroups)[number]["id"];

// Cada serviço pertence a um grupo. O nome do grupo também vale como serviço
// quando a peça não é exatamente um dos itens (ex.: avisos de porta = Material Gráfico).
export const serviceToGroup = {
  Fachadas: "fachadas-letreiros",
  Letreiros: "fachadas-letreiros",
  "Lonas convencionais e lonas em estrutura": "lonas-banners",
  "Wind banner": "lonas-banners",
  "Plotagem de veículos e paredes": "plotagens-adesivos",
  "Adesivos personalizados": "plotagens-adesivos",
  Acrílicos: "acrilicos-displays",
  Displays: "acrilicos-displays",
  Crachás: "material-grafico",
  "Cartões de visita": "material-grafico",
  Panfletos: "material-grafico",
  "Material Gráfico": "material-grafico",
} as const satisfies Record<string, ServiceGroupId>;

export type Service = keyof typeof serviceToGroup;
