import type { RequestHandler } from '@sveltejs/kit';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { addCutCloth } from '$lib/controllers/cutClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { created, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = cutClothSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const createdItem = await addCutCloth(parsed.data as any);
    return created(createdItem);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return serverError(message);
  }
};
