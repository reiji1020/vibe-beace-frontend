import { addThread } from '$lib/controllers/threadController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { threadSchema } from '$lib/validation/threadSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		if (!verifyCsrfFromForm(cookies, data)) {
			return fail(403, { error: 'Invalid CSRF token' });
		}
		const brand = data.get('brand') as string;
		const colorNumber = data.get('colorNumber') as string;
		const colorName = data.get('colorName') as string;
		const quantity = Number(data.get('quantity'));
		const status = data.get('status') as string;
		const wishlist = data.get('wishlist') === 'on';

		const parsed = threadSchema.safeParse({
			brand,
			colorNumber,
			colorName: colorName || undefined,
			quantity,
			status: status || undefined,
			wishlist
		});

		if (!parsed.success) {
			return fail(400, { error: parsed.error.flatten() });
		}

		await addThread(parsed.data);

		throw redirect(303, '/inventory');
	}
};
