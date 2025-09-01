import { describe, it, expect, vi, beforeEach } from 'vitest';

// mock prisma with hoisted fn to avoid TDZ
const hoisted = vi.hoisted(() => ({ findMany: vi.fn(async () => []) }));
vi.mock('$lib/db', () => ({
  prisma: { thread: { findMany: hoisted.findMany } }
}));

import { getAllThreads } from '../../src/lib/controllers/threadController';

beforeEach(() => {
  hoisted.findMany.mockClear();
});

describe('threadController.getAllThreads', () => {
  it('applies query to OR conditions', async () => {
    await getAllThreads({ query: 'DMC' });
    expect(hoisted.findMany).toHaveBeenCalled();
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.OR).toBeDefined();
    expect(arg.orderBy).toEqual({ colorNumber: 'asc' });
  });

  it('applies status, brand and wishlist filters', async () => {
    await getAllThreads({ status: 'unused', brand: 'DMC', wishlist: true });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.status).toBe('unused');
    expect(arg.where.brand).toEqual({ contains: 'DMC' });
    expect(arg.where.wishlist).toBe(true);
  });

  it('applies sort mapping', async () => {
    await getAllThreads({ sort: { by: 'brand', order: 'desc' } });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.orderBy).toEqual({ brand: 'desc' });
  });
});
