import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/controllers/xStitchClothController', () => ({
  getAllXStitchCloth: vi.fn(async () => [{ id: 4, count: '14', color: 'White', size: '30x30', quantity: 1, status: 'unused', wishlist: false }])
}));

import { GET } from '../../src/routes/api/get/getXStitchCloths/+server';
import { getAllXStitchCloth } from '$lib/controllers/xStitchClothController';
import { beforeEach } from 'vitest';

beforeEach(() => {
  (getAllXStitchCloth as any).mockClear?.();
});

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('API getXStitchCloths', () => {
  it('returns 200 with list', async () => {
    const res = await GET({ url: new URL('http://localhost/api/get/getXStitchCloths') } as any);
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body.success).toBe(true);
    expect(out.body.data.length).toBe(1);
  });

  it('passes query param to controller', async () => {
    await GET({ url: new URL('http://localhost/api/get/getXStitchCloths?query=14') } as any);
    const calls = (getAllXStitchCloth as any).mock.calls;
    expect(calls[calls.length - 1][0]).toBe('14');
  });
});
