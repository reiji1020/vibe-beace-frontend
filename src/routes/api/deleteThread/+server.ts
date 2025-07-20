// src/routes/api/deleteThread/+server.ts
import { deleteThread } from '$lib/controllers/threadController';
import { json } from '@sveltejs/kit';

export async function DELETE({ request }) {
	const { id } = await request.json();
	try {
		await deleteThread(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting thread:', error);
		return json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}
