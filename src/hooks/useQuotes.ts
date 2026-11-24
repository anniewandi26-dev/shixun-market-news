import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchIndexQuotes, fetchWatchlistQuotes } from '../services/market'
import type { Quote } from '../types'

const REFRESH_MS = 30_000
const REFRESH_MS_BACKGROUND = 120_000

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [live, setLive] = useState(false)
  const loadingRef = useRef(false)

  const load = useCallback(async (reason: string) => {
    if (loadingRef.current) return
    loadingRef.current = true
    try {
      // 指数先回填首页，再拉自选，避免整包卡住只显示「—」
      const indexes = await fetchIndexQuotes()
      setQuotes(indexes)
      setLive(indexes.length > 0)
      setUpdatedAt(new Date())
      if (import.meta.env.DEV) {
        console.debug('[quotes]', reason, 'indexes', indexes.length)
      }

      const watch = await fetchWatchlistQuotes()
      const data = [...indexes, ...watch]
      setQuotes(data)
      setLive(data.length > 0)
      setError(null)
      setUpdatedAt(new Date())
      if (import.meta.env.DEV) {
        console.debug('[quotes]', reason, 'all', data.length)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '行情加载失败')
      setLive(false)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load('mount')

    let timer = window.setInterval(
      () => void load('interval'),
      document.visibilityState === 'visible' ? REFRESH_MS : REFRESH_MS_BACKGROUND,
    )

    const resetTimer = () => {
      window.clearInterval(timer)
      timer = window.setInterval(
        () => void load('interval'),
        document.visibilityState === 'visible' ? REFRESH_MS : REFRESH_MS_BACKGROUND,
      )
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        void load('visibility')
        resetTimer()
      }
    }

    const onPageShow = (event: PageTransitionEvent) => {
      void load(event.persisted ? 'bfcache' : 'pageshow')
      resetTimer()
    }

    const onFocus = () => void load('focus')
    const onOnline = () => void load('online')

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('focus', onFocus)
    window.addEventListener('online', onOnline)

    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('online', onOnline)
    }
  }, [load])

  return { quotes, loading, error, updatedAt, live, refreshMs: REFRESH_MS, reload: load }
}
