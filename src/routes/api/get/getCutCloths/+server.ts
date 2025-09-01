import type { RequestHandler } from '@sveltejs/kit';
import { getAllCutCloth } from '$lib/controllers/cutClothController';
import { ok } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const items = await getAllCutCloth(query);
  return ok(items);
};
