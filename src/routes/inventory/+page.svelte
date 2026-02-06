<script lang="ts">
  import { Tabs, TabPanel, Alert, CCLVividColor, Dialog, Button, toast } from 'cclkit4svelte';
  import { baseEndpointForType } from '$lib/utils/endpoints';
  import InventoryTabContent from '$lib/components/InventoryTabContent.svelte';
  
  import type { InventoryCardItem } from '$lib/types';

  export let data;

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';
  const labelMap: Record<MaterialKey, string> = {
    threads: '刺繍糸',
    beads: 'ビーズ',
    cutCloths: 'カットクロス',
    xStitchCloths: 'クロスステッチ布'
  };

  

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
  let showDeleteDialog = false;
  let pendingDelete: { id: number; type: InventoryCardItem['type'] } | null = null;
  let deleting = false;

  function handleDelete(id: number, type: InventoryCardItem['type']) {
    pendingDelete = { id, type };
    showDeleteDialog = true;
  }

  async function confirmDelete() {
    if (!pendingDelete || deleting) return;
    deleting = true;
    const { id, type } = pendingDelete;

    const apiEndpoint = `${baseEndpointForType(type)}/${id}`;

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

      showDeleteDialog = false;
      pendingDelete = null;
      deleting = false;
      location.reload();
    } else {
      let msg = '削除に失敗しました';
      try {
        const errorData = await response.json();
        msg =
          response.status === 403
            ? '不正な操作です'
            : `削除に失敗しました: ${errorData.error || response.statusText}`;
      } catch {
        msg = `削除に失敗しました: ${response.statusText}`;
      }
      alertMessage = msg;
      alertType = 'error';
      showAlert = true;
      setTimeout(() => (showAlert = false), 5000);
      toast.error(msg);
      deleting = false;
    }
  }

  function cancelDelete() {
    showDeleteDialog = false;
    pendingDelete = null;
  }

  function handleDialogClose() {
    if (deleting) return;
    cancelDelete();
  }
</script>

<div class="inventory-page">
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

</div>

<style>
  .inventory-page {
    width: 100%;
    max-width: var(--page-max-width);
    margin: var(--space-8) auto var(--space-4);
    padding: 0 var(--space-4);
  }

  .alert-container {
    margin: 0 0 var(--space-4);
  }
  .filter-panel {
    margin: 0;
    padding: var(--space-4);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    box-shadow: var(--shadow-sm);
  }
  
  .api-docs-link {
    margin: var(--space-3) var(--space-2) 0;
    font-size: 0.8rem;
    color: var(--text-2);
  }
  .api-docs-link a {
    color: inherit;
    text-decoration: underline dotted;
  }
  .api-docs-link a:hover {
    color: var(--text-1);
  }
  .api-docs-link .hint {
    margin-left: 6px;
  }

  @media (max-width: 640px) {
    .inventory-page {
      margin: var(--space-4) auto var(--space-3);
      padding: 0 var(--space-3);
    }

    .alert-container {
      margin: 0 0 var(--space-3);
    }
    .filter-panel {
      padding: var(--space-3);
    }
    .api-docs-link {
      margin: var(--space-2) var(--space-2) 0;
      font-size: 0.75rem;
    }
  }
</style>

<Dialog
  open={showDeleteDialog}
  title="削除の確認"
  borderColor={CCLVividColor.GRAPE_PURPLE}
  closeOnEsc={true}
  closeOnOutside={true}
  on:close={handleDialogClose}
>
  <p>
    この資材を削除しますか？この操作は取り消せません。
  </p>
  <svelte:fragment slot="footer">
    <Button label="キャンセル" bgColor={CCLVividColor.WRAP_GREY} onClick={cancelDelete} />
    <Button
      label={deleting ? '削除中…' : '削除する'}
      bgColor={CCLVividColor.GRAPE_PURPLE}
      onClick={confirmDelete}
      disabled={deleting}
    />
  </svelte:fragment>
</Dialog>
