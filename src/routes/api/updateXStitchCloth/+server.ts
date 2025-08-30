import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateXStitchCloth } from '$lib/controllers/xStitchClothController';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { verifyCsrfFromHeader } from '$lib/csrf';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
  }
  try {
    const body = await request.json();
    const { id, ...data } = body ?? {};
    if (typeof id !== 'number') {
      return json({ success: false, error: 'Invalid or missing id' }, { status: 400 });
    }
    const parsed = xStitchClothSchema.safeParse(data);
    if (!parsed.success) {
      return json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const item = await updateXStitchCloth({ id, ...parsed.data } as any);
    return json({ success: true, data: item }, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return json({ success: false, error: e.message }, { status: 500 });
  }
};
