import { z } from 'zod';

/** クロスステッチ布の入力スキーマ。 */
export const xStitchClothSchema = z.object({
  brand: z.string().min(1).nullable().optional(),
  count: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used']).nullable().optional(),
  wishlist: z.boolean(),
  notes: z.string().max(1000).nullable().optional()
});
