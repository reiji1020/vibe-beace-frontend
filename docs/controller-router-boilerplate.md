# 🧩 コントローラー & ルータ構成（REST雛形）

このドキュメントは、SvelteKit + TypeScript + Prisma（PostgreSQL）によるREST APIのコントローラー・ルータ雛形です。

---

## 📁 ディレクトリ構成（一部）

```
src/
├── routes/
│   └── api/
│       └── threads/
│           ├── +server.ts                ← GET(list)/POST(create)
│           └── [id]/
│               ├── +server.ts            ← GET(read)/PUT(update)/DELETE(delete)
│               └── wishlist/
│                   └── +server.ts        ← PATCH(wishlist)
├── lib/
│   └── controllers/
│       └── threadController.ts            ← Prismaベースの業務ロジック
│   └── validation/
│       └── threadSchema.ts                ← Zodスキーマ
```

---

## 📘 コントローラー雛形（Thread）

Prismaを利用した最小例（既存の `threadController.ts` と整合）。

```ts
// src/lib/controllers/threadController.ts（抜粋）
import { prisma } from '$lib/db';
import type { Thread } from '$lib/types';

export async function getAllThreads(): Promise<Thread[]> {
  return prisma.thread.findMany({ orderBy: { colorNumber: 'asc' } });
}

export async function addThread(data: Thread): Promise<Thread> {
  return prisma.thread.create({ data });
}

export async function updateThread(data: Partial<Thread> & { id: number }): Promise<Thread> {
  const { id, ...updateData } = data;
  return prisma.thread.update({ where: { id }, data: updateData });
}

export async function deleteThread(id: number): Promise<Thread> {
  return prisma.thread.delete({ where: { id } });
}

export async function setWishlistThread(id: number, wishlist: boolean): Promise<Thread> {
  return prisma.thread.update({ where: { id }, data: { wishlist } });
}
```

---

## 🔁 ルータ雛形（REST）

一覧/作成（`/api/threads`）

```ts
// src/routes/api/threads/+server.ts
import { getAllThreads, addThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const rows = await getAllThreads();
  return new Response(JSON.stringify({ success: true, data: rows }), { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const validated = threadSchema.parse(body);
    const created = await addThread(validated as any);
    return new Response(JSON.stringify({ success: true, data: created }), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
};
```

1件取得/更新/削除（`/api/threads/[id]`）

```ts
// src/routes/api/threads/[id]/+server.ts
import { getThreadById, updateThread, deleteThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id);
  const row = await getThreadById(id);
  if (!row) return new Response(JSON.stringify({ success: false, error: 'Not Found' }), { status: 404 });
  return new Response(JSON.stringify({ success: true, data: row }), { status: 200 });
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const validated = threadSchema.parse(body);
    const updated = await updateThread({ id, ...validated } as any);
    return new Response(JSON.stringify({ success: true, data: updated }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  const id = Number(params.id);
  const deleted = await deleteThread(id);
  return new Response(JSON.stringify({ success: true, data: { id: deleted.id } }), { status: 200 });
};
```

Wishlist更新（`/api/threads/[id]/wishlist`）

```ts
// src/routes/api/threads/[id]/wishlist/+server.ts
import { setWishlistThread } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ params, request }) => {
  const id = Number(params.id);
  const { wishlist } = await request.json();
  const updated = await setWishlistThread(id, Boolean(wishlist));
  return new Response(JSON.stringify({ success: true, data: updated }), { status: 200 });
};
```

---

## 🧱 メモ

- 各カテゴリ（Bead/CutCloth/XStitchCloth）も同様の構成で実装。
- 入力検証は `src/lib/validation/*.ts` のZodスキーマで統一。
- 認証/CSRFは `docs/rest-endpoints.md` の方針に従う。
