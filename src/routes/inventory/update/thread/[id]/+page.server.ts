import { getThreadById } from '$lib/controllers/threadController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { updateThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
import { setFlash } from '$lib/flash';
import { verifyCsrfFromForm } from '$lib/csrf';

export const load: PageServerLoad = async ({ params }) => {
  const thread = await getThreadById(Number(params.id));
  if (!thread) {
    throw error(404, 'Thread not found');
  }
  return { thread };
};

export const actions: Actions = {
  default: async ({ request, params, cookies }) => {
    const data = await request.formData();
    if (!verifyCsrfFromForm(cookies, data)) {
      setFlash(cookies, '不正な操作です', 'error');
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);

    const parsed = threadSchema.safeParse({
      brand: data.get('brand') as string,
      colorNumber: data.get('colorNumber') as string,
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
      await updateThread({ id, ...parsed.data });
    } catch (err) {
      setFlash(cookies, '刺繍糸の更新に失敗しました', 'error');
      return error(500, 'Failed to update thread');
    }

    setFlash(cookies, '刺繍糸を更新しました', 'success');
    throw redirect(303, '/inventory');
  }
};
