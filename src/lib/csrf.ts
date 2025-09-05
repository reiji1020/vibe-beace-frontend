import crypto from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';

const COOKIE_NAME = 'csrf';

/**
 * ランダムなCSRFトークンを生成します（base64url, 32byte）。
 */
function generateToken() {
  // 32 bytes -> 43 chars base64url
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * CSRF用のCookieを存在しない場合に発行し、トークンを返します。
 * @param cookies SvelteKitの`cookies`
 * @returns 発行済み（または新規発行した）CSRFトークン
 */
export function ensureCsrfCookie(cookies: Cookies): string {
  let token = cookies.get(COOKIE_NAME);
  if (!token) {
    token = generateToken();
    cookies.set(COOKIE_NAME, token, {
      path: '/',
      httpOnly: false, // allow client JS to read for fetch headers
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    });
  }
  return token;
}

/**
 * リクエストヘッダー`X-CSRF-Token`とCookieのトークンが一致するか検証します。
 * @param cookies SvelteKitの`cookies`
 * @param request フェッチリクエスト
 * @returns トークン一致でtrue
 */
export function verifyCsrfFromHeader(cookies: Cookies, request: Request): boolean {
  const tokenHeader = request.headers.get('x-csrf-token');
  const tokenCookie = cookies.get(COOKIE_NAME);
  return !!tokenHeader && !!tokenCookie && tokenHeader === tokenCookie;
}

/**
 * フォーム（`csrfToken`フィールド）とCookieのトークンが一致するか検証します。
 * @param cookies SvelteKitの`cookies`
 * @param formData 受信した`FormData`
 * @returns トークン一致でtrue
 */
export function verifyCsrfFromForm(cookies: Cookies, formData: FormData): boolean {
  const tokenField = formData.get('csrfToken');
  const tokenCookie = cookies.get(COOKIE_NAME);
  return typeof tokenField === 'string' && !!tokenCookie && tokenField === tokenCookie;
}
