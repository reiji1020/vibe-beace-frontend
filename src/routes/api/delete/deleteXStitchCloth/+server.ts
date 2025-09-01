import { deleteXStitchCloth } from '$lib/controllers/xStitchClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, forbidden, serverError } from '$lib/api/response';

export async function DELETE({ request, cookies }) {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  const { id } = await request.json();
  try {
    await deleteXStitchCloth(id);
    return ok({ id });
  } catch (error) {
    console.error('Error deleting xstitch cloth:', error);
    return serverError((error as Error).message);
  }
}
