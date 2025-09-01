import type { RequestHandler } from '@sveltejs/kit';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { addXStitchCloth } from '$lib/controllers/xStitchClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { created, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = xStitchClothSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const item = await addXStitchCloth(parsed.data);
    return created(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return serverError(message);
  }
};
