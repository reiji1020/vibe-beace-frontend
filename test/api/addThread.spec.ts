import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

// Mock controller
vi.mock('../../src/lib/controllers/threadController', () => ({
  addThread: vi.fn(async (data) => ({ id: 1, ...data }))
}));

import { POST } from '../../src/routes/api/add/addThread/+server';
import { addThread as addThreadMock } from '$lib/controllers/threadController';
import { ensureCsrfCookie } from '../../src/lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return {
    get: (name: string) => jar.get(name),
    set: (name: string, value: string) => {
      jar.set(name, value);
    }
    // minimal mock
  } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const valid = {
  brand: 'DMC',
  colorNumber: '310',
  colorName: 'Black',
  quantity: 2,
  status: 'unused',
  wishlist: false
};

describe('API addThread', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('creates thread with 201 on success', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(valid)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(201);
    expect(out.body.success).toBe(true);
    expect(out.body.data.brand).toBe('DMC');
  });

  it('returns 400 on zod validation error', async () => {
    const bad = { ...valid, quantity: -1 };
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(bad)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
    expect(out.body.success).toBe(false);
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
    expect(out.body.success).toBe(false);
  });

  it('returns 500 when controller throws', async () => {
    (addThreadMock as any).mockImplementationOnce(async () => { throw new Error('boom'); });
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
