// src/lib/controllers/threadController.ts
import type { Thread } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * すべての刺繍糸を取得
 */
export type ThreadListOptions = {
  query?: string | null;
  status?: string | null;
  brand?: string | null;
  wishlist?: boolean | null;
  sort?: { by: 'colorNumber' | 'brand' | 'quantity' | 'status' | 'wishlist'; order: 'asc' | 'desc' } | null;
};

export async function getAllThreads(
  queryOrOptions: string | null | ThreadListOptions = null
): Promise<Thread[]> {
  const opts: ThreadListOptions =
    typeof queryOrOptions === 'string' || queryOrOptions === null
      ? { query: queryOrOptions }
      : queryOrOptions;

  const where: any = {};
  if (opts.query) {
    where.OR = [
      { brand: { contains: opts.query } },
      { colorNumber: { contains: opts.query } },
      { colorName: { contains: opts.query } }
    ];
  }
  if (opts.status) where.status = opts.status as any;
  if (opts.brand) where.brand = { contains: opts.brand };
  if (typeof opts.wishlist === 'boolean') where.wishlist = opts.wishlist;

  const orderBy = opts.sort
    ? { [opts.sort.by]: opts.sort.order }
    : { colorNumber: 'asc' as const };

  return prisma.thread.findMany({ where, orderBy });
}

/**
 * 新しい刺繍糸を追加
 */
export async function addThread(data: Thread): Promise<Thread> {
  return prisma.thread.create({
    data: data
  });
}

/**
 * 刺繍糸を更新（全体上書き）
 */
export async function updateThread(data: Partial<Thread> & { id: number }): Promise<Thread> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID provided for updating thread.');
  }
  return prisma.thread.update({
    where: { id },
    data: updateData
  });
}

/**
 * wishlist フラグのみ更新
 */
export async function setWishlistThread(id: number, wishlist: boolean): Promise<Thread> {
  return prisma.thread.update({
    where: { id },
    data: { wishlist }
  });
}

/**
 * IDで刺繍糸を取得
 */
export async function getThreadById(id: number): Promise<Thread | null> {
  return prisma.thread.findUnique({
    where: { id }
  });
}

/**
 * 刺繍糸を削除
 */
export async function deleteThread(id: number): Promise<Thread> {
  return prisma.thread.delete({
    where: { id }
  });
}
