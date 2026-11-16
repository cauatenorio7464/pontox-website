// npm run logos: recorta logos das fotos reais (sem redesenhar): corta a área, separa do fundo pela diferença de cor,
// apara as bordas e salva WebP transparente. Também gera uma folha de conferência.
const sharp = require("sharp");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const W = require("os").tmpdir();
const OUT = process.argv[2] || path.join(ROOT, "public", "brands");
const only = process.argv[3] ? process.argv[3].split(",") : null;
const L = require("./brand-logos.json");
// Quadros de vídeo usados como fonte (o logo aparece no vídeo do cliente).
const FRAMES = { "src/milklandia.png": ["public/videos/milklandia-letreiros.mp4", 8.2], "src/american.png": ["public/videos/american-crime-letreiro.mp4", 12.5] };
const { execFileSync } = require("child_process");
require("fs").mkdirSync(path.join(W, "src"), { recursive: true });
for (const [frame, [video, t]] of Object.entries(FRAMES)) execFileSync(require("ffmpeg-static"), ["-v", "error", "-y", "-ss", String(t), "-i", path.join(ROOT, video), "-frames:v", "1", path.join(W, frame)]);

const smooth = (a, b, v) => (v <= a ? 0 : v >= b ? 1 : ((v - a) / (b - a)) ** 2 * (3 - 2 * ((v - a) / (b - a))));
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

async function one(c) {
  const file = c.file.startsWith("W:") ? `${W}/${c.file.slice(2)}` : `${ROOT}/${c.file}`;
  const meta = await sharp(file).metadata();
  const [x0, y0, x1, y1] = c.box;
  const left = Math.round(x0 * meta.width), top = Math.round(y0 * meta.height);
  const width = Math.round((x1 - x0) * meta.width), height = Math.round((y1 - y0) * meta.height);
  let img = sharp(file).extract({ left, top, width, height });
  if (c.rot) img = sharp(await img.toBuffer()).rotate(c.rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  // Cor do fundo: mediana da borda (4%).
  const bw = Math.max(2, Math.round(Math.min(w, h) * 0.04));
  const rs = [], gs = [], bs = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (x >= bw && x < w - bw && y >= bw && y < h - bw) continue;
    const i = (y * w + x) * 4;
    if (data[i + 3] < 200) continue;
    rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
  }
  const med = (a) => a.sort((p, q) => p - q)[a.length >> 1];
  const bg = [med(rs), med(gs), med(bs)];
  const bgL = lum(...bg);
  const [t0, t1] = c.t || [40, 90];
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h * 4; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let v;
    if (c.mode === "light") v = lum(r, g, b) - bgL;
    else if (c.mode === "dark") v = bgL - lum(r, g, b);
    else if (c.mode === "red") v = r - Math.max(g, b);
    else if (c.mode === "green") v = g - Math.max(r, b) + Math.max(0, bgL - lum(r, g, b)) * 0.25;
    else v = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
    const a = smooth(t0, t1, v) * (data[i + 3] / 255);
    out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = Math.round(a * 255);
  }
  // Áreas a apagar (frações do recorte): restos de fundo que não encostam na borda.
  for (const [ex0, ey0, ex1, ey1] of c.erase || []) {
    for (let y = Math.floor(ey0 * h); y < Math.ceil(ey1 * h); y++) for (let x = Math.floor(ex0 * w); x < Math.ceil(ex1 * w); x++) out[(y * w + x) * 4 + 3] = 0;
  }
  // Limpeza: pedaços opacos que encostam na borda do recorte são resto de fundo (janela, prateleira) e saem.
  if (c.clearEdges === true) {
    const seen = new Uint8Array(w * h), stack = [];
    const push = (x, y) => { const k = y * w + x; if (x < 0 || y < 0 || x >= w || y >= h || seen[k] || out[k * 4 + 3] < 40) return; seen[k] = 1; stack.push(k); };
    for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
    for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
    while (stack.length) { const k = stack.pop(); out[k * 4 + 3] = 0; const x = k % w, y = (k / w) | 0; push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1); }
  }
  let res = sharp(out, { raw: { width: w, height: h, channels: 4 } });
  // Apara a área transparente em volta.
  res = sharp(await res.png().toBuffer()).trim({ threshold: 10 });
  const buf = await res.png().toBuffer();
  const m2 = await sharp(buf).metadata();
  const H = 120;
  const final = sharp(buf).resize({ height: H, width: Math.min(720, Math.round(m2.width * H / m2.height)), fit: "inside" });
  const dest = `${OUT}/${c.id}.webp`;
  await final.webp({ quality: 90, alphaQuality: 100 }).toFile(dest);
  const fm = await sharp(dest).metadata();
  return { id: c.id, src: `${width}x${height}`, out: `${fm.width}x${fm.height}`, bg: bg.join(","), dest };
}

(async () => {
  require("fs").mkdirSync(OUT, { recursive: true });
  const list = L.filter((c) => !only || only.includes(c.id));
  const done = [];
  for (const c of list) { try { done.push(await one(c)); } catch (e) { console.log("ERRO", c.id, e.message); } }
  for (const d of done) console.log(d.id, "corte", d.src, "-> logo", d.out, "fundo", d.bg);
})();
