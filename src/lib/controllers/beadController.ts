import type { Bead } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * ビーズ一覧取得のオプション。
 * - `query`: 部分一致（brand/itemCode/colorName/size）
 * - `status`: 状態で絞り込み
 * - `brand`: ブランド部分一致
 * - `wishlist`: ウィッシュリストのみ
 * - `sort`: ソートキーと順序
 */
export type BeadListOptions = {
  query?: string | null;
  status?: string | null;
  brand?: string | null;
  wishlist?: boolean | null;
  sort?: {
    by: 'itemCode' | 'brand' | 'quantity' | 'status' | 'wishlist';
    order: 'asc' | 'desc';
  } | null;
};

/**
 * ビーズを条件付きで一覧取得します。
 * @param queryOrOptions キーワードまたは詳細オプション
 */
export async function getAllBeads(
  queryOrOptions: string | null | BeadListOptions = null
): Promise<Bead[]> {
  const opts: BeadListOptions =
    typeof queryOrOptions === 'string' || queryOrOptions === null
      ? { query: queryOrOptions }
      : queryOrOptions;

  const where: any = {};
  if (opts.query) {
    where.OR = [
      { brand: { contains: opts.query } },
      { itemCode: { contains: opts.query } },
      { colorName: { contains: opts.query } },
      { size: { contains: opts.query } }
    ];
  }
  if (opts.status) where.status = opts.status as any;
  if (opts.brand) where.brand = { contains: opts.brand };
  if (typeof opts.wishlist === 'boolean') where.wishlist = opts.wishlist;

  const orderBy = opts.sort ? { [opts.sort.by]: opts.sort.order } : { itemCode: 'asc' as const };
  return prisma.bead.findMany({ where, orderBy });
}

/** 特定 ID のビーズを取得します。 */
export async function getBeadById(id: number): Promise<Bead | null> {
  return prisma.bead.findUnique({ where: { id } });
}

/** wishlist = true のビーズを取得します。 */
export async function getWishlistBeads(): Promise<Bead[]> {
  return prisma.bead.findMany({ where: { wishlist: true } });
}

/** 新しいビーズを追加します。 */
export async function addBead(data: Bead): Promise<Bead> {
  return prisma.bead.create({ data });
}

/** ビーズを更新します（全上書き）。 */
export async function updateBead(data: Partial<Bead> & { id: number }): Promise<Bead> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID provided for updating bead.');
  }
  return prisma.bead.update({ where: { id }, data: updateData });
}

/** wishlist フラグのみ更新します。 */
export async function setWishlistBead(id: number, wishlist: boolean): Promise<Bead> {
  return prisma.bead.update({ where: { id }, data: { wishlist } });
}

/** ビーズを削除します。 */
export async function deleteBead(id: number): Promise<Bead> {
  return prisma.bead.delete({ where: { id } });
}
