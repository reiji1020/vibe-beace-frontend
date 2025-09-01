import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('$lib/controllers/threadController', () => ({
  getAllThreads: vi.fn(async () => [
    { id: 1, brand: 'DMC', colorNumber: '310', quantity: 1, status: 'unused', wishlist: false }
  ]),
  addThread: vi.fn(async (d: any) => ({ id: 2, ...d })),
  updateThread: vi.fn(async (d: any) => d),
  deleteThread: vi.fn(async () => undefined),
  setWishlistThread: vi.fn(async (id: number, wishlist: boolean) => ({ id, wishlist }))
}));

import { GET as GET_THREADS, POST as POST_THREADS } from '../../../src/routes/api/threads/+server';
import {
  PUT as PUT_THREAD,
  DELETE as DELETE_THREAD
} from '../../../src/routes/api/threads/[id]/+server';
import { PATCH as PATCH_WISHLIST } from '../../../src/routes/api/threads/[id]/wishlist/+server';
import { ensureCsrfCookie } from '../../../src/lib/csrf';

function cookiesMock(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n) => jar.get(n), set: (n, v) => jar.set(n, v) } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const valid = { brand: 'DMC', colorNumber: '310', quantity: 1, status: 'unused', wishlist: false };

describe('REST /api/threads', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = cookiesMock();
    token = ensureCsrfCookie(cookies);
  });

  it('GET /api/threads returns list 200', async () => {
    const res = await GET_THREADS({ url: new URL('http://localhost/api/threads') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
  });

  it('POST /api/threads creates 201', async () => {
    const req = new Request('http://localhost/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST_THREADS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
  });

  it('PUT /api/threads/[id] updates 200', async () => {
    const req = new Request('http://localhost/api/threads/5', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_THREAD({ params: { id: '5' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PATCH /api/threads/[id]/wishlist updates 200', async () => {
    const req = new Request('http://localhost/api/threads/5/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_WISHLIST({ params: { id: '5' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('DELETE /api/threads/[id] deletes 200', async () => {
    const req = new Request('http://localhost/api/threads/5', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: ''
    });
    const res = await DELETE_THREAD({ params: { id: '5' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('POST /api/threads returns 400 on zod', async () => {
    const req = new Request('http://localhost/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ ...valid, quantity: -1 })
    });
    const res = await POST_THREADS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('PUT /api/threads/[id] returns 403 on CSRF', async () => {
    const req = new Request('http://localhost/api/threads/5', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await PUT_THREAD({ params: { id: '5' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PATCH /api/threads/[id]/wishlist returns 400 on invalid body', async () => {
    const req = new Request('http://localhost/api/threads/5/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({})
    });
    const res = await PATCH_WISHLIST({ params: { id: '5' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });
});
