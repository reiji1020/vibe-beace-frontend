import type { RequestHandler } from '@sveltejs/kit';
import { updateBead, deleteBead } from '$lib/controllers/beadController';
import { beadSchema } from '$lib/validation/beadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    const body = await request.json();
    const parsed = beadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const updated = await updateBead({ id, ...parsed.data } as any);
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
    await deleteBead(id);
    return ok({ id });
  } catch (e) {
    return serverError((e as Error).message);
  }
};
