export type BeadBrand = 'toho' | 'miyuki';

function canonicalizeBrand(brand: string | null | undefined): BeadBrand | null {
  if (!brand) return null;
  const b = brand.trim().toLowerCase();
  // 広めにマッチ: 例) "TOHO 丸小", "toho丸小", 半角カナ/全角カナ
  if (
    b === 'toho' ||
    b.includes('toho') ||
    b === 'トーホー' ||
    b.includes('トーホー') ||
    b === 'ﾄｰﾎｰ' ||
    b.includes('ﾄｰﾎｰ')
  )
    return 'toho';
  if (
    b === 'miyuki' ||
    b.includes('miyuki') ||
    b === 'ミユキ' ||
    b.includes('ミユキ') ||
    b === '三幸' ||
    b.includes('三幸')
  )
    return 'miyuki';
  return null;
}

type ColorMap = Record<string, string>;

const cache: Partial<Record<string, Promise<ColorMap> | ColorMap>> = {};

// 現状は丸小（ROUND_BEADS）に対応。将来追加時は分岐追加。
async function loadTohoRoundMap(base = ''): Promise<ColorMap> {
  const key = 'toho_round';
  if (cache[key]) return await cache[key]!;
  const p = (async () => {
    // 1) v3 color_map（ブランド別ネスト）
    try {
      const v3url = `${base}/data/beads/toho_round_beads_color_map_v3.json`;
      const r = await fetch(v3url);
      if (r.ok) {
        const raw = (await r.json()) as Record<string, any>;
        // 期待: { TOHO: { code: hex, ... }, その他ブランド?: {...} }
        if (raw && typeof raw === 'object') {
          const candidate = raw['TOHO'] ?? raw['toho'];
          if (candidate && typeof candidate === 'object') {
            const m: ColorMap = {};
            for (const [k, v] of Object.entries(candidate)) {
              if (typeof v === 'string') m[k] = v;
              else if (v && typeof v === 'object' && typeof (v as any).hex === 'string') m[k] = (v as any).hex;
            }
            if (Object.keys(m).length) return m;
          }
          // もしネストでない場合、フラットマップとして扱う
          const flat: ColorMap = {};
          let flatCount = 0;
          for (const [k, v] of Object.entries(raw)) {
            if (typeof v === 'string') {
              flat[k] = v;
              flatCount++;
            }
          }
          if (flatCount) return flat;
        }
      }
    } catch (e) {
      // v3 color_map が読めなくてもフォールバックする
    }

    // 2) v3 colors（配列） -> code->hex を生成
    try {
      const v3listUrl = `${base}/data/beads/toho_round_beads_colors_v3.json`;
      const r = await fetch(v3listUrl);
      if (r.ok) {
        const arr = (await r.json()) as Array<{ brand?: string; code?: string; hex?: string }>;
        if (Array.isArray(arr)) {
          const m: ColorMap = {};
          for (const it of arr) {
            if (!it || typeof it !== 'object') continue;
            const b = String(it.brand || '').toLowerCase();
            if (!b.includes('toho')) continue;
            const code = it.code ? String(it.code).trim() : '';
            const hex = it.hex ? String(it.hex).trim() : '';
            if (!code || !hex) continue;
            m[code] = hex;
          }
          if (Object.keys(m).length) return m;
        }
      }
    } catch (e) {
      // v3 配列が読めなくてもフォールバックする
    }

    // 3) 旧 color_map
    const url = `${base}/data/beads/toho_round_beads_color_map.json`;
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`failed to load ${url}: ${r.status}`);
      return (await r.json()) as ColorMap;
    } catch (e) {
      console.error('beadColors load error', e);
      return {} as ColorMap;
    }
  })();
  cache[key] = p;
  return await p;
}

async function loadMiyukiDelicaMap(base = ''): Promise<ColorMap> {
  const key = 'miyuki_delica';
  if (cache[key]) return await cache[key]!;
  const url = `${base}/data/beads/miyuki_delica_color_map.json`;
  const p = fetch(url)
    .then(async (r) => {
      if (!r.ok) throw new Error(`failed to load ${url}: ${r.status}`);
      const raw = (await r.json()) as Record<string, string | { hex?: string }>;
      // 値型が hex 文字列 or { hex } の両方に対応
      const m: ColorMap = {};
      for (const [k, v] of Object.entries(raw)) {
        if (typeof v === 'string') m[k] = v;
        else if (v && typeof v === 'object' && typeof v.hex === 'string') m[k] = v.hex;
      }
      return m;
    })
    .catch((e) => {
      console.error('beadColors load error', e);
      return {} as ColorMap;
    });
  cache[key] = p;
  return await p;
}

function candidateCodes(raw: string): string[] {
  const s = String(raw ?? '').trim();
  const arr: string[] = [];
  if (!s) return arr;
  const up = s.toUpperCase();
  const noSpace = up.replace(/\s+/g, '');
  arr.push(s, up, noSpace);
  // 数値化して先頭ゼロを落とすバリエーション（例: "06" -> "6"）
  const numeric = s.replace(/[^0-9]/g, '');
  if (numeric) {
    const n = String(Number(numeric));
    if (!arr.includes(n)) arr.push(n);
  }
  return arr;
}

export async function getBeadHex(
  brand: string | null | undefined,
  itemCode: string | null | undefined,
  opts?: { base?: string; productLine?: 'ROUND_BEADS' }
): Promise<string | null> {
  const b = canonicalizeBrand(brand);
  if (!b || !itemCode) return null;
  const base = opts?.base ?? '';
  // ブランド別にロード
  const map = b === 'toho' ? await loadTohoRoundMap(base) : await loadMiyukiDelicaMap(base);
  const candidates = candidateCodes(itemCode);
  for (const c of candidates) {
    if (c in map) return map[c];
  }
  return null;
}
