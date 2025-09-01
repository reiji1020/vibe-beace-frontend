import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('../../src/lib/controllers/cutClothController', () => ({
  deleteCutCloth: vi.fn(async () => undefined)
}));

import { DELETE } from '../../src/routes/api/delete/deleteCutCloth/+server';
import { deleteCutCloth as deleteCutClothMock } from '$lib/controllers/cutClothController';
import { ensureCsrfCookie } from '../../src/lib/csrf';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return { get: (n: string) => jar.get(n), set: (n: string, v: string) => jar.set(n, v) } as any;
}

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API deleteCutCloth', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('deletes cut cloth with 200', async () => {
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 21 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.data.id).toBe(21);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify({ id: 21 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (deleteCutClothMock as any).mockImplementationOnce(async () => { throw new Error('boom'); });
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 21 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
    spy.mockRestore();
  });
});
