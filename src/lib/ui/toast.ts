import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
};

const initial: ToastState = { visible: false, message: '', type: 'info' };

const store = writable<ToastState>(initial);

let timer: ReturnType<typeof setTimeout> | null = null;

function hide() {
  store.set({ ...initial });
}

function show(message: string, type: ToastType = 'info', timeout = 2000) {
  store.set({ visible: true, message, type });
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => hide(), timeout);
}

const success = (message: string, timeout?: number) => show(message, 'success', timeout);
const error = (message: string, timeout?: number) => show(message, 'error', timeout);
const warning = (message: string, timeout?: number) => show(message, 'warning', timeout);
const info = (message: string, timeout?: number) => show(message, 'info', timeout);

export const toast = {
  subscribe: store.subscribe,
  show,
  success,
  error,
  warning,
  info,
  hide
};

