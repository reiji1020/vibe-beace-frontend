<script lang="ts">
  import { toast } from '$lib/ui/toast';
  import type { InventoryCardItem } from '$lib/types';
  export let material: InventoryCardItem;
  export let onDelete: (id: number, type: InventoryCardItem['type']) => void;

  let title: string;
  let details: string;

  // Helper function to translate status
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

  function getStatusClass(status: string | null | undefined): string {
    switch (status) {
      case 'unused':
        return 'status-badge unused';
      case 'used':
        return 'status-badge used';
      case 'low':
        return 'status-badge low';
      default:
        return 'status-badge neutral';
    }
  }

  $: typeLabel =
    material.type === 'thread'
      ? '刺繍糸'
      : material.type === 'bead'
        ? 'ビーズ'
        : material.type === 'cutCloth'
          ? 'カットクロス'
          : 'クロスステッチ布';

  // Determine content based on material type
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
    const endpointBase =
      material.type === 'thread'
        ? '/api/threads'
        : material.type === 'bead'
          ? '/api/beads'
          : material.type === 'cutCloth'
            ? '/api/cut-cloths'
            : '/api/xstitch-cloths';
    const endpoint = `${endpointBase}/${material.id}/wishlist`;

    const next = !material.wishlist;
    // optimistic update
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
        material.wishlist = prev; // rollback
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
          material = j.data; // sync with server
        }
        showToast(next ? 'Wishlistに追加しました' : 'Wishlistを解除しました', 'success');
      }
    } catch (e) {
      material.wishlist = prev; // rollback
      console.error('Error toggling wishlist', e);
      showToast('通信エラーが発生しました', 'error');
    }
  }

  function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    // use global toast store
    if (type === 'success') toast.success(message);
    else if (type === 'error') toast.error(message);
    else if (type === 'warning') toast.warning(message);
    else toast.info(message);
  }

</script>

<div class="material-card">
  <div class="card-actions">
    <button
      class="wishlist-button"
      on:click|preventDefault={toggleWishlist}
      aria-label={material.wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      title={material.wishlist ? 'Wishlist解除' : 'Wishlist登録'}
    >
      <span class:wished={material.wishlist} aria-hidden="true">★</span>
    </button>
    <a
      href={`/inventory/update/${material.type === 'thread' ? 'thread' : material.type === 'bead' ? 'bead' : material.type === 'cutCloth' ? 'cut-cloth' : 'xstitch-cloth'}/${material.id}`}
      class="edit-button"
      title="編集"
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
    <button class="delete-button" on:click={handleDelete} title="削除">&times;</button>
  </div>
  <div class="card-header">
    <img src="/beace.svg" alt="material icon" class="card-icon" />
    <div class="header-text">
      <h2>{title}</h2>
      <div class="header-badges">
        <span class="type-badge" aria-label={typeLabel}>{typeLabel}</span>
        <span class={getStatusClass(material.status)} aria-label={`状態: ${getStatusLabel(material.status)}`}
          >{getStatusLabel(material.status)}</span
        >
        {#if material.wishlist}
          <span class="wishlist-badge" aria-label="Wishlist 登録中">Wishlist</span>
        {/if}
      </div>
    </div>
  </div>
  <div class="card-body">
    <p>{details}</p>
    <div class="meta-row" aria-label="メタ情報">
      <span class="chip" title="数量">数量: {material.quantity}</span>
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
    --badge-bg: #f3f4f6;
    --badge-fg: #374151;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    background:
      radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.9), transparent 60%),
      var(--card-bg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transition: transform 120ms ease, box-shadow 160ms ease, border-color 120ms ease;
  }

  .material-card:hover {
    transform: translateY(-2px);
    border-color: var(--card-hover);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .card-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    gap: 4px;
  }

  .edit-button,
  .delete-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 5px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }

  .wishlist-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 5px;
    font-size: 16px;
    line-height: 1;
    color: #999;
  }

  .wishlist-button .wished {
    color: #ffb400; /* gold-ish */
  }

  .icon {
    width: 16px;
    height: 16px;
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
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  .header-text { display: flex; flex-direction: column; gap: 6px; }
  .card-header h2 {
    margin: 0;
    font-size: 1.05rem;
    color: #1f2937;
    line-height: 1.2;
  }
  .header-badges { display: flex; gap: 6px; flex-wrap: wrap; }
  .type-badge {
    background: var(--badge-bg);
    color: var(--badge-fg);
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    font-size: 0.72rem;
    padding: 2px 8px;
  }
  .status-badge { border-radius: 6px; padding: 2px 8px; font-size: 0.72rem; border: 1px solid transparent; }
  .status-badge.unused { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
  .status-badge.used { background: #f3f4f6; color: #374151; border-color: #e5e7eb; }
  .status-badge.low { background: #fef3c7; color: #92400e; border-color: #fde68a; }
  .status-badge.neutral { background: var(--badge-bg); color: var(--badge-fg); border-color: #e5e7eb; }
  .wishlist-badge { background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; border-radius: 6px; padding: 2px 8px; font-size: 0.72rem; }

  .card-body p {
    white-space: pre-wrap; /* Preserve newlines */
    font-size: 0.9rem;
    color: #4b5563;
  }

  /* toast display is handled by parent via event */
  .meta-row { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
  .chip { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; border-radius: 999px; padding: 2px 10px; font-size: 0.75rem; }
  .notes {
    margin-top: 8px;
    color: #6b7280;
    font-size: 0.85rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: pre-wrap;
  }
</style>
