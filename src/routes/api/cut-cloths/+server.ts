import type { RequestHandler } from '@sveltejs/kit';
import { getAllCutCloth, addCutCloth } from '$lib/controllers/cutClothController';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const list = await getAllCutCloth(query);
  return ok(list);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  try {
    const body = await request.json();
    const parsed = cutClothSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const createdItem = await addCutCloth(parsed.data as any);
    return created(createdItem);
  } catch (e) {
    return serverError((e as Error).message);
  }
};
