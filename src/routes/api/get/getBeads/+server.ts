// src/routes/api/getBeads/+server.ts
import { getAllBeads } from '$lib/controllers/beadController';
import type { RequestHandler } from '@sveltejs/kit';
import { ok } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const beads = await getAllBeads(query);
  return ok(beads);
};
