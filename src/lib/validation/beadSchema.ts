// src/lib/validation/beadSchema.ts
import { z } from 'zod';

export const beadSchema = z.object({
  brand: z.string().min(1),
  itemCode: z.string().min(1),
  size: z.string().min(1),
  colorName: z.string().nullable().optional(),
  quantity: z.number().int().min(0),
  status: z.enum(['unused', 'used', 'low']).nullable().optional(),
  wishlist: z.boolean()
});
