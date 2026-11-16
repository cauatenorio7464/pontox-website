# Site da Ponto X: guia rápido

## Abrir no seu computador

No terminal, dentro desta pasta:

```bash
npm install      # só na primeira vez (baixa as dependências)
npm run dev      # abre o site em modo de desenvolvimento
```

Depois abra **http://localhost:3000** no navegador. Ao salvar um arquivo, a página atualiza sozinha.

## Gerar a versão final (para publicar)

```bash
npm run build    # cria a pasta out/ com o site pronto
npm start        # (opcional) testa a pasta out/ em http://localhost:3000
```

- **Vercel:** conecte a pasta/projeto e publique. A Vercel roda `npm run build` sozinha.
- **Hospedagem comum (Hostinger, Locaweb etc.):** envie **o conteúdo** da pasta `out/` por FTP para a pasta pública (`public_html`).

## Onde editar os textos e dados

Tudo fica na pasta `data/`:

| Arquivo | O que tem |
| --- | --- |
| `data/company.ts` | Nome, slogan, endereço, horário, telefone, WhatsApp, e-mail, Instagram, mensagens do WhatsApp, a linha "Abre o WhatsApp com a mensagem pronta..." (`whatsappNote`) e endereço do site |
| `data/hero.ts` | Textos do início (H1, H2, chamada final) e os tempos de cada etapa do vídeo |
| `data/services.ts` | Os 5 grupos de serviços e a foto de cada um |
| `data/process.ts` | "Como trabalhamos" (marcado [CONFIRMAR]) |
| `data/brands.ts` | Faixa "Algumas marcas que atendemos": cada marca com o logo recortado (pasta `public/brands/`) ou só o nome em texto |
| `data/projects.ts` | Um card por cliente: cliente, segmento, serviços e a lista de fotos (`images`; a primeira é a capa), com o texto alternativo de cada foto |
| `data/videos.ts` | Vídeos: cliente, descrição e serviço (com o serviço preenchido, o vídeo também aparece no filtro desse serviço em Projetos) |

Os textos `[NOME DO CLIENTE]`, `[SEGMENTO]` e `[CONFIRMAR]` aparecem no site como uma anotação pequena e discreta, para ficar claro que ainda faltam. Quando você trocar pelo texto certo nesses arquivos, a anotação some sozinha (e o nome do cliente passa a ser o título do card).

## Trocar ou adicionar fotos e vídeos

1. Coloque o arquivo original nesta pasta (os originais nunca são alterados).
2. Adicione uma linha para ele em `scripts/prepare-media.mjs` (listas `PHOTOS` ou `VIDEOS`).
3. Rode `npm run media` (converte para WebP, gera capas e vídeos otimizados em `public/`).
4. Adicione o item em `data/projects.ts` ou `data/videos.ts`.

Para recortar de novo os logos da faixa de marcas, ajuste `scripts/brand-logos.json` (área de cada logo na foto) e rode `npm run logos`. Os logos são recortados das fotos e vídeos do próprio trabalho da Ponto X, nunca redesenhados nem baixados da internet.

Para trocar o vídeo do início, substitua `Video do inicio 10 segundos.mp4`, rode `npm run media` e ajuste os tempos em `data/hero.ts`.
