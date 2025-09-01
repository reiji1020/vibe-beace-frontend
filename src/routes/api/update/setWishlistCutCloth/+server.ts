import type { RequestHandler } from './$types';
import { setWishlistCutCloth } from '$lib/controllers/cutClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { wishlistToggleSchema } from '$lib/validation/wishlistSchema';
import { ok, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = wishlistToggleSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const { id, wishlist } = parsed.data;
    const updated = await setWishlistCutCloth(id, wishlist);
    return ok(updated);
  } catch (error) {
    const e = error as Error;
    return serverError(e.message);
  }
};

