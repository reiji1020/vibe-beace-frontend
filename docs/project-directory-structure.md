# 📁 ディレクトリ構成（手芸在庫管理ツール）

本プロジェクトは、SvelteKit + TypeScript + Prisma（PostgreSQL）をベースとした在庫管理Webアプリです。

---

## 📦 基本構成

```
project-root/
├── src/
│   ├── lib/
│   │   ├── db.ts                   # PrismaClient 単一インスタンス
│   │   ├── controllers/            # 各リソースの業務ロジック
│   │   ├── validation/             # Zod スキーマ
│   │   ├── api/response.ts         # APIレスポンスヘルパー
│   │   └── csrf.ts                 # CSRFユーティリティ
│   ├── routes/
│   │   └── api/
│   │       ├── threads/            # 刺繍糸 REST（GET list/POST/PUT/DELETE/PATCH wishlist）
│   │       ├── beads/
│   │       ├── cut-cloths/
│   │       └── xstitch-cloths/
│   └── app.html                    # 共通HTMLテンプレート
├── static/                         # 公開用の静的ファイル（画像など）
├── prisma/
│   └── schema.prisma               # Prisma スキーマ
├── .env                            # 環境変数（`DATABASE_URL` 等）
├── svelte.config.js                # SvelteKit設定
├── tsconfig.json                   # TypeScript設定
└── README.md                       # プロジェクト概要
```

---

## 🔧 ファイル・ディレクトリ詳細

- `src/lib/db.ts`  
  PrismaClient を初期化し、サーバ専用で再利用します。

- `src/routes/api/`  
  REST APIのエンドポイントをルーティングごとに配置します。

- `static/`  
  公開画像やダウンロードファイルなどをここに配置します。

- `.env`  
  `DATABASE_URL`（PostgreSQL接続情報）を定義します。

- `svelte.config.js`  
  Vite / SvelteKit のビルド設定などを行います。

---

## 🧪 今後追加予定の構成（例）

- `src/components/`  
  カードUIやモーダルなどの再利用可能なSvelteコンポーネント群

- `src/routes/login/`  
  認証ページ（必要に応じて）

- `src/lib/types.ts`  
  型定義ファイル。APIやDBで共通化します。
