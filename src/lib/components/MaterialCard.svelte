<script lang="ts">
  import { toast, Tooltip, Badge, CCLVividColor } from 'cclkit4svelte';
  import type { InventoryCardItem } from '$lib/types';
  import { baseEndpointForType } from '$lib/utils/endpoints';
  import { getThreadHex } from '$lib/utils/threadColors';
  import { getBeadHex } from '$lib/utils/beadColors';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  /** 表示する在庫カードのデータ。 */
  export let material: InventoryCardItem;
  /** 削除ボタン押下時のハンドラ。 */
  export let onDelete: (id: number, type: InventoryCardItem['type']) => void;

  let title: string;
  let details: string;
  let threadBorderColor: string | null = null;

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

  // Thread/Beadカードの場合、色番号/品番→HEXをロードして枠色に反映
  onMount(() => {
    if (material.type === 'thread') {
      getThreadHex((material as any).brand, (material as any).colorNumber, { base })
        .then((hex) => (threadBorderColor = hex))
        .catch(() => (threadBorderColor = null));
    } else if (material.type === 'bead') {
      getBeadHex((material as any).brand, (material as any).itemCode, { base, productLine: 'ROUND_BEADS' })
        .then((hex) => (threadBorderColor = hex))
        .catch(() => (threadBorderColor = null));
    }
  });

  function duplicateHref(): string {
    const base =
      material.type === 'thread'
        ? '/inventory/add/thread'
        : material.type === 'bead'
          ? '/inventory/add/bead'
          : material.type === 'cutCloth'
            ? '/inventory/add/cut-cloth'
            : '/inventory/add/xstitch-cloth';
    const p = new URLSearchParams();
    if (material.type === 'thread') {
      p.set('brand', material.brand);
      p.set('colorNumber', material.colorNumber);
      if (material.colorName) p.set('colorName', material.colorName);
    } else if (material.type === 'bead') {
      p.set('brand', material.brand);
      p.set('itemCode', material.itemCode);
      p.set('size', material.size);
      if (material.colorName) p.set('colorName', material.colorName);
    } else if (material.type === 'cutCloth') {
      if (material.brand) p.set('brand', material.brand);
      p.set('fabricType', material.fabricType);
      p.set('pattern', material.pattern);
      p.set('size', material.size);
    } else {
      // xStitchCloth
      if (material.brand) p.set('brand', material.brand);
      p.set('count', material.count);
      p.set('color', material.color);
      p.set('size', material.size);
    }
    p.set('quantity', String(material.quantity ?? 0));
    if (material.status) p.set('status', String(material.status));
    p.set('wishlist', material.wishlist ? 'on' : 'off');
    if (material.notes) p.set('notes', material.notes);
    const qs = p.toString();
    return qs ? `${base}?${qs}` : base;
  }

  async function toggleWishlist() {
    const endpoint = `${baseEndpointForType(material.type)}/${material.id}/wishlist`;

    const next = !material.wishlist;
    const prev = material.wishlist;
    // 再代入で反応性を担保（propsの直接ミューテーションを避ける）
    material = { ...material, wishlist: next };
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
        // 失敗時は元に戻す（再代入で反応性を担保）
        material = { ...material, wishlist: prev };
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
      // エラー時も元に戻す（再代入）
      material = { ...material, wishlist: prev };
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

<div
  class="material-card"
  style={threadBorderColor
    ? `--card-border: ${threadBorderColor}; --card-hover: ${threadBorderColor}; --card-shadow-color: ${threadBorderColor}; --card-tint: ${threadBorderColor}`
    : undefined}
>
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
    <Tooltip text="複製">
      <a href={duplicateHref()} class="copy-button" aria-label="複製">
        <svg
          class="icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/>
        </svg>
      </a>
    </Tooltip>
    <Tooltip text={material.wishlist ? 'Wishlist解除' : 'Wishlist登録'}>
      <button
        class="wishlist-button"
        on:click={toggleWishlist}
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
    <p class="details">{details}</p>
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
    --card-border: var(--surface-border);
    --card-hover: color-mix(in srgb, var(--melon-green) 32%, var(--surface-border));
    --card-shadow-color: var(--wrap-grey);
    --card-bg: var(--surface-1);
    --card-tint: var(--lemon-yellow);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    padding: 2.85rem 1rem 1rem;
    box-shadow: var(--shadow-sm);
    background:
      radial-gradient(
        130% 130% at 0% 0%,
        color-mix(in srgb, var(--card-tint) 24%, transparent),
        transparent 72%
      ),
      var(--card-bg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transition:
      transform 140ms ease,
      box-shadow 160ms ease,
      border-color 140ms ease;
  }

  .material-card:hover {
    transform: translateY(-1px);
    border-color: var(--card-hover);
    box-shadow: 0 8px 20px color-mix(in srgb, var(--card-shadow-color) 18%, transparent);
  }

  .card-actions-left,
  .card-actions-right {
    position: absolute;
    top: 8px;
    display: flex;
    gap: 6px;
  }
  .card-actions-left {
    left: 8px;
  }
  .card-actions-right {
    right: 8px;
  }

  .edit-button,
  .copy-button,
  .wishlist-button,
  .delete-button {
    background: color-mix(in srgb, var(--cloud-grey) 12%, white);
    border: 1px solid color-mix(in srgb, var(--cloud-grey) 48%, white);
    border-radius: 9999px;
    cursor: pointer;
    padding: 5px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition:
      background-color 120ms ease,
      border-color 120ms ease,
      transform 120ms ease;
  }

  .edit-button:hover,
  .copy-button:hover,
  .wishlist-button:hover,
  .delete-button:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--matcha-green) 22%, white);
    border-color: color-mix(in srgb, var(--melon-green) 36%, var(--cloud-grey));
  }

  .wishlist-button {
    font-size: 17px;
    line-height: 1;
    color: color-mix(in srgb, var(--wrap-grey) 72%, white);
  }

  .wishlist-button .wished {
    color: var(--pineapple-yellow);
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

  .copy-button { color: color-mix(in srgb, var(--wrap-grey) 86%, white); }
  .copy-button:hover {
    color: var(--melon-green);
  }

  .delete-button:hover {
    color: color-mix(in srgb, var(--strawberry-pink) 88%, #7a1f34);
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
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

  /* Modern hierarchy refinement */
  .card-header {
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .header-text {
    gap: 0.4rem;
    align-items: flex-start;
    text-align: left;
  }

  .card-header h2 {
    font-size: 1.08rem;
    font-weight: 700;
    color: var(--text-1);
    line-height: 1.35;
    letter-spacing: 0.01em;
  }

  .header-badges {
    gap: 0.35rem;
  }

  .card-body .details {
    white-space: pre-wrap;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--text-2);
    margin: 0;
  }

  .meta-row {
    gap: 0.35rem;
    margin-top: 0.65rem;
  }

  .notes {
    margin-top: 0.6rem;
    color: color-mix(in srgb, var(--wrap-grey) 85%, white);
    font-size: 0.82rem;
    line-height: 1.45;
    border-left: 3px solid color-mix(in srgb, var(--cloud-grey) 55%, white);
    padding-left: 0.45rem;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .material-card {
      padding: 2.5rem 0.82rem 0.82rem;
    }
    .card-actions-left,
    .card-actions-right {
      top: 6px;
      gap: 4px;
    }
    .wishlist-button {
      font-size: 18px;
      padding: 6px;
    }
    .icon {
      width: 16px;
      height: 16px;
    }
    .card-header h2 {
      font-size: 1.02rem;
    }
    .type-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
    }
  }
</style>
