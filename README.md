# パーチェイスフック理論 ＋ VOC活用案 — LP

「パーチェイスフック理論 概要 ＋ VOC活用案」のスライドを、縦スクロール1枚のランディングページに再構成した静的サイトです。フレームワークは使わず、素の HTML / CSS / 最小限の JS（バニラ）で構築しています。

## 公開URL

GitHub Actions によるデプロイ完了後、以下で公開されます（サブパス配下）。

**https://yoichi0107.github.io/purchasehook_discussion/**

## 構成

```
/
├─ index.html              … 1ページ完結のLP（header / section / footer）
├─ css/styles.css          … デザイントークン（CSS変数）とレイアウト
├─ js/main.js              … スクロールフェードイン（IntersectionObserver）
├─ images/                 … 画像（下記「画像の差し替え」を参照）
│  ├─ hero-desk.svg
│  ├─ drugstore-shelf.svg
│  └─ framework-diagram.svg
├─ .github/workflows/deploy.yml
└─ README.md
```

## ローカルでの起動

```bash
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

375 / 768 / 1280px で表示崩れが無いことを確認してください。

## 技術メモ

- **レスポンシブ**：モバイルファースト。375 / 768 / 1280px で破綻しない設計。
- **タイポグラフィ**：本文は Google Fonts の Noto Sans JP（400/500/700）、`line-height: 1.8` 前後、`overflow-wrap: anywhere` / `word-break: normal`。数字・英字の見出しのみ Poppins を併用（スライドの Century Gothic 風）。
- **構成図の出し分け**：デスクトップ（≥900px）は `framework-diagram` の画像を表示（クリックで等倍）、モバイルは画像が潰れて読めないため **ネイティブHTML版** を表示（CSS `@media` で切替）。
- **アニメーション**：各セクションが軽くフェードインのみ。パララックス等は不使用。`prefers-reduced-motion` に対応。
- **外部依存**：Google Fonts のみ。トラッキング/解析タグは入れていません。
- **パス**：GitHub Pages のサブパス配下に置くため、画像・CSS・JS の参照はすべて相対パス（先頭 `/` を使わない）。

## 画像の差し替え

`images/` には現在 **プレースホルダ（SVG・単色＋ラベル）** が入っています。実画像に差し替える場合は以下のいずれかで対応してください。

| ファイル | 用途 | 差し替え方法 |
|---|---|---|
| `images/hero-desk.svg` | ヒーロー背景（机まわりの写真想定） | 既定では「白背景＋淡いアクセント」表示。写真を使う場合は `images/hero-desk.jpg` を置き、`css/styles.css` の `.hero` の `background-image` を白い薄スクリム＋`url("../images/hero-desk.jpg")` に差し替える（該当箇所にコメントあり） |
| `images/drugstore-shelf.svg` | 店頭の棚写真 | `images/drugstore-shelf.jpg` を置き、`index.html` の該当 `<img src>` を `.jpg` に変更 |
| `images/framework-diagram.svg` | 全体構成図（PCで表示） | 元スライドの構成図 `framework-diagram.png` を置き、`index.html` の該当 `<img src>` / `<a href>` を `.png` に変更 |

> `framework-diagram.svg` はスライドの構成図を再現したベクター版です。元のスライド画像（PNG）を使いたい場合のみ差し替えてください。モバイル表示はファイルに依存しないネイティブHTML版なので、画像差し替えの影響を受けません。

## デプロイ（GitHub Pages）

本リポジトリには `.github/workflows/deploy.yml` を同梱しており、`main` または開発ブランチ `claude/purchase-hook-lp-pw13pt` への push（および手動実行）で GitHub Actions が Pages へデプロイします。

**初回のみ必要な設定：**

1. GitHub のリポジトリ → **Settings → Pages**
2. **Build and deployment → Source** を **「GitHub Actions」** に設定

その後、対象ブランチへ push すると Actions が走り、上記URLで公開されます（Actions タブの `Deploy to GitHub Pages` の実行URLからも確認可能）。

別リポジトリ（例 `purchase-hook-lp`）として公開したい場合：

```bash
git remote add origin https://github.com/<user>/purchase-hook-lp.git
git push -u origin main
# → Settings → Pages → Source: GitHub Actions
```

## 品質チェック（実施済みの観点）

- 375 / 768 / 1280px でテキストのはみ出し・要素の重なり・余白の不揃いが無いこと
- すべての画像に `alt`、リンク/ボタンにフォーカスリング
- 黒文字×淡面のコントラスト確保
- 日本語の行間・約物が詰まりすぎていないこと
