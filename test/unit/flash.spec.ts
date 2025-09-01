import { describe, it, expect } from 'vitest';
import { setFlash, getAndClearFlash } from '$lib/flash';
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

describe('flash cookie helpers', () => {
  it('setFlash and getAndClearFlash', () => {
    const cookies = createCookies();
    setFlash(cookies, 'done', 'success');
    const f1 = getAndClearFlash(cookies);
    expect(f1).toEqual({ message: 'done', type: 'success' });
    const f2 = getAndClearFlash(cookies);
    expect(f2).toBeNull();
  });
});
