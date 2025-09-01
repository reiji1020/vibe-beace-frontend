import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('../../src/lib/controllers/cutClothController', () => ({
  addCutCloth: vi.fn(async (data) => ({ id: 3, ...data }))
}));

import { POST } from '../../src/routes/api/add/addCutCloth/+server';
import { addCutCloth as addCutClothMock } from '$lib/controllers/cutClothController';
import { ensureCsrfCookie } from '../../src/lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n: string) => jar.get(n), set: (n: string, v: string) => jar.set(n, v) } as any;
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

describe('API addCutCloth', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('creates cut cloth with 201 on success', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
    expect(out.body.success).toBe(true);
  });

  it('returns 400 on zod error', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ ...valid, quantity: -1 })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify(valid)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    (addCutClothMock as any).mockImplementationOnce(async () => { throw new Error('boom'); });
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });
});
