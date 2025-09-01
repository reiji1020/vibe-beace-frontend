import type { RequestHandler } from '@sveltejs/kit';
import { getAllThreads, addThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const list = await getAllThreads(query);
  return ok(list);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = threadSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const createdItem = await addThread(parsed.data);
    return created(createdItem);
  } catch (e) {
    const err = e as Error;
    return serverError(err.message);
  }
};
