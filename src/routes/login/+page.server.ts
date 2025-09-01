import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { VITE_AUTH_USER, VITE_AUTH_PASSWORD } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/inventory');
  }
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (username === VITE_AUTH_USER && password === VITE_AUTH_PASSWORD) {
      cookies.set('session', 'loggedin', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      throw redirect(302, '/inventory');
    }

    return fail(400, { error: 'Invalid username or password' });
  }
};
