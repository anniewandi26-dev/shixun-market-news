import { localeFromCountry } from './countryToLocale'
import {
  DEFAULT_LOCALE,
  isLocaleCode,
  type LocaleCode,
} from './locales'

export type LocaleSource = 'manual' | 'ip' | 'browser' | 'default'

export interface DetectResult {
  locale: LocaleCode
  source: LocaleSource
  country: string | null
}

/** 手动语言只记在本会话：下次打开仍优先跟 IP，避免一直锁死旧语言 */
const MANUAL_KEY = 'shixun-lang-manual-session'
const IP_CACHE_KEY = 'shixun-lang-ip-cache'

export function getManualLocale(): LocaleCode | null {
  try {
    const v = sessionStorage.getItem(MANUAL_KEY)
    if (v && isLocaleCode(v)) return v
  } catch {
    //
  }
  return null
}

export function setManualLocale(code: LocaleCode | null) {
  try {
    // 清掉旧的长期手动锁定，避免历史 localStorage 干扰 IP
    localStorage.removeItem('shixun-lang-manual')
    if (code) sessionStorage.setItem(MANUAL_KEY, code)
    else sessionStorage.removeItem(MANUAL_KEY)
  } catch {
    //
  }
}

function localeFromBrowser(): LocaleCode | null {
  const list = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : []
  for (const raw of list) {
    if (!raw) continue
    if (isLocaleCode(raw)) return raw
    const short = raw.split('-')[0]
    if (raw.toLowerCase().startsWith('zh')) {
      if (/tw|hk|mo/i.test(raw)) return 'zh-TW'
      return 'zh-CN'
    }
    if (short === 'nb' || short === 'nn') return 'no'
    if (short && isLocaleCode(short)) return short as LocaleCode
  }
  return null
}

async function fetchCountry(): Promise<string | null> {
  try {
    const cached = sessionStorage.getItem(IP_CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached) as { country?: string; at?: number }
      if (parsed.country && parsed.at && Date.now() - parsed.at < 6 * 60 * 60 * 1000) {
        return parsed.country
      }
    }
  } catch {
    //
  }

  const endpoints = [
    '/api/geo/ipapi/json/',
    'https://ipapi.co/json/',
    'https://ipwho.is/',
    'https://get.geojs.io/v1/ip/country.json',
  ]

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) continue
      const data = (await res.json()) as Record<string, unknown>
      const country =
        (typeof data.country_code === 'string' && data.country_code) ||
        (typeof data.countryCode === 'string' && data.countryCode) ||
        (typeof data.country === 'string' && data.country.length === 2 && data.country) ||
        null
      if (country) {
        try {
          sessionStorage.setItem(
            IP_CACHE_KEY,
            JSON.stringify({ country: country.toUpperCase(), at: Date.now() }),
          )
        } catch {
          //
        }
        return country.toUpperCase()
      }
    } catch {
      // try next
    }
  }
  return null
}

/** 手动优先；否则 IP；再不行浏览器；最后 en */
export async function detectLocale(): Promise<DetectResult> {
  const manual = getManualLocale()
  if (manual) {
    return { locale: manual, source: 'manual', country: null }
  }

  const country = await fetchCountry()
  if (country) {
    return { locale: localeFromCountry(country), source: 'ip', country }
  }

  const browser = localeFromBrowser()
  if (browser) return { locale: browser, source: 'browser', country: null }

  return { locale: DEFAULT_LOCALE, source: 'default', country: null }
}

/** 仅按 IP（忽略手动）——用于「跟随 IP」按钮 */
export async function detectLocaleFromIpOnly(): Promise<DetectResult> {
  const country = await fetchCountry()
  if (country) {
    return { locale: localeFromCountry(country), source: 'ip', country }
  }
  const browser = localeFromBrowser()
  if (browser) return { locale: browser, source: 'browser', country: null }
  return { locale: DEFAULT_LOCALE, source: 'default', country: null }
}
