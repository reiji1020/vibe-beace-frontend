// src/routes/api/getThreads/+server.ts
import { getAllThreads } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');
	const threads = await getAllThreads(query);
	return new Response(JSON.stringify({ success: true, data: threads }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
