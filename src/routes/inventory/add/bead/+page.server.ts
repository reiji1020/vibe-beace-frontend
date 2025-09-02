import { addBead } from '$lib/controllers/beadController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { beadSchema } from '$lib/validation/beadSchema';
import { setFlash } from '$lib/flash';
import { verifyCsrfFromForm } from '$lib/csrf';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      setFlash(cookies, '不正な操作です', 'error');
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const brand = data.get('brand') as string;
    const itemCode = data.get('itemCode') as string;
    const size = data.get('size') as string;
    const colorName = data.get('colorName') as string;
    const quantity = Number(data.get('quantity'));
    const status = data.get('status') as string;
    const wishlist = data.get('wishlist') === 'on';
    const notes = (data.get('notes') as string) || '';

    const parsed = beadSchema.safeParse({
      brand,
      itemCode,
      size,
      colorName: colorName || undefined,
      quantity,
      status: status || undefined,
      wishlist,
      notes: notes || undefined
    });

    if (!parsed.success) {
      setFlash(cookies, '入力に誤りがあります', 'error');
      return fail(400, { error: parsed.error.flatten() });
    }

    await addBead(parsed.data as any);
    setFlash(cookies, 'ビーズを追加しました', 'success');
    throw redirect(303, '/inventory');
  }
};
