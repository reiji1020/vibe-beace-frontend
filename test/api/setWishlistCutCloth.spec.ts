import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('$lib/controllers/cutClothController', () => ({
  setWishlistCutCloth: vi.fn(async (id: number, wishlist: boolean) => ({ id, wishlist }))
}));

import { POST } from '../../src/routes/api/update/setWishlistCutCloth/+server';
import { setWishlistCutCloth } from '$lib/controllers/cutClothController';
import { ensureCsrfCookie } from '$lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n: string) => jar.get(n), set: (n: string, v: string) => jar.set(n, v) } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API setWishlistCutCloth', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
    (setWishlistCutCloth as any).mockClear?.();
  });

  it('updates wishlist with 200 on success', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 4, wishlist: true })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect((setWishlistCutCloth as any).mock.calls[0]).toEqual([4, true]);
  });

  it('returns 400 on invalid body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 0, wishlist: true })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify({ id: 4, wishlist: true })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    (setWishlistCutCloth as any).mockImplementationOnce(async () => { throw new Error('boom'); });
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 4, wishlist: true })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });
});
