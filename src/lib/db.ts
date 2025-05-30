// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

// モジュールが初回インポートされたときだけ新規生成
const prisma = new PrismaClient();

export { prisma };
