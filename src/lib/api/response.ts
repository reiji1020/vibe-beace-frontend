import { json } from '@sveltejs/kit';

/** 成功レスポンスの型。 */
export type ApiSuccess<T> = { success: true; data: T };
/** 失敗レスポンスの型。 */
export type ApiFailure<E = unknown> = { success: false; error: E };
/** APIの統一レスポンス型。 */
export type ApiResponse<T, E = unknown> = ApiSuccess<T> | ApiFailure<E>;

/**
 * 200 OK を返します。
 * @param data レスポンスデータ
 * @param init 追加のレスポンスオプション
 */
export function ok<T>(data: T, init?: ResponseInit): Response {
  return json({ success: true, data } as ApiSuccess<T>, { status: 200, ...(init ?? {}) });
}

/**
 * 201 Created を返します。
 * @param data 作成されたリソース
 * @param init 追加のレスポンスオプション
 */
export function created<T>(data: T, init?: ResponseInit): Response {
  return json({ success: true, data } as ApiSuccess<T>, { status: 201, ...(init ?? {}) });
}

/**
 * 400 Bad Request を返します。
 * @param error バリデーションエラー等
 * @param init 追加のレスポンスオプション
 */
export function badRequest<E = unknown>(error: E, init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<E>, { status: 400, ...(init ?? {}) });
}

/**
 * 403 Forbidden を返します。
 * @param error エラーメッセージ
 * @param init 追加のレスポンスオプション
 */
export function forbidden(error: unknown = 'Forbidden', init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<unknown>, { status: 403, ...(init ?? {}) });
}

/**
 * 500 Internal Server Error を返します。
 * @param error 例外や内部エラー
 * @param init 追加のレスポンスオプション
 */
export function serverError<E = unknown>(error: E, init?: ResponseInit): Response {
  return json({ success: false, error } as ApiFailure<E>, { status: 500, ...(init ?? {}) });
}
