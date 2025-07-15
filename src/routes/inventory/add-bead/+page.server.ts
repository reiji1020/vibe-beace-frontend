// src/routes/inventory/add-bead/+page.server.ts
import { addBead } from '$lib/controllers/beadController';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const brand = data.get('brand') as string;
        const itemCode = data.get('itemCode') as string;
        const size = data.get('size') as string;
        const colorName = data.get('colorName') as string;
        const quantity = Number(data.get('quantity'));
        const status = data.get('status') as string;
        const wishlist = data.get('wishlist') === 'on';

        await addBead({
            brand,
            itemCode,
            size,
            colorName,
            quantity,
            status,
            wishlist,
        });

        throw redirect(303, '/inventory');
    },
};
