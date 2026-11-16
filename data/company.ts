// Dados da empresa. Edite aqui e o site inteiro é atualizado.

export const company = {
  name: "Ponto X Comunicação Visual",
  shortName: "Ponto X",
  slogan: "Sua marca em evidência desde 2007.",
  foundedYear: 2007,

  // [CONFIRMAR] Endereço do site. Usado no Google e nas prévias de link (WhatsApp, Instagram).
  siteUrl: "https://www.pontoxmaceio.com.br",

  about:
    "A Ponto X Comunicação Visual atua em Maceió desde 2007 com fachadas, letreiros, lonas, plotagens, adesivos, acrílicos, displays e materiais gráficos para empresas de diversos segmentos.",

  address: {
    street: "Av. Dr. Antônio Gomes de Barros, 930",
    complement: "Centro Comercial Wilson Cavalcante",
    district: "Jatiúca",
    city: "Maceió",
    state: "AL",
    zip: "57036-000",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ponto%20X%20Comunica%C3%A7%C3%A3o%20Visual%2C%20Av.%20Dr.%20Ant%C3%B4nio%20Gomes%20de%20Barros%2C%20930%2C%20Macei%C3%B3",

  hours: "Segunda a sexta, das 08h às 18h · Sábado e domingo: fechado",
  hoursShort: "Seg. a sex., 08h às 18h",

  phone: { display: "(82) 3231-3587", href: "tel:+558232313587" },
  whatsapp: { display: "(82) 99111-8530", number: "5582991118530" },
  email: "contato@pontoxmaceio.com.br",
  instagram: { handle: "@pontox_maceio", url: "https://www.instagram.com/pontox_maceio/" },

  messages: {
    quote: "Olá! Vim pelo site da Ponto X e gostaria de solicitar um orçamento.",
    project: (cliente: string) =>
      `Olá! Vi o projeto ${cliente} no site da Ponto X e quero um projeto como este.`,
    // Usada quando o nome do cliente ainda é [NOME DO CLIENTE]. O segmento ajuda a Ponto X a saber qual foto é.
    projectNoName: (servico: string, segmento?: string) =>
      `Olá! Vi no site da Ponto X um projeto de ${servico.toLowerCase()}${segmento ? ` (${segmento.toLowerCase()})` : ""} e quero um projeto como este.`,
    // Cartão no fim da galeria filtrada.
    moreWork: (grupo: string) => `Olá! Vim pelo site da Ponto X e gostaria de ver mais trabalhos de ${grupo.toLowerCase()}.`,
  },

  // Linha curta embaixo dos botões principais: o que acontece ao tocar e quando a loja atende.
  whatsappNote: "Abre o WhatsApp com a mensagem pronta. Atendimento: seg. a sex., 08h às 18h.",
} as const;

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Vídeos", href: "#videos" },
  { label: "Contato", href: "#contato" },
] as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = `${company.address.street} – ${company.address.complement} – ${company.address.district}, ${company.address.city} – ${company.address.state}, CEP ${company.address.zip}`;
