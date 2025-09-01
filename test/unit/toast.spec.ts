import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from '$lib/ui/toast';

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('toast store', () => {
  it('shows and auto-hides', () => {
    let state: any;
    const unsub = toast.subscribe((s) => (state = s));
    toast.success('ok', 1000);
    expect(state.visible).toBe(true);
    expect(state.message).toBe('ok');
    vi.advanceTimersByTime(1000);
    expect(state.visible).toBe(false);
    unsub();
  });
});

