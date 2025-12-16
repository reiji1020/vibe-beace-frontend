import { addXStitchCloth } from '$lib/controllers/xStitchClothController';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { xStitchClothSchema } from '$lib/validation/xStitchClothSchema';
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
    const count = data.get('count') as string;
    const color = data.get('color') as string;
    const size = data.get('size') as string;
    const quantity = Number(data.get('quantity'));
    const status = data.get('status') as string;
    const wishlist = data.get('wishlist') === 'on';
    const notes = (data.get('notes') as string) || '';

    const parsed = xStitchClothSchema.safeParse({
      brand: brand || undefined,
      count,
      color,
      size,
      quantity,
      status: status || undefined,
      wishlist,
      notes: notes || undefined
    });

    if (!parsed.success) {
      setFlash(cookies, '入力に誤りがあります', 'error');
      return fail(400, { error: parsed.error.flatten() });
    }

    await addXStitchCloth(parsed.data as any);
    const cont = (data.get('continue') as string) === 'on' || (data.get('continue') as string) === 'true';
    if (cont) {
      return { ok: true };
    }
    setFlash(cookies, 'クロスステッチ布を追加しました', 'success');
    throw redirect(303, '/inventory');
  }
};
