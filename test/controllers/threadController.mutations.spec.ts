import { describe, it, expect, vi, beforeEach } from 'vitest';

const hoisted = vi.hoisted(() => ({
  create: vi.fn(async (arg: any) => arg),
  update: vi.fn(async (arg: any) => arg),
  delete: vi.fn(async (arg: any) => arg)
}));

vi.mock('$lib/db', () => ({
  prisma: { thread: { create: hoisted.create, update: hoisted.update, delete: hoisted.delete } }
}));

import { addThread, updateThread, deleteThread, setWishlistThread } from '../../src/lib/controllers/threadController';

beforeEach(() => {
  hoisted.create.mockClear();
  hoisted.update.mockClear();
  hoisted.delete.mockClear();
});

describe('threadController mutations', () => {
  it('addThread calls prisma.thread.create with data', async () => {
    const data = { brand: 'DMC', colorNumber: '310', colorName: 'Black', quantity: 1, status: 'unused', wishlist: false };
    await addThread(data as any);
    expect(hoisted.create).toHaveBeenCalledWith({ data });
  });

  it('updateThread calls prisma.thread.update with where/data', async () => {
    const upd = { id: 10, brand: 'DMC', colorNumber: '312', quantity: 2, wishlist: true } as any;
    await updateThread(upd);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 10 }, data: { brand: 'DMC', colorNumber: '312', quantity: 2, wishlist: true } });
  });

  it('updateThread throws on invalid id', async () => {
    await expect(updateThread({ brand: 'DMC' } as any)).rejects.toThrow();
  });

  it('setWishlistThread updates only wishlist', async () => {
    await setWishlistThread(5, true);
    expect(hoisted.update).toHaveBeenCalledWith({ where: { id: 5 }, data: { wishlist: true } });
  });

  it('deleteThread calls prisma.thread.delete with where', async () => {
    await deleteThread(3);
    expect(hoisted.delete).toHaveBeenCalledWith({ where: { id: 3 } });
  });
});
