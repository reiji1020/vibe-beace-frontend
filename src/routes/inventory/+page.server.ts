import { getAllBeads } from '$lib/controllers/beadController';
import { getAllThreads } from '$lib/controllers/threadController';
import { getAllCutCloth } from '$lib/controllers/cutClothController';
import { getAllXStitchCloth } from '$lib/controllers/xStitchClothController';

export async function load({ url }) {
  const query = url.searchParams.get('query');
  const statusParam = url.searchParams.get('status');
  const brand = url.searchParams.get('brand');
  const wishlistOnly = url.searchParams.get('wishlist') === 'on' || url.searchParams.get('wishlist') === 'true';
  const sortParam = url.searchParams.get('sort');

  function mapSort<T extends string>(def: { by: T; order: 'asc' | 'desc' }): { by: T; order: 'asc' | 'desc' } | null {
    if (!sortParam) return null;
    switch (sortParam) {
      case 'quantity_asc':
        return { by: 'quantity' as T, order: 'asc' };
      case 'quantity_desc':
        return { by: 'quantity' as T, order: 'desc' };
      case 'brand_asc':
        return { by: 'brand' as T, order: 'asc' };
      case 'brand_desc':
        return { by: 'brand' as T, order: 'desc' };
      default:
        return null;
    }
  }

  const normalizedStatus = statusParam && statusParam !== 'all' ? statusParam : null;

  const [beads, threads, cutCloths, xStitchCloths] = await Promise.all([
    getAllBeads({ query, status: normalizedStatus, brand, wishlist: wishlistOnly ? true : null, sort: mapSort<'itemCode' | 'brand' | 'quantity' | 'status' | 'wishlist'>({ by: 'itemCode', order: 'asc' }) }),
    getAllThreads({ query, status: normalizedStatus, brand, wishlist: wishlistOnly ? true : null, sort: mapSort<'colorNumber' | 'brand' | 'quantity' | 'status' | 'wishlist'>({ by: 'colorNumber', order: 'asc' }) }),
    getAllCutCloth({ query, status: normalizedStatus, wishlist: wishlistOnly ? true : null, sort: mapSort<'id' | 'quantity' | 'status' | 'wishlist'>({ by: 'id', order: 'asc' }) }),
    getAllXStitchCloth({ query, status: normalizedStatus, wishlist: wishlistOnly ? true : null, sort: mapSort<'id' | 'quantity' | 'status' | 'wishlist'>({ by: 'id', order: 'asc' }) })
  ]);

  return { beads, threads, cutCloths, xStitchCloths, query, status: statusParam, brand, wishlist: wishlistOnly, sort: sortParam };
}
