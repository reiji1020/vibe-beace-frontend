import { getCutClothById, updateCutCloth } from '$lib/controllers/cutClothController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { setFlash } from '$lib/flash';
import { verifyCsrfFromForm } from '$lib/csrf';

export const load: PageServerLoad = async ({ params }) => {
  const cutCloth = await getCutClothById(Number(params.id));
  if (!cutCloth) {
    throw error(404, 'Cut cloth not found');
  }
  return { cutCloth };
};

export const actions: Actions = {
  default: async ({ request, params, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      setFlash(cookies, '不正な操作です', 'error');
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);

    const parsed = cutClothSchema.safeParse({
      brand: (data.get('brand') as string) || '' || undefined,
      fabricType: data.get('fabricType') as string,
      pattern: data.get('pattern') as string,
      size: data.get('size') as string,
      quantity: Number(data.get('quantity')),
      status: (data.get('status') as string) || undefined,
      wishlist: (data.get('wishlist') as string) === 'on',
      notes: (data.get('notes') as string) || '' || undefined
    });

    try {
      if (!parsed.success) {
        setFlash(cookies, '入力に誤りがあります', 'error');
        return error(400, 'Invalid input');
      }
      await updateCutCloth({ id, ...parsed.data });
    } catch (err) {
      setFlash(cookies, 'カットクロスの更新に失敗しました', 'error');
      return error(500, 'Failed to update cut cloth');
    }

    setFlash(cookies, 'カットクロスを更新しました', 'success');
    throw redirect(303, '/inventory');
  }
};
