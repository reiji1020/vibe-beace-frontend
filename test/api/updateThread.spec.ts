import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('../../src/lib/controllers/threadController', () => ({
  updateThread: vi.fn(async (data) => ({ ...data }))
}));

import { POST } from '../../src/routes/api/update/updateThread/+server';
import { updateThread as updateThreadMock } from '$lib/controllers/threadController';
import { ensureCsrfCookie } from '../../src/lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return {
    get: (name: string) => jar.get(name),
    set: (name: string, value: string) => {
      jar.set(name, value);
    }
  } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

const base = {
  brand: 'DMC',
  colorNumber: '310',
  colorName: 'Black',
  quantity: 2,
  status: 'unused',
  wishlist: false
};

describe('API updateThread', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('updates thread with 200 on success', async () => {
    const body = { id: 10, ...base };
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(body)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.id).toBe(10);
  });

  it('returns 400 when id is invalid', async () => {
    const body = { ...base } as any; // missing id
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(body)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 400 on zod error', async () => {
    const bad = { id: 1, ...base, quantity: -1 } as any;
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify(bad)
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(400);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify({ id: 2, ...base })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    (updateThreadMock as any).mockImplementationOnce(async () => {
      throw new Error('boom');
    });
    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 3, ...base })
    });
    const res = await POST({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
  });
});
