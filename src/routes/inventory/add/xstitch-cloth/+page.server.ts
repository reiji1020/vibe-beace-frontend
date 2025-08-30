import { addXStitchCloth } from '$lib/controllers/xStitchClothController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const count = data.get('count') as string;
    const color = data.get('color') as string;
    const size = data.get('size') as string;
    const quantity = Number(data.get('quantity'));
    const status = data.get('status') as string;
    const wishlist = data.get('wishlist') === 'on';

    const parsed = xStitchClothSchema.safeParse({
      count,
      color,
      size,
      quantity,
      status: status || undefined,
      wishlist
    });

    if (!parsed.success) {
      return fail(400, { error: parsed.error.flatten() });
    }

    await addXStitchCloth(parsed.data as any);
    throw redirect(303, '/inventory');
  }
};
