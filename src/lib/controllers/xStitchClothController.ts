import type { XStitchCloth } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * クロスステッチ布一覧取得のオプション。
 * - `query`: 部分一致（count/color/size）
 * - `status`: 状態で絞り込み
 * - `wishlist`: ウィッシュリストのみ
 * - `sort`: ソートキーと順序
 */
export type XStitchClothListOptions = {
  query?: string | null;
  status?: string | null;
  wishlist?: boolean | null;
  sort?: { by: 'id' | 'quantity' | 'status' | 'wishlist'; order: 'asc' | 'desc' } | null;
};

/**
 * クロスステッチ布を条件付きで一覧取得します。
 * @param queryOrOptions キーワードまたは詳細オプション
 */
export async function getAllXStitchCloth(
  queryOrOptions: string | null | XStitchClothListOptions = null
): Promise<XStitchCloth[]> {
  const opts: XStitchClothListOptions =
    typeof queryOrOptions === 'string' || queryOrOptions === null
      ? { query: queryOrOptions }
      : queryOrOptions;

  const where: any = {};
  if (opts.query) {
    where.OR = [
      { count: { contains: opts.query } },
      { color: { contains: opts.query } },
      { size: { contains: opts.query } }
    ];
  }
  if (opts.status) where.status = opts.status as any;
  if (typeof opts.wishlist === 'boolean') where.wishlist = opts.wishlist;
  const orderBy = opts.sort ? { [opts.sort.by]: opts.sort.order } : { id: 'asc' as const };
  return prisma.xStitchCloth.findMany({ where, orderBy });
}

/** 指定IDのクロスステッチ布を取得します。 */
export async function getXStitchClothById(id: number): Promise<XStitchCloth | null> {
  return prisma.xStitchCloth.findUnique({ where: { id } });
}

/** 新しいクロスステッチ布を追加します。 */
export async function addXStitchCloth(data: XStitchCloth): Promise<XStitchCloth> {
  return prisma.xStitchCloth.create({ data });
}

/** クロスステッチ布を更新します（全上書き）。 */
export async function updateXStitchCloth(
  data: Partial<XStitchCloth> & { id: number }
): Promise<XStitchCloth> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') throw new Error('Invalid ID provided for updating xStitchCloth.');
  return prisma.xStitchCloth.update({ where: { id }, data: updateData });
}

/** wishlist フラグのみ更新します。 */
export async function setWishlistXStitchCloth(
  id: number,
  wishlist: boolean
): Promise<XStitchCloth> {
  return prisma.xStitchCloth.update({ where: { id }, data: { wishlist } });
}

/** クロスステッチ布を削除します。 */
export async function deleteXStitchCloth(id: number): Promise<XStitchCloth> {
  return prisma.xStitchCloth.delete({ where: { id } });
}
