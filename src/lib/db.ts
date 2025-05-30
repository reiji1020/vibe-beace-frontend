// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
    // Node とブラウザ両方で安全に使えるグローバルオブジェクト
    // prisma が存在しない場合にのみ新規作成
    var prisma: PrismaClient;
}

export const prisma: PrismaClient =
    globalThis.prisma ||
    new PrismaClient({
        // 必要に応じて設定を追加
        // log: ['query', 'error', 'warn']
    });

// 開発環境ではグローバルキャッシュに保持
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}