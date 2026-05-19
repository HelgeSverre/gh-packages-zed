# HackTheBox (Zed)

Extensão de **temas** para o [Zed](https://zed.dev): a família **HackTheBox** (cores alinhadas ao tema homônimo do VS Code) e **HackTheBlue** (variação em tons de azul).

## Criar o repositório no GitHub e enviar o código

O Git local já está inicializado na branch `main`, com um commit inicial.

1. No GitHub: **New repository** → nome sugerido: `hackthebox-zed-theme` → **Público** → **não** marque README, `.gitignore` nem licença (eles já existem neste projeto).
2. Confira se o campo `repository` no `extension.toml` é exatamente a URL do repositório (ex.: `https://github.com/b00tk1ll/hackthebox-zed-theme`).
3. Na pasta do projeto:

   ```bash
   git remote remove origin 2>nul
   git remote add origin https://github.com/SEU_USUARIO/hackthebox-zed-theme.git
   git push -u origin main
   ```

   Se o `origin` já estiver certo, basta:

   ```bash
   git push -u origin main
   ```

## Instalação local (desenvolvimento)

1. Abra o Zed → **Extensions** → **Install Dev Extension**.
2. Selecione a pasta raiz deste repositório (onde está o `extension.toml`).

Documentação oficial: [Developing Extensions](https://zed.dev/docs/extensions/developing-extensions).

## Publicar na loja oficial do Zed

O catálogo de extensões fica no repositório [**zed-industries/extensions**](https://github.com/zed-industries/extensions). Abaixo, um resumo do fluxo descrito na documentação.

### Pré-requisitos

- Repositório **Git** **público** no GitHub contendo só essa extensão (ou com o `extension.toml` na raiz do caminho usado no submódulo).
- Arquivo **`LICENSE`** na raiz, com uma licença aceita pela equipe do Zed (este repositório usa **GNU GPLv3**). Desde **1º de outubro de 2025**, isso passou a ser obrigatório para novas submissões.
- **`extension.toml`** completo: `id`, `name`, `version`, `schema_version`, `authors`, `description`, `repository`.
- O **`id`** **não** pode conter as palavras `zed`, `Zed` ou `extension`.
- Para **temas**, o **`id`** deve terminar em **`-theme`**.
- URL do **`repository`** em **HTTPS** (não use URL SSH `git@github.com:...`).

### Passos

1. Crie o repositório no GitHub, faça **push** deste conteúdo e garanta que o campo **`repository`** no `extension.toml` aponte para a URL correta.
2. Faça **fork** de [zed-industries/extensions](https://github.com/zed-industries/extensions) na sua **conta pessoal** do GitHub (a equipe do Zed recomenda isso para agilizar o PR).
3. No clone do **seu fork**:

   ```bash
   git submodule add https://github.com/SEU_USUARIO/hackthebox-zed-theme.git extensions/hackthebox-theme
   ```

4. Edite o arquivo **`extensions.toml`** na raiz do fork e inclua uma entrada como (ajuste a `version` para a mesma do seu `extension.toml`):

   ```toml
   [hackthebox-theme]
   submodule = "extensions/hackthebox-theme"
   version = "0.1.0"
   ```

5. Na raiz do fork, rode **`pnpm sort-extensions`** ou **`npm run sort-extensions`** (com dependências instaladas via `pnpm install` / `npm install`) para ordenar `extensions.toml` e `.gitmodules`.
6. Abra um **Pull Request** contra `zed-industries/extensions`.

Depois do **merge**, a extensão é empacotada e publicada no registro do Zed.

**Atualizações:** envie novos commits ao seu repositório, aumente a `version` no `extension.toml` e, no fork de `extensions`, atualize o submódulo e o campo `version` da entrada correspondente em `extensions.toml`.

Guia completo: [Publishing your extension](https://zed.dev/docs/extensions/developing-extensions#publishing-your-extension).

### Atalho: clone `extensions` já preparado neste PC

Se você clonou o monorepo do catálogo na mesma pasta pai que este projeto (`Projetos/tema`), pode existir **`zed-extensions-pr`** com o *commit* **“Adiciona a extensão hackthebox-theme”** já aplicado (submódulo + `extensions.toml` + `sort-extensions`).

Nesse caso falta só:

1. Criar o *fork* de <https://github.com/zed-industries/extensions> na sua conta pessoal (ex.: `b00tk1ll/extensions`).
2. No diretório `zed-extensions-pr`:

   ```bash
   git remote add fork https://github.com/SEU_USUARIO/extensions.git
   git push -u fork main
   ```

3. Abrir o *Pull Request* **fork:main → zed-industries/extensions:main**.

## Estrutura do projeto

- `extension.toml` — manifesto da extensão.
- `themes/*.json` — famílias de tema (schema [v0.2.0](https://zed.dev/schema/themes/v0.2.0.json)).

## Temas incluídos

| Arquivo            | Nome no Zed |
| ------------------ | ----------- |
| `hackthebox.json`  | HackTheBox  |
| `hacktheblue.json` | HackTheBlue |

## Licença

GNU General Public License v3 — veja o arquivo `LICENSE` (texto completo em inglês, conforme publicado pela FSF).
