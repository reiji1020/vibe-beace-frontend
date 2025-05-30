// src/lib/db.ts
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// モジュールが初回インポートされたときだけ新規生成
const prisma = new PrismaClient();

export { prisma };
