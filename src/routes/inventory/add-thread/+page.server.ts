// src/routes/inventory/add-thread/+page.server.ts
import { addThread } from '$lib/controllers/threadController';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const brand = data.get('brand') as string;
		const colorNumber = data.get('colorNumber') as string;
		const colorName = data.get('colorName') as string;
		const quantity = Number(data.get('quantity'));
		const status = data.get('status') as string;
		const wishlist = data.get('wishlist') === 'on';

		try {
			await addThread({
				brand,
				colorNumber,
				colorName,
				quantity,
				status,
				wishlist
			});
		} catch (error) {
			console.error('Error adding thread:', error);
			// エラーハンドリングをここに追加することもできます
		}

		throw redirect(303, '/inventory');
	}
};
