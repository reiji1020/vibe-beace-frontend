<script lang="ts">
  import { RadioButton, Button, Alert, Input, Checkbox } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';
  import MaterialCard from '$lib/components/MaterialCard.svelte';
  import { toast } from '$lib/ui/toast';
  import type { InventoryCardItem } from '$lib/types';

  export let data;

  const materialTypes = [
    { id: 'threads', label: '刺繍糸' },
    { id: 'beads', label: 'ビーズ' },
    { id: 'cutCloths', label: 'カットクロス' },
    { id: 'xStitchCloths', label: 'クロスステッチ布' }
  ];

  $: counts = {
    threads: data.threads?.length ?? 0,
    beads: data.beads?.length ?? 0,
    cutCloths: data.cutCloths?.length ?? 0,
    xStitchCloths: data.xStitchCloths?.length ?? 0
  } as const;

  $: materialTypesWithCounts = materialTypes.map((m) => ({
    id: m.id,
    label: `${m.label} (${counts[m.id as keyof typeof counts]})`
  }));

  let selectedMaterial = (data.type as string) || 'threads';
  let searchQuery = data.query || '';
  let filterStatus: 'all' | 'unused' | 'used' | 'low' = (data.status as any) || 'all';
  let filterBrand = data.brand || '';
  let filterWishlist = !!data.wishlist;
  let sort = (data.sort as string) || 'default';

  $: brandApplicable = selectedMaterial === 'threads' || selectedMaterial === 'beads';
  $: statusOptions =
    selectedMaterial === 'cutCloths' || selectedMaterial === 'xStitchCloths'
      ? ['all', 'unused', 'used']
      : ['all', 'unused', 'used', 'low'];
  $: if (!brandApplicable) filterBrand = '';

  let showAlert = false;
  let alertMessage = '';
  let alertType: 'success' | 'error' | 'warning' | 'info' = 'info';

  // helper to coerce server items into InventoryCardItem for UI
  const asCard = (obj: any, type: InventoryCardItem['type']) =>
    ({ ...obj, type }) as unknown as InventoryCardItem;

  // toastはグローバル（+layout.svelte）に移行済み

  async function handleDelete(id: number, type: InventoryCardItem['type']) {
    let apiEndpoint = '';

    const base =
      type === 'thread'
        ? '/api/threads'
        : type === 'bead'
          ? '/api/beads'
          : type === 'cutCloth'
            ? '/api/cut-cloths'
            : '/api/xstitch-cloths';
    apiEndpoint = `${base}/${id}`;

    if (confirm('本当に削除しますか？')) {
      // Read CSRF token from cookie
      const csrf =
        document.cookie
          .split('; ')
          .find((c) => c.startsWith('csrf='))
          ?.split('=')[1] ?? '';
      const response = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        alertMessage = '資材を削除しました。';
        alertType = 'success';
        showAlert = true;
        setTimeout(() => (showAlert = false), 3000);
        toast.success('削除しました');

        // 削除成功後、ページをリロードして最新のデータを取得
        location.reload();
      } else {
        const errorData = await response.json();
        const msg =
          response.status === 403
            ? '不正な操作です'
            : `削除に失敗しました: ${errorData.error || response.statusText}`;
        alertMessage = msg;
        alertType = 'error';
        showAlert = true;
        setTimeout(() => (showAlert = false), 5000);
        toast.error(msg);
      }
    }
  }
</script>

