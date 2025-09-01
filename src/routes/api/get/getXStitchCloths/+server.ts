import type { RequestHandler } from '@sveltejs/kit';
import { getAllXStitchCloth } from '$lib/controllers/xStitchClothController';
import { ok } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const items = await getAllXStitchCloth(query);
  return ok(items);
};
