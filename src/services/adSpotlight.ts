import { fetchFresh } from '../utils/fetchFresh'
import { publicUrl } from '../utils/publicUrl'
import { calendarDay } from '../utils/time'

export type AdTheme = 'ai' | 'market' | 'macro' | 'energy' | 'china' | 'auto' | 'general'

export interface AdSpotlight {
  id: string
  title: string
  summary: string
  source: string
  showTime: string
  theme: AdTheme
  score: number
  bg: string
  /** 今日固定档；非实时稿 */
  daily?: boolean
}

/** 按主题的背景池（站内 AI 实景，避免外链） */
const THEME_BG_POOL: Record<AdTheme, string[]> = {
  ai: [
    publicUrl('ad-gate-bg-ai.jpg'),
    publicUrl('ad-jensen-return.jpg'),
    publicUrl('news-covers/tech-1.jpg'),
  ],
  market: [
    publicUrl('ad-gate-bg-market.jpg'),
    publicUrl('ad-gate-bg-macro.jpg'),
    publicUrl('hero-market.jpg'),
  ],
  macro: [
    publicUrl('ad-gate-bg-macro.jpg'),
    publicUrl('ad-gate-bg-market.jpg'),
    publicUrl('safari-stock-rise.jpg'),
  ],
  energy: [
    publicUrl('ad-gate-bg-energy.jpg'),
    publicUrl('news-covers/finance-3.jpg'),
    publicUrl('hero-market.jpg'),
  ],
  china: [
    publicUrl('ad-gate-bg-china.jpg'),
    publicUrl('news-covers/finance-1.jpg'),
    publicUrl('hero-market.jpg'),
  ],
  auto: [
    publicUrl('ad-gate-bg-auto.jpg'),
    publicUrl('news-covers/auto-1.jpg'),
    publicUrl('news-covers/auto-2.jpg'),
  ],
  general: [
    publicUrl('ad-gate-bg-macro.jpg'),
    publicUrl('ad-gate-bg-market.jpg'),
    publicUrl('ad-gate-bg-ai.jpg'),
  ],
}

function dayHash(day: string): number {
  let h = 0
  for (let i = 0; i < day.length; i++) h = (h * 31 + day.charCodeAt(i)) >>> 0
  return h
}

function pickBg(theme: AdTheme, salt: string): string {
  const pool = THEME_BG_POOL[theme] ?? THEME_BG_POOL.general
  return pool[dayHash(salt) % pool.length]
}

/**
 * 每日固定广告档（文案 + 主题）。按日历日轮换，同一天内不变。
 * 实时快讯拉取失败时，仍保证每天看起来不同。
 */
const DAILY_PACKS: Omit<AdSpotlight, 'bg' | 'score' | 'showTime' | 'daily'>[] = [
  {
    id: 'daily-huang',
    title: '黄仁勋回归：舞台灯再亮，AI 叙事续写',
    summary:
      '英伟达掌门人再度走上全球舞台，算力、芯片与资本市场的目光再次聚焦。点击后稍候，即可进入财经频道。',
    source: 'StockPulse',
    theme: 'ai',
  },
  {
    id: 'daily-fed',
    title: '利率路径摇摆：成长股与美元资产同频波动',
    summary:
      '美联储议息临近，市场在「更高更久」与降息预期之间拉扯。先看清折现率，再谈主题热度。',
    source: 'StockPulse',
    theme: 'macro',
  },
  {
    id: 'daily-musk',
    title: '马斯克与特斯拉：自动驾驶叙事再度牵动估值',
    summary:
      'Robotaxi 与 FSD 预期升温时，交付与毛利仍是底座。把金句翻译成可验证里程碑，再决定仓位。',
    source: 'StockPulse',
    theme: 'auto',
  },
  {
    id: 'daily-semicon',
    title: '半导体链条分化：设备、设计、封测不同步',
    summary:
      '同一产业链上下游，景气与估值可以走出完全不同的节奏。主题行情适合小仓位、严纪律。',
    source: 'StockPulse',
    theme: 'ai',
  },
  {
    id: 'daily-hk',
    title: '港股科技回流：回购、南向与估值修复的边界',
    summary:
      '修复行情能否持续，取决于盈利是否跟上估值抬升。流动性回暖不等于基本面已经兑现。',
    source: 'StockPulse',
    theme: 'china',
  },
  {
    id: 'daily-gold',
    title: '黄金回撤：实际利率抬头时的避险资产重估',
    summary:
      '黄金并非只涨不跌；实际利率与美元仍是关键解释变量。把波动当成提醒，而不是单边信仰。',
    source: 'StockPulse',
    theme: 'energy',
  },
  {
    id: 'daily-board',
    title: '三地行情一眼读懂：美股、港股、A股同屏',
    summary:
      '指数、自选与日K同步刷新。先建立规则，再读新闻热度——短线噪音不等于长期逻辑改变。',
    source: 'StockPulse',
    theme: 'market',
  },
]

export function getDailyAdSpotlight(when = new Date()): AdSpotlight {
  const day = calendarDay(when)
  const pack = DAILY_PACKS[dayHash(day) % DAILY_PACKS.length]
  return {
    ...pack,
    showTime: day,
    score: 10,
    daily: true,
    bg: pickBg(pack.theme, `${day}:${pack.id}`),
  }
}

