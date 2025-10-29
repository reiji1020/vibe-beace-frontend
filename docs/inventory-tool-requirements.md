# 📦 手芸材料 在庫管理ツール：要件定義書

## 🧭 概要

ビーズ・刺繍糸・カットクロス・クロスステッチ布の4種類の素材を管理する、手芸用在庫管理ツールを開発する。  
主な利用目的は「買い出し時の重複購入防止」であり、スマートフォンからの確認性を重視する。PCからも登録・編集が可能とする。

---

## 🎯 利用目的

- 買い出し時に「すでに持っている色や素材」をすぐ確認したい
- 似た色・素材を重複して購入してしまうのを防ぎたい
- 所持品や在庫切れ品を一覧で整理したい

---

## 📱 利用端末と保存方式

- スマートフォン（主に確認用）
- PC（主に登録・編集用）
- データ保存：**サーバーサイド（クラウド）**
- デバイス間での同期を実現

---

## 🧩 管理対象とデータ構造

共通事項

- `quantity`: 整数、0以上
- `wishlist`: 買い物リストフラグ（必須）
- `notes`: 任意メモ（最大1000文字、null可）
- システム管理項目: `createdAt`/`updatedAt`（ISO文字列、サーバで自動付与）

### 🧵 刺繍糸（Thread）

```ts
{
  brand: string,
  colorNumber: string,
  colorName?: string | null,
  quantity: number,
  status?: 'unused' | 'used' | 'low' | null,
  wishlist: boolean,
  notes?: string | null,
  createdAt?: string,
  updatedAt?: string
}
```

### 🟣 ビーズ（Bead）

```ts
{
  brand: string,
  itemCode: string,
  size: string,
  colorName?: string | null,
  quantity: number,
  status?: 'unused' | 'used' | 'low' | null,
  wishlist: boolean,
  notes?: string | null,
  createdAt?: string,
  updatedAt?: string
}
```

### 🧵 カットクロス（CutCloth）

```ts
{
  brand?: string | null,
  fabricType: string,
  pattern: string,
  size: string,
  quantity: number,
  status?: 'unused' | 'used' | null,
  wishlist: boolean,
  notes?: string | null,
  createdAt?: string,
  updatedAt?: string
}
```

### 🧵 クロスステッチ用クロス（XStitchCloth）

```ts
{
  brand?: string | null,
  count: string,
  color: string,
  size: string,
  quantity: number,
  status?: 'unused' | 'used' | null,
  wishlist: boolean,
  notes?: string | null,
  createdAt?: string,
  updatedAt?: string
}
```

---

## 🖼️ UI/UX要件

- モバイル／PC両対応
- カード形式の一覧UI（素材ごとに視認性の高い表示）
- 色番号・品番・サイズでの検索・フィルタ機能
- 「買い物リスト」フラグの切り替え機能

---

## ✨ 必須機能

- [x] 素材の新規登録・編集・削除
- [x] 買い物リストへの追加・解除
- [x] 在庫状態（unused/used/low）の管理
- [x] 数量の管理
- [x] クラウド保存と同期
- [x] スマホでの確認性の高いUI

---

## 🌱 今後の拡張候補

- [ ] 図案との連携（使った素材の記録）
- [ ] メーカー公式の色見本帳との照合機能
- [ ] CSVのインポート／エクスポート
- [ ] 素材画像の添付と表示

---

## 🚧 技術スタック（現行）

- フロントエンド：SvelteKit v2 + TypeScript + Vite + Tailwind CSS v4
- バックエンド：SvelteKit Endpoints（+server.ts） + Prisma v6（PostgreSQL）
- バリデーション：Zod（`src/lib/validation/*.ts`）＋ `safeParse`
- 認証・セキュリティ：セッションCookie + CSRF（Double-Submit Token: Cookie `csrf` とヘッダ `X-CSRF-Token`）
- デプロイ：Netlify（`@sveltejs/adapter-netlify`）

---

## 👤 作者

- ユーザー：Saya Katafuchi（予定開発者）
- 開発サポート：ChatGPT（OpenAI）
