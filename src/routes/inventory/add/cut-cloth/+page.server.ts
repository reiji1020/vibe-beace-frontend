import { addCutCloth } from '$lib/controllers/cutClothController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		if (!verifyCsrfFromForm(cookies, data)) {
			return fail(403, { error: 'Invalid CSRF token' });
		}
		const fabricType = data.get('fabricType') as string;
		const pattern = data.get('pattern') as string;
		const size = data.get('size') as string;
		const quantity = Number(data.get('quantity'));
		const status = data.get('status') as string;
		const wishlist = data.get('wishlist') === 'on';

		const parsed = cutClothSchema.safeParse({
			fabricType,
			pattern,
			size,
			quantity,
			status: status || undefined,
			wishlist
		});

		if (!parsed.success) {
			return fail(400, { error: parsed.error.flatten() });
		}

		await addCutCloth(parsed.data as any);

		throw redirect(303, '/inventory');
	}
};
