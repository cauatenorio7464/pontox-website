// Prepara fotos e vídeos para a web, SEM alterar os arquivos originais da pasta.
// Uso: npm run media
// Rode de novo sempre que trocar o vídeo do início ou adicionar fotos/vídeos
// (depois de adicionar a linha correspondente nas listas abaixo e em /data).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import ffmpegStatic from "ffmpeg-static";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const FFMPEG = process.env.FFMPEG_PATH || ffmpegStatic;

if (!FFMPEG || !fs.existsSync(FFMPEG)) {
  console.error(
    "ffmpeg não encontrado. Rode: npm install-scripts approve ffmpeg-static && npm rebuild ffmpeg-static",
  );
  process.exit(1);
}

const ff = (...args) => execFileSync(FFMPEG, ["-v", "error", "-y", ...args], { stdio: "inherit" });
const src = (name) => {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) throw new Error(`Arquivo original não encontrado: ${name}`);
  return p;
};
const mk = (dir) => fs.mkdirSync(path.join(PUB, dir), { recursive: true });
const out = (...p) => path.join(PUB, ...p);

const HERO_SOURCE = "Video do inicio 10 segundos.mp4";

// Foto original -> nome usado no site (/public/projects/<slug>-720.webp e -1440.webp)
const PHOTOS = {
  "905240455_1672261067934315_4208987572472246042_n.WEBP": "maceio-hospedagens-avisos-de-porta",
  "905451626_1179515915032205_8825930748887582367_n.WEBP": "producao-impressao",
  "905485936_1703885778044311_1850630863874618709_n.WEBP": "maikai-letreiros-luminosos",
  "906103415_1152521057718070_8092168104621255314_n.WEBP": "noma-dila-fachada",
  "IMG_6540.JPG.jpeg": "expresso-decora-placas",
  "IMG_6551.JPG.jpeg": "le-frutan-quiosque-letreiro",
  "adidas.PNG": "adidas-fachada",
  "bonina.PNG": "bonina-acessorios-fachada",
  "boteco da bola 2.WEBP": "boteco-da-bola-totem-dia",
  "boteco da bola.WEBP": "boteco-da-bola-totem-noite",
  "caminhao.WEBP": "plasticos-maceio-caminhao",
  "carro byad.WEBP": "coralia-pousada-carro",
  "carro combe.jpeg": "pet-shop-veiculo",
  "carro.WEBP": "materiais-construcao-veiculo",
  "casa bauducco.WEBP": "casa-bauducco-fachada",
  "ciocco 2.jpeg": "ciocco-fachada-noite",
  "ciocco 3.jpeg": "ciocco-luminoso",
  "ciocco.jpeg": "ciocco-fachada-dia",
  "conversa 2.jpeg": "conversa-botequim-fachada",
  "conversa 3.jpeg": "conversa-botequim-esquina",
  "conversa.jpeg": "conversa-botequim-lonas",
  "fusca 2.WEBP": "trakto-show-fusca-frente",
  "fusca.WEBP": "trakto-show-fusca-lateral",
  "hustle.WEBP": "hustle-fight-letreiro",
  "kaskao.jpeg": "kascao-letreiro",
  "lefrutan.jpeg": "le-frutan-quiosque",
  "maple bear 2.jpeg": "maple-bear-fachada-frontal",
  "maple bear 3.jpeg": "maple-bear-logotipo-relevo",
  "maple bear 4.jpeg": "maple-bear-escudos",
  "maple bear.jpeg": "maple-bear-vista-aerea",
  "newera.WEBP": "new-era-tapume",
  "sal e brasa.WEBP": "sal-e-brasa-totem",
};

// Vídeo original -> nome no site + segundo do quadro usado como capa
const VIDEOS = {
  "snapinsta-1794601854383.mp4": { slug: "milklandia-letreiros", poster: 8.2 },
  "snapinsta-1794601942987.mp4": { slug: "american-crime-letreiro", poster: 6 },
  "snapinsta-1794601922047.mp4": { slug: "san-paolo-letreiros", poster: 0.6 },
  "..mp4": { slug: "ponto-x-loja", poster: 0.3 },
  "snapinsta-1794601801134.mp4": { slug: "maikai-copa", poster: 0.6 },
  "snapinsta-1794602010772.mp4": { slug: "placas-acrilico", poster: 9.5 },
};

