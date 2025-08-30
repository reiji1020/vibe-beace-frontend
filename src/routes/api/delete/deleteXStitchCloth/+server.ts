import { deleteXStitchCloth } from '$lib/controllers/xStitchClothController';
import { json } from '@sveltejs/kit';
import { verifyCsrfFromHeader } from '$lib/csrf';

export async function DELETE({ request, cookies }) {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
  }
  const { id } = await request.json();
  try {
    await deleteXStitchCloth(id);
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting xstitch cloth:', error);
    return json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

