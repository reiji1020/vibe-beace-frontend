// src/routes/api/addThread/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { threadSchema } from '$lib/validation/threadSchema';
import { addThread } from '$lib/controllers/threadController';
import { verifyCsrfFromHeader } from '$lib/csrf';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!verifyCsrfFromHeader(cookies, request)) {
		return new Response(
			JSON.stringify({ success: false, error: 'Invalid CSRF token' }),
			{ status: 403, headers: { 'Content-Type': 'application/json' } }
		);
	}
	try {
		const body = await request.json();
		const parsed = threadSchema.safeParse(body);
		if (!parsed.success) {
			return new Response(
				JSON.stringify({ success: false, error: parsed.error.flatten() }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}
		const newThread = await addThread(parsed.data);
		return new Response(JSON.stringify({ success: true, data: newThread }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Invalid request';
		return new Response(JSON.stringify({ success: false, error: message }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

