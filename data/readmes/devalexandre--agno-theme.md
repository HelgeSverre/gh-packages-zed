# Agno Theme Pack

Pacote de temas inspirado na paleta oficial do Agno.

## Incluído

- `vscode/agno-dark-theme`: extensão completa para VS Code
- `zed`: extensão de temas para Zed
- `jetbrains/*.icls`: temas para IntelliJ, GoLand, Rider, PyCharm etc.
- `sublime-text/*.sublime-color-scheme`: temas para Sublime Text
- `vim-neovim/colors/*.vim`: colorschemes para Vim/Neovim

## Variações

- `Agno Dark`
- `Agno One Dark`
- `Agno Light`
- `Agno Light Soft`
- `Agno Light Graphite`

## VS Code

```bash
cp -r vscode/agno-dark-theme ~/.vscode/extensions/
```

Reinicie o VS Code e selecione:

```text
Preferences: Color Theme -> Agno ...
```

Também pode testar em modo desenvolvimento:

```bash
code vscode/agno-dark-theme
```

Depois pressione `F5`.

## Zed

Instale como dev extension:

```text
zed: install dev extension -> selecione a pasta zed/
```

Depois selecione:

```text
theme selector -> Agno ...
```

## JetBrains / Rider / GoLand / IntelliJ

Vá em:

```text
Settings -> Editor -> Color Scheme -> Import Scheme
```

Selecione:

```text
jetbrains/Agno ....icls
```

## Sublime Text

Copie os temas desejados:

```text
sublime-text/*.sublime-color-scheme
```

para:

```text
Packages/User/
```

Depois selecione o tema em:

```text
Preferences -> Select Color Scheme -> Agno ...
```

## Vim / Neovim

Copie os colorschemes:

```bash
cp vim-neovim/colors/*.vim ~/.config/nvim/colors/
```

No `init.vim`:

```vim
colorscheme agno-one-dark
```

No `init.lua`:

```lua
vim.cmd.colorscheme("agno-one-dark")
```
