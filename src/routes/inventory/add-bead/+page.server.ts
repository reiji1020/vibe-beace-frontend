// src/routes/inventory/add-bead/+page.server.ts
import { addBead } from '$lib/controllers/beadController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { beadSchema } from '$lib/validation/beadSchema';
import { verifyCsrfFromForm } from '$lib/csrf';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		if (!verifyCsrfFromForm(cookies, data)) {
			return fail(403, { error: 'Invalid CSRF token' });
		}
		const brand = data.get('brand') as string;
		const itemCode = data.get('itemCode') as string;
		const size = data.get('size') as string;
		const colorName = data.get('colorName') as string;
		const quantity = Number(data.get('quantity'));
		const status = data.get('status') as string;
		const wishlist = data.get('wishlist') === 'on';

		const parsed = beadSchema.safeParse({
			brand,
			itemCode,
			size,
			colorName: colorName || undefined,
			quantity,
			status: status || undefined,
			wishlist
		});

		if (!parsed.success) {
			return fail(400, { error: parsed.error.flatten() });
		}

		await addBead(parsed.data as any);

		throw redirect(303, '/inventory');
	}
};
