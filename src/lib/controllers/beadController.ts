// src/lib/controllers/beadController.ts
import type { Bead } from '$lib/types';
import { prisma } from '$lib/db';

/** 全ビーズを取得（ソート付き） */
export async function getAllBeads(): Promise<Bead[]> {
    return prisma.bead.findMany({
        orderBy: {itemCode: 'asc'}
    });
}

/** 特定 ID のビーズを取得 */
export async function getBeadById(id: number): Promise<Bead | null> {
    return prisma.bead.findUnique({where: {id}});
}

/** wishlist = true のビーズを取得 */
export async function getWishlistBeads(): Promise<Bead[]> {
    return prisma.bead.findMany({where: {wishlist: true}});
}

/** 新しいビーズを追加 */
export async function addBead(data: Bead): Promise<Bead> {
    return prisma.bead.create({data});
}

/** ビーズを更新（全上書き） */
export async function updateBead(id: number, data: Partial<Bead>): Promise<Bead> {
    return prisma.bead.update({where: {id}, data});
}

/** wishlist フラグのみ更新 */
export async function setWishlistBead(id: number, wishlist: boolean): Promise<Bead> {
    return prisma.bead.update({where: {id}, data: {wishlist}});
}

/** ビーズを削除 */
export async function deleteBead(id: number): Promise<Bead> {
    return prisma.bead.delete({where: {id}});
}
