# ✅ バリデーション設計書（在庫管理ツール）

このドキュメントは、Zodを使った在庫管理ツール各素材カテゴリのバリデーション設計を定義します。  
すべて TypeScript + Zod を前提としています。

---

## 🧰 使用技術

- バリデーションライブラリ：`Zod`
- 主な使用箇所：APIルート（POST/PUT）およびフォームバリデーション
- 型の共通利用：`z.infer<typeof schema>` による再利用可能型

---

## 🧵 刺繍糸（Thread）

```ts
import { z } from 'zod';

export const threadSchema = z.object({
  brand: z.string().min(1),
  colorNumber: z.string().min(1),
  colorName: z.string().optional(),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used', 'low']).optional(),
  wishlist: z.boolean()
});
```

---

## 🟣 ビーズ（Bead）

```ts
export const beadSchema = z.object({
  brand: z.string().min(1),
  itemCode: z.string().min(1),
  size: z.string().min(1),
  colorName: z.string().optional(),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used', 'low']).optional(),
  wishlist: z.boolean()
});
```

---

## 🧵 カットクロス（CutCloth）

```ts
export const cutClothSchema = z.object({
  fabricType: z.string().min(1),
  pattern: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used']).optional(),
  wishlist: z.boolean()
});
```

---

## 🧵 クロスステッチ布（XStitchCloth）

```ts
export const xStitchClothSchema = z.object({
  count: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used']).optional(),
  wishlist: z.boolean()
});
```

---

## 📥 APIでの使用例（addThread）

```ts
import { threadSchema } from '$lib/validation/threadSchema';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const validated = threadSchema.parse(body);
    const created = await addThread(validated);
    return new Response(JSON.stringify({ success: true, data: created }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
};
```

---

## 🗂️ 推奨ディレクトリ構成

```
src/
├── lib/
│   └── validation/
│       ├── threadSchema.ts
│       ├── beadSchema.ts
│       ├── cutClothSchema.ts
│       └── xStitchClothSchema.ts
```

---

## 🔖 備考

- `.min(1)` を使用して空文字を防止
- `optional()` を適切に使用して柔軟性を担保
- enum によって status の誤入力を防止
