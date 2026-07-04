# ita-theme

Tema **Itá Semantic** para o [Zed](https://zed.dev) — as cores semânticas da linguagem Itá.

## O que é

A alma do highlighting do Itá é semântica: a cor codifica o comportamento.
Este tema (Dark + Light) mapeia as captures do highlighting por **família**:

| Família | Cor | Construtos |
|---------|-----|-----------|
| 🟢 value | verde-teal | `struct` `enum` `trait` `let` |
| 🟠 reference | coral | `class` `var` |
| 🟣 async | roxo | `async` `await` `actor` `spawn` |
| 🔵 stream | azul | `stream` `emit` |
| 🩵 funcional | ciano | `match` `guard` `where` · `\|>` `>>` |
| 🟡 error | ouro | `panic` · `?` |
| 🔴 unsafe | vermelho | `mut` |

Ambos os temas passam contraste **WCAG AA**.

## Uso

Pareie com a extensão de linguagem
[`zed-ita`](https://github.com/ita-lang/zed-ita) para o highlighting semântico
completo. Em qualquer outra linguagem, o tema funciona como um tema normal.

## Instalar (dev)

1. Zed → command palette → **zed: install dev extension** → selecione esta pasta.
2. **zed: select theme** → *Itá Semantic (Dark)* ou *(Light)*.

## Org

Parte de [ita-lang](https://github.com/ita-lang).
