// src/routes/api/addThread/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { threadSchema } from '$lib/validation/threadSchema';
import { addThread } from '$lib/controllers/threadController';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// JSON を読み込み
		const body = await request.json();

		// Zod でバリデーション（エラーなら例外が飛ぶ）
		const validated = threadSchema.parse(body);

		// 問題なければコントローラに渡して DB 操作
		const newThread = await addThread(validated);

		return new Response(JSON.stringify({ success: true, data: newThread }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		// Zod エラーや JSON 解析エラーなどをキャッチ
		const message = err instanceof Error ? err.message : 'Invalid request';
		return new Response(JSON.stringify({ success: false, error: message }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
