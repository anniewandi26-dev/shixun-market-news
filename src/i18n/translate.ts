import { SOURCE_LOCALE, toTranslateTarget, type LocaleCode } from './locales'

const memory = new Map<string, string>()
const inflight = new Map<string, Promise<string>>()

type CnConverter = (text: string) => string
let toTrad: CnConverter | null = null
let toSimp: CnConverter | null = null

async function getOpenCC() {
  if (toTrad && toSimp) return
  const OpenCC = (await import('opencc-js')).default
  toTrad = OpenCC.Converter({ from: 'cn', to: 'tw' })
  toSimp = OpenCC.Converter({ from: 'tw', to: 'cn' })
}

/** 全局串行队列，避免打开一页几十条并发打爆接口 */
let queue: Promise<void> = Promise.resolve()
const GAP_MS = 280

function cacheKey(text: string, to: LocaleCode, from: string) {
  return `${from}|${to}|${text}`
}

function persistKey(key: string) {
  // 避免超长中文把 localStorage 撑爆 / 键冲突
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0
  return `shixun-tr:v2:${h}:${key.length}`
}

function readPersist(key: string): string | null {
  try {
    const raw = localStorage.getItem(persistKey(key))
    if (!raw) return null
    const parsed = JSON.parse(raw) as { k?: string; v?: string }
    if (parsed.k !== key || typeof parsed.v !== 'string') return null
    return parsed.v
  } catch {
    return null
  }
}

function writePersist(key: string, value: string) {
  try {
    localStorage.setItem(persistKey(key), JSON.stringify({ k: key, v: value }))
  } catch {
    // quota
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn)
  queue = run.then(
    () => sleep(GAP_MS),
    () => sleep(GAP_MS),
  )
  return run
}

function hasCjk(s: string) {
  return /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/.test(s)
}

function mostlyLatin(s: string) {
  const letters = s.replace(/\s/g, '')
  if (!letters) return false
  const latin = (letters.match(/[A-Za-z]/g) ?? []).length
  return latin / letters.length > 0.55
}

/** 拒绝「目标是中文却译成马来/英文」这类串台结果（MyMemory 会按 IP 乱漂） */
function acceptTranslation(source: string, out: string, to: LocaleCode): boolean {
  if (!out || out === source) return false
  if (to === 'zh-CN' || to === 'zh-TW') {
    if (!hasCjk(out)) return false
    if (mostlyLatin(out)) return false
    return true
  }
  // 目标非中文：源有汉字时，结果不应仍是大段中文
  if (hasCjk(source) && hasCjk(out) && !mostlyLatin(out)) {
    // 允许少量残留专有名词；若几乎全是汉字则视为失败
    const cjk = (out.match(/[\u3400-\u9fff]/g) ?? []).length
    if (cjk / Math.max(out.replace(/\s/g, '').length, 1) > 0.7) return false
  }
  return true
}

function parseGtx(data: unknown): string {
  const chunks = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : []
  return chunks
    .map((row: unknown) => (Array.isArray(row) ? String(row[0] ?? '') : ''))
    .join('')
    .trim()
}

function myMemoryCode(code: string): string {
  if (code === 'zh-CN') return 'zh-CN'
  if (code === 'zh-TW') return 'zh-TW'
  return code
}

async function viaGtx(text: string, sl: string, tl: string): Promise<string> {
  // 两种 client，降低单一入口 429
  for (const client of ['gtx', 'at'] as const) {
    const url =
      `/api/gtx/translate_a/single?client=${client}&sl=${encodeURIComponent(sl)}` +
      `&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    if (res.status === 429) continue
    if (!res.ok) continue
    const out = parseGtx(await res.json())
    if (out) return out
  }
  throw new Error('429')
}

async function viaMyMemory(text: string, sl: string, tl: string): Promise<string> {
  const pair = `${myMemoryCode(sl)}|${myMemoryCode(tl)}`
  const url = `/api/mymemory/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(pair)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`mymemory ${res.status}`)
  const data = (await res.json()) as { responseData?: { translatedText?: string } }
  const out = data.responseData?.translatedText?.trim() ?? ''
  if (!out || /MYMEMORY WARNING/i.test(out)) throw new Error('mymemory empty')
  return out
}

