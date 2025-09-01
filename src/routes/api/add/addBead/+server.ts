import type { RequestHandler } from '@sveltejs/kit';
import { beadSchema } from '$lib/validation/beadSchema';
import { addBead } from '$lib/controllers/beadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { created, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = beadSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const createdItem = await addBead(parsed.data as any);
    return created(createdItem);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return serverError(message);
  }
};
