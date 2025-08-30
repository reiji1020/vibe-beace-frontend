import type { RequestHandler } from '@sveltejs/kit';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { addXStitchCloth } from '$lib/controllers/xStitchClothController';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const validated = xStitchClothSchema.parse(body);
    const created = await addXStitchCloth(validated);
    return new Response(JSON.stringify({ success: true, data: created }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

