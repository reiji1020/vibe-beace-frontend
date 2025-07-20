import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateThread } from '../../../lib/controllers/threadController';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const thread = await updateThread(body);
		return json(thread, { status: 200 });
	} catch (error) {
		const e = error as Error;
		return json({ error: e.message }, { status: 500 });
	}
};
