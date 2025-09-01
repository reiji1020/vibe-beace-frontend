import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/controllers/cutClothController', () => ({
  getAllCutCloth: vi.fn(async () => [{ id: 3, fabricType: 'Linen', pattern: 'Plain', size: '30x30', quantity: 1, status: 'unused', wishlist: false }])
}));

import { GET } from '../../src/routes/api/get/getCutCloths/+server';
import { getAllCutCloth } from '$lib/controllers/cutClothController';
import { beforeEach } from 'vitest';

beforeEach(() => {
  (getAllCutCloth as any).mockClear?.();
});

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API getCutCloths', () => {
  it('returns 200 with list', async () => {
    const res = await GET({ url: new URL('http://localhost/api/get/getCutCloths') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.length).toBe(1);
  });

  it('passes query param to controller', async () => {
    await GET({ url: new URL('http://localhost/api/get/getCutCloths?query=lin') } as any);
    const calls = (getAllCutCloth as any).mock.calls;
    expect(calls[calls.length - 1][0]).toBe('lin');
  });
});
