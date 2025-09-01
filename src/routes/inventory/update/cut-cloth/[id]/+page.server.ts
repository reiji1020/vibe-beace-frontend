import { getCutClothById, updateCutCloth } from '$lib/controllers/cutClothController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const load: PageServerLoad = async ({ params }) => {
  const cutCloth = await getCutClothById(Number(params.id));
  if (!cutCloth) {
    throw error(404, 'Cut cloth not found');
  }
  return { cutCloth };
};

export const actions: Actions = {
  default: async ({ request, params, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);

    const parsed = cutClothSchema.safeParse({
      fabricType: data.get('fabricType') as string,
      pattern: data.get('pattern') as string,
      size: data.get('size') as string,
      quantity: Number(data.get('quantity')),
      status: (data.get('status') as string) || undefined,
      wishlist: (data.get('wishlist') as string) === 'on'
    });

    try {
      if (!parsed.success) {
        return error(400, 'Invalid input');
      }
      await updateCutCloth({ id, ...parsed.data });
    } catch (err) {
      return error(500, 'Failed to update cut cloth');
    }

    throw redirect(303, '/inventory');
  }
};
