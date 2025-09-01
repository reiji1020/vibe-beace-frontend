// CSRF helper utilities
import crypto from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';

const COOKIE_NAME = 'csrf';

function generateToken() {
  // 32 bytes -> 43 chars base64url
  return crypto.randomBytes(32).toString('base64url');
}

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

export function verifyCsrfFromHeader(cookies: Cookies, request: Request): boolean {
  const tokenHeader = request.headers.get('x-csrf-token');
  const tokenCookie = cookies.get(COOKIE_NAME);
  return !!tokenHeader && !!tokenCookie && tokenHeader === tokenCookie;
}

export function verifyCsrfFromForm(cookies: Cookies, formData: FormData): boolean {
  const tokenField = formData.get('csrfToken');
  const tokenCookie = cookies.get(COOKIE_NAME);
  return typeof tokenField === 'string' && !!tokenCookie && tokenField === tokenCookie;
}
