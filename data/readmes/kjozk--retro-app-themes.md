# retro-app-themes

任天堂の伝説的名機である **ファミリーコンピュータ（FC）**、**スーパーファミコン（SFC）**、**ゲームボーイ（GB）**、およびクラシックOSである **Windows Classic**、**Windows XP Luna** の実機カラーパレットとデザイン言語を忠実に再現した、クリエイター＆エンジニア向けマルチアプリケーション・テーマコレクションです。

---

## 📸 プレビューギャラリー

### OBS Studio
| ファミリーコンピュータ | スーパーファミコン | Windows Classic |
| :---: | :---: | :---: |
| ![OBS Studio Famicom Preview](screenshots/obs/fc_preview.png) | ![OBS Studio Super Famicom Preview](screenshots/obs/sfc_preview.png) | ![OBS Studio Windows Classic Preview](screenshots/obs/windows_preview.png) |

### Zed エディタ
| ファミリーコンピュータ | ゲームボーイ |
| :---: | :---: |
| ![Zed Famicom Preview](screenshots/zed/fc_preview.png) | ![Zed Gameboy Preview](screenshots/zed/gb_preview.png) |

---

## 🎨 対応アプリケーション一覧

各アプリケーションのフォルダー内に、テーマ本体・専用インストーラー・詳細ドキュメントが同梱されています。使いたいアプリケーションのディレクトリへ進んでインストールしてください。

| アプリケーション | 状態 | 収録テーマ | 詳細・インストール手順 |
| :--- | :---: | :--- | :--- |
| **OBS Studio** | ✅ 対応済み | ファミリーコンピュータ / スーパーファミコン / ゲームボーイ / Windows Classic / Windows XP Luna | [OBS Studio テーマ詳細](obs-studio/README.md) |
| **Zed** | ✅ 対応済み | Family Computer / Super Famicom / Gameboy (通常・ブラー対応) | [Zed テーマ詳細](zed/README.md) |
| **VS Code** | 🚧 開発中 | Family Computer / Super Famicom / Gameboy | [VS Code テーマ詳細](vscode/README.md) |

---

## 🎮 テーマコンセプト & 特徴

### 1. ファミリーコンピュータ (Family Computer)
- **実機成型色の完全再現**: 懐かしく温かみのあるアイボリー成型色のベース背景。
- **伝統のえんじ色（マルーン）**: アクセント、ヘッダー、主要ボタンに採用。
- **真鍮・金プレートのヘアライン再現**: コントローラー前面のゴールドを各UIの選択ハイライトや強調ボタンに反映。
- **IIコン（マイク）モチーフ**: 音声ミキサーのチャンネルストリップやノブに、IIコンの意匠を忠実に再現。
- **高コントラスト文字**: 白・アイボリー背景でも視認性を一切犠牲にしない、くっきりとした文字コントラスト。

### 2. スーパーファミコン (Super Famicom)
- **実機成型色のライトグレー**: 青み・紫みをほんのり含んだクールな本体色。
- **2トーン・スレートグレー**: カセットスロットやイジェクト・POWER/RESETスイッチの重厚なグレーをプライマリーカラーに統一。
- **ABXY 4色ボタンアクセント**: 赤・黄・青・緑の象徴的な発色と発光インジケーター（青色は特定機能のみに限定しノイズを防止）。

### 3. ゲームボーイ (Gameboy)
- **実機再現オリーブ液晶**: 初代ゲームボーイ（DMG-01）の象徴である4階調STN液晶のオリーブイエローグリーンを大胆にベース採用。
- **青紫ロゴ (`#393C9F`) & A/Bマゼンタ (`#9E285A`)**: アイコン、見出し、フォーカス枠線に実機パーツカラーを完全マッピング。
- **画面ベゼル 2トーンフレーム**: スレートグレーの画面枠と成型色オフホワイトのタブバーで、ハードウェアの没入感を再現。

### 4. Windows Classic (Windows 95/98/2000/XPクラシック)
- **実機完全再現の 3D ベベル**: 角丸なし（0px）の完全スクエアUIと、光（白）と影（グレー・黒）による 3D Raised / Sunken ベベルを全ウィジェットで再現。
- **伝統のアクティブ濃紺グラデーション**: ドックタイトルバーやリスト選択時に、クラシック特有のディープネイビー〜シアン（`#0A246A` → `#A6CAF0`）をマッピング。
- **押し込み（Sunken）フィール**: ボタン押下時にベベルが反転し、テキストが右下に1px沈み込むクラシックな押し心地。
- **クラシックスクロールバー & スライダー**: 16px幅の立体スクロールバーと、ホームベース型（五角形）スライダーノブを搭載。

