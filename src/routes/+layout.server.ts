import type { LayoutServerLoad } from './$types';
import { ensureCsrfCookie } from '$lib/csrf';
import { getAndClearFlash } from '$lib/flash';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const csrfToken = ensureCsrfCookie(cookies);
  const flash = getAndClearFlash(cookies);
  return {
    user: locals.user,
    csrfToken,
    flash
  };
};
