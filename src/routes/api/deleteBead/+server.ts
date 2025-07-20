// src/routes/api/deleteBead/+server.ts
import { deleteBead } from '$lib/controllers/beadController';
import { json } from '@sveltejs/kit';

export async function DELETE({ request }) {
	const { id } = await request.json();
	try {
		await deleteBead(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting bead:', error);
		return json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}
