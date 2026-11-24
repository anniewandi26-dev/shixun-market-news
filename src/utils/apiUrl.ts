/** 开发：Vite 代理。生产（GitHub Pages）：经 r.jina.ai 桥接上游（可跨域）。 */

const PREFIXES: [string, string][] = [
  ['/api/em-push', 'https://push2delay.eastmoney.com'],
  ['/api/em-his', 'https://push2his.eastmoney.com'],
  ['/api/em-news', 'https://np-weblist.eastmoney.com'],
  ['/api/em-search', 'https://search-api-web.eastmoney.com'],
  ['/api/yahoo', 'https://query1.finance.yahoo.com'],
  ['/api/sina', 'https://money.finance.sina.com.cn'],
  ['/api/gtx', 'https://translate.googleapis.com'],
  ['/api/mymemory', 'https://api.mymemory.translated.net'],
  ['/api/lingva', 'https://lingva.ml'],
  ['/api/geo/ipapi', 'https://ipapi.co'],
]

export function toUpstream(pathAndQuery: string): string | null {
  for (const [prefix, host] of PREFIXES) {
    if (pathAndQuery === prefix || pathAndQuery.startsWith(`${prefix}/`) || pathAndQuery.startsWith(`${prefix}?`)) {
      return host + pathAndQuery.slice(prefix.length)
    }
  }
  return null
}

export function apiUrl(pathAndQuery: string): string {
  if (!pathAndQuery.startsWith('/api/')) return pathAndQuery
  if (import.meta.env.DEV) return pathAndQuery

  const upstream = toUpstream(pathAndQuery)
  if (!upstream) return pathAndQuery
  return `https://r.jina.ai/${upstream}`
}

export function apiUrlFallback(pathAndQuery: string): string | null {
  if (import.meta.env.DEV) return null
  const upstream = toUpstream(pathAndQuery)
  if (!upstream) return null
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(upstream)}`
}
