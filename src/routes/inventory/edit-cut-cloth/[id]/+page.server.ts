import { getCutClothById, updateCutCloth } from '$lib/controllers/cutClothController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const cutCloth = await getCutClothById(Number(params.id));
	if (!cutCloth) {
		throw error(404, 'Cut cloth not found');
	}
	return { cutCloth };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const id = Number(params.id);

		const cutClothData = {
			id,
			fabricType: data.get('fabricType') as string,
			pattern: data.get('pattern') as string,
			size: data.get('size') as string,
			quantity: Number(data.get('quantity')),
			status: data.get('status') as string,
			wishlist: data.has('wishlist')
		};

		try {
			await updateCutCloth(cutClothData);
		} catch (err) {
			return error(500, 'Failed to update cut cloth');
		}

		throw redirect(303, '/inventory');
	}
};
