import { json } from '@sveltejs/kit';

export type ApiSuccess<T> = { success: true; data: T };
export type ApiFailure<E = unknown> = { success: false; error: E };
export type ApiResponse<T, E = unknown> = ApiSuccess<T> | ApiFailure<E>;

export function ok<T>(data: T, init?: ResponseInit): Response {
  return json({ success: true, data } as ApiSuccess<T>, { status: 200, ...(init ?? {}) });
}

export function created<T>(data: T, init?: ResponseInit): Response {
  return json({ success: true, data } as ApiSuccess<T>, { status: 201, ...(init ?? {}) });
}

export function badRequest<E = unknown>(error: E, init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<E>, { status: 400, ...(init ?? {}) });
}

export function forbidden(error: unknown = 'Forbidden', init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<unknown>, { status: 403, ...(init ?? {}) });
}

export function serverError<E = unknown>(error: E, init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<E>, { status: 500, ...(init ?? {}) });
}
