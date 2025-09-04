import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  addXStitchCloth,
  updateXStitchCloth,
  deleteXStitchCloth,
  setWishlistXStitchCloth
} from '$lib/controllers/xStitchClothController';
import type { Cookies } from '@sveltejs/kit';

vi.mock('$lib/controllers/xStitchClothController', () => ({
  getAllXStitchCloth: vi.fn(async () => [
    {
      id: 50,
      count: '14',
      color: 'White',
      size: '30x30',
      quantity: 1,
      status: 'unused',
      wishlist: false
    }
  ]),
  addXStitchCloth: vi.fn(async (d: any) => ({ id: 60, ...d })),
  updateXStitchCloth: vi.fn(async (d: any) => d),
  deleteXStitchCloth: vi.fn(async () => undefined),
  setWishlistXStitchCloth: vi.fn(async (id: number, wishlist: boolean) => ({ id, wishlist }))
}));

import { GET as GET_XS, POST as POST_XS } from '../../../src/routes/api/xstitch-cloths/+server';
import {
  PUT as PUT_XS_ID,
  DELETE as DELETE_XS_ID
} from '../../../src/routes/api/xstitch-cloths/[id]/+server';
import { PATCH as PATCH_XS_W } from '../../../src/routes/api/xstitch-cloths/[id]/wishlist/+server';
import { ensureCsrfCookie } from '../../../src/lib/csrf';

function cookiesMock(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n) => jar.get(n), set: (n, v) => jar.set(n, v) } as any;
}
async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const valid = {
  count: '14',
  color: 'White',
  size: '30x30',
  quantity: 1,
  status: 'unused',
  wishlist: false
};

describe('REST /api/xstitch-cloths', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = cookiesMock();
    token = ensureCsrfCookie(cookies);
  });

  it('GET /api/xstitch-cloths 200', async () => {
    const res = await GET_XS({ url: new URL('http://localhost/api/xstitch-cloths') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('POST /api/xstitch-cloths 201', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST_XS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
  });

  it('POST /api/xstitch-cloths 400 zod', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ ...valid, quantity: -1 })
    });
    const res = await POST_XS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('POST /api/xstitch-cloths 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await POST_XS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PUT /api/xstitch-cloths/[id] 200', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_XS_ID({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PUT /api/xstitch-cloths/[id] 400 invalid id', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/abc', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_XS_ID({ params: { id: 'abc' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('PUT /api/xstitch-cloths/[id] 500 controller error', async () => {
    vi.mocked(updateXStitchCloth).mockRejectedValueOnce(new Error('db error'));
    const req = new Request('http://localhost/api/xstitch-cloths/7', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_XS_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });

  it('PUT /api/xstitch-cloths/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await PUT_XS_ID({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PATCH /api/xstitch-cloths/[id]/wishlist 200', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_XS_W({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PATCH /api/xstitch-cloths/[id]/wishlist 400 invalid id', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/abc/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_XS_W({ params: { id: 'abc' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('PATCH /api/xstitch-cloths/[id]/wishlist 400 invalid body', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({})
    });
    const res = await PATCH_XS_W({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('PATCH /api/xstitch-cloths/[id]/wishlist 500 controller error', async () => {
    vi.mocked(setWishlistXStitchCloth).mockRejectedValueOnce(new Error('db error'));
    const req = new Request('http://localhost/api/xstitch-cloths/7/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_XS_W({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });

  it('DELETE /api/xstitch-cloths/[id] 200', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
    });
    const res = await DELETE_XS_ID({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('DELETE /api/xstitch-cloths/[id] 400 invalid id', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/abc', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
    });
    const res = await DELETE_XS_ID({ params: { id: 'abc' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('DELETE /api/xstitch-cloths/[id] 500 controller error', async () => {
    vi.mocked(deleteXStitchCloth).mockRejectedValueOnce(new Error('db error'));
    const req = new Request('http://localhost/api/xstitch-cloths/7', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
    });
    const res = await DELETE_XS_ID({ params: { id: '7' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });

  it('POST /api/xstitch-cloths 500 controller error', async () => {
    vi.mocked(addXStitchCloth).mockRejectedValueOnce(new Error('db error'));
    const req = new Request('http://localhost/api/xstitch-cloths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST_XS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });

  it('DELETE /api/xstitch-cloths/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/xstitch-cloths/3', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' }
    });
    const res = await DELETE_XS_ID({ params: { id: '3' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });
});
