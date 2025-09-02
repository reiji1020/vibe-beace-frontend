<script lang="ts">
  import { Button, Checkbox, FormGroup, Input, Select, Textarea } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';
  export let data: any;
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

  let brand: string = '';
  let itemCode: string = '';
  let size: string = '';
  let colorName: string = '';
  let quantity = '';
  let status: string = '';
  let wishlist: boolean = false;
  let notes: string = '';

  const statusOptions = [
    { value: 'unused', label: '未使用' },
    { value: 'used', label: '使用中' },
    { value: 'low', label: '残りわずか' }
  ];
</script>

<main>
  <h1>ビーズを追加</h1>

  <form method="POST" use:enhance>
    <input type="hidden" name="csrfToken" value={data.csrfToken} />

    {#if topError()}
      <div class="mt-2 mb-2 text-red-600">{topError()}</div>
    {/if}
    <FormGroup>
      <Input label="メーカー" bind:value={brand} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="brand" value={brand} />
      {#if fe('brand')}<div class="mt-1 text-sm text-red-600">{fe('brand')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="品番" bind:value={itemCode} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="itemCode" value={itemCode} />
      {#if fe('itemCode')}<div class="mt-1 text-sm text-red-600">{fe('itemCode')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="サイズ" bind:value={size} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="size" value={size} />
      {#if fe('size')}<div class="mt-1 text-sm text-red-600">{fe('size')}</div>{/if}
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
      <Checkbox label="欲しいものリストに追加" bind:checked={wishlist} color={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="wishlist" value={wishlist ? 'on' : 'off'} />
      {#if fe('wishlist')}<div class="mt-1 text-sm text-red-600">{fe('wishlist')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Textarea label="メモ（任意）" rows={3} placeholder="自由記述（最大1000文字）" bind:value={notes} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="notes" value={notes} />
      {#if fe('notes')}<div class="mt-1 text-sm text-red-600">{fe('notes')}</div>{/if}
    </FormGroup>
    <Button label="追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
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
