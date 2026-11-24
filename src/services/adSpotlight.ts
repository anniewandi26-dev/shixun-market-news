import { fetchFresh } from '../utils/fetchFresh'
import { publicUrl } from '../utils/publicUrl'

export type AdTheme = 'ai' | 'market' | 'macro' | 'energy' | 'china' | 'general'

export interface AdSpotlight {
  id: string
  title: string
  summary: string
  source: string
  showTime: string
  theme: AdTheme
  score: number
  bg: string
}

const THEME_BG: Record<AdTheme, string> = {
  ai: publicUrl('ad-jensen-return.jpg'),
  market: publicUrl('hero-market.jpg'),
  macro: publicUrl('hero-market.jpg'),
  energy: publicUrl('hero-market.jpg'),
  china: publicUrl('hero-market.jpg'),
  general: publicUrl('ad-jensen-return.jpg'),
}

const WEIGHTS: { re: RegExp; score: number; theme?: AdTheme }[] = [
  { re: /黄仁勋|英伟达|NVIDIA|Jensen|GPU|半导体|芯片|AI|纳斯达克100|费城半导体/i, score: 28, theme: 'ai' },
  { re: /马斯克|特斯拉|SpaceX|比特币|加密/i, score: 18, theme: 'market' },
  { re: /美联储|降息|加息|非农|国债|鲍威尔|利率|CPI|通胀/i, score: 26, theme: 'macro' },
  { re: /原油|黄金|天然气|能源|OPEC/i, score: 16, theme: 'energy' },
  { re: /央行|人民币|上证|深证|沪深|A股|港股|恒生|证监会/i, score: 20, theme: 'china' },
  { re: /暴跌|暴涨|熔断|闪崩|历史新高|创新高|崩盘|急跌|跳水|大跌|大涨|重挫|狂飙/i, score: 22 },
  { re: /财报|业绩|指引|回购|裁员|收购|制裁|关税|战争|停火/i, score: 14 },
]

function classify(title: string, summary: string): { score: number; theme: AdTheme } {
  const text = `${title} ${summary}`
  let score = 1
  let theme: AdTheme = 'general'
  let themeScore = -1
  for (const w of WEIGHTS) {
    if (!w.re.test(text)) continue
    score += w.score
    if (w.theme && w.score >= themeScore) {
      theme = w.theme
      themeScore = w.score
    }
  }
  if (title.length < 12) score -= 2
  return { score, theme }
}

interface RawRow {
  title?: string
  summary?: string
  code?: string
  showTime?: string
  mediaName?: string
  source?: string
}

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(fallback), ms)
    p.then(
      (v) => {
        window.clearTimeout(timer)
        resolve(v)
      },
      () => {
        window.clearTimeout(timer)
        resolve(fallback)
      },
    )
  })
}

async function fetchFastRows(): Promise<RawRow[]> {
  try {
    const res = await fetchFresh(
      '/api/em-news/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=40&req_trace=1',
      {},
      1,
    )
    if (!res.ok) return []
    const json = await res.json()
    return (json?.data?.fastNewsList ?? []) as RawRow[]
  } catch {
    return []
  }
}

export const AD_SPOTLIGHT_FALLBACK: AdSpotlight = {
  id: 'fallback-huang',
  title: '黄仁勋回归：舞台灯再亮，AI 叙事续写',
  summary:
    '英伟达掌门人再度走上全球舞台，算力、芯片与资本市场的目光再次聚焦。点击后稍候，即可进入财经频道。',
  source: '市讯',
  showTime: '',
  theme: 'ai',
  score: 0,
  bg: THEME_BG.ai,
}

function toSpotlight(row: RawRow): AdSpotlight | null {
  const title = String(row.title ?? '').trim()
  if (!title) return null
  const summary = String(row.summary ?? row.title ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
  const { score, theme } = classify(title, summary)
  return {
    id: String(row.code ?? title).slice(0, 64),
    title,
    summary: summary || title,
    source: String(row.mediaName ?? row.source ?? '财经快讯'),
    showTime: String(row.showTime ?? ''),
    theme,
    score,
    bg: THEME_BG[theme],
  }
}

/** 拉取实时重大财经快讯（硬超时，避免广告页卡死） */
export async function fetchAdSpotlight(timeoutMs = 4000): Promise<AdSpotlight> {
  const work = async (): Promise<AdSpotlight> => {
    const fast = await fetchFastRows()
    const seen = new Set<string>()
    const candidates: AdSpotlight[] = []
    for (const row of fast) {
      const spot = toSpotlight(row)
      if (!spot) continue
      if (seen.has(spot.title)) continue
      seen.add(spot.title)
      candidates.push(spot)
    }
    if (!candidates.length) return AD_SPOTLIGHT_FALLBACK
    candidates.sort((a, b) => b.score - a.score || b.showTime.localeCompare(a.showTime))
    return candidates[0] ?? AD_SPOTLIGHT_FALLBACK
  }

  return withTimeout(work(), timeoutMs, AD_SPOTLIGHT_FALLBACK)
}
