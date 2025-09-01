// src/lib/validation/xStitchClothSchema.ts
import { z } from 'zod';

export const xStitchClothSchema = z.object({
  count: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used']).nullable().optional(),
  wishlist: z.boolean()
});
