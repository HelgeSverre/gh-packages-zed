# sc-indent-fix

PHP+HTML mixed indentation fixer.

PHP + HTML 混合縮排修復工具。

Also re-indents multi-line string blocks (`$var = "..."`) — HTML content by tag nesting depth, SQL content in dbt/GitLab style.
亦會重新排版多行字串區塊（`$var = "..."`）——HTML 內容依標籤嵌套深度、SQL 內容依 dbt／GitLab 風格。

---

## Requirements / 系統需求

- PHP 7.3+

---

## Installation / 安裝方式

```bash
git clone https://github.com/henry-wiki/sc-indent-fix.git
cd sc-indent-fix
composer install
```

---

## Quick Start / 快速開始

```php
require_once 'vendor/autoload.php';

$fixer = new \henry_wiki\sc_indent_fix\sc_indent_fix();
$result = $fixer->process($code);
```

---

## Architecture / 架構說明

The fixer works in two layers:
修復器分為兩層處理：

1. **php-cs-fixer** — Applies PSR-2 formatting in-memory / 在記憶體中套用 PSR-2 格式化
2. **sc_indent_fix_phphtml** — Secondary pass for PHP+HTML mixed indentation / 二次處理，修正 PHP + HTML 混合縮排

---

## Examples / 範例

### 1. Basic function / 基本函式

```php
// Before
function render($items) {
$output[] = "<div>";
foreach ($items as $item) {
$output[] = "<p>" . $item . "</p>";
}
$output[] = "</div>";
return implode("\n", $output);
}

// After
function render($items) {
    $output[] = "<div>";
        foreach ($items as $item) {
            $output[] = "<p>" . $item . "</p>";
        }
    $output[] = "</div>";
    return implode("\n", $output);
}
```

### 2. if/else + HTML tag nesting / if/else + HTML 標籤嵌套

```php
// Before
if ($flag) {
echo "<div class='active'>";
echo "Enabled";
echo "</div>";
} else {
echo "<div class='inactive'>";
echo "Disabled";
echo "</div>";
}

// After
if ($flag) {
    echo "<div class='active'>";
        echo "Enabled";
    echo "</div>";
} else {
    echo "<div class='inactive'>";
        echo "Disabled";
    echo "</div>";
}
```

### 3. Nested HTML tags / 巢狀 HTML 標籤

```php
// Before
echo "<div>";
echo "<span>Hello</span>";
echo "</div>";

// After
echo "<div>";
    echo "<span>Hello</span>";
echo "</div>";
```

### 4. foreach inside HTML / HTML 內嘅 foreach

```php
// Before
echo "<ul>";
foreach ($items as $item) {
echo "<li>" . $item . "</li>";
}
echo "</ul>";

// After
echo "<ul>";
    foreach ($items as $item) {
        echo "<li>";
            echo $item;
        echo "</li>";
    }
echo "</ul>";
```

### 5. Switch/case

```php
// Before
switch ($type) {
case 1:
echo "<p>Type A</p>";
break;
case 2:
echo "<p>Type B</p>";
break;
default:
echo "<p>Unknown</p>";
}

// After
switch ($type) {
    case 1:
        echo "<p>Type A</p>";
        break;
    case 2:
        echo "<p>Type B</p>";
        break;
    default:
        echo "<p>Unknown</p>";
}
```

### 6. Multi-line HTML string block / 多行 HTML 字串區塊

```php
// Before
$html = "<div class='wrap'>
<table>
<tbody>
<tr>
<td>cell</td>
</tr>
</tbody>
</table>
</div>";

// After
$html = "<div class='wrap'>
    <table>
        <tbody>
            <tr>
                <td>cell</td>
            </tr>
        </tbody>
    </table>
</div>";
```

### 7. Multi-line SQL string block / 多行 SQL 字串區塊

```php
// Before
$sql = "SELECT
p.ProductId
FROM products p
WHERE p.Active = 1
AND p.Deleted = 0";

// After
$sql = "SELECT
        p.ProductId
    FROM products p
    WHERE p.Active = 1
        AND p.Deleted = 0";
```

---

## Known Limitations / 已知限制

The formatter does **not** parse or modify the following syntaxes. They are simply passed through unchanged — the original code is never altered or removed:
以下語法嘅縮排**唔會**被修正，但原碼完全唔會受影響、唔會被刪除或改變：

- Alternative syntax (`endif;`, `endforeach;`, `endwhile;`, `endfor;`) / 替代語法
- Raw `?>` / `<?php` HTML blocks (non-string embedded HTML) / 原始 HTML 區塊
- PHP 8+ syntax (`match`, `enum`, attributes, arrow function) / PHP 8+ 語法
- Complex heredoc/nowdoc / 複雜 heredoc/nowdoc
- Multi-line JSON / JavaScript / CSS strings (kept at the base indentation, not deeply re-indented) / 多行 JSON／JavaScript／CSS 字串（僅保留基礎縮排，唔會深度排版）

These limitations will not be addressed in the near future.
以上限制短期內唔會處理。

---

## License / 授權條款

MIT
