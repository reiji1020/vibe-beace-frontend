// src/routes/api/deleteThread/+server.ts
import { deleteThread } from '$lib/controllers/threadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, forbidden, serverError } from '$lib/api/response';

export async function DELETE({ request, cookies }) {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  const { id } = await request.json();
  try {
    await deleteThread(id);
    return ok({ id });
  } catch (error) {
    console.error('Error deleting thread:', error);
    return serverError((error as Error).message);
  }
}
