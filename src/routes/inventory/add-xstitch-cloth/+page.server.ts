import { addXStitchCloth } from '$lib/controllers/xStitchClothController';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const count = data.get('count') as string;
    const color = data.get('color') as string;
    const size = data.get('size') as string;
    const quantity = Number(data.get('quantity'));
    const status = data.get('status') as string;
    const wishlist = data.get('wishlist') === 'on';

    await addXStitchCloth({ count, color, size, quantity, status, wishlist } as any);
    throw redirect(303, '/inventory');
  }
};

