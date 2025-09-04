<script lang="ts">
  import { Table, Button } from 'cclkit4svelte';
  import { toast } from '$lib/ui/toast';
  import { CCLVividColor } from 'cclkit4svelte';
  import { onMount } from 'svelte';

  type MaterialKey = 'threads' | 'beads' | 'cutCloths' | 'xStitchCloths';
  export let mt: MaterialKey;
  export let items: any[] = [];

  const HEADERS_DEFAULT: string[] = ['メーカー', '種類', '柄', 'サイズ'];
  const HEADERS_THREADS: string[] = ['メーカー', '種類', '柄', '色番号'];

  function rowFields(item: any): (string | number)[] {
    switch (mt) {
      case 'threads':
        return [item.brand ?? '', '刺繍糸', item.colorName ?? '', item.colorNumber ?? ''];
      case 'beads':
        return [item.brand ?? '', item.itemCode ?? 'ビーズ', item.colorName ?? '', item.size ?? ''];
      case 'cutCloths':
        return [item.brand ?? '', item.fabricType ?? 'カットクロス', item.pattern ?? '', item.size ?? ''];
      case 'xStitchCloths':
        return [item.brand ?? '', (item.count ? `${item.count}ct` : 'クロスステッチ布'), item.color ?? '', item.size ?? ''];
      default:
        return ['', '', '', ''];
    }
  }

  function resolveCssColor(token: string, fallback: string): string {
    try {
      const varName = token.startsWith('--') ? token : `--${token}`;
      const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return v || fallback;
    } catch {
      return fallback;
    }
  }

  $: header = mt === 'threads' ? HEADERS_THREADS : HEADERS_DEFAULT;
  $: data = (items || []).map(rowFields);

  // ロゴはCanvas直描画用にImageとしてプリロード
  let logoImg: HTMLImageElement | null = null;
  onMount(() => {
    const img = new Image();
    img.onload = () => (logoImg = img);
    img.onerror = () => (logoImg = null);
    img.src = '/beace.svg';
  });

  function drawTableToCanvas(canvas: HTMLCanvasElement) {
    const pad = 24;
    const W = 1000;
    const headerBandH = 60;
    const footerBandH = 7; // about one-third of previous 40
    const col = header.length;
    const rowH = 30;
    const titleH = 28; // reserved block for title
    const headerGap = 32; // gap between header band (and title) and table
    const footerGap = 32; // gap between table and footer band
    const tableTop = pad + headerBandH + titleH + headerGap;
    const tableH = (data.length + 1) * rowH;
    const H = tableTop + tableH + (footerGap + pad + footerBandH);
    const usableW = W - pad * 2;
    const colW = usableW / col;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas not supported');

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Header band (like CommonHeader)
    ctx.fillStyle = resolveCssColor(CCLVividColor.PINEAPPLE_YELLOW as unknown as string, '#ed9126');
    ctx.fillRect(0, 0, W, pad + headerBandH);

    // Header (logo only)
    const date = new Date();
    if (logoImg) {
      // Scale logo to fit header band comfortably and center it
      const bandH = pad + headerBandH;
      const targetH = Math.min(40, bandH - 20);
      const scale = targetH / (logoImg.naturalHeight || 1);
      const lw = (logoImg.naturalWidth || 0) * scale;
      const x = (W - lw) / 2;
      const y = (bandH - targetH) / 2;
      ctx.drawImage(logoImg, x, y, lw, targetH);
    } else {
      // Fallback brand text when logo is not available (centered)
      const bandH = pad + headerBandH;
      ctx.fillStyle = '#111827';
      ctx.font = '700 20px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans JP, sans-serif';
      const prevAlign = ctx.textAlign;
      const prevBaseline = ctx.textBaseline as CanvasTextBaseline;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Beace', W / 2, bandH / 2);
      ctx.textAlign = prevAlign as CanvasTextAlign;
      ctx.textBaseline = prevBaseline;
    }
    // Title below header band
    const titleText = 'Shopping List';
    ctx.fillStyle = resolveCssColor(CCLVividColor.WRAP_GREY as unknown as string, '#5f5f60');
    ctx.font =
      '700 22px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans JP, sans-serif';
    ctx.fillText(titleText, pad, pad + headerBandH + 24);

    // Table header row
    ctx.font =
      '700 14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans JP, sans-serif';
    for (let i = 0; i < col; i++) {
      const x = pad + i * colW;
      ctx.fillStyle = '#f9fafb';
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.fillRect(x, tableTop, colW, rowH);
      ctx.strokeRect(x, tableTop, colW, rowH);
      ctx.fillStyle = '#374151';
      ctx.fillText(String(header[i]), x + 8, tableTop + 20);
    }

    // Table body
    ctx.font =
      '14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans JP, sans-serif';
    for (let r = 0; r < data.length; r++) {
      const y = tableTop + (r + 1) * rowH;
      for (let c = 0; c < col; c++) {
        const x = pad + c * colW;
        ctx.fillStyle = r % 2 === 0 ? '#ffffff' : '#fbfdfe';
        ctx.strokeStyle = '#f3f4f6';
        ctx.fillRect(x, y, colW, rowH);
        ctx.strokeRect(x, y, colW, rowH);
        ctx.fillStyle = '#374151';
        const cell = data[r][c] ?? '';
        ctx.fillText(String(cell), x + 8, y + 20);
      }
    }

    // Footer band (like CommonHeader)
    const footerBandTotal = pad + footerBandH;
    const footerY = H - footerBandTotal;
    ctx.fillStyle = resolveCssColor(CCLVividColor.PINEAPPLE_YELLOW as unknown as string, '#ed9126');
    ctx.fillRect(0, footerY, W, footerBandTotal);

    // Footer text centered
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans JP, sans-serif';
    const prevAlign2 = ctx.textAlign;
    const prevBaseline2 = ctx.textBaseline as CanvasTextBaseline;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Copyright CANDY CHUPS Lab.', W / 2, footerY + footerBandTotal / 2);
    ctx.textAlign = prevAlign2 as CanvasTextAlign;
    ctx.textBaseline = prevBaseline2;
  }

  function escapeXml(s: string) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function downloadTablePng() {
    try {
      const canvas = document.createElement('canvas');
      drawTableToCanvas(canvas);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'shopping-table.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success('表のPNGを保存しました');
    } catch (e) {
      console.error('Failed to export table PNG (canvas)', e);
      toast.error('表の画像保存に失敗しました');
    }
  }

  // 旧SVG経由の出力処理は廃止（Canvas直描画へ一本化）
</script>

<div class="shopping-table">
  {#if items && items.length > 0}
    <div class="table-wrap" role="region" aria-label="買い物リスト">
      <Table tableColor={CCLVividColor.PINEAPPLE_YELLOW} dataHeader={header} tableData={data} />
    </div>
    <div class="actions">
      <Button
        label="表をPNGで保存"
        bgColor={CCLVividColor.GRAPE_PURPLE}
        onClick={downloadTablePng}
      />
    </div>
    <div class="meta">{items.length} 件</div>
  {:else}
    <div class="empty">（Wishlistが空です）</div>
  {/if}
</div>

<style>
  .shopping-table {
    margin: 0.5rem 2rem 1rem;
  }
  .table-wrap {
    display: flex;
    justify-content: center;
  }
  .actions {
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
  .meta {
    margin-top: 6px;
    color: #6b7280;
    font-size: 0.85rem;
    text-align: right;
  }
  .empty {
    padding: 12px;
    text-align: center;
    color: #6b7280;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
</style>
