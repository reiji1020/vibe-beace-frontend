import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { clearGuard, isLocked, recordFailedAttempt } from '$lib/controllers/loginGuardController';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/inventory');
  }
};

export const actions: Actions = {
  default: async ({ cookies, request, getClientAddress }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const ip = getClientAddress?.() ?? 'unknown';
    const userStr = typeof username === 'string' ? username : '';
    // ガードキー: IP とユーザー名を組み合わせ（NATでの巻き添え抑制）
    const guardKey = `${ip}|${userStr}`;

    // ロック中判定
    const lock = await isLocked(guardKey);
    if (lock.locked) {
      const minutes = Math.max(1, Math.ceil(lock.remainingSec / 60));
      return fail(429, { error: `不正な試行が続いたため一時的にロックされています。${minutes}分後に再試行してください。` });
    }

    const expectedUser = env.AUTH_USER ?? env.VITE_AUTH_USER; // fallback for migration
    const expectedPass = env.AUTH_PASSWORD ?? env.VITE_AUTH_PASSWORD;

    if (username === expectedUser && password === expectedPass) {
      cookies.set('session', 'loggedin', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      // 成功 -> 失敗カウンタをクリア
      await clearGuard(guardKey);
      throw redirect(302, '/inventory');
    }

    // 失敗 -> カウント記録 / 必要ならロック
    const state = await recordFailedAttempt(guardKey);
    if (state.lockedUntil && state.lockedUntil.getTime() > Date.now()) {
      const remaining = Math.ceil((state.lockedUntil.getTime() - Date.now()) / 60000);
      return fail(429, { error: `不正な試行が続いたため一時的にロックされました。${remaining}分後に再試行してください。` });
    }

    return fail(400, { error: 'Invalid username or password' });
  }
};
