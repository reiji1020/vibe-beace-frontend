export type ThreadBrand = 'dmc' | 'cosmo';

function canonicalizeBrand(brand: string | null | undefined): ThreadBrand | null {
  if (!brand) return null;
  const b = brand.trim().toLowerCase();
  if (b === 'dmc') return 'dmc';
  if (b === 'cosmo') return 'cosmo';
  return null;
}

type ColorMap = Record<string, string>;

const cache: Partial<Record<ThreadBrand, Promise<ColorMap> | ColorMap>> = {};

async function loadBrandMap(brand: ThreadBrand, base = ''): Promise<ColorMap> {
  const cached = cache[brand];
  if (cached) return await cached;
  const url = `${base}/data/threads/${brand}.json`;
  const p = fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`failed to load ${url}: ${r.status}`);
      return r.json() as Promise<ColorMap>;
    })
    .catch((e) => {
      console.error('threadColors load error', e);
      return {} as ColorMap;
    });
  cache[brand] = p;
  return await p;
}

function candidateCodes(raw: string): string[] {
  const s = String(raw ?? '').trim();
  const arr: string[] = [];
  if (!s) return arr;
  const up = s.toUpperCase();
  const noSpace = up.replace(/\s+/g, '');
  arr.push(s, up, noSpace);
  const n = Number(s.replace(/[^0-9]/g, ''));
  if (!Number.isNaN(n) && s !== '') {
    const asIsNum = String(n);
    if (!arr.includes(asIsNum)) arr.push(asIsNum);
    if (n < 100) {
      const pad2 = n.toString().padStart(2, '0');
      if (!arr.includes(pad2)) arr.push(pad2);
    }
    // 3桁ゼロ埋めが必要なデータが将来入る可能性に備える
    if (n < 1000) {
      const pad3 = n.toString().padStart(3, '0');
      if (!arr.includes(pad3)) arr.push(pad3);
    }
  }
  return arr;
}

export async function getThreadHex(
  brand: string | null | undefined,
  colorCode: string | null | undefined,
  opts?: { base?: string }
): Promise<string | null> {
  const b = canonicalizeBrand(brand);
  if (!b || !colorCode) return null;
  const base = opts?.base ?? '';
  const map = await loadBrandMap(b, base);
  if (!map) return null;
  const candidates = candidateCodes(colorCode);
  for (const c of candidates) {
    if (c in map) return map[c];
  }
  return null;
}

