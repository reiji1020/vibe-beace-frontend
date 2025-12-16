<script lang="ts">
  import { Button, Checkbox, FormGroup, Input, Select, Textarea, Breadcrumb, toast } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';
  export let data: any;
  export let form: any;
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  const topError = () => {
    const e = form?.error;
    if (!e) return '';
    if (typeof e === 'string') return e;
    const arr = e?.formErrors as string[] | undefined;
    return arr && arr.length ? arr.join(', ') : '';
  };
  const fe = (name: string) => form?.error?.fieldErrors?.[name]?.[0] as string | undefined;

  let brand: string = '';
  let colorNumber: string = '';
  let colorName: string = '';
  let quantity = '';
  let status: string = '';
  let wishlist: boolean = false;
  let notes: string = '';
  let continueAdd = false;

  onMount(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const g = (k: string) => sp.get(k);
      brand = g('brand') ?? brand;
      colorNumber = g('colorNumber') ?? colorNumber;
      colorName = g('colorName') ?? colorName;
      if (g('quantity') !== null) quantity = String(g('quantity'));
      status = g('status') ?? status;
      const wl = g('wishlist');
      if (wl !== null) wishlist = wl === 'on' || wl === 'true' || wl === '1';
      notes = g('notes') ?? notes;
    } catch {}
  });

  const statusOptions = [
    { value: 'unused', label: '未使用' },
    { value: 'used', label: '使用中' },
    { value: 'low', label: '残りわずか' }
  ];
</script>

<main>
  <Breadcrumb
    items={[
      { label: 'ホーム', href: '/' },
      { label: '在庫', href: '/inventory' },
      { label: '刺繍糸を追加' }
    ]}
    ariaLabel="breadcrumb"
    activeColor={CCLVividColor.MELON_GREEN}
  />
  <h1>刺繍糸を追加</h1>

  <form
    method="POST"
    use:enhance={({ form }) => {
      return async ({ result, update }) => {
        if (result.type === 'success') {
          // 続けて追加: 値リセット
          brand = '';
          colorNumber = '';
          colorName = '';
          quantity = '';
          status = '';
          wishlist = false;
          notes = '';
          continueAdd = false;
          toast.success('追加しました。続けて登録できます');
          return;
        }
        await update();
      };
    }}
  >
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
      <Input label="色番号" bind:value={colorNumber} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="colorNumber" value={colorNumber} />
      {#if fe('colorNumber')}<div class="mt-1 text-sm text-red-600">{fe('colorNumber')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input label="色名" bind:value={colorName} borderColor={CCLVividColor.MELON_GREEN} />
      <input type="hidden" name="colorName" value={colorName} />
      {#if fe('colorName')}<div class="mt-1 text-sm text-red-600">{fe('colorName')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Input
        label="数量"
        type="number"
        bind:value={quantity}
        borderColor={CCLVividColor.MELON_GREEN}
      />
      <input type="hidden" name="quantity" value={quantity} />
      {#if fe('quantity')}<div class="mt-1 text-sm text-red-600">{fe('quantity')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Select
        label="状態"
        options={statusOptions}
        bind:value={status}
        borderColor={CCLVividColor.MELON_GREEN}
      />
      <input type="hidden" name="status" value={status} />
      {#if fe('status')}<div class="mt-1 text-sm text-red-600">{fe('status')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Checkbox
        label="欲しいものリストに追加"
        bind:checked={wishlist}
        color={CCLVividColor.MELON_GREEN}
      />
      <input type="hidden" name="wishlist" value={wishlist ? 'on' : 'off'} />
      {#if fe('wishlist')}<div class="mt-1 text-sm text-red-600">{fe('wishlist')}</div>{/if}
    </FormGroup>
    <FormGroup>
      <Textarea
        label="メモ（任意）"
        rows={3}
        placeholder="自由記述（最大1000文字）"
        bind:value={notes}
        borderColor={CCLVividColor.MELON_GREEN}
      />
      <input type="hidden" name="notes" value={notes} />
      {#if fe('notes')}<div class="mt-1 text-sm text-red-600">{fe('notes')}</div>{/if}
    </FormGroup>
    <input type="hidden" name="continue" value={continueAdd ? 'on' : 'off'} />
    <div class="actions">
      <Button label="追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} onClick={() => (continueAdd = false)} />
      <Button label="追加して続ける" bgColor={CCLVividColor.MELON_GREEN} onClick={() => (continueAdd = true)} />
    </div>
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
  .actions { display: flex; gap: .5rem; }
</style>
