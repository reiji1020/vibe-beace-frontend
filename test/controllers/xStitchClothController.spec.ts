import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({ findMany: vi.fn(async () => []) }));
vi.mock('$lib/db', () => ({ prisma: { xStitchCloth: { findMany: hoisted.findMany } } }));

import { getAllXStitchCloth } from '../../src/lib/controllers/xStitchClothController';

beforeEach(() => {
  hoisted.findMany.mockClear();
});

describe('xStitchClothController.getAllXStitchCloth', () => {
  it('applies query OR and default sort', async () => {
    await getAllXStitchCloth({ query: '14' });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.OR).toBeDefined();
    expect(arg.orderBy).toEqual({ id: 'asc' });
  });
  it('applies status/wishlist filters', async () => {
    await getAllXStitchCloth({ status: 'unused', wishlist: true });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.status).toBe('unused');
    expect(arg.where.wishlist).toBe(true);
  });
  it('applies sort mapping', async () => {
    await getAllXStitchCloth({ sort: { by: 'quantity', order: 'desc' } });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.orderBy).toEqual({ quantity: 'desc' });
  });
});

