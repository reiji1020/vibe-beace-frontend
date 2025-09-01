// src/lib/controllers/cutClothController.ts
import type { CutCloth } from '$lib/types';
import { prisma } from '$lib/db';

/** 全カットクロスを取得（ソート付き） */
export type CutClothListOptions = {
  query?: string | null;
  status?: string | null;
  wishlist?: boolean | null;
  sort?: { by: 'id' | 'quantity' | 'status' | 'wishlist'; order: 'asc' | 'desc' } | null;
};

export async function getAllCutCloth(
  queryOrOptions: string | null | CutClothListOptions = null
): Promise<CutCloth[]> {
  const opts: CutClothListOptions =
    typeof queryOrOptions === 'string' || queryOrOptions === null
      ? { query: queryOrOptions }
      : queryOrOptions;

  const where: any = {};
  if (opts.query) {
    where.OR = [
      { fabricType: { contains: opts.query } },
      { pattern: { contains: opts.query } },
      { size: { contains: opts.query } }
    ];
  }
  if (opts.status) where.status = opts.status as any;
  if (typeof opts.wishlist === 'boolean') where.wishlist = opts.wishlist;
  const orderBy = opts.sort ? { [opts.sort.by]: opts.sort.order } : { id: 'asc' as const };
  return prisma.cutCloth.findMany({ where, orderBy });
}

/** 特定 ID のカットクロスを取得 */
export async function getCutClothById(id: number): Promise<CutCloth | null> {
  return prisma.cutCloth.findUnique({ where: { id } });
}

/** wishlist = true のカットクロスを取得 */
export async function getWishlistCutCloth(): Promise<CutCloth[]> {
  return prisma.cutCloth.findMany({ where: { wishlist: true } });
}

/** 新しいカットクロスを追加 */
export async function addCutCloth(data: CutCloth): Promise<CutCloth> {
  return prisma.cutCloth.create({ data });
}

/** カットクロスを更新（全上書き） */
export async function updateCutCloth(data: Partial<CutCloth> & { id: number }): Promise<CutCloth> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID provided for updating cut cloth.');
  }
  return prisma.cutCloth.update({ where: { id }, data: updateData });
}

/** wishlist フラグのみ更新 */
export async function setWishlistCutCloth(id: number, wishlist: boolean): Promise<CutCloth> {
  return prisma.cutCloth.update({ where: { id }, data: { wishlist } });
}

/** カットクロスを削除 */
export async function deleteCutCloth(id: number): Promise<CutCloth> {
  return prisma.cutCloth.delete({ where: { id } });
}
