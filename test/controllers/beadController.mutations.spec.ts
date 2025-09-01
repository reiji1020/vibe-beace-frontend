import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({
  create: vi.fn(async (arg: any) => arg),
  update: vi.fn(async (arg: any) => arg),
  delete: vi.fn(async (arg: any) => arg)
}));

vi.mock('$lib/db', () => ({
  prisma: { bead: { create: hoisted.create, update: hoisted.update, delete: hoisted.delete } }
}));

import { addBead, updateBead, deleteBead, setWishlistBead } from '../../src/lib/controllers/beadController';

beforeEach(() => {
  hoisted.create.mockClear();
  hoisted.update.mockClear();
  hoisted.delete.mockClear();
});

describe('beadController mutations', () => {
  it('addBead calls prisma.bead.create with data', async () => {
    const data = { brand: 'TOHO', itemCode: 'A-01', size: '11/0', colorName: 'Red', quantity: 1, status: 'unused', wishlist: false };
    await addBead(data as any);
    expect(hoisted.create).toHaveBeenCalledWith({ data });
  });

  it('updateBead calls prisma.bead.update with where/data', async () => {
    const upd = { id: 8, brand: 'TOHO', itemCode: 'A-02', size: '11/0', quantity: 2, wishlist: true } as any;
    await updateBead(upd);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 8 }, data: { brand: 'TOHO', itemCode: 'A-02', size: '11/0', quantity: 2, wishlist: true } });
  });

  it('updateBead throws on invalid id', async () => {
    await expect(updateBead({ brand: 'TOHO' } as any)).rejects.toThrow();
  });

  it('setWishlistBead updates only wishlist', async () => {
    await setWishlistBead(6, true);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 6 }, data: { wishlist: true } });
  });

  it('deleteBead calls prisma.bead.delete with where', async () => {
    await deleteBead(2);
    expect(hoisted.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});
