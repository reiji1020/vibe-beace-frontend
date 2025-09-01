import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('../../src/lib/controllers/beadController', () => ({
  updateBead: vi.fn(async (data) => ({ ...data }))
}));

import { POST } from '../../src/routes/api/update/updateBead/+server';
import { updateBead as updateBeadMock } from '$lib/controllers/beadController';
import { ensureCsrfCookie } from '../../src/lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n: string) => jar.get(n), set: (n: string, v: string) => jar.set(n, v) } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const base = {
  brand: 'TOHO',
  itemCode: 'A-01',
  size: '11/0',
  colorName: 'Red',
  quantity: 5,
  status: 'unused',
  wishlist: false
};

describe('API updateBead', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('updates bead with 200 when valid', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 7, ...base })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
  });

  it('returns 400 when id missing', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(base)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 400 on zod error', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 7, ...base, quantity: -1 })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify({ id: 7, ...base })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    (updateBeadMock as any).mockImplementationOnce(async () => {
      throw new Error('boom');
    });
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 7, ...base })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });
});
