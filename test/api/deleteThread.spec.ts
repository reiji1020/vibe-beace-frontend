import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Cookies } from '@sveltejs/kit';

vi.mock('../../src/lib/controllers/threadController', () => ({
  deleteThread: vi.fn(async () => undefined)
}));

import { DELETE } from '../../src/routes/api/delete/deleteThread/+server';
import { deleteThread as deleteThreadMock } from '$lib/controllers/threadController';
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

describe('API deleteThread', () => {
  let cookies: Cookies;
  let token: string;
  beforeEach(() => {
    cookies = createCookies();
    token = ensureCsrfCookie(cookies);
  });

  it('deletes thread with 200 on success', async () => {
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 9 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.id).toBe(9);
  });

  it('returns 403 on invalid CSRF', async () => {
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'BAD' },
      body: JSON.stringify({ id: 9 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(403);
  });

  it('returns 500 when controller throws', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (deleteThreadMock as any).mockImplementationOnce(async () => { throw new Error('boom'); });
    const req = new Request('http://localhost', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ id: 9 })
    });
    const res = await DELETE({ request: req, cookies } as any);
    const out = await read(res);
    expect(out.status).toBe(500);
    spy.mockRestore();
  });
});
