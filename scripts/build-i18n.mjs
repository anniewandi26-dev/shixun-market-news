/**
 * 批量生成 36 语种 UI 词典 → src/i18n/catalog.json
 * 每语种一次（或少数几次）整包翻译，避免逐条请求过慢。
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outFile = path.join(root, 'src', 'i18n', 'catalog.json')

const LOCALES = [
  'en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru',
  'ar', 'hi', 'th', 'vi', 'id', 'ms', 'tr', 'it', 'nl', 'pl',
  'uk', 'sv', 'da', 'fi', 'no', 'cs', 'ro', 'hu', 'el', 'he',
  'fa', 'bn', 'ta', 'ur', 'sw', 'tl',
]

const SOURCE = {
  brand: '市讯',
  'nav.market': '行情',
  'nav.knowledge': '知识',
  'nav.news': '新闻',
  'lang.label': '语言',
  'lang.autoIp': '跟随 IP',
  'lang.manual': '手动',
  'lang.detecting': '正在按 IP 匹配语言…',
  'footer.disclaimer':
    '行情与资讯来自公开数据源，可能存在延迟；内容仅供学习参考，不构成任何投资建议。',
  'hero.title': '三地股市，一眼读懂',
  'hero.sub': 'A股、港股、美股行情持续刷新，配上入门知识和财经快讯。',
  'hero.ctaMarket': '查看行情',
  'hero.ctaKnowledge': '先学知识',
  'hero.ctaNews': '读新闻',
  'home.snap.eyebrow': 'US first',
  'home.snap.title': '今日美股速览',
  'home.snap.lede': '道指 · 纳指 · 标普，打开即同步最新价。',
  'home.snap.link': '进入行情 →',
  'home.snap.aria': '进入行情查看美股指数',
  'home.snap.live': '数据已接入',
  'home.snap.connecting': '连接中',
  'home.snap.ready': '三指数就绪',
  'home.snap.loadingIdx': '正在拉取美股指数',
  'home.snap.syncing': '同步中',
  'home.idx.dji': '道琼斯',
  'home.idx.ndx': '纳斯达克100',
  'home.idx.spx': '标普500',
  'home.entrances.eyebrow': 'Go deeper',
  'home.entrances.title': '从这里继续',
  'home.entrances.lede': '三个栏目各管一件事，点进去看完整内容。',
  'home.entrances.open': '打开 →',
  'home.entrance.market.kicker': 'Market',
  'home.entrance.market.title': '行情',
  'home.entrance.market.desc': '美股优先的三地看板，指数、自选与日K。',
  'home.entrance.knowledge.kicker': 'Learn',
  'home.entrance.knowledge.title': '知识',
  'home.entrance.knowledge.desc': '长文入门：估值、风控、美股与人物叙事。',
  'home.entrance.news.kicker': 'Dispatch',
  'home.entrance.news.title': '新闻',
  'home.entrance.news.desc': '站内全文：财经要闻、黄仁勋、马斯克专题。',
  'home.picks.eyebrow': 'Today',
  'home.picks.title': '今日精选',
  'home.picks.lede': '知识一篇 + 新闻三条，都在站内阅读。',
  'home.picks.knowledgeCat': '今日知识',
  'home.picks.read': '阅读全文',
  'home.picks.newsTitle': '今日新闻',
  'home.picks.all': '全部 →',
  'home.picks.loadingNews': '正在加载今日新闻…',
  'home.picks.emptyNews': '暂无新闻，请到新闻页刷新今日内容。',
  'home.trust.body':
    '股价打开后约每 {{seconds}} 秒同步；新闻与今日内容约在 {{slots}} 各刷新一次。',
  'home.trust.last': '最近内容刷新：{{time}}',
  'home.trust.source.live': '在线',
  'home.trust.source.partial': '混合',
  'home.trust.source.local': '站内今日版',
  'home.trust.disclaimer':
    '行情与资讯来自公开数据源，可能存在延迟；内容仅供学习参考，不构成任何投资建议。',
  'market.eyebrow': 'Live board',
  'market.title': '三地行情看板',
  'market.lede': '默认美股优先；可切换 A股 / 港股。报价约每 30 秒自动刷新。',
  'market.live': '数据已接入',
  'market.connecting': '连接中…',
  'market.offline': '离线 / 演示',
  'market.tabsAria': '市场切换',
  'market.tab.us': '美股',
  'market.tab.cn': 'A股',
  'market.tab.hk': '港股',
  'market.tab.all': '全部',
  'market.note': '报价约每 30 秒自动同步；新闻等内容包每天 08:00 / 20:00 刷新两次。',
  'market.indexes': '指数',
  'market.watchlist': '自选',
  'market.chart': '日K',
  'market.error': '行情源暂时不可用：{{error}}。请确认已运行本地开发服务（含代理）。',
  'market.watchTitle': '自选标的',
  'market.watchMeta': '共 {{total}} 只 · 已报价 {{quoted}} 只',
  'market.th.region': '市场',
  'market.th.name': '名称',
  'market.th.price': '最新价',
  'market.th.change': '涨跌',
  'market.th.pct': '涨跌幅',
  'market.region.us': '美股',
  'market.region.cn': 'A股',
  'market.region.hk': '港股',
  'knowledge.eyebrow': 'Learn',
  'knowledge.title': '股票知识库',
  'knowledge.lede':
    '每天自动轮换「今日精选」；长文点进去阅读。知识框架常驻，日期与精选每日刷新。',
  'knowledge.focusCat': '今日精选',
  'knowledge.readFocus': '阅读今日精选',
  'knowledge.mins': '{{n}} 分钟阅读',
  'knowledge.readFull': '阅读全文 →',
  'knowledge.readFocusCta': '今日精选 · 阅读全文 →',
  'knowledge.back': '← 返回知识库',
  'knowledge.aboutMins': '约 {{n}} 分钟阅读',
  'knowledge.disclaimer': '本文仅供学习参考，不构成任何投资建议。请结合自身情况独立判断。',
  'knowledge.prev': '上一篇',
  'knowledge.next': '下一篇',
  'knowledge.translating': '正在按你的语言翻译全文…',
  'news.eyebrow': 'Dispatch',
  'news.title': '财经快讯',
  'news.lede':
    '每天 08:00 / 20:00 各刷新一次；打开页面若发现不是「今天」的内容会立刻重拉。全文留在本站。',
  'news.loading': '正在加载今日新闻…',
  'news.empty': '今日新闻尚未就绪，请点击上方「立即刷新今日内容」。',
  'news.filtersAria': '新闻分类',
  'news.filter.all': '全部',
  'news.filter.finance': '财经',
  'news.filter.huang': '黄仁勋',
  'news.filter.musk': '马斯克',
  'news.block.featuredBoth': '黄仁勋 · 马斯克专题',
  'news.block.huang': '黄仁勋专题',
  'news.block.musk': '马斯克专题',
  'news.block.finance': '财经重大新闻',
  'news.readCta': '在本站阅读全文 →',
  'news.back': '← 返回新闻列表',
  'news.loadingArticle': '正在加载今日文章…',
  'news.disclaimer': '本文为市讯站内今日整理，仅供学习参考，不构成投资建议。',
  'news.prev': '上一篇',
  'news.next': '下一篇',
  'news.translating': '正在按你的语言翻译…',
  'news.tag.huang': '黄仁勋',
  'news.tag.musk': '马斯克',
  'news.tag.finance': '财经',
  'news.source.local': '市讯专题',
  'banner.fresh': '今日{{scope}}已更新',
  'banner.stale': '{{scope}}待刷新',
  'banner.scope.market': '行情',
  'banner.scope.knowledge': '知识',
  'banner.scope.news': '新闻',
  'banner.meta': '最近刷新 {{time}} · 自动时段 08:00 / 20:00',
  'banner.preparing': '正在准备今日内容…',
  'banner.source': '来源 {{source}}',
  'banner.source.live': '在线',
  'banner.source.partial': '混合',
  'banner.source.local': '站内今日版',
  'banner.refresh': '立即刷新今日内容',
  'banner.refreshing': '刷新中…',
  'cat.intro': '入门',
  'cat.terms': '术语',
  'cat.valuation': '估值',
  'cat.market': '市场',
  'cat.risk': '风控',
  'cat.tech': '技术',
  'cat.us': '美股',
  'cat.case': '案例',
  'cat.method': '方法',
  'cat.people': '人物',
}

const EN = {
  brand: 'ShiXun',
  'nav.market': 'Markets',
  'nav.knowledge': 'Knowledge',
  'nav.news': 'News',
  'lang.label': 'Language',
  'lang.autoIp': 'Follow IP',
  'lang.manual': 'Manual',
  'lang.detecting': 'Matching language by IP…',
  'footer.disclaimer':
    'Market data and news come from public sources and may be delayed. For learning only — not investment advice.',
  'hero.title': 'Three markets, one clear view',
  'hero.sub':
    'Live A-shares, Hong Kong and US quotes, plus beginner knowledge and finance briefings.',
  'hero.ctaMarket': 'View markets',
  'hero.ctaKnowledge': 'Learn first',
  'hero.ctaNews': 'Read news',
  'home.snap.eyebrow': 'US first',
  'home.snap.title': "Today's US snapshot",
  'home.snap.lede': 'Dow · Nasdaq-100 · S&P 500 — prices sync as you open.',
  'home.snap.link': 'Go to markets →',
  'home.snap.aria': 'Open markets for US indexes',
  'home.snap.live': 'Live data',
  'home.snap.connecting': 'Connecting',
  'home.snap.ready': 'Three indexes ready',
  'home.snap.loadingIdx': 'Loading US indexes',
  'home.snap.syncing': 'Syncing',
  'home.idx.dji': 'Dow Jones',
  'home.idx.ndx': 'Nasdaq-100',
  'home.idx.spx': 'S&P 500',
  'home.entrances.eyebrow': 'Go deeper',
  'home.entrances.title': 'Continue from here',
  'home.entrances.lede': 'Three sections, one job each — open for the full view.',
  'home.entrances.open': 'Open →',
  'home.entrance.market.kicker': 'Market',
  'home.entrance.market.title': 'Markets',
  'home.entrance.market.desc': 'US-first board for indexes, watchlist and daily charts.',
  'home.entrance.knowledge.kicker': 'Learn',
  'home.entrance.knowledge.title': 'Knowledge',
  'home.entrance.knowledge.desc': 'Long reads: valuation, risk, US markets and people stories.',
  'home.entrance.news.kicker': 'Dispatch',
  'home.entrance.news.title': 'News',
  'home.entrance.news.desc': 'On-site full text: finance, Jensen Huang, Elon Musk.',
  'home.picks.eyebrow': 'Today',
  'home.picks.title': "Today's picks",
  'home.picks.lede': 'One knowledge piece + three news items, all on-site.',
  'home.picks.knowledgeCat': "Today's knowledge",
  'home.picks.read': 'Read full article',
  'home.picks.newsTitle': "Today's news",
  'home.picks.all': 'All →',
  'home.picks.loadingNews': "Loading today's news…",
  'home.picks.emptyNews': "No news yet — refresh today's pack on the News page.",
  'home.trust.body':
    'Prices sync about every {{seconds}}s while open; news & daily content refresh at {{slots}}.',
  'home.trust.last': 'Last content refresh: {{time}}',
  'home.trust.source.live': 'live',
  'home.trust.source.partial': 'partial',
  'home.trust.source.local': 'on-site today',
  'home.trust.disclaimer':
    'Market data and news come from public sources and may be delayed. For learning only — not investment advice.',
  'market.eyebrow': 'Live board',
  'market.title': 'Three-market board',
  'market.lede': 'US first; switch A-shares / HK. Quotes refresh about every 30 seconds.',
  'market.live': 'Live data',
  'market.connecting': 'Connecting…',
  'market.offline': 'Offline / demo',
  'market.tabsAria': 'Market switch',
  'market.tab.us': 'US',
  'market.tab.cn': 'A-shares',
  'market.tab.hk': 'HK',
  'market.tab.all': 'All',
  'market.note':
    'Quotes sync about every 30s; news packs refresh twice daily at 08:00 / 20:00.',
  'market.indexes': 'Indexes',
  'market.watchlist': 'Watchlist',
  'market.chart': 'Daily chart',
  'market.error':
    'Market feed unavailable: {{error}}. Confirm the local dev server (with proxies) is running.',
  'market.watchTitle': 'Watchlist',
  'market.watchMeta': '{{total}} symbols · {{quoted}} quoted',
  'market.th.region': 'Market',
  'market.th.name': 'Name',
  'market.th.price': 'Last',
  'market.th.change': 'Change',
  'market.th.pct': '%',
  'market.region.us': 'US',
  'market.region.cn': 'A-shares',
  'market.region.hk': 'HK',
  'knowledge.eyebrow': 'Learn',
  'knowledge.title': 'Stock knowledge base',
  'knowledge.lede':
    'Daily featured article rotates automatically; open long reads in-site. Framework stays; date & pick refresh daily.',
  'knowledge.focusCat': "Today's pick",
  'knowledge.readFocus': "Read today's pick",
  'knowledge.mins': '{{n}} min read',
  'knowledge.readFull': 'Read full →',
  'knowledge.readFocusCta': "Today's pick · Read full →",
  'knowledge.back': '← Back to knowledge',
  'knowledge.aboutMins': 'About {{n}} min read',
  'knowledge.disclaimer':
    'For learning only — not investment advice. Decide independently for your situation.',
  'knowledge.prev': 'Previous',
  'knowledge.next': 'Next',
  'knowledge.translating': 'Translating full article into your language…',
  'news.eyebrow': 'Dispatch',
  'news.title': 'Finance briefings',
  'news.lede':
    'Refreshes at 08:00 / 20:00 daily; if content is not from today, it reloads on open. Full text stays on-site.',
  'news.loading': "Loading today's news…",
  'news.empty': "Today's news is not ready — tap Refresh today's content above.",
  'news.filtersAria': 'News filters',
  'news.filter.all': 'All',
  'news.filter.finance': 'Finance',
  'news.filter.huang': 'Jensen Huang',
  'news.filter.musk': 'Elon Musk',
  'news.block.featuredBoth': 'Huang · Musk desk',
  'news.block.huang': 'Jensen Huang desk',
  'news.block.musk': 'Elon Musk desk',
  'news.block.finance': 'Major finance news',
  'news.readCta': 'Read full on-site →',
  'news.back': '← Back to news',
  'news.loadingArticle': "Loading today's article…",
  'news.disclaimer': 'Compiled on ShiXun for learning only — not investment advice.',
  'news.prev': 'Previous',
  'news.next': 'Next',
  'news.translating': 'Translating into your language…',
  'news.tag.huang': 'Jensen Huang',
  'news.tag.musk': 'Elon Musk',
  'news.tag.finance': 'Finance',
  'news.source.local': 'ShiXun desk',
  'banner.fresh': "Today's {{scope}} updated",
  'banner.stale': '{{scope}} needs refresh',
  'banner.scope.market': 'markets',
  'banner.scope.knowledge': 'knowledge',
  'banner.scope.news': 'news',
  'banner.meta': 'Last refresh {{time}} · auto slots 08:00 / 20:00',
  'banner.preparing': "Preparing today's content…",
  'banner.source': 'Source {{source}}',
  'banner.source.live': 'live',
  'banner.source.partial': 'partial',
  'banner.source.local': 'on-site today',
  'banner.refresh': "Refresh today's content",
  'banner.refreshing': 'Refreshing…',
  'cat.intro': 'Basics',
  'cat.terms': 'Terms',
  'cat.valuation': 'Valuation',
  'cat.market': 'Markets',
  'cat.risk': 'Risk',
  'cat.tech': 'Technical',
  'cat.us': 'US markets',
  'cat.case': 'Case study',
  'cat.method': 'Method',
  'cat.people': 'People',
}

function gtxTarget(code) {
  if (code === 'zh-CN') return 'zh-CN'
  if (code === 'zh-TW') return 'zh-TW'
  return code
}

async function translateBlock(text, tl) {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN` +
    `&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return (data?.[0] ?? []).map((row) => row?.[0] ?? '').join('')
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms))
}

async function buildLocale(code) {
  if (code === 'zh-CN') return { ...SOURCE }
  if (code === 'en') return { ...EN }

  const keys = Object.keys(SOURCE)
  const sep = '\n@@@\n'
  const packed = keys.map((k) => SOURCE[k]).join(sep)
  const tl = gtxTarget(code)

  try {
    const translated = await translateBlock(packed, tl)
    const parts = translated.split(/\n?@@@\n?/)
    if (parts.length === keys.length) {
      const out = {}
      keys.forEach((k, i) => {
        out[k] = (parts[i] ?? '').trim() || EN[k] || SOURCE[k]
      })
      return out
    }
  } catch {
    // fall through to chunked
  }

  // chunked fallback: 20 keys per request
  const out = {}
  const chunkSize = 20
  for (let i = 0; i < keys.length; i += chunkSize) {
    const slice = keys.slice(i, i + chunkSize)
    const pack = slice.map((k) => SOURCE[k]).join(sep)
    try {
      const translated = await translateBlock(pack, tl)
      const parts = translated.split(/\n?@@@\n?/)
      slice.forEach((k, j) => {
        out[k] = (parts[j] ?? '').trim() || EN[k] || SOURCE[k]
      })
    } catch {
      slice.forEach((k) => {
        out[k] = EN[k] || SOURCE[k]
      })
    }
    await sleep(200)
  }
  return out
}

const catalog = {}
for (const code of LOCALES) {
  process.stdout.write(`[i18n] ${code}… `)
  catalog[code] = await buildLocale(code)
  console.log(`ok (${Object.keys(catalog[code]).length})`)
  await sleep(150)
}

await mkdir(path.dirname(outFile), { recursive: true })
await writeFile(outFile, JSON.stringify(catalog, null, 2), 'utf8')
console.log(`[i18n] wrote ${outFile} locales=${LOCALES.length}`)
