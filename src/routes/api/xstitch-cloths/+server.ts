import type { RequestHandler } from '@sveltejs/kit';
import { getAllXStitchCloth, addXStitchCloth } from '$lib/controllers/xStitchClothController';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const list = await getAllXStitchCloth(query);
  return ok(list);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  try {
    const body = await request.json();
    const parsed = xStitchClothSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());
    const createdItem = await addXStitchCloth(parsed.data as any);
    return created(createdItem);
  } catch (e) {
    return serverError((e as Error).message);
  }
};
