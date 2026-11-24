/**
 * 每日内容刷新（建议 08:00 / 20:00 各跑一次）
 * 用法: npm run refresh
 * 写入: public/data/daily-bundle.json
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'data')
const outFile = path.join(outDir, 'daily-bundle.json')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

function nowStamp() {
  return new Date().toLocaleString('zh-CN', { hour12: false })
}

function dayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function article(id, tag, title, summary, paragraphs, source = '市讯今日更新') {
  return {
    id,
    tag,
    title,
    summary,
    source,
    time: nowStamp(),
    url: `/news/${id}`,
    region: 'global',
    body: paragraphs,
  }
}

async function fetchFastNews(pageSize = 25) {
  const url = `https://np-weblist.eastmoney.com/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=${pageSize}&req_trace=1`
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: 'https://kuaixun.eastmoney.com/' },
  })
  if (!res.ok) throw new Error(`fastNews ${res.status}`)
  const json = await res.json()
  return json?.data?.fastNewsList ?? []
}

async function searchNews(keyword, pageSize = 8) {
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
        pageSize,
        pageNo: 1,
        preTag: '',
        postTag: '',
      },
    },
  })
  const cb = `jQuery${Date.now()}`
  const url = `https://search-api-web.eastmoney.com/search/jsonp?cb=${cb}&param=${encodeURIComponent(param)}&_=${Date.now()}`
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: 'https://so.eastmoney.com/' },
  })
  if (!res.ok) throw new Error(`search ${keyword} ${res.status}`)
  const text = await res.text()
  const jsonText = text.replace(new RegExp(`^${cb}\\(`), '').replace(/\);?\s*$/, '')
  const json = JSON.parse(jsonText)
  return json?.result?.cmsArticleWebOld ?? []
}

function expandBody(title, summary, tag) {
  const s = (summary || title || '').replace(/\s+/g, ' ').trim()
  return [
    `【${dayKey()} 今日更新】${title}`,
    s || '详见下文要点梳理。',
    `市讯已将本条收入「${tag}」栏目，全文保留在站内，无需跳转外站。以下为今日整理要点，便于快速把握影响。`,
    '对投资者：请区分事实、解读与情绪三层信息；短线波动不等于长期趋势改变。本内容仅供学习参考，不构成投资建议。',
    '建议结合行情页指数与自选股价格，以及知识库中的风控框架一并阅读。',
  ]
}

function mapRows(rows, tag, prefix, limit) {
  const out = []
  const seen = new Set()
  for (const row of rows) {
    const title = String(row.title ?? '').trim()
    if (!title || seen.has(title)) continue
    seen.add(title)
    const summary = String(row.summary ?? row.content ?? row.digest ?? title)
      .replace(/\s+/g, ' ')
      .slice(0, 160)
    const id = `${prefix}-${out.length + 1}-${dayKey().replaceAll('-', '')}`
    out.push(
      article(id, tag, title, summary, expandBody(title, summary, tag), String(row.mediaName ?? row.source ?? '财经来源')),
    )
    if (out.length >= limit) break
  }
  return out
}

async function loadFallbackTemplates() {
  // 从已构建的 local 逻辑：读上一次 bundle 或空
  try {
    const prev = JSON.parse(await readFile(outFile, 'utf8'))
    return Array.isArray(prev.news) ? prev.news : []
  } catch {
    return []
  }
}

function stampTemplates(items) {
  return items.map((n, i) => ({
    ...n,
    id: n.id?.startsWith('live-') ? n.id : n.id,
    time: nowStamp(),
    url: `/news/${n.id}`,
    body: [
      `【${dayKey()} 今日更新】${n.title}`,
      ...(n.body ?? []).filter((p) => !p.startsWith('【')),
    ],
  }))
}

async function main() {
  const generatedAt = new Date().toISOString()
  const day = dayKey()
  let finance = []
  let huang = []
  let musk = []
  const errors = []

  try {
    const fast = await fetchFastNews(30)
    finance = mapRows(fast, '财经', 'live-fin', 20)
  } catch (e) {
    errors.push(String(e.message ?? e))
  }

  try {
    const rows = [
      ...(await searchNews('黄仁勋回归', 8)),
      ...(await searchNews('黄仁勋', 8)),
      ...(await searchNews('英伟达', 6)),
    ]
    huang = mapRows(rows, '黄仁勋', 'live-huang', 5)
  } catch (e) {
    errors.push(String(e.message ?? e))
  }

  try {
    const rows = [
      ...(await searchNews('马斯克', 8)),
      ...(await searchNews('特斯拉', 8)),
    ]
    musk = mapRows(rows, '马斯克', 'live-musk', 5)
  } catch (e) {
    errors.push(String(e.message ?? e))
  }

  let news = [...huang, ...musk, ...finance]

  if (news.length < 10) {
    const prev = await loadFallbackTemplates()
    const stamped = stampTemplates(prev)
    // 用旧文补齐，但强制今日时间戳
    const have = new Set(news.map((n) => n.title))
    for (const n of stamped) {
      if (have.has(n.title)) continue
      news.push(n)
      have.add(n.title)
    }
  }

  // 知识库今日精选：按日期轮换
  const focusIndex = Math.abs(
    day.split('-').reduce((a, b) => a + Number(b), 0),
  )

  const bundle = {
    version: 1,
    day,
    generatedAt,
    refreshHours: [8, 20],
    source: errors.length ? 'partial' : 'live',
    errors,
    knowledgeFocusIndex: focusIndex,
    news,
    marketNote: `${day} 行情页在打开时持续拉取最新报价；本包于 ${nowStamp()} 完成第次内容刷新。`,
  }

  await mkdir(outDir, { recursive: true })
  await writeFile(outFile, JSON.stringify(bundle, null, 2), 'utf8')
  console.log(
    `[refresh] day=${day} news=${news.length} source=${bundle.source} -> ${outFile}`,
  )
  if (errors.length) console.warn('[refresh] warnings:', errors.join(' | '))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
