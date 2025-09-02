import { getBeadById, updateBead } from '$lib/controllers/beadController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { beadSchema } from '$lib/validation/beadSchema';
import { setFlash } from '$lib/flash';
import { verifyCsrfFromForm } from '$lib/csrf';

export const load: PageServerLoad = async ({ params }) => {
  const bead = await getBeadById(Number(params.id));
  if (!bead) {
    throw error(404, 'Bead not found');
  }
  return { bead };
};

export const actions: Actions = {
  default: async ({ request, params, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      setFlash(cookies, '不正な操作です', 'error');
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);

    const parsed = beadSchema.safeParse({
      brand: data.get('brand') as string,
      itemCode: data.get('itemCode') as string,
      size: data.get('size') as string,
      colorName: (data.get('colorName') as string) || undefined,
      quantity: Number(data.get('quantity')),
      status: (data.get('status') as string) || undefined,
      wishlist: (data.get('wishlist') as string) === 'on',
      notes: ((data.get('notes') as string) || '') || undefined
    });

    try {
      if (!parsed.success) {
        setFlash(cookies, '入力に誤りがあります', 'error');
        return error(400, 'Invalid input');
      }
      await updateBead({ id, ...parsed.data });
    } catch (err) {
      setFlash(cookies, 'ビーズの更新に失敗しました', 'error');
      return error(500, 'Failed to update bead');
    }

    setFlash(cookies, 'ビーズを更新しました', 'success');
    throw redirect(303, '/inventory');
  }
};
