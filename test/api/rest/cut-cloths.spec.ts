import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('$lib/controllers/cutClothController', () => ({
  getAllCutCloth: vi.fn(async () => [
    {
      id: 30,
      fabricType: 'Linen',
      pattern: 'Plain',
      size: '30x30',
      quantity: 1,
      status: 'unused',
      wishlist: false
    }
  ]),
  addCutCloth: vi.fn(async (d: any) => ({ id: 40, ...d })),
  updateCutCloth: vi.fn(async (d: any) => d),
  deleteCutCloth: vi.fn(async () => undefined),
  setWishlistCutCloth: vi.fn(async (id: number, wishlist: boolean) => ({ id, wishlist }))
}));

import { GET as GET_CC, POST as POST_CC } from '../../../src/routes/api/cut-cloths/+server';
import {
  PUT as PUT_CC_ID,
  DELETE as DELETE_CC_ID
} from '../../../src/routes/api/cut-cloths/[id]/+server';
import { PATCH as PATCH_CC_W } from '../../../src/routes/api/cut-cloths/[id]/wishlist/+server';
import { ensureCsrfCookie } from '../../../src/lib/csrf';

function cookiesMock(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n) => jar.get(n), set: (n, v) => jar.set(n, v) } as any;
}
async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const valid = {
  fabricType: 'Linen',
  pattern: 'Plain',
  size: '30x30',
  quantity: 1,
  status: 'unused',
  wishlist: false
};

describe('REST /api/cut-cloths', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = cookiesMock();
    token = ensureCsrfCookie(cookies);
  });

  it('GET /api/cut-cloths 200', async () => {
    const res = await GET_CC({ url: new URL('http://localhost/api/cut-cloths') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('POST /api/cut-cloths 201', async () => {
    const req = new Request('http://localhost/api/cut-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST_CC({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
  });

  it('POST /api/cut-cloths 400 zod', async () => {
    const req = new Request('http://localhost/api/cut-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ ...valid, quantity: -1 })
    });
    const res = await POST_CC({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('POST /api/cut-cloths 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/cut-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await POST_CC({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PUT /api/cut-cloths/[id] 200', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_CC_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PUT /api/cut-cloths/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await PUT_CC_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PATCH /api/cut-cloths/[id]/wishlist 200', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_CC_W({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PATCH /api/cut-cloths/[id]/wishlist 400 invalid body', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({})
    });
    const res = await PATCH_CC_W({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('DELETE /api/cut-cloths/[id] 200', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
    });
    const res = await DELETE_CC_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('DELETE /api/cut-cloths/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/cut-cloths/7', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' }
    });
    const res = await DELETE_CC_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });
});
