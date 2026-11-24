import { LOCAL_NEWS } from '../data/localNews'
import { KNOWLEDGE } from '../data/knowledge'
import type { NewsItem } from '../types'
import { fetchFresh } from '../utils/fetchFresh'
import { calendarDay, formatDateTime, isContentStale } from '../utils/time'

export interface DailyBundle {
  version: number
  day: string
  generatedAt: string
  refreshHours: number[]
  source: 'live' | 'partial' | 'local'
  errors?: string[]
  knowledgeFocusIndex: number
  news: NewsItem[]
  marketNote: string
}

const STORAGE_KEY = 'shixun-daily-bundle-v1'

function stampNews(items: NewsItem[], when = new Date()): NewsItem[] {
  const time = formatDateTime(when)
  const day = calendarDay(when)
  return items.map((n) => {
    const body = [...(n.body ?? [])]
    const headed = body[0]?.startsWith('【') ? body : [`【${day} 今日更新】${n.title}`, ...body]
    return {
      ...n,
      time,
      url: `/news/${n.id}`,
      body: headed,
    }
  })
}

export function buildLocalBundle(when = new Date()): DailyBundle {
  const day = calendarDay(when)
  const focus = Math.abs(day.split('-').reduce((a, b) => a + Number(b), 0)) % KNOWLEDGE.length
  return {
    version: 1,
    day,
    generatedAt: when.toISOString(),
    refreshHours: [8, 20],
    source: 'local',
    knowledgeFocusIndex: focus,
    news: stampNews(LOCAL_NEWS, when),
    marketNote: `${day} 本地整理包已生成（${formatDateTime(when)}）。行情仍实时拉取最新价。`,
  }
}

function dedupeNews(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>()
  const out: NewsItem[] = []
  for (const n of items) {
    const key = n.title.trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(n)
  }
  return out
}

function expandLive(title: string, summary: string, tag: string, day: string): string[] {
  return [
    `【${day} 今日更新】${title}`,
    summary || '详见下文要点。',
    `本条已写入市讯「${tag}」栏目，全文在站内阅读，不跳转外站。`,
    '阅读时请区分：可核对事实、媒体解读、盘面情绪。短线波动不等于长期逻辑改变。',
    '内容仅供学习参考，不构成投资建议。可结合行情页与知识库一并查看。',
  ]
}

async function fetchLiveViaProxy(): Promise<NewsItem[]> {
  const day = calendarDay()
  const time = formatDateTime()
  const out: NewsItem[] = []

  const pushRows = (
    rows: Record<string, unknown>[],
    tag: string,
    prefix: string,
    limit: number,
  ) => {
    let i = 0
    for (const row of rows) {
      const title = String(row.title ?? '').trim()
      if (!title) continue
      if (out.some((n) => n.title === title)) continue
      const summary = String(row.summary ?? row.content ?? row.digest ?? title)
        .replace(/\s+/g, ' ')
        .slice(0, 160)
      i += 1
      out.push({
        id: `${prefix}-${i}-${day.replaceAll('-', '')}`,
        tag,
        title,
        summary,
        source: String(row.mediaName ?? row.source ?? '财经来源'),
        time,
        url: `/news/${prefix}-${i}-${day.replaceAll('-', '')}`,
        region: 'global',
        body: expandLive(title, summary, tag, day),
      })
      if (i >= limit) break
    }
  }

  try {
    const res = await fetchFresh(
      '/api/em-news/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=30&req_trace=1',
    )
    if (res.ok) {
      const json = await res.json()
      pushRows((json?.data?.fastNewsList ?? []) as Record<string, unknown>[], '财经', 'live-fin', 20)
    }
  } catch {
    // ignore
  }

  const search = async (keyword: string, tag: string, prefix: string, limit: number) => {
    try {
      const param = JSON.stringify({
        uid: '',
        keyword,
        type: ['cmsArticleWebOld'],
        client: 'web',
        clientType: 'web',
        clientVersion: 'curr',
        param: {
          cmsArticleWebOld: {
            searchScope: 'default',
            sort: 'default',
            pageSize: 10,
            pageNo: 1,
            preTag: '',
            postTag: '',
          },
        },
      })
      const cb = `jQuery${Date.now()}${Math.floor(Math.random() * 999)}`
      const res = await fetchFresh(
        `/api/em-search/search/jsonp?cb=${cb}&param=${encodeURIComponent(param)}`,
      )
      if (!res.ok) return
      const text = await res.text()
      const jsonText = text.replace(new RegExp(`^${cb}\\(`), '').replace(/\);?\s*$/, '')
      const json = JSON.parse(jsonText)
      pushRows((json?.result?.cmsArticleWebOld ?? []) as Record<string, unknown>[], tag, prefix, limit)
    } catch {
      // ignore
    }
  }

  await search('黄仁勋回归', '黄仁勋', 'live-huang', 5)
  if (out.filter((n) => n.tag === '黄仁勋').length < 5) {
    await search('黄仁勋', '黄仁勋', 'live-huang', 5)
  }
  await search('马斯克', '马斯克', 'live-musk', 5)
  if (out.filter((n) => n.tag === '马斯克').length < 5) {
    await search('特斯拉', '马斯克', 'live-musk', 5)
  }

  return dedupeNews(out)
}

