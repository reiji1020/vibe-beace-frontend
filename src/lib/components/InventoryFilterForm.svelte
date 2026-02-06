<script lang="ts">
  import { Button, Input, Checkbox, Select, FormGroup, CCLVividColor, CCLPastelColor } from 'cclkit4svelte';

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';

  /** 対象の資材区分。 */
  export let mt: MaterialKey;
  /** 検索キーワード。 */
  export let searchQuery = '';
  /** 状態フィルタ。 */
  export let filterStatus: 'all' | 'unused' | 'used' | 'low' = 'all';
  /** ブランド（threads/beadsのみ有効）。 */
  export let filterBrand = '';
  /** Wishlistのみ表示。 */
  export let filterWishlist = false;
  /** 並び順キー。 */
  export let sort = 'default';

  /** 資材ごとの状態選択肢。 */
  const statusOptionsFor = (m: MaterialKey) =>
    m === 'cutCloths' || m === 'xStitchCloths'
      ? (['all', 'unused', 'used'] as const)
      : (['all', 'unused', 'used', 'low'] as const);

  const brandApplicable = mt === 'threads' || mt === 'beads';
  let formEl: HTMLFormElement | null = null;
</script>

<form class="search-form" method="GET" aria-label="検索と絞り込み" bind:this={formEl}>
  <!-- Hidden mirrors because cclkit Input/Checkbox do not forward name -->
  <input type="hidden" name="type" value={mt} />
  <input type="hidden" name="query" value={searchQuery} />
  <input type="hidden" name="brand" value={brandApplicable ? filterBrand : ''} />
  {#if filterWishlist}
    <input type="hidden" name="wishlist" value="on" />
  {/if}

  <FormGroup>
    <Input
      type="text"
      placeholder="キーワード検索（ブランド/色番号/色名など）"
      bind:value={searchQuery}
      borderColor={CCLVividColor.MELON_GREEN}
      label="キーワード"
    />
  </FormGroup>
  <FormGroup>
    <Select
      label="状態"
      options={statusOptionsFor(mt).map((opt) => ({
        value: opt,
        label:
          opt === 'all'
            ? 'すべての状態'
            : opt === 'unused'
              ? '未使用'
              : opt === 'used'
                ? '使用中'
                : '残りわずか'
      }))}
      bind:value={filterStatus}
      id={`status-${mt}`}
      borderColor={CCLVividColor.MELON_GREEN}
    />
  </FormGroup>
  {#if brandApplicable}
    <FormGroup>
      <Input
        type="text"
        placeholder="ブランド（糸/ビーズのみ）"
        bind:value={filterBrand}
        borderColor={CCLVividColor.MELON_GREEN}
        label="ブランド"
      />
    </FormGroup>
  {/if}
  <div class="wishlist-filter">
    <FormGroup>
      <Checkbox
        bind:checked={filterWishlist}
        color={CCLVividColor.MELON_GREEN}
        label="ウィッシュリストのみ"
      />
    </FormGroup>
  </div>
  <FormGroup>
    <Select
      label="並び順"
      options={[
        { value: 'default', label: '並び順（デフォルト）' },
        { value: 'quantity_asc', label: '数量 少ない順' },
        { value: 'quantity_desc', label: '数量 多い順' },
        { value: 'brand_asc', label: 'ブランド 昇順（該当資材）' },
        { value: 'brand_desc', label: 'ブランド 降順（該当資材）' }
      ]}
      bind:value={sort}
      id={`sort-${mt}`}
      borderColor={CCLVividColor.MELON_GREEN}
    />
  </FormGroup>
  <FormGroup>
    <div class="actions">
      <Button
        label="適用"
        bgColor={CCLVividColor.MELON_GREEN}
        onClick={() => formEl?.requestSubmit()}
      />
      <Button
        label="リセット"
        bgColor={CCLPastelColor.LEMON_YELLOW}
        onClick={() => (location.href = '/inventory')}
      />
    </div>
  </FormGroup>
</form>

<style>
  .search-form {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    width: 100%;
    padding: var(--space-4);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    background: var(--surface-2);
    box-shadow: var(--shadow-sm);
    justify-content: stretch;
    align-items: flex-end;
    margin: 0 auto var(--space-4);
  }

  .search-form :global(.input-wrapper),
  .search-form :global(.select-wrapper),
  .search-form :global(.checkboxWrapper),
  .search-form :global(.formGroupWrapper) {
    min-width: 0;
    width: 100%;
    margin-bottom: 0;
  }

  .search-form .wishlist-filter {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 0;
  }

  .search-form .actions {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .search-form {
      gap: var(--space-2);
      align-items: center;
      margin: 0 0 var(--space-3);
      padding: var(--space-3);
    }
    .search-form .wishlist-filter {
      justify-content: flex-start;
    }
    .search-form .actions {
      justify-content: stretch;
      width: 100%;
      flex-direction: column;
    }
  }
</style>
