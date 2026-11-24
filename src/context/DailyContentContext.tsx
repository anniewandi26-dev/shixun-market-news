import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  forceRefreshDailyBundle,
  loadDailyBundle,
  type DailyBundle,
} from '../services/dailyContent'
import { isContentStale, shouldRunScheduledRefresh } from '../utils/time'
import { KNOWLEDGE } from '../data/knowledge'

const SESSION_KEY = 'shixun-session-bootstrapped-v1'

interface DailyContentValue {
  bundle: DailyBundle | null
  loading: boolean
  refreshing: boolean
  lastRefreshAt: Date | null
  knowledgeFocusId: string
  refreshNow: () => Promise<void>
}

const DailyContentContext = createContext<DailyContentValue | null>(null)

function markSessionBootstrapped() {
  try {
    sessionStorage.setItem(SESSION_KEY, String(Date.now()))
  } catch {
    // private mode
  }
}

function hasSessionBootstrapped(): boolean {
  try {
    return Boolean(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return false
  }
}

export function DailyContentProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<DailyBundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefreshAt, setLastRefreshAt] = useState<Date | null>(null)
  const busyRef = useRef(false)

  const applyBundle = useCallback((b: DailyBundle) => {
    setBundle(b)
    setLastRefreshAt(new Date(b.generatedAt))
  }, [])

  const refreshNow = useCallback(async () => {
    if (busyRef.current) return
    busyRef.current = true
    setRefreshing(true)
    try {
      const b = await forceRefreshDailyBundle()
      applyBundle(b)
      markSessionBootstrapped()
    } finally {
      setRefreshing(false)
      busyRef.current = false
    }
  }, [applyBundle])

  // 本会话第一次强制拉今日内容，避免 Safari 缓存旧稿；其后按 08:00 / 20:00
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const needForce = !hasSessionBootstrapped()
        if (needForce) {
          const b = await forceRefreshDailyBundle()
          if (!cancelled) {
            applyBundle(b)
            markSessionBootstrapped()
          }
        } else {
          const b = await loadDailyBundle()
          if (!cancelled) {
            applyBundle(b)
            if (isContentStale(b.generatedAt)) {
              const fresh = await forceRefreshDailyBundle()
              if (!cancelled) applyBundle(fresh)
            }
          }
        }
      } catch {
        if (!cancelled) {
          const b = await loadDailyBundle()
          applyBundle(b)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [applyBundle])

  // 每天 08:00 / 20:00；跨日也会触发
  useEffect(() => {
    const tick = () => {
      if (shouldRunScheduledRefresh(lastRefreshAt)) {
        void refreshNow()
      }
    }
    tick()
    const timer = window.setInterval(tick, 60_000)
    return () => window.clearInterval(timer)
  }, [lastRefreshAt, refreshNow])

  useEffect(() => {
    const maybeRefresh = (reason: string) => {
      if (document.visibilityState && document.visibilityState !== 'visible') return
      if (shouldRunScheduledRefresh(lastRefreshAt) || isContentStale(lastRefreshAt)) {
        if (import.meta.env.DEV) console.debug('[daily]', reason)
        void refreshNow()
      }
    }

    const onVisible = () => maybeRefresh('visibility')
    const onFocus = () => maybeRefresh('focus')
    const onPageShow = (e: PageTransitionEvent) => maybeRefresh(e.persisted ? 'bfcache' : 'pageshow')
    const onOnline = () => maybeRefresh('online')

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('online', onOnline)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('online', onOnline)
    }
  }, [lastRefreshAt, refreshNow])

  const knowledgeFocusId = useMemo(() => {
    const idx = bundle?.knowledgeFocusIndex ?? 0
    return KNOWLEDGE[idx % KNOWLEDGE.length]?.id ?? KNOWLEDGE[0].id
  }, [bundle])

  const value = useMemo(
    () => ({
      bundle,
      loading,
      refreshing,
      lastRefreshAt,
      knowledgeFocusId,
      refreshNow,
    }),
    [bundle, loading, refreshing, lastRefreshAt, knowledgeFocusId, refreshNow],
  )

  return (
    <DailyContentContext.Provider value={value}>{children}</DailyContentContext.Provider>
  )
}

export function useDailyContent() {
  const ctx = useContext(DailyContentContext)
  if (!ctx) throw new Error('useDailyContent must be used within DailyContentProvider')
  return ctx
}
