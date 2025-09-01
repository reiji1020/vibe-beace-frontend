// src/routes/api/deleteBead/+server.ts
import { deleteBead } from '$lib/controllers/beadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, forbidden, serverError } from '$lib/api/response';

export async function DELETE({ request, cookies }) {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  const { id } = await request.json();
  try {
    await deleteBead(id);
    return ok({ id });
  } catch (error) {
    console.error('Error deleting bead:', error);
    return serverError((error as Error).message);
  }
}
