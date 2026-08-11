# Filament

A warm, filament-lit theme for [Zed](https://zed.dev).

Built for long sessions. The ground carries almost no chroma, so color in the
buffer belongs to the code and not the room.

Every color is declared in [OKLCH](https://en.wikipedia.org/wiki/Oklab_color_space).
Lightness is [CIELAB](https://en.wikipedia.org/wiki/CIELAB_color_space) L\* after a
[Helmholtz-Kohlrausch](https://en.wikipedia.org/wiki/Helmholtz%E2%80%93Kohlrausch_effect)
correction, so saturated colors are placed by how light they look rather than how
light they measure. The build checks every foreground (except comments) against
the ground with [APCA](https://git.apcacontrast.com/) and holds it above a
lightness contrast of Lc 35.

<table>
  <tr>
    <td width="50%"><img src="assets/zed/rust.png" alt="Filament Dark rendering Rust"></td>
    <td width="50%"><img src="assets/zed/go.png" alt="Filament Dark rendering Go"></td>
  </tr>
  <tr>
    <td width="50%"><img src="assets/zed/python.png" alt="Filament Dark rendering Python"></td>
    <td width="50%"><img src="assets/zed/vue.png" alt="Filament Dark rendering Vue"></td>
  </tr>
</table>

## Install

1. Open Zed.

2. Open the command palette and enter `zed: extensions`.

3. Search for **Filament** and install it.

4. Enter `theme selector: toggle` in the command palette and pick **Filament Dark**.

## Development

Requires [uv](https://docs.astral.sh/uv/) and [just](https://just.systems).

Run `just build` to regenerate `themes/filament.json` from `palette.toml`,
`syntax.toml`, and `ui.toml`.

To test a build, run `zed: install dev extension` from the command palette and
select this repository. `zed: reload extensions` picks up later builds.

## License

Licensed under the MIT license ([LICENSE](./LICENSE) or https://opensource.org/licenses/MIT).
