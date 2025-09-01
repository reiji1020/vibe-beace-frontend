import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({ findMany: vi.fn(async () => []) }));
vi.mock('$lib/db', () => ({ prisma: { cutCloth: { findMany: hoisted.findMany } } }));

import { getAllCutCloth } from '../../src/lib/controllers/cutClothController';

beforeEach(() => {
  hoisted.findMany.mockClear();
});

describe('cutClothController.getAllCutCloth', () => {
  it('applies query OR and default sort', async () => {
    await getAllCutCloth({ query: 'Linen' });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.OR).toBeDefined();
    expect(arg.orderBy).toEqual({ id: 'asc' });
  });
  it('applies status/wishlist filters', async () => {
    await getAllCutCloth({ status: 'unused', wishlist: true });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.status).toBe('unused');
    expect(arg.where.wishlist).toBe(true);
  });
  it('applies sort mapping', async () => {
    await getAllCutCloth({ sort: { by: 'quantity', order: 'desc' } });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.orderBy).toEqual({ quantity: 'desc' });
  });
});
