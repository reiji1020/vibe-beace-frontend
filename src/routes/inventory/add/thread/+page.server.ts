import { addThread } from '$lib/controllers/threadController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { threadSchema } from '$lib/validation/threadSchema';
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
      setFlash(cookies, '入力に誤りがあります', 'error');
      return fail(400, { error: parsed.error.flatten() });
    }

    await addThread(parsed.data);
    setFlash(cookies, '刺繍糸を追加しました', 'success');
    throw redirect(303, '/inventory');
  }
};
