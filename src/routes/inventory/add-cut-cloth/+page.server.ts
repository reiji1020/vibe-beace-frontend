// src/routes/inventory/add-cut-cloth/+page.server.ts
import { addCutCloth } from '$lib/controllers/cutClothController';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const fabricType = data.get('fabricType') as string;
        const pattern = data.get('pattern') as string;
        const size = data.get('size') as string;
        const quantity = Number(data.get('quantity'));
        const status = data.get('status') as string;
        const wishlist = data.get('wishlist') === 'on';

        await addCutCloth({
            fabricType,
            pattern,
            size,
            quantity,
            status,
            wishlist,
        });

        throw redirect(303, '/inventory');
    },
};
