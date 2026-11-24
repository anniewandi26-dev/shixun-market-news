import { ALL_SYMBOLS, INDEX_SYMBOLS, WATCHLIST } from '../data/symbols'
import type { KlineBar, Quote, SymbolDef } from '../types'
import { fetchFresh } from '../utils/fetchFresh'

const QUOTE_FIELDS = 'f2,f3,f4,f12,f13,f14,f15,f16,f17,f18'
const BATCH = 20

function toNum(v: unknown): number | null {
  if (v == null || v === '' || v === '-') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function matchRow(
  diff: Record<string, unknown>[],
  sym: SymbolDef,
): Record<string, unknown> | undefined {
  const [market, code] = sym.secid.split('.')
  const exact = diff.find(
    (row) => String(row.f13) === market && String(row.f12).toUpperCase() === code.toUpperCase(),
  )
  if (exact) return exact

  // 港股代码可能丢前导零；美股代码大小写不一
  return diff.find((row) => {
    const f12 = String(row.f12).toUpperCase()
    const want = code.toUpperCase()
    return f12 === want || f12.replace(/^0+/, '') === want.replace(/^0+/, '')
  })
}

function quoteFromEmRow(sym: SymbolDef, row: Record<string, unknown>): Quote | null {
  const price = toNum(row.f2)
  if (price == null) return null
  return {
    id: sym.id,
    name: sym.name,
    region: sym.region,
    price,
    change: toNum(row.f4) ?? 0,
    changePercent: toNum(row.f3) ?? 0,
    high: toNum(row.f15) ?? undefined,
    low: toNum(row.f16) ?? undefined,
    open: toNum(row.f17) ?? undefined,
    prevClose: toNum(row.f18) ?? undefined,
  }
}

async function fetchEmChunk(symbols: SymbolDef[]): Promise<Map<string, Quote>> {
  const map = new Map<string, Quote>()
  if (!symbols.length) return map
  try {
    const secids = symbols.map((s) => s.secid).join(',')
    const url = `/api/em-push/api/qt/ulist.np/get?fltt=2&fields=${QUOTE_FIELDS}&secids=${encodeURIComponent(secids)}`
    const res = await fetchFresh(url)
    if (!res.ok) return map
    const json = await res.json()
    const diff = (json?.data?.diff ?? []) as Record<string, unknown>[]
    for (const sym of symbols) {
      const row = matchRow(diff, sym)
      if (!row) continue
      const q = quoteFromEmRow(sym, row)
      if (q) map.set(sym.id, q)
    }
  } catch {
    // per-chunk soft fail
  }
  return map
}

async function fetchYahooQuote(sym: SymbolDef): Promise<Quote | null> {
  try {
    const url = `/api/yahoo/v8/finance/chart/${encodeURIComponent(sym.yahoo)}?interval=1d&range=5d`
    const res = await fetchFresh(url)
    if (!res.ok) return null
    const json = await res.json()
    const meta = json?.chart?.result?.[0]?.meta
    if (!meta) return null
    const price = toNum(meta.regularMarketPrice)
    if (price == null) return null
    const prev = toNum(meta.chartPreviousClose ?? meta.previousClose) ?? price
    const change = price - prev
    const changePercent = prev ? (change / prev) * 100 : 0
    return {
      id: sym.id,
      name: sym.name,
      region: sym.region,
      price,
      change,
      changePercent,
      prevClose: prev,
    }
  } catch {
    return null
  }
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let cursor = 0
  async function run() {
    while (cursor < items.length) {
      const i = cursor++
      out[i] = await worker(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => run()))
  return out
}

async function fetchQuotesBySecids(symbols: SymbolDef[]): Promise<Quote[]> {
  const chunks: SymbolDef[][] = []
  for (let i = 0; i < symbols.length; i += BATCH) {
    chunks.push(symbols.slice(i, i + BATCH))
  }

  const maps = await Promise.all(chunks.map((c) => fetchEmChunk(c)))
  const merged = new Map<string, Quote>()
  for (const m of maps) {
    for (const [id, q] of m) merged.set(id, q)
  }

  const missing = symbols.filter((s) => !merged.has(s.id))
  if (missing.length) {
    const yahooQuotes = await mapPool(missing, 6, fetchYahooQuote)
    for (const q of yahooQuotes) {
      if (q) merged.set(q.id, q)
    }
  }

  // 保持自选顺序
  return symbols.map((s) => merged.get(s.id)).filter((q): q is Quote => Boolean(q))
}

export async function fetchIndexQuotes(): Promise<Quote[]> {
  return fetchQuotesBySecids(INDEX_SYMBOLS)
}

export async function fetchWatchlistQuotes(): Promise<Quote[]> {
  return fetchQuotesBySecids(WATCHLIST)
}

export async function fetchAllQuotes(): Promise<Quote[]> {
  const [indexes, watch] = await Promise.all([
    fetchIndexQuotes(),
    fetchWatchlistQuotes(),
  ])
  return [...indexes, ...watch]
}

function ymd(ts: number): string {
  const d = new Date(ts * 1000)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function fetchKlineYahoo(yahoo: string, limit: number): Promise<KlineBar[]> {
  const url = `/api/yahoo/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=6mo`
  const res = await fetchFresh(url)
  if (!res.ok) throw new Error(`Yahoo K线失败: ${res.status}`)
  const json = await res.json()
  const result = json?.chart?.result?.[0]
  if (!result) throw new Error('Yahoo 无数据')
  const ts = (result.timestamp ?? []) as number[]
  const quote = result.indicators?.quote?.[0] ?? {}
  const opens = (quote.open ?? []) as Array<number | null>
  const highs = (quote.high ?? []) as Array<number | null>
  const lows = (quote.low ?? []) as Array<number | null>
  const closes = (quote.close ?? []) as Array<number | null>
  const volumes = (quote.volume ?? []) as Array<number | null>

  const bars: KlineBar[] = []
  for (let i = 0; i < ts.length; i++) {
    const open = Number(opens[i])
    const high = Number(highs[i])
    const low = Number(lows[i])
    const close = Number(closes[i])
    if (![open, high, low, close].every(Number.isFinite)) continue
    bars.push({
      time: ymd(ts[i]),
      open,
      high,
      low,
      close,
      volume: Number(volumes[i]) || 0,
    })
  }
  return bars.slice(-limit)
}

async function fetchKlineSinaCn(secid: string, limit: number): Promise<KlineBar[]> {
  const [market, code] = secid.split('.')
  if (!code) throw new Error('无效 secid')
  const prefix = market === '1' ? 'sh' : market === '0' ? 'sz' : null
  if (!prefix) throw new Error('非 A 股 secid')
  const url = `/api/sina/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${prefix}${code}&scale=240&ma=no&datalen=${limit}`
  const res = await fetchFresh(url)
  if (!res.ok) throw new Error(`新浪 K线失败: ${res.status}`)
  const rows = (await res.json()) as Array<Record<string, string>>
  if (!Array.isArray(rows) || !rows.length) throw new Error('新浪无数据')
  return rows.map((r) => ({
    time: r.day,
    open: Number(r.open),
    high: Number(r.high),
    low: Number(r.low),
    close: Number(r.close),
    volume: Number(r.volume) || 0,
  }))
}

async function fetchKlineEastMoney(secid: string, limit: number): Promise<KlineBar[]> {
  const url =
    `/api/em-his/api/qt/stock/kline/get?secid=${encodeURIComponent(secid)}` +
    `&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58` +
    `&klt=101&fqt=1&end=20500101&lmt=${limit}`
  const res = await fetchFresh(url)
  if (!res.ok) throw new Error(`东财 K线失败: ${res.status}`)
  const json = await res.json()
  const lines = (json?.data?.klines ?? []) as string[]
  if (!lines.length) throw new Error('东财无数据')
  return lines.map((line) => {
    const [time, open, close, high, low, volume] = line.split(',')
    return {
      time,
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close),
      volume: Number(volume),
    }
  })
}

export async function fetchKline(symbol: SymbolDef, limit = 150): Promise<KlineBar[]> {
  const errors: string[] = []

  try {
    return await fetchKlineYahoo(symbol.yahoo, limit)
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e))
  }

  try {
    return await fetchKlineEastMoney(symbol.secid, limit)
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e))
  }

  if (symbol.region === 'cn') {
    try {
      return await fetchKlineSinaCn(symbol.secid, limit)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e))
    }
  }

  throw new Error(errors.join(' | ') || 'K线加载失败')
}

export function findSymbol(id: string): SymbolDef | undefined {
  return ALL_SYMBOLS.find((s) => s.id === id || s.secid === id)
}
