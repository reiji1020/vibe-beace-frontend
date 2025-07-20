# 🧩 コントローラー & ルータ構成（在庫管理ツール）

このドキュメントは、SvelteKit + TypeScript + NeonDB 環境における  
在庫管理APIのコントローラー・ルータ設計雛形を示します。

---

## 📁 ディレクトリ構成（一部）

```
src/
├── routes/
│   └── api/
│       └── getThreads/+server.ts      ← 一覧取得ルータ
│       └── addThread/+server.ts       ← 追加ルータ
├── lib/
│   └── controllers/
│       └── threadController.ts        ← コントローラ関数
│   └── db.ts                          ← DB接続（postgres.js想定）
```

---

## 📘 コントローラー雛形（threadController.ts）

```ts
// src/lib/controllers/threadController.ts
import { sql } from '$lib/db';

export async function getAllThreads() {
  return await sql\`SELECT * FROM thread ORDER BY colorNumber ASC\`;
}

export async function addThread(data: {
  brand: string;
  colorNumber: string;
  colorName?: string;
  quantity: number;
  status?: string;
  wishlist: boolean;
}) {
  return await sql\`
    INSERT INTO thread
      (brand, colorNumber, colorName, quantity, status, wishlist)
    VALUES
      (\${data.brand}, \${data.colorNumber}, \${data.colorName}, \${data.quantity}, \${data.status}, \${data.wishlist})
    RETURNING *;
  \`;
}
```

---

## 🔁 ルータ雛形（getThreads）

```ts
// src/routes/api/getThreads/+server.ts
import { getAllThreads } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const threads = await getAllThreads();
	return new Response(JSON.stringify({ success: true, data: threads }), {
		status: 200
	});
};
```

---

## ➕ ルータ雛形（addThread）

```ts
// src/routes/api/addThread/+server.ts
import { addThread } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const newThread = await addThread(body);

		return new Response(JSON.stringify({ success: true, data: newThread }), {
			status: 201
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ success: false, error: 'Invalid input' }), {
			status: 400
		});
	}
};
```

---

## 🧱 拡張ポイント

- 各カテゴリに応じて `beadController.ts`, `cutClothController.ts` などに分割可能
- バリデーションは Zod 等で `addThread` 内または `POST` 内に導入可能
- Prismaを使う場合は `prisma.thread.findMany()` 等に書き換えればOK

---

## 🧪 使用技術

- SvelteKit Endpoints（+server.ts）
- TypeScript
- postgres.js（または Prisma）