const WEIGHTS: { re: RegExp; score: number; theme?: AdTheme }[] = [
  { re: /黄仁勋|英伟达|NVIDIA|Jensen|GPU|半导体|芯片|AI|纳斯达克100|费城半导体/i, score: 28, theme: 'ai' },
  { re: /马斯克|特斯拉|SpaceX|比特币|加密|Robotaxi|FSD/i, score: 18, theme: 'auto' },
  { re: /美联储|降息|加息|非农|国债|鲍威尔|利率|CPI|通胀/i, score: 26, theme: 'macro' },
  { re: /原油|黄金|天然气|能源|OPEC/i, score: 16, theme: 'energy' },
  { re: /央行|人民币|上证|深证|沪深|A股|港股|恒生|证监会/i, score: 20, theme: 'china' },
  { re: /暴跌|暴涨|熔断|闪崩|历史新高|创新高|崩盘|急跌|跳水|大跌|大涨|重挫|狂飙/i, score: 22, theme: 'market' },
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

/** 站内今日新闻包（GH Pages 静态可用，比实时桥接稳） */
async function fetchBundleRows(): Promise<RawRow[]> {
  try {
    const res = await fetch(publicUrl('data/daily-bundle.json'), { cache: 'no-store' })
    if (!res.ok) return []
    const json = (await res.json()) as {
      day?: string
      news?: { id?: string; title?: string; summary?: string; tag?: string; time?: string }[]
    }
    if (json.day && json.day !== calendarDay()) return []
    return (json.news ?? []).map((n) => ({
      title: n.title,
      summary: n.summary ?? n.tag,
      code: n.id,
      showTime: n.time,
      source: n.tag,
    }))
  } catch {
    return []
  }
}

/** @deprecated 用 getDailyAdSpotlight；保留别名避免旧引用断裂 */
export const AD_SPOTLIGHT_FALLBACK: AdSpotlight = getDailyAdSpotlight()

function toSpotlight(row: RawRow): AdSpotlight | null {
  const title = String(row.title ?? '').trim()
  if (!title) return null
  const summary = String(row.summary ?? row.title ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
  const { score, theme } = classify(title, summary)
  const day = calendarDay()
  return {
    id: String(row.code ?? title).slice(0, 64),
    title,
    summary: summary || title,
    source: 'StockPulse',
    showTime: String(row.showTime ?? day),
    theme,
    score,
    // 背景严格跟新闻主题走：AI→科技/黄仁勋图，汽车→auto，宏观→行情图…
    bg: pickBg(theme, `${day}:${theme}:${title}`),
  }
}

const STORAGE_KEY = 'shixun-ad-spotlight-day-v2'
/** 达到此分视为「重大新闻」，用其文案+主题背景 */
const MAJOR_SCORE = 18

function readCachedDaily(): AdSpotlight | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { day: string; spot: AdSpotlight }
    if (parsed?.day !== calendarDay() || !parsed.spot?.title) return null
    return parsed.spot
  } catch {
    return null
  }
}

function writeCachedDaily(spot: AdSpotlight) {
  try {
    const prev = readCachedDaily()
    // 同日只升不降：重大新闻可覆盖弱档，弱档不能盖重大稿
    if (prev && (prev.score ?? 0) > (spot.score ?? 0)) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: calendarDay(), spot }))
  } catch {
    // ignore
  }
}

function bestOf(rows: RawRow[]): AdSpotlight | null {
  const seen = new Set<string>()
  const candidates: AdSpotlight[] = []
  for (const row of rows) {
    const spot = toSpotlight(row)
    if (!spot) continue
    if (seen.has(spot.title)) continue
    seen.add(spot.title)
    candidates.push(spot)
  }
  if (!candidates.length) return null
  candidates.sort((a, b) => b.score - a.score || b.showTime.localeCompare(a.showTime))
  return candidates[0] ?? null
}

/**
 * 广告页：跟着重大新闻换文案和背景图
 * 1) 站内 daily-bundle（稳）
 * 2) 实时东财快讯（能通就用）
 * 3) 够「重大」→ 用其主题背景池配图
 * 4) 否则每日轮换档兜底
 */
export async function fetchAdSpotlight(timeoutMs = 4500): Promise<AdSpotlight> {
  const daily = getDailyAdSpotlight()
  const cached = readCachedDaily()

  const work = async (): Promise<AdSpotlight> => {
    const [bundleRows, liveRows] = await Promise.all([fetchBundleRows(), fetchFastRows()])
    const fromBundle = bestOf(bundleRows)
    const fromLive = bestOf(liveRows)

    const majors = [fromLive, fromBundle]
      .filter((s): s is AdSpotlight => Boolean(s && s.score >= MAJOR_SCORE))
      .sort((a, b) => b.score - a.score)

    if (majors[0]) return majors[0]
    // 有新闻但不够重大：仍用最高分那条换背景，避免天天同一张黄仁勋图
    const weak = [fromLive, fromBundle]
      .filter((s): s is AdSpotlight => Boolean(s))
      .sort((a, b) => b.score - a.score)[0]
    return weak ?? daily
  }

  const result = await withTimeout(work(), timeoutMs, cached ?? daily)
  writeCachedDaily(result)
  return result
}
