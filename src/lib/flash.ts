import type { Cookies } from '@sveltejs/kit';

export type FlashType = 'success' | 'error' | 'warning' | 'info';

const COOKIE_NAME = 'flash';

/**
 * フラッシュメッセージをCookieへ設定します（直後のリダイレクト表示用）。
 * @param cookies SvelteKitの`cookies`
 * @param message 表示メッセージ
 * @param type メッセージ種別
 */
export function setFlash(cookies: Cookies, message: string, type: FlashType = 'info') {
  const payload = JSON.stringify({ message, type });
  cookies.set(COOKIE_NAME, payload, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 // 1 minute is enough for immediate redirect
  });
}

/**
 * フラッシュメッセージをCookieから取得し、その場でCookieを消去します。
 * @param cookies SvelteKitの`cookies`
 * @returns メッセージと種別。存在しない/不正時は`null`。
 */
export function getAndClearFlash(cookies: Cookies): { message: string; type: FlashType } | null {
  const raw = cookies.get(COOKIE_NAME);
  if (!raw) return null;
  cookies.delete(COOKIE_NAME, { path: '/' });
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.message === 'string' && typeof obj.type === 'string') {
      return { message: obj.message, type: obj.type as FlashType };
    }
  } catch {
    // ignore parse error
  }
  return null;
}
