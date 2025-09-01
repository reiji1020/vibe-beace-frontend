import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/controllers/threadController', () => ({
  getAllThreads: vi.fn(async () => [{ id: 2, brand: 'DMC', colorNumber: '310', colorName: 'Black', quantity: 2, status: 'unused', wishlist: false }])
}));

import { GET } from '../../src/routes/api/get/getThreads/+server';
import { getAllThreads } from '$lib/controllers/threadController';
import { beforeEach } from 'vitest';

beforeEach(() => {
  (getAllThreads as any).mockClear?.();
});

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API getThreads', () => {
  it('returns 200 with list', async () => {
    const res = await GET({ url: new URL('http://localhost/api/get/getThreads') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.length).toBe(1);
  });

  it('passes query param to controller', async () => {
    await GET({ url: new URL('http://localhost/api/get/getThreads?query=blue') } as any);
    const calls = (getAllThreads as any).mock.calls;
    expect(calls[calls.length - 1][0]).toBe('blue');
  });
});
