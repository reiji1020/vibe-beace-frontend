# 🧩 Prisma スキーマ設計書（在庫管理ツール）

本ドキュメントは、Prisma ORM を用いた在庫管理アプリの現在のデータスキーマを示します。接続先は PostgreSQL（例: Neon）を想定します。

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

## 📚 Enum

```prisma
// Thread/Bead で使用
enum StatusWithLow {
  unused
  used
  low
}

// CutCloth/XStitchCloth で使用
enum StatusBasic {
  unused
  used
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
  status       StatusWithLow?
  wishlist     Boolean
  notes        String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
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
  status     StatusWithLow?
  wishlist   Boolean
  notes      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## 🧵 CutCloth（カットクロス）

```prisma
model CutCloth {
  id          Int     @id @default(autoincrement())
  brand       String?
  fabricType  String
  pattern     String
  size        String
  quantity    Int
  status      StatusBasic?
  wishlist    Boolean
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🧵 XStitchCloth（クロスステッチ布）

```prisma
model XStitchCloth {
  id        Int     @id @default(autoincrement())
  brand     String?
  count     String
  color     String
  size      String
  quantity  Int
  status    StatusBasic?
  wishlist  Boolean
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧪 補足

- `status` は Enum を採用し、誤入力を防止（Thread/Bead は `StatusWithLow`、CutCloth/XStitchCloth は `StatusBasic`）。
- `notes` は任意メモ欄（最大長はアプリ側バリデーションで制御）。
- 監査列として `createdAt`/`updatedAt` を全モデルに追加。
- `brand` は CutCloth/XStitchCloth では任意入力。
- すべての `id` は自動採番の主キー。

---

## 🌱 今後の拡張案

- 図案（Pattern）とのリレーション設計
- 色見本マスターテーブルの追加
- ユーザー管理（マルチユーザー対応）設計
