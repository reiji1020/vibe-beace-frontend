import type { RequestHandler } from '@sveltejs/kit';
import { getAllBeads, addBead } from '$lib/controllers/beadController';
import { beadSchema } from '$lib/validation/beadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const list = await getAllBeads(query);
  return ok(list);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  try {
    const body = await request.json();
    const parsed = beadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const createdItem = await addBead(parsed.data as any);
    return created(createdItem);
  } catch (e) {
    return serverError((e as Error).message);
  }
};
