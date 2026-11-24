import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { localizeAdSpotlight } from '../i18n/localizeAdSpotlight'
import { useLocale, useT } from '../i18n/LocaleContext'
import {
  AD_SPOTLIGHT_FALLBACK,
  fetchAdSpotlight,
  type AdSpotlight,
} from '../services/adSpotlight'
import { isAdGatePassed, markAdGatePassed } from '../utils/adGate'

const WAIT_SEC = 10
const REFRESH_MS = 5 * 60_000

export function AdGatePage() {
  const t = useT()
  const { ready, locale, localeEpoch } = useLocale()
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [left, setLeft] = useState(WAIT_SEC)
  const [spot, setSpot] = useState<AdSpotlight>(AD_SPOTLIGHT_FALLBACK)
  const [title, setTitle] = useState('')
  const [lede, setLede] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // IP 语言一就绪就先出本地兜底，保证不卡死
  useEffect(() => {
    if (!ready) return
    setTitle(t('ad.headline'))
    setLede(t('ad.lede'))
    setSpot(AD_SPOTLIGHT_FALLBACK)
  }, [ready, locale, localeEpoch, t])

  // 后台拉实时稿 + 翻译；超时自动放弃，页面仍可点
  useEffect(() => {
    if (!ready || started) return
    let cancelled = false

    const run = async () => {
      setRefreshing(true)
      try {
        const next = await fetchAdSpotlight(4000)
        if (cancelled) return
        setSpot(next)

        const copy = await localizeAdSpotlight(
          next,
          locale,
          { title: t('ad.headline'), summary: t('ad.lede') },
          3500,
        )
        if (cancelled) return
        setTitle(copy.title)
        setLede(copy.summary)
      } catch {
        if (!cancelled) {
          setSpot(AD_SPOTLIGHT_FALLBACK)
          setTitle(t('ad.headline'))
          setLede(t('ad.lede'))
        }
      } finally {
        if (!cancelled) setRefreshing(false)
      }
    }

    void run()
    const timer = window.setInterval(() => {
      if (!started) void run()
    }, REFRESH_MS)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [ready, locale, localeEpoch, started, t])

  useEffect(() => {
    if (!started) return
    if (left <= 0) {
      markAdGatePassed()
      navigate('/', { replace: true })
      return
    }
    const id = window.setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => window.clearTimeout(id)
  }, [started, left, navigate])

  const onEnter = useCallback(() => {
    if (started) return
    setStarted(true)
    setLeft(WAIT_SEC)
  }, [started])

  if (typeof sessionStorage !== 'undefined' && isAdGatePassed()) {
    return <Navigate to="/" replace />
  }

  const showMain = ready && Boolean(title)

  return (
    <main className="ad-gate" data-theme={spot.theme} aria-busy={!showMain || started}>
      <div className="ad-gate-bg" aria-hidden>
        <img key={spot.bg} src={spot.bg} alt="" />
        <div className="ad-gate-veil" />
      </div>

      <div className="ad-gate-panel">
        <p className="ad-gate-sponsor">{t('ad.sponsor')}</p>
        {!showMain ? (
          <p className="ad-gate-loading">{t('ad.langLoading')}</p>
        ) : (
          <>
            <p className="ad-gate-kicker">
              {refreshing ? t('ad.liveLoading') : t('ad.liveKicker')}
            </p>
            <h1 className="ad-gate-title">{title}</h1>
            <p className="ad-gate-lede">{lede}</p>
            {spot.showTime ? <p className="ad-gate-time">{spot.showTime}</p> : null}

            {!started ? (
              <div className="ad-gate-actions">
                <button type="button" className="ad-gate-cta" onClick={onEnter}>
                  {t('ad.cta')}
                </button>
              </div>
            ) : (
              <div className="ad-gate-count" role="status" aria-live="polite">
                <div className="ad-gate-timer" aria-hidden>
                  <div
                    className="ad-gate-ring"
                    style={{ ['--p' as string]: String((WAIT_SEC - left) / WAIT_SEC) }}
                  />
                </div>
                <p>{t('ad.entering')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
