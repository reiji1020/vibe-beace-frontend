// src/lib/controllers/beadController.ts
import type { Bead } from '$lib/types';
import { prisma } from '$lib/db';

/** 全ビーズを取得（ソート付き） */
export async function getAllBeads(query: string | null = null): Promise<Bead[]> {
	const where = query
		? {
				OR: [
					{ brand: { contains: query } },
					{ itemCode: { contains: query } },
					{ colorName: { contains: query } },
					{ size: { contains: query } }
				]
		  }
		: {};

	return prisma.bead.findMany({
		where,
		orderBy: { itemCode: 'asc' }
	});
}

/** 特定 ID のビーズを取得 */
export async function getBeadById(id: number): Promise<Bead | null> {
	return prisma.bead.findUnique({ where: { id } });
}

/** wishlist = true のビーズを取得 */
export async function getWishlistBeads(): Promise<Bead[]> {
	return prisma.bead.findMany({ where: { wishlist: true } });
}

/** 新しいビーズを追加 */
export async function addBead(data: Bead): Promise<Bead> {
	return prisma.bead.create({ data });
}

/** ビーズを更新（全上書き） */
export async function updateBead(data: Partial<Bead> & { id: number }): Promise<Bead> {
	const { id, ...updateData } = data;
	if (typeof id !== 'number') {
		throw new Error('Invalid ID provided for updating bead.');
	}
	return prisma.bead.update({ where: { id }, data: updateData });
}

/** wishlist フラグのみ更新 */
export async function setWishlistBead(id: number, wishlist: boolean): Promise<Bead> {
	return prisma.bead.update({ where: { id }, data: { wishlist } });
}

/** ビーズを削除 */
export async function deleteBead(id: number): Promise<Bead> {
	return prisma.bead.delete({ where: { id } });
}
