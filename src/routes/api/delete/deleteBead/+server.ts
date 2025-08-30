// src/routes/api/deleteBead/+server.ts
import { deleteBead } from '$lib/controllers/beadController';
import { json } from '@sveltejs/kit';
import { verifyCsrfFromHeader } from '$lib/csrf';

export async function DELETE({ request, cookies }) {
	if (!verifyCsrfFromHeader(cookies, request)) {
		return json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
	}
	const { id } = await request.json();
	try {
		await deleteBead(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting bead:', error);
		return json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}

