import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getXStitchClothById, updateXStitchCloth } from '$lib/controllers/xStitchClothController';

export const load: PageServerLoad = async ({ params }) => {
  const item = await getXStitchClothById(Number(params.id));
  if (!item) throw error(404, 'XStitchCloth not found');
  return { item };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const id = Number(params.id);
    const payload = {
      id,
      count: data.get('count') as string,
      color: data.get('color') as string,
      size: data.get('size') as string,
      quantity: Number(data.get('quantity')),
      status: data.get('status') as string,
      wishlist: (data.get('wishlist') as string) === 'on'
    };

    try {
      await updateXStitchCloth(payload as any);
    } catch (e) {
      throw error(500, 'Failed to update xstitch cloth');
    }

    throw redirect(303, '/inventory');
  }
};
