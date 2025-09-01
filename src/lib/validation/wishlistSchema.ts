import { z } from 'zod';

export const wishlistToggleSchema = z.object({
  id: z.number().int().positive(),
  wishlist: z.boolean()
});
