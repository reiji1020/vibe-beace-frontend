// src/routes/api/deleteThread/+server.ts
import { deleteThread } from '$lib/controllers/threadController';
import { json } from '@sveltejs/kit';
import { verifyCsrfFromHeader } from '$lib/csrf';

export async function DELETE({ request, cookies }) {
	if (!verifyCsrfFromHeader(cookies, request)) {
		return json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
	}
	const { id } = await request.json();
	try {
		await deleteThread(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting thread:', error);
		return json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}
