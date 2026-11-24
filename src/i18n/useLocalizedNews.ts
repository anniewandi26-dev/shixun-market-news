import { useEffect, useState } from 'react'
import type { NewsItem } from '../types'
import { useLocale } from './LocaleContext'
import { localizeNewsList } from './localizedNews'

export function useLocalizedNewsList(items: NewsItem[]) {
  const { locale, localeEpoch, ready } = useLocale()
  const key = items.map((n) => n.id).join('|')
  const [list, setList] = useState<NewsItem[]>(items)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ready) return
    let cancelled = false

    // 先立刻展示源列表，避免白屏；再异步套语言包
    setList(items)
    if (locale === 'zh-CN') {
      setLoading(false)
      return
    }

    setLoading(true)
    const timer = window.setTimeout(() => {
      // 超时兜底：最多 2.5s 结束 loading，防止外网/简繁卡住
      if (!cancelled) setLoading(false)
    }, 2500)

    void localizeNewsList(items, locale)
      .then((out) => {
        if (!cancelled) {
          setList(out)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
      .finally(() => {
        window.clearTimeout(timer)
      })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key captures item identity
  }, [key, locale, localeEpoch, ready])

  return { list, loading }
}