{#if showAlert}
  <div class="alert-container">
    <!-- Note: Based on previous inspection of node_modules/cclkit4svelte/dist/index.js, 'Alert' does not appear to be exported.
				 If a SyntaxError occurs, it might be due to this component not being available in the library. -->
    <Alert message={alertMessage} type={alertType} dismissible={true} />
  </div>
{/if}

<div class="controls-container">
  <div class="radio-group">
    {#each materialTypesWithCounts as material}
      <RadioButton bind:group={selectedMaterial} value={material.id} label={material.label} />
    {/each}
  </div>

  <form class="search-form" method="GET">
    <!-- Hidden mirrors because cclkit Input/Checkbox do not forward name -->
    <input type="hidden" name="type" value={selectedMaterial} />
    <input type="hidden" name="query" value={searchQuery} />
    <input type="hidden" name="brand" value={brandApplicable ? filterBrand : ''} />
    {#if filterWishlist}
      <input type="hidden" name="wishlist" value="on" />
    {/if}

    <Input
      type="text"
      placeholder="キーワード検索（ブランド/色番号/色名など）"
      bind:value={searchQuery}
    />
    <select name="status" bind:value={filterStatus}>
      {#each statusOptions as opt}
        <option value={opt}
          >{opt === 'all'
            ? 'すべての状態'
            : opt === 'unused'
              ? '未使用'
              : opt === 'used'
                ? '使用中'
                : '残りわずか'}</option
        >
      {/each}
    </select>
    {#if brandApplicable}
      <Input type="text" placeholder="ブランド（糸/ビーズのみ）" bind:value={filterBrand} />
    {/if}
    <label class="wishlist-filter">
      <Checkbox bind:checked={filterWishlist} /> wishlistのみ
    </label>
    <select name="sort" bind:value={sort}>
      <option value="default">並び順（デフォルト）</option>
      <option value="quantity_asc">数量 少ない順</option>
      <option value="quantity_desc">数量 多い順</option>
      <option value="brand_asc">ブランド 昇順（該当資材）</option>
      <option value="brand_desc">ブランド 降順（該当資材）</option>
    </select>
    <Button
      label="適用"
      bgColor={CCLVividColor.MELON_GREEN}
      onClick={() => (document.querySelector('.search-form') as HTMLFormElement)?.requestSubmit()}
    />
    <a class="reset-link" href="/inventory" aria-label="フィルタをリセット">リセット</a>
  </form>
</div>

<div class="add-button-container">
  {#if selectedMaterial === 'threads'}
    <a href="/inventory/add/thread">
      <Button
        label="刺繍糸を追加する"
        onClick={() => {}}
        bgColor={CCLVividColor.PINEAPPLE_YELLOW}
      />
    </a>
  {/if}
  {#if selectedMaterial === 'beads'}
    <a href="/inventory/add/bead">
      <Button
        label="ビーズを追加する"
        onClick={() => {}}
        bgColor={CCLVividColor.PINEAPPLE_YELLOW}
      />
    </a>
  {/if}
  {#if selectedMaterial === 'cutCloths'}
    <a href="/inventory/add/cut-cloth">
      <Button
        label="カットクロスを追加する"
        onClick={() => {}}
        bgColor={CCLVividColor.PINEAPPLE_YELLOW}
      />
    </a>
  {/if}
  {#if selectedMaterial === 'xStitchCloths'}
    <a href="/inventory/add/xstitch-cloth">
      <Button
        label="クロスステッチ布を追加する"
        onClick={() => {}}
        bgColor={CCLVividColor.PINEAPPLE_YELLOW}
      />
    </a>
  {/if}
</div>

<div class="search-results-alert">
  {#if filterWishlist}
    <Alert type="info" message="Wishlistのみを表示中" />
  {/if}
  {#if data.query}
    {#if data.threads.length > 0 || data.beads.length > 0 || data.cutCloths.length > 0 || data.xStitchCloths.length > 0}
      <Alert type="success" message={`「${data.query}」の検索結果が見つかりました。`} />
    {:else}
      <Alert type="error" message={`「${data.query}」に一致する資材は見つかりませんでした。`} />
    {/if}
  {/if}
</div>

<div class="api-docs-link">
  <a href="/api-docs/swagger" aria-label="Swagger API Docs">API Docs (Swagger)</a>
  <span class="hint">（開発者向け）</span>
</div>

<div class="summary">
  <span>
    現在の表示: {selectedMaterial === 'threads'
      ? counts.threads
      : selectedMaterial === 'beads'
        ? counts.beads
        : selectedMaterial === 'cutCloths'
          ? counts.cutCloths
          : counts.xStitchCloths} 件
  </span>
</div>

<div class="card-container">
  {#if selectedMaterial === 'threads'}
    {#each data.threads as thread}
      <MaterialCard material={asCard(thread, 'thread')} onDelete={handleDelete} />
    {/each}
  {/if}
  {#if selectedMaterial === 'beads'}
    {#each data.beads as bead}
      <MaterialCard material={asCard(bead, 'bead')} onDelete={handleDelete} />
    {/each}
  {/if}
  {#if selectedMaterial === 'cutCloths'}
    {#each data.cutCloths as cutCloth}
      <MaterialCard material={asCard(cutCloth, 'cutCloth')} onDelete={handleDelete} />
    {/each}
  {/if}
  {#if selectedMaterial === 'xStitchCloths'}
    {#each data.xStitchCloths as xSc}
      <MaterialCard material={asCard(xSc, 'xStitchCloth')} onDelete={handleDelete} />
    {/each}
  {/if}
</div>

<style>
  .alert-container {
    margin: 1rem 2rem;
  }
  .controls-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 2rem;
    gap: 1rem;
  }

  .radio-group {
    display: flex;
    justify-content: center;
    gap: 2rem; /* Add some space between radio buttons */
  }

  .search-form {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
  }
  .reset-link {
    color: #888;
    font-size: 0.85rem;
    text-decoration: underline dotted;
    align-self: center;
  }
  .reset-link:hover {
    color: #555;
  }

  .search-form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .add-button-container {
    display: flex;
    justify-content: center;
    margin: 0 2rem 1rem;
  }
  .search-results-alert {
    margin: 1rem 2rem;
  }
  .summary {
    margin: 0 2rem 0.5rem;
    color: #555;
    font-size: 0.9rem;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 2rem;
  }
  .api-docs-link {
    margin: 0 2rem 0.5rem;
    font-size: 0.8rem;
    color: #888;
  }
  .api-docs-link a {
    color: inherit;
    text-decoration: underline dotted;
  }
  .api-docs-link a:hover {
    color: #555;
  }
  .api-docs-link .hint {
    margin-left: 6px;
  }
</style>
