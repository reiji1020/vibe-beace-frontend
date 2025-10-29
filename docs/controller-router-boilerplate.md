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
│   └── api/
│       └── response.ts                    ← APIレスポンスヘルパー
│   └── csrf.ts                            ← CSRFユーティリティ
```

---

## 📘 コントローラー雛形（Thread）

Prismaを利用した最小例（既存の `threadController.ts` と整合）。

```ts
// src/lib/controllers/threadController.ts（抜粋）
import { prisma } from '$lib/db';
import type { Thread } from '$lib/types';

export async function getAllThreads(query?: string | null): Promise<Thread[]> {
  const where = query
    ? { OR: [
        { brand: { contains: query } },
        { colorNumber: { contains: query } },
        { colorName: { contains: query } }
      ] }
    : undefined;
  return prisma.thread.findMany({ where, orderBy: { colorNumber: 'asc' } });
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
import type { RequestHandler } from '@sveltejs/kit';
import { getAllThreads, addThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const rows = await getAllThreads(query);
  return ok(rows);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  try {
    const body = await request.json();
    const parsed = threadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const createdItem = await addThread(parsed.data as any);
    return created(createdItem);
  } catch (err) {
    return serverError((err as Error).message);
  }
};
```

更新/削除（`/api/threads/[id]`）

```ts
// src/routes/api/threads/[id]/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { updateThread, deleteThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    const body = await request.json();
    const parsed = threadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const updated = await updateThread({ id, ...parsed.data } as any);
    return ok(updated);
  } catch (err) {
    return serverError((err as Error).message);
  }
};

export const DELETE: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    await deleteThread(id);
    return ok({ id });
  } catch (err) {
    return serverError((err as Error).message);
  }
};
```

Wishlist更新（`/api/threads/[id]/wishlist`）

```ts
// src/routes/api/threads/[id]/wishlist/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { setWishlistThread } from '$lib/controllers/threadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    const body = await request.json().catch(() => ({}));
    const wishlist = typeof body?.wishlist === 'boolean' ? body.wishlist : null;
    if (wishlist === null) return badRequest('Invalid wishlist flag');
    const updated = await setWishlistThread(id, wishlist);
    return ok(updated);
  } catch (err) {
    return serverError((err as Error).message);
  }
};
```

---

## 🧱 メモ

- 各カテゴリ（Bead/CutCloth/XStitchCloth）も同様の構成で実装。
- 入力検証は `src/lib/validation/*.ts` のZodスキーマ＋`safeParse` で統一。
- レスポンスは `src/lib/api/response.ts` を使用して統一。
- CSRFは `src/lib/csrf.ts` のヘッダ検証（Double-Submit）を利用。
