# 🧩 Prisma スキーマ設計書（在庫管理ツール）

本ドキュメントは、Prisma ORMを使用して手芸材料の在庫管理アプリにおけるデータ構造を定義するものです。接続先は NeonDB（PostgreSQL）を想定しています。

---

## ⚙️ データソース設定

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 🧵 Thread（刺繍糸）

```prisma
model Thread {
  id           Int     @id @default(autoincrement())
  brand        String
  colorNumber  String
  colorName    String?
  quantity     Int
  status       String?  // unused, used, low
  wishlist     Boolean
}
```

---

## 🟣 Bead（ビーズ）

```prisma
model Bead {
  id         Int     @id @default(autoincrement())
  brand      String
  itemCode   String
  size       String
  colorName  String?
  quantity   Int
  status     String?  // unused, used, low
  wishlist   Boolean
}
```

---

## 🧵 CutCloth（カットクロス）

```prisma
model CutCloth {
  id          Int     @id @default(autoincrement())
  fabricType  String
  pattern     String
  size        String
  quantity    Int
  status      String?  // unused, used
  wishlist    Boolean
}
```

---

## 🧵 XStitchCloth（クロスステッチ用クロス）

```prisma
model XStitchCloth {
  id        Int     @id @default(autoincrement())
  count     String
  color     String
  size      String
  quantity  Int
  status    String?  // unused, used
  wishlist  Boolean
}
```

---

## 🧪 補足

- 各テーブルには `wishlist` フラグが含まれ、買い物リスト機能と連動可能です。
- `status` は文字列型で分類しますが、将来的にEnumに置き換えも可能です。
- `id` は全テーブルで自動インクリメント型の主キーとしています。

---

## 🌱 今後の拡張案

- 図案（Pattern）とのリレーション設計
- 色見本マスターテーブルの追加
- ユーザー管理（マルチユーザー対応）設計

