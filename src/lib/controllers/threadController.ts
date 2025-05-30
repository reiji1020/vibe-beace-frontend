// src/lib/controllers/threadController.ts
import type { Thread } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * すべての刺繍糸を取得
 */
export async function getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany({
        orderBy: { colorNumber: 'asc' }
    });
}

/**
 * 新しい刺繍糸を追加
 */
export async function addThread(data: Thread): Promise<Thread> {
    return await prisma.thread.create({
        data: data
    });
}

/**
 * 刺繍糸を更新（全体上書き）
 */
export async function updateThread(
    id: number,
    data: Partial<Thread>
): Promise<Thread> {
    return await prisma.thread.update({
        where: { id },
        data: data
    });
}

/**
 * wishlist フラグのみ更新
 */
export async function setWishlistThread(
    id: number,
    wishlist: boolean
): Promise<Thread> {
    return await prisma.thread.update({
        where: { id },
        data: { wishlist }
    });
}

/**
 * 刺繍糸を削除
 */
export async function deleteThread(id: number): Promise<Thread> {
    return await prisma.thread.delete({
        where: { id }
    });
}