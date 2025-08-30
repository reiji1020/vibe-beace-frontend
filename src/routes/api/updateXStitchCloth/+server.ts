import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateXStitchCloth } from '$lib/controllers/xStitchClothController';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const item = await updateXStitchCloth(body);
    return json(item, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return json({ error: e.message }, { status: 500 });
  }
};

