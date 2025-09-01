import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({ findMany: vi.fn(async () => []) }));
vi.mock('$lib/db', () => ({ prisma: { bead: { findMany: hoisted.findMany } } }));

import { getAllBeads } from '../../src/lib/controllers/beadController';

beforeEach(() => {
  hoisted.findMany.mockClear();
});

describe('beadController.getAllBeads', () => {
  it('applies query OR and default sort', async () => {
    await getAllBeads({ query: 'TOHO' });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.OR).toBeDefined();
    expect(arg.orderBy).toEqual({ itemCode: 'asc' });
  });
  it('applies brand/status/wishlist filters', async () => {
    await getAllBeads({ brand: 'TOHO', status: 'unused', wishlist: true });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.where.brand).toEqual({ contains: 'TOHO' });
    expect(arg.where.status).toBe('unused');
    expect(arg.where.wishlist).toBe(true);
  });
  it('applies sort mapping', async () => {
    await getAllBeads({ sort: { by: 'brand', order: 'desc' } });
    const arg = hoisted.findMany.mock.calls[0][0];
    expect(arg.orderBy).toEqual({ brand: 'desc' });
  });
});
