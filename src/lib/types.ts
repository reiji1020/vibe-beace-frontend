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

// For UI cards: add discriminant and id field expected from DB
export type ThreadItem = Thread & { id: number; type: 'thread' };
export type BeadItem = Bead & { id: number; type: 'bead'; itemCode: string; size: string; brand: string };
export type CutClothItem = CutCloth & { id: number; type: 'cutCloth'; fabricType: string; pattern: string; size: string };
export type XStitchClothItem = XStitchCloth & { id: number; type: 'xStitchCloth'; count: string; color: string; size: string };
export type InventoryCardItem = ThreadItem | BeadItem | CutClothItem | XStitchClothItem;
