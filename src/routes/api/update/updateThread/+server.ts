import type { RequestHandler } from './$types';
import { updateThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
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
    const parsed = threadSchema.safeParse(data);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const thread = await updateThread({ id, ...parsed.data });
    return ok(thread);
  } catch (error) {
    const e = error as Error;
    return serverError(e.message);
  }
};
