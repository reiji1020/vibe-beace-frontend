// src/routes/api/getThreads/+server.ts
import { getAllThreads } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';
import { ok } from '$lib/api/response';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const threads = await getAllThreads(query);
  return ok(threads);
};
