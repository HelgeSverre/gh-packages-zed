# caderno.theme

Temas do **Caderno**, o design system do meu [portfólio](https://diegorezm.github.io). O site é um caderno: cada seção é uma folha de papel diferente, desenhada a caneta, e a página conta uma noite virando manhã. Cada folha tem sua própria tinta e **um só acento**.

Para **Neovim**, **Zed** e **Wallpaper Engine**, tudo gerado a partir de um único `palette.json`.

![Night](docs/night.jpg)

## Variantes

| Variante | Folha | Tipo | Acento |
|---|---|---|---|
| `caderno-night` | porto à noite | escuro | `#f0aa3c` lamp |
| `caderno-burnt` | vulcão | escuro | `#ec7a32` ember |
| `caderno-kraft` | rua ao entardecer | claro quente | `#9a4a2f` terra |
| `caderno-linen` | escrivaninha | claro | `#8a6a44` log-when |
| `caderno-white` | campo pela manhã | claro | `#f2c230` sun |

![Paleta](docs/palette.svg)

Tinta no papel, não arco-íris: a sintaxe usa ~6 tons derivados da tinta, do acento e dos tons de caneta, com saturação baixa. Todo texto de código tem contraste ≥ 4.5:1 sobre o fundo (verificado por `npm run contrast`). Comentários em itálico.

## Neovim

Com [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "diegorezm/caderno.theme",
  lazy = false,
  priority = 1000,
  config = function()
    vim.cmd.colorscheme("caderno-night")
  end,
}
```

Ou teste sem instalar:

```bash
git clone https://github.com/diegorezm/caderno.theme
nvim --cmd "set rtp+=caderno.theme" -c "colorscheme caderno-kraft"
```

Cobre Treesitter, LSP (semantic tokens, inlay hints), diagnostics, gitsigns, telescope, snacks, which-key, blink.cmp/nvim-cmp, indent-blankline e as 16 cores do terminal.

## Zed

Copie o tema para a pasta de temas e escolha **Caderno …** no seletor (`Ctrl+K Ctrl+T`):

```bash
# Linux / macOS
mkdir -p ~/.config/zed/themes && cp zed/themes/caderno.json ~/.config/zed/themes/
```

```powershell
# Windows
Copy-Item zed\themes\caderno.json "$env:APPDATA\Zed\themes\"
```

Ou instale `zed/` como dev extension (`zed: install dev extension`).

## Wallpaper Engine

Um wallpaper animado por folha, com os desenhos a caneta do site.

| | |
|---|---|
| ![Night](docs/night.jpg) **Night**: a água corre, o poste tremula, estrelas piscam, pássaros cruzam o céu | ![Kraft](docs/kraft.jpg) **Kraft**: janelas acendem e apagam, nuvens e pássaros passam |
| ![Linen](docs/linen.jpg) **Linen**: o código vai sendo digitado, o café solta vapor | ![Burnt](docs/burnt.jpg) **Burnt**: fagulhas sobem da cratera, a fumaça anda |
| ![White](docs/white.jpg) **White**: o capim balança, o sol gira, a árvore pega vento | |

Para usar: copie `wallpaper-engine/caderno-*` para uma pasta no Windows e, no Wallpaper Engine, **Abrir wallpaper → Abrir do arquivo** e escolha o `index.html`.

Opções: animação e grão do papel. Cada wallpaper informa sua cor principal (`main` no `palette.json`), que o Wallpaper Engine pode aplicar como cor de destaque do Windows.

**Desempenho:** ao carregar, o desenho é quebrado em camadas `<img>`. As partes paradas são rasterizadas uma vez e cada grupo animado vira uma imagem pequena que a GPU só move (transform/opacity), então o SVG com milhares de traços não é redesenhado a cada quadro. Para gastar ainda menos, limite o FPS no Wallpaper Engine (Configurações → Desempenho).

## Estrutura

```
palette.json            fonte única: tokens, sintaxe, diagnostics, git, ANSI, cor principal
scripts/contrast.mjs    falha se algum texto de código ficar abaixo de 4.5:1
scripts/build.mjs       → colors/caderno-*.lua (Neovim) e zed/themes/caderno.json (Zed)
scripts/wallpapers.mjs  → wallpaper-engine/caderno-*/ (index.html + project.json)
scripts/docs.mjs        → docs/palette.svg
vendor/scenes.ts        desenhos do site
```

```bash
npm run build   # contraste + todos os alvos
```

Requer Node 22.18+ (lê `vendor/scenes.ts` direto, sem build de TypeScript).

`vendor/scenes.ts` é uma cópia de [`diegorezm.github.io/src/drawing/scenes.ts`](https://github.com/diegorezm/diegorezm.github.io/blob/main/src/drawing/scenes.ts) com classes extras nos grupos animados (`lit`, `code`, `steam`, `smoke`, `spark`, `ember`, `sky`, `rays`, `leaves`, `grass`). Elas só agrupam, não mudam o desenho. Ao atualizar a cópia, reaplique essas classes.

## Próximos alvos

WezTerm e outras ferramentas, a partir do mesmo `palette.json`.
