# Comment Blocks

This extension adds templates of comment snippets to [Zed](https://zed.dev/)

> [!TIP]
> For the best experience, I suggest installing the [zed-comment](https://github.com/thedadams/zed-comment) extension

## Templates

There are 8 different templates, each with 5 sizes:

* small `sm`
* medium `md`
* large `lg`
* Xlarge `xl`
* XXlarge `xxl`

#### Separator — `sep`
```
//====================Comment====================
```

#### Header — `head`
```
//====================================================
//===                 Comment                      ===
//====================================================
```

#### Comment Block — `blk`
```
//----------------------------------------------------
//                    Comment
/* body
*/
//----------------------------------------------------
```

#### TODO Block — `todo`
```
//----------------------------------------------------
//TODO                Comment
/*? body
*/
//----------------------------------------------------
```

#### INFO Block — `info`
```
//----------------------------------------------------
//INFO                Comment
/* * body
*/
//----------------------------------------------------
```

#### WARNING Block — `warn`
```
//----------------------------------------------------
//WARN                Comment
/* # body
*/
//----------------------------------------------------
```

#### BUG Block — `bug`
```
//----------------------------------------------------
//BUG                 Comment
/* ! body
*/
//----------------------------------------------------
```

#### FIXME Block — `fix`
```
//----------------------------------------------------
//FIXME               Comment
/* ! body
*/
//----------------------------------------------------
```

## Supported Languages

| Slash Style `//`| Hash Style `#`| Dash Style  `--`| Others |
| :---: | :---: | :---: | :---: |
| C | Perl | Haskell | HTML |
| C++ | Ruby | Lua | CSS |
| C# | Python | SQL | Prolog |
| Java | R | | |
| Kotlin | Shellscript | | |
| Go | YAML | | |
| JavaScript / JSX | | | |
| TypeScript / TSX | | | |
| Swift | | | |
| Rust | | | |
| PHP | | | |

## How to Use

After installing the extension, type `com` followed by a template **name** then the template **size**.

**Pattern:** `com-{template}-{size}`

**Examples:** `com-sep-xxl`, `com-fix-md`, `com-todo-lg`

## Credit

This extension is inspired by the [VSCode](https://code.visualstudio.com/) extensions [Comment-Header-Generator](https://github.com/anfreire/Comment-Header-Generator) and [comment-headers](https://github.com/AkmarNafi/comment-headers).
