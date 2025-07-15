// src/routes/api/getThreads/+server.ts
import { getAllBeads } from '$lib/controllers/beadController';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const beads = await getAllBeads();
    return new Response(JSON.stringify({ success: true, data: beads }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
