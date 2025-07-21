import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (session) {
    event.locals.user = { name: 'authenticated' };
  }

  if (!event.locals.user && event.url.pathname.startsWith('/inventory')) {
    return new Response('Redirect', { headers: { Location: '/login' }, status: 302 });
  }

  const response = await resolve(event);
  return response;
};
