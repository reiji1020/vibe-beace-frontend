<script lang="ts">
  import { Button, Input, Checkbox, Select } from 'cclkit4svelte';
  import { CCLVividColor, CCLPastelColor } from 'cclkit4svelte';

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';

  export let mt: MaterialKey;
  export let searchQuery = '';
  export let filterStatus: 'all' | 'unused' | 'used' | 'low' = 'all';
  export let filterBrand = '';
  export let filterWishlist = false;
  export let sort = 'default';

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

  <Input
    type="text"
    placeholder="キーワード検索（ブランド/色番号/色名など）"
    bind:value={searchQuery}
    borderColor={CCLVividColor.MELON_GREEN}
    label="キーワード"
  />
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
  {#if brandApplicable}
    <Input
      type="text"
      placeholder="ブランド（糸/ビーズのみ）"
      bind:value={filterBrand}
      borderColor={CCLVividColor.MELON_GREEN}
      label="ブランド"
    />
  {/if}
  <div class="wishlist-filter">
    <Checkbox
      bind:checked={filterWishlist}
      color={CCLVividColor.MELON_GREEN}
      label="ウィッシュリストのみ"
    />
  </div>
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
  <Button
    label="適用"
    bgColor={CCLVividColor.MELON_GREEN}
    onClick={() => formEl?.requestSubmit()}
  />
  <Button
    label="リセット"
    bgColor={CCLPastelColor.CLOUD_GREY}
    onClick={() => (location.href = '/inventory')}
  />
</form>

<style>
  .search-form {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: flex-end;
    margin: 0 auto 1rem;
  }

  .search-form :global(.input-wrapper),
  .search-form :global(.select-wrapper),
  .search-form :global(.checkboxWrapper) {
    min-width: 220px;
  }

  .search-form .wishlist-filter {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 220px;
  }
</style>
