/** iOS Safari 会强缓存 GET；统一禁缓存 + 轻量重试 */

export async function fetchFresh(
  input: string,
  init: RequestInit = {},
  retries = 2,
): Promise<Response> {
  const joiner = input.includes('?') ? '&' : '?'
  const url = `${input}${joiner}_ts=${Date.now()}`
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        cache: 'no-store',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
          ...(init.headers ?? {}),
        },
      })
      if (res.ok || res.status < 500) return res
      lastError = new Error(`HTTP ${res.status}`)
    } catch (e) {
      lastError = e
    }
    // iOS 弱网：短暂退避再试
    await new Promise((r) => setTimeout(r, 350 * (attempt + 1)))
  }

  throw lastError instanceof Error ? lastError : new Error('网络请求失败')
}
