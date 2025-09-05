import type { z } from 'zod';
import { threadSchema } from './validation/threadSchema';
import { beadSchema } from './validation/beadSchema';
import { cutClothSchema } from './validation/cutClothSchema';
import { xStitchClothSchema } from './validation/xStitchClothSchema';

/** PrismaのThreadモデルに対応する入力型。 */
export type Thread = z.infer<typeof threadSchema>;
/** PrismaのBeadモデルに対応する入力型。 */
export type Bead = z.infer<typeof beadSchema>;
/** PrismaのCutClothモデルに対応する入力型。 */
export type CutCloth = z.infer<typeof cutClothSchema>;
/** PrismaのXStitchClothモデルに対応する入力型。 */
export type XStitchCloth = z.infer<typeof xStitchClothSchema>;

/** すべての在庫エンティティのUnion。 */
export type InventoryItem = Thread | Bead | CutCloth | XStitchCloth;

/** UIカード表示向け：DB由来の`id`と識別子`type`を付与した型群。 */
export type ThreadItem = Thread & { id: number; type: 'thread' };
export type BeadItem = Bead & {
  id: number;
  type: 'bead';
  itemCode: string;
  size: string;
  brand: string;
};
export type CutClothItem = CutCloth & {
  id: number;
  type: 'cutCloth';
  fabricType: string;
  pattern: string;
  size: string;
};
export type XStitchClothItem = XStitchCloth & {
  id: number;
  type: 'xStitchCloth';
  count: string;
  color: string;
  size: string;
};
export type InventoryCardItem = ThreadItem | BeadItem | CutClothItem | XStitchClothItem;
