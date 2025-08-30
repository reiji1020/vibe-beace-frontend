import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateThread } from '../../../lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!verifyCsrfFromHeader(cookies, request)) {
		return json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
	}
	try {
		const body = await request.json();
		const { id, ...data } = body ?? {};
		if (typeof id !== 'number') {
			return json({ success: false, error: 'Invalid or missing id' }, { status: 400 });
		}
		const parsed = threadSchema.safeParse(data);
		if (!parsed.success) {
			return json({ success: false, error: parsed.error.flatten() }, { status: 400 });
		}
		const thread = await updateThread({ id, ...parsed.data });
		return json({ success: true, data: thread }, { status: 200 });
	} catch (error) {
		const e = error as Error;
		return json({ success: false, error: e.message }, { status: 500 });
	}
};
