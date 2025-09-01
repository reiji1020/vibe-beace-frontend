import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({
  create: vi.fn(async (arg: any) => arg),
  update: vi.fn(async (arg: any) => arg),
  delete: vi.fn(async (arg: any) => arg)
}));

vi.mock('$lib/db', () => ({
  prisma: { cutCloth: { create: hoisted.create, update: hoisted.update, delete: hoisted.delete } }
}));

import {
  addCutCloth,
  updateCutCloth,
  deleteCutCloth,
  setWishlistCutCloth
} from '../../src/lib/controllers/cutClothController';

beforeEach(() => {
  hoisted.create.mockClear();
  hoisted.update.mockClear();
  hoisted.delete.mockClear();
});

describe('cutClothController mutations', () => {
  it('addCutCloth calls prisma.cutCloth.create with data', async () => {
    const data = {
      fabricType: 'Linen',
      pattern: 'Plain',
      size: '30x30',
      quantity: 1,
      status: 'unused',
      wishlist: false
    };
    await addCutCloth(data as any);
    expect(hoisted.create).toHaveBeenCalledWith({ data });
  });

  it('updateCutCloth calls prisma.cutCloth.update with where/data', async () => {
    const upd = {
      id: 8,
      fabricType: 'Linen',
      pattern: 'Plain',
      size: '25x25',
      quantity: 2,
      wishlist: true
    } as any;
    await updateCutCloth(upd);
    expect(hoisted.update).toHaveBeenCalledWith({
      where: { id: 8 },
      data: { fabricType: 'Linen', pattern: 'Plain', size: '25x25', quantity: 2, wishlist: true }
    });
  });

  it('updateCutCloth throws on invalid id', async () => {
    await expect(
      updateCutCloth({
        fabricType: 'Linen',
        pattern: 'Plain',
        size: '30x30',
        quantity: 1,
        wishlist: false
      } as any)
    ).rejects.toThrow();
  });

  it('setWishlistCutCloth updates only wishlist', async () => {
    await setWishlistCutCloth(6, true);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 6 }, data: { wishlist: true } });
  });

  it('deleteCutCloth calls prisma.cutCloth.delete with where', async () => {
    await deleteCutCloth(2);
    expect(hoisted.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});