async function logo() {
  mk("brand");
  const file = src("Logotipo Ponto X em Vermelho e Branco.png");
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // Recorte automático + fundo preto vira transparente (o logotipo continua sendo a imagem original).
  let minX = width, minY = height, maxX = 0, maxY = 0;
  const reds = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const m = Math.max(r, g, b);
      if (m > 40) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
      if (r > 150 && g < 50 && b < 60) reds.push([r, g, b]);
      const a = Math.min(1, m / 140);
      data[i + 3] = Math.round(a * 255);
      if (a > 0 && a < 1) {
        data[i] = Math.min(255, Math.round(r / a));
        data[i + 1] = Math.min(255, Math.round(g / a));
        data[i + 2] = Math.min(255, Math.round(b / a));
      }
    }
  }
  const pad = 6;
  const box = {
    left: Math.max(0, minX - pad),
    top: Math.max(0, minY - pad),
    width: Math.min(width, maxX + pad) - Math.max(0, minX - pad),
    height: Math.min(height, maxY + pad) - Math.max(0, minY - pad),
  };
  const base = sharp(data, { raw: { width, height, channels: 4 } }).extract(box);
  await base.clone().resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(out("brand", "logo-pontox.png"));
  await base.clone().resize({ width: 1600 }).webp({ quality: 90, alphaQuality: 95 }).toFile(out("brand", "logo-pontox-grande.webp"));
  // Versões leves: cabeçalho (até 3x a 38px de altura) e rodapé no celular.
  await base.clone().resize({ width: 400 }).webp({ quality: 90, alphaQuality: 95 }).toFile(out("brand", "logo-pontox-400.webp"));
  await base.clone().resize({ width: 800 }).webp({ quality: 88, alphaQuality: 95 }).toFile(out("brand", "logo-pontox-grande-800.webp"));

  const med = (k) => reds.map((c) => c[k]).sort((a, b) => a - b)[Math.floor(reds.length / 2)];
  const hex = "#" + [med(0), med(1), med(2)].map((v) => v.toString(16).padStart(2, "0")).join("");
  console.log(`Vermelho do logotipo (mediana): ${hex}  · recorte ${box.width}x${box.height}`);

  // Ícone da aba: o X vermelho do logotipo sobre fundo escuro.
  let xMin = width, xMax = 0, yMin = height, yMax = 0;
  for (let y = 0; y < height; y++) for (let x = Math.floor(width * 0.55); x < width; x++) {
    const i = (y * width + x) * 4;
    if (data[i] > 150 && data[i + 1] < 60 && data[i + 3] > 200) {
      xMin = Math.min(xMin, x); xMax = Math.max(xMax, x); yMin = Math.min(yMin, y); yMax = Math.max(yMax, y);
    }
  }
  // Só os pixels vermelhos (o X), sem as letras brancas que ficam ao lado.
  const redOnly = Buffer.from(data);
  for (let i = 0; i < redOnly.length; i += 4) {
    if (!(redOnly[i] > 110 && redOnly[i] - redOnly[i + 1] > 70)) redOnly[i + 3] = 0;
  }
  const xMark = await sharp(redOnly, { raw: { width, height, channels: 4 } })
    .extract({ left: xMin, top: yMin, width: xMax - xMin + 1, height: yMax - yMin + 1 })
    .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: "#130d0e" } })
    .composite([{ input: xMark, left: 56, top: 56 }])
    .png()
    .toFile(path.join(ROOT, "app", "icon.png"));
}

function hero() {
  mk("video");
  const s = src(HERO_SOURCE);
  // Quadro-chave a cada 6 quadros: a rolagem consegue "pular" para qualquer ponto do vídeo rapidamente.
  const common = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-g", "6", "-keyint_min", "6", "-sc_threshold", "0", "-movflags", "+faststart"];
  ff("-i", s, ...common, "-profile:v", "high", "-crf", "21", "-vf", "scale=1280:-2", out("video", "hero-desktop.mp4"));
  // Celular em pé: recorte quadrado mais leve, centrado no letreiro PONTO X (~40% da largura), não na porta.
  // Celular: o quadro inteiro (16:9), menor e mais leve, para todas as peças aparecerem.
  const mobileScale = "scale=960:-2";
  ff("-i", s, ...common, "-profile:v", "main", "-crf", "25", "-vf", mobileScale, out("video", "hero-mobile.mp4"));
  ff("-i", s, "-frames:v", "1", "-q:v", "3", "-vf", "scale=1280:-2", out("video", "hero-poster-desktop.jpg"));
  ff("-i", s, "-frames:v", "1", "-q:v", "4", "-vf", mobileScale, out("video", "hero-poster-mobile.jpg"));
  // Imagem de compartilhamento (WhatsApp, Facebook): loja já com a identidade completa.
  ff("-ss", "5.6", "-i", s, "-frames:v", "1", "-q:v", "3", "-vf", "scale=1200:-2,crop=1200:630:0:(in_h-630)/2", out("brand", "og-image.jpg"));
}

async function photos() {
  mk("projects");
  const dims = {};
  for (const [file, slug] of Object.entries(PHOTOS)) {
    const input = src(file);
    for (const w of [720, 1440]) {
      const info = await sharp(input)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: w === 720 ? 74 : 80 })
        .toFile(out("projects", `${slug}-${w}.webp`));
      if (w === 1440) dims[slug] = { w: info.width, h: info.height };
    }
  }
  fs.mkdirSync(path.join(ROOT, "data", "generated"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "data", "generated", "image-sizes.json"), JSON.stringify(dims, null, 2));
  console.log(`${Object.keys(dims).length} fotos convertidas para WebP.`);
}

async function videos() {
  mk("videos");
  for (const [file, { slug, poster }] of Object.entries(VIDEOS)) {
    const s = src(file);
    ff("-i", s, "-c", "copy", "-movflags", "+faststart", out("videos", `${slug}.mp4`));
    const tmp = out("videos", `${slug}-poster.png`);
    ff("-ss", String(poster), "-i", s, "-frames:v", "1", tmp);
    await sharp(tmp).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out("videos", `${slug}-poster.webp`));
    fs.rmSync(tmp);
  }
  // Foto real do wind banner na calçada da Ponto X (quadro do vídeo institucional) para a seção Contato.
  // Recorte da metade de baixo: evita a legenda do Instagram que fica no meio do quadro.
  const tmp = out("brand", "loja-tmp.png");
  ff("-ss", "2.5", "-i", src("..mp4"), "-frames:v", "1", "-vf", "crop=in_w:in_h*0.46:0:in_h*0.54", tmp);
  await sharp(tmp).resize({ width: 720 }).webp({ quality: 80 }).toFile(out("brand", "loja-pontox.webp"));
  fs.rmSync(tmp);
  console.log(`${Object.keys(VIDEOS).length} vídeos preparados.`);
}

await logo();
hero();
await photos();
await videos();
console.log("Pronto. Arquivos em /public.");
