// src/routes/api/deleteCutCloth/+server.ts
import { deleteCutCloth } from '$lib/controllers/cutClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, forbidden, serverError } from '$lib/api/response';

export async function DELETE({ request, cookies }) {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  const { id } = await request.json();
  try {
    await deleteCutCloth(id);
    return ok({ id });
  } catch (error) {
    console.error('Error deleting cut cloth:', error);
    return serverError((error as Error).message);
  }
}
