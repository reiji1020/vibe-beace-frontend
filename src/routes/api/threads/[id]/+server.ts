import type { RequestHandler } from '@sveltejs/kit';
import { updateThread, deleteThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    const body = await request.json();
    const parsed = threadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const updated = await updateThread({ id, ...parsed.data });
    return ok(updated);
  } catch (e) {
    return serverError((e as Error).message);
  }
};

export const DELETE: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    await deleteThread(id);
    return ok({ id });
  } catch (e) {
    return serverError((e as Error).message);
  }
};
