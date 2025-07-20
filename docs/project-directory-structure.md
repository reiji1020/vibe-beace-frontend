# 📁 ディレクトリ構成（手芸在庫管理ツール）

本プロジェクトは、SvelteKit + TypeScript + NeonDB をベースとした在庫管理Webアプリです。

---

## 📦 基本構成

```
project-root/
├── src/
│   ├── lib/
│   │   └── db.ts            # NeonDBへの接続設定（postgres.jsやPrisma）
│   ├── routes/
│   │   └── api/
│   │       └── inventory/
│   │           ├── +server.ts      # 刺繍糸、ビーズなどのAPI（GET/POST等）
│   │           └── thread/         # 刺繍糸専用API（必要に応じて）
│   └── app.html             # 共通HTMLテンプレート
├── static/                  # 公開用の静的ファイル（画像など）
├── .env                     # 環境変数（NeonDB接続情報など）
├── svelte.config.js         # SvelteKit設定
├── tsconfig.json            # TypeScript設定
└── README.md                # プロジェクト概要
```

---

## 🔧 ファイル・ディレクトリ詳細

- `src/lib/db.ts`  
  NeonDBに接続するためのモジュールを定義します。

- `src/routes/api/`  
  REST APIのエンドポイントをルーティングごとに配置します。

- `static/`  
  公開画像やダウンロードファイルなどをここに配置します。

- `.env`  
  `VITE_NEON_DATABASE_URL` などの接続用情報を記述します。

- `svelte.config.js`  
  Vite / SvelteKit のビルド設定などを行います。

---

## 🧪 今後追加予定の構成（例）

- `src/components/`  
  カードUIやモーダルなどの再利用可能なSvelteコンポーネント群

- `src/routes/login/`  
  認証ページ（ClerkやLuciaなどを組み込む場合）

- `src/lib/types.ts`  
  型定義ファイル。APIやDBで共通化します。