async function viaLingva(text: string, sl: string, tl: string): Promise<string> {
  const from = sl === 'zh-CN' ? 'zh' : sl === 'zh-TW' ? 'zh_HANT' : sl
  const to = tl === 'zh-CN' ? 'zh' : tl === 'zh-TW' ? 'zh_HANT' : tl
  const url = `/api/lingva/api/v1/${encodeURIComponent(from)}/${encodeURIComponent(to)}/${encodeURIComponent(text)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`lingva ${res.status}`)
  const data = (await res.json()) as { translation?: string }
  const out = data.translation?.trim() ?? ''
  if (!out) throw new Error('lingva empty')
  return out
}

async function translateOnce(
  text: string,
  sl: string,
  tl: string,
  to: LocaleCode,
): Promise<string> {
  const errors: string[] = []
  // 中文互转优先 gtx；其它语言 MyMemory 优先但必须过脚本校验
  const order =
    to === 'zh-CN' || to === 'zh-TW' || sl.startsWith('zh')
      ? [viaGtx, viaMyMemory, viaLingva]
      : [viaMyMemory, viaGtx, viaLingva]

  for (const fn of order) {
    try {
      const out = await fn(text, sl, tl)
      if (out && acceptTranslation(text, out, to)) return out
      errors.push(`${fn.name}:rejected`)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e))
      if (errors[errors.length - 1] === '429') await sleep(1000)
    }
  }
  throw new Error(errors.join('; ') || 'all translators failed')
}

const PACK_SEP = '\n§§§\n'

/** 打包多段一次翻译，显著减少请求次数 */
export async function translatePacked(
  texts: string[],
  to: LocaleCode,
  from: LocaleCode | string = SOURCE_LOCALE,
): Promise<string[]> {
  if (texts.length === 0) return []
  if (to === from) return [...texts]
  if (from === 'zh-CN' && to === 'zh-CN') return [...texts]

  const results = new Array<string>(texts.length)
  const pendingIdx: number[] = []

  texts.forEach((t, i) => {
    const trimmed = t.trim()
    if (!trimmed) {
      results[i] = t
      return
    }
    // 无汉字的短拉丁名保持原样
    if (!hasCjk(trimmed) && /^[A-Za-z0-9 .,&'\-+/]+$/.test(trimmed) && trimmed.length < 40) {
      results[i] = t
      return
    }
    const key = cacheKey(trimmed, to, String(from))
    const hit = memory.get(key) ?? readPersist(key)
    if (hit && acceptTranslation(trimmed, hit, to)) {
      memory.set(key, hit)
      results[i] = hit
    } else {
      pendingIdx.push(i)
    }
  })

  if (pendingIdx.length === 0) return results

  let slice: number[] = []
  let size = 0
  const flush = async () => {
    if (slice.length === 0) return
    const idxs = slice
    const pack = idxs.map((i) => texts[i].trim()).join(PACK_SEP)
    slice = []
    size = 0

    // 单段直接译；多段才打包
    if (idxs.length === 1) {
      results[idxs[0]] = await translateText(texts[idxs[0]], to, from)
      return
    }

    try {
      const translated = await translateText(pack, to, from)
      const parts = translated.split(/\n?§§§\n?/)
      if (parts.length !== idxs.length) throw new Error('pack split mismatch')
      idxs.forEach((textIdx, j) => {
        const src = texts[textIdx].trim()
        const out = (parts[j] ?? '').trim()
        if (!acceptTranslation(src, out, to)) throw new Error('pack part rejected')
        const key = cacheKey(src, to, String(from))
        memory.set(key, out)
        writePersist(key, out)
        results[textIdx] = out
      })
    } catch {
      for (const textIdx of idxs) {
        results[textIdx] = await translateText(texts[textIdx], to, from)
      }
    }
  }

  for (const textIdx of pendingIdx) {
    const piece = texts[textIdx].trim()
    const add = piece.length + PACK_SEP.length
    if (slice.length > 0 && size + add > 380) await flush()
    slice.push(textIdx)
    size += add
    if (slice.length >= 4) await flush()
  }
  await flush()

  return results
}

/** 将中文源译为目标语；切换语言时务必带上正确的 to */
export async function translateText(
  text: string,
  to: LocaleCode,
  from: LocaleCode | string = SOURCE_LOCALE,
): Promise<string> {
  const trimmed = text.trim()
  if (!trimmed) return text
  if (to === from) return text
  if (from === 'zh-CN' && to === 'zh-CN') return text

  // 纯拉丁短名不翻译（股票代码名）
  if (!hasCjk(trimmed) && /^[A-Za-z0-9 .,&'\-+/]+$/.test(trimmed) && trimmed.length < 40) {
    return trimmed
  }

  const key = cacheKey(trimmed, to, String(from))
  const hit = memory.get(key) ?? readPersist(key)
  if (hit && acceptTranslation(trimmed, hit, to)) {
    memory.set(key, hit)
    return hit
  }

  const pending = inflight.get(key)
  if (pending) return pending

  const job = enqueue(async () => {
    // 简繁本地转换：不依赖外网额度
    if (from === 'zh-CN' && to === 'zh-TW') {
      await getOpenCC()
      const out = toTrad!(trimmed)
      memory.set(key, out)
      writePersist(key, out)
      return out
    }
    if (from === 'zh-TW' && to === 'zh-CN') {
      await getOpenCC()
      const out = toSimp!(trimmed)
      memory.set(key, out)
      writePersist(key, out)
      return out
    }

    const tl = toTranslateTarget(to)
    const sl = from === 'zh-CN' ? 'zh-CN' : from === 'zh-TW' ? 'zh-TW' : String(from)
    let lastErr: unknown
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const out = await translateOnce(trimmed, sl, tl, to)
        memory.set(key, out)
        writePersist(key, out)
        return out
      } catch (e) {
        lastErr = e
        await sleep(500 * (attempt + 1))
      }
    }
    if (import.meta.env.DEV) console.warn('[translate]', to, trimmed.slice(0, 20), lastErr)
    // 失败时回退源文（中文），绝不要沿用其它语言的旧译文
    return text
  }).finally(() => {
    inflight.delete(key)
  })

  inflight.set(key, job)
  return job
}

export async function translateMany(
  texts: string[],
  to: LocaleCode,
  from: LocaleCode | string = SOURCE_LOCALE,
): Promise<string[]> {
  return translatePacked(texts, to, from)
}

/** 清掉可能被污染的旧缓存（手动切换语言时调用） */
export function clearTranslationCache() {
  memory.clear()
  inflight.clear()
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && (k.startsWith('shixun-tr:') || k.startsWith('shixun-tr:v2:'))) keys.push(k)
    }
    keys.forEach((k) => localStorage.removeItem(k))
  } catch {
    //
  }
}
