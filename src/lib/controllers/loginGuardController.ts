import { prisma } from '$lib/db';

// 設定（必要に応じて微調整）
const MAX_ATTEMPTS = 5; // ウィンドウ内の最大失敗回数
const WINDOW_MINUTES = 10; // 失敗回数の集計窓（分）
const LOCK_MINUTES = 30; // ロック時間（分）

export type GuardState = {
  failCount: number;
  firstFailedAt: Date | null;
  lockedUntil: Date | null;
};

export async function getGuard(key: string): Promise<GuardState | null> {
  const rec = await prisma.loginGuard.findUnique({ where: { key } });
  if (!rec) return null;
  return {
    failCount: rec.failCount,
    firstFailedAt: rec.firstFailedAt ?? null,
    lockedUntil: rec.lockedUntil ?? null
  };
}

export function getRemainingLockSeconds(state: GuardState | null): number {
  if (!state?.lockedUntil) return 0;
  const now = Date.now();
  const until = state.lockedUntil.getTime();
  return Math.max(0, Math.ceil((until - now) / 1000));
}

/** 失敗記録。ローテーションウィンドウを超えたらカウントをリセット。閾値超えでロック付与。 */
export async function recordFailedAttempt(key: string, now = new Date()): Promise<GuardState> {
  const existing = await prisma.loginGuard.findUnique({ where: { key } });
  const windowMs = WINDOW_MINUTES * 60 * 1000;

  if (!existing) {
    const created = await prisma.loginGuard.create({
      data: {
        key,
        failCount: 1,
        firstFailedAt: now,
        lockedUntil: null
      }
    });
    return {
      failCount: created.failCount,
      firstFailedAt: created.firstFailedAt,
      lockedUntil: created.lockedUntil
    };
  }

  let failCount = existing.failCount;
  let firstFailedAt = existing.firstFailedAt ?? now;
  let lockedUntil = existing.lockedUntil ?? null;

  // 既にロックがある場合は延長せず、そのまま
  const nowMs = now.getTime();
  const firstMs = firstFailedAt.getTime();

  if (nowMs - firstMs > windowMs) {
    // 窓外なのでリセット
    failCount = 1;
    firstFailedAt = now;
    lockedUntil = null;
  } else {
    failCount += 1;
  }

  if (failCount >= MAX_ATTEMPTS) {
    lockedUntil = new Date(nowMs + LOCK_MINUTES * 60 * 1000);
  }

  const updated = await prisma.loginGuard.update({
    where: { key },
    data: { failCount, firstFailedAt, lockedUntil }
  });

  return {
    failCount: updated.failCount,
    firstFailedAt: updated.firstFailedAt,
    lockedUntil: updated.lockedUntil
  };
}

/** 成功時にガードを解除（レコード削除で簡潔化）。 */
export async function clearGuard(key: string): Promise<void> {
  try {
    await prisma.loginGuard.delete({ where: { key } });
  } catch {
    // not found -> ignore
  }
}

/** ロック中か判定。ロックが期限切れなら解除。 */
export async function isLocked(key: string, now = new Date()): Promise<{ locked: boolean; remainingSec: number }>{
  const rec = await prisma.loginGuard.findUnique({ where: { key } });
  if (!rec?.lockedUntil) return { locked: false, remainingSec: 0 };
  if (rec.lockedUntil.getTime() <= now.getTime()) {
    // 期限切れ -> ロック解除しカウンタもリセット
    await prisma.loginGuard.update({
      where: { key },
      data: { lockedUntil: null, failCount: 0, firstFailedAt: null }
    });
    return { locked: false, remainingSec: 0 };
  }
  const remainingSec = Math.ceil((rec.lockedUntil.getTime() - now.getTime()) / 1000);
  return { locked: true, remainingSec };
}

