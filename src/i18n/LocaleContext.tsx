import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import catalogJson from './catalog.json'
import {
  detectLocale,
  detectLocaleFromIpOnly,
  setManualLocale,
  type LocaleSource,
} from './detectLocale'
import {
  DEFAULT_LOCALE,
  getLocaleMeta,
  isLocaleCode,
  LOCALES,
  type LocaleCode,
} from './locales'
import type { MessageKey } from './sourceMessages'
import { SOURCE_MESSAGES } from './sourceMessages'
import { clearTranslationCache } from './translate'

type Catalog = Record<string, Partial<Record<MessageKey, string>>>

const catalog = catalogJson as Catalog

interface LocaleValue {
  locale: LocaleCode
  source: LocaleSource
  country: string | null
  ready: boolean
  /** 每次手动/IP 切换语言递增，强制正文重译 */
  localeEpoch: number
  locales: typeof LOCALES
  t: (key: MessageKey, vars?: Record<string, string | number>) => string
  setLocaleManual: (code: LocaleCode) => void
  followIp: () => Promise<void>
}

const LocaleContext = createContext<LocaleValue | null>(null)

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`,
  )
}

function lookup(locale: LocaleCode, key: MessageKey): string {
  const local = catalog[locale]?.[key]
  if (local) return local
  // 非中文语种：缺词条时优先英文，避免回退成华文源文
  if (locale !== 'zh-CN' && locale !== 'zh-TW') {
    return catalog.en?.[key] ?? key
  }
  return SOURCE_MESSAGES[key] ?? catalog.en?.[key] ?? key
}

function applyDocumentLang(locale: LocaleCode) {
  const meta = getLocaleMeta(locale)
  document.documentElement.lang = locale
  document.documentElement.dir = meta.dir
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>(DEFAULT_LOCALE)
  const [source, setSource] = useState<LocaleSource>('default')
  const [country, setCountry] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [localeEpoch, setLocaleEpoch] = useState(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const result = await detectLocale()
      if (cancelled) return
      setLocale(result.locale)
      setSource(result.source)
      setCountry(result.country)
      applyDocumentLang(result.locale)
      setLocaleEpoch((n) => n + 1)
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const setLocaleManual = useCallback((code: LocaleCode) => {
    if (!isLocaleCode(code)) return
    setManualLocale(code)
    clearTranslationCache()
    setLocale(code)
    setSource('manual')
    applyDocumentLang(code)
    setLocaleEpoch((n) => n + 1)
  }, [])

  const followIp = useCallback(async () => {
    setManualLocale(null)
    clearTranslationCache()
    setReady(false)
    const result = await detectLocaleFromIpOnly()
    setLocale(result.locale)
    setSource(result.source)
    setCountry(result.country)
    applyDocumentLang(result.locale)
    setLocaleEpoch((n) => n + 1)
    setReady(true)
  }, [])

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      format(lookup(locale, key), vars),
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      source,
      country,
      ready,
      localeEpoch,
      locales: LOCALES,
      t,
      setLocaleManual,
      followIp,
    }),
    [locale, source, country, ready, localeEpoch, t, setLocaleManual, followIp],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useT() {
  return useLocale().t
}
