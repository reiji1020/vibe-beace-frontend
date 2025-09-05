<script lang="ts">
  import { Tabs, TabPanel, Alert, CCLVividColor } from 'cclkit4svelte';
  import InventoryTabContent from '$lib/components/InventoryTabContent.svelte';
  import { toast } from '$lib/ui/toast';
  import type { InventoryCardItem } from '$lib/types';

  export let data;

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';
  const labelMap: Record<MaterialKey, string> = {
    threads: '刺繍糸',
    beads: 'ビーズ',
    cutCloths: 'カットクロス',
    xStitchCloths: 'クロスステッチ布'
  };

  $: counts = {
    threads: data.threads?.length ?? 0,
    beads: data.beads?.length ?? 0,
    cutCloths: data.cutCloths?.length ?? 0,
    xStitchCloths: data.xStitchCloths?.length ?? 0
  } as const;

  const initial: MaterialKey = (data.type as MaterialKey) || 'threads';
  $: tabOrder = (['threads', 'beads', 'cutCloths', 'xStitchCloths'] as MaterialKey[]).sort(
    (a, b) => (a === initial ? -1 : b === initial ? 1 : 0)
  );
  let searchQuery = data.query || '';
  let filterStatus: 'all' | 'unused' | 'used' | 'low' = (data.status as any) || 'all';
  let filterBrand = data.brand || '';
  let filterWishlist = !!data.wishlist;
  let sort = (data.sort as string) || 'default';

  let showAlert = false;
  let alertMessage = '';
  let alertType: 'success' | 'error' | 'warning' | 'info' = 'info';

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
    <Alert message={alertMessage} type={alertType} dismissible={true} />
  </div>
{/if}

<section class="filter-panel">
  <Tabs>
    {#each tabOrder as mt}
      <TabPanel label={labelMap[mt]} color={CCLVividColor.GRAPE_PURPLE}>
        <InventoryTabContent
          {mt}
          {counts}
          threads={data.threads}
          beads={data.beads}
          cutCloths={data.cutCloths}
          xStitchCloths={data.xStitchCloths}
          onDelete={handleDelete}
          bind:searchQuery
          bind:filterStatus
          bind:filterBrand
          bind:filterWishlist
          bind:sort
        />
      </TabPanel>
    {/each}
  </Tabs>
</section>

<div class="api-docs-link">
  <a href="/api-docs/swagger" aria-label="Swagger API Docs">API Docs (Swagger)</a>
  <span class="hint">（開発者向け）</span>
</div>

<style>
  .alert-container {
    margin: 1rem 2rem;
  }
  .filter-panel {
    margin: 2rem;
    padding: 1rem;
    border: none;
    background: transparent;
  }
  /* filter UI styles are defined in InventoryTabContent */
  /* grid styles are defined in InventoryTabContent */
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

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .alert-container {
      margin: 0.75rem;
    }
    .filter-panel {
      margin: 0.75rem;
      padding: 0.5rem;
    }
    .api-docs-link {
      margin: 0 0.75rem 0.5rem;
      font-size: 0.75rem;
    }
  }
</style>
