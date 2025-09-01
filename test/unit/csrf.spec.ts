import { describe, it, expect } from 'vitest';
import { ensureCsrfCookie, verifyCsrfFromHeader, verifyCsrfFromForm } from '$lib/csrf';
import type { Cookies } from '@sveltejs/kit';

function createCookies(): Cookies {
  const jar = new Map<string, string>();
  return {
    get: (name: string) => jar.get(name),
    set: (name: string, value: string) => {
      jar.set(name, value);
    },
    delete: (name: string) => {
      jar.delete(name);
    }
    // @ts-expect-error minimal mock
  };
}

describe('csrf utils', () => {
  it('ensureCsrfCookie sets token once and reuses it', () => {
    const cookies = createCookies();
    const t1 = ensureCsrfCookie(cookies);
    const t2 = ensureCsrfCookie(cookies);
    expect(t1).toBe(t2);
  });

  it('verifyCsrfFromHeader validates header/cookie equality', () => {
    const cookies = createCookies();
    const token = ensureCsrfCookie(cookies);
    const req = new Request('http://localhost', { headers: { 'X-CSRF-Token': token } });
    expect(verifyCsrfFromHeader(cookies, req)).toBe(true);

    const bad = new Request('http://localhost', { headers: { 'X-CSRF-Token': 'mismatch' } });
    expect(verifyCsrfFromHeader(cookies, bad)).toBe(false);
  });

  it('verifyCsrfFromForm validates hidden field and cookie', () => {
    const cookies = createCookies();
    const token = ensureCsrfCookie(cookies);
    const fd = new FormData();
    fd.set('csrfToken', token);
    expect(verifyCsrfFromForm(cookies, fd)).toBe(true);
  });
});
