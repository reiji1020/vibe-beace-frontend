// src/lib/controllers/threadController.ts
import type { Thread } from '$lib/types';
import { prisma } from '$lib/db';

/**
 * すべての刺繍糸を取得
 */
export async function getAllThreads(query: string | null = null): Promise<Thread[]> {
	const where = query
		? {
				OR: [
					{ brand: { contains: query } },
					{ colorNumber: { contains: query } },
					{ colorName: { contains: query } }
				]
		  }
		: {};

	const threads = await prisma.thread.findMany({
		where,
		orderBy: { colorNumber: 'asc' }
	});
	return threads;
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
