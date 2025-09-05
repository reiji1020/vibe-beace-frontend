import type { CutCloth } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * カットクロス一覧取得のオプション。
 * - `query`: 部分一致（fabricType/pattern/size）
 * - `status`: 状態で絞り込み
 * - `wishlist`: ウィッシュリストのみ
 * - `sort`: ソートキーと順序
 */
export type CutClothListOptions = {
  query?: string | null;
  status?: string | null;
  wishlist?: boolean | null;
  sort?: { by: 'id' | 'quantity' | 'status' | 'wishlist'; order: 'asc' | 'desc' } | null;
};

/**
 * カットクロスを条件付きで一覧取得します。
 * @param queryOrOptions キーワードまたは詳細オプション
 */
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

/** 特定 ID のカットクロスを取得します。 */
export async function getCutClothById(id: number): Promise<CutCloth | null> {
  return prisma.cutCloth.findUnique({ where: { id } });
}

/** wishlist = true のカットクロスを取得します。 */
export async function getWishlistCutCloth(): Promise<CutCloth[]> {
  return prisma.cutCloth.findMany({ where: { wishlist: true } });
}

/** 新しいカットクロスを追加します。 */
export async function addCutCloth(data: CutCloth): Promise<CutCloth> {
  return prisma.cutCloth.create({ data });
}

/** カットクロスを更新します（全上書き）。 */
export async function updateCutCloth(data: Partial<CutCloth> & { id: number }): Promise<CutCloth> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID provided for updating cut cloth.');
  }
  return prisma.cutCloth.update({ where: { id }, data: updateData });
}

/** wishlist フラグのみ更新します。 */
export async function setWishlistCutCloth(id: number, wishlist: boolean): Promise<CutCloth> {
  return prisma.cutCloth.update({ where: { id }, data: { wishlist } });
}

/** カットクロスを削除します。 */
export async function deleteCutCloth(id: number): Promise<CutCloth> {
  return prisma.cutCloth.delete({ where: { id } });
}
