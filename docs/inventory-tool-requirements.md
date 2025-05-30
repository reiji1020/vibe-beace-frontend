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

### 🧵 刺繍糸

```ts
{
  type: "thread",
  brand: "DMC" | "COSMO" | string,
  color_number: string,
  color_name?: string,
  quantity: number,
  status?: "unused" | "used" | "low",
  wishlist: boolean
}
```

### 🟣 ビーズ

```ts
{
  type: "bead",
  brand: "TOHO" | "MIYUKI" | string,
  item_code: string,
  size: string,
  color_name?: string,
  quantity: number,
  status?: "unused" | "used" | "low",
  wishlist: boolean
}
```

### 🧵 カットクロス

```ts
{
  type: "cut_cloth",
  fabric_type: string,
  pattern: string,
  size: string,
  quantity: number,
  status?: "unused" | "used",
  wishlist: boolean
}
```

### 🧵 クロスステッチ用クロス

```ts
{
  type: "xstitch_cloth",
  count: string,
  color: string,
  size: string,
  quantity: number,
  status?: "unused" | "used",
  wishlist: boolean
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
- [x] 所持中／未所持フラグ
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

## 🚧 技術スタック（予定）

- フロントエンド：SvelteKit / Vite（予定）
- バックエンド：Node.js + SQLite or Supabase
- 認証：Googleログイン or ローカルストレージ＋PIN
- デプロイ：Vercel / Railway / Cloudflare Pages

---

## 👤 作者

- ユーザー：Saya Katafuchi（予定開発者）
- 開発サポート：ChatGPT（OpenAI）
