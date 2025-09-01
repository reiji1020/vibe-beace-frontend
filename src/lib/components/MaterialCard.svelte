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

  // Determine content based on material type
  $: {
    switch (material.type) {
      case 'thread':
        title = `${material.brand} ${material.colorNumber}`;
        details = `色名: ${material.colorName || 'N/A'}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        break;
      case 'bead':
        title = `${material.brand} ${material.itemCode}`;
        details = `サイズ: ${material.size}\n色名: ${material.colorName || 'N/A'}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        break;
      case 'cutCloth':
        title = `${material.fabricType} ${material.pattern}`;
        details = `サイズ: ${material.size}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        break;
      case 'xStitchCloth':
        title = `${material.count}ct ${material.color}`;
        details = `サイズ: ${material.size}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
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
      <span class:wished={material.wishlist}>★</span>
    </button>
    <a
      href={`/inventory/update/${material.type === 'thread' ? 'thread' : material.type === 'bead' ? 'bead' : material.type === 'cutCloth' ? 'cut-cloth' : 'xstitch-cloth'}/${material.id}`}
      class="edit-button"
      title="編集"
      aria-label="編集"
    >
      <svg class="icon" width="16" height="16" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M0 25.3343V32H6.66574L26.3252 12.3405L19.6595 5.67477L0 25.3343ZM31.4801 7.18567C32.1733 6.49243 32.1733 5.37259 31.4801 4.67935L27.3207 0.519928C26.6274 -0.173309 25.5076 -0.173309 24.8143 0.519928L21.5615 3.77281L28.2272 10.4385L31.4801 7.18567Z"/>
      </svg>
    </a>
    <button class="delete-button" on:click={handleDelete} title="削除">&times;</button>
  </div>
  <div class="card-header">
    <img src="/beace.svg" alt="material icon" class="card-icon" />
    <h2>{title}</h2>
  </div>
  <div class="card-body">
    <p>{details}</p>
  </div>
</div>

<style>
  .material-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative; /* For positioning the delete button */
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

  .icon { width: 16px; height: 16px; }

  .edit-button { color: var(--melon-green); }
  .edit-button:hover { color: var(--melon-green); }

  .delete-button:hover {
    color: #f00;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }

  .card-body p {
    white-space: pre-wrap; /* Preserve newlines */
    font-size: 0.9rem;
    color: #555;
  }

  /* toast display is handled by parent via event */
</style>
