import type { RequestHandler } from '@sveltejs/kit';
import { setWishlistThread } from '$lib/controllers/threadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) return forbidden('Invalid CSRF token');
  const id = Number(params.id);
  if (!Number.isFinite(id)) return badRequest('Invalid or missing id');
  try {
    const body = await request.json().catch(() => ({}));
    const wishlist = typeof body?.wishlist === 'boolean' ? body.wishlist : null;
    if (wishlist === null) return badRequest('Invalid wishlist flag');
    const updated = await setWishlistThread(id, wishlist);
    return ok(updated);
  } catch (e) {
    return serverError((e as Error).message);
  }
};