function ensureMinimum(news: NewsItem[]): NewsItem[] {
  const local = stampNews(LOCAL_NEWS)
  const merged = dedupeNews([...news, ...local])
  const huang = merged.filter((n) => n.tag === '黄仁勋').slice(0, 5)
  const musk = merged.filter((n) => n.tag === '马斯克').slice(0, 5)
  const finance = merged.filter((n) => n.tag === '财经').slice(0, 20)
  const other = merged.filter(
    (n) => n.tag !== '黄仁勋' && n.tag !== '马斯克' && n.tag !== '财经',
  )
  return [...huang, ...musk, ...finance, ...other]
}

export function readStoredBundle(): DailyBundle | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DailyBundle
    if (!parsed?.generatedAt || !Array.isArray(parsed.news)) return null
    return parsed
  } catch {
    return null
  }
}

export function writeStoredBundle(bundle: DailyBundle) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle))
  } catch {
    // quota / private mode
  }
}

export async function loadDailyBundle(): Promise<DailyBundle> {
  // 1) 同日的本地缓存
  const stored = readStoredBundle()
  if (stored && !isContentStale(stored.generatedAt) && stored.news.length >= 10) {
    return stored
  }

  // 2) public/data/daily-bundle.json（定时脚本写入）
  try {
    const res = await fetchFresh('/data/daily-bundle.json')
    if (res.ok) {
      const fileBundle = (await res.json()) as DailyBundle
      if (fileBundle?.day === calendarDay() && Array.isArray(fileBundle.news) && fileBundle.news.length) {
        const normalized = {
          ...fileBundle,
          news: ensureMinimum(stampNews(fileBundle.news)),
        }
        writeStoredBundle(normalized)
        return normalized
      }
    }
  } catch {
    // ignore
  }

  // 3) 浏览器经代理拉今日新闻
  try {
    const live = await fetchLiveViaProxy()
    if (live.length >= 5) {
      const bundle: DailyBundle = {
        version: 1,
        day: calendarDay(),
        generatedAt: new Date().toISOString(),
        refreshHours: [8, 20],
        source: live.length >= 20 ? 'live' : 'partial',
        knowledgeFocusIndex:
          Math.abs(calendarDay().split('-').reduce((a, b) => a + Number(b), 0)) % KNOWLEDGE.length,
        news: ensureMinimum(live),
        marketNote: `${calendarDay()} 已通过在线源刷新（${formatDateTime()}）。`,
      }
      writeStoredBundle(bundle)
      return bundle
    }
  } catch {
    // ignore
  }

  // 4) 保底：站内模板 + 强制今日时间戳（保证不是「旧日期停住」）
  const local = buildLocalBundle()
  writeStoredBundle(local)
  return local
}

export async function forceRefreshDailyBundle(): Promise<DailyBundle> {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  // 跳过缓存，尽量 live
  try {
    const live = await fetchLiveViaProxy()
    const bundle: DailyBundle = {
      version: 1,
      day: calendarDay(),
      generatedAt: new Date().toISOString(),
      refreshHours: [8, 20],
      source: live.length >= 15 ? 'live' : 'partial',
      knowledgeFocusIndex:
        Math.abs(calendarDay().split('-').reduce((a, b) => a + Number(b), 0)) % KNOWLEDGE.length,
      news: ensureMinimum(live.length ? live : stampNews(LOCAL_NEWS)),
      marketNote: `${calendarDay()} 手动/定时强制刷新（${formatDateTime()}）。`,
    }
    writeStoredBundle(bundle)
    return bundle
  } catch {
    const local = buildLocalBundle()
    writeStoredBundle(local)
    return local
  }
}

export function getNewsByIdFromBundle(bundle: DailyBundle | null, id: string): NewsItem | undefined {
  return bundle?.news.find((n) => n.id === id) ?? stampNews(LOCAL_NEWS).find((n) => n.id === id)
}
