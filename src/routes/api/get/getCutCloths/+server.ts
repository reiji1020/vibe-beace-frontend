import type { RequestHandler } from '@sveltejs/kit';
import { getAllCutCloth } from '$lib/controllers/cutClothController';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const items = await getAllCutCloth(query);
  return new Response(JSON.stringify({ success: true, data: items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

