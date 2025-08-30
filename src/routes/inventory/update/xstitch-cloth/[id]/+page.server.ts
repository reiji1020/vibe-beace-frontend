import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { getXStitchClothById, updateXStitchCloth } from '$lib/controllers/xStitchClothController';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const load: PageServerLoad = async ({ params }) => {
  const item = await getXStitchClothById(Number(params.id));
  if (!item) throw error(404, 'XStitchCloth not found');
  return { item };
};

export const actions: Actions = {
  default: async ({ request, params, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);
    const parsed = xStitchClothSchema.safeParse({
      count: data.get('count') as string,
      color: data.get('color') as string,
      size: data.get('size') as string,
      quantity: Number(data.get('quantity')),
      status: (data.get('status') as string) || undefined,
      wishlist: (data.get('wishlist') as string) === 'on'
    });

    try {
      if (!parsed.success) {
        return error(400, 'Invalid input');
      }
      await updateXStitchCloth({ id, ...parsed.data } as any);
    } catch (e) {
      throw error(500, 'Failed to update xstitch cloth');
    }

    throw redirect(303, '/inventory');
  }
};
