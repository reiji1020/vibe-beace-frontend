<script lang="ts">
  import { toast, Tooltip, Badge, CCLVividColor } from 'cclkit4svelte';
  import type { InventoryCardItem } from '$lib/types';
  import { baseEndpointForType } from '$lib/utils/endpoints';
  /** 表示する在庫カードのデータ。 */
  export let material: InventoryCardItem;
  /** 削除ボタン押下時のハンドラ。 */
  export let onDelete: (id: number, type: InventoryCardItem['type']) => void;

  let title: string;
  let details: string;

  function getStatusLabel(status: string | null | undefined): string {
    switch (status) {
      case 'unused':
        return '未使用';
      case 'used':
        return '使用中';
      case 'low':
        return '残りわずか';
      default:
        return 'N/A';
    }
  }

  function statusColor(status: string | null | undefined) {
    switch (status) {
      case 'unused':
        return CCLVividColor.MELON_GREEN;
      case 'used':
        return CCLVividColor.GRAPE_PURPLE;
      case 'low':
        return CCLVividColor.GRAPE_PURPLE;
      default:
        return CCLVividColor.WRAP_GREY;
    }
  }

  $: {
    switch (material.type) {
      case 'thread':
        title = `${material.brand} ${material.colorNumber}`;
        details = `色名: ${material.colorName || 'N/A'}`;
        break;
      case 'bead':
        title = `${material.brand} ${material.itemCode}`;
        details = `サイズ: ${material.size}\n色名: ${material.colorName || 'N/A'}`;
        break;
      case 'cutCloth':
        title = `${material.brand ? material.brand + ' ' : ''}${material.fabricType} ${material.pattern}`;
        details = `サイズ: ${material.size}`;
        break;
      case 'xStitchCloth':
        title = `${material.brand ? material.brand + ' ' : ''}${material.count}ct ${material.color}`;
        details = `サイズ: ${material.size}`;
        break;
    }
  }

  function handleDelete() {
    onDelete(material.id, material.type);
  }

  async function toggleWishlist() {
    const endpoint = `${baseEndpointForType(material.type)}/${material.id}/wishlist`;

    const next = !material.wishlist;
    const prev = material.wishlist;
    material.wishlist = next;
    try {
      const csrf =
        document.cookie
          .split('; ')
          .find((c) => c.startsWith('csrf='))
          ?.split('=')[1] ?? '';
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({ wishlist: next })
      });
      if (!res.ok) {
        material.wishlist = prev;
        const j = await res.json().catch(() => ({}));
        console.error('Failed to toggle wishlist', j.error || res.statusText);
        const msg =
          res.status === 403
            ? '不正な操作です'
            : j.error
              ? String(j.error)
              : 'Wishlistの更新に失敗しました';
        showToast(msg, 'error');
      } else {
        const j = await res.json().catch(() => null);
        if (j && j.success && j.data) {
          material = j.data;
        }
        showToast(next ? 'Wishlistに追加しました' : 'Wishlistを解除しました', 'success');
      }
    } catch (e) {
      material.wishlist = prev;
      console.error('Error toggling wishlist', e);
      showToast('通信エラーが発生しました', 'error');
    }
  }

  function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    if (type === 'success') toast.success(message);
    else if (type === 'error') toast.error(message);
    else if (type === 'warning') toast.warning(message);
    else toast.info(message);
  }
</script>

<div class="material-card">
  <div class="card-actions-left">
    <Tooltip text="編集">
      <a
        href={`/inventory/update/${material.type === 'thread' ? 'thread' : material.type === 'bead' ? 'bead' : material.type === 'cutCloth' ? 'cut-cloth' : 'xstitch-cloth'}/${material.id}`}
        class="edit-button"
        aria-label="編集"
      >
        <svg
          class="icon"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 25.3343V32H6.66574L26.3252 12.3405L19.6595 5.67477L0 25.3343ZM31.4801 7.18567C32.1733 6.49243 32.1733 5.37259 31.4801 4.67935L27.3207 0.519928C26.6274 -0.173309 25.5076 -0.173309 24.8143 0.519928L21.5615 3.77281L28.2272 10.4385L31.4801 7.18567Z"
          />
        </svg>
      </a>
    </Tooltip>
    <Tooltip text={material.wishlist ? 'Wishlist解除' : 'Wishlist登録'}>
      <button
        class="wishlist-button"
        on:click|preventDefault={toggleWishlist}
        aria-label={material.wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={material.wishlist}
      >
        <span class:wished={material.wishlist} aria-hidden="true">★</span>
      </button>
    </Tooltip>
  </div>
  <div class="card-actions-right">
    <Tooltip text="削除">
      <button class="delete-button" on:click={handleDelete} aria-label="削除">&times;</button>
    </Tooltip>
  </div>
  <div class="card-header">
    <div class="header-text">
      <h2>{title}</h2>
      <div class="header-badges">
        <Badge
          color={statusColor(material.status)}
          variant="outline"
          size="sm"
          ariaLabel={`状態: ${getStatusLabel(material.status)}`}
          label={getStatusLabel(material.status)}
        />
      </div>
    </div>
  </div>
  <div class="card-body">
    <p>{details}</p>
    <div class="meta-row" aria-label="メタ情報">
      <Badge
        color={CCLVividColor.WRAP_GREY}
        variant="outline"
        size="sm"
        ariaLabel="数量"
        label={`数量: ${material.quantity}`}
      />
    </div>
    {#if material.notes}
      <p class="notes" title={material.notes}>{material.notes}</p>
    {/if}
  </div>
</div>

<style>
  .material-card {
    --card-border: #e5e7eb;
    --card-hover: #d1d5db;
    --card-bg: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 2.75rem 1rem 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    background:
      radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.9), transparent 60%), var(--card-bg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transition:
      transform 120ms ease,
      box-shadow 160ms ease,
      border-color 120ms ease;
  }

  .material-card:hover {
    transform: translateY(-2px);
    border-color: var(--card-hover);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .card-actions-left,
  .card-actions-right {
    position: absolute;
    top: 5px;
    display: flex;
    gap: 4px;
  }
  .card-actions-left {
    left: 5px;
  }
  .card-actions-right {
    right: 5px;
  }

  .edit-button,
  .delete-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }

  .wishlist-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    font-size: 18px;
    line-height: 1;
    color: #999;
  }

  .wishlist-button .wished {
    color: var(--pineapple-yellow, #ed9126);
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .edit-button {
    color: var(--melon-green);
  }
  .edit-button:hover {
    color: var(--melon-green);
  }

  .delete-button:hover {
    color: #f00;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    gap: 0.75rem; /* アイコンとの間隔を少し広く */
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    text-align: center;
    flex: 1;
    width: 100%;
  }
  .card-header h2 {
    margin: 0;
    font-size: 1.05rem;
    color: #1f2937;
    line-height: 1.2;
  }
  .header-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .card-body p {
    white-space: pre-wrap; /* Preserve newlines */
    font-size: 0.9rem;
    color: #4b5563;
  }

  .meta-row {
    display: flex;
    gap: 6px;
    margin-top: 8px;
    flex-wrap: wrap;
  }
  .notes {
    margin-top: 8px;
    color: #6b7280;
    font-size: 0.85rem;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: pre-wrap;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .material-card {
      padding: 2.25rem 0.75rem 0.75rem;
    }
    .card-actions-left,
    .card-actions-right {
      top: 2px;
      gap: 2px;
    }
    .wishlist-button {
      font-size: 20px;
      padding: 8px;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
    .card-header h2 {
      font-size: 1rem;
    }
    .type-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
    }
  }
</style>
