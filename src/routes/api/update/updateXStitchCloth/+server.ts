import type { RequestHandler } from './$types';
import { updateXStitchCloth } from '$lib/controllers/xStitchClothController';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
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
    const parsed = xStitchClothSchema.safeParse(data);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const item = await updateXStitchCloth({ id, ...parsed.data } as any);
    return ok(item);
  } catch (error) {
    const e = error as Error;
    return serverError(e.message);
  }
};
