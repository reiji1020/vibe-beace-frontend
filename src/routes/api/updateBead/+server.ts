import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateBead } from '../../../lib/controllers/beadController';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const bead = await updateBead(body);
		return json(bead, { status: 200 });
	} catch (error) {
		const e = error as Error;
		return json({ error: e.message }, { status: 500 });
	}
};
