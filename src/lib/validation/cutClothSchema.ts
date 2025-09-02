// src/lib/validation/cutClothSchema.ts
import { z } from 'zod';

export const cutClothSchema = z.object({
  brand: z.string().min(1).nullable().optional(),
  fabricType: z.string().min(1),
  pattern: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used']).nullable().optional(),
  wishlist: z.boolean(),
  notes: z.string().max(1000).nullable().optional()
});
