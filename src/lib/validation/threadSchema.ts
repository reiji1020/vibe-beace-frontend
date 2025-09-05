import { z } from 'zod';

/**
 * 刺繍糸の入力スキーマ。
 * API/フォームのバリデーションに使用します。
 */
export const threadSchema = z.object({
  brand: z.string().min(1),
  colorNumber: z.string().min(1),
  colorName: z.string().nullable().optional(),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used', 'low']).nullable().optional(),
  wishlist: z.boolean(),
  notes: z.string().max(1000).nullable().optional()
});
