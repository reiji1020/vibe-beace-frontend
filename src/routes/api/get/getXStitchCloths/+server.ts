import type { RequestHandler } from '@sveltejs/kit';
import { getAllXStitchCloth } from '$lib/controllers/xStitchClothController';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const items = await getAllXStitchCloth(query);
  return new Response(JSON.stringify({ success: true, data: items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

