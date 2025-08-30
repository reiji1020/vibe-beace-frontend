import type { XStitchCloth } from '$lib/types';
import { prisma } from '$lib/db';

export async function getAllXStitchCloth(query: string | null = null): Promise<XStitchCloth[]> {
  const where = query
    ? {
        OR: [
          { count: { contains: query } },
          { color: { contains: query } },
          { size: { contains: query } }
        ]
      }
    : {};

  return prisma.xStitchCloth.findMany({ where, orderBy: { id: 'asc' } });
}

export async function getXStitchClothById(id: number): Promise<XStitchCloth | null> {
  return prisma.xStitchCloth.findUnique({ where: { id } });
}

export async function addXStitchCloth(data: XStitchCloth): Promise<XStitchCloth> {
  return prisma.xStitchCloth.create({ data });
}

export async function updateXStitchCloth(
  data: Partial<XStitchCloth> & { id: number }
): Promise<XStitchCloth> {
  const { id, ...updateData } = data;
  if (typeof id !== 'number') throw new Error('Invalid ID provided for updating xStitchCloth.');
  return prisma.xStitchCloth.update({ where: { id }, data: updateData });
}

export async function setWishlistXStitchCloth(
  id: number,
  wishlist: boolean
): Promise<XStitchCloth> {
  return prisma.xStitchCloth.update({ where: { id }, data: { wishlist } });
}

export async function deleteXStitchCloth(id: number): Promise<XStitchCloth> {
  return prisma.xStitchCloth.delete({ where: { id } });
}

