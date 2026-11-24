import { apiUrl, apiUrlFallback } from './apiUrl'

/** iOS Safari 会强缓存 GET；统一禁缓存 + 轻量重试；生产走桥接并解开包装 */

function stamp(url: string): string {
  const joiner = url.includes('?') ? '&' : '?'
  return `${url}${joiner}_ts=${Date.now()}`
}

function extractJsonBody(text: string): string {
  const trimmed = text.trim()
  if (!trimmed) return trimmed

  // jina Accept:application/json 包装
  try {
    const wrap = JSON.parse(trimmed) as { data?: { content?: string }; content?: string }
    const inner = wrap?.data?.content ?? wrap?.content
    if (typeof inner === 'string' && inner.trim().startsWith('{')) return inner.trim()
  } catch {
    // not wrapper
  }

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return trimmed

  // markdown / 杂讯中抠 JSON
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence?.[1]?.trim().startsWith('{')) return fence[1].trim()

  const start = trimmed.indexOf('{"rc"')
  const alt = trimmed.indexOf('{"chart"')
  const idx = start >= 0 ? start : alt
  if (idx >= 0) {
    const slice = trimmed.slice(idx)
    const end = slice.lastIndexOf('}')
    if (end > 0) return slice.slice(0, end + 1)
  }

  return trimmed
}

async function normalizeResponse(res: Response, viaBridge: boolean): Promise<Response> {
  if (!viaBridge) return res
  const text = await res.text()
  const body = extractJsonBody(text)
  return new Response(body, {
    status: res.ok ? 200 : res.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

async function once(url: string, init: RequestInit, viaBridge: boolean): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    cache: 'no-store',
    headers: {
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Accept: viaBridge ? 'application/json' : 'application/json,text/plain,*/*',
      ...(init.headers ?? {}),
    },
  })
  return normalizeResponse(res, viaBridge)
}

export async function fetchFresh(
  input: string,
  init: RequestInit = {},
  retries = 2,
): Promise<Response> {
  const primary = apiUrl(input)
  const fallback = apiUrlFallback(input)
  const candidates = fallback && fallback !== primary ? [primary, fallback] : [primary]
  const viaBridge = !import.meta.env.DEV && input.startsWith('/api/')

  let lastError: unknown

  for (const base of candidates) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await once(stamp(base), init, viaBridge)
        if (res.ok) return res
        if (res.status < 500 && res.status !== 403 && res.status !== 429) return res
        lastError = new Error(`HTTP ${res.status}`)
      } catch (e) {
        lastError = e
      }
      await new Promise((r) => setTimeout(r, 350 * (attempt + 1)))
    }
  }

  throw lastError instanceof Error ? lastError : new Error('网络请求失败')
}
