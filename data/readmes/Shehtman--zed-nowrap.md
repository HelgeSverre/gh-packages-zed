# zed-nowrap

Make [Zed](https://zed.dev) stop soft-wrapping and visually truncating very
long lines.

Zed's `"soft_wrap": "none"` does not mean "never wrap". Its own default config
says so out loud:

```jsonc
// 1. Prefer a single line generally, unless an overly long line is encountered.
//      "soft_wrap": "none",
```

There are actually two hardcoded guards derived from
`MAX_LINE_LEN = 1024`:

- at **512 columns**, `"soft_wrap": "none"` still wraps the line;
- at **1024 UTF-8 bytes**, the renderer stops shaping the rest of the line, so
  its tail is invisible and the horizontal scroll range ends early.

Open a minified bundle, a wide CSV, a JSONL log, or a base64 blob and one of
those guards makes it unusable regardless of your settings. There is no
configuration option that lifts them; the performance limitation is discussed
[upstream](https://github.com/zed-industries/zed/discussions/26344).

This script raises both ceilings in the installed binary, restoring the
behaviour you get in JetBrains IDEs, VS Code, Vim and everything else: one
logical line stays one complete visual line, and you scroll sideways.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/Shehtman/zed-nowrap/main/zed-nowrap.sh | bash
```

Prefer to read before you run — it patches a binary, so you should:

```bash
curl -fsSL -o zed-nowrap.sh https://raw.githubusercontent.com/Shehtman/zed-nowrap/main/zed-nowrap.sh
less zed-nowrap.sh
bash zed-nowrap.sh
```

Then restart Zed. Make sure `"soft_wrap": "none"` is set in your `settings.json`.

Since Zed reverts the patch on every update, keep a copy around to re-run:

```bash
curl -fsSL -o ~/.local/bin/zed-nowrap https://raw.githubusercontent.com/Shehtman/zed-nowrap/main/zed-nowrap.sh
chmod +x ~/.local/bin/zed-nowrap
```

## Usage

```
zed-nowrap.sh [OPTIONS]

  --status      Report the current wrap and render ceilings and exit.
  --restore     Restore the binary from the backup taken on first patch.
  --dry-run     Locate both limits and report, but change nothing.
  --cols N      New wrap-column/render-byte ceiling (default: 1048576).
  --bin PATH    Path to the zed-editor binary (default: autodetected).
```

Zed replaces its binary on every update, which reverts the patch. Re-run the
script afterwards; it is idempotent and safe to run repeatedly.

## How it works

In `editor::element`, Zed defines `const MAX_LINE_LEN: usize = 1024` and uses it
in two different parts of layout.

The wrap width handed to `Editor::set_wrap_width` is computed as
`(MAX_LINE_LEN / 2) as f32 * em_advance`. In the compiled binary that is a
single `f32` sitting in `.rodata`:

```
mulss  0xbe80ec(%rip),%xmm0        ; em_advance * 512.0
call   <editor::Editor>::set_wrap_width
```

The script resolves `<editor::Editor>::set_wrap_width`, disassembles only the
`EditorElement` layout routines, finds the `mulss` feeding each call, confirms
that its target holds exactly `512.0`, and rewrites it to `1048576.0`.

Separately, `LineWithInvisibles::from_chunks` receives `MAX_LINE_LEN` as its
render-byte limit. LLVM constant-propagates it into the optimized function as
several `1024` immediates and a `1025` boundary immediate. Once the accumulated
UTF-8 byte length crosses that value, Zed slices the shaped chunk at the limit
and ignores the rest until the newline. The width used for horizontal scrolling
comes from that truncated layout, which is why scrolling cannot reveal the
tail.

The script locates only `LineWithInvisibles::from_chunks` symbols, validates a
structural fingerprint containing comparisons, moves, and the `limit + 1`
boundary, then rewrites those immediates together. It verifies both ceilings in
a temporary copy before atomically replacing the executable.

Because it works from symbols and instruction structure instead of fixed file
offsets, it keeps working across Zed releases as long as the relevant compiled
shape holds. If Zed's internals or compiler output change, the script refuses to
patch rather than guessing.

## Caveats

- **Linux x86-64 only.** Needs the official unstripped build, plus `binutils`
  and `python3`. macOS and ARM builds are not supported.
- **The ceiling exists for a reason.** It caps layout cost for pathological
  lines. Removing it means a file with a multi-megabyte single line can make the
  editor sluggish. In practice, JetBrains and VS Code handle the same files
  fine, and so does Zed at these widths — but it is a real trade-off, not a free
  win.
- **A backup is written** next to the binary as `zed-editor.nowrap-backup` on
  first patch (~450 MB). `--restore` puts it back; delete it if you would rather
  reclaim the space and reinstall Zed instead.
- Patched builds are unsupported by the Zed project. Don't file Zed bug reports
  against a patched binary without reverting first.
- `--cols` sets a column count for wrapping but a UTF-8 byte count for
  rendering. It must also be exactly representable as an `f32`; the default is
  safe for both encodings.

## Verifying it worked

```bash
python3 -c "print('{\"x\":\"' + 'y'*20000 + '\"}')" > /tmp/longline.json
zed /tmp/longline.json
```

Before the original patch: a block of wrapped text. With only the old
wrap-only patch: the line stays unwrapped but disappears after 1024 ASCII
characters. After this patch: the complete line stays on one row and is
reachable with horizontal scrolling.

## Tests

The test suite builds a small x86-64 ELF fixture with the same symbol and
instruction shapes. It covers dry-run, both writes, a pre-existing wrap-only
installation, idempotence, restore, and refusal to patch an unknown rendering
fingerprint:

```bash
./tests/test.sh
```

It requires `gcc`, `binutils`, and `python3`. The suite never modifies an
installed Zed binary.

## Русский

Zed использует два связанных жёстких ограничения: после 512 колонок режим
`"soft_wrap": "none"` всё равно переносит строку, а после 1024 байт UTF-8
рендерер перестаёт формировать её видимый хвост. Из-за второго ограничения
ширина горизонтальной прокрутки также вычисляется только по первым 1024 байтам.

Скрипт находит оба ограничения в установленном бинарнике по символам и
структуре инструкций, поднимает их и проверяет результат до атомарной замены
файла. После этого вся длинная строка остаётся на одной визуальной строке и
доступна горизонтальной прокруткой — как в JetBrains. Если структура бинарника
изменилась, скрипт завершает работу без записи.

Установка одной командой (см. `Install` выше), потом перезапустить Zed. Патч
слетает при обновлении Zed — запустите скрипт снова. Откат: `--restore`.

## License

MIT
