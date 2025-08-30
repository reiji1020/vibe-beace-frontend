import type { LayoutServerLoad } from './$types';
import { ensureCsrfCookie } from '$lib/csrf';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const csrfToken = ensureCsrfCookie(cookies);
  return {
    user: locals.user,
    csrfToken
  };
};