### 5. Windows XP Luna
- **Luna ロイヤルブルー光沢**: ドックタイトルバーや主要ボタンに、XPの象徴である光沢ロイヤルブルーのグラデーションを採用。
- **スタートボタン風エメラルドグリーン**: 「配信開始」ボタンなどに、XPスタートボタンを彷彿とさせる鮮やかなアクセントを配置。
- **クリーン・ペールシルバー**: 現代のディスプレイに合わせて黄ばみを排した、爽やかなペールシルバーグレー（`#EEF1F4`）を基調色に設定。
- **XP スカイブルースクロールバー**: 水色円柱グラデーションのつまみと上下矢印ボタンを完全再現。

---

## 🚀 インストール手順 (個別インストール)

本リポジトリは、ご利用のアプリケーションごとに個別フォルダー内でインストールを完結できる構成になっています。

### OBS Studio へのインストール
1. `obs-studio/` ディレクトリに移動します。
2. OS に合わせたインストーラーを実行します：
   - **Windows**: `install.bat` をダブルクリック（または PowerShell で `.\install.ps1` を実行）
   - **macOS / Linux**: ターミナルで `bash install.sh` を実行
3. 詳細は [OBS Studio テーマ詳細 (obs-studio/README.md)](obs-studio/README.md) をご覧ください。

### Zed エディタへのインストール
1. `zed/` ディレクトリに移動します。
2. OS に合わせたインストーラーを実行します：
   - **Windows**: `install.bat` をダブルクリック（または PowerShell で `.\install.ps1` を実行）
   - **macOS / Linux**: ターミナルで `bash install.sh` を実行
3. 詳細は [Zed テーマ詳細 (zed/README.md)](zed/README.md) をご覧ください。

---

## 📂 ディレクトリ構成

```text
retro-app-themes/
├── obs-studio/                  # OBS Studio 向けテーマ
│   ├── themes/
│   │   ├── Yami_SuperFamicom.ovt
│   │   ├── Yami_FamilyComputer.ovt
│   │   ├── Yami_Gameboy.ovt
│   │   ├── Yami_WindowsClassic.ovt
│   │   ├── Yami_Luna.ovt
│   │   └── classic/             # クラシックスライダーSVGアセット
│   ├── install.bat              # OBS専用インストーラー (Win)
│   ├── install.ps1
│   ├── install.sh               # OBS専用インストーラー (macOS / Linux)
│   └── README.md
│
├── zed/                         # Zed エディタ向けテーマ
│   ├── themes/
│   │   ├── super-famicom.json
│   │   ├── family-computer.json
│   │   └── gameboy.json
│   ├── install.bat              # Zed専用インストーラー (Win)
│   ├── install.ps1
│   ├── install.sh               # Zed専用インストーラー (macOS / Linux)
│   └── README.md
│
├── vscode/                      # VS Code 向けテーマ（開発準備中）
│   └── README.md
│
├── screenshots/                 # プレビュー画像
│   ├── obs/
│   │   ├── fc_preview.png
│   │   ├── sfc_preview.png
│   │   └── windows_preview.png
│   └── zed/
│       ├── fc_preview.png
│       └── gb_preview.png
│
├── .gitignore
├── LICENSE
└── README.md                    # 総合ポータル README
```

---

## 📜 ライセンス

本リポジトリ内のコードおよびテーマ定義は **GNU General Public License v2 (GPLv2)** の下で公開されています。詳細は [LICENSE](LICENSE) をご覧ください。

- **著作権**:
  - オリジナルの OBS Yami テーマおよび Zed テーマスキーマの著作権は、各プロジェクトおよびその貢献者に帰属します。
  - レトロハードウェア再現テーマのカラーパレット定義、スタイリング、カスタムコードの著作権は kjozk およびコントリビューターに帰属します。
- 任天堂の各ハードウェア名称および意匠は任天堂株式会社の商標または登録商標です。
- Microsoft、Windows、Windows XPは米国Microsoft Corporationの米国およびその他の国における登録商標または商標です。
- 本プロジェクトはファンによる非公式のオマージュテーマです。
