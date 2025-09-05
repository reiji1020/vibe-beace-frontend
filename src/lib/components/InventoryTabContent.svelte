<script lang="ts">
  import { Button, CCLVividColor } from 'cclkit4svelte';
  import MaterialCard from '$lib/components/MaterialCard.svelte';
  import InventoryFilterForm from '$lib/components/InventoryFilterForm.svelte';
  import InventoryShoppingTable from '$lib/components/InventoryShoppingTable.svelte';
  import type { InventoryCardItem } from '$lib/types';

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';

  /** アクティブな資材タブ。 */
  export let mt: MaterialKey;
  /** 全タブの件数サマリ。 */
  export let counts: { threads: number; beads: number; cutCloths: number; xStitchCloths: number };
  /** 各資材データ配列。 */
  export let threads: any[] = [];
  export let beads: any[] = [];
  export let cutCloths: any[] = [];
  export let xStitchCloths: any[] = [];
  /** 削除ボタン押下時のハンドラ。 */
  export let onDelete: (id: number, type: InventoryCardItem['type']) => void;

  /** 検索・絞り込み・並び替えのUI状態。 */
  export let searchQuery = '';
  export let filterStatus: 'all' | 'unused' | 'used' | 'low' = 'all';
  export let filterBrand = '';
  export let filterWishlist = false;
  export let sort = 'default';

  // フィルタの折りたたみ（モバイル初期: 閉）
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
  {#if currentFilteredCount === 0}
    <div class="empty-box" style="grid-column: 1 / -1;">このタブに表示できる項目がありません</div>
  {/if}
  {#if mt === 'threads'}
    {#each threads as thread}
      <MaterialCard material={{ ...thread, type: 'thread' } as any} {onDelete} />
    {/each}
  {:else if mt === 'beads'}
    {#each beads as bead}
      <MaterialCard material={{ ...bead, type: 'bead' } as any} {onDelete} />
    {/each}
  {:else if mt === 'cutCloths'}
    {#each cutCloths as cutCloth}
      <MaterialCard material={{ ...cutCloth, type: 'cutCloth' } as any} {onDelete} />
    {/each}
  {:else}
    {#each xStitchCloths as xsc}
      <MaterialCard material={{ ...xsc, type: 'xStitchCloth' } as any} {onDelete} />
    {/each}
  {/if}
</div>

<style>
  .add-button-container {
    display: flex;
    justify-content: center;
    margin: 0 2rem 1.5rem;
  }

  /* filter form styles live in InventoryFilterForm */

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
  .empty-box {
    padding: 16px;
    border-radius: 8px;
    background: #f3f4f6; /* gray-100 */
    border: 1px solid #e5e7eb; /* gray-200 */
    color: #6b7280; /* gray-500 */
    text-align: center;
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
  }
</style>
