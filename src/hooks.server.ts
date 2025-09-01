import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (session) {
    event.locals.user = { name: 'authenticated' };
  }

  if (!event.locals.user) {
    const path = event.url.pathname;
    if (path.startsWith('/inventory')) {
      return new Response('Redirect', { headers: { Location: '/login' }, status: 302 });
    }
    if (path.startsWith('/api-docs')) {
      return new Response('Redirect', { headers: { Location: '/login' }, status: 302 });
    }
    if (path.startsWith('/api')) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  const response = await resolve(event);
  return response;
};
