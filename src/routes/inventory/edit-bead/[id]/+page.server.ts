import { getBeadById, updateBead } from '$lib/controllers/beadController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const bead = await getBeadById(Number(params.id));
	if (!bead) {
		throw error(404, 'Bead not found');
	}
	return { bead };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const id = Number(params.id);

		const beadData = {
			id,
			brand: data.get('brand') as string,
			itemCode: data.get('itemCode') as string,
			size: data.get('size') as string,
			colorName: data.get('colorName') as string,
			quantity: Number(data.get('quantity')),
			status: data.get('status') as string,
			wishlist: data.has('wishlist')
		};

		try {
			await updateBead(beadData);
		} catch (err) {
			return error(500, 'Failed to update bead');
		}

		throw redirect(303, '/inventory');
	}
};
