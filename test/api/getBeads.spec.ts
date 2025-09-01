import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/controllers/beadController', () => ({
  getAllBeads: vi.fn(async () => [{ id: 1, brand: 'TOHO', itemCode: 'A-01', size: '11/0', colorName: 'Red', quantity: 1, status: 'unused', wishlist: false }])
}));

import { GET } from '../../src/routes/api/get/getBeads/+server';
import { getAllBeads } from '$lib/controllers/beadController';
import { beforeEach } from 'vitest';

beforeEach(() => {
  (getAllBeads as any).mockClear?.();
});

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API getBeads', () => {
  it('returns 200 with list', async () => {
    const res = await GET({ url: new URL('http://localhost/api/get/getBeads') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.length).toBe(1);
  });

  it('passes query param to controller', async () => {
    await GET({ url: new URL('http://localhost/api/get/getBeads?query=abc') } as any);
    const calls = (getAllBeads as any).mock.calls;
    expect(calls[calls.length - 1][0]).toBe('abc');
  });
});
