# WooCommerce Snippets for Zed

180 curated WooCommerce code snippets for [Zed](https://zed.dev).
Not static text dumps — these are **smart snippets** that use Zed's modern snippet engine to its full potential.

**Author:** [Renzo Johnson](https://renzojohnson.com)

## Why This Extension Is Different

Most snippet packs paste dead text. This one writes code *with* you:

### Choice Dropdowns — Pick from a Menu, Don't Type from Memory

Type `wc:rest:endpoint` and tab to the HTTP method — a **dropdown menu** appears with `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. No typos. No docs lookup. Just pick.

```
'methods' => '${GET|POST|PUT|PATCH|DELETE}' ← dropdown menu, not a text field
```

**25 snippets** have choice dropdowns for: HTTP methods, capabilities, field types, order statuses, product types, log levels, conditional functions, and more.

### Linked Placeholders — Type Once, Fills Everywhere

Type `wc:checkout:gateway` — enter your textdomain once and it **auto-fills in 6 locations** across the entire payment gateway scaffold. Change it once, all 6 update instantly.

```php
// You type "my-shop" once in $4, and it fills everywhere:
$this->title       = __( 'Pay on Delivery', 'my-shop' );    // ← auto
$this->description = __( 'Pay when received', 'my-shop' );  // ← auto
$this->method_title = __( 'Pay on Delivery', 'my-shop' );   // ← auto
// ... 6 locations, one keystroke
```

**31 snippets** use linked placeholders — textdomains, callback names, slugs, class names, hook names all stay in sync.

### Smart Defaults — Expand and Run Immediately

Every snippet is pre-filled with the most common real-world value. Expand `wc:create:order` and the code **runs as-is** — then customize. No placeholder gibberish like `ENTER_VALUE_HERE`.

### Modern WooCommerce — Not Your 2019 Snippet Pack

HPOS-compatible order queries. Block Checkout fields. Store API extensions. Action Scheduler patterns. Feature flag checks. If WooCommerce shipped it in the last 2 years, there's a snippet for it.

## Install

**Option A — Extension Gallery:**
1. Open Zed
2. `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Linux) to open Extensions
3. Search "WooCommerce"
4. Click Install

**Option B — Command Palette:**
1. `Cmd+Shift+P` → "zed: extensions"
2. Search "WooCommerce Snippets"
3. Click Install

## Usage

Type `wc:` in any `.php` file and browse all 180 snippets. Use the category prefix to filter:

```
wc:action:     → Action hooks (30)
wc:filter:     → Filter hooks (30)
wc:checkout:   → Checkout (8)
wc:rest:       → REST API (8)
wc:is:         → Conditionals (12)
wc:hpos:       → HPOS (6)
wc:blocks:     → Blocks (5)
```

## Snippet Reference

### Hooks — Actions (30)

| Prefix | Description |
|--------|-------------|
| `wc:action:add_to_cart` | After item added to cart |
| `wc:action:after_shop_loop` | After product archive loop |
| `wc:action:after_shop_loop_item` | After each product in loop |
| `wc:action:after_single_product` | After single product page |
| `wc:action:before_calculate_totals` | Before cart totals calculate |
| `wc:action:before_cart` | Before cart page content |
| `wc:action:before_shop_loop` | Before product archive loop |
| `wc:action:before_shop_loop_item` | Before each product in loop |
| `wc:action:before_single_product` | Before single product page |
| `wc:action:cart_emptied` | After cart is emptied |
| `wc:action:cart_updated` | After cart quantities update |
| `wc:action:check_cart_items` | Validate cart contents |
| `wc:action:checkout_create_order` | During order creation |
| `wc:action:checkout_order_processed` | After checkout creates order |
| `wc:action:checkout_process` | Validate during checkout submit |
| `wc:action:checkout_update_order_meta` | Save custom checkout data |
| `wc:action:init` | Hook into WooCommerce init |
| `wc:action:loaded` | Hook after WooCommerce loads |
| `wc:action:new_order` | When new order is created |
| `wc:action:order_refunded` | When order is refunded |
| `wc:action:order_status` | Specific order status transition |
| `wc:action:order_status_changed` | When order status changes |
| `wc:action:payment_complete` | After payment completes |
| `wc:action:process_product_meta` | Admin product save (legacy) |
| `wc:action:process_product_object` | Admin product save (modern) |
| `wc:action:register_post_type` | After WC post types register |
| `wc:action:register_taxonomy` | After WC taxonomies register |
| `wc:action:single_product_summary` | Single product summary area |
| `wc:action:thankyou` | Thank you page content |
| `wc:action:update_options` | After WC settings saved |

### Hooks — Filters (30)

| Prefix | Description |
|--------|-------------|
| `wc:filter:add_to_cart_text` | Change add to cart button text |
| `wc:filter:add_to_cart_url` | Change add to cart URL |
| `wc:filter:add_to_cart_validation` | Validate add to cart |
| `wc:filter:available_gateways` | Filter payment gateways |
| `wc:filter:billing_fields` | Modify billing fields |
| `wc:filter:calculated_total` | Modify cart calculated total |
| `wc:filter:cart_item_name` | Modify cart item name |
| `wc:filter:cart_item_price` | Modify cart item price display |
| `wc:filter:cart_item_quantity` | Modify cart quantity input |
| `wc:filter:cart_item_thumbnail` | Modify cart item thumbnail |
| `wc:filter:checkout_fields` | Modify all checkout fields |
| `wc:filter:countries` | Filter allowed countries |
| `wc:filter:currency` | Change store currency |
| `wc:filter:default_address_fields` | Modify default address fields |
| `wc:filter:email_attachments` | Add email attachments |
| `wc:filter:email_headers` | Modify email headers |
| `wc:filter:email_recipient` | Modify email recipient |
| `wc:filter:locate_template` | Override template location |
| `wc:filter:order_item_name` | Modify order item name |
| `wc:filter:order_number` | Modify displayed order number |
| `wc:filter:payment_complete_status` | Change status after payment |
| `wc:filter:price` | Modify product price |
| `wc:filter:price_html` | Modify price HTML display |
| `wc:filter:product_data_tabs` | Admin product data tabs |
| `wc:filter:product_tabs` | Add/remove product tabs |
| `wc:filter:product_visible` | Control product visibility |
| `wc:filter:regular_price` | Modify regular price |
| `wc:filter:sale_price` | Modify sale price |
| `wc:filter:shipping_fields` | Modify shipping fields |
| `wc:filter:short_description` | Modify product short description |

### CRUD (15)

| Prefix | Description |
|--------|-------------|
| `wc:coupon:create` | Create coupon programmatically |
| `wc:create:order` | Create order programmatically |
| `wc:create:product` | Create simple product |
| `wc:get:customer` | Get customer by user ID |
| `wc:get:order` | Get order by ID |
| `wc:get:orders` | Query multiple orders |
| `wc:get:product` | Get product by ID |
| `wc:get:products` | Query multiple products |
| `wc:order:items` | Loop through order items |
| `wc:order:note` | Add note to order |
| `wc:order:status` | Update order status |
| `wc:product:variations` | Get product variations |
| `wc:refund:create` | Create refund for order |
| `wc:update:order_meta` | Update order meta data |
| `wc:update:product_meta` | Update product meta data |

### Checkout (8)

| Prefix | Description |
|--------|-------------|
| `wc:checkout:field` | Add custom checkout field |
| `wc:checkout:gateway` | Payment gateway scaffold |
| `wc:checkout:order_review` | Modify order review |
| `wc:checkout:redirect` | Custom thank you redirect |
| `wc:checkout:remove_field` | Remove checkout field |
| `wc:checkout:reorder` | Reorder checkout fields |
| `wc:checkout:save` | Save checkout field to order |
| `wc:checkout:validate` | Validate checkout field |

### REST API (8)

| Prefix | Description |
|--------|-------------|
| `wc:rest:auth` | REST authentication check |
| `wc:rest:endpoint` | Custom REST endpoint scaffold |
| `wc:rest:extend` | Extend WC REST response |
| `wc:rest:get` | GET endpoint with parameters |
| `wc:rest:post` | POST endpoint with validation |
| `wc:rest:request` | Internal WC REST request |
| `wc:rest:schema` | REST schema definition |
| `wc:rest:webhook` | Register custom webhook topic |

### Conditionals (13)

| Prefix | Description |
|--------|-------------|
| `wc:if` | Conditional check (choice of function) |
| `wc:is:account` | Check if account page |
| `wc:is:ajax` | Check if WC AJAX request |
| `wc:is:cart` | Check if cart page |
| `wc:is:category` | Check if product category |
| `wc:is:checkout` | Check if checkout page |
| `wc:is:hpos` | Check if HPOS is enabled |
| `wc:is:order_received` | Check if thank you page |
| `wc:is:product` | Check if single product |
| `wc:is:rest` | Check if WC REST request |
| `wc:is:shop` | Check if shop page |
| `wc:is:tag` | Check if product tag |
| `wc:is:woocommerce` | Check if any WC page |

### Admin (8)

| Prefix | Description |
|--------|-------------|
| `wc:admin:bulk_action` | Orders bulk action |
| `wc:admin:column` | Custom orders list column |
| `wc:admin:notice` | WC-style admin notice |
| `wc:admin:order_meta_box` | Order edit meta box |
| `wc:admin:product_panel` | Product options panel fields |
| `wc:admin:product_tab` | Custom product data tab |
| `wc:admin:settings_field` | Add WC settings field |
| `wc:admin:settings_page` | WC settings page scaffold |

### Cart (8)

| Prefix | Description |
|--------|-------------|
| `wc:cart:add` | Add item to cart |
| `wc:cart:coupon` | Apply coupon to cart |
| `wc:cart:empty` | Empty the cart |
| `wc:cart:fee` | Add custom fee to cart |
| `wc:cart:items` | Loop through cart items |
| `wc:cart:session` | Get/set cart session data |
| `wc:cart:shipping` | Get chosen shipping method |
| `wc:cart:total` | Get cart totals |

### Blocks (5)

| Prefix | Description |
|--------|-------------|
| `wc:blocks:checkout_field` | Block checkout custom field |
| `wc:blocks:extend` | Extend Store API schema |
| `wc:blocks:inner_block` | Register checkout inner block |
| `wc:blocks:integration` | Register block integration |
| `wc:blocks:store_api` | Custom Store API endpoint |

### Emails (5)

| Prefix | Description |
|--------|-------------|
| `wc:email:class` | Custom email class scaffold |
| `wc:email:content` | Email body with template |
| `wc:email:register` | Register email with WC |
| `wc:email:template` | Override email template |
| `wc:email:trigger` | Trigger WC email |

### HPOS (6)

| Prefix | Description |
|--------|-------------|
| `wc:hpos:check` | Check if HPOS is active |
| `wc:hpos:custom_table` | Extend HPOS custom tables |
| `wc:hpos:declare` | Declare HPOS compatibility |
| `wc:hpos:meta` | HPOS-safe order meta |
| `wc:hpos:order` | HPOS-safe order retrieval |
| `wc:hpos:query` | HPOS-compatible order query |

### Queries (10)

| Prefix | Description |
|--------|-------------|
| `wc:query:by_date` | Orders by date range |
| `wc:query:by_meta` | Products by custom meta |
| `wc:query:categories` | Query product categories |
| `wc:query:coupons` | Query coupons |
| `wc:query:customers` | Query WooCommerce customers |
| `wc:query:order_query` | WC_Order_Query object |
| `wc:query:orders` | Advanced order query |
| `wc:query:product_query` | WC_Product_Query object |
| `wc:query:products` | Advanced product query |
| `wc:query:subscriptions` | Query WC Subscriptions |

### Notices & Logging (7)

| Prefix | Description |
|--------|-------------|
| `wc:log` | Logger (choice of log level) |
| `wc:log:error` | Log error to WC logger |
| `wc:log:info` | Log info to WC logger |
| `wc:notice` | Notice (choice: error/success/notice) |
| `wc:notice:error` | Add error notice |
| `wc:notice:info` | Add info notice |
| `wc:notice:success` | Add success notice |

### Scheduler (5)

| Prefix | Description |
|--------|-------------|
| `wc:cron` | WP-Cron with Action Scheduler |
| `wc:scheduler:callback` | Action callback handler |
| `wc:scheduler:recurring` | Schedule recurring action |
| `wc:scheduler:search` | Search scheduled actions |
| `wc:scheduler:single` | Schedule single action |

### Security (4)

| Prefix | Description |
|--------|-------------|
| `wc:cap:check` | Capability check |
| `wc:nonce:verify` | Nonce verification |
| `wc:sanitize:order` | Sanitize order data |
| `wc:validate:product` | Validate product data |

### Shipping (6)

| Prefix | Description |
|--------|-------------|
| `wc:shipping:calculate` | Calculate shipping rates |
| `wc:shipping:free` | Free shipping threshold |
| `wc:shipping:hide` | Hide shipping methods conditionally |
| `wc:shipping:method` | Shipping method class scaffold |
| `wc:shipping:register` | Register shipping method |
| `wc:shipping:zone` | Get shipping zones |

### Templates (6)

| Prefix | Description |
|--------|-------------|
| `wc:template:after` | Add content after template |
| `wc:template:before` | Add content before template |
| `wc:template:locate` | Locate template with custom path |
| `wc:template:override` | Override WC template in theme |
| `wc:template:part` | Load WC template part |
| `wc:template:remove` | Remove template hook callback |

### Utilities (6)

| Prefix | Description |
|--------|-------------|
| `wc:ajax` | AJAX endpoint scaffold |
| `wc:feature` | Feature flag check |
| `wc:hook` | Generic hook (action or filter) |
| `wc:meta` | Order meta operations |
| `wc:wrap:action` | Wrap in add_action |
| `wc:wrap:filter` | Wrap in add_filter |

## Prefix Convention

All snippets start with `wc:` followed by the category:

| Prefix | Category | Count |
|--------|----------|-------|
| `wc:action:*` | Action hooks | 30 |
| `wc:filter:*` | Filter hooks | 30 |
| `wc:create:*` `wc:get:*` `wc:order:*` `wc:update:*` | CRUD operations | 15 |
| `wc:checkout:*` | Checkout | 8 |
| `wc:rest:*` | REST API | 8 |
| `wc:is:*` `wc:if` | Conditionals | 13 |
| `wc:admin:*` | Admin | 8 |
| `wc:cart:*` | Cart | 8 |
| `wc:blocks:*` | Block Checkout / Store API | 5 |
| `wc:email:*` | Emails | 5 |
| `wc:hpos:*` | HPOS | 6 |
| `wc:query:*` | Queries | 10 |
| `wc:notice:*` `wc:log:*` | Notices & Logging | 7 |
| `wc:scheduler:*` `wc:cron` | Action Scheduler | 5 |
| `wc:cap:*` `wc:nonce:*` `wc:sanitize:*` `wc:validate:*` | Security | 4 |
| `wc:shipping:*` | Shipping | 6 |
| `wc:template:*` | Templates | 6 |
| `wc:ajax` `wc:hook` `wc:meta` `wc:feature` `wc:wrap:*` | Utilities | 6 |

## Requirements

- [Zed editor](https://zed.dev)

## License

MIT License. Copyright (c) 2026 [Renzo Johnson](https://renzojohnson.com).
