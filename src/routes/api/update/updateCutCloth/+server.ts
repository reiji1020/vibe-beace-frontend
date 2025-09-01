import type { RequestHandler } from './$types';
import { updateCutCloth } from '$lib/controllers/cutClothController';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const { id, ...data } = body ?? {};
    if (typeof id !== 'number') {
      return badRequest('Invalid or missing id');
    }
    const parsed = cutClothSchema.safeParse(data);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const cutCloth = await updateCutCloth({ id, ...parsed.data } as any);
    return ok(cutCloth);
  } catch (error) {
    const e = error as Error;
    return serverError(e.message);
  }
};
