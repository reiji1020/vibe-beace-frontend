import type { RequestHandler } from './$types';
import { updateBead } from '$lib/controllers/beadController';
import { beadSchema } from '$lib/validation/beadSchema';
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
    const parsed = beadSchema.safeParse(data);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const bead = await updateBead({ id, ...parsed.data } as any);
    return ok(bead);
  } catch (error) {
    const e = error as Error;
    return serverError(e.message);
  }
};
