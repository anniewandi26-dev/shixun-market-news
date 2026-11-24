import type { AdSpotlight } from '../services/adSpotlight'
import { SOURCE_LOCALE, type LocaleCode } from './locales'
import { translatePacked } from './translate'

type CnConverter = (text: string) => string
let toTrad: CnConverter | null = null

async function toTraditional(text: string): Promise<string> {
  if (!toTrad) {
    const OpenCC = (await import('opencc-js')).default
    toTrad = OpenCC.Converter({ from: 'cn', to: 'tw' })
  }
  return toTrad(text)
}

function heavyCjk(s: string): boolean {
  const bare = s.replace(/\s/g, '')
  if (!bare) return false
  const cjk = (bare.match(/[\u3400-\u9fff]/g) ?? []).length
  return cjk / bare.length > 0.35
}

function okForLocale(text: string, locale: LocaleCode): boolean {
  if (locale === 'zh-CN' || locale === 'zh-TW') return true
  return !heavyCjk(text)
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

export interface LocalizedAdCopy {
  title: string
  summary: string
}

/**
 * 广告门禁文案：带硬超时，绝不拖死页面。
 * 非中文失败时回退到已本地化的兜底句（不是华文源文）。
 */
export async function localizeAdSpotlight(
  spot: AdSpotlight,
  locale: LocaleCode,
  fallback: LocalizedAdCopy,
  timeoutMs = 3500,
): Promise<LocalizedAdCopy> {
  const work = async (): Promise<LocalizedAdCopy> => {
    if (locale === 'zh-CN') {
      return { title: spot.title, summary: spot.summary }
    }

    if (locale === 'zh-TW') {
      return {
        title: await toTraditional(spot.title),
        summary: await toTraditional(spot.summary),
      }
    }

    const [directTitle, directSum] = await translatePacked(
      [spot.title, spot.summary],
      locale,
      SOURCE_LOCALE,
    )
    if (okForLocale(directTitle, locale) && okForLocale(directSum, locale)) {
      return { title: directTitle, summary: directSum }
    }

    const [enTitle, enSum] = await translatePacked(
      [spot.title, spot.summary],
      'en',
      SOURCE_LOCALE,
    )
    if (!okForLocale(enTitle, 'en') || !okForLocale(enSum, 'en')) {
      return fallback
    }

    if (locale === 'en') {
      return { title: enTitle, summary: enSum }
    }

    const [viaEnTitle, viaEnSum] = await translatePacked([enTitle, enSum], locale, 'en')
    if (okForLocale(viaEnTitle, locale) && okForLocale(viaEnSum, locale)) {
      return { title: viaEnTitle, summary: viaEnSum }
    }

    return { title: enTitle, summary: enSum }
  }

  return withTimeout(work(), timeoutMs, fallback)
}
