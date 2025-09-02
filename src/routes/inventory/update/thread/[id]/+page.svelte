<script lang="ts">
  import { Button, Checkbox, FormGroup, Input, Select, Textarea } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  let { thread } = data;
  export let form: any;
  import { enhance } from '$app/forms';

  const topError = () => {
    const e = form?.error;
    if (!e) return '';
    if (typeof e === 'string') return e;
    const arr = e?.formErrors as string[] | undefined;
    return arr && arr.length ? arr.join(', ') : '';
  };
  const fe = (name: string) => form?.error?.fieldErrors?.[name]?.[0] as string | undefined;

  const statusOptions = [
    { value: 'unused', label: '未使用' },
    { value: 'used', label: '使用中' },
    { value: 'low', label: '残りわずか' }
  ];

  // Normalize nullable fields for component props
  let status = thread.status ?? 'unused';
  let colorName = thread.colorName ?? '';
  let quantity = String(thread.quantity ?? 0);
  let notes = thread.notes ?? '';
</script>

<main>
  <h1>刺繍糸を編集</h1>

  <form method="POST" use:enhance>
    <input type="hidden" name="csrfToken" value={data.csrfToken} />
    {#if topError()}<div class="mt-2 mb-2 text-red-600">{topError()}</div>{/if}
    <FormGroup>
      <Input label="メーカー" bind:value={thread.brand} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="brand" value={thread.brand} />
      {#if fe('brand')}<div class="mt-1 text-sm text-red-600">{fe('brand')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="色番号" bind:value={thread.colorNumber} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="colorNumber" value={thread.colorNumber} />
      {#if fe('colorNumber')}<div class="mt-1 text-sm text-red-600">{fe('colorNumber')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="色名" bind:value={colorName} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="colorName" value={colorName} />
      {#if fe('colorName')}<div class="mt-1 text-sm text-red-600">{fe('colorName')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="数量" type="number" bind:value={quantity} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="quantity" value={quantity} />
      {#if fe('quantity')}<div class="mt-1 text-sm text-red-600">{fe('quantity')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Select label="状態" options={statusOptions} bind:value={status} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="status" value={status} />
      {#if fe('status')}<div class="mt-1 text-sm text-red-600">{fe('status')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Checkbox label="欲しいものリストに追加" bind:checked={thread.wishlist} color={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="wishlist" value={thread.wishlist ? 'on' : 'off'} />
      {#if fe('wishlist')}<div class="mt-1 text-sm text-red-600">{fe('wishlist')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Textarea label="メモ（任意）" rows={3} placeholder="自由記述（最大1000文字）" bind:value={notes} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="notes" value={notes} />
      {#if fe('notes')}<div class="mt-1 text-sm text-red-600">{fe('notes')}</div>{/if}
    </FormGroup>
    <Button label="更新する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
  </form>
</main>

<style>
  main {
    margin: 2rem;
  }
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  form {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
