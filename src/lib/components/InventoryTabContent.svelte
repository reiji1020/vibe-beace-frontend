<script lang="ts">
  import { Button, CCLVividColor, Pagination, Skeleton } from 'cclkit4svelte';
  import MaterialCard from '$lib/components/MaterialCard.svelte';
  import InventoryFilterForm from '$lib/components/InventoryFilterForm.svelte';
  import InventoryShoppingTable from '$lib/components/InventoryShoppingTable.svelte';
  import type { InventoryCardItem, Thread, Bead, CutCloth, XStitchCloth } from '$lib/types';
  import { navigating } from '$app/stores';

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';

  export let mt: MaterialKey;
  /** 各資材データ配列（DB行: id付与）。 */
  export let threads: (Thread & { id: number })[] = [];
  export let beads: (Bead & { id: number })[] = [];
  export let cutCloths: (CutCloth & { id: number })[] = [];
  export let xStitchCloths: (XStitchCloth & { id: number })[] = [];
  /** 削除ボタン押下時のハンドラ。 */
  export let onDelete: (id: number, type: InventoryCardItem['type']) => void;

  /** 検索・絞り込み・並び替えのUI状態。 */
  export let searchQuery = '';
  export let filterStatus: 'all' | 'unused' | 'used' | 'low' = 'all';
  export let filterBrand = '';
  export let filterWishlist = false;
  export let sort = 'default';

  let showFilters = true;
  if (typeof window !== 'undefined') {
    showFilters = window.innerWidth >= 640;
  }

  $: displayItems =
    mt === 'threads'
      ? threads
      : mt === 'beads'
        ? beads
        : mt === 'cutCloths'
          ? cutCloths
          : xStitchCloths;
  $: wishlistItems = (displayItems || []).filter((x) => x?.wishlist === true);
  $: currentFilteredCount = filterWishlist ? wishlistItems.length : (displayItems || []).length;
  let showShoppingTable = false;

  // Client-side pagination (initial, can later be server-backed)
  let page = 1;
  let perPage = 24;
  $: baseItems = filterWishlist ? wishlistItems : displayItems;
  $: resetKey = `${mt}|${filterWishlist ? 'w' : 'a'}|${(displayItems || []).length}`;
  $: if (resetKey) {
    // Reset to first page when tab, wishlist mode, or item set size changes
    page = 1;
  }
  $: total = (baseItems || []).length;
  $: pageCount = Math.max(1, Math.ceil(total / perPage));
  $: start = (page - 1) * perPage;
  $: end = start + perPage;
  $: pagedItems = (baseItems || []).slice(start, end);

  // Loading state (during in-app navigation under /inventory)
  $: loading = Boolean($navigating && $navigating.to?.url?.pathname?.startsWith('/inventory'));
</script>

<div class="add-button-container">
  {#if mt === 'threads'}
    <a href="/inventory/add/thread">
      <Button label="刺繍糸を追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
    </a>
  {:else if mt === 'beads'}
    <a href="/inventory/add/bead">
      <Button label="ビーズを追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
    </a>
  {:else if mt === 'cutCloths'}
    <a href="/inventory/add/cut-cloth">
      <Button label="カットクロスを追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
    </a>
  {:else}
    <a href="/inventory/add/xstitch-cloth">
      <Button label="クロスステッチ布を追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
    </a>
  {/if}
</div>

<div class="filter-toggle">
  <Button
    label={showFilters ? '絞り込みを閉じる' : '絞り込みを開く'}
    bgColor={CCLVividColor.MELON_GREEN}
    onClick={() => (showFilters = !showFilters)}
    aria-expanded={showFilters}
  />
</div>
{#if showFilters}
  <InventoryFilterForm
    {mt}
    bind:searchQuery
    bind:filterStatus
    bind:filterBrand
    bind:filterWishlist
    bind:sort
  />
{/if}

<div class="summary">
  <span>現在の表示: {currentFilteredCount} 件</span>
  {#if filterWishlist}
    <span class="hint">（Wishlist絞り込み中）</span>
  {/if}
</div>

{#if filterWishlist}
  <div class="shopping-actions">
    <Button
      label={showShoppingTable
        ? '買い物リスト（表）を隠す'
        : '欲しいものリストを買い物リストとして表示'}
      bgColor={CCLVividColor.GRAPE_PURPLE}
      onClick={() => (showShoppingTable = !showShoppingTable)}
    />
  </div>
{/if}

{#if filterWishlist && showShoppingTable}
  <InventoryShoppingTable {mt} items={wishlistItems} />
{/if}

<div class="card-container">
  {#if loading}
    {#each Array(6) as _, i}
      <div class="skeleton-card" aria-hidden="true">
        <Skeleton variant="rect" width="100%" height="100px" radius="12px" />
        <div class="skeleton-body">
          <Skeleton variant="text" width="80%" height="16px" lines={1} />
          <Skeleton variant="text" width="60%" height="14px" lines={1} />
          <Skeleton variant="text" width="40%" height="14px" lines={1} />
        </div>
      </div>
    {/each}
  {:else if currentFilteredCount === 0}
    <div class="empty-box" style="grid-column: 1 / -1;">このタブに表示できる項目がありません</div>
  {/if}
  {#if !loading}
    {#if mt === 'threads'}
      {#each pagedItems as thread}
        <MaterialCard material={{ ...thread, type: 'thread' } as any} {onDelete} />
      {/each}
    {:else if mt === 'beads'}
      {#each pagedItems as bead}
        <MaterialCard material={{ ...bead, type: 'bead' } as any} {onDelete} />
      {/each}
    {:else if mt === 'cutCloths'}
      {#each pagedItems as cutCloth}
        <MaterialCard material={{ ...cutCloth, type: 'cutCloth' } as any} {onDelete} />
      {/each}
    {:else}
      {#each pagedItems as xsc}
        <MaterialCard material={{ ...xsc, type: 'xStitchCloth' } as any} {onDelete} />
      {/each}
    {/if}
  {/if}
</div>

{#if !loading && total > perPage}
  <div class="pagination-wrap">
    <Pagination
      page={page}
      total={total}
      perPage={perPage}
      showPrevNext={true}
      showFirstLast={true}
      ariaLabel="ページネーション"
      on:change={(e) => (page = e.detail.page)}
    />
  </div>
{/if}

<style>
  .add-button-container {
    display: flex;
    justify-content: center;
    margin: 0 2rem 1.5rem;
  }

  

  .summary {
    margin: 1rem 2rem;
    color: #555;
    font-size: 0.9rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .summary .hint {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .shopping-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 2rem;
  }

  .filter-toggle {
    display: flex;
    justify-content: center;
    margin: 0 2rem 0.5rem;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 2rem 3rem;
  }
  .skeleton-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .skeleton-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .empty-box {
    padding: 16px;
    border-radius: 8px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    text-align: center;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin: -1rem 2rem 2rem;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .add-button-container {
      margin: 0 0.75rem 0.75rem;
    }
    .filter-toggle {
      margin: 0 0.75rem 0.5rem;
    }
    .summary {
      margin: 0.5rem 0.75rem;
      font-size: 0.85rem;
    }
    .card-container {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin: 0.75rem;
    }
    .filter-toggle :global(button) {
      width: auto;
    }
    .pagination-wrap {
      margin: 0 0.75rem 1rem;
    }
  }
</style>
