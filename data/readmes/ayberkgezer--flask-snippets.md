# Flask Snippets
Flask snippets for Zed IDE.

## Installation
### Method 1

1. Go to Extensions menu in Zed IDE
2. Search for "flask-snippets"
3. Click "Install"

### Method 2
1. Clone this repo:
```
git clone https://github.com/ayberkgezer/flask-snippets
```
2. Go to Extensions menu in Zed IDE
3. Click "Install Dev Extension"
4. Select the folder you cloned

## Available Snippets
### Application Setup
| Prefix | Description |
|--------|-------------|
| `flask_hw` | Basic Flask hello world application |
| `flask_app` | Flask application with template rendering |

### Routes & Endpoints
| Prefix | Description |
|--------|-------------|
| `flask_route` | Basic Flask route decorator |
| `flask_routegp` | Route with GET and POST methods |
| `flask_routep` | Route with POST method only |
| `flask_control_route` | Route with template rendering |
| `flask_url` | URL generator using url_for |
| `flask_fmeth` | HTTP methods specification (GET, POST) |

### Templates & Jinja
| Prefix | Description |
|--------|-------------|
| `flask_exp` | Jinja expression |
| `flask_filter` | Jinja filter expression |
| `flask_comment` | Jinja comment block |
| `flask_block` | Jinja block statement |
| `flask_extends` | Template inheritance |
| `flask_self` | Reference to self block |
| `flask_super` | Call to parent block |
| `flask_for` | Jinja for loop |
| `flask_if` | Jinja if statement |
| `flask_ife` | Jinja if-else statement |
| `flask_elif` | Jinja if-elif-else statement |
| `flask_macro` | Jinja macro definition |
| `flask_fb` | Jinja filter block |
| `flask_set` | Jinja set statement |
| `flask_include` | Include template |
| `flask_import` | Import template as alias |
| `flask_from` | Import object from template |
| `flask_autoescape` | Autoescape block |
| `flask_title` | Define title block |
| `flask_var` | Template variable |
| `flask_content` | Define content block |
| `flask_rt` | Render template with variables |

### Request Handling
| Prefix | Description |
|--------|-------------|
| `flask_treq` | Test request context |
| `flask_rc` | Read cookie |
| `flask_sc` | Set cookie |

### File Upload
| Prefix | Description |
|--------|-------------|
| `flask_up` | File upload handler |
| `flask_sup` | Secure file upload handler |

### Error Handling
| Prefix | Description |
|--------|-------------|
| `flask_eh` | Error handler |
| `flask_log` | Flask logging |

### Documentation
| Prefix | Description |
|--------|-------------|
| `flask_mldocstring` | Multi-line docstring |
| `flask_sldocstring` | Single-line docstring |
