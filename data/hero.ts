// Textos e roteiro do vídeo do início (a loja que monta a própria identidade).

export const heroText = {
  h1: "De uma loja em branco a uma marca que impacta.",
  h2: "Fachadas, letreiros, plotagens e tudo o que faz sua marca ser vista.",
};

export const finalCta = {
  headline: "Pronto para colocar sua marca em evidência?",
  text: "Conte sua ideia e receba um orçamento para a comunicação visual da sua empresa.",
  primary: "Solicitar orçamento",
  secondary: "Ver nossos trabalhos",
};

// Momento (em segundos) em que cada elemento aparece no vídeo real
// "Video do inicio 10 segundos.mp4" (10,08 s). Medido quadro a quadro, a cada 0,25 s.
// Se o vídeo mudar, rode `npm run media` e ajuste estes tempos.
export const chapters = [
  // `at` = quando a peça já aparece instalada na tela (não quando começa a surgir).
  { at: 0, label: "Loja em branco" },
  { at: 0.9, label: "Fachada" },
  { at: 2.2, label: "Letreiro PONTO X" },
  { at: 2.7, label: "Banner na entrada" },
  { at: 3.0, label: "Wind banner na calçada" },
  { at: 3.4, label: "Totem iluminado" },
  { at: 4.0, label: "Plotagem do veículo" },
  { at: 4.85, label: "Adesivos em vidros e paredes" },
  { at: 6.1, label: "Entrando na loja" },
  { at: 7.3, label: "Piso e sinalização interna" },
  { at: 8.4, label: "Displays e acrílicos" },
  { at: 9.0, label: "Balcão: crachás, cartões e panfletos" },
] as const;

export const heroMedia = {
  desktop: "/video/hero-desktop.mp4",
  mobile: "/video/hero-mobile.mp4",
  posterDesktop: "/video/hero-poster-desktop.jpg",
  posterMobile: "/video/hero-poster-mobile.jpg",
  duration: 10.08,
};
