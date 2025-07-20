import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateCutCloth } from '../../../lib/controllers/cutClothController';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const cutCloth = await updateCutCloth(body);
		return json(cutCloth, { status: 200 });
	} catch (error) {
		const e = error as Error;
		return json({ error: e.message }, { status: 500 });
	}
};
