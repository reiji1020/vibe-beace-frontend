import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('$lib/controllers/beadController', () => ({
  getAllBeads: vi.fn(async () => [
    {
      id: 10,
      brand: 'TOHO',
      itemCode: 'A-01',
      size: '11/0',
      quantity: 1,
      status: 'unused',
      wishlist: false
    }
  ]),
  addBead: vi.fn(async (d: any) => ({ id: 20, ...d })),
  updateBead: vi.fn(async (d: any) => d),
  deleteBead: vi.fn(async () => undefined),
  setWishlistBead: vi.fn(async (id: number, wishlist: boolean) => ({ id, wishlist }))
}));

import { GET as GET_BEADS, POST as POST_BEADS } from '../../../src/routes/api/beads/+server';
import { PUT as PUT_BEAD, DELETE as DELETE_BEAD } from '../../../src/routes/api/beads/[id]/+server';
import { PATCH as PATCH_WISHLIST } from '../../../src/routes/api/beads/[id]/wishlist/+server';
import { ensureCsrfCookie } from '../../../src/lib/csrf';

function cookiesMock(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n) => jar.get(n), set: (n, v) => jar.set(n, v) } as any;
}
async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const valid = {
  brand: 'TOHO',
  itemCode: 'A-01',
  size: '11/0',
  quantity: 1,
  status: 'unused',
  wishlist: false
};

describe('REST /api/beads', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = cookiesMock();
    token = ensureCsrfCookie(cookies);
  });

  it('GET /api/beads 200', async () => {
    const res = await GET_BEADS({ url: new URL('http://localhost/api/beads') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
  });

  it('POST /api/beads 201', async () => {
    const req = new Request('http://localhost/api/beads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST_BEADS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
  });

  it('POST /api/beads 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/beads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await POST_BEADS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PUT /api/beads/[id] 200', async () => {
    const req = new Request('http://localhost/api/beads/9', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await PUT_BEAD({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PUT /api/beads/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/beads/9', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await PUT_BEAD({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('PATCH /api/beads/[id]/wishlist 200', async () => {
    const req = new Request('http://localhost/api/beads/9/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ wishlist: true })
    });
    const res = await PATCH_WISHLIST({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('PATCH /api/beads/[id]/wishlist 400 invalid body', async () => {
    const req = new Request('http://localhost/api/beads/9/wishlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({})
    });
    const res = await PATCH_WISHLIST({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('DELETE /api/beads/[id] 200', async () => {
    const req = new Request('http://localhost/api/beads/9', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
    });
    const res = await DELETE_BEAD({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
  });

  it('DELETE /api/beads/[id] 403 invalid CSRF', async () => {
    const req = new Request('http://localhost/api/beads/9', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' }
    });
    const res = await DELETE_BEAD({ params: { id: '9' }, request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('POST /api/beads 400 zod', async () => {
    const req = new Request('http://localhost/api/beads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ ...valid, quantity: -1 })
    });
    const res = await POST_BEADS({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });
});
