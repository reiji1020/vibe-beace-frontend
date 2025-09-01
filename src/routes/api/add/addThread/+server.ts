// src/routes/api/addThread/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { threadSchema } from '$lib/validation/threadSchema';
import { addThread } from '$lib/controllers/threadController';
import { verifyCsrfFromHeader } from '$lib/csrf';
import { created, badRequest, forbidden, serverError } from '$lib/api/response';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return forbidden('Invalid CSRF token');
  }
  try {
    const body = await request.json();
    const parsed = threadSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.flatten());
    }
    const newThread = await addThread(parsed.data);
    return created(newThread);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return serverError(message);
  }
};
