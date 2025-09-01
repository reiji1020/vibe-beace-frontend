import { describe, it, expect } from 'vitest';
import { ok, created, badRequest, forbidden, serverError } from '$lib/api/response';

async function read(res: Response) {
  return { status: res.status, body: await res.json() } as const;
}

describe('api/response helpers', () => {
  it('ok returns 200 with success true', async () => {
    const res = ok({ x: 1 });
    const out = await read(res);
    expect(out.status).toBe(200);
    expect(out.body).toEqual({ success: true, data: { x: 1 } });
  });

  it('created returns 201 with payload', async () => {
    const res = created({ id: 10 });
    const out = await read(res);
    expect(out.status).toBe(201);
    expect(out.body.success).toBe(true);
  });

  it('badRequest/forbidden/serverError return failure', async () => {
    const b = await read(badRequest('bad'));
    const f = await read(forbidden('no'));
    const s = await read(serverError('boom'));
    expect(b.status).toBe(400);
    expect(f.status).toBe(403);
    expect(s.status).toBe(500);
    expect(b.body.success).toBe(false);
  });
});

