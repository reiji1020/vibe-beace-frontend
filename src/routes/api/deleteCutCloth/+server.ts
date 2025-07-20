// src/routes/api/deleteCutCloth/+server.ts
import { deleteCutCloth } from '$lib/controllers/cutClothController';
import { json } from '@sveltejs/kit';

export async function DELETE({ request }) {
	const { id } = await request.json();
	try {
		await deleteCutCloth(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting cut cloth:', error);
		return json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}
