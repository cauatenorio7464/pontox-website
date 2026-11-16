// "Algumas marcas que atendemos": só clientes que aparecem em Projetos com o nome legível.
// logo: recortado da própria foto/vídeo do trabalho da Ponto X (scripts/brand-logos.cjs, `npm run logos`).
//       Nunca redesenhado nem baixado da internet. Sem logo limpo na foto: o nome aparece em texto.
// tom "escuro": as cores originais do logo são escuras (fica sempre sobre uma plaquinha clara para aparecer).

export const brandsTitle = "Algumas marcas que atendemos";

export type Brand = {
  name: string;
  logo?: { src: string; w: number; h: number; tone: "claro" | "escuro" };
};

const logo = (id: string, w: number, tone: "claro" | "escuro" = "claro") => ({ src: `/brands/${id}.webp`, w, h: 120, tone });

// A ordem alterna logo e nome para as duas faixas ficarem equilibradas.
export const brands: Brand[] = [
  { name: "Milklandia", logo: logo("milklandia", 213, "escuro") },
  { name: "Adidas" },
  { name: "Hustle Fight", logo: logo("hustle-fight", 676) },
  { name: "Casa Bauducco" },
  { name: "Ciocco Cookies & Biscoitos", logo: logo("ciocco", 361, "escuro") },
  { name: "Boteco da Bola" },
  { name: "Maikai", logo: logo("maikai", 381) },
  { name: "New Era" },
  { name: "Conversa Botequim", logo: logo("conversa-botequim", 282) },
  { name: "Le Frutan" },
  { name: "American Crime", logo: logo("american-crime", 382) },
  { name: "Sal e Brasa" },
  { name: "Maple Bear", logo: logo("maple-bear", 485, "escuro") },
  { name: "San Paolo" },
  { name: "Bonina Acessórios", logo: logo("bonina", 316) },
  { name: "Plásticos Maceió" },
  { name: "Kascão", logo: logo("kascao", 255) },
  { name: "Corália Pousada" },
  { name: "Trakto Show", logo: logo("trakto-show", 553) },
  { name: "Expresso Decora" },
  { name: "Noma Flor e Arte", logo: logo("noma", 161, "escuro") },
  { name: "Maceió Hospedagens" },
  { name: "Dila" },
];
