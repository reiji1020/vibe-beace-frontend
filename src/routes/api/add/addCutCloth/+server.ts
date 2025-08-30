import type { RequestHandler } from '@sveltejs/kit';
import { cutClothSchema } from '$lib/validation/cutClothSchema';
import { addCutCloth } from '$lib/controllers/cutClothController';
import { verifyCsrfFromHeader } from '$lib/csrf';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!verifyCsrfFromHeader(cookies, request)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid CSRF token' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const body = await request.json();
    const parsed = cutClothSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: parsed.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const created = await addCutCloth(parsed.data as any);
    return new Response(
      JSON.stringify({ success: true, data: created }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

