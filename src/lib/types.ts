import type { z } from 'zod';
import { threadSchema } from './validation/threadSchema';
import { beadSchema } from './validation/beadSchema';
import { cutClothSchema } from './validation/cutClothSchema';
import { xStitchClothSchema } from './validation/xStitchClothSchema';

export type Thread = z.infer<typeof threadSchema>;
export type Bead = z.infer<typeof beadSchema>;
export type CutCloth = z.infer<typeof cutClothSchema>;
export type XStitchCloth = z.infer<typeof xStitchClothSchema>;

/**
 * Union type for all inventory items.
 */
export type InventoryItem = Thread | Bead | CutCloth | XStitchCloth;
