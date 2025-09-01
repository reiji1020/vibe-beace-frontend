import { getThreadById } from '$lib/controllers/threadController';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { updateThread } from '$lib/controllers/threadController';
import { threadSchema } from '$lib/validation/threadSchema';
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
      return fail(403, { error: 'Invalid CSRF token' });
    }
    const id = Number(params.id);

    const parsed = threadSchema.safeParse({
      brand: data.get('brand') as string,
      colorNumber: data.get('colorNumber') as string,
      colorName: (data.get('colorName') as string) || undefined,
      quantity: Number(data.get('quantity')),
      status: (data.get('status') as string) || undefined,
      wishlist: (data.get('wishlist') as string) === 'on'
    });

    try {
      if (!parsed.success) {
        return error(400, 'Invalid input');
      }
      await updateThread({ id, ...parsed.data });
    } catch (err) {
      return error(500, 'Failed to update thread');
    }

    throw redirect(303, '/inventory');
  }
};
