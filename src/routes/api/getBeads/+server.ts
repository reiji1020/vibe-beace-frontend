// src/routes/api/getThreads/+server.ts
import { getAllThreads } from '$lib/controllers/threadController';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const threads = await getAllThreads();
    return new Response(JSON.stringify({ success: true, data: threads }), {
        status: 200
    });
};
