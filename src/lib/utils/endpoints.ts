import type { InventoryCardItem } from '$lib/types';

/**
 * 在庫種別に応じたAPIベースパスを返します。
 */
export function baseEndpointForType(type: InventoryCardItem['type']): string {
  const map = {
    thread: '/api/threads',
    bead: '/api/beads',
    cutCloth: '/api/cut-cloths',
    xStitchCloth: '/api/xstitch-cloths'
  } as const;
  return map[type];
}

