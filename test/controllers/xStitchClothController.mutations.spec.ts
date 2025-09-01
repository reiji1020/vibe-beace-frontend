import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({
  create: vi.fn(async (arg: any) => arg),
  update: vi.fn(async (arg: any) => arg),
  delete: vi.fn(async (arg: any) => arg)
}));

vi.mock('$lib/db', () => ({
  prisma: {
    xStitchCloth: { create: hoisted.create, update: hoisted.update, delete: hoisted.delete }
  }
}));

import {
  addXStitchCloth,
  updateXStitchCloth,
  deleteXStitchCloth,
  setWishlistXStitchCloth
} from '../../src/lib/controllers/xStitchClothController';

beforeEach(() => {
  hoisted.create.mockClear();
  hoisted.update.mockClear();
  hoisted.delete.mockClear();
});

describe('xStitchClothController mutations', () => {
  it('addXStitchCloth calls prisma.xStitchCloth.create with data', async () => {
    const data = {
      count: '14',
      color: 'White',
      size: '30x30',
      quantity: 1,
      status: 'unused',
      wishlist: false
    };
    await addXStitchCloth(data as any);
    expect(hoisted.create).toHaveBeenCalledWith({ data });
  });

  it('updateXStitchCloth calls prisma.xStitchCloth.update with where/data', async () => {
    const upd = {
      id: 8,
      count: '16',
      color: 'White',
      size: '30x30',
      quantity: 2,
      wishlist: true
    } as any;
    await updateXStitchCloth(upd);
    expect(hoisted.update).toHaveBeenCalledWith({
      where: { id: 8 },
      data: { count: '16', color: 'White', size: '30x30', quantity: 2, wishlist: true }
    });
  });

  it('updateXStitchCloth throws on invalid id', async () => {
    await expect(
      updateXStitchCloth({
        count: '14',
        color: 'White',
        size: '30x30',
        quantity: 1,
        wishlist: false
      } as any)
    ).rejects.toThrow();
  });

  it('setWishlistXStitchCloth updates only wishlist', async () => {
    await setWishlistXStitchCloth(6, true);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 6 }, data: { wishlist: true } });
  });

  it('deleteXStitchCloth calls prisma.xStitchCloth.delete with where', async () => {
    await deleteXStitchCloth(2);
    expect(hoisted.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});
