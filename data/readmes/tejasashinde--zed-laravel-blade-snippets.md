# Laravel Blade Snippets for Zed IDE

A collection of Laravel Blade snippets for [Zed IDE](https://zed.dev) to speed up your Blade template development.

## Features

This extension provides a comprehensive set of snippets for Laravel Blade templates, including:

* Echoing variables (escaped and unescaped)
* Control structures (if, switch, loops)
* Template inheritance (`extends`, `section`, `yield`)
* Blade components and slots
* Form and HTML attribute helpers (`csrf`, `checked`, `selected`, etc.)
* Authorization and environment directives
* Debugging utilities (`dd`, `dump`)

## Installation

### Method 1

1. Go to Extensions menu in Zed IDE
2. Search for "Laravel Blade snippets"
3. Click "Install"

### Method 2

1. Clone this repo:
```bash
git clone [https://github.com/yourusername/laravel-blade-zed-snippets](https://github.com/yourusername/laravel-blade-zed-snippets)
```
2. Go to `Extensions` menu in Zed IDE
3. Click `Install Dev Extension`
4. Select the folder you cloned

## Usage

To make snippets appear at the top of the completion list in Zed, add this setting to your Zed settings file:

```json
{
    "snippet_sort_order": "top"
}
````

Start typing the snippet prefix (e.g., `b:echo`) in a Blade file and press `Tab` to expand the snippet.

## Available Snippets

| Prefix              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `b:echo`            | Echo escaped data                                |
| `b:raw`             | Echo unescaped data                              |
| `b:jsfrom`          | Render data safely for JavaScript                |
| `b:json`            | Encode variable to JSON                          |
| `b:if`              | If statement                                     |
| `b:ifelse`          | If-else statement                                |
| `b:ifelseif`        | If-elseif statement                              |
| `b:unless`          | Unless statement                                 |
| `b:isset`           | Isset directive                                  |
| `b:empty`           | Empty directive                                  |
| `b:auth`            | Auth check                                       |
| `b:guest`           | Guest check                                      |
| `b:production`      | Production environment                           |
| `b:env`             | Environment check                                |
| `b:session`         | Session directive                                |
| `b:switch`          | Switch statement                                 |
| `b:foreach`         | Foreach loop                                     |
| `b:forelse`         | Forelse loop                                     |
| `b:foreachloop`     | Foreach with loop variable                       |
| `b:for`             | For loop                                         |
| `b:while`           | While loop                                       |
| `b:include`         | Include view                                     |
| `b:includeif`       | Include view if exists                           |
| `b:includewhen`     | Conditional include                              |
| `b:includeunless`   | Include unless condition                         |
| `b:extends`         | Extend layout                                    |
| `b:section`         | Section block                                    |
| `b:yield`           | Yield content                                    |
| `b:show`            | Show section content                             |
| `b:component`       | Blade component                                  |
| `b:props`           | Define component props                           |
| `b:aware`           | Make component aware of parent data              |
| `b:slot`            | Named slot                                       |
| `b:csrf`            | CSRF token                                       |
| `b:method`          | HTTP method field                                |
| `b:checked`         | Checked attribute helper                         |
| `b:selected`        | Selected attribute helper                        |
| `b:required`        | Required attribute helper                        |
| `b:disabled`        | Disabled attribute helper                        |
| `b:readonly`        | Readonly attribute helper                        |
| `b:push`            | Push to stack                                    |
| `b:pushonce`        | Push once to stack                               |
| `b:stack`           | Render stack                                     |
| `b:once`            | Render once                                      |
| `b:verbatim`        | Verbatim block                                   |
| `b:php`             | Inline PHP                                       |
| `b:inject`          | Inject service                                   |
| `b:hasection`       | Check if section has content                     |
| `b:each`            | Render view for each item in array               |
| `b:class`           | Conditional class attribute helper               |
| `b:style`           | Conditional style attribute helper               |
| `b:error`           | Validation error directive                       |
| `b:fragment`        | Define dynamic fragment                          |
| `b:prepend`         | Prepend content to stack                         |
| `b:hasstack`        | Check if stack has content                       |
| `b:dd`              | Dump and die                                     |
| `b:dump`            | Dump variable                                    |
| `b:includefirst`    | Include first existing view                      |
| `b:includeisolated` | Include view without inheriting parent variables |
| `b:cannot`          | Negative authorization check                     |
| `b:can`             | Authorization check                              |
| `b:canany`          | Check any ability authorization                  |
| `b:comment`         | Blade comment                                    |
| `b:continue`        | Skip current loop iteration                      |
| `b:break`           | Break from loop early                            |

## Example of Snippets

### Echo escaped variable

Type `b:echo` and press Tab:

```bash
{{ $variable }}
```

---

### If statement

Type `b:if` and press Tab:

```bash
@if ($condition)
    // code
@endif
```

---

### Foreach loop

Type `b:foreach` and press Tab:

```bash
@foreach ($items as $item)
    // code
@endforeach
```

---

### Component with props

Type `b:component` and press Tab:

```bash
<x-component>
    // content
</x-component>
```

---

### CSRF token in form

Type `b:csrf` and press Tab:

```bash
@csrf
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-amazing-feature`)
3. Commit your changes (`git commit -m 'Add my amazing feature'`)
4. Push to the branch (`git push origin feature/my-amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This extension is inspired by community-driven PHP snippets and aims to provide a clean, modern Laravel development experience in Zed IDE.
